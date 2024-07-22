const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const twoBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const threeBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f9',
    title: 'React patterns 2',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10,
    __v: 0
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.mostLikesPerBlog(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.mostLikesPerBlog(blog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    
    const result = listHelper.mostLikesPerBlog(twoBlogs)
    assert.strictEqual(result, 12)
  })

  describe('most favorite', () => {
    test('returns author with the biggest amount of blogs and blogs count', () => {
    
      const result = listHelper.mostBlogs(threeBlogs)
      assert.notStrictEqual(result, {author: 'Michael Chan', blogs: 2})
    })

    test('of a bigger list returns blog with biggest amount of likes', () => {
    
      const result = listHelper.favoriteBlog(twoBlogs)
      assert.strictEqual(result.likes, 7)
    })

    test('returns author with the biggest amount of likes from all blogs', () => {
    
      const result = listHelper.totalMostLikes(threeBlogs)
      assert.notStrictEqual(result, {author: 'Michael Chan', likes: 17})
    })

  })
})
