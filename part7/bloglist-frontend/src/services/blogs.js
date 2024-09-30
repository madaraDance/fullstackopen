import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return request.then(response => response.data)
}

const addNewBlog = async (newBlog) => {
  try {
    const response = await axios.post(baseUrl, 
      {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
  
    if (response.status === 201) {
      console.log(response.data)
      return response.data
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

const updateBlog = async (blogToUpdate) => {

  const response = await axios.put(baseUrl, 
    { 
      blogToUpdate
    },
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  if (response.status === 201) {
    return response.data
  }
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, 
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  if (!response || response.status !== 200) {
    return null
  }

  return response.data
}

export default { getAll, addNewBlog, updateBlog, deleteBlog, setToken}