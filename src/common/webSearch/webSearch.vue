<template>
  <el-container>
  	<el-main>
  		<div class="w910">
  			<el-popover style="float: left; margin-right: 20px; padding: 0;" placement="bottom-start" width="900" trigger="hover" :after-enter="show()">
  				<div class="label">
  					<div class="clearfix" >
  						<el-tabs :tab-position="tabPosition" style="">
  						    <el-tab-pane :label="item.name" v-for="(item, index) in groupLabel" :key="index" @mouseenter="leave()" v-if="item.state === '1' && item.webShow === '1'">
                    <div class="tabs" v-bind:style="{'max-height': maxHeight + 'px'}" v-if="item.name !== '耳鼻喉病种'">
                      <samp class="label_samp" v-for="(label, index) in item.lid" :key="index" @click="searchLabel(label.name)" v-if="label.state === '1' && label.webShow === '1'">{{label.name}}</samp>
                    </div>
                    <div class="tabs" v-bind:style="{'max-height': maxHeight + 'px'}" v-if="item.name === '耳鼻喉病种'">
                      <div style="">
                        <b style="font-size: 20px; padding-left: 20px;">鼻部</b>
                        <div style="display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;">
                          <span class="label_samp2" v-for="(label, index) in item.lid" :key="index" @click="searchLabel(label.name)" v-if="label.state === '1' && label.webShow === '1' && label.type === 'b'">{{label.name}}</span>
                        </div>

                      </div>
                      <div>
                        <b style="font-size: 20px; padding-left: 20px;">耳部</b>
                        <div style="display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;">
                          <span class="label_samp2" v-for="(label, index) in item.lid" :key="index" @click="searchLabel(label.name)" v-if="label.state === '1' && label.webShow === '1' && label.type === 'e'">{{label.name}}</span>
                        </div>
                      </div>
                      <div>
                        <b style="font-size: 20px; padding-left: 20px;">咽喉</b>
                        <div style="display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;">
                          <span class="label_samp2" v-for="(label, index) in item.lid" :key="index" @click="searchLabel(label.name)" v-if="label.state === '1' && label.webShow === '1' && label.type === 'yh'">{{label.name}}</span>
                        </div>
                      </div>

                    </div>
  						    </el-tab-pane>
  						</el-tabs>
  					</div>
  				</div>
  				<el-button slot="reference" icon="el-icon-document-copy">标签</el-button>
  			</el-popover>
  			<el-input placeholder="请输入要搜索的关键词,空白搜索默认显示全部" v-model="searchKeyword" class="input-with-select" clearable @keyup.enter.native="search" style="float: left; width: 800px; float: left;">
  			    <el-button slot="append" icon="el-icon-search" @click="search" style="background: #50b998;color: #fff;border-color: rgb(80, 185, 152);"></el-button>
  			</el-input>
  		</div>
  	</el-main>
  </el-container>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        options: [],
        searchKeyword: '',
        labelAll: [],
        groupLabel: [],
        tabPosition: 'left',
        maxHeight: 0
      }
    },
    methods: {
      ...mapActions([
      ]),
      // 查询方法
      search () {
      	// if (this.$router.history.current.name === 'search') {
      	// 	// 如果是搜索页直接传递参数后刷新页面
      	// 	this.$router.push("/web/search/" + this.searchKeyword)
      	// 	this.reload()
      	// } else if (this.searchKeyword.length === 0) {
      	// 	this.$alert('请填写需要查找的关键词', '警告', {
      	// 		confirmButtonText: '确定'
      	// 	})
      	// } else {
      	// 	this.$router.push("/web/search/" + this.searchKeyword)
      	// 	this.reload()
      	// }

        // if (this.searchKeyword.length === 0) {
        // 	this.$alert('请填写需要查找的关键词', '警告', {
        // 		confirmButtonText: '确定'
        // 	})
        // } else {
        // }
        
        // 提出空格提交
        // this.$emit('getKeyword', this.searchKeyword.replace(/\s+/g,""));
        this.$emit('getKeyword', this.searchKeyword);
      },
      // 关键词点击搜索
      searchLabel (terms) {
        console.log(2)
      	this.searchKeyword = terms
        this.$emit('getKeyword', terms);
      	// this.$router.push("/web/search/" + this.searchKeyword)
      	// this.reload()
      },
      leave () {
      },
      show() {
      }
    },
    created() {
      // 获取所有标签组和标签
      let _this = this
      this.labelAll = this.$store.state.common.publicInfo.label
      this.groupLabel = this.$store.state.common.publicInfo.groupLabel
      _this.groupLabel.find((gobj, index) => {
      	gobj.lid = []
        if(gobj.state === '1' && gobj.webShow === '1') this.maxHeight++
      	_this.labelAll.find((lobj, index) => {
      		gobj.gid === lobj.gid ? gobj.lid.push(lobj) : lobj = lobj
      	})
      })
      this.maxHeight = this.maxHeight * 40
      // 只有一个标签组的时候底部留白不够的补充
      if(this.groupLabel.length === 1) this.maxHeight = this.maxHeight + 20
      // 在搜索页时 把搜索参数重新赋值显示在页面
      // if (this.$router.history.current.name === 'search') {
      // 	this.typeId = this.$router.history.current.params.tid
      // 	this.searchKeyword = this.$router.history.current.params.searchKeyword
      // }
      this.typeId = this.$router.history.current.params.tid
      this.searchKeyword = this.$router.history.current.params.searchKeyword
    }
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.w910{ width: 950px; height: 40px; margin: 0 auto; border-radius: 10px;}
.w910 .el-select{float: left;}
.w910 .searchInput{float: left; border: none; line-height: 40px; height: 40px; width: 870px; text-indent: 1em; color: #999999;}
.w910 .searchInput:hover{border: none !important;}
.w910 .anniu{width: 130px; float: left; background: #50b998; border-radius:0 10px 10px  0;}
.w910 .anniu img{display: block; margin: 5px auto;}
.label p{font-size: 15px; color: #a6a9ad; line-height: 1.5; padding: 5px 0; text-align: justify;}
.label p:hover{ font-weight: bold; color: #F56C6C;}
.label p:hover samp{ font-weight: bold; color: #F56C6C; cursor: pointer;}
.label p samp:nth-child(1){padding-left: 0;}
.label p samp{padding: 0 10px;}
.label dl{}
.label dl dt{font-size: 16px; font-weight: bold; line-height: 1.5; color: #409EFF; float: left; width: 148px; border-right: 1px solid #C0C4CC; }
.label dl dt samp{display: block;text-align: center; font-weight: bold; font-size: 16px; padding: 10px;cursor:pointer;}
.label dl dt samp:hover{background: #C0C4CC; color: #F56C6C;}
.label dl dd{padding:10px 5px; float: left; width: 720px; margin-left: 20px;}
.label_samp{display: block; float: left;cursor:pointer;padding:10px 30px;margin:10px;  font-size: 16px; border-radius: 10px; border: 1px solid #CCCCCC;}
.label_samp:hover{color: #F56C6C; border: 1px solid #F56C6C;}
.label_samp2{display: block; float: left;cursor:pointer;padding:10px 30px;margin:10px;  font-size: 16px; border-radius: 10px; border: 1px solid #CCCCCC;}
.label_samp2:hover{color: #F56C6C; border: 1px solid #F56C6C;}
.tabs{overflow: auto;}
.el-input-group__append{    background-color: rgb(80, 185, 152) !important;}
</style>
