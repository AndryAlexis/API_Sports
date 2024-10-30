import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UnauthorizedAccess } from '../errors/client.error.js'
import verifyToken from '../utils/verifyToken.js'

/**
 * Middleware to check if user has admin role
 * Requires authTokenMiddleware to run first to validate the token
 * 
 * @param {Request} req - Express request object 
 * @param {Response} _ - Express response object (unused)
 * @param {NextFunction} next - Express next middleware function
 */
export default async (req, _, next) => {
    try {
        // Load environment variables
        dotenv.config()

        // Get token from Authorization header
        const { authorization: token } = req.headers
        
        // Verify and decode token
        const user = verifyToken(token)

        // Check if user has admin role
        if (user.role !== 'admin') {
            throw new UnauthorizedAccess('Admin access required')
        }

        next()
    } catch (error) {
        return next(error)
    }
}
