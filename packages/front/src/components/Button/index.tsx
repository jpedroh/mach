import { ButtonHTMLAttributes, FC } from 'react'
import styles from './index.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const FormInput: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}

export default FormInput
