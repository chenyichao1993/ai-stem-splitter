// 定时清理服务 - 每30分钟执行一次
const { cleanupExpiredFiles } = require('./cleanup-expired-files');

class CleanupScheduler {
  constructor() {
    this.intervalId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      console.log('⚠️ Cleanup scheduler is already running');
      return;
    }

    console.log('🚀 Starting cleanup scheduler (every 30 minutes)...');
    
    // 立即执行一次清理
    this.runCleanup();
    
    // 设置定时器，每30分钟执行一次
    this.intervalId = setInterval(() => {
      this.runCleanup();
    }, 30 * 60 * 1000); // 30分钟 = 30 * 60 * 1000 毫秒
    
    this.isRunning = true;
    console.log('✅ Cleanup scheduler started successfully');
  }

  stop() {
    if (!this.isRunning) {
      console.log('⚠️ Cleanup scheduler is not running');
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isRunning = false;
    console.log('🛑 Cleanup scheduler stopped');
  }

  async runCleanup() {
    try {
      console.log(`\n⏰ Running scheduled cleanup at ${new Date().toISOString()}`);
      await cleanupExpiredFiles();
      console.log('✅ Scheduled cleanup completed successfully\n');
    } catch (error) {
      console.error('❌ Scheduled cleanup failed:', error.message);
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      nextRun: this.isRunning ? new Date(Date.now() + 30 * 60 * 1000).toISOString() : null
    };
  }
}

// 创建全局调度器实例
const scheduler = new CleanupScheduler();

// 优雅关闭处理
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, stopping cleanup scheduler...');
  scheduler.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, stopping cleanup scheduler...');
  scheduler.stop();
  process.exit(0);
});

// 如果直接运行此脚本
if (require.main === module) {
  console.log('🚀 Starting standalone cleanup scheduler...');
  scheduler.start();
  
  // 保持进程运行
  setInterval(() => {
    const status = scheduler.getStatus();
    console.log(`📊 Scheduler status: ${status.isRunning ? 'Running' : 'Stopped'}`);
    if (status.nextRun) {
      console.log(`⏰ Next cleanup: ${status.nextRun}`);
    }
  }, 5 * 60 * 1000); // 每5分钟显示一次状态
}

module.exports = { CleanupScheduler, scheduler };
