import { describe, expect, it } from 'vitest'
import {
  organizeProfileText,
  ProfileTextError,
} from './profileOrganizer'

const personalProfileText = `Nome: Marina Costa

Formação
Análise e Desenvolvimento de Sistemas

Projetos
API de biblioteca com Python e FastAPI

Tecnologias
Python
FastAPI
Git

Competências
Comunicação e organização

https://github.com/marinacosta`

describe('organizeProfileText', () => {
  it('organiza somente informações presentes e cria fatos rastreáveis', () => {
    const profile = organizeProfileText(personalProfileText)
    const technologyNames = profile.technologies.map((technology) => technology.name)
    const factIds = profile.facts.map((fact) => fact.id)

    expect(profile.name).toBe('Marina Costa')
    expect(technologyNames).toEqual(expect.arrayContaining(['Python', 'FastAPI', 'Git']))
    expect(technologyNames).not.toContain('Docker')
    expect(profile.links).toEqual([
      { label: 'GitHub', url: 'https://github.com/marinacosta' },
    ])
    expect(new Set(factIds).size).toBe(factIds.length)
    expect(profile.facts.every((fact) => fact.description.length > 0)).toBe(true)
    expect(profile.facts.some((fact) => fact.description.startsWith('Nome:'))).toBe(false)
  })

  it('rejeita textos curtos demais para uma organização útil', () => {
    expect(() => organizeProfileText('Python')).toThrow(ProfileTextError)
  })
})
