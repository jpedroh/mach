import { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FlightsProvider } from './contexts/FlightsContext'
import Home from './views/Home'
import Search from './views/Search'

const App: FC = () => {
  return (
    <FlightsProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/search'} component={Search} />
        </Switch>
      </BrowserRouter>
    </FlightsProvider>
  )
}

export default App
