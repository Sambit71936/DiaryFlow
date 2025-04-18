"use client";

import { createContext, useContext, useState, ReactNode } from "react"

interface ToastProps {
  title?: string
  description?: string
}

const ToastContext = createContext<{
  toast: (props: ToastProps) => void
}>({
  toast: () => {}, // Default no-op function
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    console.log('Toast:', props.title, props.description)
    // In a real implementation, we would show a toast UI
    // For simplicity, we'll just log to console
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
} 