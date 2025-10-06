const express = require('express');
const cors = require('cors');
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
const PORT = process.env.PORT || 3001;

// 导入清理服务
const { scheduler } = require('../scripts/scheduler');

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
    console.log('📁 Upload request received');
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    console.log('📄 File details:', {
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    const fileId = uuidv4();
    const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();
    const fileName = `${fileId}.${fileExtension}`;
    const filePath = `uploads/${fileId}/${fileName}`;
    
    // 设置24小时过期时间
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    console.log('☁️ Starting Cloudinary upload...');
    
    // 上传到Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, {
      resource_type: 'raw', // 强制使用raw类型，确保音频文件不被转换
      folder: 'stem-splitter/uploads',
      public_id: fileId
    });

    if (!uploadResult.success) {
      console.error('❌ Cloudinary upload error:', uploadResult.error);
      return res.status(500).json({ success: false, error: 'Failed to upload file', details: uploadResult.error });
    }

    console.log('✅ Cloudinary upload successful');
    const { data: cloudinaryData } = uploadResult;

    console.log('💾 Saving file info to database...');
    
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
        storage_url: cloudinaryData.secure_url,
        cloudinary_public_id: cloudinaryData.public_id,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database error:', dbError);
      return res.status(500).json({ success: false, error: 'Failed to save file info', details: dbError.message });
    }

    console.log('✅ File info saved to database successfully');

    res.json({
      success: true,
      data: {
        fileId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        storageUrl: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
        expiresAt: expiresAt.toISOString()
      },
      message: 'File uploaded successfully to Cloudinary'
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// 简单测试端点
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Test endpoint working', timestamp: new Date().toISOString() });
});

// 更简单的测试端点
app.get('/test', (req, res) => {
  res.json({ message: 'Simple test working' });
});

// 测试下载端点
app.get('/api/test-download', (req, res) => {
  console.log('🧪 Test download endpoint called');
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename="test.mp3"');
  res.send('This is a test audio file');
});

// 检查文件是否存在
app.get('/api/check-file/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const { data: audioFile, error: fileError } = await supabase
      .from('audio_files')
      .select('*')
      .eq('id', fileId)
      .single();
    
    if (fileError) {
      console.error('File check error:', fileError);
      return res.status(404).json({ success: false, error: 'File not found', details: fileError.message });
    }
    
    res.json({ success: true, data: audioFile });
  } catch (error) {
    console.error('Check file error:', error);
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

    // 获取音频文件的过期时间
    const { data: audioFile, error: fileError } = await supabase
      .from('audio_files')
      .select('expires_at')
      .eq('id', fileId)
      .single();
    
    if (fileError) {
      console.error('File fetch error:', fileError);
      return res.status(500).json({ success: false, error: 'Failed to fetch file info' });
    }

    // 创建处理任务
    const { data: jobData, error: jobError } = await supabase
      .from('processing_jobs')
      .insert({
        id: jobId,
        user_id: null, // 暂时为null
        audio_file_id: fileId,
        status: 'pending',
        progress: 0,
        estimated_time: 30,
        expires_at: audioFile.expires_at // 使用相同的过期时间
      })
      .select()
      .single();

    if (jobError) {
      console.error('Job creation error:', jobError);
      return res.status(500).json({ success: false, error: 'Failed to create processing job' });
    }

    // 使用 Spleeter 进行真实音频分离
    setTimeout(async () => {
      try {
        console.log('🎵 开始使用 Spleeter 真实音频分离...');
        
        // 初始化音频处理器
        const processor = new AudioProcessor();
        await processor.processAudio(jobId, fileId);
        
        // 更新状态为处理中
        await supabase
          .from('processing_jobs')
          .update({ status: 'processing' })
          .eq('id', jobId);

        // 获取原始音频文件信息
        const { data: audioFileData, error: audioError } = await supabase
          .from('audio_files')
          .select('storage_url, file_size, original_name')
          .eq('id', fileId)
          .single();
        
        if (audioError) {
          throw new Error('Failed to fetch audio file');
        }

        // 下载原始音频文件
        console.log('📥 下载原始音频文件...');
        const originalResponse = await fetch(audioFileData.storage_url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (!originalResponse.ok) {
          throw new Error(`Failed to download original file: ${originalResponse.status}`);
        }
        
        const originalBuffer = Buffer.from(await originalResponse.arrayBuffer());
        console.log('✅ 原始音频文件下载成功，大小:', originalBuffer.length, 'bytes');

        // 1. 上传到 GaudioLab
        console.log('📤 上传到 GaudioLab...');
        const uploadResult = await gaudioLab.uploadAudio(originalBuffer, 'audio.wav');
        console.log('✅ GaudioLab 上传成功:', uploadResult.upload_id);
        
        // 更新进度
        await supabase
          .from('processing_jobs')
          .update({ progress: 20 })
          .eq('id', jobId);

        // 2. 启动音乐分离
        console.log('🎵 启动 GaudioLab 音乐分离...');
        const separationResult = await gaudioLab.startMusicSeparation(uploadResult.upload_id, {
          model: 'gsep_music_hq_v1',
          stems: ['vocals', 'drums', 'bass', 'guitar', 'piano']
        });
        console.log('✅ GaudioLab 分离任务启动:', separationResult.job_id);
        
        // 更新进度
        await supabase
          .from('processing_jobs')
          .update({ progress: 40 })
          .eq('id', jobId);

        // 3. 轮询处理状态
        let completed = false;
        let attempts = 0;
        const maxAttempts = 60; // 最多等待5分钟
        
        while (!completed && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 5000)); // 等待5秒
          attempts++;
          
          const status = await gaudioLab.getStatus(separationResult.job_id);
          console.log(`📊 GaudioLab 处理状态 (${attempts}/${maxAttempts}):`, status.status);
          
          // 更新进度（40-90%）
          const progress = Math.min(40 + (attempts * 2), 90);
          await supabase
            .from('processing_jobs')
            .update({ progress })
            .eq('id', jobId);
          
          if (status.status === 'completed') {
            completed = true;
            console.log('✅ GaudioLab 音频分离完成!');
            
            // 4. 下载分离结果
            const stemTypes = ['vocals', 'drums', 'bass', 'guitar', 'piano'];
            
            for (const stemType of stemTypes) {
              try {
                console.log(`📥 下载 ${stemType} 音轨...`);
                const stemBuffer = await gaudioLab.downloadStem(separationResult.job_id, stemType);
                
                // 5. 上传到 Cloudinary
                console.log(`📤 上传 ${stemType} 到 Cloudinary...`);
                const uploadResult = await uploadToCloudinary(stemBuffer, {
                  resource_type: 'raw',
                  folder: 'stem-splitter/stems',
                  public_id: `${jobId}_${stemType}`,
                  quality: 'auto'
                });
                
                if (uploadResult.success) {
                  // 6. 保存到数据库
                  const stemId = uuidv4();
                  await supabase
                    .from('separated_stems')
                    .insert({
                      id: stemId,
                      job_id: jobId,
                      stem_type: stemType,
                      file_name: `${stemType}.wav`,
                      file_size: stemBuffer.length,
                      storage_path: uploadResult.data.public_id,
                      storage_url: uploadResult.data.secure_url,
                      cloudinary_public_id: uploadResult.data.public_id,
                      expires_at: audioFile.expires_at
                    });
                  
                  console.log(`✅ ${stemType} 音轨处理完成`);
                } else {
                  console.error(`❌ ${stemType} 音轨上传失败:`, uploadResult.error);
                }
              } catch (stemError) {
                console.error(`❌ ${stemType} 音轨处理失败:`, stemError.message);
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
            
            console.log('🎉 所有音轨处理完成!');
            
          } else if (status.status === 'failed') {
            throw new Error('GaudioLab 处理失败');
          }
        }
        
        if (!completed) {
          throw new Error('GaudioLab 处理超时');
        }
        
      } catch (error) {
        console.error('❌ GaudioLab 处理错误:', error);
        
        // 更新任务失败
        await supabase
          .from('processing_jobs')
          .update({ 
            status: 'failed',
            error_message: error.message
          })
          .eq('id', jobId);
      }
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
    
    console.log('🎵 Download request received:', { jobId, stemType });
    
    const allowedStemTypes = ['vocals', 'drums', 'bass', 'guitar', 'piano'];
    if (!allowedStemTypes.includes(stemType)) {
      console.log('❌ Invalid stem type:', stemType);
      return res.status(400).json({ success: false, error: 'Invalid stem type' });
    }

    // 获取分离音轨信息
    console.log('🔍 Searching for stem:', { jobId, stemType });
    
    const { data: stem, error } = await supabase
      .from('separated_stems')
      .select('*')
      .eq('job_id', jobId)
      .eq('stem_type', stemType)
      .single();

    if (error || !stem) {
      console.error('❌ Stem not found:', { error, jobId, stemType });
      return res.status(404).json({ success: false, error: 'Stem not found', details: error?.message });
    }

    console.log('✅ Found stem:', { 
      id: stem.id, 
      stem_type: stem.stem_type, 
      storage_url: stem.storage_url,
      file_name: stem.file_name 
    });

    // 从Cloudinary下载文件
    console.log('📥 Downloading file from Cloudinary:', stem.storage_url);
    
    const response = await fetch(stem.storage_url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.error('❌ Cloudinary download error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('❌ Error response body:', errorText);
      return res.status(500).json({ success: false, error: 'Failed to download file from Cloudinary' });
    }

    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    console.log('✅ Cloudinary response received:', {
      status: response.status,
      contentType,
      contentLength
    });

    const buffer = await response.arrayBuffer();
    
    console.log('✅ File buffer created:', {
      bufferSize: buffer.byteLength,
      fileName: stem.file_name
    });
    
    // 验证文件内容是否为音频
    const bufferObj = Buffer.from(buffer);
    
    // 检查是否为HTML页面
    const textContent = bufferObj.toString('utf8', 0, 200);
    if (textContent.includes('<!doctype html>') || textContent.includes('<html')) {
      console.error('❌ Downloaded content is HTML page, not audio file');
      console.error('❌ HTML preview:', textContent);
      return res.status(500).json({ 
        success: false, 
        error: 'Downloaded file is not a valid audio file. Please try processing again.' 
      });
    }
    
    // 检查文件头是否为音频格式（更宽松的检查）
    const fileHeader = bufferObj.slice(0, 4);
    const isMP3 = fileHeader[0] === 0xFF && fileHeader[1] === 0xFB; // MP3 header
    const isWAV = fileHeader[0] === 0x52 && fileHeader[1] === 0x49 && fileHeader[2] === 0x46 && fileHeader[3] === 0x46; // WAV header
    const isOGG = fileHeader[0] === 0x4F && fileHeader[1] === 0x67 && fileHeader[2] === 0x67 && fileHeader[3] === 0x53; // OGG header
    
    if (!isMP3 && !isWAV && !isOGG) {
      console.warn('⚠️ File may not have standard audio header, but allowing download');
      console.log('📊 File header:', fileHeader.toString('hex'));
      // 不阻止下载，继续处理
    } else {
      console.log('✅ Valid audio file header detected');
    }
    
    // 最终检查：确保不是HTML页面（警告但不阻止下载）
    if (textContent.includes('<!doctype html>') || textContent.includes('<html')) {
      console.warn('⚠️ Downloaded content appears to be HTML page, but allowing download');
      console.warn('⚠️ HTML preview:', textContent);
      // 不阻止下载，继续处理
    }
    
    // 如果文件太小，可能是dummy文件，但仍然允许下载
    if (buffer.byteLength < 10000) {
      console.warn('⚠️ File size is small, may be dummy audio file');
    }
    
    // 设置响应头 - 确保正确的音频文件头
    res.setHeader('Content-Disposition', `attachment; filename="${stem.file_name}"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.byteLength);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    
    console.log('📤 Sending file to client:', {
      fileName: stem.file_name,
      size: buffer.byteLength,
      contentType: 'audio/mpeg'
    });

    // 发送文件
    res.send(Buffer.from(buffer));

  } catch (error) {
    console.error('❌ Download error:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ success: false, error: 'Internal server error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Real API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log(`🗄️ Supabase connected: ${supabase.supabaseUrl}`);
  
  // 启动自动清理服务
  if (process.env.NODE_ENV === 'production') {
    console.log('🧹 Starting automatic cleanup scheduler...');
    scheduler.start();
  } else {
    console.log('🔧 Development mode: Cleanup scheduler disabled');
  }
});
