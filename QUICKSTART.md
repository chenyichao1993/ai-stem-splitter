# Quick Start Guide

Get the AI Stem Splitter up and running in minutes!

## 🚀 Quick Setup

### Option 1: Automated Setup (Windows)
```bash
# Run the setup script
scripts\setup.bat
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

### Option 3: Using Yarn
```bash
# 1. Install dependencies
yarn install

# 2. Start development server
yarn dev
```

## 🌐 Access the Application

Once the server is running, open your browser and go to:
- **Homepage**: http://localhost:3000
- **Stem Splitter Tool**: http://localhost:3000/stem-splitter
- **Pricing Page**: http://localhost:3000/pricing

## 🎵 Try the Stem Splitter

1. Go to http://localhost:3000/stem-splitter
2. Drag and drop an audio file (MP3, WAV, FLAC, M4A, AAC)
3. Click "Separate Audio Stems"
4. Watch the AI process your audio
5. Download the separated stems

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Homepage
│   ├── stem-splitter/     # Main tool
│   └── pricing/           # Pricing page
├── components/            # React components
│   ├── landing/          # Landing page sections
│   ├── stem-splitter/    # Tool components
│   └── layout/           # Header, Footer
├── lib/                  # Utilities and config
└── types/                # TypeScript types
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    500: '#6366f1',  // Change this
    600: '#4f46e5',  // And this
  }
}
```

### Content
- **Landing page**: Edit components in `components/landing/`
- **Pricing**: Modify `components/landing/PricingSection.tsx`
- **Features**: Update `components/landing/FeaturesSection.tsx`

### Styling
- **Global styles**: Edit `app/globals.css`
- **Component styles**: Use Tailwind classes
- **Custom components**: Add to `components/`

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AI Stem Splitter"
```

### SEO Settings
Edit metadata in:
- `app/layout.tsx` (global)
- `app/page.tsx` (homepage)
- `app/stem-splitter/page.tsx` (tool page)

## 📱 Features Included

✅ **Landing Page**
- Hero section with demo
- Features showcase
- How it works
- Pricing plans
- Testimonials
- FAQ section

✅ **Stem Splitter Tool**
- Drag & drop file upload
- Audio player with controls
- Processing progress
- Results display
- Download functionality

✅ **Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Optimized for all devices

✅ **SEO Optimized**
- Meta tags
- Open Graph
- Structured data
- Fast loading

## 🚀 Next Steps

1. **Customize the design** to match your brand
2. **Add real AI integration** for actual stem separation
3. **Implement user authentication** for user accounts
4. **Add payment processing** for subscriptions
5. **Deploy to production** using Vercel, Netlify, or your preferred platform

## 🆘 Need Help?

- **Documentation**: Check the main README.md
- **Deployment**: See DEPLOYMENT.md
- **Issues**: Create a GitHub issue
- **Support**: Contact the development team

## 🎉 You're Ready!

Your AI Stem Splitter is now running locally. Start customizing and building your audio separation platform!

---

**Happy coding!** 🎵✨
