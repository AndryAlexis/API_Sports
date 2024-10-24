### Basic requirements.
- API must be developed by Express.js.
- The data base could be created trough MongoDB or MySQL.
- An authentication system MUST be implemented using JWT to protect routes which handler events.

### Authentication routes.
- POST /api/users/register.
    - Alows to register new event organizer.
    - MUST write a "username" and "password" and to save the password, but encrypt it (bcrypt library).

- POST /api/users/login.
    - Alows the users authentify.
    - RETURNS a JWT token if the credentials are corrects.
        - The token must be used to access to the protected API routes

- GET /api/users/profile.
    - THIS ROUTE IS OPTIONAL.
    - Returns the information of the authentify user.
    - MUST be protected and just accesible to the logged user.

TODO

THERE ARE MORE THINGS TO DO