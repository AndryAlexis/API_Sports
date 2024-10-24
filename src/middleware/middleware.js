import dayjs from 'dayjs'
import fs from 'node:fs/promises'

const writeLog = async (req, _, next) => {
    const LOG_PATH = './log/main.log'
    const currentDate = dayjs().format('DD-MM-YYYY HH:mm:ss')
    const content = `[${currentDate}] URL: ${req.url} METHOD: ${req.method}\n`

    await fs.appendFile(LOG_PATH, content)

    next()
}

export {
    writeLog
}