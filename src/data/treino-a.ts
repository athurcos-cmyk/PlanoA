import type { Treino } from './tipos'

export const TREINO_A: Treino = {
  id: 'A',
  nome: 'Treino A',
  subtitulo: 'Upper · Peito / Ombro / Costas / Braço',
  duracaoMin: '60-75',
  blocos: [
    {
      id: 'a-bloco1',
      nome: 'Peito / Ombro (bi-set)',
      exercicios: [
        { id: 'supino-halter-chao', nome: 'Supino com halteres no chão', series: 4, repsAlvo: '10-12', cargaKg: 12, nota: 'Cada mão. Descer 3s, explodir subida.', bisetCom: 'flexao', descansoSegundos: 0 },
        { id: 'flexao', nome: 'Flexão de braço', series: 4, repsAlvo: 'até falha', nota: 'Imediatamente após supino.', bisetCom: 'supino-halter-chao', descansoSegundos: 90 },
        { id: 'desenvolvimento-sentado', nome: 'Desenvolvimento sentado', series: 3, repsAlvo: '10-12', cargaKg: 8, nota: 'Cada mão. Costas na parede.', bisetCom: 'elevacao-lateral', descansoSegundos: 0 },
        { id: 'elevacao-lateral', nome: 'Elevação lateral', series: 3, repsAlvo: '12-15', cargaKg: 6, nota: 'Leve, foco contração.', bisetCom: 'desenvolvimento-sentado', descansoSegundos: 75 },
      ],
    },
    {
      id: 'a-bloco2',
      nome: 'Costas',
      exercicios: [
        { id: 'remada-serrote', nome: 'Remada serrote', series: 4, repsAlvo: '10-12', cargaKg: 14, nota: 'Cada lado. Puxar com cotovelo.', descansoSegundos: 75 },
        { id: 'remada-curvada', nome: 'Remada curvada com barra', series: 3, repsAlvo: '10', cargaKg: 22, nota: 'Tronco 45°, costas retas.', descansoSegundos: 75 },
        { id: 'face-pull', nome: 'Face pull com elástico', series: 3, repsAlvo: '15', nota: 'Elástico na maçaneta.', descansoSegundos: 60 },
      ],
    },
    {
      id: 'a-bloco3',
      nome: 'Braço (bi-set)',
      exercicios: [
        { id: 'rosca-direta', nome: 'Rosca direta', series: 3, repsAlvo: '10-12', cargaKg: 8, bisetCom: 'rosca-martelo', descansoSegundos: 0 },
        { id: 'rosca-martelo', nome: 'Rosca martelo', series: 3, repsAlvo: '10-12', cargaKg: 8, bisetCom: 'rosca-direta', descansoSegundos: 75 },
      ],
    },
    {
      id: 'a-bloco4',
      nome: 'Tríceps',
      exercicios: [
        { id: 'triceps-testa', nome: 'Tríceps testa deitado', series: 3, repsAlvo: '10-12', cargaKg: 14, descansoSegundos: 60 },
        { id: 'triceps-supinado', nome: 'Tríceps supinado', series: 3, repsAlvo: '12-15', cargaKg: 9, descansoSegundos: 60 },
      ],
    },
    {
      id: 'a-bloco5',
      nome: 'Core',
      exercicios: [
        { id: 'abdominal-anilha-a', nome: 'Abdominal supra com anilha', series: 3, repsAlvo: '15', descansoSegundos: 45 },
        { id: 'prancha-a', nome: 'Prancha isométrica', series: 3, repsAlvo: '45-60s', descansoSegundos: 45 },
      ],
    },
  ],
}
