import type { TipoDia } from './tipos'

export const DIETA_PLANTAO: TipoDia = {
  id: 'plantao',
  nome: 'Dia de Plantão',
  slots: [
    {
      id: 'cafe-plantao',
      nome: 'Café da Manhã',
      horario: '05:00',
      macrosAlvo: { kcal: 470, p: 30, c: 60, g: 12 },
      opcoes: [
        {
          id: 'cafe-plantao-ovo-pao',
          nome: 'Pão com ovo e banana',
          categoria: 'cafe',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'cafe-plantao-aveia-whey',
          nome: 'Shake de whey com aveia e banana',
          categoria: 'shake',
          itens: [
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 40, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 250, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'cafe-plantao-cuscuz-queijo',
          nome: 'Cuscuz com ovos mexidos e banana',
          categoria: 'cafe',
          itens: [
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 113, p: 2.6, c: 23.4, g: 0.5 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
      ],
    },
    {
      id: 'lanche-manha-plantao',
      nome: 'Lanche da Manhã',
      horario: '09:30',
      macrosAlvo: { kcal: 360, p: 25, c: 45, g: 10 },
      opcoes: [
        {
          id: 'lanche-manha-plantao-ovo-pao',
          nome: 'Iogurte com aveia, banana e ovos cozidos',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 42, p: 4.3, c: 5.6, g: 0.3 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
          ],
        },
        {
          id: 'lanche-manha-plantao-atum-pao',
          nome: 'Sanduíche frio de peru com ovo e maçã',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'peru-fatiado', nome: 'Peito de peru fatiado', gramasPlano: 60, unidade: 'g', macrosPor100g: { kcal: 105, p: 18, c: 2, g: 2.8 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 50, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'maca', nome: 'Maçã', gramasPlano: 150, unidade: 'un', unidadeNome: 'maçã', macrosPor100g: { kcal: 63, p: 0.3, c: 16.6, g: 0 } },
          ],
        },
        {
          id: 'lanche-manha-plantao-iogurte-aveia',
          nome: 'Shaker com whey, banana e paçoca',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 150, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'pacoca', nome: 'Paçoca', gramasPlano: 20, unidade: 'un', unidadeNome: 'paçoca', macrosPor100g: { kcal: 475, p: 16.1, c: 48.7, g: 25.3 } },
          ],
        },
      ],
    },
    {
      id: 'almoco-plantao',
      nome: 'Almoço',
      horario: '12:30',
      macrosAlvo: { kcal: 680, p: 50, c: 75, g: 15 },
      opcoes: [
        {
          id: 'almoco-plantao-frango',
          nome: 'Arroz, feijão e frango',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 220, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'frango-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 130, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 3.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'almoco-plantao-carne-moida',
          nome: 'Batata doce com patinho e feijão',
          categoria: 'prato-principal',
          itens: [
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 300, unidade: 'g', macrosPor100g: { kcal: 77, p: 0.6, c: 18.4, g: 0.1 } },
            { id: 'carne-moida-patinho', nome: 'Carne moída patinho', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 212, p: 26.7, c: 0, g: 11.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'almoco-plantao-sardinha',
          nome: 'Arroz, feijão, ovo e sardinha',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 80, unidade: 'g', macrosPor100g: { kcal: 76, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'sardinha-lata', nome: 'Sardinha em lata', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 165, p: 21.5, c: 2, g: 7.8 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
          ],
        },
      ],
    },
    {
      id: 'lanche-recuperacao-plantao',
      nome: 'Lanche da Tarde',
      horario: '16:00',
      macrosAlvo: { kcal: 350, p: 25, c: 45, g: 8 },
      opcoes: [
        {
          id: 'recuperacao-plantao-ovo-pao',
          nome: 'Shake com banana e aveia',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 300, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
        {
          id: 'recuperacao-plantao-atum-pao',
          nome: 'Pão com ovo e banana',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        {
          id: 'recuperacao-plantao-iogurte-banana',
          nome: 'Shake, pão e paçoca',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 50, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'pacoca', nome: 'Paçoca', gramasPlano: 15, unidade: 'un', unidadeNome: 'paçoca', macrosPor100g: { kcal: 475, p: 16.1, c: 48.7, g: 25.3 } },
          ],
        },
      ],
    },
    {
      id: 'jantar-plantao',
      nome: 'Jantar Pós-Plantão',
      horario: '21:00',
      macrosAlvo: { kcal: 620, p: 50, c: 70, g: 15 },
      opcoes: [
        {
          id: 'jantar-plantao-frango',
          nome: 'Jantar clássico com frango',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 220, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'frango-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 130, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 3.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        {
          id: 'jantar-plantao-carne-moida',
          nome: 'Omelete com frango e arroz',
          categoria: 'prato-principal',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'frango-desfiado', nome: 'Frango desfiado', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 163, p: 31.4, c: 0, g: 3.7 } },
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 220, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.1, g: 0.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
          ],
        },
        {
          id: 'jantar-plantao-atum-arroz',
          nome: 'Macarrão com carne moída',
          categoria: 'prato-principal',
          itens: [
            { id: 'macarrao-cozido', nome: 'Macarrão cozido', gramasPlano: 220, unidade: 'g', macrosPor100g: { kcal: 144, p: 5, c: 29.4, g: 0.5 } },
            { id: 'carne-moida-patinho', nome: 'Carne moída patinho', gramasPlano: 160, unidade: 'g', macrosPor100g: { kcal: 212, p: 26.7, c: 0, g: 11.2 } },
            { id: 'legumes-cozidos', nome: 'Legumes cozidos (abobrinha, cenoura, chuchu)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 24, p: 0.9, c: 4.8, g: 0.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate, pepino)', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.7, g: 0.1 } },
          ],
        },
      ],
    },
    {
      id: 'ceia-plantao',
      nome: 'Ceia Opcional',
      horario: '23:00',
      macrosAlvo: { kcal: 180, p: 18, c: 12, g: 8 },
      opcoes: [
        {
          id: 'ceia-plantao-ovo-iogurte',
          nome: 'Ovo cozido com iogurte',
          categoria: 'lanche',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 42, p: 4.3, c: 5.6, g: 0.3 } },
          ],
        },
        {
          id: 'ceia-plantao-iogurte-leite-po',
          nome: 'Iogurte com leite em pó e amendoim',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 42, p: 4.3, c: 5.6, g: 0.3 } },
            { id: 'leite-po-desnatado', nome: 'Leite em pó desnatado', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 362, p: 35.5, c: 51.6, g: 0.7 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 10, unidade: 'g', macrosPor100g: { kcal: 589, p: 27.2, c: 18.7, g: 45.3 } },
          ],
        },
        {
          id: 'ceia-plantao-leite-queijo',
          nome: 'Leite desnatado com queijo e aveia',
          categoria: 'lanche',
          itens: [
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 250, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'queijo-mussarela', nome: 'Queijo mussarela', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 330, p: 22.6, c: 1.5, g: 25.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 10, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
      ],
    },
  ],
}
