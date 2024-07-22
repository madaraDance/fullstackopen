require('express-async-errors')
const blogPostsRouter = require('express').Router()
const Blog = require('../models/blogpost')


blogPostsRouter.get('/', async (request, response) => {
  const blogPostsFromDB = await Blog.find({})
  response.status(200).json(blogPostsFromDB)
})
  
blogPostsRouter.post('/', async (request, response) => {
  const body = request.body

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlogPost = await blogPost.save()
  response.status(201).json(savedBlogPost)

})

module.exports = blogPostsRouter
