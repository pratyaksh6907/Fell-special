@echo off
echo ========================================
echo   Setup GitHub Repository
echo ========================================
echo.

cd /d "%~dp0"

echo This script will help you set up your GitHub repository.
echo.
echo Prerequisites:
echo   1. You have a GitHub account
echo   2. You have created a new repository on GitHub
echo   3. You have the repository URL ready
echo.

set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo Error: No URL provided
    pause
    exit /b 1
)

echo.
echo [1/4] Checking git configuration...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Git user not configured. Let's set it up...
    set /p GIT_NAME="Enter your name: "
    set /p GIT_EMAIL="Enter your email: "
    git config --global user.name "!GIT_NAME!"
    git config --global user.email "!GIT_EMAIL!"
)

echo.
echo [2/4] Setting main branch...
git branch -M main

echo.
echo [3/4] Adding remote origin...
git remote add origin "%REPO_URL%" 2>nul
if %errorlevel% neq 0 (
    echo Remote already exists, updating...
    git remote set-url origin "%REPO_URL%"
)

echo.
echo [4/4] Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ Successfully pushed to GitHub!
    echo ========================================
    echo.
    echo Next step: Run deploy-to-vercel.bat
) else (
    echo.
    echo ========================================
    echo   ❌ Push failed
    echo ========================================
    echo.
    echo Possible reasons:
    echo   - Authentication required (use GitHub CLI or PAT)
    echo   - Repository URL is incorrect
    echo   - Network issues
    echo.
    echo Try running: git push -u origin main
)

echo.
pause
