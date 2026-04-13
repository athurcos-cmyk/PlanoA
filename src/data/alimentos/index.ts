import type { Alimento, ItemOpcao, Macros } from '../tipos'

export const ALIMENTOS: Alimento[] = [
  // ── PROTEINAS (15) ─────────────────────────────────────────
  { id: 'frango-peito-grelhado', nome: 'Peito de frango grelhado', kcal: 159, p: 32, c: 0, g: 3.2, categoria: 'proteina', unidadeRef: '---' },
  { id: 'frango-coxa-assada', nome: 'Coxa de frango assada', kcal: 215, p: 26, c: 0, g: 12, categoria: 'proteina', unidadeRef: '---' },
  { id: 'patinho-moido', nome: 'Patinho moido refogado', kcal: 170, p: 26, c: 0, g: 7, categoria: 'proteina', unidadeRef: '---' },
  { id: 'patinho-bife', nome: 'Patinho grelhado (bife)', kcal: 187, p: 35.9, c: 0, g: 3.9, categoria: 'proteina', unidadeRef: '---' },
  { id: 'ovo-inteiro', nome: 'Ovo inteiro', kcal: 146, p: 13.3, c: 0.6, g: 9.5, categoria: 'proteina', unidadeRef: '1 ovo = 50g' },
  { id: 'clara-ovo', nome: 'Clara de ovo', kcal: 43, p: 9.3, c: 1.1, g: 0, categoria: 'proteina', unidadeRef: '1 clara = 33g' },
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
  { id: 'arroz-branco', nome: 'Arroz branco cozido', kcal: 128, p: 2.5, c: 28.1, g: 0.2, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'arroz-integral', nome: 'Arroz integral cozido', kcal: 124, p: 2.6, c: 25.8, g: 1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'macarrao-cozido', nome: 'Macarrao cozido', kcal: 144, p: 5, c: 29.4, g: 0.5, categoria: 'carboidrato', unidadeRef: '1 pegador = 110g' },
  { id: 'batata-doce', nome: 'Batata doce cozida', kcal: 77, p: 0.6, c: 18.4, g: 0.1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'batata-inglesa', nome: 'Batata inglesa cozida', kcal: 52, p: 1.2, c: 11.9, g: 0.1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'pao-frances', nome: 'Pao frances', kcal: 300, p: 8, c: 58.6, g: 3.1, categoria: 'carboidrato', unidadeRef: '1 un = 50g' },
  { id: 'pao-integral', nome: 'Pao integral', kcal: 253, p: 9.4, c: 46, g: 3.4, categoria: 'carboidrato', unidadeRef: '1 fatia = 25g' },
  { id: 'aveia-flocos', nome: 'Aveia em flocos', kcal: 394, p: 14, c: 66.6, g: 8.5, categoria: 'farinha', unidadeRef: '---' },
  { id: 'banana', nome: 'Banana', kcal: 92, p: 1.4, c: 23.8, g: 0.1, categoria: 'carboidrato', unidadeRef: '1 un = 100g' },
  { id: 'maca', nome: 'Maca', kcal: 63, p: 0.3, c: 16.6, g: 0, categoria: 'carboidrato', unidadeRef: '1 un = 150g' },
  { id: 'feijao-carioca', nome: 'Feijao carioca cozido', kcal: 76, p: 4.8, c: 13.6, g: 0.5, categoria: 'leguminosa', unidadeRef: '---' },
  { id: 'feijao-preto', nome: 'Feijao preto cozido', kcal: 77, p: 4.5, c: 14, g: 0.5, categoria: 'leguminosa', unidadeRef: '---' },
  { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', kcal: 112, p: 2.6, c: 25.1, g: 0.4, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'tapioca-goma', nome: 'Tapioca (goma hidratada)', kcal: 135, p: 0, c: 33.5, g: 0.1, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'mandioca-cozida', nome: 'Mandioca cozida', kcal: 125, p: 0.6, c: 30.1, g: 0.3, categoria: 'carboidrato', unidadeRef: '---' },
  { id: 'pacoca', nome: 'Pacoca', kcal: 486, p: 13, c: 53, g: 24, categoria: 'snack', unidadeRef: '1 un = 20g' },

  // ── GORDURAS (10) ──────────────────────────────────────────
  { id: 'azeite-oliva', nome: 'Azeite de oliva', kcal: 884, p: 0, c: 0, g: 100, categoria: 'gordura', unidadeRef: '1 cs = 13ml' },
  { id: 'oleo-soja', nome: 'Oleo de soja', kcal: 884, p: 0, c: 0, g: 100, categoria: 'gordura', unidadeRef: '1 cs = 13ml' },
  { id: 'amendoim-torrado', nome: 'Amendoim torrado', kcal: 589, p: 26.2, c: 14.8, g: 46.1, categoria: 'gordura', unidadeRef: '---' },
  { id: 'castanha-caju', nome: 'Castanha de caju', kcal: 570, p: 18.5, c: 29.1, g: 43.8, categoria: 'gordura', unidadeRef: '1 un = 3g' },
  { id: 'castanha-para', nome: 'Castanha do Para', kcal: 643, p: 14.5, c: 15.1, g: 63.5, categoria: 'gordura', unidadeRef: '1 un = 4g' },
  { id: 'pasta-amendoim', nome: 'Pasta de amendoim', kcal: 593, p: 27, c: 18.5, g: 46, categoria: 'gordura', unidadeRef: '1 cs = 15g' },
  { id: 'manteiga', nome: 'Manteiga', kcal: 726, p: 0.4, c: 0, g: 82, categoria: 'gordura', unidadeRef: '1 cs = 12g' },
  { id: 'coco-ralado', nome: 'Coco ralado', kcal: 592, p: 5.7, c: 26.4, g: 55.3, categoria: 'gordura', unidadeRef: '---' },
  { id: 'abacate', nome: 'Abacate', kcal: 96, p: 1.2, c: 6, g: 8.4, categoria: 'gordura', unidadeRef: '---' },
  { id: 'semente-linhaça', nome: 'Semente de linhaca', kcal: 495, p: 14.1, c: 43.3, g: 32.3, categoria: 'gordura', unidadeRef: '---' },

  // ── LATICINIOS (10) ────────────────────────────────────────
  { id: 'leite-desnatado', nome: 'Leite desnatado', kcal: 35, p: 3.4, c: 4.9, g: 0.2, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'leite-integral', nome: 'Leite integral', kcal: 60, p: 3, c: 4.5, g: 3.2, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'leite-po-desnatado', nome: 'Leite em po desnatado', kcal: 355, p: 36, c: 52, g: 0.9, categoria: 'laticinio', unidadeRef: '1 cs = 10g' },
  { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', kcal: 42, p: 4.3, c: 5.6, g: 0.3, categoria: 'laticinio', unidadeRef: '1 pote = 170g' },
  { id: 'iogurte-grego', nome: 'Iogurte grego natural', kcal: 97, p: 5.7, c: 8, g: 5, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'queijo-minas', nome: 'Queijo minas frescal', kcal: 240, p: 17.4, c: 3.2, g: 17.6, categoria: 'laticinio', unidadeRef: '1 fatia = 30g' },
  { id: 'queijo-cottage', nome: 'Queijo cottage', kcal: 98, p: 11.1, c: 3.4, g: 4.3, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'requeijao-light', nome: 'Requeijao light', kcal: 167, p: 10, c: 5.5, g: 11.5, categoria: 'laticinio', unidadeRef: '1 cs = 15g' },
  { id: 'queijo-mucarela', nome: 'Queijo mucarela', kcal: 330, p: 22.6, c: 3, g: 25.2, categoria: 'laticinio', unidadeRef: '1 fatia = 20g' },
  { id: 'achocolatado', nome: 'Achocolatado em po', kcal: 378, p: 3.6, c: 86, g: 2.2, categoria: 'laticinio', unidadeRef: '---' },
  { id: 'creme-ricota', nome: 'Creme de ricota', kcal: 140, p: 12, c: 4, g: 9, categoria: 'laticinio', unidadeRef: '---' },

  // ── VEGETAIS (10) ──────────────────────────────────────────
  { id: 'brocolis-cozido', nome: 'Brocolis cozido', kcal: 25, p: 2.1, c: 4, g: 0.3, categoria: 'vegetal', unidadeRef: '---' },
  { id: 'tomate', nome: 'Tomate', kcal: 15, p: 1.1, c: 3.1, g: 0.1, categoria: 'vegetal', unidadeRef: '1 un = 120g' },
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
  'frango-desfiado': 'frango-peito-grelhado',
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
