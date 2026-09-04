export function ProjectStory() {
  return (
    <section className="project-story" id="projeto" aria-labelledby="project-story-title">
      <div className="container-xl project-story__grid">
        <div>
          <span className="eyebrow">Nota de projeto</span>
          <h2 id="project-story-title">Por que eu fiz isso?</h2>
        </div>

        <div className="project-story__copy">
          <p>
            Enquanto procurava estágio, percebi como era fácil cair no hábito de mandar
            o mesmo currículo para vagas diferentes, mesmo quando cada descrição dava
            pesos diferentes para tecnologias, experiências e responsabilidades.
          </p>
          <p>
            A ideia apareceu primeiro quando eu pensava em projetos para um hackathon,
            ficou guardada e depois voltou como uma forma pequena de estudar esse problema.
            Em vez de criar uma plataforma de recrutamento, preferi testar como organizar
            a vaga e compará-la com aquilo que o candidato realmente sabe.
          </p>
          <ol className="project-story__trail" aria-label="Caminho da ideia até a demo">
            <li><span>01</span> apareceu como ideia de hackathon</li>
            <li><span>02</span> ficou um tempo na gaveta</li>
            <li><span>03</span> voltou durante a procura por estágio</li>
          </ol>
          <p className="project-story__note">
            Esta versão é uma demonstração do conceito: regras locais organizam termos e
            requisitos. Não há IA generativa por trás da análise.
          </p>
        </div>
      </div>
    </section>
  )
}
