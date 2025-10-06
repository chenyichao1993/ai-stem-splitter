-- Supabase数据库性能优化
-- 针对音频分离应用优化

-- 1. 添加性能索引
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audio_files_user_created 
ON audio_files(user_id, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_processing_jobs_status_created 
ON processing_jobs(status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_separated_stems_job_type 
ON separated_stems(job_id, stem_type);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_usage_user_date 
ON user_usage(user_id, date DESC);

-- 2. 创建数据清理函数
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void AS $$
BEGIN
  -- 删除7天前的音频文件
  DELETE FROM audio_files 
  WHERE created_at < NOW() - INTERVAL '7 days'
  AND user_id IS NULL; -- 只删除匿名用户的文件
  
  -- 删除失败的处理任务
  DELETE FROM processing_jobs 
  WHERE status = 'failed' 
  AND created_at < NOW() - INTERVAL '1 day';
  
  -- 删除孤立的分离音轨
  DELETE FROM separated_stems 
  WHERE job_id NOT IN (SELECT id FROM processing_jobs);
  
  -- 记录清理日志
  INSERT INTO user_usage (id, user_id, date, files_processed, total_file_size)
  VALUES (
    gen_random_uuid(),
    NULL,
    CURRENT_DATE,
    0,
    0
  ) ON CONFLICT (user_id, date) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 3. 创建用户使用统计视图
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    u.id,
    u.email,
    u.name,
    u.subscription_type,
    COUNT(DISTINCT af.id) as total_files,
    COALESCE(SUM(af.file_size), 0) as total_storage_used,
    COUNT(DISTINCT pj.id) as total_jobs,
    COUNT(DISTINCT CASE WHEN pj.status = 'completed' THEN pj.id END) as completed_jobs,
    u.created_at
FROM users u
LEFT JOIN audio_files af ON u.id = af.user_id
LEFT JOIN processing_jobs pj ON u.id = pj.user_id
GROUP BY u.id, u.email, u.name, u.subscription_type, u.created_at;

-- 4. 创建系统统计视图
CREATE OR REPLACE VIEW system_stats AS
SELECT 
    COUNT(DISTINCT u.id) as total_users,
    COUNT(DISTINCT af.id) as total_files,
    COALESCE(SUM(af.file_size), 0) as total_storage_used,
    COUNT(DISTINCT pj.id) as total_jobs,
    COUNT(DISTINCT CASE WHEN pj.status = 'completed' THEN pj.id END) as completed_jobs,
    COUNT(DISTINCT CASE WHEN pj.status = 'processing' THEN pj.id END) as processing_jobs,
    COUNT(DISTINCT CASE WHEN pj.status = 'failed' THEN pj.id END) as failed_jobs
FROM users u
LEFT JOIN audio_files af ON u.id = af.user_id
LEFT JOIN processing_jobs pj ON u.id = pj.user_id;

-- 5. 创建文件大小监控函数
CREATE OR REPLACE FUNCTION check_storage_usage()
RETURNS TABLE(
    user_id UUID,
    total_files BIGINT,
    total_size BIGINT,
    usage_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    af.user_id,
    COUNT(*) as total_files,
    SUM(af.file_size) as total_size,
    ROUND(
      (SUM(af.file_size)::NUMERIC / (50 * 1024 * 1024)) * 100, -- 50MB限制
      2
    ) as usage_percentage
  FROM audio_files af
  WHERE af.user_id IS NOT NULL
  GROUP BY af.user_id
  HAVING SUM(af.file_size) > 0;
END;
$$ LANGUAGE plpgsql;

-- 6. 创建自动清理触发器
CREATE OR REPLACE FUNCTION trigger_cleanup()
RETURNS TRIGGER AS $$
BEGIN
  -- 每天自动清理一次
  IF (SELECT COUNT(*) FROM user_usage WHERE date = CURRENT_DATE) = 0 THEN
    PERFORM cleanup_expired_data();
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器（每天触发一次）
CREATE OR REPLACE FUNCTION schedule_daily_cleanup()
RETURNS void AS $$
BEGIN
  -- 这里可以设置定时任务，但Supabase可能需要通过外部服务实现
  -- 暂时通过应用层实现定时清理
END;
$$ LANGUAGE plpgsql;
