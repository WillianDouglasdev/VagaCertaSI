import type {
  ProfessionalFact,
  ProfessionalFactType,
  ProfessionalProfile,
  Technology,
} from '../types/domain'
import { containsTerm, normalizeText } from './textNormalization'

export const PROFILE_TEXT_MAX_LENGTH = 12_000
export const PROFILE_TEXT_MIN_LENGTH = 30

interface TechnologyDefinition extends Technology {
  aliases: string[]
}

export const KNOWN_TECHNOLOGIES: TechnologyDefinition[] = [
  { id: 'tech-python', name: 'Python', aliases: ['python'] },
  { id: 'tech-sql', name: 'SQL', aliases: ['sql'] },
  { id: 'tech-fastapi', name: 'FastAPI', aliases: ['fastapi', 'fast api'] },
  { id: 'tech-git', name: 'Git', aliases: ['git', 'github', 'gitlab'] },
  { id: 'tech-api-rest', name: 'APIs REST', aliases: ['api rest', 'apis rest', 'restful'] },
  { id: 'tech-react', name: 'React', aliases: ['react', 'reactjs', 'react.js'] },
  { id: 'tech-power-bi', name: 'Power BI', aliases: ['power bi', 'powerbi'] },
  { id: 'tech-postgresql', name: 'PostgreSQL', aliases: ['postgresql', 'postgres'] },
  { id: 'tech-docker', name: 'Docker', aliases: ['docker'] },
  { id: 'tech-javascript', name: 'JavaScript', aliases: ['javascript'] },
  { id: 'tech-typescript', name: 'TypeScript', aliases: ['typescript'] },
  { id: 'tech-java', name: 'Java', aliases: ['java'] },
  { id: 'tech-excel', name: 'Excel', aliases: ['excel'] },
  { id: 'tech-aws', name: 'AWS', aliases: ['aws', 'amazon web services'] },
  { id: 'tech-node', name: 'Node.js', aliases: ['node.js', 'nodejs'] },
]

const sectionRules: Array<{
  labels: string[]
  type: ProfessionalFactType
}> = [
  { labels: ['formacao', 'educacao', 'graduacao'], type: 'education' },
  { labels: ['experiencia', 'experiencias', 'historico profissional'], type: 'experience' },
  { labels: ['projeto', 'projetos'], type: 'project' },
  { labels: ['curso', 'cursos', 'certificacoes'], type: 'course' },
  {
    labels: ['competencias', 'habilidades', 'tecnologias', 'conhecimentos'],
    type: 'skill',
  },
]

export class ProfileTextError extends Error {}

function technologiesIn(text: string) {
  return KNOWN_TECHNOLOGIES.filter((technology) =>
    technology.aliases.some((alias) => containsTerm(text, alias)),
  )
}

function cleanLine(line: string) {
  return line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim()
}

function detectSection(line: string) {
  const normalizedLine = normalizeText(cleanLine(line))

  for (const rule of sectionRules) {
    for (const label of rule.labels) {
      if (normalizedLine === label || normalizedLine.startsWith(`${label}:`)) {
        const separatorIndex = line.indexOf(':')
        return {
          type: rule.type,
          inlineContent: separatorIndex >= 0 ? cleanLine(line.slice(separatorIndex + 1)) : '',
        }
      }
    }
  }

  return undefined
}

function detectFactType(line: string): ProfessionalFactType {
  const normalizedLine = normalizeText(line)

  if (/projeto|aplicacao|api|dashboard/.test(normalizedLine)) return 'project'
  if (/curso|certific/.test(normalizedLine)) return 'course'
  if (/faculdade|graduacao|formacao|estudante/.test(normalizedLine)) return 'education'
  if (/experiencia|estagio|trabalh|hackathon/.test(normalizedLine)) return 'experience'
  return 'skill'
}

function makeFact(
  content: string,
  type: ProfessionalFactType,
  index: number,
): ProfessionalFact {
  const technologies = technologiesIn(content)
  const title = content.length > 74 ? `${content.slice(0, 71).trimEnd()}…` : content

  return {
    id: `fact-personal-${type}-${index + 1}`,
    type,
    title,
    description: content,
    technologyIds: technologies.map((technology) => technology.id),
  }
}

function extractName(lines: string[]) {
  const explicitName = lines.find((line) => /^\s*nome\s*:/i.test(normalizeText(line)))
  if (explicitName) return cleanLine(explicitName.split(':').slice(1).join(':')) || undefined

  const firstLine = cleanLine(lines[0] ?? '')
  const words = firstLine.split(/\s+/)
  const looksLikeRole = /desenvolv|analista|estudante|engenheir|curriculo|perfil/i.test(
    normalizeText(firstLine),
  )

  // Muitos currículos começam apenas com o nome. A heurística é conservadora para não
  // transformar um cargo ou título de seção em um dado pessoal inexistente.
  if (
    words.length >= 2 &&
    words.length <= 5 &&
    firstLine.length <= 60 &&
    !looksLikeRole &&
    !firstLine.includes('@') &&
    !/^https?:/i.test(firstLine)
  ) {
    return firstLine
  }

  return undefined
}

function extractHeadline(lines: string[]) {
  const headlineLine = lines.find((line) => /^\s*(resumo|objetivo)\s*:/i.test(normalizeText(line)))
  if (!headlineLine) return undefined
  return cleanLine(headlineLine.split(':').slice(1).join(':')) || undefined
}

function extractLinks(text: string) {
  // Aqui a URL é apenas texto para revisão do visitante. A aplicação não faz fetch,
  // scraping ou qualquer tentativa de abrir o endereço encontrado.
  const urls = text.match(/https?:\/\/[^\s)]+/gi) ?? []

  return [...new Set(urls)].map((url) => ({
    label: /linkedin/i.test(url) ? 'LinkedIn' : /github/i.test(url) ? 'GitHub' : 'Link profissional',
    url,
  }))
}

export function organizeProfileText(rawText: string): ProfessionalProfile {
  const text = rawText.trim()

  if (text.length < PROFILE_TEXT_MIN_LENGTH) {
    throw new ProfileTextError('Cole um pouco mais de informação para eu conseguir organizar.')
  }

  if (text.length > PROFILE_TEXT_MAX_LENGTH) {
    throw new ProfileTextError('O texto está muito grande. Tente manter apenas as informações do perfil.')
  }

  const lines = text
    .split(/\r?\n/)
    .map(cleanLine)
    .filter(Boolean)
  const name = extractName(lines)
  const headline = extractHeadline(lines)
  const facts: ProfessionalFact[] = []
  let currentType: ProfessionalFactType | undefined

  for (const line of lines) {
    const section = detectSection(line)
    if (section) {
      currentType = section.type
      if (section.inlineContent) {
        facts.push(makeFact(section.inlineContent, currentType, facts.length))
      }
      continue
    }

    const normalizedLine = normalizeText(line)
    const isName = name && line === name
    const isExplicitNameLine = /^nome\s*:/i.test(normalizedLine)
    const isContact = line.includes('@') || /https?:\/\//i.test(line)
    const isHeadline = /^(resumo|objetivo)\s*:/i.test(normalizedLine)

    if (isName || isExplicitNameLine || isContact || isHeadline) continue

    facts.push(makeFact(line, currentType ?? detectFactType(line), facts.length))
  }

  // Se o texto veio como um único parágrafo, ainda preservamos o conteúdo original em
  // um fato revisável. Não tentamos completar seções que não apareceram no texto.
  if (facts.length === 0) {
    facts.push(makeFact(text, 'skill', 0))
  }

  const technologies = technologiesIn(text).map(({ id, name }) => ({ id, name }))

  return {
    id: 'profile-personal-session',
    name,
    headline,
    links: extractLinks(text),
    technologies,
    facts,
  }
}
