<template>
  <el-container style="height: 100vh;">
      <!-- 头部 -->
      <el-header style="width: 100%; height: 50px; background: #252a2f; position: absolute; top: 0; left: 0;">
          <myHeader></myHeader>
      </el-header>
      
      <el-container style="height: 100%; padding-top: 50px; ">
          <!-- 左边导航 -->
          <myLeft></myLeft>
          <!-- 主内容区 -->
          <el-main >
              <router-view class="article-table-wrap"></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import myHeader from 'VIEWS/admin/myHeader/myHeader'
  import myLeft from 'VIEWS/admin/myLeft/myLeft'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
        myHeader,
        myLeft
    },
    data() {
      return {}
    },
    methods: {
      // ...mapActions([
      //   'adminUserList'
      // ]),
      // getlist() {
      //   let _this = this
      //   this.adminUserList()
      //     .then(function (response) {
      //       _this.$message({message: response.msg, type: 'success'})
      //     })
      //     .catch(function (error) {
      //       _this.$message.error(error.msg);
      //     })
      // }
    },
    created() {
      // this.getlist()
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.article-table-wrap{width: 100%; animation: show .8s;}
@keyframes show {
  from {margin-top: -10px;opacity: 0;}
  to {margin-top: 0px;opacity: 1;}
}
</style>
