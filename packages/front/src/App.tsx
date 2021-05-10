import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from './views/Home'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'*'} render={() => <Redirect to={'/'} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
