import type { Treino } from './tipos'

export const TREINO_B: Treino = {
  id: 'B',
  nome: 'Treino B',
  subtitulo: 'Lower | Quadriceps / Posterior / Gluteo / Panturrilha',
  duracaoMin: '45-60',
  blocos: [
    {
      id: 'b-bloco1',
      nome: 'Quadriceps e unilateral',
      exercicios: [
        {
          id: 'agachamento-goblet',
          nome: 'Agachamento goblet',
          series: 4,
          repsAlvo: '8-12',
          cargaKg: 24,
          nota: 'Segurar no peito. Se ficar leve, usar pausa de 1s no fundo.',
          tutorial: {
            objetivo: 'Quadriceps, gluteo e tronco em um padrao basico de agachar.',
            execucao: [
              'Segure a carga na frente do peito com cotovelos apontando para baixo.',
              'Afaste os pes numa base confortavel e sente entre as pernas.',
              'Desca ate onde conseguir sem perder postura.',
              'Suba empurrando o chao e mantendo abdomen firme.',
            ],
            sentir: [
              'Coxa da frente e gluteo trabalhando juntos.',
            ],
            erros: [
              'Cair para frente e perder o tronco.',
              'Deixar joelho fechar para dentro.',
              'Descer sem controle e quicar no fundo.',
            ],
            adaptacoes: [
              'Se a carga ficar leve, use pausa de 1 segundo no fundo.',
              'Se faltar mobilidade, use base um pouco mais aberta.',
            ],
          },
          descansoSegundos: 90,
        },
        {
          id: 'passada-reversa',
          nome: 'Passada reversa com halteres',
          series: 3,
          repsAlvo: '8-10',
          cargaKg: 8,
          nota: 'Cada perna. Sem apoio externo e com controle na descida.',
          tutorial: {
            objetivo: 'Quadriceps, gluteo e estabilidade unilateral sem precisar de apoio robusto.',
            execucao: [
              'Fique em pe com halteres ao lado do corpo.',
              'Leve uma perna para tras e desca em linha reta.',
              'A perna da frente faz a maior parte do trabalho para subir.',
              'Volte controlando e repita o mesmo lado.',
            ],
            sentir: [
              'Perna da frente trabalhando bastante em coxa e gluteo.',
            ],
            erros: [
              'Dar passo curto demais e travar o movimento.',
              'Jogar peso na perna de tras.',
              'Perder equilibrio por fazer rapido demais.',
            ],
            adaptacoes: [
              'Se ficar instavel, faca sem carga ate pegar o padrao.',
              'Pode segurar em uma parede leve so para equilibrio, sem empurrar.',
            ],
          },
          descansoSegundos: 75,
        },
      ],
    },
    {
      id: 'b-bloco2',
      nome: 'Posterior e gluteo',
      exercicios: [
        {
          id: 'stiff-halter',
          nome: 'Stiff com halteres',
          series: 4,
          repsAlvo: '8-12',
          cargaKg: 12,
          nota: 'Cada mao. Quadril para tras e costas retas.',
          tutorial: {
            objetivo: 'Posterior de coxa e gluteo com padrao de hinge.',
            execucao: [
              'Fique em pe com halteres na frente da coxa e joelhos levemente destravados.',
              'Empurre o quadril para tras mantendo coluna neutra.',
              'Desca ate sentir alongar posterior sem arredondar lombar.',
              'Suba trazendo o quadril para frente e apertando gluteo.',
            ],
            sentir: [
              'Posterior de coxa alongando na descida e gluteo fechando na subida.',
            ],
            erros: [
              'Virar um agachamento e dobrar demais o joelho.',
              'Arredondar a lombar para ganhar amplitude.',
              'Descer alem do seu controle.',
            ],
            adaptacoes: [
              'Se mobilidade limitar, reduza amplitude e priorize tecnica.',
              'Se a carga estiver leve, aumente tempo de descida.',
            ],
          },
          descansoSegundos: 90,
        },
        {
          id: 'ponte-glutea',
          nome: 'Ponte glutea com peso',
          series: 3,
          repsAlvo: '10-15',
          cargaKg: 24,
          nota: 'Segurar 2s no topo. Se ficar leve, fazer unilateral.',
          tutorial: {
            objetivo: 'Gluteo como foco principal com pouca exigencia de equipamento.',
            execucao: [
              'Deite com joelhos dobrados e pes apoiados no chao.',
              'Coloque a carga sobre o quadril e segure firme.',
              'Suba o quadril ate formar uma linha do ombro ao joelho.',
              'Segure 2 segundos no topo e desca controlando.',
            ],
            sentir: [
              'Gluteo apertando forte no topo, nao lombar.',
            ],
            erros: [
              'Subir empurrando com lombar em vez de gluteo.',
              'Pes muito longe e perder alavanca.',
              'Descer batendo no chao e relaxar.',
            ],
            adaptacoes: [
              'Se ficar facil, faca unilateral ou aumente pausa no topo.',
            ],
          },
          descansoSegundos: 75,
        },
      ],
    },
    {
      id: 'b-bloco3',
      nome: 'Panturrilha e core',
      exercicios: [
        {
          id: 'panturrilha-em-pe',
          nome: 'Panturrilha em pe',
          series: 4,
          repsAlvo: '12-20',
          cargaKg: 12,
          nota: 'Cada mao. Pausa no topo e alongar embaixo.',
          tutorial: {
            objetivo: 'Panturrilha com amplitude completa e controle.',
            execucao: [
              'Fique em pe segurando a carga com apoio leve para equilibrio se precisar.',
              'Suba o maximo nas pontas dos pes.',
              'Segure 1 segundo no topo.',
              'Desca ate alongar bem antes da proxima repeticao.',
            ],
            sentir: [
              'Panturrilha queimando e contraindo no topo.',
            ],
            erros: [
              'Fazer pulando sem controle.',
              'Descer pouco e cortar amplitude.',
            ],
            adaptacoes: [
              'Pode fazer unilateral se a carga estiver leve.',
              'Se tiver um degrau seguro, use para aumentar alongamento.',
            ],
          },
          descansoSegundos: 45,
        },
        {
          id: 'abdominal-anilha-b',
          nome: 'Abdominal supra com anilha',
          series: 3,
          repsAlvo: '12-15',
          nota: 'Lombar colada no chao.',
          tutorial: {
            objetivo: 'Abdomen superior e controle de flexao de tronco.',
            execucao: [
              'Deite com joelhos dobrados e lombar encostada no chao.',
              'Segure a anilha no peito ou um pouco acima.',
              'Suba tirando as escapulas do chao sem puxar o pescoco.',
              'Desca devagar mantendo tensao no abdomen.',
            ],
            sentir: [
              'Abdomen contraindo forte, nao lombar nem pescoco.',
            ],
            erros: [
              'Puxar a cabeca para frente.',
              'Subir no embalo e cair relaxando.',
            ],
            adaptacoes: [
              'Se a anilha pesar demais, faca sem carga por enquanto.',
            ],
          },
          descansoSegundos: 45,
        },
        {
          id: 'bird-dog',
          nome: 'Bird-dog',
          series: 2,
          repsAlvo: '8-10',
          nota: 'Cada lado. Movimento lento e quadril estavel.',
          tutorial: {
            objetivo: 'Estabilidade de tronco, coordenacao e controle de quadril.',
            execucao: [
              'Fique em quatro apoios com maos abaixo dos ombros e joelhos abaixo do quadril.',
              'Estenda um braco e a perna oposta ao mesmo tempo.',
              'Segure 1 segundo sem girar o quadril.',
              'Volte devagar e troque o lado.',
            ],
            sentir: [
              'Abdomen, gluteo e costas estabilizando o corpo.',
            ],
            erros: [
              'Subir alto demais e arquear a lombar.',
              'Girar o quadril para um lado.',
              'Fazer rapido e perder controle.',
            ],
            adaptacoes: [
              'Se estiver dificil, mova primeiro so a perna e depois o braco.',
            ],
          },
          descansoSegundos: 45,
        },
      ],
    },
  ],
}
