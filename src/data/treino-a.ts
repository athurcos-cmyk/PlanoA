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
          descansoSegundos: 75,
        },
        {
          id: 'desenvolvimento-sentado',
          nome: 'Desenvolvimento sentado com halteres',
          series: 3,
          repsAlvo: '8-12',
          cargaKg: 8,
          nota: 'Cada mao. Costas apoiadas na parede.',
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
          descansoSegundos: 75,
        },
        {
          id: 'puxada-alta-elastico',
          nome: 'Puxada alta com elastico',
          series: 3,
          repsAlvo: '12-20',
          nota: 'Prender alto. Puxar para a parte alta do peito com cotovelos descendo. Se nao tiver onde prender, fazer remada com elastico sentado preso nos pes.',
          descansoSegundos: 75,
        },
        {
          id: 'face-pull',
          nome: 'Face pull com elastico',
          series: 2,
          repsAlvo: '15-20',
          nota: 'Elastico preso na macaneta. Foco em postura e deltoide posterior.',
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
          descansoSegundos: 45,
        },
        {
          id: 'rosca-direta',
          nome: 'Rosca direta',
          series: 2,
          repsAlvo: '8-12',
          cargaKg: 8,
          nota: 'Pode alternar com rosca martelo quando quiser variar.',
          descansoSegundos: 60,
        },
        {
          id: 'triceps-testa',
          nome: 'Triceps testa deitado',
          series: 2,
          repsAlvo: '8-12',
          cargaKg: 12,
          nota: 'Deitado no chao, com cotovelo fixo.',
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
          descansoSegundos: 45,
        },
        {
          id: 'prancha-a',
          nome: 'Prancha',
          series: 2,
          repsAlvo: '30-45s',
          descansoSegundos: 45,
        },
      ],
    },
  ],
}
