import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse, ProcessResponse, ProcessStatusResponse } from '../types';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// In-memory storage for demo (replace with database in production)
const processingJobs = new Map<string, any>();

// POST /api/process - Start audio processing
router.post('/', async (req, res, next) => {
  try {
    const { fileId } = req.body;

    if (!fileId) {
      throw createError('File ID is required', 400);
    }

    const jobId = uuidv4();
    
    // Create processing job
    const job = {
      id: jobId,
      fileId,
      status: 'pending',
      progress: 0,
      stems: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    processingJobs.set(jobId, job);

    // Simulate processing start
    setTimeout(() => {
      const currentJob = processingJobs.get(jobId);
      if (currentJob) {
        currentJob.status = 'processing';
        currentJob.updatedAt = new Date();
        processingJobs.set(jobId, currentJob);
      }
    }, 1000);

    // Simulate processing completion
    setTimeout(() => {
      const currentJob = processingJobs.get(jobId);
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
        currentJob.completedAt = new Date();
        currentJob.updatedAt = new Date();
        processingJobs.set(jobId, currentJob);
      }
    }, 10000); // 10 seconds for demo

    const response: ApiResponse<ProcessResponse> = {
      success: true,
      data: {
        jobId,
        status: 'pending',
        estimatedTime: 30 // seconds
      },
      message: 'Processing started'
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// GET /api/process/:jobId - Get processing status
router.get('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = processingJobs.get(jobId);

    if (!job) {
      throw createError('Job not found', 404);
    }

    // Simulate progress updates
    if (job.status === 'processing' && job.progress < 90) {
      job.progress += Math.random() * 10;
      job.updatedAt = new Date();
      processingJobs.set(jobId, job);
    }

    const response: ApiResponse<ProcessStatusResponse> = {
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        progress: Math.min(job.progress, 100),
        stems: job.stems,
        error: job.error
      }
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /api/process - Get user's processing history
router.get('/', async (req, res, next) => {
  try {
    // TODO: Get from database with user authentication
    const jobs = Array.from(processingJobs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10); // Limit to 10 recent jobs

    const response: ApiResponse = {
      success: true,
      data: jobs
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
