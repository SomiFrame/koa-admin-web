import axios from 'axios'
const api_url = process.env.VUE_APP_API_URL
const instance = axios.create({
    baseURL: api_url,
    timeout: 3000
})
instance.interceptors.request.use(config=>{
    return config
},err=>{
    return Promise.reject(err)
})
instance.interceptors.response.use(res=>{
    console.log(res)
    return res
},err=>{
    console.log(err.response)
    return Promise.reject(err)
})
export default instance
