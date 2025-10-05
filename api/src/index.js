const express = require('express');
const multer = require('multer');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const { supabase, BUCKET_NAME } = require('./config/supabase');
const { uploadToCloudinary, deleteFromCloudinary } = require('./utils/cloudinary');
const cloudinary = require('cloudinary').v2;
const AudioProcessor = require('./process-audio');
require('dotenv').config();

// 配置Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 10000;

// 中间件
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 配置 multer 用于文件上传
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB 限制
  },
  fileFilter: (req, file, cb) => {
    // 检查文件类型
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('只支持音频文件'), false);
    }
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'AI Stem Splitter API'
  });
});

// 简单测试端点
app.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString() 
  });
});

// API 测试端点
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is working!', 
    timestamp: new Date().toISOString() 
  });
});

// 文件上传端点
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    console.log('📁 Upload request received');
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    console.log('📄 File details:', {
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // 生成唯一文件ID
    const fileId = uuidv4();
    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const mimeType = req.file.mimetype;

    // 上传到 Cloudinary
    console.log('☁️ Starting Cloudinary upload...');
    const uploadResult = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${req.file.buffer.toString('base64')}`,
      {
        public_id: `stem-splitter/uploads/${fileId}`,
        resource_type: 'auto',
        folder: 'stem-splitter/uploads'
      }
    );

    console.log('✅ Cloudinary upload successful');

    // 计算过期时间（24小时后）
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // 保存文件信息到数据库
    console.log('💾 Saving file info to database...');
    const { error: dbError } = await supabase
      .from('audio_files')
      .insert({
        id: fileId,
        file_name: fileName,
        original_name: fileName,
        file_size: fileSize,
        mime_type: mimeType,
        storage_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        expires_at: expiresAt,
        is_expired: false,
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to save file info' 
      });
    }

    console.log('✅ File info saved to database successfully');

    res.json({
      success: true,
      data: {
        fileId: fileId,
        fileName: fileName,
        fileSize: fileSize,
        mimeType: mimeType,
        storageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        expiresAt: expiresAt
      },
      message: 'File uploaded successfully to Cloudinary'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 音频处理端点
app.post('/api/process', async (req, res) => {
  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({ 
        success: false, 
        error: 'File ID is required' 
      });
    }

    // 生成处理任务ID
    const jobId = uuidv4();

    // 创建处理任务
    const { error: jobError } = await supabase
      .from('processing_jobs')
      .insert({
        id: jobId,
        file_id: fileId,
        status: 'pending',
        progress: 0,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        is_expired: false
      });

    if (jobError) {
      console.error('Job creation error:', jobError);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to create processing job' 
      });
    }

    // 使用 Spleeter 进行真实音频分离
    setTimeout(async () => {
      try {
        console.log('🎵 开始使用 Spleeter 真实音频分离...');
        
        // 初始化音频处理器
        const processor = new AudioProcessor();
        await processor.processAudio(jobId, fileId);

      } catch (error) {
        console.error('❌ 音频处理错误:', error.message);
        
        // 更新处理状态为失败
        await supabase
          .from('processing_jobs')
          .update({ 
            status: 'failed',
            error: error.message,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      }
    }, 2000); // 2秒后开始处理

    res.json({
      success: true,
      data: {
        jobId: jobId,
        status: 'pending',
        estimatedTime: 30
      },
      message: 'Processing started'
    });

  } catch (error) {
    console.error('Process error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 检查处理状态端点
app.get('/api/process/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    const { data, error } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error || !data) {
      return res.status(404).json({ 
        success: false, 
        error: 'Job not found' 
      });
    }

    res.json({
      success: true,
      data: {
        jobId: data.id,
        status: data.status,
        progress: data.progress || 0,
        error: data.error
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 下载分离音轨端点
app.get('/api/download/:jobId/:stemType', async (req, res) => {
  try {
    const { jobId, stemType } = req.params;

    console.log('🎵 Download request received:', { jobId, stemType });

    // 从数据库获取音轨信息
    const { data: stemData, error: stemError } = await supabase
      .from('separated_stems')
      .select('*')
      .eq('job_id', jobId)
      .eq('stem_type', stemType)
      .single();

    if (stemError || !stemData) {
      console.log('❌ Stem not found:', { error: stemError, jobId, stemType });
      return res.status(404).json({ 
        success: false, 
        error: 'Stem not found',
        details: stemError?.message || 'Stem not found in database'
      });
    }

    console.log('✅ Found stem:', stemData);

    // 从 Cloudinary 下载文件
    console.log('📥 Downloading file from Cloudinary:', stemData.storage_url);
    const response = await fetch(stemData.storage_url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status}`);
    }

    const fileBuffer = await response.arrayBuffer();
    console.log('✅ File buffer created:', { size: fileBuffer.byteLength });

    // 设置响应头
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', `attachment; filename="${stemData.file_name}"`);
    res.setHeader('Content-Length', fileBuffer.byteLength);

    // 发送文件
    res.send(Buffer.from(fileBuffer));

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 检查文件是否存在
app.get('/api/check-file/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;

    const { data, error } = await supabase
      .from('audio_files')
      .select('id, file_name, file_size, created_at')
      .eq('id', fileId)
      .single();

    if (error || !data) {
      return res.status(404).json({ 
        success: false, 
        error: 'File not found' 
      });
    }

    res.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('File check error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Real API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log(`🗄️ Supabase connected: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
});

// 启动清理调度器
const { scheduler } = require('../scripts/scheduler');
console.log('🧹 Starting automatic cleanup scheduler...');
scheduler.start();
