import { useMemo, useState } from 'react'
import { Save, Search, X } from 'lucide-react'
import type { Alimento, ItemOpcao } from '../../data/tipos'
import { ALIMENTOS, buscarAlimentos, isMesmoAlimentoId } from '../../data/alimentos'
import { calcularMacrosItem } from '../../utils/macros'
import { cn } from '../../utils/cn'
import { formatQuantidadeAlimento, formatQuantidadeItem } from '../../utils/quantidade'
import {
  calcularGramasSubstituto,
  calcularScoreSubstituicao,
  filtrarPorCategoria,
  filtrarPorGrupoCompativel,
  getCategoriaSwap,
} from '../../utils/swap-ingrediente'

interface Props {
  item: ItemOpcao
  categoriaItem:
    | 'proteina'
    | 'carboidrato'
    | 'gordura'
    | 'laticinio'
    | 'vegetal'
    | 'molho'
    | 'suplemento'
    | 'bebida'
    | 'leguminosa'
    | 'farinha'
    | 'snack'
  onSelect: (substituto: Alimento, gramas: number) => void
  onSalvarPadrao?: (substituto: Alimento, gramas: number) => void
  onClose: () => void
}

function formatSigned(value: number): string {
  if (value === 0) return '0'
  return value > 0 ? `+${value}` : `${value}`
}

function deltaTone(absDiff: number, close: number, medium: number): string {
  if (absDiff <= close) return 'border-green/30 bg-green/10 text-green'
  if (absDiff <= medium) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300'
  return 'border-accent/30 bg-accent-soft text-accent'
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
  const macrosOriginais = useMemo(
    () => calcularMacrosItem(item, item.gramasPlano),
    [item]
  )

  const compativeis = useMemo(() => {
    const categoriaCompativel = filtrarPorCategoria(ALIMENTOS, categoriaItem)
    const grupoCompativel = filtrarPorGrupoCompativel(item, categoriaItem, categoriaCompativel)
    const comScore = grupoCompativel
      .filter((alimento) => !isMesmoAlimentoId(alimento.id, item.id))
      .map((alimento) => {
        const gramas = calcularGramasSubstituto(item, alimento, macroPrincipal)
        return {
          alimento,
          gramas,
          score: calcularScoreSubstituicao(item, alimento, gramas, macroPrincipal),
        }
      })
      .filter((entry) => entry.score >= 55)
      .sort((a, b) => b.score - a.score)

    if (query.length >= 2) {
      const idsCompativeis = new Set(comScore.map((entry) => entry.alimento.id))
      return buscarAlimentos(query)
        .filter(
          (alimento) =>
            !isMesmoAlimentoId(alimento.id, item.id) && idsCompativeis.has(alimento.id)
        )
        .map((alimento) => comScore.find((entry) => entry.alimento.id === alimento.id)!)
        .filter(Boolean)
    }

    return comScore
  }, [query, categoriaItem, item, macroPrincipal])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-lg bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-ink">Substituir</h2>
            <p className="truncate text-xs text-ink-3">
              {item.nome} ({formatQuantidadeItem(item, item.gramasPlano)})
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

        <div className="px-4 py-3">
          <p className="mb-2 text-[11px] text-ink-3">
            Equivalencia prioriza {macroPrincipal === 'p' ? 'proteina' : macroPrincipal === 'c' ? 'carboidrato' : 'gordura'}.
            Toque no item para trocar agora. Use o disquete para salvar como padrao do slot.
          </p>
          <div className="flex items-center gap-2 rounded bg-surface-2 px-3 py-2">
            <Search className="h-4 w-4 text-ink-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar substituto..."
              className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {compativeis.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-3">Nenhum substituto encontrado</p>
          )}

          {compativeis.map(({ alimento, gramas, score }) => {
            const gramasCalc = gramas
            const macrosSub = {
              kcal: Math.round((alimento.kcal * gramasCalc) / 100),
              p: +((alimento.p * gramasCalc) / 100).toFixed(1),
              c: +((alimento.c * gramasCalc) / 100).toFixed(1),
              g: +((alimento.g * gramasCalc) / 100).toFixed(1),
            }
            const deltaKcal = Math.round(macrosSub.kcal - macrosOriginais.kcal)
            const deltaP = Math.round(macrosSub.p - macrosOriginais.p)
            const deltaC = Math.round(macrosSub.c - macrosOriginais.c)
            const deltaG = Math.round(macrosSub.g - macrosOriginais.g)

            return (
              <div
                key={alimento.id}
                className="flex items-center gap-2 border-b border-border-soft py-3 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => onSelect(alimento, gramasCalc)}
                  className="flex min-h-[44px] flex-1 items-center gap-3 rounded px-1 text-left active:bg-surface-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{alimento.nome}</p>
                    <p className="text-xs text-ink-3 font-[family-name:var(--font-mono)]">
                      P{alimento.p} C{alimento.c} G{alimento.g} / 100g
                    </p>
                    <p className="mt-1 text-[11px] text-ink-3 font-[family-name:var(--font-mono)]">
                      {macrosSub.kcal} kcal / {Math.round(macrosSub.p)}p / {Math.round(macrosSub.c)}c / {Math.round(macrosSub.g)}g
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <span
                        className={cn(
                          'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                          deltaTone(Math.abs(deltaKcal), 20, 50)
                        )}
                      >
                        K {formatSigned(deltaKcal)}
                      </span>
                      <span
                        className={cn(
                          'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                          deltaTone(Math.abs(deltaP), 3, 8)
                        )}
                      >
                        P {formatSigned(deltaP)}
                      </span>
                      <span
                        className={cn(
                          'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                          deltaTone(Math.abs(deltaC), 5, 12)
                        )}
                      >
                        C {formatSigned(deltaC)}
                      </span>
                      <span
                        className={cn(
                          'rounded border px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)]',
                          deltaTone(Math.abs(deltaG), 2, 5)
                        )}
                      >
                        G {formatSigned(deltaG)}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-accent font-[family-name:var(--font-mono)]">
                      {formatQuantidadeAlimento(alimento, gramasCalc)}
                    </p>
                    <p className="text-[10px] text-ink-3">{score}% match</p>
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
