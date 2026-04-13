import type { BlocoTreino as BlocoTreinoType, SerieFeita } from '../../data/tipos'
import { ExercicioCard } from './ExercicioCard'

interface BlocoTreinoProps {
  bloco: BlocoTreinoType
  seriesFeitas: SerieFeita[]
  onRegistrarSerie: (serie: SerieFeita) => void
  onRemoverSerie: (exercicioId: string, serieNum: number) => void
}

export function BlocoTreino({ bloco, seriesFeitas, onRegistrarSerie, onRemoverSerie }: BlocoTreinoProps) {
  const temBiset = bloco.exercicios.some((e) => e.bisetCom)

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2 px-1">
        <h3 className="text-sm font-bold text-ink uppercase tracking-wider">
          {bloco.nome}
        </h3>
        {temBiset && (
          <span className="text-[10px] font-bold text-warn bg-warn/15 px-1.5 py-0.5 rounded">
            BI-SET
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {bloco.exercicios.map((exercicio) => (
          <ExercicioCard
            key={exercicio.id}
            exercicio={exercicio}
            seriesFeitas={seriesFeitas.filter((s) => s.exercicioId === exercicio.id)}
            onRegistrarSerie={onRegistrarSerie}
            onRemoverSerie={onRemoverSerie}
          />
        ))}
      </div>
    </div>
  )
}
