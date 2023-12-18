import type { ReactNode } from 'react'

export default function Layout(props: {
  children: ReactNode
  details: ReactNode
}) {
  return (
    <>
      {props.children}
      {props.details}
    </>
  )
}
