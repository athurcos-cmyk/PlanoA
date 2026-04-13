import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback((secs?: number) => {
    if (secs !== undefined) setSeconds(secs)
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback((secs?: number) => {
    setIsRunning(false)
    setSeconds(secs ?? initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setIsRunning(false)
            // Vibrate when timer ends
            if (navigator.vibrate) navigator.vibrate([200, 100, 200])
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, seconds])

  const formatTime = useCallback((s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }, [])

  return { seconds, isRunning, start, pause, reset, display: formatTime(seconds) }
}
