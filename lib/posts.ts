import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export function getPosts(): Post[] {
  const files = fs.readdirSync(postsDir)
  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(content)
      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title as string,
        date: data.date as string,
        tags: data.tags as string[],
        excerpt: data.excerpt as string,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
