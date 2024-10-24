import pool from '../config/db.js'
import ServerError from '../errors/server.error.js'

const db = pool()

const selectAllPotatoes = async _ => {
    // const [result] = await db.query(`SELECT * FROM clientes LIMIT 1`)

    if (result.length === 0)
        throw new ServerError()

    return result
}

const selectPotatoById =  async id => {
    // EXAMPLE: const [result] = await db.query(`SELECT * FROM potatoes WHERE id = ?`, [id])
    return null
}

export {
    selectAllPotatoes,
    selectPotatoById
}