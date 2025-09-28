# Deployment Guide

This guide will help you deploy the AI Stem Splitter application to various platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Domain name (optional)

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Configure build settings (auto-detected)
   - Deploy

4. **Environment Variables**:
   Add your environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_APP_NAME`
   - Any API keys you need

### 2. Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `out` folder to Netlify
   - Or connect your Git repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `out`

### 3. Railway

1. **Connect GitHub repository** to Railway
2. **Configure environment variables**
3. **Deploy automatically** on push

### 4. Self-Hosted (VPS/Dedicated Server)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Start the production server**:
   ```bash
   npm start
   ```

4. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "ai-stem-splitter" -- start
   pm2 save
   pm2 startup
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="AI Stem Splitter"

# Database (if using)
DATABASE_URL=your_database_url

# API Keys (if using external services)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# Authentication (if implementing)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secret_key

# File Storage (if using cloud storage)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket
```

## Build Optimization

### 1. Enable Compression

Add to `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  compress: true,
  // ... other config
})
```

### 2. Optimize Images

- Use Next.js Image component
- Enable WebP format
- Implement lazy loading

### 3. Enable Caching

Add headers to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

## Performance Monitoring

### 1. Vercel Analytics

Add to your app:
```javascript
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### 2. Core Web Vitals

Monitor performance with:
- Google PageSpeed Insights
- WebPageTest
- Chrome DevTools

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit secrets to Git
3. **CORS**: Configure CORS properly
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **File Upload**: Validate and sanitize uploaded files

## Monitoring and Logging

### 1. Error Tracking

Add Sentry for error tracking:
```bash
npm install @sentry/nextjs
```

### 2. Logging

Use structured logging:
```javascript
import { logger } from './lib/logger'

logger.info('User uploaded file', { userId, fileName })
```

## Backup Strategy

1. **Database**: Regular automated backups
2. **Files**: Backup uploaded files to cloud storage
3. **Configuration**: Version control all config files

## Scaling Considerations

1. **CDN**: Use CloudFlare or similar for global distribution
2. **Database**: Consider read replicas for high traffic
3. **File Storage**: Use cloud storage (S3, Cloudinary)
4. **Caching**: Implement Redis for session storage
5. **Load Balancing**: Use multiple server instances

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version compatibility
2. **Memory Issues**: Increase server memory or optimize code
3. **Slow Loading**: Enable compression and optimize images
4. **API Errors**: Check environment variables and API keys

### Debug Mode

Enable debug mode:
```bash
DEBUG=* npm run dev
```

## Support

For deployment issues:
- Check the [Next.js deployment docs](https://nextjs.org/docs/deployment)
- Review platform-specific documentation
- Contact support if needed

---

Happy deploying! 🚀
