import api from 'API/index'

import { SET_PUBLIC_INFO } from '../mutation-types'

import { cachedPublicInfo, cachedKeysData, cachedTypesInfo, cachedProjectsInfo, cachedDetailsInfo, cachedGroupLabel, cachedLabelInfo } from 'API/cacheService'

const state = {
  publicInfo: cachedPublicInfo.load() || cachedKeysData.publicInfo
}

const getters = {
  publicInfo: (state, getters) => {
    return state.publicInfo
  },
  // 遍历项目数组，通过id获取name
  getUserProjectsName: (state, getters) => (id) => {
    return state.publicInfo.projects.find(project => {if (project.pid === id) {return project.xname}})
  },
  // 遍历类型数组，通过id获取name
  getUserTypesName: (state) => (id) => {
    return state.publicInfo.types.find(type => type.tid === id)
  },
  // 遍历分类数组，通过id获取name
  getUserMinTypeName: (state, getters) => (id) => {
    return state.publicInfo.details.find(minType => {if (minType.did === id) {return minType.dname}})
  },
  // 遍历权限组数组，通过id获取name
  getUserRecoveryName: (state, getters) => (id) => {
    return state.publicInfo.userRecovery.find(o => {if (o.id === id) {return o.title}})
  },
  // 遍历权限组数组，通过id获取name
  getUserRecoveryId: (state, getters) => (name) => {
    return state.publicInfo.userRecovery.find(o => {if (o.title === name) {return o.id}})
  },
  // 遍历项目数组，通过name获取id
  getUserProjectsId: (state, getters) => (xname) => {
    return state.publicInfo.projects.find(project => {if (project.xname === xname) {return project.pid}})
  },
  // 遍历类型数组，通过name获取id
  getUserTypesId: (state) => (lname) => {
    return state.publicInfo.types.find(type => {if (type.lname === lname) {return type.tid}})
  },
  // 遍历分类数组，通过name获取id
  getUserMinTypeId: (state, getters) => (dname) => {
    return state.publicInfo.details.find(minType => {if (minType.dname === dname) {return minType.did}})
  },
  // 获取标签组id
  getgroupLabelId: (state, getters) => (name) => {
  	return state.publicInfo.groupLabel.find((o, index) => {if (o.name === name) {return o}}).gid
  },
  // 获取标签组名称
  getgroupLabelName: (state, getters) => (id) => {
  	let groupLabel = state.publicInfo.groupLabel.find((o, index) => {if (o.gid === id) {return o}})
  	if (groupLabel !== undefined) {
  		return groupLabel.name
  	} else {
      return null
    }
  },
}

const mutations = {
  [SET_PUBLIC_INFO] (state, data) {
    state.publicInfo = data
  }
}

const actions = {
  /**
   * 更新辅助数据
   */
  setPublicInfo (store, params) {
    return api.getPublicInfo(params)
      .then((data) => {
        console.log(data)
        let publicInfo = { projects: [], types: [], details: [], groupLabel: [], label: [], privacyType: [], userRecovery: store.state.publicInfo.userRecovery, srcUrl: '' }
        data.data.projects.length !== 0 ? publicInfo.projects = data.data.projects : publicInfo.projects = store.state.publicInfo.projects
        data.data.types.length !== 0 ? publicInfo.types = data.data.types : publicInfo.types = store.state.publicInfo.types
        data.data.details.length !== 0 ? publicInfo.details = data.data.details : publicInfo.details = store.state.publicInfo.details
        data.data.groupLabel.length !== 0 ? publicInfo.groupLabel = data.data.groupLabel : publicInfo.groupLabel = store.state.publicInfo.groupLabel
        data.data.label.length !== 0 ? publicInfo.label = data.data.label : publicInfo.label = store.state.publicInfo.label
        data.data.privacyType.length !== 0 ? publicInfo.privacyType = data.data.privacyType : publicInfo.privacyType = store.state.publicInfo.privacyType
        data.data.srcUrl.length !== 0 ? publicInfo.srcUrl = data.data.srcUrl : publicInfo.srcUrl = store.state.publicInfo.srcUrl
        cachedPublicInfo.save(publicInfo)
        store.commit(SET_PUBLIC_INFO, publicInfo)
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
