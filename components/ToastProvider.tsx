"use client"
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

type Toast = { id: string; type?: 'success' | 'error' | 'info'; message: string }

const ToastContext = createContext<{
  addToast: (t: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}>({ addToast: () => {}, removeToast: () => {} })

export const useToast = () => useContext(ToastContext)

export default function ToastProvider({ children }: { children: React.ReactNode }){
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeouts = React.useRef<Record<string, number>>({})

  const addToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2,9)
    setToasts(prev => [...prev, { id, ...t }])
    const to = window.setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id))
      delete timeouts.current[id]
    }, 4000)
    timeouts.current[id] = to
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const to = timeouts.current[id]
    if (to) {
      clearTimeout(to)
      delete timeouts.current[id]
    }
  }, [])

  useEffect(() => {
    return () => {
      // clear pending timeouts on unmount
      Object.values(timeouts.current).forEach(v => clearTimeout(v))
      timeouts.current = {}
    }
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div aria-live="polite" className="fixed z-50 top-4 right-4 flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`max-w-sm w-full rounded shadow px-4 py-2 text-sm text-white ${t.type === 'success' ? 'bg-emerald-500' : t.type === 'error' ? 'bg-red-500' : 'bg-sky-500'}`}>
            <div className="flex justify-between items-center">
              <div>{t.message}</div>
              <button onClick={() => removeToast(t.id)} className="ml-4 text-white/80">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
