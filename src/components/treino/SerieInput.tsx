import { useState, useRef, useCallback, useEffect } from 'react'
import type { Exercicio, SerieFeita } from '../../data/tipos'

interface SerieInputProps {
  exercicio: Exercicio
  serieNum: number
  onSubmit: (serie: SerieFeita) => void
  onCancel: () => void
  lastSerie?: SerieFeita
}

export function SerieInput({
  exercicio,
  serieNum,
  onSubmit,
  onCancel,
  lastSerie,
}: SerieInputProps) {
  const defaultReps = lastSerie?.reps ?? parseDefaultReps(exercicio.repsAlvo)
  const defaultCarga = lastSerie?.cargaKg ?? exercicio.cargaKg ?? 0

  const [reps, setReps] = useState(defaultReps)
  const [carga, setCarga] = useState(defaultCarga)
  const [editandoCarga, setEditandoCarga] = useState(false)
  const [cargaText, setCargaText] = useState(String(defaultCarga))
  const cargaInputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (editandoCarga) cargaInputRef.current?.select()
  }, [editandoCarga])

  const handleSubmit = () => {
    onSubmit({
      exercicioId: exercicio.id,
      serie: serieNum,
      reps,
      cargaKg: carga,
    })
  }

  const startLongPress = useCallback(
    (fn: () => void) => {
      fn()
      let speed = 300
      const tick = () => {
        fn()
        speed = Math.max(80, speed - 30)
        intervalRef.current = setTimeout(tick, speed)
      }
      intervalRef.current = setTimeout(tick, speed)
    },
    []
  )

  const stopLongPress = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
      <div className="w-full max-w-md rounded-t-2xl bg-surface p-5 pb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm text-ink-2">{exercicio.nome}</p>
            <p className="text-lg font-bold text-ink">
              Serie {serieNum}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-3 text-xl"
          >
            X
          </button>
        </div>

        {/* Reps */}
        <div className="mb-5">
          <p className="text-xs text-ink-3 uppercase tracking-wider mb-2">Repetições</p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onPointerDown={() => startLongPress(() => setReps((r) => Math.max(0, r - 1)))}
              onPointerUp={stopLongPress}
              onPointerLeave={stopLongPress}
              className="min-h-[48px] min-w-[48px] rounded-lg bg-surface-2 text-xl font-bold text-ink active:bg-surface-3"
            >
              -
            </button>
            <span className="text-4xl font-bold font-[family-name:var(--font-mono)] text-ink w-20 text-center">
              {reps}
            </span>
            <button
              type="button"
              onPointerDown={() => startLongPress(() => setReps((r) => r + 1))}
              onPointerUp={stopLongPress}
              onPointerLeave={stopLongPress}
              className="min-h-[48px] min-w-[48px] rounded-lg bg-surface-2 text-xl font-bold text-ink active:bg-surface-3"
            >
              +
            </button>
          </div>
          <p className="text-xs text-ink-3 text-center mt-1">Alvo: {exercicio.repsAlvo}</p>
        </div>

        {/* Carga */}
        <div className="mb-6">
          <p className="text-xs text-ink-3 uppercase tracking-wider mb-2">Carga (kg)</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCarga((c) => Math.max(0, +(c - 1).toFixed(1)))}
              className="min-h-[44px] min-w-[44px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3"
            >
              -1
            </button>
            <button
              type="button"
              onClick={() => setCarga((c) => Math.max(0, +(c - 0.5).toFixed(1)))}
              className="min-h-[44px] min-w-[40px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3"
            >
              -.5
            </button>
            {editandoCarga ? (
              <input
                ref={cargaInputRef}
                type="number"
                inputMode="decimal"
                value={cargaText}
                onChange={(e) => setCargaText(e.target.value)}
                onBlur={() => {
                  const val = parseFloat(cargaText)
                  if (!isNaN(val) && val >= 0) setCarga(+(val.toFixed(1)))
                  else setCargaText(String(carga))
                  setEditandoCarga(false)
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
                className="w-24 text-3xl font-bold font-[family-name:var(--font-mono)] text-ink text-center bg-surface-3 rounded-lg outline-none border-2 border-accent"
              />
            ) : (
              <button
                type="button"
                onClick={() => { setCargaText(String(carga)); setEditandoCarga(true) }}
                className="text-3xl font-bold font-[family-name:var(--font-mono)] text-ink w-24 text-center rounded-lg active:bg-surface-3 transition-colors"
              >
                {carga}
              </button>
            )}
            <button
              type="button"
              onClick={() => setCarga((c) => +(c + 0.5).toFixed(1))}
              className="min-h-[44px] min-w-[40px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3"
            >
              +.5
            </button>
            <button
              type="button"
              onClick={() => setCarga((c) => +(c + 1).toFixed(1))}
              className="min-h-[44px] min-w-[44px] rounded-lg bg-surface-2 text-sm font-bold text-ink active:bg-surface-3"
            >
              +1
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 min-h-[48px] rounded-lg bg-surface-2 text-sm font-bold text-ink-2 active:bg-surface-3 transition-colors"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 min-h-[48px] rounded-lg bg-accent text-sm font-bold text-white active:bg-accent-darker transition-colors"
          >
            REGISTRAR
          </button>
        </div>
      </div>
    </div>
  )
}

function parseDefaultReps(repsAlvo: string): number {
  const match = repsAlvo.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 10
}
