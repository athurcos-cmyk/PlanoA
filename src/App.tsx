import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BottomNav } from './components/layout/BottomNav'
import { Header } from './components/layout/Header'
import { Dashboard } from './pages/Dashboard'
import { DietaPage } from './pages/dieta/DietaPage'
import { OpcaoDetalhePage } from './pages/dieta/OpcaoDetalhePage'
import { TreinoListPage } from './pages/treino/TreinoListPage'
import { TreinoAtivoPage } from './pages/treino/TreinoAtivoPage'
import { ProgressaoCargaPage } from './pages/treino/ProgressaoCargaPage'
import { HistoricoPage } from './pages/HistoricoPage'
import { PerfilPage } from './pages/PerfilPage'
import { applyAppUpdate, subscribeToAppUpdate } from './pwa'
import { useTreinoStore } from './stores/useTreinoStore'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dieta" element={<DietaPage />} />
          <Route path="/dieta/:slotId/:opcaoId" element={<OpcaoDetalhePage />} />
          <Route path="/treino" element={<TreinoListPage />} />
          <Route path="/treino/ativo" element={<TreinoAtivoPage />} />
          <Route path="/treino/exercicio/:exercicioId" element={<ProgressaoCargaPage />} />
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Routes>
      </main>
      <AppUpdateBanner />
      <BottomNav />
    </BrowserRouter>
  )
}

function AppUpdateBanner() {
  const [showUpdate, setShowUpdate] = useState(false)
  const treinoAtivo = useTreinoStore((s) => s.treinoAtivo)

  useEffect(() => {
    return subscribeToAppUpdate(() => {
      if (document.visibilityState === 'hidden' && !treinoAtivo) {
        void applyAppUpdate()
        return
      }

      setShowUpdate(true)
    })
  }, [treinoAtivo])

  if (!showUpdate) return null

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 rounded-xl border border-accent/30 bg-surface p-4 shadow-lg">
      <p className="text-sm font-bold text-ink">Nova versão disponível</p>
      <p className="mt-1 text-xs text-ink-3">
        O app pode atualizar sem apagar seu histórico. {treinoAtivo
          ? 'Seu treino atual está salvo, então a atualização não apaga o progresso.'
          : 'Toque para recarregar com a versão mais nova.'}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setShowUpdate(false)}
          className="flex-1 rounded-lg bg-surface-2 px-3 py-2 text-sm font-bold text-ink-2 active:bg-surface-3"
        >
          Depois
        </button>
        <button
          type="button"
          onClick={() => {
            void applyAppUpdate()
          }}
          className="flex-1 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-white active:bg-accent-darker"
        >
          Atualizar
        </button>
      </div>
    </div>
  )
}
