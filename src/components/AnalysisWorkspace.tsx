import type { RefObject } from 'react'
import type { ActiveProfile, JobOpportunity } from '../types/domain'
import { ActiveProfileBar } from './ActiveProfileBar'
import { JobAnalysisForm, type JobFormValues } from './JobAnalysisForm'
import { LiaMark } from './LiaMark'

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
          <LiaMark size="medium" />
          <div>
            <span className="eyebrow">Vamos começar</span>
            <h2 id="workspace-title">Qual vaga você quer entender?</h2>
            <p>Use o exemplo preenchido ou cole outra descrição para testar.</p>
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
