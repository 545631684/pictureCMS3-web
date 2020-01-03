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
   * 用户列表list
   */
  getUserList (store, params) {
    return api.getUserList(params)
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
  /**
   * 超管编辑用户信息
   */
  guanliuserSave (store, params) {
    return api.guanliuserSave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取用户token
   */
  getUserToken (store, params) {
    return api.getUserToken(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 修改用户信息
   */
  userSave (store, params) {
    return api.userSave(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取用户信息
   */
  getUserInfo (store, params) {
    return api.getUserInfo(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除文件
   */
  delfile (store, params) {
    return api.delfile(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 更新辅助数据
   */
  setAdminInfo (store, params) {
    return api.getUserInfo(params)
      .then((data) => {
        let adminInfo = store.state.adminInfo
        adminInfo.headPortraitSrc = data.data.adminInfo.headPortraitSrc
        adminInfo.nickname = data.data.adminInfo.nickname
        adminInfo.sex = data.data.adminInfo.sex
        cachedAdminInfo.save(adminInfo)
        store.commit(SET_ADMIN_INFO, adminInfo)
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取统计页面数据
   */
  getAdminStatisticsData (store, params) {
    return api.getAdminStatisticsData(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取用户删除的文章
   */
  getRecoveryArticle (store, params) {
    return api.getRecoveryArticle(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 管理员添加用户
   */
  guanliUserAdd (store, params) {
    return api.guanliUserAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加文章
   */
  articleAdd (store, params) {
    return api.articleAdd(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 查询文章标题是否重复
   */
  getTitleRepeat (store, params) {
    return api.getTitleRepeat(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取所有文章
   */
  getArticleAll (store, params) {
    return api.getArticleAll(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除文章(回收站)
   */
  exhibitionDel (store, params) {
    return api.exhibitionDel(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 还原文章
   */
  exhibitionreduction (store, params) {
    return api.exhibitionreduction(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 删除文章(彻底删除)
   */
  delArticle (store, params) {
    return api.delArticle(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取单个文章信息(后台)
   */
  getAdminArticle (store, params) {
    return api.getAdminArticle(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 修改文章
   */
  articleUpdate (store, params) {
    return api.articleUpdate(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 修改文章标题检查
   */
  getUpdateTitleRepeat (store, params) {
    return api.getUpdateTitleRepeat(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 后台首页获取数据
   */
  getAdminIndexData (store, params) {
    return api.getAdminIndexData(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 登录注销
   */
  exitlogin (store, params) {
    return api.exitlogin(params)
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