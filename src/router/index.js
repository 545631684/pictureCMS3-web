import Vue from 'vue'
import VueRouter from 'vue-router'

// 本地存储
import {
  saveAccessToken,
  getAccessToken,
  cachedAdminInfo,
  cachedWebInfo,
  cachedPublicInfo,
  removeAccessToken,
  cachedKeysData
} from 'API/cacheService'

// 调用接口
import store from '../store/index';
import api from 'API/index'

// 路由跳转页面顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 前后台路由分开调用
import web from './modules/web'
import admin from './modules/admin'

Vue.use(VueRouter)
const _vue = Vue

// 用es6展开语法赋值
const routes = [
  ...admin,
  ...web
]

// 创建路由，并设置url为'history'模式需要后台支持（相关内容查看官网介绍），以及模仿浏览器跳转效果以及每次跳转页面后置顶设置
const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  
  // 判断是否登录
  if (to.path.indexOf('/backstage') === 0 || to.path.indexOf('/web') === 0) {
    if (!getAccessToken() && store.state.admin.adminInfo.uId != '') {
      // 页面跳转置顶进度条开始
      NProgress.start()
      if(to.fullPath !== '/login'){
        next('/login') // 确保一定要调用 next()
      } else {
        // console.log(to,'前置钩子')
        // 确保一定要调用 next()
        next() 
      }
    }
  }
  // 页面跳转置顶进度条开始
  NProgress.start()
  next() // 确保一定要调用 next()
})

// 全局后置钩子
router.afterEach((to, from) => {
	// 实时获取用户信息进行修改
	if (to.path.indexOf('/login') === -1){
		console.log(store.state.admin)
		if(store.state.admin.adminInfo.uId != ''){
			api.getUserInfo2({uId:store.state.admin.adminInfo.uId})
				.then((data) => {
					if(!cachedAdminInfo.save2('ADMININFO',data.data.adminInfo) || !cachedPublicInfo.save2('PUBLICINFO',data.data.publicInfo)){
						this.a.app.$alert('检测到有数据更新，请刷新页面获取最新数据', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								// 刷新页面
								location.reload()
							}
						})
					}
				})
				.catch((error) => {
				})
		}
		
	}
	
  // console.log(to,'后置钩子')
  // 页面跳转置顶进度条结束
  NProgress.done()
})

// 跳转登录页
export function pushLogin () {
	console.log('进入跳转登录页')
  router.push('/login')
}

export default router

// 跳转登录页
export const pushLogins = pushLogin