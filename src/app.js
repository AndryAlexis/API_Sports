// Import necessary modules
import express from 'express'                        // Express for server and routing
import cors from 'cors'                              // CORS middleware to enable Cross-Origin requests
import { writeLog } from './middleware/middleware.js'     // Custom logging middleware
import potatoRoutes from './routes/potato.routes.js' // Importing potato-related routes

// Exporting the function that creates and configures the Express app
export default _ => {
    const URL = '/api';  // Base URL path for potato routes
    const app = express()  // Create a new Express app instance

    app.use(express.json())  // Middleware to parse incoming JSON requests
    app.use(cors())          // Enable CORS for handling cross-origin requests
    
    // Route configuration
    app.use(URL, writeLog, potatoRoutes())
    // Assigns routes under the /potato URL, and applies logging middleware before route handling

    // Error handler middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);  // Log the error stack trace to the console

        res
            .status(err.statusCode)
            .json({
                error : err.name,
                message : err.message,
                status : err.statusCode
            })
    })

    return app  // Return the configured app
}
