import { Card } from "@/components/ui/card"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-4xl ${isUser 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
        : 'bg-white border-2 border-slate-200 shadow-lg'
      }`}>
        <div className="p-6">
          <div className={`flex items-center gap-2 mb-3 ${isUser ? 'text-blue-100' : 'text-slate-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              isUser 
                ? 'bg-white/20 text-white' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            }`}>
              {isUser ? '👤' : '🤖'}
            </div>
            <span className="font-semibold">
              {isUser ? 'Your Submission' : 'AI Recruiter Feedback'}
            </span>
          </div>
          <div className={`whitespace-pre-wrap leading-relaxed ${
            isUser ? 'text-white' : 'text-slate-800'
          }`}>
            {message}
          </div>
        </div>
      </Card>
    </div>
  )
} 