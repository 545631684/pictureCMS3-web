<template>
  <el-container style="width:80% !important;">
    <el-table v-loading="loading" :data="userList" class="clearfix" :stripe="true" size="mini" style="width: 60% !important;">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="nickname" label="缩略图" align="center" min-width="200">
      	<template slot-scope="scope">
      		<img :src="URLS2 + scope.row.headPortraitSrc" alt="" style="width: 40px; height: 40px; border-radius: 50px;"/><br />
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="标题" min-width="200" align="center"></el-table-column>
      <el-table-column prop="registerTime" label="发布时间" align="center" width="200"></el-table-column>
      <el-table-column prop="endTime" label="删除时间" align="center" width="200"></el-table-column>
      <el-table-column prop="permissions" label="保留天数" align="center" width="100"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" circle icon="el-icon-delete" title="删除" @click="deleteArticle(scope.$index, scope.row)"></el-button>
          <el-button size="mini" type="primary" circle icon="el-icon-refresh-left" title="还原" @click="reduction(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        loading: true,
        permissions: this.$store.state.user.permissions,
        types: this.$store.state.user.types,
        projects: this.$store.state.user.projects,
        minTypes: this.$store.state.user.minType,
        minTypes2: this.$store.state.user.minType,
        typeImg: '',
        projectImg: '',
        minTypeImg: '',
        userName: '',
        searchTXT: '',
        article: [],
        prompt: '',
        userList: [],
        URLS2: this.$store.state.common.publicInfo.srcUrl
      }
    },
    methods: {
      ...mapActions([
        'getRecoveryArticle',
      ]),
      // 删除操作
      deleteArticle (mid) {
        this.$confirm('此操作将永久删除该文章不可找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delArticle3(this, mid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 还原操作
      reduction (mid) {
        this.$confirm('此操作将还原该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reductionInterface(this, mid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      // 查询函数
      queryArticle () {
        recoveryArticleAll(this)
      },
      // 返回获取的文章图片路径
      returnSrc (src) {
        return this.URLS + src
      },
      formatDate (time) { // 时间戳转换
        if (time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '暂无'
        }
      }
    },
    created() {
      this.getRecoveryArticle({uId:1})
        .then(function (response) {
          if (response.code === 200) {
            console.log(response)
          }
        })
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
