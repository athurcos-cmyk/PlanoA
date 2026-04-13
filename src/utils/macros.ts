import { getAlimentoPorId, getMacrosPor100gDoItem } from '../data/alimentos'
import type { Macros, ItemOpcao, ItemRegistrado } from '../data/tipos'

export function somarMacros(...lista: Macros[]): Macros {
  return lista.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal,
      p: acc.p + m.p,
      c: acc.c + m.c,
      g: acc.g + m.g,
    }),
    { kcal: 0, p: 0, c: 0, g: 0 }
  )
}

export function calcularMacrosItem(item: ItemOpcao, gramas: number): Macros {
  const fator = gramas / 100
  const macrosBase = getMacrosPor100gDoItem(item)
  return {
    kcal: Math.round(macrosBase.kcal * fator),
    p: +(macrosBase.p * fator).toFixed(1),
    c: +(macrosBase.c * fator).toFixed(1),
    g: +(macrosBase.g * fator).toFixed(1),
  }
}

export function calcularMacrosOpcao(
  itens: ItemOpcao[],
  registrados?: ItemRegistrado[]
): Macros {
  if (!registrados) {
    // Comeu tudo planejado
    return itens.reduce(
      (acc, item) => somarMacros(acc, calcularMacrosItem(item, item.gramasPlano)),
      { kcal: 0, p: 0, c: 0, g: 0 }
    )
  }
  // Ajustou gramagem
  return itens.reduce((acc, item) => {
    const reg = registrados.find((r) => r.itemId === item.id)
    const gramas = reg ? reg.gramasReais : item.gramasPlano
    const substituto = reg?.substitutoId ? getAlimentoPorId(reg.substitutoId) : undefined

    if (substituto) {
      return somarMacros(acc, {
        kcal: Math.round((substituto.kcal * gramas) / 100),
        p: +((substituto.p * gramas) / 100).toFixed(1),
        c: +((substituto.c * gramas) / 100).toFixed(1),
        g: +((substituto.g * gramas) / 100).toFixed(1),
      })
    }

    return somarMacros(acc, calcularMacrosItem(item, gramas))
  }, { kcal: 0, p: 0, c: 0, g: 0 })
}
