'use client'

import { LabelProps, Label as ReactAriaLabel } from 'react-aria-components'

type Props = Omit<LabelProps, 'className'>

export function Label({ children, ...rest }: Props) {
  return (
    <ReactAriaLabel className="dark:text-white" {...rest}>
      {children}
    </ReactAriaLabel>
  )
}
