import type { TipoDia } from './tipos'

export const DIETA_FOLGA: TipoDia = {
  id: 'folga',
  nome: 'Dia de Folga (Treino)',
  slots: [
    {
      id: 'pre-treino-folga',
      nome: 'Pré-Treino',
      horario: '06:30',
      macrosAlvo: { kcal: 350, p: 18, c: 50, g: 9 },
      opcoes: [
        {
          id: 'pre-folga-panqueca-ovo',
          nome: 'Panqueca de aveia com banana',
          categoria: 'cafe',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
        {
          id: 'pre-folga-pao-ovo-queijo',
          nome: 'Cuscuz com ovos mexidos',
          categoria: 'cafe',
          itens: [
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 113, p: 2.6, c: 23.4, g: 0.5 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
          ],
        },
        {
          id: 'pre-folga-shake-whey-banana',
          nome: 'Shake de whey com banana e aveia',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 200, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
      ],
    },
    {
      id: 'pos-treino-folga',
      nome: 'Pós-Treino',
      horario: '08:30',
      macrosAlvo: { kcal: 300, p: 32, c: 30, g: 5 },
      opcoes: [
        {
          id: 'pos-folga-shake-whey',
          nome: 'Shake de whey com leite e banana',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 250, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'pos-folga-frango-pao',
          nome: 'Pão com frango desfiado',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'frango-desfiado', nome: 'Frango desfiado', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 163, p: 31.4, c: 0, g: 3.7 } },
          ],
        },
        {
          id: 'pos-folga-cuscuz-frango',
          nome: 'Cuscuz com frango desfiado',
          categoria: 'cafe',
          itens: [
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 113, p: 2.6, c: 23.4, g: 0.5 } },
            { id: 'frango-desfiado', nome: 'Frango desfiado', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 163, p: 31.4, c: 0, g: 3.7 } },
          ],
        },
      ],
    },
    {
      id: 'almoco-folga',
      nome: 'Almoço',
      horario: '12:30',
      macrosAlvo: { kcal: 780, p: 55, c: 85, g: 18 },
      opcoes: [
        {
          id: 'almoco-folga-frango',
          nome: 'Arroz, feijão e frango grelhado',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 160, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'frango-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 3.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 10, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'almoco-folga-carne-molida',
          nome: 'Macarrão à bolonhesa com carne moída',
          categoria: 'prato-principal',
          itens: [
            { id: 'macarrao-cozido', nome: 'Macarrão cozido', gramasPlano: 250, unidade: 'g', macrosPor100g: { kcal: 144, p: 5, c: 29.4, g: 0.5 } },
            { id: 'carne-moida-patinho', nome: 'Carne moída patinho', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 212, p: 26.7, c: 0, g: 11.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'almoco-folga-sardinha',
          nome: 'Arroz, feijão e sardinha',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 220, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'sardinha-lata', nome: 'Sardinha em lata', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 165, p: 21.5, c: 2, g: 7.8 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
          ],
        },
      ],
    },
    {
      id: 'lanche-folga',
      nome: 'Lanche da Tarde',
      horario: '16:00',
      macrosAlvo: { kcal: 440, p: 28, c: 55, g: 12 },
      opcoes: [
        {
          id: 'lanche-folga-ovo-pao',
          nome: 'Pão com ovo e banana',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'lanche-folga-atum-pao',
          nome: 'Sanduíche de frango com iogurte',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'frango-desfiado', nome: 'Frango desfiado', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 163, p: 31.4, c: 0, g: 3.7 } },
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 170, unidade: 'g', macrosPor100g: { kcal: 42, p: 4.3, c: 5.6, g: 0.3 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'lanche-folga-iogurte-aveia',
          nome: 'Sanduíche frio reforçado',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'peru-fatiado', nome: 'Peito de peru fatiado', gramasPlano: 40, unidade: 'g', macrosPor100g: { kcal: 105, p: 18, c: 2, g: 2.8 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
      ],
    },
    {
      id: 'jantar-folga',
      nome: 'Jantar',
      horario: '20:00',
      macrosAlvo: { kcal: 560, p: 45, c: 60, g: 15 },
      opcoes: [
        {
          id: 'jantar-folga-frango-arroz',
          nome: 'Jantar clássico com frango',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'frango-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 3.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 10, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'jantar-folga-omelete',
          nome: 'Omelete com frango e batata doce',
          categoria: 'prato-principal',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'frango-desfiado', nome: 'Frango desfiado', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 163, p: 31.4, c: 0, g: 3.7 } },
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 220, unidade: 'g', macrosPor100g: { kcal: 77, p: 0.6, c: 18.4, g: 0.1 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
          ],
        },
        {
          id: 'jantar-folga-carne-moida',
          nome: 'Macarrão com carne moída',
          categoria: 'prato-principal',
          itens: [
            { id: 'macarrao-cozido', nome: 'Macarrão cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 144, p: 5, c: 29.4, g: 0.5 } },
            { id: 'carne-moida-patinho', nome: 'Carne moída patinho', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 212, p: 26.7, c: 0, g: 11.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
          ],
        },
      ],
    },
    {
      id: 'ceia-folga',
      nome: 'Ceia',
      horario: '22:00',
      macrosAlvo: { kcal: 220, p: 15, c: 25, g: 8 },
      opcoes: [
        {
          id: 'ceia-folga-iogurte-aveia',
          nome: 'Iogurte com aveia e amendoim',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 42, p: 4.3, c: 5.6, g: 0.3 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 589, p: 27.2, c: 18.7, g: 45.3 } },
          ],
        },
        {
          id: 'ceia-folga-ovo-banana',
          nome: 'Ovos cozidos com banana',
          categoria: 'lanche',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'ceia-folga-leite-aveia',
          nome: 'Shake pré-sono',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 200, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
      ],
    },
  ],
}
