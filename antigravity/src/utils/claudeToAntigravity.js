import {
  generateProjectId,
  generateRequestId
} from './utils.js';
import config from '../config/config.js';

const DEFAULT_STOP_SEQUENCES = [
  '<|user|>',
  '<|bot|>',
  '<|context_request|>',
  '<|endoftext|>',
  '<|end_of_turn|>'
];

// 直接透传的模型
const SUPPORTED_MODELS = new Set([
  'gemini-2.5-flash',
  'gemini-2.5-flash-thinking',
  'gemini-2.5-pro',
  'gemini-3-pro-low',
  'gemini-3-pro-high',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash-image',
  'gemini-3-pro-image',
  'claude-sonnet-4-5',
  'claude-sonnet-4-5-thinking',
  'gpt-oss-120b-medium'
]);

// Claude 别名映射
const CLAUDE_MODEL_MAP = {
  'claude-sonnet-4.5': 'claude-sonnet-4-5',
  'claude-opus-4': 'gemini-3-pro-high',
  'claude-sonnet-4-5-20250929': 'claude-sonnet-4-5',
  'claude-haiku-4-5-20251001': 'gemini-2.5-flash-lite'
};

const DEFAULT_GEMINI_MODEL = 'claude-sonnet-4-5';

function mapUsage(usage) {
  if (!usage || typeof usage !== 'object') return { inputTokens: 0, outputTokens: 0 };
  const inputTokens = usage.promptTokenCount ?? usage.prompt_tokens ?? usage.input_tokens ?? 0;
  const outputTokens = usage.candidatesTokenCount ?? usage.output_tokens ?? 0;
  return { inputTokens, outputTokens };
}

/**
 * Gemini API 不支持的 JSON Schema 关键字黑名单
 * 这些关键字会导致 "JSON schema is invalid" 错误
 */
const UNSUPPORTED_SCHEMA_KEYS = new Set([
  // 草案/元信息
  '$schema', '$id', '$defs', 'definitions',
  // 组合逻辑
  'allOf', 'anyOf', 'oneOf', 'not', 'if', 'then', 'else',
  // 正则/模式类
  'pattern', 'patternProperties', 'propertyNames',
  // 字符串约束（重点：minLength/maxLength 会导致 tools.10 错误）
  'minLength', 'maxLength',
  // 数组约束
  'minItems', 'maxItems', 'uniqueItems', 'contains',
  // 数值约束
  'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf',
  // 依赖相关
  'dependentSchemas', 'dependentRequired',
  // 评估相关
  'additionalItems', 'unevaluatedItems', 'unevaluatedProperties',
  // 其他
  'additionalProperties'
]);

/**
 * 规范化 JSON Schema，移除 Gemini 不支持的关键字
 * 只保留基本的 type/properties/required/items/enum/description/format/default
 */
function cleanJsonSchema(schema) {
  if (!schema || typeof schema !== 'object') return schema;

  // 处理数组
  if (Array.isArray(schema)) {
    return schema.map(item => cleanJsonSchema(item));
  }

  // 深拷贝对象
  const cleaned = { ...schema };

  // 删除黑名单中的所有关键字
  for (const key of Object.keys(cleaned)) {
    if (UNSUPPORTED_SCHEMA_KEYS.has(key)) {
      delete cleaned[key];
    }
  }

  // 递归处理 properties
  if (cleaned.properties !== undefined) {
    if (typeof cleaned.properties === 'object' && !Array.isArray(cleaned.properties)) {
      const processed = {};
      for (const [propKey, propValue] of Object.entries(cleaned.properties)) {
        processed[propKey] = cleanJsonSchema(propValue);
      }
      cleaned.properties = processed;
    }
  }

  // 递归处理 items
  if (cleaned.items !== undefined) {
    cleaned.items = cleanJsonSchema(cleaned.items);
  }

  return cleaned;
}

function convertClaudeToolsToAntigravity(tools = []) {
  if (!tools || tools.length === 0) return [];

  return tools.map((tool, index) => {
    const name = tool.name || tool.function?.name || `tool_${index}`;
    const description = tool.description || tool.function?.description || '';
    const parameters = cleanJsonSchema(tool.input_schema || tool.function?.parameters || {});

    return {
      functionDeclarations: [
        {
          name,
          description,
          parameters
        }
      ]
    };
  });
}

function buildGenerationConfig(claudeRequest, modelName = '') {
  const config = {
    temperature: claudeRequest.temperature ?? 0.4,
    topP: 1,
    topK: 40,
    candidateCount: 1,
    maxOutputTokens: claudeRequest.max_tokens,
    stopSequences: DEFAULT_STOP_SEQUENCES
  };

  // gemini-2.5-flash-image 不支持 thinkingConfig 参数
  const isImageModel = modelName.endsWith('-image');
  if (!isImageModel) {
    // 判断是否启用 thinking
    const enableThinking = modelName.endsWith('-thinking') ||
      modelName === 'gemini-2.5-pro' ||
      modelName.startsWith('gemini-3-pro-');

    config.thinkingConfig = {
      includeThoughts: enableThinking,
      thinkingBudget: enableThinking ? 1024 : 0
    };

    // Claude 模型启用 thinking 时需要删除 topP
    if (enableThinking && modelName.includes('claude')) {
      delete config.topP;
    }
  }

  return config;
}

function convertContentParts(content, toolNameMap, markAsThought = false) {
  const parts = [];
  const blocks = Array.isArray(content) ? content : content ? [content] : [];

  // 字符串内容直接转成单一文本块
  if (typeof content === 'string') {
    let textContent = content;
    if (markAsThought) {
      // 对于 image 模型，移除图片相关的 markdown 标记
      textContent = textContent.replace(/!\[.*?\]\(data:image\/[^)]+\)/g, '');
      textContent = textContent.replace(/\[图像生成完成[^\]]*\]/g, '');
      textContent = textContent.replace(/\n{3,}/g, '\n\n').trim();
      if (textContent) {
        parts.push({ text: textContent, thought: true });
      }
    } else {
      parts.push({ text: textContent });
    }
    return parts;
  }

  for (const block of blocks) {
    if (!block) continue;

    if (block.type === 'text' || typeof block === 'string') {
      let textContent = block.text || block;
      if (markAsThought) {
        // 对于 image 模型，移除图片相关的 markdown 标记并标记为 thought
        textContent = textContent.replace(/!\[.*?\]\(data:image\/[^)]+\)/g, '');
        textContent = textContent.replace(/\[图像生成完成[^\]]*\]/g, '');
        textContent = textContent.replace(/\n{3,}/g, '\n\n').trim();
        if (textContent) {
          parts.push({ text: textContent, thought: true });
        }
      } else {
        parts.push({ text: textContent });
      }
      continue;
    }

    if (block.type === 'image') {
      const mediaType = block.source?.media_type || 'image/png';
      const data = block.source?.data || '';
      if (data) {
        parts.push({
          inlineData: {
            mimeType: mediaType,
            data
          }
        });
      }
      continue;
    }

    if (block.type === 'tool_use') {
      const input = block.input || {};
      const part = {
        functionCall: {
          id: block.id,
          name: block.name,
          args: input
        }
      };
      toolNameMap.set(block.id, block.name);
      parts.push(part);
      continue;
    }

    if (block.type === 'tool_result') {
      const name = block.name || toolNameMap.get(block.tool_use_id) || '';
      let output = '';
      if (Array.isArray(block.content)) {
        output = block.content[0]?.text || '';
      } else if (typeof block.content === 'string') {
        output = block.content;
      }
      const part = {
        functionResponse: {
          id: block.tool_use_id,
          name,
          response: { output }
        }
      };
      parts.push(part);
      continue;
    }

    // 未识别的块直接以字符串形式保留，避免信息丢失
    const textContent = String(block);
    if (markAsThought) {
      parts.push({ text: textContent, thought: true });
    } else {
      parts.push({ text: textContent });
    }
  }

  return parts;
}

function convertSystemInstruction(system) {
  if (typeof system === 'string') {
    return {
      role: 'user',
      parts: [{ text: system }]
    };
  }

  if (Array.isArray(system)) {
    const parts = system.map((item) => {
      if (item?.type === 'image') {
        return {
          inlineData: {
            mimeType: item.source?.media_type || 'image/png',
            data: item.source?.data || ''
          }
        };
      }
      return {
        text: item?.text || ''
      };
    });

    return {
      role: 'user',
      parts
    };
  }

  return undefined;
}

function convertClaudeMessagesToAntigravity(messages = [], modelName = '') {
  const antigravityMessages = [];
  const toolNameMap = new Map();
  const isImageModel = modelName.endsWith('-image');

  for (const message of messages) {
    if (!message) continue;
    // 非 user 角色统一按模型侧输出，以保持 Claude 语义
    const role = message.role === 'user' ? 'user' : 'model';
    const isAssistant = message.role !== 'user';
    const parts = convertContentParts(message.content, toolNameMap, isImageModel && isAssistant);

    antigravityMessages.push({ role, parts });
  }

  return antigravityMessages;
}

function mapClaudeModelToGemini(model = '') {
  if (!model) return DEFAULT_GEMINI_MODEL;

  if (SUPPORTED_MODELS.has(model)) return model;

  if (CLAUDE_MODEL_MAP[model]) return CLAUDE_MODEL_MAP[model];

  return DEFAULT_GEMINI_MODEL;
}

function convertClaudeRequestToAntigravity(claudeRequest = {}) {
  const model = mapClaudeModelToGemini(claudeRequest.model);
  const tools = convertClaudeToolsToAntigravity(claudeRequest.tools);
  const project =
    claudeRequest.project ||
    config?.api?.projectId ||
    process.env.GEMINI_PROJECT_ID ||
    generateProjectId();

  const request = {
    project,
    requestId: generateRequestId(),
    request: {
      contents: convertClaudeMessagesToAntigravity(claudeRequest.messages, model),
      generationConfig: buildGenerationConfig(claudeRequest, model),
      sessionId: '-3750763034362895578'
    },
    model,
    userAgent: 'antigravity/1.11.3 darwin/arm64',
    requestType: 'agent'
  };

  const systemInstruction = convertSystemInstruction(claudeRequest.system);
  if (systemInstruction) {
    request.request.systemInstruction = systemInstruction;
  }

  if (tools.length > 0) {
    request.request.tools = tools;
    request.request.toolConfig = {
      functionCallingConfig: {
        mode: 'VALIDATED'
      }
    };
  }

  return request;
}

function formatEvent(type, payload) {
  return `event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`;
}

function convertAntigravityStreamToClaude(antigravityLine, state = {}) {
  if (!antigravityLine || typeof antigravityLine !== 'string') return '';

  const trimmed = antigravityLine.trim();
  if (!trimmed || trimmed === 'data: [DONE]' || trimmed === '[DONE]') return '';

  if (!state.messageStarted) {
    state.messageStarted = true;
    state.messageId = 'msg_gemini';
    state.currentIndex = -1;
    state.inputTokens = 0;
    state.outputTokens = 0;
    const model = state.model || '';

    return formatEvent('message_start', {
      type: 'message_start',
      message: {
        id: state.messageId,
        type: 'message',
        role: 'assistant',
        content: [],
        model,
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 0, output_tokens: 0 }
      }
    }) + convertAntigravityStreamToClaude(antigravityLine, state);
  }

  const jsonStr = trimmed.startsWith('data:') ? trimmed.slice(5).trim() : trimmed;

  let payload;
  try {
    payload = JSON.parse(jsonStr);
  } catch (error) {
    return '';
  }

  const events = [];
  const response = payload.response || payload;
  const candidate = response?.candidates?.[0];
  if (!candidate) return '';

  const parts = candidate.content?.parts || [];
  const usage = mapUsage(response.usageMetadata);
  state.inputTokens = usage.inputTokens;
  state.outputTokens = usage.outputTokens;

  for (const part of parts) {
    if (part.text) {
      if (state.currentIndex === -1 || state.lastBlockType !== 'text') {
        state.currentIndex += 1;
        state.lastBlockType = 'text';
        events.push(
          formatEvent('content_block_start', {
            type: 'content_block_start',
            index: state.currentIndex,
            content_block: { type: 'text', text: '' }
          })
        );
      }

      events.push(
        formatEvent('content_block_delta', {
          type: 'content_block_delta',
          index: state.currentIndex,
          delta: { type: 'text_delta', text: part.text }
        })
      );
    } else if (part.functionCall) {
      const func = part.functionCall;
      state.currentIndex += 1;
      state.lastBlockType = 'tool_use';

      events.push(
        formatEvent('content_block_start', {
          type: 'content_block_start',
          index: state.currentIndex,
          content_block: {
            type: 'tool_use',
            id: func.id || `toolu_${state.currentIndex}`,
            name: func.name,
            input: {}
          }
        })
      );

      events.push(
        formatEvent('content_block_delta', {
          type: 'content_block_delta',
          index: state.currentIndex,
          delta: {
            type: 'input_json_delta',
            partial_json: JSON.stringify(func.args || {})
          }
        })
      );

      events.push(
        formatEvent('content_block_stop', {
          type: 'content_block_stop',
          index: state.currentIndex
        })
      );
    }
  }

  if (candidate.finishReason) {
    if (state.lastBlockType === 'text') {
      events.push(
        formatEvent('content_block_stop', {
          type: 'content_block_stop',
          index: state.currentIndex
        })
      );
    }

    events.push(
      formatEvent('message_delta', {
        type: 'message_delta',
        delta: { stop_reason: 'end_turn', stop_sequence: null },
        usage: {
          input_tokens: state.inputTokens,
          output_tokens: state.outputTokens
        }
      })
    );

    events.push(formatEvent('message_stop', { type: 'message_stop' }));
  }

  return events.join('');
}

function convertAntigravityNonStreamToClaude(
  fullContent,
  toolCalls = [],
  thinkingContent = '',
  requestModel
) {
  const content = [];

  if (fullContent) {
    content.push({ type: 'text', text: fullContent });
  }

  for (const call of toolCalls) {
    content.push({
      type: 'tool_use',
      id: call.id,
      name: call.function?.name,
      input: (() => {
        try {
          return JSON.parse(call.function?.arguments || '{}');
        } catch (error) {
          return call.function?.arguments || {};
        }
      })()
    });
  }

  return {
    id: 'msg_gemini',
    type: 'message',
    role: 'assistant',
    model: requestModel,
    content,
    stop_reason: 'end_turn',
    stop_sequence: null,
    usage: undefined
  };
}

export {
  convertClaudeRequestToAntigravity,
  convertAntigravityStreamToClaude,
  convertAntigravityNonStreamToClaude
};
