import jwt from "jsonwebtoken"
import REQUEST_STATUS from "../utils/requestStatus.js"

/**
 * Base error class for handling client-side errors.
 * All other error classes inherit from this one.
 */
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

/**
 * Thrown when trying to create an account with a username that already exists
 */
class UserExistsError extends ClientError {
    constructor(
        name = 'Username Taken',
        message = 'This username is already being used by another account.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when trying to find a user that doesn't exist
 */
class UserNotFound extends ClientError {
    constructor(
        name = 'User Not Found',
        message = 'Could not find a user with that information.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.NOT_FOUND
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when login username/password is wrong
 */
class IncorrectCredentials extends ClientError {
    constructor(
        name = 'Wrong Login Details',
        message = 'The username or password you entered is incorrect.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.UNAUTHORIZED
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when an API request is missing its authentication token
 */
class TokenNotFound extends ClientError {
    constructor(
        name = 'Missing Token',
        message = 'This request requires an authentication token.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.UNAUTHORIZED
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when an authentication token is invalid or expired
 */
class InvalidTokenSignature extends jwt.JsonWebTokenError {
    constructor(
        name = 'Invalid Token',
        message = 'Invalid or expired authentication token.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.UNAUTHORIZED
    ) {
        super(message)
        this.name = name
        this.statusCode = statusCode
    }
}

/**
 * Thrown when trying to access an event that doesn't exist
 */
class EventNotFound extends ClientError {
    constructor(
        name = 'Event Not Found',
        message = 'Could not find an event with that information.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.NOT_FOUND
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when a request is missing required body data
 */
class BodyNotFound extends ClientError {
    constructor(
        name = 'Missing Request Data',
        message = 'This request requires a body with data.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when a request is missing required query parameters
 */
class QueryNotFound extends ClientError {
    constructor(
        name = 'Missing Query Parameters',
        message = 'This request requires query parameters.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when an ID parameter is not a valid number
 */
class IdError extends ClientError {
    constructor(
        name = 'Invalid ID',
        message = 'The ID must be a valid number.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(name, message, statusCode)
    }
}

class NumberError extends ClientError {
    constructor(
        name = 'Invalid number',
        message = 'The number must be valid.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.BAD_REQUEST
    ) {
        super(name, message, statusCode)
    }
}

/**
 * Thrown when a user tries to access a resource they don't have permission for
 */
class UnauthorizedAccess extends ClientError {
    constructor(
        name = 'Unauthorized Access',
        message = 'You do not have permission to access this resource.',
        statusCode = REQUEST_STATUS.ERROR.CLIENT.FORBIDDEN
    ) {
        super(name, message, statusCode)
    }
}

export {
    UserExistsError,
    UserNotFound,
    IncorrectCredentials,
    TokenNotFound,
    InvalidTokenSignature,
    EventNotFound,
    BodyNotFound,
    QueryNotFound,
    IdError,
    UnauthorizedAccess,
    NumberError
}