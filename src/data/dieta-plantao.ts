import type { TipoDia } from './tipos'

export const DIETA_PLANTAO: TipoDia = {
  id: 'plantao',
  nome: 'Dia de Plantão',
  slots: [
    // ── SLOT 1: Café 05:00 ───────────────────────────────────
    {
      id: 'cafe-plantao',
      nome: 'Café',
      horario: '05:00',
      macrosAlvo: { kcal: 440, p: 23, c: 55, g: 16 },
      opcoes: [
        {
          id: 'cafe-plantao-1',
          nome: 'Pão com ovo e café',
          categoria: 'cafe',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 75, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 80, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'cafe-plantao-2',
          nome: 'Cuscuz com ovo e queijo',
          categoria: 'cafe',
          itens: [
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 112, p: 2.6, c: 25.1, g: 0.4 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 80, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'cafe-plantao-3',
          nome: 'Aveia com whey e amendoim',
          categoria: 'cafe',
          itens: [
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 50, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 200, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
          ],
        },
      ],
    },

    // ── SLOT 2: Lanche Manhã 09:30 ───────────────────────────
    {
      id: 'lanche-manha-plantao',
      nome: 'Lanche Manhã',
      horario: '09:30',
      macrosAlvo: { kcal: 350, p: 25, c: 45, g: 8 },
      opcoes: [
        {
          id: 'lanche-manha-plantao-1',
          nome: 'Sanduíche de frango',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'frango-peito-grelhado', nome: 'Peito de frango desfiado', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 2.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'lanche-manha-plantao-2',
          nome: 'Shake whey com banana',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 120, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 200, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
        {
          id: 'lanche-manha-plantao-3',
          nome: 'Pão com peru e iogurte',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'peru-fatiado', nome: 'Peito de peru fatiado', gramasPlano: 60, unidade: 'g', macrosPor100g: { kcal: 110, p: 18, c: 2, g: 3 } },
            { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', gramasPlano: 170, unidade: 'g', macrosPor100g: { kcal: 42, p: 4, c: 5.4, g: 0.3 } },
          ],
        },
      ],
    },

    // ── SLOT 3: Almoço 12:30 ─────────────────────────────────
    {
      id: 'almoco-plantao',
      nome: 'Almoço',
      horario: '12:30',
      macrosAlvo: { kcal: 780, p: 55, c: 85, g: 18 },
      opcoes: [
        {
          id: 'almoco-plantao-1',
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
          id: 'almoco-plantao-2',
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
          id: 'almoco-plantao-3',
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

    // ── SLOT 4: Lanche Tarde 16:00 ───────────────────────────
    {
      id: 'lanche-tarde-plantao',
      nome: 'Lanche Tarde',
      horario: '16:00',
      macrosAlvo: { kcal: 350, p: 25, c: 45, g: 8 },
      opcoes: [
        {
          id: 'lanche-tarde-plantao-1',
          nome: 'Pão com ovo',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'lanche-tarde-plantao-2',
          nome: 'Iogurte com aveia e banana',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 42, p: 4, c: 5.4, g: 0.3 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 40, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
          ],
        },
        {
          id: 'lanche-tarde-plantao-3',
          nome: 'Cuscuz com ovo',
          categoria: 'lanche',
          itens: [
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 130, unidade: 'g', macrosPor100g: { kcal: 112, p: 2.6, c: 25.1, g: 0.4 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
          ],
        },
      ],
    },

    // ── SLOT 5: Lanche Recuperação 19:00 ─────────────────────
    {
      id: 'lanche-recuperacao-plantao',
      nome: 'Lanche Recuperação',
      horario: '19:00',
      macrosAlvo: { kcal: 300, p: 20, c: 35, g: 10 },
      opcoes: [
        {
          id: 'recuperacao-plantao-1',
          nome: 'Shake whey com aveia',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 250, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 10, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
          ],
        },
        {
          id: 'recuperacao-plantao-2',
          nome: 'Pão com peru e banana',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'peru-fatiado', nome: 'Peito de peru fatiado', gramasPlano: 60, unidade: 'g', macrosPor100g: { kcal: 110, p: 18, c: 2, g: 3 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 80, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'recuperacao-plantao-3',
          nome: 'Iogurte com amendoim e banana',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 42, p: 4, c: 5.4, g: 0.3 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
      ],
    },

    // ── SLOT 6: Jantar 21:00 ─────────────────────────────────
    {
      id: 'jantar-plantao',
      nome: 'Jantar',
      horario: '21:00',
      macrosAlvo: { kcal: 560, p: 45, c: 60, g: 15 },
      opcoes: [
        {
          id: 'jantar-plantao-1',
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
          id: 'jantar-plantao-2',
          nome: 'Omelete com batata doce',
          categoria: 'prato-principal',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 250, unidade: 'g', macrosPor100g: { kcal: 77, p: 0.6, c: 18.4, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'jantar-plantao-3',
          nome: 'Fígado acebolado com arroz',
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
  ],
}
