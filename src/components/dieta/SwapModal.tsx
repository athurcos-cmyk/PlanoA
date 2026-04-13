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
  opcaoAtual: OpcaoRefeicao
  dietaAtual: 'folga' | 'plantao'
  onSelect: (opcao: OpcaoRefeicao, fromSlot: string, fromDieta: string) => void
  onClose: () => void
}

function getAllOptions() {
  const result: {
    opcao: OpcaoRefeicao
    slotId: string
    slotNome: string
    dieta: string
    horario: string
  }[] = []
  for (const slot of DIETA_FOLGA.slots) {
    for (const opcao of slot.opcoes) {
      result.push({
        opcao,
        slotId: slot.id,
        slotNome: slot.nome,
        dieta: 'folga',
        horario: slot.horario,
      })
    }
  }
  for (const slot of DIETA_PLANTAO.slots) {
    for (const opcao of slot.opcoes) {
      result.push({
        opcao,
        slotId: slot.id,
        slotNome: slot.nome,
        dieta: 'plantao',
        horario: slot.horario,
      })
    }
  }
  return result
}

function formatSigned(value: number): string {
  if (value === 0) return '0'
  return value > 0 ? `+${value}` : `${value}`
}

function deltaTone(absDiff: number, close: number, medium: number): string {
  if (absDiff <= close) return 'border-green/30 bg-green/10 text-green'
  if (absDiff <= medium) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300'
  return 'border-accent/30 bg-accent-soft text-accent'
}

export function SwapModal({ slotAtual, opcaoAtual, dietaAtual, onSelect, onClose }: Props) {
  const macrosOpcaoAtual = useMemo(() => calcularMacrosOpcao(opcaoAtual.itens), [opcaoAtual])
  const similares = useMemo(() => {
    const todas = getAllOptions()
    return findSimilarOptions(slotAtual, opcaoAtual, dietaAtual, todas)
  }, [slotAtual, opcaoAtual, dietaAtual])

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
          Trocas proximas para {opcaoAtual.nome} em {slotAtual.nome}
        </p>
        <p className="px-4 pb-3 text-[11px] text-ink-3">
          Ranking compara com a opcao atual. Mesmo slot e mesma dieta recebem prioridade.
        </p>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto overscroll-contain px-4">
          {similares.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-3">
              Nenhuma opcao compativel encontrada
            </p>
          )}

          {similares.map(({ opcao, slotId, slotNome, dieta, horario, score }) => {
            const macros = calcularMacrosOpcao(opcao.itens)
            const deltaKcal = Math.round(macros.kcal - macrosOpcaoAtual.kcal)
            const deltaP = Math.round(macros.p - macrosOpcaoAtual.p)
            const deltaC = Math.round(macros.c - macrosOpcaoAtual.c)
            const deltaG = Math.round(macros.g - macrosOpcaoAtual.g)

            return (
              <button
                key={`${dieta}-${opcao.id}`}
                type="button"
                onClick={() => onSelect(opcao, slotId, dieta)}
                className="flex w-full items-start gap-3 rounded py-3 px-2 text-left transition-colors active:bg-surface-2"
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
                    {slotId === slotAtual.id ? 'Mesmo slot' : `${slotNome} ${horario}`}
                    {' / '}
                    {dieta === 'folga' ? 'Folga' : 'Plantao'}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span
                      className={cn(
                        'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                        deltaTone(Math.abs(deltaKcal), 25, 60)
                      )}
                    >
                      K {formatSigned(deltaKcal)}
                    </span>
                    <span
                      className={cn(
                        'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                        deltaTone(Math.abs(deltaP), 4, 9)
                      )}
                    >
                      P {formatSigned(deltaP)}
                    </span>
                    <span
                      className={cn(
                        'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                        deltaTone(Math.abs(deltaC), 6, 14)
                      )}
                    >
                      C {formatSigned(deltaC)}
                    </span>
                    <span
                      className={cn(
                        'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                        deltaTone(Math.abs(deltaG), 3, 7)
                      )}
                    >
                      G {formatSigned(deltaG)}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
