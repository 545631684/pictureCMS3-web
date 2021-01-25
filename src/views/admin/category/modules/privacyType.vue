<template>
  <el-container class="clearfix">
  		<el-header style="width: 100%; height: auto; padding: 0; margin-bottom: 20px;">
  			<el-row class="demo-autocomplete" style="width: 200px; margin-right: 10px; float: left;">
  				<el-col :span="24">
  					<el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入关键字进行搜索" :trigger-on-focus="false" @select="handleSelect" clearable></el-autocomplete>
  				</el-col>
  			</el-row>
  			<el-button type="primary" style="float: left;" @click="search()">搜索</el-button>
  			<el-button style="float: left;" @click="firing('', '1')">添加隐私分类</el-button>
        <div style="display: flex; width: 50px; height: 40px;align-items: center;justify-content: center;">
          <el-tooltip popper-class="toolp" placement="left" effect="light">
            <div slot="content">
              <p>只可绑定已有分类，在删除分类时如果有绑定的隐私分类必须先删除隐私分类才可正常删除分类。</p>
              <p>隐私分类可绑定用户及用户组，也可以单独设置其中一种，并且可以控制它的状态生效与否。</p>
              <p>生效的隐私分类会对不是管理员或者发布着用户以外的用户和用户组屏蔽缩略图（换成专用的屏蔽图）和禁止查看修改所属隐私分类的文章，对有权限的则恢复正常不受影响。</p>
            </div>
            <i class="el-icon-question" style="color: rgb(0, 0, 0);"></i>
          </el-tooltip>
        </div>
  			<el-dialog :title="title" :visible.sync="privacyTypeAdd" width="20%" center>
  				<div class="upPwd2">
  				  <p>分类：</p>
  					<el-select
  				    v-model="minTypesId"
  				    style="margin-left: 20px;"
  				    placeholder="请选择">
  				    <el-option
  				      v-for="item in minType"
  				      :key="item.did"
  				      :label="item.dname"
  				      :value="item.did"
                :disabled="item.disabled">
  				    </el-option>
  				  </el-select>
  				</div>
  				<div class="upPwd2">
  				  <p>绑定用户：</p>
  					<el-select
              multiple
  				    v-model="usersId"
  				    style="margin-left: 20px;"
  				    placeholder="请选择">
  				    <el-option
  				      v-for="item in userALL"
  				      :key="item.uId"
  				      :label="item.nickname"
  				      :value="item.uId">
  				    </el-option>
  				  </el-select>
  				</div>
          <div class="upPwd2">
            <p>绑定用户组：</p>
          	<el-select
              multiple
              v-model="authGroupId"
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in authGroups"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="upPwd2">
            <p>状态：</p>
          	<div class="el-select" style="width: 221.4px; margin-left: 20px;">
          	  <el-radio v-model="state" label="1">已生效</el-radio>
          	  <el-radio v-model="state" label="2">未生效</el-radio>
          	</div>
          </div>
  				<span slot="footer" class="dialog-footer">
            <el-button @click="cancel('1')">取 消</el-button>
            <el-button type="primary" @click="addPrivacyType()">确 定</el-button>
          </span>
  			</el-dialog>
        <div class="clearfix"></div>
        <el-alert title="重要提示" description="编辑时分类不可修改,删除隐私分类无任何影响" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  		</el-header>

  		<el-footer style="height: auto;">
  			<el-table v-loading="loadingP" :data="privacyTypes3" class="clearfix" :stripe="true" size="mini" style=" min-height: 474px;">
  				<el-table-column prop="id" label="id" width="50" align="center"></el-table-column>
  				<el-table-column prop="tid" label="分类名称" min-width="100" align="center">
            <template slot-scope="scope">
              {{getMinTypesName(scope.row.tid)}}
            </template>
          </el-table-column>
  				<el-table-column prop="users" label="可查看用户" min-width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.users === null ? '' : getUserName(scope.row.users)}}
            </template>
          </el-table-column>
  				<el-table-column prop="authGroup" label="可查看用户组" min-width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.authGroup === null ? '' : getAuthGroupsName(scope.row.authGroup)}}
            </template>
          </el-table-column>
          <el-table-column prop="articlelist" label="文章" width="100" align="center"></el-table-column>
  				<el-table-column prop="state" label="状态" width="100" align="center">
  					<template slot-scope="scope">
              <el-tag v-if="scope.row.state === '1'" type="success">已生效</el-tag>
              <el-tag v-if="scope.row.state === '2'" type="danger">未生效</el-tag>
  					</template>
  				</el-table-column>
  				<el-table-column label="操作" align="center" width="200">
  					<template slot-scope="scope">
              <el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" @click="firing(scope.row, '2')" style="margin-left: 20px;"></el-button>
  						<el-dialog :title="title" :visible.sync="privacyTypeUp" width="24%" center>
  							<div class="upPwd2">
  							  <p>分类：</p>
                  <el-select
                    :disabled="true"
                    v-model="row.tid"
                    style="margin-left: 20px;"
                    placeholder="请选择">
                    <el-option
                      v-for="item in minType"
                      :key="item.did"
                      :label="item.dname"
                      :value="item.did"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
  							</div>
  							<div class="upPwd2">
  							  <p>绑定用户：</p>
  								<el-select
  							    multiple
  							    v-model="row.users"
  							    style="margin-left: 20px;"
  							    placeholder="请选择">
  							    <el-option
  							      v-for="item in userALL"
  							      :key="item.uId"
  							      :label="item.nickname"
  							      :value="item.uId">
  							    </el-option>
  							  </el-select>
  							</div>
                <div class="upPwd2">
                  <p>绑定用户组：</p>
                	<el-select
                    multiple
                    v-model="row.authGroup"
                    style="margin-left: 20px;"
                    placeholder="请选择">
                    <el-option
                      v-for="item in authGroups"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="upPwd2">
                  <p>状态：</p>
                  <div class="el-select" style="width: 221.4px;margin-left: 20px;">
                    <el-radio v-model="row.state" label="1">已生效</el-radio>
                    <el-radio v-model="row.state" label="2">未生效</el-radio>
                  </div>
                </div>
  							<span slot="footer" class="dialog-footer">
                  <el-button @click="cancel('2')">取 消</el-button>
                  <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)" :loading="handleUpdateLoading">确 定</el-button>
                </span>
  						</el-dialog>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle title="删除" @click="delType(scope.$index, scope.row.id)"></el-button>
  					</template>
  				</el-table-column>
  			</el-table>
  		</el-footer>
  		<div class="block" style="width: 470px;margin: 0 0 0 20%;">
  			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="dataList" layout="total, prev, pager, next" :total="privacyTypes2.length">
  			</el-pagination>
  		</div>
  	</el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        loadingP: true,
        userALL: [],
        authGroups: [],
        minType: [],
        minTypeSou:[],
        privacyTypesSou: [],
        privacyTypes: [],
        privacyTypes2: [],
        privacyTypes3: [],
        uId: '',
        title: '',
        name: '',
        state:'1',
        row: {},
        handleUpdateLoading: false,
        privacyTypeAdd: false,
        privacyTypeUp: false,
        authGroupId: [],
        minTypesId: '',
        usersId: [],
        currentPage1: 1,
        dataList: 10
      }
    },
    watch: {
      // 监听privacyTypes有变动时对显示变量重新赋值
      privacyTypes: function(newQuestion, oldQuestion) {
        let _this = this
        this.privacyTypes2 = [], this.privacyTypes3 = [], this.privacyTypes2 = this.privacyTypes
        if(this.privacyTypes.length !== 0) {
          this.privacyTypes.find((obj, index) => {
            if(index < _this.dataList) {
              _this.$set(_this.privacyTypes3, _this.privacyTypes3.length, obj)
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
        'servicePrivacyTypeAdd',
        'privacyTypeSave',
        'setOperationInfo',
        'privacyTypeDel',
        'addShieldUserType'
      ]),
      // 搜索操作
      search () {
        let temp = [] , _this = this
        this.loadingP = true, this.privacyTypes2 = [], this.privacyTypes3 = []
        if (this.state2.length !== 0) {
          this.privacyTypes.find((obj, index) => {
            _this.minType.find(t=>{
              if(obj.tid === t.did){
                t.dname.indexOf(_this.state2) !== -1 ? temp.push(obj) : t = t
              }
            })
            // console.log(obj.lname.indexOf())
          })
          if (temp.length !== 0) {
            temp.find((obj, index) => {
              _this.privacyTypes2.push(obj)
            })
            this.handleCurrentChange(1)
          }
        } else {
          this.privacyTypes.find((obj, index) => {
            _this.$set(_this.privacyTypes2, _this.privacyTypes2.length, obj)
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
        // console.log('当前页: ' + val)
        let _this = this
        // 抓取数据下标开始位置
        let begin = (this.dataList * val) - this.dataList
        // 抓取数据下标开结束位置
        let end = (this.dataList * val) - 1
        // 清空当前页显示数据
        this.privacyTypes3 = []
        // 循环抓取从起始位置到结束位置的数据
        this.privacyTypes2.find((obj, index) => {
          if(index >= begin && index <= end) {
            _this.$set(_this.privacyTypes3, _this.privacyTypes3.length, obj)
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
        if(this.row.users.length === 0 && this.row.authGroup.length === 0){
          this.$alert('请选择可查看的用户或用户组', '警告', {
            confirmButtonText: '确定'
          })
        } else {
          this.handleUpdateLoading = true
          this.privacyTypeSave({id: this.row.id, tid: this.row.tid, uid: this.row.users.toString(), qroupid: this.row.authGroup.toString(), state: this.row.state})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:35})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo({types:'leixin:privacyType'})
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
        if(id === '1') {
          this.privacyTypeAdd = true, this.title = '添加隐私分类：'
        } else if(id === '2') {
          // 深拷贝处理
          this.row = JSON.stringify(row), this.row = JSON.parse(this.row)
          this.row.users = this.row.users === '' ? [] : this.row.users.split(',')
          this.row.authGroup = this.row.authGroup === '' ? [] : this.row.authGroup.split(',')
          this.privacyTypeUp = true, this.title = '设置隐私分类：'
        }
      },
      // 关闭添加/修改
      cancel(id) {
         if(id === '1') {
          this.privacyTypeAdd = false
        } else if(id === '2') {
          this.privacyTypeUp = false
        }
        this.row = {}, this.authGroupId = [], this.minTypesId = '', this.usersId = []
      },
      // 添加隐私分类
      addPrivacyType() {
        let _this = this
        if(this.minTypesId.length === 0) {
          this.$alert('请选择需要添加的隐私分类', '警告', {
            confirmButtonText: '确定'
          })
        } else if(this.usersId.length === 0 && this.authGroupId.length === 0){
          this.$alert('请选择可查看的用户或用户组', '警告', {
            confirmButtonText: '确定'
          })
        } else {
          this.servicePrivacyTypeAdd({tid: this.minTypesId, uid: this.usersId.toString(), qroupid: this.authGroupId.toString(), state: this.state})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:34})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo({types:'leixin:privacyType'})
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
      // 查询分类名称
      getMinTypesName(id){
        let name = ''
        this.minType.find(o=>{
          o.did === id ? name = o.dname : o = o
        })
        return name
      },
      // 查询用户昵称
      getUserName(id){
        let name = [], ids = []
        if(id === null){
          return ''
        } else {
          ids = id.split(',')
        }
        if(ids.length !== 0){
          ids.find(i=>{
            this.userALL.find(o=>{
              o.uId === i ? name.push(o.nickname) : o = o
            })
          })
        }
        return name.toString()
      },
      // 查询用户组名称
      getAuthGroupsName(id){
        let name = [], ids = id.split(',')
        if(ids.length !== 0){
          ids.find(i=>{
            this.authGroups.find(o=>{
              o.id === i ? name.push(o.title) : o = o
            })
          })
        }
        return name.toString()
      },
      // 删除类型
      delType(index, id) {
        let _this = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.privacyTypeDel({id: id})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:36, id:id})
                _this.$message({message: response.msg, type: 'success'})
                // 更新vuex、本地存储
                _this.setPublicInfo({types:'leixin:privacyType'})
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
        return this.privacyTypesSou
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
      this.getPublicInfo({types:'leixin:details,user,privacyType,authGroup'})
        .then(function (response) {
          if (response.code === 200 && response.data !== '') {
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
              response.data.users.find((o, index)=>{
               _this.$set(_this.userALL, _this.userALL.length, o)
              })
              response.data.authGroup.find((o, index)=>{
               _this.$set(_this.authGroups, _this.authGroups.length, o)
              })
              response.data.privacyType.find((o, index)=>{
               _this.$set(_this.privacyTypes, _this.privacyTypes.length, o)
               _this.minType.find((t, indext)=>{
                 if(t.did === o.tid){
                   t.disabled = true
                   _this.privacyTypesSou.push({
                     "value": t.dname,
                     "address": o.id
                   })
                 }
               })
              })
            }

            _this.loadingP = false
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
.demo-input-suffix .el-input{margin-left:15px; background: url(http://admin.jijingol.com/text/36.jpg) c no-repeat;}
.upPwd2{display: flex; justify-content: center; align-items: center;margin: 20px auto 10px;}
.upPwd2 p{width: 85px; text-align: right;}
.upPwd2 /deep/ .el-select__tags{z-index: 9999;}
</style>
