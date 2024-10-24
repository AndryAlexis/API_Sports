import express from 'express'
import userRoutes from './api/users.routes.js'

export default _ => {
    const router = express.Router()  // Create a new router instance from Express

    // ROOT URL for this routes: /api/
    router.use('/users', userRoutes())
    router.use('/events', () => {
        console.log('THIS IS STILL IN PROGRESS')
    })

    // Return the router to be used in the main app
    return router
}
