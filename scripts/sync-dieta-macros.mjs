import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import ts from 'typescript'

const root = process.cwd()
const requireModule = createRequire(import.meta.url)
const cache = new Map()

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
    if (!request.startsWith('.')) return requireModule(request)
    return loadModule(path.relative(root, resolveTs(request, resolved)))
  }

  const fn = new Function('require', 'module', 'exports', output)
  fn(localRequire, mod, mod.exports)

  return mod.exports
}

function formatNumber(value) {
  return Number.isInteger(value) ? `${value}` : `${value}`
}

function formatMacros(macros) {
  return `{ kcal: ${formatNumber(macros.kcal)}, p: ${formatNumber(macros.p)}, c: ${formatNumber(macros.c)}, g: ${formatNumber(macros.g)} }`
}

function syncFile(file, getAlimentoPorId) {
  const resolved = path.resolve(root, file)
  const lines = fs.readFileSync(resolved, 'utf8').split(/\r?\n/)

  const next = lines.map((line) => {
    const idMatch = line.match(/id:\s*'([^']+)'/)
    if (!idMatch || !line.includes('macrosPor100g:')) return line

    const alimento = getAlimentoPorId(idMatch[1])
    if (!alimento) return line

    return line.replace(
      /macrosPor100g:\s*\{[^}]+\}/,
      `macrosPor100g: ${formatMacros({
        kcal: alimento.kcal,
        p: alimento.p,
        c: alimento.c,
        g: alimento.g,
      })}`
    )
  })

  fs.writeFileSync(resolved, next.join('\n'))
}

function main() {
  const { getAlimentoPorId } = loadModule('src/data/alimentos/index.ts')

  syncFile('src/data/dieta-folga.ts', getAlimentoPorId)
  syncFile('src/data/dieta-plantao.ts', getAlimentoPorId)

  console.log('Macros das dietas sincronizados com o catalogo.')
}

main()
