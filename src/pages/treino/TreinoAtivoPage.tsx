import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { TREINO_A } from '../../data/treino-a'
import { TREINO_B } from '../../data/treino-b'
import type { SerieFeita } from '../../data/tipos'
import { useTreinoStore } from '../../stores/useTreinoStore'
import { registrarTreino } from '../../db/queries'
import { hoje } from '../../utils/datas'
import { cn } from '../../utils/cn'
import { useTimer } from '../../hooks/useTimer'
import { BlocoTreino } from '../../components/treino/BlocoTreino'
import { RestTimer } from '../../components/treino/RestTimer'

const TREINOS = { A: TREINO_A, B: TREINO_B } as const

export function TreinoAtivoPage() {
  const navigate = useNavigate()
  const {
    treinoAtivo,
    seriesFeitas,
    registrarSerie,
    removerSerie,
    finalizarTreino: finalizarStore,
  } = useTreinoStore()
  const [confirmFinalizar, setConfirmFinalizar] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const timer = useTimer()

  if (!treinoAtivo) {
    return (
      <div className="p-4 text-center">
        <p className="text-ink-2 mb-4">Nenhum treino ativo.</p>
        <button
          type="button"
          onClick={() => navigate('/treino')}
          className="min-h-[44px] px-6 rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3"
        >
          Voltar
        </button>
      </div>
    )
  }

  const treino = TREINOS[treinoAtivo]

  const handleRegistrarSerie = (serie: SerieFeita) => {
    registrarSerie(serie)
    // Find exercise to get rest time
    for (const bloco of treino.blocos) {
      const ex = bloco.exercicios.find((e) => e.id === serie.exercicioId)
      if (ex && ex.descansoSegundos > 0) {
        setTotalSeconds(ex.descansoSegundos)
        timer.start(ex.descansoSegundos)
        break
      }
    }
  }

  const handleStartTimer = (secs: number) => {
    setTotalSeconds(secs)
    timer.start(secs)
  }

  const handleFinalizar = async () => {
    const result = finalizarStore()
    if (result) {
      await registrarTreino({
        data: hoje(),
        treinoId: treinoAtivo,
        series: result.series,
        duracaoMin: result.duracaoMin,
      })
    }
    navigate('/treino')
  }

  const totalSeries = treino.blocos.reduce(
    (acc, b) => acc + b.exercicios.reduce((a, e) => a + e.series, 0),
    0
  )

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border-soft">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            type="button"
            onClick={() => navigate('/treino')}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-2"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <p className="text-sm font-bold text-ink">{treino.nome}</p>
            <p className="text-xs text-ink-3">
              <span className="font-[family-name:var(--font-mono)]">{seriesFeitas.length}</span>
              /{totalSeries} series
            </p>
          </div>
          <div className="w-11" />
        </div>

        {/* Rest Timer */}
        <div className="px-4 pb-3">
          <RestTimer
            seconds={timer.seconds}
            isRunning={timer.isRunning}
            display={timer.display}
            totalSeconds={totalSeconds}
            onStart={handleStartTimer}
            onPause={timer.pause}
            onReset={() => {
              timer.reset()
              setTotalSeconds(0)
            }}
          />
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 p-4">
        {treino.blocos.map((bloco) => (
          <BlocoTreino
            key={bloco.id}
            bloco={bloco}
            seriesFeitas={seriesFeitas}
            onRegistrarSerie={handleRegistrarSerie}
            onRemoverSerie={removerSerie}
          />
        ))}

        {/* Finalizar */}
        <div className="mt-4 mb-8">
          {!confirmFinalizar ? (
            <button
              type="button"
              onClick={() => setConfirmFinalizar(true)}
              className={cn(
                'w-full min-h-[52px] rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors',
                seriesFeitas.length > 0
                  ? 'bg-green/20 text-green active:bg-green/30'
                  : 'bg-surface-2 text-ink-3'
              )}
            >
              FINALIZAR TREINO
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-ink-2 text-center">
                Finalizar com{' '}
                <span className="font-[family-name:var(--font-mono)] text-ink font-bold">
                  {seriesFeitas.length}
                </span>{' '}
                series registradas?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmFinalizar(false)}
                  className="flex-1 min-h-[48px] rounded-lg bg-surface-2 text-sm font-bold text-ink-2 active:bg-surface-3 transition-colors"
                >
                  VOLTAR
                </button>
                <button
                  type="button"
                  onClick={handleFinalizar}
                  className="flex-1 min-h-[48px] rounded-lg bg-green text-sm font-bold text-bg active:bg-green/80 transition-colors"
                >
                  CONFIRMAR
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
