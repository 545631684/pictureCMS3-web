<template>
  <div class="surface1" v-loading="loading">
    <div style="height: 600px;">
      <el-table
          :data="dataList"
          border
          stripe
          height="520"
          @sort-change="changeTableSort"
          style="width: 100%; position: absolute; top: 80px;">
          <el-table-column
            v-for="(item,index) in theadList"
            align="center"
            sortable
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :min-width="index === 0 ? labelstyle1.title:labelstyle1.tabNum">
          </el-table-column>
        </el-table>
    </div>
    <div class="tb4Time">
      <span class="demonstration">项目：</span>
      <el-select v-model="projectValue" clearable filterable placeholder="请选择" style="width: 100px;">
        <el-option-group
          v-for="group in projects"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-option-group>
      </el-select>
      <span class="demonstration">用户：</span>
      <el-select v-model="userValue" placeholder="请选择" clearable filterable style="width: 100px;">
        <el-option
          v-for="item in users"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="demonstration">标签组：</span>
      <el-select v-model="groupLabelValue" clearable filterable placeholder="请选择" style="width: 150px;">
        <el-option
          v-for="item in groupLabel"
          :key="item.gid"
          :label="item.name"
          :value="item.gid">
        </el-option>
      </el-select>
      <span class="demonstration" style="color: rgb(253, 62, 0);">标签：</span>
      <el-select v-model="labelValue" placeholder="请选择" clearable filterable style="width: 150px;">
        <el-option
          v-for="item in labelShow"
          :key="item.lid"
          :label="item.name"
          :value="item.lid">
        </el-option>
      </el-select>
      <span class="demonstration" style="color: rgb(253, 62, 0);">自定义关键词：</span>
      <el-input
        style="width: 200px;"
        placeholder="多个关键词：xx,xx,xx"
        prefix-icon="el-icon-search"
        v-model="keyValue"
        clearable>
      </el-input>
      <span class="demonstration">时间：</span>
      <el-date-picker v-model="timeValue" type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd"
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-tooltip popper-class="toolp" placement="top" effect="light" style="padding-left: 20px;">
        <div slot="content">
          <p><b>项目:</b>选择项目显示相应的项目文章信息,如果项目太多可输入关键词会提示相关项目信息。</p>
          <p><b>用户:</b>选择需要查询的用户,如果信息太多可输入关键词会提示相关用户信息。</p>
          <p><b>标签组:</b>标签的上级分类，与标签是联动关系，选择标签组后标签会显示相应标签组的标签并且会清除上次选中的标签。</p>
          <p><b>标签:</b>与标签组是联动关系，标签组未选择时显示全部标签，标签组选中时显示对应标签组的标签，如果信息太多可输入关键词会提示相关标签信息。</p>
          <p><b>自定义关键词:</b>可以自定义搜索关键词的文章情况，<b style="color: rgb(253, 62, 0);">支持多个关键词，格式：xx,xx,xx(半圆角逗号)</b>  在有自定义关键词进行搜索时会自动清空标签组和标签的选中内容。</p>
          <p><b>时间:</b>为空搜索全部，选择时间则最大跨度一年内的时间。</p>
          <p><b>注意:</b><b style="color: rgb(253, 62, 0);">自定义关键词为最优先级查询，如不需要请清空再查询</b>。</p>
        </div>
        <i class="el-icon-question" style="color: rgb(0, 0, 0);"></i>
      </el-tooltip>
      <el-button plain style="margin-left: 20px;" @click="queryArticleLabel(true)">查询</el-button>

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    props: ['effect'], // 接收父组件的方法
    name: 'modularArticleLabel',
    components: {},
    data() {
      return {
        loading: true,
        labelstyle1:{
          title:'300',
          tabNum:'110'
        },
        labelstyle2:{
          title:'150',
          tabNum:'150'
        },
        dataList: [],
        theadList: [],
        keyValue: '',
        userValue: '',
        projectValue:'',
        groupLabelValue:'',
        labelValue:'',
        projects:[],
        users: [],
        groupLabel: [],
        label: [],
        labelShow: [],
        timeValue: [],
        userALL: [],
        pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '最近3个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 2);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 5);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 11);
              picker.$emit('pick', [start, end]);
            }
          }],
          // 当我们选择日期时的回调方法。返回两个日期的最大值和最小值，第一次返回一个值，第二次返回两个值
          onPick: ({
            maxDate,
            minDate
          }) => {
            //当我们选择两个值的时候，就认为用户已经选择完毕
            if (maxDate != null && minDate != null) {
              this.maxDate = maxDate;
              this.minDate = minDate;
              let days = maxDate.getTime() - minDate.getTime();
              if (parseInt(days / (1000 * 60 * 60 * 24)) > 365) {
                this.$alert('请选择时间跨度一年内的时间', {
                  confirmButtonText: '确定'
                })
              }
            }
          },
          disabledDate: time => {
            let maxDate = this.maxDate;
            let minDate = this.minDate;
            if (maxDate != null && minDate != null) {
              let days = maxDate.getTime() - minDate.getTime();
              //计算完之后必须清除，否则选择器一直处于禁止选择的状态
              this.maxDate = null;
              this.minDate = null;
              return parseInt(days / (1000 * 60 * 60 * 24)) > 365;
            } else {
              //设置当前时间后的时间不可选
              return time.getTime() > Date.now() - 8.64e6;
            }
          }
        },
      }
    },
    watch:{
     label:function(newQuestion, oldQuestion) {
       if(this.label.length !== 0){
         this.label.find(o=>{
          this.labelShow.push(o)
         })
       }
     },
     groupLabelValue:function(newQuestion, oldQuestion) {
      let _this = this, label = JSON.parse(JSON.stringify(this.label))
      if(this.groupLabelValue !== ''){
         this.labelShow.splice(0, this.labelShow.length)
         this.labelValue = ''
         label.find(o=>{
           o.gid === _this.groupLabelValue ? _this.labelShow.push(o):o = o
         })
      } else{
        this.labelShow.splice(0, this.labelShow.length)
        this.labelValue = ''
        label.find(o=>{
         _this.labelShow.push(o)
        })
      }
     }
    },
    mounted() {},
    methods: {
      ...mapActions([
        'getArticleLabel'
      ]),
      changeTableSort(e) {
        //获取当前列的字段
        const prop = e.prop
        // 如果按降序
        if (e.order === 'descending') {
          //根据需要对字段进行写排序
          this.dataList = this.dataList.sort((a, b) => {
            return parseFloat(a[prop]) - parseFloat(b[prop])
          })
        } else { //发果是降序
          this.dataList = this.dataList.sort((a, b) => {
            return parseFloat(b[prop]) - parseFloat(a[prop])
          })
        }
      },
      // 查询事件
      queryArticleLabel(state){
        let _this = this, keyValue = []
        this.loading = true
        // 优先自定义关键词搜索清除标签组合标签选中参数
        if(_this.keyValue !== ''){
          // _this.keyValue.indexOf(',') !== -1 ? keyValue = _this.keyValue.split(',') : keyValue = _this.keyValue
          _this.groupLabelValue = ''
          _this.labelValue = ''
        }
        if(state === true && _this.keyValue === '' && _this.groupLabelValue === '' && _this.labelValue === ''){
          this.$alert('请选择要查询的标签组/标签，或输入自定义关键词', {
            confirmButtonText: '确定'
          })
          _this.loading = false
        } else {
          this.getArticleLabel({pid:_this.projectValue, uid:_this.userValue, key: _this.keyValue, lid:_this.labelValue, gid:_this.groupLabelValue, beginTime:_this.timeValue[0], endTime:_this.timeValue[1], state: state})
            .then((response) => {
              if (response.code === 200) {
                _this.dataList = response.data.article
                _this.loading = false
              }
            })
            .catch(function(error) {
              // _this.$alert('65456', {confirmButtonText: '确定'})
              _this.loading = false
            })
        }
      },
      // 初始化数据
      queryArticleLabel2(state){
        let _this = this, keyValue = []
        this.loading = true
        this.getArticleLabel({pid:_this.projectValue, uid:_this.userValue, key: _this.keyValue, lid:_this.labelValue, gid:_this.groupLabelValue, beginTime:_this.timeValue[0], endTime:_this.timeValue[1], state: state})
          .then((response) => {
            if (response.code === 200) {
              // 项目信息赋值
              _this.projects.splice(0, _this.projects.length)
              response.data.projects.find(o=>{
                _this.projects.push(o)
              })
              // 用户信息赋值
              _this.userALL = response.data.userALL
              response.data.users.find(o=>{
                _this.users.push({ value: o.uId, label: o.nickname })
              })
              // 标签赋值
              _this.labelShow = JSON.parse(JSON.stringify(_this.label))
              // 表头赋值
              response.data.thead.find(o=>{
                _this.theadList.push(o)
              })
              _this.loading = false
            }
          })
          .catch(function(error) {
            // _this.$alert('65456', {confirmButtonText: '确定'})
            _this.loading = false
          })
      }
    },
    created() {
      this.label = JSON.parse(JSON.stringify(this.$store.state.common.publicInfo.label))
      this.groupLabel = JSON.parse(JSON.stringify(this.$store.state.common.publicInfo.groupLabel))
      this.queryArticleLabel2()
    },
    beforeDestroy() {
      // 切换显示时清空参数
      this.timeValue.splice(0,this.timeValue.length)
    }
  }
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
  .tb4Time{position:absolute;height:40px;width:100%; top:25px;right:0}
  .tb4Time .demonstration{padding-right: 10px; padding-left: 10px;}
  .surface1{position:relative;height:600px;}
</style>
<style>
  .toolDiv{width:500px;height:auto;max-width:500px;background-color:#c2c4bf52}
  .toolDiv:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .toolDiv .toolDiv_title{font-size:28px;text-align:center;display:block;width:100%;height:50px;line-height:50px}
  .toolDiv ul{width:450px;height:auto;margin:0 auto}
  .toolDiv ul li{width:25%;height:40px;line-height:40px;float:left;text-align:center;display:flex;justify-content:flex-start;align-items:center}
  .toolDiv ul li samp:nth-child(1){display:block;width:10px;height:10px;border-radius:50px;margin-right:10px}
  .toolDiv ul li span:nth-child(2){display:block;width:50px;height:auto;text-align:justify}
</style>
