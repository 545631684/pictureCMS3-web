<template>
  <el-container style="margin: 50px 0px;" v-loading="loading2">
    <el-button plain @click="open1" style="display:none;"> 不会自动关闭 </el-button>
    <el-button plain @click="open2" style="display:none;"> 不会自动关闭 </el-button>
  	<el-footer>
  		<div class="title">
  			<samp>标题：</samp>
  			<el-input placeholder="请输入标题" v-model="article.title" clearable v-on:blur="titleRepeat" style="width: 455px !important;"></el-input>
  			<span class="true" v-if="titleCf && titleDiv"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dui"></use></svg>没有重复，可正常使用</span>
  			<span class="fales" v-if="!titleCf && titleDiv"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-cuo"></use></svg>标题重复，请重新填写</span>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<div class="title">
  			<samp>分类：</samp>
  			<el-select v-model="projectImg" placeholder="请选择项目" filterable clearable style="width:200px; color: #409eff;">
  				<el-option v-for="item in projects" :key="item.pid" :label="item.xname" :value="item.xname" v-if="item.state === '1'">
  				</el-option>
  			</el-select>
  			<el-select v-model="typeImg" placeholder="请选择类型" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
  				<el-option v-for="item in types" :key="item.tid" :label="item.lname" :value="item.lname" v-if="item.state === '1'">
  				</el-option>
  			</el-select>
  			<el-select v-model="minTypeImg" placeholder="请选择分类" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
  				<el-option v-for="item in minTypes2" :key="item.did" :label="item.dname" :value="item.dname" v-if="item.state === '1'">
  				</el-option>
  			</el-select>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<labelComponent :dynamicTags2="dynamicTags" @setDynamicTags="setDynamicTags"></labelComponent>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<div class="title"><samp>描述：</samp>
  			<wangeditor :describe="article.describe" :type="'up'" @catchData="catchData"></wangeditor>
  		</div>
  	</el-footer>
    <el-footer style="display: flex; justify-content: flex-end;min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title">
        <samp>上传文件类型设置：</samp>
        <div>
          <el-button v-popover:popover1 icon="el-icon-folder-add" type="primary">添加文件类型</el-button>
          <el-popover
            ref="popover1"
            :open-delay="0"
            :visible-arrow="true"
            placement="right"
            width="400"
            trigger="hover">
            <div class="fileType">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
              <el-alert
                title="已添加的上传文件类型如果有文件上传取消后则上传文件也一并删除,请谨慎操作"
                type="warning"
                show-icon>
              </el-alert>
            </div>
          </el-popover>
        </div>
      </div>
    </el-footer>
  	<el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('img') !== -1">
  		<mkImg :articleImg="article.img" @imgData="imgData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkImg>
  	</el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('psd') !== -1">
    	<mkPsd :articlePsd="article.psd" @psdData="psdData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkPsd>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('ai') !== -1">
    	<mkAi :articleAi="article.ai" @aiData="aiData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkAi>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('video') !== -1">
    	<mkVideo :articleVideo="article.video" @videoData="videoData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkVideo>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('pdf') !== -1">
    	<mkPdf :articlePdf="article.pdf" @pdfData="pdfData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkPdf>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('word') !== -1">
    	<mkWord :articleWord="article.word" @wordData="wordData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkWord>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('excel') !== -1">
    	<mkExcel :articleExcel="article.excel" @excelData="excelData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkExcel>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('压缩包') !== -1">
    	<mkEngineering :articleEngineering="article.engineering" @engineeringData="engineeringData" @deleteFileType="deleteFileType" @uploadFile="uploadFile"></mkEngineering>
    </el-footer>
  	<el-row class="buttonImg">
  		<el-button type="primary" v-on:click.stop="submitImg" :loading="loading" :disabled="uploadFilesJudge.expect === uploadFilesJudge.actual ? false : true">提交上传</el-button>
      <el-button v-on:click.stop="jumpUrl">返回列表页</el-button>
  	</el-row>
  </el-container>
</template>

<script>
  import labelComponent from 'COMMON/labelComponent/labelComponent'
  import wangeditor from 'COMMON/wangeditor/wangeditor'
  import mkImg from 'VIEWS/admin/articleUpdate/imgUpdate'
  import mkPsd from 'VIEWS/admin/articleUpdate/psdUpdate'
  import mkVideo from 'VIEWS/admin/articleUpdate/videoUpdate'
  import mkEngineering from 'VIEWS/admin/articleUpdate/engineeringUpdate'
  import mkPdf from 'VIEWS/admin/articleUpdate/pdfUpdate'
  import mkAi from 'VIEWS/admin/articleUpdate/aiUpdate'
  import mkWord from 'VIEWS/admin/articleUpdate/wordUpdate'
  import mkExcel from 'VIEWS/admin/articleUpdate/excelUpdate'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesID, getMinTypesName } from 'UTIL/publicAPI'
  const cityOptions = ['img', 'psd', 'video', 'ai', 'pdf', '压缩包', 'word','excel']
  export default {
    inject: ['reload'],
    name: 'articleUpdate',
    components: {
      labelComponent,
      wangeditor,
      mkImg,
      mkPsd,
      mkVideo,
      mkEngineering,
      mkPdf,
      mkAi,
      mkWord,
      mkExcel,
    },
    data() {
      return {
        loading: false,
        loading2: true,
        title: '',
        titleCf: false,
        titleDiv: false,
        describe: '',
        userInfo: this.$store.state.admin.adminInfo,
        projects: this.$store.state.common.publicInfo.projects,
        types: this.$store.state.common.publicInfo.types,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
        typeImg: '',
        projectImg: '',
        minTypeImg: '',
        release: false,
        imgCrss:[],
        psd:[],
        video:[],
        pdf:[],
        ai:[],
        excel:[],
        word:[],
        engineering:[],
        uploadFiles: [],
        deleteFiles: [],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        marginLeft: {
        	'margin-left': '0px'
        },
        uploadFilesJudge: {expect: 0, actual: 0},
        upState: false,
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        article: {
        	HeadPortraitSrc: '',
        	Password: '',
        	Verification: '',
        	click: '',
        	describe: '',
        	endTime: '',
        	endTimeImg: '',
        	img: [],
        	lname: '',
        	mId: '',
        	nickname: '',
        	permissions: '',
        	pid: '',
        	projectid: '',
        	psd: {
        		psdFile: []
        	},
        	registerTime: '',
        	registerTimeImg: '',
        	sex: '',
        	state: '',
        	tid: '',
        	title: '',
        	typeid: '',
        	uId: '',
        	userName: '',
        	video: {
        		videoFile: [],
        		videoImg: {
        			size: '',
        			name: '',
        			url: '',
        			type: '',
        			File: {}
        		}
        	},
          article2: {},
        	xname: '',
        	did: '',
        	dname: '',
          popup:{}
        },
      }
    },
    watch: {
      // 判断点选添加的文件类型，对关闭的文件类型里有上传做删除操作
      checkedCities: function(newQuestion, oldQuestion){
        let _this = this, num = []
        if(this.checkedCities.length === 0){
          // 检查所有文件类型已上传的数据杀出
          cityOptions.find(o=>{
            _this.delFileType(o)
          })
        } else {
          cityOptions.find(o=>{
            _this.checkedCities.indexOf(o) === -1 ? num.push(o) : o = o
          })
          num.find(o=>{
            _this.delFileType(o)
          })
        }
      },
    	// 填写标签时对齐样式的修改
    	dynamicTags: function(newQuestion, oldQuestion) {
    		this.dynamicTags.length !== 0 ? this.marginLeft = {'margin-left': '10px'} : this.marginLeft = {'margin-left': '0px'}
    	},
    	// 分类值的变更，有值是联动设置小分类可选值都是当前分类下的，如果没有清空小分类选中值并把下拉可选小分类
    	typeImg: function(newQuestion, oldQuestion) {
    		this.minTypes2 = []
    		let _this = this
    		let minTypeImgzj = false
    		let tid = this.typeImg.length !== 0 ? this.$store.getters.getUserTypesId(this.typeImg).tid : ''
    		if(this.typeImg.length !== 0) {
    			this.minTypes.find(obj => {
    				obj.tbid === tid ? _this.minTypes2[_this.minTypes2.length] = obj : console.log()
    			})
    			this.minTypes2.find(obj => {
    				obj.dname === _this.minTypeImg ? minTypeImgzj = true : console.log()
    			})
    			this.typeImg.length !== 0 && !minTypeImgzj ? this.minTypeImg = '' : this.minTypeImg = this.minTypeImg
    		} else {
    			this.minTypeImg = ''
    			this.minTypes2 = this.minTypes
    		}
    	},
    	// 小分类值的变更，有值的情况下获取小分类id联动填选它的上级分类，如果没有值而类型有值则只显示该类型的所有小分类，类型没有值则显示全部小分类
    	minTypeImg: function(newQuestion, oldQuestion) {
    		this.minTypes2 = []
    		let _this = this
    		let tid = this.typeImg.length !== 0 ? this.$store.getters.getUserTypesId(this.typeImg).tid : ''
    		if(this.minTypeImg.length !== 0) {
    			this.minTypes.find(obj => {
    				_this.minTypeImg === obj.dname ? _this.typeImg = _this.$store.getters.getUserTypesName(obj.tbid).lname : _this.typeImg = _this.typeImg
    				})
    			this.minTypes.find(obj => {
    				obj.tbid === tid ? _this.minTypes2[_this.minTypes2.length] = obj : console.log()
    			})
    		} else if(this.minTypeImg.length === 0) {
    			if(this.typeImg.length !== 0) {
    				this.minTypes.find(obj => {
    					obj.tbid === tid ? _this.minTypes2[_this.minTypes2.length] = obj : console.log()
    				})
    			} else {
    				this.minTypes2 = this.minTypes
    			}
    		}
    	},
    	// 小分类的值变动后，清空小类型input的值
    	minTypes2: function(newQuestion, oldQuestion) {
    	},
      // 屏蔽设置
      projectImg:function (newQuestion, oldQuestion) {
        let _this = this, num = []
      	if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== "2"){
          this.userInfo.shieldInfo.find((o,index)=>{
            if(o.xname == _this.projectImg && o.state == '0'){
              o.type.find((e,indexe)=>{
                if(e.state == '1'){
                  _this.types.find((x,indexx)=>{
                    if(e.tid == x.tid){
                      x.state = '0'
                      _this.$set(_this.types,indexx,x)
                      _this.minTypes.find((s,indexs)=>{
                        s.tbid == x.tid ? s.state = '0' : s = s,
                        _this.$set(_this.minTypes,indexs,s)
                      })
                    }
                  })
                }
              })
            } else {
              _this.types.find((x,indexx)=>{
                x.state = '1'
                _this.$set(_this.types,indexx,x)
                _this.minTypes.find((s,indexs)=>{
                  s.tbid == x.tid ? s.state = '1' : s = s,
                  _this.$set(_this.minTypes,indexs,s)
                })
              })
            }
          })
        }
      },
    },
    methods: {
      ...mapActions([
        'delfile2',
        'getUpdateTitleRepeat',
        'getAdminArticle',
        'articleUpdate',
        'setOperationInfo'
      ]),
      // 全局通知
      open1() {
        // const h = this.$createElement;
        // this.$notify({
        //   title: '提示',
        //   message: h('p', { style: 'color: teal;text-align: justify'}, ''),
        //   duration: 0,
        //   showClose:false,
        //   type: 'warning',
        //   position: 'bottom-right'
        // });
      },
      // 全局通知
      open2() {
        const h = this.$createElement;
        this.popup = this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          // message: h('p', { style: 'color: teal;text-align: justify'}, '1.在修改中关闭文件类型、删除文件、重新上传文件操作，<b>只要不点击《提交修改》都可以刷新还原，请放心修改！</b>2.修改中每个类型的文件<b>上传时不会显示进度条</b>，上传时请耐心等待，上传成功的文件会直接显示！'),
          message: '<p style="color: teal;text-align: justify">1.在修改中关闭文件类型、删除文件、重新上传文件操作，<b style="color:#d81e06;">只要不点击《提交修改》都可以刷新还原，请放心修改！</b>2.修改中每个类型的文件<b style="color:#d81e06;">上传时不会显示进度条</b>，上传时请耐心等待，上传成功的文件会直接显示！</p>',
          duration: 0,
          customClass:'popupClass',
          showClose:false,
          type: 'warning',
          position: 'bottom-right'
        });
      },
      // 删除类型文件
      delFileType(type){
        let _this = this
        switch (type){
          case 'img':
            if(_this.article.img.length !== 0){
              _this.article.img.find(o=>{
                _this.deleteFiles.indexOf(o.dataImg.url) === -1 ? _this.deleteFiles.push(o.dataImg.url) : o = o
                _this.deleteFiles.indexOf(o.miniImg) === -1 ? _this.deleteFiles.push(o.miniImg) : o = o
              })
              _this.article.img.splice(0, _this.article.img.length)
            }
            break;
          case 'psd':
            if(_this.article.psd.length !== 0){
              _this.article.psd.find(o=>{
                _this.deleteFiles.indexOf(o.dataPsd.url) === -1 ? _this.deleteFiles.push(o.dataPsd.url) : o = o
                _this.deleteFiles.indexOf(o.Psdview) === -1 ? _this.deleteFiles.push(o.Psdview) : o = o
              })
              _this.article.psd.splice(0, _this.article.psd.length)
            }
            break;
          case 'video':
            if(_this.article.video.length !== 0){
              _this.article.video.find(o=>{
                _this.deleteFiles.indexOf(o.dataVideo.url) === -1 ? _this.deleteFiles.push(o.dataVideo.url) : o = o
                _this.deleteFiles.indexOf(o.Videoview) === -1 ? _this.deleteFiles.push(o.Videoview) : o = o
              })
              _this.article.video.splice(0, _this.article.video.length)
            }
            break;
          case 'ai':
            if(_this.article.ai.length !== 0){
              _this.article.ai.find(o=>{
                 // _this.delfile({filesrc: o.Aiview})
                _this.deleteFiles.indexOf(o.dataAi.url) === -1 ? _this.deleteFiles.push(o.dataAi.url) : o = o
              })
              _this.article.ai.splice(0, _this.article.ai.length)
            }
            break;
          case 'pdf':
            if(_this.article.pdf.length !== 0){
              _this.article.pdf.find(o=>{
                 // _this.delfile({filesrc: o.Pdfview})
                _this.deleteFiles.indexOf(o.file.url) === -1 ? _this.deleteFiles.push(o.file.url) : o = o
              })
              _this.article.pdf.splice(0, _this.article.pdf.length)
            }
            break;
          case '压缩包':
            if(_this.article.engineering.length !== 0){
              _this.article.engineering.find(o=>{
                _this.deleteFiles.indexOf(o.file.url) === -1 ? _this.deleteFiles.push(o.file.url) : o = o
              })
              _this.article.engineering.splice(0, _this.article.engineering.length)
            }
            break;
          case 'word':
            if(_this.article.word.length !== 0){
              _this.article.word.find(o=>{
                _this.deleteFiles.indexOf(o.file.url) === -1 ? _this.deleteFiles.push(o.file.url) : o = o
              })
              _this.article.word.splice(0, _this.article.word.length)
            }
            break;
          case 'excel':
            if(_this.article.excel.length !== 0){
              _this.article.excel.find(o=>{
                _this.deleteFiles.indexOf(o.file.url) === -1 ? _this.deleteFiles.push(o.file.url) : o = o
              })
              _this.article.excel.splice(0, _this.article.excel.length)
            }
            break;
        }
      },
      // 复选框全选
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      // 复选框单选
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      // 发布用户文章，把数组中的路径拼接成字符串,以及Uid、title发送给后台接口
      submitImg() {
        let _this = this
        this.types.find(obj => {
        	_this.article.lname === obj.lname ? _this.article.tid = obj.tid : _this.article.tid = _this.article.tid
        })
        this.projects.find(obj => {
        	_this.article.xname === obj.xname ? _this.article.pid = obj.pid : _this.article.pid = _this.article.pid
        })
        if (this.$store.state.admin.adminInfo.nickname === this.$store.state.admin.adminInfo.userName) {
        	this.$alert('请修改昵称（个人真实姓名）后在修改文件', '警告', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/backstage/userInfo/')
                }
              });
        } else if(this.article.title.replace(/\s+/g," ").length === 0) {
        	this.$alert('请填写标题', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.titleCf === false && this.titleDiv === true) {
        	this.$alert('标题重复', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.projectImg.length === 0) {
        	this.$alert('请选择项目类型', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.typeImg.length === 0) {
        	this.$alert('请选择项目下的类型', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.minTypeImg.length === 0) {
        	this.$alert('请选择项目下的分类', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.dynamicTags.length === 0) {
        	this.$alert('请根据内容填写标签(最多可填写6个)', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.article.detailsid.replace(/\s+/g," ").length === 0) {
        	this.$alert('请填写描述内容', '警告', {
        		confirmButtonText: '确定'
        	})
        } else if(this.checkedCities.length === 0) {
          this.$alert('请添加需要上传的文件类型', '警告', {
            confirmButtonText: '确定'
          })
        }else if(this.checkedCities.indexOf('img') !== -1 && this.article.img.length === 0) {
          this.$alert('请上传图片文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('psd') !== -1 && this.article.psd.length === 0) {
          this.$alert('请上传psd文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('video') !== -1 && this.article.video.length === 0) {
          this.$alert('请上传视频文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('ai') !== -1 && this.article.ai.length === 0) {
          this.$alert('请上传ai文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('pdf') !== -1 && this.article.pdf.length === 0) {
          this.$alert('请上传pdf文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('压缩包') !== -1 && this.article.engineering.length === 0) {
          this.$alert('请上传压缩包文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('word') !== -1 && this.article.word.length === 0) {
          this.$alert('请上传word文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }   else if(this.checkedCities.indexOf('excel') !== -1 && this.article.excel.length === 0) {
          this.$alert('请上传excel文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        } else {
          this.loading = true
          let typeName = []
          this.article.img.length !== 0 ? typeName.push('img') : console.log()
          this.article.psd.length !== 0 ? typeName.push('psd') : console.log()
          this.article.video.length !== 0 ? typeName.push('video') : console.log()
          this.article.ai.length !== 0 ? typeName.push('ai') : console.log()
          this.article.pdf.length !== 0 ? typeName.push('pdf') : console.log()
          this.article.word.length !== 0 ? typeName.push('word') : console.log()
          this.article.excel.length !== 0 ? typeName.push('excel') : console.log()
          this.article.engineering.length !== 0 ? typeName.push('压缩包') : console.log()
          this.articleUpdate({mId:this.article.mId, uId:this.article.uId, pid:this.$store.getters.getUserProjectsId(this.projectImg).pid, tid:this.$store.getters.getUserTypesId(this.typeImg).tid, did:this.$store.getters.getUserMinTypeId(this.minTypeImg).did, title:this.article.title.replace(/\s+/g," "), keyword:this.dynamicTags.toString(), describe:this.article.describe.replace(/\s+/g," "), img:this.article.img, psd:this.article.psd, video:this.article.video, ai:this.article.ai, pdf:this.article.pdf, word:this.article.word, excel:this.article.excel, engineering:this.article.engineering, typeFile:typeName.toString()})
            .then((response) => {
              if(response.code === 200) {
                console.log(this.$store.state.admin.adminInfo,'修改后用户信息')
                _this.setOperationInfo({_this:_this, type:30, article:{mId:_this.article.mId, uId:_this.article.uId, pid:_this.$store.getters.getUserProjectsId(_this.projectImg).pid, tid:_this.$store.getters.getUserTypesId(_this.typeImg).tid, did:_this.$store.getters.getUserMinTypeId(_this.minTypeImg).did, title:_this.article.title.replace(/\s+/g," "), keyword:_this.dynamicTags.toString(), describe:_this.article.describe.replace(/\s+/g," "), img:_this.article.img, psd:_this.article.psd, video:_this.article.video, ai:_this.article.ai, pdf:_this.article.pdf, word:_this.article.word, excel:_this.article.excel, engineering:_this.article.engineering, typeFile:_this.article.typeFile}})
                _this.upState = true
                _this.$message({type: 'success', message: response.msg})
                if(this.deleteFiles.length !== 0) {
                  _this.delfile2({filesrc: _this.deleteFiles.toString()})
                }
                _this.uploadingFiles = []
                _this.$router.push('/backstage/seeArticle')
              }
            })
            .catch(function (error) {
              _this.$message.error(error.msg)
            })
        }
      },
      // 判断标题是否重复，并提示用户
      titleRepeat() {
        let _this = this
        if(this.title.length !== 0) {
          this.getTitleRepeat({title:this.title})
            .then((response) => {
              if(response.code === 200) {
                if (response.data === '0') {
                  // 有重复的
                  _this.titleDiv = true
                  _this.titleCf = false
                } else if (response.data === '1') {
                  // 没有重复的
                  _this.titleDiv = true
                  _this.titleCf = true
                }
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
        }
      },
      // 返回文章列表页
      jumpUrl() {
      	this.$router.push('/backstage/seeArticle')
      },
      // 删除标签按钮
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      // 添加input标签
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      // 添加文章的标签
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if(inputValue && this.dynamicTags.length < 6) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 清空数据，为下次上传做准备
      myReload () {
        this.uploadFiles = []
        this.reload()
      },
      // 接受标签组件返回的值
      setDynamicTags (data) {
        this.dynamicTags = data
      },
      // 描述富文本框组件返回值
      catchData (data) {
        this.describe = this.article.describe = data
      },
      // img组件返回值
      imgData (data) {
        let _this = this
        this.article.img = data
      },
      // psd组件返回值
      psdData (data) {
        let _this = this
        this.article.psd = data
      },
      // video组件返回值
      videoData (data) {
        let _this = this
        this.article.video = data
      },
      // pdf组件返回值
      pdfData (data) {
        let _this = this
        this.article.pdf = data
      },
      // ysb组件返回值
      engineeringData (data) {
        let _this = this
        this.article.engineering = data
      },
      // word组件返回值
      wordData (data) {
        let _this = this
        this.article.word = data
      },
      // excel组件返回值
      excelData (data) {
        let _this = this
        this.article.excel = data
      },
      // ai组件返回值
      aiData (data) {
        let _this = this
        this.article.ai = data
      },
      // 删除文件返回值
      deleteFileType (data){
        let _this = this
        data.find(o=>{
          _this.deleteFiles.indexOf(o) === -1 ? _this.deleteFiles.push(o) : o = o
        })
      },
      // 上传文件返回值
      uploadFile (data){
        let _this = this
        data.find(o=>{
          _this.uploadFiles.indexOf(o) === -1 ? _this.uploadFiles.push(o) : o = o
        })
      },
    },
    created() {
      let _this = this
      this.types = this.$store.state.common.publicInfo.types
      this.projects = this.$store.state.common.publicInfo.projects
      this.getAdminArticle({mId: this.$route.params.id})
        .then((response) => {
          if(response.code === 200) {
            _this.article = response.data
            _this.article2 = JSON.stringify(response.data)
            _this.article2 = JSON.parse(_this.article2)
            let tags = _this.article.keyword.split(",")
            let checkedCities = _this.article.typeFile.split(',')
            checkedCities.find((e, index) => {
            	_this.checkedCities.push(e)
            })
            tags.find((e, index) => {
            	_this.dynamicTags.push(e)
            })
            _this.title = _this.article.title
            _this.projectImg = _this.article.xname
            _this.typeImg = _this.article.lname
            _this.did = _this.article.detailsid
            _this.minTypeImg = _this.article.dname
            _this.loading2 = false
          }
        })
        .catch(function (error) {
          _this.$message.error(error.msg)
        })
      // 刷新页面时删除上传的文件
      window.addEventListener('beforeunload', e => {
        if(this.uploadFiles.length !== 0 && this.upState == false) {
          this.delfile2({filesrc: this.uploadFiles.toString()})
      	}
      });
      // 屏蔽项目设置
      if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== "2"){
        this.userInfo.shieldInfo.find((o,index)=>{
          _this.projects.find((e,indexe)=>{
            e.pid == o.pid && o.state !== '0' ? e.state = '0' : e = e
            _this.$set(_this.projects,indexe,e)
          })
        })
      }
      // 全局通知
      this.open1()
      this.open2()
    },
    beforeDestroy() {
      let _this = this
      this.popup.close()
    	// 注销页面时删除上传的文件
    	if(this.uploadFiles.length !== 0 && this.upState == false) {
        this.delfile2({filesrc: this.uploadFiles.toString()})
    	}
    },
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.icon{width:1.5em;height:1.5em;vertical-align:-.15em;fill:currentColor;overflow:hidden;margin: 0 .5em;}
.title{width:100%;}
.title samp:nth-child(1){display:block;float:left;width:10%;font-size:18px;height:40px;line-height:40px;text-align:right;padding-right:20px;font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif}
.title span.true{display:block;float:left;color:#1afa29;width:250px;line-height:40px;text-align:left}
.title span.true img{display:block;float:left;padding-right:10px;width:30px;height:30px;margin:5px 0 5px 10px}
.title span.fales{display:block;float:left;color:#d81e06;width:250px;line-height:40px;text-align:left}
.title span.fales img{display:block;float:left;padding-right:10px;width:30px;height:30px;margin:5px 0 5px 10px}
.title .el-input,.title .el-textarea{float:left;width:30%}
.imgName{float:left;height:40px;font-size:18px;text-align:right;width:10%;padding-right:20px}
.imgs{width:55%;float:left}
.buttonImg{width:30%;margin-left:12%}
.el-input--suffix{width:200px!important}
.avatar-uploader{width:178px;height:178px}
.uploadImg .el-upload{border-radius:6px!important}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden;width:148px;height:148px}
.avatar-uploader .el-upload:hover{border-color:#409EFF}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}
.avatar{width:178px;height:178px;display:block}
.el-tag+.el-tag{margin-left:10px}
.button-new-tag{margin-left:10px;height:32px;line-height:30px;padding-top:0;padding-bottom:0}
.input-new-tag{width:90px;margin-left:10px;vertical-align:bottom}

.fileType /deep/ .el-checkbox{margin-bottom: 5px;}
</style>
