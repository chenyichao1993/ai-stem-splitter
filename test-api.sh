#!/bin/bash

# API测试脚本

echo "🧪 测试AI音频分离API服务"
echo "================================"

# 1. 测试健康检查
echo "1. 测试健康检查端点..."
curl -X GET "https://ai-stem-splitter-fown.onrender.com/health"
echo -e "\n"

# 2. 测试上传端点（需要音频文件）
echo "2. 测试上传端点..."
echo "注意：需要提供音频文件路径"
echo "示例：curl -X POST -F 'audio=@your-audio-file.mp3' https://ai-stem-splitter-fown.onrender.com/api/upload"
echo ""

# 3. 测试处理端点
echo "3. 测试处理端点..."
echo "注意：需要先上传文件获得fileId"
echo "示例：curl -X POST -H 'Content-Type: application/json' -d '{\"fileId\":\"your-file-id\"}' https://ai-stem-splitter-fown.onrender.com/api/process"
echo ""

echo "✅ API测试脚本完成"

