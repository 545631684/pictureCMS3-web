<template>
  <el-aside :style="{width: isCollapse ? '64px' : '210px'}">
		<el-menu :default-active="isdefaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#252a2f" text-color="#fff" active-text-color="#ffd04b" style="height:100%; border:none;">
      <template v-for="(item, index) in userGroups.rules">
        <el-menu-item :index="item.index" :key="index" @click="urlpage(item.urlKeyword,$event)" v-if="item.checkedCities === '[]' && item.checkAll === 'true'">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu :index="item.index" :key="index" v-else-if="item.checkedCities.length >= 0 && item.checkedCities !== '[]'">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item v-for="(time2, index) in item.rules" :key="index" :index="time2.index" @click="urlpage(time2.urlKeyword,$event)">
            <i :class="time2.icon"></i>
            <span slot="title">{{time2.name}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
		</el-menu>
    <div class="collapse-wrap" @click="toggleCollapse" @mouseover="setLineData" @mouseout="setLineData">
      <span
        class="collapse-line"
        v-for="(line, index) in toggleLineData"
        :key="index"
        :style="{
          width: line.width,
          top: line.top,
          left: line.left,
          transform: line.transform,
          opacity: line.opacity
        }">
      </span>
    </div>
	</el-aside>
</template>

<script>
  import {
    SET_WEB_INFO,
    SET_ADMIN_INFO,
    SET_TOKEN_INFO,
    SET_PUBLIC_INFO
  } from 'STORE/mutation-types'

  import {
    saveAccessToken,
    getAccessToken,
    cachedAdminInfo,
    cachedWebInfo,
    cachedPublicInfo,
    removeAccessToken,
    cachedKeysData
  } from 'API/cacheService'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
	export default {
		inject: ['reload'],
		name: 'myLeft',
		data() {
			return {
				isCollapse: this.$store.state.admin.adminInfo.isCollapse,
				isdefaultActive: this.$store.state.admin.adminInfo.adminNavigation,
				userGroups: this.$store.state.admin.adminInfo.auth,
        toggleLineData: [],
        lineStyle: {
          normalLineData: [
            {
              width: '100%',
              top: '0px',
              left: '0px',
              transform: 'rotateZ(0deg)',
              opacity: '1'
            },
            {
              width: '100%',
              top: '0px',
              left: '0px',
              transform: 'rotateZ(0deg)',
              opacity: '1'
            },
            {
              width: '100%',
              top: '0px',
              left: '0px',
              transform: 'rotateZ(0deg)',
              opacity: '1'
            }
          ],
          arrowLeftLineData: [
            {
              width: '50%',
              top: '3px',
              left: '0px',
              transform: 'rotateZ(-45deg)',
              opacity: '1'
            },
            {
              width: '100%',
              top: '0px',
              left: '2px',
              transform: 'rotateZ(0deg)',
              opacity: '1'
            },
            {
              width: '50%',
              top: '-3px',
              left: '0px',
              transform: 'rotateZ(45deg)',
              opacity: '1'
            }
          ],
          arrowRightLineData: [
            {
              width: '50%',
              top: '3px',
              left: '0px',
              transform: 'translateX(15px) rotateZ(45deg)',
              opacity: '1'
            },
            {
              width: '100%',
              top: '0px',
              left: '0px',
              transform: 'rotateZ(0deg)',
              opacity: '1'
            },
            {
              width: '50%',
              top: '-3px',
              left: '0px',
              transform: 'translateX(15px) rotateZ(-45deg)',
              opacity: '1'
            }
          ]
        }
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			// 通过给定关键字跳转相应页面， $event在点击事件里加入函数写event可以调用当前元素的所有值
			urlpage(type, event) {
        console.log(type,event,'路由')
				switch(type) {
					case "home":
						this.$router.push("/backstage/home");
						this.localStorageSet(event.index)
        debugger
						break;
          case "uploadFile":
						this.$router.push("/backstage/articleAdd");
						this.localStorageSet(event.index)
						break;
					case "recoveryArticle":
						this.$router.push("/backstage/recoveryArticle");
						this.localStorageSet(event.index)
						break;
					case "statistics":
						this.$router.push("/backstage/statistics");
						this.localStorageSet(event.index)
						break;
					case "userList":
						this.$router.push("/backstage/userList");
						this.localStorageSet(event.index)
						break;
          case "userInfo":
						this.$router.push("/backstage/userInfo");
						this.localStorageSet(event.index)
						break;
					case "userRecovery":
						this.$router.push("/backstage/userRecovery");
						this.localStorageSet(event.index)
						break;
					case "category":
						this.$router.push("/backstage/category");
						this.localStorageSet(event.index)
						break;
					case "seeArticle":
						this.$router.push("/backstage/seeArticle");
						this.localStorageSet(event.index)
						break;
					case "userGroup":
						this.$router.push("/backstage/userGroup");
						this.localStorageSet(event.index)
						break;
				}
			},
      ...mapMutations([
        SET_ADMIN_INFO
      ]),
			// 把导航值赋值给isdefaultActive并本地储存
			localStorageSet(index) {
				this.isdefaultActive = index.toString()
        let adminInfo = cachedAdminInfo.load()
        adminInfo.adminNavigation = index.toString()
        cachedAdminInfo.save(adminInfo)
        this.$store.commit(SET_ADMIN_INFO, adminInfo)
			},
			// 本地获取导航值，赋值给isdefaultActive
			localStorageGet() {
        let adminInfo = cachedAdminInfo.load()
				this.isdefaultActive = adminInfo.adminNavigation.toString() || ''
			},
      // 导航缩放展开/缩进按钮
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
        this.toggleLineData = this.isCollapse ? this.lineStyle.arrowRightLineData : this.lineStyle.arrowLeftLineData
        // 更新本地和vuex
        let adminInfo = this.$store.state.admin.adminInfo
        adminInfo.isCollapse = this.isCollapse
        cachedAdminInfo.save(adminInfo)
        this.$store.commit(SET_ADMIN_INFO, adminInfo)
      },
      // 导航缩放展开/缩进按钮的样式赋值
      setLineData (e) {
        if (e.type === 'mouseover') {
          this.toggleLineData = this.isCollapse ? this.lineStyle.arrowRightLineData : this.lineStyle.arrowLeftLineData
        } else {
          this.toggleLineData = this.lineStyle.normalLineData
        }
      },
		},
		created() {
			// 从本地存储里获取当前导航位置并复制给isdefaultActive
			this.localStorageGet()
      // 展开按钮赋值
      this.toggleLineData = this.lineStyle.normalLineData
		}
	}
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
  .el-aside{background-color: rgb(37, 42, 47);position: relative;height: 100%; width: 64px; z-index: 1100; transition: width .5s; max-width:210px;overflow-x:visible;overflow-y:visible;}
	.el-menu-vertical-demo:not(.el-menu--collapse){width:210px;min-height:400px}
	.tishi{display:inline-block;float:inherit;background-color:red;border-radius:10px;padding:2px 5px;height:15px;line-height:15px;color:#ffff!important;font-size:14px;font-weight:700;font-style:inherit;margin:-5px 0 0 5px}
  .collapse-wrap{position:absolute; width: 24px; height: 24px; background-color: #262a30; right: 20px; bottom: 15px; padding: 5px; z-index: 1050; cursor: pointer; line-height: 0;}
  .collapse-wrap .collapse-line{position:relative; display: inline-block; vertical-align: top; width: 100%; height: 2px; margin-top: 4px; background-color: #fff; transition: all .3s;}
  .collapse-wrap .collapse-line a:first-child{margin-top:0;}
  .el-menu-item{cursor: pointer;}
  .el-menu-item .el-submenu__title{font-size: 14px !important;}
  .el-menu-item .el-submenu__title a.is-active{background-color: rgb(30, 34, 38) !important;}
  .el-menu-item .el-submenu__title .iconfont{margin-right: 10px !important;font-size: 14px !important;}
</style>
