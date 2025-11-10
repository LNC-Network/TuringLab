# TuringLab Backend

A powerful backend server for TuringLab Chat that supports both text generation and AI agent capabilities powered by Ollama.

## Features

- 🤖 **Text Generation**: Standard LLM text generation with conversation history
- 🛠️ **AI Agent Mode**: Intelligent agent that can use tools to accomplish tasks
- 📝 **Conversation Context**: Maintains conversation history for coherent dialogues
- 🔧 **Tool Execution**: Built-in tools for calculations, time, file operations, and more
- 🚀 **Fast & Lightweight**: Built on Express.js with minimal dependencies
- 🔄 **Streaming Support**: Real-time response streaming (coming soon)

## Prerequisites

- Node.js 18 or higher
- [Ollama](https://ollama.ai/) installed and running locally
- At least one Ollama model downloaded (e.g., `gemma2:2b`, `llama2`, `mistral`)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables:
```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=gemma2:2b
PORT=4000
HOST=127.0.0.1
```

## Getting Started

### Start Ollama

Make sure Ollama is running on your system:

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not running, start Ollama
ollama serve
```

### Pull a Model

Download a model if you haven't already:

```bash
# Recommended lightweight model
ollama pull gemma2:2b

# Or other models
ollama pull llama2
ollama pull mistral
ollama pull qwen2.5:3b
```

### Start the Server

```bash
# Development mode (with auto-reload)
pnpm dev

# Production mode
pnpm start
```

The server will start at `http://127.0.0.1:4000`

## API Endpoints

### Health Check

```bash
GET /
GET /health
```

Returns server status and available endpoints.

### Text Generation

```bash
POST /api/generate
```

**Request Body:**
```json
{
  "prompt": "What is the capital of France?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you?",
      "timestamp": "2024-01-01T00:00:01.000Z"
    }
  ]
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
POST /api/agent
```

**Request Body:**
```json
{
  "prompt": "What is 25 * 4 + 10?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "content": "The result of 25 * 4 + 10 is 110.",
  "toolsUsed": [
    {
      "name": "calculator",
      "parameters": {
        "expression": "25 * 4 + 10"
      },
      "result": {
        "success": true,
        "result": 110,
        "response": "The result of 25 * 4 + 10 is 110"
      }
    }
  ],
  "steps": [
    {
      "iteration": 1,
      "type": "llm_response",
      "content": "..."
    },
    {
      "iteration": 1,
      "type": "tool_execution",
      "tool": "calculator",
      "parameters": {...},
      "result": {...}
    }
  ]
}
```

## Available Tools

The AI Agent has access to the following tools:

### 1. Calculator
Perform mathematical calculations.

```json
{
  "name": "calculator",
  "parameters": {
    "expression": "2 + 2 * 3"
  }
}
```

### 2. Get Current Time
Get current date and time.

```json
{
  "name": "get_current_time",
  "parameters": {
    "timezone": "UTC"
  }
}
```

### 3. File Operations
List or read files (restricted to current directory).

```json
{
  "name": "file_operations",
  "parameters": {
    "operation": "list"
  }
}
```

### 4. Code Executor
Execute simple JavaScript code (use with caution).

```json
{
  "name": "code_executor",
  "parameters": {
    "code": "return Array.from({length: 5}, (_, i) => i * 2);"
  }
}
```

### 5. Web Search
Search for information (requires API integration).

```json
{
  "name": "web_search",
  "parameters": {
    "query": "latest AI developments"
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── lib/
│   │   ├── agent/
│   │   │   ├── agent.js       # AI agent orchestrator
│   │   │   └── tools.js       # Tool registry and execution
│   │   └── ollama/
│   │       └── ollama.js      # Ollama API client
│   ├── routes/
│   │   ├── generate.js        # Text generation endpoint
│   │   └── agent.js           # AI agent endpoint
│   └── server.js              # Express server setup
├── .env.example               # Environment variables template
├── package.json
└── README.md
```

## How It Works

### Text Generation Mode

1. User sends a prompt with optional conversation history
2. System builds context from previous messages
3. Ollama generates a response based on the context
4. Response is returned to the user

### AI Agent Mode

1. User sends a prompt
2. Agent analyzes if tools are needed
3. If tools are required:
   - Agent identifies the appropriate tool
   - Executes the tool with parameters
   - Receives the tool result
   - Continues reasoning or provides final answer
4. Agent returns response with tool usage information

## Configuration

### Environment Variables

- `OLLAMA_URL`: Ollama server URL (default: `http://localhost:11434`)
- `OLLAMA_MODEL`: Default model to use (default: `gemma2:2b`)
- `PORT`: Server port (default: `4000`)
- `HOST`: Server host (default: `127.0.0.1`)

### Model Selection

You can change the model in `.env`:

```env
# Lightweight models (fast)
OLLAMA_MODEL=gemma2:2b
OLLAMA_MODEL=qwen2.5:3b

# Medium models (balanced)
OLLAMA_MODEL=llama2
OLLAMA_MODEL=mistral

# Large models (more capable)
OLLAMA_MODEL=llama2:13b
OLLAMA_MODEL=mixtral
```

## Development

### Adding New Tools

1. Open `src/lib/agent/tools.js`
2. Add tool definition to `availableTools` array:

```javascript
{
  name: "my_new_tool",
  description: "What this tool does",
  parameters: {
    param1: "description of param1"
  }
}
```

3. Implement the tool function:

```javascript
async function executeMyNewTool(params) {
  // Your implementation
  return {
    success: true,
    result: "...",
    response: "Tool executed successfully"
  };
}
```

4. Add tool to the switch statement in `executeTool()`:

```javascript
case "my_new_tool":
  return await executeMyNewTool(parameters);
```

### Running Tests

```bash
pnpm test
```

## Troubleshooting

### Ollama Connection Issues

**Error:** `Failed to generate text: fetch failed`

**Solution:**
1. Check if Ollama is running: `curl http://localhost:11434/api/tags`
2. Start Ollama if not running: `ollama serve`
3. Verify the `OLLAMA_URL` in `.env`

### Model Not Found

**Error:** `model 'xyz' not found`

**Solution:**
```bash
# List available models
ollama list

# Pull the required model
ollama pull gemma2:2b
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
- Change the `PORT` in `.env` to a different port
- Or stop the process using port 4000

### Slow Responses

**Issue:** Generation takes too long

**Solution:**
- Use a smaller model (e.g., `gemma2:2b` instead of larger models)
- Reduce `max_tokens` in generation options
- Ensure your system has adequate RAM and CPU

## Security Considerations

⚠️ **Important Security Notes:**

1. **Code Execution Tool**: The `code_executor` tool runs arbitrary JavaScript. Only enable this in trusted environments or with proper sandboxing.

2. **File Operations**: File access is restricted to the current directory, but still be cautious about what you expose.

3. **API Keys**: Never commit API keys to version control. Use `.env` file and add it to `.gitignore`.

4. **CORS**: The server currently allows all origins (`*`). In production, restrict this to your frontend domain.

5. **Input Validation**: Always validate and sanitize user inputs, especially when using tools.

## Performance Tips

1. **Use Appropriate Models**: Smaller models like `gemma2:2b` are faster for simple tasks
2. **Limit Context**: Keep conversation history to last 5-10 messages
3. **Optimize Prompts**: Shorter, clearer prompts generate faster responses
4. **GPU Acceleration**: Use CUDA/Metal for faster inference if available

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

For issues and questions:
- Check existing issues in the repository
- Create a new issue with detailed information
- Include error messages and environment details

---

Built with ❤️ using Express.js and Ollama