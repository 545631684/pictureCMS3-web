<template>
  <div>
    <p class="imgName">AI：</p>
    <div class="imgs shangchuan" style="width: 40%;">
      <el-upload multiple style="" :limit="20" ref="newaiFile" accept=".ai" class="upload-demo newfiles" :action="action + '?id=7'" :on-remove="handleRemoveAi" :on-change="obtainImgSrc" :on-exceed="limitNum">
      	<el-button size="small" type="primary">点击上传.ai文件</el-button>
      	<div slot="tip" class="el-upload__tip">只能上传.ai格式文件，文件大小不要超过1GB</div>
      </el-upload>
    	<el-upload :multiple="true" :file-list="fileList" :limit="20" ref="aiFile" accept=".ai" class="upload-demo" :action="action + '?id=7'" :on-remove="handleRemoveAi" :on-change="obtainImgSrc" :on-exceed="limitNum">
    		<!-- <el-button size="small" type="primary">点击上传.ai文件</el-button>
    		<div slot="tip" class="el-upload__tip">只能上传.ai格式文件，文件大小不要超过1GB</div> -->
    	</el-upload>
    	<el-alert title="提示" description="📣一次最多上传20个.ai文件，超出部分会自动剔除" type="info" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesID, getMinTypesName } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    name: 'aiUpdate',
    props: ['articleAi'], // 接收父组件传值的方法
    components: {
    },
    data() {
      return {
        ai: [],
        fileALL: [],
        action: this.$store.state.common.publicInfo.srcUrl + '/u/upfile',
        // action: '/a' + '/u/upfile',
        uploadFiles: [],
        fileList: [],
      }
    },
    watch: {
      fileALL: function(newQuestion, oldQuestion) {
        // 关闭前 给父组件传递值
        this.$emit('aiData', this.fileALL)
        if(this.fileALL.length === 0){
          this.$refs.newaiFile.clearFiles()
          this.uploadFiles.splice(0, this.uploadFiles.length)
          this.fileList.splice(0, this.fileList.length)
        }
      },
      articleAi: function(newQuestion, oldQuestion) {
        let _this = this, num = []
        if(this.articleAi.length !== 0){
          _this.articleAi.find(obj => {
            	num[num.length] = {
          			name: obj.dataAi.name,
          			url: obj.dataAi.url
          		}
          })
          _this.fileALL = this.articleAi
          _this.fileList = num
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
      	if (this.fileALL.length > 20) {
      		this.$alert('最多上传20个.ai文件，你已超出限制！', '警告', {
      			confirmButtonText: '确定'
      		})
      	}
      },
      // 获取上传图片的服务器端实际路径地址并保存到数组中
      obtainImgSrc(file, fileList) {
      	let srcBoolean = false
      	if(file.response !== undefined) {
      		if(file.response.data.type === '7') {
      			// 使用视图更新方法赋值文章的ai，防止视图不更新的情况
      			// 这里也可以用数组的push()方法也可以保证视图的更新
      			this.$set(
      				this.ai,
      				this.ai.length, {
      					dataAi: {size: file.size, name: file.name, url: file.response.data.dataAi, type: file.raw.type, File: file.raw, title: file.name},
      				}
      			)
            this.$set(
      				this.fileALL,
      				this.fileALL.length, {
      					dataAi: {size: file.size, name: file.name, url: file.response.data.dataAi, type: file.raw.type, File: file.raw, title: file.name},
      				}
      			)
      			// 防止刷新等其他情况的统一上传文件存放地
            this.$emit('uploadFile', [file.response.data.dataAi])
      		}

      	}
      },
      // 删除上传的文件ai
      handleRemoveAi(file, fileList) {
      	// 特别说明下：fileList在修改时只做读取之用，不做写入（多个文件写入时会报错status值为null），上传组件会自己显示修改上传的文件
      	let _this = this, fileUrl = ''
        if (file.response === undefined) fileUrl = file.url
        if (file.response !== undefined) fileUrl = file.response.data.dataAi
      	this.ai.find((obj, index) => {
      		if (obj !== undefined) {
      			if (obj.dataAi.url.indexOf(fileUrl) !== -1) {
      				// 删除文章video的
      				_this.ai.splice(index,1)
      			}
      		}
      	})

        this.fileList.find((obj, index) => {
        	if (obj !== undefined) {
        		if (obj.url.indexOf(fileUrl) !== -1) {
        			_this.fileList.splice(index,1)
        		}
        	}
        })

        this.fileALL.find((obj, index) => {
        	if (obj !== undefined) {
        		if (obj.dataAi.url.indexOf(fileUrl) !== -1) {
        			// 删除文章video的
        			_this.fileALL.splice(index,1)
        			// 统一删除变量里添加删除的文件路径
              _this.$emit('deleteFileType', [obj.dataAi.url])
        		}
        	}
        })
      },
    },
    created() {},
    beforeDestroy() {}
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
.newfiles /deep/ .el-upload-list{display:none}
</style>
