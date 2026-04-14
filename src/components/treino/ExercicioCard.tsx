import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Exercicio, SerieFeita } from '../../data/tipos'
import { cn } from '../../utils/cn'
import { SerieInput } from './SerieInput'
import { TutorialExercicioModal } from './TutorialExercicioModal'

interface ExercicioCardProps {
  exercicio: Exercicio
  seriesFeitas: SerieFeita[]
  onRegistrarSerie: (serie: SerieFeita) => void
  onRemoverSerie: (exercicioId: string, serieNum: number) => void
}

export function ExercicioCard({
  exercicio,
  seriesFeitas,
  onRegistrarSerie,
  onRemoverSerie,
}: ExercicioCardProps) {
  const [inputAberto, setInputAberto] = useState<number | null>(null)
  const [tutorialAberto, setTutorialAberto] = useState(false)

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
        <div className="mb-2 flex items-start justify-between">
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
          <div className="flex items-center">
            {(exercicio.tutorial || exercicio.nota) && (
              <button
                type="button"
                onClick={() => setTutorialAberto(true)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-xs font-bold text-ink-3 transition-colors active:text-ink"
                title="Ver tutorial"
              >
                ?
              </button>
            )}
            <Link
              to={`/treino/exercicio/${exercicio.id}`}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink-3 transition-colors active:text-ink"
            >
              <BarChart3 size={18} />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: exercicio.series }, (_, i) => {
            const num = i + 1
            const feita = seriesFeitasDoExercicio.find((s) => s.serie === num)
            return (
              <button
                key={num}
                type="button"
                onClick={() => {
                  if (feita) {
                    onRemoverSerie(exercicio.id, num)
                  } else {
                    setInputAberto(num)
                  }
                }}
                className={cn(
                  'min-h-[44px] min-w-[44px] rounded-lg border text-xs transition-colors flex flex-col items-center justify-center',
                  feita
                    ? 'border-green/30 bg-green/20 text-green active:border-red-500/30 active:bg-red-900/20 active:text-red-400'
                    : num === proximaSerie
                      ? 'border-accent/30 bg-accent-soft text-accent active:bg-accent/20'
                      : 'border-border-soft bg-surface-3 text-ink-3'
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

      {tutorialAberto && exercicio.tutorial && (
        <TutorialExercicioModal
          exercicio={exercicio}
          onClose={() => setTutorialAberto(false)}
        />
      )}
    </>
  )
}
