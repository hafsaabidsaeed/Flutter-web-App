const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { type } = require('os');
require('dotenv').config();


//user model 
const mongoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    memos: [
    {
        timeStamp:{
            type: Date,
        },
        content:{
            type: String,
            required: true,
        }
    }
    ]
});

mongoSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model('User', mongoSchema);

// REST Validation
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });

    return schema.validate(user);
}

//exports
module.exports = {
    User,
    validateUser
}