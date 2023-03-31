<template>
  <el-container class="clearfix">
  	<el-header style="width: 100%; height: auto; padding: 0; margin-bottom: 20px;">
  		<el-select v-model="Tvalue" clearable placeholder="类型选择" style="float: left;margin-right: 10px;">
  		    <el-option
  		      v-for="item in tList"
  		      :key="item.tid"
  		      :label="item.lname"
  		      :value="item.tid">
  		    </el-option>
  		  </el-select>
  		<el-row class="demo-autocomplete" style="width: 200px; margin-right: 10px; float: left;">
  			<el-col :span="24">
  				<el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入关键字进行搜索" :trigger-on-focus="false" @select="handleSelect" clearable></el-autocomplete>
  			</el-col>
  		</el-row>
  		<el-button type="primary" style="float: left;" @click="search()">搜索</el-button>
  		<el-button style="float: left;" @click="firing('', '1')">添加分类</el-button>
  		<el-dialog :modal-append-to-body="false" :title="title" :visible.sync="mixTypeAdd" width="35%" center>
  			<p class="clearfix" style="width: 65%;margin: 0 auto;">
  				<el-select class="ma10" v-model="typeName" placeholder="分类" filterable clearable style="width:200px;margin-left: 20px; color: #409eff;">
  					<el-option v-for="item in tList" :key="item.tid" :label="item.lname" :value="item.lname">
  					</el-option>
  				</el-select>
  				<input style="width: 150px;" class="el-input__inner" placeholder="分类" type="text" name="" id="" value="" v-model="name" @keyup.enter="addName()" />
  			</p>
  			<span slot="footer" class="dialog-footer">
              <el-button @click="cancel('3')">取 消</el-button>
              <el-button type="primary" @click="addName()">确 定</el-button>
            </span>
  		</el-dialog>
      <div class="clearfix"></div>
      <el-alert title="重要提示" description="分类下如果有文章则不可删除,请先转移走文章后在进行删除操作" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  	</el-header>
  	<el-footer style="height: auto;" class="clearfix">
  		<el-table :data="minType3" class="clearfix" :stripe="true" size="mini" style=" min-height: 474px;" v-loading="loadingList">
  			<el-table-column prop="did" label="id" width="50" align="center"></el-table-column>
  			<el-table-column prop="dname" label="分类名称" min-width="150" align="center"></el-table-column>
  			<el-table-column prop="tbid" label="类型名称" width="100" align="center">
  				<template slot-scope="scope">
  					{{getTypesName(scope.row.tbid)}}
  				</template>
  			</el-table-column>
        <el-table-column prop="articlelist" label="文章" width="100" align="center"></el-table-column>
  			<el-table-column prop="state" label="分类状态" width="100" align="center">
  				<template slot-scope="scope">
  					<el-tag v-if="scope.row.state === 1" type="success">正常使用</el-tag>
  					<el-tag v-if="scope.row.state === 2" type="danger">已禁用</el-tag>
  				</template>
  			</el-table-column>
  			<el-table-column prop="state" label="前台显示" width="100" align="center">
  				<template slot-scope="scope">
  					<svg v-if="scope.row.webShow === 1" class="icon" aria-hidden="true"><use xlink:href="#icon-dui"></use></svg>
  					<svg v-if="scope.row.webShow === 0" class="icon" aria-hidden="true"><use xlink:href="#icon-cuo"></use></svg>
  				</template>
  			</el-table-column>
  			<el-table-column label="操作" align="center" width="200">
  				<template slot-scope="scope">
            <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" @click="firing(scope.row, '2')" style="margin-left: 20px;"></el-button>
  					<el-dialog :modal-append-to-body="false" :title="title" :visible.sync="mixTypeModify" width="24%" center>
  						<div class="demo-input-suffix">
  							分类名称:
  							<el-input style="width: auto;" class="el-input--suffix" placeholder="请输入内容"  name="" id="" v-model="row.dname" clearable></el-input>
  						</div>
  						<div class="demo-input-suffix">
  							所属类型:
  							<el-select class="ma10" v-model="typeName" placeholder="类型" filterable clearable style=" margin-left: 15px;">
  								<el-option v-for="item in tList" :key="item.tid" :label="item.lname" :value="item.lname">
  								</el-option>
  							</el-select>
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
  			                <el-button type="primary" @click="handleUpdate()" :loading="handleUpdateLoading">确 定</el-button>
  			              </span>
  					</el-dialog>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle title="删除" @click="classifyDel(scope.$index, scope.row.did)" :disabled="scope.row.articlelist === 0 ? false : true"></el-button>
  				</template>
  			</el-table-column>
  		</el-table>
  	</el-footer>
  	<div class="block" style="width: 470px;margin: 0 0 0 20%;">
  		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="dataList" layout="total, prev, pager, next" :total="minType2.length">
  		</el-pagination>
  	</div>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    props: {
      myTypes: Array,
      myTypesSou: Array,
      myDetails: Array,
      myDetailsSou: Array,
      myLoading: Boolean
    },
    name: 'backstage',
    components: {},
    data() {
      return {
        options: [],
        Tvalue: '',
        restaurants: [],
        state1: '',
        state2: '',
        loading: true,
        types: [],
        minType: [],
        minType2: [],
        minType3: [],
        tList: [],
        PListSou: [],
        tListSou: [],
        minTypeSou: [],
        uId: '',
        title: '',
        name: '',
        row: {},
        handleUpdateLoading: false,
        mixTypeModify: false,
        mixTypeModifyUp: false,
        mixTypeAdd: false,
        loadingList: true,
        typeName: '',
        dname: '',
        currentPage1: 1,
        dataList: 10
      }
    },
    watch: {
    	// 监听minType有变动时对显示变量重新赋值
    	minType: function(newQuestion, oldQuestion) {
    		let _this = this
    		this.minType2 = []
    		this.minType3 = []
    		this.minType2 = this.minType
    		if(this.minType.length !== 0) {
    			this.minType.find((obj, index) => {
    				if(index < _this.dataList) {
    					_this.$set(_this.minType3, _this.minType3.length, obj)
    				}
    			})
    		}
    	},
    	// 修改分类名称在取消操作时清空所填写的信息
    	mixTypeModify: function(newQuestion, oldQuestion) {
    		if(this.mixTypeModify === false) {
    			this.dname = ''
    		}
    	},
    	// 修改分类的上级类型取消做时清空所填写的信息
    	mixTypeModifyUp: function(newQuestion, oldQuestion) {
    		if(this.mixTypeModifyUp === false) {
    			this.typeName = ''
    			this.name = ''
    		}
    	},
    },
    methods: {
      ...mapActions([
        'setPublicInfo',
        'getPublicInfo',
        'detailsAdd',
        'detailssave',
        'setOperationInfo',
        'detailsDel'
      ]),
      // 搜索操作
      search () {
      	this.loadingList = true
      	let temp = []
      	let temp2 = []
      	let _this = this
      	this.minType2 = []
      	this.minType3 = []

      	if (this.state2.length !== 0 && this.Tvalue.length !== 0) {
      		this.minType.find((obj, index) => {
      			obj.tbid === _this.Tvalue ? temp.push(obj) : obj = obj
      		})
      		temp.find((obj, index) => {
      			obj.dname.indexOf(_this.state2) !== -1 ? temp2.push(obj) : obj = obj
      		})
      		if (temp2.length !== 0) {
      			temp2.find((obj, index) => {
      				_this.minType2.push(obj)
      			})
      			this.handleCurrentChange(1)
      		} else {
      			this.minType2 = []
      			this.minType3 = []
      		}
      	} else if (this.state2.length !== 0 && this.Tvalue.length === 0) {
      		this.minType.find((obj, index) => {
      			obj.dname.indexOf(_this.state2) !== -1 ? temp.push(obj) : obj = obj
      		})
      		if (temp.length !== 0) {
      			temp.find((obj, index) => {
      				_this.minType2.push(obj)
      			})
      			this.handleCurrentChange(1)
      		}
      	} else if (this.state2.length === 0 && this.Tvalue.length !== 0) {
      		this.minType.find((obj, index) => {
      			obj.tbid === _this.Tvalue ? temp.push(obj) : obj = obj
      		})
      		if (temp.length !== 0) {
      			temp.find((obj, index) => {
      				_this.minType2.push(obj)
      			})
      			this.handleCurrentChange(1)
      		}
      	} else {
      		this.minType.find((obj, index) => {
      			_this.$set(_this.minType2, _this.minType2.length, obj)
      		})
      		this.handleCurrentChange(1)
      	}
      	this.loadingList = false
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
      	this.minType3 = []
      	// 循环抓取从起始位置到结束位置的数据
      	this.minType2.find((obj, index) => {
      		if(index >= begin && index <= end) {
      			_this.$set(_this.minType3, _this.minType3.length, obj)
      		}
      	})
      },
      // 编辑分类
      handleUpdate(index) {
        let _this = this
      	this.handleUpdateLoading = true
      	if(this.row.dname.replace(/\s*/g,"").length === 0) {
      		this.$alert('分类名称不能为空', '警告', { confirmButtonText: '确定' })
      	} else if(this.typeName.replace(/\s*/g,"").length === 0) {
      		this.$alert('类型不能为空', '警告', { confirmButtonText: '确定' })
      	} else if(this.row.state.length > 1) {
      		this.$alert('请选择状态的启用或禁用', '警告', { confirmButtonText: '确定' })
      	} else if(this.row.webShow.length > 1) {
      		this.$alert('请选择前台显示的启用或禁用', '警告', { confirmButtonText: '确定' })
      	} else {
      		this.detailssave({did: this.row.did, tbid: this.getTypesID(this.typeName), dname: this.row.dname, state: this.row.state, webShow: this.row.webShow})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:19})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo({types:'leixin:details'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              // 更新页面调用app.vue的更新方法
              _this.reload()
            })
      		// 刷新页面时重置当前分页数
      		this.currentPage1 = 1
      	}
      },
      // 新增/修改类型、名称弹出显示函数，并动态修改部分显示文字
      firing(row, id) {
      	if(id === '1') {
      		this.mixTypeAdd = true
      		this.title = '输入添加的分类名称：'
      	} else if(id === '2') {
					// 深拷贝处理
					this.row = this.row = JSON.parse(JSON.stringify(row))
					this.row.state = this.row.state.toString()
					this.row.webShow = this.row.webShow.toString()
      		this.mixTypeModify = true
      		this.title = '编辑分类名称（' + row.dname + '）'
      		this.typeName = this.getTypesName(this.row.tbid)
      	}
      	// 刷新页面时重置当前分页数
      	this.currentPage1 = 1
      },
      // 新增/修改类型、名称弹出的关闭函数
      cancel(id) {
      	if(id === '1') {
      		this.mixTypeModify = false
      	} else if(id === '2') {
      		this.mixTypeModifyUp = false
      	} else if(id === '3') {
      		this.mixTypeAdd = false
      	}
      	this.row = {}, this.name = '', this.dname = ''
      },
      // 新增分类
      addName() {
        let _this = this
        if(this.name.replace(/\s*/g,"").length === 0) {
        	this.$alert('分类名称不能为空', '警告', { confirmButtonText: '确定' })
        } else if(this.typeName.replace(/\s*/g,"").length === 0) {
        	this.$alert('类型不能为空', '警告', { confirmButtonText: '确定' })
        } else {
          this.detailsAdd({tbid: this.getTypesID(this.typeName), dname: this.name, state: '1', webShow: '1'})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:18})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo({types:'leixin:details'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              // 更新页面调用app.vue的更新方法
              _this.reload()
            })
          // 刷新页面时重置当前分页数
          this.currentPage1 = 1
        }
      },
      // 删除分类
      classifyDel(index, did) {
        let _this = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.detailsDel({did: did})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:20, id: did})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo({types:'leixin:details'})
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
      // 获取当前分类的上级项目id
      getProjectID(xname) {
      	return this.$store.getters.getUserProjectsId(xname).pid
      },
      // 获取当前分类的上级类型id
      getTypesID(lname) {
      	return this.$store.getters.getUserTypesId(lname).tid
      },
      // 获取当前分类的上级项目名称
      getProjectName(pid) {
      	return this.$store.getters.getUserProjectsName(pid).xname
      },
      // 获取当前分类的上级分类名称
      getTypesName(tid) {
      	return this.$store.getters.getUserTypesName(tid).lname
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
      	return this.minTypeSou
      },
      handleSelect(item) {
      	console.log(item);
      }
    },
    mounted() {
    	this.restaurants = this.loadAll();
    },
    created() {
      let _this = this
      this.getPublicInfo({types:'leixin:types,details'})
        .then(function (response) {
          if (response.code === 200 && response.data !== '') {
            if (response.data.types !== "[]" && response.data.types.length !== 0) {
              response.data.types.find((o, index)=>{
               _this.$set(_this.tList, _this.tList.length, o)
              })
              _this.tList.find((obj, index) => {
                _this.tListSou.push({
                  "value": obj.lname,
                  "address": obj.tid
                })
              })
            }
            if (response.data.details !== "[]" && response.data.details.length !== 0) {
              response.data.details.find((o, index)=>{
               _this.$set(_this.minType, _this.minType.length, o)
              })
              _this.minType.find((obj, index) => {
                _this.minTypeSou.push({
                  "value": obj.dname,
                  "address": obj.did
                })
              })
            }
            _this.loadingList = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
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
