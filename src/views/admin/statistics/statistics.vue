<template>
  <el-container class="userInfo"  v-loading="loading">
  	<el-header style="margin: 10px 0;">
  		<el-row :gutter="20" >
  			<el-col :span="24">
          <el-card>
            <div>
              <p class="slogan">嗨~！自<b>2018年7月01日</b>至今我已经平稳运行<b>{{runningDays}}</b>天了😀，注册用户达到了<b>{{userAll}}</b>人，共发布了<b>{{activeAll}}</b>篇文章包含<b>8</b>个类型的文件，提供下载服务<b>{{activeDownloadAll}}</b>次，继续努力哦~！💖</p>
            </div>
          </el-card>
  			</el-col>
  		</el-row>
  	</el-header>
    <el-header style="margin: 10px 0;">
    	<el-row :gutter="20">
    		<el-col :span="6">
    			<el-card>
    				<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
              <svg class="icon2 svg-icon" aria-hidden="true" title='img'>
                <use xlink:href="#icon-picture"></use>
              </svg>
    					<div class="icoInfo">
    						<p>{{fileType.img.articleNum}}篇/{{fileType.img.fileNum}}文件</p>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.img.ratio" :color="colors"></el-progress>
    					</div>
    				</div>
    			</el-card>
    		</el-col>
    		<el-col :span="6">
    			<el-card>
    				<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
    			    <svg class="icon2 svg-icon" aria-hidden="true" title='psd'>
    			      <use xlink:href="#icon-web-psd"></use>
    			    </svg>
    					<div class="icoInfo">
    						<p>{{fileType.psd.articleNum}}篇/{{fileType.psd.fileNum}}文件</p>
    			      <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.psd.ratio" :color="colors"></el-progress>
    					</div>
    				</div>
    			</el-card>
    		</el-col>
    		<el-col :span="6">
    			<el-card>
    				<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
    			    <svg class="icon2 svg-icon" aria-hidden="true" title='video'>
    			      <use xlink:href="#icon-shipinbofangyingpian"></use>
    			    </svg>
    					<div class="icoInfo">
    						<p>{{fileType.video.articleNum}}篇/{{fileType.video.fileNum}}文件</p>
    			      <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.video.ratio" :color="colors"></el-progress>
    					</div>
    				</div>
    			</el-card>
    		</el-col>
        <el-col :span="6">
        	<el-card>
        		<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
        	    <svg class="icon2 svg-icon" aria-hidden="true" title='ai'>
        	      <use xlink:href="#icon-Ai"></use>
        	    </svg>
        			<div class="icoInfo">
        				<p>{{fileType.ai.articleNum}}篇/{{fileType.ai.fileNum}}文件</p>
        	      <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.ai.ratio" :color="colors"></el-progress>
        			</div>
        		</div>
        	</el-card>
        </el-col>
    	</el-row>
    </el-header>
    <el-header style="margin: 10px 0;">
    	<el-row :gutter="20">
    		<el-col :span="6">
    			<el-card>
    				<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
              <svg class="icon2 svg-icon" aria-hidden="true" title='pdf'>
                <use xlink:href="#icon-Pdf"></use>
              </svg>
    					<div class="icoInfo">
    						<p>{{fileType.pdf.articleNum}}篇/{{fileType.pdf.fileNum}}文件</p>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.pdf.ratio" :color="colors"></el-progress>
    					</div>
    				</div>
    			</el-card>
    		</el-col>
    		<el-col :span="6">
    			<el-card>
    				<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
    			    <svg class="icon2 svg-icon" aria-hidden="true" title='word'>
    			      <use xlink:href="#icon-word1"></use>
    			    </svg>
    					<div class="icoInfo">
    						<p>{{fileType.word.articleNum}}篇/{{fileType.word.fileNum}}文件</p>
    			      <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.word.ratio" :color="colors"></el-progress>
    					</div>
    				</div>
    			</el-card>
    		</el-col>
    		<el-col :span="6">
    			<el-card>
    				<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
    			    <svg class="icon2 svg-icon" aria-hidden="true" title='excel'>
    			      <use xlink:href="#icon-excel1"></use>
    			    </svg>
    					<div class="icoInfo">
    						<p>{{fileType.excel.articleNum}}篇/{{fileType.excel.fileNum}}文件</p>
    			      <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.excel.ratio" :color="colors"></el-progress>
    					</div>
    				</div>
    			</el-card>
    		</el-col>
        <el-col :span="6">
        	<el-card>
        		<div style="height: 100px;display: flex; justify-content: space-between; align-items: center;">
        	    <svg class="icon2 svg-icon" aria-hidden="true" title='engineering'>
        	      <use xlink:href="#icon-gongcheng-"></use>
        	    </svg>
        			<div class="icoInfo">
        				<p>{{fileType.zip.articleNum}}篇/{{fileType.zip.fileNum}}文件</p>
        	      <el-progress :text-inside="true" :stroke-width="18" :percentage="fileType.zip.ratio" :color="colors"></el-progress>
        			</div>
        		</div>
        	</el-card>
        </el-col>
    	</el-row>
    </el-header>
    <el-header style="margin: 10px 0;">
    	<el-row :gutter="20" >
    		<el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix titleIcon">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-zuixin"></use>
              </svg>
              <span>最新发布</span>
            </div>
            <div id="articleLately" class="articleLately" style="height: 506px;">
            	<ul>
            		<li v-for="(item, index) in activeLatelyData" :key="index" v-if="index < 10">
            			<router-link target="_blank" :title="item.title" tag="a" :to="seeArticle(item.mId, item.typeFile)">
            				<p class="omit">{{item.title}}</p>
            				<p>
            					<samp><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shijian"></use></svg>{{formatDate(item.registerTimeImg)}}</samp>
            					<samp><svg v-if="item.sex === '0'" class="icon" aria-hidden="true"><use xlink:href="#icon-icon-test"></use></svg><svg v-if="item.sex === '1'" class="icon" aria-hidden="true"><use xlink:href="#icon-icon-test1"></use></svg>{{item.nickname}}</samp>
            					<samp><svg class="icon" aria-hidden="true"><use xlink:href="#icon-chakan"></use></svg>{{item.click}}</samp>
            					<samp>
            						<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('img', item.mId)">
                          <use xlink:href="#icon-picture"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('psd', item.mId)">
                          <use xlink:href="#icon-web-psd"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('video', item.mId)">
                          <use xlink:href="#icon-shipinbofangyingpian"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('ai', item.mId)">
                          <use xlink:href="#icon-Ai"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('pdf', item.mId)">
                          <use xlink:href="#icon-Pdf"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('word', item.mId)">
                          <use xlink:href="#icon-word1"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('excel', item.mId)">
                          <use xlink:href="#icon-excel1"></use>
                        </svg>
                        <svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('engineering', item.mId)">
                          <use xlink:href="#icon-gongcheng-"></use>
                        </svg>
            					</samp>
            				</p>
            			</router-link>
            		</li>
            	</ul>
            </div>
          </el-card>
    		</el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix titleIcon">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang-"></use>
              </svg>
              <span>用户发布TOP10</span>
            </div>
             <div id="articleRanking" class="articleRanking" style="height: 506px;">
             	<ul>
             		<li v-for="(item, index) in articleRankingData" :key="index" v-if="index < 10">
             			<p>{{index+1}}</p>
             			<p>
             				<span :style="returnProportion(articleRankingData[0].count, item.count)"></span>
             				<samp>{{item.nickname}}    发布文章：{{item.count}}</samp>
             			</p>
             		</li>
             	</ul>
             </div>
          </el-card>
    		</el-col>
    	</el-row>
    </el-header>
  	<el-header style="margin: 10px 0;">
  		<el-row :gutter="20">
  			<el-col :span="24">
  				<el-card>
            <div class="surfaceTitle1">
             <el-tag
               @click="surfaceTab1(item.id)"
               v-for="item in surfaceTitle1"
               :key="item.label"
               :type="item.type"
               :effect="item.effect">
               {{ item.label }}
             </el-tag>
            </div>
            <!-- 用户浏览 -->
            <modularUserBrowseWebInfo v-if="surfaceTitle1[0].effect === 'dark'" :effect="surfaceTitle1[0].effect"></modularUserBrowseWebInfo>
            <!-- 文章类型 -->
            <modularArticleSubsection v-if="surfaceTitle1[1].effect === 'dark'" :effect="surfaceTitle1[1].effect"></modularArticleSubsection>
            <!-- 用户发布 -->
            <modularArticleUserSubsection v-if="surfaceTitle1[2].effect === 'dark'" :effect="surfaceTitle1[2].effect"></modularArticleUserSubsection>
            <!-- 用户下载 -->
            <modularArticleUserDownload v-if="surfaceTitle1[3].effect === 'dark'" :effect="surfaceTitle1[3].effect"></modularArticleUserDownload>
            <!-- 项目文章占比 -->
            <modularArticleProject v-if="surfaceTitle1[4].effect === 'dark'" :effect="surfaceTitle1[4].effect"></modularArticleProject>
  				</el-card>
  			</el-col>
  		</el-row>
  	</el-header>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate } from 'UTIL/publicAPI'
  import modularUserBrowseWebInfo from 'VIEWS/admin/statistics/modularUserBrowseWebInfo'
  import modularArticleSubsection from 'VIEWS/admin/statistics/modularArticleSubsection'
  import modularArticleUserSubsection from 'VIEWS/admin/statistics/modularArticleUserSubsection'
  import modularArticleUserDownload from 'VIEWS/admin/statistics/modularArticleUserDownload'
  import modularArticleProject from 'VIEWS/admin/statistics/modularArticleProject'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
      modularUserBrowseWebInfo,
      modularArticleSubsection,
      modularArticleUserSubsection,
      modularArticleUserDownload,
      modularArticleProject,
    },
    data() {
    	return {
    		loading: true,
        tb4_loading: false,
        surfaceTitle1: [
          { type: '', label: '用户浏览', effect:'dark', id:'userBrowseWebInfo' },
          { type: '', label: '文章类型', effect:'plain', id:'articleSubsection' },
          { type: '', label: '用户发布', effect:'plain', id:'articleUserSubsection' },
          { type: '', label: '用户下载', effect:'plain', id:'articleUserDownload' },
          { type: '', label: '项目文章占比', effect:'plain', id:'articleProject' },
        ],
        tb4TimeValue: [],
    		activeDownloadAll: 0,
    		userAll: 0,
    		activeAll: 0,
    		runningDays: 0,
        fileType:{},
    		colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
        articleRankingData: [],
        activeLatelyData: [],
    	}
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'getAdminStatisticsData',
        'getUserBrowseWebInfo'
      ]),

      // 判断文章的img、psd、video是否有数据并返回true/false
      returnArticleType (type,mid) {
      	let time = false
      	switch (type) {
      		case 'img':
      			this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.img.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'psd':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.psd.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'video':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.video.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'ai':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.ai.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'pdf':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.pdf.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'word':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.word.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'excel':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.excel.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      		case 'engineering':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.engineering.length !== 0 ? time = true : time = false
      				}
      			})
      			return time
            break;
      	}
      },
      // 时间戳转换
      formatDate(time) {
      	if(time !== null) {
      		let date = new Date(parseInt(time) * 1000)
      		return formatDate(date, 'yyyy-MM-dd')
      	} else {
      		return '暂无'
      	}
      },
      // 跳转文章页
      seeArticle(mid, typeFile) {
        return {path:'/web/article/' + mid + '/backstage/0/0/'}
      },
      // 发布文章排行榜进度条%换算
      returnProportion (nums, num) {
      	let a = num/nums*100
      	return {width: a.toFixed(1) + '%' }
      },
      // 头部统计表标签切换
      surfaceTab1(id){
        this.surfaceTitle1.find((obj,index)=>{
          obj.id === id ? obj.effect = 'dark' : obj.effect = 'plain'
        })
      },
    },
    created() {
      let _this = this, date = new Date()
      // 获取当前用户页面所需的信息
      this.getAdminStatisticsData({uId:this.$store.state.admin.adminInfo.uId})
      .then((response) => {
        if(response.code === 200) {

            // 文章发布排行榜 数据填充
          	_this.articleRankingData = response.data.articleRanking

          	// 最近发布文章（20篇） 数据填充
          	_this.activeLatelyData = response.data.activeLately

            // 文件类型的统计
            _this.fileType = response.data.fileType

            _this.userAll = response.data.userAll
            _this.activeAll = response.data.activeAll
            _this.activeDownloadAll = response.data.activeDownloadAll
            _this.runningDays = response.data.runningDays
          }
          // 关闭加载状态
          _this.loading = false
      })
      .catch(function (error) {
        _this.$alert(error.msg, {confirmButtonText: '确定'})
      })
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.icon {width: 1em;height: 1em; vertical-align: -0.15em;fill: currentColor;overflow: hidden; margin-left: .5em;}
.icon2 {width: 5em;height: 5em; vertical-align: -0.15em;fill: currentColor;overflow: hidden; margin-left: .5em;}
.el-row{width: 100%;}
.el-header{ height: auto !important; padding: 0;}
.userInfo {}
.userInfo .userInfoyTop{}
.userInfo .userInfoyTop li{float: left; height: 88px;}
.userInfo .userInfoyTop li:nth-child(2){padding: 10px;height: 68px;}
.userInfo .userInfoyTop li img{width: 88px; height: 88px; border-radius: 100px;}
.userInfo .userInfoyTop li span,.userInfo .userInfoyTop li samp{display: block; font-size: 18px; font-weight: bold; color: #606266; height: 30px; line-height: 30px;}
.userInfo .info {color: #606266; font-weight: bold; text-align: justify;}
.userInfo .info samp{font-size: 18px !important;}
.userInfo .info span{font-size: 18px !important; color: #F56C6C !important;}
.userInfo .eChartsHistogram {height: 200px;}
.userInfo .info_div{min-height: 220px;}
.userInfo .info_div p{ padding-bottom: 10px; border-bottom: 1px solid #DCDFE6; margin-bottom: 10px;}
.userInfo .info_div ul li{padding: 3.8px 0;}
.userInfo .info_div ul li a{line-height: 20px;}
.userInfo .info_div ul li a span{float: left; display: block; width: 75%;}
.userInfo .info_div ul li a samp{float: right;}
.headPortrait{display:block;margin:50px auto 10px;border-radius:200px;width:150px;height:150px}
.avatar-uploader{width: 88px; float: left; margin-right: 10px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:500px;cursor:pointer;position:relative;overflow:hidden}
.avatar-uploader .el-upload:hover{border-color:#409EFF}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:150px!important;height:150px!important;line-height:150px!important;text-align:center}
.avatar{width:88px;height:88px;display:block;border-radius: 100px; position: relative;}
.avatar_span{display: none;width: 88px;height: 88px;position: absolute;top: 7%; left: 3%;text-align: center;color: #fff;line-height: 88px;font-weight: bold;background: #09090985;}
.avatar_div:hover,.avatar_span{display: block;}
.inputInfo{width:385px;height:40px;line-height:40px;margin:auto auto 20px}
.inputInfo .el-aside{background:0 0;width:50px!important;height:auto}
.inputInfo .el-main{padding:0;}
.inputInfo .el-main .el-input__inner{width: 200px !important;}
.icoInfo{width: 300px; height: 86px;}
.icoInfo p{ text-align: center; font-size: 26px;line-height: 50px;  padding: 0 5px;}
.icoInfo2{float: left; width: 100%; margin: -20px auto 0; padding: 10px;}
.icoInfo2 p{ text-align: center; font-size: 26px;    line-height: 36px;}
.articleRanking{}
.articleRanking ul{}
.articleRanking ul li{ margin-bottom: 11px;}
.articleRanking ul li:nth-child(1) p:nth-child(1){ border: 1px solid #F56C6C;color: #F56C6C;}
.articleRanking ul li:nth-child(1) p:nth-child(2) samp{color: #F56C6C;}
.articleRanking ul li:nth-child(2) p:nth-child(1){ border: 1px solid #E6A23C;color: #E6A23C;}
.articleRanking ul li:nth-child(2) p:nth-child(2) samp{color: #E6A23C;}
.articleRanking ul li:nth-child(3) p:nth-child(1){ border: 1px solid #67C23A;color: #67C23A;}
.articleRanking ul li:nth-child(3) p:nth-child(2) samp{color: #67C23A;}
.articleRanking ul li:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.articleRanking ul li p:nth-child(1){float:left; width: 38px; height: 38px; border: 1px solid #909399; margin-right: 10px; font-size: 30px; font-weight: bold; text-align: center; line-height: 38px; color: #909399;}
.articleRanking ul li p:nth-child(2){float:left;width: 440px; height: 40px;}
.articleRanking ul li p:nth-child(2) span{display: block; width: 90%; background: #0077AA; height: 20px;
background: linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -o-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -ms-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -moz-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -webkit-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
/*background: linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -o-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -ms-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -moz-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -webkit-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);*/
}
.articleRanking ul li p:nth-child(2) samp{ font-size: 16px; text-align: justify; line-height: 20px; color: #909399; font-weight: bold;}
.articleLately ul{}
.articleLately ul li{ height: 40px; padding: 5px 0;}
.articleLately ul li a{}
.articleLately ul li a p{height: 20px; line-height: 20px;}
.articleLately ul li a p:nth-child(1){font-weight: bold; color:#303133;}
.articleLately ul li a p:nth-child(2){ color: #909399;}
.articleLately ul li a p:nth-child(2) samp{ display: inline-flex; float: left; padding: 0 10px 0 0; height: 20px; line-height: 20px;}
.articleLately ul li a p:nth-child(2) samp svg{margin-top: 2px; margin-right: 5px;}
.tb4Time{position: absolute;height: 100px;width: 550px;top: 0;right: 0;}
.slogan{font-size: 20px;text-align: center;}
.slogan b{color: rgb(253, 62, 0);}
.titleIcon{display: flex; justify-content: flex-start; align-items: center;}
.titleIcon svg{width: 2em; height: 2em; margin-left: 0; margin-right: 0.5em;}
.surfaceTitle1{display: flex; justify-content: flex-start; align-items: center;}
.surfaceTitle1 span{margin-right: 10px;}
.surface1{position: relative;}
</style>
<style>
  .toolDiv{width: 500px; height: auto; max-width: 500px; background-color: #c2c4bf52;}
  .toolDiv:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .toolDiv .toolDiv_title{font-size: 28px; text-align: center;display: block; width: 100%; height: 50px; line-height: 50px;}
  .toolDiv ul{width: 450px; height: auto; margin: 0 auto;}
  .toolDiv ul li{width: 25%; height: 40px; line-height: 40px; float: left; text-align: center; display: flex; justify-content: flex-start; align-items: center;}
  .toolDiv ul li samp:nth-child(1){display: block; width: 10px; height: 10px; border-radius: 50px; margin-right: 10px;}
  .toolDiv ul li span:nth-child(2){display: block; width: 50px; height: auto; text-align: justify;}
  .toolDiv ul li span:nth-child(3){}
</style>
