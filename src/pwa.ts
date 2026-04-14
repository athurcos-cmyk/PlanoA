import { registerSW } from 'virtual:pwa-register'

type UpdateListener = () => void

const listeners = new Set<UpdateListener>()

let updateHandler: ((reloadPage?: boolean) => Promise<void>) | null = null

function emitUpdateAvailable() {
  listeners.forEach((listener) => listener())
}

if (import.meta.env.PROD) {
  updateHandler = registerSW({
    immediate: true,
    onNeedRefresh() {
      emitUpdateAvailable()
    },
    onRegisteredSW(_swUrl: string, registration?: ServiceWorkerRegistration) {
      if (!registration) return

      const checkForUpdates = () => {
        void registration.update()
      }

      window.setInterval(checkForUpdates, 60 * 60 * 1000)
      window.addEventListener('focus', checkForUpdates)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          checkForUpdates()
        }
      })
    },
  })
}

export function subscribeToAppUpdate(listener: UpdateListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export async function applyAppUpdate() {
  if (!updateHandler) return
  await updateHandler(true)
}
