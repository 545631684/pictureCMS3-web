<template>
  <el-container style="margin: 50px 0px;" v-loading="loading2">
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
  				<el-option v-for="item in minTypes2" :key="item.did" :label="item.dname" :value="item.dname" v-if="item.states === '1'">
  				</el-option>
  			</el-select>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<div class="title"><samp>描述：</samp>
  			<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="article.describe"></el-input>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
  		<labelComponent :dynamicTags2="dynamicTags" @setDynamicTags="setDynamicTags"></labelComponent>
  	</el-footer>
  	<el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
  		<p class="imgName">图片：<br /><span style="display: block;width: 67px;float: right; text-align: center;font-size: 12px;">{{article.img.length}}/130</span></p>
  		<div class="imgs shangchuan2">
  			<div class="clearfix"></div>
  			<el-upload class="clearfix" :file-list="fileListImg" :limit="130" :multiple="true" ref="fliesImg" accept=".jpg,.png,.gif" :action="action + '?id=1'" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveImg" :on-change="obtainImgSrc" :on-exceed="limitNumImg">
  				<div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传图片<br />（.jpg/.png/.gif）</div>
  			</el-upload>
  			<el-alert title="提示" description="※上传第一个文件时会自动获取文件名称并填写到标题。※一次最多上传130张图片，超出部分会自动剔除" type="info" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  			<el-dialog :visible.sync="dialogVisible">
  				<img width="100%" :src="dialogImageUrl" alt="">
  			</el-dialog>
  		</div>
  	</el-footer>
  	<el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
  		<p class="imgName">视频：</p>
  		<div class="imgs shangchuan" style="width: 40%;">
  			<el-upload :multiple="true" :file-list="fileListVideo" :limit="20" ref="videoFile" accept=".mp4,.flv" class="upload-demo" :action="action + '?id=6'" :on-remove="handleRemoveVideo" :on-change="obtainImgSrc" :on-exceed="limitNum">
  				<el-button size="small" type="primary">点击上传视频文件</el-button>
  				<div slot="tip" class="el-upload__tip">只能上传视频格式文件，文件大小不要超过1GB<br />建议上传格式：.mp4（支持在线播放）</div>
  			</el-upload>
  			<el-alert title="提示" description="※上传第一个文件时会自动获取文件名称并填写到标题。※一次最多上传20个.mp4文件，超出部分会自动剔除" type="info" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  		</div>
  		
  	</el-footer>
  	<el-row class="buttonImg">
  		<el-button type="primary" v-on:click.stop="submitImg" :loading="loading">提交修改</el-button>
  		<el-button v-on:click.stop="jumpUrl">返回列表页</el-button>
  	</el-row>
  </el-container>
</template>

<script>
  import labelComponent from 'COMMON/labelComponent/labelComponent'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesName, getMinTypesID } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
      labelComponent
    },
    data() {
      return {
        loading: false,
        loading2: true,
        title: '',
        titleCf: false,
        titleDiv: false,
        describe: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imgDiv: false,
        psdDiv: false,
        videoDiv: false,
        imgCrsString: '',
        action: this.$store.state.common.publicInfo.srcUrl + 'a/upfile',
        types: this.$store.state.common.publicInfo.types,
        projects: this.$store.state.common.publicInfo.projects,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
        typeImg: '',
        projectImg: '',
        minTypeImg: '',
        psdImageUrlls: '',
        videoImageUrlls: '',
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
        	psd: [],
        	registerTime: '',
        	registerTimeImg: '',
        	sex: '',
        	state: '',
        	tid: '',
        	title: '',
        	typeid: '',
        	uId: '',
        	userName: '',
        	video: [],
        	xname: '',
        	did: '',
        	dname: ''
        },
        uploadingFiles: [],
        deleteFiles: [],
        release: false,
        URLS2: this.$store.state.common.publicInfo.srcUrl,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        marginLeft: {
        	'margin-left': '0px'
        },
        fileListImg: [],
        fileListVideo: []
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
    	}
    },
    methods: {
      ...mapActions([
        'delfile',
        'getUpdateTitleRepeat',
        'getAdminArticle',
        'articleUpdate',
      ]),
      // 上传文件数超出限制提示
      limitNumImg (file, fileList) {
      	if (fileList.length > 130) {
      		this.$alert('最大上传130张图片，你已超出限制！', '警告', {
      			confirmButtonText: '确定'
      		})
      	}
      },
      // 删除上传的文件img
      handleRemoveImg(file, fileList) {
      	// 特别说明下：fileListImg在修改时只做读取之用，不做写入（多个文件写入时会报错status值为null），上传组件会自己显示修改上传的文件
      	// img需要展示 则必须把域名部分删除 http://192.168.0.130:81/
      	// 这里img的url获取有2种情况，已上传的url：http://192.168.0.130:81/xxxxx，重新上传的url：blob:http://192.168.0.130:81/xxxxx，这里需要判断下，重新上传的直接调用response里的值即可
      	let _this = this, fileUrl = ''
        if (file.url !== undefined && file.url.substring(0, 5) !== 'blob:') {
          fileUrl = file.url.substring(this.$store.state.common.publicInfo.srcUrl.length)
          this.article.img.find((obj, index) => {
          	if (obj !== undefined) {
          		if (obj.dataImg.url === fileUrl) {
          			_this.article.img.splice(index,1)
          			_this.deleteFiles.push(obj.dataImg.url, obj.miniImg)
          		}
          	}
          })
        } else if (file.response !== undefined) {
          fileUrl = file.response.data.dataImg
          this.article.img.find((obj, index) => {
          	if (obj !== undefined) {
          		if (obj.dataImg.url === fileUrl) {
          			_this.article.img.splice(index,1)
          			_this.deleteFiles.push(obj.dataImg.url, obj.miniImg)
          		}
          	}
          })
        }
      },
      // 查看上传的图片
      handlePictureCardPreview(file) {
      	this.dialogImageUrl = file.url
      	this.dialogVisible = true
      },
      // 上传文件数超出限制提示
      limitNum (file, fileList) {
      	if (fileList.length > 20) {
      		this.$alert('最大上传20个视频文件，你已超出限制！', '警告', {
      			confirmButtonText: '确定'
      		})
      	}
      },
      // 获取上传图片的服务器端实际路径地址并保存到数组中
      obtainImgSrc(file, fileList) {
      	let srcBoolean = false
      	if(file.response !== undefined) {
      		if(file.response.data.type === '1') {
      			// 是空数组字符串时赋值成空数组
      			this.article.img === '[]' ? this.article.img = [] : this.article.img = this.article.img
      			// 防止重复文件名上传
      			this.article.img.length !== 0 ? this.article.img.find(obj => {obj.dataImg.url === file.response.data.dataImg ? srcBoolean = false : srcBoolean = true}) : srcBoolean = true
      			if(srcBoolean) {
      				// 文章的img赋值
      				this.article.img.push({
      					dataImg: { size: file.size, name: file.name, url: file.response.data.dataImg, type: file.raw.type, File: file.raw, title: file.name},
      					miniImg: file.response.data.miniImg
      				})
      				// 防止刷新等其他情况的统一上传文件存放地
      				this.uploadingFiles.push(file.response.data.dataImg, file.response.data.miniImg)
      			}
      		} else if(file.response.data.type === '6') {
      			// 使用视图更新方法赋值文章的video，防止视图不更新的情况
      			// 这里也可以用数组的push()方法也可以保证视图的更新
      			this.$set(
      				this.article.video,
      				this.article.video.length, {
      					dataVideo: {size: file.size, name: file.name, url: file.response.data.dataVideo, type: file.raw.type, File: file.raw, title: file.name},
      					Videoview: file.response.data.Videoview
      				}
      			)
      			// 防止刷新等其他情况的统一上传文件存放地
      			this.uploadingFiles.push(file.response.data.dataVideo, file.response.data.Videoview)
      		}
      		
      	}
      },
      // 删除上传的文件video
      handleRemoveVideo(file, fileList) { 
      	// 特别说明下：fileListVideo在修改时只做读取之用，不做写入（多个文件写入时会报错status值为null），上传组件会自己显示修改上传的文件
      	let _this = this, fileUrl = ''
        if (file.response === undefined) fileUrl = file.url
        if (file.response !== undefined) fileUrl = file.response.data.dataVideo
      	this.article.video.find((obj, index) => {
      		if (obj !== undefined) {
      			if (obj.dataVideo.url === fileUrl) {
      				// 删除文章video的
      				_this.article.video.splice(index,1)
      				// 统一删除变量里添加删除的文件路径
      				_this.deleteFiles.push(obj.dataVideo.url, obj.Videoview)
      			}
      		}
      	})
      },
      // 发布用户文章，把数组中的路径拼接成字符串,以及Uid、title发送给后台接口
      submitImg() {
        let _this = this
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
      	} else if(this.article.video.length === 0) {
      		this.$alert('请添加需要上传的视频文件', '警告', {
      			confirmButtonText: '确定'
      		})
      	} else {
      		this.loading = true
      		let img = this.article.img.length > 0 && this.article.img !== '[]' ? this.article.img : '[]'
          this.articleUpdate({
              mId:this.article.mId, 
              uId:this.article.uId, 
              pid:this.$store.getters.getUserProjectsId(this.projectImg).pid, 
              tid:this.$store.getters.getUserTypesId(this.typeImg).tid, 
              did:this.$store.getters.getUserMinTypeId(this.minTypeImg).did, 
              title:this.article.title.replace(/\s+/g," "), keyword:this.dynamicTags.toString(), 
              describe:this.article.describe.replace(/\s+/g," "), 
              img: img, 
              psd:'[]', 
              video: this.article.video, 
              typeFile:this.article.typeFile,
            })
            .then((response) => {
              if(response.code === 200) {
                _this.$message({type: 'success', message: response.msg})
                if(this.deleteFiles.length !== 0) {
                  _this.uploadingFiles = []
                  _this.deleteFiles.find((fileSrc, index) => {
                    _this.delfile({filesrc: fileSrc})
                  })
                }
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
      	if(this.title.length !== 0) {
      		let _this = this
      		this.getUpdateTitleRepeat({title:this.article.title, mId: this.article.mId})
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
      		    _this.$message.error(error.msg)
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
      // 返回文章列表页
      jumpUrl() {
      	this.$router.push('/backstage/seeArticle')
      },
      // 接受标签组件返回的值
      setDynamicTags (data) {
      	console.log("返回值：" + data)
      	this.dynamicTags = data
      }
    },
    created() {
      let _this = this
    	this.types = this.$store.state.common.publicInfo.types
    	this.projects = this.$store.state.common.publicInfo.projects
    	this.getAdminArticle({mId: this.$route.params.id})
    	  .then((response) => {
    	    if(response.code === 200) {
    	      _this.article = response.data
    	      let tags = _this.article.keyword.split(",")
    	      tags.find((e, index) => {
    	      	_this.dynamicTags.push(e)
    	      })
    	      _this.title = _this.article.title
    	      _this.projectImg = _this.article.xname
    	      _this.typeImg = _this.article.lname
    	      _this.did = _this.article.detailsid
    	      _this.minTypeImg = _this.article.dname
    	      _this.article.img = _this.article.img !== '[]' ? JSON.parse(_this.article.img) : new Array()
    	      _this.article.psd = _this.article.psd !== '[]' ? JSON.parse(_this.article.psd) : new Array()
    	      _this.article.video = _this.article.video !== '[]' ? JSON.parse(_this.article.video) : new Array()
    	      _this.article.typeFile === 'img' ? _this.imgDiv = true : _this.imgDiv = false
    	      _this.article.typeFile === 'psd' ? _this.psdDiv = true : _this.psdDiv = false
    	      _this.article.typeFile === 'video' ? _this.videoDiv = true : _this.videoDiv = false
    	      
    	      // 以下代码是针对element的上传组件在修改中对已上传的文件显示变量赋值
    	      var num = []
    	      if (response.data.typeFile === 'img') {
    	      	_this.fileList = response.data.img
    	      	if (_this.fileList !== '[]' && _this.fileList.length > 0) {
    	        	_this.fileList.find(obj => {
    	            	num[num.length] = {
    	      					name: obj.dataImg.name,
    	      					url: _this.URLS2 + obj.dataImg.url
    	      				}
    	        	})
    	        	_this.fileList = num
    	      	}
    	      } else if (response.data.typeFile === 'psd') {
    	      	_this.fileList = response.data.psd
    	      	_this.fileList.find(obj => {
    	          	num[num.length] = {
    	      				name: obj.dataPsd.name,
    	      				url: obj.dataPsd.url
    	      			}
    	      	})
    	      	_this.fileList = num
    	      } else if (response.data.typeFile === 'video') {
    	      	response.data.video.find(obj => {
    	          	_this.fileListVideo.push({
    	      				name: obj.dataVideo.name,
    	      				url: obj.dataVideo.url
    	      			})
    	      	})
    	      	if (response.data.img !== '[]') {
    	      		response.data.img.find(obj => {
    	            	_this.fileListImg.push({
    	      					name: obj.dataImg.name,
    	      					url: _this.URLS2 + obj.dataImg.url
    	      				})
    	        	})
    	      	}
    	      }
    	      _this.loading2 = false
    	    }
    	  })
    	  .catch(function (error) {
    	    _this.$message.error(error.msg)
    	  })
    	// 刷新页面时删除上传的文件
    	window.addEventListener('beforeunload', e => {
    		if(this.uploadingFiles.length !== 0) {
    			_this.uploadingFiles.find((fileSrc, index) => {
    			  _this.delfile({filesrc: fileSrc})
    			})
    		}
    	});
    },
    beforeDestroy() {
      let _this = this
    	// 注销页面时删除上传的文件
    	if(this.uploadingFiles.length !== 0) {
        _this.uploadingFiles.find((fileSrc, index) => {
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
.navs{width:100%;float:left}
.download{display:block;float:left;width:150px}
.psdList{width:50%;height:auto;margin:10px 0}
.psdList dd{height:35px;line-height:35px;color:#333;text-align:center;font-size:14px}
.psdList dd a,.psdList dd samp,.psdList dd span{display:block;float:left;height:35px;line-height:35px;text-align:center}
.psdList dd span{width:78%;text-align:left;padding-left:2%}
.psdList dd samp{width:10%}
.psdList dd a{width:10%}
.psdList dd a i,.psdList dd samp i{font-size:22px;line-height:35px;text-align:center}
.psdList dd:hover{background:#eee}
/*.shangchuan .el-upload-list,.shangchuan .el-upload-list--text{display:none !important;}*/
.el-tag+.el-tag{margin-left:10px}
.button-new-tag{margin-left:10px;height:32px;line-height:30px;padding-top:0;padding-bottom:0}
.input-new-tag{width:90px;margin-left:10px;vertical-align:bottom}
</style>
