import type { Alimento, ItemOpcao, CategoriaAlimento } from '../data/tipos'

export function calcularGramasSubstituto(
  itemOriginal: ItemOpcao,
  substituto: Alimento,
  macroPrincipal: 'p' | 'c' | 'g'
): number {
  const macroOriginal = itemOriginal.macrosPor100g[macroPrincipal]
  const macroSub = substituto[macroPrincipal]
  if (macroSub === 0) return 0
  return Math.round(itemOriginal.gramasPlano * (macroOriginal / macroSub))
}

export function getCategoriaSwap(categoria: CategoriaAlimento): 'p' | 'c' | 'g' {
  switch (categoria) {
    case 'proteina':
    case 'suplemento':
      return 'p'
    case 'carboidrato':
    case 'leguminosa':
    case 'farinha':
    case 'snack':
      return 'c'
    case 'gordura':
      return 'g'
    default:
      return 'c'
  }
}

const MAPA_CATEGORIA_SWAP: Record<string, CategoriaAlimento[]> = {
  proteina: ['proteina'],
  suplemento: ['proteina', 'suplemento'],
  carboidrato: ['carboidrato', 'leguminosa', 'farinha'],
  leguminosa: ['carboidrato', 'leguminosa'],
  farinha: ['carboidrato', 'farinha'],
  snack: ['snack', 'carboidrato'],
  gordura: ['gordura'],
  laticinio: ['laticinio'],
  vegetal: ['vegetal'],
  molho: ['molho'],
  bebida: ['bebida'],
}

export function filtrarPorCategoria(
  alimentos: Alimento[],
  categoria: CategoriaAlimento
): Alimento[] {
  const categoriasCompativeis = MAPA_CATEGORIA_SWAP[categoria] || [categoria]
  return alimentos.filter((a) =>
    categoriasCompativeis.includes(a.categoria)
  )
}
