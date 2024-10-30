import express from 'express'
import { 
    getAllOrByType, 
    getById, 
    post, 
    putById, 
    deleteById, 
    getUpcoming, 
    getByRangeOfDate, 
    getByPagination 
} from '../../controllers/api/events.controllers.js'
import adminAuthMiddleware from '../../middleware/adminAuth.middleware.js'
import { singleFileUpload } from '../../middleware/imageUpload.middleware.js'

/**
 * Configures and exports the events router
 * @returns {express.Router} Configured Express router for event endpoints
 */
export default () => {
    const router = express.Router()

    // Public routes for retrieving events
    router
        .get('/', getAllOrByType)          // Get all events or filter by sport type
        .get('/upcoming', getUpcoming)     // Get future events
        .get('/date', getByRangeOfDate)    // Get events within a date range
        .get('/page', getByPagination)     // Get paginated events
        .get('/:eventId', getById)         // Get a specific event by ID

    // Protected routes that require authentication
    router
        .post('/', singleFileUpload, post)             // Create new event
        .put('/:eventId', putById)   // Update existing event
        .delete('/:eventId', adminAuthMiddleware, deleteById) // Delete event

    return router
}