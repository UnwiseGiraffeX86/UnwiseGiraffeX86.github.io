'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    await fetch('/api/contact', {
      method: 'POST',
      body: new FormData(e.currentTarget),
    })
    setStatus('sent')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="w-full border px-3 py-2 dark:border-zinc-700"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full border px-3 py-2 dark:border-zinc-700"
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        className="w-full border px-3 py-2 dark:border-zinc-700"
      />
      <button type="submit" disabled={status==='loading'} className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black">
        {status === 'sent' ? 'Sent!' : 'Send'}
      </button>
    </form>
  )
}
