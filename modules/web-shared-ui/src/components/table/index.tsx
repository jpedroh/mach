import { ComponentProps } from 'react'
import { twc } from 'react-twc'

export const Table = {
  Root: twc.table<ComponentProps<'table'>>`table-fixed w-full`,
  Head: twc.thead<ComponentProps<'thead'>>`bg-blue-700 text-white uppercase`,
  Heading: twc.th<ComponentProps<'th'>>`font-semibold p-2`,
  Body: twc.tbody<
    ComponentProps<'tbody'>
  >`bg-gray-300 bg-opacity-10 dark:text-white uppercase`,
  Row: twc.tr<ComponentProps<'tr'>>``,
  Column: twc.td<ComponentProps<'td'>>`p-2 text-center`,
}
