import type {
  AdaptedResume,
  JobAnalysis,
  MatchStatus,
  ProfessionalProfile,
  ProfileSource,
} from '../types/domain'
import { CompatibilityScore } from './CompatibilityScore'
import { JobHeader } from './JobHeader'
import { MatchItem } from './MatchItem'
import { LiaInsight } from './LiaInsight'
import { RequirementGroup } from './RequirementGroup'
import { ResumeHighlights } from './ResumeHighlights'
import { SkillTag } from './SkillTag'

interface AnalysisResultsProps {
  analysis: JobAnalysis
  profile: ProfessionalProfile
  profileSource: ProfileSource
  resume: AdaptedResume
  onReset: () => void
}

const matchGroups: Array<{
  status: MatchStatus
  title: string
  description: string
}> = [
  {
    status: 'match',
    title: 'Você já tem',
    description: 'A Lia encontrou exemplos disso no seu perfil.',
  },
  {
    status: 'partial',
    title: 'Você tem parte disso',
    description: 'Há algo relacionado, mas ainda vale explicar ou praticar melhor.',
  },
  {
    status: 'missing',
    title: 'Ainda não apareceu no seu perfil',
    description: 'Isso não quer dizer que você não saiba. A informação só não apareceu por aqui.',
  },
]

export function AnalysisResults({
  analysis,
  profile,
  profileSource,
  resume,
  onReset,
}: AnalysisResultsProps) {
  const requirementCategories = [
    'essential',
    'desirable',
    'behavioral',
  ] as const

  return (
    <div className="analysis-results">
      <div className="result-actions">
        <button className="text-button" type="button" onClick={onReset}>
          <span aria-hidden="true">←</span> Analisar outra vaga
        </button>
      </div>

      <div className="result-card result-card--hero">
        <JobHeader analysis={analysis} />
        <p className="job-summary">{analysis.summary}</p>
        <CompatibilityScore compatibility={analysis.compatibility} />
      </div>

      <section className="result-section" aria-labelledby="requirements-title">
        <div className="section-heading">
          <span className="section-number" aria-hidden="true">01</span>
          <div>
            <span className="eyebrow">Separando a vaga</span>
            <h2 id="requirements-title">O que a empresa está procurando</h2>
          </div>
        </div>

        <div className="requirements-grid">
          {requirementCategories.map((category) => (
            <RequirementGroup
              key={category}
              category={category}
              requirements={analysis.requirements.filter(
                (requirement) => requirement.category === category,
              )}
            />
          ))}
          <section className="requirement-group requirement-group--technologies">
            <h4>Tecnologias</h4>
            <div className="skill-list">
              {analysis.technologies.map((technology) => (
                <SkillTag key={technology.id}>{technology.name}</SkillTag>
              ))}
            </div>
          </section>
        </div>

        <div className="keywords-row">
          <span>Palavras-chave</span>
          <div className="skill-list">
            {analysis.keywords.map((keyword) => (
              <SkillTag key={keyword} muted>{keyword}</SkillTag>
            ))}
          </div>
        </div>
      </section>

      <section className="result-section" aria-labelledby="matches-title">
        <div className="section-heading">
          <span className="section-number" aria-hidden="true">02</span>
          <div>
            <span className="eyebrow">Comparando com seu perfil</span>
            <h2 id="matches-title">O que você já tem — e o que está faltando</h2>
          </div>
        </div>

        <div className="match-grid">
          {matchGroups.map((group) => (
            <article className={`match-group match-group--${group.status}`} key={group.status}>
              <header>
                <span className="match-group__icon" aria-hidden="true">
                  {group.status === 'match' ? '✓' : group.status === 'partial' ? '≈' : '○'}
                </span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </header>
              <ul>
                {analysis.requirements
                  .filter((requirement) => requirement.status === group.status)
                  .map((requirement) => (
                    <MatchItem
                      key={requirement.id}
                      requirement={requirement}
                      facts={profile.facts}
                    />
                  ))}
                {analysis.requirements.filter((requirement) => requirement.status === group.status)
                  .length === 0 && <li className="empty-match">Nada por aqui neste grupo.</li>}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="result-section insights-grid" aria-label="Dicas da Lia">
        <LiaInsight eyebrow="Dica da Lia" title="O que parece importar mais aqui?">
          {analysis.companyPriorities.length > 0 ? (
            <ol className="priority-list">
              {analysis.companyPriorities.map((priority) => (
                <li key={priority}>{priority}</li>
              ))}
            </ol>
          ) : (
            <p>Não encontrei pontos conhecidos suficientes para ordenar as prioridades.</p>
          )}
        </LiaInsight>

        <LiaInsight eyebrow="Dica da Lia" title="Por onde eu começaria" tone="coral">
          <p className="positioning-copy">{analysis.positioningRecommendation}</p>
          <div className="source-note">
            <span aria-hidden="true">↳</span>
            Esta dica usa somente informações do perfil {profileSource === 'demo' ? 'do criador' : 'que você conferiu'}.
          </div>
        </LiaInsight>
      </section>

      <ResumeHighlights resume={resume} profile={profile} />
    </div>
  )
}
