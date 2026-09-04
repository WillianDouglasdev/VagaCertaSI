import type { RefObject } from 'react'
import type { ActiveProfile, JobOpportunity } from '../types/domain'
import { ActiveProfileBar } from './ActiveProfileBar'
import { JobAnalysisForm, type JobFormValues } from './JobAnalysisForm'

interface AnalysisWorkspaceProps {
  sectionRef: RefObject<HTMLElement | null>
  initialJob: JobOpportunity
  isLoading: boolean
  onSubmit: (values: JobFormValues) => void
  announcement: string
  activeProfile: ActiveProfile
  onChangeProfile: () => void
}

export function AnalysisWorkspace({
  sectionRef,
  initialJob,
  isLoading,
  onSubmit,
  announcement,
  activeProfile,
  onChangeProfile,
}: AnalysisWorkspaceProps) {
  return (
    <section
      className="analysis-workspace"
      id="analisar"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="workspace-title"
    >
      <div className="container-xl">
        <ActiveProfileBar activeProfile={activeProfile} onChange={onChangeProfile} />

        <header className="workspace-heading">
          <div>
            <span className="eyebrow">02 / Vaga</span>
            <h2 id="workspace-title">Agora, a descrição da vaga</h2>
            <p>Deixei um exemplo preenchido. Você pode editar tudo antes de comparar.</p>
          </div>
        </header>

        <div className="workspace-form-wrap">
          <JobAnalysisForm initialJob={initialJob} isLoading={isLoading} onSubmit={onSubmit} />
        </div>

        <div className="loading-announcement" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>
    </section>
  )
}
