import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/schema'
import { hoje } from '../utils/datas'
import type { RefeicaoFeita } from '../data/tipos'

export function useRefeicoesFeitas(data?: string): RefeicaoFeita[] {
  const d = data || hoje()
  return useLiveQuery(() => db.refeicoes.where('data').equals(d).toArray(), [d]) || []
}
