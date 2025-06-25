import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./ChatMessage"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Message {
  content: string
  isUser: boolean
  timestamp: Date
  isConsoleOutput?: boolean
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resume.trim() || !jobDescription.trim() || isProcessing) return

    setIsProcessing(true)

    // Add user inputs to messages
    setMessages([
      {
        content: "Resume:\n" + resume + "\n\nJob Description:\n" + jobDescription,
        isUser: true,
        timestamp: new Date()
      }
    ])

    try {
      const response = await fetch('http://localhost:5000/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          resume: resume.trim(),
          jobDescription: jobDescription.trim()
        })
      })
      
      const data = await response.json()
      
      if (data.response) {
        setMessages(prev => [...prev, {
          content: data.response,
          isUser: false,
          timestamp: new Date()
        }])
      } else {
        setMessages(prev => [...prev, {
          content: "I couldn't generate a recruiter response. Please try again.",
          isUser: false,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Failed to get evaluation:', error)
      setMessages(prev => [...prev, {
        content: "Failed to get response from server. Please try again.",
        isUser: false,
        timestamp: new Date()
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGetFeedback = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('http://localhost:5000/run-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      })
      const data = await response.json()
      if (data.stdout && data.stdout.trim()) {
        setMessages(prev => [...prev, {
          content: data.stdout.trim(),
          isUser: false,
          timestamp: new Date()
        }])
      } else {
        setMessages(prev => [...prev, {
          content: "I couldn't generate a response. Please try again.",
          isUser: false,
          timestamp: new Date()
        }])
      }
      if (data.stderr) {
        console.error('Script error:', data.stderr)
      }
    } catch (error) {
      console.error('Failed to run script:', error)
      setMessages(prev => [...prev, {
        content: "Failed to get response from server. Please try again.",
        isUser: false,
        timestamp: new Date()
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[800px] w-full max-w-4xl mx-auto p-4 gap-4">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resume">Your Resume</Label>
            <Textarea
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume text here..."
              className="min-h-[200px]"
              disabled={isProcessing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
              disabled={isProcessing}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isProcessing ? 'Analyzing...' : 'Get Recruiter Feedback'}
          </Button>
        </form>
        <Button
          onClick={handleGetFeedback}
          disabled={isProcessing}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
          {isProcessing ? 'Running...' : 'Get Feedback (Script)'}
        </Button>
      </Card>

      {messages.length > 0 && (
        <Card className="p-6">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {messages.map((message, index) => (
                message.isConsoleOutput ? (
                  <div key={index} className="bg-black text-green-400 p-4 rounded-md font-mono text-sm whitespace-pre overflow-x-auto">
                    {message.content}
                  </div>
                ) : (
                <ChatMessage
                  key={index}
                  message={message.content}
                  isUser={message.isUser}
                />
                )
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  )
} 