import { Slot } from '@radix-ui/react-slot'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Button as ReactAriaButton } from 'react-aria-components'

const VARIANTS = ['primary', 'danger'] as const

type Variant = (typeof VARIANTS)[number]

type Props = { variant?: Variant; className?: string; children: ReactNode } & (
  | { asChild: true }
  | ({ asChild?: false } & Omit<
      ComponentPropsWithoutRef<typeof ReactAriaButton>,
      'slot'
    >)
)

export function Button({
  asChild,
  variant = 'primary',
  className = '',
  ...rest
}: Props) {
  const Comp = asChild ? Slot : ReactAriaButton

  const derivedClassName = [
    'text-center w-full text-white p-2 rounded-lg focus:ring-4 focus:ring-opacity-50 focus:outline-none disabled:opacity-75 ease-linear transition-all duration-150',
    'data-[variant=primary]:bg-blue-600 data-[variant=primary]:hover:bg-blue-700 data-[variant=primary]:focus:ring-blue-800',
    'data-[variant=danger]:bg-red-600 data-[variant=danger]:hover:bg-red-700 data-[variant=danger]:focus:ring-red-800',
    className,
  ].join(' ')

  return <Comp className={derivedClassName} data-variant={variant} {...rest} />
}
