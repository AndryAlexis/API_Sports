export default class ServerError extends Error {
    constructor(name = 'Server Error', message = 'Something went wrong.', statusCode = 500) {
        super(message)

        this.name = name
        this.statusCode = statusCode
    }
}