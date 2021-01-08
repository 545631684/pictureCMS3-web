<template>
  <div class="surface1" v-loading="loading">
    <div id="surfaceInfo" ref="pieEcharts" style="height: 600px;"></div>
    <div class="tb4Time">
      <span class="demonstration">查询设置：</span>
      <el-date-picker v-model="timeValue" type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd"
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-button plain style="margin-left: 20px;" @click="queryUserBrowseWebInfo">查询</el-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    props: ['effect'], // 接收父组件的方法
    name: 'modularUserBrowseWebInfo',
    components: {},
    data() {
      return {
        loading: true,
        timeValue: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
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
              if (parseInt(days / (1000 * 60 * 60 * 24)) > 90) {
                this.$alert('只能选择3个月内', {
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
              return parseInt(days / (1000 * 60 * 60 * 24)) > 90;
            } else {
              //设置当前时间后的时间不可选
              return time.getTime() > Date.now() - 8.64e6;
            }
          }
        },
        userBrowseWebInfoData: {
          title: {
            left: 'left',
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: [],
            boundaryGap: false,
          },
          yAxis: {
            splitLine: { show: true }
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
          },
          series: {
            type: 'line',
            showSymbol: false,
            data: [],
            markPoint: {
              data: [{
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            },
          }
        },
        userBrowseWebInfoData2: {
          title: {
            left: 'left',
            text: ''
          },
          legend: {
            type: "scroll",
            top: 10,
            left: 20,
            width: 1000,
            data: []
          },
          tooltip: {
            trigger: 'axis',
            confine: true,
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              var num = 0
              var html = '<p class="toolDiv_title">' + params[0].name + '</p>'
              params.find((o, index) => {
                html += '<li>' + '<samp style="background-color:' + o.color + '"></samp><span>' + o.seriesName +
                  '</span>:' + '<span>' + o.value + '</span>' + '</li>'
                num += parseInt(o.value)
              })
              html += '<li>' + '<samp style="background-color:#d8ff00"></samp><span>总:</span>' + '<span>' + num +
                '</span>' + '</li>'
              html = '<ul>' + html + '</ul>'
              return `<div class="toolDiv">${html}</div>`
            },
          },
          xAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          },
          yAxis: {
            type: 'value',
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
          },
          series: []
        }
      }
    },
    watch:{
     effect:function(newQuestion, oldQuestion) {
       if(this.effect === 'dark'){
         this.startUp()
       }
     }
    },
    mounted() {},
    methods: {
      ...mapActions([
        'getUserBrowseWebInfo'
      ]),
      // 统计图表生成
      userBrowseWebInfo () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('surfaceInfo'),'walden')
        // 防止错乱 生成前清空实例
        myChart.clear()
      	// 绘制图表
      	myChart.setOption(_this.userBrowseWebInfoData)
      },
      // 条件查询用户浏览统计
      userBrowseWebInfo2 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('surfaceInfo'),'walden')
        // 防止错乱 生成前清空实例
        myChart.clear()
        // 绘制图表
        myChart.setOption(_this.userBrowseWebInfoData2)
      },
      // 查询事件
      queryUserBrowseWebInfo() {
        let _this = this, startDate = '', endDate = '', obj = ''
        if (this.timeValue !== null) {
          this.loading = true
          this.getUserBrowseWebInfo({
              startDate: this.timeValue[0],
              endDate: this.timeValue[1]
            })
            .then((response) => {
              console.log(response)
              if (response.code === 200) {
                if (response.data.riqi.length === 1) {
                  // 清空数据
                  _this.userBrowseWebInfoData.xAxis.data.splice(0, _this.userBrowseWebInfoData.xAxis.data.length)
                  _this.userBrowseWebInfoData.series.data.splice(0, _this.userBrowseWebInfoData.series.data.length)

                  // 每天用户浏览统计
                  response.data.info.find((o, index) => {
                    if (parseInt(o.data[0]) !== 0) {
                      _this.userBrowseWebInfoData.xAxis.data.push(o.name)
                      _this.userBrowseWebInfoData.series.data.push(o.data[0])
                    }
                  })

                  // 每天用户浏览统计 初始化图表
                  _this.userBrowseWebInfo()
                  // _this.echartsShow('userBrowseWebInfo', '0')
                } else if (response.data.riqi.length > 1) {
                  // 清空数据
                  _this.userBrowseWebInfoData2.xAxis.data.splice(0, _this.userBrowseWebInfoData2.xAxis.data.length)
                  _this.userBrowseWebInfoData2.series.splice(0, _this.userBrowseWebInfoData2.series.length)

                  // 条件查询用户浏览统计
                  response.data.riqi.find((o, index) => {
                    _this.userBrowseWebInfoData2.xAxis.data.push(o)
                  })
                  response.data.info.find((o, index) => {
                    obj = {
                      name: o.name,
                      type: 'bar',
                      stack: 'name',
                      showSymbol: false,
                      data: o.data,
                      barWidth: 30,
                    }
                    _this.userBrowseWebInfoData2.legend.data.push(o.name)
                    _this.userBrowseWebInfoData2.series.push(obj)
                  })

                  // 条件查询用户浏览统计 初始化图表
                  _this.userBrowseWebInfo2()
                  // _this.echartsShow('userBrowseWebInfo2', '0')
                }

                // 关闭加载动画
                _this.loading = false
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
      // 第一次的默认生成图表
      startUp(){
        var myDate = new Date();
        var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var myMonth = (myDate.getMonth() + 1)<10?'0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月份(0-11,0代表1月)
        var myToday = myDate.getDate()<10?'0' + myDate.getDate() : myDate.getDate(); //获取当前日(1-31)
        var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        var myHour = myDate.getHours(); //获取当前小时数(0-23)
        var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
        var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
        this.timeValue[0] = myYear + '-' + myMonth + '-' + myToday
        this.timeValue[1] = myYear + '-' + myMonth + '-' + myToday
        this.queryUserBrowseWebInfo()
      },
    },
    created() {
      this.startUp()
    }
  }
</script>

<style lang="less" scoped>
  @import '~LESS/color.less';
  .tb4Time{position:absolute;height:100px;width:550px;top:0;right:0}
  .surface1{position:relative}
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
