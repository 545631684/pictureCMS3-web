<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
// css总调用
<style lang="less" src="LESS/main.less"></style>
<style lang="less" scoped>
@import 'LESS/color.less';
</style>
