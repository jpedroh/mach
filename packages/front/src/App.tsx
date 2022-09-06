import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Search from './views/Search'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/search'} element={<Search />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
