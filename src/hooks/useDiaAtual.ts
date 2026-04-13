import { useDiaStore } from '../stores/useDiaStore'
import { DIETA_FOLGA } from '../data/dieta-folga'
import { DIETA_PLANTAO } from '../data/dieta-plantao'
import type { TipoDia } from '../data/tipos'

export function useDiaAtual(): { tipoDia: 'folga' | 'plantao'; dieta: TipoDia } {
  const tipoDia = useDiaStore((s) => s.tipoDia)
  const dieta = tipoDia === 'folga' ? DIETA_FOLGA : DIETA_PLANTAO
  return { tipoDia, dieta }
}
