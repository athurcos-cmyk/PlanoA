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
  const candidates = [base, `${base}.ts`, path.join(base, 'index.ts')]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
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

  const dietas = [
    loadModule('src/data/dieta-folga.ts').DIETA_FOLGA,
    loadModule('src/data/dieta-plantao.ts').DIETA_PLANTAO,
  ]

  const unresolved = []
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
        }
      }
    }
  }

  if (unresolved.length > 0) {
    console.error('Itens da dieta sem correspondencia no catalogo:')
    console.error(JSON.stringify(unresolved, null, 2))
    process.exit(1)
  }

  console.log('Catalogo e dieta estao consistentes.')
}

main()
