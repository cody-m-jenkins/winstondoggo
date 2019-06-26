const express = require('express')
const adminRouter = express.Router()
const Blog = require('../models/blogSchema.js')

adminRouter.post('/', (req, res) => {
    const newBlog = new Blog(req.body)
    newBlog.save((err, savedBlog) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(201).send(savedBlog)
    })
})

//Get for all items in DB
adminRouter.get('/', (req, res) => {
    Blog.find((err, allBlogs) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(allBlogs)
    })
})

//Get by ID
adminRouter.get('/:_id', (req,res) => {
    Blog.findOne({_id: req.params._id}, (err, foundBlog) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(foundBlog)
    })
})

//Delete by ID
adminRouter.delete('/:_id', (req, res) => {
    Blog.findOneAndDelete({_id: req.params._id}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(202).send(`Deleted blog post titled:"${deletedItem.title}""`)
    })
})

module.exports = adminRouter