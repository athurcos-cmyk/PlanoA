import type { Macros, TipoDia } from '../data/tipos'

export function calcularMacrosAlvoDia(dieta: TipoDia): Macros {
  return dieta.slots.reduce(
    (acc, slot) => ({
      kcal: acc.kcal + slot.macrosAlvo.kcal,
      p: acc.p + slot.macrosAlvo.p,
      c: acc.c + slot.macrosAlvo.c,
      g: acc.g + slot.macrosAlvo.g,
    }),
    { kcal: 0, p: 0, c: 0, g: 0 }
  )
}
