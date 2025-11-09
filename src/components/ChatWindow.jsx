import React, { useEffect, useRef } from 'react'

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-80 overflow-y-auto space-y-4 p-4 bg-white/60 backdrop-blur rounded-xl border border-slate-200/70">
      {messages.length === 0 && (
        <div className="text-center text-slate-500 text-sm">Ask a question about your PDF…</div>
      )}
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-800 border border-slate-200'
            }`}
          >
            {m.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
