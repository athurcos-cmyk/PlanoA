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
          descansoSegundos: 90,
        },
        {
          id: 'passada-reversa',
          nome: 'Passada reversa com halteres',
          series: 3,
          repsAlvo: '8-10',
          cargaKg: 8,
          nota: 'Cada perna. Sem apoio externo e com controle na descida.',
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
          descansoSegundos: 90,
        },
        {
          id: 'ponte-glutea',
          nome: 'Ponte glutea com peso',
          series: 3,
          repsAlvo: '10-15',
          cargaKg: 24,
          nota: 'Segurar 2s no topo. Se ficar leve, fazer unilateral.',
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
          descansoSegundos: 45,
        },
        {
          id: 'abdominal-anilha-b',
          nome: 'Abdominal supra com anilha',
          series: 3,
          repsAlvo: '12-15',
          nota: 'Lombar colada no chao.',
          descansoSegundos: 45,
        },
        {
          id: 'bird-dog',
          nome: 'Bird-dog',
          series: 2,
          repsAlvo: '8-10',
          nota: 'Cada lado. Movimento lento e quadril estavel.',
          descansoSegundos: 45,
        },
      ],
    },
  ],
}
