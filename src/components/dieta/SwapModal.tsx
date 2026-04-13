import { useMemo } from 'react'
import { X } from 'lucide-react'
import type { SlotRefeicao, OpcaoRefeicao } from '../../data/tipos'
import { DIETA_FOLGA } from '../../data/dieta-folga'
import { DIETA_PLANTAO } from '../../data/dieta-plantao'
import { findSimilarOptions } from '../../utils/swap'
import { calcularMacrosOpcao } from '../../utils/macros'
import { cn } from '../../utils/cn'

interface Props {
  slotAtual: SlotRefeicao
  onSelect: (opcao: OpcaoRefeicao, fromSlot: string, fromDieta: string) => void
  onClose: () => void
}

function getAllOptions() {
  const result: { opcao: OpcaoRefeicao; slotId: string; dieta: string }[] = []
  for (const slot of DIETA_FOLGA.slots) {
    for (const opcao of slot.opcoes) {
      result.push({ opcao, slotId: slot.id, dieta: 'folga' })
    }
  }
  for (const slot of DIETA_PLANTAO.slots) {
    for (const opcao of slot.opcoes) {
      result.push({ opcao, slotId: slot.id, dieta: 'plantao' })
    }
  }
  return result
}

export function SwapModal({ slotAtual, onSelect, onClose }: Props) {
  const similares = useMemo(() => {
    const todas = getAllOptions()
    return findSimilarOptions(slotAtual, todas)
  }, [slotAtual])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-lg bg-surface pb-8 animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <h2 className="text-lg font-bold text-ink">Trocar opcao</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded text-ink-3"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="px-4 pt-3 pb-2 text-xs text-ink-3">
          Opcoes com macros similares a {slotAtual.nome} ({slotAtual.macrosAlvo.kcal} kcal)
        </p>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto px-4">
          {similares.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-3">
              Nenhuma opcao compativel encontrada
            </p>
          )}

          {similares.map(({ opcao, slotId, dieta, score }) => {
            const macros = calcularMacrosOpcao(opcao.itens)
            return (
              <button
                key={`${dieta}-${opcao.id}`}
                type="button"
                onClick={() => onSelect(opcao, slotId, dieta)}
                className="flex w-full items-center gap-3 rounded py-3 px-2 text-left transition-colors active:bg-surface-2"
              >
                {/* Score badge */}
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-[family-name:var(--font-mono)] text-xs font-bold',
                    score >= 85
                      ? 'bg-green/20 text-green'
                      : score >= 70
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-accent-soft text-accent'
                  )}
                >
                  {score}%
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{opcao.nome}</p>
                  <p className="text-xs text-ink-3">
                    <span className="font-[family-name:var(--font-mono)]">{Math.round(macros.kcal)}</span> kcal
                    {' / '}
                    <span className="font-[family-name:var(--font-mono)]">{macros.p.toFixed(0)}</span>p
                    {' / '}
                    <span className="font-[family-name:var(--font-mono)]">{macros.c.toFixed(0)}</span>c
                    {' / '}
                    <span className="font-[family-name:var(--font-mono)]">{macros.g.toFixed(0)}</span>g
                  </p>
                  <p className="text-[10px] text-ink-3 mt-0.5">
                    {dieta === 'folga' ? 'Folga' : 'Plantao'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
