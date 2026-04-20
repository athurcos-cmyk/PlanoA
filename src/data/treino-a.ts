import type { Treino } from './tipos'

export const TREINO_A: Treino = {
  id: 'A',
  nome: 'Treino A',
  subtitulo: 'Upper | Peito / Ombro / Costas / Braco',
  duracaoMin: '50-65',
  blocos: [
    {
      id: 'a-bloco1',
      nome: 'Base de empurrar',
      exercicios: [
        {
          id: 'supino-halter-chao',
          nome: 'Supino com halteres no chao',
          series: 4,
          repsAlvo: '6-10',
          cargaKg: 12,
          nota: 'Cada mao. Descer controlado e subir forte, mantendo 1-3 RIR.',
          tutorial: {
            objetivo: 'Peito, triceps e ombro anterior com boa estabilidade para treino em casa.',
            execucao: [
              'Deite no chao com um halter em cada mao e joelhos dobrados.',
              'Comece com os cotovelos apoiados no chao e punhos retos.',
              'Empurre os halteres para cima ate quase estender os cotovelos.',
              'Desca controlando ate os bracos tocarem o chao de novo.',
            ],
            sentir: [
              'Peito apertando na subida e triceps ajudando a terminar o movimento.',
              'Ombro da frente trabalhando, mas sem dor articular.',
            ],
            erros: [
              'Bater os halteres sem controle no topo.',
              'Abrir demais o cotovelo e jogar a carga toda no ombro.',
              'Descer rapido e perder tensao no peito.',
            ],
            adaptacoes: [
              'Se faltar carga, use pausa de 1 segundo no fundo e descida mais lenta.',
              'Se o ombro incomodar, aproxime mais os cotovelos do tronco.',
            ],
          },
          descansoSegundos: 75,
        },
        {
          id: 'desenvolvimento-sentado',
          nome: 'Desenvolvimento sentado com halteres',
          series: 3,
          repsAlvo: '8-12',
          cargaKg: 8,
          nota: 'Cada mao. Costas apoiadas na parede.',
          tutorial: {
            objetivo: 'Ombro, principalmente a parte da frente e lateral, com ajuda do triceps.',
            execucao: [
              'Sente no chao ou banco improvisado com costas apoiadas na parede.',
              'Segure os halteres na altura das orelhas com antebraco quase vertical.',
              'Empurre para cima sem arquear demais a lombar.',
              'Desca devagar ate a altura inicial.',
            ],
            sentir: [
              'Ombros fazendo forca o tempo inteiro.',
              'Triceps ajudando no final da subida.',
            ],
            erros: [
              'Empinar o peito e jogar o tronco para tras.',
              'Descer pouco e cortar amplitude.',
              'Subir torto, com um lado compensando o outro.',
            ],
            adaptacoes: [
              'Se a carga estiver pesada, faca alternado um lado por vez.',
              'Se faltar estabilidade, aperte o abdomen e os gluteos.',
            ],
          },
          descansoSegundos: 75,
        },
      ],
    },
    {
      id: 'a-bloco2',
      nome: 'Base de puxar',
      exercicios: [
        {
          id: 'remada-serrote',
          nome: 'Remada serrote',
          series: 4,
          repsAlvo: '8-12',
          cargaKg: 14,
          nota: 'Cada lado. Puxar com o cotovelo e segurar 1s no topo.',
          tutorial: {
            objetivo: 'Costas medias e latissimo, com bom foco unilateral.',
            execucao: [
              'Apoie uma mao e um joelho em uma superficie firme ou use a mao livre na propria coxa.',
              'Deixe o halter pendurado com ombro para baixo e peito aberto.',
              'Puxe pensando em levar o cotovelo para tras e para o quadril.',
              'Segure 1 segundo no topo e desca alongando.',
            ],
            sentir: [
              'Costas trabalhando mais do que o braco.',
              'Regiao perto da axila e meio das costas contraindo.',
            ],
            erros: [
              'Puxar com a mao e nao com o cotovelo.',
              'Girar o tronco para roubar repeticao.',
              'Encolher o ombro e jogar o esforco no trapezio.',
            ],
            adaptacoes: [
              'Se nao tiver apoio bom, faca com uma mao na propria coxa.',
              'Se estiver dificil sentir costas, reduza carga e segure mais tempo no topo.',
            ],
          },
          descansoSegundos: 75,
        },
        {
          id: 'remada-elastico',
          nome: 'Remada com elastico',
          series: 3,
          repsAlvo: '10-15',
          nota: 'Sentado no chao com elastico preso nos pes ou em pe com ancoragem baixa. Puxar com os cotovelos, segurar 1s no final e voltar devagar.',
          tutorial: {
            objetivo: 'Costas medias, dorsal e deltoide posterior com uma puxada mais simples de executar em casa.',
            execucao: [
              'Sente no chao com pernas estendidas e prenda o elastico nos pes, ou use uma ancoragem baixa segura.',
              'Comece com bracos estendidos, peito aberto e ombros longe da orelha.',
              'Puxe levando os cotovelos para tras sem jogar o tronco para frente ou para tras.',
              'Segure 1 segundo no final e volte devagar ate alongar as costas.',
            ],
            sentir: [
              'Meio das costas e regiao perto da axila trabalhando mais do que o antebraco.',
              'Parte de tras do ombro ajudando a fechar o movimento.',
            ],
            erros: [
              'Puxar so com a mao e com o biceps.',
              'Encolher os ombros e tensionar o pescoco.',
              'Balancar o tronco para roubar repeticoes.',
            ],
            adaptacoes: [
              'Se estiver dificil sentir costas, use menos tensao e segure mais tempo no final.',
              'Se o elastico estiver leve, aumente a distancia ou faca mais controle na volta.',
            ],
          },
          descansoSegundos: 75,
        },
        {
          id: 'face-pull',
          nome: 'Face pull com elastico',
          series: 2,
          repsAlvo: '15-20',
          nota: 'Elastico preso na macaneta. Foco em postura e deltoide posterior.',
          tutorial: {
            objetivo: 'Deltoide posterior, parte alta das costas e controle escapular.',
            execucao: [
              'Prenda o elastico na altura do rosto ou um pouco acima.',
              'Puxe em direcao ao nariz ou testa abrindo os cotovelos.',
              'No final, pense em mostrar as maos para tras e apertar as escapas.',
              'Volte devagar sem deixar o elastico te puxar.',
            ],
            sentir: [
              'Parte de tras do ombro queimando.',
              'Meio das costas trabalhando junto sem dor no pescoco.',
            ],
            erros: [
              'Puxar baixo demais e transformar em remada.',
              'Compensar com lombar e pescoco.',
              'Fazer rapido sem controle.',
            ],
            adaptacoes: [
              'Se o elastico estiver leve, segure mais tempo no final.',
              'Se o ombro reclamar, reduza amplitude e mantenha o cotovelo um pouco mais baixo.',
            ],
          },
          descansoSegundos: 60,
        },
      ],
    },
    {
      id: 'a-bloco3',
      nome: 'Acabamento',
      exercicios: [
        {
          id: 'elevacao-lateral',
          nome: 'Elevacao lateral',
          series: 2,
          repsAlvo: '12-20',
          cargaKg: 6,
          nota: 'Controle total, sem roubar.',
          tutorial: {
            objetivo: 'Parte lateral do ombro para dar largura visual.',
            execucao: [
              'Fique em pe com halteres ao lado do corpo e cotovelos levemente dobrados.',
              'Suba os bracos para os lados ate perto da linha do ombro.',
              'Desca devagar sem relaxar totalmente embaixo.',
            ],
            sentir: [
              'Lateral do ombro queimando bastante.',
            ],
            erros: [
              'Subir jogando o tronco e roubando com impulso.',
              'Transformar em encolhimento de trapezio.',
              'Subir muito alto e perder a linha do ombro.',
            ],
            adaptacoes: [
              'Se a carga estiver pesada, use menos peso e mais controle.',
              'Pode fazer unilateral para sentir melhor.',
            ],
          },
          descansoSegundos: 45,
        },
        {
          id: 'rosca-direta',
          nome: 'Rosca direta',
          series: 3,
          repsAlvo: '8-12',
          cargaKg: 8,
          nota: 'Pode alternar com rosca martelo quando quiser variar.',
          tutorial: {
            objetivo: 'Biceps como trabalho direto principal do treino.',
            execucao: [
              'Fique em pe com cotovelos perto do corpo e punhos retos.',
              'Suba a carga dobrando o cotovelo sem jogar o ombro para frente.',
              'Desca controlando ate quase estender por completo.',
            ],
            sentir: [
              'Biceps enchendo e apertando na parte de cima do movimento.',
            ],
            erros: [
              'Balancar o corpo para roubar repeticao.',
              'Subir com cotovelo andando para frente.',
              'Descer rapido demais.',
            ],
            adaptacoes: [
              'Pode fazer com halteres ou barra montavel curta.',
              'Quando quiser variar sem aumentar volume, troque por rosca martelo em outra semana.',
            ],
          },
          descansoSegundos: 60,
        },
        {
          id: 'triceps-testa',
          nome: 'Triceps testa deitado',
          series: 3,
          repsAlvo: '8-12',
          cargaKg: 12,
          nota: 'Deitado no chao, com cotovelo fixo.',
          tutorial: {
            objetivo: 'Triceps direto, principalmente a parte que ajuda a empurrar melhor.',
            execucao: [
              'Deite no chao segurando a carga acima do peito.',
              'Dobre apenas o cotovelo levando a carga em direcao a testa ou um pouco atras.',
              'Estenda de novo sem deixar o cotovelo abrir muito.',
            ],
            sentir: [
              'Parte de tras do braco trabalhando do inicio ao fim.',
            ],
            erros: [
              'Mexer o ombro junto e transformar em supino estranho.',
              'Abrir o cotovelo para os lados.',
              'Descer pouco por medo da carga.',
            ],
            adaptacoes: [
              'Pode fazer com um halter segurado pelas duas maos se ficar mais confortavel.',
              'Se cotovelo incomodar, use reps mais altas e descida mais lenta.',
            ],
          },
          descansoSegundos: 60,
        },
      ],
    },
    {
      id: 'a-bloco4',
      nome: 'Core',
      exercicios: [
        {
          id: 'abdominal-anilha-a',
          nome: 'Abdominal supra com anilha',
          series: 2,
          repsAlvo: '12-15',
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
          id: 'prancha-a',
          nome: 'Prancha',
          series: 2,
          repsAlvo: '30-45s',
          tutorial: {
            objetivo: 'Estabilidade de tronco e controle de coluna.',
            execucao: [
              'Apoie antebracos e pontas dos pes no chao.',
              'Mantenha corpo reto da cabeca ao calcanhar.',
              'Aperte abdomen e gluteos o tempo todo.',
            ],
            sentir: [
              'Abdomen e gluteo firmes, sem lombar afundando.',
            ],
            erros: [
              'Levantar demais o quadril.',
              'Deixar a lombar cair e sentir dor ali.',
              'Segurar a respiracao.',
            ],
            adaptacoes: [
              'Se estiver pesado, faca com joelhos no chao.',
            ],
          },
          descansoSegundos: 45,
        },
      ],
    },
  ],
}
