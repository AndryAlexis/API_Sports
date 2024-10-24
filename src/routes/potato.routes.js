import express from 'express'; 
import {getAll, getById} from '../controllers/potato.controller.js'

export default _ => {
    // ROOT URL for this route: /api/
    const URL = '/potato'  // Set the base URL for the potato-related routes
    const router = express.Router()  // Create a new router instance from Express

    // Use the potatoController for handling requests at the /potato endpoint
    router.get(URL, getAll)
    router.get(`${URL}/:id`, getById)

    // Return the router to be used in the main app
    return router
}
