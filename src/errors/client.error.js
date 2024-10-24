import jwt from "jsonwebtoken"
import REQUEST_STATUS from "../utils/requestStatus.js"

export default class ClientError extends Error {
    constructor(
        name = 'Client Error', 
        message = 'Something went wrong.', 
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(message)

        this.name = name
        this.statusCode = statusCode
    }
}

class UserExistsError extends ClientError {
    constructor(
        name = 'User already exists', 
        message = 'You can\'t use that username because it\'s already taken.', 
        statusCode = REQUEST_STATUS.ERROR.CLIENT.UNAUTHORIZED
    ) {
        super(message)

        this.name = name
        this.message = message
        this.statusCode = statusCode
    }
}

class UserNotFound extends ClientError {
    constructor(
        name = 'User not found', 
        message = 'The user that you\'re trying to get doesn\'t exist.', 
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(message)

        this.name = name
        this.message = message
        this.statusCode = statusCode
    }
}

class IncorrectCredentials extends ClientError {
    constructor(
        name = 'Credentials are incorrect', 
        message = 'Perhaps your username or password were introduced incorrectly.', 
        statusCode = REQUEST_STATUS.ERROR.CLIENT.UNAUTHORIZED
    ) {
        super(message)

        this.name = name
        this.message = message
        this.statusCode = statusCode
    }
}

class TokenNotFound extends ClientError {
    constructor(
        name = 'Token not found', 
        message = 'You must pass a token.', 
        statusCode = REQUEST_STATUS.ERROR.CLIENT.FORBIDDEN
    ) {
        super(message)

        this.name = name
        this.message = message
        this.statusCode = statusCode
    }
}

class InvalidTokenSignature extends jwt.JsonWebTokenError {
    constructor(
        name = 'Invalid token signature', 
        message = 'Your token signature doesn\'t exist.', 
        statusCode = REQUEST_STATUS.ERROR.CLIENT.NOT_ACCEPTABLE
    ) {
        super(message)

        this.name = name
        this.message = message
        this.statusCode = statusCode
    }
}

export {
    UserExistsError,
    UserNotFound,
    IncorrectCredentials,
    TokenNotFound,
    InvalidTokenSignature
}