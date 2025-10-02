// 简化的API服务器，用于测试前端集成
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 内存存储
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 模拟数据存储
const files = new Map();
const jobs = new Map();

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 文件上传
app.post('/api/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  const fileId = uuidv4();
  files.set(fileId, {
    id: fileId,
    originalName: req.file.originalname,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    mimeType: req.file.mimetype
  });

  res.json({
    success: true,
    data: {
      fileId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    },
    message: 'File uploaded successfully'
  });
});

// 开始处理
app.post('/api/process', (req, res) => {
  const { fileId } = req.body;
  
  if (!fileId) {
    return res.status(400).json({ success: false, error: 'File ID is required' });
  }

  const jobId = uuidv4();
  const job = {
    id: jobId,
    fileId,
    status: 'pending',
    progress: 0,
    stems: {},
    createdAt: new Date()
  };

  jobs.set(jobId, job);

  // 模拟处理
  setTimeout(() => {
    const currentJob = jobs.get(jobId);
    if (currentJob) {
      currentJob.status = 'processing';
      jobs.set(jobId, currentJob);
    }
  }, 1000);

  setTimeout(() => {
    const currentJob = jobs.get(jobId);
    if (currentJob) {
      currentJob.status = 'completed';
      currentJob.progress = 100;
      currentJob.stems = {
        vocals: `${jobId}_vocals.mp3`,
        drums: `${jobId}_drums.mp3`,
        bass: `${jobId}_bass.mp3`,
        guitar: `${jobId}_guitar.mp3`,
        piano: `${jobId}_piano.mp3`
      };
      jobs.set(jobId, currentJob);
    }
  }, 10000);

  res.json({
    success: true,
    data: {
      jobId,
      status: 'pending',
      estimatedTime: 30
    },
    message: 'Processing started'
  });
});

// 获取处理状态
app.get('/api/process/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ success: false, error: 'Job not found' });
  }

  // 模拟进度更新
  if (job.status === 'processing' && job.progress < 90) {
    job.progress += Math.random() * 10;
    jobs.set(jobId, job);
  }

  res.json({
    success: true,
    data: {
      jobId: job.id,
      status: job.status,
      progress: Math.min(job.progress, 100),
      stems: job.stems
    }
  });
});

// 下载文件
app.get('/api/download/:jobId/:stemType', (req, res) => {
  const { jobId, stemType } = req.params;
  
  res.json({
    success: true,
    message: `Download started for ${stemType} stem`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
