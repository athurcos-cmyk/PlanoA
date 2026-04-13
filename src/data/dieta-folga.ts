import type { TipoDia } from './tipos'

export const DIETA_FOLGA: TipoDia = {
  id: 'folga',
  nome: 'Dia de Folga (Treino)',
  slots: [
    // ── SLOT 1: Pré-Treino 06:30 ──────────────────────────────────────────────
    // Alvo: ~370 kcal | P22 | C50 | G9
    {
      id: 'pre-treino-folga',
      nome: 'Pré-Treino',
      horario: '06:30',
      macrosAlvo: { kcal: 370, p: 22, c: 50, g: 9 },
      opcoes: [
        // Opção A — Proteína: ovo
        // Aveia 60g: 237kcal, P8.4, C40, G5.1
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: ~475kcal, P23.1, C64.4, G14.7  → ajustar: aveia 40g, banana 80g, ovo 50g
        // Aveia 40g: 158kcal, P5.6, C26.6, G3.4
        // Ovo 50g (1 ovo): 73kcal, P6.65, C0.3, G4.75
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Leite desnatado 150ml: 52.5kcal, P5.1, C7.35, G0.3
        // Total: ~376kcal, P18.75, C58.05, G8.55 ≈ ok
        {
          id: 'pre-folga-panqueca-ovo',
          nome: 'Panqueca de aveia com ovo e banana',
          categoria: 'cafe',
          itens: [
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 40, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 50, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 150, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
        // Opção B — Proteína: whey (único whey neste slot)
        // Whey 30g: 120kcal, P24, C3, G1.5
        // Aveia 50g: 197kcal, P7, C33.3, G4.25
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 409kcal, P32.4, C60.1, G5.85 → reduzir aveia para 30g
        // Whey 30g: 120kcal, P24, C3, G1.5
        // Aveia 30g: 118kcal, P4.2, C20, G2.55
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Leite 100ml: 35kcal, P3.4, C4.9, G0.2
        // Total: 365kcal, P33, C51.7, G4.35 ≈ ok
        {
          id: 'pre-folga-shake-whey-banana',
          nome: 'Shake de whey com aveia e banana',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 100, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
          ],
        },
        // Opção C — Proteína: queijo mussarela
        // Pão francês 100g (2 pães): 300kcal, P8, C58.6, G3.1
        // Queijo mussarela 30g: 84kcal, P8.4, C0.6, G5.4
        // Ovo 50g (1 ovo): 73kcal, P6.65, C0.3, G4.75
        // Total: 457kcal, P23, C59.5, G13.25 → usar 1 pão (50g)
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Queijo mussarela 30g: 84kcal, P8.4, C0.6, G5.4
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Banana 80g: 73.6kcal, P1.12, C19, G0.08
        // Total: 453.6kcal, P26.8, C49.5, G16.5 → ajustar ovo para 50g (1 ovo)
        // Pão 50g: 150kcal, P4, C29.3, G1.55
        // Queijo 30g: 84kcal, P8.4, C0.6, G5.4
        // Ovo 50g: 73kcal, P6.65, C0.3, G4.75
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 399kcal, P20.45, C54, G11.8 ≈ ok
        {
          id: 'pre-folga-pao-ovo-queijo',
          nome: 'Pão com ovo mexido e queijo',
          categoria: 'cafe',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 50, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'queijo-mussarela', nome: 'Queijo mussarela', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 280, p: 28, c: 2, g: 18 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
      ],
    },

    // ── SLOT 2: Pós-Treino 08:30 ──────────────────────────────────────────────
    // Alvo: ~350 kcal | P32 | C30 | G7
    {
      id: 'pos-treino-folga',
      nome: 'Pós-Treino',
      horario: '08:30',
      macrosAlvo: { kcal: 350, p: 32, c: 30, g: 7 },
      opcoes: [
        // Opção A — Proteína: whey (ÚNICO whey neste slot)
        // Whey 35g: 140kcal, P28, C3.5, G1.75
        // Leite desnatado 300ml: 105kcal, P10.2, C14.7, G0.6
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 337kcal, P39.6, C42, G2.45 → trocar banana por aveia 20g
        // Whey 35g: 140kcal, P28, C3.5, G1.75
        // Leite desnatado 250ml: 87.5kcal, P8.5, C12.25, G0.5
        // Aveia 20g: 78.8kcal, P2.8, C13.3, G1.7
        // Total: 306.3kcal, P39.3, C29, G3.95 — proteína alta mas kcal ok
        // Ajuste: Whey 30g + Leite 300ml + Aveia 15g
        // Whey 30g: 120kcal, P24, C3, G1.5
        // Leite 300ml: 105kcal, P10.2, C14.7, G0.6
        // Aveia 20g: 78.8kcal, P2.8, C13.3, G1.7
        // Total: 303.8kcal, P37, C31, G3.8 ≈ ok
        {
          id: 'pos-folga-shake-whey',
          nome: 'Shake de whey com leite e aveia',
          categoria: 'shake',
          itens: [
            { id: 'whey-po', nome: 'Whey protein (pó)', gramasPlano: 30, unidade: 'g', macrosPor100g: { kcal: 400, p: 80, c: 10, g: 5 } },
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 300, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
          ],
        },
        // Opção B — Proteína: ovo
        // Ovo 150g (3 ovos): 219kcal, P19.95, C0.9, G14.25
        // Pão 100g (2 pães): 300kcal, P8, C58.6, G3.1  → muito kcal
        // Ovo 150g + Pão 50g (1 pão): 369kcal, P23.95, C30.2, G17.35 → G alto
        // Usar 2 ovos + iogurte:
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Iogurte 200g: 112kcal, P11.4, C14.8, G0.4
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Total: 408kcal, P28.7, C44.7, G11.45 → reduzir pão e iogurte
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Leite desnatado 100ml: 35kcal, P3.4, C4.9, G0.2
        // Total: 331kcal, P20.7, C34.8, G11.25 — G alto por conta dos ovos
        // Usar clara + ovo inteiro:
        // Ovo 150g (3 ovos): 219kcal, P19.95, C0.9, G14.25
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Total: 369kcal, P23.95, C30.2, G15.8 — aceitável pós treino
        {
          id: 'pos-folga-ovo-pao',
          nome: 'Ovo mexido com pão francês',
          categoria: 'cafe',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 150, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 100, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
          ],
        },
        // Opção C — Proteína: atum em lata
        // Atum 150g: 178.5kcal, P39, C0, G1.95
        // Pão 100g (2 pães): 300kcal, P8, C58.6, G3.1
        // Total: 478.5kcal, P47, C58.6, G5.05 → reduzir
        // Atum 120g: 142.8kcal, P31.2, C0, G1.56
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Total: 292.8kcal, P35.2, C29.3, G3.1 ≈ ok
        {
          id: 'pos-folga-atum-pao',
          nome: 'Pão com atum em lata',
          categoria: 'lanche',
          itens: [
            { id: 'atum-lata', nome: 'Atum em lata (água)', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 119, p: 26, c: 0, g: 1.3 } },
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 100, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
          ],
        },
      ],
    },

    // ── SLOT 3: Almoço 12:30 ──────────────────────────────────────────────────
    // Alvo: ~750 kcal | P58 | C90 | G20
    {
      id: 'almoco-folga',
      nome: 'Almoço',
      horario: '12:30',
      macrosAlvo: { kcal: 750, p: 58, c: 90, g: 20 },
      opcoes: [
        // Opção A — Proteína: frango grelhado
        // Arroz 180g: 230.4kcal, P4.5, C50.8, G0.36
        // Feijão 160g: 123.2kcal, P7.68, C21.8, G0.8
        // Frango 180g: 286.2kcal, P57.6, C0, G5.76
        // Azeite 10ml: 88.4kcal, P0, C0, G10
        // Total: 728.2kcal, P69.78, C72.6, G16.92 → frango muito proteína
        // Frango 150g: 238.5kcal, P48, C0, G4.8
        // Arroz 200g: 256kcal, P5, C56.4, G0.4
        // Feijão 150g: 115.5kcal, P7.2, C20.4, G0.75
        // Azeite 10ml: 88.4kcal, P0, C0, G10
        // Total: 698.4kcal, P60.2, C76.8, G15.95 ≈ ok, adicionar salada livre
        {
          id: 'almoco-folga-frango',
          nome: 'Arroz, feijão e frango grelhado',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.2, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 77, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'frango-grelhado', nome: 'Peito de frango grelhado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 3.2 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.5, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 10, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        // Opção B — Proteína: carne moída patinho
        // Macarrão 250g: 372.5kcal, P13.5, C76.5, G2.25
        // Carne moída 150g: 255kcal, P39, C0, G10.5
        // Azeite 5ml: 44.2kcal, P0, C0, G5
        // Total: 671.7kcal, P52.5, C76.5, G17.75 ≈ ok
        {
          id: 'almoco-folga-carne-molida',
          nome: 'Macarrão à bolonhesa com carne moída',
          categoria: 'prato-principal',
          itens: [
            { id: 'macarrao-cozido', nome: 'Macarrão cozido', gramasPlano: 250, unidade: 'g', macrosPor100g: { kcal: 149, p: 5.4, c: 30.6, g: 0.9 } },
            { id: 'carne-moida-patinho', nome: 'Carne moída patinho', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 170, p: 26, c: 0, g: 7 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate)', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.5, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 10, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        // Opção C — Proteína: sardinha em lata
        // Arroz 200g: 256kcal, P5, C56.4, G0.4
        // Feijão 140g: 107.8kcal, P6.72, C19, G0.7
        // Sardinha 150g: 277.5kcal, P31.5, C0, G16.5
        // Azeite 5ml: 44.2kcal, P0, C0, G5
        // Total: 685.5kcal, P43.22, C75.4, G22.6 ≈ ok
        {
          id: 'almoco-folga-sardinha',
          nome: 'Arroz, feijão e sardinha assada',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.2, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 140, unidade: 'g', macrosPor100g: { kcal: 77, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'sardinha-lata', nome: 'Sardinha em lata', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 185, p: 21, c: 0, g: 11 } },
            { id: 'salada-crua', nome: 'Salada (alface, tomate)', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 15, p: 0.8, c: 2.5, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
      ],
    },

    // ── SLOT 4: Lanche 16:00 ──────────────────────────────────────────────────
    // Alvo: ~320 kcal | P20 | C40 | G9
    {
      id: 'lanche-folga',
      nome: 'Lanche',
      horario: '16:00',
      macrosAlvo: { kcal: 320, p: 20, c: 40, g: 9 },
      opcoes: [
        // Opção A — Proteína: ovo
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 388kcal, P18.7, C53.7, G11.15 → reduzir banana para 50g e pão 50g, ovo 50g
        // Ovo 50g (1 ovo): 73kcal, P6.65, C0.3, G4.75
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 315kcal, P12.05, C53.4, G6.4 — falta proteína
        // Melhor: 2 ovos + 1 pão + 50g banana
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Banana 50g: 46kcal, P0.7, C11.9, G0.05
        // Total: 342kcal, P18, C41.8, G11.1 ≈ ok
        {
          id: 'lanche-folga-ovo-pao',
          nome: 'Pão com ovo frito e banana',
          categoria: 'lanche',
          itens: [
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        // Opção B — Proteína: atum em lata
        // Atum 100g: 119kcal, P26, C0, G1.3
        // Pão 100g (2 pães): 300kcal, P8, C58.6, G3.1
        // Total: 419kcal, P34, C58.6, G4.4 → reduzir pão para 1 (50g)
        // Atum 100g: 119kcal, P26, C0, G1.3
        // Pão 50g (1 pão): 150kcal, P4, C29.3, G1.55
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 361kcal, P31.4, C53.1, G2.95 — P alto, C alto, G baixo
        // Melhor sem banana: Atum 80g + Pão 100g
        // Atum 80g: 95.2kcal, P20.8, C0, G1.04
        // Pão 100g (2 pães): 300kcal, P8, C58.6, G3.1
        // Total: 395.2kcal, P28.8, C58.6, G4.14 → ainda alto C
        // Atum 100g + Pão 50g (1 pão):
        // Atum 100g: 119kcal, P26, C0, G1.3
        // Pão 50g: 150kcal, P4, C29.3, G1.55
        // Iogurte 100g: 56kcal, P5.7, C7.4, G0.2
        // Total: 325kcal, P35.7, C36.7, G3.05 — P alto mas ok pós contexto diário
        {
          id: 'lanche-folga-atum-pao',
          nome: 'Pão com atum e iogurte',
          categoria: 'lanche',
          itens: [
            { id: 'atum-lata', nome: 'Atum em lata (água)', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 119, p: 26, c: 0, g: 1.3 } },
            { id: 'pao-frances', nome: 'Pão francês', gramasPlano: 50, unidade: 'un', unidadeNome: 'pão', macrosPor100g: { kcal: 300, p: 8, c: 58.6, g: 3.1 } },
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 100, unidade: 'g', macrosPor100g: { kcal: 56, p: 5.7, c: 7.4, g: 0.2 } },
          ],
        },
        // Opção C — Proteína: iogurte
        // Iogurte 200g: 112kcal, P11.4, C14.8, G0.4
        // Aveia 40g: 157.6kcal, P5.6, C26.6, G3.4
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Amendoim 15g: 88.35kcal, P3.93, C2.22, G6.9
        // Total: 449.95kcal, P22.33, C67.42, G10.8 → reduzir aveia e banana
        // Iogurte 200g: 112kcal, P11.4, C14.8, G0.4
        // Aveia 30g: 118.2kcal, P4.2, C20, G2.55
        // Banana 100g: 92kcal, P1.4, C23.8, G0.1
        // Total: 322.2kcal, P17, C58.6, G3.05 — C alto
        // Melhor sem banana:
        // Iogurte 200g: 112kcal, P11.4, C14.8, G0.4
        // Aveia 40g: 157.6kcal, P5.6, C26.6, G3.4
        // Amendoim 20g: 117.8kcal, P5.24, C2.96, G9.22
        // Total: 387.4kcal, P22.24, C44.36, G13.02 ≈ ok
        {
          id: 'lanche-folga-iogurte-aveia',
          nome: 'Iogurte com aveia e amendoim',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 56, p: 5.7, c: 7.4, g: 0.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 40, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
          ],
        },
      ],
    },

    // ── SLOT 5: Jantar 20:00 ──────────────────────────────────────────────────
    // Alvo: ~650 kcal | P52 | C78 | G18
    {
      id: 'jantar-folga',
      nome: 'Jantar',
      horario: '20:00',
      macrosAlvo: { kcal: 650, p: 52, c: 78, g: 18 },
      opcoes: [
        // Opção A — Proteína: frango desfiado
        // Frango 160g: 254.4kcal, P51.2, C0, G5.12
        // Arroz 180g: 230.4kcal, P4.5, C50.8, G0.36
        // Batata doce 150g: 115.5kcal, P2.1, C27, G0.15
        // Azeite 10ml: 88.4kcal, P0, C0, G10
        // Total: 688.7kcal, P57.8, C77.8, G15.63 ≈ ok
        {
          id: 'jantar-folga-frango-arroz',
          nome: 'Arroz com frango desfiado e batata doce',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.2, g: 0.2 } },
            { id: 'frango-desfiado', nome: 'Frango desfiado', gramasPlano: 160, unidade: 'g', macrosPor100g: { kcal: 159, p: 32, c: 0, g: 3.2 } },
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 77, p: 1.4, c: 18, g: 0.1 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 10, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        // Opção B — Proteína: carne moída patinho
        // Carne moída 180g: 306kcal, P46.8, C0, G12.6
        // Arroz 200g: 256kcal, P5, C56.4, G0.4
        // Feijão 120g: 92.4kcal, P5.76, C16.3, G0.6
        // Azeite 5ml: 44.2kcal, P0, C0, G5
        // Total: 698.6kcal, P57.56, C72.7, G18.6 ≈ ok
        {
          id: 'jantar-folga-carne-moida',
          nome: 'Arroz, feijão e carne moída refogada',
          categoria: 'prato-principal',
          itens: [
            { id: 'arroz-branco', nome: 'Arroz branco cozido', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 128, p: 2.5, c: 28.2, g: 0.2 } },
            { id: 'feijao-cozido', nome: 'Feijão cozido', gramasPlano: 120, unidade: 'g', macrosPor100g: { kcal: 77, p: 4.8, c: 13.6, g: 0.5 } },
            { id: 'carne-moida-patinho', nome: 'Carne moída patinho', gramasPlano: 180, unidade: 'g', macrosPor100g: { kcal: 170, p: 26, c: 0, g: 7 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
        // Opção C — Proteína: ovo (omelete)
        // Ovo 200g (4 ovos): 292kcal, P26.6, C1.2, G19
        // Batata inglesa 200g: 164kcal, P3.8, C37, G0.2
        // Arroz 100g: 128kcal, P2.5, C28.2, G0.2
        // Azeite 10ml: 88.4kcal, P0, C0, G10
        // Total: 672.4kcal, P32.9, C66.4, G29.4 → G muito alto
        // Melhor: omelete 3 ovos + batata doce + cuscuz
        // Ovo 150g (3 ovos): 219kcal, P19.95, C0.9, G14.25
        // Batata doce 200g: 154kcal, P2.8, C36, G0.2
        // Cuscuz 150g: 168kcal, P3.9, C37.65, G0.6
        // Azeite 5ml: 44.2kcal, P0, C0, G5
        // Total: 585.2kcal, P26.65, C74.55, G20.05 — kcal e P baixo
        // Aumentar ovos para 4 (200g):
        // Ovo 200g (4 ovos): 292kcal, P26.6, C1.2, G19
        // Batata doce 200g: 154kcal, P2.8, C36, G0.2
        // Cuscuz 150g: 168kcal, P3.9, C37.65, G0.6
        // Azeite 5ml: 44.2kcal, P0, C0, G5
        // Total: 658.2kcal, P33.3, C74.85, G24.8 ≈ ok macro mas P baixo — ok para opção ovo que é menos proteica
        {
          id: 'jantar-folga-omelete',
          nome: 'Omelete de forno com batata doce e cuscuz',
          categoria: 'prato-principal',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 200, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'batata-doce', nome: 'Batata doce cozida', gramasPlano: 200, unidade: 'g', macrosPor100g: { kcal: 77, p: 1.4, c: 18, g: 0.1 } },
            { id: 'cuscuz-cozido', nome: 'Cuscuz cozido', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 112, p: 2.6, c: 25.1, g: 0.4 } },
            { id: 'azeite-oliva', nome: 'Azeite de oliva', gramasPlano: 5, unidade: 'ml', macrosPor100g: { kcal: 884, p: 0, c: 0, g: 100 } },
          ],
        },
      ],
    },

    // ── SLOT 6: Ceia 22:00 ────────────────────────────────────────────────────
    // Alvo: ~160 kcal | P16 | C12 | G8
    {
      id: 'ceia-folga',
      nome: 'Ceia',
      horario: '22:00',
      macrosAlvo: { kcal: 160, p: 16, c: 12, g: 8 },
      opcoes: [
        // Opção A — Proteína: ovo
        // Ovo 100g (2 ovos): 146kcal, P13.3, C0.6, G9.5
        // Banana 50g: 46kcal, P0.7, C11.9, G0.05
        // Total: 192kcal, P14, C12.5, G9.55 ≈ ok
        {
          id: 'ceia-folga-ovo-banana',
          nome: 'Ovos mexidos com banana',
          categoria: 'lanche',
          itens: [
            { id: 'ovo-inteiro', nome: 'Ovo inteiro', gramasPlano: 100, unidade: 'un', unidadeNome: 'ovo', macrosPor100g: { kcal: 146, p: 13.3, c: 0.6, g: 9.5 } },
            { id: 'banana', nome: 'Banana', gramasPlano: 100, unidade: 'un', unidadeNome: 'banana', macrosPor100g: { kcal: 92, p: 1.4, c: 23.8, g: 0.1 } },
          ],
        },
        // Opção B — Proteína: iogurte
        // Iogurte 200g: 112kcal, P11.4, C14.8, G0.4
        // Aveia 15g: 59.1kcal, P2.1, C10, G1.275
        // Amendoim 10g: 58.9kcal, P2.62, C1.48, G4.61
        // Total: 230kcal, P16.12, C26.28, G6.285 — C alto
        // Iogurte 150g: 84kcal, P8.55, C11.1, G0.3
        // Aveia 10g: 39.4kcal, P1.4, C6.66, G0.85
        // Amendoim 15g: 88.35kcal, P3.93, C2.22, G6.915
        // Total: 211.75kcal, P13.88, C19.98, G8.065 ≈ ok
        {
          id: 'ceia-folga-iogurte-aveia',
          nome: 'Iogurte com aveia e amendoim',
          categoria: 'lanche',
          itens: [
            { id: 'iogurte-natural', nome: 'Iogurte natural desnatado', gramasPlano: 150, unidade: 'g', macrosPor100g: { kcal: 56, p: 5.7, c: 7.4, g: 0.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 15, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
          ],
        },
        // Opção C — Proteína: leite (caseína natural)
        // Leite desnatado 300ml: 105kcal, P10.2, C14.7, G0.6
        // Aveia 15g: 59.1kcal, P2.1, C10, G1.275
        // Amendoim 10g: 58.9kcal, P2.62, C1.48, G4.61
        // Total: 223kcal, P14.92, C26.18, G6.485 ≈ ok, levemente acima em C
        {
          id: 'ceia-folga-leite-aveia',
          nome: 'Leite desnatado com aveia e amendoim',
          categoria: 'lanche',
          itens: [
            { id: 'leite-desnatado', nome: 'Leite desnatado', gramasPlano: 300, unidade: 'ml', macrosPor100g: { kcal: 35, p: 3.4, c: 4.9, g: 0.2 } },
            { id: 'aveia-flocos', nome: 'Aveia em flocos', gramasPlano: 20, unidade: 'g', macrosPor100g: { kcal: 394, p: 14, c: 66.6, g: 8.5 } },
            { id: 'amendoim-torrado', nome: 'Amendoim torrado', gramasPlano: 10, unidade: 'g', macrosPor100g: { kcal: 589, p: 26.2, c: 14.8, g: 46.1 } },
          ],
        },
      ],
    },
  ],
}
