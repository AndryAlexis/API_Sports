// Importing JWT library to handle token verification
import jwt from 'jsonwebtoken'
// Importing dotenv to manage environment variables
import dotenv from 'dotenv'

// Importing default values for fallback use cases
import DEFAULT_VALUE from '../utils/defaultValues.js'

export default token => {
    // Loading environment variables from .env file
    dotenv.config()
    // Retrieve token key, using default if not set in environment
    const TOKEN_KEY = process.env.TOKEN_KEY || DEFAULT_VALUE.TOKEN_KEY

    // Verify token and decode user information
    const userInfo = jwt.verify(token, TOKEN_KEY)

    return userInfo
}
