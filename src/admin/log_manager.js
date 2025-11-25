import fs from 'fs/promises';
import path from 'path';

const LOGS_FILE = path.join(process.cwd(), 'data', 'app_logs.json');
const MAX_LOGS = 200; // 最多保存 200 条日志（降低内存使用）

// 内存缓存，避免频繁读取文件
let logsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 30000; // 缓存30秒

// 确保数据目录存在
async function ensureDataDir() {
  const dataDir = path.dirname(LOGS_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// 加载日志（带缓存）
export async function loadLogs() {
  const now = Date.now();

  // 如果缓存有效，直接返回缓存
  if (logsCache && (now - lastCacheTime) < CACHE_DURATION) {
    return logsCache;
  }

  await ensureDataDir();
  try {
    const data = await fs.readFile(LOGS_FILE, 'utf-8');
    const trimmed = data.trim();
    // 处理空文件或无效JSON
    if (!trimmed) {
      logsCache = [];
      lastCacheTime = now;
      return [];
    }
    logsCache = JSON.parse(trimmed);
    lastCacheTime = now;
    return logsCache;
  } catch (error) {
    // 文件不存在或JSON解析失败，返回空数组
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      logsCache = [];
      lastCacheTime = now;
      return [];
    }
    throw error;
  }
}

// 保存日志
async function saveLogs(logs) {
  await ensureDataDir();
  // 只保留最新的日志
  const recentLogs = logs.slice(-MAX_LOGS);
  await fs.writeFile(LOGS_FILE, JSON.stringify(recentLogs, null, 2), 'utf-8');

  // 更新缓存
  logsCache = recentLogs;
  lastCacheTime = Date.now();
}

// 添加日志
export async function addLog(level, message) {
  const logs = await loadLogs();
  logs.push({
    timestamp: new Date().toISOString(),
    level,
    message
  });
  await saveLogs(logs);
}

// 清空日志
export async function clearLogs() {
  await saveLogs([]);
}

// 获取最近的日志
export async function getRecentLogs(limit = 100) {
  const logs = await loadLogs();
  return logs.slice(-limit).reverse();
}
