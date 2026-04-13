import { cn } from '../../utils/cn'

interface RestTimerProps {
  seconds: number
  isRunning: boolean
  display: string
  totalSeconds: number
  onStart: (secs: number) => void
  onPause: () => void
  onReset: () => void
}

const PRESETS = [60, 75, 90] as const

export function RestTimer({
  seconds,
  isRunning,
  display,
  totalSeconds,
  onStart,
  onPause,
  onReset,
}: RestTimerProps) {
  const pct = totalSeconds > 0 ? (seconds / totalSeconds) * 100 : 0
  const done = !isRunning && seconds === 0 && totalSeconds > 0

  return (
    <div className="bg-surface rounded-lg px-4 py-3">
      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-surface-3 overflow-hidden mb-3">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-linear',
            done ? 'bg-green' : 'bg-accent'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Time display */}
      <div className="flex items-center justify-center mb-3">
        <span
          className={cn(
            'text-3xl font-bold font-[family-name:var(--font-mono)]',
            done && 'text-green',
            isRunning && 'text-accent'
          )}
        >
          {display}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {PRESETS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onStart(s)}
            className="min-h-[44px] min-w-[56px] rounded-lg bg-surface-2 text-sm font-[family-name:var(--font-mono)] text-ink-2 active:bg-surface-3 transition-colors"
          >
            {s}s
          </button>
        ))}

        {isRunning ? (
          <button
            type="button"
            onClick={onPause}
            className="min-h-[44px] min-w-[56px] rounded-lg bg-accent-soft text-sm font-bold text-accent active:bg-accent/20 transition-colors"
          >
            PAUSE
          </button>
        ) : seconds > 0 ? (
          <button
            type="button"
            onClick={() => onStart(seconds)}
            className="min-h-[44px] min-w-[56px] rounded-lg bg-accent-soft text-sm font-bold text-accent active:bg-accent/20 transition-colors"
          >
            RETOMAR
          </button>
        ) : null}

        {(isRunning || seconds > 0) && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[44px] min-w-[44px] rounded-lg bg-surface-2 text-sm text-ink-3 active:bg-surface-3 transition-colors"
          >
            RESET
          </button>
        )}
      </div>
    </div>
  )
}
