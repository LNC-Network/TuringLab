# TuringLab Quick Reference 📋

Quick reference guide for common tasks and commands.

## 🚀 Quick Start Commands

```bash
# Install everything
pnpm install

# Start Ollama
ollama serve

# Pull a model
ollama pull gemma2:2b

# Start the app
pnpm dev

# Open browser
# Frontend: http://localhost:3000
# Backend: http://127.0.0.1:4000
```

## 📦 Package Management

```bash
# Install dependencies
pnpm install

# Add package to frontend
cd apps/frontend
pnpm add <package-name>

# Add package to backend
cd apps/backend
pnpm add <package-name>

# Add dev dependency
pnpm add -D <package-name>

# Update all dependencies
pnpm update
```

## 🛠️ Development Commands

```bash
# Start everything in dev mode
pnpm dev

# Start specific app
cd apps/frontend && pnpm dev
cd apps/backend && pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

# Format code
pnpm format

# Type check
pnpm check-types
```

## 🤖 Ollama Commands

```bash
# Start Ollama
ollama serve

# Pull a model
ollama pull gemma2:2b
ollama pull llama2
ollama pull mistral
ollama pull qwen2.5:3b

# List installed models
ollama list

# Remove a model
ollama rm gemma2:2b

# Test a model
ollama run gemma2:2b "Hello!"

# Check if Ollama is running
curl http://localhost:11434/api/tags
```

## 🌐 API Endpoints

### Health Check
```bash
GET http://127.0.0.1:4000/
GET http://127.0.0.1:4000/health
```

### Text Generation
```bash
POST http://127.0.0.1:4000/api/generate
Content-Type: application/json

{
  "prompt": "Your question here",
  "conversationHistory": []
}
```

### AI Agent
```bash
POST http://127.0.0.1:4000/api/agent
Content-Type: application/json

{
  "prompt": "What is 25 * 4?",
  "conversationHistory": []
}
```

## 📁 Project Structure

```
TuringLab/
├── apps/
│   ├── frontend/          # Next.js app (Port 3000)
│   │   ├── app/
│   │   │   ├── page.tsx   # Main chat UI
│   │   │   ├── layout.tsx # Root layout
│   │   │   └── globals.css
│   │   └── package.json
│   │
│   └── backend/           # Express API (Port 4000)
│       ├── src/
│       │   ├── lib/
│       │   │   ├── agent/ # AI agent logic
│       │   │   └── ollama/# Ollama client
│       │   ├── routes/    # API routes
│       │   └── server.js  # Express server
│       ├── .env           # Configuration
│       └── package.json
│
├── packages/              # Shared packages
├── package.json           # Root config
└── pnpm-workspace.yaml    # Workspace config
```

## 🔧 Configuration Files

### Backend .env
```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=gemma2:2b
PORT=4000
HOST=127.0.0.1
```

### Key Files to Edit

| File | Purpose |
|------|---------|
| `apps/frontend/app/page.tsx` | Main UI component |
| `apps/frontend/app/globals.css` | Styles and theme |
| `apps/backend/src/server.js` | Server setup |
| `apps/backend/src/lib/agent/tools.js` | Tool definitions |
| `apps/backend/src/lib/ollama/ollama.js` | Ollama client |

## 🛠️ Available AI Agent Tools

| Tool | Usage Example |
|------|---------------|
| **calculator** | "What is 25 * 4 + 10?" |
| **get_current_time** | "What time is it?" |
| **file_operations** | "List files" |
| **code_executor** | "Execute: return [1,2,3].map(x => x*2)" |
| **web_search** | "Search for AI news" (needs API) |

## 🐛 Troubleshooting Quick Fixes

### Backend won't start
```bash
# Check if port is in use
netstat -ano | findstr :4000  # Windows
lsof -i :4000                 # Mac/Linux

# Change port in apps/backend/.env
PORT=4001
```

### Frontend won't start
```bash
# Clear cache
rm -rf apps/frontend/.next

# Start on different port
cd apps/frontend
pnpm dev -p 3001
```

### Ollama not working
```bash
# Check if running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve

# Check model is installed
ollama list
ollama pull gemma2:2b
```

### Dependencies issues
```bash
# Nuclear option - reinstall everything
rm -rf node_modules apps/*/node_modules apps/*/.next
pnpm install
```

## 🎨 Customization Quick Tips

### Change AI Model
```bash
# In apps/backend/.env
OLLAMA_MODEL=llama2
```

### Change Colors
```css
/* In apps/frontend/app/globals.css */
:root {
  --background: #yourcolor;
  --foreground: #yourcolor;
}
```

### Add New Tool
```javascript
// In apps/backend/src/lib/agent/tools.js

// 1. Add to availableTools array
{
  name: "my_tool",
  description: "What it does",
  parameters: {...}
}

// 2. Implement function
async function executeMyTool(params) {
  return { success: true, result: "..." };
}

// 3. Add to switch in executeTool()
case "my_tool":
  return await executeMyTool(parameters);
```

## 📊 Model Recommendations

| Model | Size | Speed | Quality | Use Case |
|-------|------|-------|---------|----------|
| gemma2:2b | 2GB | ⚡⚡⚡ | ⭐⭐ | Dev/Testing |
| qwen2.5:3b | 1.9GB | ⚡⚡ | ⭐⭐⭐ | Balanced |
| llama2 | 4GB | ⚡⚡ | ⭐⭐⭐ | General use |
| mistral | 4GB | ⚡⚡ | ⭐⭐⭐⭐ | High quality |
| mixtral | 26GB | ⚡ | ⭐⭐⭐⭐⭐ | Best quality |

## 🔐 Security Checklist

- [ ] Never commit `.env` files
- [ ] Disable `code_executor` in production
- [ ] Restrict CORS to your domain
- [ ] Validate all user inputs
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Review file operation permissions

## 🚀 Deployment Quick Guide

### Frontend (Vercel)
```bash
cd apps/frontend
vercel deploy
```

### Backend (Generic)
```bash
cd apps/backend
npm install
npm start
```

**Environment Variables to Set:**
- `OLLAMA_URL`
- `OLLAMA_MODEL`
- `PORT`
- `HOST`

## 📝 Git Commands

```bash
# Initial commit
git add .
git commit -m "Initial TuringLab setup"

# Create branch
git checkout -b feature/my-feature

# Push changes
git push origin main

# Pull latest
git pull origin main
```

## 🧪 Testing Locally

```bash
# Test backend health
curl http://127.0.0.1:4000/health

# Test text generation
curl -X POST http://127.0.0.1:4000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello"}'

# Test agent
curl -X POST http://127.0.0.1:4000/api/agent \
  -H "Content-Type: application/json" \
  -d '{"prompt":"What is 2+2?"}'

# Test Ollama
curl http://localhost:11434/api/tags
```

## 📱 Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 4000 | http://127.0.0.1:4000 |
| Ollama | 11434 | http://localhost:11434 |

## ⌨️ Keyboard Shortcuts (in UI)

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line |
| Click "Clear" | Clear chat |
| Toggle "AI Agent" | Switch modes |

## 🔗 Useful Links

- **Ollama**: https://ollama.ai/
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/
- **Express.js**: https://expressjs.com/
- **pnpm**: https://pnpm.io/

## 💡 Pro Tips

1. **Use smaller models** during development for faster iteration
2. **Keep conversation history** to 5-10 messages for better performance
3. **Enable GPU acceleration** if available (CUDA/Metal)
4. **Use agent mode** for tasks that need calculations or data
5. **Check Ollama logs** if models aren't responding
6. **Clear chat** to reset context when switching topics
7. **Use TypeScript** for better code quality
8. **Monitor RAM usage** when running large models

## 🆘 Emergency Commands

```bash
# Kill processes on ports
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Reset everything
rm -rf node_modules apps/*/node_modules apps/*/.next apps/*/.turbo
pnpm install
pnpm build

# Check what's running
ps aux | grep node    # Mac/Linux
tasklist | findstr node    # Windows
```

## 📞 Support

- 📖 [Full Documentation](README.md)
- 🚀 [Getting Started Guide](GETTING_STARTED.md)
- 🐛 [Report Issues](https://github.com/yourusername/TuringLab/issues)

---

**Last Updated**: 2024
**Version**: 1.0.0