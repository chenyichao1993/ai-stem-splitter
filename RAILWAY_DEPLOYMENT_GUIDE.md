# 🚀 Railway部署完整指南

## 📋 **第一步：准备GitHub仓库**

### 1. 创建GitHub仓库
1. 访问 [github.com](https://github.com)
2. 点击 "New repository"
3. 仓库名称：`ai-stem-splitter`
4. 设置为 Public（免费Railway需要）
5. 点击 "Create repository"

### 2. 连接本地仓库到GitHub
```bash
# 在项目根目录执行
git remote add origin https://github.com/你的用户名/ai-stem-splitter.git
git branch -M main
git push -u origin main
```

## 📋 **第二步：创建Railway项目**

### 1. 注册Railway账户
1. 访问 [railway.app](https://railway.app)
2. 点击 "Login"
3. 选择 "Login with GitHub"
4. 授权Railway访问您的GitHub

### 2. 创建新项目
1. 在Railway控制台点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择您的 `ai-stem-splitter` 仓库
4. 点击 "Deploy Now"

## 📋 **第三步：配置环境变量**

### 1. 在Railway项目设置中添加环境变量
点击项目 → Settings → Variables，添加以下变量：

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

### 2. 配置服务设置
1. 点击服务名称
2. 在 "Settings" 标签页中：
   - **Root Directory**: `api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## 📋 **第四步：部署配置**

### 1. 创建Procfile（可选）
在 `api` 目录创建 `Procfile`：
```
web: npm start
```

### 2. 配置package.json
确保 `api/package.json` 包含：
```json
{
  "scripts": {
    "start": "node src/index.js",
    "cleanup": "node scripts/cleanup-expired-files.js",
    "scheduler": "node scripts/scheduler.js"
  }
}
```

## 📋 **第五步：部署和测试**

### 1. 自动部署
- Railway会自动检测到代码推送
- 开始构建和部署过程
- 等待部署完成（通常2-5分钟）

### 2. 获取部署URL
- 部署完成后，Railway会提供URL
- 格式：`https://your-app-name.railway.app`

### 3. 测试功能
1. 访问部署的URL
2. 上传音频文件测试
3. 检查处理功能
4. 验证24小时删除提醒

## 📋 **第六步：配置自定义域名（可选）**

### 1. 添加自定义域名
1. 在Railway项目设置中
2. 点击 "Domains"
3. 添加您的域名
4. 配置DNS记录

### 2. 更新环境变量
更新 `FRONTEND_URL` 为您的自定义域名

## 📋 **第七步：监控和优化**

### 1. 监控资源使用
- 查看Railway仪表板
- 监控CPU、内存使用率
- 检查日志输出

### 2. 性能优化
- 如果资源不足，考虑升级到Hobby计划
- 优化代码减少资源使用
- 配置缓存策略

## 📋 **第八步：升级计划（如需要）**

### 1. 升级到Hobby计划（$5/月）
- 8 GB RAM, 8 vCPU
- $5 credits包含
- 更好的性能

### 2. 升级到Pro计划（$20/月）
- 32 GB RAM, 32 vCPU
- $20 credits包含
- 优先支持

## 🎯 **预期结果**

### 免费计划限制
- 0.5 GB RAM, 1 vCPU
- 可能处理时间较长
- 并发用户数有限

### 升级后效果
- 更快的处理速度
- 支持更多并发用户
- 更好的稳定性

## 🚨 **故障排除**

### 常见问题
1. **部署失败**：检查环境变量配置
2. **内存不足**：升级到Hobby计划
3. **处理超时**：优化代码或升级计划
4. **API错误**：检查Supabase和Cloudinary配置

### 获取帮助
- Railway文档：https://docs.railway.app
- 社区支持：https://discord.gg/railway
- GitHub Issues：在项目仓库中提交问题

---

## 🎉 **部署完成！**

部署成功后，您的AI音频分离服务将：
- ✅ 支持真实音频分离
- ✅ 24小时自动删除
- ✅ 全球用户访问
- ✅ 自动扩展和监控

**开始部署吧！有任何问题随时询问！**
