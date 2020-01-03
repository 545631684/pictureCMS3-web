<template>
  <div class="header">
    <h1 class="header-title"><img src="~IMAGES/logo.png" alt=""/>赛奇医健</h1>
    <div class="header-right">
      <el-dropdown @command="urlpage($event)">
        <span class="el-dropdown-link" style="color: #FFFFFF;">
    			用户名称：{{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      	</span>
        <el-dropdown-menu split-button slot="dropdown" >
          <el-dropdown-item command="index">返回前台</el-dropdown-item>
          <el-dropdown-item command="quit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { cachedAdminInfo, cachedKeysData } from 'API/cacheService'
  export default {
  	inject: ['reload'],
    name: 'myHeader',
    data() {
      return {
      	name: this.$store.state.admin.adminInfo.nickname || this.$store.state.admin.adminInfo.userName
      }
    },
    methods: {
      ...mapActions([
        'adminInfo',
        'exitlogin',
      ]),
      urlpage(command) {
        let _this = this
        switch(command) {
          case "index":
            this.$router.push("/web");
            break;
          case "quit":
            this.exitlogin({uId: this.$store.state.admin.adminInfo.uId})
              .then(function (response) {
                if(response.code === 200) {
                  let adminInfoData = cachedKeysData.adminInfo
                  if(_this.$store.state.admin.adminInfo.setPasswordStyle === 'true'){
                    adminInfoData.userName = _this.$store.state.admin.adminInfo.userName
                    adminInfoData.password = _this.$store.state.admin.adminInfo.password
                    adminInfoData.setPasswordStyle = _this.$store.state.admin.adminInfo.setPasswordStyle
                  } else {
                    adminInfoData.userName = ''
                    adminInfoData.password = ''
                    adminInfoData.setPasswordStyle = false
                  }
                  cachedAdminInfo.save(adminInfoData)
                  _this.$router.push("/login")
                }
              })
              .catch(function (error) {})
            break;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
	.header .header-title{font-size:26px;color:#FFF;width:40%;height:auto;float:left;line-height:50px}
  .header .header-title img{width: 30px; height: 30px; margin: 10px; float: left;}
	.header .header-right{float:right;width:10%;text-align:center;position:absolute;bottom:10px;right:0;color:#fff}
  .header .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {background-color: #51b998;color: #FFFFFF;}
</style>