import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { User, Scale, Target, Dumbbell, Info } from 'lucide-react'
import { PERFIL } from '../data/perfil'
import { getUltimoPeso, registrarPeso } from '../db/queries'
import { PesoModal } from '../components/perfil/PesoModal'

export function PerfilPage() {
  const [pesoModalAberto, setPesoModalAberto] = useState(false)

  const ultimoPeso = useLiveQuery(() => getUltimoPeso())

  const pesoAtual = ultimoPeso?.pesoKg ?? PERFIL.pesoKg

  const handleSalvarPeso = async (peso: number) => {
    await registrarPeso(peso)
    setPesoModalAberto(false)
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Profile header */}
      <div className="rounded-lg bg-surface p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-accent-soft flex items-center justify-center">
          <User size={28} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink">{PERFIL.nome}</h1>
          <p className="text-sm text-ink-2">
            {PERFIL.idade} anos · {PERFIL.alturaCm}cm
          </p>
        </div>
      </div>

      {/* Current weight */}
      <div className="rounded-lg bg-surface p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale size={16} className="text-accent" />
            <span className="text-xs text-ink-3 uppercase tracking-wider">Peso Atual</span>
          </div>
          <button
            type="button"
            onClick={() => setPesoModalAberto(true)}
            className="min-h-[44px] px-4 rounded-lg bg-accent-soft text-sm font-bold text-accent active:bg-accent/20 transition-colors"
          >
            Registrar peso
          </button>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold font-[family-name:var(--font-mono)] text-ink">
            {pesoAtual.toFixed(1)}
          </span>
          <span className="text-lg text-ink-2">kg</span>
        </div>
        {ultimoPeso && (
          <p className="text-xs text-ink-3 mt-1">
            Registrado em {ultimoPeso.data}
          </p>
        )}
      </div>

      {/* Target macros */}
      <div className="rounded-lg bg-surface p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-accent" />
          <span className="text-xs text-ink-3 uppercase tracking-wider">Meta Base Estimada</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MacroItem label="Calorias" value={`${PERFIL.macrosAlvo.kcal}`} unit="kcal" />
          <MacroItem label="Proteina" value={`${PERFIL.macrosAlvo.p}`} unit="g" />
          <MacroItem label="Carboidrato" value={`${PERFIL.macrosAlvo.c}`} unit="g" />
          <MacroItem label="Gordura" value={`${PERFIL.macrosAlvo.g}`} unit="g" />
        </div>
        <p className="mt-3 text-xs text-ink-3">
          O plano alimentar do dia pode variar levemente entre folga e plantao.
        </p>
        <div className="mt-3 pt-3 border-t border-border-soft grid grid-cols-2 gap-3">
          <MacroItem label="TMB" value={`${PERFIL.tmb}`} unit="kcal" />
          <MacroItem label="GET" value={`${PERFIL.get}`} unit="kcal" />
        </div>
      </div>

      {/* Equipment */}
      <div className="rounded-lg bg-surface p-4">
        <div className="flex items-center gap-2 mb-3">
          <Dumbbell size={16} className="text-accent" />
          <span className="text-xs text-ink-3 uppercase tracking-wider">Equipamento</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            'Halteres ajustaveis ate 24kg (par)',
            'Barra reta e barra W',
            'Anilhas variadas',
            'Elasticos de resistencia',
            'Banco improvisado (chao)',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-sm text-ink-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* App info */}
      <div className="rounded-lg bg-surface p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info size={16} className="text-ink-3" />
          <span className="text-xs text-ink-3 uppercase tracking-wider">App</span>
        </div>
        <p className="text-sm text-ink-2">Plano A · v1.0</p>
        <p className="text-xs text-ink-3 mt-1">
          App pessoal de dieta e treino. Dados armazenados localmente no navegador.
        </p>
      </div>

      {/* Peso Modal */}
      {pesoModalAberto && (
        <PesoModal
          pesoAtual={pesoAtual}
          onSalvar={handleSalvarPeso}
          onCancelar={() => setPesoModalAberto(false)}
        />
      )}
    </div>
  )
}

function MacroItem({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit: string
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-ink-3">{label}</span>
      <span className="text-lg font-bold font-[family-name:var(--font-mono)] text-ink">
        {value}
        <span className="text-sm text-ink-3 font-normal ml-0.5">{unit}</span>
      </span>
    </div>
  )
}
