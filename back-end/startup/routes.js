const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const users = require('../routes/users');
const { create } = require('lodash');

module.exports = function(app) {
    app.use(express.json());
    app.use(cors()); 
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    // app.use('/api/create-account', create);
}