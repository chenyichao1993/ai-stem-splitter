// 数据库迁移脚本：从Supabase迁移到PlanetScale
const { query, transaction } = require('../src/config/database');
const { supabase } = require('../src/config/supabase');

async function migrateToPlanetScale() {
  console.log('🚀 开始数据库迁移...');
  
  try {
    // 1. 迁移用户数据
    console.log('📊 迁移用户数据...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');
    
    if (usersError) {
      throw new Error(`用户数据迁移失败: ${usersError.message}`);
    }
    
    for (const user of users) {
      await query(`
        INSERT INTO users (id, email, name, subscription_type, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        email = VALUES(email),
        name = VALUES(name),
        subscription_type = VALUES(subscription_type),
        updated_at = VALUES(updated_at)
      `, [user.id, user.email, user.name, user.subscription_type, user.created_at, user.updated_at]);
    }
    
    console.log(`✅ 用户数据迁移完成: ${users.length} 条记录`);
    
    // 2. 迁移音频文件数据
    console.log('🎵 迁移音频文件数据...');
    const { data: audioFiles, error: audioError } = await supabase
      .from('audio_files')
      .select('*');
    
    if (audioError) {
      throw new Error(`音频文件数据迁移失败: ${audioError.message}`);
    }
    
    for (const file of audioFiles) {
      await query(`
        INSERT INTO audio_files (
          id, user_id, original_name, file_name, file_size, mime_type,
          storage_path, storage_url, cloudinary_public_id, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        original_name = VALUES(original_name),
        file_name = VALUES(file_name),
        file_size = VALUES(file_size),
        mime_type = VALUES(mime_type),
        storage_path = VALUES(storage_path),
        storage_url = VALUES(storage_url),
        cloudinary_public_id = VALUES(cloudinary_public_id),
        updated_at = VALUES(updated_at)
      `, [
        file.id, file.user_id, file.original_name, file.file_name,
        file.file_size, file.mime_type, file.storage_path, file.storage_url,
        file.storage_path, // 使用storage_path作为cloudinary_public_id
        file.created_at, file.updated_at
      ]);
    }
    
    console.log(`✅ 音频文件数据迁移完成: ${audioFiles.length} 条记录`);
    
    // 3. 迁移处理任务数据
    console.log('⚙️ 迁移处理任务数据...');
    const { data: jobs, error: jobsError } = await supabase
      .from('processing_jobs')
      .select('*');
    
    if (jobsError) {
      throw new Error(`处理任务数据迁移失败: ${jobsError.message}`);
    }
    
    for (const job of jobs) {
      await query(`
        INSERT INTO processing_jobs (
          id, user_id, audio_file_id, status, progress, error_message,
          estimated_time, actual_time, created_at, updated_at, completed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        progress = VALUES(progress),
        error_message = VALUES(error_message),
        estimated_time = VALUES(estimated_time),
        actual_time = VALUES(actual_time),
        updated_at = VALUES(updated_at),
        completed_at = VALUES(completed_at)
      `, [
        job.id, job.user_id, job.audio_file_id, job.status, job.progress,
        job.error_message, job.estimated_time, job.actual_time,
        job.created_at, job.updated_at, job.completed_at
      ]);
    }
    
    console.log(`✅ 处理任务数据迁移完成: ${jobs.length} 条记录`);
    
    // 4. 迁移分离音轨数据
    console.log('🎼 迁移分离音轨数据...');
    const { data: stems, error: stemsError } = await supabase
      .from('separated_stems')
      .select('*');
    
    if (stemsError) {
      throw new Error(`分离音轨数据迁移失败: ${stemsError.message}`);
    }
    
    for (const stem of stems) {
      await query(`
        INSERT INTO separated_stems (
          id, job_id, stem_type, file_name, file_size,
          storage_path, storage_url, cloudinary_public_id, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        file_name = VALUES(file_name),
        file_size = VALUES(file_size),
        storage_path = VALUES(storage_path),
        storage_url = VALUES(storage_url),
        cloudinary_public_id = VALUES(cloudinary_public_id)
      `, [
        stem.id, stem.job_id, stem.stem_type, stem.file_name, stem.file_size,
        stem.storage_path, stem.storage_url, stem.storage_path, stem.created_at
      ]);
    }
    
    console.log(`✅ 分离音轨数据迁移完成: ${stems.length} 条记录`);
    
    // 5. 迁移用户使用统计
    console.log('📈 迁移用户使用统计...');
    const { data: usage, error: usageError } = await supabase
      .from('user_usage')
      .select('*');
    
    if (usageError) {
      console.log('⚠️ 用户使用统计表不存在，跳过...');
    } else {
      for (const usageRecord of usage) {
        await query(`
          INSERT INTO user_usage (
            id, user_id, date, files_processed, total_file_size, created_at
          ) VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          files_processed = VALUES(files_processed),
          total_file_size = VALUES(total_file_size)
        `, [
          usageRecord.id, usageRecord.user_id, usageRecord.date,
          usageRecord.files_processed, usageRecord.total_file_size, usageRecord.created_at
        ]);
      }
      
      console.log(`✅ 用户使用统计迁移完成: ${usage.length} 条记录`);
    }
    
    console.log('🎉 数据库迁移完成！');
    
    // 6. 验证迁移结果
    console.log('🔍 验证迁移结果...');
    const userCount = await query('SELECT COUNT(*) as count FROM users');
    const fileCount = await query('SELECT COUNT(*) as count FROM audio_files');
    const jobCount = await query('SELECT COUNT(*) as count FROM processing_jobs');
    const stemCount = await query('SELECT COUNT(*) as count FROM separated_stems');
    
    console.log('📊 迁移结果统计:');
    console.log(`- 用户: ${userCount.data[0].count} 条`);
    console.log(`- 音频文件: ${fileCount.data[0].count} 条`);
    console.log(`- 处理任务: ${jobCount.data[0].count} 条`);
    console.log(`- 分离音轨: ${stemCount.data[0].count} 条`);
    
  } catch (error) {
    console.error('❌ 迁移失败:', error.message);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  migrateToPlanetScale()
    .then(() => {
      console.log('✅ 迁移脚本执行完成');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 迁移脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { migrateToPlanetScale };
