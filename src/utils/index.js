import axios from "axios"
import router from '../router'

let service = axios.create({
  baseURL: '/api',
  timeout: 3000
})
// 路由拦截 加上token
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response拦截 取出data
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      ElMessage.error('身份验证过期,请重新登录');
      localStorage.removeItem('token')
      setTimeout(() => {
        router.push("/login");
      }, 1000)
    } else if (error.response.status === 404) {
      ElMessage.error(error.response.data);
    }
    return Promise.reject(error)
  }
)
export default service