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
  return {
    kcal: Math.round(item.macrosPor100g.kcal * fator),
    p: +(item.macrosPor100g.p * fator).toFixed(1),
    c: +(item.macrosPor100g.c * fator).toFixed(1),
    g: +(item.macrosPor100g.g * fator).toFixed(1),
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
    return somarMacros(acc, calcularMacrosItem(item, gramas))
  }, { kcal: 0, p: 0, c: 0, g: 0 })
}
