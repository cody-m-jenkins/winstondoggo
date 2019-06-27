const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'No description provided'
    },
    body: {
        type: String,
        default: 'There is nothing here'
    },
    image: Buffer,
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array
    }
})

module.exports = mongoose.model('Blog', blogSchema)
