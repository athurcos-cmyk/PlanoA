# APP — Planejamento técnico

App web pessoal do Arthur pra gerenciar dieta e treino. Este documento é o norte técnico antes de começar a codar.

---

## 1. Princípios de design

Pensando no caso real do Arthur:

1. **Uso mobile-first.** Ele vai abrir o app no celular dentro do hospital, muitas vezes com uma mão só, enquanto come no refeitório. Tudo tem que ser fácil de tocar com polegar, letra grande, zero scroll infinito.
2. **Funciona offline.** Hospital tem wi-fi ruim e celular dele pode estar sem sinal. App tem que funcionar 100% sem internet depois do primeiro carregamento.
3. **Zero login.** É uso pessoal. Não tem razão pra ter tela de login, senha, autenticação. Abre e usa.
4. **Persistência local.** Dados ficam no dispositivo (IndexedDB). Sem servidor, sem banco remoto, sem custo mensal.
5. **Simples > perfeito.** MVP primeiro. Funcionalidades sofisticadas ficam pra versão 2.
6. **Uma mão só.** Botões grandes, toques rápidos. O Arthur tá com frango e arroz numa mão e o celular na outra.

---

## 2. Stack escolhida

### Recomendação principal: **Vite + React + TypeScript + Tailwind + Dexie + PWA**

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| Build tool | **Vite** | Rápido, simples, sem configuração maluca |
| Framework UI | **React 18** | Maturidade, ecossistema gigante, fácil de achar ajuda |
| Linguagem | **TypeScript** | Pega erro em tempo de compilação, IDE inteligente |
| Estilização | **Tailwind CSS** | Rápido, mobile-first nativo, zero CSS à mão |
| Router | **React Router v7** | Padrão do React, rotas client-side |
| Estado local (UI) | **Zustand** | 10x mais simples que Redux — só pra estado efêmero de UI |
| Persistência | **Dexie.js** (IndexedDB) | Banco local no navegador, funciona offline |
| Reatividade DB → UI | **dexie-react-hooks** (`useLiveQuery`) | Hook que re-renderiza quando dado do banco muda, sem refetch manual |
| Forms | **React Hook Form** | Leve, performático, sem dor de cabeça |
| Ícones | **Lucide React** | Simples, modernos, tree-shakeable |
| Datas | **date-fns** | Leve, modular, padrão brasileiro configurável |
| PWA | **vite-plugin-pwa** | Transforma o app em PWA (instalável no celular) |
| Deploy | **Vercel** (grátis) | Gratuito, deploy via Git, rápido |

### Por que NÃO escolhi outras opções

- **Next.js:** overkill pra uso pessoal. SSR não é útil aqui, e adiciona complexidade de deploy/roteamento.
- **Svelte/SvelteKit:** menos ecossistema. React tem mais tutoriais/respostas se você travar.
- **HTML/CSS/JS puro:** funcionaria, mas gerenciar estado e telas sem framework vira bagunça rápido.
- **Backend (Node/Python):** desnecessário. Tudo que precisa fazer é client-side. Sem backend = sem servidor pra pagar, sem autenticação, sem bug de deploy.
- **Banco remoto (Supabase/Firebase):** custa no plano grátis se passar de X uso. IndexedDB é 100% local e ilimitado.

### Alternativa caso queira sync entre dispositivos (celular + PC)

Se em algum momento você quiser abrir o app no PC e no celular e ver os mesmos dados, aí sim adiciona:
- **Supabase** (PostgreSQL grátis até 500MB) para armazenar os dados remotamente
- Autenticação simples por magic link (email)

Mas **isso fica pra v2**. No MVP, IndexedDB resolve 100%.

---

## 3. Arquitetura de dados

### Dois tipos de dado distintos:

#### A. Dados estáticos (planos fixos) — ficam no código
- Perfil do Arthur (peso, altura, idade, macros-alvo)
- Dietas (folga e plantão, com todas as opções e macros)
- Treinos (A e B, exercícios, séries, reps)
- Suplementação (pilha atual)

Vão como arquivos TypeScript no repositório (`src/data/`). Versionados via Git. Quando o plano mudar, você edita o arquivo e re-deploya.

#### B. Dados dinâmicos (execução diária) — ficam no IndexedDB
- **Dias registrados:** data, tipo (folga/plantão), refeições feitas, treino feito, peso do dia (opcional)
- **Refeições registradas:** qual refeição, qual opção escolhida, horário de registro
- **Treinos registrados:** qual treino (A ou B), exercícios feitos, carga usada, reps feitas, notas
- **Peso histórico:** data, peso (opcional, uma vez por semana)

### Schema Dexie (esboço)

```typescript
// src/db/schema.ts
import Dexie, { Table } from 'dexie';

export interface DiaRegistrado {
  id?: number;
  data: string;              // YYYY-MM-DD (local, sempre via utils/datas.ts → hoje())
  tipo: 'folga' | 'plantao'; // regra: "o que domina a manhã" — plantão que termina 7h
                             // conta como plantão no dia que começou; dia seguinte é folga.
                             // 12x36 não tem dia 100% puro de nenhum tipo, esta é a simplificação.
  pesoDoDia?: number;
  notas?: string;
}

export interface RefeicaoFeita {
  id?: number;
  data: string;                    // YYYY-MM-DD (data local, nunca UTC — ver utils/datas.ts)
  slotRefeicaoId: string;          // slot da rotina: 'cafe', 'pre-treino', 'almoco'
  dietaOrigem: 'folga' | 'plantao';// qual dieta esse slot pertence hoje
  opcaoId: number;                 // 1, 2 ou 3 (da dieta do dia)
  opcaoOrigemSlot?: string;        // se for swap de outra refeição, o slot original
  opcaoOrigemDieta?: 'folga' | 'plantao';
  itensRegistrados?: ItemRegistrado[];  // gramagem real por item. undefined = comeu tudo no plano (caminho rápido).
  macrosConsumidos: Macros;              // snapshot final (já calculado com gramagens reais)
  horario: string;                 // HH:mm registrado
  notas?: string;
}

/*
 * Por que snapshot de macros em vez de recalcular lendo os dados estáticos?
 * 1) Histórico fica imune a edições futuras do plano (se eu editar Opção 1 do Lanche,
 *    o que foi comido em 10/abr permanece correto).
 * 2) Cálculo de progresso do dia vira sum(macrosConsumidos) — uma query, sem joins
 *    nem lookup na tabela estática.
 * 3) Evita bug silencioso quando opcaoId vira ponteiro inválido após refactor do plano.
 */

export interface TreinoFeito {
  id?: number;
  data: string;
  tipoTreino: 'A' | 'B';
  exercicios: ExercicioRegistrado[];
  duracao?: number;          // minutos
  notas?: string;
}

export interface ExercicioRegistrado {
  exercicioId: string;
  series: SerieFeita[];
}

export interface SerieFeita {
  reps: number;
  carga: number;
}

export interface PesoRegistrado {
  id?: number;
  data: string;
  peso: number;
}

export class DietaDB extends Dexie {
  dias!: Table<DiaRegistrado>;
  refeicoesFeitas!: Table<RefeicaoFeita>;
  treinosFeitos!: Table<TreinoFeito>;
  pesos!: Table<PesoRegistrado>;

  constructor() {
    super('DietaArthur');
    this.version(1).stores({
      dias: '++id, &data, tipo',                              // &data = única (1 registro por dia)
      refeicoesFeitas: '++id, data, slotRefeicaoId, [data+slotRefeicaoId]',
      treinosFeitos: '++id, data, tipoTreino',
      pesos: '++id, &data',                                   // &data = única (1 peso por dia)
    });
    // Nota: índice composto [data+slotRefeicaoId] é crítico — quase toda query da tela
    // Dieta pergunta "a refeição X foi feita hoje?". Sem o composto, Dexie faz full scan.
  }
}

export const db = new DietaDB();
```

### Modelo dos dados estáticos (dietas/treinos)

```typescript
// src/data/tipos.ts

export interface Macros {
  kcal: number;
  proteina: number;   // gramas
  carboidrato: number;
  gordura: number;
  fibra?: number;
}

/**
 * Categoria da refeição — usada pra filtrar opções de substituição cruzada.
 * Dois itens só são "trocáveis" se fazem sentido no mesmo momento do dia.
 * Ex: um "prato-principal" (arroz+feijão+frango) não deveria substituir
 * um "lanche-frio" (pão+ovos) mesmo que os macros batam.
 */
export type CategoriaRefeicao =
  | 'cafe-denso'          // pão c/ ovos, cuscuz c/ ovos — denso, quente
  | 'cafe-leve'           // panqueca, shake de aveia — mais leve
  | 'shake-proteico'      // whey + banana, leite + whey
  | 'prato-principal'     // arroz+feijão+proteína+legumes
  | 'marmita'             // prato principal em versão portátil
  | 'lanche-frio'         // pão + ovos cozidos, sanduíche
  | 'lanche-portavel'     // só coisa de bolsa: shake + fruta + paçoca
  | 'ceia-leve';          // iogurte + aveia, 2 ovos

export interface ItemRefeicao {
  descricao: string;          // "180g arroz cozido"
  quantidade?: number;        // 180
  unidade?: 'g' | 'ml' | 'un' | 'colher-sopa' | 'colher-cha' | 'concha' | 'scoop' | 'fatia';
}

export interface OpcaoRefeicao {
  id: number;                  // 1, 2, 3
  nome: string;                // "Panqueca Simples"
  itens: ItemRefeicao[];       // itens estruturados (permite edição futura)
  macros: Macros;
  categoria: CategoriaRefeicao;
  tags?: string[];             // ['sem-whey', 'preparo-rapido', 'praticidade-hospital']
  observacao?: string;         // "Bate tudo e frita..."
}

export interface Refeicao {
  id: string;                // "pre-treino"
  horario: string;           // "06:30"
  nome: string;              // "Pré-Treino (leve, digestão rápida)"
  alvoMacros: Macros;
  opcoes: OpcaoRefeicao[];
  notaFinal?: string;
}

export interface Dieta {
  id: 'folga' | 'plantao';
  nome: string;
  refeicoes: Refeicao[];
  totalDiarioAlvo: Macros;
  notasGerais: string[];
}

// ----------- TREINO -----------

export interface Exercicio {
  id: string;
  nome: string;
  series: string;            // "4 × 10-12 reps"
  carga?: string;            // "12kg cada mão"
  descanso: string;          // "60-75s"
  descricao?: string;
  biSetCom?: string;         // id do exercício pareado, se for bi-set
}

export interface BlocoTreino {
  id: string;
  titulo: string;
  exercicios: Exercicio[];
}

export interface Treino {
  id: 'A' | 'B';
  nome: string;              // "Upper (Peito, Ombro, Costas, Braço, Core)"
  duracaoEstimada: string;   // "60-75 min"
  blocos: BlocoTreino[];
}
```

---

## 3.1 Design system

Toda decisão visual (cor, tipografia, espaçamento, componentes, motion, estados) vive em [`design-system.md`](./design-system.md). Este arquivo é a fonte de verdade visual. Quando codar uma tela e tiver dúvida, consulta lá. Quando mudar algo visual, edita lá PRIMEIRO.

**TL;DR da direção:**
- **Brutalist Atlético** — bordas pretas grossas, sem sombra, off-white (#FAFAF7) + preto + acento vermelho-tijolo (#DC2626)
- **Inter Variable** (sans) + **JetBrains Mono Variable** (números)
- **Toque mínimo 48px**, CTA primário 56-64px
- **Mobile-first absoluto**, max-width 480px sempre
- **Anti-AI-slop:** sem skittles colorido nos macros (preto sólido), sem ícone-em-círculo, sem gradiente roxo, sem border-radius gigante

---

## 4. MVP — escopo mínimo

A primeira versão do app precisa resolver o problema central: **"qual é minha dieta/treino hoje e eu estou cumprindo?"** Nada além disso.

### Features do MVP (v1.0)

#### ✅ Home / Dashboard
- Data de hoje
- Seletor do tipo de dia (botão: "Hoje é folga" / "Hoje é plantão")
- Próxima refeição (horário + nome, destaque visual)
- Barra de progresso das calorias do dia
- Barra de progresso da proteína, carbo, gordura
- Link pras 3 seções principais: Dieta, Treino, Perfil

#### ✅ Tela de Dieta
- Lista as 6 refeições do dia (conforme tipo — folga ou plantão)
- Cada refeição mostra: horário, nome, alvo de macros, status (✅ feita / ⏳ pendente)
- Clicar na refeição → expande mostrando as 3 opções padrão com macros
- Botão grande "Fiz essa" em cada opção
- **Botão "Buscar similar"** → abre modal com opções compatíveis (substituição cruzada, ver seção 4.5)
- Após escolher uma opção: tela de detalhe com **checklist de itens** (todos marcados por default; user toca pra desmarcar item ausente). Macros recalculam ao vivo.
- Marcar opção = registra no banco + atualiza progresso do dia em tempo real
- Desmarcar = remove o registro

#### ✅ Tela de Treino
- Mostra qual treino tá disponível (A ou B — alterna automaticamente baseado no último treino feito)
- Lista os blocos do treino com exercícios
- Clicar em exercício → vai pra tela do exercício com séries
- Para cada série: **stepper +/− pra carga e reps** (não input numérico, polegar suado erra)
- Pré-preenchido com a série anterior desta sessão (recall) ou com a última sessão deste exercício
- Long-press no + ou − incrementa em 5 (carga) ou 5 (reps)
- Botão grande "✓ REGISTRAR SÉRIE" (--accent, 72px altura)
- Vibração curta (40ms) ao registrar série
- Timer de descanso ativa automaticamente após registrar série (60-75s Upper, 75-90s Lower)
- Timer aparece como barra de 32px no topo da tela, decrescente, muda cor verde→amber→vermelho
- Toggle de som direto na tela do timer (ícone 🔇/🔊 no canto direito do timer), persiste em localStorage
- Vibração no fim do timer: padrão `[200, 100, 200]`
- Som no fim do timer (se ligado): beep 440Hz × 200ms
- Botão "Finalizar treino" no final → registra tudo no banco
- **Tap no nome do exercício** (header da tela de exercício) → abre tela de **Progressão de Carga** (ver abaixo)

#### ✅ Tela de Progressão de Carga (por exercício)
- Pergunta central: "como minha carga nesse exercício evoluiu?"
- Header com nome do exercício (ex: "Supino halteres") + botão back
- **Card PR atual** (borda --accent, único elemento destacado): carga máxima já feita × reps daquela sessão, delta desde a primeira sessão registrada ("↑ +2 kg em 17 dias"), sugestão da próxima carga ("próximo: 13 kg" — heurística simples: se conseguiu 12 reps na carga atual em 2 sessões consecutivas, sugere +1kg)
- Lista cronológica reversa de todas as sessões registradas pra esse exercício, mostrando: data, carga, reps médios, e tag visual quando subiu de carga (`↑ +1` em accent) ou marcador "início" na primeira
- Sem gráfico fancy — texto é o gráfico. O Arthur lê em 3 segundos se está progredindo ou estagnado
- **Não precisa de schema novo** — deriva de `treinosFeitos` filtrando por `exercicioId` e agrupando por sessão. View pura, sem write
- Fora do escopo MVP: comparação entre exercícios, projeção de PR futura, gráfico de barras animado

#### ✅ Tela de Perfil
- Dados fixos (peso, altura, idade, macros-alvo) — read-only no MVP
- Histórico do peso (se houver registros)
- Botão "Registrar peso de hoje" (modal simples, 1 campo)

#### ❌ Fora do MVP (v2+)
- Ajuste automático de macros quando peso muda
- Gráficos de aderência / histórico visual
- Lista de compras automática
- Edição do plano de dieta pelo app (o plano vive no código, edita no código)
- Notificações push de refeição
- Exportação pra CSV
- Registro de fotos (progress pic)
- Modo escuro (adiciona cedo, mas depois do MVP funcional)
- Edição granular de **gramagem** por item (no MVP só dá pra incluir/excluir item inteiro via checklist, não ajustar de 180g pra 150g de frango)

---

## 4.1 Hierarquia visual e mockups por tela

A pergunta central de todo design de tela é: "qual é a única coisa que o Arthur pergunta quando abre essa tela?". Cada tela responde uma pergunta. Tudo que não serve a essa pergunta é secundário ou cortado.

### Dashboard — "o que como agora e quanto falta?"

Hierarquia primária: **bloco "Agora"** (próxima refeição). Secundária: **progresso de macros**. Terciária: nav.

```
┌─────────────────────────────────────┐  ← 375px (iPhone SE / Android comum)
│                                     │
│  TER 11/04   ●  PLANTÃO     ⚙       │  ← 56px header
│                                     │
├─────────────────────────────────────┤
│                                     │
│   AGORA · 12:30                     │
│   Almoço                            │  ← 160px, borda 2px --accent
│                                     │
│   ┌─────────────────────────┐       │
│   │      VER OPÇÕES   →     │       │  ← CTA primário 56px
│   └─────────────────────────┘       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   HOJE                              │
│   ━━━━━━━━━━━━━━━━━━░░░░ 1840/2600  │  ← progresso de macros
│                                     │
│   P  ▓▓▓▓▓▓▓▓▓░░  142/200g          │
│   C  ▓▓▓▓▓▓▓░░░░  198/300g          │
│   G  ▓▓▓▓▓░░░░░░   38/75g           │
│                                     │
├─────────────────────────────────────┤  ← dobra (~620px)
│   ⌂  🍽  🏋  👤                       │  ← BottomNav 56px
└─────────────────────────────────────┘
```

**O que NÃO está acima da dobra (intencional):**
- Treino disponível (acessível via BottomNav)
- Histórico de peso
- Suplementos do dia
- Configurações além do botão ⚙

### Dieta — "qual o cardápio de hoje e o que eu já fiz?"

Solução de densidade em **3 camadas**:

**Camada 1 — Lista colapsada (default).** Mostra as 6 refeições com horário, kcal e proteína. Cabe a tela inteira sem scroll.

```
┌─────────────────────────────────────┐
│  ←  Dieta · Plantão                 │
├─────────────────────────────────────┤
│  06:30  Pré-Treino           ✓      │  ← 64px, --surface-2 quando feito
│  ~350 kcal • 18g P                  │
├─────────────────────────────────────┤
│  09:30  Pós-Plantão Manhã    ✓      │
│  ~480 kcal • 35g P                  │
├─────────────────────────────────────┤
│  12:30  Almoço             ⏵        │  ← pendente, ChevronDown
│  ~780 kcal • 55g P                  │
├─────────────────────────────────────┤
│  16:00  Lanche             ⏵        │
│  ~440 kcal • 28g P                  │
├─────────────────────────────────────┤
│  20:00  Jantar             ⏵        │
│  ~560 kcal • 45g P                  │
├─────────────────────────────────────┤
│  22:00  Ceia               ⏵        │
│  ~220 kcal • 15g P                  │
└─────────────────────────────────────┘
```

**Camada 2 — Refeição expandida.** Toca numa refeição → lista as 3 opções (só título + macros). Cada opção tem 2 botões: "✓ FIZ ESSA" (registra direto, sem passar pela camada 3) e "···" (abre detalhe pra revisar/ajustar item ausente).

```
├─────────────────────────────────────┤
│  12:30  Almoço             ⏷        │
│  ~780 kcal • 55g P                  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ① Arroz, feijão e frango    │    │
│  │   805 kcal • 69P 77C 21G    │    │
│  │   [ ✓ FIZ ESSA ]   [ ··· ]  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ ② Macarrão à bolonhesa      │    │
│  │   775 kcal • 50P 77C 19G    │    │
│  │   [ ✓ FIZ ESSA ]   [ ··· ]  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ ③ Arroz com sardinha        │    │
│  │   700 kcal • 58P 83C 15G    │    │
│  │   [ ✓ FIZ ESSA ]   [ ··· ]  │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ 🔄 Buscar similar ]              │  ← botão swap
│                                     │
├─────────────────────────────────────┤
```

**Camada 3 — Detalhe da opção (rota dedicada `/dieta/:slot/:opcao`).** Tela inteira com checklist de itens + macros recalculados ao vivo + CTA grande. Caso de uso: revisar antes de registrar OU desmarcar item específico que faltou (ex: "hoje não tinha frango").

```
┌─────────────────────────────────────┐
│  ←  Almoço · Opção 1                │
│                                     │
│  Arroz, feijão e frango             │  ← --text-xl
│  755 kcal                           │  ← --text-2xl mono · recalcula ao vivo
│                                     │
│   P 63g    C 78g    G 20g           │  ← também recalcula ao vivo
│                                     │
│  ITENS · TOQUE NO PESO PRA AJUSTAR  │
│                                     │
│  ┌──┐                                │
│  │✓ │  Arroz cozido         [180g]  │  ← item-gram: mono, tappable
│  └──┘                                │
│  ┌──┐                                │
│  │✓ │  Feijão (2 conchas)   [160g]  │
│  └──┘                                │
│  ┌──┐                                │
│  │✓ │  Peito frango         [150g]  │  ← ajustado (180→150), accent
│  └──┘                                │
│     [−10] [−5]  [+5] [+10]          │  ← gram-stepper inline
│                                     │
│  ┌──┐                                │
│  │✓ │  Salada grande        [200g]  │
│  └──┘                                │
│  ┌──┐                                │
│  │✓ │  Azeite               [ 15ml] │
│  └──┘                                │
│                                     │
│  ┌─────────────────────────┐        │
│  │   ✓  REGISTRAR · 755 KCAL │      │  ← CTA 64px, mostra kcal no botão
│  └─────────────────────────┘        │
│                                     │
└─────────────────────────────────────┘
```

### Treino — "qual minha série atual e quando saio do descanso?"

Hierarquia: **timer no topo (se ativo)** → **série atual com stepper** → resto. Tudo otimizado pra polegar suado, uma mão.

```
┌─────────────────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━░░░░░░  0:48  🔇│  ← timer 32px topo, toggle som à direita
├─────────────────────────────────────┤
│  ←  Treino A · Upper                │
│                                     │
│  Bloco 1 · Peito/Ombro              │
│                                     │
│  A1. Supino halteres no chão        │
│  4 séries × 10-12 reps              │
│                                     │
│  ┌─────┬─────┬─────┬─────┐          │
│  │  1  │  2  │  3  │  4  │          │  ← série atual destacada
│  │  ✓  │  ⏵  │     │     │          │
│  │ 12kg│     │     │     │          │
│  │ 12r │     │     │     │          │
│  └─────┴─────┴─────┴─────┘          │
│                                     │
│  ────────────────────                │
│                                     │
│  SÉRIE 2     última: 12kg × 11      │
│                                     │
│       CARGA (kg)                    │
│      ┌─────┬───────┬─────┐          │
│      │  −  │   12  │  +  │          │  ← stepper 80px altura
│      └─────┴───────┴─────┘          │
│                                     │
│       REPS                          │
│      ┌─────┬───────┬─────┐          │
│      │  −  │   12  │  +  │          │
│      └─────┴───────┴─────┘          │
│                                     │
│  ┌─────────────────────────┐        │
│  │   ✓  REGISTRAR SÉRIE    │        │  ← CTA 72px, --accent
│  └─────────────────────────┘        │
│                                     │
└─────────────────────────────────────┘
```

**Stepper +/- vs input numérico:** stepper porque polegar não erra, sem teclado virtual cobrindo metade da tela, pré-preenchido com a série anterior. Long-press no + ou − incrementa em 5.

**Recall:** série 1 pré-preenche com a última sessão deste exercício. Série 2+ pré-preenche com a série anterior desta sessão.

### Perfil — "meu peso de hoje e configurações"

Mais simples. Dados estáticos no topo, peso histórico no meio, ações na base.

```
┌─────────────────────────────────────┐
│  ←  Perfil                          │
│                                     │
│  ARTHUR                             │
│  24 anos · 1.80m                    │
│                                     │
│  ────────────────────                │
│                                     │
│  PESO ATUAL                         │
│  96.4 kg                            │  ← --text-3xl mono
│  registrado há 2 dias               │  ← --text-xs --ink-3
│                                     │
│  ┌─────────────────────────┐        │
│  │  REGISTRAR PESO HOJE    │        │
│  └─────────────────────────┘        │
│                                     │
│  ────────────────────                │
│                                     │
│  HISTÓRICO                          │
│  09/04   96.4 kg                    │
│  02/04   96.8 kg                    │
│  26/03   97.1 kg                    │
│  19/03   97.4 kg                    │
│                                     │
│  ────────────────────                │
│                                     │
│  META DIÁRIA                        │
│  2.600 kcal · 200P · 300C · 75F     │
│                                     │
└─────────────────────────────────────┘
```

---

## 4.5 Substituição Cruzada (feature-chave do MVP)

### O problema que resolve
Às vezes o Arthur tá no horário do lanche da tarde e não tá a fim de nenhuma das 3 opções padrão — quer comer o mesmo **panqueca** que ele ama do café da manhã, ou o **shake rápido** do pós-treino. Em vez de "trair" o plano, o app oferece uma substituição inteligente por **similaridade de macros**.

### Como funciona (fluxo do usuário)
1. Arthur abre a refeição "Lanche da Tarde" (alvo: 400 kcal / 28g P / 55g C / 12g F)
2. Vê as 3 opções padrão — nenhuma agrada
3. Toca no botão **"🔄 Buscar similar"**
4. O app procura em **todas as opções** das duas dietas (folga + plantão) aquelas que:
   - Têm macros dentro de uma tolerância aceitável do **alvo da refeição atual**
   - Pertencem a categorias compatíveis com o momento do dia
5. Lista as opções encontradas, ordenadas por proximidade de match
6. Arthur escolhe uma (ex: "Panqueca Simples" do café da manhã)
7. A refeição é registrada com a opção trocada. O app armazena tanto a opção original quanto a substituição pro histórico.

### Regras de compatibilidade

**Tolerância padrão de macros:**
- Calorias: ±15%
- Proteína: ±20% (ou mínimo ±7g, o que for maior)
- Carboidrato: ±25% (ou mínimo ±15g)
- Gordura: ±30% (ou mínimo ±8g)

### Fórmula de scoring (`src/utils/swap.ts`)

Cada opção candidata recebe um score de 0-100% baseado em quão próximos os macros dela estão do alvo da refeição atual. Proteína pesa mais porque é o macro crítico em recomposição. Gordura pesa menos porque variação absoluta é pequena em termos de impacto.

```typescript
function calcularScore(alvo: Macros, opcao: Macros): number {
  const pesos = {
    proteina: 0.40,
    carboidrato: 0.25,
    kcal: 0.20,
    gordura: 0.15,
  };

  const diff = (a: number, b: number) =>
    Math.abs(a - b) / Math.max(a, 1); // evita divisão por zero

  const erro =
    pesos.proteina    * diff(alvo.proteina,    opcao.proteina) +
    pesos.carboidrato * diff(alvo.carboidrato, opcao.carboidrato) +
    pesos.kcal        * diff(alvo.kcal,        opcao.kcal) +
    pesos.gordura     * diff(alvo.gordura,     opcao.gordura);

  return Math.max(0, Math.round((1 - erro) * 100));
}
```

**Fluxo do `findSimilarOptions`:**
1. Pega todas as opções das duas dietas (folga + plantão, todos os slots)
2. Filtra por **categoria compatível** (matriz slot → categorias aceitas)
3. Filtra por **tolerância de macros** (dentro dos ±%)
4. Exclui a própria opção atual (se houver — o swap é pra trocar, não repetir)
5. Calcula score pra cada uma e ordena desc
6. Retorna top N (5 é suficiente pra UI)

**Compatibilidade de categoria:**
Matriz de quais categorias podem substituir quais (uma opção só aparece se a categoria dela for compatível com o **slot** atual):

| Slot (refeição atual) | Categorias aceitas |
|------------------------|---------------------|
| Café da manhã | `cafe-denso`, `cafe-leve`, `shake-proteico` |
| Pré-treino | `cafe-leve`, `shake-proteico` |
| Pós-treino | `shake-proteico`, `cafe-leve` |
| Almoço | `prato-principal`, `marmita` |
| Lanche da tarde | `lanche-frio`, `lanche-portavel`, `cafe-leve`, `shake-proteico` |
| Jantar | `prato-principal` |
| Ceia | `ceia-leve`, `shake-proteico` |

### Exemplo prático
Arthur tá no **lanche da tarde do plantão** (alvo: ~350 kcal / 25g P / 45g C / 8g F).
As 3 opções padrão estão ok mas ele quer algo diferente. Toca em "Buscar similar".

O app calcula e mostra:
- ✅ **Pão com Ovos** (café plantão, 440 kcal / 23g P / 55g C / 16g F) — 92% de match
- ✅ **Shake Turbo** (café plantão, 450 kcal / 39g P / 65g C / 4g F) — 85% de match
- ✅ **Panqueca Simples** (pré-treino folga, 342 kcal / 17g P / 44g C / 12g F) — 88% de match
- ❌ Jantar Clássico (não aparece: categoria `prato-principal` não combina com slot "lanche")

Arthur escolhe "Panqueca Simples" — pronto, tá registrado como consumo do lanche da tarde.

### Estado vazio — quando não acha nada similar

Se nenhuma opção passar no filtro de categoria + tolerância, o `SwapModal` mostra:

> **Nenhuma opção similar encontrada**
> Os macros desta refeição são específicos e nenhuma outra opção do plano bate dentro da tolerância padrão.
>
> [Afrouxar tolerância (±40%)] [Cancelar]

Botão "afrouxar tolerância" refaz a busca com todas as margens multiplicadas por 2 (ex: proteína ±40%, carbo ±50%, gordura ±60%). Ainda respeita a matriz de categoria — isso é inviolável, não queremos Jantar Clássico aparecendo na Ceia.

Se mesmo com tolerância dobrada não achar nada: mensagem "Mesmo com tolerância dobrada, não há opção compatível. Vai nas 3 opções padrão ou registra manualmente." e botão de fechar.

### Impacto no modelo de dados
Requer:
1. Todos os objetos `OpcaoRefeicao` precisam ter `categoria` definida
2. Tabela de compatibilidade entre slots e categorias (em `src/data/compatibilidade-slots.ts`)
3. Função `findSimilarOptions(slotAtual, macroAlvo, todasOpcoes)` em `src/utils/swap.ts`
4. Modal de UI pra listar resultados

### Por que fica no MVP (e não em v2)
Arthur pediu explicitamente. É um requisito central pro modo real como ele usa o plano (flexibilidade > rigidez). Implementação não é trivial mas também não é foguete — ~4-6h de trabalho a mais no total do MVP.

---

## 4.6 Ajuste por item — checklist (substitui Q3 multiplicador)

### O problema real (revisitado em conversa)

Versão original deste plano assumia que a variação real da rotina do Arthur era proporcional: "comi 75% do prato". Em conversa direta o Arthur corrigiu: ele é regrado, segue gramagem do plano (180g é 180g), não repete porção. **A única variação real que ele tem é granular e binária**: "hoje não tinha frango/carne, então não comi esse item específico". Slider de porção modela o problema errado. Trocado por checklist de itens.

### Implementação — caminho rápido + caminho ajustado

Continuamos com **2 toques pro caso default** e **3 toques pro caso ajustado**:

**Caminho rápido (95% dos casos)** — na lista de opções da refeição expandida (camada 2 da tela Dieta), cada `OpcaoCard` tem 2 botões:

```
  ┌─────────────────────────────┐
  │ ① Arroz, feijão e frango    │
  │   805 kcal • 69P 77C 21G    │
  │                              │
  │   [ ✓ FIZ ESSA ]   [ ··· ]  │  ← rápido + revisar
  └─────────────────────────────┘
```

- **"✓ FIZ ESSA"** → registra a opção inteira, gramagens planejadas, `itensRegistrados=undefined`. Dois toques no total (expandiu refeição + tocou em FIZ ESSA).
- **"···"** → abre tela de detalhe (camada 3) com checklist + gramagem editável.

**Caminho ajustado (raro)** — cada item mostra gramagem planejada. Tap no checkbox remove inteiro. Tap na gramagem abre stepper inline (−10/−5/+5/+10). Macros no topo recalculam ao vivo:

```
  ITENS · TOQUE NO PESO PRA AJUSTAR

  ☑  Arroz cozido              [180g]
  ☑  Feijão (2 conchas)        [160g]
  ☑  Peito frango grelhado     [150g]  ← ajustado, accent
     [−10] [−5] [+5] [+10]            ← stepper inline
  ☑  Salada grande              [200g]
  ☑  Azeite                     [ 15ml]
```

**Cálculo:** macros consumidos = somatório dos macros de cada item × gramagem real / gramagem planejada. Cada item armazena **macros por 100g** (fonte: TACO — ver `ingredientes-taco.md`) e **gramagem planejada**. Quando o Arthur ajusta a gramagem (ex: 180g frango → 150g), o cálculo é proporcional: `item.macrosPor100g × gramasReais / 100`. Quando remove um item inteiro, `gramasReais = 0`.

```typescript
interface Macros {
  kcal: number;
  p: number;   // proteína (g)
  c: number;   // carboidrato (g)
  g: number;   // gordura (g)
}

interface ItemOpcao {
  id: string;              // 'frango-grelhado'
  nome: string;            // 'Peito frango grelhado'
  gramasPlano: number;     // 180 (o que o plano manda)
  unidade: string;         // 'g' | 'ml' | 'un'
  macrosPor100g: Macros;   // { kcal: 159, p: 32, c: 0, g: 2.5 } ← TACO
  // macros planejados = gramasPlano × macrosPor100g / 100 (derived)
}

interface OpcaoRefeicao {
  id: number;              // 1, 2, 3
  nome: string;            // 'Arroz, feijão e frango'
  itens: ItemOpcao[];      // 5 itens, cada um com macrosPor100g
  // macros totais = soma dos macros planejados de cada item (derived)
}
```

**No momento do registro**, o `RefeicaoFeita` grava:

```typescript
interface ItemRegistrado {
  itemId: string;           // 'frango-grelhado'
  gramasReais: number;      // 150 (ajustou de 180→150) — 0 se removeu inteiro
}

// dentro de RefeicaoFeita:
itensRegistrados?: ItemRegistrado[];  // undefined = comeu tudo planejado (caminho rápido)
macrosConsumidos: Macros;             // snapshot final (já calculado)
```

**Exemplo de cálculo (frango 180→150g):**
```
macrosPor100g frango: { kcal: 159, p: 32, c: 0, g: 2.5 }
Planejado (180g): 286 kcal · 57.6P · 0C · 4.5G
Real (150g):      239 kcal · 48.0P · 0C · 3.8G
Delta:            -47 kcal · -9.6P · 0C · -0.7G
```

O cálculo inteiro é multiplicação simples — zero lookup externo, zero banco de alimentos complexo. Os macros/100g já estão hardcoded no dado estático da opção.

### UX — caminho rápido + caminho ajustado + gramagem

3 caminhos com complexidade progressiva:

| Cenário | Toques | O que acontece |
|---|---|---|
| **Comeu tudo certinho** (95% dos dias) | 2 | FIZ ESSA na lista → registra tudo no plano |
| **Tirou item inteiro** (raro, ~1x/semana) | 3 | FIZ ESSA → ··· → desmarca item → REGISTRAR |
| **Ajustou gramagem** (raro, ~1x/semana) | 4 | FIZ ESSA → ··· → toca [180g] → stepper aparece → ajusta → REGISTRAR |

**Stepper de gramagem** — aparece inline embaixo do item tocado (não modal, não popup). 4 botões: `−10g · −5g · +5g · +10g`. O número [180g] atualiza ao vivo, macros no topo da tela recalculam ao vivo. Tap fora fecha o stepper. Long-press em −10/+10 incrementa de 50 em 50 (pra ajustes grandes).

### ~~Fora do MVP~~ → Promovido para MVP
- ~~Adicionar item não planejado ("comi uma maçã extra") — requer busca/criação de item livre. v2.~~
- **Agora no MVP** — com 350 alimentos no banco, a busca já existe. Ver seção 4.9 (Extras do dia).

---

## 4.7 Swap de Ingrediente (troca individual dentro da refeição)

### O problema que resolve
O swap da seção 4.5 troca a **refeição inteira** (ex: trocar "Arroz, feijão e frango" por "Macarrão à bolonhesa"). Mas às vezes o Arthur quer trocar **um ingrediente só**: em vez de frango, quer atum em lata. Ou em vez de arroz, quer batata doce. O plano nutricional continua válido — o app recalcula a gramagem do substituto pra bater o mesmo macro.

### Banco de alimentos
350 alimentos com macros por 100g (base TACO) divididos em 3 arquivos:
- `alimentos-proteinas.md` → ~120 itens (aves, bovina, suína, peixes, embutidos, leguminosas)
- `alimentos-carbos.md` → ~115 itens (cereais, tubérculos, pães, frutas, doces, farinhas)
- `alimentos-outros.md` → ~115 itens (gorduras, laticínios, vegetais, molhos, suplementos, bebidas)

No código, viram 3 arquivos `.ts` em `src/data/alimentos/` com um `index.ts` que junta tudo.
O swap filtra por **mesma categoria**: proteína troca por proteína, carboidrato por carboidrato, etc.

### Cálculo
```
gramasSubstituto = gramasOriginal × (macroPrincipal_original / macroPrincipal_substituto)
```

Exemplo: frango (180g, 32P/100g) → atum lata (26.2P/100g):
- Proteína alvo = 180 × 32 / 100 = 57.6g
- Gramas de atum = 57.6 / 26.2 × 100 = **220g**

### Fluxo no app
1. Arthur abre o detalhe da refeição (tela 03, checklist de itens)
2. Toca no **nome** do ingrediente (ex: "Peito frango grelhado")
3. Abre tela de seleção filtrada pela categoria `proteina`
4. Escolhe "Atum em lata"
5. App mostra: **"Atum em lata — 220g"** + preview dos macros recalculados
6. Troca aplicada **só pro dia** (padrão, sem perguntar nada)
7. Na parte inferior da tela, botão discreto: **"Salvar como padrão"**
   - Se tocar: toda refeição futura com esse ingrediente nesse slot já vem com o substituto
   - Se não tocar: amanhã volta o frango normalmente

### UX — sem popup, sem pergunta

O swap de ingrediente NUNCA pergunta "tem certeza?" nem "só hoje ou sempre?". O comportamento padrão é **só hoje**. O botão "Salvar como padrão" fica visível mas discreto na parte inferior — o Arthur usa se quiser, ignora se não quiser. Zero fricção.

### Modelo de dados

```typescript
// Nova tabela no Dexie — dados dinâmicos
interface SubstituicaoPadrao {
  id: string;                 // auto
  slotRefeicaoId: string;     // 'almoco-folga'
  itemOriginalId: string;     // 'frango-peito-grelhado'
  itemSubstitutoId: string;   // 'atum-lata'
  gramasSubstituto: number;   // 220
  ativa: boolean;             // pode desativar sem deletar
  criadaEm: string;           // YYYY-MM-DD
}
```

Quando o app monta a refeição do dia:
1. Busca as substituições ativas para o slot
2. Se encontrar, troca o item na exibição (mostra o substituto em vez do original)
3. Se não encontrar, mostra o item padrão do plano

Para swap **só hoje** (sem salvar como padrão), grava direto no `ItemRegistrado`:

```typescript
interface ItemRegistrado {
  itemId: string;              // 'frango-peito-grelhado' (original do plano)
  gramasReais: number;         // 220 (gramas do substituto)
  substitutoId?: string;       // 'atum-lata' (se houve swap)
  substitutoNome?: string;     // 'Atum em lata' (snapshot pro histórico)
}
```

### Impacto na arquitetura

```
src/data/alimentos/
  index.ts                  ← re-exporta + junta TODOS_ALIMENTOS[]
  proteinas.ts              ← ~120 itens (importa de alimentos-proteinas.md)
  carboidratos.ts           ← ~115 itens (importa de alimentos-carbos.md)
  outros.ts                 ← ~115 itens (importa de alimentos-outros.md)
src/data/
  categorias.ts             ← enum de categorias + mapeamento alimento → categoria

src/db/
  schema.ts                 ← adicionar tabela substituicoesPadrao

src/utils/
  swap-ingrediente.ts       ← NOVO: calcularGramasSubstituto() + filtrar por categoria

src/components/dieta/
  SwapIngredienteModal.tsx  ← NOVO: lista de alimentos da categoria, busca, preview macros
```

### Por que fica no MVP
Arthur pediu explicitamente. É a feature que transforma o app de "seguir um plano rígido" pra "plano flexível que se adapta ao que tem na geladeira". Implementação é simples — regra de três + filtro por categoria + uma tabela extra no Dexie.

---

## 4.8 Extras do dia (item fora do plano)

### O problema que resolve
Às vezes o Arthur come/bebe algo fora do plano (coca-cola, um macarrão extra, um doce). Sem registro, o total do dia fica furado. Com o banco de 350 alimentos já pronto, basta buscar e registrar.

### Fluxo no app
1. Dashboard mostra botão **"+ Extra"** (discreto, abaixo das refeições)
2. Toca → duas opções:
   - **🔍 Buscar por nome** — campo de texto, filtra nos 350 alimentos offline
   - **📷 Escanear código de barras** — abre câmera, lê EAN → consulta Open Food Facts
3. Busca por nome: digita "coca" → aparece "Refrigerante cola (334 kcal/100ml)"
4. Scan: aponta câmera → lê código → Open Food Facts retorna produto + macros
5. Seleciona → stepper de gramas/ml (sugere unidade comum: "1 lata = 350ml")
6. Confirma → item aparece na seção **"Extras do dia"** no Dashboard
7. Macros somam no total do dia automaticamente
8. Pode remover tocando no item → botão "Remover"

### Leitor de código de barras

**Tecnologia:** `html5-qrcode` (lib leve, ~50KB, funciona em PWA com câmera traseira)

**API:** Open Food Facts — 100% gratuita, sem cadastro, sem chave de API
```
GET https://world.openfoodfacts.org/api/v2/product/{ean}
```
Retorna nome do produto + macros por 100g (campos `nutriments.proteins_100g`, `energy-kcal_100g`, etc.)

**Fallback:** se o produto não for encontrado no Open Food Facts:
> "Produto não encontrado. Buscar manualmente?"
→ cai na busca por nome nos 350 alimentos locais

**Requisitos:**
- Precisa de internet no momento do scan (consulta API)
- Câmera traseira (permissão solicitada na primeira vez)
- HTTPS obrigatório (PWA já garante isso)

### UX
- Sem julgamento, sem aviso, sem "tem certeza?"
- A seção "Extras" só aparece se tiver algo — se não comeu nada extra, não ocupa espaço
- Pode adicionar múltiplos extras no mesmo dia

### Modelo de dados

```typescript
// Nova tabela no Dexie
interface ItemExtra {
  id?: number;             // auto-increment
  data: string;            // YYYY-MM-DD (via hoje())
  alimentoId: string;      // 'refrigerante-cola'
  alimentoNome: string;    // 'Refrigerante cola' (snapshot)
  gramas: number;          // 350
  macros: Macros;          // { kcal: 149, p: 0, c: 37, g: 0 } (snapshot calculado)
}
```

### Impacto no Dashboard
O cálculo do total do dia passa a ser:
```
macrosTotalDia = somaRefeicoesFeitasMacros + somaExtrasDodia
```

### Impacto na arquitetura
```
src/db/schema.ts           ← adicionar tabela 'extras'
src/hooks/useExtras.ts     ← NOVO: useLiveQuery dos extras do dia
src/utils/barcode.ts       ← NOVO: scanBarcode() + fetchOpenFoodFacts()
src/components/dieta/
  ExtraButton.tsx           ← NOVO: botão "+ Extra"
  BuscaAlimentoModal.tsx    ← NOVO: modal de busca (reutilizável pelo swap de ingrediente também)
  BarcodeScanner.tsx        ← NOVO: wrapper do html5-qrcode (câmera + leitura)
  ExtrasList.tsx            ← NOVO: lista de extras do dia no Dashboard
```

> **Nota:** o `BuscaAlimentoModal` é reutilizado pelo swap de ingrediente (seção 4.7) — mesma busca, mesmo banco. A diferença é que swap calcula gramas automaticamente, e extras pede gramas manual.

---

## 4.9 Datas — fuso local, nunca UTC

### O bug que evitamos

Brasil é GMT-3. Se Arthur registra uma refeição às 22h do dia 10/abr e o código faz:
```typescript
new Date().toISOString().slice(0, 10)  // ❌ BUG
```
O resultado pode ser `"2026-04-11"` em vez de `"2026-04-10"` — porque `toISOString()` converte pra UTC primeiro (22h BRT = 01h UTC do dia seguinte). O registro vai pro dia errado, e o Dashboard do dia certo não vê a refeição.

### Solução

Todo o app usa **um único helper** em `src/utils/datas.ts`:

```typescript
// src/utils/datas.ts
import { format } from 'date-fns';

/**
 * Retorna a data local de hoje no formato YYYY-MM-DD.
 * NUNCA usar new Date().toISOString() pra isso — ver seção 4.9 do plano.
 */
export function hoje(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatarData(data: Date | string): string {
  const d = typeof data === 'string' ? new Date(data) : data;
  return format(d, 'yyyy-MM-dd');
}
```

**Regra de ouro:** se você ver `new Date()` sendo convertido em string em qualquer arquivo que não seja `utils/datas.ts`, é bug. Code review rápido mental: todos os lugares que gravam `data` no banco passam por `hoje()`.

---

## 5. Estrutura de arquivos

```
Dieta/
├── planejamento/              # ← fonte de verdade em markdown (já existe)
│   ├── perfil.md
│   ├── dieta-folga.md
│   ├── dieta-plantao.md
│   ├── treino.md
│   ├── suplementacao.md
│   └── app-planejamento.md    (este arquivo)
│
├── app/                       # ← código do app web
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── manifest.webmanifest
│   │
│   ├── src/
│   │   ├── main.tsx                    # entry point
│   │   ├── App.tsx                     # root component, rotas
│   │   ├── index.css                   # tailwind base
│   │   │
│   │   ├── data/                       # ← dados estáticos (planos fixos)
│   │   │   ├── tipos.ts                # interfaces TS
│   │   │   ├── perfil.ts
│   │   │   ├── dieta-folga.ts
│   │   │   ├── dieta-plantao.ts
│   │   │   ├── treino-a.ts
│   │   │   ├── treino-b.ts
│   │   │   ├── suplementacao.ts
│   │   │   ├── alimentos/
│   │   │   │   ├── index.ts             # re-exporta tudo + TODOS_ALIMENTOS[]
│   │   │   │   ├── proteinas.ts         # ~120 itens (aves, bovina, suína, peixes, embutidos, leguminosas)
│   │   │   │   ├── carboidratos.ts      # ~115 itens (cereais, tubérculos, pães, frutas, doces, farinhas)
│   │   │   │   └── outros.ts            # ~115 itens (gorduras, laticínios, vegetais, molhos, suplementos, bebidas)
│   │   │   ├── categorias.ts            # enum categorias + mapeamento alimento → categoria
│   │   │   └── compatibilidade-slots.ts  # matriz slot → categorias aceitas (swap)
│   │   │
│   │   ├── db/                         # ← IndexedDB via Dexie
│   │   │   ├── schema.ts
│   │   │   └── queries.ts              # funções de leitura/escrita
│   │   │
│   │   ├── store/                      # ← estado global (Zustand) — SÓ UI efêmera
│   │   │   ├── useDiaStore.ts          # tipo do dia selecionado (persist middleware)
│   │   │   └── useTreinoStore.ts       # treino em andamento (séries ainda não salvas)
│   │   │   # ⚠️ Progresso de macros NÃO fica aqui — é hook derivado via useLiveQuery
│   │   │   #   (evita dois caminhos de atualização e dessincronização)
│   │   │
│   │   ├── hooks/                      # ← hooks customizados
│   │   │   ├── useDiaAtual.ts
│   │   │   ├── useRefeicoesFeitas.ts
│   │   │   ├── useProgressoMacros.ts
│   │   │   └── useTimer.ts
│   │   │
│   │   ├── pages/                      # ← telas
│   │   │   ├── Dashboard.tsx
│   │   │   ├── DietaPage.tsx
│   │   │   ├── TreinoPage.tsx
│   │   │   └── PerfilPage.tsx
│   │   │
│   │   ├── components/                 # ← componentes reutilizáveis
│   │   │   ├── layout/
│   │   │   │   ├── BottomNav.tsx       # nav fixa embaixo (mobile)
│   │   │   │   └── Header.tsx
│   │   │   ├── dieta/
│   │   │   │   ├── RefeicaoCard.tsx
│   │   │   │   ├── OpcaoCard.tsx
│   │   │   │   ├── MacroProgress.tsx
│   │   │   │   ├── SwapModal.tsx         # modal swap de opção inteira
│   │   │   │   ├── SwapIngredienteModal.tsx  # modal swap de ingrediente
│   │   │   │   └── ItemChecklist.tsx     # checklist de itens da opção (toggle)
│   │   │   ├── treino/
│   │   │   │   ├── BlocoTreino.tsx
│   │   │   │   ├── ExercicioCard.tsx
│   │   │   │   ├── SerieInput.tsx
│   │   │   │   └── RestTimer.tsx
│   │   │   └── ui/                     # primitivos
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── ProgressBar.tsx
│   │   │       └── Modal.tsx
│   │   │
│   │   └── utils/
│   │       ├── macros.ts               # soma, cálculos, descontar itens pulados
│   │       ├── swap.ts                 # findSimilarOptions + scoring (swap de opção)
│   │       ├── swap-ingrediente.ts    # calcularGramasSubstituto + filtro categoria
│   │       ├── datas.ts                # formatação brasileira
│   │       └── classnames.ts           # cn() helper
│   │
│   ├── index.html
│   ├── vite.config.ts                  # inclui vite-plugin-pwa
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md
│
└── .gitignore
```

---

## 6. Roteiro de implementação (ordem das tarefas)

Se for implementar passo a passo, essa é a ordem que minimiza retrabalho:

### Fase 0 — Setup (30min)
1. Criar diretório `app/` dentro de `Dieta/`
2. Rodar `npm create vite@latest . -- --template react-ts` em `app/`
3. Instalar Tailwind + configurar
4. Instalar dependências: `dexie`, `dexie-react-hooks`, `zustand`, `react-router-dom`, `lucide-react`, `date-fns`, `date-fns-tz`, `react-hook-form`, `html5-qrcode`
5. Instalar `vite-plugin-pwa` e configurar

### Fase 1 — Dados estáticos + utils (1-2h)
6. Criar `src/data/tipos.ts` com as interfaces
7. Traduzir `dieta-folga.md` → `src/data/dieta-folga.ts` (todas opções com `categoria` preenchida)
8. Traduzir `dieta-plantao.md` → `src/data/dieta-plantao.ts`
9. Traduzir `treino.md` → `src/data/treino-a.ts` e `treino-b.ts`
10. Traduzir `perfil.md` → `src/data/perfil.ts`
11. Criar `src/data/compatibilidade-slots.ts` (matriz slot → categorias aceitas)
12. Criar `src/utils/datas.ts` com `hoje()` e `formatarData()` — **usar sempre**, nunca `new Date().toISOString()` pra data

### Fase 2 — DB e state (1h)
13. Criar `src/db/schema.ts` com Dexie (índice composto `[data+slotRefeicaoId]`)
14. Criar `src/db/queries.ts` com funções de leitura/escrita
15. Criar `useDiaStore` (Zustand com persist — só o tipo do dia selecionado)
16. Criar `useTreinoStore` (treino em andamento, sem persist — só efêmero)

### Fase 3 — Layout e navegação (1h)
17. Criar `BottomNav` (nav fixa embaixo com 4 ícones: Home, Dieta, Treino, Perfil)
18. Criar rotas no `App.tsx`
19. Criar páginas vazias pras 4 seções

### Fase 4 — Dieta básica (3h) — **antes do Dashboard**
> Razão da ordem: o Dashboard consome progresso baseado em refeições feitas. Sem conseguir marcar refeição, o Dashboard fica vazio e não dá pra testar. Fazemos Dieta básica primeiro, Dashboard consome os dados depois.
20. Implementar `RefeicaoCard` com expand
21. Implementar `OpcaoCard` com botão "Fiz essa" (sem swap, sem checklist — só registra opção inteira)
22. Integrar com o banco (marcar/desmarcar, gravando snapshot de `macrosConsumidos`)
23. Criar hook `useProgressoMacros` usando `useLiveQuery` do dexie-react-hooks
24. Testar: marcar e desmarcar uma refeição padrão, confirmar persistência após reload

### Fase 5 — Dashboard (2h)
25. Implementar seletor de tipo de dia (folga/plantão) — salva no `useDiaStore`
26. Implementar barra de progresso de macros do dia (consome `useProgressoMacros`)
27. Implementar "próxima refeição" baseado no horário atual

### Fase 6 — Dieta avançada: swap de opção + checklist (3-4h)
28. Decompor cada opção de refeição em `ItemOpcao[]` com macros próprios (refactor de `src/data/dieta-folga.ts` e `dieta-plantao.ts`)
29. Implementar `ItemChecklist` (linhas tocáveis, default todas marcadas, vibração 20ms ao toggle)
30. Implementar tela de detalhe `/dieta/:slot/:opcao` consumindo `ItemChecklist` + macros recalculados ao vivo
31. Persistir `itensRegistrados` (gramagens reais, opcional) + `macrosConsumidos` recalculado no `RefeicaoFeita`
32. Implementar `calcularScore` e `findSimilarOptions` em `src/utils/swap.ts`
33. Implementar `SwapModal` com resultados ordenados + estado vazio + botão "afrouxar tolerância"
34. Integrar swap com o registro (gravando `opcaoOrigemSlot` + `opcaoOrigemDieta`)
35. Testar: marcar opção inteira (caminho rápido), tirar item específico (caminho ajustado), buscar similar

### Fase 6.5 — Swap de ingrediente (2-3h)
36. Criar `src/data/alimentos/` com 3 arquivos (proteinas.ts, carboidratos.ts, outros.ts) + index.ts — 350 alimentos total
37. Criar `src/utils/swap-ingrediente.ts` com `calcularGramasSubstituto()` e filtro por categoria
38. Implementar `SwapIngredienteModal` — lista filtrada por categoria, busca por nome, preview de macros
39. Integrar swap na tela de detalhe (toque no nome do item → abre modal)
40. Implementar "Salvar como padrão" — tabela `substituicoesPadrao` no Dexie + botão inferior discreto
41. Carregar substituições ativas ao montar refeição do dia (merge com plano estático)
41b. Implementar `BuscaAlimentoModal` (busca texto nos 350 alimentos, reutilizado por swap + extras)
41c. Implementar `BarcodeScanner` com `html5-qrcode` + fetch Open Food Facts API
41d. Implementar botão "+ Extra" no Dashboard (busca por nome + scan código de barras)
41e. Implementar `ExtrasList` + tabela `extras` no Dexie
41f. Integrar extras no cálculo de macros total do dia

### Fase 7 — Treino (4-5h)
42. Implementar lista de exercícios por bloco
43. Implementar `SerieInput` (stepper +/− pra carga e reps, long-press = +5)
44. Implementar `RestTimer` (32px topo, vibração + som opcional)
45. Implementar "Finalizar treino" (persiste todas as séries de uma vez)
46. Implementar tela `/treino/exercicio/:id/historico` (Progressão de Carga) — view pura sobre `treinosFeitos` filtrado por `exercicioId`, com PR card + lista cronológica reversa

### Fase 8 — Perfil + Histórico (2h)
47. Tela estática com dados do perfil
48. Modal "Registrar peso de hoje" (sheet) — stepper ±0.1/±0.5
49. Histórico simples de peso (tabela ou lista)
50. Tela `/historico` — calendário mensal com dots por dia (refeições + treino) e summary stats no rodapé

### Fase 9 — PWA e deploy (1h)
51. Gerar ícones (192 + 512)
52. Configurar manifest (`name: "Plano A"`, `short_name: "PlanoA"`)
53. Testar instalação no celular
54. Deploy na Vercel

**Total estimado:** 22-28h de trabalho pra ter um MVP funcional (inclui swap de opção, swap de ingrediente, extras + barcode scanner, checklist de itens, progressão de carga e calendário).

### Ordem de execução resumida
```
Setup → Dados estáticos → DB/State → Layout vazio
  → Dieta básica (marca/desmarca opção inteira) → Dashboard (consome progresso)
  → Dieta avançada (swap opção + checklist) → Swap ingrediente
  → Treino + Progressão de carga
  → Perfil + Histórico (calendário) → PWA/Deploy
```
Cada fase fecha com algo testável de ponta a ponta. Nada de "tela que depende de tela que ainda não existe".

---

## 7. Decisões confirmadas ✅

| # | Decisão | Escolha |
|---|---------|---------|
| Q1 | Stack | ✅ **Vite + React + TS + Tailwind + Dexie + PWA** (conforme seção 2) |
| Q2 | Detecção folga/plantão | ✅ **Manual** — botão "hoje é folga/plantão" no dashboard |
| Q3 | Edição de quantidades | ✅ **Checklist + gramagem editável** — stepper ±5/±10g por item. Swap de ingrediente individual com cálculo automático de gramas. |
| Q4 | Nome do app | ✅ **Plano A** (display name do PWA, HTML title, splash) |
| Q5 | Review técnica | ✅ Rodar `plan-eng-review` antes de implementar |

### Sobre Q4
- Diretório do projeto permanece `Dieta/` (repo)
- Subdiretório do código: `Dieta/app/`
- Display name (PWA / HTML title / manifest): **"Plano A"**
- `package.json name`: `plano-a`

---

## 8. O que NÃO vamos fazer

Lista explícita pra não entrar na tentação de feature creep:

- ❌ Sistema de login (uso pessoal, não precisa)
- ❌ Backend (IndexedDB resolve)
- ❌ Sync entre dispositivos (fica pra v2)
- ❌ Social/compartilhamento (é uso pessoal)
- ~~❌ Calculadora de macros por alimento~~ → ✅ Promovido: banco de 350 alimentos com macros TACO + swap de ingrediente
- ~~❌ Banco de alimentos editável~~ → ✅ Promovido: 350 itens estáticos + scan código de barras via Open Food Facts
- ❌ Animações sofisticadas (transições simples do Tailwind resolvem)
- ❌ Testes unitários no MVP (é uso pessoal — testa manual até v1.0 estabilizar)
- ❌ CI/CD complexo (Vercel faz deploy automático do Git, chega)
