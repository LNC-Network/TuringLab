#!/bin/bash

# TuringLab Startup Script for Unix/Mac
# This script checks prerequisites and starts the application

set -e

echo "================================"
echo "   TuringLab Startup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "[1/4] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR]${NC} Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node --version) found"

# Check if pnpm is installed
echo "[2/4] Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}[WARNING]${NC} pnpm is not installed!"
    echo "Installing pnpm globally..."
    npm install -g pnpm
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERROR]${NC} Failed to install pnpm"
        exit 1
    fi
fi
echo -e "${GREEN}✓${NC} pnpm $(pnpm --version) found"

# Check if Ollama is running
echo "[3/4] Checking Ollama..."
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${YELLOW}[WARNING]${NC} Ollama is not running!"
    echo ""
    echo "Please start Ollama:"
    echo "  1. Open Ollama app, or"
    echo "  2. Run: ollama serve"
    echo ""
    echo "After starting Ollama, press Enter to continue..."
    read -r

    # Check again
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo -e "${RED}[ERROR]${NC} Ollama is still not accessible"
        echo "Please make sure Ollama is running before starting TuringLab"
        exit 1
    fi
fi
echo -e "${GREEN}✓${NC} Ollama is running"

# Check if dependencies are installed
echo "[4/4] Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    pnpm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERROR]${NC} Failed to install dependencies"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} Dependencies already installed"
fi

# Check if .env exists in backend
if [ ! -f "apps/backend/.env" ]; then
    echo "Creating backend .env file..."
    cp apps/backend/.env.example apps/backend/.env
    echo -e "${GREEN}✓${NC} Backend configured with default settings"
fi

# Start the application
echo ""
echo "================================"
echo "   Services Starting"
echo "================================"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://127.0.0.1:4000"
echo "================================"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Run the application
pnpm dev
