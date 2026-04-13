# Plano A — Design System

Fonte de verdade visual do app. Toda decisão de cor, tipografia, espaçamento, componente e estado vive aqui. Quando codar uma tela e tiver dúvida, consulta este arquivo. Quando atualizar algo visual, edita aqui PRIMEIRO e depois propaga pro código.

---

## 1. Filosofia visual — Brutalist Atlético

### O contexto
Arthur passa metade da vida no Hospital das Clínicas: paredes brancas, luz fluorescente, scrubs azuis, displays clínicos. O Plano A não pode parecer **mais um sistema clínico**. Tem que ter personalidade firme, sem ser brincadeira nem decoração.

### A direção
Bordas grossas, tipografia pesada, ausência deliberada de sombras suaves, espaço respirável, paleta restrita. Inspirações: Whoop (densidade de dado sem fofice), Strong app (foco em ação), Bauhaus (forma serve função), brutalismo web (honestidade material).

### O que esse app **não** é
- Não é Notion (calmo demais)
- Não é MyFitnessPal (skittles colorido)
- Não é Apple Fitness (premium glossy)
- Não é dashboard SaaS (card grid AI slop)
- Não é gamificado (sem badges, sem streaks decorativas)

### Os princípios
1. **Subtração default.** Se um pixel não serve a uma decisão do Arthur, é cortado.
2. **Uma cor de acento só.** Vermelho-tijolo. Acabou.
3. **Borda > sombra.** Profundidade vem de borda firme (off-white sobre near-black), não de drop shadow fofo.
4. **Mono pra número, sans pra texto.** Dígito monospace alinha visual sem esforço cognitivo.
5. **Toque grande, sempre.** 48px é o piso. CTA principal é 56-72px.
6. **Status muda de fundo, não de cor.** Refeição feita = card mais escuro. Não verde, não confete.
7. **Reduzir fricção do default.** Se o Arthur acerta a opção 1 todo dia, o app deve permitir registrar em **um toque**.

---

## 2. Cor — Brutalist Atlético **Noturno**

> **Nota de versão (v2):** paleta original era off-white (`#FAFAF7`) com tinta preta. Em teste real ficou cegante, "clarão" no plantão noturno e na cama. Trocada por dark warm: near-black quente como base, off-white como tinta. Mesma filosofia brutalista (borda, sem sombra, tipo grande, mono pra número), só que noturna. Alvo: sobreviver fluorescente do hospital E uso na cama 3h da manhã sem queimar retina.

### CSS variables
```css
:root {
  /* SURFACE — near-black warm, não preto puro (1-2% verde-amarelo pra não parecer azulado/clínico) */
  --bg:        #0E0E0C;  /* fundo principal */
  --surface:   #171714;  /* cards, modais */
  --surface-2: #1F1F1B;  /* card secundário (refeição feita) */
  --surface-3: #2A2A25;  /* divisores sólidos, pílulas */

  /* TEXTO — warm off-white, NUNCA branco puro (#FFFFFF queima no escuro) */
  --ink:   #F2F2EC;  /* texto principal */
  --ink-2: #A8A89F;  /* texto secundário */
  --ink-3: #6B6B62;  /* captions — só ≥16px */

  /* BORDER */
  --border:      #F2F2EC;  /* borda principal, 1.5px solid */
  --border-soft: #2A2A25;  /* divisores internos sutis */

  /* ESTADOS DE PROGRESSO */
  --done:    #F2F2EC;     /* feito = preenchimento off-white sólido */
  --pending: transparent; /* pendente = só borda */
  --warn:    #F59E0B;     /* amber — acima do alvo de macro */
  --over:    #EF4444;     /* vermelho — muito acima */

  /* ACENTO ÚNICO — vermelho um pouco mais brilhante que o original (#DC2626 → #EF4444) pra não morrer no dark */
  --accent:        #EF4444;  /* vermelho-tijolo brilhante */
  --accent-soft:   #2A0F0F;  /* fundo do banner "agora" — vermelho near-black */
  --accent-darker: #DC2626;  /* hover/pressed do CTA */
}
```

### Onde usar `--accent` (parcimônia obrigatória)
- CTA primário do bloco "Agora" no Dashboard
- Botão "REGISTRAR SÉRIE" do Treino
- Cor do timer de descanso quando entra na zona vermelha (<10s)
- Borda do bloco "Agora" no Dashboard (1 elemento por tela)
- Borda do "próximo treino" sugerido na tela de Treinos (1 card)

**Onde NUNCA usar `--accent`:**
- Macros (proteína/carbo/gordura) — usam off-white sólido
- Status de feito (✓) — off-white
- Links secundários — off-white sublinhado
- Banners decorativos — não existem

### Contraste WCAG (recalculado para a paleta noturna)
| Combinação | Razão | Nível |
|---|---|---|
| `--ink` (#F2F2EC) sobre `--bg` (#0E0E0C) | 17.8:1 | AAA |
| `--ink-2` (#A8A89F) sobre `--bg` | 8.4:1 | AAA |
| `--ink-3` (#6B6B62) sobre `--bg` | 4.6:1 | AA (≥16px) |
| `--accent` (#EF4444) sobre `--bg` | 5.3:1 | AA texto grande |
| `white` sobre `--accent` | 4.0:1 | AA texto grande |

**Regra:** `--ink-3` proibido em texto menor que 16px.

### Modo claro
**MVP usa só noturno.** Não vale a pena dois temas pra uso pessoal. Se ambiente algum dia exigir, é trocar 9 variáveis CSS, sem refactor de componente. Plug-and-play.

---

## 3. Tipografia

### Famílias
```css
:root {
  --font-sans: "Inter Variable", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono Variable", "Menlo", "Consolas", monospace;
}
```

Ambas gratuitas, self-host via `@fontfaces` ou Google Fonts. Carregar só os pesos usados (400, 500, 700, 900) pra não pesar PWA.

### Escala (7 tamanhos, sem variação livre)
```css
:root {
  --text-xs:   12px;  /* captions, labels secundários, "última: 12kg" */
  --text-sm:   14px;  /* labels de form, hint text */
  --text-base: 16px;  /* body, descrição de itens — mínimo iOS pra evitar zoom */
  --text-lg:   20px;  /* nome de refeição, título de card */
  --text-xl:   28px;  /* H2, "Almoço", nome de tela */
  --text-2xl:  40px;  /* números grandes — kcal do dia, peso */
  --text-3xl:  64px;  /* timer de descanso, display gigante */
}
```

### Pesos
```css
--font-regular: 400;  /* body */
--font-medium:  500;  /* labels, secundário */
--font-bold:    700;  /* títulos, ênfase */
--font-black:   900;  /* só "Plano A" e display de números 40px+ */
```

### Line-height
```css
--leading-tight: 1.1;   /* headers, números grandes */
--leading-snug:  1.25;  /* títulos de card */
--leading-base:  1.45;  /* body, descrição */
```

### Regras de uso
- **Toda quantidade numérica usa `--font-mono`**: kcal, gramas, kg, reps, %, tempo
- **Todo texto descritivo usa `--font-sans`**: nome de comida, descrição, label
- **Tracking/letter-spacing**: `0` em texto base, `-0.02em` em headers grandes (28px+), `+0.05em` em LABELS UPPERCASE pequenos
- **Uppercase**: só em labels semânticos curtos ("HOJE", "AGORA", "SÉRIE 2"), nunca em parágrafo

### Exemplo aplicado
```
HOJE                                    ← text-sm, uppercase, font-bold, ink-2
1840 / 2600                              ← text-2xl, mono, font-black, ink
kcal                                     ← text-xs, ink-3
```

---

## 4. Espaçamento

### Escala 4px (escolha entre estes 8 valores, nada fora disso)
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}
```

### Padding padrão
- **Card**: `var(--space-4) var(--space-5)` = 16px vertical, 24px horizontal
- **Card compacto** (item de lista): `var(--space-3) var(--space-4)` = 12px / 16px
- **Modal**: `var(--space-5) var(--space-5)` = 24px todos os lados
- **Tela (page padding lateral)**: `var(--space-4)` = 16px nas bordas da viewport
- **CTA primário**: `var(--space-4) var(--space-6)` = 16/32

### Gap entre elementos
- Lista de cards verticais: `var(--space-3)` = 12px
- Lista de seções: `var(--space-6)` = 32px
- Inline (botão+ícone): `var(--space-2)` = 8px
- Macros lado a lado: `var(--space-5)` = 24px

### Page rhythm
```
[16px lateral][CONTENT][16px lateral]   ← page padding fixo
   ↕ 32px entre seções
   ↕ 12px entre cards de mesma seção
```

---

## 5. Toque e ergonomia

### Tamanhos mínimos
| Tipo | Mínimo | Recomendado |
|---|---|---|
| Botão clicável (qualquer) | 48×48 | 56×56 |
| CTA primário (full-width) | 56 altura | 64 altura |
| CTA gigante (registrar série/peso) | 64 altura | 72 altura |
| Ícone clicável | 44×44 área | 48×48 área (com padding) |
| Stepper +/− | 56×56 | 64×64 |
| Linha de item (checklist) | 48px altura mínima | linha inteira |

### Espaço entre alvos
**Mínimo 8px** entre dois alvos clicáveis. Polegar suado erra.

### Ergonomia do polegar (uma mão)
1. **CTA principal sempre na metade inferior da tela.** Polegar não chega em CTA do topo numa mão.
2. **BottomNav fixa na base.** 56px de altura. Sempre acessível.
3. **Botão "voltar" (←) tem área de toque 48×48** mas posicionado com padding gordo no topo-esquerdo (compromisso aceitável — back button é uso ocasional, não fluxo principal).
4. **Modais abrem de baixo pra cima** (sheet style), fecham com swipe-down ou botão X grande no topo.
5. **Nada de hover state**. Mobile não tem hover. Use `:active` pra feedback de toque.

---

## 6. Borda, raio, sombra

### Bordas
- **Padrão**: `1.5px solid var(--border)` — off-white firme sobre dark
- **Card destacado** (bloco "Agora"): `2px solid var(--accent)`
- **Divisor interno**: `1px solid var(--border-soft)`
- **Input/stepper**: `1.5px solid var(--border)`, vira `2px solid var(--accent)` quando focado/ativo

### Raio (border-radius)
```css
--radius-none: 0px;     /* tags, badges quadrados */
--radius-sm:   4px;     /* botões pequenos, chips */
--radius-md:   8px;     /* PADRÃO — cards, botões, modais */
--radius-lg:   12px;    /* MÁXIMO permitido */
```

**Proibido** raio acima de 12px. Bubble-radius gigante = AI slop SaaS.

### Sombras
**Proibido** `box-shadow` de elevação. Profundidade vem de borda preta.

**Única exceção**: backdrop de modal usa `backdrop-filter: blur(8px)` + `background-color: rgba(10, 10, 10, 0.4)`.

---

## 7. Iconografia

### Biblioteca
**Lucide React** (`lucide-react` no package.json). Já tá no plano.

### Regras
- `stroke-width: 2` (padrão)
- Tamanhos permitidos: 16px, 20px, 24px, 32px (nada além)
- Cor: sempre `currentColor` (herda do texto pai)
- **Sem ícone em círculo colorido.** Padrão SaaS slop banido.
- **Sem ícone decorativo.** Todo ícone serve a uma ação ou rótulo semântico.

### Ícones aprovados (mínimo viável)
| Uso | Ícone Lucide |
|---|---|
| Refeição feita | `Check` |
| Refeição parcial | `CircleDot` |
| Refeição pendente | (nada — só estado vazio) |
| Expandir | `ChevronDown` |
| Recolher | `ChevronUp` |
| Voltar | `ArrowLeft` |
| Próximo | `ArrowRight` |
| Buscar similar | `Replace` |
| Mais opções | `MoreHorizontal` |
| Settings | `Settings` |
| Home | `Home` |
| Dieta | `UtensilsCrossed` |
| Treino | `Dumbbell` |
| Perfil | `User` |
| Timer rodando | `Timer` |
| Som ligado | `Volume2` |
| Som desligado | `VolumeX` |
| Adicionar (stepper +) | `Plus` |
| Diminuir (stepper −) | `Minus` |

### Emojis
**Permitido em micro-doses** pra calor humano:
- 🤷 no estado vazio do swap
- ⭐ marcando opção destaque (sardinha, fígado)
- ☝ no empty state do Treino ("comece o aquecimento")

**Proibido**: emoji em header, em bullet list, em rótulo de seção, como decoração.

---

## 8. Componentes base

### Button

```
PRIMÁRIO (CTA principal — registrar série, ver opções, etc)
┌──────────────────────────────┐
│      ✓  REGISTRAR SÉRIE      │  ← bg: --accent, ink: --bg, font-bold
└──────────────────────────────┘   border: none, radius: --radius-md
                                   height: 64px, padding: 0 32px
                                   font: --text-base, --font-bold

PRIMÁRIO (full-width) — usa width: 100%

PRIMÁRIO :active
   bg: --accent-darker, transform: scale(0.98), transition: 80ms

SECUNDÁRIO (ações neutras — voltar, cancelar, fechar)
┌──────────────────────────────┐
│           CANCELAR            │  ← bg: --bg, ink: --ink
└──────────────────────────────┘   border: 1.5px solid --border
                                   height: 56px, radius: --radius-md

GHOST (link-like, ações terciárias)
   ✓ FIZ ESSA                      ← bg: transparent, ink: --ink
                                      border: 1.5px solid --border
                                      height: 48px, padding: 0 16px
                                      font: --text-sm, --font-bold

DESTRUTIVO (deletar registro, descartar treino)
┌──────────────────────────────┐
│         APAGAR                │  ← bg: --bg, ink: --over
└──────────────────────────────┘   border: 1.5px solid --over
```

### Card

```
PADRÃO
┌─────────────────────────────────┐
│                                 │  bg: --surface
│  CONTEÚDO                       │  border: 1.5px solid --border
│                                 │  radius: --radius-md
└─────────────────────────────────┘  padding: 16px 24px

DESTAQUE (bloco "Agora", item ativo)
┌═════════════════════════════════┐
║                                 ║  bg: --surface
║  AGORA: 12:30                   ║  border: 2px solid --accent
║  Almoço                         ║  radius: --radius-md
║                                 ║  padding: 24px
└═════════════════════════════════┘

FEITO (refeição já registrada)
┌─────────────────────────────────┐
│                                 │  bg: --surface-2 (1 nível mais escuro)
│  06:30  Pré-Treino       ✓      │  border: 1.5px solid --border-soft
│  ~350 kcal • 18g P              │  ink: --ink-2 (texto fica abafado)
└─────────────────────────────────┘
```

### ProgressBar

```
DEFAULT
━━━━━━━━━━━━━━━━━━░░░░ 1840/2600

  height: 12px
  border: 1.5px solid --border
  border-radius: --radius-sm (4px)
  background: --bg
  fill: --done (off-white sólido), animação 300ms ease-out ao mudar

OVER (passou do alvo)
━━━━━━━━━━━━━━━━━━━━━━ 220% 

  fill muda pra --warn (amber) entre 100-130%
  fill muda pra --over (vermelho) acima de 130%
  o texto ao lado mostra o valor real
```

### Stepper (input numérico de carga/reps)

```
┌─────┬───────┬─────┐
│  −  │   12  │  +  │   height: 80px
└─────┴───────┴─────┘   width: 100% até 320px
                        botões: 80×80 cada
                        número central: --text-2xl mono font-black
                        border: 1.5px solid --border
                        gap interno: 0 (encostado)

  Tap em + ou − = +1
  Long-press em + ou − = +5 a cada 200ms (acelera)
  Limites: carga 0-200kg, reps 0-99
```

### Checklist de itens com gramagem editável

> **Decisão de design (v3):** v1 era slider de porção (modelava variação proporcional, errado). v2 era checklist binário (comi/não comi). v3 é checklist COM gramagem editável por item — o Arthur pode ajustar 180g→150g de frango, e os macros recalculam proporcionalmente usando dados da TACO (macros/100g). Cobre 100% dos casos reais: comeu tudo (default), tirou item inteiro (tap checkbox), ajustou gramagem (tap no peso).

```
  ITENS · TOQUE NO PESO PRA AJUSTAR   ← label mono uppercase, --ink-3, text-xs

  ┌──┐                         ┌──────┐
  │✓ │  Arroz cozido           │ 180g │  ← item-gram: mono, tappable
  └──┘                         └──────┘    border-bottom 1px --border-soft
  ┌──┐                         ┌──────┐
  │✓ │  Feijão (2 conchas)     │ 160g │
  └──┘                         └──────┘
  ┌──┐                         ┌──────┐
  │✓ │  Peito frango           │ 150g │  ← ajustado (180→150), --accent
  └──┘                         └──────┘
     [−10] [−5]  [+5] [+10]              ← gram-stepper inline (aparece só pra item ativo)
  ┌──┐                         ┌──────┐
  │✓ │  Salada grande          │ 200g │
  └──┘                         └──────┘
  ┌──┐                         ┌──────┐
  │✓ │  Azeite                 │ 15ml │
  └──┘                         └──────┘

  === Checkbox ===
  24px quadrado, border 1.5px solid --border
  Marcado: bg --ink, símbolo ✓ em --bg, font-weight 900 mono
  Desmarcado: bg transparent, sem símbolo
  Texto desmarcado: line-through + cor --ink-3

  === Item gram ===
  Cápsula mono: bg --surface-2, border 1px --border-soft, radius-sm
  Padding 4px 10px, min-width 56px, text-align center
  Quando ajustado (≠ planejado): cor --accent, border --accent, bg --accent-soft
  Tap abre gram-stepper inline embaixo

  === Gram stepper ===
  4 botões inline: [−10] [−5] [+5] [+10]
  Cada btn: 44×36px, bg --surface, border 1px --border-soft, mono 11px
  Aparece ABAIXO do item ativo (não é modal, não é popup)
  Long-press em ±10 incrementa de 50 em 50 (pra ajustes grandes)
  Mínimo: 0g (= item removido). Máximo: 2× gramagem planejada.
  Tap fora do stepper = fecha
  Vibração 20ms ao mudar valor

  === Linha ===
  Min-height 48px (toque)
  Tap no checkbox = toggle on/off (0g vs gramasPlano)
  Tap no item-gram = abre/fecha gram-stepper
```

**Cálculo de macros:**
```
macros do item = item.macrosPor100g × gramasReais / 100
macros da opção = Σ macros de todos os itens
```
Dados de macros/100g vêm da TACO — ver `ingredientes-taco.md`.

### Modal (sheet)

```
                           ← backdrop: rgba(10,10,10,0.4) + blur(8px)
   ┌─────────────────────┐
   │  ←  Título          │ ← header com botão back, padding 24px
   │                     │
   │  CONTEÚDO           │ ← bg: --surface
   │                     │   border-top-left-radius: 16px
   │                     │   border-top-right-radius: 16px
   │                     │   border-top: 2px solid --border
   │                     │
   │  ┌───────────────┐  │
   │  │  CTA          │  │
   │  └───────────────┘  │
   └─────────────────────┘ ← cola na base da viewport

  Slide-up 300ms ease-out na entrada
  Slide-down 200ms ease-in na saída
  Swipe-down fecha (gesto nativo, área = header)
```

### BottomNav

```
┌─────────────────────────────────┐
│  ⌂      🍽      🏋      👤       │  height: 56px
│ HOME   DIETA  TREINO  PERFIL    │  padding: 8px 0
└─────────────────────────────────┘  border-top: 1.5px solid --border
                                     bg: --surface
                                     position: fixed bottom: 0

  Cada item: width 25%, ícone 24px, label --text-xs uppercase
  Item ativo: ícone --ink + label --ink + barra superior 2px --ink (4px de extensão)
  Item inativo: ícone --ink-3 + label --ink-3
```

---

## 9. Estados (loading, empty, error, success, partial)

### Tabela mestre

| Feature | Loading | Empty | Error | Success | Partial |
|---|---|---|---|---|---|
| **App primeira abertura** | Splash 600ms — "Plano A" off-white sobre near-black, font-black, text-3xl | Tela "Bom dia, Arthur. Hoje é folga ou plantão?" + 2 botões grandes | Banner topo "Erro carregando dados" + botão "Recarregar" | (não aplicável) | (não aplicável) |
| **Lista de refeições** | Skeleton — 6 linhas cinza pulsando 1.2s | (não acontece — refeições são estáticas) | (não acontece) | Card vira `--surface-2` + ícone `Check` | Card mantém `--surface` + ícone `CircleDot` + texto "75%" |
| **SwapModal** | Spinner 200ms (provavelmente nem aparece — busca é local) | "🤷 Nenhuma opção parecida" + botão "Aceitar tolerância maior (±40%)" | "Erro buscando similares" + botão retry | Lista de 1-5 resultados ordenados por % match | (não aplicável) |
| **Treino — sessão** | (instantâneo) | "☝ Comece pelo aquecimento" + botão "INICIAR" | "Não consegui salvar a série, tenta de novo" + botão retry | Vibra 40ms + avança série + ativa timer | Sessão incompleta = banner no Dashboard "Continuar treino" |
| **Registrar peso** | (instantâneo) | "Nenhum peso registrado ainda" + botão "REGISTRAR PESO" | "Erro salvando" + retry | Toast 2s "Peso 96.4kg registrado" | (não aplicável) |
| **Buscar refeição (geral)** | (não aplicável — não tem busca no MVP) | — | — | — | — |

### Tom de voz dos estados

- **Empty:** humano, contextual, oferece ação
  - ✅ "Bom dia, Arthur. Hoje é folga ou plantão?"
  - ❌ "Nenhum dado encontrado."
- **Error:** explica o problema, oferece retry, sem culpar o usuário
  - ✅ "Não consegui salvar a série, tenta de novo"
  - ❌ "Erro 500: IndexedDB transaction failed"
- **Success:** silencioso por padrão. Toast só pra ação importante (peso registrado, treino finalizado).
- **Loading:** evita sempre que possível. Operações locais não precisam de spinner.

---

## 10. Motion

### Princípios
1. **Tudo respeita `prefers-reduced-motion`** — desliga global
2. **Duração máxima:** 400ms. Passou disso, é decoração.
3. **Easing padrão:** `ease-out` na entrada, `ease-in` na saída, `linear` em cronômetro
4. **Sem spring, sem bounce, sem parallax, sem confetti, sem lottie**

### Catálogo
| Onde | Duração | Easing | Detalhe |
|---|---|---|---|
| Marcar refeição (flash do card) | 200ms | ease-out | bg passa por `--surface-2` |
| Ícone ✓ aparecendo | 150ms | ease-out | fade-in + scale 0.8→1 |
| ProgressBar atualizando | 300ms | ease-out | width transition |
| Expandir refeição | 250ms | ease-in-out | max-height transition |
| Modal slide-up | 300ms | ease-out | translateY 100%→0 |
| Modal slide-down | 200ms | ease-in | translateY 0→100% |
| Backdrop fade-in | 200ms | ease-out | opacity 0→1 + blur |
| Toast slide-up | 200ms | ease-out | translateY 100%→0 |
| Toast slide-down | 150ms | ease-in | translateY 0→100% |
| Botão :active | 80ms | linear | scale 1→0.98 |
| Timer de descanso (decremento) | linear | linear | width contínua, sem easing |
| Timer cor verde→amber | 100ms | linear | em 33% do tempo restante |
| Timer cor amber→vermelho | 100ms | linear | em 10% do tempo restante |

### CSS base
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Vibração
```typescript
// Marcar série / refeição
navigator.vibrate?.(40);

// Timer de descanso terminou
navigator.vibrate?.([200, 100, 200]);
```

### Som (timer de descanso)
- **Default desligado.** Toggle direto na tela do timer (ícone 🔇 ↔ 🔊).
- Quando ligado: beep curto 440Hz × 200ms ao final.
- Estado salvo em localStorage (`plano-a:timer-sound`), persiste entre sessões.

---

## 11. Layout grid

### Viewports
| Viewport | Largura | Estratégia |
|---|---|---|
| Mobile | 320-767px | Coluna única, page padding 16px |
| Tablet | 768-1199px | Coluna única, max-width 480px, centralizado |
| Desktop | 1200px+ | Coluna única, max-width 480px, centralizado, fundo `--surface-2` |

**O app é mobile-first absoluto.** Em desktop ele continua sendo uma coluna estreita centralizada (estilo "iPhone num browser") porque é PWA pessoal e desktop é uso secundário (talvez Arthur abre no PC pra ver histórico). Não tem layout 3-coluna, não tem sidebar, não tem dashboard expandido.

### Container
```css
.page {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 16px 80px; /* 80px embaixo = altura BottomNav + folga */
  min-height: 100dvh;
  background: var(--bg);
}
```

### Safe areas
```css
padding-bottom: max(80px, env(safe-area-inset-bottom) + 64px);
padding-top: max(0px, env(safe-area-inset-top));
```

---

## 12. AI Slop blacklist (proibido neste projeto)

Ler antes de codar qualquer tela. Se algo se parece com isso, refaz.

1. **Gradiente roxo/violeta/indigo** em background ou em qualquer lugar
2. **Grid de 3 features simétricas** com ícone-em-círculo-colorido + título + 2 linhas de descrição
3. **Ícone em círculo colorido** como decoração de seção
4. **`text-align: center` em headings, descrições e cards** ao mesmo tempo
5. **Border-radius gigante** uniforme em todo elemento
6. **Blob decorativo, círculo flutuante, divider SVG ondulado**
7. **Emoji como elemento de design** (foguete em header, emoji como bullet)
8. **`border-left: 3px solid <accent>`** em cards
9. **Copy genérico**: "Welcome to", "Unlock the power of", "Your all-in-one"
10. **Section rhythm cookie-cutter**: hero → 3 features → testimonial → CTA, todas mesma altura
11. **Skittles colorido nos macros** (verde proteína, amarelo carbo, laranja gordura) — usa off-white sólido, diferenciação por rótulo
12. **Cards arredondados gigantes empilhados verticalmente** sem hierarquia
13. **"Empty state" com ilustração genérica** (carinha triste, caixa vazia, planta murcha)
14. **Tooltip ao redor de tudo** explicando o óbvio
15. **Animação de número contando** de 0 até o valor

---

## 13. Checklist antes de mergeear qualquer tela

- [ ] Texto secundário usa `--ink-2` ou `--ink-3` (não inventou cor nova)
- [ ] Não tem nenhum `box-shadow` no código
- [ ] Border-radius está dentro da escala (0/4/8/12)
- [ ] Espaçamento usa CSS variables, não números mágicos
- [ ] Toda quantidade numérica está em `--font-mono`
- [ ] Botão clicável tem ≥48px de altura
- [ ] CTA principal está na metade inferior da tela
- [ ] Estados loading/empty/error existem (mesmo que mínimos)
- [ ] `prefers-reduced-motion` desliga as animações
- [ ] Nenhum item da blacklist do item 12 está presente
- [ ] Contraste de texto verificado (≥4.5:1, ideal 7:1)
- [ ] Funciona com uma mão só (testou rolando com polegar)

---

## 14. Versionamento deste arquivo

Este documento é vivo. Quando uma decisão visual mudar:
1. Atualiza este arquivo PRIMEIRO
2. Faz o ajuste no código depois
3. Se a mudança quebra algo já implementado, lista no commit message

A regra inversa nunca: nada de "mudei o código e depois esqueci de atualizar o doc". O doc é a fonte de verdade.
