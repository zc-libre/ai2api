import os from 'os';
import idleManager from '../utils/idle_manager.js';

const startTime = Date.now();
let requestCount = 0;

// 增加请求计数
export function incrementRequestCount() {
  requestCount++;
}

// 获取系统状态
export function getSystemStatus() {
  const uptime = Date.now() - startTime;
  const uptimeSeconds = Math.floor(uptime / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  const memUsage = process.memoryUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  // 获取空闲状态
  const idleStatus = idleManager.getStatus();

  return {
    cpu: getCpuUsage(),
    memory: formatBytes(memUsage.heapUsed) + ' / ' + formatBytes(memUsage.heapTotal),
    uptime: `${hours}时${minutes}分${seconds}秒`,
    requests: requestCount,
    nodeVersion: process.version,
    platform: `${os.platform()} ${os.arch()}`,
    pid: process.pid,
    systemMemory: formatBytes(usedMem) + ' / ' + formatBytes(totalMem),
    idle: idleStatus.isIdle ? '空闲模式' : '活跃',
    idleTime: idleStatus.idleTimeSeconds
  };
}

// 获取 CPU 使用率（简化版本）
function getCpuUsage() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const usage = 100 - ~~(100 * idle / total);

  return usage;
}

// 格式化字节数
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
