// PlanetScale数据库配置
const mysql = require('mysql2/promise');

// 数据库连接配置
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT || 3306,
  ssl: {
    rejectUnauthorized: true
  },
  // 连接池配置
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// 创建连接池
let pool = null;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// 执行查询
async function query(sql, params = []) {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(sql, params);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
}

// 执行事务
async function transaction(callback) {
  const connection = await getConnection();
  const conn = await connection.getConnection();
  
  try {
    await conn.beginTransaction();
    const result = await callback(conn);
    await conn.commit();
    return { success: true, data: result };
  } catch (error) {
    await conn.rollback();
    console.error('Transaction error:', error);
    return { success: false, error: error.message };
  } finally {
    conn.release();
  }
}

// 关闭连接池
async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = {
  getConnection,
  query,
  transaction,
  closePool
};
