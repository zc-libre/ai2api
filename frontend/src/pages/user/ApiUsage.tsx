import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Globe,
  Lock,
  Lightbulb,
  Code,
} from 'lucide-react'

export function UserApiUsage() {
  const baseUrl = window.location.origin

  return (
    <div className="space-y-6">
      {/* API 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            API 使用说明
          </CardTitle>
          <CardDescription>
            了解如何使用 Antigravity API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Antigravity API 提供与 OpenAI 兼容的接口格式，您可以使用任何支持 OpenAI API 的客户端或库来访问我们的服务。
          </p>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">基础 URL：</span>
              <code className="ml-2">{baseUrl}</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 可用模型 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            可用模型
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {[
              'gemini-2.0-flash',
              'gemini-1.5-pro',
              'gemini-1.5-flash',
              'gemini-pro',
              'claude-3-5-sonnet',
              'claude-3-opus',
              'claude-3-sonnet',
              'gpt-4o',
              'gpt-4-turbo',
              'gpt-3.5-turbo',
            ].map((model) => (
              <Badge key={model} variant="outline" className="justify-center py-2">
                {model}
              </Badge>
            ))}
          </div>
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
            在请求头中添加 API 密钥进行认证：
          </p>
          <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY`}
          </pre>
        </CardContent>
      </Card>

      {/* 请求示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            请求示例
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
      {"role": "user", "content": "你好！"}
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
        {"role": "user", "content": "你好！"}
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
      { role: 'user', content: '你好！' }
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
            <li>使用流式响应（stream: true）可以获得更好的用户体验</li>
            <li>合理设置 max_tokens 以控制响应长度</li>
            <li>妥善保管您的 API 密钥，不要在客户端代码中暴露</li>
            <li>实现错误重试机制以应对临时错误</li>
            <li>共享您的 Google Token 可以帮助维护公共资源池</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

