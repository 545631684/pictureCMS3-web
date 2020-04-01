<template>
  <el-container style="background: #f4f4f4;">
  	<el-header style="padding: 0;">
  		<div class="tab clearfix">
  			<p>用户：</p>
  			<ul>
  				<li :class="{on:num4 === '-1'}" @click="tab4('', '-1', '')">全部</li>
  				<li v-for="(item, index) in userList" :key="index" :class="{on:index === num4}" v-on:click.stop="tab4(index, item.nickname, item.uId)" v-if="item.webShow === '1' && item.articleNum !== 0">{{item.nickname}}</li>
  			</ul>
  		</div>
  		<div class="tab clearfix">
  			<p>项目：</p>
  			<ul>
  				<li :class="{on:num1 === '-1'}" @click="tab1('', '-1', '')">全部</li>
  				<li v-for="(item, index) in projects" :key="index" :class="{on:index === num1}" v-on:click.stop="tab1(index, item.xname, item.pid)" v-if="item.state === '1' && item.webShow === '1'">{{item.xname}}</li>
  			</ul>
  		</div>
  		<div class="tab clearfix">
  			<p>类型：</p>
  			<ul>
  				<li :class="{on:num2 === '-1'}" @click="tab2('', '-1', '')">全部</li>
  				<li v-for="(item, index) in types" :key="index" :class="{on:index === num2}" v-on:click.stop="tab2(index, item.lname, item.tid)" v-if="item.state === '1' && item.webShow === '1'">{{item.lname}}</li>
  			</ul>
  		</div>
  		<div class="tab clearfix" style="margin-bottom: 50px;">
  			<p>分类：</p>
  			<ul :class="{omit:showtype}">
  				<li :class="{on:num3 === '-1'}" @click="tab3('', '-1', '', '', '')">全部</li>
  				<li v-for="(item, index) in minTypes2" :key="index" :class="{on:index === num3}" v-if="item.state === '1' && item.webShow === '1'" v-on:click.stop="tab3(index, item.dname, item.did, item.tbid, item.pbid)" v-html="item.dname"></li>
  				<li class="clearfix"></li>
          <div v-if="minTypes2 !== '[]'">
            <a class="el-button--default is-plain" v-show="showtype" v-on:click.stop="showMinType()">点击查看全部分类</a>
            <a class="el-button--default is-plain" v-show="!showtype" v-on:click.stop="hideMinType()">收起</a>
          </div>
  			</ul>
  		</div>
  		<dl class="articleList clearfix" v-loading="loading">
  			<dt v-if="article.length === 0 && loading === 'false'">没有查到相关数据</dt>
  			<dd v-for="(item, index) in article" :key="index" v-if="article.length !== 0">
  				<router-link target="_blank" :title="item.title + '   ▉发布人：' + getUserInfo(item.uId) + '-发布时间：' + formatDate(item.registerTimeImg)" tag="a" :to="'/web/article/' + item.mId + '/Index/0/0/'">
  				<p>
  					<img :src="URLS2 + item.srcs[0]" alt="" />
  				</p>
  				<p class="omit2" :title="item.title">{{item.title}}</p>
  				<p>
  					<img :src="URLS2 + getUserInfo(item.uId,item.mId).headPortraitSrc" alt="" />
  					<span :title="getUserInfo(item.uId).nickname">{{getUserInfo(item.uId).nickname}}</span>
  					<samp :title="formatDate(item.registerTimeImg)">
  						{{formatDate(item.registerTimeImg)}}
  						<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('img', item.mId)">
  		                  <use xlink:href="#icon-picture"></use>
  		                </svg>
  						<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('psd', item.mId)">
  		                  <use xlink:href="#icon-web-psd"></use>
  		                </svg>
  						<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('video', item.mId)">
  		                  <use xlink:href="#icon-shipinbofangyingpian"></use>
  		                </svg>
  					</samp>
  				</p>
  				</router-link>
  			</dd>
  		</dl>
  		<div class="block" style="width: 470px;margin: 0 0 0 20%;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="dataList"
          layout="total, sizes, prev, pager, next"
          :total="articleAll">
        </el-pagination>
  		</div>
  	</el-header>
  </el-container>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SET_ADMIN_INFO } from 'STORE/mutation-types'
import { cachedAdminInfo } from 'API/cacheService'
export default {
    inject: ['reload'],
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    name: 'backstage',
    components: {},
    data() {
      return {
        loading: true,
        projects: this.$store.state.common.publicInfo.projects,
        types:this.$store.state.common.publicInfo.types,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
        article: [],
        article2: [],
        article3: [],
        userList: [],
        URLS2: this.$store.state.common.publicInfo.srcUrl,
        num1: '-1',
        num2: '-1',
        num3: '-1',
        num4: '-1',
        user: {
          id: '',
          name: '',
          index: '-1'
        },
        xname: {
          id: '',
          name: '',
          index: '-1'
        },
        lname: {
          id: '',
          name: '',
          index: '-1'
        },
        dnames: {
          pbid: '',
          tbid: '',
          did: '',
          name: '',
          index: '-1'
        },
        showtype: true,
        currentPage1: 1,
        dataList: 8,
        pageNum: this.$store.state.admin.adminInfo.pageNum,
        userInfo: this.$store.state.admin.adminInfo,
        articleAll: parseInt(this.$store.state.admin.adminInfo.articleAll),
        sessionData: false
      }
    },
    watch: {
      'lname.name':function (newQuestion, oldQuestion) {
        if (this.num3 !== '-1') {
        	this.num3 = '-1'
        	this.dnames.pbid = this.dnames.tbid = this.dnames.did = this.dnames.name = this.dnames.index = ''
        }
        if (!this.sessionData) {
        	this.setdata(0)
        } else {
        	this.setdata(this.currentPage1)
        }
      },
      'xname.name':function (newQuestion, oldQuestion) {
        let _this = this, num = []
      	if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== "2"){
          this.userInfo.shieldInfo.find((o,index)=>{
            if(o.xname == _this.xname.name && o.state == '0'){
              o.type.find((e,indexe)=>{
                if(e.state == '1'){
                  _this.types.find((x,indexx)=>{
                    e.tid == x.tid ? x.state = '0' : x = x
                    _this.$set(_this.types,indexx,x)
                  })
                }
              })
            }
          })
        }
      },
      keyword:function (newQuestion, oldQuestion) {
        let _this = this
        console.log(4)
        this.adminGetArticleAll({
          keyword: _this.keyword,
          page: 1,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId
          })
      }
    },
    methods: {
      ...mapActions([
        'webUserList',
        'getWebArticleAll',
      ]),
      // 分类全部显示关闭
      showMinType () {
          this.showtype = false
        },
        // 分类全部显示开启
        hideMinType () {
          this.showtype = true
        },
      handleSizeChange(val) {
        let _this = this, adminInfo =  this.$store.state.admin.adminInfo
        adminInfo.articlePageNum = val
        this.dataList = val
        this.$store.commit(SET_ADMIN_INFO, adminInfo)
        cachedAdminInfo.save(adminInfo)
        this.adminGetArticleAll({
          keyword: _this.keyword,
          page: 1,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId
          })
        // console.log('每页 ' + val + '条');
      },
      handleCurrentChange(val) {
        let _this = this
        this.adminGetArticleAll({
          keyword: _this.keyword,
          page: val,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId
          })
      },
      // 项目按钮
      tab1(index, name, pid) {
        if(name !== '-1') {
          this.num1 = index
          this.xname.id = pid
          this.xname.name = name
          this.xname.index = index
        } else {
          this.num1 = name
          this.xname.id = this.xname.name = this.xname.index = ''
        }
        this.setdata(0)
      },
      // 类型按钮
      tab2(index, name, tid) {
        if(name !== '-1') {
          this.num2 = index
          this.lname.id = tid
          this.lname.name = name
          this.lname.index = index
        } else {
          this.num2 = name
          this.lname.id = this.lname.name = this.lname.index = ''
        }
        this.setdata(0)
      },
      // 分类按钮
      tab3(index, name, did, tbid, pbid) {
        if(name !== '-1') {
          this.num3 = index
          this.dnames.pbid = pbid
          this.dnames.tbid = tbid
          this.dnames.did = did
          this.dnames.name = name
          this.dnames.index = index
        } else {
          this.num3 = name
          this.dnames.pbid = this.dnames.tbid = this.dnames.did = this.dnames.name = this.dnames.index = ''
        }
        this.setdata(0)
      },
      // 用户按钮
      tab4(index, name, uid) {
        if(name !== '-1') {
          this.num4 = index
          this.user.id = uid
          this.user.name = name
          this.user.index = index
        } else {
          this.num4 = name
          this.user.id = this.user.name = this.user.index = ''
        }
        this.setdata(0)
      },
      resetTab() {
        this.num1 = '-1'
        this.num2 = '-1'
        this.xname.id = this.xname.name = this.xname.index = this.lname.id = this.lname.name = this.lname.index = ''
      },
      /**
       * 选择类型动态修改，点击不同的项目、类型、分类显示相应的类型和分类
       * */
      setdata(page) {
        let _this = this
        this.minTypes2 = []
        if(this.xname.id === '' && this.lname.id === '' && this.dnames.did === '') {
          this.minTypes2 = this.minTypes
        } else if(this.xname.id !== '' && this.lname.id === '' && this.dnames.did === '') {
          this.minTypes2 = this.minTypes
        } else if(this.xname.id === '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if(_this.lname.id === obj.tbid  && obj.state === '1') {
              _this.minTypes2.push(obj)
            }
          })
        } else if(this.xname.id === '' && this.lname.id === '' && this.dnames.did !== '') {
          this.resetTab()
          this.minTypes2 = this.minTypes
        } else if(this.xname.id !== '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if(_this.lname.id === obj.tbid  && obj.state === '1') {
              _this.minTypes2.push(obj)
            }
          })
        } else if(this.xname.id === '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if(_this.lname.id === obj.tbid  && obj.state === '1') {
              _this.minTypes2.push(obj)
            }
          })
        } else if(this.xname.id !== '' && this.lname.id === '' && this.dnames.did !== '') {
          this.minTypes2 = this.minTypes
        } else if(this.xname.id !== '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if(_this.lname.id === obj.tbid  && obj.state === '1') {
              _this.minTypes2.push(obj)
            }
          })
        }
        this.adminGetArticleAll({
          keyword: _this.keyword,
          page: 1,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId
          })
      },
      formatDate(time) { 
        if(time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd')
        } else {
          return '暂无'
        }
      },
      getUserInfo (id,mId) {
        let user = this.userList.find((user, index) => {
          return user.uId === id
        })
        // console.log(user,"用户id:"+id+",文章id:"+mId)
        return user
      },
      // 把导航值赋值给isdefaultActive并本地储存
      localStorageSet() {
        // 移除后重新赋值
        sessionStorage.setItem("webSeeArtcurrentPage", JSON.stringify(this.currentPage1))
        sessionStorage.setItem("webSeeArtnum1", JSON.stringify(this.num1 === '' ? '-1' : this.num1))
        sessionStorage.setItem("webSeeArtnum2", JSON.stringify(this.num2 === '' ? '-1' : this.num2))
        sessionStorage.setItem("webSeeArtnum3", JSON.stringify(this.num3 === '' ? '-1' : this.num3))
        sessionStorage.setItem("webSeeArtnum4", JSON.stringify(this.num4 === '' ? '-1' : this.num4))
        sessionStorage.setItem("webSeeArtUser", JSON.stringify(this.user))
        sessionStorage.setItem("webSeeArtXname", JSON.stringify(this.xname))
        sessionStorage.setItem("webSeeArtLname", JSON.stringify(this.lname))
        sessionStorage.setItem("webSeeArtDnames", JSON.stringify(this.dnames))
      },
      // 本地获取导航值，赋值给isdefaultActive
      localStorageGet() {
        if (JSON.parse(sessionStorage.getItem("webSeeArtSessionData")) === true) {
          this.currentPage1 = JSON.parse(sessionStorage.getItem("webSeeArtcurrentPage")) || 1
          this.num1 = JSON.parse(sessionStorage.getItem("webSeeArtnum1")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum1"))
          this.num2 = JSON.parse(sessionStorage.getItem("webSeeArtnum2")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum2"))
          this.num3 = JSON.parse(sessionStorage.getItem("webSeeArtnum3")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum3"))
          this.num4 = JSON.parse(sessionStorage.getItem("webSeeArtnum4")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum4"))
          this.user = JSON.parse(sessionStorage.getItem("webSeeArtUser")) || { id: '', name: '', index: '-1' }
          this.xname = JSON.parse(sessionStorage.getItem("webSeeArtXname")) || { id: '', name: '', index: '-1' }
          this.lname = JSON.parse(sessionStorage.getItem("webSeeArtLname")) || { id: '', name: '', index: '-1' }
          this.dnames = JSON.parse(sessionStorage.getItem("webSeeArtDnames")) || { pbid: '', tbid: '', did: '', name: '', index: '-1' }
          this.sessionData = JSON.parse(sessionStorage.getItem("webSeeArtSessionData")) || false
          this.sessionStorageReset()
        }
      },
      // session中有存储上一次查询值是重置到上次查询位置
      sessionStorageReset () {
        let _this = this
        this.minTypes2 = []
        // 重置分类内容
        this.minTypes.find((obj, index) => {
          if(_this.lname.id === obj.tbid  && obj.state === '1') {
            _this.minTypes2.push(obj)
          }
        })
        // 重置分类点击效果
        this.num3 = this.dnames.index
        this.setdata(this.currentPage1)
        // 重置当前页数显示内容
        this.handleCurrentChange(this.currentPage1)
        // 关闭加载状态
        this.loading = false
        // 当前页面没有显示文章内容时重新刷新
        if (this.article3.length === 0) {
          window.location.reload()
        }
      },
      adminGetArticleAll (params) {
        let _this = this
        this.getWebArticleAll(params)
          .then((response) => {
            if(response.code === 200 && response.data.article.length !== 0) {
              let srcs = []
              _this.loading = true
              _this.article = response.data.article
              _this.article.find(obj => {
              	obj.img = obj.img === '[]' ? eval('(' + obj.img + ')') : JSON.parse(obj.img)
              	obj.psd = obj.psd === '[]' ? eval('(' + obj.psd + ')') : JSON.parse(obj.psd)
              	obj.video = obj.video === '[]' ? eval('(' + obj.video + ')') : JSON.parse(obj.video)
              	obj.typeFile === 'img' ? srcs[srcs.length] = obj.img[0].miniImg : obj.typeFile = obj.typeFile
              	obj.typeFile === 'psd' ? srcs[srcs.length] = obj.psd[0].Psdview : obj.typeFile = obj.typeFile
              	obj.typeFile === 'video' ? srcs[srcs.length] = obj.video[0].Videoview : obj.typeFile = obj.typeFile
              	obj.srcs = srcs.length !== 0 ? srcs : new Array()
              	srcs = []
              })
              _this.articleAll = parseInt(response.data.articleNum)
              _this.currentPage1 = parseInt(response.data.page)
              _this.loading = false
            } else {
              _this.article = []
              _this.articleAll = 0
              _this.loading = false
              _this.prompt = '没有查到相关数据'
            }
            // 更新每页条数
            if (_this.dataList !== response.data.article.length) {
              let adminInfo =  _this.$store.state.admin.adminInfo
              adminInfo.articlePageNum = response.data.article.length
              _this.$store.commit(SET_ADMIN_INFO, adminInfo)
              cachedAdminInfo.save(adminInfo)
            }
          })
          .catch(function (error) {
            // _this.$alert(error.msg, {confirmButtonText: '确定'})
          })
      },
      // 判断文章的img、psd、video是否有数据并返回true/false
      returnArticleType (type,mid) {
        let time = false
        switch (type) {
          case 'img':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.img !== '[]' ? time = true : time = false
              }
            })
            return time
            break;
          case 'psd':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.psd !== '[]' ? time = true : time = false
              }
            })
            return time
            break;
          case 'video':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.video !== '[]' ? time = true : time = false
              }
            })
            return time
            break;
        }
      }
    },
    created() {
      let _this = this
      this.adminGetArticleAll({
        keyword: _this.keyword,
        page: 1,
        articlePageNum: _this.dataList,
        pid: _this.xname.id !== '' ? _this.xname.id : null,
        tid: _this.lname.id !== '' ? _this.lname.id : null,
        did: _this.dnames.did !== '' ? _this.dnames.did : null,
        uid: _this.user.id !== '' ? _this.user.id : null,
        userId: _this.userInfo.uId
        })
      this.webUserList()
        .then((response) => { 
          if(response.code === 200) {
            _this.loading = true
            _this.userList = response.data
            if (_this.userList.length !== 0) {
              _this.userList.find((o, index) => {
                o.registerTime = _this.formatDate(o.registerTime)
                o.endTime = _this.formatDate(o.endTime)
              })
              _this.loading = false
            } else {
              _this.userList = []
            }
          }
        })
        .catch(function (error) {
          // _this.$alert(error.msg, {confirmButtonText: '确定'})
        })
      // 屏蔽项目设置
      if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== "2"){
        this.userInfo.shieldInfo.find((o,index)=>{
          _this.projects.find((e,indexe)=>{
            e.pid == o.pid && o.state !== '0' ? e.state = '0' : e = e
            _this.$set(_this.projects,indexe,e)
          })
        })
      }
    }
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.el-container{ border-top: 1px solid #e3e3e3; padding-top: 30px;}
.omit{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;height:30px!important}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.el-header{width:1200px;margin:0 auto 30px;height:auto;background:0 0;height:auto!important;padding-bottom:40px}
.tab{width:100%;height:auto;min-height:30px;margin-bottom:20px;position:relative}
.tab p{font-weight:400;color:#1f2f3d;font-size:20px;margin:0;float:left;width:7%}
.tab ul{float:left;width:93%;height:auto}
.tab ul li{float:left;height:30px;line-height:30px;margin:0 10px;cursor:pointer}
.tab ul li:hover{color:#409eff;font-weight:700}
.tab ul a{position:absolute;bottom:-40px;left:44%;width:160px;display:inline-block;line-height:30px;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;border-top-color:#dcdfe6;border-right-color:#dcdfe6;border-bottom-color:#dcdfe6;border-left-color:#dcdfe6;border-color:#dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;outline:0;margin:0;-webkit-transition:.1s;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;font-size:14px;border-radius:4px}
.tab ul a:hover{background:#fff;border-color:#409eff;color:#409eff}
.tab ul li.on{color:#fff;background-color:#409eff;border-color:#f56c6c;display:inline-block;white-space:nowrap;cursor:pointer;border:1px solid #dcdfe6;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;outline:0;margin:0;-webkit-transition:.1s;transition:.1s;font-weight:500;padding:5px 10px;font-size:14px;border-radius:4px;line-height:20px}
table{width:100%!important}
.el-pagination span:not([class*=suffix]){float:right!important}
.cell{padding:0!important}
.articleList{width: 1200px; height: auto; margin: 80px auto;}
.articleList dt{ width: 100%; height: 361px; font-size: 20px; text-align: center; line-height: 361px;}
.articleList dd{ width: 22%; height: 335px; float: left; overflow: hidden;margin: 1%;border: 1px solid #e5e5e5;border-radius: 5px;box-shadow:none; cursor: pointer; background: #FFFFFF;}
.articleList dd:hover p:nth-child(2){color:#f00000 ;}
.articleList dd p:nth-child(1){width: 266px; height: 215px; position: relative; border-radius: 10px 10px 0 0;overflow: hidden;}
.articleList dd p:nth-child(1) img{position: absolute; display: block; width: 266px; }
.articleList dd p:nth-child(2){ height: 40px; padding: 5px; border-bottom: 1px solid #e5e5e5; font-size: 18px; line-height: 1.2;}
.articleList dd p:nth-child(3){height: 45px; padding: 15px; line-height: 45px;}
.articleList dd p:nth-child(3) img{ width: 40px; height: 40px; float: left; display: block;border-radius: 50px;}
.articleList dd p:nth-child(3) span{float: left; display: block; width: 50%; text-indent: 10px;}
.articleList dd p:nth-child(3) samp{float: left; display: block;width: 32%; text-align: center; color: #999999;line-height: .5;padding: 17px 0 0 0;}
.icon {width: 20px;height: 20px;vertical-align: -0.15em;fill: currentColor;overflow: hidden; padding-top: 10px;}
</style>
