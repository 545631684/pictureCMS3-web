<template>
  <el-container>
    <el-header>
      <div class="tab clearfix">
        <p>用户：</p>
        <ul>
          <li :class="{on:num4 === ''}" @click="tab4('', '全部', '')">全部</li>
          <li v-for="(item, index) in userList" :key="index" :class="{on:index === num4}" v-on:click.stop="tab4(index, item.nickname, item.uId)" v-if="item.articleNum !== 0">{{item.nickname}}</li>
        </ul>
      </div>
      <div class="tab clearfix">
        <p>项目：</p>
        <ul>
          <li :class="{on:num1 === ''}" @click="tab1('', '全部', '')">全部</li>
          <li v-for="(item, index) in projects" :key="index" :class="{on:index === num1}" v-on:click.stop="tab1(index, item.xname, item.pid)" v-if="item.state === '1'">{{item.xname}}</li>
        </ul>
      </div>
      <div class="tab clearfix">
        <p>类型：</p>
        <ul>
          <li :class="{on:num2 === ''}" @click="tab2('', '全部', '')">全部</li>
          <li v-for="(item, index) in types" :key="index" :class="{on:index === num2}" v-on:click.stop="tab2(index, item.lname, item.tid)" v-if="item.state === '1'">{{item.lname}}</li>
        </ul>
      </div>
      <div class="tab clearfix" style="margin-bottom: 50px;">
        <p>分类：</p>
        <ul :class="{omit:showtype}">
          <li :class="{on:num3 === ''}" @click="tab3('', '全部', '', '', '')">全部</li>
          <li v-for="(item, index) in minTypes2" :key="index" :class="{on:index === num3}" v-on:click.stop="tab3(index, item.dname, item.did, item.tbid, item.pbid)" v-html="item.dname"></li>
          <li class="clearfix"></li>
          <div v-if="minTypes2 !== '[]'">
            <a class="el-button--default is-plain" v-show="showtype" v-on:click.stop="showMinType()">点击查看全部分类</a>
            <a class="el-button--default is-plain" v-show="!showtype" v-on:click.stop="hideMinType()">收起</a>
          </div>
        </ul>
      </div>
       <el-alert title="带💗️标志为当前用户发布的文章" type="info" show-icon style="width: 100% !important;"></el-alert>
      <el-table v-loading="loading" :data="article" style="width: 100% !important;">
        <el-table-column prop="mId" label="id" width="100" align="center">
        	<template slot-scope="scope">
        		{{myarticle(scope.row.uId, scope.row.mId)}}<br />
        		<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('img', scope.row.mId)">
              <use xlink:href="#icon-picture"></use>
            </svg>
  					<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('psd', scope.row.mId)">
              <use xlink:href="#icon-web-psd"></use>
            </svg>
  					<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('video', scope.row.mId)">
              <use xlink:href="#icon-shipinbofangyingpian"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('ai', scope.row.mId)">
              <use xlink:href="#icon-Ai"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('pdf', scope.row.mId)">
              <use xlink:href="#icon-Pdf"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('word', scope.row.mId)">
              <use xlink:href="#icon-word1"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('excel', scope.row.mId)">
              <use xlink:href="#icon-excel1"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('engineering', scope.row.mId)">
              <use xlink:href="#icon-gongcheng-"></use>
            </svg>
        	</template>
        </el-table-column>
        <el-table-column prop="img" label="缩略图" width="100" align="left">
          <template slot-scope="scope" v-if="scope.row.srcs.length === 0">暂无图片</template>
          <template slot-scope="scope" v-if="scope.row.srcs.length !== 0" >
          	<div style="width: 100px;height: auto; max-height:100px;overflow: hidden; background: #CCCCCC;">
          		<viewer :images="viewer(scope.row.srcs[0])">
              <img :src="URLS2 + scope.row.srcs[0]" alt="" style="display: block;height: auto;width: 100%; height: auto;"/>
              </viewer>
          	</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="400" align="center"></el-table-column>
        <el-table-column prop="projectid" label="项目" width="100" align="center">
          <template slot-scope="scope">
            {{getProjectName(scope.row.projectid)}}
          </template>
        </el-table-column>
        <el-table-column prop="click" label="查看" width="100" align="center"></el-table-column>
        <el-table-column prop="registerTimeImg" label="发布时间" align="center" width="160">
          <template slot-scope="scope">
            {{formatDate(scope.row.registerTimeImg)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" circle icon="el-icon-view" title="查看" v-on:click.stop="seeArticle(scope.row.mId, scope.row.typeFile)"></el-button>
            <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" v-on:click.stop="modifyArticle(scope.row.mId, scope.row.typeFile, scope.row.uId)" ></el-button>
            <el-button size="mini" type="danger" circle icon="el-icon-delete" title="删除" v-on:click.stop="deleteArticle(scope.row.mId, scope.row.uId)" v-if="userInfo.permissions === '2' || scope.row.uId === userInfo.uId"></el-button>
            <el-button size="mini" type="danger" circle icon="el-icon-delete" title="删除" disabled v-on:click.stop="deleteArticle(scope.row.mId, scope.row.uId)" v-if="userInfo.permissions !== '2' && scope.row.uId !== userInfo.uId"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="width: 470px;margin:10px auto;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[5, 10, 15, 20]"
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
        showtype: true,
        currentPage1: 1,
        dataList: this.$store.state.admin.adminInfo.articlePageNum,
        pageNum: this.$store.state.admin.adminInfo.pageNum,
        articleAll: parseInt(this.$store.state.admin.adminInfo.articleAll),
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
        'getArticleAll',
        'exhibitionDel',
        'setOperationInfo'
      ]),
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
          articlePageNum: this.dataList || 5,
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
          articlePageNum: this.dataList || 5,
          pid: this.xname.id !== '' ? this.xname.id : null,
          tid: this.lname.id !== '' ? this.lname.id : null,
          did: this.dnames.did !== '' ? this.dnames.did : null,
          uid: this.user.id !== '' ? this.user.id : null,
          userId: this.userInfo.uId
          })
      },
      // 项目按钮
      tab1 (index, name, pid) {
        if (name !== '全部') {
          this.num1 = index
          this.xname.id = pid
          this.xname.name = name
          this.xname.index = index
        } else {
          this.num1 = this.xname.id = this.xname.name = this.xname.index = ''
        }
        this.setdata()
      },
      // 类型按钮
      tab2 (index, name, tid) {
        if (name !== '全部') {
          this.num2 = index
          this.lname.id = tid
          this.lname.name = name
          this.lname.index = index
        } else {
          this.num2 = this.lname.id = this.lname.name = this.lname.index = ''
        }
        this.setdata()
      },
      // 分类按钮
      tab3 (index, name, did, tbid, pbid) {
        if (name !== '全部') {
          this.num3 = index
          this.dnames.pbid = pbid
          this.dnames.tbid = tbid
          this.dnames.did = did
          this.dnames.name = name
          this.dnames.index = index
        } else {
          this.num3 = this.dnames.pbid = this.dnames.tbid = this.dnames.did = this.dnames.name = this.dnames.index = ''
        }
        this.setdata()
      },
      // 用户按钮
      tab4 (index, name, uid) {
        if (name !== '全部') {
          this.num4 = index
          this.user.id = uid
          this.user.name = name
          this.user.index = index
        } else {
          this.num4 = this.user.id = this.user.name = this.user.index = ''
        }
        this.setdata()
      },
      resetTab () {
        this.num1 = this.xname.id = this.xname.name = this.xname.index = this.num2 = this.lname.id = this.lname.name = this.lname.index = ''
      },
      showMinType () {
        this.setdata()
        this.showtype = false
      },
      hideMinType () {
        this.setdata()
        this.showtype = true
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
            if (_this.lname.id === obj.tbid && obj.state === '1' && obj.webShow === '1') {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id === '' && this.lname.id === '' && this.dnames.did !== '') {
          this.resetTab()
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === '1' && obj.webShow === '1') {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === '1' && obj.webShow === '1') {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did !== '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === '1' && obj.webShow === '1') {
              _this.minTypes2.push(obj)
            }
          })
        }
        this.adminGetArticleAll({
          page: 1,
          articlePageNum: this.dataList || 5,
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
          switch (typeFile) {
            case 'img':
              this.$router.push('/backstage/imgUpdate/' + mid)
              break;
            case 'psd':
              this.$router.push('/backstage/psdUpdate/' + mid)
              break;
            case 'video':
              this.$router.push('/backstage/videoUpdate/' + mid)
              break;
            case 'ai':
              this.$router.push('/backstage/aiUpdate/' + mid)
              break;
            case 'pdf':
              this.$router.push('/backstage/pdfUpdate/' + mid)
              break;
            case 'word':
              this.$router.push('/backstage/wordUpdate/' + mid)
              break;
            case 'excel':
              this.$router.push('/backstage/excelUpdate/' + mid)
              break;
            case 'engineering':
              this.$router.push('/backstage/engineeringUpdate/' + mid)
              break;
          }
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
        this.getArticleAll(params)
          .then((response) => {
            if(response.code === 200 && response.data.article.length !== 0) {
              let srcs = []
              _this.loading = true
              _this.article = response.data.article
              _this.article.find(obj => {
                console.log(obj.pdf === '[]')
              	// obj.img = obj.img === '[]' ? eval('(' + obj.img + ')') : JSON.parse(obj.img)
              	// obj.psd = obj.psd === '[]' ? eval('(' + obj.psd + ')') : JSON.parse(obj.psd)
              	// obj.video = obj.video === '[]' ? eval('(' + obj.video + ')') : JSON.parse(obj.video)
              	// obj.ai = obj.ai === '[]' ? eval('(' + obj.ai + ')') : JSON.parse(obj.ai)
              	// obj.pdf = obj.pdf === '[]' ? eval('(' + obj.pdf + ')') : JSON.parse(obj.pdf)
              	// obj.word = obj.word === '[]' ? eval('(' + obj.word + ')') : JSON.parse(obj.word)
              	// obj.excel = obj.excel === '[]' ? eval('(' + obj.excel + ')') : JSON.parse(obj.excel)
              	// obj.engineering = obj.engineering === '[]' ? eval('(' + obj.engineering + ')') : JSON.parse(obj.engineering)
              	obj.typeFile === 'img' ? srcs[srcs.length] = obj.img[0].miniImg : obj.typeFile = obj.typeFile
              	obj.typeFile === 'psd' ? srcs[srcs.length] = obj.psd[0].Psdview : obj.typeFile = obj.typeFile
              	obj.typeFile === 'video' ? srcs[srcs.length] = obj.video[0].Videoview : obj.typeFile = obj.typeFile
              	obj.typeFile === 'ai' ? srcs[srcs.length] = obj.img[0].miniImg : obj.typeFile = obj.typeFile
              	obj.typeFile === 'pdf' ? srcs[srcs.length] = 'image/pdf.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile === 'word' ? srcs[srcs.length] = 'image/word.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile === 'excel' ? srcs[srcs.length] = 'image/excel.jpg' : obj.typeFile = obj.typeFile
              	obj.typeFile === 'engineering' ? srcs[srcs.length] = obj.img[0].miniImg : obj.typeFile = obj.typeFile
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
      }
    },
    created() {
      let _this = this
      this.adminGetArticleAll({
        page: 1,
        articlePageNum: this.$store.state.admin.adminInfo.articlePageNum,
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
.omit{text-overflow:ellipsis; overflow:hidden; white-space:nowrap; height: 30px !important;}
.clearfix:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.el-header{background: none; height: auto !important; padding-bottom: 40px;}
.tab{width: 100%; height: auto; min-height: 30px; margin-bottom: 20px; position: relative;}
.tab p{font-weight: 400;color: #1f2f3d;font-size: 20px;margin: 0; float: left; width: 6%;}
.tab ul{float: left;width: 94%; height: auto;}
.tab ul li{float: left; height: 30px; line-height: 30px; margin: 0 10px;cursor: pointer;}
.tab ul li:hover{color: #409eff; font-weight: bold;}
.tab ul a{position: absolute;bottom: -40px;left: 44%;width: 160px;display: inline-block;line-height: 30px;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;border-top-color: rgb(220, 223, 230);border-right-color: rgb(220, 223, 230);border-bottom-color: rgb(220, 223, 230);border-left-color: rgb(220, 223, 230);border-color: #dcdfe6;color: #606266;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box;outline: none;margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;font-size: 14px;border-radius: 4px;}
.tab ul a:hover{background: #fff;border-color: #409eff;color: #409eff;}
.tab ul li.on{color: #fff;background-color: #409eff;border-color: #f56c6c; display: inline-block;white-space: nowrap;cursor: pointer;border: 1px solid #dcdfe6;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box; outline: 0; margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;padding: 5px 10px;font-size: 14px;border-radius: 4px;line-height: 20px;}
table{ width: 100% !important;}
.icon {width: 25px;height: 25px;vertical-align: -0.15em;fill: currentColor;overflow: hidden;}
.el-pagination span:not([class*=suffix]){float: right !important;}
.el-table .cell{padding: 0 !important;}
</style>
