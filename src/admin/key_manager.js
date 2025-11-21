import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import logger from '../utils/logger.js';

const KEYS_FILE = path.join(process.cwd(), 'data', 'api_keys.json');

// 确保数据目录存在
async function ensureDataDir() {
  const dataDir = path.dirname(KEYS_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// 生成随机 API 密钥
function generateApiKey() {
  return 'sk-' + crypto.randomBytes(32).toString('hex');
}

// 加载所有密钥
export async function loadKeys() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(KEYS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// 保存密钥
async function saveKeys(keys) {
  await ensureDataDir();
  await fs.writeFile(KEYS_FILE, JSON.stringify(keys, null, 2), 'utf-8');
}

// 创建新密钥
export async function createKey(name = '未命名', rateLimit = null) {
  const keys = await loadKeys();
  const newKey = {
    key: generateApiKey(),
    name,
    created: new Date().toISOString(),
    lastUsed: null,
    requests: 0,
    rateLimit: rateLimit || { enabled: false, maxRequests: 100, windowMs: 60000 }, // 默认 100 次/分钟
    usage: {} // 用于存储使用记录 { timestamp: count }
  };
  keys.push(newKey);
  await saveKeys(keys);
  logger.info(`新密钥已创建: ${name}`);
  return newKey;
}

// 删除密钥
export async function deleteKey(keyToDelete) {
  const keys = await loadKeys();
  const filtered = keys.filter(k => k.key !== keyToDelete);
  if (filtered.length === keys.length) {
    throw new Error('密钥不存在');
  }
  await saveKeys(filtered);
  logger.info(`密钥已删除: ${keyToDelete.substring(0, 10)}...`);
  return true;
}

// 验证密钥
export async function validateKey(keyToCheck) {
  const keys = await loadKeys();
  const key = keys.find(k => k.key === keyToCheck);
  if (key) {
    // 更新使用信息
    key.lastUsed = new Date().toISOString();
    key.requests = (key.requests || 0) + 1;
    await saveKeys(keys);
    return true;
  }
  return false;
}

// 获取密钥统计
export async function getKeyStats() {
  const keys = await loadKeys();
  return {
    total: keys.length,
    active: keys.filter(k => k.lastUsed).length,
    totalRequests: keys.reduce((sum, k) => sum + (k.requests || 0), 0)
  };
}

// 更新密钥频率限制
export async function updateKeyRateLimit(keyToUpdate, rateLimit) {
  const keys = await loadKeys();
  const key = keys.find(k => k.key === keyToUpdate);
  if (!key) {
    throw new Error('密钥不存在');
  }
  key.rateLimit = rateLimit;
  await saveKeys(keys);
  logger.info(`密钥频率限制已更新: ${keyToUpdate.substring(0, 10)}...`);
  return key;
}

// 检查频率限制
export async function checkRateLimit(keyToCheck) {
  const keys = await loadKeys();
  const key = keys.find(k => k.key === keyToCheck);

  if (!key) {
    return { allowed: false, error: '密钥不存在' };
  }

  // 如果未启用频率限制，直接允许
  if (!key.rateLimit || !key.rateLimit.enabled) {
    return { allowed: true };
  }

  const now = Date.now();
  const windowMs = key.rateLimit.windowMs || 60000;
  const maxRequests = key.rateLimit.maxRequests || 100;

  // 清理过期的使用记录
  key.usage = key.usage || {};
  const cutoffTime = now - windowMs;

  // 计算当前时间窗口内的请求数
  let requestCount = 0;
  for (const [timestamp, count] of Object.entries(key.usage)) {
    if (parseInt(timestamp) >= cutoffTime) {
      requestCount += count;
    } else {
      delete key.usage[timestamp]; // 清理过期记录
    }
  }

  // 检查是否超过限制
  if (requestCount >= maxRequests) {
    const resetTime = Math.min(...Object.keys(key.usage).map(t => parseInt(t))) + windowMs;
    const waitSeconds = Math.ceil((resetTime - now) / 1000);
    return {
      allowed: false,
      error: '请求频率超限',
      resetIn: waitSeconds,
      limit: maxRequests,
      remaining: 0
    };
  }

  // 记录本次请求
  const minute = Math.floor(now / 10000) * 10000; // 按10秒分组
  key.usage[minute] = (key.usage[minute] || 0) + 1;

  await saveKeys(keys);

  return {
    allowed: true,
    limit: maxRequests,
    remaining: maxRequests - requestCount - 1
  };
}
