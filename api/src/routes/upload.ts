import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse, UploadResponse } from '../types';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_AUDIO_TYPES || 'mp3,mp4,wav,flac,m4a,aac').split(',');
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    
    if (fileExtension && allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(createError('Invalid file type. Allowed types: ' + allowedTypes.join(', '), 400));
    }
  }
});

// POST /api/upload - Upload audio file
router.post('/', upload.single('audio'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError('No file uploaded', 400);
    }

    const fileId = uuidv4();
    const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();
    const fileName = `${fileId}.${fileExtension}`;

    // TODO: Upload to S3 or cloud storage
    // For now, we'll simulate the upload
    const uploadResponse: UploadResponse = {
      fileId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    };

    const response: ApiResponse<UploadResponse> = {
      success: true,
      data: uploadResponse,
      message: 'File uploaded successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// GET /api/upload/:fileId - Get file info
router.get('/:fileId', async (req, res, next) => {
  try {
    const { fileId } = req.params;

    // TODO: Get file info from database
    // For now, return mock data
    const fileInfo: UploadResponse = {
      fileId,
      fileName: 'sample.mp3',
      fileSize: 1024000,
      mimeType: 'audio/mpeg'
    };

    const response: ApiResponse<UploadResponse> = {
      success: true,
      data: fileInfo
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
