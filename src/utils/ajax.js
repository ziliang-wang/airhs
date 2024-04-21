import axios from 'axios'
import qs from 'qs'
// import { ElMessage } from 'element-plus'
// import router from '../router'
// import config from '../config'

// const TOKEN_INVALID = 'Token認證失敗，請重新登錄'
// const NETWORK_ERROR = '網路請求異常，請稍後重試'

export const ajax = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/1d5dc7448bee6886eaecc0a9c97e66b7/api'
  // baseURL: 'https://test.elf.com.tw:5052',
  // baseURL: 'https://test.elf.com.tw:5051',
  // baseURL: 'https://192.168.20.140:44317/',
  baseURL: 'https://air.logticsrv.com:5010/',
  transformRequest: (data) => {
    return qs.stringify(data)
  }
  // baseURL: 'http://localhost:8080'
  // timeout: 8000
})

// 請求攔截
ajax.interceptors.request.use(req => {
  // TODO
  console.log('请求拦截到了')
  return req
}, err => {
  return Promise.reject(err)
})

// 響應攔截
ajax.interceptors.response.use(res => {
  // TODO
  console.log('响应拦截到了')
  return res
}, err => {
  return Promise.reject(err)
})

// function request (options) {
//   options.method = options.method || 'get'

//   if (options.method.toLowerCase() === 'get') {
//     options.params = options.data
//   }

//   if (config.env === 'prod') {
//     ajax.defaults.baseURL = config.baseApi
//   } else {
//     ajax.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
//   }
//   return ajax(options)
// }

// ['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
//   request[item] = (url, data, options) => {
//     return request({
//       url,
//       data,
//       method: item,
//       ...options
//     })
//   }
// })

// export default request
