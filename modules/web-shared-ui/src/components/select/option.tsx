import {
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps as RACListBoxItemProps,
} from 'react-aria-components'
import { twc } from 'react-twc'
import type { Option } from './types'

export const SelectOption = twc(RACListBoxItem)<RACListBoxItemProps<Option>>`
  py-2 px-4 min-w-[10rem] bg-white dark:bg-gray-600 dark:text-gray-200
  data-[focused]:bg-blue-600 data-[focused]:text-white
  data-[selected]:bg-blue-600 data-[selected]:text-white
`
