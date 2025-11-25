import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Globe,
  Lock,
  Clock,
  Lightbulb,
  Link,
} from 'lucide-react'

export function ApiDocs() {
  const baseUrl = window.location.origin

  return (
    <div className="space-y-6">
      {/* API 端点概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API 端点概览
          </CardTitle>
          <CardDescription>
            可用的 API 端点列表
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-green-500">GET</Badge>
              <div className="flex-1">
                <code className="text-sm font-semibold">/v1/models</code>
                <p className="text-sm text-muted-foreground">获取可用模型列表</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-blue-500">POST</Badge>
              <div className="flex-1">
                <code className="text-sm font-semibold">/v1/chat/completions</code>
                <p className="text-sm text-muted-foreground">聊天补全接口（OpenAI 兼容格式）</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-green-500">GET</Badge>
              <div className="flex-1">
                <code className="text-sm font-semibold">/admin/status</code>
                <p className="text-sm text-muted-foreground">获取系统状态</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">基础 URL：</span>
              <code className="ml-2">{baseUrl}</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 请求参数详解 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            请求参数详解
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chat">
            <TabsList>
              <TabsTrigger value="chat">聊天补全</TabsTrigger>
              <TabsTrigger value="models">模型列表</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="space-y-4">
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <code className="font-semibold">model</code>
                  <Badge variant="destructive">必填</Badge>
                </div>
                <p className="text-sm text-muted-foreground">使用的模型名称，如 gemini-2.0-flash</p>
              </div>
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <code className="font-semibold">messages</code>
                  <Badge variant="destructive">必填</Badge>
                </div>
                <p className="text-sm text-muted-foreground">消息数组，每条消息包含 role 和 content</p>
              </div>
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <code className="font-semibold">stream</code>
                  <Badge variant="outline">可选</Badge>
                </div>
                <p className="text-sm text-muted-foreground">是否使用流式响应，默认 false</p>
              </div>
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <code className="font-semibold">temperature</code>
                  <Badge variant="outline">可选</Badge>
                </div>
                <p className="text-sm text-muted-foreground">温度参数，范围 0-2，默认 1</p>
              </div>
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <code className="font-semibold">max_tokens</code>
                  <Badge variant="outline">可选</Badge>
                </div>
                <p className="text-sm text-muted-foreground">最大生成 token 数</p>
              </div>
            </TabsContent>
            <TabsContent value="models">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">
                  GET 请求，无需参数。返回可用模型列表。
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 认证方式 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            认证方式
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            所有 API 请求需要在 Header 中携带 API 密钥：
          </p>
          <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY`}
          </pre>
          <p className="text-sm text-muted-foreground">
            或者通过查询参数传递（不推荐）：
          </p>
          <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
{`/v1/chat/completions?api_key=YOUR_API_KEY`}
          </pre>
        </CardContent>
      </Card>

      {/* 频率限制 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            频率限制
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            API 请求受到频率限制保护。超出限制将返回 429 状态码。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <p className="font-semibold">默认限制</p>
              <p className="text-sm text-muted-foreground">无限制（管理员可配置）</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-semibold">超限响应</p>
              <p className="text-sm text-muted-foreground">HTTP 429 Too Many Requests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            使用建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>优先使用流式响应获得更好的用户体验</li>
            <li>合理设置 max_tokens 以控制成本</li>
            <li>妥善保管 API 密钥，不要在客户端暴露</li>
            <li>实现重试逻辑以应对临时错误</li>
            <li>监控 API 使用量，避免超出配额</li>
          </ul>
        </CardContent>
      </Card>

      {/* 常见集成方式 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            常见集成方式
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl">
            <TabsList>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="curl">
              <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
{`curl ${baseUrl}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gemini-2.0-flash",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}
              </pre>
            </TabsContent>
            <TabsContent value="python">
              <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
{`from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="${baseUrl}/v1"
)

response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`}
              </pre>
            </TabsContent>
            <TabsContent value="javascript">
              <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
{`const response = await fetch('${baseUrl}/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    model: 'gemini-2.0-flash',
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

