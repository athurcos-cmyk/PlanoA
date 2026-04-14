# Docs do Projeto

Esta pasta organiza o contexto documental do `Plano A`.

## Ordem de leitura recomendada

### 1. Contexto rapido

Leia primeiro:

- [PROJECT_CONTEXT.md](C:/Users/Thurcos/Desktop/Dieta/app/PROJECT_CONTEXT.md)

Esse arquivo e o resumo executivo do projeto. Ele explica:

- o que o app faz
- stack
- arquitetura
- fluxos principais
- persistencia
- estado atual da implementacao
- relacao entre planejamento e codigo

Se um novo chat for ler apenas um arquivo, este deve ser o arquivo principal.

### 2. Planejamento detalhado

Depois, consulte:

- [planejamento/app-planejamento.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/app-planejamento.md)

Esse arquivo traz:

- filosofia do produto
- escopo do MVP
- roadmap por fases
- decisoes de arquitetura
- estrutura conceitual original do app

### 3. Design system

Para UI e frontend, consulte:

- [planejamento/design-system.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/design-system.md)

Esse e o norte visual do projeto.

### 4. Fontes de dominio

Arquivos de apoio:

- [planejamento/dieta-folga.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/dieta-folga.md)
- [planejamento/dieta-plantao.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/dieta-plantao.md)
- [planejamento/treino.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/treino.md)
- [planejamento/perfil.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/perfil.md)
- [planejamento/suplementacao.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/suplementacao.md)
- [planejamento/alimentos-proteinas.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/alimentos-proteinas.md)
- [planejamento/alimentos-carbos.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/alimentos-carbos.md)
- [planejamento/alimentos-outros.md](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/alimentos-outros.md)

### 5. Mockups

Mockup navegavel:

- [planejamento/mockups/index.html](C:/Users/Thurcos/Desktop/Dieta/app/docs/planejamento/mockups/index.html)

## Regra pratica

- `PROJECT_CONTEXT.md` = contexto-base para qualquer novo chat
- `docs/planejamento/` = fonte detalhada para produto, design e roadmap

## Estado operacional atual

Para a proxima sessao, assumir como verdade:

- a parte central do app e a dieta
- a dieta foi auditada recentemente
- o catalogo central de alimentos e a fonte de verdade nutricional
- o swap de refeicao e o swap de ingrediente ja existem e estao funcionais, mas devem ser preservados com cuidado

Arquivos-chave para qualquer manutencao nessa area:

- [src/data/alimentos/index.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/alimentos/index.ts)
- [src/data/dieta-folga.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/dieta-folga.ts)
- [src/data/dieta-plantao.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/dieta-plantao.ts)
- [src/utils/swap.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/swap.ts)
- [src/utils/swap-ingrediente.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/swap-ingrediente.ts)
- [src/utils/quantidade.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/quantidade.ts)

Antes de encerrar qualquer sessao que mexa em dieta ou swap, rodar:

- `npm run check:dieta`
- `npm run audit:dieta`
- `npm run build`
