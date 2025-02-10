import {
  Input as RACInput,
  InputProps as RACInputProps,
} from 'react-aria-components'
import { twc } from 'react-twc'

export const Input = twc(
  RACInput
)<RACInputProps>`py-2 px-3 pr-[2rem] rounded-lg border grow dark:bg-gray-600 dark:border-gray-400 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50`
