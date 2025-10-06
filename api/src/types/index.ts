export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'free' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

export interface AudioFile {
  id: string;
  userId: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  createdAt: Date;
}

export interface ProcessingJob {
  id: string;
  userId: string;
  audioFileId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
  stems: {
    vocals?: string;
    drums?: string;
    bass?: string;
    guitar?: string;
    piano?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface StemFile {
  id: string;
  jobId: string;
  stemType: 'vocals' | 'drums' | 'bass' | 'guitar' | 'piano';
  fileName: string;
  fileSize: number;
  s3Key: string;
  s3Url: string;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface ProcessResponse {
  jobId: string;
  status: string;
  estimatedTime?: number;
}

export interface ProcessStatusResponse {
  jobId: string;
  status: string;
  progress: number;
  stems?: {
    vocals?: string;
    drums?: string;
    bass?: string;
    guitar?: string;
    piano?: string;
  };
  error?: string;
}

export interface AuthResponse {
  user: Omit<User, 'id'>;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
