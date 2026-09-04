import { LiaMark } from './LiaMark'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="container-xl d-flex align-items-center justify-content-between py-3">
        <a className="brand" href="#inicio" aria-label="Lia — início">
          <LiaMark size="small" />
          <span>Lia</span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="nav align-items-center gap-1 gap-sm-2">
            <li className="nav-item">
              <a className="nav-link active" href="#inicio" aria-current="page">
                Início
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projeto">
                Projeto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
