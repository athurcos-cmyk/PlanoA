import { useParams, useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { ChevronLeft, TrendingUp } from 'lucide-react'
import { TREINO_A } from '../../data/treino-a'
import { TREINO_B } from '../../data/treino-b'
import type { Exercicio, TreinoFeito, SerieFeita } from '../../data/tipos'
import { getTreinosPorExercicio } from '../../db/queries'
import { cn } from '../../utils/cn'
import { formatarData } from '../../utils/datas'

function findExercicio(id: string): Exercicio | undefined {
  for (const treino of [TREINO_A, TREINO_B]) {
    for (const bloco of treino.blocos) {
      const ex = bloco.exercicios.find((e) => e.id === id)
      if (ex) return ex
    }
  }
  return undefined
}

export function ProgressaoCargaPage() {
  const { exercicioId } = useParams<{ exercicioId: string }>()
  const navigate = useNavigate()

  const exercicio = exercicioId ? findExercicio(exercicioId) : undefined

  const treinos = useLiveQuery(
    () => (exercicioId ? getTreinosPorExercicio(exercicioId) : Promise.resolve([] as TreinoFeito[])),
    [exercicioId]
  )

  if (!exercicio) {
    return (
      <div className="p-4">
        <p className="text-ink-2">Exercicio nao encontrado.</p>
      </div>
    )
  }

  // Compute PR
  let prWeight = 0
  let prReps = 0
  const sessoes: { data: string; series: SerieFeita[] }[] = []

  if (treinos) {
    for (const t of treinos) {
      const seriesDoEx = t.series.filter((s) => s.exercicioId === exercicioId)
      if (seriesDoEx.length > 0) {
        sessoes.push({ data: t.data, series: seriesDoEx })
        for (const s of seriesDoEx) {
          if (s.cargaKg > prWeight || (s.cargaKg === prWeight && s.reps > prReps)) {
            prWeight = s.cargaKg
            prReps = s.reps
          }
        }
      }
    }
  }

  // Heuristic: check if should increase load
  // 12 reps achieved at current load for 2 consecutive sessions
  const shouldIncrease = (() => {
    if (sessoes.length < 2) return false
    const last2 = sessoes.slice(0, 2)
    return last2.every((sessao) =>
      sessao.series.some((s) => s.reps >= 12 && s.cargaKg >= prWeight)
    )
  })()

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-soft">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-2"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-base font-bold text-ink">{exercicio.nome}</h1>
          <p className="text-xs text-ink-3">Progressao de carga</p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* PR Card */}
        <div className="rounded-lg bg-surface p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-accent" />
            <span className="text-xs text-ink-3 uppercase tracking-wider">Recorde Pessoal</span>
          </div>
          {prWeight > 0 ? (
            <p className="text-2xl font-bold font-[family-name:var(--font-mono)] text-ink">
              {prWeight}kg x {prReps}
            </p>
          ) : (
            <p className="text-sm text-ink-3">Nenhum registro ainda</p>
          )}
        </div>

        {/* Should increase badge */}
        {shouldIncrease && (
          <div className="rounded-lg bg-green/10 border border-green/20 p-3 flex items-center gap-2">
            <span className="text-lg">💪</span>
            <p className="text-sm font-medium text-green">
              Hora de subir carga!
            </p>
          </div>
        )}

        {/* Current config */}
        <div className="rounded-lg bg-surface p-4">
          <p className="text-xs text-ink-3 uppercase tracking-wider mb-2">Configuracao atual</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-ink">
              <span className="text-ink-3">Series:</span>{' '}
              <span className="font-[family-name:var(--font-mono)]">{exercicio.series}</span>
            </span>
            <span className="text-ink">
              <span className="text-ink-3">Reps:</span>{' '}
              <span className="font-[family-name:var(--font-mono)]">{exercicio.repsAlvo}</span>
            </span>
            {exercicio.cargaKg != null && (
              <span className="text-ink">
                <span className="text-ink-3">Carga:</span>{' '}
                <span className="font-[family-name:var(--font-mono)]">{exercicio.cargaKg}kg</span>
              </span>
            )}
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-3">
            Historico ({sessoes.length})
          </h2>
          {sessoes.length === 0 ? (
            <p className="text-sm text-ink-3">Nenhum treino registrado com este exercicio.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {sessoes.map((sessao) => (
                <div key={sessao.data} className="rounded-lg bg-surface p-3">
                  <p className="text-xs text-ink-3 mb-2">{formatarData(sessao.data)}</p>
                  <div className="flex flex-wrap gap-2">
                    {sessao.series.map((s) => (
                      <span
                        key={`${s.serie}`}
                        className={cn(
                          'text-xs font-[family-name:var(--font-mono)] px-2 py-1 rounded',
                          s.cargaKg === prWeight && s.reps === prReps
                            ? 'bg-accent-soft text-accent'
                            : 'bg-surface-2 text-ink-2'
                        )}
                      >
                        S{s.serie}: {s.reps}x{s.cargaKg}kg
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
