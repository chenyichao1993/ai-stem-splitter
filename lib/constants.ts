export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mpeg',
  'audio/mp4',
  'audio/wav',
  'audio/flac',
  'audio/m4a',
  'audio/aac',
]

export const MAX_FILE_SIZE = {
  FREE: 50 * 1024 * 1024, // 50MB
  PRO: 200 * 1024 * 1024, // 200MB
  ENTERPRISE: 500 * 1024 * 1024, // 500MB
}

export const PROCESSING_LIMITS = {
  FREE: {
    filesPerMonth: 5,
    maxFileSize: MAX_FILE_SIZE.FREE,
    quality: 'standard',
    retention: 24, // hours
  },
  PRO: {
    filesPerMonth: -1, // unlimited
    maxFileSize: MAX_FILE_SIZE.PRO,
    quality: 'high',
    retention: 168, // 7 days
  },
  ENTERPRISE: {
    filesPerMonth: -1, // unlimited
    maxFileSize: MAX_FILE_SIZE.ENTERPRISE,
    quality: 'lossless',
    retention: 720, // 30 days
  },
}

export const PRICING_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      '5 files per month',
      '50MB max file size',
      'Standard quality output',
      'Basic support',
      '24-hour file retention',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 19,
    features: [
      'Unlimited files per month',
      '200MB max file size',
      'High quality output',
      'Priority processing',
      'Priority support',
      '7-day file retention',
      'Batch processing',
      'API access',
      'No watermarks',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    features: [
      'Everything in Pro',
      'Custom file size limits',
      'Lossless quality output',
      'Dedicated support',
      '30-day file retention',
      'White-label solution',
      'Custom integrations',
      'SLA guarantee',
      'Team management',
    ],
  },
}

export const STEM_TYPES = [
  'vocals',
  'drums',
  'bass',
  'guitar',
  'piano',
] as const

export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  PROCESS: '/api/process',
  DOWNLOAD: '/api/download',
  STATUS: '/api/status',
  USER: '/api/user',
  AUTH: '/api/auth',
} as const

export const SEO_KEYWORDS = [
  'stem splitter',
  'audio separator',
  'vocal remover',
  'music separation',
  'AI audio processing',
  'extract vocals from music',
  'separate drums from song',
  'audio stem extraction',
  'music production tools',
  'DJ tools',
  'audio editing',
  'music remix',
  'karaoke maker',
  'instrumental extractor',
  'acapella maker',
] as const
