interface Item {
  year: string
  title: string
  description: string
}

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <ul className="border-l border-zinc-400 dark:border-zinc-600 pl-4">
      {items.map((item) => (
        <li key={item.year} className="mb-4">
          <div className="font-bold">{item.year} – {item.title}</div>
          <p className="text-sm">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}
