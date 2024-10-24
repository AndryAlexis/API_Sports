import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' // Import dotenv to manage environment variables
import DEFAULT_VALUE from './defaultValues.js'

export default ({username}) => {
    dotenv.config()
    const TOKEN_KEY = process.env.TOKEN_KEY || DEFAULT_VALUE.TOKEN_KEY
    return jwt.sign({ username }, TOKEN_KEY)
}