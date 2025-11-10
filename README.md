# TuringLab 🧪

A modern, ChatGPT-like interface with AI Agent capabilities powered by Ollama. Built as a monorepo with Next.js frontend and Express.js backend.

![TuringLab](https://img.shields.io/badge/TuringLab-AI%20Chat-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 💬 Chat Interface
- **ChatGPT-like UI**: Modern, clean interface with message bubbles and smooth animations
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Conversation History**: Maintains context across multiple messages
- **Real-time Responses**: Fast, responsive AI interactions
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines

### 🤖 AI Agent Mode
- **Tool Execution**: AI can use tools to accomplish complex tasks
- **Multi-step Reasoning**: Agent can chain multiple tool calls
- **Built-in Tools**:
  - 🧮 Calculator for mathematical operations
  - ⏰ Current time/date retrieval
  - 📁 File operations (list, read)
  - 💻 Code execution (JavaScript)
  - 🔍 Web search (placeholder - add your API)

### 🛠️ Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Node.js, Express.js, Ollama
- **Monorepo**: Turborepo with pnpm workspaces
- **AI**: Ollama (local LLM inference)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **pnpm** 9.0.0 or higher ([Install](https://pnpm.io/installation))
- **Ollama** ([Install](https://ollama.ai/))

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Clone the repository (if not already)
# cd TuringLab

# Install all dependencies
pnpm install
```

### 2. Setup Ollama

```bash
# Start Ollama service
ollama serve

# In another terminal, pull a model
ollama pull gemma2:2b

# Or try other models
ollama pull llama2
ollama pull mistral
ollama pull qwen2.5:3b
```

### 3. Configure Backend

```bash
# Navigate to backend
cd apps/backend

# Copy environment variables
cp .env.example .env

# Edit .env with your preferred settings
# OLLAMA_URL=http://localhost:11434
# OLLAMA_MODEL=gemma2:2b
# PORT=4000
```

### 4. Start the Application

```bash
# From the root directory, start everything
pnpm dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://127.0.0.1:4000

## 📖 Usage

### Basic Chat

1. Open http://localhost:3000 in your browser
2. Type a message in the input box
3. Press Enter or click Send
4. The AI will respond based on your message

### AI Agent Mode

1. Toggle the "AI Agent" switch in the header
2. Ask questions that require tools:
   - "What is 25 * 4 + 10?"
   - "What time is it?"
   - "List the files in the current directory"
   - "Execute: return [1,2,3].map(x => x * 2)"

The agent will automatically use the appropriate tools to answer your questions.

## 📁 Project Structure

```
TuringLab/
├── apps/
│   ├── frontend/              # Next.js frontend application
│   │   ├── app/
│   │   │   ├── page.tsx       # Main chat interface
│   │   │   ├── layout.tsx     # Root layout
│   │   │   └── globals.css    # Global styles
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── backend/               # Express.js backend server
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── agent/     # AI agent logic
│   │   │   │   │   ├── agent.js    # Agent orchestrator
│   │   │   │   │   └── tools.js    # Tool registry
│   │   │   │   └── ollama/    # Ollama client
│   │   │   │       └── ollama.js   # API wrapper
│   │   │   ├── routes/
│   │   │   │   ├── generate.js     # Text generation endpoint
│   │   │   │   └── agent.js        # Agent endpoint
│   │   │   └── server.js      # Express server
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── mcp-server/            # MCP server (optional)
│
├── packages/                  # Shared packages
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/
│
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # pnpm workspace config
├── turbo.json                 # Turborepo configuration
└── README.md                  # This file
```

## 🔧 Development

### Running Individual Apps

```bash
# Frontend only
cd apps/frontend
pnpm dev

# Backend only
cd apps/backend
pnpm dev
```

### Building for Production

```bash
# Build all apps
pnpm build

# Build specific app
cd apps/frontend
pnpm build
```

### Linting and Formatting

```bash
# Run linter
pnpm lint

# Format code
pnpm format

# Type check
pnpm check-types
```

## 📡 API Endpoints

### Text Generation

```bash
POST http://127.0.0.1:4000/api/generate
Content-Type: application/json

{
  "prompt": "What is the capital of France?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "content": "The capital of France is Paris."
}
```

### AI Agent

```bash
POST http://127.0.0.1:4000/api/agent
Content-Type: application/json

{
  "prompt": "What is 25 * 4 + 10?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "content": "The result is 110.",
  "toolsUsed": [
    {
      "name": "calculator",
      "parameters": {"expression": "25 * 4 + 10"},
      "result": {"success": true, "result": 110}
    }
  ],
  "steps": [...]
}
```

## 🛠️ Available Tools

| Tool | Description | Example Usage |
|------|-------------|---------------|
| **calculator** | Mathematical calculations | "What is 15 * 23?" |
| **get_current_time** | Get current date/time | "What time is it?" |
| **file_operations** | List or read files | "List files in current directory" |
| **code_executor** | Execute JavaScript code | "Run: return [1,2,3].reduce((a,b)=>a+b)" |
| **web_search** | Search the web (needs API) | "Search for latest AI news" |

## 🎨 Customization

### Changing AI Model

Edit `apps/backend/.env`:

```env
# Use a different model
OLLAMA_MODEL=llama2
OLLAMA_MODEL=mistral
OLLAMA_MODEL=qwen2.5:3b
```

### Adding New Tools

1. Open `apps/backend/src/lib/agent/tools.js`
2. Add tool definition to `availableTools` array
3. Implement the tool function
4. Add to switch statement in `executeTool()`

Example:
```javascript
{
  name: "weather",
  description: "Get current weather for a location",
  parameters: {
    location: "string - City name or coordinates"
  }
}
```

### Styling the Frontend

Edit `apps/frontend/app/globals.css` for colors and themes:

```css
:root {
  --background: #f9fafb;
  --foreground: #111827;
}
```

## 🐛 Troubleshooting

### Ollama Not Running

```bash
# Check if Ollama is accessible
curl http://localhost:11434/api/tags

# If not, start Ollama
ollama serve
```

### Port Already in Use

```bash
# Change backend port in apps/backend/.env
PORT=4001

# Change frontend port
cd apps/frontend
pnpm dev -p 3001
```

### Model Not Found

```bash
# List installed models
ollama list

# Pull required model
ollama pull gemma2:2b
```

### Dependencies Issues

```bash
# Clear and reinstall
rm -rf node_modules apps/*/node_modules
pnpm install

# Clear build cache
rm -rf apps/*/.next apps/*/.turbo
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd apps/frontend
vercel deploy
```

### Backend (Any Node.js Host)

```bash
cd apps/backend
npm start
```

Remember to:
- Set environment variables on your hosting platform
- Ensure Ollama is accessible from your backend
- Update CORS settings for production

## 📚 Documentation

- [Frontend README](apps/frontend/README.md) - Detailed frontend documentation
- [Backend README](apps/backend/README.md) - Backend API and agent documentation
- [Next.js Docs](https://nextjs.org/docs) - Next.js framework
- [Ollama Docs](https://github.com/ollama/ollama) - Ollama documentation

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Keep commits atomic and well-described

## 🔒 Security

### Important Notes

- **Code Execution**: The code executor tool is dangerous. Only use in trusted environments.
- **File Operations**: Restricted to current directory but still be cautious.
- **API Keys**: Never commit API keys. Use `.env` files and `.gitignore`.
- **CORS**: Restrict CORS in production to your frontend domain.

## 📊 Performance

### Recommended Models by Use Case

| Use Case | Model | Speed | Quality |
|----------|-------|-------|---------|
| Development/Testing | gemma2:2b | ⚡⚡⚡ | ⭐⭐ |
| Balanced | llama2 | ⚡⚡ | ⭐⭐⭐ |
| High Quality | mixtral | ⚡ | ⭐⭐⭐⭐ |
| Code Tasks | qwen2.5:3b | ⚡⚡ | ⭐⭐⭐ |

### Optimization Tips

1. **Use smaller models** for faster responses
2. **Limit conversation history** to last 5-10 messages
3. **Enable GPU acceleration** (CUDA/Metal) if available
4. **Optimize prompts** - shorter is often faster

## 📝 Changelog

### v1.0.0 (Current)
- ✨ ChatGPT-like interface
- 🤖 AI Agent mode with tool execution
- 💬 Conversation history
- 🌓 Dark mode support
- 🛠️ 5 built-in tools
- 📱 Responsive design

## 🗺️ Roadmap

- [ ] Streaming responses
- [ ] Message editing and deletion
- [ ] Conversation export (JSON/Markdown)
- [ ] Multi-conversation management
- [ ] Voice input/output
- [ ] Image generation support
- [ ] Custom plugin system
- [ ] User authentication
- [ ] Cloud deployment guide
- [ ] Docker support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) - Local LLM inference
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform
- [Turborepo](https://turbo.build/) - Monorepo tool

## 💬 Support

Need help? Have questions?

- 📖 Check the [documentation](apps/frontend/README.md)
- 🐛 [Open an issue](https://github.com/yourusername/TuringLab/issues)
- 💡 [Start a discussion](https://github.com/yourusername/TuringLab/discussions)
- 📧 Email: support@turinglab.com

## ⭐ Star Us!

If you find this project helpful, please consider giving it a star on GitHub!

---

<div align="center">

**Built with ❤️ by developers, for developers**

[Website](https://turinglab.com) • [Documentation](./docs) • [Report Bug](https://github.com/yourusername/TuringLab/issues) • [Request Feature](https://github.com/yourusername/TuringLab/issues)

</div>