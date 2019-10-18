import api from 'API/index'

import { SET_WEB_INFO } from '../mutation-types'

import {
  saveAccessToken,
  getAccessToken,
  cachedAdminInfo,
  cachedWebInfo,
  cachedPublicInfo,
  removeAccessToken
} from 'API/cacheService'

const state = {
  webInfo: cachedWebInfo.load() || {}
}

const getters = {
  webInfo (state) {
    return state.webInfo
  }
}

const mutations = {
  [SET_WEB_INFO] (state, data) {
    state.webInfo = data
  }
}

const actions = {
  /**
   * 登录
   */
  webLogin (store, params) {
    return api.webLogin(params)
      .then((data) => {
        cachedAdminInfo.save(data.data.adminInfo)
        cachedPublicInfo.save(data.data.publicInfo)
        saveAccessToken(data.data.token.access_token, parseInt(data.data.token.token_expires_in))
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 注册用户
   */
  webUserAdd (store, params) {
    return api.webUserAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 用户找回密码
   */
  webRetrievePassword (store, params) {
    return api.webRetrievePassword(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 邮箱发送验证码
   */
  send (store, params) {
    return api.send(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 检测用户名（邮箱）是否存在
   */
  emailrepeat (store, params) {
    return api.emailrepeat(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}