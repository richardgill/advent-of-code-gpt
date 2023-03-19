import _ from 'lodash'
import winston from 'winston'
import fs from 'fs'
import path from 'path'

const format = winston.format.combine(
  winston.format.printf((info) => `${info.message}`)
)

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format,
    }),
  ],
})

const generateFilename = (obj: any): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key} ${value}`)
    .join(', ')
    .replace(/[^a-zA-Z0-9\s,]+/g, '')
    .replace(/\s+/g, '')
    .replace(/,/g, '-')
    .toLowerCase()
    .substring(0, 245)
}

export async function setFileLogDestination(
  folder: string,
  obj: any,
  level = 'debug'
) {
  const filePath = path.join(folder, `${generateFilename(obj)}.md`)
  if (_.last(logger.transports) instanceof winston.transports.File) {
    logger.remove(_.last(logger.transports))
  }
  try {
    await fs.promises.unlink(filePath)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Failed to delete the log file: ${error.message}`)
      return
    }
  }

  logger.add(
    new winston.transports.File({
      level: level,
      filename: filePath,
      format: format,
    })
  )
}
