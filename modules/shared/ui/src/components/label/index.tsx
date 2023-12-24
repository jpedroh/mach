'use client'

import { ReactNode, ComponentProps } from 'react'
import { useFormGroupContext } from '../form-group/context'

type Props = {
  children: ReactNode
} & Omit<ComponentProps<'label'>, 'htmlFor'>

export function Label({ children, ...rest }: Props) {
  const { controlId } = useFormGroupContext()

  return (
    <label htmlFor={controlId} className="dark:text-gray-200" {...rest}>
      {children}
    </label>
  )
}
