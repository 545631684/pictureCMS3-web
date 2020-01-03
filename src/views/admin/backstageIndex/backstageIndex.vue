<template>
  <el-container>
    <el-header style="height: auto; margin: 0; padding: 0;" class="clearfix">
      <dl class="Label">
        <dd style="box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .3)">
          <ul class="userInfoyTop clearfix">
          	<li>
          		<img :src="this.$store.state.common.publicInfo.srcUrl + adminInfo.headPortraitSrc" alt=""/>
          	</li>
          	<li>
          		<span>{{adminInfo.nickname}}<svg v-if="adminInfo.sex === '1'" class="icon2" aria-hidden="true"><use xlink:href="#icon-xingbienan"></use></svg><svg v-else class="icon2" aria-hidden="true"><use xlink:href="#icon-xingbienv"></use></svg></span>
          	<samp>{{adminInfo.userName}}</samp>	
          	</li>
           </ul>
        </dd>
        <dd style="background-color: rgb(41, 182, 246);">
          <span class="icons"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wenzhang"></use></svg></span>
          <span class="content">共发表了<p>{{articleNum}}</p>篇文章</span>
        </dd>
        <dd style="background-color: rgb(51, 184, 108);">
          <span class="icons"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-huishouzhan"></use></svg></span>
          <span class="content">垃圾箱共有<p>{{articleDeleteNum}}</p>篇文章</span>
        </dd>
        <dd style="background-color: rgb(110, 140, 215);">
          <span class="icons"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xiazaigray"></use></svg></span>
          <span class="content">供他人下载<p>{{downloadNum}}</p>次</span>
        </dd>
      </dl>
    </el-header>
    <el-row style="margin-top: 20px;">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" style="font-weight: bold;">最新发布</div>
          <div class="articleList" >
            <dl v-if="article.length !== 0">
              <dd v-for="(itme, index) in article" :key="index">
                <span class="article-title" @click="seeArticle(itme.mId, itme.typeFile)">{{ itme.title }}</span>
                <span class="time">{{ formatDate(itme.registerTimeImg)}}</span>
              </dd>
            </dl>
            <p v-if="article.length === 0" style="text-align: center;">暂无数据</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" style="font-weight: bold;">操作日志</div>
          <div class="articleList" >
            <dl v-if="systemLog.length !== 0">
              <dd v-for="(itme, index) in systemLog" :key="index">
                <span>ip地址:{{ itme.ip }}</span>
                <span>{{ itme.body}}</span>
              </dd>
            </dl>
            <p v-if="systemLog.length === 0" style="text-align: center;">暂无数据</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
      
  </el-container>
</template>

<script>
  import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        adminInfo: this.$store.state.admin.adminInfo,
        userList: [],
        article:[],
        downloadNum: 0,
        articleNum: 0,
        articleDeleteNum: 0,
        systemLog: []
      }
    },
    methods: {
      ...mapActions([
        'getUserList',
        'getAdminIndexData',
      ]),
      formatDate (time) {
        if (time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '暂无'
        }
      },
      // 查看文章路径跳转
      seeArticle (mid, typeFile) {
        switch (typeFile) {
          case 'img':
            window.open('#/web/article/' + mid + '/backstage/0/0/', '_blank')
            break;
          case 'psd':
            window.open('#/web/article/' + mid + '/backstage/0/0/', '_blank')
            break;
          case 'video':
            window.open('#/web/articleVideo/' + mid + '/backstage/0/0/', '_blank')
            break;
        }
      },
    },
    created() {
      let _this = this
      this.getAdminIndexData({uId:this.$store.state.admin.adminInfo.uId})
        .then((response) => {
          if(response.code === 200) {
            _this.article = response.data.article === null ? [] : response.data.article
            _this.downloadNum = response.data.downloadNum
            _this.articleNum = response.data.articleNum
            _this.articleDeleteNum = response.data.articleDeleteNum
          }
        })
        .catch(function (error) {
          // _this.$alert(error.msg, {confirmButtonText: '确定'})
        })
      this.getUserList()
        .then((response) => {
          if(response.code === 200) {
            _this.userList = response.data
            if (_this.userList.length !== 0) {
              _this.userList.find((o, index) => {
                o.registerTime = _this.formatDate(o.registerTime)
                o.endTime = _this.formatDate(o.endTime)
              })
            } else {
              _this.userList = []
            }
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
.icon{width:1.5em;height:1.5em;font-size:20px;fill:currentColor;overflow:hidden;margin:1rem;display:table-cell;vertical-align:middle;line-height:1}
.Label{width:100%;height:auto;display:flex}
.Label dd{position:relative;width:24%;height:auto;height:120px;border-radius:5px;margin:5px;display:flex;flex-direction:row;justify-content:space-between;align-items:center;transition:all .3s}
.Label dd:hover{box-shadow:0 0 5px 0 rgba(38,42,48,.3)}
.Label dd span{color:#fff}
.Label dd span.icons{display:table;background-color:rgba(255,255,255,.2);border-radius:50%;text-align:center;width:60px;height:60px;color:#fff;margin:0 20px;box-shadow:0 0 5px 0 rgba(38,42,48,.1)}
.Label dd span.content{margin:0 20px;display:flex;flex-direction:column;text-align:right;color:#f9f9f9;font-size:16px;font-weight:700;line-height:1}
.Label dd span>p{font-size:24px;color:#fff;line-height:1.2}
.userInfoyTop li{float:left;height:88px}
.userInfoyTop li:nth-child(1){margin:auto 20px}
.userInfoyTop li:nth-child(2){padding:10px;height:68px}
.userInfoyTop li img{width:88px;height:88px;border-radius:100px}
.userInfoyTop li samp{padding:10px 0}
.userInfoyTop li samp,.userInfoyTop li span{display:block;font-size:18px;font-weight:700;color:#606266;height:30px;line-height:30px}
.icon2{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden;margin-left:.5em}
.box-card{width:96%}
.articleList{}
.articleList dl{border: 1px solid #eee; border-left: none; border-right: none; border-bottom: none;}
.articleList dl dd{    padding: 15px 10px;
    border: 1px solid #eee;
    border-top: 0;
    font-size: 14px;
    color: #555;
        display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;}
.articleList dl dd span.article-title{    position: relative;
    cursor: pointer;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: color .3s;
    transition: color .3s;}
    .articleList dl dd span.article-title:hover{ color: #29b6f6;}
    .articleList dl dd span.time{    color: #999;
    margin-left: 10px;}
</style>
