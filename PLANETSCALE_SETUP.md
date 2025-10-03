# 🗄️ PlanetScale 数据库配置指南

## 📋 **配置步骤**

### 1. 注册PlanetScale账户
1. 访问 [planetscale.com](https://planetscale.com)
2. 点击 **"Start building for free"**
3. 使用GitHub账户登录（推荐）

### 2. 创建数据库
1. 登录后，点击 **"Create database"**
2. 输入数据库名称：`stem-splitter-db`
3. 选择地区：**Asia Pacific (Singapore)** 或 **US East**
4. 点击 **"Create database"**

### 3. 获取连接信息
创建数据库后，您会看到连接信息：

```
Host: [类似: aws.connect.psdb.cloud]
Username: [类似: root]
Password: [自动生成]
Database: stem-splitter-db
Port: 3306
```

### 4. 更新环境变量
在 `api/.env` 文件中添加：

```env
# PlanetScale数据库配置
DATABASE_HOST=your_host_here
DATABASE_USERNAME=your_username_here
DATABASE_PASSWORD=your_password_here
DATABASE_NAME=stem-splitter-db
DATABASE_PORT=3306
```

### 5. 创建数据库表
1. 在PlanetScale控制台，点击 **"Console"**
2. 选择您的数据库
3. 点击 **"New branch"** 创建开发分支
4. 在SQL编辑器中执行 `planetscale-schema.sql` 文件内容

### 6. 运行迁移脚本
```bash
cd api
node scripts/migrate-to-planetscale.js
```

## 🎯 **优势对比**

| 特性 | Supabase | PlanetScale | 提升 |
|------|----------|-------------|------|
| **免费存储** | 500MB | 5GB | **10倍** |
| **连接数** | 60 | 1000 | **16倍** |
| **查询性能** | 标准 | 无服务器 | **更快** |
| **自动扩展** | 有限 | 完全自动 | **更稳定** |
| **分支管理** | 无 | 支持 | **开发友好** |

## 🔧 **高级功能**

### 分支管理
- **主分支** - 生产环境
- **开发分支** - 开发测试
- **功能分支** - 新功能开发

### 自动扩展
- 根据负载自动调整
- 无需手动配置
- 按使用量计费

### 性能优化
- 自动索引优化
- 查询缓存
- 连接池管理

## 📊 **监控和分析**

### 使用情况监控
- 查询性能分析
- 连接数统计
- 存储使用情况

### 成本控制
- 实时使用量显示
- 预算告警
- 成本预测

## 🚀 **下一步**

配置完成后，继续：
1. 数据库优化（索引、查询优化）
2. 服务器部署（Railway）
3. 监控配置
4. 性能测试

## ❓ **需要帮助？**

如果遇到问题：
1. 检查连接信息是否正确
2. 确认网络连接正常
3. 查看PlanetScale文档
4. 联系技术支持
