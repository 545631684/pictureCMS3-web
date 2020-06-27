<template>
  <el-container>
  	<el-header class="head">
  		<div class="div">
  			<router-link tag="a" class="" to="/web"><img src="~IMAGES/sqlog.png" alt="" /></router-link>
  			<dl>
  				<dd v-if="!show">
    				<router-link tag="a" class="" to="#/login">登陆</router-link> <!-- | <router-link tag="a" class="" to="#/enrollUser">注册</router-link> -->
    			</dd>
  				<dd v-if="show">
  					<el-dropdown @command="urlpage($event)">
  						<span class="el-dropdown-link omit" style="color: #FFFFFF;">
  		    			<img :src="headPortraitSrc" alt="" /><span>{{name}}</span>
  		      	</span>
  						<el-dropdown-menu split-button slot="dropdown">
  							<el-dropdown-item command="backstage">返回后台</el-dropdown-item>
  							<el-dropdown-item command="quit">退出登录</el-dropdown-item>
  						</el-dropdown-menu>
  					</el-dropdown>
  				</dd>
  			</dl>
  		</div>
  	</el-header>
  </el-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { cachedAdminInfo, cachedKeysData, removeAccessToken } from 'API/cacheService'
export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        headPortraitSrc: '',
        name: '',
        show: false
      }
    },
    methods: {
      ...mapActions([
        'exitlogin'
      ]),
      // 登录状态下 下拉菜单点击跳转链接
      urlpage(command) {
        let _this = this
      	switch(command) {
      		case "backstage":
      			this.$router.push("/backstage");
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
                  removeAccessToken()
      			      cachedAdminInfo.save(adminInfoData)
      			      _this.$router.push("/login")
      			    }
      			  })
      			  .catch(function (error) {})
      			break;
      	}
      }
    },
    created() {
      if (this.$store.state.admin.adminInfo.state === '0' && this.$store.state.admin.adminInfo.judgeLogin === '1') {
        this.name = this.$store.state.admin.adminInfo.nickname || this.$store.state.admin.adminInfo.name
        this.headPortraitSrc = this.$store.state.common.publicInfo.srcUrl + this.$store.state.admin.adminInfo.headPortraitSrc
        this.show = true
      } else {
        this.show = false
      }
    }
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.head{background: #252a2e; height: auto !important;}
.head .div{width: 1200px; margin: 15px auto; height: 60px;}
.head .div img{display: block; float: left;}
.head .div dl{display: block; float: right;height: 60px; width: 15%;}
.head .div dl dd{height: 60px;color: #FFFFFF; line-height: 60px; font-size: 20px; cursor:pointer}
.head .div dl dd a{ color: #FFFFFF; line-height: 60px; font-size: 20px; padding: 0 15px;}
.head .div dl dd .el-dropdown-link span{ display: block; float: left; width: 39%;}
.head .div dl dd .el-dropdown-link img{display: block; float: left;width: 44px;height: 44px;border-radius: 50px;margin: 8px 10px;}
.head .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {background-color: #51b998;color: #FFFFFF;}
</style>
