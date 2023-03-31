<template>
  <el-container style="margin: 50px 0px;">
  	<el-footer>
  		<div class="title">
  			<samp>标题：</samp>
  			<el-input placeholder="请输入标题" v-model="title" clearable v-on:blur="titleRepeat" style="width: 455px !important;"></el-input>
  			<span class="true" v-if="titleCf && titleDiv"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dui"></use></svg>没有重复，可正常使用</span>
  			<span class="fales" v-if="!titleCf && titleDiv"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-cuo"></use></svg>标题重复，请重新填写</span>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<div class="title">
  			<samp>分类：</samp>
  			<el-select v-model="projectImg" placeholder="请选择项目" filterable clearable style="width:200px; color: #409eff;">
  				<el-option v-for="item in projects" :key="item.pid" :label="item.xname" :value="item.xname" v-if="item.state === 1">
  				</el-option>
  			</el-select>
  			<el-select v-model="typeImg" placeholder="请选择类型" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
  				<el-option v-for="item in types" :key="item.tid" :label="item.lname" :value="item.lname" v-if="item.state === 1">
  				</el-option>
  			</el-select>
  			<el-select v-model="minTypeImg" placeholder="请选择分类" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
  				<el-option v-for="item in minTypes2" :key="item.did" :label="item.dname" :value="item.dname" v-if="item.state === 1">
  				</el-option>
  			</el-select>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<labelComponent :dynamicTags2="dynamicTags" @setDynamicTags="setDynamicTags"></labelComponent>
  	</el-footer>
		<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
			<div class="title">
				<samp>质量：</samp>
				<el-radio-group v-model="quality"  size="medium">
					<el-radio-button label="3" >高</el-radio-button>
					<el-radio-button label="2" >中</el-radio-button>
					<el-radio-button label="1" >低</el-radio-button>
				</el-radio-group>
			</div>
		</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<div class="title">
        <samp>描述：</samp>
        <!-- <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="describe"></el-input> -->
        <wangeditor :describe="describe" :type="'add'" @catchData="catchData"></wangeditor>
  		</div>
  	</el-footer>
    <el-footer style="display: flex; justify-content: flex-end;min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title">
        <samp>上传文件类型设置：</samp>
        <div style="width: 700px; float: left; border: 2px solid #DCDFE6; border-radius: 10px; padding: 10px;padding-bottom: 10px; margin-bottom: 50px;">
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
        </div>
      </div>
    </el-footer>
  	<el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('img') !== -1">
  		<mkImg @imgData="imgData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkImg>
  	</el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('psd') !== -1">
    	<mkPsd @psdData="psdData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkPsd>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('video') !== -1">
    	<mkVideo @videoData="videoData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkVideo>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('pdf') !== -1">
    	<mkPdf @pdfData="pdfData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkPdf>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('压缩包') !== -1">
    	<mkEngineering @engineeringData="engineeringData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkEngineering>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('word') !== -1">
    	<mkWord @wordData="wordData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkWord>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('excel') !== -1">
    	<mkExcel @excelData="excelData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkExcel>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;" v-show="checkedCities.indexOf('ai') !== -1">
    	<mkAi @aiData="aiData" @deleteFileType="deleteFileType" @setTitle="setTitle"></mkAi>
    </el-footer>
  	<el-row class="buttonImg">
  		<el-button type="primary" v-on:click.stop="submitImg" :loading="loading" :disabled="uploadFilesJudge.expect === uploadFilesJudge.actual ? false : true">提交上传</el-button>
  	</el-row>
  </el-container>
</template>

<script>
  import labelComponent from 'COMMON/labelComponent/labelComponent'
  import wangeditor from 'COMMON/wangeditor/wangeditor'
  import mkImg from 'VIEWS/admin/articleAdd/img'
  import mkPsd from 'VIEWS/admin/articleAdd/psd'
  import mkVideo from 'VIEWS/admin/articleAdd/video'
  import mkEngineering from 'VIEWS/admin/articleAdd/engineering'
  import mkPdf from 'VIEWS/admin/articleAdd/pdf'
  import mkAi from 'VIEWS/admin/articleAdd/ai'
  import mkWord from 'VIEWS/admin/articleAdd/word'
  import mkExcel from 'VIEWS/admin/articleAdd/excel'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesID, getMinTypesName } from 'UTIL/publicAPI'
  const cityOptions = ['img', 'psd', 'video', 'ai', 'pdf', '压缩包', 'word','excel']
  export default {
    inject: ['reload'],
    name: 'articleAdd',
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
        title: '',
        quality: '1',
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
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        marginLeft: {
        	'margin-left': '0px'
        },
        uploadFilesJudge: {expect: 0, actual: 0},
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
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
      	if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== 2){
          this.userInfo.shieldInfo.find((o,index)=>{
            if(o.xname == _this.projectImg && o.state == 0){
              o.type.find((e,indexe)=>{
                if(e.state == 1){
                  _this.types.find((x,indexx)=>{
                    if(e.tid == x.tid){
                      x.state = 0
                      _this.$set(_this.types,indexx,x)
                      _this.minTypes.find((s,indexs)=>{
                        s.tbid == x.tid ? s.state = 0 : s = s,
                        _this.$set(_this.minTypes,indexs,s)
                      })
                    }
                  })
                }
              })
            } else {
              _this.types.find((x,indexx)=>{
                x.state = 1
                _this.$set(_this.types,indexx,x)
                _this.minTypes.find((s,indexs)=>{
                  s.tbid == x.tid ? s.state = 1 : s = s,
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
        'articleAdd',
        'getTitleRepeat',
        'setOperationInfo'
      ]),
      // 删除类型文件
      delFileType(type){
        let _this = this
        switch (type){
          case 'img':
            if(_this.imgCrss.length !== 0){
              _this.imgCrss.find(o=>{
                 _this.delfile({filesrc: o.dataImg.url})
                 _this.delfile({filesrc: o.miniImg})
              })
              _this.imgCrss.find(o=>{
                _this.uploadFiles.indexOf(o.dataImg.url) === -1 ? _this.uploadFiles.push(o.dataImg.url) : o = o
                _this.uploadFiles.indexOf(o.miniImg) === -1 ? _this.uploadFiles.push(o.miniImg) : o = o
              })
              _this.imgCrss.splice(0, _this.imgCrss.length)
            }
            break;
          case 'psd':
            if(_this.psd.length !== 0){
              _this.psd.find(o=>{
                 _this.delfile({filesrc: o.dataPsd.url})
                 _this.delfile({filesrc: o.Psdview})
              })
              _this.psd.find(o=>{
                _this.uploadFiles.indexOf(o.dataPsd.url) === -1 ? _this.uploadFiles.push(o.dataPsd.url) : o = o
                _this.uploadFiles.indexOf(o.Psdview) === -1 ? _this.uploadFiles.push(o.Psdview) : o = o
              })
              _this.psd.splice(0, _this.psd.length)
            }
            break;
          case 'video':
            if(_this.video.length !== 0){
              _this.video.find(o=>{
                 _this.delfile({filesrc: o.dataVideo.url})
                 _this.delfile({filesrc: o.Videoview})
              })
              _this.video.find(o=>{
                _this.uploadFiles.indexOf(o.dataVideo.url) === -1 ? _this.uploadFiles.push(o.dataVideo.url) : o = o
                _this.uploadFiles.indexOf(o.Videoview) === -1 ? _this.uploadFiles.push(o.Videoview) : o = o
              })
              _this.video.splice(0, _this.video.length)
            }
            break;
          case 'ai':
            if(_this.ai.length !== 0){
              _this.ai.find(o=>{
                 _this.delfile({filesrc: o.dataAi.url})
                 // _this.delfile({filesrc: o.Aiview})
              })
              _this.ai.find(o=>{
                _this.uploadFiles.indexOf(o.dataAi.url) === -1 ? _this.uploadFiles.push(o.dataAi.url) : o = o
              })
              _this.ai.splice(0, _this.ai.length)
            }
            break;
          case 'pdf':
            if(_this.pdf.length !== 0){
              _this.pdf.find(o=>{
                 _this.delfile({filesrc: o.file.url})
                 // _this.delfile({filesrc: o.Pdfview})
              })
              _this.pdf.find(o=>{
                _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
              })
              _this.pdf.splice(0, _this.pdf.length)
            }
            break;
          case '压缩包':
            if(_this.engineering.length !== 0){
              _this.engineering.find(o=>{
                 _this.delfile({filesrc: o.file.url})
              })
              _this.engineering.find(o=>{
                _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
              })
              _this.engineering.splice(0, _this.engineering.length)
            }
            break;
          case 'word':
            if(_this.word.length !== 0){
              _this.word.find(o=>{
                 _this.delfile({filesrc: o.file.url})
              })
              _this.word.find(o=>{
                _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
              })
              _this.word.splice(0, _this.word.length)
            }
            break;
          case 'excel':
            if(_this.excel.length !== 0){
              _this.excel.find(o=>{
                 _this.delfile({filesrc: o.file.url})
              })
              _this.excel.find(o=>{
                _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
              })
              _this.excel.splice(0, _this.excel.length)
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
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      // 发布用户文章，把数组中的路径拼接成字符串,以及Uid、title发送给后台接口
      submitImg() {
        if (this.$store.state.admin.adminInfo.nickname === this.$store.state.admin.adminInfo.userName) {
          this.$alert('请修改昵称（个人真实姓名）后在上传文件', '警告', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/backstage/userInfo/')
                }
              });
        } else if(this.title.length === 0) {
          this.$alert('请填写标题', '警告', {
            confirmButtonText: '确定'
          })
        } else if(this.titleCf === false) {
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
        } else if(this.describe.length === 0) {
          this.$alert('请填写描述内容', '警告', {
            confirmButtonText: '确定'
          })
        } else if(this.checkedCities.length === 0) {
          this.$alert('请添加需要上传的文件类型', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.length === 0) {
          this.$alert('请添加需要上传的文件类型', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('img') !== -1 && this.imgCrss.length === 0) {
          this.$alert('请上传图片文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('psd') !== -1 && this.psd.length === 0) {
          this.$alert('请上传psd文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('video') !== -1 && this.video.length === 0) {
          this.$alert('请上传视频文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('ai') !== -1 && this.ai.length === 0) {
          this.$alert('请上传ai文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('pdf') !== -1 && this.pdf.length === 0) {
          this.$alert('请上传pdf文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('压缩包') !== -1 && this.engineering.length === 0) {
          this.$alert('请上传压缩包文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }  else if(this.checkedCities.indexOf('word') !== -1 && this.word.length === 0) {
          this.$alert('请上传word文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        }   else if(this.checkedCities.indexOf('excel') !== -1 && this.excel.length === 0) {
          this.$alert('请上传excel文件,如不需要可以选择关闭', '警告', {
            confirmButtonText: '确定'
          })
        } else {
          let _this = this
          this.loading = true
          this.articleAdd({uId:this.$store.state.admin.adminInfo.uId, typeFile:this.checkedCities.toString(), typeid:this.$store.getters.getUserTypesId(this.typeImg).tid, projectid:this.$store.getters.getUserProjectsId(this.projectImg).pid, detailsid:this.$store.getters.getUserMinTypeId(this.minTypeImg).did, title:this.title, keyword:this.dynamicTags.toString(), describe:this.describe, img:this.imgCrss, psd:this.psd, video:this.video, ai:this.ai, pdf:this.pdf, word:this.word, excel:this.excel, engineering:this.engineering, quality:this.quality})
            .then((response) => {
              if(response.code === 200) {
                _this.setOperationInfo({_this:_this, type:31, article:{uId:_this.$store.state.admin.adminInfo.uId, typeFile:_this.checkedCities.toString(), typeid:_this.$store.getters.getUserTypesId(_this.typeImg).tid, projectid:_this.$store.getters.getUserProjectsId(_this.projectImg).pid, detailsid:_this.$store.getters.getUserMinTypeId(_this.minTypeImg).did, title:_this.title, keyword:_this.dynamicTags.toString(), describe:_this.describe, img:_this.imgCrss, psd:_this.psd, video:_this.video, ai:_this.ai, pdf:_this.pdf, word:_this.word, excel:_this.excel, engineering:_this.engineering}})
                _this.$message({type: 'success', message: response.msg})
                // 更新页面调用app.vue的更新方法
                _this.myReload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              // 更新页面调用app.vue的更新方法
              _this.myReload()
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
        this.describe = data
      },
			// 接收标题返回值
			setTitle (data){
				this.title.length === 0 ? this.title = data.split('.')[0] : this.title = this.title
			},
      // img组件返回值
      imgData (data) {
        let _this = this
        this.imgCrss = data
        this.imgCrss.find(o=>{
          _this.uploadFiles.indexOf(o.dataImg.url) === -1 ? _this.uploadFiles.push(o.dataImg.url) : o = o
          _this.uploadFiles.indexOf(o.miniImg) === -1 ? _this.uploadFiles.push(o.miniImg) : o = o
        })
      },
      // psd组件返回值
      psdData (data) {
        let _this = this
        this.psd = data
        this.psd.find(o=>{
          _this.uploadFiles.indexOf(o.dataPsd.url) === -1 ? _this.uploadFiles.push(o.dataPsd.url) : o = o
          _this.uploadFiles.indexOf(o.Psdview) === -1 ? _this.uploadFiles.push(o.Psdview) : o = o
        })
      },
      // video组件返回值
      videoData (data) {
        let _this = this
        this.video = data
        this.video.find(o=>{
          _this.uploadFiles.indexOf(o.dataVideo.url) === -1 ? _this.uploadFiles.push(o.dataVideo.url) : o = o
          _this.uploadFiles.indexOf(o.Videoview) === -1 ? _this.uploadFiles.push(o.Videoview) : o = o
        })
      },
      // pdf组件返回值
      pdfData (data) {
        let _this = this
        this.pdf = data
        this.pdf.find(o=>{
          _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
        })
      },
      // ysb组件返回值
      engineeringData (data) {
        let _this = this
        this.engineering = data
        this.engineering.find(o=>{
          _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
        })
      },
      // word组件返回值
      wordData (data) {
        let _this = this
        this.word = data
        this.word.find(o=>{
          _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
        })
      },
      // excel组件返回值
      excelData (data) {
        let _this = this
        this.excel = data
        this.excel.find(o=>{
          _this.uploadFiles.indexOf(o.file.url) === -1 ? _this.uploadFiles.push(o.file.url) : o = o
        })
      },
      // ai组件返回值
      aiData (data) {
        let _this = this
        this.ai = data
        this.ai.find(o=>{
          _this.uploadFiles.indexOf(o.dataAi.url) === -1 ? _this.uploadFiles.push(o.dataAi.url) : o = o
        })
      },
      // 上传文件类型组件删除文件返回值
      deleteFileType (data){
        let _this = this
        data.find(o=>{
          _this.uploadFiles.indexOf(o) !== -1 ? _this.uploadFiles.splice(_this.uploadFiles.indexOf(o), 1) : o = o
        })
      },
    },
    created() {
      let _this = this
      this.types = this.$store.state.common.publicInfo.types
      this.projects = this.$store.state.common.publicInfo.projects
      // 刷新页面时删除上传的文件
      window.addEventListener('beforeunload', e => {
        if(this.uploadFiles.length !== 0) {
          // _this.uploadFiles.find((fileSrc, index) => {
          //   _this.delfile({filesrc: fileSrc})
          // })
          this.delfile2({filesrc: this.uploadFiles.toString()})
      	}
      });
      // 屏蔽项目设置
      if((typeof this.userInfo.shieldInfo == 'Array' && this.userInfo.shieldInfo.length !== 0) && this.projects.length !== 0 && this.userInfo.permissions !== 2){
        this.userInfo.shieldInfo.find((o,index)=>{
          _this.projects.find((e,indexe)=>{
            e.pid == o.pid && o.state !== 0 ? e.state = 0 : e = e
            _this.$set(_this.projects,indexe,e)
          })
        })
      }
    },
    beforeDestroy() {
      let _this = this
    	// 注销页面时删除上传的文件
    	if(this.uploadFiles.length !== 0) {
    	  // _this.uploadFiles.find((fileSrc, index) => {
    	  //   _this.delfile({filesrc: fileSrc})
    	  // })
        this.delfile2({filesrc: this.uploadFiles.toString()})
    	}
    },
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.icon{width:1.5em;height:1.5em;vertical-align:-.15em;fill:currentColor;overflow:hidden;margin: 0 .5em;}
.title{width:100%}
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
