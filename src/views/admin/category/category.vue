<template>
  <el-tabs style="height: 91vh;" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane>
      <span slot="label" name="xm"><i class="iconfont icon-fenleiguanli"></i> 项目（一级）</span>
      <modulesProject></modulesProject>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="lx"><i class="iconfont icon-xuanzeleixing"></i> 类型（二级）</span>
    	<modulesType></modulesType>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="fl"><i class="iconfont icon-fenleiguanli1"></i> 分类（三级）</span>
    	<modulesClassify></modulesClassify>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="bqz"><i class="iconfont icon-biaoqian"></i> 标签组（四级）</span>
    	<modulesLabelGroup></modulesLabelGroup>
    </el-tab-pane>
    <el-tab-pane>
    	<span slot="label" name="bq"><i class="iconfont icon-biaoqian"></i> 标签（四级）</span>
    	<modulesLabel></modulesLabel>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import modulesProject from 'VIEWS/admin/category/modules/project'
  import modulesType from 'VIEWS/admin/category/modules/type'
  import modulesClassify from 'VIEWS/admin/category/modules/classify'
  import modulesLabelGroup from 'VIEWS/admin/category/modules/labelGroup'
  import modulesLabel from 'VIEWS/admin/category/modules/label'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'category',
    components: {
      modulesProject,
      modulesType,
      modulesClassify,
      modulesLabelGroup,
      modulesLabel
    },
    data() {
      return {
        activeName: JSON.parse(sessionStorage.getItem("backstageActiveName")) || "0"
      }
    },
    watch: {
    	// 监听activeName值得变化并存储到本地存储中
      	activeName: function(newQuestion, oldQuestion) {
          sessionStorage.setItem("backstageActiveName", JSON.stringify(this.activeName))
        },
    },
    methods: {
      // 获取本地存储选项卡参数
      localStorageGet () {
        this.activeName = JSON.parse(sessionStorage.getItem("backstageActiveName")) || "0"
      },
      // 点击选项卡事件
      handleClick(tab, event) {
	        console.log(tab, event);
      }
    },
    created() {
      // 获取本地存储选项卡参数
      let _this = this
      window.setTimeout(() => {_this.localStorageGet()}, 2000)
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
