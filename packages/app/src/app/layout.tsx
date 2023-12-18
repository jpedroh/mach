import React from 'react'
import './index.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
