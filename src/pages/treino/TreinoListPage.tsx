import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Play, Dumbbell } from 'lucide-react'
import { TREINO_A } from '../../data/treino-a'
import { TREINO_B } from '../../data/treino-b'
import type { Treino, TreinoFeito } from '../../data/tipos'
import { useTreinoStore } from '../../stores/useTreinoStore'
import { db } from '../../db/schema'
import { cn } from '../../utils/cn'
import { formatarData } from '../../utils/datas'

const treinos = [TREINO_A, TREINO_B]

export function TreinoListPage() {
  const navigate = useNavigate()
  const iniciarTreino = useTreinoStore((s) => s.iniciarTreino)

  const ultimosTreinos = useLiveQuery(async () => {
    const todos = await db.treinos.orderBy('data').reverse().toArray()
    const ultimoA = todos.find((t) => t.treinoId === 'A')
    const ultimoB = todos.find((t) => t.treinoId === 'B')
    return { A: ultimoA, B: ultimoB }
  })

  // Determine next training: whichever was done least recently (or A if never done)
  const proximoId = (() => {
    if (!ultimosTreinos) return 'A' as const
    const { A, B } = ultimosTreinos
    if (!A && !B) return 'A' as const
    if (!A) return 'A' as const
    if (!B) return 'B' as const
    return A.data <= B.data ? 'A' as const : 'B' as const
  })()

  const handleIniciar = (id: 'A' | 'B') => {
    iniciarTreino(id)
    navigate('/treino/ativo')
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <Dumbbell size={20} className="text-accent" />
        <h1 className="text-xl font-bold text-ink">Treinos</h1>
      </div>

      {treinos.map((treino) => (
        <TreinoCard
          key={treino.id}
          treino={treino}
          ultimoTreino={ultimosTreinos?.[treino.id]}
          isProximo={treino.id === proximoId}
          onIniciar={() => handleIniciar(treino.id)}
        />
      ))}
    </div>
  )
}

function TreinoCard({
  treino,
  ultimoTreino,
  isProximo,
  onIniciar,
}: {
  treino: Treino
  ultimoTreino?: TreinoFeito
  isProximo: boolean
  onIniciar: () => void
}) {
  const totalExercicios = treino.blocos.reduce(
    (acc, b) => acc + b.exercicios.length,
    0
  )

  return (
    <div
      className={cn(
        'rounded-lg bg-surface overflow-hidden',
        isProximo && 'ring-1 ring-accent/40'
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold shrink-0',
              treino.id === 'A'
                ? 'bg-accent-soft text-accent'
                : 'bg-green/15 text-green'
            )}
          >
            {treino.id}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-ink">{treino.nome}</h2>
            <p className="text-xs text-ink-2 mt-0.5">{treino.subtitulo}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-3 mb-3">
          <span>{totalExercicios} exercicios</span>
          <span>·</span>
          <span className="font-[family-name:var(--font-mono)]">{treino.duracaoMin} min</span>
          {ultimoTreino && (
            <>
              <span>·</span>
              <span>Ultimo: {formatarData(ultimoTreino.data)}</span>
            </>
          )}
        </div>

        {/* Exercise preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {treino.blocos.flatMap((b) =>
            b.exercicios.slice(0, 2).map((e) => (
              <span
                key={e.id}
                className="text-[11px] text-ink-3 bg-surface-2 px-2 py-0.5 rounded"
              >
                {e.nome}
              </span>
            ))
          )}
        </div>

        {isProximo && (
          <button
            type="button"
            onClick={onIniciar}
            className="w-full min-h-[48px] rounded-lg bg-accent text-sm font-bold text-ink flex items-center justify-center gap-2 active:bg-accent-darker transition-colors"
          >
            <Play size={16} fill="currentColor" />
            INICIAR TREINO
          </button>
        )}

        {!isProximo && (
          <button
            type="button"
            onClick={onIniciar}
            className="w-full min-h-[48px] rounded-lg bg-surface-2 text-sm font-bold text-ink-2 flex items-center justify-center gap-2 active:bg-surface-3 transition-colors"
          >
            <Play size={16} />
            INICIAR
          </button>
        )}
      </div>
    </div>
  )
}
