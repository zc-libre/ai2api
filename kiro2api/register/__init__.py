"""
注册服务模块

提供 Amazon Q 账号自动注册功能，包括任务管理和注册服务。
移植自 amazonq2api
"""

from .task_manager import (
    TaskManager,
    RegisterTask,
    TaskStatus,
    LogEntry,
    task_manager,
)
from .service import auto_register, AutoRegisterOptions

__all__ = [
    "TaskManager",
    "RegisterTask",
    "TaskStatus",
    "LogEntry",
    "task_manager",
    "auto_register",
    "AutoRegisterOptions",
]

