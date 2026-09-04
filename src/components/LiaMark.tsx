interface LiaMarkProps {
  size?: 'small' | 'medium' | 'large'
}

export function LiaMark({ size = 'medium' }: LiaMarkProps) {
  return (
    <span className={`lia-mark lia-mark--${size}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        <circle className="lia-mark__orbit" cx="24" cy="24" r="16" />
        <path className="lia-mark__focus" d="M24 5a19 19 0 0 1 19 19" />
        <path className="lia-mark__focus" d="M24 43A19 19 0 0 1 5 24" />
        <path className="lia-mark__conversation" d="M15 32.5 11.5 38l7.2-2.1" />
        <circle className="lia-mark__center" cx="24" cy="24" r="5" />
      </svg>
    </span>
  )
}
