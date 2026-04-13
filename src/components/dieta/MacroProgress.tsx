import type { Macros } from '../../data/tipos'
import { cn } from '../../utils/cn'
import { ProgressBar } from '../ui/ProgressBar'

interface MacroProgressProps {
  macros: Macros
  alvo: Macros
}

export function MacroProgress({ macros, alvo }: MacroProgressProps) {
  const over = macros.kcal > alvo.kcal

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1 py-2">
        <span
          className={cn(
            'text-5xl font-bold font-[family-name:var(--font-mono)]',
            over ? 'text-accent' : 'text-ink'
          )}
        >
          {Math.round(macros.kcal)}
        </span>
        <span className="text-sm text-ink-3">
          de{' '}
          <span className="font-[family-name:var(--font-mono)]">{alvo.kcal}</span>{' '}
          kcal
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <ProgressBar current={macros.kcal} target={alvo.kcal} label="Calorias" unit="kcal" />
        <ProgressBar current={macros.p} target={alvo.p} label="Proteina" unit="g" />
        <ProgressBar current={macros.c} target={alvo.c} label="Carboidrato" unit="g" />
        <ProgressBar current={macros.g} target={alvo.g} label="Gordura" unit="g" />
      </div>
    </div>
  )
}
