import Dexie, { type Table } from 'dexie'
import type {
  RefeicaoFeita,
  TreinoFeito,
  PesoRegistro,
  ItemExtra,
  SubstituicaoPadrao,
} from '../data/tipos'

export class PlanoADB extends Dexie {
  refeicoes!: Table<RefeicaoFeita, number>
  treinos!: Table<TreinoFeito, number>
  pesos!: Table<PesoRegistro, number>
  extras!: Table<ItemExtra, number>
  substituicoes!: Table<SubstituicaoPadrao, number>

  constructor() {
    super('PlanoADB')
    this.version(1).stores({
      refeicoes: '++id, data, [data+slotRefeicaoId]',
      treinos: '++id, data',
      pesos: '++id, data',
      extras: '++id, data',
      substituicoes: '++id, slotRefeicaoId, [slotRefeicaoId+itemOriginalId]',
    })
  }
}

export const db = new PlanoADB()
