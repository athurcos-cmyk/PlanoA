import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import type {
  ItemOpcao,
  ItemRegistrado,
  OpcaoRefeicao,
  SlotRefeicao,
  Alimento,
  CategoriaAlimento,
} from '../../data/tipos'
import { DIETA_FOLGA } from '../../data/dieta-folga'
import { DIETA_PLANTAO } from '../../data/dieta-plantao'
import { useDiaStore } from '../../stores/useDiaStore'
import { calcularMacrosOpcao } from '../../utils/macros'
import { registrarRefeicao } from '../../db/queries'
import { hoje } from '../../utils/datas'
import { cn } from '../../utils/cn'
import { ItemChecklist } from '../../components/dieta/ItemChecklist'
import { SwapModal } from '../../components/dieta/SwapModal'
import { SwapIngredienteModal } from '../../components/dieta/SwapIngredienteModal'

function findSlotAndOpcao(
  tipoDia: 'folga' | 'plantao',
  slotId: string,
  opcaoId: string
): { slot: SlotRefeicao; opcao: OpcaoRefeicao } | null {
  const dieta = tipoDia === 'folga' ? DIETA_FOLGA : DIETA_PLANTAO
  const slot = dieta.slots.find((s) => s.id === slotId)
  if (!slot) return null
  const opcao = slot.opcoes.find((o) => o.id === opcaoId)
  if (!opcao) return null
  return { slot, opcao }
}

function inferCategoria(item: ItemOpcao): CategoriaAlimento {
  // Infer from item id patterns
  const id = item.id.toLowerCase()
  if (id.includes('frango') || id.includes('patinho') || id.includes('ovo') ||
      id.includes('atum') || id.includes('sardinha') || id.includes('tilapia') ||
      id.includes('salmao') || id.includes('figado') || id.includes('peru') ||
      id.includes('carne') || id.includes('linguica'))
    return 'proteina'
  if (id.includes('whey')) return 'suplemento'
  if (id.includes('azeite') || id.includes('oleo') || id.includes('amendoim') ||
      id.includes('castanha') || id.includes('pasta-amendoim') || id.includes('manteiga'))
    return 'gordura'
  if (id.includes('feijao') || id.includes('lentilha') || id.includes('grao'))
    return 'leguminosa'
  if (id.includes('aveia')) return 'farinha'
  if (id.includes('leite') || id.includes('iogurte') || id.includes('queijo') ||
      id.includes('requeijao') || id.includes('achocolatado'))
    return 'laticinio'
  if (id.includes('salada') || id.includes('brocolis') || id.includes('tomate') ||
      id.includes('cenoura') || id.includes('alface') || id.includes('couve'))
    return 'vegetal'
  return 'carboidrato'
}

export function OpcaoDetalhePage() {
  const { slotId, opcaoId } = useParams<{ slotId: string; opcaoId: string }>()
  const navigate = useNavigate()
  const tipoDia = useDiaStore((s) => s.tipoDia)

  // Allow swap to override the option being viewed
  const [swappedOpcao, setSwappedOpcao] = useState<{
    opcao: OpcaoRefeicao
    fromSlot: string
    fromDieta: string
  } | null>(null)

  const found = useMemo(
    () => findSlotAndOpcao(tipoDia, slotId || '', opcaoId || ''),
    [tipoDia, slotId, opcaoId]
  )

  const slot = found?.slot || null
  const opcao = swappedOpcao?.opcao || found?.opcao || null

  // Initialize registrados from option items
  const [registrados, setRegistrados] = useState<ItemRegistrado[]>(() => {
    if (!opcao) return []
    return opcao.itens.map((item) => ({
      itemId: item.id,
      gramasReais: item.gramasPlano,
    }))
  })

  // Swap modal states
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapIngredienteItem, setSwapIngredienteItem] = useState<ItemOpcao | null>(null)

  // Recalculate when registrados change
  const macrosAtuais = useMemo(() => {
    if (!opcao) return { kcal: 0, p: 0, c: 0, g: 0 }
    return calcularMacrosOpcao(opcao.itens, registrados)
  }, [opcao, registrados])

  const macrosPlano = useMemo(() => {
    if (!opcao) return { kcal: 0, p: 0, c: 0, g: 0 }
    return calcularMacrosOpcao(opcao.itens)
  }, [opcao])

  // Reset registrados when opcao changes via swap
  const handleSwapOpcao = useCallback(
    (novaOpcao: OpcaoRefeicao, fromSlot: string, fromDieta: string) => {
      setSwappedOpcao({ opcao: novaOpcao, fromSlot, fromDieta })
      setRegistrados(
        novaOpcao.itens.map((item) => ({
          itemId: item.id,
          gramasReais: item.gramasPlano,
        }))
      )
      setShowSwapModal(false)
    },
    []
  )

  // Handle ingredient swap result
  const handleSwapIngrediente = useCallback(
    (substituto: Alimento, gramas: number) => {
      if (!swapIngredienteItem) return
      setRegistrados((prev) =>
        prev.map((r) =>
          r.itemId === swapIngredienteItem.id
            ? { ...r, gramasReais: gramas, substitutoId: substituto.id, substitutoNome: substituto.nome }
            : r
        )
      )
      setSwapIngredienteItem(null)
    },
    [swapIngredienteItem]
  )

  async function handleRegistrar() {
    if (!slot || !opcao) return

    await registrarRefeicao({
      data: hoje(),
      slotRefeicaoId: slot.id,
      opcaoId: opcao.id,
      tipoDia,
      itensRegistrados: registrados,
      macrosConsumidos: macrosAtuais,
    })

    navigate('/dieta')
  }

  if (!slot || !opcao) {
    return (
      <div className="p-4">
        <p className="text-ink-2">Opcao nao encontrada</p>
        <button
          type="button"
          onClick={() => navigate('/dieta')}
          className="mt-2 text-sm text-accent"
        >
          Voltar
        </button>
      </div>
    )
  }

  const kcalDiff = macrosAtuais.kcal - macrosPlano.kcal
  const isOverPlan = kcalDiff > 0

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border-soft">
        <button
          type="button"
          onClick={() => navigate('/dieta')}
          className="flex h-11 w-11 items-center justify-center rounded text-ink-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-ink truncate">{opcao.nome}</h1>
          <p className="text-xs text-ink-3">{slot.nome} - {slot.horario}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowSwapModal(true)}
          className="flex h-11 w-11 items-center justify-center rounded text-ink-3 active:text-accent"
          aria-label="Trocar opcao"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Live macros */}
      <div className="bg-surface px-4 py-4 border-b border-border-soft">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold font-[family-name:var(--font-mono)] text-ink">
              {Math.round(macrosAtuais.kcal)}
            </span>
            <span className="ml-1 text-sm text-ink-3">kcal</span>
          </div>
          {kcalDiff !== 0 && (
            <span
              className={cn(
                'text-sm font-[family-name:var(--font-mono)]',
                isOverPlan ? 'text-accent' : 'text-green'
              )}
            >
              {isOverPlan ? '+' : ''}{kcalDiff}
            </span>
          )}
        </div>

        <div className="mt-2 flex gap-6 text-xs">
          <MacroPill label="P" value={macrosAtuais.p} alvo={macrosPlano.p} />
          <MacroPill label="C" value={macrosAtuais.c} alvo={macrosPlano.c} />
          <MacroPill label="G" value={macrosAtuais.g} alvo={macrosPlano.g} />
        </div>
      </div>

      {/* Item checklist */}
      <div className="flex-1 px-4 py-3">
        <ItemChecklist
          itens={opcao.itens}
          registrados={registrados}
          onChange={setRegistrados}
          onTapNome={(item) => setSwapIngredienteItem(item)}
        />
      </div>

      {/* Register button */}
      <div className="sticky bottom-0 border-t border-border-soft bg-surface px-4 py-4">
        <button
          type="button"
          onClick={handleRegistrar}
          className="w-full rounded bg-accent py-3.5 text-center text-sm font-bold text-white min-h-[48px] active:bg-accent/80"
        >
          REGISTRAR
        </button>
      </div>

      {/* Swap option modal */}
      {showSwapModal && slot && (
        <SwapModal
          slotAtual={slot}
          onSelect={handleSwapOpcao}
          onClose={() => setShowSwapModal(false)}
        />
      )}

      {/* Swap ingredient modal */}
      {swapIngredienteItem && (
        <SwapIngredienteModal
          item={swapIngredienteItem}
          categoriaItem={inferCategoria(swapIngredienteItem)}
          onSelect={handleSwapIngrediente}
          onClose={() => setSwapIngredienteItem(null)}
        />
      )}
    </div>
  )
}

function MacroPill({
  label,
  value,
  alvo,
}: {
  label: string
  value: number
  alvo: number
}) {
  const diff = value - alvo
  const isOver = diff > 0
  const isClose = Math.abs(diff) < alvo * 0.05

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-ink-3">{label}</span>
      <span
        className={cn(
          'font-[family-name:var(--font-mono)] font-medium',
          isClose
            ? 'text-ink'
            : isOver
              ? 'text-accent'
              : 'text-green'
        )}
      >
        {value.toFixed(0)}
      </span>
      <span className="text-ink-3 font-[family-name:var(--font-mono)]">/{alvo.toFixed(0)}g</span>
    </div>
  )
}
