import { describe, expect, it } from 'vitest'
import { creatorProfile, demoJob } from '../mocks/analysis'
import type { ProfessionalProfile } from '../types/domain'
import { createDemoAnalysis, createResumeSuggestion } from './demoAnalysis'
import { organizeProfileText } from './profileOrganizer'

const profileWithoutDocker = organizeProfileText(`Marina Costa

Formação
Análise e Desenvolvimento de Sistemas

Projetos
API de biblioteca com Python, FastAPI e SQL

Tecnologias
Python
FastAPI
SQL
Git

Competências
Comunicação e trabalho em equipe`)

describe('createDemoAnalysis', () => {
  it('calcula o resultado pelas regras e mantém lacunas sem inventar evidências', () => {
    const firstAnalysis = createDemoAnalysis(profileWithoutDocker, demoJob)
    const secondAnalysis = createDemoAnalysis(profileWithoutDocker, demoJob)
    const python = firstAnalysis.requirements.find((requirement) => requirement.id === 'req-python')
    const docker = firstAnalysis.requirements.find((requirement) => requirement.id === 'req-docker')

    expect(firstAnalysis.compatibility.score).toBe(secondAnalysis.compatibility.score)
    expect(python?.status).toBe('match')
    expect(python?.evidence[0]?.factId).toMatch(/^fact-personal-/)
    expect(docker?.status).toBe('missing')
    expect(docker?.evidence).toEqual([])
  })

  it('mantém o perfil do criador realista e sem links presumidos', () => {
    const analysis = createDemoAnalysis(creatorProfile, demoJob)
    const tests = analysis.requirements.find((requirement) => requirement.id === 'req-tests')
    const docker = analysis.requirements.find((requirement) => requirement.id === 'req-docker')

    expect(creatorProfile.name).toBe('Willian')
    expect(creatorProfile.links).toEqual([])
    expect(tests?.status).not.toBe('match')
    expect(docker?.status).toBe('missing')
    expect(analysis.compatibility.disclaimer).toContain('regras locais')
  })
})

describe('createResumeSuggestion', () => {
  it('referencia apenas fatos existentes no perfil ativo', () => {
    const analysis = createDemoAnalysis(profileWithoutDocker, demoJob)
    const resume = createResumeSuggestion(profileWithoutDocker, analysis)
    const existingFactIds = new Set(profileWithoutDocker.facts.map((fact) => fact.id))
    const usedFactIds = [
      ...resume.professionalSummary.sourceFactIds,
      ...resume.sections.flatMap((section) =>
        section.items.flatMap((item) => item.sourceFactIds),
      ),
    ]

    expect(usedFactIds.length).toBeGreaterThan(0)
    expect(usedFactIds.every((factId) => existingFactIds.has(factId))).toBe(true)
  })

  it('não cria seções com dados ausentes', () => {
    const minimalProfile: ProfessionalProfile = {
      id: 'minimal-profile',
      technologies: [],
      links: [],
      facts: [
        {
          id: 'fact-only-education',
          type: 'education',
          title: 'Sistemas de Informação',
          description: 'Graduação em Sistemas de Informação em andamento.',
          technologyIds: [],
        },
      ],
    }
    const analysis = createDemoAnalysis(minimalProfile, demoJob)
    const resume = createResumeSuggestion(minimalProfile, analysis)

    expect(resume.sections).toEqual([])
    expect(resume.professionalSummary.sourceFactIds).toEqual(['fact-only-education'])
  })
})
