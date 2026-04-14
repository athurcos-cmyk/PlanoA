import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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

export const useTreinoStore = create<TreinoStore>()(
  persist(
    (set, get) => ({
      treinoAtivo: null,
      seriesFeitas: [],
      inicioTimestamp: null,

      iniciarTreino: (id) =>
        set((state) => {
          if (state.treinoAtivo === id && state.seriesFeitas.length > 0) {
            return state
          }

          return { treinoAtivo: id, seriesFeitas: [], inicioTimestamp: Date.now() }
        }),

      registrarSerie: (serie) =>
        set((s) => ({
          seriesFeitas: [
            ...s.seriesFeitas.filter(
              (sf) => !(sf.exercicioId === serie.exercicioId && sf.serie === serie.serie)
            ),
            serie,
          ].sort((a, b) => {
            if (a.exercicioId === b.exercicioId) return a.serie - b.serie
            return a.exercicioId.localeCompare(b.exercicioId)
          }),
        })),

      removerSerie: (exercicioId, serieNum) =>
        set((s) => ({
          seriesFeitas: s.seriesFeitas.filter(
            (sf) => !(sf.exercicioId === exercicioId && sf.serie === serieNum)
          ),
        })),

      finalizarTreino: () => {
        const state = get()
        if (!state.treinoAtivo || !state.inicioTimestamp) return null
        const duracaoMin = Math.max(
          1,
          Math.round((Date.now() - state.inicioTimestamp) / 60000)
        )
        const result = { series: state.seriesFeitas, duracaoMin }
        set({ treinoAtivo: null, seriesFeitas: [], inicioTimestamp: null })
        return result
      },
    }),
    {
      name: 'plano-a-treino-ativo',
      partialize: (state) => ({
        treinoAtivo: state.treinoAtivo,
        seriesFeitas: state.seriesFeitas,
        inicioTimestamp: state.inicioTimestamp,
      }),
    }
  )
)
