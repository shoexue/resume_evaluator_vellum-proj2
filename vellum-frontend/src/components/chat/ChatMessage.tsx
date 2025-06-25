import { Card } from "@/components/ui/card"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <Card className={`w-full ${isUser ? 'bg-blue-50' : 'bg-white'}`}>
      <div className="p-4">
        <div className={`text-sm ${isUser ? 'text-blue-800' : 'text-gray-800'}`}>
          <span className="font-semibold">
            {isUser ? 'Your Submission:' : 'Recruiter Feedback:'}
          </span>
        </div>
        <div className={`mt-2 whitespace-pre-wrap ${isUser ? 'text-blue-900' : 'text-gray-900'}`}>
          {message}
        </div>
      </div>
    </Card>
  )
} 