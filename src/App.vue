<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
  	return {
  		reload: this.reload
  	}
  },
  data () {
  	return {
  		isRouterAlive: true
  	}
  },
  methods: {
  	// 刷新页面
  	reload () {
  		this.isRouterAlive = false
  		this.$nextTick(function () {
  			this.isRouterAlive = true
  		})
  	}
  }
}
</script>

// css总调用
<style lang="less" src="LESS/main.less"></style>
<style lang="less" scoped>
@import 'LESS/color.less';
</style>
