import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { Home, UtensilsCrossed, Dumbbell, User } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/dieta', icon: UtensilsCrossed, label: 'Dieta' },
  { path: '/treino', icon: Dumbbell, label: 'Treino' },
  { path: '/perfil', icon: User, label: 'Perfil' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  // Hide nav during active training
  if (location.pathname === '/treino/ativo') return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg border-t border-border-soft safe-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path ||
            (path !== '/' && location.pathname.startsWith(path))
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
                isActive ? 'text-ink' : 'text-ink-3'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
