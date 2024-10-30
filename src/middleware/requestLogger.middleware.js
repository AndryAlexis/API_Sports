import dayjs from 'dayjs'
import fs from 'node:fs/promises'
import path from 'path'

/**
 * Middleware that logs incoming HTTP requests to a file
 * Captures timestamp, URL, method, and client IP
 * 
 * @param {Request} req - Express request object
 * @param {Response} _ - Express response object (unused) 
 * @param {NextFunction} next - Express next middleware function
 */
const writeLog = async (req, _, next) => {
    try {
        // Configure logging path and ensure directory exists
        const LOG_DIR = './log'
        const LOG_PATH = path.join(LOG_DIR, 'main.log')
        await fs.mkdir(LOG_DIR, { recursive: true })

        // Format log entry with timestamp, URL, method and IP
        const currentDate = dayjs().format('DD-MM-YYYY HH:mm:ss')
        const clientIP = req.ip || req.connection.remoteAddress
        const content = `[${currentDate}] URL: ${req.url} METHOD: ${req.method} IP: ${clientIP}\n`

        // Append log entry asynchronously
        await fs.appendFile(LOG_PATH, content)
        next()
    } catch (error) {
        // Log error but don't block request pipeline
        console.error('Error writing to log file:', error)
        next()
    }
}

export {
    writeLog
}