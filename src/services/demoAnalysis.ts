import type {
  AdaptedResume,
  AdaptedResumeItem,
  JobAnalysis,
  JobOpportunity,
  JobRequirement,
  MatchStatus,
  ProfessionalFact,
  ProfessionalProfile,
  RequirementCategory,
  RequirementImportance,
  Technology,
} from '../types/domain'
import { KNOWN_TECHNOLOGIES } from './profileOrganizer'
import { containsTerm, normalizeText } from './textNormalization'

interface RequirementDefinition {
  id: string
  description: string
  category: RequirementCategory
  importance: RequirementImportance
  jobTerms: string[]
  profileTerms: string[]
  relatedProfileTerms?: string[]
}

const nonTechnologyRequirements: RequirementDefinition[] = [
  {
    id: 'req-logic',
    description: 'Base de lógica de programação',
    category: 'essential',
    importance: 'high',
    jobTerms: ['lógica de programação', 'logica de programacao'],
    profileTerms: ['lógica', 'logica', 'desenvolveu', 'construiu'],
  },
  {
    id: 'req-tests',
    description: 'Conhecimentos de testes automatizados',
    category: 'desirable',
    importance: 'low',
    jobTerms: ['testes automatizados', 'teste automatizado', 'testes unitários'],
    profileTerms: ['testes automatizados', 'teste automatizado', 'testes unitários'],
    relatedProfileTerms: ['api', 'backend'],
  },
  {
    id: 'req-communication',
    description: 'Comunicação e trabalho em equipe',
    category: 'behavioral',
    importance: 'medium',
    jobTerms: ['comunicação', 'trabalho em equipe', 'colaboração'],
    profileTerms: ['comunicação', 'trabalho em equipe', 'colaboração', 'apresentou'],
  },
  {
    id: 'req-organization',
    description: 'Organização e autonomia para aprender',
    category: 'behavioral',
    importance: 'medium',
    jobTerms: ['organização', 'autonomia', 'curiosidade'],
    profileTerms: ['organização', 'autonomia', 'curiosidade', 'rotina de estudos'],
  },
]

const partialTechnologyMatches: Record<string, string[]> = {
  'tech-fastapi': ['tech-python', 'tech-api-rest'],
  'tech-api-rest': ['tech-fastapi'],
  'tech-postgresql': ['tech-sql'],
  'tech-react': ['tech-javascript', 'tech-typescript'],
  'tech-typescript': ['tech-javascript'],
  'tech-node': ['tech-javascript', 'tech-typescript'],
}

function factText(fact: ProfessionalFact) {
  return `${fact.title} ${fact.description}`
}

function findFactByTerms(profile: ProfessionalProfile, terms: string[]) {
  return profile.facts.find((fact) => terms.some((term) => containsTerm(factText(fact), term)))
}

function findFactByTechnology(profile: ProfessionalProfile, technologyIds: string[]) {
  return profile.facts.find((fact) =>
    fact.technologyIds.some((technologyId) => technologyIds.includes(technologyId)),
  )
}

function matchRequirement(
  exactFact: ProfessionalFact | undefined,
  partialFact?: ProfessionalFact,
): Pick<JobRequirement, 'status' | 'evidence'> {
  const selectedFact = exactFact ?? partialFact
  const status: MatchStatus = exactFact ? 'match' : partialFact ? 'partial' : 'missing'

  return {
    status,
    evidence: selectedFact
      ? [
          {
            factId: selectedFact.id,
            explanation:
              status === 'match'
                ? `Encontrei uma relação direta com “${selectedFact.title}”.`
                : `“${selectedFact.title}” é relacionado, mas não mostra exatamente a mesma coisa.`,
          },
        ]
      : [],
  }
}

function isDesirable(description: string, aliases: string[]) {
  const normalizedDescription = normalizeText(description)

  return aliases.some((alias) => {
    const termIndex = normalizedDescription.indexOf(normalizeText(alias))
    if (termIndex < 0) return false

    const nearbyText = normalizedDescription.slice(
      Math.max(0, termIndex - 100),
      Math.min(normalizedDescription.length, termIndex + alias.length + 100),
    )

    return /diferencial|desejavel|valorizad|conta como ponto/.test(nearbyText)
  })
}

function buildTechnologyRequirements(
  profile: ProfessionalProfile,
  description: string,
): { requirements: JobRequirement[]; technologies: Technology[] } {
  const mentionedTechnologies = KNOWN_TECHNOLOGIES.filter((technology) =>
    technology.aliases.some((alias) => containsTerm(description, alias)),
  )

  const requirements = mentionedTechnologies.map<JobRequirement>((technology) => {
    const desirable = isDesirable(description, technology.aliases)
    const exactFact = findFactByTechnology(profile, [technology.id])
    const partialFact = findFactByTechnology(
      profile,
      partialTechnologyMatches[technology.id] ?? [],
    )

    return {
      id: `req-${technology.id.replace('tech-', '')}`,
      description: `Conhecimentos de ${technology.name}`,
      category: desirable ? 'desirable' : 'essential',
      importance: desirable ? 'low' : 'high',
      ...matchRequirement(exactFact, partialFact),
    }
  })

  return {
    requirements,
    technologies: mentionedTechnologies.map(({ id, name }) => ({ id, name })),
  }
}

function buildOtherRequirements(profile: ProfessionalProfile, description: string) {
  return nonTechnologyRequirements
    .filter((definition) =>
      definition.jobTerms.some((term) => containsTerm(description, term)),
    )
    .map<JobRequirement>((definition) => {
      const exactFact = findFactByTerms(profile, definition.profileTerms)
      const partialFact = definition.relatedProfileTerms
        ? findFactByTerms(profile, definition.relatedProfileTerms)
        : undefined

      return {
        id: definition.id,
        description: definition.description,
        category: definition.category,
        importance: definition.importance,
        ...matchRequirement(exactFact, partialFact),
      }
    })
}

function calculateScore(requirements: JobRequirement[]) {
  const weightByImportance: Record<RequirementImportance, number> = {
    high: 3,
    medium: 2,
    low: 1,
  }

  const possiblePoints = requirements.reduce(
    (total, requirement) => total + weightByImportance[requirement.importance],
    0,
  )

  if (possiblePoints === 0) return 0

  const earnedPoints = requirements.reduce((total, requirement) => {
    const matchFactor = requirement.status === 'match' ? 1 : requirement.status === 'partial' ? 0.5 : 0
    return total + weightByImportance[requirement.importance] * matchFactor
  }, 0)

  // Esta regra é uma simplificação exclusiva da demo. Pesos fixos tornam o cálculo
  // reproduzível e deixam claro que a porcentagem não veio de um modelo de IA.
  return Math.round((earnedPoints / possiblePoints) * 100)
}

function joinNatural(items: string[]) {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} e ${items.at(-1)}`
}

function buildCompatibilityExplanation(requirements: JobRequirement[]) {
  if (requirements.length === 0) {
    return 'Não encontrei requisitos conhecidos suficientes para fazer uma comparação útil.'
  }

  const matched = requirements
    .filter((requirement) => requirement.status === 'match')
    .map((requirement) => requirement.description.replace(/^Conhecimentos de /, ''))
    .slice(0, 3)
  const missing = requirements
    .filter((requirement) => requirement.status === 'missing')
    .map((requirement) => requirement.description.replace(/^Conhecimentos de /, ''))
    .slice(0, 2)

  const matchedText = matched.length
    ? `${joinNatural(matched)} ${matched.length === 1 ? 'aparece' : 'aparecem'} como ponto forte.`
    : 'Ainda não encontrei uma correspondência direta com os requisitos.'
  const missingText = missing.length
    ? ` ${joinNatural(missing)} ainda ${missing.length === 1 ? 'não apareceu' : 'não apareceram'} no perfil.`
    : ''

  return `${matchedText}${missingText}`
}

function buildPriorities(requirements: JobRequirement[]) {
  return requirements
    .slice()
    .sort((a, b) => {
      const order: Record<RequirementImportance, number> = { high: 3, medium: 2, low: 1 }
      return order[b.importance] - order[a.importance]
    })
    .slice(0, 5)
    .map((requirement) => `${requirement.description}: aparece entre os pontos citados na vaga.`)
}

function relevantFacts(profile: ProfessionalProfile, requirements: JobRequirement[]) {
  const factIds = new Set(
    requirements.flatMap((requirement) => requirement.evidence.map((evidence) => evidence.factId)),
  )
  return profile.facts.filter((fact) => factIds.has(fact.id))
}

function buildPositioningRecommendation(
  profile: ProfessionalProfile,
  requirements: JobRequirement[],
) {
  const facts = relevantFacts(profile, requirements)
  const project = facts.find((fact) => fact.type === 'project')
  const fallbackFact = facts[0]

  if (project) {
    return `Para essa vaga, eu começaria por “${project.title}”. Esse projeto conversa diretamente com pontos que aparecem na descrição.`
  }

  if (fallbackFact) {
    return `Eu deixaria “${fallbackFact.title}” mais visível. Foi a informação do perfil que mais se aproximou do que a vaga pede.`
  }

  return 'Ainda não encontrei um projeto ou experiência diretamente relacionado. Vale revisar o perfil antes de adaptar o currículo.'
}

export function createDemoAnalysis(
  profile: ProfessionalProfile,
  job: JobOpportunity,
): JobAnalysis {
  const technologyResult = buildTechnologyRequirements(profile, job.description)
  const requirements = [
    ...technologyResult.requirements,
    ...buildOtherRequirements(profile, job.description),
  ]
  const score = calculateScore(requirements)
  const technologyNames = technologyResult.technologies.map((technology) => technology.name)
  const technologySummary = technologyNames.length
    ? ` A descrição cita ${joinNatural(technologyNames.slice(0, 5))}.`
    : ''

  return {
    id: `analysis-${job.id}`,
    job,
    summary: `Uma oportunidade de ${job.role} na ${job.company}.${technologySummary}`,
    requirements,
    technologies: technologyResult.technologies,
    keywords: [
      ...technologyNames,
      ...requirements
        .filter((requirement) => requirement.category === 'behavioral')
        .map((requirement) => requirement.description),
    ].slice(0, 8),
    compatibility: {
      score,
      label:
        requirements.length === 0
          ? 'Ainda não deu para calcular'
          : `Seu perfil combina ${score}% com essa vaga`,
      explanation: buildCompatibilityExplanation(requirements),
      disclaimer:
        'Essa é uma estimativa demonstrativa calculada com regras locais a partir das informações disponíveis. Não é uma chance de contratação.',
    },
    companyPriorities: buildPriorities(requirements),
    positioningRecommendation: buildPositioningRecommendation(profile, requirements),
    analyzedAt: new Date().toISOString(),
  }
}

function asResumeItem(fact: ProfessionalFact): AdaptedResumeItem {
  return {
    id: `resume-${fact.id}`,
    text: fact.description,
    sourceFactIds: [fact.id],
  }
}

export function createResumeSuggestion(
  profile: ProfessionalProfile,
  analysis: JobAnalysis,
): AdaptedResume {
  const facts = relevantFacts(profile, analysis.requirements)
  const matchingTechnologyNames = analysis.technologies
    .filter((technology) =>
      profile.technologies.some((profileTechnology) => profileTechnology.id === technology.id),
    )
    .map((technology) => technology.name)
  const education = profile.facts.find((fact) => fact.type === 'education')
  const summarySource = education ?? facts[0] ?? profile.facts[0]
  const headline = profile.headline
    ? /[.!?]$/.test(profile.headline.trim())
      ? profile.headline.trim()
      : `${profile.headline.trim()}.`
    : undefined
  const summaryParts = [
    headline,
    matchingTechnologyNames.length
      ? `Conhecimentos em ${joinNatural(matchingTechnologyNames.slice(0, 5))}.`
      : undefined,
  ].filter(Boolean)

  const sections = [
    {
      id: 'resume-skills',
      title: 'Competências para deixar mais visíveis',
      items: matchingTechnologyNames.map<AdaptedResumeItem>((technologyName, index) => {
        const technology = profile.technologies.find((item) => item.name === technologyName)
        const source = technology
          ? findFactByTechnology(profile, [technology.id])
          : undefined

        return {
          id: `resume-skill-${index + 1}`,
          text: technologyName,
          sourceFactIds: source ? [source.id] : [],
        }
      }),
    },
    {
      id: 'resume-projects',
      title: 'Projetos mais relacionados',
      items: facts.filter((fact) => fact.type === 'project').slice(0, 3).map(asResumeItem),
    },
    {
      id: 'resume-experiences',
      title: 'Experiências que ajudam a contar essa história',
      items: facts.filter((fact) => fact.type === 'experience').slice(0, 2).map(asResumeItem),
    },
  ].filter((section) => section.items.length > 0)

  return {
    id: `resume-${analysis.id}`,
    jobId: analysis.job.id,
    profileId: profile.id,
    professionalSummary: {
      id: 'resume-summary',
      text: summaryParts.join(' ') || 'O perfil ainda não tem informações suficientes para sugerir um resumo.',
      sourceFactIds: summarySource ? [summarySource.id] : [],
    },
    sections,
    createdAt: new Date().toISOString(),
  }
}
