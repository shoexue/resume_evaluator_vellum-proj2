import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface DocumentUploadProps {
  onUpload: (file: File) => void
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsUploading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:5000/upload-document', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      if (data.success) {
        onUpload(file)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Failed to upload document:', error)
      setError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="p-4 mb-4 border-pink-200 bg-white">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document" className="text-pink-700">Upload Document to Vellum</Label>
          <div className="flex items-center gap-4">
            <input
              id="document"
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById('document')?.click()}
              disabled={isUploading}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              {isUploading ? 'Uploading to Vellum...' : 'Choose File'}
            </Button>
            {uploadedFile && (
              <span className="text-sm text-pink-600">
                {uploadedFile.name}
              </span>
            )}
          </div>
          {error && (
            <span className="text-sm text-red-500">
              {error}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
} 