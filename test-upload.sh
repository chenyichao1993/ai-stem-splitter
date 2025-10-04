#!/bin/bash

# 文件上传测试脚本

echo "🧪 测试文件上传功能"
echo "================================"

# 检查是否有测试文件
if [ ! -f "test-audio.mp3" ]; then
    echo "❌ 请先准备一个测试音频文件，命名为 test-audio.mp3"
    echo "📝 建议："
    echo "   - 文件大小：< 10MB"
    echo "   - 文件格式：MP3, WAV, FLAC"
    echo "   - 文件名：使用英文，避免中文"
    exit 1
fi

echo "📁 找到测试文件：test-audio.mp3"
echo "📊 文件大小：$(ls -lh test-audio.mp3 | awk '{print $5}')"
echo ""

# 测试上传
echo "🚀 开始上传测试..."
curl -X POST \
  -F "audio=@test-audio.mp3" \
  "https://ai-stem-splitter-fown.onrender.com/api/upload" \
  -H "Content-Type: multipart/form-data" \
  -v

echo ""
echo "✅ 上传测试完成"

