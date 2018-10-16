import axios from 'axios'
import jsCookie from 'js-cookie'
const api_url = process.env.VUE_APP_API_URL
const instance = axios.create({
    baseURL: api_url,
    timeout: 3000
})
instance.interceptors.request.use(config=>{
    const token = jsCookie.get('token')
    console.log(config.headers)
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},err=>{
    return Promise.reject(err)
})
instance.interceptors.response.use(res=>{
    console.log(res)
    return res
},err=>{
    console.log(err.response)
    const {response:{status}} = err
    if(status==401) {
        location.href="/login"
        jsCookie.remove('token')
    }
    return Promise.reject(err)
})
export default instance
