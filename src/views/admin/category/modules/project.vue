<template>
  <el-container class="clearfix">
  	<el-header style="width: 100%; height: auto; padding: 0; margin-bottom: 20px;">
  		<el-row class="demo-autocomplete" style="width: 200px; margin-right: 10px; float: left;">
  			<el-col :span="24">
  				<el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入关键字进行搜索" :trigger-on-focus="false" @select="handleSelect" clearable></el-autocomplete>
  			</el-col>
  		</el-row>
  		<el-button type="primary" style="float: left;" @click="search()">搜索</el-button>
  		<el-button style="float: left;" @click="firing('', '3')">添加项目</el-button>
  		<el-dialog :title="title" :visible.sync="centerDialogVisibleAdd" width="20%" center>
  			<p class="upPwd">
  				<input class="el-input__inner" type="text" name="" id="" value="" v-model="name" @keyup.enter="addName()" />
  			</p>
  			<span slot="footer" class="dialog-footer">
              <el-button @click="cancel('3')">取 消</el-button>
              <el-button type="primary" @click="addName()">确 定</el-button>
            </span>
  		</el-dialog>
      <div class="clearfix"></div>
      <el-alert title="重要提示" description="项目下如果有文章则不可删除,请先转移走文章后在进行删除操作" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  	</el-header>
  	<el-footer style="height: auto;">
  		<el-table v-loading="loadingP" :data="PList3" class="clearfix" :stripe="true" size="mini" style="width: 60%; min-height: 474px;">
  			<el-table-column prop="pid" label="id" width="50" align="center"></el-table-column>
  			<el-table-column prop="xname" label="项目名称" min-width="100" align="center"></el-table-column>
  			<el-table-column prop="articlelist" label="文章" width="100" align="center"></el-table-column>
  			<el-table-column prop="state" label="状态" width="100" align="center">
  				<template slot-scope="scope">
            <el-tag v-if="scope.row.state === '1'" type="success">正常使用</el-tag>
            <el-tag v-if="scope.row.state === '2'" type="danger">已禁用</el-tag>
  				</template>
  			</el-table-column>
  			<el-table-column prop="webShow" label="前台显示" width="100" align="center">
  				<template slot-scope="scope">
  					<svg v-if="scope.row.webShow === '1'" class="icon" aria-hidden="true"><use xlink:href="#icon-dui"></use></svg>
  					<svg v-if="scope.row.webShow === '0'" class="icon" aria-hidden="true"><use xlink:href="#icon-cuo"></use></svg>
  				</template>
  			</el-table-column>
  			<el-table-column label="操作" align="center" width="100">
  				<template slot-scope="scope">
            <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" @click="firing(scope.row, '1')" style="margin-left: 20px;"></el-button>
  					<el-dialog :title="title" :visible.sync="centerDialogVisibleP" width="21%" center style="margin-left: -15vw;">
  						<div class="demo-input-suffix">
  							项目名称:
  							<el-input style="width: auto;" class="el-input--suffix" placeholder="请输入内容"  name="" id="" v-model="row.xname"></el-input>
  						</div>
  						<div class="demo-input-suffix">
  							状态:
  							<el-radio-group v-model="row.state" style="margin-left: 43px;">
                    <el-radio label="1">启用</el-radio>
                    <el-radio label="2">禁用</el-radio>
                </el-radio-group>
                <span class="intro">禁用后<b>“前台显示”</b>不勾选也会默认禁用</span>
  						</div>
  						<div class="demo-input-suffix">
  							前台显示:
  							<el-radio-group v-model="row.webShow" style="margin-left: 15px;">
                    <el-radio label="1">启用</el-radio>
                    <el-radio label="0">禁用</el-radio>
                </el-radio-group>
                <span class="intro">前台搜索内容显示设置</span>
  						</div>
  						<span slot="footer" class="dialog-footer">
  				            <el-button @click="cancel('1')">取 消</el-button>
  				            <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)" :loading="handleUpdateLoading">确 定</el-button>
  			          	</span>
  					</el-dialog>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle title="删除" @click="projectDel(scope.$index, scope.row.pid)" :disabled="scope.row.articlelist === '0' ? false : true"></el-button>
  				</template>
  			</el-table-column>
  		</el-table>
  	</el-footer>
  	<div class="block" style="width: 470px;margin: 0 0 0 20%;">
  		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="dataList" layout="total, prev, pager, next" :total="PList2.length">
  		</el-pagination>
  	</div>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { cachedPublicInfo } from 'API/cacheService'
  export default {
    inject: ['reload'],
    props: {
      myProject: Array,
      myProjectSou: Array,
      myLoading: Boolean
    },
    name: 'backstage',
    components: {},
    data() {
      return {
        restaurants: [],
        state2: '',
        loadingP: true,
        loadingT: true,
        PList: [],
        PList2: [],
        PList3: [],
        PListSou: [],
        uId: '',
        title: '',
        name: '',
        row: {},
        handleUpdateLoading: false,
        centerDialogVisibleP: false,
        centerDialogVisibleAdd: false,
        currentPage1: 1,
        dataList: 10
      }
    },
    watch: {
    	// 监听minType有变动时对显示变量重新赋值
    	PList: function(newQuestion, oldQuestion) {
    		let _this = this
        this.PList2 = [], this.PList3 = [], this.PList2 = this.PList
    		if(this.PList.length !== 0) {
    			this.PList.find((obj, index) => {
    				if(index < _this.dataList) {
    					_this.$set(_this.PList3, _this.PList3.length, obj)
    				}
    			})
    		}
    	},
      myLoading: function(newQuestion, oldQuestion){
        this.loadingP = this.myLoading
      }
    },
    methods: {
      ...mapActions([
        'projectList',
        'projectAdd',
        'projectsave',
        'projectdel',
        'setPublicInfo',
        'getPublicInfo'
      ]),
      // 搜索操作
      search () {
        let temp = [], _this = this
      	this.loadingP = true, this.PList2 = [], this.PList3 = []
      	if (this.state2.length !== 0) {
      		this.PList.find((obj, index) => {
      			obj.xname.indexOf(_this.state2) !== -1 ? temp.push(obj) : obj = obj
      			console.log(obj.xname.indexOf())
      		})
      		if (temp.length !== 0) {
      			temp.find((obj, index) => {
      				_this.PList2.push(obj)
      			})
      			this.handleCurrentChange(1)
      		}
      	} else {
      		this.PList.find((obj, index) => {
      			_this.$set(_this.PList2, _this.PList2.length, obj)
      		})
      		this.handleCurrentChange(1)
      	}
      	this.loadingP = false
      },
      // 分页信息变更时打印信息
      handleSizeChange(val) {
      	//      console.log('每页 ' + val + '条');
      },
      // 分页按钮
      handleCurrentChange(val) {
      	//      console.log('当前页: ' + val)
      	let _this = this
      	// 抓取数据下标开始位置
      	let begin = (this.dataList * val) - this.dataList
      	// 抓取数据下标开结束位置
      	let end = (this.dataList * val) - 1
      	// 清空当前页显示数据
      	this.PList3 = []
      	// 循环抓取从起始位置到结束位置的数据
      	this.PList2.find((obj, index) => {
      		if(index >= begin && index <= end) {
      			_this.$set(_this.PList3, _this.PList3.length, obj)
      		}
      	})
      },
      // 修改编辑操作
      handleUpdate(index, row) {
        let _this = this
      	this.handleUpdateLoading = true
      	if(this.row.xname.replace(/\s*/g,"").length === 0) {
      		this.$alert('项目名称不能为空', '警告', { confirmButtonText: '确定' })
      	} else if(this.row.state.length > 1) {
      		this.$alert('请选择状态的启用或禁用', '警告', { confirmButtonText: '确定' })
      	} else if(this.row.webShow.length > 1) {
      		this.$alert('请选择前台显示的启用或禁用', '警告', { confirmButtonText: '确定' })
      	} else {
      		this.projectsave({pid: this.row.pid, xname: this.row.xname, state: this.row.state, webShow: this.row.webShow})
            .then(function (response) {
              if (response.code === 200) {
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo()
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              // 更新页面调用app.vue的更新方法
              _this.reload()
            })
      	}
      },
      // 功能弹出框的标题重构
      firing(row, id) {
      	// 深拷贝处理
      	this.row = JSON.stringify(row)
      	this.row = JSON.parse(this.row)
      	if(id === '1') {
      		this.centerDialogVisibleP = true
      		this.title = '修改项目名称（' + row.xname + '）'
      	} else if(id === '3') {
      		this.centerDialogVisibleAdd = true
      		this.title = '输入添加的项目名称：'
      	}
      },
      // 关闭添加/修改
      cancel(id) {
      	if(id === '1') {
      		this.centerDialogVisibleP = false
      	} else if(id === '3') {
      		this.centerDialogVisibleAdd = false
      	}
      	this.row = {}, this.name = ''
      	
      },
      // 添加项目
      addName() {
        let _this = this
      	if(this.name.length === 0) {
      		this.$alert('添加的名称不能为空', '警告', {
      			confirmButtonText: '确定'
      		})
      	} else if(this.title.indexOf('项目') !== -1) {
      		this.projectAdd({xname: this.name, state: '1', webShow: '1'})
            .then(function (response) {
              if (response.code === 200) {
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo()
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              // 更新页面调用app.vue的更新方法
              _this.reload()
            })
      	}
      },
      // 删除项目
      projectDel(index, pid) {
        let _this = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.projectdel({pid: pid})
            .then(function (response) {
              if (response.code === 200) {
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo()
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              // 更新页面调用app.vue的更新方法
              _this.reload()
            })
        }).catch(() => {
          // 取消
        })
      },
      querySearch(queryString, cb) {
      	var restaurants = this.restaurants;
      	var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      	// 调用 callback 返回建议列表的数据
      	cb(results);
      },
      createFilter(queryString) {
      	return(restaurant) => {
      		return(restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      	};
      },
      loadAll() {
      	return this.PListSou
      },
      handleSelect(item) {
      	console.log(item);
      }
    },
    mounted() {
    	this.restaurants = this.loadAll();
    },
    created() {
      this.PList = this.myProject
      this.PListSou = this.myProjectSou
      this.loadingP = this.myLoading
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.intro {color: gray;font-weight: normal;font-size: 12px;border: 1px solid silver; border-left-width: 4px;padding: 3px 4px 2px 4px; line-height: 14px; height: 20px;margin-left: 6px;}
.icon {width: 1.5em;height: 1.5em; vertical-align: -0.15em;fill: currentColor;overflow: hidden; margin-left: .5em;}
.titleType{height:60px;line-height:60px;text-align:left}
.titleType b{display:block;float:left;width:50%;height:60px;line-height:60px;font-size:20px}
.demo-input-suffix{margin-bottom:15px}
.demo-input-suffix .el-input{margin-left:15px}
</style>
