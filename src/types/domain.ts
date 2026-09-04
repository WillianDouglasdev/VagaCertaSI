export type ProfessionalFactType =
  | 'education'
  | 'course'
  | 'experience'
  | 'project'
  | 'skill'

export interface Technology {
  id: string
  name: string
}

export interface ProfessionalFact {
  id: string
  type: ProfessionalFactType
  title: string
  description: string
  technologyIds: Technology['id'][]
}

export interface ProfessionalProfile {
  id: string
  name?: string
  headline?: string
  location?: string
  links: Array<{
    label: string
    url: string
  }>
  technologies: Technology[]
  facts: ProfessionalFact[]
}

export type ProfileSource = 'demo' | 'personal'

export interface ActiveProfile {
  source: ProfileSource
  profile: ProfessionalProfile
}

export type ApplicationStatus =
  | 'interesting'
  | 'applied'
  | 'interview'
  | 'closed'

export interface JobOpportunity {
  id: string
  role: string
  company: string
  area?: string
  description: string
  url?: string
  status: ApplicationStatus
}

export type RequirementCategory =
  | 'essential'
  | 'desirable'
  | 'behavioral'
  | 'technology'

export type RequirementImportance = 'high' | 'medium' | 'low'

export type MatchStatus = 'match' | 'partial' | 'missing'

export interface MatchEvidence {
  factId: ProfessionalFact['id']
  explanation: string
}

export interface JobRequirement {
  id: string
  description: string
  category: RequirementCategory
  importance: RequirementImportance
  status: MatchStatus
  evidence: MatchEvidence[]
}

export interface CompatibilityEstimate {
  score: number
  label: string
  explanation: string
  disclaimer: string
}

export interface JobAnalysis {
  id: string
  job: JobOpportunity
  summary: string
  requirements: JobRequirement[]
  technologies: Technology[]
  keywords: string[]
  compatibility: CompatibilityEstimate
  companyPriorities: string[]
  positioningRecommendation: string
  analyzedAt: string
}

export interface AdaptedResumeItem {
  id: string
  text: string
  sourceFactIds: ProfessionalFact['id'][]
}

export interface AdaptedResumeSection {
  id: string
  title: string
  items: AdaptedResumeItem[]
}

export interface AdaptedResume {
  id: string
  jobId: JobOpportunity['id']
  profileId: ProfessionalProfile['id']
  professionalSummary: AdaptedResumeItem
  sections: AdaptedResumeSection[]
  createdAt: string
}
