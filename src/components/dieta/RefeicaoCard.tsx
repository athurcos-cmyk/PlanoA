import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import type { SlotRefeicao, RefeicaoFeita, OpcaoRefeicao } from '../../data/tipos'
import { DIETA_FOLGA } from '../../data/dieta-folga'
import { DIETA_PLANTAO } from '../../data/dieta-plantao'
import { OpcaoCard } from './OpcaoCard'

interface RefeicaoCardProps {
  slot: SlotRefeicao
  feita?: RefeicaoFeita
  tipoDia: 'folga' | 'plantao'
}

export function RefeicaoCard({ slot, feita, tipoDia }: RefeicaoCardProps) {
  const [aberta, setAberta] = useState(false)
  const navigate = useNavigate()
  const done = !!feita
  const opcaoRegistrada = feita ? findOpcaoById(feita.opcaoId) : null
  const temOpcaoCorrespondenteNoSlot = feita
    ? slot.opcoes.some((opcao) => opcao.id === feita.opcaoId)
    : false

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
          {done && opcaoRegistrada && !temOpcaoCorrespondenteNoSlot && slot.opcoes[0] && (
            <div className="rounded-lg border border-green/20 bg-green/10 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-green">
                    Troca registrada
                  </p>
                  <p className="text-sm font-medium text-ink">{opcaoRegistrada.nome}</p>
                  <p className="text-xs text-ink-3">
                    Essa refeicao foi salva neste slot usando troca de opcao completa.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/dieta/${slot.id}/${slot.opcoes[0].id}`)}
                  className="min-h-[44px] shrink-0 rounded bg-surface px-3 py-2 text-xs font-medium text-ink active:bg-surface-2 transition-colors"
                >
                  VER
                </button>
              </div>
            </div>
          )}

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

function findOpcaoById(opcaoId: string): OpcaoRefeicao | null {
  for (const slot of DIETA_FOLGA.slots) {
    const opcao = slot.opcoes.find((entry) => entry.id === opcaoId)
    if (opcao) return opcao
  }

  for (const slot of DIETA_PLANTAO.slots) {
    const opcao = slot.opcoes.find((entry) => entry.id === opcaoId)
    if (opcao) return opcao
  }

  return null
}
