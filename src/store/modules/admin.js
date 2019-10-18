import api from 'API/index'

import {
  IS_LOGIN,
  SET_ADMIN_INFO,
  SHOW_TOKEN_ERROR
} from '../mutation-types'

import {
  saveAccessToken,
  getAccessToken,
  cachedAdminInfo,
  removeAccessToken
} from 'API/cacheService'

const state = {
  isLogin: getAccessToken() ? true : false, // eslint-disable-line
  tokenError: false,
  adminInfo: cachedAdminInfo.load() || {}
}

const getters = {
  isLogin (state) {
    return state.isLogin
  },
  tokenError (state) {
    return state.tokenError
  },
  adminInfo (state) {
    return state.adminInfo
  }
}

const mutations = {
  [IS_LOGIN] (state, data) {
    state.isLogin = data
  },
  [SHOW_TOKEN_ERROR] (state, data) {
    state.tokenError = data
  },
  [SET_ADMIN_INFO] (state, data) {
    state.adminInfo = data
  }
}

const actions = {
  setIsLogin (store, isLogin) {
    store.state.isLogin = isLogin
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}