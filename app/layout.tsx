import './globals.css'
import { Inter } from 'next/font/google'
import { SITE_NAME, SITE_DESCRIPTION } from '../lib/constants'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white text-black dark:bg-black dark:text-white">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
