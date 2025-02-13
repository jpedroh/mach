import {
  Label as RACLabel,
  type LabelProps as RACLabelProps,
} from 'react-aria-components'
import { twc } from 'react-twc'

export const Label = twc(RACLabel)<RACLabelProps>`dark:text-white`
