import { useState } from "react";
import { ChatInputProps } from "@/interface/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    const newHeight = Math.min(target.scrollHeight, 128);
    target.style.height = newHeight + "px";
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <div className="rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-colors">
              <ScrollArea className="max-h-32 w-full">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onInput={handleInput}
                  placeholder="Type your message here..."
                  className="w-full resize-none px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[48px] border-0"
                  rows={1}
                  style={{ height: "auto" }}
                />
              </ScrollArea>
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className={`
              p-3 rounded-xl transition-colors flex-shrink-0
              ${
                message.trim()
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
