import { FC, ReactNode } from 'react'
import styles from './index.module.css'

const Alert: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>
}

export default Alert
