export default class ClientError extends Error {
    constructor(name = 'Client Error.', message = 'Something went wrong.', statusCode = 400) {
        super(message)

        this.name = name
        this.statusCode = statusCode
    }
}