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
    if (!request.startsWith('.')) return requireModule(request)
    return loadModule(path.relative(root, resolveTs(request, resolved)))
  }

  const fn = new Function('require', 'module', 'exports', output)
  fn(localRequire, mod, mod.exports)

  return mod.exports
}

function avaliarOpcao(macros, alvo) {
  const deltaKcal = macros.kcal - alvo.kcal
  const deltaP = +(macros.p - alvo.p).toFixed(1)
  const deltaC = +(macros.c - alvo.c).toFixed(1)
  const deltaG = +(macros.g - alvo.g).toFixed(1)

  const score =
    Math.abs(deltaKcal) / 40 +
    Math.abs(deltaP) / 5 +
    Math.abs(deltaC) / 8 +
    Math.abs(deltaG) / 3

  let status = 'ok'
  if (score > 5.5) status = 'fora'
  else if (score > 3) status = 'ajuste'

  return { deltaKcal, deltaP, deltaC, deltaG, score: +score.toFixed(2), status }
}

function main() {
  const { DIETA_FOLGA } = loadModule('src/data/dieta-folga.ts')
  const { DIETA_PLANTAO } = loadModule('src/data/dieta-plantao.ts')
  const { calcularMacrosOpcao } = loadModule('src/utils/macros.ts')

  const resumo = { ok: 0, ajuste: 0, fora: 0 }

  for (const dieta of [DIETA_FOLGA, DIETA_PLANTAO]) {
    console.log(`\n# ${dieta.nome}`)

    for (const slot of dieta.slots) {
      console.log(`\n${slot.nome} [alvo ${slot.macrosAlvo.kcal} kcal / ${slot.macrosAlvo.p}p / ${slot.macrosAlvo.c}c / ${slot.macrosAlvo.g}g]`)

      for (const opcao of slot.opcoes) {
        const macros = calcularMacrosOpcao(opcao.itens)
        const avaliacao = avaliarOpcao(macros, slot.macrosAlvo)
        resumo[avaliacao.status] += 1

        console.log(
          `- [${avaliacao.status}] ${opcao.nome}: ${macros.kcal} kcal / ${macros.p}p / ${macros.c}c / ${macros.g}g | ` +
          `delta ${avaliacao.deltaKcal >= 0 ? '+' : ''}${avaliacao.deltaKcal} kcal, ` +
          `${avaliacao.deltaP >= 0 ? '+' : ''}${avaliacao.deltaP}p, ` +
          `${avaliacao.deltaC >= 0 ? '+' : ''}${avaliacao.deltaC}c, ` +
          `${avaliacao.deltaG >= 0 ? '+' : ''}${avaliacao.deltaG}g | score ${avaliacao.score}`
        )
      }
    }
  }

  console.log(`\nResumo: ${resumo.ok} ok, ${resumo.ajuste} ajuste, ${resumo.fora} fora`)
}

main()
