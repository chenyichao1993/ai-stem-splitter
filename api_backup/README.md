# AI Stem Splitter API

Backend API for the AI Stem Splitter application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Redis (for job queue)
- PostgreSQL (for production)

### Installation

1. **Install dependencies:**
```bash
cd api
npm install
```

2. **Environment setup:**
```bash
cp env.example .env
# Edit .env with your configuration
```

3. **Start development server:**
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### File Upload
- `POST /api/upload` - Upload audio file
- `GET /api/upload/:fileId` - Get file info

### Processing
- `POST /api/process` - Start audio separation
- `GET /api/process/:jobId` - Get processing status
- `GET /api/process` - Get processing history

### Download
- `GET /api/download/:jobId/:stemType` - Download specific stem
- `GET /api/download/:jobId/all` - Download all stems as ZIP

### Health Check
- `GET /health` - Server health status

## 🛠️ Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

### Project Structure
```
api/
├── src/
│   ├── routes/          # API route handlers
│   ├── middleware/      # Express middleware
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - JWT signing secret
- `MAX_FILE_SIZE` - Maximum file upload size
- `CORS_ORIGIN` - Allowed CORS origin

## 🚧 TODO

- [ ] Database integration (PostgreSQL)
- [ ] Redis job queue implementation
- [ ] AWS S3 file storage
- [ ] Audio processing engine integration
- [ ] JWT authentication middleware
- [ ] Rate limiting per user
- [ ] File cleanup automation
- [ ] Comprehensive error handling
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests

## 🔗 Integration with Frontend

The frontend should make requests to these endpoints:

```typescript
// Upload file
const formData = new FormData();
formData.append('audio', file);
const uploadResponse = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

// Start processing
const processResponse = await fetch('/api/process', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fileId: 'uploaded-file-id' })
});

// Check status
const statusResponse = await fetch(`/api/process/${jobId}`);
```
