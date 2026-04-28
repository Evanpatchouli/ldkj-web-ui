import { useRef, useCallback } from 'react'

export function useLongPress(fn: () => void, delay = 500) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const start = useCallback(() => {
    timer.current = setTimeout(fn, delay)
  }, [fn, delay])

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
