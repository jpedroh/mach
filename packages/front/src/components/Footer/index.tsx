import styles from './index.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
        <a
          href="https://github.com/jpedroh/mach/"
          target="_blank"
          rel="noreferrer"
        >
          Mach {import.meta.env.VITE_APP_VERSION}
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

export default Footer
