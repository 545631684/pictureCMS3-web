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
          <div>

          </div>
          <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
  				<div class="describe">
            <p>描述：</p>
            <div class="markdown-body" v-html="article.describe"></div>
          </div>
  				<div class="content clearfix">

  					<div class="clearfix" v-if="article.typeFile.indexOf('img') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">img:</h3>
  						<viewer :images="imgFile">
  							<ul class="img" v-if="imgFile.length !== 0">
  								<li v-for="(item, index) in imgFile" :key="index">
  									<img :src="URLS2 + item.miniImg" alt="" />
  									<el-button class="download" type="primary" icon="el-icon-download" size="mini" @click="singleDownload(item.dataImg.url,item.dataImg.name)">下载</el-button>
  								</li>
  							</ul>
  						</viewer>
  					</div>

            <div class="clearfix" v-if="article.typeFile.indexOf('psd') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">psd:</h3>
              <viewer :images="psds">
              	<ul class="img" v-if="psds.length !== 0">
              		<li v-for="(item, index) in psdFile" :key="index">
              			<img :src="URLS2 + item.Psdview" alt="" />
              			<el-button class="download" type="primary" icon="el-icon-download" size="mini" @click="singleDownload(item.dataPsd.url,item.dataPsd.name)">下载</el-button>
              		</li>
              	</ul>
              </viewer>
            </div>

            <div class="clearfix" v-if="article.typeFile.indexOf('video') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">video:</h3>
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
            </div>


            <div class="clearfix" v-if="article.typeFile.indexOf('pdf') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">pdf:</h3>
              <div class="fileList">
                <p v-for="(item, index) in pdfFile" :key="index"  @click="pdfShow(item.file.url)" :title="item.file.name">
                  <img :src="URLS2 + 'image/pdf.jpg'" alt="" style="display: block;height: 80px;width: 80px;"/>
                  <span class="omit">{{item.file.name}}</span>
                </p>
              </div>
              <seePdf :src="pdfShowSrc"></seePdf>
            </div>

            <div v-if="article.typeFile.indexOf('word') !== -1 || article.typeFile.indexOf('excel') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">word/excel:</h3>
              <div class="fileList" v-if="article.typeFile.indexOf('word') !== -1">
                <p v-for="(item, index) in wordFile" :key="index"  @click="fileShow(item.file.url)" :title="item.file.name">
                  <img :src="URLS2 + 'image/word.jpg'" alt="" style="display: block;height: 80px;width: 80px;"/>
                  <span class="omit">{{item.file.name}}</span>
                </p>
              </div>
              <div class="fileList" v-if="article.typeFile.indexOf('excel') !== -1">
                <p v-for="(item, index) in excelFile" :key="index" @click="fileShow(item.file.url)" :title="item.file.name">
                  <img :src="URLS2 + 'image/excel.jpg'" alt="" style="display: block;height: 80px;width: 80px;"/>
                  <span class="omit">{{item.file.name}}</span>
                </p>
              </div>
              <iframe class="test-1" :src="fileShowSrc" frameborder="0" height="800px" scrolling="auto" width="100%"></iframe>
            </div>

            <div class="clearfix" v-if="article.typeFile.indexOf('ai') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">ai:</h3>
              <div class="fileList" v-if="article.typeFile.indexOf('ai') !== -1">
                <p v-for="(item, index) in aiFile" :key="index"   :title="item.dataAi.name">
                  <img :src="URLS2 + 'image/ai.jpg'" alt="" style="display: block;height: 80px;width: 80px;"/>
                  <span class="omit">{{item.dataAi.name}}</span>
                </p>
              </div>
            </div>

            <div class="clearfix" v-if="article.typeFile.indexOf('压缩包') !== -1">
              <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;margin: 55px 0 20px;">压缩包:</h3>
              <div class="fileList" v-if="article.typeFile.indexOf('压缩包') !== -1">
                <p v-for="(item, index) in engineeringFile" :key="index"   :title="item.file.name">
                  <img :src="URLS2 + 'image/ysb.jpg'" alt="" style="display: block;height: 80px;width: 80px;"/>
                  <span class="omit">{{item.file.name}}</span>
                </p>
              </div>
            </div>

  				</div>
  			</div>
  			<div class="r">
  				<div class="author">
  					<img :src="URLS2 + headPortraitSrc" alt="" />
  					<p>{{nickname}}</p>
  					<p>赛奇{{permissions.title}}</p>
  				</div>
  				<el-collapse v-model="activeNames" @change="handleChange">
  				  <el-collapse-item name="1">
              <template slot="title">
                <p style="padding: 0 10px;">文章信息</p>
              </template>
  				  	<div class="attribute2">
                <samp style="width: 75px;">文章类型：</samp>
                <span>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('img') !== -1">
                    <use xlink:href="#icon-picture"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('psd') !== -1">
                    <use xlink:href="#icon-web-psd"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('video') !== -1">
                    <use xlink:href="#icon-shipinbofangyingpian"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('ai') !== -1">
                    <use xlink:href="#icon-Ai"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('pdf') !== -1">
                    <use xlink:href="#icon-Pdf"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('word') !== -1">
                    <use xlink:href="#icon-word1"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('excel') !== -1">
                    <use xlink:href="#icon-excel1"></use>
                  </svg>
                  <svg class="icon svg-icon" aria-hidden="true" v-if="article.typeFile.indexOf('压缩包') !== -1">
                    <use xlink:href="#icon-gongcheng-"></use>
                  </svg>
                </span>
              </div>
              <div class="attribute2">
                <samp style="width: 75px;">所属项目：</samp>
                <span>{{getProjectName(article.projectid)}}</span>
              </div>
              <div class="attribute2">
                <samp style="width: 75px;">所属分类：</samp>
                <span>{{getTypesName(article.typeid)}}</span>
              </div>
              <div class="attribute2">
                <samp style="width: 75px;">所属类型：</samp>
                <span>{{getUserMinTypeName(article.detailsid)}}</span>
              </div>
              <div class="attribute2">
                <div style="width: 75px;">文章标签：</div>
                <div class="keyword">
                	<samp v-for="(item, index) in article.keyword" :key="index" :title="item">{{item}}</samp>
                </div>
              </div>
  				  </el-collapse-item>
  				  <el-collapse-item name="2" v-if="judgeLogin === '1'">
              <template slot="title">
                <p style="padding: 0 10px;">文件下载</p>
              </template>
  				    <div class="attribute">
  	    				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 0px;">全选</el-checkbox>
  	    				<el-button type="primary" icon="el-icon-download" size="mini" style="float: right;margin-right: 10px;" @click="download"></el-button>
  					  	<div style="margin: 15px 0;"></div>
  					  	<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
  					    	<el-checkbox class="omit" v-for="city in cityOptions" :label="city" :key="city" :title="city">{{city}}</el-checkbox>
  					  	</el-checkbox-group>
  					  	<form method="POST" :action="URLS2 + 'w/zipdownload'" id="hiddenForm" ref="hiddenForm" target="_blank" style="display: none;">
  						    <input type="text" id="title" name="title" :value="article.title" />
  						    <input type="text" id="zipfiles" name="zipfiles"  />
  						    <input type="text" id="name" name="name"  />
  						    <input type="text" id="mId" name="mId" :value="article.mId"/>
  						    <input type="text" id="froid" name="froid" />
  						    <input type="text" id="inid" name="inid" :value="article.uId" />
  						</form>
  				    </div>
  				  </el-collapse-item>
  				  <el-collapse-item name="3">
              <template slot="title">
                <p style="padding: 0 10px;">相关推荐</p>
              </template>
  				    <div class="attribute">
  				    	<a class="omit" v-if="article.xiangguan !== null" v-for="(item, index) in article.xiangguan" :key="index" @click="seeArticle(item.mId, item.typeFile)" :title="item.title">{{item.title}}</a>
                <p v-if="article.xiangguan === null" style="text-align: center; color: #CCCCCC;">没有相关内容</p>
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
import seePdf from 'COMMON/seePdf/seePdf'
export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
      webHead,
      webFoot,
      seePdf
    },
    data() {
      return {
        fileShowSrc:'',
        pdfShowSrc:'',
        mid: '',
        uId: '',
        title: '',
        typeid: '',
        describe: '',
        registerTime: '',
        imgFile: [],
        psdFile: [],
        videoFile: [],
        aiFile: [],
        pdfFile: [],
        wordFile: [],
        excelFile: [],
        engineeringFile: [],
        imgs:[],
        psds:[],
        videos:[],
        ais:[],
        pdfs:[],
        words:[],
        excels:[],
        engineerings:[],
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
        userRecovery: this.$store.state.common.publicInfo.userRecovery,
        permissions:{},
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
    		if (this.imgFile.length !== 0 && this.article.typeFile.indexOf('img') !== -1) {
    			this.imgFile.find(obj => {
    				_this.imgs.push(obj.miniImg)
    				_this.cityOptions.push(obj.dataImg.name)
    			})
    		}
    	},
    	// 给图片查看器赋值
    	psdFile: function(newQuestion, oldQuestion) {
    		let _this = this
    		if (this.psdFile.length !== 0  && this.article.typeFile.indexOf('psd') !== -1) {
    			this.psdFile.find(obj => {
    				_this.psds.push(obj.Psdview)
    				_this.cityOptions.push(obj.dataPsd.name)
    			})
    		}
    	},
      videoFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.videoFile.length !== 0 && this.article.typeFile.indexOf('video') !== -1) {
      		this.videoFile.find(obj => {
      			_this.videos.push(obj.Videoview)
      			_this.cityOptions.push(obj.dataVideo.name)
      		})
          this.playerOptions.sources[0] = {type: '', src: this.URLS2 + this.videoFile[0].dataVideo.url}
          this.playerOptions.poster = this.URLS2 + this.videoFile[0].Videoview
      	}
      },
      aiFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.aiFile.length !== 0 && this.article.typeFile.indexOf('ai') !== -1) {
      		this.aiFile.find(obj => {
      			_this.ais.push(obj.dataAi)
      			_this.cityOptions.push(obj.dataAi.name)
      		})
      	}
      },
      engineeringFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.engineeringFile.length !== 0 && this.article.typeFile.indexOf('压缩包') !== -1) {
      		this.engineeringFile.find(obj => {
      			_this.engineerings.push(obj.file)
      			_this.cityOptions.push(obj.file.name)
      		})
      	}
      },
      pdfFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.pdfFile.length !== 0 && this.article.typeFile.indexOf('pdf') !== -1) {
      		this.pdfFile.find(obj => {
      			_this.engineerings.push(obj.file)
      			_this.cityOptions.push(obj.file.name)
      		})
      	}
      },
      wordFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.wordFile.length !== 0 && this.article.typeFile.indexOf('word') !== -1) {
      		this.wordFile.find(obj => {
      			_this.engineerings.push(obj.file)
      			_this.cityOptions.push(obj.file.name)
      		})
          this.fileShow(this.wordFile[0].file.url)
      	}
      },
      excelFile: function (newQuestion, oldQuestion) {
        let _this = this
      	if (this.excelFile.length !== 0 && this.article.typeFile.indexOf('excel') !== -1) {
      		this.excelFile.find(obj => {
      			_this.engineerings.push(obj.file)
      			_this.cityOptions.push(obj.file.name)
      		})
          this.fileShow(this.wordFile[0].file.url)
      	}
      },
    },
    methods: {
      ...mapActions([
        'getWebArticle'
      ]),
      // 文档文件预览
      fileShow(src){
        // window.open('http://192.168.0.130:8012/' + 'onlinePreview?url='+encodeURIComponent(this.URLS2 + src));
        this.fileShowSrc = 'http://192.168.0.130:8012/' + 'onlinePreview?url='+encodeURIComponent(this.URLS2 + src)
      },
      // pdf文件预览
      pdfShow(src){
        this.pdfShowSrc = this.URLS2 + src

      },
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
        if (this.article.typeFile.indexOf('img') !== -1) {
          this.checkedCities.find(strings => {
            this.imgFile.find(obj => {
              if (obj.dataImg.name === strings) {
                this.zipfiles.push(obj.dataImg.url)
                this.downloadName.push(obj.dataImg.name)
              }
            })
          })
        }
        if (this.article.typeFile.indexOf('psd') !== -1) {
          this.checkedCities.find(strings => {
            this.psdFile.find(obj => {
              if (obj.dataPsd.name === strings) {
                this.zipfiles.push(obj.dataPsd.url)
                this.downloadName.push(obj.dataPsd.name)
              }
            })
          })
        }
        if (this.article.typeFile.indexOf('video') !== -1) {
          this.checkedCities.find(strings => {
          	_this.videoFile.find(obj => {
          		if (obj.dataVideo.name === strings) {
          			_this.zipfiles.push(obj.dataVideo.url)
          			_this.downloadName.push(obj.dataVideo.name)
          		}
          	})
          })
        }
        if(this.article.typeFile.indexOf('ai') !== -1){
          this.checkedCities.find(strings => {
          	_this.aiFile.find(obj => {
          		if (obj.dataAi.name === strings) {
          			_this.zipfiles.push(obj.dataAi.url)
          			_this.downloadName.push(obj.dataAi.name)
          		}
          	})
          })
        }
        if(this.article.typeFile.indexOf('压缩包') !== -1){
          this.checkedCities.find(strings => {
          	_this.engineeringFile.find(obj => {
          		if (obj.file.name === strings) {
          			_this.zipfiles.push(obj.file.url)
          			_this.downloadName.push(obj.file.name)
          		}
          	})
          })
        }
        if (this.article.typeFile.indexOf('pdf') !== -1) {
          this.checkedCities.find(strings => {
            this.pdfFile.find(obj => {
              if (obj.file.name === strings) {
                this.zipfiles.push(obj.file.url)
                this.downloadName.push(obj.file.name)
              }
            })
          })
        }
        if (this.article.typeFile.indexOf('word') !== -1) {
          this.checkedCities.find(strings => {
            this.wordFile.find(obj => {
              if (obj.file.name === strings) {
                this.zipfiles.push(obj.file.url)
                this.downloadName.push(obj.file.name)
              }
            })
          })
        }
        if (this.article.typeFile.indexOf('excel') !== -1) {
          this.checkedCities.find(strings => {
            this.excelFile.find(obj => {
              if (obj.file.name === strings) {
                this.zipfiles.push(obj.file.url)
                this.downloadName.push(obj.file.name)
              }
            })
          })
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
        this.$router.push('/web/article/' + mid + '/Index/0/0/')
        this.reload()
        // switch (typeFile) {
        //     case 'img':
        //       this.$router.push('/web/article/' + mid + '/Index/0/0/')
        //       this.reload()
        //       break;
        //     case 'psd':
        //       this.$router.push('/web/article/' + mid  + '/Index/0/0/')
        //       this.reload()
        //       break;
        //     case 'video':
        //       this.$router.push('/web/article/' + mid  + '/Index/0/0/')
        //       this.reload()
        //       break;
        //   }
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
          this.nav.name === 'Index' ? this.nav.num.push({href: this.URLS2 + '/#/web', name: '首页'}) : console.log()
          this.nav.name === 'backstage' ? this.nav.num.push({href: this.URLS2 + '/#/backstage/home', name: '后台'}) : console.log()
        }
      },
      // 获取数据
      getPost () {
        let _this = this
        // 获取文章数据
        this.getWebArticle({mId: this.$route.params.id, uId: this.$store.state.admin.adminInfo.uId})
          .then((response) => {
            if (response.code === 200) {
              _this.article = response.data
              _this.imgFile = response.data.img.length !== 0 ? response.data.img : []
              _this.psdFile = response.data.psd.length !== 0 ? response.data.psd : []
              _this.videoFile = response.data.video.length !== 0 ? response.data.video : [],
              _this.aiFile = response.data.ai.length !== 0 ? response.data.ai : [],
              _this.pdfFile = response.data.pdf.length !== 0 ? response.data.pdf : [],
              _this.wordFile = response.data.word.length !== 0 ? response.data.word : [],
              _this.excelFile = response.data.excel.length !== 0 ? response.data.excel : [],
              _this.engineeringFile = response.data.engineering.length !== 0 ? response.data.engineering : [],
              _this.headPortraitSrc = response.data.user.headPortraitSrc
              _this.nickname = response.data.user.nickname
              _this.permissions = _this.userRecovery.find(o=>{
                return o.id === response.data.user.permissions
              })
              console.log(typeof _this.article.describe,'：类型')
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
.icon {width: 25px;height: 25px;vertical-align: -0.15em;fill: currentColor;overflow: hidden;    margin-right: 5px;}
.article{width: 1200px; margin: 0 auto; height: auto;}
.article .l{border-radius: 10px; background: #FFFFFF; width: 910px; float: left; margin-right: 10px; padding: 10px 10px 30px;}
.article .l .title{color: #333333;font-size: 24px;font-weight: normal;display: inline-block;}
.article .l .time{padding-top: 15px;font-size: 18px;color: #bbbbbb;}
.article .l .nav{padding-top: 15px;    line-height: 30px;}
.article .l .nav,.article .l .nav a{font-size: 18px;color: #bbbbbb;display: inline-block;vertical-align: middle;*vertical-align: auto;zoom: 1;*display: inline;}
.article .l .nav i{color: #dddddd;margin: 0 30px;font-style:normal;}
.describe{padding: 15px;line-height: 30px;color: #666666;background: #f8f8f8;}
.describe p{width: auto;font-size: 18px;margin: 0 auto;word-wrap: break-word;}
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
.attribute{font-size: 14px;color: #666666;background-repeat: no-repeat;background-position: left;padding: 0 10px; }
.attribute a{cursor: pointer; display: block; padding: 5px; text-indent: 1em;}
.attribute a:hover{color: #B10202;}
.attribute2{font-size: 14px;color: #666666;background-repeat: no-repeat;background-position: left;padding: 0 10px; display: flex; justify-content: flex-start; align-items: center;}
.attribute2 a{cursor: pointer; display: block; padding: 5px; text-indent: 1em;}
.attribute2 a:hover{color: #B10202;}
.attribute2 span{flex-wrap: wrap;    flex: 1;}
.keyword{ padding-top: 10px; flex-wrap: wrap;}
.keyword samp{max-width: 60px;height: 24px;font-size: 12px;color: #999;line-height: 24px;padding: 0 14px;margin: 0 5px 10px 0;background: #eee;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;display: inline-block;vertical-align: middle;zoom: 1;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;cursor: pointer;}
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
iframe::-webkit-scrollbar {/*滚动条整体样式*/width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/height: 1px;}
iframe::-webkit-scrollbar-thumb {/*滚动条里面小方块*/border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);background: #535353;}
iframe::-webkit-scrollbar-track {/*滚动条里面轨道*/-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #EDEDED;}
.imgall .imgTitle{color: #333333;font-size: 24px;font-weight: normal;display: inline-block;    padding: 55px 30px 20px;}
.fileList{display: flex; justify-content: flex-start; align-items: center;    padding: 0 0 30px; flex-wrap: wrap;}
.fileList p{width: 100px; height: auto; border: 1px solid #bbb; padding: 10px;cursor: pointer; margin-right: 20px;}
.fileList p:hover{border: 1px solid #B10202;}
.fileList p:hover span{color: #B10202;}
.fileList p img{margin: auto;}
.fileList p span{text-align: center; width: 100px; display: block;}
</style>
