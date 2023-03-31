/**
 * 管理本地存储
 * 优化建议：尽可能在一个key中存储多个变量，这样开销会相对小很多
 * chrome 本地存储 5.12M
 * Safari 本地存储 2.56M
 * firefox 本地存储 5.12M
 * IE11 本地存储 3.18M (大小会变化)
 * 并且无痕模式i localStorage 会抛出异常
 * 解决办法 ： https://blog.csdn.net/qq_17757973/article/details/69685153?locationNum=10&fps=1
 */

import Cache from 'web-storage-cache'

const lsCache = new Cache()
const ssCache = new Cache({storage: 'sessionStorage'})

const KEYS = {
  token: 'token',
  adminInfo: 'adminInfo',
  webInfo: 'webInfo',
  publicInfo: 'publicInfo',
  otherinfo: 'otherinfo',
}
const KEYS_DATA = {
  token: '',
	otherinfo:{
		// 导航高亮显示位置
		adminNavigation: '1',
		// 文章总数
		articleAll: 0,
		// 总页数
		pageNum: 0,
		// 每页条数
		articlePageNum: 6
	},
  adminInfo: {
    uId: '',
    permissions: '',
    userName: '',
    password: '',
    nickname: '',
    sex: '',
    registerTime: '',
    endTime: '',
    state: '',
    headPortraitSrc: '',
    // 登录页是否记住密码
    setPasswordStyle: false,
    // 用户密码修改的验证码按钮读秒
    adminTime: 0,
    // 权限
    auth: {},
    // 后台导航缩进
    isCollapse: false,
    // 用户是否登录
    judgeLogin: '',
  },
  webInfo: {
    // 注册/找回密码的获取验证码按钮成功后的读秒
    webTime: 0,
    // 文章id
    mId: '',
		// 文章总数
		articleAll: 0,
		// 总页数
		pageNum: 0,
		// 每页条数
		articlePageNum: 8
  },
  publicInfo: {
    // 类型数组
    types: {},
    // 项目数组
    projects: {},
    // 分类数组
    details: {},
    // 标签组
    groupLabel: {},
    // 标签
    label: {},
    // 隐私分类
    privacyType: {},
    // 权限组
    userRecovery: {},
    // img访问域名
    srcUrl: ''
  },
}

// 这里改为自己的nameSpace，比如项目名称
const nameSpace = 'SAIQI-SCK'

// 给存储变量添加项目名称前缀
for (let i in KEYS) {
  if (KEYS.hasOwnProperty(i)) {
    KEYS[i] = `${nameSpace}:${i}`.toUpperCase()
  }
}

class CommonStorage {
  constructor (key, exp = null, type = 'localStorage') {
    this.key = key
    this.exp = exp
    this.storage = (type === 'localStorage') ? lsCache : ssCache
  }

  save (value) {
    this.storage.deleteAllExpires()
    const options = this.exp ? { exp: this.exp } : null
    this.storage.set(this.key, value, options)
  }
	/*
	* 	判断用户的权限数据是否有变动，并更新本地缓存和VUEX数据
	*/
	save2 (key,value) {
		let boolen = false, saveValue = {}
		if(key == 'ADMININFO'){
			let obj = this.storage.get(this.key), objNew = value
			boolen = JSON.stringify(obj.auth) == JSON.stringify(value.auth) && obj.permissions == value.permissions
			// console.log(boolen,'ADMININFO')
			// console.log(JSON.stringify(obj.auth) == JSON.stringify(value.auth),obj.permissions == value.permissions,JSON.stringify(obj.auth) == JSON.stringify(value.auth) || obj.permissions == value.permissions,'ADMININFO')
			// console.log(JSON.stringify(obj.auth),JSON.stringify(value.auth),obj.permissions,value.permissions,'ADMININFO')
			if(!boolen){
				saveValue = obj
				saveValue.auth = value.auth
				saveValue.permissions = value.permissions
			}
		} else if(key == 'PUBLICINFO'){
			boolen = JSON.stringify(this.storage.get(this.key)) == JSON.stringify(value)
			if(!boolen) saveValue = value
		}
		if(!boolen){
			this.storage.deleteAllExpires()
			this.storage.delete(this.key)
			this.storage.set(this.key, value, null)
		}
		return boolen
	}

  load () {
    return this.storage.get(this.key)
  }

  delete () {
    this.storage.delete(this.key)
  }
}

// localStorage添加Token变量
export function saveAccessToken (token, expiredIn) {
  lsCache.set(KEYS.token, token, { exp: expiredIn })
}

// localStorage获取Token变量
export function getAccessToken () {
  const token = lsCache.get(KEYS.token) || false
  return token
}

// localStorage删除Token变量
export function removeAccessToken () {
  lsCache.delete(KEYS.token)
}

// localStorage格式化数据
export function removeAdminInfo (adminInfo, keys_data) {
  if (adminInfo.setPasswordStyle) {
    keys_data.adminInfo.userName = adminInfo.userName
    keys_data.adminInfo.Password = adminInfo.Password
    keys_data.adminInfo.setPasswordStyle = adminInfo.setPasswordStyle
  } else {
    keys_data.adminInfo.userName = ''
    keys_data.adminInfo.Password = ''
    keys_data.adminInfo.setPasswordStyle = false
  }
  lsCache.set(adminInfo, keys_data.adminInfo)
}

// 后台key
export const cachedAdminInfo = new CommonStorage(KEYS.adminInfo, 0)
// 前台key
export const cachedWebInfo = new CommonStorage(KEYS.webInfo, 0)
// 公共key
export const cachedPublicInfo = new CommonStorage(KEYS.publicInfo, 0)
// 其他key
export const cachedOtherinfo = new CommonStorage(KEYS.otherinfo, 0)
// 初始化参数
export const cachedKeysData = KEYS_DATA