import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Uploader from './components/Uploader'
import ChatWindow from './components/ChatWindow'
import QuestionBox from './components/QuestionBox'

function App() {
  const [docInfo, setDocInfo] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const init = async () => {
      if (docInfo?.document_id) {
        const form = new FormData()
        form.append('document_id', docInfo.document_id)
        const res = await fetch(`${backend}/start_conversation`, { method: 'POST', body: form })
        const data = await res.json()
        setConversationId(data.conversation_id)
      }
    }
    init()
  }, [docInfo, backend])

  const handleUploaded = (info) => {
    setMessages([])
    setDocInfo(info)
  }

  const ask = async (question) => {
    if (!conversationId) return
    setMessages((m) => [...m, { role: 'user', content: question }])
    setLoading(true)
    try {
      const res = await fetch(`${backend}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId, question }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.answer }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur">
            <h2 className="font-semibold text-slate-800 mb-2">Upload PDF</h2>
            <Uploader onUploaded={handleUploaded} />
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur">
            <h3 className="text-sm font-medium text-slate-700 mb-1">Status</h3>
            <p className="text-xs text-slate-600">
              {docInfo ? `Ready • ${docInfo.num_pages} pages • ${docInfo.num_chunks} chunks` : 'No document uploaded yet'}
            </p>
          </div>
        </section>
        <section className="lg:col-span-2 space-y-4">
          <ChatWindow messages={messages} />
          <QuestionBox onAsk={ask} disabled={!conversationId || loading} conversationId={conversationId} />
          {!conversationId && (
            <p className="text-xs text-slate-500">Upload a PDF to start a conversation.</p>
          )}
        </section>
      </main>

      <footer className="text-center text-xs text-slate-500 pb-8">
        Built for scalable, responsive chat with contextual understanding.
      </footer>
    </div>
  )
}

export default App
