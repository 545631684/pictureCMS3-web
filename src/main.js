// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

// 前台图片查看组件
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// 视频播放组件
import VideoPlayer from 'vue-video-player'

Vue.config.productionTip = false

Vue.use(Vuex)
// css初始样式
// require('normalize.css/normalize.css') 
// require('flex.css') 

// 前台页面图片查看组件包括 import 'viewerjs/dist/viewer.css'
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.use(Viewer)

// 视频播放组件
require('video.js/dist/video-js.css') 
require('vue-video-player/src/custom-theme.css') 
Vue.use(VideoPlayer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
