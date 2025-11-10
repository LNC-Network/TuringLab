# Getting Started with TuringLab 🚀

Welcome to TuringLab! This guide will help you get up and running in less than 10 minutes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Setting Up Ollama](#setting-up-ollama)
4. [Starting the Application](#starting-the-application)
5. [Your First Chat](#your-first-chat)
6. [Using AI Agent Mode](#using-ai-agent-mode)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)

## Prerequisites

Before you begin, make sure you have these installed:

### Required Software

1. **Node.js** (version 18 or higher)
   ```bash
   # Check your Node.js version
   node --version
   ```
   If you don't have Node.js or need to upgrade:
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use [nvm](https://github.com/nvm-sh/nvm) for easy version management

2. **pnpm** (version 9.0.0 or higher)
   ```bash
   # Check your pnpm version
   pnpm --version
   
   # If not installed, install it globally
   npm install -g pnpm
   ```

3. **Ollama** (for running AI models locally)
   - Download from [ollama.ai](https://ollama.ai/)
   - Available for macOS, Linux, and Windows

### System Requirements

- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 10GB free space (for models)
- **OS**: Windows 10+, macOS 10.15+, or Linux

## Installation

### Step 1: Clone or Navigate to the Project

```bash
# If you haven't already, navigate to the TuringLab directory
cd TuringLab
```

### Step 2: Install Dependencies

```bash
# Install all dependencies for all packages
pnpm install
```

This will install dependencies for:
- Frontend (Next.js app)
- Backend (Express server)
- Shared packages

**Expected output:**
```
Progress: resolved XXX, reused XXX, downloaded XXX
Packages: +XXX
```

If you see any errors, check the [Troubleshooting](#troubleshooting) section.

## Setting Up Ollama

Ollama is what powers the AI. It runs models locally on your machine.

### Step 1: Install Ollama

Download and install from [ollama.ai](https://ollama.ai/)

**For macOS:**
```bash
# Download and install the .app, or use brew
brew install ollama
```

**For Windows:**
- Download the installer from ollama.ai
- Run the installer
- Ollama will start automatically

**For Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 2: Start Ollama

```bash
# Start the Ollama service
ollama serve
```

You should see:
```
Ollama is running
```

**Note:** On Windows and macOS, Ollama usually starts automatically after installation.

### Step 3: Pull a Model

Open a new terminal window and download an AI model:

```bash
# Recommended: Small, fast model (2GB)
ollama pull gemma2:2b

# Alternative: Larger, more capable model (4GB)
ollama pull llama2

# Alternative: Good balance (1.9GB)
ollama pull qwen2.5:3b
```

**Download progress:**
```
pulling manifest
pulling xxx... 100%
verifying sha256 digest
success
```

### Step 4: Test Ollama

```bash
# Test that the model works
ollama run gemma2:2b "Hello, who are you?"
```

You should see an AI response. Press `Ctrl+D` to exit the chat.

## Starting the Application

### Step 1: Configure the Backend

```bash
# Navigate to backend directory
cd apps/backend

# Copy the example environment file
cp .env.example .env

# Open .env and verify settings (optional)
# Default settings should work fine:
# OLLAMA_URL=http://localhost:11434
# OLLAMA_MODEL=gemma2:2b
# PORT=4000
# HOST=127.0.0.1
```

### Step 2: Start Everything

Go back to the root directory and start all services:

```bash
# From TuringLab root directory
cd ../..

# Start both frontend and backend
pnpm dev
```

**What's happening:**
- Backend server starts on `http://127.0.0.1:4000`
- Frontend starts on `http://localhost:3000`
- Turborepo manages both processes

**Expected output:**
```
@turinglab/backend:dev: 🚀 Server is running at http://127.0.0.1:4000
@turinglab/frontend:dev: ▲ Next.js 16.0.0
@turinglab/frontend:dev: - Local: http://localhost:3000
```

### Step 3: Open Your Browser

Navigate to:
```
http://localhost:3000
```

You should see the TuringLab chat interface! 🎉

## Your First Chat

### Basic Conversation

1. **Type a message** in the input box at the bottom
   - Example: "Hello, who are you?"

2. **Press Enter** or click the send button

3. **Wait for the response** (you'll see animated dots)

4. **Continue the conversation**
   - The AI remembers previous messages in the conversation

### Try These Examples

**Simple Questions:**
```
What is the capital of France?
Explain quantum computing in simple terms.
Write a haiku about coding.
```

**Creative Tasks:**
```
Write a short story about a robot.
Generate 5 name ideas for a pet dragon.
Create a recipe using chicken and mushrooms.
```

**Code Help:**
```
Explain how promises work in JavaScript.
Write a function to reverse a string.
What's the difference between let and const?
```

## Using AI Agent Mode

AI Agent mode allows the AI to use tools like a calculator, file reader, and more.

### Step 1: Enable Agent Mode

Click the **"AI Agent"** toggle switch in the header. It should turn blue.

### Step 2: Try Tool-Using Tasks

**Calculator:**
```
What is 25 * 4 + 10?
Calculate the square root of 144.
What's 15% of 240?
```

**Time/Date:**
```
What time is it?
What's today's date?
What time is it in UTC?
```

**File Operations:**
```
List files in the current directory.
Read the package.json file.
```

**Code Execution:**
```
Execute: return [1,2,3,4,5].map(x => x * 2)
Run: return Math.PI * 10 * 10
Calculate: return Array.from({length: 10}, (_, i) => i + 1).reduce((a, b) => a + b)
```

### Step 3: Watch the Agent Work

When using tools, you'll see:
- The AI identifying which tool to use
- Tool execution results
- Final answer incorporating the tool's output

## Troubleshooting

### Issue: "Cannot find module"

**Solution:**
```bash
# Clear everything and reinstall
rm -rf node_modules apps/*/node_modules
pnpm install
```

### Issue: "Error contacting backend"

**Check 1:** Is the backend running?
```bash
# Check if backend is accessible
curl http://127.0.0.1:4000/health
```

**Check 2:** Is Ollama running?
```bash
# Check Ollama
curl http://localhost:11434/api/tags
```

**Check 3:** Are ports available?
- Backend: Port 4000
- Frontend: Port 3000

### Issue: "Model not found"

**Solution:**
```bash
# List installed models
ollama list

# Pull the required model
ollama pull gemma2:2b
```

### Issue: Slow responses

**Solutions:**
1. **Use a smaller model:**
   ```bash
   ollama pull gemma2:2b  # Faster
   ```

2. **Edit `.env`:**
   ```env
   OLLAMA_MODEL=gemma2:2b
   ```

3. **Close other applications** to free up RAM

4. **Enable GPU acceleration** (if you have a compatible GPU)

### Issue: Port already in use

**Backend (Port 4000):**
```bash
# Change port in apps/backend/.env
PORT=4001
```

**Frontend (Port 3000):**
```bash
# Start with different port
cd apps/frontend
pnpm dev -p 3001
```

### Issue: Build errors

**Solution:**
```bash
# Clear build cache
rm -rf apps/frontend/.next apps/backend/.turbo

# Rebuild
pnpm build
```

## Next Steps

### 1. Explore the Interface

- Try different types of questions
- Test both regular and agent mode
- Clear chat and start new conversations
- Enable dark mode (automatic based on system)

### 2. Customize Your Experience

**Change the AI Model:**
```bash
# Try a different model
ollama pull mistral
ollama pull llama2

# Update .env
OLLAMA_MODEL=mistral
```

**Adjust Response Length:**
Edit `apps/backend/src/lib/ollama/ollama.js`:
```javascript
max_tokens: 1024  // Default is 512
```

### 3. Add New Tools

Add custom tools for the AI agent:
1. Open `apps/backend/src/lib/agent/tools.js`
2. Add your tool definition
3. Implement the tool function
4. Test it in agent mode

### 4. Read the Documentation

- [Frontend README](apps/frontend/README.md) - UI customization
- [Backend README](apps/backend/README.md) - API and tools
- [Main README](README.md) - Complete overview

### 5. Deploy to Production

**Frontend (Vercel):**
```bash
cd apps/frontend
vercel deploy
```

**Backend (Any Node.js host):**
```bash
cd apps/backend
npm start
```

## Common Questions

### Q: Can I use this without Ollama?

A: Currently, TuringLab is built for Ollama. You could modify the backend to use OpenAI or other APIs, but that requires code changes.

### Q: How much RAM do I need?

A: 
- **Minimum**: 8GB (for gemma2:2b)
- **Recommended**: 16GB (for larger models)
- **Optimal**: 32GB+ (for multiple models)

### Q: Can I use this commercially?

A: Yes! TuringLab is MIT licensed. However, check the license for any models you use with Ollama.

### Q: Is my data sent to the cloud?

A: No! Everything runs locally on your machine. Ollama models run on your hardware, and no data is sent to external servers (unless you add external API integrations).

### Q: How do I update to the latest version?

```bash
# Pull latest changes (if from git)
git pull

# Update dependencies
pnpm install

# Rebuild
pnpm build
```

## Getting Help

If you're stuck:

1. **Check the logs** - Error messages often contain helpful info
2. **Review documentation** - README files have detailed information
3. **Search issues** - Someone might have had the same problem
4. **Ask for help** - Open an issue on GitHub

## Success Checklist

- [ ] Node.js 18+ installed
- [ ] pnpm installed
- [ ] Ollama installed and running
- [ ] At least one model pulled
- [ ] Dependencies installed (`pnpm install`)
- [ ] Backend configured (`.env` file)
- [ ] Both servers running (`pnpm dev`)
- [ ] Browser open to localhost:3000
- [ ] Successfully sent a message
- [ ] Tried AI Agent mode

## Congratulations! 🎉

You're now ready to use TuringLab! Explore, experiment, and have fun building with AI.

---

**Need More Help?**
- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/yourusername/TuringLab/issues)
- 💬 [Discussions](https://github.com/yourusername/TuringLab/discussions)

**Happy Coding!** 🚀