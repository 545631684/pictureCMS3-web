<template>
  <div class="surface1" v-loading="loading">
    <div id="articleUserDownload" ref="articleUserDownload" style="height: 600px;"></div>
    <!-- <div id="articleUserDownload" ref="articleUserDownload" style="height: 600px;width: 75%; position: absolute; left: 0;"></div>
    <div id="articleUserDownload_pie" ref="articleUserDownload_pie" style="height: 600px; width: 25%;position: absolute; left: 75%;"></div> -->
    <div class="tb4Time">
      <el-tooltip popper-class="toolp" placement="top" effect="light">
        <div slot="content">
          <p><b>状态:</b>职员是否离职。</p>
          <p><b>用户:</b>在选择状态后用户列表显示相应的用户信息,如果信息太多可输入关键词会提示相关用户信息。</p>
          <p><b>时间:</b>可查询单个月每天(个人)、单个月（多人）、以及多个月最大跨度一年的数据。</p>
          <p><b>注意:</b>搜索时用户信息不填写默认查询离职或在职用户数据。</p>
        </div>
        <i class="el-icon-question" style="color: rgb(0, 0, 0);"></i>
      </el-tooltip>
      <span class="demonstration">状态：</span>
      <el-select v-model="stateValue" placeholder="请选择" filterable style="width: 100px;">
        <el-option
          v-for="item in states"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
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
      <span class="demonstration">时间：</span>
      <el-date-picker v-model="timeValue" type="monthrange" align="right" value-format="yyyy-MM"
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-button plain style="margin-left: 20px;" @click="queryArticleUserDownload">查询</el-button>

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    props: ['effect'], // 接收父组件的方法
    name: 'modularArticleUserDownload',
    components: {},
    data() {
      return {
        loading: true,
        timeValue: [],
        states: [{
          value: '0',
          label: '在职'
        }, {
          value: '1',
          label: '离职'
        }],
        users: [],
        userALL: [],
        stateValue: '0',
        userValue: '',
        articleUserDownloadData1:{
          title: {},
          tooltip:{
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend:{
            left: '4%',
            top: '3%',
            data: []
          },
          grid:{
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:{
            type: 'category',
            data: [],
            boundaryGap: true,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        articleUserDownloadData_pie:{
          title: {},
          tooltip:{
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: [
            {
              left: '20%',
              top: '88%',
              width: "60%",
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
                  center: ['50%', '40%'],
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
        var myDate = new Date();
        var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var myMonth = (myDate.getMonth() + 1)<10?'0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份(0-11,0代表1月)
        var myToday = myDate.getDate()<10?'0' + myDate.getDate() : myDate.getDate(); //获取当前日(1-31)
        var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        var myHour = myDate.getHours(); //获取当前小时数(0-23)
        var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
        var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
        this.timeValue.push(myYear + '-' + myMonth)
        this.timeValue.push(myYear + '-' + myMonth)
        this.queryArticleUserDownload()
       }
     },
     stateValue:function(newQuestion, oldQuestion) {
       let _this = this
       this.users.splice(0, this.users.length)
       this.userValue = ''
       this.userALL.find(o=>{
         o.state === _this.stateValue ? _this.users.push({ value: o.uId, label: o.nickname }):o = o
       })
     }
    },
    mounted() {},
    methods: {
      ...mapActions([
        'getArticleUserDownload'
      ]),
      // 统计图表生成-柱状图
      generateChart (type) {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleUserDownload'),'walden')
        // 防止错乱 生成前清空实例
        myChart.clear()
      	// 绘制图表
        myChart.setOption(_this.articleUserDownloadData1)
      },
      // 统计图表生成-圆饼图
      generateChart2 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart2 = this.$echarts.init(document.getElementById('articleUserDownload_pie'),'walden')
        // 防止错乱 生成前清空实例
        myChart2.clear()
      	// 绘制图表
        myChart2.setOption(_this.articleUserDownloadData_pie)
      },
      // 图表查询事件
      queryArticleUserDownload(){
        let _this = this
        if (this.timeValue !== null) {
          this.loading = true
          this.getArticleUserDownload({uid:_this.userValue, state:_this.stateValue, beginTime:_this.timeValue[0], endTime:_this.timeValue[1]})
            .then((response) => {
              if (response.code === 200) {
                // 清空用户数据
                _this.userALL.splice(0, _this.userALL.length)
                _this.users.splice(0, _this.users.length)
                // 用户信息赋值
                _this.userALL = response.data.userALL
                response.data.users.find(o=>{
                  _this.users.push({ value: o.uId, label: o.nickname })
                })
                console.log(response.data)
                // // 圆饼图清空上次数据
                // _this.articleUserDownloadData_pie.legend[0].data.splice(0, _this.articleUserDownloadData_pie.legend[0].data.length)
                // _this.articleUserDownloadData_pie.series[0].data.splice(0, _this.articleUserDownloadData_pie.series[0].data.length)
                // // 圆饼图清空上次数据
                _this.articleUserDownloadData1.legend.data.splice(0, _this.articleUserDownloadData1.legend.data.length)
                _this.articleUserDownloadData1.series.splice(0, _this.articleUserDownloadData1.series.length)
                _this.articleUserDownloadData1.xAxis.data.splice(0, _this.articleUserDownloadData1.xAxis.data.length)

                if(response.data.type === '1'){
                  _this.setData1(response.data)
                }

                if(response.data.type === '2'){
                  _this.setData2(response.data)
                }

              }
            })
            .catch(function(error) {
              // _this.$alert('65456', {confirmButtonText: '确定'})
              _this.loading = false
            })
        } else {
          _this.$alert("请指定查询日期", {
            confirmButtonText: '确定'
          })
        }
      },
      // 图表生成：单人的柱状图+圆饼图
      setData1(data){
        let _this = this
        // ['img','psd','video','ai','pdf','zip','word','excel'] 没有则不显示
        // 圆饼图赋值
        // data.userStatistics[0].fileType.find(o=>{
        //   if(o.num !== '0'){
        //     _this.articleUserDownloadData_pie.legend[0].data.push(o.typeName)
        //     _this.articleUserDownloadData_pie.series[0].data.push({value: o.num, name: o.typeName})
        //   }
        // })
        
        // 柱状图表赋值
        _this.articleUserDownloadData1.legend.data.push(data.articleUserDownload[0].shuju.name)
        _this.articleUserDownloadData1.series.push({name: data.articleUserDownload[0].shuju.name, type: 'bar', data: []})
        data.articleUserDownload.find(p=>{
          _this.articleUserDownloadData1.xAxis.data.push(p.riqi)
          _this.articleUserDownloadData1.series[0].data.push(p.shuju.count)
        })

        // 初始化图表
        _this.generateChart(data.type)
        // _this.generateChart2()
        // 关闭加载动画
        _this.loading = false
      },
      // 图表生成：多人的柱状图+圆饼图
      setData2(data){
        let _this = this
        // ['img','psd','video','ai','pdf','zip','word','excel'] 没有则不显示
        // 圆饼图赋值
        // data.fileType.find(o=>{
        //   if(o.num !== '0'){
        //     _this.articleUserDownloadData_pie.legend[0].data.push(o.typeName)
        //     _this.articleUserDownloadData_pie.series[0].data.push({value: o.num, name: o.typeName})
        //   }
        // })
        
        // 柱状图表赋值
        _this.articleUserDownloadData1.legend.data.push('下载')
        _this.articleUserDownloadData1.series.push({name: '下载', type: 'bar', data: []})
        data.users.find(o=>{
          data.articleUserDownload.find(p=>{
            if(o.nickname === p.name){
              _this.articleUserDownloadData1.xAxis.data.push(o.nickname)
              _this.articleUserDownloadData1.series[0].data.push(p.count)
            }
          })
        })

        // 初始化图表
        _this.generateChart(data.type)
        // _this.generateChart2()
        // 关闭加载动画
        _this.loading = false
      }
    },
    created() {
      var myDate = new Date();
      var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var myMonth = (myDate.getMonth() + 1)<10?'0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份(0-11,0代表1月)
      var myToday = myDate.getDate()<10?'0' + myDate.getDate() : myDate.getDate(); //获取当前日(1-31)
      var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
      var myHour = myDate.getHours(); //获取当前小时数(0-23)
      var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
      var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
      this.timeValue.push(myYear + '-' + myMonth)
      this.timeValue.push(myYear + '-' + myMonth)
      this.queryArticleUserDownload()
    },
    beforeDestroy() {
      // 切换显示时清空参数
      this.timeValue.splice(0,this.timeValue.length)
    }
  }
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
  .tb4Time{position:absolute;height:100px;width:850px;top:0;right:0}
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
