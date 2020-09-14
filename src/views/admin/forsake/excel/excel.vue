<template>
  <el-container style="margin: 50px 0px;">
  	<el-footer>
  		<div class="title">
  			<samp>标题：</samp>
  			<el-input placeholder="请输入标题" v-model="title" clearable v-on:blur="titleRepeat"  style="width: 455px !important;"></el-input>
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
        <!-- <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="describe"></el-input> -->
  			<wangeditor :describe="describe" :type="'add'" @catchData="catchData"></wangeditor>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
  		<p class="imgName">Excel文件：</p>
  		<div class="imgs" style="width: 40%;">
  			<el-upload multiple style="" :limit="20" ref="videoFile" accept=".xlsx,.xls" class="upload-demo" :action="action + '?id=8'" :on-remove="handleRemove3" :on-change="obtpdfImgSrc" :on-exceed="limitNum">
  				<el-button size="small" type="primary">点击上传Excel文件</el-button>
  				<div slot="tip" class="el-upload__tip">只能上传.xlsx,.xls格式文件，文件大小不要超过1GB</div>
  			</el-upload>
  			<el-alert title="提示" description="※上传第一个文件时会自动获取文件名称并填写到标题。※最多上传20个Excel文件，超出部分会自动剔除" type="info" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  		</div>
  	</el-footer>
  	<el-row class="buttonImg">
  		<el-button type="primary" v-on:click.stop="submitImg" :loading="loading" :disabled="uploadFilesJudge.expect === uploadFilesJudge.actual ? false : true">提交上传</el-button>
  	</el-row>
  </el-container>
</template>

<script>
  import labelComponent from 'COMMON/labelComponent/labelComponent'
  import wangeditor from 'COMMON/wangeditor/wangeditor'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesID, getMinTypesName } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    name: 'pdf',
    components: {
      labelComponent,
      wangeditor
    },
    data() {
      return {
        loading: false,
        title: '',
        titleCf: false,
        titleDiv: false,
        describe: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imgCrss: [],
        psd: [],
        video: [],
        ai: [],
        pdf: [],
        excel: [],
        engineering: [],
        userInfo: this.$store.state.admin.adminInfo,
        // action: this.$store.state.common.publicInfo.srcUrl + '/u/upfile',
        action: '/a' + '/u/upfile',
        projects: this.$store.state.common.publicInfo.projects,
        types: this.$store.state.common.publicInfo.types,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
        typeImg: '',
        projectImg: '',
        minTypeImg: '',
        uploadFiles: [],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        marginLeft: {
        	'margin-left': '0px'
        },
        uploadFilesJudge: {expect: 0, actual: 0}
      }
    },
    watch: {
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
    				obj.tbid === tid ? _this.minTypes2.push(obj) : console.log()
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
    				obj.tbid === tid ? _this.minTypes2.push(obj) : console.log()
    			})
    		} else if(this.minTypeImg.length === 0) {
    			if(this.typeImg.length !== 0) {
    				this.minTypes.find(obj => {
    					obj.tbid === tid ? _this.minTypes2.push(obj) : console.log()
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
        'delfile',
        'articleAdd',
        'getTitleRepeat',
        'setOperationInfo'
      ]),
      // 上传文件数超出限制提示
      limitNum (file, fileList) {
      	if (fileList.length > 1) {
      		this.$alert('最多上传20个Excel文件，你已超出限制！', '警告', {
      			confirmButtonText: '确定'
      		})
      	}
      },
      // 获取上传图片的服务器端实际路径地址并保存到数组中
      obtpdfImgSrc(file, fileList) {
      	let srcBoolean = false, _this = this
      	if(file.response !== undefined) {
      		if(file.response.data.type === '8') {
      			this.excel.push({
      				file: {size: file.size, name: file.name, url: file.response.data.file, type: file.raw.type, File: file.raw, title: file.name},
      			})
      			this.uploadFiles.push(file.response.data.file)
      			// 设置标题为第一个上传的文件的名称
      			if (this.title.length === 0) {
      				this.title = this.excel[0].file.name.split(".")[0]
      				this.titleRepeat()
      			}
      		}

      	}
      },
      // 删除上传的pdf文件
      handleRemove3(file, fileList) {
        this.delfile({filesrc: file.response.data.file})
      	this.setuploadFiles(file.response.data.file)
      	this.deleteFiles(file.response.data.file, '', 'excel')
      },
      setuploadFiles(src) {
      	let _this = this
      	this.uploadFiles.find((obj, index) => {
      		obj === src ? _this.uploadFiles.splice(index, 1) : obj = obj
      	})
      },
      deleteFiles(dataSrc, miniSrc, type) {
      	let _this = this
      	console.log(dataSrc)
      	if(type === 'excel') {
      		this.excel.find((obj, index) => {
      			obj.file.url === dataSrc ? _this.excel.splice(index, 1) : obj = obj
      		})
      	}
      	if(type === 'img') {
      		this.imgCrss.find((obj, index) => {
      			if (obj !== undefined) {
      				if (obj.dataImg.url === dataSrc && obj.miniImg === miniSrc) {
      					_this.imgCrss.splice(index, 1)
      				}
      			}
      		})
      	}
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
      	} else if(this.title.replace(/\s+/g," ").length === 0) {
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
      	} else if(this.describe.replace(/\s+/g," ").length === 0) {
      		this.$alert('请填写描述内容', '警告', {
      			confirmButtonText: '确定'
      		})
      	} else if(this.excel.length === 0 ) {
      		this.$alert('请添加需要上传的Excel文件', '警告', {
      			confirmButtonText: '确定'
      		})
      	} else {
          let _this = this
          this.loading = true
          this.articleAdd({uId:this.$store.state.admin.adminInfo.uId, typeFile:'excel', typeid:this.$store.getters.getUserTypesId(this.typeImg).tid, projectid:this.$store.getters.getUserProjectsId(this.projectImg).pid, detailsid:this.$store.getters.getUserMinTypeId(this.minTypeImg).did, title:this.title.replace(/\s+/g," "), keyword:this.dynamicTags.toString(), describe:this.describe.replace(/\s+/g," "), img:'', psd:'', video:'', ai:'', pdf:'', word:'', excel:this.excel, engineering:''})
            .then((response) => {
              if(response.code === 200) {
                _this.setOperationInfo({_this:_this, type:31, article:{uId:_this.$store.state.admin.adminInfo.uId, typeFile:'excel', typeid:_this.$store.getters.getUserTypesId(_this.typeImg).tid, projectid:_this.$store.getters.getUserProjectsId(_this.projectImg).pid, detailsid:_this.$store.getters.getUserMinTypeId(_this.minTypeImg).did, title:_this.title.replace(/\s+/g," "), keyword:_this.dynamicTags.toString(), describe:_this.describe.replace(/\s+/g," "), img:'', psd:'', video:'', ai:'', pdf:'', word:'', excel:this.excel, engineering:''}})
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
      	console.log("返回值：" + data)
      	this.dynamicTags = data
      },
      // 描述富文本框组件返回值
      catchData (data) {
        this.describe = data
      }
    },
    created() {
      let _this = this
    	this.types = this.$store.state.common.publicInfo.types
    	this.projects = this.$store.state.common.publicInfo.projects
    	// 刷新页面时删除上传的文件
    	window.addEventListener('beforeunload', e => {
        if(this.uploadFiles.length !== 0) {
          this.uploadFiles.find((fileSrc, index) => {
            _this.delfile({filesrc: fileSrc})
          })
    		}
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
    },
    beforeDestroy() {
    	// 注销页面时删除上传的文件
    	if(this.uploadFiles.length !== 0) {
    		let _this = this
    		this.uploadFiles.find((fileSrc, index) => {
    		  _this.delfile({filesrc: fileSrc})
    		})
    	}
    }
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
.buttonImg{width:30%;margin-left:13%}
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
</style>
