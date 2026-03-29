function formatMessage(level: LoggingLevel, message: string): string {
  return `${new Date().toISOString()} - [${level}] - ${message}`
}

export function info(message: string): void {
  console.info(formatMessage('INFO', message))
}

export function error(error: Error): void {
  console.error(
    `${formatMessage('ERROR', error.message)} - ${JSON.stringify(error)}`
  )
}

type LoggingLevel = 'INFO' | 'ERROR'
