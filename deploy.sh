#!/bin/bash

# Railway部署脚本

echo "🚀 开始部署到Railway..."

# 1. 检查环境变量
echo "📋 检查环境变量..."
if [ -z "$CLOUDINARY_CLOUD_NAME" ]; then
    echo "❌ 缺少CLOUDINARY_CLOUD_NAME环境变量"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "❌ 缺少NEXT_PUBLIC_SUPABASE_URL环境变量"
    exit 1
fi

echo "✅ 环境变量检查通过"

# 2. 安装依赖
echo "📦 安装依赖..."
cd api
npm install

# 3. 测试清理功能
echo "🧹 测试清理功能..."
npm run cleanup

# 4. 启动服务
echo "🚀 启动服务..."
npm start
