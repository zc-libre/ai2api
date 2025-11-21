import fs from 'fs';
import log from '../utils/logger.js';

const defaultConfig = {
  server: { port: 8045, host: '127.0.0.1' },
  api: {
    url: 'https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:streamGenerateContent?alt=sse',
    modelsUrl: 'https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:fetchAvailableModels',
    host: 'daily-cloudcode-pa.sandbox.googleapis.com',
    userAgent: 'antigravity/1.11.3 windows/amd64'
  },
  defaults: { temperature: 1, top_p: 0.85, top_k: 50, max_tokens: 8096 },
  security: { maxRequestSize: '50mb', apiKey: null },
  systemInstruction: '你是聊天机器人，专门为用户提供聊天和情绪价值，协助进行小说创作或者角色扮演，也可以提供数学或者代码上的建议'
};

let config;
try {
  config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  log.info('✓ 配置文件加载成功');
} catch {
  config = defaultConfig;
  log.warn('⚠ 配置文件未找到，使用默认配置');
}

export default config;
