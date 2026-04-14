import { useState, useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { ChevronLeft, ChevronRight, Calendar, Flame } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { db } from '../db/schema'
import type { RefeicaoFeita, TreinoFeito, PesoRegistro } from '../data/tipos'
import { cn } from '../utils/cn'

export function HistoricoPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Query all data for the visible month range
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const startStr = format(monthStart, 'yyyy-MM-dd')
  const endStr = format(monthEnd, 'yyyy-MM-dd')

  const refeicoes = useLiveQuery(
    () =>
      db.refeicoes
        .where('data')
        .between(startStr, endStr, true, true)
        .toArray(),
    [startStr, endStr]
  )

  const treinos = useLiveQuery(
    () =>
      db.treinos
        .where('data')
        .between(startStr, endStr, true, true)
        .toArray(),
    [startStr, endStr]
  )

  const pesos = useLiveQuery(
    () =>
      db.pesos
        .where('data')
        .between(startStr, endStr, true, true)
        .toArray(),
    [startStr, endStr]
  )

  // Build data maps
  const dataMap = useMemo(() => {
    const map: Record<
      string,
      { refeicoes: RefeicaoFeita[]; treinos: TreinoFeito[]; peso?: PesoRegistro }
    > = {}

    for (const r of refeicoes ?? []) {
      if (!map[r.data]) map[r.data] = { refeicoes: [], treinos: [] }
      map[r.data].refeicoes.push(r)
    }
    for (const t of treinos ?? []) {
      if (!map[t.data]) map[t.data] = { refeicoes: [], treinos: [] }
      map[t.data].treinos.push(t)
    }
    for (const p of pesos ?? []) {
      if (!map[p.data]) map[p.data] = { refeicoes: [], treinos: [] }
      map[p.data].peso = p
    }
    return map
  }, [refeicoes, treinos, pesos])

  const calendarDays = eachDayOfInterval({ start: calStart, end: calEnd })
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const currentMonthTime = currentMonth.getTime()

  const selectedStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null
  const selectedData = selectedStr ? dataMap[selectedStr] : null

  // Stats: streak and adherence
  const stats = useMemo(() => {
    if (!refeicoes) return { streak: 0, adherence: 0 }
    const currentMonthDate = new Date(currentMonthTime)
    const monthStartDate = startOfMonth(currentMonthDate)
    const monthEndDate = endOfMonth(currentMonthDate)
    const daysWithMeals = new Set((refeicoes ?? []).map((r) => r.data))
    const totalDays = eachDayOfInterval({
      start: monthStartDate,
      end: new Date() > monthEndDate ? monthEndDate : new Date(),
    }).filter((d) => isSameMonth(d, currentMonthDate))
    const adherence = totalDays.length > 0
      ? Math.round((totalDays.filter((d) => daysWithMeals.has(format(d, 'yyyy-MM-dd'))).length / totalDays.length) * 100)
      : 0

    // Streak: count consecutive days with meals going backwards from today
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = format(d, 'yyyy-MM-dd')
      if (daysWithMeals.has(key) || (dataMap[key]?.treinos?.length ?? 0) > 0) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return { streak, adherence }
  }, [refeicoes, dataMap, currentMonthTime])

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Calendar size={20} className="text-accent" />
        <h1 className="text-xl font-bold text-ink">Historico</h1>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-2 active:text-ink"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-base font-bold text-ink capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-2 active:text-ink"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="rounded-lg bg-surface p-3">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((d, i) => (
            <div
              key={i}
              className="text-center text-xs text-ink-3 font-medium py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd')
            const inMonth = isSameMonth(day, currentMonth)
            const today = isToday(day)
            const selected = selectedDate && isSameDay(day, selectedDate)
            const dayData = dataMap[dayStr]
            const hasMeals = (dayData?.refeicoes?.length ?? 0) > 0
            const hasTraining = (dayData?.treinos?.length ?? 0) > 0

            return (
              <button
                key={dayStr}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={cn(
                  'min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors relative',
                  !inMonth && 'opacity-30',
                  selected && 'bg-accent-soft ring-1 ring-accent/40',
                  today && !selected && 'bg-surface-2',
                  inMonth && !selected && !today && 'active:bg-surface-2'
                )}
              >
                <span
                  className={cn(
                    'text-sm font-[family-name:var(--font-mono)]',
                    selected ? 'text-accent font-bold' : today ? 'text-ink font-bold' : 'text-ink-2'
                  )}
                >
                  {format(day, 'd')}
                </span>
                <div className="flex gap-1 mt-0.5">
                  {hasMeals && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  )}
                  {hasTraining && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-2 border-t border-border-soft">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span className="text-xs text-ink-3">Refeicoes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs text-ink-3">Treino</span>
          </div>
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDate && (
        <div className="rounded-lg bg-surface p-4">
          <p className="text-sm font-bold text-ink mb-3 capitalize">
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </p>

          {!selectedData ? (
            <p className="text-sm text-ink-3">Nenhum registro neste dia.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Meals */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-2">Refeicoes</span>
                <span className="text-sm font-[family-name:var(--font-mono)] text-ink">
                  {selectedData.refeicoes.length}
                </span>
              </div>

              {/* Macros total */}
              {selectedData.refeicoes.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {(() => {
                    const totals = selectedData.refeicoes.reduce(
                      (acc, r) => ({
                        kcal: acc.kcal + r.macrosConsumidos.kcal,
                        p: acc.p + r.macrosConsumidos.p,
                        c: acc.c + r.macrosConsumidos.c,
                        g: acc.g + r.macrosConsumidos.g,
                      }),
                      { kcal: 0, p: 0, c: 0, g: 0 }
                    )
                    return (
                      <>
                        <MiniStat label="kcal" value={Math.round(totals.kcal)} />
                        <MiniStat label="P" value={Math.round(totals.p)} unit="g" />
                        <MiniStat label="C" value={Math.round(totals.c)} unit="g" />
                        <MiniStat label="G" value={Math.round(totals.g)} unit="g" />
                      </>
                    )
                  })()}
                </div>
              )}

              {/* Training */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-2">Treino</span>
                <span className="text-sm text-ink">
                  {selectedData.treinos.length > 0
                    ? selectedData.treinos.map((t) => `Treino ${t.treinoId}`).join(', ')
                    : 'Nenhum'}
                </span>
              </div>

              {/* Weight */}
              {selectedData.peso && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-2">Peso</span>
                  <span className="text-sm font-[family-name:var(--font-mono)] text-ink">
                    {selectedData.peso.pesoKg.toFixed(1)} kg
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-surface p-4 text-center">
          <Flame size={18} className="text-accent mx-auto mb-1" />
          <p className="text-2xl font-bold font-[family-name:var(--font-mono)] text-ink">
            {stats.streak}
          </p>
          <p className="text-xs text-ink-3">dias de streak</p>
        </div>
        <div className="rounded-lg bg-surface p-4 text-center">
          <Calendar size={18} className="text-green mx-auto mb-1" />
          <p className="text-2xl font-bold font-[family-name:var(--font-mono)] text-ink">
            {stats.adherence}%
          </p>
          <p className="text-xs text-ink-3">aderencia no mes</p>
        </div>
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  unit,
}: {
  label: string
  value: number
  unit?: string
}) {
  return (
    <div className="rounded bg-surface-2 p-2 text-center">
      <p className="text-xs text-ink-3">{label}</p>
      <p className="text-sm font-bold font-[family-name:var(--font-mono)] text-ink">
        {value}
        {unit && <span className="text-xs text-ink-3 font-normal">{unit}</span>}
      </p>
    </div>
  )
}
