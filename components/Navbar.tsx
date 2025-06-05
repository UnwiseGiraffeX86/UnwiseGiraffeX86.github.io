'use client'
import { useEffect, useState } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav
      className={`fixed w-full z-10 transition-colors ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur' : 'bg-transparent'}`}
    >
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#home" className="font-bold">
          Stefan Portfolio
        </a>
        <div className="flex items-center gap-4">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}
