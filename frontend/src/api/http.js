import axios from "axios"

export default axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://ask-jarvis-be.vercel.app/',
  // baseURL: 'api/',
  headers: {
    'Content-type': 'application/json'
  }
});