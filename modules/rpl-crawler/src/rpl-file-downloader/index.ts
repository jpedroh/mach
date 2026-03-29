import Axios from 'axios'
import rplFileDownloader from './rpl-file-downloader.ts'

export default rplFileDownloader({
  http: Axios,
})
