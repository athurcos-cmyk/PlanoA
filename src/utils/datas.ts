import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function hoje(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export function formatarData(data: string): string {
  const [y, m, d] = data.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return format(date, "EEE dd/MM", { locale: ptBR }).toUpperCase()
}

export function formatarDataLonga(data: string): string {
  const [y, m, d] = data.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return format(date, "EEEE, d 'de' MMMM", { locale: ptBR })
}
