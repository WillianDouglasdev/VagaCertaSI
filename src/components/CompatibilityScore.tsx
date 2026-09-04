import type { CompatibilityEstimate } from '../types/domain'

interface CompatibilityScoreProps {
  compatibility: CompatibilityEstimate
}

export function CompatibilityScore({ compatibility }: CompatibilityScoreProps) {
  return (
    <section className="compatibility-card" aria-labelledby="compatibility-title">
      <div className="score-visual" aria-label={`${compatibility.score}% de aderência estimada`}>
        <div>
          <strong>{compatibility.score}</strong>
          <span>%</span>
        </div>
        <small>compatibilidade estimada</small>
      </div>

      <div className="compatibility-copy">
        <h3 id="compatibility-title">{compatibility.label}</h3>
        <p>{compatibility.explanation}</p>
        <small className="score-disclaimer">{compatibility.disclaimer}</small>
      </div>
    </section>
  )
}
