<template>
  <el-container class="login">
    <el-main style="display: flex; justify-content: center; align-items: center;">
      <div class="body" >
        <h1>赛奇<br /><span>因你而精彩</span></h1>
        <div class="mk1">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" class="" >
            <el-form-item label="" prop="email">
              <el-input v-model="ruleForm.email" type="email" placeholder="请输入邮箱/用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="pw">
              <el-input v-model="ruleForm.pw" type="password" placeholder="请输入密码" clearable @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
                <router-link class="" tag="a" :to="{path:'/retrieveUser'}"><el-button type="text" style="float: right;">忘记密码？</el-button></router-link>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;" :loading="loading">登录</el-button>
            </el-form-item>
          </el-form>
          <!-- <router-link class="mk1_a1" tag="a" :to="{path:'/enrollUser'}">没有账号？<b>注册</b></router-link> -->
        </div>
        <div class="foot_info">
          <a href="http://www.beian.miit.gov.cn/">备案号：XXXX</a>
          <p>联系邮箱：545631684@qq.com</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
	import { cachedKeysData, cachedAdminInfo, cachedWebInfo, cachedPublicInfo} from 'API/cacheService'
  export default {
    inject: ['reload'],
    name: 'login',
    data() {
      return {
				loading:false,
        ruleForm: {
          email: '',
          pw: '',
          type: false
        },
        rules: { // 邮箱和密码的判断条件
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
              message: '你是在逗我玩么？输入这么多！？',
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
          ]
        }
      }
    },
		watch: {
			'ruleForm.type': function (val, oldVal) {
				let adminInfo = cachedAdminInfo.load()
				adminInfo.setPasswordStyle = val.toString()
				cachedAdminInfo.save(adminInfo)
			},
		},
    methods: {
      ...mapActions([
        'webLogin',
        'setOperationInfo'
      ]),
      // 登录提交
      submitForm (formName) { 
        let _this = this
				this.loading = true
      	if (this.ruleForm.email === 'admin' && this.ruleForm.pw.length !== 0) {
        	this.webLogin({userName: this.ruleForm.email, password: this.ruleForm.pw, 'setPasswordStyle': this.ruleForm.type })
            .then(function (response) {
              if (response.code === 200 && response.data.adminInfo.userName === _this.ruleForm.email) {
                _this.loading = false
								_this.setOperationInfo({_this:_this, type:27})
                _this.$message({message: response.msg, type: 'success'})
                _this.$router.push('/backstage')
              }
            })
            .catch(function (error) {
							_this.loading = false
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
      	} else {
      		this.$refs[formName].validate((valid) => {
      		  if (valid) {
      		    this.webLogin({userName: this.ruleForm.email, password: this.ruleForm.pw, 'setPasswordStyle': this.ruleForm.type })
      		      .then(function (response) {
      		        if (response.code === 200 && response.data.adminInfo.userName === _this.ruleForm.email) {
										_this.loading = false
                    _this.setOperationInfo({_this:_this, type:27})
      		          _this.$message({message: response.msg, type: 'success'})
      		          _this.$router.push('/backstage')
      		        }
      		      })
      		      .catch(function (error) {
									_this.loading = false
      		        _this.$alert(error, {confirmButtonText: '确定'})
      		      })
      		  } else {
							_this.loading = false
      		    this.$alert('请输入邮箱和密码', '警告', {confirmButtonText: '确定'})
      		    return false;
      		  }
      		})
      	}
      }
    },
    created () {
      // 判断vuex中setPasswordStyle（记住密码）的值做页面显示
      this.$store.state.admin.adminInfo.setPasswordStyle === 'true' ? this.ruleForm = {
          email: this.$store.state.admin.adminInfo.userName,
          pw: this.$store.state.admin.adminInfo.password,
          type: true
        } : this.ruleForm = {
          email: '',
          pw: '',
          type: false
        }
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.foot_info{width:600px;height:auto;line-height:1.5;text-align:center;font-size:18px;color:#fff;position:absolute;bottom:10px;left:50%;margin-left:-300px}
.foot_info a{color:#fff;text-decoration:none}
.foot_info a:hover{color:#f00000}
.login{height:100vh;background:url('~IMAGES/beiji.jpg') 100% no-repeat;}
.el-main{position:relative;}
.body{width:432px;height:504px;background:#FFF;border-radius:5px;}
.body h1{color:@color-dark-blue;padding:20px 0;text-align:center;font-size:50px;}
.body h1 span{margin-top:15px;color:@color-dark-blue;font-size:22px;text-indent:22px;letter-spacing:20px;display:block;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue','PingFang SC','Microsoft YaHei','Source Han Sans SC','Noto Sans CJK SC','WenQuanYi Micro Hei',sans-serif;}
.mk1{padding:0 40px;}
.mk1_a1{align-items:center;justify-content:center;width:100%;height:58px;font-size:16px;display:block;text-align:center;line-height:58px;margin-top:65px;}
.mk1_a1 b{color:@color-dark-blue;}
</style>
