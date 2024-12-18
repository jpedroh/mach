function formatMessage(level: LoggingLevel, message: string): string {
  return `${new Date().toISOString()} - [${level}] - ${message}`
}

export function info(message: string): void {
  console.info(formatMessage(LoggingLevel.INFO, message))
}

export function error(error: Error): void {
  console.error(
    `${formatMessage(
      LoggingLevel.ERROR,
      error.message
    )} - ${JSON.stringify(error)}`
  )
}

enum LoggingLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
}
