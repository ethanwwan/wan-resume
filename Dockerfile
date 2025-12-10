# Dockerfile
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

# 复制自定义Nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建产物到Nginx的静态文件目录
COPY --from=builder /app/dist /app

# 复制配置文件到Nginx配置目录
COPY config /app/config

# 设置目录权限，确保Nginx进程可以访问
RUN chmod -R 755 /app && chown -R nginx:nginx /app

# 暴露端口,Nginx默认监听3018端口
EXPOSE 3018

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]