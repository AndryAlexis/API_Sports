import pool from '../../config/db.js'

const db = pool()

const selectByUserName = async (username) => {
    const [result] = await db.query(`
        SELECT * FROM users WHERE username = ?
    `, [username])

    if (result.length === 0)
        return null

    const [user] = result

    return user
}

/**
 * Gets all valid sport types from the events table's sportType enum column
 * @returns {Promise<string[]>} Array of valid sport type values
 */
const selectSportTypeEnumValues = async () => {
    // Query the database metadata to get the enum values for sportType column
    let [result] = await db.query(`
        SELECT COLUMN_TYPE 
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'events'
        AND COLUMN_NAME = 'sportType';
    `);

    // Extract the COLUMN_TYPE value from the first row
    result = result[0].COLUMN_TYPE
    // Remove 'enum(' prefix and closing ')' from the type definition
    result = result.substring(5, result.length - 1)
    // Remove single quotes around each enum value
    result = result.replaceAll("'", '')
    // Split the comma-separated values into an array
    result = result.split(',')

    // Extract and parse the enum values from the result
    // Removes first and last characters (quotes) and splits into array
    return result
}

const insertNew = async (username, password) => {
    const [{insertId}] = await db.query(`INSERT INTO users (username, password) VALUES ( ?, ? )`, [username, password])  
    
    if (insertId === 0) 
        return null

    return insertId
}

const selectById = async id => {
    const [result] = await db.query(`
        SELECT * FROM users WHERE id = ?
    `, [id])

    const [user] = result

    return user
}

export {
    selectByUserName,
    insertNew,
    selectById,
    selectSportTypeEnumValues
}