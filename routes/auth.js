const express = require('express')
const User = require('../models/user')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')

//post a new user to user collection (signing up)
//you'll have to do this in Postman for now 'http://localhost:6069/auth/signup"
authRouter.post('/signup', (req, res, next) => {
    //Try to find a user with that name -- if it exists tell them to try a new one
    User.findOne({username: req.body.username}, (err, existinguser) => {
        if (err) {
            res.status(500)
            return next (err)
        }
        //If DB doesn't return null there's already a user with that name
        if (existinguser !== null) {
            res.status(400)
            return next(new Error("Sorry, somebody already has that username! Please try another."))
        }
        //If everything has been good up until this point we will create a new user in the DB
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            if (err) {
                res.status(500)
                return next (err)
            }
            //If they sign up they might as well get a token immediately
            const token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.status(201).send({success: true, user: user.toObject(), token})
        })
    })
})

authRouter.post('/login', (req, res, next) => {
    //Try to find a user with the submitted username (lowercased)
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            return next (err)
        }
        //If they aren't in the database OR the password is wrong:
        if (!user || user.password !== req.body.password) {
            req.status(403)
            return next(new Error('The login ID or password are incorrect (or both, I dunno.)'))
        }

        //Here's the fun part...If username and pw match an entry in the DB, we create a JWT and pass in the secret (an encryption key?)
        const token = jwt.sign(user.toObject(), process.env.SECRET)

        //send the token back to the client app
        return res.send({ user: user.toObject(), token })
    })
})

module.exports = authRouter