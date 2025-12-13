# Dockerfile - 优化版本，使用Nginx默认配置
# 第一阶段：构建应用
FROM node:24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖（包括开发依赖，用于构建）
RUN npm install

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：创建静态文件服务器镜像
FROM nginx:alpine

# 复制自定义Nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建产物到Nginx的默认文档根目录
COPY --from=builder /app/dist /app

# 复制配置文件到Nginx默认目录下的config文件夹
COPY config /app/config

# 设置目录权限，确保Nginx进程可以访问
RUN chmod -R 755 /app && chown -R nginx:nginx /app

# 暴露Nginx默认端口
EXPOSE 3018

# 启动Nginx（使用默认配置）
CMD ["nginx", "-g", "daemon off;"]