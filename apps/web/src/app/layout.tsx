import React, { Suspense } from 'react'
import './index.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  )
}
