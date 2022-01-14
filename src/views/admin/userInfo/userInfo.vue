<template flex="main:center cross:center">
    <el-card  style="width: 500px; height: 500px; margin: 0 auto;">
      <UP class="upload-cover" 
        :default-img="userInfo.headPortraitSrc"
        ratio="1"
        WHRatio="1"
        maxWidth="100"
        maxHeight="100"
        tip="上传头像"
        maxSize="2"
        @uploadSuccess="uploadAvatar"></UP>
      <el-input placeholder="请输入内容" :disabled="true" v-model="userInfo.userName">
        <template slot="prepend">账号</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="userInfo.nickname" clearable maxlength="10" show-word-limit>
        <template slot="prepend">昵称</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="userInfo.sex" clearable show-word-limit>
        <template slot="prepend">性别</template>
      </el-input>
      <el-input placeholder="请输入内容" :disabled="true" v-model="userInfo.registerTime" >
        <template slot="prepend">注册</template>
      </el-input>
      <el-input placeholder="请输入内容" :disabled="true" v-model="userInfo.endTime" >
        <template slot="prepend">最后登录</template>
      </el-input>
       <el-button type="primary" @click="setUserInfo()" style="display: block; margin: 20px auto;">更新</el-button>
    </el-card>
</template>

<script>
  import UP from 'COMMON/upload/upCover.vue'
  import { formatDate } from 'UTIL/publicAPI'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
      UP
    },
    data() {
      return {
        userInfo:this.$store.state.admin.adminInfo,
        userInfo2:{},
        params: {
          blogName: '',
          avatar: '',
          sign: '',
          wxpayQrcode: '',
          alipayQrcode: '',
          github: '',
          sign: '',
          settingPassword: false,
          viewPassword: '',
          oldPassword: ''
        },
        newPassword: '',
        hadOldPassword: false,
        uploadFile:[]
      }
    },
    watch: {
      'userInfo.sex':function (newQuestion, oldQuestion) {
        if (this.userInfo.sex === 1 || this.userInfo.sex === 1) this.userInfo.sex = '男'
        if (this.userInfo.sex === 0 || this.userInfo.sex === 0) this.userInfo.sex = '女'
      }
    },
    methods: {
      ...mapActions([
        'userSave',
        'delfile',
        'setAdminInfo',
        'setOperationInfo'
      ]),
      formatDates(time) { // 时间戳转换
        if(time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return '暂无'
        }
      },
      setUserInfo () {
        if (this.userInfo.sex.replace(/\s*/g,"").length === 0) {
          this.$alert('请填写性别', {confirmButtonText: '确定'})
        } else if(this.userInfo.sex !== '男' && this.userInfo.sex !== '女'){
          this.$alert('请填写性别:‘男’或‘女’', {confirmButtonText: '确定'})
        } else if(this.userInfo.nickname.replace(/\s*/g,"").length === 0){
          this.$alert('请填写昵称', {confirmButtonText: '确定'})
        } else if(this.userInfo.headPortraitSrc.length === 0){
          this.$alert('请上传头像', {confirmButtonText: '确定'})
        } else {
          let _this = this, sex = null
          if (this.userInfo.sex === '男') sex = 1
          if (this.userInfo.sex === '女') sex = 0
          this.userSave({uId:this.userInfo.uId, headPortraitSrc:this.userInfo.headPortraitSrc, nickname: this.userInfo.nickname, sex: sex })
            .then((response) => {
              if(response.code === 200) {
                _this.setOperationInfo({_this:_this, type:5, user:{uId:this.userInfo.uId, headPortraitSrc:this.userInfo.headPortraitSrc, nickname: this.userInfo.nickname, sex: sex }})
                _this.$message({message: response.msg, type: 'success'})
                _this.uploadFile.find((fileSrc, index) => {
                  if (_this.userInfo.headPortraitSrc === fileSrc) _this.uploadFile.splice(index,1)
                })
                if (_this.uploadFile.length !== 0){
                  _this.uploadFile.find((fileSrc, index) => {
                    _this.delfile({filesrc: fileSrc})
                  })
                }
                _this.setAdminInfo({uId:_this.userInfo.uId})
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
        }
        
      },
      uploadAvatar(data) {
        this.userInfo.headPortraitSrc = data.dataImg
        this.uploadFile.push(data.dataImg)
      },
    },
    created() {
      this.userInfo = this.$store.state.admin.adminInfo
      this.userInfo.registerTime = this.formatDates(this.userInfo.registerTime)
      this.userInfo.endTime = this.formatDates(this.userInfo.endTime)
      if (this.userInfo.sex === 1 || this.userInfo.sex === 1) this.userInfo.sex = '男'
      if (this.userInfo.sex === 0 || this.userInfo.sex === 0) this.userInfo.sex = '女'
      this.userInfo2 = JSON.stringify(this.$store.state.admin.adminInfo)
      this.userInfo2 = JSON.parse(this.userInfo2)
      // 刷新页面时删除上传的文件
      let _this = this
      window.addEventListener('beforeunload', e => {
        if (_this.uploadFile.length !== 0){
          _this.uploadFile.find((fileSrc, index) => {
            _this.delfile({filesrc: fileSrc})
          })
        }
      });
    },
    beforeDestroy () {
      let _this = this
      if (this.uploadFile.length !== 0){
        this.uploadFile.find((fileSrc, index) => {
          _this.delfile({filesrc: fileSrc})
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.el-input{margin: 5px auto;}
.edit-wrap{animation:show .8s;padding:10px;display:flex;flex-direction:row;flex-wrap:wrap;max-width:400px;margin:0 auto;border:1px solid #eee;justify-content:center}
.edit-wrap .upload-cover{margin-bottom:10px;margin-right:10px}
.edit-wrap .input-title{margin-bottom:10px}
.edit-wrap .label-wrap{color:#606266;font-size:14px;width:100%;margin-bottom:10px}
@keyframes show{from{margin-top:-10px;opacity:0}to{margin-top:0;opacity:1}}
</style>
