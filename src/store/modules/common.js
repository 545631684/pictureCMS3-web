import api from 'API/index'

import { SET_PUBLIC_INFO } from '../mutation-types'

import { cachedPublicInfo, cachedKeysData } from 'API/cacheService'

const state = {
  publicInfo: cachedPublicInfo.load() || cachedKeysData.publicInfo
}

const getters = {
  publicInfo (state) {
    return state.publicInfo
  }
}

const mutations = {
  [SET_PUBLIC_INFO] (state, data) {
    state.publicInfo = data
  }
}

const actions = {
  setPublicInfo (store, publicInfo) {
    store.state.publicInfo = publicInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}