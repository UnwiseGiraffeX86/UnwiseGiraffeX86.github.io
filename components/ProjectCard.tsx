import Image from 'next/image'
import { motion } from 'framer-motion'

interface Project {
  title: string
  image: string
  tech: string[]
  summary: string
  live: string
  code: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border rounded-lg overflow-hidden dark:border-zinc-700"
    >
      <Image
        src={project.image}
        alt="project image"
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map((t) => (
            <span key={t} className="text-sm bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
        <p className="mb-4 text-sm">{project.summary}</p>
        <div className="flex gap-4 text-sm font-medium">
          <a href={project.live} className="underline" aria-label="Live site">
            Live
          </a>
          <a href={project.code} className="underline" aria-label="Source code">
            Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}
