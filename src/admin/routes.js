import express from 'express';
import multer from 'multer';
import archiver from 'archiver';
import { createKey, loadKeys, deleteKey, updateKeyRateLimit, getKeyStats } from './key_manager.js';
import { getRecentLogs, clearLogs, addLog } from './log_manager.js';
import { getSystemStatus, incrementRequestCount } from './monitor.js';
import { loadAccounts, deleteAccount, toggleAccount, triggerLogin, getAccountStats, addTokenFromCallback, getAccountName, importTokens } from './token_admin.js';
import { createSession, validateSession, destroySession, verifyPassword, adminAuth } from './session.js';
import { loadSettings, saveSettings } from './settings_manager.js';
import tokenManager from '../auth/token_manager.js';

// 配置文件上传
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// 登录接口（不需要认证）
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: '请输入密码' });
    }

    if (verifyPassword(password)) {
      const token = createSession();
      await addLog('info', '管理员登录成功');
      res.json({ success: true, token });
    } else {
      await addLog('warn', '管理员登录失败：密码错误');
      res.status(401).json({ error: '密码错误' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 登出接口
router.post('/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token) {
    destroySession(token);
  }
  res.json({ success: true });
});

// 验证会话接口
router.get('/verify', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (validateSession(token)) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
});

// 以下所有路由需要认证
router.use(adminAuth);

// 生成新密钥
router.post('/keys/generate', async (req, res) => {
  try {
    const { name, rateLimit } = req.body;
    const newKey = await createKey(name, rateLimit);
    await addLog('success', `密钥已生成: ${name || '未命名'}`);
    res.json({ success: true, key: newKey.key, name: newKey.name, rateLimit: newKey.rateLimit });
  } catch (error) {
    await addLog('error', `生成密钥失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 获取所有密钥
router.get('/keys', async (req, res) => {
  try {
    const keys = await loadKeys();
    // 返回密钥列表（隐藏部分字符）
    const safeKeys = keys.map(k => ({
      ...k,
      key: k.key.substring(0, 10) + '...' + k.key.substring(k.key.length - 4)
    }));
    res.json(keys); // 在管理界面显示完整密钥
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除密钥
router.delete('/keys/:key', async (req, res) => {
  try {
    const { key } = req.params;
    await deleteKey(key);
    await addLog('warn', `密钥已删除: ${key.substring(0, 10)}...`);
    res.json({ success: true });
  } catch (error) {
    await addLog('error', `删除密钥失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 更新密钥频率限制
router.patch('/keys/:key/ratelimit', async (req, res) => {
  try {
    const { key } = req.params;
    const { rateLimit } = req.body;
    await updateKeyRateLimit(key, rateLimit);
    await addLog('info', `密钥频率限制已更新: ${key.substring(0, 10)}...`);
    res.json({ success: true });
  } catch (error) {
    await addLog('error', `更新频率限制失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 获取密钥统计
router.get('/keys/stats', async (req, res) => {
  try {
    const stats = await getKeyStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取日志
router.get('/logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const logs = await getRecentLogs(limit);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 清空日志
router.delete('/logs', async (req, res) => {
  try {
    await clearLogs();
    await addLog('info', '日志已清空');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取系统状态
router.get('/status', async (req, res) => {
  try {
    const status = getSystemStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Token 管理路由

// 获取所有账号
router.get('/tokens', async (req, res) => {
  try {
    const accounts = await loadAccounts();
    // 隐藏敏感信息，只返回必要字段
    const safeAccounts = accounts.map((acc, index) => ({
      index,
      access_token: acc.access_token?.substring(0, 20) + '...',
      refresh_token: acc.refresh_token ? 'exists' : 'none',
      expires_in: acc.expires_in,
      timestamp: acc.timestamp,
      enable: acc.enable !== false,
      created: new Date(acc.timestamp).toLocaleString()
    }));
    res.json(safeAccounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除账号
router.delete('/tokens/:index', async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    await deleteAccount(index);
    await addLog('warn', `Token 账号 ${index} 已删除`);
    res.json({ success: true });
  } catch (error) {
    await addLog('error', `删除 Token 失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 启用/禁用账号
router.patch('/tokens/:index', async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const { enable } = req.body;
    await toggleAccount(index, enable);
    await addLog('info', `Token 账号 ${index} 已${enable ? '启用' : '禁用'}`);
    res.json({ success: true });
  } catch (error) {
    await addLog('error', `切换 Token 状态失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 触发登录流程
router.post('/tokens/login', async (req, res) => {
  try {
    await addLog('info', '开始 Google OAuth 登录流程');
    const result = await triggerLogin();
    res.json(result);
  } catch (error) {
    await addLog('error', `登录失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 获取 Token 统计
router.get('/tokens/stats', async (req, res) => {
  try {
    const stats = await getAccountStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取 Token 使用统计（轮询信息）
router.get('/tokens/usage', async (req, res) => {
  try {
    const usageStats = tokenManager.getUsageStats();
    res.json(usageStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 手动添加 Token（通过回调链接）
router.post('/tokens/callback', async (req, res) => {
  try {
    const { callbackUrl } = req.body;
    if (!callbackUrl) {
      return res.status(400).json({ error: '请提供回调链接' });
    }
    await addLog('info', '正在通过回调链接添加 Token...');
    const result = await addTokenFromCallback(callbackUrl);
    await addLog('success', 'Token 已通过回调链接成功添加');
    res.json(result);
  } catch (error) {
    await addLog('error', `添加 Token 失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 获取账号详细信息（包括名称）
router.post('/tokens/details', async (req, res) => {
  try {
    const { indices } = req.body;
    const accounts = await loadAccounts();
    const details = [];

    for (const index of indices) {
      if (index >= 0 && index < accounts.length) {
        const account = accounts[index];
        const accountInfo = await getAccountName(account.access_token);
        details.push({
          index,
          email: accountInfo.email,
          name: accountInfo.name,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_in: account.expires_in,
          timestamp: account.timestamp,
          enable: account.enable !== false
        });
      }
    }

    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 批量导出 Token (ZIP格式)
router.post('/tokens/export', async (req, res) => {
  try {
    const { indices } = req.body;
    const accounts = await loadAccounts();
    const exportData = [];

    for (const index of indices) {
      if (index >= 0 && index < accounts.length) {
        const account = accounts[index];
        const accountInfo = await getAccountName(account.access_token);
        exportData.push({
          email: accountInfo.email,
          name: accountInfo.name,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_in: account.expires_in,
          timestamp: account.timestamp,
          created: new Date(account.timestamp).toLocaleString(),
          enable: account.enable !== false
        });
      }
    }

    await addLog('info', `批量导出了 ${exportData.length} 个 Token 账号`);

    // 创建 ZIP 文件
    const archive = archiver('zip', { zlib: { level: 9 } });
    const timestamp = new Date().toISOString().split('T')[0];

    res.attachment(`tokens_export_${timestamp}.zip`);
    res.setHeader('Content-Type', 'application/zip');

    archive.pipe(res);

    // 添加 tokens.json 文件到 ZIP
    archive.append(JSON.stringify(exportData, null, 2), { name: 'tokens.json' });

    await archive.finalize();
  } catch (error) {
    await addLog('error', `批量导出失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 批量导入 Token (ZIP格式)
router.post('/tokens/import', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请上传文件' });
    }

    await addLog('info', '正在导入 Token 账号...');
    const result = await importTokens(req.file.path);
    await addLog('success', `成功导入 ${result.count} 个 Token 账号`);
    res.json(result);
  } catch (error) {
    await addLog('error', `导入失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// 获取系统设置
router.get('/settings', async (req, res) => {
  try {
    const settings = await loadSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 保存系统设置
router.post('/settings', async (req, res) => {
  try {
    const result = await saveSettings(req.body);
    await addLog('success', '系统设置已更新');
    res.json(result);
  } catch (error) {
    await addLog('error', `保存设置失败: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

export default router;
export { incrementRequestCount, addLog };
