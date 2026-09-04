import liaMascot from '../assets/lia-mascot.png'
import { JourneySteps } from './JourneySteps'

interface HomeHeroProps {
  onStart: () => void
}

export function HomeHero({ onStart }: HomeHeroProps) {
  return (
    <section className="home-hero" id="inicio" aria-labelledby="home-title">
      <div className="container-xl">
        <div className="row align-items-center g-5 home-hero__main">
          <div className="col-lg-6">
            <div className="home-hero__copy">
              <span className="project-label">Projeto de portfólio em construção</span>
              <p className="home-hero__name" aria-hidden="true">Lia</p>
              <h1 id="home-title">Entenda melhor aquela vaga antes de se candidatar.</h1>
              <p className="home-hero__description">
                Criei a Lia para testar uma ideia simples: usar a própria descrição da
                vaga para entender o que parece importar mais e comparar isso com aquilo
                que eu realmente sei.
              </p>
              <button className="btn btn-primary hero-button" type="button" onClick={onStart}>
                Ver a demonstração <span aria-hidden="true">↓</span>
              </button>
              <p className="home-hero__note">
                Demo local e determinística. Nenhuma IA generativa é usada nesta versão.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="lia-portrait">
              <div className="lia-portrait__note">
                <span aria-hidden="true">✦</span>
                Vamos separar o que importa?
              </div>
              <img
                src={liaMascot}
                alt="Lia, uma assistente digital em formato de monitor, segura uma lista de tarefas."
              />
            </div>
          </div>
        </div>

        <JourneySteps />
      </div>
    </section>
  )
}
