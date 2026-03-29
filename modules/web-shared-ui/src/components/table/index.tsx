import type { ComponentProps } from 'react'
import { twc } from 'react-twc'

export const Root = twc.table<ComponentProps<'table'>>`table-fixed w-full`

export const Head = twc.thead<
  ComponentProps<'thead'>
>`bg-blue-700 text-white uppercase`

export const Heading = twc.th<ComponentProps<'th'>>`font-semibold p-2`

export const Body = twc.tbody<
  ComponentProps<'tbody'>
>`bg-gray-300/10 dark:text-white uppercase`

export const Row = twc.tr<ComponentProps<'tr'>>``

export const Column = twc.td<ComponentProps<'td'>>`p-2 text-center`
