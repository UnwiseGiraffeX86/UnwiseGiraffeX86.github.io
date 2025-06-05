import { getPosts } from '../../lib/posts'
import SectionHeading from '../../components/SectionHeading'

export default function BlogPage() {
  const posts = getPosts().slice(0, 3)
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SectionHeading id="blog">Blog</SectionHeading>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4 dark:border-zinc-700">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
            <div className="flex gap-2 text-xs my-2">
              {post.tags.map((t) => (
                <span key={t} className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded">
                  {t}
                </span>
              ))}
            </div>
            <a href="#" className="underline text-sm">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
