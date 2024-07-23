const Blog = require('../models/blogpost')
const User = require('../models/users')

const initialBlogPosts = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }
  ]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

  module.exports = {
    initialBlogPosts,
    usersInDb
  }