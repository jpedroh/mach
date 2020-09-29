import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    document.title = 'Mach - Flight Planning'
  })
  return <Component {...pageProps} />
}

export default App
