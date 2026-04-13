import { db } from './schema'
import type {
  RefeicaoFeita,
  TreinoFeito,
  PesoRegistro,
  ItemExtra,
  SubstituicaoPadrao,
} from '../data/tipos'
import { hoje } from '../utils/datas'

// ========== REFEIÇÕES ==========

export async function registrarRefeicao(ref: Omit<RefeicaoFeita, 'id'>) {
  // Remove existing for same slot+date, then add
  const existing = await db.refeicoes
    .where('[data+slotRefeicaoId]')
    .equals([ref.data, ref.slotRefeicaoId])
    .first()
  if (existing?.id) await db.refeicoes.delete(existing.id)
  return db.refeicoes.add(ref as RefeicaoFeita)
}

export async function desmarcarRefeicao(data: string, slotId: string) {
  const existing = await db.refeicoes
    .where('[data+slotRefeicaoId]')
    .equals([data, slotId])
    .first()
  if (existing?.id) await db.refeicoes.delete(existing.id)
}

export function getRefeicoesDoDia(data: string) {
  return db.refeicoes.where('data').equals(data).toArray()
}

// ========== TREINOS ==========

export async function registrarTreino(treino: Omit<TreinoFeito, 'id'>) {
  return db.treinos.add(treino as TreinoFeito)
}

export function getTreinosDoDia(data: string) {
  return db.treinos.where('data').equals(data).toArray()
}

export function getTreinosPorExercicio(exercicioId: string) {
  return db.treinos
    .orderBy('data')
    .reverse()
    .filter((t) => t.series.some((s) => s.exercicioId === exercicioId))
    .toArray()
}

// ========== PESO ==========

export async function registrarPeso(pesoKg: number, data?: string) {
  const d = data || hoje()
  const existing = await db.pesos.where('data').equals(d).first()
  if (existing?.id) {
    return db.pesos.update(existing.id, { pesoKg })
  }
  return db.pesos.add({ data: d, pesoKg } as PesoRegistro)
}

export function getUltimoPeso() {
  return db.pesos.orderBy('data').reverse().first()
}

export function getHistoricoPesos() {
  return db.pesos.orderBy('data').reverse().toArray()
}

// ========== EXTRAS ==========

export async function adicionarExtra(extra: Omit<ItemExtra, 'id'>) {
  return db.extras.add(extra as ItemExtra)
}

export async function removerExtra(id: number) {
  return db.extras.delete(id)
}

export function getExtrasDoDia(data: string) {
  return db.extras.where('data').equals(data).toArray()
}

// ========== SUBSTITUIÇÕES ==========

export async function salvarSubstituicao(sub: Omit<SubstituicaoPadrao, 'id'>) {
  // Remove existing for same slot+item
  const existing = await db.substituicoes
    .where('[slotRefeicaoId+itemOriginalId]')
    .equals([sub.slotRefeicaoId, sub.itemOriginalId])
    .first()
  if (existing?.id) await db.substituicoes.delete(existing.id)
  return db.substituicoes.add(sub as SubstituicaoPadrao)
}

export function getSubstituicoesAtivas(slotId: string) {
  return db.substituicoes
    .where('slotRefeicaoId')
    .equals(slotId)
    .filter((s) => s.ativa)
    .toArray()
}

export async function desativarSubstituicao(id: number) {
  return db.substituicoes.update(id, { ativa: false })
}
