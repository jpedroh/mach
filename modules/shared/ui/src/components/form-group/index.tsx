'use client'

import { ComponentProps, ReactNode, useId } from 'react'
import { FormGroupProvider } from './context'

type Props = {
  children: ReactNode
} & ComponentProps<'div'>

export function FormGroup({ children, ...rest }: Props) {
  const generatedId = useId()

  return (
    <FormGroupProvider controlId={rest.id ?? generatedId}>
      <div className="grid gap-2" {...rest}>
        {children}
      </div>
    </FormGroupProvider>
  )
}
