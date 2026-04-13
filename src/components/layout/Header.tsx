import { useDiaStore } from '../../stores/useDiaStore'
import { formatarData, hoje } from '../../utils/datas'
import { cn } from '../../utils/cn'

export function Header() {
  const { tipoDia, toggleTipoDia } = useDiaStore()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-bg/95 backdrop-blur-sm border-b border-border-soft">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-ink-2">{formatarData(hoje())}</span>
        <span className="text-ink-3">·</span>
        <button
          onClick={toggleTipoDia}
          className={cn(
            'text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider',
            tipoDia === 'folga'
              ? 'bg-green/15 text-green'
              : 'bg-accent-soft text-accent'
          )}
        >
          {tipoDia === 'folga' ? 'FOLGA' : 'PLANTÃO'}
        </button>
      </div>
      <a href="/perfil" className="text-ink-3 text-lg">⚙</a>
    </header>
  )
}
