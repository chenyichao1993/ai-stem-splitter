// 数据库清理脚本
const { supabase } = require('../src/config/supabase');

async function cleanupDatabase() {
  console.log('🧹 开始数据库清理...');
  
  try {
    // 1. 清理过期的音频文件（7天前）
    console.log('🗑️ 清理过期音频文件...');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { data: expiredFiles, error: expiredError } = await supabase
      .from('audio_files')
      .select('id, storage_path')
      .lt('created_at', sevenDaysAgo.toISOString())
      .is('user_id', null); // 只清理匿名用户的文件
    
    if (expiredError) {
      console.error('❌ 查询过期文件失败:', expiredError.message);
    } else {
      console.log(`📊 找到 ${expiredFiles.length} 个过期文件`);
      
      // 删除过期文件
      for (const file of expiredFiles) {
        const { error: deleteError } = await supabase
          .from('audio_files')
          .delete()
          .eq('id', file.id);
        
        if (deleteError) {
          console.error(`❌ 删除文件 ${file.id} 失败:`, deleteError.message);
        } else {
          console.log(`✅ 删除文件: ${file.id}`);
        }
      }
    }
    
    // 2. 清理失败的处理任务（1天前）
    console.log('🗑️ 清理失败的处理任务...');
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const { data: failedJobs, error: failedError } = await supabase
      .from('processing_jobs')
      .select('id')
      .eq('status', 'failed')
      .lt('created_at', oneDayAgo.toISOString());
    
    if (failedError) {
      console.error('❌ 查询失败任务失败:', failedError.message);
    } else {
      console.log(`📊 找到 ${failedJobs.length} 个失败任务`);
      
      // 删除失败任务
      for (const job of failedJobs) {
        const { error: deleteError } = await supabase
          .from('processing_jobs')
          .delete()
          .eq('id', job.id);
        
        if (deleteError) {
          console.error(`❌ 删除任务 ${job.id} 失败:`, deleteError.message);
        } else {
          console.log(`✅ 删除任务: ${job.id}`);
        }
      }
    }
    
    // 3. 清理孤立的分离音轨
    console.log('🗑️ 清理孤立的分离音轨...');
    const { data: orphanedStems, error: orphanedError } = await supabase
      .from('separated_stems')
      .select('id, job_id')
      .not('job_id', 'in', `(SELECT id FROM processing_jobs)`);
    
    if (orphanedError) {
      console.error('❌ 查询孤立音轨失败:', orphanedError.message);
    } else {
      console.log(`📊 找到 ${orphanedStems.length} 个孤立音轨`);
      
      // 删除孤立音轨
      for (const stem of orphanedStems) {
        const { error: deleteError } = await supabase
          .from('separated_stems')
          .delete()
          .eq('id', stem.id);
        
        if (deleteError) {
          console.error(`❌ 删除音轨 ${stem.id} 失败:`, deleteError.message);
        } else {
          console.log(`✅ 删除音轨: ${stem.id}`);
        }
      }
    }
    
    // 4. 统计清理结果
    console.log('📊 统计清理结果...');
    const { data: stats, error: statsError } = await supabase
      .from('audio_files')
      .select('id, file_size');
    
    if (!statsError) {
      const totalFiles = stats.length;
      const totalSize = stats.reduce((sum, file) => sum + (file.file_size || 0), 0);
      const totalSizeMB = Math.round(totalSize / (1024 * 1024) * 100) / 100;
      
      console.log('📈 当前数据库状态:');
      console.log(`- 总文件数: ${totalFiles}`);
      console.log(`- 总存储大小: ${totalSizeMB} MB`);
      console.log(`- 剩余空间: ${(50 - totalSizeMB).toFixed(2)} MB`);
    }
    
    console.log('🎉 数据库清理完成！');
    
  } catch (error) {
    console.error('❌ 清理过程中出错:', error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  cleanupDatabase()
    .then(() => {
      console.log('✅ 清理脚本执行完成');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 清理脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { cleanupDatabase };
