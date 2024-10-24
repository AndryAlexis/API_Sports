import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenNotFound, UserNotFound, InvalidTokenSignature } from "../errors/client.error.js"
import DEFAULT_VALUE from '../utils/defaultValues.js'
import checkIfUserExists from '../utils/checkIfUserExists.js'

export default async (req, _, next) => {
    const {authorization : token} = req.headers
    dotenv.config()

    let user = null

    try {
        if (!token)
            throw new TokenNotFound()

        const TOKEN_KEY = process.env.TOKEN_KEY || DEFAULT_VALUE.TOKEN_KEY
        user = jwt.verify(token, TOKEN_KEY)

        const userExists = await checkIfUserExists(user.username)
        if (!userExists)
            throw new UserNotFound()

    } catch (error) {
        console.log(error)
        try {
            if (error instanceof jwt.JsonWebTokenError)
                throw new InvalidTokenSignature()
            else
                throw error
        } catch (error) {
            return next(error)
        }
    }

    req.username = user.username

    next()
}