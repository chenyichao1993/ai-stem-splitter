import express from 'express';
import { ApiResponse } from '../types';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// GET /api/download/:jobId/:stemType - Download specific stem
router.get('/:jobId/:stemType', async (req, res, next) => {
  try {
    const { jobId, stemType } = req.params;
    
    const allowedStemTypes = ['vocals', 'drums', 'bass', 'guitar', 'piano'];
    if (!allowedStemTypes.includes(stemType)) {
      throw createError('Invalid stem type', 400);
    }

    // TODO: Get file from S3 or cloud storage
    // For now, return a mock response
    const fileName = `${jobId}_${stemType}.mp3`;
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    
    // TODO: Stream actual file from storage
    // For now, send a simple response
    const response: ApiResponse = {
      success: true,
      message: `Download started for ${stemType} stem`
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /api/download/:jobId/all - Download all stems as ZIP
router.get('/:jobId/all', async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // TODO: Create ZIP file with all stems
    // For now, return a mock response
    const response: ApiResponse = {
      success: true,
      message: 'ZIP download started with all stems'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
