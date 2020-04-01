<template>
  <el-container class="clearfix">
  		<el-header style="width: 100%; height: auto; padding: 0; margin-bottom: 20px;">
  			<el-row class="demo-autocomplete" style="width: 200px; margin-right: 10px; float: left;">
  				<el-col :span="24">
  					<el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入关键字进行搜索" :trigger-on-focus="false" @select="handleSelect" clearable></el-autocomplete>
  				</el-col>
  			</el-row>
  			<el-button type="primary" style="float: left;" @click="search()">搜索</el-button>
  			<el-button style="float: left;" @click="firing('', '4')">添加类型</el-button>
        <el-button style="float: left;" @click="firing('', '5')">添加屏蔽人</el-button>
  			<el-dialog :title="title" :visible.sync="centerDialogVisibleAdd" width="20%" center>
  				<p class="upPwd">
  					<input class="el-input__inner" type="text" name="" id="" value="" v-model="name" @keyup.enter="addName()" />
  				</p>
  				<span slot="footer" class="dialog-footer">
  	            <el-button @click="cancel('3')">取 消</el-button>
  	            <el-button type="primary" @click="addName()">确 定</el-button>
  	          </span>
  			</el-dialog>
        <el-dialog :title="title" :visible.sync="centerDialogShield" width="20%" center>
        	<el-alert
        	  title="查看已屏蔽类型,请到<用户列表>查看用户屏蔽信息"
        	  type="warning"
        	  show-icon>
        	</el-alert>
          <div class="upPwd2">
            <p>项目：</p>
        		<el-select
              v-model="shieldPid"
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in PList"
                :key="item.pid"
                :label="item.xname"
                :value="item.pid">
              </el-option>
            </el-select>
        	</div>
          <div class="upPwd2">
            <p>类型：</p>
          	<el-select
              v-model="shieldTid"
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in tList"
                :key="item.tid"
                :label="item.lname"
                :value="item.tid">
              </el-option>
            </el-select>
          </div>
          <div class="upPwd2">
            <p>用户：</p>
        		<el-select
              v-model="shieldUid"
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in users"
                :key="item.uId"
                :label="item.nickname"
                :value="item.uId">
              </el-option>
            </el-select>
        	</div>
        	<span slot="footer" class="dialog-footer">
                <el-button @click="cancel('5')">取 消</el-button>
                <el-button type="primary" @click="addShield()">确 定</el-button>
              </span>
        </el-dialog>
        <div class="clearfix"></div>
        <el-alert title="重要提示" description="类型下如果有文章则不可删除,请先转移走文章后在进行删除操作" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  		</el-header>
  
  		<el-footer style="height: auto;">
  			<el-table v-loading="loadingP" :data="tList3" class="clearfix" :stripe="true" size="mini" style=" min-height: 474px;">
  				<el-table-column prop="tid" label="id" width="50" align="center"></el-table-column>
  				<el-table-column prop="lname" label="类型名称" min-width="100" align="center"></el-table-column>
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
  				<el-table-column label="操作" align="center" width="200">
  					<template slot-scope="scope">
              <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" @click="firing(scope.row, '2')" style="margin-left: 20px;"></el-button>
  						<el-dialog :title="title" :visible.sync="centerDialogVisibleT" width="24%" center>
  							<div class="demo-input-suffix">
  								项目名称:
  								<el-input style="width: auto;" class="el-input--suffix" placeholder="请输入内容"  name="" id="" v-model="row.lname"></el-input>
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
  				                <el-button @click="cancel('2')">取 消</el-button>
  				                <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)" :loading="handleUpdateLoading">确 定</el-button>
  			              	</span>
  						</el-dialog>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle title="删除" @click="delType(scope.$index, scope.row.tid)" :disabled="scope.row.articlelist === '0' ? false : true"></el-button>
  					</template>
  				</el-table-column>
  			</el-table>
  		</el-footer>
  		<div class="block" style="width: 470px;margin: 0 0 0 20%;">
  			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="dataList" layout="total, prev, pager, next" :total="tList2.length">
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
      myLoading: Boolean,
      users: Array,
      myProject: Array,
    },
    name: 'backstage',
    components: {},
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        loadingP: true,
        PList: [],
        PListSou: [],
        tListSou: [],
        minTypeSou: [],
        tList: [],
        tList2: [],
        tList3: [],
        uId: '',
        title: '',
        name: '',
        row: {},
        handleUpdateLoading: false,
        centerDialogVisibleP: false,
        centerDialogVisibleT: false,
        centerDialogVisibleAdd: false,
        centerDialogShield: false,
        shieldPid:[],
        shieldTid:[],
        shieldUid:[],
        currentPage1: 1,
        dataList: 10
      }
    },
    watch: {
      // 监听tList有变动时对显示变量重新赋值
      tList: function(newQuestion, oldQuestion) {
        let _this = this
        this.tList2 = [], this.tList3 = [], this.tList2 = this.tList
        if(this.tList.length !== 0) {
          this.tList.find((obj, index) => {
            if(index < _this.dataList) {
              _this.$set(_this.tList3, _this.tList3.length, obj)
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
        'setPublicInfo',
        'getPublicInfo',
        'typeAdd',
        'typesave',
        'setOperationInfo',
        'typeDel',
        'addShieldUserType'
      ]),
      // 搜索操作
      search () {
        let temp = [] ,_this = this
        this.loadingP = true, this.tList2 = [], this.tList3 = []
        if (this.state2.length !== 0) {
          this.tList.find((obj, index) => {
            obj.lname.indexOf(_this.state2) !== -1 ? temp.push(obj) : obj = obj
            // console.log(obj.lname.indexOf())
          })
          if (temp.length !== 0) {
            temp.find((obj, index) => {
              _this.tList2.push(obj)
            })
            this.handleCurrentChange(1)
          }
        } else {
          this.tList.find((obj, index) => {
            _this.$set(_this.tList2, _this.tList2.length, obj)
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
        this.tList3 = []
        // 循环抓取从起始位置到结束位置的数据
        this.tList2.find((obj, index) => {
          if(index >= begin && index <= end) {
            _this.$set(_this.tList3, _this.tList3.length, obj)
          }
        })
      },
      // 状态开关
      handleFiring(index, row, id) {
        if(id === false) {
          typeDisable(this, row.tid)
        } else if(id === true) {
          typeEnable(this, row.tid)
        }
      },
      // 类型编辑修改
      handleUpdate(index, row) {
        let _this = this
        this.handleUpdateLoading = true
        if(this.row.lname.replace(/\s*/g,"").length === 0) {
          this.$alert('类型名称不能为空', '警告', { confirmButtonText: '确定' })
        } else if(this.row.state.length > 1) {
          this.$alert('请选择状态的启用或禁用', '警告', { confirmButtonText: '确定' })
        } else if(this.row.webShow.length > 1) {
          this.$alert('请选择前台显示的启用或禁用', '警告', { confirmButtonText: '确定' })
        } else {
          // console.log({tid: row.tid, lname: row.lname, state: row.state, webShow: row.webShow})
          this.typesave({tid: this.row.tid, lname: this.row.lname, state: this.row.state, webShow: this.row.webShow})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:16})
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
        this.row = JSON.stringify(row), this.row = JSON.parse(this.row)
        if(id === '2') {
          this.centerDialogVisibleT = true, this.title = '编辑类型名称（' + row.lname + '）'
        } else if(id === '4') {
          this.centerDialogVisibleAdd = true, this.title = '输入添加的类型名称：'
        } else if(id === '5') {
      		this.centerDialogShield = true
      		this.title = '请设置需要屏蔽的项目、类型、用户：'
      	}
      },
      // 关闭添加/修改
      cancel(id) {
         if(id === '2') {
          this.centerDialogVisibleT = false
        } else if(id === '3') {
          this.centerDialogVisibleAdd = false
        } else if(id == '5') {
          this.centerDialogShield = false
        }
        this.row = {}, this.name = '', this.shieldPid = '', this.shieldTid = '', this.shieldUid = ''
      },
      // 添加项目/类型
      addName() {
        console.log(32134)
        let _this = this
        if(this.name.length === 0) {
          this.$alert('添加的名称不能为空', '警告', {
            confirmButtonText: '确定'
          })
        } else if(this.title.indexOf('类型') !== -1) {
          this.typeAdd({lname: this.name, state: '1', webShow: '1'})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:15})
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
      // 添加类型屏蔽人
      addShield(){
        let data = [], _this = this, PList = JSON.stringify(this.PList), tList = JSON.stringify(this.tList)
        PList = JSON.parse(PList)
        tList = JSON.parse(tList)
        if(this.shieldPid.length == 0){
          this.$alert('请选择项目', {confirmButtonText: '确定'})
        } else if(this.shieldTid.length == 0){
          this.$alert('请选择类型', {confirmButtonText: '确定'})
        } else if(this.shieldUid.length == 0){
          this.$alert('请选择用户', {confirmButtonText: '确定'})
        }else{
          PList.find((o, index)=>{ o.pid == _this.shieldPid ? data[0] = o : o = o })
          tList.find((o,index)=>{ o.tid == _this.shieldTid ? o.state = 1 : o.state = 0 })
          data[0].state = 0, data[0].type = tList, data[0].tid = this.shieldTid
          this.addShieldUserType({uId: this.shieldUid, shieldInfo: data})
            .then(function (response) {
              if (response.code === 200) {
                _this.$message({message: response.msg, type: 'success'})
                _this.setOperationInfo({_this:_this, type:33, uId: _this.shieldUid, shieldInfo: data})
                _this.cancel('5')
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
              _this.cancel('5')
            })
        }
      },
      // 删除类型
      delType(index, tid) {
        let _this = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(111)
          _this.typeDel({tid: tid})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:17, id:tid})
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
        return this.tListSou
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    created() {
      this.tList = this.myTypes
      this.tListSou = this.myTypesSou
      this.loadingP = this.myLoading
      this.userALL = this.users
      this.PList = this.myProject
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
.demo-input-suffix .el-input{margin-left:15px; background: url(http://admin.jijingol.com/text/36.jpg) c no-repeat;}
.upPwd2{display: flex; justify-content: center; align-items: center;margin: 20px auto 10px;}
</style>
