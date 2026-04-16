import { useState } from 'react'
import { Check } from 'lucide-react'
import { getAlimentoPorId } from '../../data/alimentos'
import type { ItemOpcao, ItemRegistrado } from '../../data/tipos'
import { cn } from '../../utils/cn'
import {
  formatQuantidadeMetricaAlimento,
  formatQuantidadeContextoItem,
  formatQuantidadeItem,
} from '../../utils/quantidade'

interface Props {
  itens: ItemOpcao[]
  registrados: ItemRegistrado[]
  itensComPadraoAtivo?: Set<string>
  onChange: (registrados: ItemRegistrado[]) => void
  onTapNome?: (item: ItemOpcao) => void
  onRestoreOriginal?: (item: ItemOpcao) => void
}

export function ItemChecklist({
  itens,
  registrados,
  itensComPadraoAtivo,
  onChange,
  onTapNome,
  onRestoreOriginal,
}: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function getReg(itemId: string): ItemRegistrado {
    return (
      registrados.find((r) => r.itemId === itemId) || {
        itemId,
        gramasReais: itens.find((i) => i.id === itemId)?.gramasPlano || 0,
      }
    )
  }

  function isChecked(itemId: string): boolean {
    const reg = getReg(itemId)
    return reg.gramasReais > 0
  }

  function getGramas(itemId: string): number {
    return getReg(itemId).gramasReais
  }

  function updateItem(itemId: string, gramasReais: number, extra?: Partial<ItemRegistrado>) {
    const exists = registrados.find((r) => r.itemId === itemId)
    const updated = exists
      ? registrados.map((r) =>
          r.itemId === itemId ? { ...r, gramasReais, ...extra } : r
        )
      : [...registrados, { itemId, gramasReais, ...extra }]
    onChange(updated)
  }

  function toggleCheck(item: ItemOpcao) {
    if (isChecked(item.id)) {
      updateItem(item.id, 0, {
        substitutoId: undefined,
        substitutoNome: undefined,
      })
    } else {
      updateItem(item.id, item.gramasPlano, {
        substitutoId: undefined,
        substitutoNome: undefined,
      })
    }
  }

  function adjustGrams(item: ItemOpcao, delta: number) {
    const current = getGramas(item.id)
    const next = Math.max(0, current + delta)
    updateItem(item.id, next)
  }

  function toggleStepper(itemId: string) {
    setExpandedId(expandedId === itemId ? null : itemId)
  }

  return (
    <div className="flex flex-col">
      {itens.map((item) => {
        const reg = getReg(item.id)
        const substituto = reg.substitutoId ? getAlimentoPorId(reg.substitutoId) : undefined
        const checked = reg.gramasReais > 0
        const gramas = reg.gramasReais
        const isAdjusted = gramas !== item.gramasPlano && gramas > 0
        const showStepper = expandedId === item.id
        const temPadraoAtivo = itensComPadraoAtivo?.has(item.id)
        const quantidadeContexto = substituto
          ? null
          : formatQuantidadeContextoItem(item, gramas)
        const nomePrincipal = substituto?.nome ?? item.nome
        const quantidadePrincipal = substituto
          ? formatQuantidadeMetricaAlimento(substituto, gramas)
          : formatQuantidadeItem(item, gramas)

        return (
          <div key={item.id} className="border-b border-border-soft last:border-b-0">
            {/* Main row */}
            <div className="flex items-center gap-3 py-3 px-1">
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => toggleCheck(item)}
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors',
                  checked
                    ? 'border-green bg-green/20 text-green'
                    : 'border-border text-transparent'
                )}
                aria-label={checked ? 'Desmarcar item' : 'Marcar item'}
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </button>

              {/* Name (tappable for swap) */}
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onTapNome?.(item)}
                  className={cn(
                    'flex min-h-[44px] w-full items-center text-left text-sm',
                    checked ? 'text-ink' : 'text-ink-3 line-through'
                  )}
                >
                  <span className="truncate">{nomePrincipal}</span>
                </button>

                {substituto && (
                  <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                    <span className="truncate text-accent">
                      no lugar de {item.nome}
                    </span>
                    {onRestoreOriginal && (
                      <button
                        type="button"
                        onClick={() => onRestoreOriginal(item)}
                        className="shrink-0 rounded border border-border-soft px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-3 active:bg-surface-2"
                      >
                        {temPadraoAtivo ? 'Remover padrao' : 'Voltar ao plano'}
                      </button>
                    )}
                  </div>
                )}

                {quantidadeContexto && checked && (
                  <p className="mt-0.5 text-[11px] text-ink-3">
                    ~ {quantidadeContexto}
                  </p>
                )}
              </div>

              {/* Gram badge */}
              <button
                type="button"
                onClick={() => toggleStepper(item.id)}
                className={cn(
                  'shrink-0 rounded px-2 py-1 text-xs font-[family-name:var(--font-mono)] min-h-[44px] flex items-center transition-colors',
                  isAdjusted
                    ? 'border border-accent text-accent bg-accent-soft'
                    : 'border border-border-soft text-ink-2 bg-surface-2'
                )}
              >
                {quantidadePrincipal}
              </button>
            </div>

            {/* Stepper (collapsible) */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                showStepper ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="flex items-center justify-center gap-2 pb-3 px-1">
                <StepButton onClick={() => adjustGrams(item, -10)} label="-10" />
                <StepButton onClick={() => adjustGrams(item, -5)} label="-5" />
                <span className="w-16 text-center text-sm font-[family-name:var(--font-mono)] text-ink">
                  {quantidadePrincipal}
                </span>
                <StepButton onClick={() => adjustGrams(item, 5)} label="+5" />
                <StepButton onClick={() => adjustGrams(item, 10)} label="+10" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StepButton({ onClick, label }: { onClick: () => void; label: string }) {
  const isMinus = label.startsWith('-')
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-10 w-12 items-center justify-center rounded text-sm font-medium transition-colors',
        isMinus
          ? 'bg-surface-3 text-ink-2 active:bg-surface-2'
          : 'bg-surface-3 text-ink-2 active:bg-surface-2'
      )}
    >
      {label}
    </button>
  )
}
