import express from 'express'
import {
    register,
    login, 
    profile
} from '../../controllers/api/users.controllers.js'
import authTokenMiddleware from '../../middleware/authToken.middleware.js'

/**
 * Configures and exports the users router with authentication routes
 * @returns {express.Router} Express router with configured user routes
 */
export default () => {
    const router = express.Router()

    // Authentication routes
    router.post('/register', register) // Create new user account
    router.post('/login', login)       // Login existing user
    
    // Protected routes (require valid auth token)
    router.get('/profile', authTokenMiddleware, profile) // Get user profile data

    return router
}