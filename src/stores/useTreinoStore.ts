import { create } from 'zustand'
import type { SerieFeita } from '../data/tipos'

interface TreinoStore {
  treinoAtivo: 'A' | 'B' | null
  seriesFeitas: SerieFeita[]
  inicioTimestamp: number | null

  iniciarTreino: (id: 'A' | 'B') => void
  registrarSerie: (serie: SerieFeita) => void
  removerSerie: (exercicioId: string, serieNum: number) => void
  finalizarTreino: () => { series: SerieFeita[]; duracaoMin: number } | null
}

export const useTreinoStore = create<TreinoStore>((set, get) => ({
  treinoAtivo: null,
  seriesFeitas: [],
  inicioTimestamp: null,

  iniciarTreino: (id) =>
    set({ treinoAtivo: id, seriesFeitas: [], inicioTimestamp: Date.now() }),

  registrarSerie: (serie) =>
    set((s) => ({ seriesFeitas: [...s.seriesFeitas, serie] })),

  removerSerie: (exercicioId, serieNum) =>
    set((s) => ({
      seriesFeitas: s.seriesFeitas.filter(
        (sf) => !(sf.exercicioId === exercicioId && sf.serie === serieNum)
      ),
    })),

  finalizarTreino: () => {
    const state = get()
    if (!state.treinoAtivo || !state.inicioTimestamp) return null
    const duracaoMin = Math.round((Date.now() - state.inicioTimestamp) / 60000)
    const result = { series: state.seriesFeitas, duracaoMin }
    set({ treinoAtivo: null, seriesFeitas: [], inicioTimestamp: null })
    return result
  },
}))
