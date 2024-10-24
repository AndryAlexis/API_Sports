import {selectByUserName} from '../models/api/users.models.js'

export default async username => await selectByUserName(username) ? true : false