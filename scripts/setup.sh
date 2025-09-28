#!/bin/bash

echo "🎵 Setting up AI Stem Splitter..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# AI Stem Splitter Environment Variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AI Stem Splitter"

# Add your API keys and configuration here
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_SECRET_KEY=
# DATABASE_URL=
EOF
    echo "✅ .env.local file created!"
fi

echo ""
echo "🚀 Setup complete! You can now run:"
echo "   npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "Happy coding! 🎵"
