import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import '../src/index.css'

export default function App({ Component, pageProps }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } }
    }))

    return <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
        </Hydrate>
    </QueryClientProvider>
}