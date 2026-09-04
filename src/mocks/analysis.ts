import type { JobOpportunity, ProfessionalProfile } from '../types/domain'

// Usei meu próprio perfil como conjunto de dados da demonstração. Isso deixa o
// exemplo mais honesto e evita criar experiências apenas para melhorar o resultado.
// Os dados abaixo são públicos na própria apresentação do projeto e não são
// misturados com o texto que um visitante informa durante a sessão.
export const creatorProfile: ProfessionalProfile = {
  id: 'profile-creator-willian',
  name: 'Willian',
  headline: 'Estudante de tecnologia com foco em desenvolvimento, dados e IA aplicada',
  links: [],
  technologies: [
    { id: 'tech-python', name: 'Python' },
    { id: 'tech-sql', name: 'SQL' },
    { id: 'tech-fastapi', name: 'FastAPI' },
    { id: 'tech-git', name: 'Git/GitHub' },
    { id: 'tech-api-rest', name: 'APIs REST' },
    { id: 'tech-react', name: 'React' },
    { id: 'tech-power-bi', name: 'Power BI' },
  ],
  facts: [
    {
      id: 'fact-education-ads',
      type: 'education',
      title: 'Análise e Desenvolvimento de Sistemas',
      description: 'Graduação em Análise e Desenvolvimento de Sistemas em andamento.',
      technologyIds: [],
    },
    {
      id: 'fact-education-ai',
      type: 'education',
      title: 'Estudos em Inteligência Artificial',
      description: 'Estudos em andamento sobre Inteligência Artificial e aplicações práticas.',
      technologyIds: ['tech-python'],
    },
    {
      id: 'fact-project-api',
      type: 'project',
      title: 'Projetos pessoais e acadêmicos de backend',
      description:
        'Estudos e projetos com Python, FastAPI, APIs REST, SQL, bancos de dados e Git/GitHub.',
      technologyIds: [
        'tech-python',
        'tech-fastapi',
        'tech-sql',
        'tech-git',
        'tech-api-rest',
      ],
    },
    {
      id: 'fact-project-dashboard',
      type: 'project',
      title: 'Projetos e estudos com dados',
      description:
        'Projetos acadêmicos e estudos envolvendo Python, SQL, bancos de dados e Power BI.',
      technologyIds: ['tech-python', 'tech-sql', 'tech-power-bi'],
    },
    {
      id: 'fact-project-react',
      type: 'project',
      title: 'Projetos de interface com React',
      description: 'Projetos para praticar interfaces, componentes e estado local com React.',
      technologyIds: ['tech-react', 'tech-git'],
    },
    {
      id: 'fact-experience-hackathon',
      type: 'experience',
      title: 'Participação em projetos e hackathons',
      description:
        'Participação em projetos pessoais, acadêmicos e em experiências de hackathon.',
      technologyIds: ['tech-python', 'tech-git'],
    },
    {
      id: 'fact-skill-study-focus',
      type: 'skill',
      title: 'Interesses de estudo',
      description: 'Interesse em IA aplicada, desenvolvimento de software e dados.',
      technologyIds: [],
    },
  ],
}

// A descrição foi adaptada de uma vaga usada como referência durante o estudo.
// Empresa e link não são reproduzidos: a demo analisa apenas o texto preenchido.
export const demoJob: JobOpportunity = {
  id: 'job-reference-backend-intern',
  role: 'Estágio em Desenvolvimento Backend',
  company: 'Empresa de tecnologia',
  area: 'Engenharia de Software',
  status: 'interesting',
  description: `Uma empresa de tecnologia busca uma pessoa estagiária para apoiar o time de engenharia no desenvolvimento e manutenção de serviços internos. A rotina inclui implementar funcionalidades em Python, consultar bancos relacionais e colaborar na construção de APIs REST.

Procuramos estudantes de tecnologia com boa base de lógica de programação, conhecimentos de Python, SQL e Git, organização para aprender com autonomia e comunicação para trabalhar em equipe. Experiência acadêmica ou pessoal com APIs será valorizada. Conhecimentos de FastAPI, testes automatizados e Docker serão considerados diferenciais.`,
}
