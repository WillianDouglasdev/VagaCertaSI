import { JourneySteps } from './JourneySteps'
import { LiaMark } from './LiaMark'

interface HomeHeroProps {
  onStart: () => void
}

export function HomeHero({ onStart }: HomeHeroProps) {
  return (
    <section className="home-hero" id="inicio" aria-labelledby="home-title">
      <div className="container-xl">
        <div className="row align-items-center g-5 home-hero__main">
          <div className="col-lg-7">
            <div className="home-hero__copy">
              <p className="project-label">
                <span>Em construção</span>
                Projeto pessoal de portfólio
              </p>
              <p className="home-hero__name">
                Lia <small>/ VagaCertaAI</small>
              </p>
              <h1 id="home-title">Entenda melhor aquela vaga antes de se candidatar.</h1>
              <p className="home-hero__description">
                Estou construindo a Lia para testar uma dúvida que apareceu enquanto eu
                procurava estágio: como separar o que uma vaga pede e comparar isso com o
                que eu realmente tenho no currículo?
              </p>
              <button className="btn btn-primary hero-button" type="button" onClick={onStart}>
                Testar a ideia <span aria-hidden="true">↓</span>
              </button>
              <p className="home-hero__note">
                Versão 0.1 · roda no navegador · sem IA generativa
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <aside className="project-notebook" aria-label="Anotações sobre a construção da Lia">
              <header className="project-notebook__header">
                <LiaMark size="small" />
                <div>
                  <strong>Caderno do projeto</strong>
                  <span>rascunho funcional · v0.1</span>
                </div>
              </header>

              <p className="project-notebook__question">
                “O que eu deveria destacar para esta vaga sem inventar experiência?”
              </p>

              <dl className="project-notebook__list">
                <div>
                  <dt>Entrada</dt>
                  <dd>descrição da vaga + perfil revisado</dd>
                </div>
                <div>
                  <dt>Comparação</dt>
                  <dd>termos conhecidos e evidências do perfil</dd>
                </div>
                <div>
                  <dt>Limite atual</dt>
                  <dd>regras locais, sem interpretação por IA</dd>
                </div>
              </dl>

              <footer className="project-notebook__footer">
                <span aria-hidden="true">↳</span>
                <p>Primeiro eu quis fazer o fluxo funcionar. A parte “inteligente” ainda é estudo futuro.</p>
              </footer>
            </aside>
          </div>
        </div>

        <JourneySteps />
      </div>
    </section>
  )
}
