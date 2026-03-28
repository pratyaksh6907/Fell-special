@echo off
echo ========================================
echo   Deploying Feel Special to Vercel
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking git status...
git status
if %errorlevel% neq 0 (
    echo Error: Git not initialized or not available
    pause
    exit /b 1
)

echo.
echo [2/5] Adding all files to git...
git add .
if %errorlevel% neq 0 (
    echo Error: Failed to add files
    pause
    exit /b 1
)

echo.
echo [3/5] Committing changes...
git commit -m "Deploy: Feel Special greeting card app" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
if %errorlevel% neq 0 (
    echo Note: Nothing to commit or commit failed
)

echo.
echo [4/5] Checking for GitHub remote...
git remote -v | findstr "origin"
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  No GitHub remote found!
    echo Please create a repository on GitHub first, then run:
    echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo    git push -u origin main
    echo.
    echo After pushing to GitHub, continue with Vercel deployment...
    pause
)

echo.
echo [5/5] Deploying to Vercel...
echo.
echo Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo Error: Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo.
echo Starting Vercel deployment...
echo Please login to Vercel when prompted...
echo.
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ Deployment Successful!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   ❌ Deployment Failed
    echo ========================================
    echo Please check the errors above
)

echo.
pause
