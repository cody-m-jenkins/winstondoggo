const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

//Global middleware for every request
app.use(express.json()) //creates req.body
//Use authentication middleware on anything using "/admin" route
app.use('/admin', expressJwt({secret: process.env.SECRET}))

mongoose.connect(
    'mongodb://localhost:27017/doggoadventures', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => {
    console.log("Connected to the Database")
})

//allows users to view blog even though they aren't logged in
app.use('/', require('./routes/blogRoutes.js'))

//this is to make it so the admin is able to post, put, and delete things
app.use('/admin', require('./routes/adminRoutes.js'))
//makes it so you need to have a token -- THIS BREAKS THE SERVER
// app.use('/admin', express.Jwt({secret: process.env.SECRET}))

app.use('/auth', require('./routes/auth.js'))

app.listen(6069, () => console.log('Server is running'))