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
      // 清空登录信息、token、跳转登录页
      removeAdminInfo()
      removeAccessToken()
      pushLogins()
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
  /**
   * 用户列表(权限管理用户列表页)
   */
  adminManageUserList (params) {
    return axios.get('a/manageUser_list', Qs.stringify(params))
  },
  /**
   * 获取权限功能页参数
   */
  authList (params) {
    return axios.get('a/auth_list', Qs.stringify(params))
  },
  /**
   * 添加权限组
   */
  authGroupadd (params) {
    return axios.post('a/auth_groupadd', Qs.stringify(params))
  },
  /**
   * 修改权限组
   */
  authGroupedit (params) {
    return axios.post('a/auth_groupedit', Qs.stringify(params))
  },
  /**
   * 删除权限组
   */
  authGroupdel (params) {
    return axios.post('a/auth_groupdel', Qs.stringify(params))
  },
  /**
   * 获取权限组列表
   */
  authGrouplist (params) {
    return axios.get('a/auth_grouplist', Qs.stringify(params))
  },
  /**
   * 获取单个权限组
   */
  authGroupone (params) {
    return axios.post('a/auth_groupone', Qs.stringify(params))
  },
  /**
   * 添加项目
   */
  projectAdd (params) {
    return axios.post('a/projectAdd', Qs.stringify(params))
  },
  /**
   * 编辑项目
   */
  projectsave (params) {
    return axios.post('a/projectsave', Qs.stringify(params))
  },
  /**
   * 删除项目
   */
  projectdel (params) {
    return axios.post('a/projectdel', Qs.stringify(params))
  },
  /**
   * 获取辅助参数
   */
  getPublicInfo (params) {
    return axios.get('a/getPublicInfo', Qs.stringify(params))
  },
  /**
   * 添加类型
   */
  typeAdd (params) {
    return axios.post('a/typeAdd', Qs.stringify(params))
  },
  /**
   * 编辑类型
   */
  typesave (params) {
    return axios.post('a/typesave', Qs.stringify(params))
  },
  /**
   * 删除类型
   */
  typeDel (params) {
    return axios.post('a/typeDel', Qs.stringify(params))
  },
  /**
   * 添加分类
   */
  detailsAdd (params) {
    return axios.post('a/detailsAdd', Qs.stringify(params))
  },
  /**
   * 编辑分类
   */
  detailssave (params) {
    return axios.post('a/detailssave', Qs.stringify(params))
  },
  /**
   * 删除分类
   */
  detailsDel (params) {
    return axios.post('a/detailsDel', Qs.stringify(params))
  },
  /**
   * 添加标签组
   */
  labelsAdd (params) {
    return axios.post('a/labelsAdd', Qs.stringify(params))
  },
  /**
   * 编辑标签组
   */
  labelssave (params) {
    return axios.post('a/labelssave', Qs.stringify(params))
  },
  /**
   * 删除标签组
   */
  labelsDel (params) {
    return axios.post('a/labelsDel', Qs.stringify(params))
  },
  /**
   * 添加标签
   */
  labelAdd (params) {
    return axios.post('a/labelAdd', Qs.stringify(params))
  },
  /**
   * 编辑标签
   */
  labelsave (params) {
    return axios.post('a/labelsave', Qs.stringify(params))
  },
  /**
   * 删除标签
   */
  labelDel (params) {
    return axios.post('a/labelDel', Qs.stringify(params))
  },
  /**
   * 用户回收list
   */
  userRecovery (params) {
    return axios.get('a/userRecovery', Qs.stringify(params))
  },
  /**
   * 用户列表list
   */
  getUserList (params) {
    return axios.get('a/user_list', Qs.stringify(params))
  },
  /**
   * 用户还原
   */
  reduction (params) {
    return axios.post('a/reduction', Qs.stringify(params))
  },
  /**
   * 超管编辑用户信息
   */
  guanliuserSave (params) {
    return axios.post('a/guanliuserSave', Qs.stringify(params))
  },
  /**
   * 获取用户token
   */
  getUserToken (params) {
    return axios.post('a/getUserToken', Qs.stringify(params))
  },
  /**
   * 修改用户信息
   */
  userSave (params) {
    return axios.post('a/userSave', Qs.stringify(params))
  },
  /**
   * 获取用户信息
   */
  getUserInfo (params) {
    return axios.post('a/getUserInfo', Qs.stringify(params))
  },
  /**
   * 删除文件
   */
  delfile (params) {
    return axios.post('a/delfile', Qs.stringify(params))
  },
  /**
   * 获取统计页面数据
   */
  getAdminStatisticsData (params) {
    return axios.post('a/getAdminStatisticsData', Qs.stringify(params))
  },
  /**
   * 获取回收站文章数据
   */
  getRecoveryArticle (params) {
    return axios.post('a/getRecoveryArticle', Qs.stringify(params))
  },
  /**
   * 管理员添加用户
   */
  guanliUserAdd (params) {
    return axios.post('a/user_add', Qs.stringify(params))
  },
  /**
   * 添加文章
   */
  articleAdd (params) {
    return axios.post('a/articleAdd', Qs.stringify(params))
  },
  /**
   * 查询文章标题是否重复
   */
  getTitleRepeat (params) {
    return axios.post('a/getTitleRepeat', Qs.stringify(params))
  },
  /**
   * 获取所有文章
   */
  getArticleAll (params) {
    return axios.post('a/getArticleAll', Qs.stringify(params))
  },
  /**
   * 删除文章(回收站)
   */
  exhibitionDel (params) {
    return axios.post('a/exhibitionDel', Qs.stringify(params))
  },
  /**
   * 还原文章
   */
  exhibitionreduction (params) {
    return axios.post('a/exhibitionreduction', Qs.stringify(params))
  },
  /**
   * 删除文章(彻底删除)
   */
  delArticle (params) {
    return axios.post('a/delArticle', Qs.stringify(params))
  },
  /**
   * 获取单个文章信息(后台)
   */
  getAdminArticle (params) {
    return axios.post('a/getAdminArticle', Qs.stringify(params))
  },
  /**
   * 获取单个文章信息(前台)
   */
  getWebArticle (params) {
    return axios.post('a/getWebArticle', Qs.stringify(params))
  },
  /**
   * 修改文章
   */
  articleUpdate (params) {
    return axios.post('a/articleUpdate', Qs.stringify(params))
  },
  /**
   * 修改文章标题检查
   */
  getUpdateTitleRepeat (params) {
    return axios.post('a/getUpdateTitleRepeat', Qs.stringify(params))
  },
  /**
   * 后台首页获取数据
   */
  getAdminIndexData (params) {
    return axios.post('a/getAdminIndexData', Qs.stringify(params))
  },
  /**
   * 添加项目屏蔽人
   */
  addShieldUser (params) {
    return axios.post('a/addShieldUser', Qs.stringify(params))
  },
  /**
   * 添加类型屏蔽人
   */
  addShieldUserType (params) {
    return axios.post('a/addShieldUserType', Qs.stringify(params))
  },
  /**
   * 登录注销
   */
  exitlogin (params) {
    return axios.post('a/exitlogin', Qs.stringify(params))
  },
  /**
   * 前台获取分页数据
   */
  getWebArticleAll (params) {
    return axios.post('w/getWebArticleAll', Qs.stringify(params))
  },
  /**
   * 前台获取单篇文章数据
   */
  getWebArticle (params) {
    return axios.post('w/getWebArticle', Qs.stringify(params))
  },
  /**
   * 前台获取所有用户数据
   */
  webUserList (params) {
    return axios.post('w/webUserList', Qs.stringify(params))
  },
  /**
   * 用户操作记录
   */
  setOperationInfo (params) {
    return axios.post('w/setOperationInfo', Qs.stringify(params))
  },
  /**
   * 获取用户操作记录
   */
  getOperationInfo (params) {
    return axios.post('w/getOperationInfo', Qs.stringify(params))
  },
  /**
   * 添加用户浏览记录
   */
  setUserBrowseArticle (params) {
    return axios.post('a/setUserBrowseArticle', Qs.stringify(params))
  },
  /**
   * 条件查询用户浏览记录
   */
  getUserBrowseWebInfo (params) {
    return axios.post('a/getUserBrowseWebInfo', Qs.stringify(params))
  },

}
