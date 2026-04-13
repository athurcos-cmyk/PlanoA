import { useState, useMemo } from 'react'
import { X, Search, Save } from 'lucide-react'
import type { Alimento, ItemOpcao } from '../../data/tipos'
import { ALIMENTOS, buscarAlimentos } from '../../data/alimentos'
import {
  filtrarPorCategoria,
  getCategoriaSwap,
  calcularGramasSubstituto,
} from '../../utils/swap-ingrediente'

interface Props {
  item: ItemOpcao
  categoriaItem: 'proteina' | 'carboidrato' | 'gordura' | 'laticinio' | 'vegetal' | 'molho' | 'suplemento' | 'bebida' | 'leguminosa' | 'farinha' | 'snack'
  onSelect: (substituto: Alimento, gramas: number) => void
  onSalvarPadrao?: (substituto: Alimento, gramas: number) => void
  onClose: () => void
}

export function SwapIngredienteModal({
  item,
  categoriaItem,
  onSelect,
  onSalvarPadrao,
  onClose,
}: Props) {
  const [query, setQuery] = useState('')
  const macroPrincipal = getCategoriaSwap(categoriaItem)

  const compatíveis = useMemo(() => {
    if (query.length >= 2) {
      const resultados = buscarAlimentos(query)
      return resultados.filter((a) => a.id !== item.id)
    }
    return filtrarPorCategoria(ALIMENTOS, categoriaItem).filter(
      (a) => a.id !== item.id
    )
  }, [query, categoriaItem, item.id])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="flex w-full max-w-lg flex-col rounded-t-lg bg-surface max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-ink truncate">Substituir</h2>
            <p className="text-xs text-ink-3 truncate">
              {item.nome} ({item.gramasPlano}{item.unidade})
            </p>
          </div>
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
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar substituto..."
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {compatíveis.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-3">Nenhum substituto encontrado</p>
          )}

          {compatíveis.map((alimento) => {
            const gramasCalc = calcularGramasSubstituto(item, alimento, macroPrincipal)

            return (
              <div
                key={alimento.id}
                className="flex items-center gap-2 border-b border-border-soft py-3 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => onSelect(alimento, gramasCalc)}
                  className="flex flex-1 items-center gap-3 min-h-[44px] text-left active:bg-surface-2 rounded px-1"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{alimento.nome}</p>
                    <p className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
                      P{alimento.p} C{alimento.c} G{alimento.g} / 100g
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold font-[family-name:var(--font-mono)] text-accent">
                      {gramasCalc}{item.unidade}
                    </p>
                    <p className="text-[10px] text-ink-3">equivalente</p>
                  </div>
                </button>

                {onSalvarPadrao && (
                  <button
                    type="button"
                    onClick={() => onSalvarPadrao(alimento, gramasCalc)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-ink-3 active:text-green"
                    title="Salvar como padrao"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
