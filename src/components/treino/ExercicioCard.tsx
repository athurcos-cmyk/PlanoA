import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Exercicio, SerieFeita } from '../../data/tipos'
import { cn } from '../../utils/cn'
import { SerieInput } from './SerieInput'

interface ExercicioCardProps {
  exercicio: Exercicio
  seriesFeitas: SerieFeita[]
  onRegistrarSerie: (serie: SerieFeita) => void
}

export function ExercicioCard({
  exercicio,
  seriesFeitas,
  onRegistrarSerie,
}: ExercicioCardProps) {
  const [inputAberto, setInputAberto] = useState<number | null>(null)

  const seriesFeitasDoExercicio = seriesFeitas.filter(
    (s) => s.exercicioId === exercicio.id
  )

  const proximaSerie = seriesFeitasDoExercicio.length + 1
  const lastSerie =
    seriesFeitasDoExercicio.length > 0
      ? seriesFeitasDoExercicio[seriesFeitasDoExercicio.length - 1]
      : undefined

  const handleSubmit = (serie: SerieFeita) => {
    onRegistrarSerie(serie)
    setInputAberto(null)
  }

  return (
    <>
      <div className="rounded-lg bg-surface-2 p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">{exercicio.nome}</p>
            <p className="text-xs text-ink-3">
              {exercicio.series}x{exercicio.repsAlvo}
              {exercicio.cargaKg != null && (
                <span className="font-[family-name:var(--font-mono)]">
                  {' '}· {exercicio.cargaKg}kg
                </span>
              )}
            </p>
          </div>
          <Link
            to={`/treino/exercicio/${exercicio.id}`}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-3 active:text-ink transition-colors"
          >
            <BarChart3 size={18} />
          </Link>
        </div>

        {exercicio.nota && (
          <p className="text-xs text-ink-3 italic mb-2">{exercicio.nota}</p>
        )}

        {/* Series badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {Array.from({ length: exercicio.series }, (_, i) => {
            const num = i + 1
            const feita = seriesFeitasDoExercicio.find((s) => s.serie === num)
            return (
              <button
                key={num}
                type="button"
                onClick={() => {
                  if (!feita) setInputAberto(num)
                }}
                className={cn(
                  'min-h-[44px] min-w-[44px] rounded-lg flex flex-col items-center justify-center text-xs transition-colors',
                  feita
                    ? 'bg-green/20 text-green border border-green/30'
                    : num === proximaSerie
                      ? 'bg-accent-soft text-accent border border-accent/30 active:bg-accent/20'
                      : 'bg-surface-3 text-ink-3 border border-border-soft'
                )}
              >
                <span className="font-bold">S{num}</span>
                {feita && (
                  <span className="font-[family-name:var(--font-mono)] text-[10px]">
                    {feita.reps}x{feita.cargaKg}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {inputAberto !== null && (
        <SerieInput
          exercicio={exercicio}
          serieNum={inputAberto}
          onSubmit={handleSubmit}
          onCancel={() => setInputAberto(null)}
          lastSerie={lastSerie}
        />
      )}
    </>
  )
}
