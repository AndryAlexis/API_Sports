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

const insertNew = async (username, password) => {
    const [{insertId}] = await db.query(`
        INSERT INTO users (username, password) VALUES (?,?)
    `, [username, password])  
    
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
    selectById
}