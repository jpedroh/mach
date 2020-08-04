import * as express from 'express'
import actions from './actions';
import makeExpressCallback from "./express-callback";

const app = express()
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', makeExpressCallback(() => require('../openapi.json')))
app.get('/flights/', makeExpressCallback(actions.findAll))
app.get('/flights/:id', makeExpressCallback(actions.findById))
app.all('*', (req, res) => res.status(404).json({status: 404, message: 'Not found'}))

app.listen(port, () => {
  console.info(`Server is listening on port ${port}`)
})

export default app