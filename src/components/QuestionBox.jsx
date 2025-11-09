import React, { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

export default function QuestionBox({ conversationId, onAsk, disabled }) {
  const [value, setValue] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const q = value.trim()
    if (!q) return
    setValue('')
    await onAsk?.(q)
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything about the uploaded PDF…"
          className="w-full rounded-xl border border-slate-200 bg-white/70 backdrop-blur px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
        />
        <Sparkles className="h-4 w-4 text-blue-500 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
      <button
        disabled={disabled}
        className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
