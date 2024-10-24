import requestStatus from '../utils/requestStatus.js'

export default class ServerError extends Error {
    constructor(name = 'Server Error', message = 'Something went wrong.', statusCode = requestStatus.ERROR.SERVER.INTERNAL) {
        super(message)

        this.name = name
        this.statusCode = statusCode
    }
}