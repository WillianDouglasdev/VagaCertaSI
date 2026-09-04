const steps = [
  {
    number: '01',
    title: 'Cole a vaga',
    description: 'A Lia organiza aquela descrição enorme.',
  },
  {
    number: '02',
    title: 'Compare com seu perfil',
    description: 'Veja o que você já sabe e o que está faltando.',
  },
  {
    number: '03',
    title: 'Entenda o que importa',
    description: 'Descubra quais requisitos parecem ter mais peso.',
  },
  {
    number: '04',
    title: 'Arrume o currículo',
    description: 'Veja o que faz sentido destacar para aquela vaga.',
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
