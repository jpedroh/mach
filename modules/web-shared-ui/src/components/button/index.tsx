import { cva, type VariantProps } from 'class-variance-authority'
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components'
import { twc } from 'react-twc'

const button = cva(
  'text-center w-full text-white p-2 rounded-lg focus:ring-4 focus:outline-none disabled:opacity-75 ease-linear transition-all duration-150',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-800',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-800',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

type Props = RACButtonProps &
  VariantProps<typeof button> & { asChild?: boolean }

export const Button = twc(RACButton)(({ variant }: Props) =>
  button({ variant })
)
