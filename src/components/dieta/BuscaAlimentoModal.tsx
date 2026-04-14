import { useState, useCallback, useRef, useEffect } from 'react'
import { X, Search } from 'lucide-react'
import type { Alimento } from '../../data/tipos'
import { buscarAlimentos } from '../../data/alimentos'
import { cn } from '../../utils/cn'

interface Props {
  onSelect: (alimento: Alimento) => void
  onClose: () => void
  titulo?: string
}

const CATEGORIA_LABELS: Record<string, string> = {
  proteina: 'Prot',
  suplemento: 'Supl',
  carboidrato: 'Carb',
  leguminosa: 'Leg',
  farinha: 'Far',
  gordura: 'Gord',
  laticinio: 'Lact',
  vegetal: 'Veg',
  molho: 'Molho',
  bebida: 'Beb',
  snack: 'Snack',
}

export function BuscaAlimentoModal({ onSelect, onClose, titulo = 'Buscar alimento' }: Props) {
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState<Alimento[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setResultados(buscarAlimentos(value))
    }, 200)
  }, [])

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="flex w-full max-w-lg flex-col rounded-t-lg bg-surface max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <h2 className="text-lg font-bold text-ink">{titulo}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded text-ink-3"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 rounded bg-surface-2 px-3 py-2">
            <Search className="h-4 w-4 text-ink-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Ex: frango, arroz, laranja, caqui..."
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {query.length === 0 && (
            <p className="py-4 text-center text-xs text-ink-3">
              Busque alimentos do plano e extras saudaveis, incluindo frutas.
            </p>
          )}

          {query.length > 0 && query.length < 2 && (
            <p className="py-4 text-center text-xs text-ink-3">Digite pelo menos 2 caracteres</p>
          )}

          {query.length >= 2 && resultados.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-3">Nenhum alimento encontrado</p>
          )}

          {resultados.map((alimento) => (
            <button
              key={alimento.id}
              type="button"
              onClick={() => onSelect(alimento)}
              className="flex w-full items-center gap-3 rounded py-3 px-2 text-left transition-colors active:bg-surface-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{alimento.nome}</p>
                <p className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
                  {alimento.kcal} kcal/100g
                  {' | '}
                  P{alimento.p} C{alimento.c} G{alimento.g}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium',
                  alimento.categoria === 'proteina' || alimento.categoria === 'suplemento'
                    ? 'bg-blue-500/20 text-blue-400'
                    : alimento.categoria === 'gordura'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : alimento.categoria === 'vegetal'
                        ? 'bg-green/20 text-green'
                        : 'bg-surface-3 text-ink-3'
                )}
              >
                {CATEGORIA_LABELS[alimento.categoria] || alimento.categoria}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
