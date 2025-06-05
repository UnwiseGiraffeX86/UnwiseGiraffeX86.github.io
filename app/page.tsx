import Image from 'next/image'
import { motion } from 'framer-motion'
import projects from '../data/projects.json'
import { getPosts } from '../lib/posts'
import { SITE_NAME, TAGLINE, BIO } from '../lib/constants'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import Timeline from '../components/Timeline'

export default function HomePage() {
  const posts = getPosts().slice(0, 3)
  return (
    <>
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold">{SITE_NAME}</h1>
        <p className="text-lg md:text-2xl">{TAGLINE}</p>
        <a
          href="#projects"
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black"
        >
          View Projects
        </a>
      </section>
      <section id="about" className="max-w-5xl mx-auto px-4 py-16">
        <SectionHeading id="about-heading">About</SectionHeading>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src="https://picsum.photos/seed/profile/200"
            width={200}
            height={200}
            alt="Profile photo"
            className="rounded-full"
          />
          <div>
            <p className="mb-4">{BIO}</p>
            <ul className="grid grid-cols-2 gap-2">
              {['Skill A', 'Skill B', 'Skill C', 'Skill D', 'Skill E', 'Skill F', 'Skill G', 'Skill H'].map(
                (skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-black dark:bg-white rounded-full" />
                    {skill}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
      <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
        <SectionHeading id="projects-heading">Projects</SectionHeading>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>
      <section id="blog" className="max-w-5xl mx-auto px-4 py-16">
        <SectionHeading id="blog-heading">Blog</SectionHeading>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-4 dark:border-zinc-700">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
              <a href="/blog" className="underline text-sm">
                Read more
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section id="resume" className="max-w-5xl mx-auto px-4 py-16">
        <SectionHeading id="resume-heading">Résumé</SectionHeading>
        <a
          href="https://example.com/resume.pdf"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
        <Timeline
          items={[
            {
              year: '2021',
              title: 'Job A',
              description: 'Lorem ipsum dolor sit amet.',
            },
            {
              year: '2022',
              title: 'Job B',
              description: 'Lorem ipsum dolor sit amet.',
            },
            {
              year: '2023',
              title: 'Job C',
              description: 'Lorem ipsum dolor sit amet.',
            },
          ]}
        />
      </section>
      <section id="contact" className="max-w-5xl mx-auto px-4 py-16">
        <SectionHeading id="contact-heading">Contact</SectionHeading>
        <ContactForm />
      </section>
    </>
  )
}
