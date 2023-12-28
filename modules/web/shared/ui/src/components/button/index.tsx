import {
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from 'react-aria-components'
import { twc } from 'react-twc'

const VARIANTS = ['primary', 'danger'] as const

type Variant = (typeof VARIANTS)[number]

type Props = RACButtonProps & { variant?: Variant; asChild?: boolean }

export const Button = twc(RACButton)(({ variant = 'primary' }: Props) => {
  return [
    'text-center w-full text-white p-2 rounded-lg focus:ring-4 focus:ring-opacity-50 focus:outline-none disabled:opacity-75 ease-linear transition-all duration-150',
    variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
      : '',
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-800'
      : '',
  ].join(' ')
})
