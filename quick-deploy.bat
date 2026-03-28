@echo off
echo ========================================
echo   Quick Deploy to Vercel
echo   (Skip GitHub - Direct Deploy)
echo ========================================
echo.

cd /d "%~dp0"

echo This will deploy directly to Vercel without pushing to GitHub.
echo Your code will still be on GitHub if you set it up separately.
echo.
pause

echo.
echo [1/3] Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo Error: Failed to install Vercel CLI
        echo Please install Node.js if not already installed
        pause
        exit /b 1
    )
)

echo.
echo [2/3] Logging into Vercel...
echo Please follow the browser login prompt...
vercel login

echo.
echo [3/3] Deploying to Vercel...
echo.
echo NOTE: Make sure to set your environment variables:
echo   - NEXT_PUBLIC_SUPABASE_URL
echo   - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo.
echo You can add them:
echo   1. During this deployment (Vercel will prompt you)
echo   2. Later in Vercel dashboard - Settings - Environment Variables
echo.
pause

echo Starting deployment...
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ Deployment Successful!
    echo ========================================
    echo.
    echo Your app is now live on Vercel!
    echo.
    echo IMPORTANT: If you haven't set environment variables,
    echo go to your Vercel dashboard and add them now.
) else (
    echo.
    echo ========================================
    echo   ❌ Deployment Failed
    echo ========================================
    echo.
    echo Common issues:
    echo   1. Not logged in to Vercel
    echo   2. Build errors
    echo   3. Missing dependencies
    echo.
    echo Check the error messages above for details.
)

echo.
pause
