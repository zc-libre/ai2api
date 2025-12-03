# 单阶段构建：后端服务 + 预构建的前端
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

# 复制预构建的前端静态文件
COPY public/ ./public/

# 创建数据目录
RUN mkdir -p /app/data

# 暴露端口
EXPOSE 8045

# 设置环境变量
ENV NODE_ENV=production

# 启动服务
CMD ["node", "src/server/index.js"]
