import { FC } from 'react'
import styles from './index.module.css'

export const Header: FC = () => {
  return (
    <div className={styles.container}>
      <h1>mach</h1>
      <h2>An open source tool for flight simulation</h2>
    </div>
  )
}
