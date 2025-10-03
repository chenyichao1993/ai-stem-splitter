// 测试PlanetScale数据库连接
require('dotenv').config();

console.log('🔧 PlanetScale配置测试:');
console.log('Host:', process.env.DATABASE_HOST);
console.log('Username:', process.env.DATABASE_USERNAME);
console.log('Database:', process.env.DATABASE_NAME);
console.log('Port:', process.env.DATABASE_PORT);

// 测试数据库连接
const { query } = require('./src/config/database');

async function testConnection() {
  try {
    console.log('\n🌐 测试PlanetScale连接...');
    
    // 测试基本连接
    const result = await query('SELECT 1 as test');
    if (result.success) {
      console.log('✅ PlanetScale连接成功!');
      console.log('测试查询结果:', result.data[0]);
    } else {
      console.log('❌ PlanetScale连接失败:', result.error);
      return;
    }
    
    // 测试表是否存在
    console.log('\n📊 检查数据库表...');
    const tables = await query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ?
    `, [process.env.DATABASE_NAME]);
    
    if (tables.success) {
      console.log('✅ 数据库表检查完成');
      console.log('现有表:', tables.data.map(t => t.TABLE_NAME));
    } else {
      console.log('❌ 数据库表检查失败:', tables.error);
    }
    
    // 测试用户表
    console.log('\n👥 测试用户表...');
    const userCount = await query('SELECT COUNT(*) as count FROM users');
    if (userCount.success) {
      console.log('✅ 用户表正常');
      console.log('用户数量:', userCount.data[0].count);
    } else {
      console.log('❌ 用户表测试失败:', userCount.error);
    }
    
    // 测试音频文件表
    console.log('\n🎵 测试音频文件表...');
    const fileCount = await query('SELECT COUNT(*) as count FROM audio_files');
    if (fileCount.success) {
      console.log('✅ 音频文件表正常');
      console.log('文件数量:', fileCount.data[0].count);
    } else {
      console.log('❌ 音频文件表测试失败:', fileCount.error);
    }
    
    console.log('\n🎉 PlanetScale数据库测试完成！');
    
  } catch (error) {
    console.error('❌ 测试过程中出错:', error.message);
  }
}

// 运行测试
testConnection();
