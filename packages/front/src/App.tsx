import { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
