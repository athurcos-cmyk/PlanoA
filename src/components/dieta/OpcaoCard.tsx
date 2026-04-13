import { useNavigate } from 'react-router-dom'
import type { OpcaoRefeicao, SlotRefeicao } from '../../data/tipos'
import { cn } from '../../utils/cn'
import { calcularMacrosOpcao } from '../../utils/macros'
import { registrarRefeicao, desmarcarRefeicao } from '../../db/queries'
import { hoje } from '../../utils/datas'

interface OpcaoCardProps {
  opcao: OpcaoRefeicao
  slot: SlotRefeicao
  isSelected: boolean
  tipoDia: 'folga' | 'plantao'
}

export function OpcaoCard({ opcao, slot, isSelected, tipoDia }: OpcaoCardProps) {
  const navigate = useNavigate()
  const macros = calcularMacrosOpcao(opcao.itens)

  async function handleRegistrar() {
    navigator.vibrate?.(20)
    await registrarRefeicao({
      data: hoje(),
      slotRefeicaoId: slot.id,
      opcaoId: opcao.id,
      tipoDia,
      macrosConsumidos: macros,
    })
  }

  function handleDetalhe() {
    navigate(`/dieta/${slot.id}/${opcao.id}`)
  }

  return (
    <div
      className={cn(
        'rounded-lg bg-surface-2 p-3 flex flex-col gap-2',
        isSelected && 'border border-accent'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink">{opcao.nome}</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-ink-3 font-[family-name:var(--font-mono)]">
        <span>{Math.round(macros.kcal)} kcal</span>
        <span>&middot;</span>
        <span>P {macros.p.toFixed(0)}g</span>
        <span>&middot;</span>
        <span>C {macros.c.toFixed(0)}g</span>
        <span>&middot;</span>
        <span>G {macros.g.toFixed(0)}g</span>
      </div>

      <div className="flex items-center gap-2 pt-1">
        {isSelected ? (
          <button
            type="button"
            onClick={async () => {
              navigator.vibrate?.(20)
              await desmarcarRefeicao(hoje(), slot.id)
            }}
            className="flex items-center gap-1 text-sm text-green font-medium min-h-[44px] active:text-over transition-colors"
          >
            &#10003; Registrada
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRegistrar}
            className="min-h-[44px] rounded bg-surface-3 px-4 py-2 text-sm font-medium text-ink active:bg-accent active:text-white transition-colors"
          >
            &#10003; FIZ ESSA
          </button>
        )}
        <button
          type="button"
          onClick={handleDetalhe}
          className="min-h-[44px] rounded bg-surface-3 px-3 py-2 text-sm text-ink-2 active:bg-surface transition-colors"
        >
          &middot;&middot;&middot;
        </button>
      </div>
    </div>
  )
}
