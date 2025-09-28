@echo off
echo 🎵 Setting up AI Stem Splitter...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Create .env.local file if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # AI Stem Splitter Environment Variables
        echo NEXT_PUBLIC_APP_URL=http://localhost:3000
        echo NEXT_PUBLIC_APP_NAME="AI Stem Splitter"
        echo.
        echo # Add your API keys and configuration here
        echo # NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
        echo # STRIPE_SECRET_KEY=
        echo # DATABASE_URL=
    ) > .env.local
    echo ✅ .env.local file created!
)

echo.
echo 🚀 Setup complete! You can now run:
echo    npm run dev
echo.
echo Then open http://localhost:3000 in your browser.
echo.
echo Happy coding! 🎵
pause
