# 第一阶段：构建前端
FROM node:18-alpine AS frontend-builder

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /frontend

# 复制前端依赖文件
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# 安装前端依赖
RUN pnpm install --frozen-lockfile

# 复制前端源码
COPY frontend/ ./

# 构建前端
RUN pnpm build

# 第二阶段：构建后端服务
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖（仅生产依赖）
RUN pnpm install --prod --frozen-lockfile

# 复制项目文件
COPY src/ ./src/
COPY scripts/ ./scripts/

# 从前端构建阶段复制构建产物到 public 目录
COPY --from=frontend-builder /frontend/dist ./public/

# 创建数据目录
RUN mkdir -p /app/data

# 暴露端口
EXPOSE 8045

# 设置环境变量
ENV NODE_ENV=production

# 启动服务
CMD ["node", "src/server/index.js"]
