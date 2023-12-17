import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { Slot } from '@radix-ui/react-slot'

const VARIANTS = ['primary', 'danger'] as const

type Variant = (typeof VARIANTS)[number]

type Props = { variant?: Variant; children: ReactNode } & (
  | { asChild: true }
  | ({ asChild?: false } & ButtonHTMLAttributes<HTMLButtonElement>)
)

export function Button({ asChild, variant = 'primary', ...rest }: Props) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={styles.button} data-variant={variant} {...rest} />
}
