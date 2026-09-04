import type { FormEvent } from 'react'
import type { JobOpportunity } from '../types/domain'
import { LiaMark } from './LiaMark'

export interface JobFormValues {
  role: string
  company: string
  description: string
  url: string
}

interface JobAnalysisFormProps {
  initialJob: JobOpportunity
  isLoading: boolean
  onSubmit: (values: JobFormValues) => void
}

export function JobAnalysisForm({
  initialJob,
  isLoading,
  onSubmit,
}: JobAnalysisFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    onSubmit({
      role: String(form.get('role') ?? ''),
      company: String(form.get('company') ?? ''),
      description: String(form.get('description') ?? ''),
      url: String(form.get('url') ?? ''),
    })
  }

  return (
    <form className="analysis-form" onSubmit={handleSubmit} aria-busy={isLoading}>
      <div className="form-heading">
        <span className="eyebrow">Exemplo para testar</span>
        <h2 id="analysis-form-title">Achou uma vaga interessante?</h2>
        <p>Vamos ver o que a empresa está procurando.</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="role">
            Cargo
          </label>
          <input
            className="form-control"
            id="role"
            name="role"
            defaultValue={initialJob.role}
            disabled={isLoading}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="company">
            Empresa
          </label>
          <input
            className="form-control"
            id="company"
            name="company"
            defaultValue={initialJob.company}
            disabled={isLoading}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="description">
            Descrição da vaga
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={8}
            defaultValue={initialJob.description}
            disabled={isLoading}
            required
          />
          <div className="form-text">
            Cole o anúncio completo para preservar o contexto dos requisitos. A demo não
            acessa o site da vaga.
          </div>
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="url">
            Link <span className="label-optional">opcional</span>
          </label>
          <input
            className="form-control"
            id="url"
            name="url"
            type="url"
            defaultValue={initialJob.url}
            disabled={isLoading}
          />
        </div>
      </div>

      <button className="btn btn-primary lia-button" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="lia-loading-mark">
              <LiaMark size="small" />
            </span>
            Separando os termos da vaga…
          </>
        ) : (
          <>
            Analisar com a Lia <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      <p className="prototype-note mb-0">
        A comparação usa regras locais e determinísticas. Nenhum dado é enviado e nenhuma
        IA generativa participa desta análise.
      </p>
    </form>
  )
}
