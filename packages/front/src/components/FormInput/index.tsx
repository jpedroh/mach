import { FC, InputHTMLAttributes } from 'react'
import styles from './index.module.css'

type Props = InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }

const FormInput: FC<Props> = ({ hasError, ...props }) => {
  const classNames = [styles.input]

  if (hasError) {
    classNames.push(styles.error)
  }

  return <input className={classNames.join(' ')} {...props} />
}

export default FormInput
