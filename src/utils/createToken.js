import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import DEFAULT_VALUE from './defaultValues.js'

/**
 * Creates a JWT token for user authentication
 * @param {Object} params - Token parameters
 * @param {string} params.username - Username to encode in token
 * @param {string} [params.role] - Optional user role to encode in token
 * @returns {string} Signed JWT token
 */
export default ({username, role}) => {
    // Load environment variables
    dotenv.config()
    
    // Get token secret key from env or fallback to default
    const TOKEN_KEY = process.env.TOKEN_KEY || DEFAULT_VALUE.TOKEN_KEY
    
    // Sign token with user data and optional expiration
    return jwt.sign(
        { username, role }, 
        TOKEN_KEY
    )
}