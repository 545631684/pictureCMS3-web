<template>
  <el-table v-loading="loading" :data="userList" style="width: 80%">
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="nickname" label="昵称" min-width="100" align="center"></el-table-column>
    <el-table-column prop="userName" label="用户名" width="180" align="center"></el-table-column>
    <el-table-column prop="registerTime" label="创建时间" align="center"></el-table-column>
    <el-table-column prop="endTime" label="最后登陆" align="center"></el-table-column>
    <el-table-column prop="permissions" label="权限" align="center" width="100">
      <template slot-scope="scope">
        {{getUserRecoveryName(scope.row.permissions)}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="100">
      <template slot-scope="scope">
        <!-- <el-button size="mini" type="primary" plain @click="handleDelete(scope.$index, scope.row)"></el-button> -->
        <el-button size="mini" type="primary" circle icon="el-icon-refresh-left" title="还原用户" @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { formatDate } from 'UTIL/publicAPI'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        loading: true,
        userList: [],
        uId: ''
      }
    },
    methods: {
      ...mapActions([
        'setPublicInfo',
        'userRecovery',
        'reduction',
        'getPublicInfo',
        'setOperationInfo'
      ]),
      // 还原用户
      handleDelete (index, row) {
        let _this = this
        this.$confirm('还原此用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.reduction({uId:row.uId})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:8, id:row.uId})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo()
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
        })
      },
      formatDate (time) { // 时间戳转换
        if (time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '暂无'
        }
      },
      // 获取权限组的名称
      getUserRecoveryName(id) {
      	return this.$store.getters.getUserRecoveryName(id).title
      },
    },
    created() {
      // 刷新页面获取用户信息（被暂停使用的）
      let _this = this
      this.userRecovery()
        .then(function (response) {
          if (response.code === 200) {
            _this.userList = response.data
            _this.userList.find((o, index) => {
              o.registerTime = _this.formatDate(o.registerTime)
              o.endTime = _this.formatDate(o.endTime)
            })
            _this.loading = false
          }
        })
        .catch(function (error) {
          // _this.$alert(error.msg, {confirmButtonText: '确定'})
        })
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.v-modal{ position: relative !important;}
.upPwd{padding: 20px 10px;}
.upPwd span{display: block;float: left;width: 20%; height: 40px;line-height: 40px; text-align: center;}
.upPwd input{display: block;float: left; width: 80%;}
</style>
