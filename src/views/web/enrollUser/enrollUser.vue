<template>
  <el-container class="login">
    <el-main>
      <div class="body">
        <h1>赛奇<br /><span>因你而精彩</span></h1>
        <div class="mk1">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" class="">
            <el-form-item label="" prop="email">
              <el-input v-model="ruleForm.email" type="email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pw">
              <el-input v-model="ruleForm.pw" type="password" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="yzm" inline="true">
              <el-input v-model="ruleForm.yzm" type="text" placeholder="请输入验证码" style="width: 65%; margin-right: 5%; float: left;" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              <el-button type="primary" :disabled="yzmbr" @click="gitVerification" style="width: 30%; float: right;padding: 12px 0px;">{{yzmHtml}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">注册</el-button>
            </el-form-item>
          </el-form>
          <router-link class="mk1_a1" tag="a" :to="{path:'/login'}">已有账号？<b>登录</b></router-link>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { cachedPublicInfo,  } from 'API/cacheService'
  export default {
    name: 'enrollUser',
    data() {
      return {
        returnTime: {},
        yzmbr: false,
        yzmHtml: "获取验证码",
        ruleForm: {
          email: '',
          pw: '',
          yzm: ''
        },
        rules: {
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: ['blur', 'change']
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            },
            {
              max: 50,
              message: '你是在逗我玩么？输入这么多干嘛！？',
              trigger: ['blur', 'change']
            }
          ],
          pw: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              pattern: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/,
              message: '输入密码过于简单请重新输入（数字、首字母大写、字母三选二）',
              trigger: ['blur', 'change']
            },
            {
              max: 50,
              message: '你是在逗我玩么？输入这么多！？',
              trigger: ['blur', 'change']
            }
          ],
          yzm: [{
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            },
            {
              max: 6,
              message: '验证码为6位数，请重新输入',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'webUserAdd',
        'send',
        'emailrepeat'
      ]),
      // 注册方法
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.webUserAdd({userName: this.ruleForm.email, password: this.ruleForm.pw, verification: this.ruleForm.yzm})
              .then(function (response) {
                if (response.code === 200 && response.data === '4') {
                  _this.$message({message: response.msg, type: 'success'})
                  _this.$router.push('/login')
                }
              })
              .catch(function (error) {
                _this.$alert(error.msg, {confirmButtonText: '确定'})
              })
          } else {
            this.$alert('请输入完整信息后再提交', '警告', {confirmButtonText: '确定'})
            return false;
          }
        })
      },
      gitVerification() {
        let _this = this
        if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.ruleForm.email)){
          this.countdown(59)
          this.emailrepeat({userName: this.ruleForm.email})
            .then(function (response) {
              if (response.data === '1') {
                _this.send({to: _this.ruleForm.email})
                  .then(function (response) {
                    _this.$message({message: response.msg, type: 'success'})
                  })
                  .catch(function (error) {
                    _this.$message({message: error.msg, type: 'success'})
                  })
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, '警告', {confirmButtonText: '确定'})
              // 去除读秒参数
              window.clearInterval(_this.returnTime)
              localStorage.setItem("retrieveUserWait", 0)
            })
        } else {
          this.$alert('请输入邮箱', '警告', {confirmButtonText: '确定'})
        }
      },
      countdown (wait) {
        var _this = this
        _this.returnTime = {}
        _this.returnTime = setInterval(function () {
          if (wait !== 0) {
            _this.yzmbr = true
            _this.yzmHtml = '重新发送(' + wait + ')'
            wait--
            localStorage.setItem("retrieveUserWait", wait)
          } else {
            _this.yzmbr = false
            _this.yzmHtml = '获取验证码'
            window.clearInterval(_this.returnTime)
            localStorage.setItem("retrieveUserWait", 0)
          }
        }, 1000)
      }
    },
    created () {
      if(localStorage.getItem("retrieveUserWait") > 1) {
        this.yzmbr = true
        this.yzmHtml = '重新发送(' + localStorage.getItem("retrieveUserWait") + ')'
        this.countdown(localStorage.getItem("retrieveUserWait"))
      }
    },
    beforeDestroy () {
      window.clearInterval(this.returnTime)
      this.returnTime = null
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.login{height:100vh;background:url('~IMAGES/beiji.jpg') 100% no-repeat;}
.el-main{position:relative}
.body{width:432px;height:504px;background:#FFF;border-radius:5px;position:absolute;top:50%;left:50%;margin-left:-216px;margin-top:-252px}
.body h1{color:@color-dark-blue;padding:20px 0;text-align:center;font-size:50px}
.body h1 span{margin-top:15px;color:@color-dark-blue;font-size:22px;text-indent:22px;letter-spacing:20px;display:block;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue','PingFang SC','Microsoft YaHei','Source Han Sans SC','Noto Sans CJK SC','WenQuanYi Micro Hei',sans-serif}
.mk1{padding:0 40px}
.mk1_a1{align-items:center;justify-content:center;width:100%;height:58px;font-size:16px;display:block;text-align:center;line-height:58px;margin-top:70px}
.mk1_a1 b{color:@color-dark-blue}
</style>