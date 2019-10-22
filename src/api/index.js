import axios from 'axios'
import Qs from 'qs'
import store from 'STORE/index'
import { pushLogins } from 'ROUTER/index'


import {
  saveAccessToken,
  getAccessToken,
  removeAccessToken,
  cachedAdminInfo,
  cachedWebInfo,
  cachedPublicInfo,
  removeAdminInfo
} from 'API/cacheService'

import {
  SET_ADMIN_INFO,
  SET_WEB_INFO,
  SET_PUBLIC_INFO
} from 'STORE/mutation-types'

/* eslint-disable */
const API_ROOT = 'http://192.168.0.130/'
const API_ROOT_DEV = '/a'

/* eslint-enable */
axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV)

axios.defaults.headers.Accept = 'application/json'

// axios拦截器 除登录、注册页面外全部添加token信息
axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('a/') === 0 || config.url.indexOf('w/') === 0) {
    if (getAccessToken()) {
      config.headers['accesstoken'] = getAccessToken()
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// axios拦截器 验证token信息如果没有或者过期返回登录页面
axios.interceptors.response.use(function (response) {
  if (response.data.code < 0) {
    if (response.data.code === -4001) {
      // 清空登录信息、token
      removeAdminInfo()
      removeAccessToken()
      pushLogins()
      // window.location.href = '192.168.1.130/login';
    }
    let error = {
      msg: response.data.msg
    }
    return Promise.reject(error)
  }
  return response.data
}, function (error) {
  error = {
    msg: '请求出错'
  }
  return Promise.reject(error)
})

export default {
  /**
   * 用户登录
   */
  webLogin (params) {
    return axios.post('u/login', Qs.stringify(params))
  },
  /**
   * 用户注册
   */
  webUserAdd (params) {
    return axios.post('u/user_add', Qs.stringify(params))
  },
  /**
   * 用户找回密码
   */
  webRetrievePassword (params) {
    return axios.post('u/forgetpass', Qs.stringify(params))
  },
  /**
   * 邮箱发送验证码
   */
  send (params) {
    return axios.post('u/send', Qs.stringify(params))
  },
  /**
   * 检测用户名（邮箱）是否存在
   */
  emailrepeat (params) {
    return axios.post('u/emailrepeat', Qs.stringify(params))
  },
  /**
   * 找回密码
   */
  retrievePassword (params) {
    return axios.post('u/retrievePassword', Qs.stringify(params))
  },
  /**
   * 用户列表
   */
  adminUserList (params) {
    return axios.get('a/user_list', Qs.stringify(params))
  },
  
}