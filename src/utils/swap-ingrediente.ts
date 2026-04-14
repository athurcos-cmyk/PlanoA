import { getMacrosPor100gDoItem } from '../data/alimentos'
import type { Alimento, ItemOpcao, CategoriaAlimento } from '../data/tipos'

function calcularMacrosItemOriginal(item: ItemOpcao) {
  const fator = item.gramasPlano / 100
  const macrosBase = getMacrosPor100gDoItem(item)
  return {
    kcal: macrosBase.kcal * fator,
    p: macrosBase.p * fator,
    c: macrosBase.c * fator,
    g: macrosBase.g * fator,
  }
}

function calcularMacrosAlimento(alimento: Alimento, gramas: number) {
  const fator = gramas / 100
  return {
    kcal: alimento.kcal * fator,
    p: alimento.p * fator,
    c: alimento.c * fator,
    g: alimento.g * fator,
  }
}

export function calcularScoreSubstituicao(
  itemOriginal: ItemOpcao,
  substituto: Alimento,
  gramas: number,
  macroPrincipal: 'p' | 'c' | 'g'
): number {
  const alvo = calcularMacrosItemOriginal(itemOriginal)
  const atual = calcularMacrosAlimento(substituto, gramas)
  const erroRelativo = (a: number, b: number) => {
    if (a <= 0.01) return Math.abs(b - a) <= 0.01 ? 0 : 1
    return Math.abs(a - b) / a
  }

  const pesos = {
    kcal: 0.2,
    p: macroPrincipal === 'p' ? 0.45 : 0.2,
    c: macroPrincipal === 'c' ? 0.45 : 0.2,
    g: macroPrincipal === 'g' ? 0.45 : 0.2,
  }

  const erro =
    pesos.kcal * erroRelativo(alvo.kcal, atual.kcal) +
    pesos.p * erroRelativo(alvo.p, atual.p) +
    pesos.c * erroRelativo(alvo.c, atual.c) +
    pesos.g * erroRelativo(alvo.g, atual.g)

  return Math.max(0, Math.round((1 - erro) * 100))
}

export function calcularGramasSubstituto(
  itemOriginal: ItemOpcao,
  substituto: Alimento,
  macroPrincipal: 'p' | 'c' | 'g'
): number {
  const macrosBase = getMacrosPor100gDoItem(itemOriginal)
  const macroOriginalTotal = (macrosBase[macroPrincipal] * itemOriginal.gramasPlano) / 100
  const macroSub = substituto[macroPrincipal]

  if (macroSub === 0) return 0

  const estimativaInicial = Math.max(1, Math.round((macroOriginalTotal / macroSub) * 100))
  const minimo = Math.max(1, Math.round(estimativaInicial * 0.4))
  const maximo = Math.min(600, Math.max(80, Math.round(estimativaInicial * 1.8)))

  let melhorGramas = estimativaInicial
  let melhorScore = -1

  for (let gramas = minimo; gramas <= maximo; gramas += 5) {
    const score = calcularScoreSubstituicao(itemOriginal, substituto, gramas, macroPrincipal)
    if (score > melhorScore) {
      melhorScore = score
      melhorGramas = gramas
    }
  }

  return melhorGramas
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

type GrupoSwap =
  | 'proteina-principal'
  | 'ovo'
  | 'suplemento-proteico'
  | 'carbo-amido'
  | 'fruta'
  | 'pao'
  | 'laticinio-liquido'
  | 'queijo-creme'
  | 'gordura'
  | 'vegetal'
  | 'leguminosa'
  | 'snack'
  | 'outro'

function getGrupoSwap(id: string, categoria: CategoriaAlimento): GrupoSwap {
  const normalizado = id.toLowerCase()

  if (categoria === 'proteina') {
    if (normalizado.includes('ovo')) return 'ovo'
    return 'proteina-principal'
  }

  if (categoria === 'suplemento') return 'suplemento-proteico'
  if (categoria === 'gordura') return 'gordura'
  if (categoria === 'vegetal') return 'vegetal'
  if (categoria === 'leguminosa') return 'leguminosa'
  if (categoria === 'snack') return 'snack'

  if (categoria === 'laticinio') {
    if (
      normalizado.includes('queijo') ||
      normalizado.includes('requeijao') ||
      normalizado.includes('ricota') ||
      normalizado.includes('creme')
    ) {
      return 'queijo-creme'
    }
    return 'laticinio-liquido'
  }

  if (categoria === 'carboidrato' || categoria === 'farinha') {
    if (normalizado.includes('banana') || normalizado.includes('maca')) return 'fruta'
    if (normalizado.includes('pao')) return 'pao'
    return 'carbo-amido'
  }

  return 'outro'
}

function isGrupoCompativel(origem: GrupoSwap, destino: GrupoSwap): boolean {
  const mapa: Record<GrupoSwap, GrupoSwap[]> = {
    'proteina-principal': ['proteina-principal', 'ovo'],
    ovo: ['ovo', 'proteina-principal'],
    'suplemento-proteico': ['suplemento-proteico'],
    'carbo-amido': ['carbo-amido', 'pao'],
    fruta: ['fruta'],
    pao: ['pao', 'carbo-amido'],
    'laticinio-liquido': ['laticinio-liquido'],
    'queijo-creme': ['queijo-creme'],
    gordura: ['gordura'],
    vegetal: ['vegetal'],
    leguminosa: ['leguminosa', 'carbo-amido'],
    snack: ['snack'],
    outro: ['outro'],
  }

  return mapa[origem].includes(destino)
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

export function filtrarPorGrupoCompativel(
  itemOriginal: ItemOpcao,
  categoriaOriginal: CategoriaAlimento,
  alimentos: Alimento[]
): Alimento[] {
  const grupoOriginal = getGrupoSwap(itemOriginal.id, categoriaOriginal)

  return alimentos.filter((alimento) => {
    const grupoCandidato = getGrupoSwap(alimento.id, alimento.categoria)
    return isGrupoCompativel(grupoOriginal, grupoCandidato)
  })
}
