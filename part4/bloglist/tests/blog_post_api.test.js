const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcryptjs')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blogpost')

const api = supertest(app)

  beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogPosts.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('blogposts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verify that BlogPost has a property id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blogPost = response.body[0]
    assert.strictEqual(blogPost.hasOwnProperty('id'), true)
})

test('verify that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
  
  const blogPost = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'testurl',
    likes: 10
  }

  let response = await api.post('/api/blogs')
    .send(blogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const savedBlogPost = response.body

  assert.deepStrictEqual(savedBlogPost.title, blogPost.title)

  response = await api.get('/api/blogs')
  const nubmerOfDataEntries = response.body.length

  assert.strictEqual(nubmerOfDataEntries, 3)

})

test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
  const blogPost = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'testurl',
  }

  let response = await api.post('/api/blogs')
    .send(blogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogPostFromDb = response.body

  assert.strictEqual(blogPostFromDb.likes, 0)

})

test('verify that if the title missing from the request data, the backend responds with the status code 400.', async () => {
  const blogPost = {
    author: 'Test Author',
  }

  await api.post('/api/blogs')
    .send(blogPost)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

describe('verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', () => {
  test('verify that if the title  missing from the request data, the backend responds with the status code 400.', async () => {
    const blogPost = {
      author: 'Test Author',
      url: 'testurl',
    }
  
    let response = await api.post('/api/blogs')
      .send(blogPost)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

  test('verify that if the url missing from the request data, the backend responds with the status code 400.', async () => {
    const blogPost = {
      title: 'Test Title',
      author: 'Test Author'
    }
  
    let response = await api.post('/api/blogs')
      .send(blogPost)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

})

after(async () => {
  await mongoose.connection.close()
  console.log('Connection closed')
})