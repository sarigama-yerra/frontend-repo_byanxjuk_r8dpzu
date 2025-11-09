import React from 'react'
import { Bot, FileText, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200/70 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center shadow-sm">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-800">PDF Chatbot</h1>
            <p className="text-xs text-slate-500">Ask questions grounded in your documents</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <FileText className="h-4 w-4" />
          <span>Upload PDFs</span>
          <span className="mx-1">•</span>
          <Sparkles className="h-4 w-4" />
          <span>Contextual Answers</span>
        </div>
      </div>
    </header>
  )
}
