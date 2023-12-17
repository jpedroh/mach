import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'
import styles from './index.module.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  )
}
