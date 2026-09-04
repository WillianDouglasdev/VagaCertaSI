import { AppHeader } from './components/AppHeader'
import { AnalyzeJobPage } from './pages/AnalyzeJobPage'

export function App() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>
        <AnalyzeJobPage />
      </main>
    </div>
  )
}
