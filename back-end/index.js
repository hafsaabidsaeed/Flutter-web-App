// Description: This file is the entry point of the application.
const express = require('express'); // Importing the express module
const app = express(); // Creating an instance of express
require('./startup/db')(); // Connecting to the database
require('./startup/config')(); // Configuring the application

require('./startup/routes')(app); // Setting up the routes

const PORT = process.env.PORT || 3008; // Setting the port number

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`)); // Listening on the specified port

