import type { Macros, SlotRefeicao, OpcaoRefeicao } from '../data/tipos'
import { calcularMacrosOpcao } from './macros'

function parseHora(horario: string): number {
  const [hora, minuto] = horario.split(':').map(Number)
  return hora * 60 + minuto
}

function isCategoriaCompativel(
  atual: OpcaoRefeicao['categoria'],
  candidata: OpcaoRefeicao['categoria']
): boolean {
  const compativeis: Record<OpcaoRefeicao['categoria'], OpcaoRefeicao['categoria'][]> = {
    cafe: ['cafe', 'shake'],
    shake: ['shake', 'cafe', 'lanche'],
    lanche: ['lanche', 'shake'],
    'prato-principal': ['prato-principal'],
  }

  return compativeis[atual].includes(candidata)
}

export function calcularScore(alvo: Macros, opcao: Macros): number {
  const pesos = { proteina: 0.4, carboidrato: 0.25, kcal: 0.2, gordura: 0.15 }
  const diff = (a: number, b: number) => Math.abs(a - b) / Math.max(a, 1)

  const erro =
    pesos.proteina * diff(alvo.p, opcao.p) +
    pesos.carboidrato * diff(alvo.c, opcao.c) +
    pesos.kcal * diff(alvo.kcal, opcao.kcal) +
    pesos.gordura * diff(alvo.g, opcao.g)

  return Math.max(0, Math.round((1 - erro) * 100))
}

export interface OpcaoComScore {
  opcao: OpcaoRefeicao
  slotId: string
  slotNome: string
  dieta: string
  horario: string
  score: number
}

export function findSimilarOptions(
  slotAtual: SlotRefeicao,
  opcaoAtual: OpcaoRefeicao,
  dietaAtual: 'folga' | 'plantao',
  todasOpcoes: {
    opcao: OpcaoRefeicao
    slotId: string
    slotNome: string
    dieta: string
    horario: string
  }[]
): OpcaoComScore[] {
  const alvo = calcularMacrosOpcao(opcaoAtual.itens)
  const horarioAtual = parseHora(slotAtual.horario)

  return todasOpcoes
    .filter((item) => item.opcao.id !== opcaoAtual.id)
    .filter((item) => isCategoriaCompativel(opcaoAtual.categoria, item.opcao.categoria))
    .filter((item) => {
      if (item.slotId === slotAtual.id) return true
      if (item.opcao.categoria === 'prato-principal') return true
      return Math.abs(parseHora(item.horario) - horarioAtual) <= 5 * 60
    })
    .map((item) => {
      const macros = calcularMacrosOpcao(item.opcao.itens)
      const bonusMesmoSlot = item.slotId === slotAtual.id ? 8 : 0
      const bonusMesmaDieta = item.dieta === dietaAtual ? 5 : 0
      return {
        ...item,
        score: Math.min(99, calcularScore(alvo, macros) + bonusMesmoSlot + bonusMesmaDieta),
      }
    })
    .filter((item) => item.score >= 35)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
}
