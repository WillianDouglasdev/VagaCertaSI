interface LiaInsightProps {
  eyebrow: string
  title: string
  children: React.ReactNode
  tone?: 'plum' | 'coral'
}

export function LiaInsight({
  eyebrow,
  title,
  children,
  tone = 'plum',
}: LiaInsightProps) {
  return (
    <article className={`lia-insight lia-insight--${tone}`}>
      <div className="lia-insight__header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="lia-insight__content">{children}</div>
    </article>
  )
}
