require('express-async-errors')
const blogPostsRouter = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/users')
const middleware = require('../utils/middleware');


blogPostsRouter.get('/', async (request, response) => {
  const blogPostsFromDB = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.status(200).json(blogPostsFromDB)
})
  
blogPostsRouter.post('/', middleware.userExtractor, async (request, response) => {

  const body = request.body
  let user = request.user
  

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

blogPostsRouter.delete('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const { id } = request.body


  const blogToDelete = await Blog.findById(id).populate('user', {username: 1})
  
  if (!blogToDelete) {
    return response.status(400).json({error: "Blog with given id doesn't exist"})
   }
  
  if (blogToDelete.user.id.toString() !== user.id.toString()) {
    return response.status(400).json({error: "Only user who created blog can delete it"})
  }

  await Blog.findByIdAndDelete(id)

  user.blogs = user.blogs.filter(blog => blog._id.toString() !== blogToDelete._id.toString())
  await user.save()

  response.status(200).send('Blog post deleted')
})

module.exports = blogPostsRouter
