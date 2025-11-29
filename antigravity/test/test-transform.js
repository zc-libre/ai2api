import { generateRequestBody } from './utils.js';

// 测试场景：user -> assistant -> assistant(工具调用,无content) -> tool1结果 -> tool2结果
const testMessages = [
  {
    role: "user",
    content: "帮我查询天气和新闻"
  },
  {
    role: "assistant",
    content: "好的，我来帮你查询。"
  },
  {
    role: "assistant",
    content: "",
    tool_calls: [
      {
        id: "call_001",
        type: "function",
        function: {
          name: "get_weather",
          arguments: JSON.stringify({ city: "北京" })
        }
      },
      {
        id: "call_002",
        type: "function",
        function: {
          name: "get_news",
          arguments: JSON.stringify({ category: "科技" })
        }
      }
    ]
  },
  {
    role: "tool",
    tool_call_id: "call_001",
    content: "北京今天晴，温度25度"
  },
  {
    role: "tool",
    tool_call_id: "call_002",
    content: "最新科技新闻：AI技术突破"
  }
];

const testTools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "获取天气信息",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_news",
      description: "获取新闻",
      parameters: {
        type: "object",
        properties: {
          category: { type: "string" }
        }
      }
    }
  }
];

console.log("=== 测试消息转换 ===\n");
console.log("输入 OpenAI 格式消息:");
console.log(JSON.stringify(testMessages, null, 2));

const result = generateRequestBody(testMessages, "claude-sonnet-4-5", {}, testTools);

console.log("\n=== 转换后的 Antigravity 格式 ===\n");
console.log(JSON.stringify(result.request.contents, null, 2));

console.log("\n=== 验证结果 ===");
const contents = result.request.contents;
console.log(`✓ 消息数量: ${contents.length}`);
console.log(`✓ 第1条 (user): ${contents[0]?.role === 'user' ? '✓' : '✗'}`);
console.log(`✓ 第2条 (model): ${contents[1]?.role === 'model' ? '✓' : '✗'}`);
console.log(`✓ 第3条 (model+tools): ${contents[2]?.role === 'model' && contents[2]?.parts?.length === 2 ? '✓' : '✗'}`);
console.log(`✓ 第4条 (tool1 response): ${contents[3]?.role === 'user' && contents[3]?.parts[0]?.functionResponse ? '✓' : '✗'}`);
console.log(`✓ 第5条 (tool2 response): ${contents[4]?.role === 'user' && contents[4]?.parts[0]?.functionResponse ? '✓' : '✗'}`);
