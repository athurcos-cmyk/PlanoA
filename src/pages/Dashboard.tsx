import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Utensils, Dumbbell, ChevronRight } from 'lucide-react'
import { useDiaAtual } from '../hooks/useDiaAtual'
import { useRefeicoesFeitas } from '../hooks/useRefeicoesFeitas'
import { useProgressoMacros } from '../hooks/useProgressoMacros'
import { PERFIL } from '../data/perfil'
import { MacroProgress } from '../components/dieta/MacroProgress'
import { ExtraButton } from '../components/dieta/ExtraButton'
import { ExtrasList } from '../components/dieta/ExtrasList'
import { cn } from '../utils/cn'
import { calcularMacrosAlvoDia } from '../utils/dieta'
import { db } from '../db/schema'
import { hoje } from '../utils/datas'

function getHoraAtual(): string {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

export function Dashboard() {
  const navigate = useNavigate()
  const { tipoDia, dieta } = useDiaAtual()
  const refeicoes = useRefeicoesFeitas()
  const macros = useProgressoMacros()
  const alvo = calcularMacrosAlvoDia(dieta)

  const treinoHoje = useLiveQuery(
    () => db.treinos.where('data').equals(hoje()).first(),
    []
  )

  // Find next meal slot based on current time
  const horaAtual = getHoraAtual()
  const slotsDone = new Set(refeicoes.map((r) => r.slotRefeicaoId))
  const proximoSlot = dieta.slots.find(
    (s) => !slotsDone.has(s.id) && s.horario >= horaAtual
  ) || dieta.slots.find((s) => !slotsDone.has(s.id))

  const feitasCount = refeicoes.length
  const totalSlots = dieta.slots.length

  return (
    <div className="flex flex-col gap-6 p-4 pb-24">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-ink">Plano A</h1>
          <span className="text-xs text-ink-3 capitalize">
            {tipoDia === 'folga' ? 'Dia de folga' : 'Plantao'}
          </span>
        </div>
      </div>

      {/* Macro progress */}
      <div className="rounded-lg bg-surface p-4">
        <MacroProgress macros={macros} alvo={alvo} />
        <p className="mt-3 text-xs text-ink-3">
          Alvo do dia baseado no plano atual de {tipoDia === 'folga' ? 'folga' : 'plantao'}.
          Meta base do perfil: {PERFIL.metaKcal} kcal.
        </p>
      </div>

      {/* Next meal */}
      {proximoSlot && (
        <div className="rounded-lg bg-surface p-4">
          <div className="flex items-center gap-2 mb-3">
            <Utensils size={16} className="text-ink-3" />
            <span className="text-xs font-medium text-ink-2 uppercase tracking-wide">
              Proxima refeicao
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/dieta')}
            className="flex w-full items-center justify-between min-h-[44px] rounded-lg bg-surface-2 px-4 py-3 active:bg-surface-3 transition-colors"
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-medium text-ink">{proximoSlot.nome}</span>
              <span className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
                {proximoSlot.horario} &middot;{' '}
                {Math.round(proximoSlot.macrosAlvo.kcal)} kcal
              </span>
            </div>
            <ChevronRight size={18} className="text-ink-3" />
          </button>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => navigate('/dieta')}
          className="flex flex-col items-start gap-2 rounded-lg bg-surface p-4 min-h-[44px] active:bg-surface-2 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Utensils size={14} className="text-ink-3" />
            <span className="text-xs text-ink-2">Refeicoes</span>
          </div>
          <span className="text-xl font-bold font-[family-name:var(--font-mono)] text-ink">
            {feitasCount}
            <span className="text-sm font-normal text-ink-3">/{totalSlots}</span>
          </span>
        </button>

        <div
          className={cn(
            'flex flex-col items-start gap-2 rounded-lg bg-surface p-4',
            treinoHoje && 'border border-green/30'
          )}
        >
          <div className="flex items-center gap-2">
            <Dumbbell size={14} className="text-ink-3" />
            <span className="text-xs text-ink-2">Treino</span>
          </div>
          {treinoHoje ? (
            <span className="text-sm font-medium text-green">
              &#10003; Concluido
            </span>
          ) : (
            <span className="text-sm text-ink-3">Pendente</span>
          )}
        </div>
      </div>

      {/* Extras do dia */}
      <ExtrasList />

      {/* Go to diet CTA */}
      <button
        type="button"
        onClick={() => navigate('/dieta')}
        className="flex items-center justify-center gap-2 rounded-lg bg-surface-2 py-4 min-h-[44px] text-sm font-medium text-ink active:bg-surface-3 transition-colors"
      >
        <Utensils size={16} />
        Ver plano alimentar
        <ChevronRight size={16} />
      </button>

      {/* FAB Extra */}
      <ExtraButton />
    </div>
  )
}
