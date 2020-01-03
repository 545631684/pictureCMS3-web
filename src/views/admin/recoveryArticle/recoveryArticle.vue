<template>
  <el-container style="width:80% !important;">
    <el-table v-loading="loading" :data="userList" class="clearfix" :stripe="true" size="mini" style="width: 60% !important;">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="nickname" label="缩略图" align="center" min-width="100">
      	<template slot-scope="scope" v-if="scope.row.srcs.length === 0">暂无图片</template>
      	<template slot-scope="scope" v-if="scope.row.srcs.length !== 0" >
      		<div style="width: 100px;height: auto; max-height:100px; hidden; background: #CCCCCC; margin: auto;">
      			<viewer :images="viewer(scope.row.srcs[0])">
      	    <img :src="URLS2 + scope.row.srcs[0]" alt="" style="display: block;height: auto;width: 100%; height: auto;"/>
      	    </viewer>
      		</div>
      	</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="200" align="center"></el-table-column>
      <el-table-column prop="registerTimeImg" label="发布时间" align="center" width="200"></el-table-column>
      <el-table-column prop="endTimeImg" label="更新时间" align="center" width="200"></el-table-column>
      <el-table-column prop="retainTime" label="删除时间" align="center" width="200"></el-table-column>
      <el-table-column prop="retainTime" label="保留天数" align="center" width="100">
        <template slot-scope="scope">{{getRetainTime(scope.row.retainTime2)}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" circle icon="el-icon-refresh-left" title="还原" @click="reduction(scope.$index, scope.row.mId)"></el-button>
          <el-button size="mini" type="danger" circle icon="el-icon-delete" title="删除" @click="deleteArticle(scope.$index, scope.row.mId)"></el-button>
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
        permissions: this.$store.state.admin.adminInfo.permissions,
        projects: this.$store.state.common.publicInfo.projects,
        types: this.$store.state.common.publicInfo.types,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
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
        'exhibitionreduction',
        'delArticle',
      ]),
      // 删除操作
      deleteArticle (index, mid) {
        let _this = this
        this.$confirm('此操作将永久删除该文章不可找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delArticle({mId: mid})
            .then((response) => {
              if(response.code === 200) {
                _this.$alert(response.msg, {confirmButtonText: '确定'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 还原操作
      reduction (index, mid) {
        let _this = this
        this.$confirm('此操作将还原该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.exhibitionreduction({mId: mid})
            .then((response) => {
              if(response.code === 200) {
                _this.$alert(response.msg, {confirmButtonText: '确定'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      // 返回获取的文章图片路径
      returnSrc (src) {
        return this.URLS + src
      },
      // 返回查看数据
      viewer (url) {
        var urls = [this.URLS2 + url]
        return urls
      },
      // 获取保留天数
      getRetainTime (deleteTime) {
        let timestamp = Math.round(new Date() / 1000)
        deleteTime = parseInt(deleteTime)
        deleteTime = deleteTime + (86400 * 30)
        return ((deleteTime - timestamp) / 86400).toFixed(0)
      },
      formatDatePage (time) { // 时间戳转换
        if (time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '--'
        }
      }
    },
    created() {
      let _this = this
      this.getRecoveryArticle({uId:this.$store.state.admin.adminInfo.uId})
        .then(function (response) {
          if (response.code === 200) {
            _this.userList = []
            let srcs = []
            if (response.data !== null) {
              _this.userList = response.data
              if (_this.userList.length !== 0) {
                _this.userList.find((o, index) => {
                  o.img = o.img === '[]' ? eval('(' + o.img + ')') : JSON.parse(o.img)
                  o.psd = o.psd === '[]' ? eval('(' + o.psd + ')') : JSON.parse(o.psd)
                  o.video = o.video === '[]' ? eval('(' + o.video + ')') : JSON.parse(o.video)
                  o.typeFile === 'img' ? srcs[srcs.length] = o.img[0].miniImg : o.typeFile = o.typeFile
                  o.typeFile === 'psd' ? srcs[srcs.length] = o.psd[0].Psdview : o.typeFile = o.typeFile
                  o.typeFile === 'video' ? srcs[srcs.length] = o.video[0].Videoview : o.typeFile = o.typeFile
                  o.srcs = srcs.length !== 0 ? srcs : new Array()
                  o.registerTimeImg = _this.formatDatePage(o.registerTimeImg)
                  o.endTimeImg = o.endTimeImg === '0' ? '--' : _this.formatDatePage(o.endTimeImg)
                  o.retainTime2 = o.retainTime
                  o.retainTime = _this.formatDatePage(o.retainTime)
                  srcs = []
                })
              } else {
                _this.userList = []
              }
            }
            _this.loading = false
          }
        })
        .catch(function (error) {
          // console.log(error)
          _this.loading = false
        })
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
