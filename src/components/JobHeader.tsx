import type { JobAnalysis } from '../types/domain'

interface JobHeaderProps {
  analysis: JobAnalysis
}

export function JobHeader({ analysis }: JobHeaderProps) {
  return (
    <header className="job-header">
      <div>
        <span className="eyebrow">Resultado da comparação</span>
        <h2>{analysis.job.role}</h2>
        <div className="job-meta" aria-label="Informações da vaga">
          <span>{analysis.job.company}</span>
          {analysis.job.area && (
            <>
              <span className="meta-separator" aria-hidden="true" />
              <span>{analysis.job.area}</span>
            </>
          )}
        </div>
      </div>
      <span className="demo-badge">Dados de exemplo</span>
    </header>
  )
}
