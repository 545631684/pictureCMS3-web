import api from 'API/index'

import {
  SET_ADMIN_INFO,
  SET_TOKEN_INFO
} from '../mutation-types'

import {
  saveAccessToken,
  getAccessToken,
  cachedAdminInfo,
  removeAccessToken,
  cachedKeysData
} from 'API/cacheService'

const state = {
  token: getAccessToken() || {},
  adminInfo: cachedAdminInfo.load() || cachedKeysData.adminInfo
}

const getters = {
  token (state) {
    return state.token
  },
  adminInfo (state) {
    return state.adminInfo
  }
}

const mutations = {
  [SET_TOKEN_INFO] (state, data) {
    state.token = data
  },
  [SET_ADMIN_INFO] (state, data) {
    state.adminInfo = data
  }
}

const actions = {
  /**
   * 用户列表
   */
  adminUserList (store, params) {
    return api.adminUserList(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取权限功页
   */
  authList (store, params) {
    return api.authList(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加权限组
   */
  authGroupadd (store, params) {
    return api.authGroupadd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取权限组列表
   */
  authGrouplist (store, params) {
    return api.authGrouplist(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除权限组
   */
  authGroupdel (store, params) {
    return api.authGroupdel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取单个权限组
   */
  authGroupone (store, params) {
    return api.authGroupone(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 修改权限组
   */
  authGroupedit (store, params) {
    return api.authGroupedit(params)
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