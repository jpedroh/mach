class NotFoundException extends Error {
  message = 'Not found'

  public constructor() {
    super()
    Object.setPrototypeOf(this, NotFoundException.prototype)
  }
}

export default NotFoundException
