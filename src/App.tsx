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
      <BottomNav />
    </BrowserRouter>
  )
}
