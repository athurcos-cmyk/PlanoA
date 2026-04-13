import { cn } from '../../utils/cn'

interface ProgressBarProps {
  current: number
  target: number
  label: string
  unit?: string
}

export function ProgressBar({ current, target, label, unit = '' }: ProgressBarProps) {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0
  const over = current > target

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-2">{label}</span>
        <span
          className={cn(
            'text-sm font-[family-name:var(--font-mono)]',
            over ? 'text-accent' : 'text-ink'
          )}
        >
          {Math.round(current)}/{target}{unit && ` ${unit}`}
        </span>
      </div>
      <div className="h-2 w-full rounded-sm bg-surface-2 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-sm transition-all duration-300',
            over ? 'bg-accent' : 'bg-ink'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
