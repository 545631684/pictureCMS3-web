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
  // 遍历小分类数组，通过id获取name
  getUserMinTypeName: (state, getters) => (id) => {
    return state.publicInfo.details.find(minType => {if (minType.id === id) {return minType.dname}})
  },
  // 遍历项目数组，通过name获取id
  getUserProjectsId: (state, getters) => (xname) => {
    return state.publicInfo.projects.find(project => {if (project.xname === xname) {return project.pid}})
  },
  // 遍历类型数组，通过name获取id
  getUserTypesId: (state) => (lname) => {
    return state.publicInfo.types.find(type => {if (type.lname === lname) {return type.tid}})
  },
  // 遍历小分类数组，通过name获取id
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
        let publicInfo = {
          projects: data.data.projects,
          types: data.data.types,
          details: data.data.details,
          groupLabel: data.data.groupLabel,
          label: data.data.label
        }
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