import { createContext } from 'react'

type ToastContextValue = {
  notify: (text: string) => void
}

export const ToastContext = createContext<ToastContextValue>({
  notify: () => undefined,
})
