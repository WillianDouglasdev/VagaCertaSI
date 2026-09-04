const steps = [
  {
    number: '01',
    title: 'Cole a vaga',
    description: 'Use o exemplo ou cole a descrição completa.',
  },
  {
    number: '02',
    title: 'Escolha o perfil',
    description: 'Teste com o meu ou revise o seu próprio texto.',
  },
  {
    number: '03',
    title: 'Compare os termos',
    description: 'As regras separam correspondências e lacunas.',
  },
  {
    number: '04',
    title: 'Revise o destaque',
    description: 'Veja o que já existe e pode ficar mais visível.',
  },
]

export function JourneySteps() {
  return (
    <ol className="journey-steps" aria-label="Como a Lia ajuda">
      {steps.map((step) => (
        <li key={step.number}>
          <span className="journey-steps__number">{step.number}</span>
          <div>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
