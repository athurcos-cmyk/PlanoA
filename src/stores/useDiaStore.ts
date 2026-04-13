import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DiaStore {
  tipoDia: 'folga' | 'plantao'
  setTipoDia: (tipo: 'folga' | 'plantao') => void
  toggleTipoDia: () => void
}

export const useDiaStore = create<DiaStore>()(
  persist(
    (set) => ({
      tipoDia: 'folga',
      setTipoDia: (tipo) => set({ tipoDia: tipo }),
      toggleTipoDia: () =>
        set((s) => ({ tipoDia: s.tipoDia === 'folga' ? 'plantao' : 'folga' })),
    }),
    { name: 'plano-a-dia' }
  )
)
