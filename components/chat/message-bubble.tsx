// app/chat/MessageBubble.tsx
import { Message, MessageBubbleProps } from "@/interface/chat/message-bubble";

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3 max-w-4xl`}
      >
        {/* Avatar */}
        <div
          className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0
          ${
            isUser
              ? "bg-primary text-primary-foreground ml-3"
              : "bg-secondary text-secondary-foreground mr-3"
          }
        `}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Message Content */}
        <div
          className={`
          px-4 py-3 rounded-2xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl shadow-sm
          ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-card text-card-foreground border border-border rounded-bl-md"
          }
        `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}
