import { FC } from 'react'
import Header from '../../components/Header'
import styles from './index.module.css'

const GeneralLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  )
}

export default GeneralLayout
