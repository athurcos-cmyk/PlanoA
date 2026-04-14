import { useEffect, useRef, useState } from 'react'
import { X, Loader2, AlertCircle } from 'lucide-react'
import type { Html5Qrcode } from 'html5-qrcode'
import type { Alimento } from '../../data/tipos'


interface Props {
  onResult: (alimento: Alimento) => void
  onClose: () => void
  onFallbackSearch: () => void
}

interface OpenFoodFactsProduct {
  product_name?: string
  nutriments?: {
    'energy-kcal_100g'?: number
    proteins_100g?: number
    carbohydrates_100g?: number
    fat_100g?: number
  }
}

export function BarcodeScanner({ onResult, onClose, onFallbackSearch }: Props) {
  const scannerRef = useRef<HTMLDivElement>(null)
  const html5QrRef = useRef<Html5Qrcode | null>(null)
  const [status, setStatus] = useState<'scanning' | 'loading' | 'found' | 'not-found' | 'error'>('scanning')
  const [produto, setProduto] = useState<{ nome: string; alimento: Alimento } | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const processedRef = useRef(false)

  useEffect(() => {
    let mounted = true

    async function startScanner() {
      try {
        const { Html5Qrcode } = await import('html5-qrcode')
        if (!mounted || !scannerRef.current) return

        const scannerId = 'barcode-reader'
        scannerRef.current.id = scannerId

        const html5Qr = new Html5Qrcode(scannerId)
        html5QrRef.current = html5Qr

        await html5Qr.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
          },
          async (decodedText) => {
            if (processedRef.current) return
            processedRef.current = true

            try {
              await html5Qr.stop()
            } catch {
              // may already be stopped
            }

            if (mounted) {
              handleBarcode(decodedText)
            }
          },
          () => {
            // ignore scan failures
          }
        )
      } catch {
        if (mounted) {
          setStatus('error')
          setErrorMsg('Nao foi possivel acessar a camera')
        }
      }
    }

    startScanner()

    return () => {
      mounted = false
      if (html5QrRef.current) {
        html5QrRef.current.stop().catch(() => {})
      }
    }
  }, [])

  async function handleBarcode(code: string) {
    setStatus('loading')

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${code}.json`
      )
      const data = await response.json()

      if (data.status === 1 && data.product) {
        const p = data.product as OpenFoodFactsProduct
        const nutriments = p.nutriments || {}

        const alimento: Alimento = {
          id: `off-${code}`,
          nome: p.product_name || `Produto ${code}`,
          kcal: Math.round(nutriments['energy-kcal_100g'] || 0),
          p: +(nutriments.proteins_100g || 0).toFixed(1),
          c: +(nutriments.carbohydrates_100g || 0).toFixed(1),
          g: +(nutriments.fat_100g || 0).toFixed(1),
          categoria: 'snack',
          unidadeRef: `EAN ${code}`,
        }

        setProduto({ nome: alimento.nome, alimento })
        setStatus('found')
      } else {
        setStatus('not-found')
      }
    } catch {
      setStatus('not-found')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface">
        <h2 className="text-lg font-bold text-ink">Escanear codigo</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded text-ink-3"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scanner viewport */}
      {status === 'scanning' && (
        <div className="flex-1 relative">
          <div ref={scannerRef} className="h-full w-full" />
          <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-ink-3">
            Aponte para o codigo de barras
          </p>
        </div>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-ink-3 animate-spin" />
          <p className="text-sm text-ink-3">Buscando produto...</p>
        </div>
      )}

      {/* Found */}
      {status === 'found' && produto && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <div className="w-full rounded-lg bg-surface p-4">
            <p className="text-lg font-bold text-ink">{produto.nome}</p>
            <div className="mt-3 flex gap-4 text-sm font-[family-name:var(--font-mono)]">
              <span className="text-ink-2">
                {produto.alimento.kcal} <span className="text-ink-3 text-xs">kcal</span>
              </span>
              <span className="text-blue-400">
                P{produto.alimento.p}
              </span>
              <span className="text-ink-2">
                C{produto.alimento.c}
              </span>
              <span className="text-yellow-400">
                G{produto.alimento.g}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onResult(produto.alimento)}
            className="w-full rounded bg-accent py-3.5 text-center text-sm font-bold text-white min-h-[48px] active:bg-accent/80"
          >
            USAR ESTE PRODUTO
          </button>
        </div>
      )}

      {/* Not found */}
      {status === 'not-found' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <AlertCircle className="h-12 w-12 text-ink-3" />
          <p className="text-sm text-ink-3 text-center">
            Produto nao encontrado na base Open Food Facts
          </p>
          <button
            type="button"
            onClick={onFallbackSearch}
            className="w-full rounded bg-surface-2 py-3.5 text-center text-sm font-medium text-ink min-h-[48px] active:bg-surface-3"
          >
            Buscar por nome
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-ink-3"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <AlertCircle className="h-12 w-12 text-accent" />
          <p className="text-sm text-ink-3 text-center">{errorMsg}</p>
          <button
            type="button"
            onClick={onFallbackSearch}
            className="w-full rounded bg-surface-2 py-3.5 text-center text-sm font-medium text-ink min-h-[48px] active:bg-surface-3"
          >
            Buscar por nome
          </button>
        </div>
      )}
    </div>
  )
}
