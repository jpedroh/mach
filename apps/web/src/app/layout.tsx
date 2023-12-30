import React from 'react'
import './index.css'
import {
  AnalyticsPageViewTracker,
  AnalyticsProvider,
} from '@mach/web/shared/analytics'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <AnalyticsProvider>
          <AnalyticsPageViewTracker />
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
