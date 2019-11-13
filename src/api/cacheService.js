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
}
const KEYS_DATA = {
  token: '',
  adminInfo: {
    uId: '',
    permissions: '',
    userName: '',
    Password: '',
    nickname: '',
    sex: '',
    registerTime: '',
    endTime: '',
    state: '',
    HeadPortraitSrc: '',
    // 登录页是否记住密码
    setPasswordStyle: false,
    // 用户密码修改的验证码按钮读秒
    adminTime: 0,
    // 导航高亮显示位置
    adminNavigation: '1',
    // 权限
    auth: {},
    // 后台导航缩进
    isCollapse: false,
    // 用户是否登录
    judgeLogin: ''
  },
  webInfo: {
    // 注册/找回密码的获取验证码按钮成功后的读秒
    webTime: 0,
    // 文章id
    mId: ''
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
    // 权限组
    userRecovery: {},
    // img访问域名
    srcUrl: ''
  },
}

// 这里改为自己的nameSpace，比如项目名称
const nameSpace = 'SAIQI'

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
  const token = lsCache.get(KEYS.token)
  return token
}

// localStorage删除Token变量
export function removeAccessToken () {
  lsCache.delete(KEYS.token)
}

// localStorage格式化数据
export function removeAdminInfo () {
  if (KEYS.adminInfo.setPasswordStyle) {
    KEYS_DATA.adminInfo.userName = KEYS.adminInfo.userName
    KEYS_DATA.adminInfo.Password = KEYS.adminInfo.Password
    KEYS_DATA.adminInfo.setPasswordStyle = KEYS.adminInfo.setPasswordStyle
  } else {
    KEYS_DATA.adminInfo.userName = ''
    KEYS_DATA.adminInfo.Password = ''
    KEYS_DATA.adminInfo.setPasswordStyle = false
  }
  lsCache.set(KEYS.adminInfo, KEYS_DATA.adminInfo)
}

// 后台key
export const cachedAdminInfo = new CommonStorage(KEYS.adminInfo, 0)
// 前台key
export const cachedWebInfo = new CommonStorage(KEYS.webInfo, 0)
// 公共key
export const cachedPublicInfo = new CommonStorage(KEYS.publicInfo, 0)
// 初始化参数
export const cachedKeysData = KEYS_DATA