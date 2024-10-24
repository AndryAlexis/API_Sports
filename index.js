import http from 'node:http'          // Import the built-in HTTP module from Node.js
import expressApp from './src/app.js' // Import the Express app from the specified path
import dotenv from 'dotenv'           // Import dotenv to manage environment variables

(() => {
    const DEFAULT_PORT = 3000
    const SERVER_EVENT = {
        LISTENING: 'listening',
        ERROR: 'error'
    }

    // Load environment variables from .env file
    dotenv.config()

    // Server creation using the HTTP module
    const server = http.createServer(expressApp()) // Create a server that uses the Express app

    // Set the API port, defaulting to 3000 if not specified in environment variables
    const API_PORT = process.env.API_PORT || DEFAULT_PORT

    // Start the server and listen on the specified port
    server.listen(API_PORT)

    // Event listener for when the server starts listening
    server.on(SERVER_EVENT.LISTENING, () => {
        console.log(`Server listening on port ${API_PORT}`) // Log the port number
    })

    // Event listener for handling server errors
    server.on(SERVER_EVENT.ERROR, (error) => {
        console.log(error) // Log the error message to the console
    })
})()
