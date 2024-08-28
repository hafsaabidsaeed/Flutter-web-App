// importing packages 
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');   
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const _ = require('lodash');
const { timeLog } = require('console');

//create account
router.post('/create-account', async (req, res) => {
    //validate request
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    //create new user
    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return res.send('success');

    //sign in 
    function validateSignIn(credentials) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(credentials);
}
});
router.post('/sign-in', async (req, res) => {
    //validate request
    const { error } = validateSignIn(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email : req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    const token = user.generateAuthToken();
    response = {'token': token, 'email': user.email, 'memos': user.memos};
    return res.send(response);
});

//add memo
function validateMemo(content){
    const schema = Joi.object({
        content: Joi.string().min(1).required()
    });     
    return schema.validate(content);
}

router.post('/add-memo', auth, async (req, res) => {
    const { error } = validateMemo(req.body);
    if (error) return res.status(400).send('Invalid add memo request');
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send('Not authorized to perform this function');
    user.memos.push({
        timeStamp: Date(),
        content: req.body.content,
    });
    user.save();
});

//delete memo
function validateDeleteMemoRequest(content){
    const schema = Joi.object({
        index: Joi.number().integer().required(),
    });
    return schema.validate(content);
}

router.post('/delete-memo', auth, async (req, res) => {
    const { error } = validateDeleteMemoRequest(req.body);
    if (error) return res.status(400).send('Invalid delete memo request');
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send('Not authorized to perform this function');
    user.memos.splice(req.body.index, 1);
    user.save();
    return res.send(user.memos);
});

//export
module.exports = router;

