/**
 * Import custom error classes for handling various error scenarios
 */
import ClientError, { 
    EventNotFound, 
    UserNotFound, 
    QueryNotFound, 
    BodyNotFound
} from "../../errors/client.error.js";

/**
 * Import database operations for events
 */
import { 
    selectAll, 
    selectById, 
    insert, 
    updateById, 
    removeById, 
    selectUpcoming,
    selectBySportType,
    selectByRangeOfDate,
    selectByPagination
} from "../../models/api/events.models.js";

/**
 * Import user-related database operations
 */
import { selectByUserName, selectSportTypeEnumValues } from "../../models/api/users.models.js";

/**
 * Import utility functions and constants
 */
import REQUEST_STATUS from "../../utils/requestStatus.js";
import { 
    handleControllerError, 
    validateKeysObject, 
    validateAndGetEventById,
    validateNumber,
} from "../../utils/helper.js";

/**
 * Route handler to either get all events or filter by sport type
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise} Returns either all events or filtered events by type
 */
const getAllOrByType = (req, res, next) => {
    return req.query
        ? getAll(req, res, next)
        : getByType(req, res, next);
}

/**
 * Get events filtered by sport type
 * @param {Object} req - Express request object containing sport type in query
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Array>} JSON response with filtered events
 */
const getByType = async (req, res, next) => {
    try {
        const { type } = req.query;
        if (!type) {
            throw new QueryNotFound('Query not found', 'You must provide a sport type in the URL query');
        }

        const sportTypes = await selectSportTypeEnumValues();
        if (!sportTypes.includes(type)) {
            throw new ClientError('Invalid sport type', `Sport type must be one of: ${sportTypes.join(', ')}`);
        }

        const events = await selectBySportType(type);
        if (!events) {
            throw new EventNotFound('Events not found', `No events found for sport type: ${type}`);
        }

        res.json(events);
    } catch (error) {
        handleControllerError(error, next);
    } 
}

/**
 * Get all events from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Array>} JSON response with all events
 */
const getAll = async (req, res, next) => {
    try {
        const events = await selectAll();
        res.json(events);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Get a specific event by its ID
 * @param {Object} req - Express request object containing eventId parameter
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with the requested event
 */
const getById = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await validateAndGetEventById(eventId);
        res.json(event);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Create a new event
 * @param {Object} req - Express request object with event data in body and username
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with the created event
 */
const post = async (req, res, next) => {
    try {
        const { username } = req;
        if (!validateKeysObject(req.body, ['name', 'description', 'date', 'location', 'sportType'])) {
            throw new BodyNotFound('Body not found', 'You must provide name, description, date, location and sportType in the body');
        }
        const eventData = req.body;
        eventData.organizer = username;
        eventData.image = req.file?.path || null;

        const newEventId = await insert(eventData);
        if (!newEventId) {
            throw new ClientError();
        }

        const createdEvent = await selectById(newEventId);            
        res.status(REQUEST_STATUS.SUCCESFULL.CREATED).json(createdEvent);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Update an existing event by ID
 * @param {Object} req - Express request object with eventId parameter and update data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with the updated event
 */
const putById = async (req, res, next) => {
    try {
        let { eventId } = req.params;

        eventId = validateNumber(eventId, {title: 'Invalid number', message: 'Event ID must be a valid number'});
        
        if (!validateKeysObject(req.body, ['name', 'description', 'date', 'location', 'sportType', 'organizer'])) {
            throw new BodyNotFound('Body not found', 'You must provide name, description, date, location, sportType and organizer in the body');
        }

        const sportTypes = await selectSportTypeEnumValues();
        if (!sportTypes.includes(req.body.sportType)) {
            throw new ClientError('Invalid sport type', `Sport type must be one of: ${sportTypes.join(', ')}`);
        }

        const updateData = req.body;
        updateData.id = eventId;

        // Verify organizer exists
        const organizerExists = await selectByUserName(updateData.organizer);
        if (!organizerExists) {
            throw new UserNotFound('Organizer not found', 'The specified organizer does not exist');
        }

        const wasUpdated = await updateById(updateData);
        if (!wasUpdated) {
            throw new EventNotFound();
        }

        const updatedEvent = await selectById(eventId);
        res.json(updatedEvent);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Delete an event by ID
 * @param {Object} req - Express request object containing eventId parameter
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with the deleted event
 */
const deleteById = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const eventToDelete = await validateAndGetEventById(eventId);
        await removeById(eventId);
        res.json(eventToDelete);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Get all upcoming events
 * @param {Object} _ - Express request object (unused)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Array>} JSON response with upcoming events
 */
const getUpcoming = async (_, res, next) => {
    try {
        const events = await selectUpcoming();
        if (!events) {
            throw new EventNotFound('Events not found', 'No upcoming events found');
        }

        res.json(events);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Get events within a specified date range
 * @param {Object} req - Express request object with 'from' and 'to' dates in query
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Array>} JSON response with events in date range
 */
const getByRangeOfDate = async (req, res, next) => {
    try {
        const { from, to } = req.query;
        if (!validateKeysObject(req.query, ['from', 'to'])) {
            throw new QueryNotFound('Query not found', 'Both "from" and "to" dates are required');
        }

        const events = await selectByRangeOfDate(from, to);
        if (!events) {
            throw new EventNotFound('Events not found', 'No events found in the specified date range');
        }

        res.json(events);
    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Get paginated events
 * @param {Object} req - Express request object with page and limit in query
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Array>} JSON response with paginated events
 */
const getByPagination = async (req, res, next) => {
    try {
        if (!validateKeysObject(req.query, ['page', 'limit'])) {
            throw new QueryNotFound('Query not found', 'Both "page" and "limit" are required');
        }

        let { page, limit } = req.query;

        page = validateNumber(page, {title: 'Invalid number', message: 'Page must be a valid number'});
        limit = validateNumber(limit, {title: 'Invalid number', message: 'Limit must be a valid number'});

        const events = await selectByPagination(page, limit);
        if (!events) {
            throw new EventNotFound('Events not found', 'No events found for the specified page');
        }

        res.json(events);
    } catch (error) {
        handleControllerError(error, next);
    }
}

export {
    getAllOrByType,
    getByType,
    getAll,
    getById,
    post,
    putById,
    deleteById,
    getUpcoming,
    getByRangeOfDate,
    getByPagination
}
