class Logger {
  private static formatMessage(level: LoggingLevel, message: string): string {
    return `${new Date().toISOString()} - [${level}] - ${message}`
  }

  public static info(message: string): void {
    console.info(Logger.formatMessage(LoggingLevel.INFO, message))
  }

  public static error(error: Error): void {
    console.error(
      `${Logger.formatMessage(
        LoggingLevel.ERROR,
        error.message
      )} - ${JSON.stringify(error)}`
    )
  }
}

enum LoggingLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}

export default Logger
