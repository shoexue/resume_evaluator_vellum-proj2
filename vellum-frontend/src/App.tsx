import { ChatInterface } from "@/components/chat/ChatInterface"

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">Resume Feedback AI</h1>
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg">
            Get instant feedback on your resume's match with job descriptions. 
            Our AI analyzes your resume against the job requirements and provides 
            recruiter-style feedback to help improve your chances.
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  )
}

export default App