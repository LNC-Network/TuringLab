# TuringLab Chat Frontend

A modern, ChatGPT-like interface built with Next.js 16, React 19, and Tailwind CSS. Features both standard text generation and AI Agent mode with tool execution capabilities.

## Features

- 💬 **ChatGPT-like Interface**: Clean, modern chat UI with message bubbles
- 🌓 **Dark Mode Support**: Automatic dark mode based on system preferences
- 🤖 **AI Agent Toggle**: Switch between normal chat and AI agent mode
- 📜 **Conversation History**: Maintains context across messages
- ⚡ **Real-time Responses**: Fast response rendering with loading indicators
- 🎨 **Beautiful Design**: Smooth animations and polished UI
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- ⌨️ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Font**: Geist Sans & Geist Mono

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Backend server running (see `apps/backend/README.md`)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Make sure the backend is running at `http://127.0.0.1:4000`

## Getting Started

### Development Mode

```bash
pnpm dev
```

The app will start at `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

## Usage

### Basic Chat

1. Type your message in the input box at the bottom
2. Press Enter or click the send button
3. Wait for the AI to respond
4. Continue the conversation

### AI Agent Mode

1. Toggle the "AI Agent" switch in the header
2. The AI can now use tools like:
   - Calculator for math operations
   - Time/date retrieval
   - File operations
   - Code execution
   - And more!
3. Ask questions that require tool usage (e.g., "What's 25 * 4 + 10?")

### Keyboard Shortcuts

- `Enter`: Send message
- `Shift + Enter`: New line in message
- Click "Clear": Reset conversation

## Project Structure

```
frontend/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.tsx             # Main chat interface
├── public/                  # Static assets
├── .next/                   # Build output (generated)
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # PostCSS configuration
├── package.json
└── README.md
```

## Configuration

### Backend URL

The frontend connects to the backend at `http://127.0.0.1:4000` by default. To change this:

Edit `app/page.tsx`:

```typescript
const endpoint = isAgentMode ? "/api/agent" : "/api/generate";
const res = await fetch(`http://YOUR_BACKEND_URL${endpoint}`, {
  // ...
});
```

### Styling

Colors, fonts, and other design tokens are configured in `app/globals.css`:

```css
:root {
  --background: #f9fafb;
  --foreground: #111827;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #111827;
    --foreground: #f9fafb;
  }
}
```

## Features in Detail

### Message Interface

- **User Messages**: Blue bubbles on the right with user avatar
- **AI Messages**: White/gray bubbles on the left with AI avatar
- **Timestamps**: Each message shows send/receive time
- **Auto-scroll**: Automatically scrolls to latest message
- **Loading State**: Animated dots while AI is thinking

### Agent Mode

When AI Agent mode is enabled:
- Toggle switch turns blue
- Status indicator shows "🤖 AI Agent Mode Active"
- Backend uses `/api/agent` endpoint
- AI can execute tools and provide detailed responses

### Responsive Design

- Desktop: Optimal width with centered content
- Tablet: Adjusted spacing and layout
- Mobile: Full-width with touch-friendly controls

### Dark Mode

Automatic dark mode support based on system preferences:
- Light mode: Clean white background
- Dark mode: Dark gray background with proper contrast
- Smooth transitions between modes

## Customization

### Changing Colors

Edit `app/globals.css`:

```css
/* Primary color (send button, user messages) */
.bg-blue-600 {
  background-color: #your-color;
}

/* Success color (AI avatar) */
.bg-green-600 {
  background-color: #your-color;
}
```

### Adjusting Layout

Maximum content width is set to `max-w-4xl`. To change:

```tsx
// In app/page.tsx
<div className="max-w-6xl mx-auto"> {/* Change from max-w-4xl */}
```

### Adding Features

The main component is in `app/page.tsx`. You can add:

- Message editing
- Message deletion
- Conversation export
- Message search
- Voice input
- Image uploads
- And more!

## API Integration

### Message Format

```typescript
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

### Request Format

```typescript
// Text Generation
fetch("http://127.0.0.1:4000/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: "Your message",
    conversationHistory: messages,
  }),
});

// AI Agent
fetch("http://127.0.0.1:4000/api/agent", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: "Your message",
    conversationHistory: messages,
  }),
});
```

### Response Format

```typescript
{
  content: "AI response text",
  toolsUsed: [...],      // Only in agent mode
  steps: [...]           // Only in agent mode
}
```

## Troubleshooting

### Backend Connection Issues

**Error**: "Error contacting backend"

**Solutions**:
1. Ensure backend is running: `cd apps/backend && pnpm dev`
2. Check backend URL in `page.tsx`
3. Verify CORS is enabled on backend
4. Check browser console for detailed errors

### Styling Issues

**Issue**: Tailwind classes not applying

**Solutions**:
1. Restart dev server: `pnpm dev`
2. Clear Next.js cache: `rm -rf .next`
3. Reinstall dependencies: `pnpm install`

### Build Errors

**Error**: Type errors during build

**Solutions**:
1. Check TypeScript version compatibility
2. Run type check: `pnpm check-types`
3. Update `@types/*` packages

## Performance Optimization

### Image Optimization

Use Next.js `Image` component for any images:

```tsx
import Image from "next/image";

<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

### Code Splitting

Next.js automatically code-splits by route. For client components, use dynamic imports:

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"));
```

### Bundle Analysis

Analyze bundle size:

```bash
npm install @next/bundle-analyzer
```

## Accessibility

The interface includes:
- Semantic HTML elements
- ARIA labels for buttons
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## Development Tips

1. **Hot Reload**: Changes auto-reload in development
2. **Error Overlay**: Helpful error messages in development
3. **React DevTools**: Install for component inspection
4. **TypeScript**: Leverage type safety for fewer bugs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Common Issues

### Port Already in Use

Change the port in `package.json`:

```json
"dev": "next dev -p 3001"
```

### Module Not Found

Clear cache and reinstall:

```bash
rm -rf node_modules .next
pnpm install
```

## Future Enhancements

- [ ] Streaming responses
- [ ] Message editing
- [ ] Conversation export (JSON/Markdown)
- [ ] Multi-conversation support
- [ ] Voice input/output
- [ ] Image generation support
- [ ] Custom themes
- [ ] Plugins system

## License

MIT License

## Support

For issues and questions:
- Check the main TuringLab README
- Open an issue on GitHub
- Check Next.js documentation: https://nextjs.org/docs

---

Built with ❤️ using Next.js and React