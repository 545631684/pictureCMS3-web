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
  /**
   * 获取用户操作记录
   */
  getOperationInfo (store, params) {
    return api.getOperationInfo(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 用户操作记录
   */
  setOperationInfo (store, params) {
    let paramsData = {
      uId:params._this.$store.state.admin.adminInfo.uId,
      type:params.type,
      content_article:{},
      content_user:{},
      content_auth_group:{},
      content_project:{},
      content_type:{},
      content_classification:{},
      content_group_label:{},
      content_label:{},
      content_article_type:{}
    }
    switch(params.type) {
      case 1:
        params._this.article.find((o, index) => {
          if(o.mId === params.id){
            paramsData.content_article.start = o
          } 
        })
        paramsData.content_article.end = 'null'
        console.log("后台查看文章")
        break;
      case 2:
        params._this.article.find((o, index) => {
          if(o.mId === params.id){
            paramsData.content_article.start = o
          } 
        })
        paramsData.content_article.end = 'null'
        console.log("删除文章")
        break;
      case 3:
        params._this.userList.find((o, index) => {
          if(o.mId === params.id){
            paramsData.content_article.start = o
          } 
        })
        paramsData.content_article.end = 'null'
        console.log("回收站还原文章")
        break;
      case 4:
        params._this.userList.find((o, index) => {
          if(o.mId === params.id){
            paramsData.content_article.start = o
          } 
        })
        paramsData.content_article.end = 'null'
        console.log("回收站删除文章")
        break;
      case 5:
        paramsData.content_user.start = params._this.userInfo2
        paramsData.content_user.end = params._this.$store.state.admin.adminInfo
        console.log("修改个人信息")
        break;
      case 6:
        paramsData.content_user.start = {userName:params._this.adduser.userName, nickname:params._this.adduser.nickname, sex:params._this.adduser.sex, password:params._this.adduser.Password, permissions:params._this.getUserGroupId(params._this.adduser.permissions), webShow:params._this.adduser.webShow, state:params._this.adduser.state}
        paramsData.content_user.end = 'null'
        console.log("添加新用户")
        break;
      case 7:
        params._this.userList.find((o, index) => {
          if(o.uId === params._this.row.uId){
            paramsData.content_user.start = o
          } 
        })
        paramsData.content_user.end = {uId: params._this.row.uId, nickname: params._this.row.nickname, sex: params._this.row.sex, password: params._this.row.Password, permissions: params._this.getUserGroupId(params._this.row.permissions), webShow: params._this.row.webShow, state: params._this.row.state, judgeLogin: params._this.row.judgeLogin}
        console.log("修改用户信息")
        break;
      case 8:
        params._this.userList.find((o, index) => {
          if(o.uId === params.id){
            paramsData.content_user.start = o
          } 
        })
        paramsData.content_user.end = 'null'
        console.log("还原用户")
        break;
      case 9:
        paramsData.content_auth_group.start = {title: params._this.groupNameAdd, rules: params._this.groups, disabled: !params._this.groupForbid ? '1' : '2'}
        paramsData.content_auth_group.end = 'null'
        console.log("添加用户组")
        break;
      case 10:
        params._this.usergroups.find((o, index) => {
          if(o.id === params.id){
            paramsData.content_auth_group.start = o
          } 
        })
        paramsData.content_auth_group.end = {id: params.id, title: params._this.groupUpdateSingle[0].title, rules: params._this.groupUpdateSingle[0].rules, disabled: params._this.groupUpdateSingle[0].disabled ? '2' : '1'}
        console.log("修改用户组")
        break;
      case 11:
        params._this.usergroups.find((o, index) => {
          if(o.id === params.id){
            paramsData.content_auth_group.start = o
          } 
        })
        paramsData.content_auth_group.end = 'null'
        console.log("删除用户组")
        break;
      case 12:
        paramsData.content_project.start = {xname: params._this.name, state: '1', webShow: '1'}
        paramsData.content_project.end = 'null'
        console.log("添加项目")
        break;
      case 13:
        params._this.PList.find((o, index) => {
          if(o.pid === params._this.row.pid){
            paramsData.content_project.start = o
          } 
        })
        paramsData.content_project.end = {pid: params._this.row.pid, xname: params._this.row.xname, state: params._this.row.state, webShow: params._this.row.webShow}
        console.log("修改项目")
        break;
      case 14:
        params._this.PList.find((o, index) => {
          if(o.pid === params.id){
            paramsData.content_project.start = o
          } 
        })
        paramsData.content_project.end = 'null'
        console.log("删除项目")
        break;
      case 15:
        paramsData.content_type.start = {lname: params._this.name, state: '1', webShow: '1'}
        paramsData.content_type.end = 'null'
        console.log("添加类型")
        break;
      case 16:
        params._this.tList.find((o, index) => {
          if(o.tid === params._this.row.tid){
            paramsData.content_type.start = o
          } 
        })
        paramsData.content_type.end = {tid: params._this.row.tid, lname: params._this.row.lname, state: params._this.row.state, webShow: params._this.row.webShow}
        console.log("修改类型")
        break;
      case 17:
        params._this.tList.find((o, index) => {
          if(o.tid === params.id){
            paramsData.content_type.start = o
          } 
        })
        paramsData.content_type.end = 'null'
        console.log("删除类型")
        break;
      case 18:
        paramsData.content_classification.start = {tbid: params._this.getTypesID(params._this.typeName), typeName:params._this.typeName, dname: params._this.name, state: '1', webShow: '1'}
        paramsData.content_classification.end = 'null'
        console.log("添加分类")
        break;
      case 19:
        params._this.minType.find((o, index) => {
          if(o.did === params._this.row.did){
            paramsData.content_classification.start = o
            paramsData.content_classification.start.typeName = params._this.getTypesName(o.tbid)
          } 
        })
        paramsData.content_classification.end = {did: params._this.row.did, tbid: params._this.getTypesID(params._this.typeName), dname: params._this.row.dname, state: params._this.row.state, webShow: params._this.row.webShow, typeName:params._this.typeName}
        console.log("修改分类")
        break;
      case 20:
        params._this.minType.find((o, index) => {
          if(o.did === params.id){
            paramsData.content_classification.start = o
            paramsData.content_classification.start.typeName = params._this.getTypesName(o.tbid)
          } 
        })
        paramsData.content_classification.end = 'null'
        console.log("删除分类")
        break;
      case 21:
        paramsData.content_group_label.start = {name: params.name}
        paramsData.content_group_label.end = 'null'
        console.log("添加标签组")
        break;
      case 22:
        params._this.groupLabel.find((o, index) => {
          if(o.gid === params._this.row.gid) paramsData.content_group_label.start = o
        })
        paramsData.content_group_label.end = {gid: params._this.row.gid, name: params._this.row.name, state: params._this.row.state, webShow: params._this.row.webShow},
        console.log(paramsData.content_group_label,params._this.groupLabel)
        console.log("修改标签组")
        break;
      case 23:
        params._this.groupLabel.find((o, index) => {
          if(o.gid === params.id) paramsData.content_group_label.start = o
        })
        paramsData.content_group_label.end = 'null'
        console.log("删除标签组")
        break;
      case 24:
        paramsData.content_label.start = {gid: params._this.getgroupLabelId(params._this.groupLabelName), name: params._this.name, pname: params._this.groupLabelName}
        paramsData.content_label.end = 'null'
        console.log("标签添加操作")
        break;
      case 25:
        params._this.label.find((o, index) => {
          if(o.lid === params._this.row.lid) {
            paramsData.content_label.start = o
            paramsData.content_label.start.pname = params._this.groupLabelName
          }
        })
        paramsData.content_label.end = {lid: params._this.row.lid, gid: params._this.getgroupLabelId(params._this.groupLabelName), name: params._this.row.name, state: params._this.row.state, webShow: params._this.row.webShow, pname: params._this.groupLabelName}
        console.log("标签修改操作")
        break;
      case 26:
        params._this.label.find((o, index) => {
          if(o.lid === params.id) paramsData.content_label.start = o
        })
        paramsData.content_label.end = 'null'
        console.log("标签删除操作")
        break;
      case 27:
        console.log("用户登录操作")
        break;
      case 28:
        console.log("用户退出操作")
        break;
      case 29:
        console.log("系统自动删除回收站保留天过期的文章")
        break;
      case 30:
        console.log("修改文章")
        break;
      case 31:
        paramsData.content_article.start = params.article
        paramsData.content_article.end = 'null'
        console.log("发布文章")
        break;
    } 
    return api.setOperationInfo(paramsData)
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