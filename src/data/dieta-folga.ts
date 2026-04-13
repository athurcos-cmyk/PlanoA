import type { TipoDia } from './tipos'

export const DIETA_FOLGA: TipoDia = {
  id: 'folga',
  nome: 'Dia de Folga (Treino)',
  slots: [
    // ── SLOT 1: Pré-Treino 06:30 ─────────────────────────────
    {
      id: 'pre-treino-folga',
      nome: 'Pré-Treino',
      horario: '06:30',
      macrosAlvo: { kcal: 350, p: 18, c: 50, g: 9 },
      opcoes: [
        {
          id: 'pre-folga-1',
          nome: 'Panqueca de aveia',
          categoria: 'cafe',
          itens: [
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 40, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 50, unidade: 'g', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 50, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
        {
          id: 'pre-folga-2',
          nome: 'Cuscuz com ovo',
          categoria: 'cafe',
          itens: [
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 112, p: 2.6, c: 25.1, g: 0.4 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
          ],
        },
        {
          id: 'pre-folga-3',
          nome: 'Shake whey + banana',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 200, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
      ],
    },

    // ── SLOT 2: Pós-Treino 08:30 ─────────────────────────────
    {
      id: 'pos-treino-folga',
      nome: 'Pós-Treino',
      horario: '08:30',
      macrosAlvo: { kcal: 300, p: 32, c: 30, g: 5 },
      opcoes: [
        {
          id: 'pos-folga-1',
          nome: 'Shake whey com leite',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 300, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'pos-folga-2',
          nome: 'Ovo com pão',
          categoria: 'lanche',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'g', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
          ],
        },
        {
          id: 'pos-folga-3',
          nome: 'Shake whey com achocolatado',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'achocolatado', nome: 'Achocolatado em pó', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 378, p: 3.6, c: 86, g: 2.2 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 300, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
      ],
    },

    // ── SLOT 3: Almoço 12:30 ─────────────────────────────────
    {
      id: 'almoco-folga',
      nome: 'Almoço',
      horario: '12:30',
      macrosAlvo: { kcal: 780, p: 55, c: 85, g: 18 },
      opcoes: [
        {
          id: 'almoco-folga-1',
          nome: 'Arroz, feijão e frango',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'feijao-carioca', nome: 'Feijão carioca cozido', gramasPlano: 160, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'frango-peito-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 2.5 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 15, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'almoco-folga-2',
          nome: 'Macarrão à bolonhesa',
          categoria: 'prato-principal',
          itens: [
            { id: 'macarrao-cozido', nome: 'Macarrão cozido', gramasPlano: 250, unidade: 'g', macrosPor100g: { kcal: 102, p: 3.4, c: 19.9, g: 1.2 } },
            { id: 'patinho-moido', nome: 'Patinho moído refogado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 219, p: 26.4, c: 0, g: 12.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'almoco-folga-3',
          nome: 'Arroz com sardinha',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'feijao-carioca', nome: 'Feijão carioca cozido', gramasPlano: 140, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'sardinha-lata', nome: 'Sardinha em lata', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 152, p: 22, c: 0, g: 7 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
      ],
    },

    // ── SLOT 4: Lanche 16:00 ─────────────────────────────────
    {
      id: 'lanche-folga',
      nome: 'Lanche',
      horario: '16:00',
      macrosAlvo: { kcal: 440, p: 28, c: 55, g: 12 },
      opcoes: [
        {
          id: 'lanche-folga-1',
          nome: 'Pão com ovo e banana',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'g', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'lanche-folga-2',
          nome: 'Sanduíche de frango com iogurte',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 75, unidade: 'g', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'frango-peito-grelhado', nome: 'Peito de frango desfiado', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 2.5 } },
            { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 42, p: 4, c: 5.4, g: 0.3 } },
          ],
        },
        {
          id: 'lanche-folga-3',
          nome: 'Sanduíche frio',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 75, unidade: 'g', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'peru-fatiado', nome: 'Peito de peru fatiado', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 110, p: 18, c: 2, g: 3 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
      ],
    },

    // ── SLOT 5: Jantar 20:00 ─────────────────────────────────
    {
      id: 'jantar-folga',
      nome: 'Jantar',
      horario: '20:00',
      macrosAlvo: { kcal: 560, p: 45, c: 60, g: 15 },
      opcoes: [
        {
          id: 'jantar-folga-1',
          nome: 'Arroz com frango e legumes',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'frango-peito-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 2.5 } },
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 77, p: 0.6, c: 18.4, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 10, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'jantar-folga-2',
          nome: 'Omelete com batata doce',
          categoria: 'prato-principal',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 250, unidade: 'g', macrosPor100g: { kcal: 77, p: 0.6, c: 18.4, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'jantar-folga-3',
          nome: 'Fígado acebolado',
          categoria: 'prato-principal',
          itens: [
            { id: 'figado-bovino', nome: 'Fígado bovino grelhado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 225, p: 29.1, c: 4.3, g: 9.5 } },
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
      ],
    },

    // ── SLOT 6: Ceia 22:00 ───────────────────────────────────
    {
      id: 'ceia-folga',
      nome: 'Ceia',
      horario: '22:00',
      macrosAlvo: { kcal: 220, p: 15, c: 25, g: 8 },
      opcoes: [
        {
          id: 'ceia-folga-1',
          nome: 'Iogurte com aveia e amendoim',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', gramasPlano: 170, unidade: 'g', macrosPor100g: { kcal: 42, p: 4, c: 5.4, g: 0.3 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 10, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
          ],
        },
        {
          id: 'ceia-folga-2',
          nome: 'Ovo com banana',
          categoria: 'lanche',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 50, unidade: 'g', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'ceia-folga-3',
          nome: 'Shake whey pré-sono',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 200, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
      ],
    },
  ],
}
