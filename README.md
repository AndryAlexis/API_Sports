# Basic template to create an API using ExpressJs

## PREREQUISITES
- Node.js installed

## HOW TO START THE SERVER
- Open console by VSCode
- Write in the console:
    - npm i
    - npm run dev (Create the server by Nodemon)


## Run tests
- npm test

// TODO Actualizar la estructura de las carpetas

### Project Structure
    ├── .vscode
    │   ├── launch.json         # To debug using Nodemon
    │
    ├── src
    │   ├── config
    │   │   ├── db.js           # Database configuration
    │   │  
    │   ├── app.js              # Express app configuration
    │   ├── models              # Data models
    │   ├── controllers         # Route controllers
    │   ├── errors              # Error controllers
    │   ├── routes              # Application routes
    │   ├── utils
    │   │    ├── helper.js       # Miscelanious functions
    │   │    ├── middleware.js   # Generic middleware functions
    │   │
    │   │
    │
    │
    ├── .env                    # Environment variables
    ├── index.js                # Server creation and configuration
    ├── package.json            # Project metadata and dependencies
    ├── nodemon.json            # To control which files are able to update the nodemon server
