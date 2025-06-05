interface Props {
  id: string
  children: React.ReactNode
}

export default function SectionHeading({ id, children }: Props) {
  return (
    <h2 id={id} className="text-3xl font-bold mb-6">
      {children}
    </h2>
  )
}
