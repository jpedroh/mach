import styles from './index.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
        <a href="https://github.com/jpedroh/mach/" target="_blank">
          Mach {process.env.REACT_APP_APP_VERSION}
        </a>
        {' - '}
        Use for flight simulation only
      </p>
      <p>
        <a href="https://jpedroh.github.io" target="_blank">
          Developed by João Pedro Henrique
        </a>
      </p>
    </div>
  )
}

export default Footer
