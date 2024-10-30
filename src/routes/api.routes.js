import express from 'express'
import userRoutes from './api/users.routes.js'
import eventRoutes from './api/events.routes.js'
import authTokenMiddleware from '../middleware/authToken.middleware.js'

/**
 * Configures and exports the main API router
 * @returns {express.Router} Configured Express router with all API routes
 */
export default _ => {
    // Create a new router instance to define API routes
    const router = express.Router()

    // Mount user-related routes under /api/users
    // Handles user authentication, profiles, etc.
    router.use('/users', userRoutes())

    // Mount event-related routes under /api/events
    // Handles CRUD operations for sports events
    router.use('/events', authTokenMiddleware, eventRoutes())

    // Return the configured router to be mounted in the main Express app
    return router
}
