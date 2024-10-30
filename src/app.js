// Import required dependencies
import express from 'express'                         // Web application framework
import cors from 'cors'                               // Cross-Origin Resource Sharing middleware
import { writeLog } from './middleware/requestLogger.middleware.js' // Custom logging middleware for request tracking
import apiRoutes from './routes/api.routes.js'       // API route definitions for users and events

/**
 * Creates and configures an Express application instance
 * @returns {express.Application} Configured Express app
 */
export default _ => {
    // Define base API URL path
    const URL = '/api'
    
    // Initialize Express application
    const app = express()

    // Configure global middleware
    app.use(express.json())  // Parse JSON request bodies
    app.use(cors())          // Allow cross-origin requests

    // Mount API routes with logging middleware
    // All routes under /api will be logged and handled by apiRoutes
    app.use(URL, writeLog, apiRoutes())

    /**
     * Global error handling middleware
     * Catches all errors thrown in the application and sends standardized response
     */
    app.use((err, req, res, next) => {
        // Log full error stack for debugging
        console.error('CUSTOM ERROR: ', err.stack)

        // Send error response to client
        res
            .status(err.statusCode)
            .json({
                error: err.name,
                message: err.message,
            })
    })

    return app
}
