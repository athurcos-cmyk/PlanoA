# Project Context: Plano A

## Versao Atual

O projeto pode ser tratado oficialmente como **v1.0.0**.

## Visao Geral

`Plano A` e um app PWA pessoal de dieta e treino, pensado para uso diario no celular, com foco em:

- seguir um plano alimentar com duas rotinas (`folga` e `plantao`)
- registrar refeicoes realmente consumidas, inclusive com ajustes de gramagem e trocas
- registrar treino A/B em casa, com series feitas e timer de descanso
- acompanhar historico de aderencia, treinos e peso

O app e totalmente client-side e offline-first. Os dados persistem localmente no navegador via IndexedDB usando Dexie.

## Planejamento

Existe agora uma pasta de planejamento dentro do app:

- `C:\Users\Thurcos\Desktop\Dieta\app\docs\planejamento`

Ela complementa o codigo com a visao original de produto, design, escopo de MVP e roadmap.

Arquivos mais importantes dessa pasta:

- `app-planejamento.md`
- `design-system.md`
- `dieta-folga.md`
- `dieta-plantao.md`
- `treino.md`
- `perfil.md`
- `suplementacao.md`
- `alimentos-proteinas.md`
- `alimentos-carbos.md`
- `alimentos-outros.md`
- `mockups/index.html`

## Stack

- React 19
- TypeScript
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Zustand
- Dexie + dexie-react-hooks
- `vite-plugin-pwa`
- `html5-qrcode` para leitura de codigo de barras

Arquivos principais de setup:

- [package.json](C:/Users/Thurcos/Desktop/Dieta/app/package.json)
- [vite.config.ts](C:/Users/Thurcos/Desktop/Dieta/app/vite.config.ts)
- [src/main.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/main.tsx)
- [src/App.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/App.tsx)

## Estrutura Geral

### Rotas

Definidas em [src/App.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/App.tsx):

- `/` -> dashboard
- `/dieta` -> lista de refeicoes do dia atual
- `/dieta/:slotId/:opcaoId` -> detalhe e registro da opcao escolhida
- `/treino` -> lista de treinos A/B
- `/treino/ativo` -> sessao de treino em andamento
- `/treino/exercicio/:exercicioId` -> progressao de carga por exercicio
- `/historico` -> calendario e aderencia
- `/perfil` -> dados pessoais, metas e peso

### Pastas principais

- `src/data`: plano alimentar, treinos e perfil estaticos
- `src/db`: schema Dexie e consultas
- `src/stores`: estado de `tipoDia` e treino ativo
- `src/hooks`: hooks de composicao para dia atual, macros, extras, refeicoes e timer
- `src/pages`: telas principais
- `src/components`: blocos de UI por dominio
- `src/utils`: funcoes auxiliares de data, macros e swaps

## Modelo de Produto

O planejamento deixa claro alguns principios de produto que ajudam a interpretar o projeto:

- mobile-first real
- uso com uma mao
- funcionamento offline
- zero login
- persistencia local
- simplicidade acima de sofisticacao
- foco em execucao rapida da rotina

### Dieta

O app trabalha com dois tipos de dia:

- `folga`
- `plantao`

Cada tipo de dia possui uma dieta estatica com:

- slots de refeicao
- horario
- macros alvo por slot
- multiplas opcoes por refeicao
- itens com gramagem planejada e macros por 100g

Arquivos fonte:

- [src/data/dieta-folga.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/dieta-folga.ts)
- [src/data/dieta-plantao.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/dieta-plantao.ts)

Fluxo principal:

1. o usuario escolhe ou alterna o `tipoDia`
2. a tela de dieta mostra os slots daquele dia
3. o usuario entra em uma opcao
4. pode ajustar gramagem real de cada item
5. pode trocar a opcao inteira
6. pode trocar ingrediente individualmente
7. registra o consumo
8. os macros consumidos entram no progresso diario

Tambem existem `extras`, que sao alimentos fora do plano adicionados ao dia.

Pontos endurecidos na dieta para uso real:

- valores-base dos alimentos principais foram alinhados ao catalogo e mantidos por `100g` do alimento pronto/cozido
- swaps de proteina agora continuam mostrando alternativas praticas como `ovo inteiro`, evitando sugerir `clara` como troca padrao por baixa aderencia e desperdicio de gema
- o score de swap de ingrediente foi suavizado para nao zerar trocas praticas como `frango -> ovo inteiro` so por diferenca grande de gordura/caloria
- itens como arroz e feijao passaram a exibir contexto de medida caseira no app para reduzir confusao com gramagem
- a gramagem exibida continua sendo o peso real na balanca; o texto extra serve apenas como contexto visual
- os almocos de `folga` e `plantao` agora incluem uma opcao com ovos (`arroz + feijao + ovos + atum`) para aparecer tambem na troca da refeicao inteira
- o catalogo de extras foi ampliado com frutas comuns como `laranja`, `caqui`, `mamao`, `manga`, `melancia`, `abacaxi`, `tangerina` e `pera`
- a base do frango foi deixada mais conservadora na proteina para uso real do app, e os almocos/jantares tiraram o azeite explicito em favor de refeicoes mais faceis de executar
- a base do ovo inteiro tambem foi normalizada para uma media conservadora operacional, evitando contar ~7g de proteina por ovo quando o uso real pode ficar mais perto de ~6g
- numa auditoria mais pesada dos alimentos realmente usados na dieta, `atum em agua drenado` e `peru fatiado` tambem foram alinhados para a faixa conservadora/media do planejamento

### Treino

O app possui dois treinos fixos:

- `Treino A`: upper
- `Treino B`: lower

Arquivos:

- [src/data/treino-a.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/treino-a.ts)
- [src/data/treino-b.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/treino-b.ts)

Cada treino e dividido em blocos e exercicios, com:

- numero de series
- faixa de repeticoes alvo
- carga sugerida
- notas de execucao
- descanso
- alguns bi-sets

Fluxo principal:

1. a tela de treinos sugere A ou B com base no menos recente
2. iniciar treino salva estado temporario no Zustand
3. cada serie registrada entra em `seriesFeitas`
4. apos registrar serie, o timer de descanso pode iniciar automaticamente
5. ao finalizar, o treino vira snapshot persistido no IndexedDB

A implementacao foi endurecida para uso real:

- o treino ativo agora persiste localmente entre refresh, fechamento e reabertura do app
- a lista de treinos mostra `CONTINUAR TREINO` quando existe sessao em andamento
- entrar em um treino sem registrar nenhuma serie nao deve prender o usuario naquele treino
- ao voltar sem series feitas, a sessao ativa deve ser cancelada automaticamente
- o estado temporario do treino fica separado do historico final salvo no Dexie

O planejamento tambem deixa clara a intencao da area de treino:

- sugerir automaticamente A ou B
- facilitar registro rapido de series
- usar timer de descanso com vibracao
- mostrar progressao de carga por exercicio
- respeitar a realidade de treino em casa com equipamento limitado

### Historico e Perfil

Historico:

- calendario mensal
- pontos para refeicoes e treino por dia
- streak
- aderencia no mes
- detalhe do dia selecionado

Perfil:

- dados pessoais estaticos
- metas de macros
- TMB e GET
- registro de peso
- lista de equipamentos disponiveis

## Modelo de Dados

Arquivo central:

- [src/data/tipos.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/tipos.ts)

Tipos mais importantes:

- `Macros`
- `TipoDia`
- `SlotRefeicao`
- `OpcaoRefeicao`
- `ItemOpcao`
- `Treino`
- `BlocoTreino`
- `Exercicio`
- `RefeicaoFeita`
- `TreinoFeito`
- `PesoRegistro`
- `ItemExtra`
- `SubstituicaoPadrao`

Separacao importante:

- `data/*` guarda o plano estatico
- Dexie guarda a execucao real do usuario

Isso deixa o app simples: o plano e declarativo, e o historico e o que foi de fato consumido ou treinado.

## Persistencia

Banco local:

- [src/db/schema.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/db/schema.ts)

Tabelas:

- `refeicoes`
- `treinos`
- `pesos`
- `extras`
- `substituicoes`

Consultas principais:

- [src/db/queries.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/db/queries.ts)

Comportamentos importantes:

- registrar refeicao substitui o registro anterior do mesmo `slot` no mesmo dia
- registrar peso atualiza o mesmo dia se ja existir
- extras sao somados separadamente
- substituicao padrao de ingrediente esta integrada ao fluxo de registro da dieta

Observacao importante vinda do planejamento:

- a logica diaria de datas deve usar data local, nunca `toISOString()`
- o helper central para isso e [src/utils/datas.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/datas.ts)

## Estado em Memoria

### Tipo de dia

- [src/stores/useDiaStore.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/stores/useDiaStore.ts)

Persistido com Zustand em `localStorage`:

- `tipoDia`
- `setTipoDia`
- `toggleTipoDia`

### Treino ativo

- [src/stores/useTreinoStore.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/stores/useTreinoStore.ts)

Mantem:

- treino ativo (`A` ou `B`)
- series registradas na sessao
- timestamp de inicio

Observacao importante:

- esse estado agora e persistido localmente com Zustand `persist`
- refresh e fechamento da aba nao devem mais apagar a sessao de treino em andamento

## Estado Atual da Dieta

O nucleo da dieta foi auditado e endurecido para evitar inconsistencias entre:

- tabela central de alimentos
- macros exibidos nas opcoes da dieta
- calculo real de macros no app
- exibicao de unidade caseira no checklist e nos swaps

Arquivos principais envolvidos:

- [src/data/alimentos/index.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/alimentos/index.ts)
- [src/data/dieta-folga.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/dieta-folga.ts)
- [src/data/dieta-plantao.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/data/dieta-plantao.ts)
- [src/utils/macros.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/macros.ts)
- [src/utils/quantidade.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/quantidade.ts)

Pontos importantes para a proxima sessao:

- a fonte de verdade nutricional operacional e `src/data/alimentos/index.ts`
- os arquivos `dieta-folga.ts` e `dieta-plantao.ts` ja foram sincronizados com o catalogo
- em alimentos com variacao comum entre cru/cozido ou por preparo, o app deve preferir media conservadora em vez da ponta alta
- o app nao deve mais mostrar algo como `1 ovo` quando estiver calculando `150g`; a exibicao de unidade caseira foi corrigida
- o pos-treino de folga foi revisado para ter so um shake e duas opcoes solidas mais coerentes com o alvo do slot

## Scripts de Validacao

Foram adicionados scripts para apoiar manutencao da dieta:

- `npm run check:dieta`
  verifica consistencia entre dieta e catalogo
  valida correspondencia de itens, medidas caseiras e divergencia de macros

- `npm run sync:dieta`
  sincroniza `macrosPor100g` dos arquivos da dieta com o catalogo central

- `npm run audit:dieta`
  audita cada uma das 3 opcoes de cada refeicao contra o alvo do slot e classifica em `ok`, `ajuste` ou `fora`

Esses scripts devem ser rodados sempre que alguem mexer em:

- `src/data/alimentos/index.ts`
- `src/data/dieta-folga.ts`
- `src/data/dieta-plantao.ts`

## Estado Atual do Swap

### Swap de refeicao inteira

O swap de refeicao inteira esta funcional e hoje:

- compara com a opcao atual, nao apenas com o alvo generico do slot
- prioriza mesma dieta e mesmo slot
- respeita compatibilidade de categoria e janela de horario

Arquivos:

- [src/utils/swap.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/swap.ts)
- [src/components/dieta/SwapModal.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/components/dieta/SwapModal.tsx)

### Swap de ingrediente

O swap de ingrediente tambem esta funcional e foi endurecido para evitar trocas semanticas ruins.

Hoje ele:

- calcula gramagem aproximada pelo macro principal
- usa score de similaridade
- filtra por categoria
- filtra por grupos de compatibilidade mais humanos, como:
  `fruta`, `pao`, `carbo-amido`, `laticinio-liquido`, `queijo-creme`, `proteina-principal`, `ovo`
- descarta sugestoes muito fracas

Arquivos:

- [src/utils/swap-ingrediente.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/utils/swap-ingrediente.ts)
- [src/components/dieta/SwapIngredienteModal.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/components/dieta/SwapIngredienteModal.tsx)

Exemplos de comportamento esperado apos os ajustes:

- `arroz branco` tende a sugerir `batata`, `batata doce`, `mandioca`, `tapioca`, `cuscuz`
- `iogurte natural` tende a sugerir `leite desnatado` ou `leite em po desnatado`
- o sistema deve evitar aberrações como `arroz -> banana` ou `iogurte -> achocolatado`

## Observacao de Produto

Nem toda opcao precisa bater o alvo do slot com perfeicao matematica.

Regra atual mais util:

- `ok` = boa proximidade nutricional
- `ajuste` = aceitavel na vida real
- `fora` = merece revisao se atrapalhar muito o papel funcional da refeicao

O objetivo do projeto nao e montar uma dieta de laboratorio, e sim uma dieta gostosa, pratica e sustentavel que continue coerente no app.

Ao finalizar:

- calcula duracao em minutos
- limpa o estado temporario
- retorna payload para persistencia

## Hooks Importantes

- [src/hooks/useDiaAtual.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/hooks/useDiaAtual.ts)
  Resolve `tipoDia` atual e entrega a dieta correspondente.

- [src/hooks/useRefeicoesFeitas.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/hooks/useRefeicoesFeitas.ts)
  Le refeicoes feitas de uma data.

- [src/hooks/useProgressoMacros.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/hooks/useProgressoMacros.ts)
  Soma macros de refeicoes + extras do dia.

- [src/hooks/useExtras.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/hooks/useExtras.ts)
  Busca extras do dia.

- [src/hooks/useTimer.ts](C:/Users/Thurcos/Desktop/Dieta/app/src/hooks/useTimer.ts)
  Timer de descanso com vibracao ao terminar.

## Telas Principais

### Dashboard

- [src/pages/Dashboard.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/Dashboard.tsx)

Responsabilidades:

- mostrar progresso de macros do dia
- identificar proxima refeicao com base no horario atual
- mostrar contagem de refeicoes feitas
- indicar se ja houve treino no dia
- listar extras
- servir como home operacional do app

### Dieta

- [src/pages/dieta/DietaPage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/dieta/DietaPage.tsx)
- [src/pages/dieta/OpcaoDetalhePage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/dieta/OpcaoDetalhePage.tsx)

`DietaPage` lista os slots do dia.

`OpcaoDetalhePage` e o centro do fluxo alimentar:

- busca o slot e a opcao pela rota
- inicializa os itens registrados com a gramagem do plano
- recalcula macros em tempo real
- permite trocar a opcao inteira
- permite trocar ingrediente individual
- salva a refeicao feita no banco

Observacao importante:

- o detalhe de opcao importa diretamente `DIETA_FOLGA` e `DIETA_PLANTAO`, em vez de usar um servico unico de resolucao

O planejamento mostra que a dieta e o verdadeiro coracao do produto. A ambicao funcional dessa area inclui:

- registrar em um toque quando comeu o plano como esta
- checklist de itens
- ajuste de gramagem por item
- swap de opcao inteira
- swap de ingrediente individual
- extras fora do plano
- leitura de codigo de barras

### Treino

- [src/pages/treino/TreinoListPage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/treino/TreinoListPage.tsx)
- [src/pages/treino/TreinoAtivoPage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/treino/TreinoAtivoPage.tsx)
- [src/pages/treino/ProgressaoCargaPage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/treino/ProgressaoCargaPage.tsx)

`TreinoListPage`:

- mostra A e B
- indica qual seria o proximo treino recomendado
- puxa ultimo treino de cada tipo do Dexie
- prioriza continuar a sessao atual quando existe treino em andamento

`TreinoAtivoPage`:

- usa o treino ativo do store
- registra series
- controla descanso
- confirma encerramento
- persiste snapshot final

O treino tambem ganhou suporte melhor para instrucao dentro do proprio app:

- o `?` dos exercicios abre um mini tutorial em modal
- cada tutorial traz `como fazer`, `onde sentir`, `erros comuns` e `adaptacao em casa`
- isso foi pensado para reduzir dependencia de procurar execucao no meio do treino

### Historico

- [src/pages/HistoricoPage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/HistoricoPage.tsx)

Responsabilidades:

- montar calendario do mes
- agregar refeicoes, treinos e peso por data
- calcular streak
- calcular aderencia mensal
- detalhar o dia selecionado

### Perfil

- [src/pages/PerfilPage.tsx](C:/Users/Thurcos/Desktop/Dieta/app/src/pages/PerfilPage.tsx)

Responsabilidades:

- exibir metadados do perfil
- exibir metas diarias
- registrar peso atual
- mostrar equipamento disponivel
- reforcar que os dados ficam locais no navegador

## Componentes de Dominio

### Dieta

Principais:

- `RefeicaoCard`
- `OpcaoCard`
- `ItemChecklist`
- `SwapModal`
- `SwapIngredienteModal`
- `ExtraButton`
- `ExtrasList`
- `MacroProgress`
- `BarcodeScanner`
- `BuscaAlimentoModal`

### Treino

Principais:

- `BlocoTreino`
- `ExercicioCard`
- `SerieInput`
- `RestTimer`

### Layout

- `Header`
- `BottomNav`

## PWA

Configurado em [vite.config.ts](C:/Users/Thurcos/Desktop/Dieta/app/vite.config.ts):

- `registerType: 'autoUpdate'`
- app em modo `standalone`
- orientacao `portrait`
- nome: `Plano A`

O fluxo de atualizacao do app instalado tambem foi reforcado:

- o app checa atualizacoes em segundo plano
- caches antigos sao limpos pelo service worker
- quando existe nova versao, o app pode avisar e atualizar sem exigir apagar historico ou limpar cache manualmente

Isso reforca a intencao de uso como app pessoal mobile-first.

## Design System Planejado

O arquivo externo `design-system.md` define uma direcao visual forte:

- visual "brutalist atletico"
- tipografia forte
- numeros em mono
- poucos acentos de cor
- toque grande
- pouca decoracao
- evitar visual generico de dashboard SaaS

Esse design system esta mais definido e mais rigido do que a UI atual do codigo. Ele deve ser tratado como norte para futuras melhorias visuais.

Tambem existem mockups em:

- `C:\Users\Thurcos\Desktop\Dieta\app\docs\planejamento\mockups\index.html`

## Decisoes Arquiteturais Boas

- dados do plano separados dos registros reais
- Dexie adequado para uso offline e historico local
- Zustand so para estado pequeno e transitivo
- hooks simples para composicao de dados do dia
- fluxo de dieta e treino muito alinhado ao uso pratico

Mais decisoes boas descritas no planejamento:

- MVP sem backend
- PWA instalavel como app pessoal
- dados estaticos no codigo e execucao real no banco
- arquitetura simples o suficiente para evoluir sem custo operacional

## Pontos de Atencao

### 1. Encoding

Ha sinais claros de problema de encoding em varios arquivos:

- `proteÃ­na`
- `PlantÃ£o`
- `Â·`

Isso sugere que parte do projeto nao esta em UTF-8 limpo.

### 2. README

O [README.md](C:/Users/Thurcos/Desktop/Dieta/app/README.md) provavelmente ainda nao documenta o produto real de forma suficiente.

### 3. Rota de progressao

Existe a rota `/treino/exercicio/:exercicioId`, mas eu nao reli o conteudo da tela de progressao nesta passada. Se essa tela for central, vale detalhar melhor depois.

### 4. Persistencia parcial de escolhas

O schema suporta `substituicoes`, mas o fluxo atual parece mais orientado ao registro pontual da refeicao do que a um sistema forte de substituicao persistente reaplicavel.

### 5. Dados muito estaticos

Hoje o app depende bastante de arquivos de dados hardcoded para dieta, treino e perfil. Isso simplifica bastante, mas futuras evolucoes podem exigir:

- editor interno
- import/export
- versionamento do plano
- separacao mais forte entre plano atual e historico de planos

### 6. Diferenca entre planejamento e implementacao

O planejamento e mais ambicioso e detalhado do que a implementacao atual em alguns pontos:

- design system mais rigoroso
- roadmap detalhado por fases
- base de alimentos muito mais ampla
- regras mais fortes de swap e compatibilidade
- extras e barcode scanner mais explicitamente desenhados
- progressao de carga mais central na experiencia

Isso nao e um problema. Significa apenas que o codigo atual representa uma implementacao parcial do norte definido na pasta `planejamento`.

## Follow-up Marcado

Foi combinado fazer uma reavaliacao do treino em **14 de maio de 2026**.

Objetivos dessa reavaliacao:

- revisar adaptacao ao `Treino A/B` apos cerca de 4 semanas de execucao real
- confirmar se o volume de bracos continua suficiente com `1` exercicio direto de biceps e `1` de triceps, ambos com `3 series`
- revisar principalmente a resposta de costas no `Treino A`, com foco na combinacao `remada serrote + puxada alta com elastico`
- checar se algum exercicio ficou ruim logisticamente no ambiente de casa e ajustar com o menor numero possivel de trocas

Se uma nova sessao for aberta depois dessa data, usar este ponto como lembrete operacional.

## Pasta de Planejamento

A pasta de planejamento agora tambem existe dentro do workspace do app:

- `C:\Users\Thurcos\Desktop\Dieta\app\docs\planejamento`

Essa e a organizacao que eu mais recomendo.

Beneficios:

- o contexto fica junto do codigo
- novos chats enxergam tudo no mesmo workspace
- fica mais facil manter docs e implementacao sincronizados
- reduz a chance de esquecer contexto importante fora da pasta do app

Observacao:

- a pasta antiga em `C:\Users\Thurcos\Desktop\Dieta\planejamento` ainda existe neste momento como copia/origem
- a copia dentro de `app\docs\planejamento` ja esta pronta para uso nas proximas conversas

## O que o Planejamento Adiciona

Resumo do que a pasta `planejamento` acrescenta ao entendimento do projeto:

- filosofia real de uso do app
- justificativa da stack
- design system desejado
- escopo do MVP
- roadmap de implementacao por fases
- base alimentar expandida
- regras de treino e progressao
- diretrizes de suplementacao, hidratacao e sono
- mockups e estrutura conceitual mais completa

## O que eu nao comparei a fundo ainda

- se todos os dados de dieta e treino no codigo batem 100% com os markdowns de planejamento
- se toda a base de alimentos planejada ja esta refletida em `src/data/alimentos`
- o mockup HTML em detalhe visual linha a linha

## Melhor forma de usar este arquivo em novos chats

Se voce abrir uma nova conversa, pode me mandar algo como:

- "leia o PROJECT_CONTEXT.md e continue daqui"
- "considere o PROJECT_CONTEXT.md como contexto-base"

Arquivo de referencia:

- [PROJECT_CONTEXT.md](C:/Users/Thurcos/Desktop/Dieta/app/PROJECT_CONTEXT.md)
