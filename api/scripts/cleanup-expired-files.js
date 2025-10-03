// 自动清理过期文件脚本
const { supabase } = require('../src/config/supabase');
const { deleteFromCloudinary } = require('../src/utils/cloudinary');

async function cleanupExpiredFiles() {
  console.log('🧹 Starting expired files cleanup...');
  
  try {
    const now = new Date().toISOString();
    let totalFilesDeleted = 0;
    let totalStorageFreed = 0;
    
    // 1. 清理过期的音频文件
    console.log('🗑️ Cleaning up expired audio files...');
    const { data: expiredAudioFiles, error: audioError } = await supabase
      .from('audio_files')
      .select('id, cloudinary_public_id, file_size, original_name')
      .lt('expires_at', now)
      .eq('is_expired', false);
    
    if (audioError) {
      console.error('❌ Error fetching expired audio files:', audioError.message);
    } else {
      console.log(`📊 Found ${expiredAudioFiles.length} expired audio files`);
      
      for (const file of expiredAudioFiles) {
        try {
          // 从Cloudinary删除文件
          if (file.cloudinary_public_id) {
            const deleteResult = await deleteFromCloudinary(file.cloudinary_public_id);
            if (deleteResult.success) {
              console.log(`✅ Deleted from Cloudinary: ${file.original_name}`);
            } else {
              console.log(`⚠️ Failed to delete from Cloudinary: ${file.original_name}`);
            }
          }
          
          // 从数据库删除记录
          const { error: deleteError } = await supabase
            .from('audio_files')
            .delete()
            .eq('id', file.id);
          
          if (deleteError) {
            console.error(`❌ Failed to delete audio file ${file.id}:`, deleteError.message);
          } else {
            console.log(`✅ Deleted audio file: ${file.original_name}`);
            totalFilesDeleted++;
            totalStorageFreed += file.file_size || 0;
          }
        } catch (error) {
          console.error(`❌ Error processing audio file ${file.id}:`, error.message);
        }
      }
    }
    
    // 2. 清理过期的分离音轨
    console.log('🗑️ Cleaning up expired separated stems...');
    const { data: expiredStems, error: stemsError } = await supabase
      .from('separated_stems')
      .select('id, cloudinary_public_id, file_size, stem_type')
      .lt('expires_at', now)
      .eq('is_expired', false);
    
    if (stemsError) {
      console.error('❌ Error fetching expired stems:', stemsError.message);
    } else {
      console.log(`📊 Found ${expiredStems.length} expired separated stems`);
      
      for (const stem of expiredStems) {
        try {
          // 从Cloudinary删除文件
          if (stem.cloudinary_public_id) {
            const deleteResult = await deleteFromCloudinary(stem.cloudinary_public_id);
            if (deleteResult.success) {
              console.log(`✅ Deleted stem from Cloudinary: ${stem.stem_type}`);
            } else {
              console.log(`⚠️ Failed to delete stem from Cloudinary: ${stem.stem_type}`);
            }
          }
          
          // 从数据库删除记录
          const { error: deleteError } = await supabase
            .from('separated_stems')
            .delete()
            .eq('id', stem.id);
          
          if (deleteError) {
            console.error(`❌ Failed to delete stem ${stem.id}:`, deleteError.message);
          } else {
            console.log(`✅ Deleted separated stem: ${stem.stem_type}`);
            totalFilesDeleted++;
            totalStorageFreed += stem.file_size || 0;
          }
        } catch (error) {
          console.error(`❌ Error processing stem ${stem.id}:`, error.message);
        }
      }
    }
    
    // 3. 清理过期的处理任务
    console.log('🗑️ Cleaning up expired processing jobs...');
    const { data: expiredJobs, error: jobsError } = await supabase
      .from('processing_jobs')
      .select('id, status')
      .lt('expires_at', now)
      .in('status', ['completed', 'failed']);
    
    if (jobsError) {
      console.error('❌ Error fetching expired jobs:', jobsError.message);
    } else {
      console.log(`📊 Found ${expiredJobs.length} expired processing jobs`);
      
      for (const job of expiredJobs) {
        try {
          const { error: deleteError } = await supabase
            .from('processing_jobs')
            .delete()
            .eq('id', job.id);
          
          if (deleteError) {
            console.error(`❌ Failed to delete job ${job.id}:`, deleteError.message);
          } else {
            console.log(`✅ Deleted processing job: ${job.id}`);
          }
        } catch (error) {
          console.error(`❌ Error processing job ${job.id}:`, error.message);
        }
      }
    }
    
    // 4. 记录清理统计
    const totalStorageFreedMB = Math.round((totalStorageFreed / (1024 * 1024)) * 100) / 100;
    
    console.log('📈 Cleanup Summary:');
    console.log(`- Files deleted: ${totalFilesDeleted}`);
    console.log(`- Storage freed: ${totalStorageFreedMB} MB`);
    console.log(`- Cleanup completed at: ${new Date().toISOString()}`);
    
    // 5. 记录清理日志到数据库
    try {
      await supabase
        .from('user_usage')
        .insert({
          id: require('uuid').v4(),
          user_id: null,
          date: new Date().toISOString().split('T')[0],
          files_processed: totalFilesDeleted,
          total_file_size: totalStorageFreed
        });
    } catch (logError) {
      console.log('⚠️ Failed to log cleanup stats:', logError.message);
    }
    
    console.log('🎉 Expired files cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Cleanup process failed:', error.message);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  cleanupExpiredFiles()
    .then(() => {
      console.log('✅ Cleanup script executed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Cleanup script execution failed:', error);
      process.exit(1);
    });
}

module.exports = { cleanupExpiredFiles };
