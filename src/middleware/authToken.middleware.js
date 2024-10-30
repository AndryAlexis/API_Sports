// Import JWT library for token verification and validation
import jwt from 'jsonwebtoken'

// Import dotenv to access environment variables like JWT secret key
import dotenv from 'dotenv'

// Import custom error classes for handling specific authentication scenarios:
// - TokenNotFound: When Authorization header is missing
// - IncorrectCredentials: When username from token doesn't exist in DB
// - InvalidTokenSignature: When token signature is invalid/expired
import { TokenNotFound, IncorrectCredentials, InvalidTokenSignature } from "../errors/client.error.js"

// Import utility functions for user validation
import checkIfUserExists from '../utils/checkIfUserExists.js' // Checks if username exists in DB
import verifyToken from '../utils/verifyToken.js' // Validates JWT token and extracts payload

/**
 * Middleware to authenticate requests using JWT tokens
 * 
 * Flow:
 * 1. Extracts token from Authorization header
 * 2. Verifies token signature and decodes payload
 * 3. Validates that user still exists in database
 * 4. Attaches username to request object for downstream use
 * 
 * @param {Request} req - Express request object
 * @param {Response} _ - Express response object (unused)
 * @param {NextFunction} next - Express next middleware function
 */
export default async (req, _, next) => {
    try {
        // Load environment variables for JWT secret key
        dotenv.config()

        // Get token from Authorization header
        const { authorization: token } = req.headers
        if (!token) {
            throw new TokenNotFound()
        }

        // Verify token signature and decode payload
        const user = verifyToken(token)
        
        // Ensure user still exists in database
        const userExists = await checkIfUserExists(user.username)
        if (!userExists) {
            throw new IncorrectCredentials()
        }

        // Add username to request for use in protected routes
        req.username = user.username
        next()

    } catch (error) {
        // Handle JWT-specific validation errors
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new InvalidTokenSignature())
        }
        // Pass through any other errors
        return next(error)
    }
}
