class Logger {
    private static formatMessage(level: LoggingLevel, message: string): string {
        return `${new Date().toISOString()} - [${level}] - ${message}`;
    }

    public static info(message: string): void {
        console.log(Logger.formatMessage(LoggingLevel.INFO, message));
    }
}

enum LoggingLevel {
    INFO = 'INFO'
}

export default Logger;