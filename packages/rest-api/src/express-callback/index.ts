import Request from './request'
import NotFoundException from '../exception/not-found-exception'
import BadRequestException from '../exception/bad-request-exception'

export type ActionInterface<T> = (req: Request) => Promise<T>

const makeExpressCallback = <T>(action: ActionInterface<T>) => {
  return async (req, res) => {
    try {
      const data = await action(req)
      return res.json(data)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ status: 404, message: 'Not found' })
      }
      if (error instanceof BadRequestException) {
        return res.status(400).json({ status: 400, message: error.message })
      }

      console.error(error)
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' })
    }
  }
}

export default makeExpressCallback
