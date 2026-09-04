import type { JobRequirement, ProfessionalFact } from '../types/domain'

interface MatchItemProps {
  requirement: JobRequirement
  facts: ProfessionalFact[]
}

export function MatchItem({ requirement, facts }: MatchItemProps) {
  const evidenceFact = facts.find((fact) => fact.id === requirement.evidence[0]?.factId)
  const evidenceText = requirement.evidence[0]?.explanation

  return (
    <li className="match-item">
      <span className="match-item__indicator" aria-hidden="true" />
      <div>
        <strong>{requirement.description}</strong>
        {evidenceText && (
          <p>
            {evidenceText}
            {evidenceFact && (
              <span className="evidence-source">Onde isso apareceu: {evidenceFact.title}</span>
            )}
          </p>
        )}
        {!evidenceText && (
          <p>A Lia ainda não encontrou essa informação nos dados cadastrados.</p>
        )}
      </div>
    </li>
  )
}
