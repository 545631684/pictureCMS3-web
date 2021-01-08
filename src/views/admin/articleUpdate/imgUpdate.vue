<template>
  <div>
    <p class="imgName">图片：<br /><span style="display: block;width: 67px;float: right; text-align: center;font-size: 12px;">{{fileALL.length}}/130</span></p>
    <div class="imgs shangchuan2">
    	<div class="clearfix"></div>
    	<el-upload class="clearfix files" :file-list="fileList" :limit="130" :multiple="true" ref="fliesImg" accept=".jpg,.png,.gif" :action="action + '?id=1'" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="obtainImgSrc" :on-exceed="limitNum" >
    		<!-- <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传图片<br />（.jpg/.png/.gif）</div> -->
    	</el-upload>
      <el-upload class="newfiles" :limit="130" ref="newfliesImg" :multiple="true" accept=".jpg,.png,.gif" :action="action + '?id=1'" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="obtainImgSrc" :on-exceed="limitNum">
        <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传图片<br />（.jpg/.png/.gif）</div>
      </el-upload>
    	<el-alert title="提示" description="📣一次最多上传130张图片，超出部分会自动剔除" type="info" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
    	<el-dialog :visible.sync="dialogVisible">
    		<img width="100%" :src="dialogImageUrl" alt="">
    	</el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesID, getMinTypesName } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    props: ['articleImg'], // 接收父组件传值的方法
    name: 'imgUpdate',
    components: {
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        img: [],
        fileList: [],
        fileALL:[],
        action: this.$store.state.common.publicInfo.srcUrl + '/u/upfile',
        // action: '/a' + '/u/upfile',
        uploadFiles: [],
        dynamicTags: [],
        uploadFilesJudge: {expect: 0, actual: 0},
        URLS2: this.$store.state.common.publicInfo.srcUrl,
      }
    },
    watch: {
      fileALL: function(newQuestion, oldQuestion) {
        // 关闭前 给父组件传递值
        this.$emit('imgData', this.fileALL);
        if(this.fileALL.length === 0){
          this.$refs.newfliesImg.clearFiles()
          this.uploadFiles.splice(0, this.uploadFiles.length)
          this.fileList.splice(0, this.fileList.length)
        }
      },
      articleImg: function(newQuestion, oldQuestion) {
        let _this = this, num = []
        if(this.articleImg.length !== 0){
          _this.articleImg.find(obj => {
            	num[num.length] = {
          			name: obj.dataImg.name,
          			url: _this.URLS2 + obj.dataImg.url
          		}
          })
          _this.fileALL = this.articleImg
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
        if (this.fileALL.length > 130) {
          this.$alert('最大上传130张图片，你已超出限制！', '警告', {
            confirmButtonText: '确定'
          })
        }
      },
      // 获取上传图片的服务器端实际路径地址并保存到数组中
      obtainImgSrc(file, fileList) {
      	let srcBoolean = false
      	console.log(file)
      	if(file.response !== undefined) {
      		if(file.response.data.type === '1') {
      			// 防止重复文件名上传
      			this.img.length !== 0 ? this.img.find(obj => {obj.dataImg.url === file.response.data.dataImg ? srcBoolean = false : srcBoolean = true}) : srcBoolean = true
      			if(srcBoolean) {
      				// 文章的img赋值
      				this.img.push({
      					dataImg: { size: file.size.toString(), name: file.name, url: file.response.data.dataImg, type: file.raw.type, File: file.raw, title: file.name},
      					miniImg: file.response.data.miniImg
      				})
              this.fileALL.push({
      					dataImg: { size: file.size.toString(), name: file.name, url: file.response.data.dataImg, type: file.raw.type, File: file.raw, title: file.name},
      					miniImg: file.response.data.miniImg
      				})
      				// 防止刷新等其他情况的统一上传文件存放地
      				this.$emit('uploadFile', [file.response.data.dataImg, file.response.data.miniImg]);
      			}
      		}
      	}
      },
      // 删除上传的文件img
      handleRemove(file, fileList) {
      	let fileUrl = '', _this = this
      	// img需要展示 则必须把域名部分删除 http://192.168.0.130:81/
        if (file.url !== undefined) fileUrl = file.url.substring(this.$store.state.common.publicInfo.srcUrl.length)
        if (file.response !== undefined) fileUrl = file.response.data.dataImg
      	this.img.find((obj, index) => {
      		if (obj !== undefined) {
      			if (obj.dataImg.url.indexOf(fileUrl) !== -1) {
      				_this.img.splice(index,1)
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
        		if (obj.dataImg.url.indexOf(fileUrl) !== -1) {
        			_this.fileALL.splice(index,1)
              _this.$emit('deleteFileType', [obj.dataImg.url, obj.miniImg]);
        		}
        	}
        })
      },
      // 查看上传的图片
      handlePictureCardPreview(file) {
      	this.dialogImageUrl = file.url
      	this.dialogVisible = true
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
.shangchuan2 .el-upload-list,.shangchuan2 .el-upload-list--text{display:block !important;}
.shangchuan2 .clearfix ul li{ position: initial; display: block; float: left;}
.el-tag+.el-tag{margin-left:10px}
.button-new-tag{margin-left:10px;height:32px;line-height:30px;padding-top:0;padding-bottom:0}
.input-new-tag{width:90px;margin-left:10px;vertical-align:bottom}

.fileType /deep/ .el-checkbox{margin-bottom: 5px;}
.files /deep/ .el-upload--picture-card{display:none}
.newfiles /deep/ .el-upload-list{display:none}
</style>
