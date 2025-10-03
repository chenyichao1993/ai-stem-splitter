const express = require('express');
const cors = require('cors');
const multer = require('multer');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const { supabase, BUCKET_NAME } = require('./config/supabase');
const { uploadToCloudinary, deleteFromCloudinary } = require('./utils/cloudinary');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(compression()); // 启用gzip压缩
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 缓存中间件
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    res.set('Cache-Control', `public, max-age=${duration}, s-maxage=${duration}`);
    next();
  };
};

// 内存存储
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

// 健康检查
app.get('/health', cacheMiddleware(60), (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    supabase: 'connected',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// 文件上传
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileId = uuidv4();
    const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();
    const fileName = `${fileId}.${fileExtension}`;
    const filePath = `uploads/${fileId}/${fileName}`;

    // 上传到Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, {
      resource_type: 'auto',
      folder: 'stem-splitter/uploads',
      public_id: fileId
    });

    if (!uploadResult.success) {
      console.error('Cloudinary upload error:', uploadResult.error);
      return res.status(500).json({ success: false, error: 'Failed to upload file' });
    }

    const { data: cloudinaryData } = uploadResult;

    // 保存文件信息到数据库
    const { data: fileData, error: dbError } = await supabase
      .from('audio_files')
      .insert({
        id: fileId,
        user_id: null, // 暂时为null，后续添加用户认证
        original_name: req.file.originalname,
        file_name: fileName,
        file_size: req.file.size,
        mime_type: req.file.mimetype,
        storage_path: cloudinaryData.public_id,
        storage_url: cloudinaryData.secure_url
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ success: false, error: 'Failed to save file info' });
    }

    res.json({
      success: true,
      data: {
        fileId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        storageUrl: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id
      },
      message: 'File uploaded successfully to Cloudinary'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 开始处理
app.post('/api/process', async (req, res) => {
  try {
    const { fileId } = req.body;
    
    if (!fileId) {
      return res.status(400).json({ success: false, error: 'File ID is required' });
    }

    const jobId = uuidv4();

    // 创建处理任务
    const { data: jobData, error: jobError } = await supabase
      .from('processing_jobs')
      .insert({
        id: jobId,
        user_id: null, // 暂时为null
        audio_file_id: fileId,
        status: 'pending',
        progress: 0,
        estimated_time: 30
      })
      .select()
      .single();

    if (jobError) {
      console.error('Job creation error:', jobError);
      return res.status(500).json({ success: false, error: 'Failed to create processing job' });
    }

    // 模拟处理（后续会集成真实AI引擎）
    setTimeout(async () => {
      // 更新状态为处理中
      await supabase
        .from('processing_jobs')
        .update({ status: 'processing' })
        .eq('id', jobId);

      // 模拟进度更新
      for (let progress = 10; progress <= 90; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await supabase
          .from('processing_jobs')
          .update({ progress })
          .eq('id', jobId);
      }

      // 模拟完成
      const stems = ['vocals', 'drums', 'bass', 'guitar', 'piano'];
      const stemData = [];

      for (const stemType of stems) {
        const stemId = uuidv4();
        const stemFileName = `${jobId}_${stemType}.mp3`;
        const stemPath = `stems/${jobId}/${stemFileName}`;
        
        // 模拟创建分离文件（实际应该调用AI引擎）
        const mockBuffer = Buffer.from('mock audio data');
        
        const { data: stemUploadData, error: stemUploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(stemPath, mockBuffer, {
            contentType: 'audio/mpeg',
            upsert: false
          });

        if (!stemUploadError) {
          const { data: stemUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(stemPath);

          // 保存分离音轨信息
          await supabase
            .from('separated_stems')
            .insert({
              id: stemId,
              job_id: jobId,
              stem_type: stemType,
              file_name: stemFileName,
              file_size: mockBuffer.length,
              storage_path: stemPath,
              storage_url: stemUrlData.publicUrl
            });

          stemData.push({
            [stemType]: stemUrlData.publicUrl
          });
        }
      }

      // 更新任务完成
      await supabase
        .from('processing_jobs')
        .update({ 
          status: 'completed',
          progress: 100,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

    }, 1000);

    res.json({
      success: true,
      data: {
        jobId,
        status: 'pending',
        estimatedTime: 30
      },
      message: 'Processing started'
    });

  } catch (error) {
    console.error('Process error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 获取处理状态
app.get('/api/process/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const { data: job, error } = await supabase
      .from('processing_jobs')
      .select(`
        *,
        separated_stems (
          stem_type,
          storage_url,
          file_name
        )
      `)
      .eq('id', jobId)
      .single();

    if (error || !job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    // 格式化stems数据
    const stems = {};
    if (job.separated_stems) {
      job.separated_stems.forEach(stem => {
        stems[stem.stem_type] = stem.storage_url;
      });
    }

    res.json({
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        progress: job.progress,
        stems: Object.keys(stems).length > 0 ? stems : undefined,
        error: job.error_message
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 下载文件
app.get('/api/download/:jobId/:stemType', async (req, res) => {
  try {
    const { jobId, stemType } = req.params;
    
    const allowedStemTypes = ['vocals', 'drums', 'bass', 'guitar', 'piano'];
    if (!allowedStemTypes.includes(stemType)) {
      return res.status(400).json({ success: false, error: 'Invalid stem type' });
    }

    // 获取分离音轨信息
    const { data: stem, error } = await supabase
      .from('separated_stems')
      .select('*')
      .eq('job_id', jobId)
      .eq('stem_type', stemType)
      .single();

    if (error || !stem) {
      return res.status(404).json({ success: false, error: 'Stem not found' });
    }

    // 从Supabase Storage下载文件
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(stem.storage_path);

    if (downloadError) {
      console.error('Download error:', downloadError);
      return res.status(500).json({ success: false, error: 'Failed to download file' });
    }

    // 设置响应头
    res.setHeader('Content-Disposition', `attachment; filename="${stem.file_name}"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', stem.file_size);

    // 发送文件
    const buffer = await fileData.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Real API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log(`🗄️ Supabase connected: ${supabase.supabaseUrl}`);
});
