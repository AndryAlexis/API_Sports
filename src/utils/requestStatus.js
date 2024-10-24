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
            NOT_FOUND : 404
        },
        SERVER : {
            INTERNAL : 500,
        }
    }
}