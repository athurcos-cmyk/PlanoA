export interface Macros {
  kcal: number
  p: number  // proteína (g)
  c: number  // carboidrato (g)
  g: number  // gordura (g)
}

export interface Alimento {
  id: string
  nome: string
  kcal: number
  p: number
  c: number
  g: number
  categoria: CategoriaAlimento
  unidadeRef?: string // "1 ovo = 50g", "1 lata = 120g"
}

export type CategoriaAlimento =
  | 'proteina' | 'leguminosa' | 'carboidrato' | 'gordura'
  | 'laticinio' | 'vegetal' | 'molho' | 'suplemento'
  | 'bebida' | 'farinha' | 'snack'

export type CategoriaSwap =
  | 'proteina' | 'carboidrato' | 'gordura' | 'laticinio' | 'vegetal' | 'livre'

export interface ItemOpcao {
  id: string
  nome: string
  gramasPlano: number
  unidade: 'g' | 'ml' | 'un'
  unidadeNome?: string   // ex: "ovo", "banana", "fatia" — exibido em vez de gramas
  macrosPor100g: Macros
}

export interface OpcaoRefeicao {
  id: string
  nome: string
  itens: ItemOpcao[]
  categoria: 'cafe' | 'lanche' | 'prato-principal' | 'shake'
}

export interface SlotRefeicao {
  id: string
  nome: string
  horario: string
  macrosAlvo: Macros
  opcoes: OpcaoRefeicao[]
}

export interface TipoDia {
  id: 'folga' | 'plantao'
  nome: string
  slots: SlotRefeicao[]
}

export interface Exercicio {
  id: string
  nome: string
  series: number
  repsAlvo: string        // "10-12", "15", "até falha"
  cargaKg?: number
  nota?: string
  bisetCom?: string       // ID do exercício parceiro no bi-set
  descansoSegundos: number
}

export interface BlocoTreino {
  id: string
  nome: string
  exercicios: Exercicio[]
}

export interface Treino {
  id: 'A' | 'B'
  nome: string
  subtitulo: string
  duracaoMin: string
  blocos: BlocoTreino[]
}

export interface Perfil {
  nome: string
  idade: number
  alturaCm: number
  pesoKg: number
  tmb: number
  get: number
  metaKcal: number
  macrosAlvo: Macros
}

// DB types (for Dexie)
export interface RefeicaoFeita {
  id?: number
  data: string
  slotRefeicaoId: string
  opcaoId: string
  tipoDia: 'folga' | 'plantao'
  itensRegistrados?: ItemRegistrado[]
  macrosConsumidos: Macros
}

export interface ItemRegistrado {
  itemId: string
  gramasReais: number
  substitutoId?: string
  substitutoNome?: string
}

export interface TreinoFeito {
  id?: number
  data: string
  treinoId: 'A' | 'B'
  series: SerieFeita[]
  duracaoMin: number
}

export interface SerieFeita {
  exercicioId: string
  serie: number
  reps: number
  cargaKg: number
}

export interface PesoRegistro {
  id?: number
  data: string
  pesoKg: number
}

export interface ItemExtra {
  id?: number
  data: string
  alimentoId: string
  alimentoNome: string
  gramas: number
  macros: Macros
}

export interface SubstituicaoPadrao {
  id?: number
  slotRefeicaoId: string
  itemOriginalId: string
  itemSubstitutoId: string
  gramasSubstituto: number
  ativa: boolean
  criadaEm: string
}
