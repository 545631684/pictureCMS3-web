import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import admin from './modules/admin'
import web from './modules/web'

Vue.use(Vuex)

const modules = { common, admin, web }

const store = new Vuex.Store({
  modules
})

export default store
