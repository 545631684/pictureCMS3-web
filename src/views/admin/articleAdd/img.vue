<template>
  <div>
    <p class="imgName">图片：<br /><span style="display: block;width: 67px;float: right; text-align: center;font-size: 12px;">{{imgCrss.length}}/130</span></p>
    <div class="imgs">
    	<el-upload :limit="130" ref="fliesImg" :multiple="true" accept=".jpg,.png,.gif" :action="action + '?id=1'" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="obtainImgSrc" :on-progress="progress" :on-exceed="limitNum">
    		<div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传图片<br />（.jpg/.png/.gif）</div>
    	</el-upload>
    	<el-dialog :visible.sync="dialogVisible">
    	</el-dialog>
    		<img width="100%" :src="dialogImageUrl" alt="">
    	<!-- <el-alert title="提示" description="※上传第一个文件时会自动获取文件名称并填写到标题。" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert> -->
    	<el-alert title="提示" description="※上传图片出现显示不在正上方显示,请不用担心,发布后不会影响正常显示" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
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
        dialogImageUrl: '',
        dialogVisible: false,
        imgCrss: [],
        action: this.$store.state.common.publicInfo.srcUrl + 'u/upfile',
        // action: '/a' + '/u/upfile',
        uploadFiles: [],
        dynamicTags: [],
        uploadFilesJudge: {expect: 0, actual: 0},
      }
    },
    watch: {
      imgCrss: function(newQuestion, oldQuestion) {
        // 关闭前 给父组件传递值
        this.$emit('imgData', this.imgCrss);
        if(this.imgCrss.length === 0){
          this.$refs.fliesImg.clearFiles()
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
        if (fileList.length > 130) {
          this.$alert('最大上传130张图片，你已超出限制！', '警告', {
            confirmButtonText: '确定'
          })
        }
      },
      // 点击上传函数
      progress (event, file, fileList) {
        this.uploadFiles.expect = fileList.length
      },
      // 获取上传图片的服务器端实际路径地址并保存到数组中
      obtainImgSrc(file, fileList) {
        let srcBoolean = false, _this = this
        if(file.response !== undefined) {
          if(file.response.data.type === '1') {
            fileList.find((obj, index) => {
              _this.imgCrss[index] === file.response.data.dataImg ? srcBoolean = srcBoolean : srcBoolean = true
            })
            if(srcBoolean) {
              this.imgCrss.push({
                dataImg: { size: file.size, name: file.name, url: file.response.data.dataImg, type: file.raw.type, File: file.raw, title: file.name},
                miniImg: file.response.data.miniImg
              })
              this.uploadFiles.push(file.response.data.dataImg, file.response.data.miniImg)
							// 返回父组件文件名称作为标题使用
							_this.$emit('setTitle', file.name)
            }
          }
        }
      },
      // 删除上传的图片
      handleRemove(file, fileList) {
        // 返回给上级删除参数
        this.$emit('deleteFileType', [file.response.data.dataImg, file.response.data.miniImg])
        // 删除文件
        this.delfile({filesrc: file.response.data.dataImg})
        this.delfile({filesrc: file.response.data.miniImg})
        // 删除uploadFiles上传变量里的当前图片
        this.setuploadFiles(file.response.data.dataImg)
        this.setuploadFiles(file.response.data.miniImg)
        // 删除imgCrss上传变量里的当前图片
        this.deleteFiles(file.response.data.dataImg, file.response.data.miniImg, 'img')
      },
      // 查看上传的图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 删除uploadFiles上传变量里的当前图片
      setuploadFiles(src) {
        let _this = this
        this.uploadFiles.find((obj, index) => {
          if (obj === src) {
            _this.uploadFiles.splice(index, 1)
          }
        })
      },
      // 删除imgCrss上传变量里的当前图片
      deleteFiles(dataSrc, miniSrc, type) {
        let _this = this
        this.imgCrss.find((obj, index) => {
          if (obj !== undefined) {
            if (obj.dataImg.url === dataSrc && obj.miniImg === miniSrc) {
              _this.imgCrss.splice(index, 1)
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

.fileType /deep/ .el-checkbox{margin-bottom: 5px;}
</style>
