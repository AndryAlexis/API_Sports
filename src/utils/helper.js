import { selectById } from "../models/api/events.models.js";
import { NumberError, EventNotFound } from "../errors/client.error.js";

/**
 * Helper function to handle common query result processing
 * @param {Array} events - Query results array
 * @param {boolean} returnFirst - Whether to return first item or full array
 * @returns {Array|Object|null} Processed query results
 */
const processQueryResults = (events, returnFirst = false) => {
    if (events.length === 0) return null
    return returnFirst ? events[0] : events
}

/**
 * Forwards any errors caught in controllers to Express error handling middleware.
 * This ensures consistent error handling across the application.
 * 
 * @param {Error} error - The caught error object to be handled
 * @param {Function} next - Express next() function to pass error to error middleware
 * @returns {Function} Passes error to Express error handling chain
 */
const handleControllerError = (error, next) => next(error);

/**
 * Checks if all required query parameters exist in the request.
 * For example, if ['from', 'to'] are required, validates both exist.
 * 
 * @param {Object} params - The query parameters from the request (req.query)
 * @param {Array<string>} requiredParams - List of parameter names that must exist
 * @returns {boolean} true if all required parameters are present, false if any are missing
 */
const validateKeysObject = (params, requiredParams) => requiredParams.every(param => params[param]);

/**
 * Converts input to string and removes leading/trailing whitespace
 * @param {*} input - The value to process
 * @returns {string} Trimmed string representation of input
 */
const parseAndTrim = input => String(input).trim();

/**
 * Validates an event ID and fetches the corresponding event.
 * Performs two checks:
 * 1. Verifies the ID is a valid integer
 * 2. Confirms an event exists with that ID
 * 
 * @param {number} eventId - The event ID to validate and lookup
 * @throws {NumberError} When the ID is not a valid integer
 * @returns {Promise<Object>} The found event object
 */
const validateNumber = (eventId, {title = 'Invalid number', message = 'Must be a valid number'}) => {
    // Convert to number and check if it's a valid integer
    if (isNaN(eventId)) {
        throw new NumberError(title, message);
    }

    // Check if the ID is a floating point number
    if (eventId % 1 !== 0) {
        throw new NumberError(title, message);
    }

    const parsedId = parseInt(eventId);

    if (parsedId <= 0) {
        throw new NumberError(title, message);
    }

    return parsedId;
}

const validateAndGetEventById = async eventId => {
    const validatedId = validateNumber(eventId, {title: 'Invalid number', message: 'Event ID must be a valid number'});
    
    // Then attempt to fetch the event
    const event = await selectById(validatedId);
    if (!event) {
        throw new EventNotFound("Event not found", "Could not find an event with that ID.");
    }

    return event;
}

/**
 * Validates if a sport type value is provided and not empty
 * @param {string} sportType - The sport type to validate
 * @throws {QueryNotFound} When sport type is missing or empty
 * @returns {string} The validated and trimmed sport type
 */
const validateSportType = sportType => {
    if (!sportType || parseAndTrim(sportType) === '') {
        throw new QueryNotFound('Sport type not found', 'You must provide a valid sport type');
    }
    return parseAndTrim(sportType);
}


export {
    processQueryResults,
    handleControllerError,
    validateKeysObject,
    validateNumber,
    validateAndGetEventById,
    parseAndTrim
}
