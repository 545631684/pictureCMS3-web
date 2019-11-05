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
  /**
   * 获取项目list
   */
  projectList (store, params) {
    return api.projectList(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加项目
   */
  projectAdd (store, params) {
    return api.projectAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 编辑项目
   */
  projectsave (store, params) {
    return api.projectsave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除项目
   */
  projectdel (store, params) {
    return api.projectdel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取栏目、类型、分类、标签组、标签数据
   */
  getPublicInfo (store, params) {
    return api.getPublicInfo(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加类型
   */
  typeAdd (store, params) {
    return api.typeAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 编辑类型
   */
  typesave (store, params) {
    return api.typesave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除类型
   */
  typeDel (store, params) {
    return api.typeDel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加分类
   */
  detailsAdd (store, params) {
    return api.detailsAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 编辑分类
   */
  detailssave (store, params) {
    return api.detailssave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除分类
   */
  detailsDel (store, params) {
    return api.detailsDel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加标签组
   */
  labelsAdd (store, params) {
    return api.labelsAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 编辑标签组
   */
  labelssave (store, params) {
    return api.labelssave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除标签组
   */
  labelsDel (store, params) {
    return api.labelsDel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加标签
   */
  labelAdd (store, params) {
    return api.labelAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 编辑标签
   */
  labelsave (store, params) {
    return api.labelsave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除标签
   */
  labelDel (store, params) {
    return api.labelDel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 用户回收list
   */
  userRecovery (store, params) {
    return api.userRecovery(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 用户还原
   */
  reduction (store, params) {
    return api.reduction(params)
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