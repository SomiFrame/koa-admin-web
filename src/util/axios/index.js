import axios from 'axios'
const api_url = process.env.VUE_APP_API_URL
const instance = axios.create({
    baseURL: api_url,
    timeout: 3000
})

export default instance
