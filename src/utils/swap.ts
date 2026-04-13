import type { Macros, SlotRefeicao, OpcaoRefeicao } from '../data/tipos'
import { calcularMacrosOpcao } from './macros'

export function calcularScore(alvo: Macros, opcao: Macros): number {
  const pesos = { proteina: 0.40, carboidrato: 0.25, kcal: 0.20, gordura: 0.15 }
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
  dieta: string
  score: number
}

export function findSimilarOptions(
  slotAtual: SlotRefeicao,
  todasOpcoes: { opcao: OpcaoRefeicao; slotId: string; dieta: string }[]
): OpcaoComScore[] {
  // Exclude options already in the current slot
  const opcaoIdsAtuais = new Set(slotAtual.opcoes.map((o) => o.id))
  const alvo = slotAtual.macrosAlvo

  return todasOpcoes
    .filter((item) => !opcaoIdsAtuais.has(item.opcao.id))
    .map((item) => {
      const macros = calcularMacrosOpcao(item.opcao.itens)
      return { ...item, score: calcularScore(alvo, macros) }
    })
    .filter((item) => item.score >= 35)   // remove opções completamente incompatíveis
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
}
