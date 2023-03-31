<template>
	<el-container >
		<el-header v-loading="loading">
			<el-table ref="multipleTable"  :data="userList" class="clearfix" :stripe="true" size="mini" @select="setTableData" @select-all="setTableData" :header-cell-style="{background:'#f0f7ff',color:'#333333','text-align':'center'}" style="width: 100% !important;">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
			  <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
			  <el-table-column prop="nickname" label="缩略图" align="center" min-width="100">
			  	<template slot-scope="scope" v-if="scope.row.srcs.length === 0">暂无图片</template>
			  	<template slot-scope="scope" v-if="scope.row.srcs.length !== 0" >
			  		<div style="width: 100px;height: auto; max-height:100px; hidden; background: #CCCCCC; margin: auto;">
			  			<viewer :images="viewer(scope.row.srcs[0])">
			  	    <img :src="URLS2 + scope.row.srcs[0]" alt="" style="display: block;height: auto;width: 100%; height: auto;"/>
			  	    </viewer>
			  		</div>
			  	</template>
			  </el-table-column>
			  <el-table-column prop="title" label="文件类型" width="160" align="center">
			    <template slot-scope="scope" style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
			    	<svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('img') !== -1">
			        <use xlink:href="#icon-picture"></use>
			      </svg>
			    	<svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('psd') !== -1">
			        <use xlink:href="#icon-web-psd"></use>
			      </svg>
			    	<svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('video') !== -1">
			        <use xlink:href="#icon-shipinbofangyingpian"></use>
			      </svg>
			      <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('ai') !== -1">
			        <use xlink:href="#icon-Ai"></use>
			      </svg>
			      <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('pdf') !== -1">
			        <use xlink:href="#icon-Pdf"></use>
			      </svg>
			      <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('word') !== -1">
			        <use xlink:href="#icon-word1"></use>
			      </svg>
			      <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('excel') !== -1">
			        <use xlink:href="#icon-excel1"></use>
			      </svg>
			      <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.typeFile.indexOf('压缩包') !== -1">
			        <use xlink:href="#icon-gongcheng-"></use>
			      </svg>
			    </template>
			  </el-table-column>
			  <el-table-column prop="title" label="标题" min-width="200" align="center"></el-table-column>
			  <el-table-column prop="collectTime" label="收藏时间" align="center" width="200">
					<template slot-scope="scope">
					  {{formatDate(scope.row.collectTime)}}
					</template>
				</el-table-column>
			  <el-table-column label="操作" align="center" width="300">
			    <template slot-scope="scope">
			      <el-button size="mini" type="primary" circle icon="el-icon-view" title="查看" v-on:click.stop="seeArticle(scope.row.mId)"></el-button>
			      <el-button size="mini" type="danger" circle icon="el-icon-folder-delete" title="取消收藏" @click="deleteCollectArticle(scope.$index, scope.row.mId)"></el-button>
			    </template>
			  </el-table-column>
			</el-table>
			<div class="block" style="margin: 20px 14px;display: flex;justify-content: space-between;align-items: center;">
				<div style="width: 410px;display: flex;justify-content: space-between;align-items: center;">
					<el-checkbox v-model="checkedAll" :indeterminate="isIndeterminate" size="small" @change="handleCheckAllChange()">全选</el-checkbox>
					<el-select v-model="operationValue" placeholder="请选择" size="small">
					  <el-option
					    v-for="item in options"
					    :key="item.value"
					    :label="item.label"
					    :value="item.value">
					  </el-option>
					</el-select>
					<el-button @click="executeOperate()" size="small" :loading="operateLoading">{{ operateLoading ? '执行中 ...' : '执行操作' }}</el-button>
				</div>
			</div>
		</el-header>
	</el-container>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from 'vuex'
	import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
	export default {
		inject: ['reload'],
		name: 'userCollect',
		components: {},
		data() {
			return {
				loading: true,
				operateLoading: false,
				permissions: this.$store.state.admin.adminInfo.permissions,
				projects: this.$store.state.common.publicInfo.projects,
				types: this.$store.state.common.publicInfo.types,
				minTypes: this.$store.state.common.publicInfo.details,
				minTypes2: this.$store.state.common.publicInfo.details,
				typeImg: '',
				projectImg: '',
				minTypeImg: '',
				userName: '',
				searchTXT: '',
				article: [],
				prompt: '',
				userList: [],
				URLS2: this.$store.state.common.publicInfo.srcUrl,
				selectData:[],
				options:[
				  {value:'取消收藏'},
				],
				checkedAll:false,
				operationValue:'',
				isIndeterminate: false,
			}
		},
		methods: {
			...mapActions([
				'getUserCollectArticle',
				'exhibitionreduction',
				'collectArticle',
				'setOperationInfo'
			]),
			handleCheckAllChange() {
			  this.$refs.multipleTable.toggleAllSelection()
			},
			// 获取已选中的值
			setTableData() {
				const _selectData = this.$refs.multipleTable.selection, _this = this
				this.selectData.splice(0)
			  _selectData.find(obj=>{
			    _this.selectData.push(obj)
			  })
			  if(_selectData.length == 0){
			    this.isIndeterminate = this.checkedAll = false
			  } else if(_selectData.length === this.doctorPageNum || _selectData.length === this.doctorsAll){
			    this.isIndeterminate = false
			    this.checkedAll = true
			  } else if(_selectData.length < this.doctorPageNum){
			    this.isIndeterminate = true
			    this.checkedAll = false
			  }
			},
			// 复选框执行操作
			executeOperate() {
			  let idAll = [], _this = this
			  if(this.selectData.length === 0){
			    this.$alert('请选择需要操作的数据', {confirmButtonText: '确定'})
			    return
			  }
			  this.selectData.find(o=>{
			    idAll.push(o.mId)
			  })
			  if(this.operationValue === '取消收藏'){
					let _this = this, s = []
			    this.operateLoading = true
					this.selectData.map(o=>{
						s.push({mId:o.mId, uId: _this.$store.state.admin.adminInfo.uId})
					})
					this.$confirm('请确认是否继续取消收藏?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.collectArticle({s:s})
							.then((response) => {
								if(response.code === 200) {
									_this.$message({message: response.msg, type: 'success'})
									// 更新页面调用app.vue的更新方法
									_this.reload()
								}
							})
							.catch(function (error) {
								_this.$alert(error.msg, {confirmButtonText: '确定'})
							})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
					_this.operateLoading = false
			  } else {
			    this.$alert('请选择操作功能', {confirmButtonText: '确定'})
			  }
			},
			handleCheckAllChange() {
			  this.$refs.multipleTable.toggleAllSelection()
			},
			// 删除操作
			deleteCollectArticle (index, mid) {
				let _this = this
				this.$confirm('请确认是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.collectArticle({mId: mid, uId: _this.$store.state.admin.adminInfo.uId})
						.then((response) => {
							if(response.code === 200) {
								_this.$message({message: response.msg, type: 'success'})
								// 更新页面调用app.vue的更新方法
								_this.reload()
							}
						})
						.catch(function (error) {
							_this.$alert(error.msg, {confirmButtonText: '确定'})
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			// 返回查看数据
			viewer (url) {
				var urls = [this.URLS2 + url]
				return urls
			},
			formatDate (time) {
			  if (time !== null) {
			    let date = new Date(parseInt(time) * 1000)
			    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			  } else {
			    return '暂无'
			  }
			},
			// 查看文章路径跳转
			seeArticle (mid) {
			  this.setOperationInfo({_this:this, type:1, id:mid})
			  window.open(this.$store.state.common.publicInfo.srcUrl + '#/web/article/' + mid + '/backstage/0/0/', '_blank')
			},
		},
		created() {
			let _this = this
			this.getUserCollectArticle({uId:this.$store.state.admin.adminInfo.uId})
				.then(function (response) {
					if (response.code === 200) {
						_this.userList = []
						let srcs = []
						if (response.data !== null) {
							_this.userList = response.data
							if (_this.userList.length !== 0) {
								_this.userList.find((o, index) => {
									o.typeFile.indexOf('img') !== -1 ? srcs[srcs.length] = o.img[0].miniImg : o.typeFile = o.typeFile
									o.typeFile.indexOf('psd') !== -1 ? srcs[srcs.length] = o.psd[0].Psdview : o.typeFile = o.typeFile
									o.typeFile.indexOf('video') !== -1 ? srcs[srcs.length] = o.video[0].Videoview : o.typeFile = o.typeFile
									o.typeFile.indexOf('ai') !== -1 ? srcs[srcs.length] = 'image/ai.jpg' : o.typeFile = o.typeFile
									o.typeFile.indexOf('pdf') !== -1 ? srcs[srcs.length] = 'image/pdf.jpg' : o.typeFile = o.typeFile
									o.typeFile.indexOf('word') !== -1 ? srcs[srcs.length] = 'image/word.jpg' : o.typeFile = o.typeFile
									o.typeFile.indexOf('excel') !== -1 ? srcs[srcs.length] = 'image/excel.jpg' : o.typeFile = o.typeFile
									o.typeFile.indexOf('压缩包') !== -1 ? srcs[srcs.length] = 'image/ysb.jpg' : o.typeFile = o.typeFile
									o.srcs = srcs.length !== 0 ? srcs : new Array()
									srcs = []
								})
							} else {
								_this.userList = []
							}
						}
						_this.loading = false
					}
				})
				.catch(function (error) {
					// console.log(error)
					_this.loading = false
				})
		}
	}
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
	.omit{text-overflow:ellipsis; overflow:hidden; white-space:nowrap; height: 30px !important;}
	.clearfix:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
	.el-header{background: none; height: auto !important; }
	.tab{width: 100%; height: auto; min-height: 30px; margin-bottom: 20px; position: relative;}
	.tab p{font-weight: 400;color: #1f2f3d;font-size: 20px;margin: 0; float: left; width: 6%;}
	.tab ul{float: left;width: 94%; height: auto;}
	.tab ul li{float: left; height: 30px; line-height: 30px; margin: 0 10px;cursor: pointer;}
	.tab ul li:hover{color: #409eff; font-weight: bold;}
	.tab ul a{position: absolute;bottom: -40px;left: 44%;width: 160px;display: inline-block;line-height: 30px;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;border-top-color: rgb(220, 223, 230);border-right-color: rgb(220, 223, 230);border-bottom-color: rgb(220, 223, 230);border-left-color: rgb(220, 223, 230);border-color: #dcdfe6;color: #606266;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box;outline: none;margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;font-size: 14px;border-radius: 4px;}
	.tab ul a:hover{background: #fff;border-color: #409eff;color: #409eff;}
	.tab ul li.on{color: #fff;background-color: #409eff;border-color: #f56c6c; display: inline-block;white-space: nowrap;cursor: pointer;border: 1px solid #dcdfe6;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box; outline: 0; margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;padding: 5px 10px;font-size: 14px;border-radius: 4px;line-height: 20px;}
	table{ width: 100% !important;}
	.icon {width: 25px;height: 25px;vertical-align: -0.15em;fill: currentColor;overflow: hidden;    margin-right: 5px;}
	.el-pagination span:not([class*=suffix]){float: right !important;}
	.el-table .cell{padding: 0 !important;}
	
	.tabs{display: flex; justify-content: flex-start; align-items: center; padding: 0 0 30px;}
	.tabs_div1{padding-top: 20px;}
	.tabs_div1 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
	.tabs_div1 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
	.tabs_div1 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
	.tabs_div1 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
	.tabs_div1 /deep/ .tabs_div1_item_ul li{width: 10%; text-align: left; height: 40px;    transition: all .2s; cursor: pointer;}
	
	.tabs_div1 /deep/ .tabs_div1_item2{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
	.tabs_div1 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;}
	.tabs_div1 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
	.tabs_div1 /deep/ .tabs_div1_item_ul2{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
	.tabs_div1 /deep/ .tabs_div1_item_ul2 li{width: 10%; text-align: left;height: 40px;    transition: all .2s;cursor: pointer;}
	.tabs_div1 /deep/ .tabs_div1_item_ul2 li:hover, .tabs_div1 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}
	
	.tabs_div2{padding-top: 20px;}
	.tabs_div2 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
	.tabs_div2 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
	.tabs_div2 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
	.tabs_div2 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex: 1;}
	.tabs_div2 /deep/ .tabs_div1_item_ul li{width: 20%; text-align: left; height: 40px;    transition: all .2s;cursor: pointer;}
	
	.tabs_div2 /deep/ .tabs_div1_item2{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
	.tabs_div2 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;}
	.tabs_div2 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 0; height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
	.tabs_div2 /deep/ .tabs_div1_item_ul2{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex: 1;}
	.tabs_div2 /deep/ .tabs_div1_item_ul2 li{width: 20%; text-align: left;height: 40px;    transition: all .2s;cursor: pointer;}
	.tabs_div2 /deep/ .tabs_div1_item_ul2 li:hover, .tabs_div2 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}
	
	.tabs_div3{padding-top: 20px;}
	.tabs_div3 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
	.tabs_div3 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
	.tabs_div3 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
	.tabs_div3 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;margin-top: 10px;}
	.tabs_div3 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 10px; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
	.tabs_div3 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
	.tabs_div3 /deep/ .tabs_div1_item_ul li{width: 20%; text-align: left; height: 40px;  line-height: 40px;  transition: all .2s;cursor: pointer;}
	.tabs_div3 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}
	.el-tag + .el-tag {
	    margin-left: 10px;
	  }
	  .button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	  .input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }
</style>
