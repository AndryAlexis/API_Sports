import express from 'express'
import {
    register, login, profile
} from '../../controllers/api/users.controllers.js'
import checkIfUserIsLogged from '../../middleware/checkIfUserIsLogged.js'

export default _ => {
    const router = express.Router()

    /*ROOT URL for this routes: 
    /api/users */
    router.post('/register', register)
    router.post('/login', login)
    router.get('/profile', checkIfUserIsLogged, profile)

    return router
}
