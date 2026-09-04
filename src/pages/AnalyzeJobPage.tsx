import { useRef, useState, type RefObject } from 'react'
import { AnalysisResults } from '../components/AnalysisResults'
import { AnalysisWorkspace } from '../components/AnalysisWorkspace'
import { HomeHero } from '../components/HomeHero'
import type { JobFormValues } from '../components/JobAnalysisForm'
import { LiaMark } from '../components/LiaMark'
import { ProfileSetup, type ProfileSetupStage } from '../components/ProfileSetup'
import { ProjectStory } from '../components/ProjectStory'
import { creatorProfile, demoJob } from '../mocks/analysis'
import { createDemoAnalysis, createResumeSuggestion } from '../services/demoAnalysis'
import { organizeProfileText, ProfileTextError } from '../services/profileOrganizer'
import type {
  ActiveProfile,
  AdaptedResume,
  JobAnalysis,
  JobOpportunity,
  ProfessionalProfile,
} from '../types/domain'

type AnalysisState = 'initial' | 'loading' | 'analyzed'

export function AnalyzeJobPage() {
  const [profileStage, setProfileStage] = useState<ProfileSetupStage>('choose')
  const [draftText, setDraftText] = useState('')
  const [organizedProfile, setOrganizedProfile] = useState<ProfessionalProfile>()
  const [activeProfile, setActiveProfile] = useState<ActiveProfile>()
  const [profileError, setProfileError] = useState<string>()
  const [isOrganizing, setIsOrganizing] = useState(false)
  const [analysisState, setAnalysisState] = useState<AnalysisState>('initial')
  const [analysis, setAnalysis] = useState<JobAnalysis>()
  const [resume, setResume] = useState<AdaptedResume>()
  const profileSectionRef = useRef<HTMLElement>(null)
  const analysisSectionRef = useRef<HTMLElement>(null)
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null)

  function focusSection(ref: RefObject<HTMLElement | null>) {
    window.requestAnimationFrame(() => {
      ref.current?.focus({ preventScroll: true })
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function handleStart() {
    focusSection(activeProfile ? analysisSectionRef : profileSectionRef)
  }

  function activateProfile(profile: ProfessionalProfile, source: ActiveProfile['source']) {
    // O perfil ativo vive apenas no estado do React. Não usamos localStorage,
    // sessionStorage ou qualquer persistência silenciosa nesta demonstração.
    setActiveProfile({ profile, source })
    setAnalysisState('initial')
    setAnalysis(undefined)
    setResume(undefined)
    focusSection(analysisSectionRef)
  }

  function handleUseDemo() {
    activateProfile(creatorProfile, 'demo')
  }

  async function handleOrganizeProfile() {
    setProfileError(undefined)
    setIsOrganizing(true)

    // A espera curta existe apenas para deixar o estado visual perceptível. Nenhuma
    // requisição acontece: o texto é organizado por regras locais logo abaixo.
    await new Promise((resolve) => window.setTimeout(resolve, 650))

    try {
      const profile = organizeProfileText(draftText)
      setOrganizedProfile(profile)
      setProfileStage('review')
      focusSection(profileSectionRef)
    } catch (error) {
      setProfileError(
        error instanceof ProfileTextError
          ? error.message
          : 'Não consegui organizar esse texto. Revise o conteúdo e tente novamente.',
      )
    } finally {
      setIsOrganizing(false)
    }
  }

  function handleUsePersonal() {
    if (organizedProfile) activateProfile(organizedProfile, 'personal')
  }

  function handleChangeProfile() {
    setActiveProfile(undefined)
    setProfileStage('choose')
    setAnalysisState('initial')
    setAnalysis(undefined)
    setResume(undefined)
    focusSection(profileSectionRef)
  }

  async function handleAnalyze(values: JobFormValues) {
    if (!activeProfile) return

    setAnalysisState('loading')

    // Esta espera também é apenas visual. A análise seguinte roda no navegador com
    // regras fixas; não há IA generativa, backend ou request escondido.
    await new Promise((resolve) => window.setTimeout(resolve, 950))

    const job: JobOpportunity = {
      ...demoJob,
      id: 'job-current-session',
      role: values.role,
      company: values.company,
      description: values.description,
      url: values.url || undefined,
      area: values.role === demoJob.role ? demoJob.area : undefined,
    }
    const nextAnalysis = createDemoAnalysis(activeProfile.profile, job)

    setAnalysis(nextAnalysis)
    setResume(createResumeSuggestion(activeProfile.profile, nextAnalysis))
    setAnalysisState('analyzed')
    focusSection(resultsHeadingRef)
  }

  function handleResetAnalysis() {
    setAnalysisState('initial')
    setAnalysis(undefined)
    setResume(undefined)
    focusSection(analysisSectionRef)
  }

  return (
    <>
      <HomeHero onStart={handleStart} />
      <ProjectStory />

      {!activeProfile && (
        <ProfileSetup
          sectionRef={profileSectionRef}
          stage={profileStage}
          creatorProfile={creatorProfile}
          draftText={draftText}
          organizedProfile={organizedProfile}
          isOrganizing={isOrganizing}
          error={profileError}
          onDraftChange={(text) => {
            setDraftText(text)
            setProfileError(undefined)
          }}
          onUseDemo={handleUseDemo}
          onChoosePersonal={() => setProfileStage('paste')}
          onOrganize={handleOrganizeProfile}
          onUsePersonal={handleUsePersonal}
          onBackToChoice={() => {
            setProfileStage('choose')
            setProfileError(undefined)
          }}
          onBackToText={() => setProfileStage('paste')}
        />
      )}

      {activeProfile && (
        <AnalysisWorkspace
          sectionRef={analysisSectionRef}
          initialJob={demoJob}
          isLoading={analysisState === 'loading'}
          onSubmit={handleAnalyze}
          activeProfile={activeProfile}
          onChangeProfile={handleChangeProfile}
          announcement={
            analysisState === 'loading'
              ? 'A demo está separando os termos da vaga.'
              : analysisState === 'analyzed'
                ? 'Pronto. A análise foi concluída.'
                : ''
          }
        />
      )}

      {analysisState === 'analyzed' && analysis && resume && activeProfile && (
        <section className="results-section" aria-labelledby="analysis-result-title">
          <div className="container-xl">
            <h2
              className="visually-hidden"
              id="analysis-result-title"
              ref={resultsHeadingRef}
              tabIndex={-1}
            >
              Resultado da análise
            </h2>
            <AnalysisResults
              analysis={analysis}
              profile={activeProfile.profile}
              profileSource={activeProfile.source}
              resume={resume}
              onReset={handleResetAnalysis}
            />
          </div>
        </section>
      )}

      <footer className="app-footer">
        <div className="container-xl">
          <LiaMark size="small" />
          <span>Lia — demo local e determinística, sem IA generativa ou armazenamento.</span>
        </div>
      </footer>
    </>
  )
}
