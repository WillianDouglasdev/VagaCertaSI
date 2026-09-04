import type { FormEvent, RefObject } from 'react'
import type {
  ProfessionalFactType,
  ProfessionalProfile,
} from '../types/domain'
import { SkillTag } from './SkillTag'

export type ProfileSetupStage = 'choose' | 'paste' | 'review'

interface ProfileSetupProps {
  sectionRef: RefObject<HTMLElement | null>
  stage: ProfileSetupStage
  creatorProfile: ProfessionalProfile
  draftText: string
  organizedProfile?: ProfessionalProfile
  isOrganizing: boolean
  error?: string
  onDraftChange: (text: string) => void
  onUseDemo: () => void
  onChoosePersonal: () => void
  onOrganize: () => void
  onUsePersonal: () => void
  onBackToChoice: () => void
  onBackToText: () => void
}

const factTypeLabels: Record<ProfessionalFactType, string> = {
  education: 'Formação',
  experience: 'Experiências',
  project: 'Projetos',
  course: 'Cursos',
  skill: 'Competências e outras informações',
}

function ProfileReview({ profile }: { profile: ProfessionalProfile }) {
  const factTypes = Object.keys(factTypeLabels) as ProfessionalFactType[]

  return (
    <div className="profile-review">
      <header className="profile-review__identity">
        <span className="eyebrow">Foi isso que eu encontrei</span>
        <h3>{profile.name ?? 'Perfil sem nome informado'}</h3>
        {profile.headline && <p>{profile.headline}</p>}
      </header>

      {profile.technologies.length > 0 && (
        <section className="profile-review__section">
          <h4>Tecnologias</h4>
          <div className="skill-list">
            {profile.technologies.map((technology) => (
              <SkillTag key={technology.id}>{technology.name}</SkillTag>
            ))}
          </div>
        </section>
      )}

      <div className="profile-review__grid">
        {factTypes.map((type) => {
          const facts = profile.facts.filter((fact) => fact.type === type)
          if (facts.length === 0) return null

          return (
            <section className="profile-review__section" key={type}>
              <h4>{factTypeLabels[type]}</h4>
              <ul>
                {facts.map((fact) => (
                  <li key={fact.id}>{fact.title}</li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {profile.links.length > 0 && (
        <section className="profile-review__section">
          <h4>Links profissionais</h4>
          <ul>
            {profile.links.map((link) => (
              <li key={link.url}>{link.label}: {link.url}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export function ProfileSetup({
  sectionRef,
  stage,
  creatorProfile,
  draftText,
  organizedProfile,
  isOrganizing,
  error,
  onDraftChange,
  onUseDemo,
  onChoosePersonal,
  onOrganize,
  onUsePersonal,
  onBackToChoice,
  onBackToText,
}: ProfileSetupProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onOrganize()
  }

  return (
    <section
      className="profile-setup"
      id="perfil"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="profile-setup-title"
    >
      <div className="container-xl">
        <header className="profile-setup__heading">
          <div>
            <span className="eyebrow">01 / Perfil</span>
            <h2 id="profile-setup-title">Com qual perfil você quer testar?</h2>
            <p>O meu já está pronto. Se preferir, cole o seu e revise antes de continuar.</p>
          </div>
        </header>

        {stage === 'choose' && (
          <div className="profile-choice-grid">
            <article className="profile-choice-card profile-choice-card--demo">
              <span className="choice-label">Opção 1 · exemplo pronto</span>
              <h3>Usar o perfil do Willian</h3>
              <p>
                Usei meu próprio currículo porque era o material que eu conhecia melhor
                para testar esta primeira versão.
              </p>

              <div className="demo-profile-preview">
                <strong>{creatorProfile.name}</strong>
                <span>{creatorProfile.headline}</span>
                <div className="skill-list">
                  {creatorProfile.technologies.slice(0, 6).map((technology) => (
                    <SkillTag key={technology.id}>{technology.name}</SkillTag>
                  ))}
                </div>
              </div>

              <p className="profile-disclaimer">
                Sim, eu resolvi usar meu próprio currículo como cobaia.
              </p>
              <button className="btn btn-primary profile-action" type="button" onClick={onUseDemo}>
                Usar meu perfil de exemplo <span aria-hidden="true">→</span>
              </button>
            </article>

            <article className="profile-choice-card profile-choice-card--personal">
              <span className="choice-label">Opção 2 · seu conteúdo</span>
              <h3>Usar meu próprio perfil</h3>
              <p>
                Se quiser sair do exemplo, cole o texto do currículo ou informações
                copiadas do LinkedIn. Você confere tudo antes da comparação.
              </p>

              <ul className="own-profile-list">
                <li>Sem login ou upload de arquivo</li>
                <li>Nenhum link é acessado automaticamente</li>
                <li>O texto fica somente nesta sessão</li>
              </ul>

              <button className="btn profile-action profile-action--secondary" type="button" onClick={onChoosePersonal}>
                Usar meu próprio perfil <span aria-hidden="true">→</span>
              </button>
            </article>
          </div>
        )}

        {stage === 'paste' && (
          <form className="profile-text-card" onSubmit={handleSubmit}>
            <button className="text-button" type="button" onClick={onBackToChoice}>
              <span aria-hidden="true">←</span> Voltar para as opções
            </button>

            <div className="profile-text-card__heading">
              <span className="choice-label">Texto para organizar</span>
              <h3>Cole seu currículo ou perfil</h3>
              <p>
                Você pode colar aqui o texto do currículo ou informações copiadas do
                LinkedIn. A demo organiza o conteúdo localmente antes de usar na análise.
              </p>
            </div>

            <label className="form-label" htmlFor="profile-text">
              Texto do perfil
            </label>
            <textarea
              className={`form-control${error ? ' is-invalid' : ''}`}
              id="profile-text"
              rows={13}
              value={draftText}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder={`Seu nome\n\nFormação\nAnálise e Desenvolvimento de Sistemas\n\nProjetos\nProjeto acadêmico com Python e FastAPI\n\nTecnologias\nPython, SQL, FastAPI e Git`}
              disabled={isOrganizing}
              aria-describedby="profile-privacy profile-error"
            />
            {error && <div className="invalid-feedback" id="profile-error">{error}</div>}

            <div className="privacy-note" id="profile-privacy">
              <span aria-hidden="true">○</span>
              <div>
                <strong>Seus dados ficam somente nesta página.</strong>
                <p>
                  Enquanto você testa, o texto fica apenas no estado local da página.
                  Nada é enviado ou salvo e tudo desaparece ao recarregar.
                </p>
              </div>
            </div>

            <button className="btn btn-primary profile-action" type="submit" disabled={isOrganizing}>
              {isOrganizing ? 'Lia está organizando…' : 'Organizar meu perfil'}
            </button>
          </form>
        )}

        {stage === 'review' && organizedProfile && (
          <div className="profile-review-card">
            <ProfileReview profile={organizedProfile} />

            <div className="review-question">
              <strong>Tudo certo por aqui?</strong>
              <p>Confira antes de usar essas informações na comparação com a vaga.</p>
            </div>

            <div className="review-actions">
              <button className="btn btn-primary profile-action" type="button" onClick={onUsePersonal}>
                Usar este perfil <span aria-hidden="true">→</span>
              </button>
              <button className="btn profile-action profile-action--secondary" type="button" onClick={onBackToText}>
                Voltar e editar texto
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
