import type { JobRequirement, RequirementCategory } from '../types/domain'

const categoryLabels: Record<RequirementCategory, string> = {
  essential: 'O que mais importa',
  desirable: 'O que ajuda',
  behavioral: 'Como esperam que você trabalhe',
  technology: 'Tecnologias',
}

interface RequirementGroupProps {
  category: RequirementCategory
  requirements: JobRequirement[]
}

export function RequirementGroup({ category, requirements }: RequirementGroupProps) {
  return (
    <section className="requirement-group">
      <h4>{categoryLabels[category]}</h4>
      <ul>
        {requirements.map((requirement) => (
          <li key={requirement.id}>{requirement.description}</li>
        ))}
        {requirements.length === 0 && (
          <li className="empty-requirement">Nada apareceu neste grupo.</li>
        )}
      </ul>
    </section>
  )
}
