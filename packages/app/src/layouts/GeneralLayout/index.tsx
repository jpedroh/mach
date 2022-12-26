import { FC, ReactNode } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import styles from './index.module.css'

const GeneralLayout: FC<{ children: ReactNode }> = ({ children }) => {
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

export default GeneralLayout
