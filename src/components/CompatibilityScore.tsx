import type { CompatibilityEstimate } from '../types/domain'

interface CompatibilityScoreProps {
  compatibility: CompatibilityEstimate
}

export function CompatibilityScore({ compatibility }: CompatibilityScoreProps) {
  const circumference = 2 * Math.PI * 48
  const dashOffset = circumference * (1 - compatibility.score / 100)

  return (
    <section className="compatibility-card" aria-labelledby="compatibility-title">
      <div className="score-visual" aria-label={`${compatibility.score}% de aderência estimada`}>
        <svg viewBox="0 0 112 112" aria-hidden="true">
          <circle className="score-track" cx="56" cy="56" r="48" />
          <circle
            className="score-progress"
            cx="56"
            cy="56"
            r="48"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span>
          <strong>{compatibility.score}%</strong>
          <small>estimativa</small>
        </span>
      </div>

      <div className="compatibility-copy">
        <h3 id="compatibility-title">{compatibility.label}</h3>
        <p>{compatibility.explanation}</p>
        <small className="score-disclaimer">{compatibility.disclaimer}</small>
      </div>
    </section>
  )
}
