import bcrypt from 'bcryptjs'

import REQUEST_STATUS from '../../utils/requestStatus.js';
import ServerError from '../../errors/server.error.js'
import {UserExistsError, IncorrectCredentials} from '../../errors/client.error.js'
import {
    insertNew, selectById,
    selectByUserName
} from '../../models/api/users.models.js'
import checkIfUserExists from '../../utils/checkIfUserExists.js'
import createToken from '../../utils/createToken.js'

const register = async (req, res, next) => {
    let {body : {username, password}} = req
    const SALT_ROUNDS = 10
    const preEncryptedPassword = password
    password = await bcrypt.hash(password, SALT_ROUNDS)

    let createdUser = null

    try {
        if (await checkIfUserExists(username))
            throw new UserExistsError()

        const newUserId = await insertNew(username, password)
        if (!newUserId)
            throw new ServerError()
        
        createdUser = await selectById(newUserId)
    } catch (error) {
        return next(error)
    }

    createdUser.password = preEncryptedPassword

    res
        .status(REQUEST_STATUS.SUCCESFULL.CREATED)
        .json(createdUser)
}

const login = async (req, res, next) => {
    let {body : {username, password}} = req

    let user = null
    try {
        if (!await checkIfUserExists(username))
            throw new IncorrectCredentials()

        user = await selectByUserName(username)
        const passwordsAreEquals = await bcrypt.compare(password, user.password)
        
        if (!passwordsAreEquals)
            throw new IncorrectCredentials()
    } catch (error) {
        return next(error)
    }

    res.json({
        token : createToken({
            username : user.username
        })
    })
}

const profile = async (req, res, next) => {
    try {
        
    } catch (error) {
        return next(error)
    }

    res.json({
        profile : req.username
    })
}

export {
    register,
    login,
    profile
}