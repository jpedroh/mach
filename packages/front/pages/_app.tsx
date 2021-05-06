import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { FlightsProvider } from '../contexts/FlightsContext'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    document.title = 'Mach - Flight Planning'
  }, [])
  return (
    <FlightsProvider>
      <Component {...pageProps} />
    </FlightsProvider>
  )
}

export default App
