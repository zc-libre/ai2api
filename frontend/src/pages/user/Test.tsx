import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { chatApi } from '@/services/api'
import {
  TestTube,
  Send,
  Loader2,
  Copy,
  Check,
} from 'lucide-react'

const MODELS = [
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
]

export function UserTest() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('gemini-2.0-flash')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleTest = async () => {
    if (!apiKey) {
      setError('请输入 API 密钥')
      return
    }
    if (!message) {
      setError('请输入测试消息')
      return
    }

    setLoading(true)
    setError(null)
    setResponse('')

    try {
      const res = await chatApi.test(apiKey, model, message)
      setResponse(JSON.stringify(res, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : '请求失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            API 测试
          </CardTitle>
          <CardDescription>
            测试您的 API 密钥是否可以正常使用
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>API 密钥</Label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入您的 API 密钥"
              />
            </div>
            <div className="space-y-2">
              <Label>模型</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>测试消息</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入测试消息，例如：你好，请介绍一下你自己"
              rows={4}
            />
          </div>

          <Button onClick={handleTest} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            发送测试
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>响应结果</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                复制
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-lg overflow-auto max-h-[400px] text-sm">
              {response}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

