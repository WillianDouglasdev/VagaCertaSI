import type { ActiveProfile } from '../types/domain'

interface ActiveProfileBarProps {
  activeProfile: ActiveProfile
  onChange: () => void
}

export function ActiveProfileBar({ activeProfile, onChange }: ActiveProfileBarProps) {
  const isDemo = activeProfile.source === 'demo'

  return (
    <aside className="active-profile-bar" aria-label="Perfil usado na análise">
      <span className={`active-profile-bar__dot active-profile-bar__dot--${activeProfile.source}`} aria-hidden="true" />
      <div>
        <small>Perfil ativo</small>
        <strong>{isDemo ? 'Usando o perfil do criador' : 'Usando seu perfil'}</strong>
        <span>{activeProfile.profile.name ?? 'Sem nome informado'}</span>
      </div>
      <button className="text-button" type="button" onClick={onChange}>
        Trocar perfil
      </button>
    </aside>
  )
}
