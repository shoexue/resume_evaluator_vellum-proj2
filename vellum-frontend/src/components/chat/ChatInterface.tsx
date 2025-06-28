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
        body: JSON.stringify({
          resume: resume.trim(),
          jobDescription: jobDescription.trim()
        })
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">AI Recruiter</h1>
                <p className="text-sm text-slate-600">AI-Powered Job Application Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
                <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Analytics</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Settings</a>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
                </div>
                <span className="text-sm font-medium text-slate-700">User</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
              <h1 className="relative text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Recruiter Assistant
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Get instant, professional feedback on your resume and job applications with our advanced AI-powered recruiter assistant
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">98%</h3>
                <p className="text-slate-600">Accuracy Rate</p>
              </Card>
              
              <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">2.3s</h3>
                <p className="text-slate-600">Average Response</p>
              </Card>
              
              <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">10K+</h3>
                <p className="text-slate-600">Applications Analyzed</p>
              </Card>
            </div>
          </div>

          {/* Input Form */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full blur-xl"></div>
            
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="resume" className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm">📄</span>
                    Your Resume
                  </Label>
                  <Textarea
                    id="resume"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Paste your resume text here...\n\nInclude your experience, skills, education, and achievements."
                    className="min-h-[300px] resize-none border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="jobDescription" className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">💼</span>
                    Job Description
                  </Label>
                  <Textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here...\n\nInclude requirements, responsibilities, and company details."
                    className="min-h-[300px] resize-none border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </div>
                  ) : (
                    '🚀 Get AI Recruiter Feedback'
                  )}
                </Button>
                
                <Button
                  onClick={handleGetFeedback}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    '⚡ Quick Analysis'
                  )}
                </Button>
              </div>
            </form>
          </Card>

          {/* Messages Output */}
          {messages.length > 0 && (
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg"></div>
              
              <div className="space-y-4 relative">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  Analysis Results
                  <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {messages.length} message{messages.length !== 1 ? 's' : ''}
                  </span>
                </h2>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      message.isConsoleOutput ? (
                        <div key={index} className="bg-slate-900 text-emerald-400 p-6 rounded-xl font-mono text-sm whitespace-pre overflow-x-auto border border-slate-700 shadow-lg">
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
              </div>
            </Card>
          )}

          {/* Empty State */}
          {messages.length === 0 && (
            <Card className="p-12 bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-tl from-emerald-400/20 to-blue-400/20 rounded-full blur-lg"></div>
              
              <div className="space-y-6 relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Ready to get started?
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                    Fill in your resume and job description above, then click one of the buttons to get instant AI-powered feedback from our advanced recruiter assistant.
                  </p>
                </div>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Instant Analysis
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Professional Feedback
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    AI-Powered Insights
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 