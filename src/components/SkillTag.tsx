interface SkillTagProps {
  children: string
  muted?: boolean
}

export function SkillTag({ children, muted = false }: SkillTagProps) {
  return <span className={`skill-tag${muted ? ' skill-tag--muted' : ''}`}>{children}</span>
}
