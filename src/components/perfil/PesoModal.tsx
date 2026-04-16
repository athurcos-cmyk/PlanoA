import { useState } from 'react'

interface PesoModalProps {
  pesoAtual: number
  onSalvar: (peso: number) => void
  onCancelar: () => void
}

export function PesoModal({ pesoAtual, onSalvar, onCancelar }: PesoModalProps) {
  const [peso, setPeso] = useState(pesoAtual)

  const adjust = (delta: number) => {
    setPeso((p) => Math.max(30, +(p + delta).toFixed(1)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
      <div className="w-full max-w-md rounded-t-2xl bg-surface p-5 pb-8">
        <h2 className="text-lg font-bold text-ink mb-5 text-center">Registrar Peso</h2>

        <div className="flex items-center justify-center mb-6">
          <span className="text-5xl font-bold font-[family-name:var(--font-mono)] text-ink">
            {peso.toFixed(1)}
          </span>
          <span className="text-xl text-ink-2 ml-2">kg</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => adjust(-0.5)}
            className="min-h-[48px] min-w-[56px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3 transition-colors"
          >
            -0.5
          </button>
          <button
            type="button"
            onClick={() => adjust(-0.1)}
            className="min-h-[48px] min-w-[56px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3 transition-colors"
          >
            -0.1
          </button>
          <button
            type="button"
            onClick={() => adjust(0.1)}
            className="min-h-[48px] min-w-[56px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3 transition-colors"
          >
            +0.1
          </button>
          <button
            type="button"
            onClick={() => adjust(0.5)}
            className="min-h-[48px] min-w-[56px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3 transition-colors"
          >
            +0.5
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 min-h-[48px] rounded-lg bg-surface-2 text-sm font-bold text-ink-2 active:bg-surface-3 transition-colors"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={() => onSalvar(peso)}
            className="flex-1 min-h-[48px] rounded-lg bg-accent text-sm font-bold text-white active:bg-accent-darker transition-colors"
          >
            SALVAR
          </button>
        </div>
      </div>
    </div>
  )
}
