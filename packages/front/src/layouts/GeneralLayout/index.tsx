import { FC } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import styles from './index.module.css'

const GeneralLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  )
}

export default GeneralLayout
