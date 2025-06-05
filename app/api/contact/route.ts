import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const formData = await request.formData()
  const message = {
    from: formData.get('email') as string,
    to: 'you@example.com',
    subject: 'Portfolio Contact',
    text: formData.get('message') as string,
  }
  // Stubbed transport - replace with real credentials
  const transport = nodemailer.createTransport({
    jsonTransport: true,
  })
  await transport.sendMail(message)
  return NextResponse.json({ ok: true })
}
