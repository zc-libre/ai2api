# Antigravity API Frontend

基于 React + TypeScript + TailwindCSS + Shadcn/UI 构建的前端管理界面。

## 技术栈

- **Vite** - 构建工具
- **React 18** + **TypeScript**
- **TailwindCSS v4** - 样式框架
- **Shadcn/UI** - UI 组件库
- **React Router v6** - 路由
- **Lucide React** - 图标

## 项目结构

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # 布局组件
│   │   │   ├── Sidebar.tsx  # 左侧边栏
│   │   │   ├── Header.tsx   # 顶部栏
│   │   │   └── MainLayout.tsx
│   │   └── ui/              # Shadcn/UI 组件
│   ├── pages/
│   │   ├── admin/           # 管理控制台页面
│   │   └── user/            # 用户中心页面
│   ├── hooks/               # 自定义 Hooks
│   ├── lib/                 # 工具函数
│   ├── services/            # API 服务
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 路由

- `/admin` - 管理控制台
- `/admin/login` - 管理员登录
- `/user` - 用户中心
- `/login` - 用户登录

## API 代理

开发模式下，Vite 会自动将 `/api`、`/admin`、`/user` 请求代理到后端服务器 (默认 `http://localhost:3000`)。

可以在 `vite.config.ts` 中修改代理配置。
