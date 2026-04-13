import { useState } from 'react'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import type { SlotRefeicao, RefeicaoFeita } from '../../data/tipos'
import { OpcaoCard } from './OpcaoCard'

interface RefeicaoCardProps {
  slot: SlotRefeicao
  feita?: RefeicaoFeita
  tipoDia: 'folga' | 'plantao'
}

export function RefeicaoCard({ slot, feita, tipoDia }: RefeicaoCardProps) {
  const [aberta, setAberta] = useState(false)
  const done = !!feita

  return (
    <div className="rounded-lg bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setAberta((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 min-h-[56px] active:bg-surface-2 transition-colors"
      >
        <div className="flex items-center gap-2">
          {aberta ? (
            <ChevronDown size={18} className="text-ink-3 shrink-0" />
          ) : (
            <ChevronRight size={18} className="text-ink-3 shrink-0" />
          )}
          <span className="text-sm font-medium text-ink">{slot.nome}</span>
          {done && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green/20">
              <Check size={12} className="text-green" />
            </span>
          )}
        </div>
        <span className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
          {slot.horario}
        </span>
      </button>

      {aberta && (
        <div className="flex flex-col gap-2 px-4 pb-4 pt-1">
          {slot.opcoes.map((opcao) => (
            <OpcaoCard
              key={opcao.id}
              opcao={opcao}
              slot={slot}
              isSelected={feita?.opcaoId === opcao.id}
              tipoDia={tipoDia}
            />
          ))}
        </div>
      )}
    </div>
  )
}
