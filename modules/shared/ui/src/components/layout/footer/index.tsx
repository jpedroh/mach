import { FC } from 'react'
import styles from './index.module.css'

export const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <p>
        <a
          href="https://github.com/jpedroh/mach/"
          target="_blank"
          rel="noreferrer"
        >
          Mach {process.env.NEXT_PUBLIC_APP_VERSION}
        </a>
        {' - '}
        Use for flight simulation only
      </p>
      <p>
        <a href="https://jpedroh.github.io" target="_blank" rel="noreferrer">
          Developed by João Pedro Henrique
        </a>
      </p>
    </div>
  )
}
