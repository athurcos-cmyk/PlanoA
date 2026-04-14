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

export function formatQuantidadeItem(item: ItemOpcao, quantidade: number): string {
  if (item.unidade === 'un' && item.unidadeNome) {
    const medida = getMedidaCaseira(item.id)
    if (medida) {
      const unidades = quantidade / medida.quantidadeBase
      return `${formatNumero(unidades)} ${formatRotulo(item.unidadeNome, unidades)}`
    }
  }

  if (item.unidade === 'ml') return `${quantidade}ml`
  return `${quantidade}g`
}

export function formatQuantidadeAlimento(alimento: Alimento, quantidade: number): string {
  const medida = getMedidaCaseira(alimento.id)

  if (medida) {
    const unidades = quantidade / medida.quantidadeBase
    return `${formatNumero(unidades)} ${formatRotulo(medida.rotulo, unidades)}`
  }

  return `${Math.round(quantidade)}g`
}
