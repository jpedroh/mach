import Axios from 'axios'
import makeUpdateChecker from './update-checker.ts'

export default makeUpdateChecker({
  http: Axios,
})
