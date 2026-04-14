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
  const treinoAtivo = useTreinoStore((s) => s.treinoAtivo)

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
    if (treinoAtivo) {
      navigate('/treino/ativo')
      return
    }
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
          isAtivo={treino.id === treinoAtivo}
          bloqueadoPorOutroTreino={Boolean(treinoAtivo && treino.id !== treinoAtivo)}
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
  isAtivo,
  bloqueadoPorOutroTreino,
  onIniciar,
}: {
  treino: Treino
  ultimoTreino?: TreinoFeito
  isProximo: boolean
  isAtivo: boolean
  bloqueadoPorOutroTreino: boolean
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
        isAtivo
          ? 'ring-1 ring-green/40'
          : isProximo && 'ring-1 ring-accent/40'
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

        {isAtivo && (
          <button
            type="button"
            onClick={onIniciar}
            className="w-full min-h-[48px] rounded-lg bg-green/20 text-green text-sm font-bold flex items-center justify-center gap-2 active:bg-green/30 transition-colors"
          >
            <Play size={16} fill="currentColor" />
            CONTINUAR TREINO
          </button>
        )}

        {!isAtivo && isProximo && (
          <button
            type="button"
            onClick={onIniciar}
            className="w-full min-h-[48px] rounded-lg bg-accent text-sm font-bold text-ink flex items-center justify-center gap-2 active:bg-accent-darker transition-colors"
          >
            <Play size={16} fill="currentColor" />
            INICIAR TREINO
          </button>
        )}

        {!isAtivo && !isProximo && !bloqueadoPorOutroTreino && (
          <button
            type="button"
            onClick={onIniciar}
            className="w-full min-h-[48px] rounded-lg bg-surface-2 text-sm font-bold text-ink-2 flex items-center justify-center gap-2 active:bg-surface-3 transition-colors"
          >
            <Play size={16} />
            INICIAR
          </button>
        )}

        {bloqueadoPorOutroTreino && (
          <button
            type="button"
            onClick={onIniciar}
            className="w-full min-h-[48px] rounded-lg bg-surface-2 text-sm font-bold text-ink-3 flex items-center justify-center gap-2 active:bg-surface-3 transition-colors"
          >
            <Play size={16} />
            TREINO EM ANDAMENTO
          </button>
        )}
      </div>
    </div>
  )
}
