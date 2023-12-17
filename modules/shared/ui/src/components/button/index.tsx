import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { Slot } from '@radix-ui/react-slot'

const VARIANTS = ['primary', 'danger'] as const

type Variant = (typeof VARIANTS)[number]

const VARIANTS_CLASS_NAMES: Record<Variant, string> = {
  primary: styles.primary,
  danger: styles.danger,
}

type Props = { variant?: Variant; children: ReactNode } & (
  | { asChild: true }
  | ({ asChild?: false } & ButtonHTMLAttributes<HTMLButtonElement>)
)

export function Button({ asChild, variant = 'primary', ...rest }: Props) {
  const Comp = asChild ? Slot : 'button'
  const className = [styles.button, VARIANTS_CLASS_NAMES[variant]].join(' ')

  return <Comp className={className} {...rest} />
}
