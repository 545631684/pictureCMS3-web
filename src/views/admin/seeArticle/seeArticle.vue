<template>
  <el-container>
    <el-header>
      <div class="tabs">
        <el-button v-popover:popover1 style="border: 2px dashed #DCDFE6; background: none; margin-right: 20px;">用户</el-button>
        <el-popover
          ref="popover1"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom-start"
          width="1000"
          trigger="hover">
          <div class="tabs_div1">
            <div class="tabs_div1_item">
              <p class="tabs_div1_item_title">在职</p>
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in userList" :key="index" v-if="item.articleNum !== 0 && item.state === 0" @click="handleInputConfirm('user',item.nickname)">{{item.nickname}}</li>
              </ul>
            </div>
            <div class="tabs_div1_item2">
              <p class="tabs_div1_item_title2">离职</p>
              <ul class="tabs_div1_item_ul2">
                <li class="omit" v-for="(item, index) in userList" :key="index" v-if="item.articleNum !== 0 && item.state === 1" @click="handleInputConfirm('user',item.nickname)">{{item.nickname}}</li>
              </ul>
            </div>
          </div>
        </el-popover>
        <el-button v-popover:popover2 style="border: 2px dashed #DCDFE6; background: none; margin-right: 20px;">项目</el-button>
        <el-popover
          ref="popover2"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom-start"
          width="800"
          trigger="hover">
          <div class="tabs_div2">
            <div class="tabs_div1_item">
              <p class="tabs_div1_item_title">运维中</p>
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in projects" :key="index" v-if="item.state === 1 && item.webShow === 1" @click="handleInputConfirm('projects',item.xname)">{{item.xname}}</li>
              </ul>
            </div>
            <div class="tabs_div1_item2">
              <p class="tabs_div1_item_title2">已结束</p>
              <ul class="tabs_div1_item_ul2">
                <li class="omit" v-for="(item, index) in projects" :key="index" v-if="item.state === 1 && item.webShow === 0" @click="handleInputConfirm('projects',item.xname)">{{item.xname}}</li>
              </ul>
            </div>
          </div>
        </el-popover>
        <el-button v-popover:popover3 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">类型</el-button>
        <el-popover
          ref="popover3"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom-start"
          width="400"
          trigger="hover">
          <div class="tabs_div3">
            <div class="tabs_div1_item">
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in types" :key="index" v-if="item.state === 1" @click="handleInputConfirm('types',item.lname)">{{item.lname}}</li>
              </ul>
            </div>
          </div>
        </el-popover>
        <el-button v-popover:popover4 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">分类</el-button>
        <el-popover
          ref="popover4"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom-start"
          width="1000"
          trigger="hover">
          <div class="tabs_div3">
            <div class="tabs_div1_item">
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in minTypes2" :key="index" v-html="item.dname" :title="item.dname" @click="handleInputConfirm('minTypes',item.dname)"></li>
              </ul>
            </div>
          </div>
        </el-popover>
        <el-button v-popover:popover5 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">文件类型</el-button>
        <el-popover
          ref="popover5"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom-start"
          width="400"
          trigger="hover">
          <div class="tabs_div3">
            <div class="tabs_div1_item">
              <ul class="tabs_div1_item_ul">
                <li class="omit" title="img" @click="handleInputConfirm('fileType','img')">img</li>
                <li class="omit" title="psd" @click="handleInputConfirm('fileType','psd')">psd</li>
                <li class="omit" title="video" @click="handleInputConfirm('fileType','video')">video</li>
                <li class="omit" title="ai" @click="handleInputConfirm('fileType','ai')">ai</li>
                <li class="omit" title="压缩包" @click="handleInputConfirm('fileType','压缩包')">压缩包</li>
                <li class="omit" title="pdf" @click="handleInputConfirm('fileType','pdf')">pdf</li>
                <li class="omit" title="word" @click="handleInputConfirm('fileType','word')">word</li>
                <li class="omit" title="excel" @click="handleInputConfirm('fileType','excel')">excel</li>
              </ul>
            </div>
          </div>
        </el-popover>
        <div>
          <el-input placeholder="请输入关键词" v-model="searchKeyword" clearable style="width: 500px;">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>
      </div>
      <div style="padding-bottom: 30px;">
        <b style="font-size: 18px;">筛选条件:</b>
        <span v-for="tag in dynamicTags" :key="tag.name" class="el-tag el-tag--plain" v-if="tag.name !== ''">  {{tag.name}}  <i class="el-tag__close el-icon-close" @click="handleClose(tag.name)"></i></span>
      </div>
      <el-alert title="带💗️标志为当前用户发布的文章" type="info" show-icon style="width: 100% !important;"></el-alert>
      <el-table v-loading="loading" :data="article" style="width: 100% !important;">
        <el-table-column prop="mId" label="id" width="100" align="center">
        	<template slot-scope="scope">
        		{{myarticle(scope.row.uId, scope.row.mId)}}
        	</template>
        </el-table-column>
        <el-table-column prop="img" label="缩略图" width="120" align="center">
          <template slot-scope="scope" v-if="scope.row.srcs.length === 0">暂无图片</template>
          <template slot-scope="scope" v-if="scope.row.srcs.length !== 0" style="padding:0;">
          	<div style="width: 100px;height: auto; max-height:100px;overflow: hidden; background: #CCCCCC;">
              <i class="iconfont icon-pingbi" v-if="!scope.row.see" style="width: 50px;display: block;margin: 28px auto;font-size: 50px; color: #F56C6C;"></i>
              <viewer :images="viewer(scope.row.srcs[0])" v-if="scope.row.see">
                <img :src="URLS2 + scope.row.srcs[0]" alt="2" style="display: block;height: auto;width: 100%; height: auto;"/>
              </viewer>
          	</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="文件类型" width="160" align="center">
          <template slot-scope="scope" style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
          	<svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('img') !== -1">
              <use xlink:href="#icon-picture"></use>
            </svg>
          	<svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('psd') !== -1">
              <use xlink:href="#icon-web-psd"></use>
            </svg>
          	<svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('video') !== -1">
              <use xlink:href="#icon-shipinbofangyingpian"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('ai') !== -1">
              <use xlink:href="#icon-Ai"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('pdf') !== -1">
              <use xlink:href="#icon-Pdf"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('word') !== -1">
              <use xlink:href="#icon-word1"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('excel') !== -1">
              <use xlink:href="#icon-excel1"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('压缩包') !== -1">
              <use xlink:href="#icon-gongcheng-"></use>
            </svg>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="250" align="center"></el-table-column>
        <el-table-column prop="projectid" label="项目" width="100" align="center">
          <template slot-scope="scope">
            {{getProjectName(scope.row.projectid)}}
          </template>
        </el-table-column>
        <el-table-column prop="click" label="查看" width="100" align="center"></el-table-column>
        <el-table-column prop="registerTimeImg" label="发布人" align="center" width="160">
          <template slot-scope="scope">
            {{getUserName(scope.row.uId)}}
          </template>
        </el-table-column>
        <el-table-column prop="registerTimeImg" label="发布时间" align="center" width="160">
          <template slot-scope="scope">
            {{formatDate(scope.row.registerTimeImg)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" circle icon="el-icon-view" title="查看" v-on:click.stop="seeArticle(scope.row.mId, scope.row.typeFile)" v-if="scope.row.see"></el-button>
            <el-button size="mini" circle icon="el-icon-view" title="查看" disabled v-on:click.stop="seeArticle(scope.row.mId, scope.row.typeFile)" v-else="!scope.row.see"></el-button>
            <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" v-on:click.stop="modifyArticle(scope.row.mId, scope.row.typeFile, scope.row.uId)" v-if="scope.row.see"></el-button>
            <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" disabled v-on:click.stop="modifyArticle(scope.row.mId, scope.row.typeFile, scope.row.uId)" v-else="!scope.row.see"></el-button>
            <el-button size="mini" type="danger" circle icon="el-icon-delete" title="删除" v-on:click.stop="deleteArticle(scope.row.mId, scope.row.uId)" v-if="userInfo.permissions === 2 || scope.row.uId === userInfo.uId"></el-button>
            <el-button size="mini" type="danger" circle icon="el-icon-delete" title="删除" disabled v-on:click.stop="deleteArticle(scope.row.mId, scope.row.uId)" v-if="userInfo.permissions !== 2 && scope.row.uId !== userInfo.uId"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="width: 470px;margin:10px auto;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[6, 12, 24, 48]"
          :page-size="dataList"
          layout="total, sizes, prev, pager, next"
          :total="articleAll">
        </el-pagination>
      </div>
    </el-header>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
  import { SET_ADMIN_INFO } from 'STORE/mutation-types'
  import { cachedAdminInfo } from 'API/cacheService'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        userInfo: this.$store.state.admin.adminInfo,
        loading: true,
        projects: this.$store.state.common.publicInfo.projects,
        types: this.$store.state.common.publicInfo.types,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
        article: [],
        article2: [],
        article3: [],
        userList: [],
        URLS2: this.$store.state.common.publicInfo.srcUrl,
        num1: '',
        num2: '',
        num3: '',
        num4: '',
        user: {
          id: '',
          name: '',
          index: ''
        },
        xname: {
          id: '',
          name: '',
          index: ''
        },
        lname: {
          id: '',
          name: '',
          index: ''
        },
        dnames: {
          pbid: '',
          tbid: '',
          did: '',
          name: '',
          index: ''
        },
        fileType: {
          id: '',
          name: '',
          index: ''
        },
        currentPage1: 1,
        dataList: this.$store.state.admin.adminInfo.articlePageNum,
        pageNum: this.$store.state.admin.adminInfo.pageNum,
        articleAll: parseInt(this.$store.state.admin.adminInfo.articleAll),
        dynamicTags: [],
        searchKeyword:'',
      }
    },
    watch: {
      article:function (newQuestion, oldQuestion) {
      	// let _this = this
       //  this.article2 = this.article
       //  this.article.find((obj, index) => {
       //  	if (index < _this.dataList) {
       //  	  _this.$set(_this.article3, _this.article3.length, obj)
       //  	}
       //  })
      },
      'xname.name':function (newQuestion, oldQuestion) {
        let _this = this, num = []
      	if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== 2){
          this.userInfo.shieldInfo.find((o,index)=>{
            if(o.xname == _this.xname.name && o.state == 0){
              o.type.find((e,indexe)=>{
                if(e.state == 1){
                  _this.types.find((x,indexx)=>{
                    e.tid == x.tid ? x.state = 0 : x = x
                    _this.$set(_this.types,indexx,x)
                  })
                }
              })
            }
          })
        }
      },
      'lname.name':function (newQuestion, oldQuestion) {
      	if (this.num3 !== '') {
        	this.num3 = this.dnames.pbid = this.dnames.tbid = this.dnames.did = this.dnames.name = this.dnames.index = ''
      	}
      	this.setdata()
      }
    },
    methods: {
      ...mapActions([
        'getUserList',
        'getArticleAll2',
        'exhibitionDel',
        'setOperationInfo'
      ]),
      // 搜素按钮
      search(){
        this.setdata()
      },
      // 添加
      handleInputConfirm(type, inputValue) {
        if (inputValue) {
          if(type === 'user'){
            let user = this.userList.find(o=>{ return o.nickname === inputValue })
            this.user.id = user.uId
            this.user.name = user.nickname
          }
          if(type === 'projects'){
            let projects = this.projects.find(o=>{ return o.xname === inputValue })
            this.xname.id = projects.pid
            this.xname.name = projects.xname
          }
          if(type === 'types'){
            let types = this.types.find(o=>{ return o.lname === inputValue })
            this.lname.id = types.tid
            this.lname.name = types.lname
          }
          if(type === 'minTypes'){
            let minTypes = this.minTypes.find(o=>{ return o.dname === inputValue })
            this.dnames.tbid = minTypes.tbid
            this.dnames.did = minTypes.did
            this.dnames.name = minTypes.dname
          }
          if(type === 'fileType'){
            this.fileType.id = inputValue
            this.fileType.name = inputValue
          }

          this.dynamicTags.splice(0, this.dynamicTags.length);
          this.user.name !== '' ? this.dynamicTags.push(this.user) : console.log()
          this.xname.name !== '' ? this.dynamicTags.push(this.xname) : console.log()
          this.lname.name !== '' ? this.dynamicTags.push(this.lname) : console.log()
          this.dnames.name !== '' ? this.dynamicTags.push(this.dnames) : console.log()
          this.fileType.name !== '' ? this.dynamicTags.push(this.fileType) : console.log()

          this.setdata()
        }
      },
      // 筛选条件标签删除操作
      handleClose(tagName) {
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tagName), 1);
        if(tagName === this.user.name){
          this.user.id = ''
          this.user.name = ''
        }
        if(tagName === this.xname.name){
          this.xname.id = ''
          this.xname.name = ''
        }
        if(tagName === this.lname.name){
          this.lname.id = ''
          this.lname.name = ''
        }
        if(tagName === this.dnames.name){
          this.dnames.tbid = ''
          this.dnames.did = ''
          this.dnames.name = ''
        }
        if(tagName === this.fileType.name){
          this.fileType.id = ''
          this.fileType.name = ''
        }
        this.dynamicTags.splice(0, this.dynamicTags.length);
        this.user.name !== '' ? this.dynamicTags.push(this.user) : console.log()
        this.xname.name !== '' ? this.dynamicTags.push(this.xname) : console.log()
        this.lname.name !== '' ? this.dynamicTags.push(this.lname) : console.log()
        this.dnames.name !== '' ? this.dynamicTags.push(this.dnames) : console.log()
        this.fileType.name !== '' ? this.dynamicTags.push(this.fileType) : console.log()

        this.setdata()
      },
      // 返回查看数据
      viewer (url) {
        var urls = [this.URLS2 + url]
        return urls
      },
      handleSizeChange(val) {
        let adminInfo =  this.$store.state.admin.adminInfo
        adminInfo.articlePageNum = val
        this.dataList = val
        this.$store.commit(SET_ADMIN_INFO, adminInfo)
        cachedAdminInfo.save(adminInfo)
        this.adminGetArticleAll({
          page: 1,
          articlePageNum: this.dataList || 6,
          keyword: this.searchKeyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          pid: this.xname.id !== '' ? this.xname.id : null,
          tid: this.lname.id !== '' ? this.lname.id : null,
          did: this.dnames.did !== '' ? this.dnames.did : null,
          uid: this.user.id !== '' ? this.user.id : null,
          userId: this.userInfo.uId
          })
        // console.log('每页 ' + val + '条');
      },
      handleCurrentChange(val) {
        this.adminGetArticleAll({
          page: val,
          articlePageNum: this.dataList || 6,
          keyword: this.searchKeyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          pid: this.xname.id !== '' ? this.xname.id : null,
          tid: this.lname.id !== '' ? this.lname.id : null,
          did: this.dnames.did !== '' ? this.dnames.did : null,
          uid: this.user.id !== '' ? this.user.id : null,
          userId: this.userInfo.uId
          })
      },
      resetTab () {
        this.num1 = this.xname.id = this.xname.name = this.xname.index = this.num2 = this.lname.id = this.lname.name = this.lname.index = ''
      },
      /**
       * 选择类型动态修改，点击不同的项目、类型、分类显示相应的类型和分类
       * */
      setdata () {
        let _this = this
        this.minTypes2 = []
        if (this.xname.id === '' && this.lname.id === '' && this.dnames.did === '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did === '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id === '' && this.lname.id === '' && this.dnames.did !== '') {
          this.resetTab()
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did !== '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        }
        this.adminGetArticleAll({
          page: 1,
          articlePageNum: this.dataList || 6,
          keyword: this.searchKeyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          pid: this.xname.id !== '' ? this.xname.id : null,
          tid: this.lname.id !== '' ? this.lname.id : null,
          did: this.dnames.did !== '' ? this.dnames.did : null,
          uid: this.user.id !== '' ? this.user.id : null,
          userId: this.userInfo.uId
          })
      },
      formatDate (time) {
        if (time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '暂无'
        }
      },
      // 修改文章路径跳转
      modifyArticle (mid, typeFile, uid) {
        // 限制普通用户不可修改他人发布的文章
        /*let implement = false
        if (uid === this.$store.state.admin.adminInfo.uId || this.$store.state.admin.adminInfo.permissions === '2') {
          implement = true
        } else {
          this.$alert('此文章不是当前用户发布，无权修改！', '警告', {
            confirmButtonText: '确定'
          })
          implement = false
        }*/
        if (true) {
          this.$router.push('/backstage/articleUpdate/' + mid)
        }
      },
      // 查看文章路径跳转
      seeArticle (mid, typeFile) {
        this.setOperationInfo({_this:this, type:1, id:mid})
        window.open(this.$store.state.common.publicInfo.srcUrl + '#/web/article/' + mid + '/backstage/0/0/', '_blank')
      },
      // 删除文章
      deleteArticle (mid, uid) {
        let _this = this
        this.$confirm('此操作将删除该文件到回收站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.exhibitionDel({mId: mid, uId: _this.userInfo.uId})
            .then((response) => {
              if(response.code === 200) {
                _this.article3 = []
                _this.setOperationInfo({_this:_this, type:2, id:mid})
                _this.$message({message: response.msg, type: 'success'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 获取用户昵称
      getUserName(id){
        let user = this.userList.find(o=>{ return o.uId === id }), name = ''
        user !== undefined ? name = user.nickname : name = ''
        return name
      },
      // 获取当前分类的上级项目名称
      getProjectName(pid) {
      	return this.$store.getters.getUserProjectsName(pid) === undefined ? "":this.$store.getters.getUserProjectsName(pid).xname
      },
      // 💗️标出时当前用户的文章
      myarticle (uid, mid) {

        return uid === this.$store.state.admin.adminInfo.uId ? '💗️' + mid : mid
      },
      // 判断文章的img、psd、video是否有数据并返回true/false
      returnArticleType (type,mid) {
        let time = false
        switch (type) {
            case 'img':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.img.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'psd':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.psd.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'video':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.video.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'ai':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.ai.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'engineering':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.engineering.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'pdf':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.pdf.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'word':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.word.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
            case 'excel':
              this.article.find((obj, index) => {
                if (obj.mId === mid) {
                  obj.excel.length !== 0 ? time = true : time = false
                }
              })
              return time
              break;
          }
      },
      adminGetArticleAll (params) {
        let _this = this
        this.getArticleAll2(params)
          .then((response) => {
            if(response.code === 200 && response.data.article.length !== 0) {
              let srcs = []
              _this.loading = true
              _this.article = response.data.article
              _this.article.find(obj => {
              	// obj.img = obj.img === '[]' ? eval('(' + obj.img + ')') : JSON.parse(obj.img)
              	// obj.psd = obj.psd === '[]' ? eval('(' + obj.psd + ')') : JSON.parse(obj.psd)
              	// obj.video = obj.video === '[]' ? eval('(' + obj.video + ')') : JSON.parse(obj.video)
              	// obj.ai = obj.ai === '[]' ? eval('(' + obj.ai + ')') : JSON.parse(obj.ai)
              	// obj.pdf = obj.pdf === '[]' ? eval('(' + obj.pdf + ')') : JSON.parse(obj.pdf)
              	// obj.word = obj.word === '[]' ? eval('(' + obj.word + ')') : JSON.parse(obj.word)
              	// obj.excel = obj.excel === '[]' ? eval('(' + obj.excel + ')') : JSON.parse(obj.excel)
              	// obj.engineering = obj.engineering === '[]' ? eval('(' + obj.engineering + ')') : JSON.parse(obj.engineering)
              	obj.typeFile.indexOf('img') !== -1 ? srcs[srcs.length] = obj.img[0].miniImg : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('psd') !== -1 ? srcs[srcs.length] = obj.psd[0].Psdview : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('video') !== -1 ? srcs[srcs.length] = obj.video[0].Videoview : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('ai') !== -1 ? srcs[srcs.length] = 'image/ai.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('pdf') !== -1 ? srcs[srcs.length] = 'image/pdf.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('word') !== -1 ? srcs[srcs.length] = 'image/word.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('excel') !== -1 ? srcs[srcs.length] = 'image/excel.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile.indexOf('压缩包') !== -1 ? srcs[srcs.length] = 'image/ysb.jpg' : obj.typeFile = obj.typeFile
              	obj.srcs = srcs.length !== 0 ? srcs : new Array()
                // obj.see = true
                obj.see = _this.authorityDetection(obj.mId)
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
      // 检查文章权限
      authorityDetection(mId){
        let privacyTypes = [], panduan = true, _this = this, article = this.article.find(o=>{return o.mId === mId})
        if(this.$store.state.common.publicInfo.privacyTypes.length === 0){
          panduan = true
        } else {
          this.$store.state.common.publicInfo.privacyTypes.find(obj=>{
            if(obj.state === 1){
              privacyTypes.push({
                "id":obj.id,
                "tid":obj.tid,
                "users":obj.users !== null ? obj.users.split(',') : [],
                "authGroup":obj.authGroup !== null ? obj.authGroup.split(',') : [],
                "state":obj.state,
                "articlelist":obj.articlelist
              })
            }
          })
          if(privacyTypes.length === 0 || article.uId === _this.userInfo.uId || _this.userInfo.permissions === 2){
            panduan = true
          } else {
            privacyTypes.find(p=>{
              if(p.tid === article.detailsid){
                if(p.state === 2 || (p.state === 1 && p.users.length === 0 && p.authGroup.length === 0 ) || (p.state === 1 && p.users.includes(_this.userInfo.uId) || p.authGroup.includes(_this.userInfo.permissions))){
                  panduan = true
                } else {
                  panduan = false
                }
              }
            })
          }
        }
        return panduan
      }
    },
    created() {
      let _this = this
      this.adminGetArticleAll({
        page: 1,
        articlePageNum: this.$store.state.admin.adminInfo.articlePageNum,
        keyword: this.searchKeyword,
        type: this.fileType.name !== '' ? this.fileType.name : null,
        pid: this.xname.id !== '' ? this.xname.id : null,
        tid: this.lname.id !== '' ? this.lname.id : null,
        did: this.dnames.did !== '' ? this.dnames.did : null,
        uid: this.user.id !== '' ? this.user.id : null,
        userId: this.userInfo.uId
        })
      this.getUserList()
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
      if(this.userInfo.shieldInfo !== "{}" && this.projects.length !== 0 && this.userInfo.permissions !== 2){
        this.userInfo.shieldInfo.find((o,index)=>{
          _this.projects.find((e,indexe)=>{
            e.pid == o.pid && o.state !== 0 ? e.state = 0 : e = e
            _this.$set(_this.projects,indexe,e)
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.omit{text-overflow:ellipsis; overflow:hidden; white-space:nowrap; height: 30px !important;}
.clearfix:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.el-header{background: none; height: auto !important; }
.tab{width: 100%; height: auto; min-height: 30px; margin-bottom: 20px; position: relative;}
.tab p{font-weight: 400;color: #1f2f3d;font-size: 20px;margin: 0; float: left; width: 6%;}
.tab ul{float: left;width: 94%; height: auto;}
.tab ul li{float: left; height: 30px; line-height: 30px; margin: 0 10px;cursor: pointer;}
.tab ul li:hover{color: #409eff; font-weight: bold;}
.tab ul a{position: absolute;bottom: -40px;left: 44%;width: 160px;display: inline-block;line-height: 30px;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;border-top-color: rgb(220, 223, 230);border-right-color: rgb(220, 223, 230);border-bottom-color: rgb(220, 223, 230);border-left-color: rgb(220, 223, 230);border-color: #dcdfe6;color: #606266;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box;outline: none;margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;font-size: 14px;border-radius: 4px;}
.tab ul a:hover{background: #fff;border-color: #409eff;color: #409eff;}
.tab ul li.on{color: #fff;background-color: #409eff;border-color: #f56c6c; display: inline-block;white-space: nowrap;cursor: pointer;border: 1px solid #dcdfe6;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box; outline: 0; margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;padding: 5px 10px;font-size: 14px;border-radius: 4px;line-height: 20px;}
table{ width: 100% !important;}
.icon {width: 25px;height: 25px;vertical-align: -0.15em;fill: currentColor;overflow: hidden;    margin-right: 5px;}
.el-pagination span:not([class*=suffix]){float: right !important;}
.el-table .cell{padding: 0 !important;}

.tabs{display: flex; justify-content: flex-start; align-items: center; padding: 0 0 30px;}
.tabs_div1{padding-top: 20px;}
.tabs_div1 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div1 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
.tabs_div1 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div1 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div1 /deep/ .tabs_div1_item_ul li{width: 10%; text-align: left; height: 40px;    transition: all .2s; cursor: pointer;}

.tabs_div1 /deep/ .tabs_div1_item2{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div1 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;}
.tabs_div1 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
.tabs_div1 /deep/ .tabs_div1_item_ul2{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div1 /deep/ .tabs_div1_item_ul2 li{width: 10%; text-align: left;height: 40px;    transition: all .2s;cursor: pointer;}
.tabs_div1 /deep/ .tabs_div1_item_ul2 li:hover, .tabs_div1 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}

.tabs_div2{padding-top: 20px;}
.tabs_div2 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div2 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
.tabs_div2 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div2 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex: 1;}
.tabs_div2 /deep/ .tabs_div1_item_ul li{width: 20%; text-align: left; height: 40px;    transition: all .2s;cursor: pointer;}

.tabs_div2 /deep/ .tabs_div1_item2{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div2 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;}
.tabs_div2 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
.tabs_div2 /deep/ .tabs_div1_item_ul2{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex: 1;}
.tabs_div2 /deep/ .tabs_div1_item_ul2 li{width: 20%; text-align: left;height: 40px;    transition: all .2s;cursor: pointer;}
.tabs_div2 /deep/ .tabs_div1_item_ul2 li:hover, .tabs_div2 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}

.tabs_div3{padding-top: 20px;}
.tabs_div3 /deep/ .tabs_div1_item{position: relative;}
.tabs_div3 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
.tabs_div3 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div3 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div3 /deep/ .tabs_div1_item_ul li{width: 15%; text-align: left; height: 40px;    transition: all .2s;cursor: pointer;}
.tabs_div3 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
