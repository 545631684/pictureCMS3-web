<template>
  <div class="surface1" v-loading="loading">
    <div id="articleProject_pie1" ref="articleProject_pie1" style="height: 600px; width: 33%;position: absolute; left: 0%;"></div>
    <div id="articleProject_pie2" ref="articleProject_pie2" style="height: 600px; width: 34%;position: absolute; left: 33%;"></div>
    <div id="articleProject_pie3" ref="articleProject_pie3" style="height: 600px; width: 33%;position: absolute; left: 67%;"></div>
    <div class="tb4Time">
      <el-tooltip popper-class="toolp" placement="top" effect="light">
        <div slot="content">
          <p><b>项目:</b>选择项目显示相应的项目的文章分类信息,如果项目太多可输入关键词会提示相关项目信息。</p>
          <p><b>时间:</b>可查询最大跨度一年的数据，不填默认查询全部数据。</p>
          <p><b>注意:</b>搜索时项目和时间不填写默认查询所有项目的文章分类、文件类型、项目分布数据。</p>
        </div>
        <i class="el-icon-question" style="color: rgb(0, 0, 0);"></i>
      </el-tooltip>
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
      <span class="demonstration">时间：</span>
      <el-date-picker v-model="timeValue" type="monthrange" align="right" value-format="yyyy-MM"
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-button plain style="margin-left: 20px;" @click="queryArticleProject">查询</el-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    props: ['effect'], // 接收父组件的方法
    name: 'modularArticleProject',
    components: {},
    data() {
      return {
        loading: false,
        timeValue: [],
        projectValue:'',
        projects:[],
        filetype:[],
        articleType:[],
        articleProjectData_pie1:{
          title: {},
          tooltip:{
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: [
            {
              left: '10%',
              top: '90%',
              width: "80%",
              data: [],
              type: 'scroll',
            }
          ],
          toolbox:{
            show: false,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
              {
                  name: '文章数量',
                  type: 'pie',
                  radius: [20, 200],
                  center: ['50%', '50%'],
                  data: []
              },
          ]
        },
        articleProjectData_pie2:{
          title: {},
          tooltip:{
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: [
            {
              left: '20%',
              top: '90%',
              width: "80%",
              data: []
            }
          ],
          toolbox:{
            show: false,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
              {
                  name: '文章数量',
                  type: 'pie',
                  radius: [20, 130],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  data: []
              },
          ]
        },
        articleProjectData_pie3:{
          title: {},
          tooltip:{
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: [
            {
              left: '30%',
              top: '90%',
              width: "50%",
              data: []
            }
          ],
          toolbox:{
            show: false,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
              {
                  name: '文件数量',
                  type: 'pie',
                  radius: [20, 130],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  data: []
              },
          ]
        },
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
     effect:function(newQuestion, oldQuestion) {
       if(this.effect === 'dark'){
        this.queryArticleProject()
       }
     }
    },
    mounted() {},
    methods: {
      ...mapActions([
        'getArticleProject'
      ]),
      // 统计图表生成-圆饼图
      generateChart () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleProject_pie1'),'walden')
        // 防止错乱 生成前清空实例
        myChart.clear()
      	// 绘制图表
        myChart.setOption(_this.articleProjectData_pie1)
      },
      // 统计图表生成-圆饼图
      generateChart2 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart2 = this.$echarts.init(document.getElementById('articleProject_pie2'),'walden')
        // 防止错乱 生成前清空实例
        myChart2.clear()
      	// 绘制图表
        myChart2.setOption(_this.articleProjectData_pie2)
      },
      // 统计图表生成-圆饼图
      generateChart3 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart3 = this.$echarts.init(document.getElementById('articleProject_pie3'),'walden')
        // 防止错乱 生成前清空实例
        myChart3.clear()
      	// 绘制图表
        myChart3.setOption(_this.articleProjectData_pie3)
      },
      // 查询事件
      queryArticleProject() {
        let _this = this
        this.loading = true
        this.getArticleProject({beginTime:_this.timeValue[0], endTime:_this.timeValue[1], project:_this.projectValue})
          .then((response) => {
            if (response.code === 200) {
              console.log(response.data)
              // 项目信息赋值
              _this.projects.splice(0, _this.projects.length)
              response.data.projects.find(o=>{
                _this.projects.push(o)
              })
              console.log(111)
              // // 圆饼图清空上次数据
              _this.articleProjectData_pie1.legend[0].data.splice(0, _this.articleProjectData_pie1.legend[0].data.length)
              _this.articleProjectData_pie1.series[0].data.splice(0, _this.articleProjectData_pie1.series[0].data.length)
              _this.articleProjectData_pie2.legend[0].data.splice(0, _this.articleProjectData_pie2.legend[0].data.length)
              _this.articleProjectData_pie2.series[0].data.splice(0, _this.articleProjectData_pie2.series[0].data.length)
              _this.articleProjectData_pie3.legend[0].data.splice(0, _this.articleProjectData_pie3.legend[0].data.length)
              _this.articleProjectData_pie3.series[0].data.splice(0, _this.articleProjectData_pie3.series[0].data.length)

              // 圆饼图赋值
              response.data.articleProject.project.find(o=>{
                if(o.num !== 0){
                  _this.articleProjectData_pie1.legend[0].data.push(o.projectName)
                  _this.articleProjectData_pie1.series[0].data.push({value: o.num, name: o.projectName})
                }
              })

              // 在没有数据的情况下给假数据，填充界面空白
              if(_this.articleProjectData_pie1.legend[0].data.length == 0 && _this.articleProjectData_pie1.series[0].data.length == 0){
                response.data.articleProject.project.find(o=>{
                  _this.articleProjectData_pie1.legend[0].data.push(o.projectName)
                  _this.articleProjectData_pie1.series[0].data.push({value: 0, name: o.projectName})
                })
              }

              // 圆饼图赋值
              response.data.articleProject.articleType.find(o=>{
                if(o.num !== 0){
                  _this.articleProjectData_pie2.legend[0].data.push(o.typeName)
                  _this.articleProjectData_pie2.series[0].data.push({value: o.num, name: o.typeName})
                }
              })

              // 在没有数据的情况下给假数据，填充界面空白
              if(_this.articleProjectData_pie2.legend[0].data.length == 0 && _this.articleProjectData_pie2.series[0].data.length == 0){
                response.data.articleProject.articleType.find(o=>{
                  _this.articleProjectData_pie2.legend[0].data.push(o.typeName)
                  _this.articleProjectData_pie2.series[0].data.push({value: 0, name: o.typeName})
                })
              }

              // 圆饼图赋值
              response.data.articleProject.fileType.find(o=>{
                if(o.num !== 0){
                  _this.articleProjectData_pie3.legend[0].data.push(o.typeName)
                  _this.articleProjectData_pie3.series[0].data.push({value: o.num, name: o.typeName})
                }
              })

              // 在没有数据的情况下给假数据，填充界面空白
              if(_this.articleProjectData_pie3.legend[0].data.length == 0 && _this.articleProjectData_pie3.series[0].data.length == 0){
                response.data.articleProject.fileType.find(o=>{
                  _this.articleProjectData_pie3.legend[0].data.push(o.typeName)
                  _this.articleProjectData_pie3.series[0].data.push({value: 0, name: o.typeName})
                })
              }

              // 初始化图表
              _this.generateChart()
              _this.generateChart2()
              _this.generateChart3()
              // 关闭加载动画
              _this.loading = false
            }
          })
          .catch(function(error) {
            // _this.$alert('65456', {confirmButtonText: '确定'})
            _this.loading = false
          })
      },
    },
    created() {
      this.queryArticleProject()
    },
    beforeDestroy() {
      // 切换显示时清空参数
      this.timeValue.splice(0,this.timeValue.length)
    }
  }
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
  .tb4Time{position:absolute;height:100px;width:650px;top:0;right:0}
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
