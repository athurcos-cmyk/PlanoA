import { useState } from 'react'
import { Check } from 'lucide-react'
import type { ItemOpcao, ItemRegistrado } from '../../data/tipos'
import { cn } from '../../utils/cn'

interface Props {
  itens: ItemOpcao[]
  registrados: ItemRegistrado[]
  onChange: (registrados: ItemRegistrado[]) => void
  onTapNome?: (item: ItemOpcao) => void
}

export function ItemChecklist({ itens, registrados, onChange, onTapNome }: Props) {
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
      updateItem(item.id, 0)
    } else {
      updateItem(item.id, item.gramasPlano)
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
        const checked = isChecked(item.id)
        const gramas = getGramas(item.id)
        const isAdjusted = gramas !== item.gramasPlano && gramas > 0
        const showStepper = expandedId === item.id

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
              <button
                type="button"
                onClick={() => onTapNome?.(item)}
                className={cn(
                  'flex-1 text-left text-sm min-h-[44px] flex items-center',
                  checked ? 'text-ink' : 'text-ink-3 line-through'
                )}
              >
                {item.nome}
                {getReg(item.id).substitutoNome && (
                  <span className="ml-1 text-xs text-accent">
                    ({getReg(item.id).substitutoNome})
                  </span>
                )}
              </button>

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
                {gramas}{item.unidade}
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
                  {gramas}{item.unidade}
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
