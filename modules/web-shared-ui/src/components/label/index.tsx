'use client'

import {
  LabelProps as RACLabelProps,
  Label as RACLabel,
} from 'react-aria-components'
import { twc } from 'react-twc'

export const Label = twc(RACLabel)<RACLabelProps>`dark:text-white`
