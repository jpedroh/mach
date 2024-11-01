import { ComponentProps } from 'react'
import { twc } from 'react-twc'

export const Lead = twc.p<
  ComponentProps<'p'>
>`font-light text-xl dark:text-white text-center`
