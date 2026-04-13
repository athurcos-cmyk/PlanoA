import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/schema'
import { hoje } from '../utils/datas'
import { somarMacros } from '../utils/macros'
import type { Macros } from '../data/tipos'

export function useProgressoMacros(data?: string): Macros {
  const d = data || hoje()

  const resultado = useLiveQuery(async () => {
    const refeicoes = await db.refeicoes.where('data').equals(d).toArray()
    const extras = await db.extras.where('data').equals(d).toArray()

    const macrosRefeicoes = refeicoes.map((r) => r.macrosConsumidos)
    const macrosExtras = extras.map((e) => e.macros)

    return somarMacros(...macrosRefeicoes, ...macrosExtras)
  }, [d])

  return resultado || { kcal: 0, p: 0, c: 0, g: 0 }
}
