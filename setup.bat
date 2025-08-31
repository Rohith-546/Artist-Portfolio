@echo off
REM Artist Portfolio Setup Script for Windows
REM This script helps you quickly set up the development environment

echo.
echo 🎨 Artist Portfolio Setup Script
echo =================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v16 or higher) first.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm found
npm --version

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

REM Create .env file if it doesn't exist
cd ..\backend
if not exist .env (
    echo.
    echo 📝 Creating environment file...
    copy .env.example .env
    echo ✅ Created .env file from template
    echo ⚠️  Please edit backend\.env with your actual configuration
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit backend\.env with your actual configuration:
echo    - MongoDB connection string
echo    - JWT secret
echo    - Email credentials
echo    - Cloudinary credentials
echo.
echo 2. Start the development servers:
echo    Backend:  cd backend ^&^& npm run dev
echo    Frontend: cd frontend ^&^& npm start
echo.
echo 3. Seed the database (optional):
echo    cd backend ^&^& npm run seed
echo.
echo 4. Access the application:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo Happy coding! 🚀
echo.
pause
