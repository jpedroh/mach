import Request from "./request";
import NotFoundException from "../exception/not-found-exception";

export type ActionInterface<T> = (req: Request) => Promise<T>;

const makeExpressCallback = <T>(action: ActionInterface<T>) => {
  return async (req, res) => {
    try {
      const data = await action(req);
      return res.json(data)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({status: 404, message: 'Not found'})
      }
      console.error(error)
      return res.status(500).json({status: 500, message: 'Internal server error'})
    }
  }
}

export default makeExpressCallback;