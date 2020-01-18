<template>
  <el-container>
  	<el-main>
  		<p>
  			<el-button type="primary" size="medium" @click="groupAdd = true">添加用户组</el-button>
  			<el-alert title="重要提示" description="默认设计师、管理员权限组为不可删除，不可修改。指定删除的权限组（删除的权限组下有用户绑定），默认修改为设计师权限组" type="warning" show-icon style="width: 600px; margin: 20px 0;"></el-alert>
  			<el-dialog title="添加用户组" :visible.sync="groupAdd" width="30%" center>
  				<el-input size="small" v-model="groupNameAdd" placeholder="组名称"></el-input>
  				<div v-for="(time, index) in groups" style="margin-top: 25px;">
  					<el-checkbox :indeterminate="time.isIndeterminate" v-model="time.checkAll" @change="handleCheckAllChange(time.checkAll, index)">{{time.name}}</el-checkbox>
  					<el-checkbox-group v-model="time.checkedCities" @change="handleCheckedCitiesChange(time.checkedCities, index)" style="margin-left: 25px;">
  						<el-checkbox v-for="(city, index) in time.cityOptions" :label="city" :key="city" name="type">{{city}}</el-checkbox>
  					</el-checkbox-group>
  				</div>
          <el-checkbox style="margin-top: 25px;" v-model="groupForbid">禁止删除/修改(选中后将不可修改/删除)</el-checkbox>
  				<span slot="footer" class="dialog-footer">
  				    <el-button @click="groupAdd = false">取 消</el-button>
  				    <el-button type="primary" @click="groupUserAdd">确 定</el-button>
  				</span>
  			</el-dialog>
  		</p>
  		<el-table v-loading="loading" :data="usergroups"  :stripe="true" size="mini" style="width: 100%; margin-top: 20px;">
  			<el-table-column prop="title" label="组名称" width="180" align="center"></el-table-column>
  			<el-table-column prop="rules" label="权限"  min-width="200" align="center">
  				<template slot-scope="slotProps">
  					{{getGroupUserName(slotProps.row.rules)}}
  				</template>
  			</el-table-column>
        <el-table-column prop="userlist" label="用户数" width="100" align="center">
          <template slot-scope="slotProps">
          	{{slotProps.row.userlist.length}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100" align="center">
          <template slot-scope="slotProps">
            <el-tag v-if="slotProps.row.state === '1'" type="success">正常使用</el-tag>
            <el-tag v-if="slotProps.row.state === '2'" type="danger">已禁用</el-tag>
          </template>
        </el-table-column>
  			<el-table-column label="操作" align="center" width="200">
  				<template slot-scope="slotProps">
  					<el-button size="mini" type="primary" circle icon="el-icon-edit" title="编辑" @click="updateGroupsShow(slotProps.row.id)" :disabled="slotProps.row.disabled === '2' ? true : false"></el-button>
  					<el-dialog title="修改用户组" :visible.sync="groupUpdate" width="30%" center v-if="groupUpdate && groupUpdateSingle !== {}">
  						<el-input size="small" v-model="groupUpdateSingle[0].title" placeholder="组名称"></el-input>
  						<div v-for="(time, index) in groupUpdateSingle[0].rules" style="margin-top: 25px;">
  							<el-checkbox :indeterminate="time.isIndeterminate" v-model="time.checkAll" @change="handleCheckAllChangeUp(time.checkAll, index, groupUpdateSingle[0].id)">{{time.name}}</el-checkbox>
  							<el-checkbox-group v-model="time.checkedCities" @change="handleCheckedCitiesChangeUp(time.checkedCities, index, groupUpdateSingle[0].id)" style="margin-left: 25px;">
  								<el-checkbox v-for="(city, index) in time.cityOptions" :label="city" :key="city" name="type">{{city}}</el-checkbox>
  							</el-checkbox-group>
  						</div>
              <el-checkbox style="margin-top: 25px;" v-model="groupUpdateSingle[0].disabled">禁止删除/修改(选中后将不可修改/删除)</el-checkbox>
  						<span slot="footer" class="dialog-footer">
  						    <el-button @click="groupUpdate = false">取 消</el-button>
  						    <el-button type="primary" @click="updateGroups(slotProps.row.id)">确 定</el-button>
  						</span>
  					</el-dialog>
  					<el-button size="mini" type="danger" icon="el-icon-delete" circle title="删除" @click="groupsDelete(slotProps.row.id)" :disabled="slotProps.row.disabled === '2' ? true : false"></el-button>
  				</template>
  			</el-table-column>
  		</el-table>
  	</el-main>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    inject: ['reload'],
    name: 'userGroup',
    components: {
      
    },
    data() {
      return {
        groupNameAdd: '',
        loading: true,
        groupAdd: false,
        groupAddInspect: false,
        groupUpdate: false,
        groups: [],
        groupsInitial: [],
        usergroups: [],
        groupUpdateSingle: {},			
        groupUpdateInspect: false,
        groupForbid: false
      }
    },
    watch: {
    	// 值为false时清空所有权限选中状态，权限组名称
    	groupAdd:function (newQuestion, oldQuestion) {
    	    if (this.groupAdd === false) {
    	    	this.groups.find(obj => {
    	    		obj.rules === null ? obj.isIndeterminate = false : obj.isIndeterminate = true
    	    		obj.checkedCities = []
    	    		obj.checkAll = false
    	    	})
    	    	this.groupNameAdd = ''
    	    }
    	  },
    	  // 值为false时groupUpdateSingle改为空数组
    	groupUpdate:function (newQuestion, oldQuestion) {
    	    if (this.groupUpdate === false) {
    	    	this.groupUpdateSingle = {}
    	    }
    	},
      groups:function () {
        console.log(this.groups)
      }
    },
    methods: {
      ...mapActions([
        'authList',
        'authGroupadd',
        'authGrouplist',
        'authGroupdel',
        'authGroupone',
        'authGroupedit',
        'setOperationInfo'
      ]),
      // 新增组单个功能组全选
      handleCheckAllChange(val, index) {
      	this.groups[index].checkedCities = val ? this.groups[index].cityOptions : []
      	this.groups[index].isIndeterminate = false
      	this.groupInspect('add', null)
      },
      // 单个功能选中并更新当前上级选择框的状态更新
      handleCheckedCitiesChange(value, index) {
      	let checkedCount = value.length
      	this.groups[index].checkAll = checkedCount === this.groups[index].cityOptions.length
      	this.groups[index].isIndeterminate = checkedCount > 0 && checkedCount < this.groups[index].cityOptions.length
      	this.groupInspect('add', null)
      },
      // 修改组单个功能组全选
      handleCheckAllChangeUp(val, index, id) {
      	this.groupUpdateSingle[0].rules[index].checkedCities = val ? this.groupUpdateSingle[0].rules[index].cityOptions : new Array()
      	this.groupUpdateSingle[0].rules[index].isIndeterminate = false
      	this.groupInspect('update', id)
      	
      },
      // 修改单个功能选中并更新当前上级选择框的状态更新
      handleCheckedCitiesChangeUp(value, index, id) {
      	let checkedCount = value.length
      	this.groupUpdateSingle[0].rules[index].checkAll = checkedCount === this.groupUpdateSingle[0].rules[index].cityOptions.length
      	this.groupUpdateSingle[0].rules[index].isIndeterminate = checkedCount > 0 && checkedCount < this.groupUpdateSingle[0].rules[index].cityOptions.length
      	this.groupInspect('update', id)
      },
      // 删除权限组
      groupsDelete(id) {
        let _this = this
      	this.$confirm('此操作将删除该权限组, 是否继续?', '提示', {
      		confirmButtonText: '确定',
      		cancelButtonText: '取消',
      		type: 'warning'
      	}).then(() => {
      		// 关闭loading
          _this.setLoading(true)
          _this.authGroupdel({id:id})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:11, id:id})
                _this.$message({message: response.msg, type: 'success'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
      	}).catch(() => {
          // 取消删除
        });
      },
      // 修改权限组框的显示
      updateGroupsShow (id) {
        let _this = this, groupUpdateSingle = {}
        // 当前权限组赋值给groupUpdateSingle变量
      	this.authGroupone({id: id})
          .then(function (response) {
            if (response.code === 200) {
              console.log(response)
              groupUpdateSingle.id = response.data.id
              groupUpdateSingle.title = response.data.title
              groupUpdateSingle.status = response.data.status
              groupUpdateSingle.rules = response.data.rules
              groupUpdateSingle.disabled = response.data.disabled === '2' ? true : false
              groupUpdateSingle.rules.find( o => {
                  typeof o.checkedCities === "string" ? o.checkedCities === "[]" ? o.checkedCities = [] : o.checkedCities = eval('(' + o.checkedCities + ')') : o.checkedCities
                  typeof o.checkAll === "string" ? o.checkAll = eval('(' + o.checkAll + ')') : o.checkAll
                  typeof o.isIndeterminate === "string" ? o.isIndeterminate = eval('(' + o.isIndeterminate + ')') : o.isIndeterminate
                  typeof o.cityOptions === "string" ? o.cityOptions === "[]" ? o.cityOptions = [] : o.cityOptions = eval('(' + o.cityOptions + ')') : o.cityOptions
                })
              // 数据更新
              _this.$set(_this.groupUpdateSingle, 0, groupUpdateSingle)
              // 打开权限组修改框
              _this.groupUpdate = true
            }
          })
          .catch(function (error) {
            _this.$alert(error.msg, {confirmButtonText: '确定'})
          })
      },
      // 修改权限组
      updateGroups (id) {
        let _this = this
      	if (this.groupUpdateSingle[0].title.length === 0) {
      		this.$alert('请填写组名称', '警告', {confirmButtonText: '确定'})
      	} else if (this.groupUpdateInspect === false) {
      		this.$alert('请选择需要修改的功能页，如果不修改请选择取消', '警告', {confirmButtonText: '确定'})
      	} else {
      		// 关闭loading
          this.setLoading(true)
      		// 有二级权限的checkedCities字段内容改字符串‘[]’
      		this.groupUpdateSingle[0].rules.find(obj => {obj.checkedCities.length === 0 ? obj.checkedCities = '[]' : obj.checkedCities})
      		// 修改权限组接口
      		this.authGroupedit({id: id, title: this.groupUpdateSingle[0].title, rules: this.groupUpdateSingle[0].rules, disabled: this.groupUpdateSingle[0].disabled ? '2' : '1'})
            .then(function (response) {
              if (response.code === 200) {
                _this.setOperationInfo({_this:_this, type:10, id:id})
                _this.$message({message: response.msg, type: 'success'})
                // 关闭添加用户组弹窗
                _this.groupUpdate = false
                // 清空groupUpdateSinglen内容
                _this.groupUpdateSingle = []
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
      	}
      },
      // 添加权限组
      groupUserAdd () {
        let _this = this
      	if (this.groupNameAdd.length === 0) {
      		this.$alert('请填写组名称', '警告', {confirmButtonText: '确定'})
      	} else if (this.groupAddInspect === false) {
      		this.$alert('请填写权限，不能为空', '警告', {confirmButtonText: '确定'})
      	} else {
          // 开启loading
          this.setLoading(true)
      		// 有二级权限的checkedCities字段内容改字符串‘[]’
      		this.groups.find(obj => {
      			obj.checkedCities.length === 0 ? obj.checkedCities = '[]' : obj.checkedCities
      			obj.cityOptions.length === 0 ? obj.cityOptions = '[]' : obj.cityOptions
      		})
      		// 添加用户组
          this.authGroupadd({title: this.groupNameAdd, rules: this.groups, disabled: !this.groupForbid ? '1' : '2'})
            .then(function (response) {
              if (response.code === 200) {
                // 关闭添加用户组弹窗
                _this.groupAdd = false
                _this.setOperationInfo({_this:_this, type:9})
                _this.$message({message: response.msg, type: 'success'})
                // 更新页面调用app.vue的更新方法
                _this.reload()
              }
            })
            .catch(function (error) {
              _this.$alert(error.msg, {confirmButtonText: '确定'})
            })
      	}
      },
      // 检查权限功能是否选中
      // type: 检查的类型      gid（string）： 权限组id
      groupInspect (type, gid) {
      	var temp = []
      	var i = 0
      	switch (type) {
      		case 'add':
      			// 通过find喊出循环数组，判断每个数组对象一级或二级功能有没有被选中temp自身+1赋值，判断temp里有没有被选中的返回对错
      		    this.groups.find(obj => {
      		    	obj.checkAll === true ? temp.push(1) : obj.checkedCities.length >= 1 ? temp.push(1) : temp.push(0)
      	    	})
      		    temp.filter(num => {return num === 1}).length >= 1 ? this.groupAddInspect = true : this.groupAddInspect = false
      		    break;
      		case 'update':
      			// 通过find喊出循环数组，判断每个数组对象一级或二级功能有没有被选中temp自身+1赋值，判断temp里有没有被选中的返回对错
      			if (gid !== null||undefined||'') {
      				this.groupUpdateSingle[0].rules.find(obj => {
      					obj.checkAll === true ? temp.push(1) : obj.checkedCities.length >= 1 ? temp.push(1) : temp.push(0)
      				})
      				temp.filter(num => {return num === 1}).length >= 1 ? this.groupUpdateInspect = true : this.groupUpdateInspect = false
      			}
      		    break;
      	}
      	temp = []
      },
      // 获取当前权限组所有权限名称
      getGroupUserName (obj) {
      	var names = []
      	var i = 0
      	obj.find( o => {
      		// 有二级权限的添加一级权限名称
      		o.checkAll === true ? names.push(o.name) : o.checkedCities.length >= 1 ? names.push(o.name) : console.log()
      		// 二级权限选中状态不为空全部添加名称
      		o.checkedCities.length >= 1 ? o.checkedCities.find(checked => {names.push(checked)}) : console.log()
      		i++
      	})
      	return names.join(', ')
      },
      // 开启/关闭loading
      setLoading (Boolean) {
      	this.loading = Boolean
      },
      getAuthList() {
        let _this = this
        this.authList()
          .then(function (response) {
            if (response.code === 200) {
             // 权限组调用数组
             _this.groups = response.data.userGroup
             // 权限组初始化数组
             _this.groupsInitial = response.data.userGroup
            }
          })
          .catch(function (error) {
            // _this.$alert(error.msg, {confirmButtonText: '确定'})
          })
      }
    },
    created() {
      let _this = this
     // 获取权限的所有功能页
     this.getAuthList()
     // 获取权限组list
     this.authGrouplist()
      .then(function (response) {
        if (response.code === 200) {
         _this.usergroups = response.data
         _this.usergroups.find(obj => {
         	obj.rules.find( o => {
         		typeof o.checkedCities === "string" ? o.checkedCities === "[]" ? o.checkedCities = [] : o.checkedCities = eval('(' + o.checkedCities + ')') : o.checkedCities
         		typeof o.checkAll === "string" ? o.checkAll = eval('(' + o.checkAll + ')') : o.checkAll
         		typeof o.isIndeterminate === "string" ? o.isIndeterminate = eval('(' + o.isIndeterminate + ')') : o.isIndeterminate
         		typeof o.cityOptions === "string" ? o.cityOptions === "[]" ? o.cityOptions = [] : o.cityOptions = eval('(' + o.cityOptions + ')') : o.cityOptions
         	})
         })
         
        }
      })
      .catch(function (error) {
        // _this.$alert(error.msg, {confirmButtonText: '确定'})
      })
     // 关闭loading
     this.setLoading(false)
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
