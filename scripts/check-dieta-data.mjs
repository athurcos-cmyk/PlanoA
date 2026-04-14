import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import ts from 'typescript'

const root = process.cwd()
const cache = new Map()
const requireModule = createRequire(import.meta.url)

function resolveTs(request, parentFile) {
  if (!request.startsWith('.')) return request

  const base = path.resolve(path.dirname(parentFile), request)
  const candidates = [`${base}.ts`, path.join(base, 'index.ts'), base]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  }

  throw new Error(`Nao foi possivel resolver ${request} a partir de ${parentFile}`)
}

function loadModule(file) {
  const resolved = path.resolve(root, file)
  if (cache.has(resolved)) return cache.get(resolved).exports

  const source = fs.readFileSync(resolved, 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText

  const mod = { exports: {} }
  cache.set(resolved, mod)

  const localRequire = (request) => {
    const resolvedRequest = resolveTs(request, resolved)
    if (!request.startsWith('.')) return requireModule(request)
    return loadModule(path.relative(root, resolvedRequest))
  }

  const fn = new Function('require', 'module', 'exports', output)
  fn(localRequire, mod, mod.exports)

  return mod.exports
}

function main() {
  const alimentosModule = loadModule('src/data/alimentos/index.ts')
  const getAlimentoPorId = alimentosModule.getAlimentoPorId
  const getMedidaCaseira = alimentosModule.getMedidaCaseira
  const getCategoriaDoItem = alimentosModule.getCategoriaDoItem
  const alimentos = alimentosModule.ALIMENTOS
  const { listarSubstitutosCompativeis } = loadModule('src/utils/swap-ingrediente.ts')

  const dietas = [
    loadModule('src/data/dieta-folga.ts').DIETA_FOLGA,
    loadModule('src/data/dieta-plantao.ts').DIETA_PLANTAO,
  ]

  const unresolved = []
  const unitRefsMissing = []
  const macroDrift = []
  const swapIssues = []
  const duplicates = new Set()

  for (const dieta of dietas) {
    for (const slot of dieta.slots) {
      for (const opcao of slot.opcoes) {
        for (const item of opcao.itens) {
          const key = `${slot.id}:${opcao.id}:${item.id}`
          if (duplicates.has(key)) continue
          duplicates.add(key)

          if (!getAlimentoPorId(item.id)) {
            unresolved.push({
              dieta: dieta.id,
              slot: slot.id,
              opcao: opcao.id,
              itemId: item.id,
              itemNome: item.nome,
            })
          }

          const alimento = getAlimentoPorId(item.id)
          if (alimento) {
            const diffKcal = Math.abs(item.macrosPor100g.kcal - alimento.kcal)
            const diffP = Math.abs(item.macrosPor100g.p - alimento.p)
            const diffC = Math.abs(item.macrosPor100g.c - alimento.c)
            const diffG = Math.abs(item.macrosPor100g.g - alimento.g)

            if (diffKcal > 1 || diffP > 0.11 || diffC > 0.11 || diffG > 0.11) {
              macroDrift.push({
                dieta: dieta.id,
                slot: slot.id,
                opcao: opcao.id,
                itemId: item.id,
                itemNome: item.nome,
                dietaMacros: item.macrosPor100g,
                catalogoMacros: {
                  kcal: alimento.kcal,
                  p: alimento.p,
                  c: alimento.c,
                  g: alimento.g,
                },
              })
            }
          }

          if (item.unidade === 'un' && item.unidadeNome && !getMedidaCaseira(item.id)) {
            unitRefsMissing.push({
              dieta: dieta.id,
              slot: slot.id,
              opcao: opcao.id,
              itemId: item.id,
              itemNome: item.nome,
            })
          }
        }
      }
    }
  }

  if (unresolved.length > 0) {
    console.error('Itens da dieta sem correspondencia no catalogo:')
    console.error(JSON.stringify(unresolved, null, 2))
    process.exit(1)
  }

  if (unitRefsMissing.length > 0) {
    console.error('Itens com unidade "un" sem medida caseira no catalogo:')
    console.error(JSON.stringify(unitRefsMissing, null, 2))
    process.exit(1)
  }

  if (macroDrift.length > 0) {
    console.error('Itens da dieta com macros divergentes do catalogo:')
    console.error(JSON.stringify(macroDrift, null, 2))
    process.exit(1)
  }

  const almocoFolgaFrango = dietas
    .find((dieta) => dieta.id === 'folga')
    ?.slots.find((slot) => slot.id === 'almoco-folga')
    ?.opcoes.find((opcao) => opcao.id === 'almoco-folga-frango')
    ?.itens.find((item) => item.id === 'frango-grelhado')

  if (almocoFolgaFrango) {
    const sugestoes = listarSubstitutosCompativeis(
      almocoFolgaFrango,
      getCategoriaDoItem(almocoFolgaFrango),
      alimentos
    )
    const ids = new Set(sugestoes.map((entry) => entry.alimento.id))

    for (const esperado of ['ovo-inteiro', 'clara-ovo']) {
      if (!ids.has(esperado)) {
        swapIssues.push({
          itemId: almocoFolgaFrango.id,
          substitutoEsperado: esperado,
        })
      }
    }
  }

  if (swapIssues.length > 0) {
    console.error('Swaps criticos ausentes na dieta:')
    console.error(JSON.stringify(swapIssues, null, 2))
    process.exit(1)
  }

  console.log('Catalogo e dieta estao consistentes.')
}

main()
