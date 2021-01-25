<template>
  <el-tabs style="height: 91vh;" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane>
      <span slot="label" name="xm"><i class="iconfont icon-fenleiguanli"></i> 项目（一级）</span>
      <modulesProject v-if="activeName === '0'"></modulesProject>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="lx"><i class="iconfont icon-xuanzeleixing"></i> 类型（二级）</span>
    	<modulesType v-if="activeName === '1'"></modulesType>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="fl"><i class="iconfont icon-fenleiguanli1"></i> 分类（三级）</span>
    	<modulesClassify v-if="activeName === '2'"></modulesClassify>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="bqz"><i class="iconfont icon-biaoqianzu"></i> 标签组（四级）</span>
    	<modulesLabelGroup v-if="activeName === '3'"></modulesLabelGroup>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="bq"><i class="iconfont icon-biaoqian"></i> 标签（四级）</span>
    	<modulesLabel v-if="activeName === '4'"></modulesLabel>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="ysfl"><i class="iconfont icon-yinsisuoding"></i> 隐私分类</span>
    	<modulesPrivacyType v-if="activeName === '5'"></modulesPrivacyType>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import modulesProject from 'VIEWS/admin/category/modules/project'
  import modulesType from 'VIEWS/admin/category/modules/type'
  import modulesClassify from 'VIEWS/admin/category/modules/classify'
  import modulesLabelGroup from 'VIEWS/admin/category/modules/labelGroup'
  import modulesLabel from 'VIEWS/admin/category/modules/label'
  import modulesPrivacyType from 'VIEWS/admin/category/modules/privacyType'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'category',
    components: {
      modulesProject,
      modulesType,
      modulesClassify,
      modulesLabelGroup,
      modulesLabel,
      modulesPrivacyType
    },
    data() {
      return {
        activeName: JSON.parse(sessionStorage.getItem("backstageActiveName")) || "0",
      }
    },
    watch: {
    	// 监听activeName值得变化并存储到本地存储中
      	activeName: function(newQuestion, oldQuestion) {
          sessionStorage.setItem("backstageActiveName", JSON.stringify(this.activeName))
        },
    },
    methods: {
      ...mapActions([
        'getPublicInfo',
      ]),
      // 获取本地存储选项卡参数
      localStorageGet () {
        this.activeName = JSON.parse(sessionStorage.getItem("backstageActiveName")) || "0"
      },
      // 点击选项卡事件
      handleClick(tab, event) {
	        // console.log(tab, event);
      }
    },
    created() {
      // 获取本地存储选项卡参数
      let _this = this
      window.setTimeout(() => {_this.localStorageGet()}, 2000)
      // this.getPublicInfo({types:'leixin:projects,types,details,groupLabel,label,privacyType,user'})
      //   .then(function (response) {
      //     if (response.code === 200 && response.data !== '') {
      //       if (response.data.groupLabel !== "[]" && response.data.groupLabel.length !== 0) {
      //         response.data.groupLabel.find((o, index)=>{
      //          _this.$set(_this.groupLabel.data, _this.groupLabel.data.length, o)
      //         })
      //       }
      //       if (response.data.label !== "[]" && response.data.label.length !== 0) {
      //         response.data.label.find((o, index)=>{
      //          _this.$set(_this.label.data, _this.label.data.length, o)
      //         })
      //       }
      //       if (response.data.projects !== "[]" && response.data.projects.length !== 0) {
      //         response.data.projects.find((o, index)=>{
      //          _this.$set(_this.project.data, _this.project.data.length, o)
      //         })
      //         _this.project.data.find((obj, index) => {
      //         	_this.project.souData.push({
      //         		"value": obj.xname,
      //         		"address": obj.pid
      //         	})
      //         })
      //       }
      //       if (response.data.types !== "[]" && response.data.types.length !== 0) {
      //         response.data.types.find((o, index)=>{
      //          _this.$set(_this.types.data, _this.types.data.length, o)
      //         })
      //         _this.types.data.find((obj, index) => {
      //         	_this.types.souData.push({
      //         		"value": obj.lname,
      //             "address": obj.tid
      //         	})
      //         })
      //       }
      //       if (response.data.details !== "[]" && response.data.details.length !== 0) {
      //         response.data.details.find((o, index)=>{
      //          _this.$set(_this.details.data, _this.details.data.length, o)
      //         })
      //         _this.details.data.find((obj, index) => {
      //         	_this.details.souData.push({
      //         		"value": obj.dname,
      //             "address": obj.did
      //         	})
      //         })
      //       }
      //       response.data.users.find((o, index)=>{
      //        _this.$set(_this.users, _this.users.length, o)
      //       })
      //     }

      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
