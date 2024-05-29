import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let sessionToken = null

const setToken = newToken => {
  sessionToken = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl, { headers: { Authorization: sessionToken } })
  return request.then(response => response.data)
}

const createNewPost = (blog) => {
  const request = axios.post(baseUrl, blog, { headers: { Authorization: sessionToken } })
  return request.then(response => response.data)
}

export default { getAll, setToken, createNewPost }