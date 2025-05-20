import axios, { type AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  timeout: 600,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.data.status == 0) {
      ElMessage({
        message: response.data.message,
        type: 'success',
      })
    }
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          ElMessage.error('请求错误')
          break
        case 401:
          ElMessage.error('未授权，请重新登录')
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error(`请求地址出错:${error.response.config.url}`)
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(`连接出错:${error.response.status}`)
      }
    }
    return Promise.reject(error)
  },
)

export default instance
