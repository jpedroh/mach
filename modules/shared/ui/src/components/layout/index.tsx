import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        'bg-gray-100 min-h-screen flex flex-col gap-6 justify-center items-center dark:bg-gray-800 p-5 lg:px-40'
      }
    >
      <div
        className={
          'flex-grow flex flex-col justify-center items-center gap-6 w-full'
        }
      >
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  )
}
