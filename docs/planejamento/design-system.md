# Plano A — Design System

Fonte de verdade visual do app.

## Revisão

### Leitura crítica do tema antigo

- `Adequação ao produto`: `5/10`
  O tema escuro com vermelho passava mais sensação de intensidade, alerta e brutalismo do que de saúde diária.
- `Clareza móvel`: `7/10`
  Era legível, mas visualmente pesado para um app de rotina alimentar.
- `Coerência emocional`: `4/10`
  O app ajuda com comida, treino, constância e bem-estar. O visual antigo parecia mais “modo guerra” do que “vida saudável organizada”.
- `Aplicabilidade`: `9/10`
  O sistema de tokens já estava bem estruturado e permitia migração sem refatoração massiva.

### Direção aprovada

Migrar para um visual `clean health`:

- base clara
- verde natural como acento principal
- texto em verde escuro/cinza botânico
- superfícies suaves, sem cara de SaaS genérico
- clima de saúde, rotina, limpeza e leveza

## Identidade

### O app deve parecer

- um caderno de rotina saudável bem cuidado
- um painel pessoal de acompanhamento
- um produto simples, confiável e respirável

### O app não deve parecer

- sistema hospitalar frio
- dashboard SaaS escuro
- app fitness agressivo com vermelho dominante
- produto “premium glossy” ou genérico demais

## Paleta

### Tokens principais

```css
:root {
  --color-bg: #F7FAF5;
  --color-surface: #FFFFFF;
  --color-surface-2: #EEF5EE;
  --color-surface-3: #E2ECE3;

  --color-ink: #163222;
  --color-ink-2: #4F6A58;
  --color-ink-3: #7C9483;

  --color-border: #C8D8CB;
  --color-border-soft: #DCE7DD;

  --color-accent: #2F7D4A;
  --color-accent-soft: #DDF3E4;
  --color-accent-darker: #25663C;

  --color-green: #4D9F68;
  --color-done: #4D9F68;
  --color-warn: #D89B2B;
  --color-over: #C94B4B;
}
```

### Regras de uso

- `accent` é ação principal, seleção e foco
- `green` é confirmação, concluído e progresso positivo
- `warn` é atenção
- `over` é excesso real ou erro
- vermelho deixa de ser cor de marca

## Tipografia

### Direção

- texto humano, limpo e simples
- números continuam fortes e legíveis
- sem dramatização visual

### Sistema aplicado agora

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

Mantemos essas fontes por estabilidade. Uma futura revisão pode testar `Plus Jakarta Sans` ou `Nunito Sans`, mas isso não é bloqueador para a nova identidade.

## Componentes

### Fundo

- fundo geral claro em `bg`
- cards em `surface`
- cards secundários em `surface-2`
- áreas táteis ou controles compactos em `surface-3`

### Botões

- CTA principal: `bg-accent` com texto branco
- CTA positivo/secundário forte: `bg-green` com texto branco
- botões neutros: `surface-2` com `ink`

### Cards

- sombra mínima ou ausente
- contraste por superfície e borda leve
- raio suave, sem exagero

### Estados

- refeição feita: verde suave
- treino em andamento: verde suave ou borda em acento
- item ativo/selecionado: `accent-soft` + `accent`
- feedback crítico: vermelho só quando realmente necessário

## Motion

- animações curtas e discretas
- nada chamativo
- mobile-first
- respeitar `prefers-reduced-motion`

## Regras práticas

- ações importantes devem parecer convidativas, não agressivas
- saúde aqui significa clareza e leveza, não fragilidade
- números precisam continuar fortes para macros, calorias e carga
- tudo deve continuar fácil de ler em tela pequena

## Aplicação inicial

Nesta fase, a migração visual foca em:

1. tokens globais
2. contraste de botões principais
3. badges, estados e superfícies
4. consistência entre Dashboard, Dieta, Treino, Histórico e Perfil

## Checklist

- [ ] o app parece claro, limpo e respirável
- [ ] a cor principal remete a saúde e natureza
- [ ] botões de ação têm contraste suficiente
- [ ] componentes continuam legíveis no celular
- [ ] vermelho não domina mais a identidade
- [ ] treino e dieta ainda parecem parte do mesmo produto
