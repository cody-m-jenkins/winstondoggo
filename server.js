const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Global middleware for every request
app.use(express.json()) //creates req.body

mongoose.connect(
    'mongodb://localhost:27017/doggoadventures', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => {
    console.log("Connected to the Database")
})

app.use('/blogs', require('./routes/blogRoutes.js'))

app.listen(6067, () => console.log('Server is running'))