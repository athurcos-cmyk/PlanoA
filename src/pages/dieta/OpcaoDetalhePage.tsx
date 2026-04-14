import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import type {
  ItemOpcao,
  ItemRegistrado,
  OpcaoRefeicao,
  SlotRefeicao,
  Alimento,
  SubstituicaoPadrao,
} from '../../data/tipos'
import { getAlimentoPorId, getCategoriaDoItem } from '../../data/alimentos'
import { DIETA_FOLGA } from '../../data/dieta-folga'
import { DIETA_PLANTAO } from '../../data/dieta-plantao'
import { useDiaStore } from '../../stores/useDiaStore'
import { calcularMacrosOpcao } from '../../utils/macros'
import {
  desativarSubstituicao,
  getSubstituicoesAtivas,
  registrarRefeicao,
  salvarSubstituicao,
} from '../../db/queries'
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

function criarRegistradosComSubstituicoes(
  opcaoAtual: OpcaoRefeicao | null,
  substituicoes: SubstituicaoPadrao[]
): ItemRegistrado[] {
  if (!opcaoAtual) return []

  const substituicoesPorItem = new Map(
    substituicoes.map((substituicao) => [substituicao.itemOriginalId, substituicao])
  )

  return opcaoAtual.itens.map((item) => {
    const substituicao = substituicoesPorItem.get(item.id)
    const substituto = substituicao
      ? getAlimentoPorId(substituicao.itemSubstitutoId)
      : undefined

    if (!substituicao || !substituto) {
      return {
        itemId: item.id,
        gramasReais: item.gramasPlano,
      }
    }

    return {
      itemId: item.id,
      gramasReais: substituicao.gramasSubstituto,
      substitutoId: substituto.id,
      substitutoNome: substituto.nome,
    }
  })
}

export function OpcaoDetalhePage() {
  const { slotId, opcaoId } = useParams<{ slotId: string; opcaoId: string }>()
  const navigate = useNavigate()
  const tipoDia = useDiaStore((s) => s.tipoDia)

  const found = useMemo(
    () => findSlotAndOpcao(tipoDia, slotId || '', opcaoId || ''),
    [tipoDia, slotId, opcaoId]
  )

  const slot = found?.slot || null
  const substituicoesAtivasResult = useLiveQuery(
    () =>
      slot
        ? getSubstituicoesAtivas(slot.id)
        : Promise.resolve<SubstituicaoPadrao[]>([]),
    [slot?.id]
  )
  const substituicoesAtivas = useMemo(
    () => substituicoesAtivasResult ?? [],
    [substituicoesAtivasResult]
  )

  if (!slot || !found?.opcao) {
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

  const substituicoesKey = substituicoesAtivas
    .map((substituicao) => `${substituicao.itemOriginalId}:${substituicao.itemSubstitutoId}:${substituicao.gramasSubstituto}`)
    .sort()
    .join('|')
  const pageKey = `${tipoDia}:${slot.id}:${found.opcao.id}:${substituicoesKey}`

  return (
    <OpcaoDetalheContent
      key={pageKey}
      navigate={navigate}
      tipoDia={tipoDia}
      slot={slot}
      opcaoBase={found.opcao}
      substituicoesAtivas={substituicoesAtivas}
    />
  )
}

function OpcaoDetalheContent({
  navigate,
  tipoDia,
  slot,
  opcaoBase,
  substituicoesAtivas,
}: {
  navigate: ReturnType<typeof useNavigate>
  tipoDia: 'folga' | 'plantao'
  slot: SlotRefeicao
  opcaoBase: OpcaoRefeicao
  substituicoesAtivas: SubstituicaoPadrao[]
}) {
  const [swappedOpcao, setSwappedOpcao] = useState<{
    opcao: OpcaoRefeicao
    fromSlot: string
    fromDieta: string
  } | null>(null)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapIngredienteItem, setSwapIngredienteItem] = useState<ItemOpcao | null>(null)

  const opcao = swappedOpcao?.opcao || opcaoBase
  const substituicoesAtivasMap = useMemo(
    () => new Map(substituicoesAtivas.map((substituicao) => [substituicao.itemOriginalId, substituicao])),
    [substituicoesAtivas]
  )
  const itensComPadraoAtivo = useMemo(
    () => new Set(substituicoesAtivas.map((substituicao) => substituicao.itemOriginalId)),
    [substituicoesAtivas]
  )
  const criarRegistrados = useCallback(
    (opcaoAtual: OpcaoRefeicao | null) =>
      criarRegistradosComSubstituicoes(opcaoAtual, substituicoesAtivas),
    [substituicoesAtivas]
  )
  const [registrados, setRegistrados] = useState<ItemRegistrado[]>(() => criarRegistrados(opcaoBase))

  const macrosAtuais = useMemo(
    () => calcularMacrosOpcao(opcao.itens, registrados),
    [opcao, registrados]
  )
  const macrosPlano = useMemo(
    () => calcularMacrosOpcao(opcao.itens),
    [opcao]
  )

  const handleSwapOpcao = useCallback(
    (novaOpcao: OpcaoRefeicao, fromSlot: string, fromDieta: string) => {
      setSwappedOpcao({ opcao: novaOpcao, fromSlot, fromDieta })
      setRegistrados(criarRegistrados(novaOpcao))
      setShowSwapModal(false)
    },
    [criarRegistrados]
  )

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

  const handleSalvarSubstituicaoPadrao = useCallback(
    async (substituto: Alimento, gramas: number) => {
      if (!swapIngredienteItem) return

      await salvarSubstituicao({
        slotRefeicaoId: slot.id,
        itemOriginalId: swapIngredienteItem.id,
        itemSubstitutoId: substituto.id,
        gramasSubstituto: gramas,
        ativa: true,
        criadaEm: hoje(),
      })

      handleSwapIngrediente(substituto, gramas)
    },
    [handleSwapIngrediente, slot.id, swapIngredienteItem]
  )

  const handleRestaurarItemOriginal = useCallback(
    async (item: ItemOpcao) => {
      const substituicaoAtiva = substituicoesAtivasMap.get(item.id)

      if (substituicaoAtiva?.id) {
        await desativarSubstituicao(substituicaoAtiva.id)
      }

      setRegistrados((prev) =>
        prev.map((registrado) =>
          registrado.itemId === item.id
            ? {
                itemId: item.id,
                gramasReais: item.gramasPlano,
                substitutoId: undefined,
                substitutoNome: undefined,
              }
            : registrado
        )
      )
    },
    [substituicoesAtivasMap]
  )

  async function handleRegistrar() {
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

        <p className="mt-2 text-[11px] text-ink-3">
          Gramagem em tela = peso real na balanca. Macros usam base por `100g` do alimento pronto/cozido.
        </p>
      </div>

      {/* Item checklist */}
      <div className="flex-1 px-4 py-3">
        <ItemChecklist
          itens={opcao.itens}
          registrados={registrados}
          itensComPadraoAtivo={itensComPadraoAtivo}
          onChange={setRegistrados}
          onTapNome={(item) => setSwapIngredienteItem(item)}
          onRestoreOriginal={handleRestaurarItemOriginal}
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
          opcaoAtual={opcao}
          dietaAtual={tipoDia}
          onSelect={handleSwapOpcao}
          onClose={() => setShowSwapModal(false)}
        />
      )}

      {/* Swap ingredient modal */}
      {swapIngredienteItem && (
        <SwapIngredienteModal
          item={swapIngredienteItem}
          categoriaItem={getCategoriaDoItem(swapIngredienteItem)}
          onSelect={handleSwapIngrediente}
          onSalvarPadrao={handleSalvarSubstituicaoPadrao}
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
