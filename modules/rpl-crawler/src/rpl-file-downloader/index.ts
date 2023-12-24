import Axios from 'axios'
import rplFileDownloader from './rpl-file-downloader'

export default rplFileDownloader({
  http: Axios,
})
