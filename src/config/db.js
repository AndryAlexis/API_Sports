import mysql from 'mysql2'
import dotenv from 'dotenv'

export default _ => {
    dotenv.config()

    const {env: {
        DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME
    }} = process

    return mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_NAME
    }).promise()
}