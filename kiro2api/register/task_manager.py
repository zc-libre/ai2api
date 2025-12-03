"""
注册任务管理器

负责管理注册任务队列、状态跟踪和 SSE 日志推送。
移植自 amazonq2api/src/server.ts
"""

import asyncio
import logging
from datetime import datetime
from enum import Enum
from typing import Optional, Dict, List, Set, Callable, Any
from dataclasses import dataclass, field
from uuid import uuid4

logger = logging.getLogger(__name__)


class TaskStatus(str, Enum):
    """任务状态"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


@dataclass
class LogEntry:
    """日志条目"""
    timestamp: str
    level: str  # "info", "warn", "error", "debug"
    message: str
    context: Optional[Dict[str, Any]] = None


@dataclass
class TaskProgress:
    """任务进度"""
    step: str
    percent: int


@dataclass
class TaskResult:
    """任务结果"""
    aws_email: Optional[str] = None
    saved_at: Optional[str] = None


@dataclass
class RegisterTaskOptions:
    """注册任务选项"""
    password: Optional[str] = None
    full_name: Optional[str] = None
    headless: Optional[bool] = None
    label: Optional[str] = None
    max_retries: int = 3


@dataclass
class RegisterTask:
    """注册任务"""
    id: str
    status: TaskStatus
    created_at: str
    options: RegisterTaskOptions
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    result: Optional[TaskResult] = None
    error: Optional[str] = None
    logs: List[LogEntry] = field(default_factory=list)
    progress: Optional[TaskProgress] = None


class TaskManager:
    """
    任务管理器
    
    管理注册任务的生命周期，包括：
    - 任务创建和队列管理
    - 任务状态跟踪
    - 日志记录和 SSE 推送
    """
    
    def __init__(self):
        self._tasks: Dict[str, RegisterTask] = {}
        self._queue: asyncio.Queue[str] = asyncio.Queue()
        self._running_task: Optional[RegisterTask] = None
        self._sse_clients: Dict[str, Set[asyncio.Queue]] = {}
        self._worker_task: Optional[asyncio.Task] = None
        self._executor: Optional[Callable[[RegisterTask], Any]] = None
    
    def set_executor(self, executor: Callable[[RegisterTask], Any]) -> None:
        """设置任务执行器"""
        self._executor = executor
    
    def create_task(self, options: RegisterTaskOptions) -> RegisterTask:
        """
        创建新的注册任务
        
        Args:
            options: 任务选项
        
        Returns:
            RegisterTask: 创建的任务
        """
        task = RegisterTask(
            id=str(uuid4()),
            status=TaskStatus.PENDING,
            created_at=datetime.utcnow().isoformat() + "Z",
            options=options,
        )
        
        self._tasks[task.id] = task
        self._queue.put_nowait(task.id)
        
        self.add_log(task.id, "info", "任务已创建，等待执行")
        logger.info(f"创建注册任务: {task.id}, label={options.label}")
        
        # 确保 worker 在运行
        self._ensure_worker()
        
        return task
    
    def get_task(self, task_id: str) -> Optional[RegisterTask]:
        """获取任务"""
        return self._tasks.get(task_id)
    
    def get_all_tasks(self) -> List[RegisterTask]:
        """获取所有任务（按创建时间倒序）"""
        tasks = list(self._tasks.values())
        tasks.sort(key=lambda t: t.created_at, reverse=True)
        return tasks
    
    def get_queue_position(self, task_id: str) -> Optional[int]:
        """获取任务在队列中的位置（1-indexed），如果不在队列中返回 None"""
        queue_list = list(self._queue._queue)
        try:
            return queue_list.index(task_id) + 1
        except ValueError:
            return None
    
    def cancel_task(self, task_id: str) -> bool:
        """
        取消等待中的任务
        
        Returns:
            bool: 是否成功取消
        """
        task = self._tasks.get(task_id)
        if not task:
            return False
        
        if task.status == TaskStatus.RUNNING:
            return False  # 无法取消正在运行的任务
        
        if task.status in (TaskStatus.COMPLETED, TaskStatus.FAILED):
            return False  # 任务已结束
        
        # 从队列移除
        queue_list = list(self._queue._queue)
        if task_id in queue_list:
            queue_list.remove(task_id)
            self._queue._queue.clear()
            for tid in queue_list:
                self._queue.put_nowait(tid)
        
        del self._tasks[task_id]
        logger.info(f"任务已取消: {task_id}")
        return True
    
    def add_log(
        self,
        task_id: str,
        level: str,
        message: str,
        context: Optional[Dict[str, Any]] = None,
    ) -> None:
        """添加任务日志"""
        task = self._tasks.get(task_id)
        if not task:
            return
        
        log_entry = LogEntry(
            timestamp=datetime.utcnow().isoformat() + "Z",
            level=level,
            message=message,
            context=context,
        )
        task.logs.append(log_entry)
        
        # 广播给 SSE 客户端
        self._broadcast(task_id, {"type": "log", "data": self._log_entry_to_dict(log_entry)})
        
        # 同时输出到控制台
        log_func = getattr(logger, level, logger.info)
        log_func(f"[Task {task_id[:8]}] {message}")
    
    def update_progress(self, task_id: str, step: str, percent: int) -> None:
        """更新任务进度"""
        task = self._tasks.get(task_id)
        if not task:
            return
        
        task.progress = TaskProgress(step=step, percent=percent)
        self._broadcast(task_id, {"type": "progress", "data": {"step": step, "percent": percent}})
    
    def subscribe(self, task_id: str) -> asyncio.Queue:
        """
        订阅任务的 SSE 事件
        
        Returns:
            asyncio.Queue: 事件队列
        """
        if task_id not in self._sse_clients:
            self._sse_clients[task_id] = set()
        
        queue: asyncio.Queue = asyncio.Queue()
        self._sse_clients[task_id].add(queue)
        return queue
    
    def unsubscribe(self, task_id: str, queue: asyncio.Queue) -> None:
        """取消订阅"""
        if task_id in self._sse_clients:
            self._sse_clients[task_id].discard(queue)
            if not self._sse_clients[task_id]:
                del self._sse_clients[task_id]
    
    def _broadcast(self, task_id: str, message: Dict[str, Any]) -> None:
        """广播消息到所有订阅者"""
        clients = self._sse_clients.get(task_id, set())
        for queue in clients:
            try:
                queue.put_nowait(message)
            except asyncio.QueueFull:
                pass
    
    def _broadcast_status(self, task_id: str) -> None:
        """广播任务状态变更"""
        task = self._tasks.get(task_id)
        if not task:
            return
        
        result_data = None
        if task.result:
            result_data = {
                "email": task.result.aws_email,
                "savedAt": task.result.saved_at,
            }
        
        self._broadcast(task_id, {
            "type": "status",
            "data": {
                "status": task.status.value,
                "error": task.error,
                "result": result_data,
            }
        })
    
    def _ensure_worker(self) -> None:
        """确保 worker 任务在运行"""
        if self._worker_task is None or self._worker_task.done():
            self._worker_task = asyncio.create_task(self._worker())
    
    async def _worker(self) -> None:
        """任务处理 worker"""
        while True:
            try:
                # 等待任务
                task_id = await self._queue.get()
                task = self._tasks.get(task_id)
                
                if not task:
                    continue
                
                # 开始执行
                self._running_task = task
                task.status = TaskStatus.RUNNING
                task.started_at = datetime.utcnow().isoformat() + "Z"
                
                self.add_log(task_id, "info", "开始执行注册任务")
                self.update_progress(task_id, "初始化", 0)
                self._broadcast_status(task_id)
                
                try:
                    if self._executor:
                        result = await self._executor(task)
                        
                        task.status = TaskStatus.COMPLETED
                        task.result = TaskResult(
                            aws_email=result.get("aws_email"),
                            saved_at=result.get("saved_at"),
                        )
                        task.completed_at = datetime.utcnow().isoformat() + "Z"
                        
                        self.add_log(task_id, "info", f"注册成功，邮箱: {result.get('aws_email')}")
                        self.update_progress(task_id, "完成", 100)
                    else:
                        raise Exception("未设置任务执行器")
                
                except Exception as e:
                    task.status = TaskStatus.FAILED
                    task.error = str(e)
                    task.completed_at = datetime.utcnow().isoformat() + "Z"
                    
                    self.add_log(task_id, "error", f"注册失败: {task.error}")
                    logger.exception(f"任务执行失败: {task_id}")
                
                finally:
                    self._running_task = None
                    self._broadcast_status(task_id)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.exception("Worker 异常")
    
    @staticmethod
    def _log_entry_to_dict(entry: LogEntry) -> Dict[str, Any]:
        """转换日志条目为字典"""
        return {
            "timestamp": entry.timestamp,
            "level": entry.level,
            "message": entry.message,
            "context": entry.context,
        }
    
    def task_to_dict(self, task: RegisterTask, include_logs: bool = False) -> Dict[str, Any]:
        """转换任务为字典"""
        result = {
            "id": task.id,
            "status": task.status.value,
            "createdAt": task.created_at,
            "startedAt": task.started_at,
            "completedAt": task.completed_at,
            "label": task.options.label,
            "queuePosition": self.get_queue_position(task.id),
            "error": task.error,
        }
        
        if task.result:
            result["result"] = {
                "email": task.result.aws_email,
                "savedAt": task.result.saved_at,
            }
        
        if task.progress:
            result["progress"] = {
                "step": task.progress.step,
                "percent": task.progress.percent,
            }
        
        if include_logs:
            result["logs"] = [self._log_entry_to_dict(log) for log in task.logs]
        
        return result
    
    @property
    def running_task_id(self) -> Optional[str]:
        """获取当前正在运行的任务 ID"""
        return self._running_task.id if self._running_task else None
    
    @property
    def queue_length(self) -> int:
        """获取队列长度"""
        return self._queue.qsize()


# 全局任务管理器实例
task_manager = TaskManager()

