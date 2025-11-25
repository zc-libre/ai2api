import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 只代理 API 请求，不代理前端路由
      '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // 代理后端管理 API
      '/admin/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/verify-session': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/stats': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/status': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/tokens': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/keys': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/announcements': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/users': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/ai-config': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/ai-logs': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/logs': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/settings': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/oauth-config': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/oauth-callback': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/trigger-oauth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/add-token': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/delete-token': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/toggle-token': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/generate-key': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/delete-key': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/run-ai-moderator': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // 用户 API
      '/user/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/profile': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/keys': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/generate-key': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/tokens': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/add-token': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/change-password': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user/announcements': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
