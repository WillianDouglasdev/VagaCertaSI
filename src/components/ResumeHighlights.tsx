import type { AdaptedResume, ProfessionalProfile } from '../types/domain'
import { SkillTag } from './SkillTag'

interface ResumeHighlightsProps {
  resume: AdaptedResume
  profile: ProfessionalProfile
}

export function ResumeHighlights({ resume, profile }: ResumeHighlightsProps) {
  // A dica para LinkedIn reaproveita a sugestão de currículo já rastreada. Assim,
  // ganhamos um segundo formato de apresentação sem criar fatos ou uma integração.
  const skillSection = resume.sections.find((section) => section.id === 'resume-skills')
  const projectSection = resume.sections.find((section) => section.id === 'resume-projects')
  const visibleSkills = skillSection?.items.slice(0, 3).map((item) => item.text) ?? []
  const visibleProject = projectSection?.items[0]

  function sourceNames(sourceFactIds: string[]) {
    return sourceFactIds
      .map((factId) => profile.facts.find((fact) => fact.id === factId)?.title)
      .filter(Boolean)
      .join(', ')
  }

  return (
    <section className="result-section resume-highlights" aria-labelledby="resume-title">
      <div className="section-heading">
        <span className="section-number" aria-hidden="true">03</span>
        <div>
          <span className="eyebrow">Reorganização do conteúdo</span>
          <h2 id="resume-title">O que eu destacaria no seu currículo</h2>
        </div>
      </div>

      <div className="resume-summary">
        <span>Resumo sugerido</span>
        <p>{resume.professionalSummary.text}</p>
        {resume.professionalSummary.sourceFactIds.length > 0 && (
          <small>
            Baseado em: {sourceNames(resume.professionalSummary.sourceFactIds)}
          </small>
        )}
      </div>

      <div className="resume-sections">
        {resume.sections.map((section) => (
          <section className="resume-section" key={section.id}>
            <h3>{section.title}</h3>
            {section.id === 'resume-skills' ? (
              <div className="skill-list">
                {section.items.map((item) => (
                  <SkillTag key={item.id}>{item.text}</SkillTag>
                ))}
              </div>
            ) : (
              <ul>
                {section.items.map((item) => (
                  <li key={item.id}>
                    <p>{item.text}</p>
                    {item.sourceFactIds.length > 0 && (
                      <small>Informação original: {sourceNames(item.sourceFactIds)}</small>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {(visibleSkills.length > 0 || visibleProject) && (
        <div className="linkedin-suggestion">
          <span>Também no perfil profissional</span>
          <h3>O que eu deixaria mais visível no LinkedIn</h3>
          {visibleSkills.length > 0 && (
            <p>
              {visibleSkills.join(', ')} {visibleSkills.length === 1 ? 'aparece' : 'aparecem'} na
              vaga e já {visibleSkills.length === 1 ? 'está' : 'estão'} no seu perfil. Eu evitaria
              deixar {visibleSkills.length === 1 ? 'essa tecnologia escondida' : 'essas tecnologias escondidas'}
              no fim da lista.
            </p>
          )}
          {visibleProject && (
            <p>
              Eu também deixaria o projeto relacionado mais fácil de encontrar: {visibleProject.text}
            </p>
          )}
          <small>É apenas uma sugestão em texto. A demo não acessa nem altera o LinkedIn.</small>
        </div>
      )}

      <p className="resume-rule">
        A Lia só reorganiza informações do perfil ativo. Nenhum projeto, experiência ou
        resultado novo foi criado.
      </p>
    </section>
  )
}
