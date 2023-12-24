import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link as ReactAriaLink } from 'react-aria-components'

export function Link({
  children,
  className = '',
  ...props
}: { children: ReactNode } & ComponentPropsWithoutRef<typeof ReactAriaLink>) {
  return (
    <ReactAriaLink
      className={`underline decoration-blue-600 ${className}`}
      {...props}
    >
      {children}
    </ReactAriaLink>
  )
}
