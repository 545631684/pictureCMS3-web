<template>
  <div>
  	<!-- 头部组件 -->
  	<webHead></webHead>
  	<div style="background: #f4f4f4; padding: 20px 0;">
  		<div class="article clearfix">
  			<div class="l">
  				<div style="padding: 30px 30px 16px;">
  					<h1 class="title">{{article.title}}</h1>
  					<p class="time">{{webFormatDate(parseInt(article.registerTimeImg))}}</p>
  					<p class="nav" v-if="nav.num.length === 1"><a :href="nav.num[0].href">{{nav.num[0].name}}</a><i>/</i><a>详情页</a></p>
  					<p class="nav" v-if="nav.num.length === 2"><a :href="nav.num[0].href">{{nav.num[0].name}}</a><i>/</i><a :href="nav.num[1].href">{{nav.num[1].name}}</a><i>/</i><a>{{nav.num[2].name}}</a></p>
  				</div>
  				<div class="describe">
  					<p>描述：{{article.describe}}</p>
  				</div>
  				<div class="content clearfix">
  					<div v-if="article.typeFile === 'img'">
  						<viewer :images="imgs">
  							<ul class="img" v-if="imgs.length !== 0">
  								<li v-for="(item, index) in imgFile" :key="index">
  									<img :src="URLS2 + item.miniImg" alt="" />
  									<el-button class="download" type="primary" icon="el-icon-download" size="mini" @click="singleDownload(item.dataImg.url,item.dataImg.name)">下载</el-button>
  								</li>
  							</ul>
  						</viewer>
  					</div>
  					<div v-if="article.typeFile === 'psd'">
  						<viewer :images="psds">
  							<ul class="psd" v-if="psds.length !== 0">
  								<li v-for="(item, index) in psdFile" :key="index">
  									<img :src="URLS2 + item.Psdview" alt="" />
  									<el-button class="download" type="primary" icon="el-icon-download" size="mini" @click="singleDownload(item.dataPsd.url,item.dataPsd.name)">下载</el-button>
  								</li>
  							</ul>
  						</viewer>
  					</div>
            
            <div v-if="article.typeFile === 'video'">
              <div class="video">
                <div class="body">
                  <video-player  
                  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"></video-player>
                </div>
                <div class="videoListInfo clearfix">
                  <p class="videoListInfoTitle">视频列表</p>
                  <ul class="test test-1">
                    <div class="scrollbar">
                      <li v-for="(item, index) in videoFile" :key="index" :title="item.dataVideo.name" >
                      <p>
                        <span>{{index+1}}</span>
                        <el-button icon="el-icon-download" type="warning" circle size="mini" @click="singleDownload(item.dataVideo.url,item.dataVideo.title)"></el-button>
                      </p>
                      <p @click="videoSwitch(item)">
                        <img :src="URLS2 + item.Videoview" :alt="item.dataVideo.name" />
                        <span class="omit">{{item.dataVideo.name}}</span>
                      </p>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              
              <div class="imgall" v-if="imgFile !== '[]'">
                <p class="imgTitle">补充图</p>
                <viewer :images="imgFile">
                  <dl class="img" v-if="imgFile.length !== 0">
                    <dd v-for="(item, index) in imgFile" :key="index">
                      <img :src="URLS2 + item.miniImg" alt="" />
                      <el-button class="download" type="primary" icon="el-icon-download" size="mini" @click="singleDownload(item.dataImg.url,item.dataImg.title)">下载</el-button>
                    </dd>
                  </dl>
                </viewer>
              </div>
            </div>
            
            
  				</div>
  			</div>
  			<div class="r">
  				<div class="author">
  					<img :src="URLS2 + headPortraitSrc" alt="" />
  					<p>{{nickname}}</p>
  					<p>赛奇设计师</p>
  				</div>
  				<el-collapse v-model="activeNames" @change="handleChange">
  				  <el-collapse-item title="文章信息" name="1">
  				  	<div class="attribute">文章类型：{{article.typeFile}}</div>
  				    <div class="attribute">所属项目：{{getProjectName(article.projectid)}}</div>
  				    <div class="attribute">所属分类：{{getTypesName(article.typeid)}}</div>
  				    <div class="attribute">所属类型：{{getUserMinTypeName(article.detailsid)}}</div>
  				    <div class="attribute">文章标签</div>
  				    <div class="keyword">
  				    	<span v-for="(item, index) in article.keyword" :key="index" :title="item">{{item}}</span>
  				    </div>
  				  </el-collapse-item>
  				  <el-collapse-item title="相关推荐" name="2">
  				    <div class="attribute">
  				    	<a class="omit" v-if="article.xiangguan !== null" v-for="(item, index) in article.xiangguan" :key="index" @click="seeArticle(item.mId, item.typeFile)" :title="item.title">{{item.title}}</a>
                <p v-if="article.xiangguan === null" style="text-align: center; color: #CCCCCC;">没有相关内容</p>
  				    </div>
  				  </el-collapse-item>
  				  <el-collapse-item title="文件下载" name="3" v-if="judgeLogin === '1'">
  				    <div class="attribute">
  	    				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 10px;">全选</el-checkbox>
  	    				<el-button type="primary" icon="el-icon-download" size="mini" style="float: right;margin-right: 10px;" @click="download"></el-button>
  					  	<div style="margin: 15px 0;"></div>
  					  	<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
  					    	<el-checkbox class="omit" v-for="city in cityOptions" :label="city" :key="city" :title="city">{{city}}</el-checkbox>
  					  	</el-checkbox-group>
  					  	<form method="POST" :action="URLS2 + 'w/zipdownload'" id="hiddenForm" ref="hiddenForm" target="_blank" style="display: none;">
  						    <input type="text" id="title" name="title" :value="article.title" />
  						    <input type="text" id="zipfiles" name="zipfiles"  />
  						    <input type="text" id="name" name="name"  />
  						    <input type="text" id="mId" name="mId" :value="article.mid"/>
  						    <input type="text" id="froid" name="froid" />
  						    <input type="text" id="inid" name="inid" :value="article.uId" />
  						</form>
  				    </div>
  				  </el-collapse-item>
  				</el-collapse>
  			</div>
  		</div>
  	</div>
  	
  	<!-- 底部 -->
  	<webFoot></webFoot>
  </div>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import webHead from 'COMMON/webHead/webHead'
import webFoot from 'COMMON/webFoot/webFoot'
export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
      webHead,
      webFoot
    },
    data() {
      return {
        mid: '',
        uId: '',
        title: '',
        typeid: '',
        describe: '',
        registerTime: '',
        imgFile: [],
        psdFile: [],
        videoFile: [],
        imgs:[],
        psds:[],
        videos:[],
        typeFile: '',
        loading: false,
        xiangguan: [],
        article: {},
        nav: {
        	id: '',
        	name: '',
        	tid: '',
        	searchTerms: '',
        	num: []
        },
        URLS2: this.$store.state.common.publicInfo.srcUrl,
        activeNames: ['1','2'],
        checkAll: false,
        checkedCities: [],
        cityOptions: [],
        isIndeterminate: true,
        judgeLogin: this.$store.state.admin.adminInfo.judgeLogin,
        zipfiles: [],
        downloadName: [],
        headPortraitSrc:'',
        nickname:'',
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度 
          autoplay: false, //如果true,浏览器准备好时开始回放。
          lmuted: false, // 默认情况下将会消除任何音频。 
          oop: false, // 导致视频一结束就重新开始。 
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持） 
          language: 'zh-CN', 
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。 
          sources: [{ 
            type: "", 
            src: "" //url地址 
            }], 
          poster: "", //你的封面地址  
          // width: document.documentElement.clientWidth, 
          notSupportedMessage: '不是MP4格式视频无法播放，请下载后自行观看', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: { 
            timeDivider: true, 
            durationDisplay: true, 
            remainingTimeDisplay: false, 
            fullscreenToggle: true //全屏按钮 
            }
        },
      }
    },
    watch: {
    	// 服务器获取数据是异步进行的文章的标题获取有延时，所以在监控变量改变后在赋值给导航显示
    	title: function(newQuestion, oldQuestion) {
    		this.title.length !== 0 ? this.nav.num[this.nav.num.length] = {href: this.URLS2 + this.$route.path, name: this.title} : this.title = this.title
    	},
    	// 给图片查看器赋值
    	imgFile: function(newQuestion, oldQuestion) {
    		let _this = this
    		if (this.imgFile.length !== 0 && this.article.typeFile === "img") {
    			this.imgFile.find(obj => {
    				_this.imgs.push(obj.miniImg)
    				_this.cityOptions.push(obj.dataImg.name)
    			})
    		}
    	},
    	// 给图片查看器赋值
    	psdFile: function(newQuestion, oldQuestion) {
    		let _this = this
    		if (this.psdFile.length !== 0  && this.article.typeFile === "psd") {
    			this.psdFile.find(obj => {
    				_this.psds.push(obj.Psdview)
    				_this.cityOptions.push(obj.dataPsd.name)
    			})
    		}
    	},
      videoFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.videoFile.length !== 0 && this.typeFile === "video") {
      		this.videoFile.find(obj => {
      			_this.videos.push(obj.Videoview)
      			_this.cityOptions.push(obj.dataVideo.name)
      		})
          this.playerOptions.sources[0] = {type: '', src: this.URLS2 + this.videoFile[0].dataVideo.url}
          this.playerOptions.poster = this.URLS2 + this.videoFile[0].Videoview
      	}
      },
    },
    methods: {
      ...mapActions([
        'getWebArticle'
      ]),
      // 视频切换
      videoSwitch (obj) {
      	this.playerOptions.sources[0] = {type: '', src: this.URLS2 + obj.dataVideo.url}
        this.playerOptions.poster = this.URLS2 + obj.Videoview
      },
      // 单个文件下载按钮
      singleDownload (file, title) {
        let _this = this
        if (file.length !== 0 && title.length !== 0) {
          document.getElementById('zipfiles').value = file
          document.getElementById('name').value = title
          document.getElementById('froid').value = this.$store.state.admin.adminInfo.uId
          this.$refs.hiddenForm.submit()
        }
      },
      // 下载按钮
      download () {
        let _this = this
        if (this.article.typeFile === 'img') {
          this.checkedCities.find(strings => {
            this.imgFile.find(obj => {
              if (obj.dataImg.name === strings) {
                this.zipfiles.push(obj.dataImg.url)
                this.downloadName.push(obj.dataImg.name)
              }
            })
          })
        } else if (this.article.typeFile === 'psd') {
          this.checkedCities.find(strings => {
            this.psdFile.find(obj => {
              if (obj.dataPsd.name === strings) {
                this.zipfiles.push(obj.dataPsd.url)
                this.downloadName.push(obj.dataPsd.name)
              }
            })
          })
        } else if (this.article.typeFile === 'video') {
          this.checkedCities.find(strings => {
          	_this.videoFile.find(obj => {
          		if (obj.dataVideo.name === strings) {
          			_this.zipfiles.push(obj.dataVideo.url)
          			_this.downloadName.push(obj.dataVideo.name)
          		}
          	})
          })
          // 判断图片是否为空数组字符串"[]",在不为字符串并且长度大于0
          if (this.imgFile !== '[]' && this.imgFile.length > 0) {
          	this.checkedCities.find(strings => {
          		_this.imgFile.find(obj => {
          			if (obj.dataImg.name === strings) {
          				_this.zipfiles.push(obj.dataImg.url)
          				_this.downloadName.push(obj.dataImg.name)
          			}
          			return obj
          		})
          	})
          }
        }
        if (this.zipfiles.length !== 0 && this.downloadName.length !== 0 && this.article.title.length !== 0) {
          document.getElementById('zipfiles').value = this.zipfiles.join(',')
          document.getElementById('name').value = this.downloadName.join(',')
          document.getElementById('froid').value = this.$store.state.admin.adminInfo.uId
          this.$refs.hiddenForm.submit()
        }
      },
      // 下载全选
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cityOptions : [];
        this.isIndeterminate = false;
      },
      // 下载单选
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cityOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cityOptions.length;
      },
      // 点击跳转文章页
      seeArticle(mid, typeFile) {
        switch (typeFile) {
            case 'img':
              this.$router.push('/web/article/' + mid + '/Index/0/0/')
              this.reload()
              break;
            case 'psd':
              this.$router.push('/web/article/' + mid  + '/Index/0/0/')
              this.reload()
              break;
            case 'video':
              this.$router.push('/web/article/' + mid  + '/Index/0/0/')
              this.reload()
              break;
          }
      },
      // 手风琴模块点击事件
      handleChange(val) {
//		        console.log(val);
        },
      // 时间戳转换
      webFormatDate (time) {
        if (time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '暂无'
        }
      },
      // 面包屑导航赋值
      navfunction () {
        if (this.nav.tid === '0' && this.nav.searchTerms === '0') {
          this.nav.name === 'Index' ? this.nav.num.push({href: this.URLS2 + 'web', name: '首页'}) : console.log()
          this.nav.name === 'backstage' ? this.nav.num.push({href: this.URLS2 + 'backstage/home', name: '后台'}) : console.log()
        }
      },
      // 获取数据
      getPost () {
        let _this = this
        // 获取文章数据
        this.getWebArticle({mId: this.$route.params.id})
          .then((response) => {
            if (response.code === 200) {
              _this.article = response.data
              _this.imgFile = response.data.img !== '[]' ? response.data.img : []
              _this.psdFile = response.data.psd !== '[]' ? response.data.psd : []
              _this.videoFile = response.data.video !== '[]' ? response.data.video : []
              _this.headPortraitSrc = response.data.user.headPortraitSrc
              _this.nickname = response.data.user.nickname
            }
          })
          .catch(function (error) {})
        // 面包屑导航参数
        this.nav.id = this.$route.params.id
        this.nav.name = this.$route.params.name
        this.nav.tid = this.$route.params.tid
        this.nav.searchTerms = this.$route.params.searchTerms
        // 导航赋值
        this.navfunction()
      },
      // 获取当前分类的上级项目名称
      getProjectName(pid) {
      	return this.$store.getters.getUserProjectsName(pid) === undefined ? "":this.$store.getters.getUserProjectsName(pid).xname
      },
      // 获取当前分类的上级分类名称
      getTypesName(tid) {
      	return this.$store.getters.getUserTypesName(tid) === undefined ? "":this.$store.getters.getUserTypesName(tid).lname
      },
      getUserMinTypeName(did){
        return this.$store.getters.getUserMinTypeName(did) === undefined ? "":this.$store.getters.getUserMinTypeName(did).dname
      }
    },
    created() {
      // 获取数据
      this.getPost()
      // 获取本地存储用户信息
      this.state = this.$store.state.admin.adminInfo
    }
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.article{width: 1200px; margin: 0 auto; height: auto;}
.article .l{border-radius: 10px; background: #FFFFFF; width: 910px; float: left; margin-right: 10px; padding: 10px;}
.article .l .title{color: #333333;font-size: 24px;font-weight: normal;display: inline-block;}
.article .l .time{padding-top: 15px;font-size: 18px;color: #bbbbbb;}
.article .l .nav{padding-top: 15px;    line-height: 30px;}
.article .l .nav,.article .l .nav a{font-size: 18px;color: #bbbbbb;display: inline-block;vertical-align: middle;*vertical-align: auto;zoom: 1;*display: inline;}
.article .l .nav i{color: #dddddd;margin: 0 30px;font-style:normal;}
.describe{padding: 28px 0;line-height: 30px;color: #666666;background: #f8f8f8;}
.describe p{width: 800px;font-size: 18px;margin: 0 auto;word-wrap: break-word;}
.describe{padding: 28px 0;}
.content{margin-top: 20px;}
.img{}
.img li, .img dd{width: 32%;float: left;padding: 5px;}
.img li img, .img dd img{max-width: 100%;}
.psd{}
.psd li{width: 75%;padding: 30px 10px; margin: 0 auto;}
.psd li img{max-width: 100%;}
.img li,.psd li, .img dd{position: relative; overflow: hidden;}
.img li .download,.psd li .download, .img dd .download{ position: absolute; left: 10px; top: -28px;}
.img li:hover .download,.psd li:hover .download , .img dd:hover .download{top: 10px;}
.article .r{border-radius: 10px; background: #FFFFFF; width: 260px; float: left;}
.article .r .author{ height: 140px; padding: 30px 0 20px;}
.article .r .author img{ width: 80px; height: 80px; margin:0 auto; display: block; border-radius: 50px; margin-bottom: 16px;}
.article .r .author p:nth-child(2){ text-align: center; font-size: 16px;color: #333;font-weight: 600;vertical-align: middle;margin-right: 4px;}
.article .r .author p:nth-child(3){text-align: center; font-size: 12px;color: #bbb;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
.attribute{font-size: 14px;color: #666666;background-repeat: no-repeat;background-position: left;padding: 0 10px;}
.attribute a{cursor: pointer; display: block; padding: 5px; text-indent: 1em;}
.attribute a:hover{color: #B10202;}
.keyword{ padding-top: 10px;}
.keyword span{max-width: 60px;height: 24px;font-size: 12px;color: #999;line-height: 24px;padding: 0 14px;margin: 0 5px 10px 0;background: #eee;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;display: inline-block;vertical-align: middle;zoom: 1;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;cursor: pointer;}
.el-checkbox{padding: 5px 10px;}
.el-checkbox+.el-checkbox{margin: 0;}
.el-collapse-item .el-collapse-item__header{ text-indent: 1em !important;}
.video{}
	.video .body{padding:0 30px; }
	.video .videoListInfo{margin: 0 30px; background: #333333;}
	.video .videoListInfo .videoListInfoTitle{color: #FFFFFF; font-size: 20px; padding: 10px; background: #252121;}
	.video .videoListInfo ul{}
	.video .videoListInfo ul div li{width: 186px; height: 125px; float: left;margin: 10px;cursor: pointer;}
	.video .videoListInfo ul div li p:nth-child(1){width: 50px; float: left;height: 125px; position: relative; overflow: hidden;}
	.video .videoListInfo ul div li p:nth-child(1) span{display: block; line-height: 125px; text-align: center; color: #FFFFFF; font-size: 18px;}
	.video .videoListInfo ul div li p:nth-child(1) span:nth-child(1){}
	.video .videoListInfo ul div li p:nth-child(1) button:nth-child(2){position: absolute; left: 12px; bottom: -28px; display: block; width: 28px; height: 28px;}
	.video .videoListInfo ul div li:hover p:nth-child(1) button:nth-child(2){bottom: 5px;}
	.video .videoListInfo ul div li p:nth-child(2){width: 136px; float: left;height: 125px;}
	.video .videoListInfo ul div li p:nth-child(2) img{width: 140px; display: block;}
	.video .videoListInfo ul div li p:nth-child(2) span{padding: 5px 0; font-size: 16px; color: #FFFFFF; text-align: center;display: block;}
	.video .videoListInfo ul div li:hover p:nth-child(1) span{ color: #ff5e00;}
	.video .videoListInfo ul div li:hover p:nth-child(2) span{ color: #ff5e00;}
	.test{width: 840px;height: 135px;overflow: auto;float: left;margin: 5px;border: none;}
	.scrollbar{width: auto;height: auto;margin: 0 auto;}
	.test-1::-webkit-scrollbar {/*滚动条整体样式*/width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/height: 1px;}
	.test-1::-webkit-scrollbar-thumb {/*滚动条里面小方块*/border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #535353;}
	.test-1::-webkit-scrollbar-track {/*滚动条里面轨道*/-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #EDEDED;}
  .imgall .imgTitle{color: #333333;font-size: 24px;font-weight: normal;display: inline-block;    padding: 55px 30px 20px;}
</style>
