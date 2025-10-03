-- PlanetScale优化数据库架构
-- 创建时间: 2025-01-02
-- 针对音频分离应用优化

-- 1. 用户表（优化版）
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    subscription_type ENUM('free', 'premium') DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 索引优化
    INDEX idx_users_email (email),
    INDEX idx_users_created_at (created_at),
    INDEX idx_users_subscription (subscription_type)
);

-- 2. 音频文件表（优化版）
CREATE TABLE audio_files (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    storage_path VARCHAR(500) NOT NULL, -- Cloudinary public_id
    storage_url VARCHAR(500) NOT NULL,  -- Cloudinary secure_url
    cloudinary_public_id VARCHAR(255),  -- Cloudinary public_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 外键约束
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- 索引优化
    INDEX idx_audio_files_user_id (user_id),
    INDEX idx_audio_files_created_at (created_at),
    INDEX idx_audio_files_size (file_size),
    INDEX idx_audio_files_cloudinary_id (cloudinary_public_id)
);

-- 3. 处理任务表（优化版）
CREATE TABLE processing_jobs (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    audio_file_id CHAR(36),
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    progress TINYINT UNSIGNED DEFAULT 0,
    error_message TEXT,
    estimated_time INT, -- 预计处理时间（秒）
    actual_time INT,    -- 实际处理时间（秒）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    
    -- 外键约束
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (audio_file_id) REFERENCES audio_files(id) ON DELETE CASCADE,
    
    -- 索引优化
    INDEX idx_processing_jobs_user_id (user_id),
    INDEX idx_processing_jobs_status (status),
    INDEX idx_processing_jobs_created_at (created_at),
    INDEX idx_processing_jobs_completed_at (completed_at),
    INDEX idx_processing_jobs_audio_file (audio_file_id)
);

-- 4. 分离音轨表（优化版）
CREATE TABLE separated_stems (
    id CHAR(36) PRIMARY KEY,
    job_id CHAR(36),
    stem_type ENUM('vocals', 'drums', 'bass', 'guitar', 'piano') NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    storage_path VARCHAR(500) NOT NULL, -- Cloudinary public_id
    storage_url VARCHAR(500) NOT NULL,  -- Cloudinary secure_url
    cloudinary_public_id VARCHAR(255),  -- Cloudinary public_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 外键约束
    FOREIGN KEY (job_id) REFERENCES processing_jobs(id) ON DELETE CASCADE,
    
    -- 索引优化
    INDEX idx_separated_stems_job_id (job_id),
    INDEX idx_separated_stems_type (stem_type),
    INDEX idx_separated_stems_created_at (created_at),
    INDEX idx_separated_stems_cloudinary_id (cloudinary_public_id)
);

-- 5. 用户使用统计表（优化版）
CREATE TABLE user_usage (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    date DATE NOT NULL,
    files_processed INT DEFAULT 0,
    total_file_size BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 外键约束
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- 唯一约束
    UNIQUE KEY unique_user_date (user_id, date),
    
    -- 索引优化
    INDEX idx_user_usage_user_id (user_id),
    INDEX idx_user_usage_date (date),
    INDEX idx_user_usage_created_at (created_at)
);

-- 6. 系统配置表（新增）
CREATE TABLE system_config (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_system_config_key (config_key)
);

-- 7. 文件清理日志表（新增）
CREATE TABLE cleanup_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cleanup_type ENUM('temp_files', 'expired_files', 'failed_jobs') NOT NULL,
    files_deleted INT DEFAULT 0,
    storage_freed BIGINT DEFAULT 0,
    execution_time INT, -- 执行时间（毫秒）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_cleanup_logs_type (cleanup_type),
    INDEX idx_cleanup_logs_created_at (created_at)
);

-- 插入初始系统配置
INSERT INTO system_config (config_key, config_value, description) VALUES
('file_retention_days', '7', '文件保留天数'),
('max_files_per_user', '10', '每用户最大文件数'),
('cleanup_enabled', 'true', '是否启用自动清理'),
('max_file_size_mb', '50', '最大文件大小（MB）'),
('processing_timeout_minutes', '30', '处理超时时间（分钟）');

-- 创建视图：用户统计信息
CREATE VIEW user_stats AS
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

-- 创建视图：系统使用统计
CREATE VIEW system_stats AS
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
