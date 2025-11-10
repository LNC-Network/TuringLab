# TuringLab Documentation Index 📚

Welcome to TuringLab! This document serves as a central hub for all documentation.

## 🚀 Getting Started (Start Here!)

New to TuringLab? Follow this path:

1. **[README.md](README.md)** - Main project overview and introduction
2. **[GETTING_STARTED.md](GETTING_STARTED.md)** - Step-by-step setup guide (10 minutes)
3. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands and tips
4. **[FEATURES.md](FEATURES.md)** - Complete feature showcase

## 📖 Documentation Structure

### Core Documentation

| Document | Description | Audience |
|----------|-------------|----------|
| [README.md](README.md) | Project overview, tech stack, and basic setup | Everyone |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Detailed installation and first-run guide | New users |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Quick commands and troubleshooting | All users |
| [FEATURES.md](FEATURES.md) | Complete feature list and capabilities | Everyone |
| [DOCUMENTATION.md](DOCUMENTATION.md) | This file - documentation index | Everyone |

### Application-Specific Documentation

#### Frontend (Next.js)
- **Location**: `apps/frontend/README.md`
- **Contents**: UI customization, components, styling, deployment
- **Tech**: Next.js 16, React 19, TypeScript, Tailwind CSS 4

#### Backend (Express)
- **Location**: `apps/backend/README.md`
- **Contents**: API endpoints, AI agent, tools, Ollama integration
- **Tech**: Node.js, Express.js, Ollama

### Configuration Files

| File | Purpose |
|------|---------|
| `.env.example` | Environment variable template |
| `apps/backend/.env.example` | Backend-specific environment variables |
| `turbo.json` | Turborepo configuration |
| `pnpm-workspace.yaml` | pnpm workspace configuration |

## 🎯 Quick Navigation

### I want to...

#### Setup and Installation
- **Install TuringLab** → [GETTING_STARTED.md](GETTING_STARTED.md) → Installation section
- **Setup Ollama** → [GETTING_STARTED.md](GETTING_STARTED.md) → Setting Up Ollama
- **Configure environment** → `apps/backend/.env.example` + Backend README

#### Usage
- **Start the application** → [QUICK_REFERENCE.md](QUICK_REFERENCE.md) → Quick Start Commands
- **Use AI Agent mode** → [FEATURES.md](FEATURES.md) → AI Agent Tools section
- **Try example prompts** → [GETTING_STARTED.md](GETTING_STARTED.md) → Your First Chat

#### Development
- **Understand architecture** → [README.md](README.md) → Project Structure
- **Add new tools** → `apps/backend/README.md` → Adding New Tools
- **Customize UI** → `apps/frontend/README.md` → Customization
- **API reference** → `apps/backend/README.md` → API Endpoints

#### Troubleshooting
- **Fix common issues** → [QUICK_REFERENCE.md](QUICK_REFERENCE.md) → Troubleshooting
- **Check diagnostics** → [GETTING_STARTED.md](GETTING_STARTED.md) → Troubleshooting section
- **Port conflicts** → [QUICK_REFERENCE.md](QUICK_REFERENCE.md) → Emergency Commands

## 📦 Project Architecture

```
TuringLab/
│
├── 📄 Documentation Files (You are here!)
│   ├── README.md                    # Main project README
│   ├── GETTING_STARTED.md           # Setup and installation guide
│   ├── QUICK_REFERENCE.md           # Quick commands reference
│   ├── FEATURES.md                  # Feature showcase
│   ├── DOCUMENTATION.md             # This file (documentation index)
│   └── .env.example                 # Environment variables template
│
├── 🚀 Startup Scripts
│   ├── start.sh                     # Unix/Mac startup script
│   └── start.bat                    # Windows startup script
│
├── 💻 Applications
│   ├── apps/frontend/               # Next.js frontend application
│   │   ├── app/
│   │   │   ├── page.tsx            # Main chat interface
│   │   │   ├── layout.tsx          # Root layout
│   │   │   └── globals.css         # Global styles
│   │   ├── README.md               # Frontend documentation
│   │   └── package.json
│   │
│   ├── apps/backend/                # Express backend server
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── agent/          # AI agent orchestration
│   │   │   │   │   ├── agent.js    # Agent logic
│   │   │   │   │   └── tools.js    # Tool definitions
│   │   │   │   └── ollama/         # Ollama client
│   │   │   │       └── ollama.js   # API wrapper
│   │   │   ├── routes/             # API routes
│   │   │   │   ├── generate.js     # Text generation
│   │   │   │   └── agent.js        # Agent endpoint
│   │   │   └── server.js           # Express server
│   │   ├── .env.example            # Backend env template
│   │   ├── README.md               # Backend documentation
│   │   └── package.json
│   │
│   └── apps/mcp-server/             # MCP server (optional)
│
├── 📦 Shared Packages
│   ├── packages/eslint-config/      # Shared ESLint configuration
│   ├── packages/typescript-config/  # Shared TypeScript configuration
│   └── packages/ui/                 # Shared UI components
│
└── ⚙️ Configuration
    ├── package.json                 # Root package.json
    ├── pnpm-workspace.yaml          # Workspace configuration
    ├── turbo.json                   # Turborepo configuration
    └── tsconfig.json                # TypeScript base config
```

## 🔑 Key Concepts

### 1. Text Generation Mode
Standard chat mode for conversations, explanations, and content generation.
- **When to use**: General questions, creative writing, explanations
- **How it works**: Uses Ollama to generate contextual responses
- **Documentation**: [FEATURES.md](FEATURES.md) → Standard Chat Mode

### 2. AI Agent Mode
Advanced mode where AI can use tools to accomplish tasks.
- **When to use**: Calculations, file operations, code execution, data processing
- **How it works**: LLM identifies needed tools and executes them
- **Documentation**: [FEATURES.md](FEATURES.md) → AI Agent Mode

### 3. Conversation Context
Maintains message history for coherent conversations.
- **Keeps**: Last 5-10 messages for context
- **Benefits**: More natural, context-aware responses
- **Configuration**: `apps/backend/src/routes/generate.js`

### 4. Tool System
Extensible system for adding AI capabilities.
- **Built-in tools**: Calculator, time, file operations, code executor, web search
- **Custom tools**: Add your own in `apps/backend/src/lib/agent/tools.js`
- **Documentation**: `apps/backend/README.md` → Available Tools

## 🛠️ Development Workflow

### 1. Setup Development Environment
```bash
# Install dependencies
pnpm install

# Setup Ollama
ollama serve
ollama pull gemma2:2b

# Configure backend
cp apps/backend/.env.example apps/backend/.env
```

### 2. Start Development Servers
```bash
# Start everything
pnpm dev

# Or start individually
pnpm dev:frontend  # Port 3000
pnpm dev:backend   # Port 4000
```

### 3. Make Changes
- **Frontend**: Edit files in `apps/frontend/app/`
- **Backend**: Edit files in `apps/backend/src/`
- **Styles**: Modify `apps/frontend/app/globals.css`
- **Tools**: Add to `apps/backend/src/lib/agent/tools.js`

### 4. Test and Verify
```bash
# Run linter
pnpm lint

# Type check
pnpm check-types

# Format code
pnpm format
```

### 5. Build for Production
```bash
# Build all apps
pnpm build

# Or build individually
pnpm build:frontend
pnpm build:backend
```

## 📚 Learning Resources

### Understanding the Stack

#### Next.js (Frontend)
- **Official docs**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **What we use**: App Router, Server Components, TypeScript

#### React (Frontend)
- **Official docs**: https://react.dev/
- **Version**: 19.2.0
- **What we use**: Hooks, Function Components, State Management

#### Tailwind CSS (Styling)
- **Official docs**: https://tailwindcss.com/
- **Version**: 4
- **What we use**: Utility classes, Dark mode, Custom theme

#### Express.js (Backend)
- **Official docs**: https://expressjs.com/
- **What we use**: REST API, Middleware, Routing

#### Ollama (AI)
- **Official docs**: https://github.com/ollama/ollama
- **What we use**: Local LLM inference, Model management

### Code Examples

#### Adding a New Tool
See: `apps/backend/README.md` → Development → Adding New Tools

#### Customizing UI Colors
See: `apps/frontend/README.md` → Customization → Changing Colors

#### API Integration
See: `apps/backend/README.md` → API Endpoints

## 🐛 Troubleshooting Guide

### Common Issues

| Issue | Solution | Documentation |
|-------|----------|---------------|
| "Cannot connect to backend" | Check if backend is running on port 4000 | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| "Ollama not found" | Install and start Ollama service | [GETTING_STARTED.md](GETTING_STARTED.md) |
| "Model not found" | Pull required model with `ollama pull` | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| "Port already in use" | Change PORT in .env file | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| Slow responses | Use smaller model (gemma2:2b) | [README.md](README.md) |

### Getting Help

1. **Check documentation** - Most answers are in the docs
2. **Search issues** - Someone might have had the same problem
3. **Check logs** - Error messages contain helpful information
4. **Ask for help** - Open an issue on GitHub with details

## 🚀 Deployment

### Frontend Deployment
- **Platform**: Vercel (recommended)
- **Documentation**: `apps/frontend/README.md` → Deployment
- **Alternative**: Netlify, AWS Amplify, Any static host

### Backend Deployment
- **Requirements**: Node.js hosting, Ollama access
- **Options**: Heroku, DigitalOcean, AWS, GCP, Azure
- **Documentation**: `apps/backend/README.md` → Deployment

### Important Notes
- Ensure Ollama is accessible from backend
- Set environment variables on hosting platform
- Configure CORS for your frontend domain
- Use HTTPS in production

## 📊 Performance Tips

### Model Selection
- **Development**: gemma2:2b (fast)
- **Balanced**: llama2 or qwen2.5:3b
- **High quality**: mistral or mixtral

### Optimization
- Limit conversation history to 5-10 messages
- Use smaller models for faster responses
- Enable GPU acceleration if available
- Optimize prompts for clarity

See: [README.md](README.md) → Performance section

## 🔒 Security

### Important Security Notes
1. **Code Execution**: Disable in production or sandbox properly
2. **File Operations**: Already restricted to current directory
3. **API Keys**: Never commit to version control
4. **CORS**: Restrict to your frontend domain in production
5. **Input Validation**: Always validate user inputs

See: `apps/backend/README.md` → Security Considerations

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ ChatGPT-like interface
- ✅ AI Agent mode with tools
- ✅ Conversation history
- ✅ Dark mode support
- ✅ Responsive design

### Version 1.1 (Planned)
- ⏳ Streaming responses
- ⏳ Message editing/deletion
- ⏳ Conversation export
- ⏳ Multi-conversation support

### Version 2.0 (Future)
- 📋 Voice input/output
- 📋 Image generation
- 📋 File upload support
- 📋 User authentication
- 📋 Cloud sync

See: [FEATURES.md](FEATURES.md) → Future Features

## 💡 Tips for Success

### For New Users
1. Start with [GETTING_STARTED.md](GETTING_STARTED.md)
2. Try both chat and agent modes
3. Experiment with different models
4. Read the feature showcase
5. Check the quick reference for commands

### For Developers
1. Understand the project structure
2. Read both frontend and backend READMEs
3. Explore the codebase
4. Try adding a simple tool
5. Customize the UI to your liking

### For Contributors
1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Keep commits atomic
5. Submit clear pull requests

## 📞 Support and Community

### Documentation
- All documentation is in this repository
- Each app has its own README
- Check QUICK_REFERENCE.md for fast answers

### Issues and Bugs
- Open an issue on GitHub
- Include error messages and logs
- Describe steps to reproduce
- Mention your environment (OS, Node version, etc.)

### Feature Requests
- Open a discussion on GitHub
- Explain the use case
- Provide examples if possible
- Consider contributing!

## 🎓 Educational Value

TuringLab is perfect for learning:
- Modern web development (Next.js, React, TypeScript)
- Backend API design (Express.js)
- AI integration (Ollama)
- Monorepo architecture (Turborepo)
- Full-stack development
- Open source contribution

## ✅ Documentation Checklist

Before starting development:
- [ ] Read [README.md](README.md)
- [ ] Complete [GETTING_STARTED.md](GETTING_STARTED.md)
- [ ] Bookmark [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- [ ] Explore [FEATURES.md](FEATURES.md)
- [ ] Read app-specific READMEs
- [ ] Configure environment variables
- [ ] Test both chat and agent modes

## 🙏 Acknowledgments

Built with amazing open source technologies:
- Next.js by Vercel
- React by Meta
- Tailwind CSS
- Express.js
- Ollama
- And many more!

## 📄 License

MIT License - Feel free to use, modify, and distribute!

---

## Quick Links Summary

| Resource | Link |
|----------|------|
| **Main README** | [README.md](README.md) |
| **Setup Guide** | [GETTING_STARTED.md](GETTING_STARTED.md) |
| **Quick Reference** | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| **Features** | [FEATURES.md](FEATURES.md) |
| **Frontend Docs** | [apps/frontend/README.md](apps/frontend/README.md) |
| **Backend Docs** | [apps/backend/README.md](apps/backend/README.md) |
| **Environment Setup** | [.env.example](.env.example) |

---

<div align="center">

**Welcome to TuringLab!**

Start with [GETTING_STARTED.md](GETTING_STARTED.md) and begin your journey.

*Built with ❤️ by developers, for developers*

[Documentation](./DOCUMENTATION.md) • [Features](./FEATURES.md) • [Quick Start](./GETTING_STARTED.md) • [Support](https://github.com/yourusername/TuringLab/issues)

</div>