import { getMedidaCaseira } from '../data/alimentos'
import type { Alimento, ItemOpcao } from '../data/tipos'

function formatNumero(valor: number): string {
  return Math.abs(valor - Math.round(valor)) < 0.05
    ? `${Math.round(valor)}`
    : valor.toFixed(1).replace(/\.0$/, '')
}

const PLURAIS_IRREGULARES: Record<string, string> = {
  banana: 'bananas',
  clara: 'claras',
  fatia: 'fatias',
  lata: 'latas',
  maça: 'maçãs',
  maçã: 'maçãs',
  ovo: 'ovos',
  paçoca: 'paçocas',
  pão: 'pães',
  pote: 'potes',
  scoop: 'scoops',
  tomate: 'tomates',
}

function formatRotulo(rotulo: string, quantidade: number): string {
  if (Math.abs(quantidade - 1) < 0.05) return rotulo

  const rotuloNormalizado = rotulo.trim().toLowerCase()
  const plural =
    PLURAIS_IRREGULARES[rotuloNormalizado] ??
    (rotuloNormalizado.endsWith('s') ? rotulo : `${rotulo}s`)

  return plural
}

function formatMedidaCaseira(rotulo: string, quantidadeBase: number, quantidade: number): string {
  const unidades = quantidade / quantidadeBase
  return `${formatNumero(unidades)} ${formatRotulo(rotulo, unidades)}`
}

function formatQuantidadeMetrica(quantidade: number, unidade: 'g' | 'ml'): string {
  return `${formatNumero(quantidade)}${unidade}`
}

export function formatQuantidadeItem(item: ItemOpcao, quantidade: number): string {
  if (item.unidade === 'un' && item.unidadeNome) {
    const medida = getMedidaCaseira(item.id)
    if (medida) {
      return formatMedidaCaseira(item.unidadeNome, medida.quantidadeBase, quantidade)
    }
  }

  if (item.unidade === 'ml') return `${quantidade}ml`
  return `${quantidade}g`
}

export function formatQuantidadeAlimento(alimento: Alimento, quantidade: number): string {
  const medida = getMedidaCaseira(alimento.id)

  if (medida) {
    return formatMedidaCaseira(medida.rotulo, medida.quantidadeBase, quantidade)
  }

  return `${Math.round(quantidade)}g`
}

export function formatQuantidadeMetricaItem(item: ItemOpcao, quantidade: number): string {
  if (item.unidade === 'ml') return formatQuantidadeMetrica(quantidade, 'ml')
  return formatQuantidadeMetrica(quantidade, 'g')
}

export function formatQuantidadeMetricaAlimento(alimento: Alimento, quantidade: number): string {
  const medida = getMedidaCaseira(alimento.id)
  if (medida?.unidade === 'ml') return formatQuantidadeMetrica(quantidade, 'ml')
  return formatQuantidadeMetrica(quantidade, 'g')
}

export function formatQuantidadeContextoItem(item: ItemOpcao, quantidade: number): string | null {
  if (item.unidade === 'un') return null

  const medida = getMedidaCaseira(item.id)
  if (!medida) return null

  return formatMedidaCaseira(medida.rotulo, medida.quantidadeBase, quantidade)
}

export function formatQuantidadeContextoAlimento(alimento: Alimento, quantidade: number): string | null {
  const medida = getMedidaCaseira(alimento.id)
  if (!medida) return null

  return formatMedidaCaseira(medida.rotulo, medida.quantidadeBase, quantidade)
}
