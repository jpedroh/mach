import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Search from './views/Search'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/search'} component={Search} />
        <Route exact path={'*'} render={() => <Redirect to={'/'} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
