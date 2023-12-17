import { ReactNode } from 'react'

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className={`font-light text-xl dark:text-white text-center`}>
      {children}
    </p>
  )
}
