@echo off
echo ================================
echo   TuringLab Startup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] pnpm is not installed!
    echo Installing pnpm globally...
    npm install -g pnpm
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install pnpm
        pause
        exit /b 1
    )
)

REM Check if Ollama is running
echo [1/4] Checking Ollama...
curl -s http://localhost:11434/api/tags >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Ollama is not running!
    echo.
    echo Please start Ollama:
    echo   1. Open Ollama app, or
    echo   2. Run: ollama serve
    echo.
    echo After starting Ollama, press any key to continue...
    pause >nul
)

REM Check if dependencies are installed
echo [2/4] Checking dependencies...
if not exist "node_modules\" (
    echo Installing dependencies...
    pnpm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed!
)

REM Check if .env exists in backend
echo [3/4] Checking backend configuration...
if not exist "apps\backend\.env" (
    echo Creating .env file...
    copy "apps\backend\.env.example" "apps\backend\.env"
    echo Backend configured with default settings!
)

REM Start the application
echo [4/4] Starting TuringLab...
echo.
echo ================================
echo   Services Starting
echo ================================
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:4000
echo ================================
echo.
echo Press Ctrl+C to stop all services
echo.

pnpm dev

pause
