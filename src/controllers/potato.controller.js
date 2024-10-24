import {selectAllPotatoes, selectPotatoById} from '../models/potato.model.js'

const getAll = async (req, res, next) => {
    let result = null

    try {
        result = await selectAllPotatoes()
    } catch (error) {
        return next(error)
    }

    res.json(result)
}


const getById = async (req, res, next) => {
    const {id} = req.params
    let result = null

    try {
        [result] = await selectPotatoById(id)
    } catch (error) {
        return next()
    }

    res.json(result)
}

export {
    getAll,
    getById
}