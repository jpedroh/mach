import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Search from './views/Search'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/search'} component={Search} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
