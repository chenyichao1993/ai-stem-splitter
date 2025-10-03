# 🚀 Railway部署指南

## 📋 部署步骤

### 1. 创建Railway项目
1. 访问 [railway.app](https://railway.app)
2. 使用GitHub登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择您的项目仓库

### 2. 配置环境变量
在Railway项目设置中添加以下环境变量：

```env
# 生产环境
NODE_ENV=production

# Cloudinary配置
CLOUDINARY_CLOUD_NAME=dbxdnfxgn
CLOUDINARY_API_KEY=198978315298228
CLOUDINARY_API_SECRET=X769Ccnuw6kx8NDocXDReY6LAmk

# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=https://vantbrqbbsvwqsrilmoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnRicnFiYnN2d3FzcmlsbW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODc5MDAsImV4cCI6MjA3NDk2MzkwMH0.UFGUP1WTT1B6aM0B_DNHBVcL-abwn4tW66tbc3UbRSc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnRicnFiYnN2d3FzcmlsbW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTM4NzkwMCwiZXhwIjoyMDc0OTYzOTAwfQ.FVPj2-3Qx7V-Gk5SHMP6ZcG0qrvVHvza-jjL0I8e4bs

# 前端URL（部署后更新）
FRONTEND_URL=https://your-app.railway.app
```

### 3. 部署配置
Railway会自动检测到package.json并部署

### 4. 域名配置
- Railway会提供免费域名：`your-app.railway.app`
- 可以配置自定义域名

## 🔧 部署后配置

### 1. 更新前端API URL
在Railway部署后，更新前端的API URL

### 2. 测试功能
- 上传音频文件
- 测试分离功能
- 验证24小时删除

### 3. 监控性能
- 查看Railway仪表板
- 监控资源使用
- 检查日志

## 📊 性能监控

### 关键指标
- CPU使用率
- 内存使用率
- 响应时间
- 错误率

### 升级建议
- 如果CPU使用率>80%：考虑升级
- 如果内存使用率>80%：考虑升级
- 如果响应时间>10秒：考虑升级

## 🎯 预期效果

### 免费计划
- 支持小量用户（<100用户/天）
- 处理时间：30-60秒
- 成本：$1/月

### Hobby计划（$5/月）
- 支持中等用户量（<1000用户/天）
- 处理时间：10-30秒
- 更好的性能

### Pro计划（$20/月）
- 支持大量用户（>1000用户/天）
- 处理时间：5-15秒
- 高并发支持
