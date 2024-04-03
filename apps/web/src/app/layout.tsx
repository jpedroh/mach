import React, { Suspense } from 'react'
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
        <Suspense>
          <AnalyticsProvider>
            <AnalyticsPageViewTracker />
            {children}
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}
