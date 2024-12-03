import winston from 'winston'

/**
 * Create a logger instance to write log messages in JSON format.
 *
 * @param loggerName - a name of a logger that will be added to all messages
 */
export default function createLogger(loggerName, logLevel = 'info') {
  return winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    defaultMeta: { name: loggerName },
    transports: [new winston.transports.Console()]
  })
}
