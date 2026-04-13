import { X } from 'lucide-react'

import { removerExtra } from '../../db/queries'
import { useExtras } from '../../hooks/useExtras'

export function ExtrasList() {
  const extras = useExtras()

  if (extras.length === 0) return null

  async function handleRemove(id: number | undefined) {
    if (id === undefined) return
    await removerExtra(id)
  }

  const totalKcal = extras.reduce((acc, e) => acc + e.macros.kcal, 0)

  return (
    <div className="rounded-lg bg-surface p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-ink">Extras do dia</h3>
        <span className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
          +{totalKcal} kcal
        </span>
      </div>

      <div className="flex flex-col">
        {extras.map((extra) => (
          <div
            key={extra.id}
            className="flex items-center gap-2 border-b border-border-soft py-2 last:border-b-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink truncate">{extra.alimentoNome}</p>
              <p className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
                {extra.gramas}g
                {' | '}
                {extra.macros.kcal} kcal
                {' P'}{extra.macros.p}
                {' C'}{extra.macros.c}
                {' G'}{extra.macros.g}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(extra.id)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-ink-3 active:text-accent"
              aria-label="Remover extra"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
