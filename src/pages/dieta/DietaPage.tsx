import { useDiaAtual } from '../../hooks/useDiaAtual'
import { useRefeicoesFeitas } from '../../hooks/useRefeicoesFeitas'
import { useProgressoMacros } from '../../hooks/useProgressoMacros'
import { PERFIL } from '../../data/perfil'
import { RefeicaoCard } from '../../components/dieta/RefeicaoCard'
import { cn } from '../../utils/cn'

export function DietaPage() {
  const { tipoDia, dieta } = useDiaAtual()
  const refeicoes = useRefeicoesFeitas()
  const macros = useProgressoMacros()
  const alvo = PERFIL.macrosAlvo

  const feitasCount = refeicoes.length
  const totalSlots = dieta.slots.length

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-ink">Dieta</h1>
        <span className="rounded bg-surface-2 px-2 py-1 text-xs text-ink-2 capitalize">
          {tipoDia === 'folga' ? 'Dia de Folga' : 'Plantao'}
        </span>
      </div>

      {/* Quick macro summary */}
      <div className="rounded-lg bg-surface p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-ink-3">Consumido</span>
          <span
            className={cn(
              'text-xl font-bold font-[family-name:var(--font-mono)]',
              macros.kcal > alvo.kcal ? 'text-accent' : 'text-ink'
            )}
          >
            {Math.round(macros.kcal)}
            <span className="text-sm font-normal text-ink-3"> kcal</span>
          </span>
        </div>
        <div className="flex gap-4 text-xs font-[family-name:var(--font-mono)] text-ink-2">
          <div className="flex flex-col items-center">
            <span>P</span>
            <span className="text-ink">{Math.round(macros.p)}g</span>
          </div>
          <div className="flex flex-col items-center">
            <span>C</span>
            <span className="text-ink">{Math.round(macros.c)}g</span>
          </div>
          <div className="flex flex-col items-center">
            <span>G</span>
            <span className="text-ink">{Math.round(macros.g)}g</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-ink-3">Refeicoes</span>
          <span className="text-sm font-[family-name:var(--font-mono)] text-ink">
            {feitasCount}/{totalSlots}
          </span>
        </div>
      </div>

      {/* Meal slots */}
      <div className="flex flex-col gap-2">
        {dieta.slots.map((slot) => {
          const feita = refeicoes.find((r) => r.slotRefeicaoId === slot.id)
          return (
            <RefeicaoCard
              key={slot.id}
              slot={slot}
              feita={feita}
              tipoDia={tipoDia}
            />
          )
        })}
      </div>
    </div>
  )
}
