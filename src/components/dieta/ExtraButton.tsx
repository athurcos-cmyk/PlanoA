import { useState } from 'react'
import { Plus, Search, ScanBarcode } from 'lucide-react'
import type { Alimento, Macros } from '../../data/tipos'
import { adicionarExtra } from '../../db/queries'
import { hoje } from '../../utils/datas'
import { BuscaAlimentoModal } from './BuscaAlimentoModal'
import { BarcodeScanner } from './BarcodeScanner'
import { cn } from '../../utils/cn'

type Mode = 'idle' | 'choice' | 'search' | 'barcode' | 'grams'

export function ExtraButton() {
  const [mode, setMode] = useState<Mode>('idle')
  const [selectedAlimento, setSelectedAlimento] = useState<Alimento | null>(null)
  const [gramas, setGramas] = useState(100)

  function reset() {
    setMode('idle')
    setSelectedAlimento(null)
    setGramas(100)
  }

  function handleAlimentoSelected(alimento: Alimento) {
    setSelectedAlimento(alimento)
    setGramas(100)
    setMode('grams')
  }

  async function handleSave() {
    if (!selectedAlimento) return

    const fator = gramas / 100
    const macros: Macros = {
      kcal: Math.round(selectedAlimento.kcal * fator),
      p: +(selectedAlimento.p * fator).toFixed(1),
      c: +(selectedAlimento.c * fator).toFixed(1),
      g: +(selectedAlimento.g * fator).toFixed(1),
    }

    await adicionarExtra({
      data: hoje(),
      alimentoId: selectedAlimento.id,
      alimentoNome: selectedAlimento.nome,
      gramas,
      macros,
    })

    reset()
  }

  return (
    <>
      {/* FAB */}
      <button
        type="button"
        onClick={() => setMode('choice')}
        className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg active:bg-accent/80"
        aria-label="Adicionar extra"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Choice modal */}
      {mode === 'choice' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={reset}>
          <div
            className="w-full max-w-lg rounded-t-lg bg-surface p-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-center text-lg font-bold text-ink">
              Adicionar extra
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMode('search')}
                className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-surface-2 py-5 text-ink active:bg-surface-3 min-h-[80px]"
              >
                <Search className="h-6 w-6" />
                <span className="text-sm">Buscar por nome</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('barcode')}
                className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-surface-2 py-5 text-ink active:bg-surface-3 min-h-[80px]"
              >
                <ScanBarcode className="h-6 w-6" />
                <span className="text-sm">Escanear codigo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search modal */}
      {mode === 'search' && (
        <BuscaAlimentoModal
          titulo="Adicionar extra"
          onSelect={handleAlimentoSelected}
          onClose={reset}
        />
      )}

      {/* Barcode scanner */}
      {mode === 'barcode' && (
        <BarcodeScanner
          onResult={handleAlimentoSelected}
          onClose={reset}
          onFallbackSearch={() => setMode('search')}
        />
      )}

      {/* Gram stepper */}
      {mode === 'grams' && selectedAlimento && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={reset}>
          <div
            className="w-full max-w-lg rounded-t-lg bg-surface p-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-ink truncate">
              {selectedAlimento.nome}
            </h3>
            <p className="mt-1 text-xs text-ink-3 font-[family-name:var(--font-mono)]">
              {selectedAlimento.kcal} kcal | P{selectedAlimento.p} C{selectedAlimento.c} G{selectedAlimento.g} /100g
            </p>

            {/* Stepper */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setGramas((v) => Math.max(0, v - 10))}
                className="flex h-12 w-14 items-center justify-center rounded bg-surface-3 text-sm font-medium text-ink-2 active:bg-surface-2"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => setGramas((v) => Math.max(0, v - 5))}
                className="flex h-12 w-14 items-center justify-center rounded bg-surface-3 text-sm font-medium text-ink-2 active:bg-surface-2"
              >
                -5
              </button>
              <span className="w-20 text-center text-2xl font-bold font-[family-name:var(--font-mono)] text-ink">
                {gramas}g
              </span>
              <button
                type="button"
                onClick={() => setGramas((v) => v + 5)}
                className="flex h-12 w-14 items-center justify-center rounded bg-surface-3 text-sm font-medium text-ink-2 active:bg-surface-2"
              >
                +5
              </button>
              <button
                type="button"
                onClick={() => setGramas((v) => v + 10)}
                className="flex h-12 w-14 items-center justify-center rounded bg-surface-3 text-sm font-medium text-ink-2 active:bg-surface-2"
              >
                +10
              </button>
            </div>

            {/* Calculated macros */}
            <div className="mt-4 flex justify-center gap-4 text-xs font-[family-name:var(--font-mono)] text-ink-2">
              <span>{Math.round(selectedAlimento.kcal * gramas / 100)} kcal</span>
              <span>P{(selectedAlimento.p * gramas / 100).toFixed(1)}</span>
              <span>C{(selectedAlimento.c * gramas / 100).toFixed(1)}</span>
              <span>G{(selectedAlimento.g * gramas / 100).toFixed(1)}</span>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={gramas === 0}
              className={cn(
                'mt-6 w-full rounded py-3.5 text-center text-sm font-bold min-h-[48px]',
                gramas > 0
                  ? 'bg-accent text-white active:bg-accent/80'
                  : 'bg-surface-3 text-ink-3'
              )}
            >
              ADICIONAR {gramas}g
            </button>
          </div>
        </div>
      )}
    </>
  )
}
