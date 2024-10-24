//Most common status
export default {
    SUCCESFULL : {
        OK: 200,
        CREATED: 201,
    },
    ERROR : {
        CLIENT : {
            BAD_REQUEST : 400,
            UNAUTHORIZED : 401,
            FORBIDDEN : 403,
            NOT_FOUND : 404,
            NOT_ACCEPTABLE : 406
        },
        SERVER : {
            INTERNAL : 500,
        }
    }
}