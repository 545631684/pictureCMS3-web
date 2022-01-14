import api from 'API/index'

import { 
  SET_WEB_INFO, 
  SET_ADMIN_INFO, 
  SET_TOKEN_INFO, 
  SET_OTHER_INFO, 
  SET_PUBLIC_INFO 
} from '../mutation-types'

import {
  saveAccessToken,
  getAccessToken,
  cachedOtherinfo,
  cachedAdminInfo,
  cachedWebInfo,
  cachedPublicInfo,
  removeAccessToken,
  cachedKeysData
} from 'API/cacheService'

const state = {
  webInfo: cachedWebInfo.load() || cachedKeysData.webInfo
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
        cachedOtherinfo.save(data.data.otherinfo)
        cachedAdminInfo.save(data.data.adminInfo)
        cachedPublicInfo.save(data.data.publicInfo)
        cachedWebInfo.save(cachedKeysData.webInfo)
        saveAccessToken(data.data.token.access_token, parseInt(data.data.token.token_expires_in))
        store.commit(SET_WEB_INFO, cachedKeysData.webInfo)
        store.commit(SET_OTHER_INFO, data.data.otherinfo)
        store.commit(SET_ADMIN_INFO, data.data.adminInfo)
        store.commit(SET_PUBLIC_INFO, data.data.publicInfo)
        store.commit(SET_TOKEN_INFO, data.data.token)
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
  /**
   * 找回密码
   */
  retrievePassword (store, params) {
    return api.retrievePassword(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 前台获取分页数据
   */
  getWebArticleAll (store, params) {
    return api.getWebArticleAll(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 前台获取单篇文章数据
   */
  getWebArticle (store, params) {
    return api.getWebArticle(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 前台获取所有用户数据
   */
  webUserList (store, params) {
    return api.webUserList(params)
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