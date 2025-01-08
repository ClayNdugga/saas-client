import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MessageProps {
  role: "system" | "user"
  content: string
}

export function Message({ role, content }: MessageProps) {
  const isUser = role === "user"

  return (
    <div className={`flex items-start space-x-2 mb-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div 
        className={`p-3 rounded-lg max-w-[80%] ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
      {isUser && (
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}