import DarkModeToggle from './DarkModeToggle'
import { EnvelopeIcon, GithubIcon, LinkedinIcon, TwitterIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="py-8 border-t dark:border-zinc-700" aria-label="Footer">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          <a href="https://github.com" aria-label="GitHub"><GithubIcon className="w-5 h-5"/></a>
          <a href="https://linkedin.com" aria-label="LinkedIn"><LinkedinIcon className="w-5 h-5"/></a>
          <a href="https://twitter.com" aria-label="Twitter"><TwitterIcon className="w-5 h-5"/></a>
          <a href="mailto:me@example.com" aria-label="Email"><EnvelopeIcon className="w-5 h-5"/></a>
        </div>
        <DarkModeToggle />
      </div>
    </footer>
  )
}
