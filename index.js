// Import required modules
import http from 'node:http'          // Node.js built-in HTTP server module
import expressApp from './src/app.js' // Express application instance
import dotenv from 'dotenv'           // Environment variables management
import DEFAULT_VALUE from './src/utils/defaultValues.js' // Default configuration values

// Immediately Invoked Function Expression (IIFE) to encapsulate server setup
(() => {
    // Define server event type constants for better maintainability
    const SERVER_EVENT = {
        LISTENING: 'listening', // Event fired when server starts listening
        ERROR: 'error'         // Event fired when server encounters an error
    }

    // Initialize environment variables from .env file
    dotenv.config()

    // Create HTTP server instance using Express application
    const server = http.createServer(expressApp())

    // Get port number from environment variables or use default
    // This allows for flexible deployment configurations
    const API_PORT = process.env.API_PORT || DEFAULT_VALUE.API_PORT

    // Start the server on the configured port
    server.listen(API_PORT)

    // Configure server event handlers
    server.on(SERVER_EVENT.LISTENING, () => {
        // Log successful server start
        console.log(`Server listening on port ${API_PORT}`)
    })

    server.on(SERVER_EVENT.ERROR, (error) => {
        // Log any server errors for debugging
        // In production, this should be replaced with proper error logging
        console.log(error)
    })
})()
