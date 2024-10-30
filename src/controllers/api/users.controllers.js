/**
 * Import utility functions and constants
 */
import REQUEST_STATUS from '../../utils/requestStatus.js';
import ServerError from '../../errors/server.error.js'
import { UserExistsError, IncorrectCredentials, BodyNotFound } from '../../errors/client.error.js'
import {
    insertNew,
    selectById, 
    selectByUserName
} from '../../models/api/users.models.js'
import { selectByOrganizer } from '../../models/api/events.models.js';
import checkIfUserExists from '../../utils/checkIfUserExists.js'
import createToken from '../../utils/createToken.js'
import { hashText, compareTexts } from '../../utils/encryptation.js';
import { handleControllerError, parseAndTrim, validateKeysObject } from '../../utils/helper.js';

/**
 * Register a new user
 * @param {Object} req - Express request object with username and password in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with created user data
 */
const register = async (req, res, next) => {
    try {
        if (!validateKeysObject(req.body, ['username', 'password'])) {
            throw new BodyNotFound('Body not found', 'The body must contain \'username\' and \'password\' keys');
        }
        let { username, password } = req.body;

        username = parseAndTrim(username);
        password = parseAndTrim(password);
        
        // Check if username already exists
        if (await checkIfUserExists(username)) {
            throw new UserExistsError();
        }

        // Hash password and create user
        const hashedPassword = await hashText(password);
        const newUserId = await insertNew(username, hashedPassword);
        
        if (!newUserId) {
            throw new ServerError();
        }

        // Get created user data
        const createdUser = await selectById(newUserId);
        
        // Return user with original unhashed password
        createdUser.password = password;
        
        res.status(REQUEST_STATUS.SUCCESFULL.CREATED)
           .json(createdUser);

    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Authenticate existing user
 * @param {Object} req - Express request object with username and password in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with JWT token
 */
const login = async (req, res, next) => {
    try {
        if (!validateKeysObject(req.body, ['username', 'password'])) {
            throw new BodyNotFound('Body not found', 'The body must contain \'username\' and \'password\' keys');
        }

        let { username, password } = req.body;

        password = parseAndTrim(password);

        // Verify user exists
        const userExists = await checkIfUserExists(username);
        if (!userExists) {
            throw new IncorrectCredentials();
        }

        // Get user data and verify password
        const user = await selectByUserName(username);
        const passwordsMatch = await compareTexts(password, user.password);
        console.log('MATCH', passwordsMatch);

        if (!passwordsMatch) {
            throw new IncorrectCredentials();
        }

        // Generate JWT with user info
        const token = createToken({
            username: user.username,
            role: user.role
        });

        res.json({ token });

    } catch (error) {
        handleControllerError(error, next);
    }
}

/**
 * Get authenticated user's profile data
 * @param {Object} req - Express request object with username from auth token
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} JSON response with user profile and their events
 */
const profile = async (req, res, next) => {
    try {
        const { username } = req;

        // Get user data and their organized events
        const user = await selectByUserName(username);
        const userEvents = await selectByOrganizer(username);

        // Add events to user object
        user.events = userEvents;
        
        res.json(user);

    } catch (error) {
        handleControllerError(error, next);
    }
}

export {
    register,
    login,
    profile
}