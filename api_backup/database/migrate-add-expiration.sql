-- 数据库迁移脚本：添加24小时自动删除功能
-- 执行此脚本前请备份数据库

-- 1. 为音频文件表添加过期时间字段
ALTER TABLE audio_files 
ADD COLUMN IF NOT EXISTS cloudinary_public_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_expired BOOLEAN DEFAULT FALSE;

-- 2. 为处理任务表添加过期时间字段
ALTER TABLE processing_jobs 
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;

-- 3. 为分离音轨表添加过期时间字段
ALTER TABLE separated_stems 
ADD COLUMN IF NOT EXISTS cloudinary_public_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_expired BOOLEAN DEFAULT FALSE;

-- 4. 创建过期时间索引
CREATE INDEX IF NOT EXISTS idx_audio_files_expires_at ON audio_files(expires_at);
CREATE INDEX IF NOT EXISTS idx_audio_files_cloudinary_id ON audio_files(cloudinary_public_id);
CREATE INDEX IF NOT EXISTS idx_processing_jobs_expires_at ON processing_jobs(expires_at);
CREATE INDEX IF NOT EXISTS idx_separated_stems_expires_at ON separated_stems(expires_at);
CREATE INDEX IF NOT EXISTS idx_separated_stems_cloudinary_id ON separated_stems(cloudinary_public_id);

-- 5. 更新现有记录的过期时间（设置为24小时后）
UPDATE audio_files 
SET expires_at = NOW() + INTERVAL '24 hours'
WHERE expires_at IS NULL;

UPDATE processing_jobs 
SET expires_at = NOW() + INTERVAL '24 hours'
WHERE expires_at IS NULL;

UPDATE separated_stems 
SET expires_at = NOW() + INTERVAL '24 hours'
WHERE expires_at IS NULL;

-- 6. 创建清理统计表（可选）
CREATE TABLE IF NOT EXISTS cleanup_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cleanup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    files_deleted INTEGER DEFAULT 0,
    storage_freed_mb DECIMAL(10,2) DEFAULT 0,
    execution_time_ms INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('completed', 'failed', 'partial'))
);

-- 7. 创建清理日志索引
CREATE INDEX IF NOT EXISTS idx_cleanup_logs_date ON cleanup_logs(cleanup_date);

-- 完成迁移
SELECT 'Migration completed successfully! 24-hour auto-deletion feature has been added.' as status;
