import React, { useRef, useState } from 'react'
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react'

export default function Uploader({ onUploaded }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [info, setInfo] = useState(null)

  const handleDrop = async (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) await uploadFile(file)
  }

  const uploadFile = async (file) => {
    setUploading(true)
    setInfo(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setInfo(data)
      onUploaded?.(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setUploading(false)
    }
  }

  const onChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) await uploadFile(file)
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-xl p-6 text-center bg-white/60 backdrop-blur hover:bg-white transition cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onChange}
        />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          ) : info ? (
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          ) : (
            <UploadCloud className="h-8 w-8 text-slate-600" />
          )}
          <div>
            <p className="text-slate-800 font-medium">Drop a PDF here or click to select</p>
            <p className="text-xs text-slate-500">We’ll extract text and make it searchable</p>
          </div>
          {info && (
            <div className="text-xs text-slate-600 bg-slate-100 rounded px-2 py-1">
              Uploaded {info.filename} • {info.num_pages} pages • {info.num_chunks} chunks
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
