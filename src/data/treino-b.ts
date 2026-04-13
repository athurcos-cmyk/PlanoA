import type { Treino } from './tipos'

export const TREINO_B: Treino = {
  id: 'B',
  nome: 'Treino B',
  subtitulo: 'Lower · Quadríceps / Posterior / Glúteo / Panturrilha',
  duracaoMin: '55-70',
  blocos: [
    {
      id: 'b-bloco1',
      nome: 'Quadríceps',
      exercicios: [
        { id: 'agachamento-goblet', nome: 'Agachamento goblet', series: 4, repsAlvo: '12-15', cargaKg: 24, nota: 'Halter vertical no peito. Descer até paralelo.', descansoSegundos: 90 },
        { id: 'afundo-bulgaro', nome: 'Afundo búlgaro', series: 3, repsAlvo: '10-12', cargaKg: 10, nota: 'Cada perna. Pé traseiro no sofá/cadeira.', descansoSegundos: 75 },
        { id: 'agachamento-isometrico', nome: 'Agachamento isométrico na parede', series: 3, repsAlvo: '45-60s', nota: 'Costas na parede, coxas paralelas ao chão.', descansoSegundos: 60 },
      ],
    },
    {
      id: 'b-bloco2',
      nome: 'Posterior / Glúteo',
      exercicios: [
        { id: 'stiff-halter', nome: 'Stiff com halteres', series: 4, repsAlvo: '10-12', cargaKg: 12, nota: 'Cada mão. Sentir alongar posterior.', descansoSegundos: 75 },
        { id: 'ponte-glutea', nome: 'Ponte glútea com halter', series: 4, repsAlvo: '12-15', cargaKg: 24, nota: 'Halter apoiado no quadril. Apertar glúteo no topo.', descansoSegundos: 75 },
        { id: 'bom-dia', nome: 'Bom dia', series: 3, repsAlvo: '12', cargaKg: 10, nota: 'Halter atrás da cabeça. Tronco até 90°.', descansoSegundos: 60 },
      ],
    },
    {
      id: 'b-bloco3',
      nome: 'Panturrilha',
      exercicios: [
        { id: 'panturrilha-em-pe', nome: 'Panturrilha em pé no degrau', series: 4, repsAlvo: '15-20', cargaKg: 12, nota: 'Cada mão. Subir e descer devagar.', descansoSegundos: 45 },
        { id: 'panturrilha-sentado', nome: 'Panturrilha sentado com halter', series: 3, repsAlvo: '15-20', cargaKg: 24, nota: 'Halter apoiado no joelho.', descansoSegundos: 45 },
      ],
    },
    {
      id: 'b-bloco4',
      nome: 'Core',
      exercicios: [
        { id: 'abdominal-bicicleta', nome: 'Abdominal bicicleta', series: 3, repsAlvo: '20', nota: 'Cotovelo toca joelho oposto.', descansoSegundos: 45 },
        { id: 'prancha-lateral', nome: 'Prancha lateral', series: 3, repsAlvo: '30-45s', nota: 'Cada lado.', descansoSegundos: 45 },
        { id: 'elevacao-pernas', nome: 'Elevação de pernas deitado', series: 3, repsAlvo: '15', nota: 'Lombar colada no chão.', descansoSegundos: 45 },
      ],
    },
  ],
}
