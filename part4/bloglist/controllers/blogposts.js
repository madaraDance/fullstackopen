require('express-async-errors')
const blogPostsRouter = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/users')


blogPostsRouter.get('/', async (request, response) => {
  const blogPostsFromDB = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.status(200).json(blogPostsFromDB)
})
  
blogPostsRouter.post('/', async (request, response) => {
  const body = request.body
  let user

  if (body.userId === undefined || body.userId === null) {
    user = await User.findOne({})
  } else {
    user = await User.findById(body.userId)
  }

  if (body.likes  === undefined || body.likes === null) {
      body.likes = 0
  }
  

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlogPost = await blogPost.save()

  user.blogs = user.blogs.concat(savedBlogPost._id)
  await user.save()
  response.status(201).json(savedBlogPost)

})

module.exports = blogPostsRouter
