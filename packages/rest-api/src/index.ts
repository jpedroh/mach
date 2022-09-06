import * as express from 'express'
import actions from './actions'
import makeExpressCallback from './express-callback'
import * as compression from 'compression';

const app = express()
const port = process.env.PORT || 3000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(compression())

app.get(
  '/',
  makeExpressCallback(async () => {
    const version = process.env.APP_VERSION
    const apiSpec = await require('../openapi.json')

    return { ...apiSpec, ...{ info: { version } } }
  })
)
app.get('/flights/', makeExpressCallback(actions.findAll))
app.get('/flights/:id', makeExpressCallback(actions.findById))
app.all('*', (req, res) =>
  res.status(404).json({ status: 404, message: 'Not found' })
)

app.listen(port, () => {
  console.info(`Server is listening on port ${port}`)
})

export default app
