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
      // API 代理配置 - 使用 /api 前缀避免与前端路由冲突
      '/api': {
        target: 'http://localhost:8045',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 /api 前缀
      },
      // Claude API 代理
      '/v1': {
        target: 'http://localhost:8045',
        changeOrigin: true,
      },
    },
  },
})
