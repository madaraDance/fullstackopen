import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return request.then(response => response.data)
}

const addNewBlog = async (token, newBlog) => {
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
    );
  
    if (response.status === 201) {
      return response.data
    }
  } catch (e) {
    console.log(e)
    return null
  }

}

export default { getAll, addNewBlog }