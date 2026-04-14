import type { Alimento, CategoriaAlimento, ItemOpcao, Macros } from '../tipos'

export const ALIMENTOS: Alimento[] = [
  // ── PROTEINAS (15) ─────────────────────────────────────────
  { id: 'frango-peito-grelhado', nome: 'Peito de frango grelhado', kcal: 159, p: 32, c: 0, g: 2.5, categoria: 'proteina', unidadeRef: '1 file = 150g' },
  { id: 'frango-desfiado', nome: 'Frango desfiado cozido', kcal: 163, p: 31.5, c: 0, g: 3.2, categoria: 'proteina', unidadeRef: '1 concha = 80g' },
  { id: 'frango-coxa-assada', nome: 'Coxa de frango assada', kcal: 215, p: 26, c: 0, g: 12, categoria: 'proteina', unidadeRef: '---' },
  { id: 'patinho-moido', nome: 'Patinho moido refogado', kcal: 212, p: 26.7, c: 0, g: 11.2, categoria: 'proteina', unidadeRef: '1 concha = 80g' },
  { id: 'patinho-bife', nome: 'Patinho grelhado (bife)', kcal: 219, p: 35.9, c: 0, g: 7.3, categoria: 'proteina', unidadeRef: '1 bife = 100g' },
  { id: 'ovo-inteiro', nome: 'Ovo inteiro', kcal: 146, p: 13.3, c: 0.6, g: 9.5, categoria: 'proteina', unidadeRef: '1 ovo = 50g' },
  { id: 'clara-ovo', nome: 'Clara de ovo cozida', kcal: 59, p: 13.4, c: 0, g: 0.1, categoria: 'proteina', unidadeRef: '1 clara = 33g' },
  { id: 'atum-lata', nome: 'Atum em lata (drenado)', kcal: 116, p: 25.5, c: 0, g: 1, categoria: 'proteina', unidadeRef: '1 lata = 120g' },
  { id: 'sardinha-lata', nome: 'Sardinha em lata', kcal: 165, p: 21.5, c: 2, g: 7.8, categoria: 'proteina', unidadeRef: '1 lata = 130g' },
  { id: 'tilapia-grelhada', nome: 'Tilapia grelhada', kcal: 128, p: 26, c: 0, g: 2.7, categoria: 'proteina', unidadeRef: '---' },
  { id: 'salmao-grelhado', nome: 'Salmao grelhado', kcal: 208, p: 27.3, c: 0, g: 10.4, categoria: 'proteina', unidadeRef: '---' },
  { id: 'figado-bovino', nome: 'Figado bovino grelhado', kcal: 225, p: 29.1, c: 4.3, g: 9.5, categoria: 'proteina', unidadeRef: '---' },
  { id: 'peru-fatiado', nome: 'Peito de peru fatiado', kcal: 105, p: 18, c: 2, g: 2.8, categoria: 'proteina', unidadeRef: '1 fatia = 15g' },
  { id: 'linguica-frango', nome: 'Linguica de frango', kcal: 176, p: 16, c: 2, g: 11, categoria: 'proteina', unidadeRef: '---' },
  { id: 'carne-seca', nome: 'Carne seca desfiada', kcal: 230, p: 34, c: 0, g: 10, categoria: 'proteina', unidadeRef: '---' },
  { id: 'whey-po', nome: 'Whey protein (po)', kcal: 400, p: 80, c: 10, g: 5, categoria: 'suplemento', unidadeRef: '1 scoop = 30g' },

  // ── CARBOIDRATOS (15) ──────────────────────────────────────
  { id: 'arroz-branco', nome: 'Arroz branco cozido', kcal: 128, p: 2.5, c: 28.1, g: 0.2, categoria: 'carboidrato', unidadeRef: '1 colher de servir = 45g' },
  { id: 'arroz-integral', nome: 'Arroz integral cozido', kcal: 124, p: 2.6, c: 25.8, g: 1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'macarrao-cozido', nome: 'Macarrao cozido', kcal: 144, p: 5, c: 29.4, g: 0.5, categoria: 'carboidrato', unidadeRef: '1 pegador = 110g' },
  { id: 'batata-doce', nome: 'Batata doce cozida', kcal: 77, p: 0.6, c: 18.4, g: 0.1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'batata-inglesa', nome: 'Batata inglesa cozida', kcal: 52, p: 1.2, c: 11.9, g: 0.1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'pao-frances', nome: 'Pao frances', kcal: 300, p: 8, c: 58.6, g: 3.1, categoria: 'carboidrato', unidadeRef: '1 pão = 50g' },
  { id: 'pao-integral', nome: 'Pao integral', kcal: 253, p: 9.4, c: 46, g: 3.4, categoria: 'carboidrato', unidadeRef: '1 fatia = 25g' },
  { id: 'aveia-flocos', nome: 'Aveia em flocos', kcal: 394, p: 14, c: 66.6, g: 8.5, categoria: 'farinha', unidadeRef: '---' },
  { id: 'banana', nome: 'Banana', kcal: 92, p: 1.4, c: 23.8, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 banana = 100g' },
  { id: 'maca', nome: 'Maca', kcal: 63, p: 0.3, c: 16.6, g: 0, categoria: 'carboidrato', unidadeRef: '1 maçã = 150g' },
  { id: 'laranja', nome: 'Laranja pera', kcal: 37, p: 1, c: 8.9, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 unidade = 180g' },
  { id: 'caqui', nome: 'Caqui', kcal: 72, p: 0.4, c: 19.3, g: 0.2, categoria: 'carboidrato', unidadeRef: '1 unidade = 100g' },
  { id: 'mamao', nome: 'Mamao papaya', kcal: 40, p: 0.5, c: 10.4, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 fatia = 170g' },
  { id: 'manga', nome: 'Manga', kcal: 72, p: 0.4, c: 19.4, g: 0.2, categoria: 'carboidrato', unidadeRef: '1 unidade = 250g' },
  { id: 'melancia', nome: 'Melancia', kcal: 33, p: 0.9, c: 8.1, g: 0, categoria: 'carboidrato', unidadeRef: '1 fatia = 200g' },
  { id: 'abacaxi', nome: 'Abacaxi', kcal: 48, p: 0.9, c: 12.3, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 fatia = 75g' },
  { id: 'tangerina', nome: 'Tangerina', kcal: 38, p: 0.8, c: 9.6, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 unidade = 135g' },
  { id: 'pera', nome: 'Pera', kcal: 53, p: 0.6, c: 14, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 unidade = 170g' },
  { id: 'feijao-carioca', nome: 'Feijao carioca cozido', kcal: 76, p: 4.8, c: 13.6, g: 0.5, categoria: 'leguminosa', unidadeRef: '1 concha = 80g' },
  { id: 'feijao-preto', nome: 'Feijao preto cozido', kcal: 77, p: 4.5, c: 14, g: 0.5, categoria: 'leguminosa', unidadeRef: '1 concha = 80g' },
  { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', kcal: 113, p: 2.6, c: 23.4, g: 0.5, categoria: 'carboidrato', unidadeRef: '1 fatia = 80g' },
  { id: 'tapioca-goma', nome: 'Tapioca (goma hidratada)', kcal: 135, p: 0, c: 33.5, g: 0.1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'mandioca-cozida', nome: 'Mandioca cozida', kcal: 125, p: 0.6, c: 30.1, g: 0.3, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'pacoca', nome: 'Pacoca', kcal: 475, p: 16.1, c: 48.7, g: 25.3, categoria: 'snack', unidadeRef: '1 paçoca = 20g' },

  // ── GORDURAS (10) ──────────────────────────────────────────
  { id: 'azeite-oliva', nome: 'Azeite de oliva', kcal: 884, p: 0, c: 0, g: 100, categoria: 'gordura', unidadeRef: '1 cs = 15ml' },
  { id: 'oleo-soja', nome: 'Oleo de soja', kcal: 884, p: 0, c: 0, g: 100, categoria: 'gordura', unidadeRef: '1 cs = 15ml' },
  { id: 'amendoim-torrado', nome: 'Amendoim torrado', kcal: 589, p: 27.2, c: 18.7, g: 45.3, categoria: 'gordura', unidadeRef: '1 punhado = 30g' },
  { id: 'castanha-caju', nome: 'Castanha de caju', kcal: 570, p: 18.5, c: 29.1, g: 43.8, categoria: 'gordura', unidadeRef: '1 un = 3g' },
  { id: 'castanha-para', nome: 'Castanha do Para', kcal: 643, p: 14.5, c: 15.1, g: 63.5, categoria: 'gordura', unidadeRef: '1 un = 4g' },
  { id: 'pasta-amendoim', nome: 'Pasta de amendoim', kcal: 593, p: 27, c: 18.5, g: 46, categoria: 'gordura', unidadeRef: '1 cs = 20g' },
  { id: 'manteiga', nome: 'Manteiga', kcal: 726, p: 0.4, c: 0, g: 82, categoria: 'gordura', unidadeRef: '1 cs = 12g' },
  { id: 'coco-ralado', nome: 'Coco ralado', kcal: 592, p: 5.7, c: 26.4, g: 55.3, categoria: 'gordura', unidadeRef: '---' },
  { id: 'abacate', nome: 'Abacate', kcal: 96, p: 1.2, c: 6, g: 8.4, categoria: 'gordura', unidadeRef: '---' },
  { id: 'semente-linhaça', nome: 'Semente de linhaca', kcal: 495, p: 14.1, c: 43.3, g: 32.3, categoria: 'gordura', unidadeRef: '---' },

  // ── LATICINIOS (10) ────────────────────────────────────────
  { id: 'leite-desnatado', nome: 'Leite desnatado', kcal: 35, p: 3.4, c: 4.9, g: 0.2, categoria: 'laticinio', unidadeRef: '1 copo = 200ml' },
  { id: 'leite-integral', nome: 'Leite integral', kcal: 60, p: 3, c: 4.5, g: 3.2, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'leite-po-desnatado', nome: 'Leite em po desnatado', kcal: 362, p: 35.5, c: 51.6, g: 0.7, categoria: 'laticinio', unidadeRef: '1 cs = 15g' },
  { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', kcal: 42, p: 4.3, c: 5.6, g: 0.3, categoria: 'laticinio', unidadeRef: '1 pote = 170g' },
  { id: 'iogurte-grego', nome: 'Iogurte grego natural', kcal: 97, p: 5.7, c: 8, g: 5, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'queijo-minas', nome: 'Queijo minas frescal', kcal: 264, p: 17.4, c: 3.2, g: 20.2, categoria: 'laticinio', unidadeRef: '1 fatia = 30g' },
  { id: 'queijo-cottage', nome: 'Queijo cottage', kcal: 98, p: 11.1, c: 3.4, g: 4.3, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'requeijao-light', nome: 'Requeijao light', kcal: 167, p: 10, c: 5.5, g: 11.5, categoria: 'laticinio', unidadeRef: '1 cs = 15g' },
  { id: 'queijo-mucarela', nome: 'Queijo mucarela', kcal: 330, p: 22.6, c: 1.5, g: 25.2, categoria: 'laticinio', unidadeRef: '1 fatia = 20g' },
  { id: 'achocolatado', nome: 'Achocolatado em po', kcal: 382, p: 4, c: 82, g: 3.8, categoria: 'snack', unidadeRef: '1 cs = 15g' },
  { id: 'creme-ricota', nome: 'Creme de ricota', kcal: 140, p: 12, c: 4, g: 9, categoria: 'laticinio', unidadeRef: '---' },

  // ── VEGETAIS (10) ──────────────────────────────────────────
  { id: 'brocolis-cozido', nome: 'Brocolis cozido', kcal: 25, p: 2.1, c: 4, g: 0.3, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'tomate', nome: 'Tomate', kcal: 15, p: 1.1, c: 3.1, g: 0.1, categoria: 'vegetal', unidadeRef: '1 tomate = 120g' },
  { id: 'cenoura-crua', nome: 'Cenoura crua', kcal: 34, p: 1.3, c: 7.7, g: 0.2, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'alface', nome: 'Alface', kcal: 11, p: 1.3, c: 1.7, g: 0.2, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'pepino', nome: 'Pepino', kcal: 10, p: 0.7, c: 2, g: 0.1, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'abobrinha-refogada', nome: 'Abobrinha refogada', kcal: 20, p: 0.7, c: 3.8, g: 0.4, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'chuchu-cozido', nome: 'Chuchu cozido', kcal: 17, p: 0.4, c: 3.8, g: 0.1, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', kcal: 24, p: 0.9, c: 4.8, g: 0.2, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', kcal: 15, p: 0.8, c: 2.7, g: 0.1, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'couve-refogada', nome: 'Couve refogada', kcal: 75, p: 2.9, c: 7.1, g: 4.3, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'espinafre-cozido', nome: 'Espinafre cozido', kcal: 16, p: 2.6, c: 1.5, g: 0.1, categoria: 'vegetal', unidadeRef: '---' },
]

const ALIMENTO_ID_ALIASES: Record<string, string> = {
  'carne-moida-patinho': 'patinho-moido',
  'feijao-cozido': 'feijao-carioca',
  'frango-grelhado': 'frango-peito-grelhado',
  'iogurte-natural': 'iogurte-desnatado',
  'queijo-mussarela': 'queijo-mucarela',
}

export function normalizarAlimentoId(id: string): string {
  return ALIMENTO_ID_ALIASES[id] ?? id
}

export function isMesmoAlimentoId(a: string, b: string): boolean {
  return normalizarAlimentoId(a) === normalizarAlimentoId(b)
}

export function buscarAlimentos(query: string): Alimento[] {
  if (!query || query.length < 2) return []
  const q = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  return ALIMENTOS.filter((a) =>
    a.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(q)
  ).slice(0, 20)
}

export function getAlimentoPorId(id: string): Alimento | undefined {
  const normalizado = normalizarAlimentoId(id)
  return ALIMENTOS.find((a) => a.id === normalizado)
}

function inferirCategoriaFallback(id: string): CategoriaAlimento {
  const normalizado = normalizarAlimentoId(id).toLowerCase()

  if (
    normalizado.includes('frango') ||
    normalizado.includes('patinho') ||
    normalizado.includes('ovo') ||
    normalizado.includes('atum') ||
    normalizado.includes('sardinha') ||
    normalizado.includes('tilapia') ||
    normalizado.includes('salmao') ||
    normalizado.includes('figado') ||
    normalizado.includes('peru') ||
    normalizado.includes('carne') ||
    normalizado.includes('linguica')
  ) {
    return 'proteina'
  }

  if (normalizado.includes('whey')) return 'suplemento'

  if (
    normalizado.includes('azeite') ||
    normalizado.includes('oleo') ||
    normalizado.includes('amendoim') ||
    normalizado.includes('castanha') ||
    normalizado.includes('pasta-amendoim') ||
    normalizado.includes('manteiga') ||
    normalizado.includes('abacate') ||
    normalizado.includes('linhaca')
  ) {
    return 'gordura'
  }

  if (
    normalizado.includes('feijao') ||
    normalizado.includes('lentilha') ||
    normalizado.includes('grao')
  ) {
    return 'leguminosa'
  }

  if (normalizado.includes('aveia')) return 'farinha'

  if (
    normalizado.includes('leite') ||
    normalizado.includes('iogurte') ||
    normalizado.includes('queijo') ||
    normalizado.includes('requeijao') ||
    normalizado.includes('ricota')
  ) {
    return 'laticinio'
  }

  if (normalizado.includes('achocolatado') || normalizado.includes('pacoca')) {
    return 'snack'
  }

  if (
    normalizado.includes('salada') ||
    normalizado.includes('brocolis') ||
    normalizado.includes('tomate') ||
    normalizado.includes('cenoura') ||
    normalizado.includes('alface') ||
    normalizado.includes('couve') ||
    normalizado.includes('abobrinha') ||
    normalizado.includes('pepino') ||
    normalizado.includes('chuchu') ||
    normalizado.includes('espinafre')
  ) {
    return 'vegetal'
  }

  return 'carboidrato'
}

export function getCategoriaAlimentoPorId(id: string): CategoriaAlimento {
  const alimento = getAlimentoPorId(id)
  if (alimento) return alimento.categoria
  return inferirCategoriaFallback(id)
}

export function getCategoriaDoItem(item: Pick<ItemOpcao, 'id'>): CategoriaAlimento {
  return getCategoriaAlimentoPorId(item.id)
}

export function getMedidaCaseira(alimentoId: string): {
  quantidadeBase: number
  unidade: 'g' | 'ml'
  rotulo: string
} | null {
  const alimento = getAlimentoPorId(alimentoId)
  const unidadeRef = alimento?.unidadeRef

  if (!unidadeRef) return null

  const match = unidadeRef.match(/1\s+(.+?)\s*=\s*~?\s*([\d.,]+)\s*(g|ml)/i)
  if (!match) return null

  const [, rotulo, quantidadeTexto, unidade] = match
  const quantidadeBase = Number(quantidadeTexto.replace(',', '.'))
  if (!Number.isFinite(quantidadeBase) || quantidadeBase <= 0) return null

  return {
    quantidadeBase,
    unidade: unidade.toLowerCase() === 'ml' ? 'ml' : 'g',
    rotulo: rotulo.trim(),
  }
}

export function getMacrosPor100gDoItem(item: ItemOpcao): Macros {
  const alimento = getAlimentoPorId(item.id)
  if (!alimento) return item.macrosPor100g

  return {
    kcal: alimento.kcal,
    p: alimento.p,
    c: alimento.c,
    g: alimento.g,
  }
}
