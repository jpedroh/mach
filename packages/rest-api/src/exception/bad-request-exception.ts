class BadRequestException extends Error {
  public constructor(message = 'Bad request') {
    super(message)
    Object.setPrototypeOf(this, BadRequestException.prototype)
  }
}

export default BadRequestException
