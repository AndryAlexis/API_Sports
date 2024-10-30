import pool from '../../config/db.js'
import { processQueryResults } from '../../utils/helper.js'

const db = pool()

/**
 * Retrieves events organized by a specific user
 * @param {string} organizer - Username of the organizer
 * @returns {Promise<Array|null>} Array of events or null if none found
 */
const selectByOrganizer = async organizer => {
    const [events] = await db.query(
        'SELECT * FROM events WHERE organizer = ?',
        [organizer]
    )
    return processQueryResults(events)
}

/**
 * Retrieves all events from the database
 * @returns {Promise<Array|null>} Array of all events or null if none exist
 */
const selectAll = async () => {
    const [events] = await db.query('SELECT * FROM events')
    return processQueryResults(events)
}

/**
 * Retrieves a single event by its ID
 * @param {number} id - Event ID to lookup
 * @returns {Promise<Object|null>} Event object or null if not found
 */
const selectById = async id => {
    const [events] = await db.query('SELECT * FROM events WHERE id = ?', [id])
    return processQueryResults(events, true)
}

/**
 * Creates a new event in the database
 * @param {Object} eventData - Event details
 * @returns {Promise<number|null>} New event ID or null if insert failed
 */
const insert = async ({name, description, date, location, sportType, organizer, image}) => {
    const [result] = await db.query(`
        INSERT INTO events (name, description, date, location, sportType, organizer, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, description, date, location, sportType, organizer, image])

    return result.insertId || null
}

/**
 * Updates an existing event by ID
 * @param {Object} eventData - Updated event details including ID
 * @returns {Promise<boolean>} True if update succeeded, false otherwise
 */
const updateById = async ({id, name, description, date, location, sportType, organizer}) => {
    const [result] = await db.query(`
        UPDATE events 
        SET name = ?, description = ?, date = ?, 
            location = ?, sportType = ?, organizer = ?
        WHERE id = ?
    `, [name, description, date, location, sportType, organizer, id])
    
    return result.affectedRows === 1
}

/**
 * Deletes an event by ID
 * @param {number} id - ID of event to delete
 * @returns {Promise<boolean>} True if deletion succeeded
 */
const removeById = async id => {
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id])
    return result.affectedRows === 1
}

/**
 * Retrieves all upcoming events (events with dates >= current date)
 * @returns {Promise<Array|null>} Array of upcoming events or null if none found
 */
const selectUpcoming = async () => {
    const [events] = await db.query(`
        SELECT * FROM events 
        WHERE date >= CURDATE()
        ORDER BY date ASC
    `)
    return processQueryResults(events)
}

/**
 * Retrieves events filtered by sport type
 * @param {string} sportType - Sport type to filter by
 * @returns {Promise<Array|null>} Filtered events or null if none found
 */
const selectBySportType = async (sportType) => {
    const [events] = await db.query(`
        SELECT * FROM events
        WHERE sportType = ?    
    `, [sportType])
    return processQueryResults(events)
}

/**
 * Retrieves events within a date range
 * @param {string} from - Start date (YYYY-MM-DD)
 * @param {string} to - End date (YYYY-MM-DD)
 * @returns {Promise<Array|null>} Events within range or null if none found
 */
const selectByRangeOfDate = async (from, to) => {
    const [events] = await db.query(`
        SELECT * FROM events 
        WHERE date BETWEEN ? AND ?
        ORDER BY date ASC
    `, [from, to])
    return processQueryResults(events)
}

/**
 * Retrieves paginated events
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Number of events per page
 * @returns {Promise<Array|null>} Paginated events or null if none found
 */
const selectByPagination = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit
    const [events] = await db.query(`
        SELECT * FROM events
        LIMIT ? OFFSET ?
    `, [Number(limit), offset])
    return processQueryResults(events)
}

export {
    selectByOrganizer,
    selectAll,
    selectById,
    insert,
    updateById,
    removeById,
    selectUpcoming,
    selectBySportType,
    selectByRangeOfDate,
    selectByPagination
}