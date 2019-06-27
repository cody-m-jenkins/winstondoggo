const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blogSchema.js')


//Get for all items in DB
blogRouter.get('/', (req, res) => {
    Blog.find((err, allBlogs) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(allBlogs)
    })
})

//Get by ID
blogRouter.get('/:_id', (req,res) => {
    Blog.findOne({_id: req.params._id}, (err, foundBlog) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(foundBlog)
    })
})

module.exports = blogRouter