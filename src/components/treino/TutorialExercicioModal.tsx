import { X } from 'lucide-react'
import type { Exercicio } from '../../data/tipos'

interface Props {
  exercicio: Exercicio
  onClose: () => void
}

export function TutorialExercicioModal({ exercicio, onClose }: Props) {
  const tutorial = exercicio.tutorial
  if (!tutorial) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-2xl bg-surface p-5 pb-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-ink">{exercicio.nome}</h2>
            <p className="mt-1 text-sm text-ink-3">{tutorial.objetivo}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded text-ink-3"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[68vh] space-y-4 overflow-y-auto pr-1">
          <TutorialSection title="Como fazer" items={tutorial.execucao} />
          <TutorialSection title="Onde sentir" items={tutorial.sentir} />
          <TutorialSection title="Erros comuns" items={tutorial.erros} />
          <TutorialSection title="Adaptacao em casa" items={tutorial.adaptacoes} />
        </div>
      </div>
    </div>
  )
}

function TutorialSection({
  title,
  items,
}: {
  title: string
  items?: string[]
}) {
  if (!items || items.length === 0) return null

  return (
    <section className="rounded-xl bg-surface-2 p-3">
      <h3 className="mb-2 text-sm font-bold text-ink">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <p key={item} className="text-xs leading-5 text-ink-2">
            {item}
          </p>
        ))}
      </div>
    </section>
  )
}
