<template>
  <div>
    <p class="imgName">压缩包：</p>
    <div class="imgs" style="width: 40%;">
    	<el-upload multiple style="" :limit="20" ref="videoFile" accept=".rar,.zip" class="upload-demo" :action="action + '?id=8'" :on-remove="handleRemove3" :on-change="obtengineeringImgSrc" :on-exceed="limitNum">
    		<el-button size="small" type="primary">点击上传压缩包</el-button>
    		<div slot="tip" class="el-upload__tip">只能上传.rar,.zip格式文件，文件大小不要超过1GB</div>
    	</el-upload>
    	<el-alert title="提示" description="※上传第一个文件时会自动获取文件名称并填写到标题。※一次最多上传20个压缩包，超出部分会自动剔除" type="info" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesID, getMinTypesName } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
    },
    data() {
      return {
        engineering: [],
        action: this.$store.state.common.publicInfo.srcUrl + 'u/upfile',
        // action: '/a' + '/u/upfile',
        uploadFiles: [],
      }
    },
    watch: {
      engineering: function(newQuestion, oldQuestion) {
        // 关闭前 给父组件传递值
        this.$emit('engineeringData', this.engineering)
        if(this.engineering.length === 0){
          this.$refs.videoFile.clearFiles()
          this.uploadFiles.splice(0, this.uploadFiles.length)
        }
      }
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
      	if (fileList.length > 20) {
      		this.$alert('最多上传20个.rar,.zip文件，你已超出限制！', '警告', {
      			confirmButtonText: '确定'
      		})
      	}
      },
      // 获取上传图片的服务器端实际路径地址并保存到数组中
      obtengineeringImgSrc(file, fileList) {
      	let srcBoolean = false, _this = this
      	if(file.response !== undefined) {
      		if(file.response.data.type === '8') {
      			this.engineering.push({
      				file: {size: file.size, name: file.name, url: file.response.data.file, type: file.raw.type, File: file.raw, title: file.name},
      			})
      			this.uploadFiles.push(file.response.data.file)
						// 返回父组件文件名称作为标题使用
						_this.$emit('setTitle', file.name)
      		}

      	}
      },
      // 删除上传的engineering文件
      handleRemove3(file, fileList) {
        // 返回给上级删除参数
        this.$emit('deleteFileType', [file.response.data.file])
        this.delfile({filesrc: file.response.data.file})
      	this.setuploadFiles(file.response.data.file)
      	this.deleteFiles(file.response.data.file, '', 'engineering')
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
      	if(type === 'engineering') {
      		this.engineering.find((obj, index) => {
      			obj.file.url === dataSrc ? _this.engineering.splice(index, 1) : obj = obj
      		})
      	}
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
</style>
