import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/schema'
import { hoje } from '../utils/datas'
import type { ItemExtra } from '../data/tipos'

export function useExtras(data?: string): ItemExtra[] {
  const d = data || hoje()
  return useLiveQuery(() => db.extras.where('data').equals(d).toArray(), [d]) || []
}
