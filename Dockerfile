# 使用官方 Node.js 18 LTS 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（仅生产依赖）
RUN npm ci --only=production

# 复制项目文件
COPY src/ ./src/
COPY scripts/ ./scripts/
COPY public/ ./public/

# 创建数据目录
RUN mkdir -p /app/data

# 暴露端口
EXPOSE 8045

# 设置环境变量
ENV NODE_ENV=production

# 启动服务
CMD ["node", "src/server/index.js"]
