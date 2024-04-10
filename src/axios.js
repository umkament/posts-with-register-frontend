import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BLOG_API
})


instance.interceptors.request.use((config)=>{
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})