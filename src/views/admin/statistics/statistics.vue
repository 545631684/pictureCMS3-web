<template>
  <el-container class="userInfo"  v-loading="loading">
  	<el-header style="margin: 10px 0;">
  		<el-row :gutter="20" >
  			<el-col :span="8">
  				<el-card class="">
  					<div class="icoInfo2 clearfix">
  						<p>{{activeDownloadAll}}</p>
  						<p>下载</p>
  					</div>
  				</el-card>
  			</el-col>
  			<el-col :span="8">
  				<el-card>
  					<div class="icoInfo2">
  						<p>{{activeAll}}</p>
  						<p>文章</p>
  					</div>
  				</el-card>
  			</el-col>
  			<el-col :span="8">
  				<el-card>
  					<div class="icoInfo2">
  						<p>{{userAll}}</p>
  						<p>用户</p>
  					</div>
  				</el-card>
  			</el-col>
  		</el-row>
  	</el-header>
    <el-header style="margin: 10px 0;">
    	<el-row :gutter="20">
    		<el-col :span="8">
    			<el-card>
    				<div style="height: 100px;">
    					<div class="icoInfo">
    						<p>{{activeImg.num}}</p>
    						<p>img</p>
    					</div>
    					<el-progress type="circle" :percentage="activeImg.Proportion" :show-text="true" :width="100" :color="colors" style="float: right;"></el-progress>
    				</div>
    			</el-card>
    		</el-col>
    		<el-col :span="8">
    			<el-card>
    				<div style="height: 100px;">
    					<div class="icoInfo">
    						<p>{{activePsd.num}}</p>
    						<p>psd</p>
    					</div>
    					<el-progress type="circle" :percentage="activePsd.Proportion" :show-text="true" :width="100" :color="colors" style="float: right;"></el-progress>
    				</div>
    			</el-card>
    		</el-col>
    		<el-col :span="8">
    			<el-card>
    				<div style="height: 100px;">
    					<div class="icoInfo">
    						<p>{{activeVideo.num}}</p>
    						<p>video</p>
    					</div>
    					<el-progress type="circle" :percentage="activeVideo.Proportion" :show-text="true" :width="100" :color="colors" style="float: right;"></el-progress>
    				</div>
    			</el-card>
    		</el-col>
    	</el-row>
    </el-header>
  	<el-header style="margin: 10px 0;">
  		<el-row :gutter="20">
  			<el-col :span="24">
  				<el-card>
  					<el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
                <el-tab-pane label="用户浏览统计" name="tb4" v-loading="tb4_loading">
                	<div id="userBrowseWebInfo" ref="pieEcharts" style="height: 600px;"></div>
                  <div class="tb4Time">
                      <span class="demonstration">查询设置：</span>
                      <el-date-picker
                        v-model="tb4TimeValue"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                      <el-button plain style="margin-left: 20px;" @click="queryUserBrowseWebInfo">查询</el-button>
                    </div>
                </el-tab-pane>
  					    <el-tab-pane label="文章类型分布(年)" name="tb1" >
  					    	<div id="articleSubsection"  style="height: 600px;"></div>
  					    </el-tab-pane>
  					    <el-tab-pane label="用户发布文章(月)" name="tb2">
  					    	<div id="articleUserSubsection" style="height: 600px;"></div> 	
  					    </el-tab-pane>
  					    <el-tab-pane label="用户下载(年)" name="tb3">
  					    	<div id="articleUserDownload" style="height: 600px;"></div>
  					    </el-tab-pane>
  					</el-tabs>
  				</el-card>
  			</el-col>
  		</el-row>
  	</el-header>
  	<el-container>
  		<el-aside style="margin: 10px 0; width: 67%; padding-bottom: 10px;">
  			<el-row :gutter="20" style="margin-bottom: 20px;">
  				<el-col :span="24">
  					<el-card>
  						<el-tabs v-model="activeName3" type="card" @tab-click="handleClick3" >
  						    <el-tab-pane label="用户发布占比" name="tb001" >
  								<div id="articleUserReport" ref="pieEcharts3" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="项目文章占比" name="tb002">
  								<div id="articleProject" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="文章类型分布（总）" name="tb003">
  								<div id="articleType1" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="文章类型分布（月）" name="tb004">
  								<div id="articleType2" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="文章类型项目分布（总）" name="tb005">
  								<div id="articleTypeProjectAll" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="文章类型项目分布（月）" name="tb006">
  								<div id="articleTypeProjectMonthAll" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="文章类型项目用户分布（总）" name="tb007">
  								<div id="activeProjectUserAll" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="文章类型项目用户分布（月）" name="tb008">
  								<div id="activeProjectUserMonthAll" style="height: 506px;"></div>
  						    </el-tab-pane>
  						</el-tabs>
  					</el-card>
  				</el-col>
  			</el-row>
  		</el-aside>
  		<el-main style="padding: 0 10px 10px 10px;margin: 10px 0;">
  			<el-row :gutter="20">
  				<el-col :span="24">
  					<el-card>
  						<!-- 当月用户发布文章数、类型（img/psd/video） -->
  						<!-- 当月用户发布文章数、类型（设计、素材、视频） -->
  						<!-- 当月用户发布排行榜 -->
  						<!-- 最近发布-->
  						<el-tabs v-model="activeName2" type="card" @tab-click="handleClick2" >
  						    <el-tab-pane label="用户发布类型1" name="tb01" >
  						    	<div id="articleUserType1" ref="pieEcharts2" style="height: 506px;"></div>
  						    </el-tab-pane>
  						    <el-tab-pane label="用户发布类型2" name="tb02">
  						    	<div id="articleUserType2" style="height: 506px;"></div> 	
  						    </el-tab-pane>
  						    <el-tab-pane label="发布排行榜" name="tb03">
  						    	<div id="articleRanking" class="articleRanking" style="height: 506px;">
  						    		<ul>
  						    			<li v-for="(item, index) in articleRankingData" :key="index" v-if="index < 10">
  						    				<p>{{index+1}}</p>
  						    				<p>
  						    					<span :style="returnProportion(articleRankingData[0].count, item.count)"></span>
  						    					<samp>{{item.nickname}}    发布文章：{{item.count}}</samp>
  						    				</p>
  						    			</li>
  						    		</ul>
  						    	</div>
  						    </el-tab-pane>
  						    <el-tab-pane label="最近发布" name="tb04">
  						    	<div id="articleLately" class="articleLately" style="height: 506px;">
  						    		<ul>
  						    			<li v-for="(item, index) in activeLatelyData" :key="index" v-if="index < 10">
  						    				<router-link target="_blank" :title="item.title" tag="a" :to="seeArticle(item.mId, item.typeFile)">
  						    					<p class="omit">{{item.title}}</p>
  						    					<p>
  						    						<samp><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shijian"></use></svg>{{formatDate(item.registerTimeImg)}}</samp>
  						    						<samp><svg v-if="item.sex === '0'" class="icon" aria-hidden="true"><use xlink:href="#icon-icon-test"></use></svg><svg v-if="item.sex === '1'" class="icon" aria-hidden="true"><use xlink:href="#icon-icon-test1"></use></svg>{{item.nickname}}</samp>
  						    						<samp><svg class="icon" aria-hidden="true"><use xlink:href="#icon-chakan"></use></svg>{{item.click}}</samp>
  						    						<samp>
  						    							<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('img', item.mId)">
  										                  <use xlink:href="#icon-picture"></use>
  										                </svg>
  														<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('psd', item.mId)">
  										                  <use xlink:href="#icon-ps"></use>
  										                </svg>
  														<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('video', item.mId)">
  										                  <use xlink:href="#icon-shipin"></use>
  										                </svg>
  						    						</samp>
  						    					</p>
  						    				</router-link>
  						    			</li>
  						    		</ul>
  						    	</div>
  						    </el-tab-pane>
  						</el-tabs>
  					</el-card>
  				</el-col>
  			</el-row>
  		</el-main>
  	</el-container>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { formatDate } from 'UTIL/publicAPI'
  export default {
    inject: ['reload'],
    name: 'backstage',
    components: {},
    data() {
    	return {
    		loading: true,
        tb4_loading: false,
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
          onPick: ({ maxDate, minDate }) => {
  　　　　　　//当我们选择两个值的时候，就认为用户已经选择完毕
            if (maxDate != null && minDate != null) {
              this.maxDate = maxDate;
              this.minDate = minDate;
              let days = maxDate.getTime() - minDate.getTime();
              if(parseInt(days / (1000 * 60 * 60 * 24)) > 90){
                this.$alert('只能选择3个月内', {confirmButtonText: '确定'})
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
        tb4TimeValue: [],
    		activeName: 'tb4',
    		activeName2: 'tb01',
    		activeName3: 'tb001',
    		innHtmlWidth: 0,
    		innHtmlWidth2: 0,
    		innHtmlWidth3: 0,
    		activeDownloadAll: 0,
    		userAll: 0,
    		activeAll: 0,
    		activeImg: {
    			num: 0,
    			Proportion: 0
    		},
    		activePsd: {
    			num: 0,
    			Proportion: 0
    		},
    		activeVideo: {
    			num: 0,
    			Proportion: 0
    		},
    		colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
        articleRankingData: [],
        activeLatelyData: [],
    		articleSubsectionData: {
    			title : {
    		        text: '2019年',
    		        subtext: '',
    		        x:'left'
    		    }, 
          tooltip:{
           confine:true
          },
    			legend: {},
    		    tooltip: {
    		    	trigger: 'axis',
    		    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    dataset: {
    		        source: [
    		            ['product', '1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份'],
    		            ['img'],
    		            ['psd'],
    		            ['video']
    		        ]
    		    },
    		    xAxis: [
    		        {type: 'category', gridIndex: 0},
    		        {type: 'category', gridIndex: 1}
    		    ],
    		    yAxis: [
    		        {gridIndex: 0},
    		        {gridIndex: 1}
    		    ],
    		    grid: [
    		        {left: '55%', left: '55%', right: '3%',  bottom: '7%'},
    		        {left: '3%', right: '55%', bottom: '7%'}
    		    ],
    		    series: [
    		        // These series are in the first grid.
    		        {type: 'bar', seriesLayoutBy: 'row'},
    		        {type: 'bar', seriesLayoutBy: 'row'},
    		        {type: 'bar', seriesLayoutBy: 'row'},
    		        // These series are in the second grid.
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
    		    ]
    		},
    		articleUserSubsectionData: {
    			title: {
    		        text: '2019年',
    		        subtext: '',
    		        x:'left'
    		    },
    		    tooltip: {
    		        trigger: 'axis',
                confine:true
    		    },
    		    legend: {
    		        data:[]
    		    },
    		    grid: {
    		        left: '2%',
    		        right: '2%',
    		        bottom: '5%',
    		        containLabel: true
    		    },
    		    toolbox: {
    		        feature: {
    		            saveAsImage: {}
    		        }
    		    },
    		    xAxis: {
    		        type: 'category',
    		        boundaryGap: false,
    		        data: []
    		    },
    		    yAxis: {
    		        type: 'value'
    		    },
    		    series: []
    		},
    		articleUserDownloadData: {
    			title: {
    		        text: '2019年',
    		        subtext: '',
    		        x:'left'
    		    },
    		    tooltip: {
    		        trigger: 'axis',
                confine:true
    		    },
    		    legend: {
    		        data:[]
    		    },
    		    grid: {
    		        left: '2%',
    		        right: '2%',
    		        bottom: '5%',
    		        containLabel: true
    		    },
    		    toolbox: {
    		        feature: {
    		            saveAsImage: {}
    		        }
    		    },
    		    xAxis: {
    		        type: 'category',
    		        boundaryGap: false,
    		        data: ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份']
    		    },
    		    yAxis: {
    		        type: 'value'
    		    },
    		    series: []
    		},
    		articleUserReportData: {
    			title : {
    		        text: '用户发布占比',
    		        subtext: '',
    		        x:'left'
    		    },
    		    tooltip : {
    		        trigger: 'item',
    		        formatter: "{a} <br/>{b} : {c} ({d}%)"
    		    },
    		    legend: {
    		        type: 'scroll',
    		        orient: 'vertical',
    		        right: 50,
    		        top: 20,
    		        bottom: 20,
    		        data: []
    		    },
    		    grid: {
    		        left: '0',
    		        right: '2%',
    		        bottom: '5%',
    		        containLabel: true
    		    },
    		    series : [
    		        {
    		            name: '文章发布',
    		            type: 'pie',
    		            radius : '80%',
    		            center: ['45%', '50%'],
    		            data:[],
    		            itemStyle: {
    		                emphasis: {
    		                    shadowBlur: 10,
    		                    shadowOffsetX: 0,
    		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
    		                }
    		            }
    		        }
    		    ]
    		},
    		articleProjectData: {
    			title : {
    		        text: '项目文章占比',
    		        subtext: '',
    		        x:'left'
    		    },
    		    tooltip : {
    		        trigger: 'item',
    		        formatter: "{a} <br/>{b} : {c} ({d}%)"
    		    },
    		    legend: {
    		        type: 'scroll',
    		        orient: 'vertical',
    		        right: 50,
    		        top: 20,
    		        bottom: 20,
    		        data: []
    		    },
    		    grid: {
    		        left: '0',
    		        right: '2%',
    		        bottom: '5%',
    		        containLabel: true
    		    },
    		    series : [
    		        {
    		            name: '发布数量',
    		            type: 'pie',
    		            radius : '80%',
    		            center: ['45%', '50%'],
    		            data:[],
    		            itemStyle: {
    		                emphasis: {
    		                    shadowBlur: 10,
    		                    shadowOffsetX: 0,
    		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
    		                }
    		            }
    		        }
    		    ]
    		},
    		articleType1Data: {
    			title : {
    		        text: '文章类型分布(总)',
    		        subtext: '',
    		        x:'left'
    		    },
    			tooltip: {
    		        trigger: 'item',
    		        formatter: "{a} <br/>{b}: {c} ({d}%)"
    		    },
    		    legend: {
    		        orient: 'vertical',
    		        left: 10,
    		        bottom: 20,
    		        data:['img','psd','video']
    		    },
    		    series: [
    		        {
    		            name:'发布数量',
    		            type:'pie',
    		            selectedMode: 'single',
    		            radius: '45%',
    					center: ['30%', '40%'],
    		            label: {
    		                normal: {
    		                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
    		                    backgroundColor: '#eee',
    		                    borderColor: '#aaa',
    		                    borderWidth: 1,
    		                    borderRadius: 4,
    		                    rich: {
    		                        a: {
    		                            color: '#999',
    		                            lineHeight: 22,
    		                            align: 'center'
    		                        },
    		                        hr: {
    		                            borderColor: '#aaa',
    		                            width: '100%',
    		                            borderWidth: 0.5,
    		                            height: 0
    		                        },
    		                        b: {
    		                            fontSize: 16,
    		                            lineHeight: 33
    		                        },
    		                        per: {
    		                            color: '#eee',
    		                            backgroundColor: '#334455',
    		                            padding: [2, 4],
    		                            borderRadius: 2
    		                        }
    		                    }
    		                }
    		            },
    		            data:[]
    		        },
    		        {
    		            name:'发布数量',
    		            type:'pie',
    		            radius: '45%',
    		            center: ['74%', '65%'],
    		            label: {
    		                normal: {
    		                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
    		                    backgroundColor: '#eee',
    		                    borderColor: '#aaa',
    		                    borderWidth: 1,
    		                    borderRadius: 4,
    		                    rich: {
    		                        a: {
    		                            color: '#999',
    		                            lineHeight: 22,
    		                            align: 'center'
    		                        },
    		                        hr: {
    		                            borderColor: '#aaa',
    		                            width: '100%',
    		                            borderWidth: 0.5,
    		                            height: 0
    		                        },
    		                        b: {
    		                            fontSize: 16,
    		                            lineHeight: 33
    		                        },
    		                        per: {
    		                            color: '#eee',
    		                            backgroundColor: '#334455',
    		                            padding: [2, 4],
    		                            borderRadius: 2
    		                        }
    		                    }
    		                }
    		            },
    		            data:[]
    		        }
    		    ]
    		},
    		articleType2Data: {
    			title : {
    		        text: '文章类型分布（月）',
    		        subtext: '',
    		        x:'left'
    		    },
    			tooltip: {
    		        trigger: 'item',
    		        formatter: "{a} <br/>{b}: {c} ({d}%)"
    		    },
    		    legend: {
    		        orient: 'vertical',
    		        left: 10,
    		        bottom: 20,
    		        data:['img','psd','video']
    		    },
    		    series: [
    		        {
    		            name:'发布数量',
    		            type:'pie',
    		            selectedMode: 'single',
    		            radius: '45%',
    		            center: ['30%', '40%'],
    		            label: {
    		                normal: {
    		                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
    		                    backgroundColor: '#eee',
    		                    borderColor: '#aaa',
    		                    borderWidth: 1,
    		                    borderRadius: 4,
    		                    rich: {
    		                        a: {
    		                            color: '#999',
    		                            lineHeight: 22,
    		                            align: 'center'
    		                        },
    		                        hr: {
    		                            borderColor: '#aaa',
    		                            width: '100%',
    		                            borderWidth: 0.5,
    		                            height: 0
    		                        },
    		                        b: {
    		                            fontSize: 16,
    		                            lineHeight: 33
    		                        },
    		                        per: {
    		                            color: '#eee',
    		                            backgroundColor: '#334455',
    		                            padding: [2, 4],
    		                            borderRadius: 2
    		                        }
    		                    }
    		                }
    		            },
    		            data:[]
    		        },
    		        {
    		            name:'发布数量',
    		            type:'pie',
    		            radius: '45%',
    		            center: ['74%', '65%'],
    		            label: {
    		                normal: {
    		                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
    		                    backgroundColor: '#eee',
    		                    borderColor: '#aaa',
    		                    borderWidth: 1,
    		                    borderRadius: 4,
    		                    rich: {
    		                        a: {
    		                            color: '#999',
    		                            lineHeight: 22,
    		                            align: 'center'
    		                        },
    		                        hr: {
    		                            borderColor: '#aaa',
    		                            width: '100%',
    		                            borderWidth: 0.5,
    		                            height: 0
    		                        },
    		                        b: {
    		                            fontSize: 16,
    		                            lineHeight: 33
    		                        },
    		                        per: {
    		                            color: '#eee',
    		                            backgroundColor: '#334455',
    		                            padding: [2, 4],
    		                            borderRadius: 2
    		                        }
    		                    }
    		                }
    		            },
    		            data:[]
    		        }
    		    ]
    		},
    		articleUserType1Data: {
    			tooltip: {
    		        trigger: 'axis',
    		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    legend: {
    		        data: ['img', 'psd','video']
    		    },
    		    grid: {
    		        left: '1%',
    		        right: '4%',
    		        bottom: '1%',
    		        containLabel: true
    		    },
    		    xAxis:  {
    		        type: 'value'
    		    },
    		    yAxis: {
    		        type: 'category',
    		        data: []
    		    },
    		    series: [
    		        {
    		            name: 'img',
    		            type: 'bar',
    		            stack: '总量',
    		            label: {
    		                normal: {
    		                    show: true,
    		                    position: 'insideRight'
    		                }
    		            },
    		            data: []
    		        },
    		        {
    		            name: 'psd',
    		            type: 'bar',
    		            stack: '总量',
    		            label: {
    		                normal: {
    		                    show: true,
    		                    position: 'insideRight'
    		                }
    		            },
    		            data: []
    		        },
    		        {
    		            name: 'video',
    		            type: 'bar',
    		            stack: '总量',
    		            label: {
    		                normal: {
    		                    show: true,
    		                    position: 'insideRight'
    		                }
    		            },
    		            data: []
    		        }
    		    ]
    		},
    		articleUserType2Data: {
    			tooltip: {
    		        trigger: 'axis',
    		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    legend: {
    		        data: ['设计', '素材', '视频']
    		    },
    		    grid: {
    		        left: '1%',
    		        right: '4%',
    		        bottom: '1%',
    		        containLabel: true
    		    },
    		    xAxis:  {
    		        type: 'value'
    		    },
    		    yAxis: {
    		        type: 'category',
    		        data: []
    		    },
    		    series: []
    		},
    		articleTypeProjectAllData: {
    			title : {
    		        text: '2019年',
    		        subtext: '',
    		        x:'left'
    		    },
    			legend: {},
    		    tooltip: {
    		    	trigger: 'axis',
    		    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    dataset: {
    		        source: [
    		            ['product'],
    		            ['img'],
    		            ['psd'],
    		            ['video']
    		        ]
    		    },
    		    xAxis: [
    		        {type: 'category', gridIndex: 0},
    		        {type: 'category', gridIndex: 1},
    		        {type: 'category', gridIndex: 2}
    		    ],
    		    yAxis: [
    		        {gridIndex: 0},
    		        {gridIndex: 1},
    		        {gridIndex: 2}
    		    ],
    		    grid: [
    		        {left: '5%', right: '3%', top:'10%', bottom: '70%'},
    		        {left: '5%', right: '3%', top:'40%', bottom: '35%'},
    		        {left: '5%', right: '3%', top:'75%', bottom: '5%'}
    		    ],
    		    series: [
    		        // These series are in the first grid.
    		        {type: 'bar', seriesLayoutBy: 'row'},
    		        // These series are in the second grid.
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1,seriesLayoutBy: 'row'},
    		        {type: 'bar', xAxisIndex: 2, yAxisIndex: 2,seriesLayoutBy: 'row'}
    		    ]
    		},
    		articleTypeProjectMonthAllData: {
    			title : {
    		        text: '2019年',
    		        subtext: '',
    		        x:'left'
    		    },
    			legend: {},
    		    tooltip: {
    		    	trigger: 'axis',
    		    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    dataset: {
    		        source: [
    		            ['product'],
    		            ['img'],
    		            ['psd'],
    		            ['video']
    		        ]
    		    },
    		    xAxis: [
    		        {type: 'category', gridIndex: 0},
    		        {type: 'category', gridIndex: 1},
    		        {type: 'category', gridIndex: 2}
    		    ],
    		    yAxis: [
    		        {gridIndex: 0},
    		        {gridIndex: 1},
    		        {gridIndex: 2}
    		    ],
    		    grid: [
    		        {left: '5%', right: '3%', top:'10%', bottom: '70%'},
    		        {left: '5%', right: '3%', top:'40%', bottom: '35%'},
    		        {left: '5%', right: '3%', top:'75%', bottom: '5%'}
    		    ],
    		    series: [
    		        // These series are in the first grid.
    		        {type: 'bar', seriesLayoutBy: 'row'},
    		        // These series are in the second grid.
    		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1,seriesLayoutBy: 'row'},
    		        {type: 'bar', xAxisIndex: 2, yAxisIndex: 2,seriesLayoutBy: 'row'}
    		    ]
    		},
    		activeProjectUserAllData: {
    			tooltip : {
    		        trigger: 'axis',
    		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    title: [{
    		        text: 'img',
    		        x: '8.5%',
    		        y: '5%',
    		        textAlign: 'center',
    		        textStyle: {
    		        	fontSize: 16
    		        }
    		    }, {
    		        text: 'psd',
    		        x: '40.5%',
    		        y: '5%',
    		        textAlign: 'center',
    		        textStyle: {
    		        	fontSize: 16
    		        }
    		    }, {
    		        text: 'video',
    		        x: '72.5%',
    		        y: '5%',
    		        textAlign: 'center',
    		        textStyle: {
    		        	fontSize: 16
    		        }
    		    }],
    		    legend:{
    		    	top: '0%',
    		        data: []
    		    },
    		    grid:[ {
    		        left: '3%',
    		        right: '67%',
    		        bottom: '3%',
    		        gridIndex: 0,
    		        containLabel: true
    		    }, {
    		        left: '35%',
    		        right: '35%',
    		        bottom: '3%',
    		        gridIndex: 1,
    		        containLabel: true
    		        
    		    },{
    		        left: '67%',
    		        right: '3%',
    		        bottom: '3%',
    		        gridIndex: 2,
    		        containLabel: true
    		        
    		    }],
    		    xAxis: [ {
    		        type: 'value',
    		        gridIndex: 0
    		    }, {
    		        gridIndex: 1,
    		        type: 'value'
    		    }, {
    		        gridIndex: 2,
    		        type: 'value'
    		    }],
    		    yAxis:[] ,
    		    series: []
    		},
    		activeProjectUserMonthAllData: {
    			tooltip : {
    		        trigger: 'axis',
    		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    		        }
    		    },
    		    title: [{
    		        text: 'img',
    		        x: '8.5%',
    		        y: '5%',
    		        textAlign: 'center',
    		        textStyle: {
    		        	fontSize: 16
    		        }
    		    }, {
    		        text: 'psd',
    		        x: '40.5%',
    		        y: '5%',
    		        textAlign: 'center',
    		        textStyle: {
    		        	fontSize: 16
    		        }
    		    }, {
    		        text: 'video',
    		        x: '72.5%',
    		        y: '5%',
    		        textAlign: 'center',
    		        textStyle: {
    		        	fontSize: 16
    		        }
    		    }],
    		    legend:{
    		    	top: '0%',
    		        data: []
    		    },
    		    grid:[ {
    		        left: '3%',
    		        right: '67%',
    		        bottom: '3%',
    		        gridIndex: 0,
    		        containLabel: true
    		    }, {
    		        left: '35%',
    		        right: '35%',
    		        bottom: '3%',
    		        gridIndex: 1,
    		        containLabel: true
    		        
    		    },{
    		        left: '67%',
    		        right: '3%',
    		        bottom: '3%',
    		        gridIndex: 2,
    		        containLabel: true
    		        
    		    }],
    		    xAxis: [ {
    		        type: 'value',
    		        gridIndex: 0
    		    }, {
    		        gridIndex: 1,
    		        type: 'value'
    		    }, {
    		        gridIndex: 2,
    		        type: 'value'
    		    }],
    		    yAxis:[] ,
    		    series: []
    		},
        userBrowseWebInfoData: {
            
            title: {
                left: 'left',
                text: '每日浏览用户'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [],
                boundaryGap: false,
            },
            yAxis: {
                splitLine: {show: true}
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
                data: []
            }
        },
        userBrowseWebInfoData2: {
            
            title: {
              left: 'left',
              text: '条件查询浏览用户'
            },
            tooltip: {
              trigger: 'axis',
              confine:true,
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis:{
              type: 'category',
              data: [],
              boundaryGap: false,
              axisLabel: {
                 interval:0,  
                 rotate:40  
              },
            },
            yAxis:{
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
    mounted() {
    	// 文章类型分布  头部统计表标签切换
    	// this.articleSubsection()
      // 每日用户浏览  头部统计表标签切换
      this.userBrowseWebInfo()
    	// 每月文章类型分布1  底部统计表标签切换(右边)
    	this.articleType1()
    	// 每月文章类型分布2  底部统计表标签切换(右边)
    	this.articleType2()
    	// 用户发布文章类型分布1  底部统计表标签切换(左边)
    	this.articleUserType1()
    	// 获取当前头部切换图标的宽度
    	this.innHtmlWidth = this.$refs.pieEcharts.offsetWidth
    	this.innHtmlWidth2 = this.$refs.pieEcharts2.offsetWidth
    	this.innHtmlWidth3 = this.$refs.pieEcharts3.offsetWidth
    },
    methods: {
      ...mapActions([
        'getAdminStatisticsData',
        'getUserBrowseWebInfo'
      ]),
      
      // 判断文章的img、psd、video是否有数据并返回true/false
      returnArticleType (type,mid) {
      	let time = false
      	switch (type) {
      		case 'img':
      			this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.img !== '[]' ? time = true : time = false
      				}
      			})
      			return time
      		    break;
      		case 'psd':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.psd !== '[]' ? time = true : time = false
      				}
      			})
      			return time
      		    break;
      		case 'video':
          		this.activeLatelyData.find((obj, index) => {
      				if (obj.mId === mid) {
      					obj.video !== '[]' ? time = true : time = false
      				}
      			})
      			return time
      		    break;
      	}
      },
      // 时间戳转换
      formatDate(time) { 
      	if(time !== null) {
      		let date = new Date(parseInt(time) * 1000)
      		return formatDate(date, 'yyyy-MM-dd')
      	} else {
      		return '暂无'
      	}
      },
      // 跳转文章页
      seeArticle(mid, typeFile) {
      	switch (typeFile) {
      		case 'img':
      			 return {path:'/web/article/' + mid + '/backstage/0/0/'}
      		    break;
      		case 'psd':
          		return {path:'/web/article/' + mid  + '/backstage/0/0/'}
      		    break;
      		case 'video':
          		return {path:'/web/articleVideo/' + mid  + '/backstage/0/0/'}
      		    break;
      	}
      },
      // 头部统计表标签切换
      handleClick(tab, event) {
        console.log(tab.name)
      	tab.name === 'tb1' ? this.echartsShow('articleSubsection', '0') : tab.name = tab.name
      	tab.name === 'tb2' ? this.echartsShow('articleUserSubsection', '0') : tab.name = tab.name
      	tab.name === 'tb3' ? this.echartsShow('articleUserDownload', '0') : tab.name = tab.name
      	tab.name === 'tb4' ? this.echartsShow('userBrowseWebInfo2', '0') : tab.name = tab.name
      },
      // 底部统计表标签切换(右边)
      handleClick2(tab, event) {
      	tab.name === 'tb01' ? this.echartsShow('articleUserType1', '1') : tab.name = tab.name
      	tab.name === 'tb02' ? this.echartsShow('articleUserType2', '1') : tab.name = tab.name
      },
      // 底部统计表标签切换(左边)
      handleClick3(tab, event) {
      	tab.name === 'tb001' ? this.echartsShow('articleUserReport', '2') : tab.name = tab.name
      	tab.name === 'tb002' ? this.echartsShow('articleProject', '2') : tab.name = tab.name
      	tab.name === 'tb003' ? this.echartsShow('articleType1', '2') : tab.name = tab.name
      	tab.name === 'tb004' ? this.echartsShow('articleType2', '2') : tab.name = tab.name
      	tab.name === 'tb005' ? this.echartsShow('articleTypeProjectAll', '2') : tab.name = tab.name
      	tab.name === 'tb006' ? this.echartsShow('articleTypeProjectMonthAll', '2') : tab.name = tab.name
      	tab.name === 'tb007' ? this.echartsShow('activeProjectUserAll', '2') : tab.name = tab.name
      	tab.name === 'tb008' ? this.echartsShow('activeProjectUserMonthAll', '2') : tab.name = tab.name
      },
      // 切换echarts图表样式错乱问题解决方法
      echartsShow (id, type) {
      	// 首先从this.innHtmlWidth获取到当前页面宽度赋值给需要展现的图标id
      	if (type === '0') {
      		document.getElementById(id).style.width = this.innHtmlWidth + 'px'
      	} else if (type === '1') {
      		document.getElementById(id).style.width = this.innHtmlWidth2 + 'px'
      	} else if (type === '2') {
      		document.getElementById(id).style.width = this.innHtmlWidth3 + 'px'
      	}
          // 使用this.$echarts.init方法初始化图标对象
      	let shopCharts = this.$echarts.init(document.getElementById(id))
      	// 重新生成图标视图
      	shopCharts.resize()
      	// 判断图表id加载数据
      	switch(id) {
      	    case 'articleSubsection':
      	        shopCharts.setOption(this.articleSubsectionData)
      	        break;
      	    case 'articleUserSubsection':
      	        shopCharts.setOption(this.articleUserSubsectionData)
      	        break;
      	    case 'articleUserDownload':
      	        shopCharts.setOption(this.articleUserDownloadData)
      	        break;
      	    case 'articleUserType1':
      	        shopCharts.setOption(this.articleUserType1Data)
      	        break;
      	    case 'articleUserType2':
      	        shopCharts.setOption(this.articleUserType2Data)
      	        break;
      	    case 'articleUserReport':
      	        shopCharts.setOption(this.articleUserReportData)
      	        break;
      	    case 'articleProject':
      	        shopCharts.setOption(this.articleProjectData)
      	        break;
      	    case 'articleType1':
      	        shopCharts.setOption(this.articleType1Data)
      	        break;
      	    case 'articleType2':
      	        shopCharts.setOption(this.articleType2Data)
      	        break;
      	    case 'articleTypeProjectAll':
      	        shopCharts.setOption(this.articleTypeProjectAllData)
      	        break;
      	    case 'articleTypeProjectMonthAll':
      	        shopCharts.setOption(this.articleTypeProjectMonthAllData)
      	        break;
      	    case 'activeProjectUserAll':
      	        shopCharts.setOption(this.activeProjectUserAllData)
      	        break;
      	    case 'activeProjectUserMonthAll':
      	        shopCharts.setOption(this.activeProjectUserMonthAllData)
      	        break;
            case 'userBrowseWebInfo':
      	        shopCharts.setOption(this.userBrowseWebInfoData)
      	        break;
            case 'userBrowseWebInfo2':
      	        shopCharts.setOption(this.userBrowseWebInfoData2)
      	        break;
      	} 
      },
      // 每月文章分布
      articleSubsection () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleSubsection'))
      	// 绘制图表
      	myChart.setOption(_this.articleSubsectionData)
      },
      // 用户每月文章分布
      articleUserSubsection () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleUserSubsection'))
      	// 绘制图表
      	myChart.setOption(_this.articleUserSubsectionData)
      },
      // 用户下载分布
      articleUserDownload () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleUserDownload'))
      	// 绘制图表
      	myChart.setOption(_this.articleUserDownloadData)
      },
      // 用户发布文章占比
      articleUserReport () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleUserReport'))
      	// 绘制图表
      	myChart.setOption(_this.articleUserReportData)
      },
      // 项目文章占比
      articleProject () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleProject'))
      	// 绘制图表
      	myChart.setOption(_this.articleProjectData)
      },
      // 每月文章类型分布1
      articleType1 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleType1'))
      	// 绘制图表
      	myChart.setOption(_this.articleType1Data)
      },
      // 每月文章类型分布2
      articleType2 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleType2'))
      	// 绘制图表
      	myChart.setOption(_this.articleType2Data)
      },
      // 用户发布文章类型分布1
      articleUserType1 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleUserType1'))
      	// 绘制图表
      	myChart.setOption(_this.articleUserType1Data)
      },
      // 用户发布文章类型分布2
      articleUserType2 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleUserType2'))
      	// 绘制图表
      	myChart.setOption(_this.articleUserType2Data)
      },
      // 文章类型项目分布（总）
      articleTypeProjectAll () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleTypeProjectAll'))
      	// 绘制图表
      	myChart.setOption(_this.articleTypeProjectAllData)
      },
      // 文章类型项目分布（月）
      articleTypeProjectMonthAll () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('articleTypeProjectMonthAll'))
      	// 绘制图表
      	myChart.setOption(_this.articleTypeProjectMonthAllData)
      },
      // 文章类型项目用户分布（总）
      activeProjectUserAll () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('activeProjectUserAll'))
      	// 绘制图表
      	myChart.setOption(_this.activeProjectUserAllData)
      },
      // 文章类型项目用户分布（月）
      activeProjectUserMonthAll () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('activeProjectUserMonthAll'))
      	// 绘制图表
      	myChart.setOption(_this.activeProjectUserMonthAllData)
      },
      // 每天用户浏览统计
      userBrowseWebInfo () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('userBrowseWebInfo'))
        myChart.clear()
      	// 绘制图表
      	myChart.setOption(_this.userBrowseWebInfoData)
      },
      // 条件查询用户浏览统计
      userBrowseWebInfo2 () {
      	let _this = this
      	// 基于准备好的dom，初始化echarts实例
      	let myChart = this.$echarts.init(document.getElementById('userBrowseWebInfo'))
        myChart.clear()
      	// 绘制图表
      	myChart.setOption(_this.userBrowseWebInfoData2)
      },
      // 返回各类型数据在其中占比值
      // returnProportion (nums, num) {
      // 	let a = num/nums*100
      // 	return a.toFixed(1)
      // },
      // 发布文章排行榜进度条%换算
      returnProportion (nums, num) {
      	let a = num/nums*100
      	return {width: a.toFixed(1) + '%' }
      },
      // 当前用户最近一周发布情况
      articleWeek() {
      	let _this = this 
      		// 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('articleWeek'))
            // 绘制图表
            myChart.setOption({
                title: { 
                  text: '一周发布',
                  subtext: '',
                  x:'left'
                },
                tooltip: {
                  trigger: 'axis'
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  data: _this.userInfo.articleWeekName,
                  boundaryGap: false,
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false,
                    interval: 0
                  }
                },
                yAxis: {
                  show: true,
                  name: "",
                  nameLocation: 'end',
                  boundaryGap: ['0', '10%'],
                  nameTextStyle: {
                    backgroundColor: 'red'
                  },
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  }
                },
                series: [{
                    data: _this.userInfo.articleWeekNum,
                    name: '发布量',
                    type: 'line',
                    symbolSize: 12,
                    symbol: 'diamond',
                    smooth: true,
                    emphasis: {
                      lineStyle: {
                        color: '#0077E6'
                      }
                    }
                }]
            });
      },
      queryUserBrowseWebInfo(){
        let _this = this, startDate = '', endDate = '', obj = ''
        if(this.tb4TimeValue.length !== 0){
          this.tb4_loading = true
          this.getUserBrowseWebInfo({startDate:this.tb4TimeValue[0],endDate:this.tb4TimeValue[1]})
            .then((response) => {
                console.log(response)
              if(response.code === 200) {
                if(response.data.riqi.length === 1){
                  // 清空数据
                  _this.userBrowseWebInfoData.xAxis.data.splice(0,_this.userBrowseWebInfoData.xAxis.data.length)
                  _this.userBrowseWebInfoData.series.data.splice(0,_this.userBrowseWebInfoData.series.data.length)
                  
                  // 每天用户浏览统计
                  response.data.info.find((o,index)=>{
                    _this.userBrowseWebInfoData.xAxis.data.push(o.name)
                    _this.userBrowseWebInfoData.series.data.push(o.data[0])
                  })
                  
                  // 每天用户浏览统计 初始化图表
                  _this.userBrowseWebInfo()
                  _this.echartsShow('userBrowseWebInfo', '0')
                } else if(response.data.riqi.length > 1){
                  // 清空数据
                  _this.userBrowseWebInfoData2.xAxis.data.splice(0,_this.userBrowseWebInfoData2.xAxis.data.length)
                  _this.userBrowseWebInfoData2.series.splice(0,_this.userBrowseWebInfoData2.series.length)
                  
                  // 条件查询用户浏览统计
                  response.data.riqi.find((o,index)=>{
                    _this.userBrowseWebInfoData2.xAxis.data.push(o)
                  })
                  response.data.info.find((o,index)=>{
                    obj = {
                      name: o.name,
                      type: 'line',
                      stack: 'name',
                      showSymbol: false,
                      data: o.data
                    }
                    _this.userBrowseWebInfoData2.series.push(obj)
                  })
                  
                  // 条件查询用户浏览统计 初始化图表
                  _this.userBrowseWebInfo2()
                  _this.echartsShow('userBrowseWebInfo2', '0')
                }
                
                // 关闭加载动画
                _this.tb4_loading = false
              }
            })
            .catch(function (error) {
              // _this.$alert('65456', {confirmButtonText: '确定'})
              _this.tb4_loading = false
            })
        } else {
          _this.$alert("请指定查询日期", {confirmButtonText: '确定'})
        }
        
      }
    },
    created() {
      let _this = this, date = new Date()
      // 获取当前用户页面所需的信息
      this.getAdminStatisticsData({uId:this.$store.state.admin.adminInfo.uId})
      .then((response) => {
        if(response.code === 200) {
          _this.activeDownloadAll = response.data.activeDownloadAll
          	_this.userAll = response.data.userAll
          	_this.activeAll = response.data.activeAll
          	_this.activeImg = {num: response.data.activeImg, Proportion: parseInt((response.data.activeImg/response.data.activeAll*100).toFixed(1))}
          	_this.activePsd = {num: response.data.activePsd, Proportion: parseInt((response.data.activePsd/response.data.activeAll*100).toFixed(1))}
          	_this.activeVideo = {num: response.data.activeVideo, Proportion: parseInt((response.data.activeVideo/response.data.activeAll*100).toFixed(1))}
          		
          		// 用户发布占比（全部）数据填充
          	response.data.activeUsers.find((obj, index) => {
          		_this.articleUserReportData.legend.data.push(obj.nickname)
          		_this.articleUserReportData.series[0].data.push({value:obj.count, name:obj.nickname})
          	})
          	// 用户发布文章占比 初始化图表
          	_this.articleUserReport()
          	
          	// 文章发布排行榜 数据填充
          	_this.articleRankingData = response.data.articleRanking
          	
          	// 最近发布文章（20篇） 数据填充
          	_this.activeLatelyData = response.data.activeLately
          	// 判断之前先把数据转换成json格式
          	_this.activeLatelyData.find((obj, index) => {
            	obj.img = obj.img === '[]' ? eval('(' + obj.img + ')') : JSON.parse(obj.img)
            	obj.psd = obj.psd === '[]' ? eval('(' + obj.psd + ')') : JSON.parse(obj.psd)
            	obj.video = obj.video === '[]' ? eval('(' + obj.video + ')') : JSON.parse(obj.video)
            })
          	// 项目文章占比（全部）数据填充
          	response.data.activeProject.find((obj, index) => {
          		_this.articleProjectData.legend.data.push(obj.xname)
          		_this.articleProjectData.series[0].data.push({value:obj.count, name:obj.xname})
          	})
          	// 项目文章占比 初始化图表
          	_this.articleProject()
          		
          	// 文章类型分布（总）数据填充
          	_this.articleType1Data.series[0].data = [
          		{value:response.data.activeImg, name:'img'},
                {value:response.data.activePsd, name:'psd'},
                {value:response.data.activeVideo, name:'video'}
          	]
          	response.data.activeType.find((obj, index) => {
          		_this.articleType1Data.legend.data.push(obj.lname)
          		_this.articleType1Data.series[1].data.push({value:obj.count, name:obj.lname})
          	})
          	// 文章类型分布（总） 初始化图表
          	_this.articleType1()
          		
          	// 文章类型分布（月）数据填充
          	_this.articleType2Data.series[0].data = [
          		{value:response.data.activeImgMonth, name:'img'},
              {value:response.data.activePsdMonth, name:'psd'},
              {value:response.data.activeVideoMonth, name:'video'}
          	]
          	response.data.activeType2.find((obj, index) => {
          		_this.articleType2Data.legend.data.push(obj.lname)
          		_this.articleType2Data.series[1].data.push({value:obj.count, name:obj.lname})
          	})
          	// 文章类型分布（月） 初始化图表
          	_this.articleType2()
          	
          	// 用户文章类型1（img/psd/video） 数据填充
          	let objImg = {}, objPsd = {}, objVideo = {}
          	response.data.userNicknameAll.find((obj, index) => {
          		objImg = response.data.activeUserType1.find((o, index) => { return  o.typeFile === 'img' && o.nickname === obj.nickname}) || {count: 0}
          		objPsd = response.data.activeUserType1.find((o, index) => { return  o.typeFile === 'psd' && o.nickname === obj.nickname}) || {count: 0}
          		objVideo = response.data.activeUserType1.find((o, index) => { return  o.typeFile === 'video' && o.nickname === obj.nickname}) || {count: 0}
          		_this.articleUserType1Data.yAxis.data.push(obj.nickname)
          		_this.articleUserType1Data.series[0].data.push(objImg.count)
          		_this.articleUserType1Data.series[1].data.push(objPsd.count)
          		_this.articleUserType1Data.series[2].data.push(objVideo.count)
          	})
          	// 用户文章类型1（img/psd/video） 初始化图表
          	_this.articleUserType1()
          	
          	// 用户文章类型2（类型分类） 数据填充
          	let temp = {},temp2 = [],temp3 = 0
          	let typeNum = response.data.typeAll.length
          	response.data.userNicknameAll.find((user, userIndex) => {_this.articleUserType2Data.yAxis.data.push(user.nickname)})
          	response.data.typeAll.find((obj, objIndex) => {
          		_this.articleUserType2Data.legend.data.push(obj.lname)
          		_this.articleUserType2Data.series.push({name: obj.lname, type: 'bar', stack: '总量', label: { normal: { show: true, position: 'insideRight' } }, data: [] })
          		response.data.userNicknameAll.find((user, userIndex) => {
          			temp = response.data.activeUserType2.find((num, numIndex) => {return num.typeid === obj.tid && user.nickname === num.nickname}) || 0
          			temp !== 0 ? _this.articleUserType2Data.series[objIndex].data.push(temp.count): _this.articleUserType2Data.series[objIndex].data.push(temp)
          			temp = {}
          		})
          	})
          	// 用户文章类型1（类型分类） 初始化图表
          	_this.articleUserType2()
          	
          	// 年统计每月img\psd\video类型的数据  数据填充
          	response.data.activeTypeYear.find((num, index) => {
          		_this.articleSubsectionData.dataset.source[1].push(num[1])
          		_this.articleSubsectionData.dataset.source[2].push(num[2])
          		_this.articleSubsectionData.dataset.source[3].push(num[3])
          	})
            _this.articleSubsectionData.title.text = date.getFullYear() + '年'
          	// 年统计每月img\psd\video类型的数据 初始化图表
          	_this.articleSubsection()
          	
          	// 年统计每个在职用户的月下载数量
          	response.data.userNicknameAll.find((obj, index) => {
          		_this.articleUserDownloadData.legend.data.push(obj.nickname)
          		_this.articleUserDownloadData.series.push({name:obj.nickname,type:'line',data:[]})
          	})
            _this.articleUserDownloadData.title.text = date.getFullYear() + '年'
          	response.data.activeDownloadYearAll.find((objs, objsindex) => {
          		if (objs.length === 0) {
          			_this.articleUserDownloadData.series.find((obj, objindex) => {obj.data.push(0)})
          		} else {
          			objs.find((o, oindex) =>{
          				_this.articleUserDownloadData.series.find((obj2, obj2index) => {
          					o.nickname === obj2.name ? obj2.data.push(o.count) : console.log()
          				})
          			})
          			_this.articleUserDownloadData.series.find((obj3, obj3index) => {
          				obj3.data.length === objsindex + 1 ? console.log() : obj3.data.push(0)
          			})
          		}
          	})

          	// 当月在职用户每日发布情况  数据填充
          	response.data.m.find((r, index) => {_this.articleUserSubsectionData.xAxis.data.push(r.riqi)})
          	response.data.activeUserReleaseMonthAll.find((o, index) => {
          		_this.articleUserSubsectionData.legend.data.push(o.name)
          		_this.articleUserSubsectionData.series.push({name:o.name,type:'line',data:o.data})
          	})
             _this.articleUserSubsectionData.title.text = date.getFullYear() + '年'
          	
          	// 当月在职用户每日发布情况 初始化图表
          	_this.articleUserSubsection()
          	
          	// 文章类型项目分布（总）
          	response.data.projectAll.find((p, index) => {
          		_this.articleTypeProjectAllData.dataset.source[0].push(p.xname)
          	})
            _this.articleTypeProjectAllData.title.text = date.getFullYear() + '年'
          	_this.articleTypeProjectAllData.dataset.source[0].find((s, indexs) => {
          		if (indexs > 0) {
          			response.data.activeProjectTotalImg.find((i, indexi) => {
              		_this.articleTypeProjectAllData.dataset.source[1].push(i.img)
              	})
          			response.data.activeProjectTotalPsd.find((p, indexp) => {
              		_this.articleTypeProjectAllData.dataset.source[2].push(p.psd)
              	})
          			response.data.activeProjectTotalVideo.find((v, indexv) => {
              		_this.articleTypeProjectAllData.dataset.source[3].push(v.video)
              	})
          		}
          	})
          	// 文章类型项目分布（总） 初始化图表
          	_this.articleTypeProjectAll()
          	
          	// 文章类型项目分布（月）
          	response.data.projectAll.find((p, index) => {
          		_this.articleTypeProjectMonthAllData.dataset.source[0].push(p.xname)
          	})
            _this.articleTypeProjectMonthAllData.title.text = date.getFullYear() + '年'
          	_this.articleTypeProjectMonthAllData.dataset.source[0].find((s, indexs) => {
          		if (indexs > 0) {
          			response.data.activeProjectMonthImg.find((i, indexi) => {
              		_this.articleTypeProjectMonthAllData.dataset.source[1].push(i.img)
              	})
          			response.data.activeProjectMonthPsd.find((p, indexp) => {
              		_this.articleTypeProjectMonthAllData.dataset.source[2].push(p.psd)
              	})
          			response.data.activeProjectMonthVideo.find((v, indexv) => {
              		_this.articleTypeProjectMonthAllData.dataset.source[3].push(v.video)
              	})
          		}
          	})
          	// 文章类型项目分布（月） 初始化图表
          	_this.articleTypeProjectMonthAll()
          	
          	// 文章类型项目用户分布（总）
          	temp = {type: 'category',gridIndex: 0,data: []}
          	temp2 = {type: 'category',gridIndex: 1,data: []}
          	temp3 = {type: 'category',gridIndex: 2,data: []}
          	response.data.articleRanking.find((o, index) => {
          		_this.activeProjectUserAllData.legend.data.push(o.nickname)
          	})
          	response.data.projectAll.find((p, indexp) => {
          		temp.data.push(p.xname)
          		temp2.data.push(p.xname)
          		temp3.data.push(p.xname)
          	})
          	_this.activeProjectUserAllData.yAxis.push(temp)
          	_this.activeProjectUserAllData.yAxis.push(temp2)
          	_this.activeProjectUserAllData.yAxis.push(temp3)
          	temp = {name: '',type: 'bar',stack: 'img',xAxisIndex: 0, yAxisIndex: 0,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	temp2 = {name: '',type: 'bar',stack: 'psd',xAxisIndex: 1, yAxisIndex: 1,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	temp3 = {name: '',type: 'bar',stack: 'video',xAxisIndex: 2, yAxisIndex: 2,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	response.data.articleRanking.find((u, indexu) => {
          		temp.name = u.nickname
          		response.data.projectAll.find((p, indexp) => {
          			response.data.activeProjectUserTotalImg.find((i, indexi) => {
              		i.xname === p.xname && i.nickname === u.nickname ? temp.data.push(i.img) : i = i
              	})
          			indexp === temp.data.length ? temp.data.push('无') : temp = temp
          		})
          		_this.activeProjectUserAllData.series.push(temp)
          		temp = {name: '',type: 'bar',stack: 'img',xAxisIndex: 0, yAxisIndex: 0,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	})
          	response.data.articleRanking.find((u, indexu) => {
          		temp2.name = u.nickname
          		response.data.projectAll.find((p, indexp) => {
          			response.data.activeProjectUserTotalPsd.find((i, indexi) => {
              		i.xname === p.xname && i.nickname === u.nickname ? temp2.data.push(i.psd) : i = i
              	})
          			indexp === temp2.data.length ? temp2.data.push('无') : temp2 = temp2
          		})
          		_this.activeProjectUserAllData.series.push(temp2)
          		temp2 = {name: '',type: 'bar',stack: 'psd',xAxisIndex: 1, yAxisIndex: 1,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	})
          	response.data.articleRanking.find((u, indexu) => {
          		temp3.name = u.nickname
          		response.data.projectAll.find((p, indexp) => {
          			response.data.activeProjectUserTotalVideo.find((i, indexi) => {
              		i.xname === p.xname && i.nickname === u.nickname ? temp3.data.push(i.video) : i = i
              	})
          			indexp === temp3.data.length ? temp3.data.push('无') : temp3 = temp3
          		})
          		_this.activeProjectUserAllData.series.push(temp3)
          		temp3 = {name: '',type: 'bar',stack: 'video',xAxisIndex: 2, yAxisIndex: 2,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	})
          	// 文章类型项目用户分布（总） 初始化图表
          	_this.activeProjectUserAll()
          	
          	// 文章类型项目用户分布（月）
          	temp = {type: 'category',gridIndex: 0,data: []}
          	temp2 = {type: 'category',gridIndex: 1,data: []}
          	temp3 = {type: 'category',gridIndex: 2,data: []}
          	response.data.articleRanking.find((o, index) => {
          		_this.activeProjectUserMonthAllData.legend.data.push(o.nickname)
          	})
          	response.data.projectAll.find((p, indexp) => {
          		temp.data.push(p.xname)
          		temp2.data.push(p.xname)
          		temp3.data.push(p.xname)
          	})
          	_this.activeProjectUserMonthAllData.yAxis.push(temp)
          	_this.activeProjectUserMonthAllData.yAxis.push(temp2)
          	_this.activeProjectUserMonthAllData.yAxis.push(temp3)
          	temp = {name: '',type: 'bar',stack: 'img',xAxisIndex: 0, yAxisIndex: 0,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	temp2 = {name: '',type: 'bar',stack: 'psd',xAxisIndex: 1, yAxisIndex: 1,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	temp3 = {name: '',type: 'bar',stack: 'video',xAxisIndex: 2, yAxisIndex: 2,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	response.data.articleRanking.find((u, indexu) => {
          		temp.name = u.nickname
          		response.data.projectAll.find((p, indexp) => {
          			response.data.activeProjectUserMonthImg.find((i, indexi) => {
              		i.xname === p.xname && i.nickname === u.nickname ? temp.data.push(i.img) : i = i
              	})
          			indexp === temp.data.length ? temp.data.push('无') : temp = temp
          		})
          		_this.activeProjectUserMonthAllData.series.push(temp)
          		temp = {name: '',type: 'bar',stack: 'img',xAxisIndex: 0, yAxisIndex: 0,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	})
          	response.data.articleRanking.find((u, indexu) => {
          		temp2.name = u.nickname
          		response.data.projectAll.find((p, indexp) => {
          			response.data.activeProjectUserMonthPsd.find((i, indexi) => {
              		i.xname === p.xname && i.nickname === u.nickname ? temp2.data.push(i.psd) : i = i
              	})
          			indexp === temp2.data.length ? temp2.data.push('无') : temp2 = temp2
          		})
          		_this.activeProjectUserMonthAllData.series.push(temp2)
          		temp2 = {name: '',type: 'bar',stack: 'psd',xAxisIndex: 1, yAxisIndex: 1,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	})
          	response.data.articleRanking.find((u, indexu) => {
          		temp3.name = u.nickname
          		response.data.projectAll.find((p, indexp) => {
          			response.data.activeProjectUserMonthVideo.find((i, indexi) => {
              		i.xname === p.xname && i.nickname === u.nickname ? temp3.data.push(i.video) : i = i
              	})
          			indexp === temp3.data.length ? temp3.data.push('无') : temp3 = temp3
          		})
          		_this.activeProjectUserMonthAllData.series.push(temp3)
          		temp3 = {name: '',type: 'bar',stack: 'video',xAxisIndex: 2, yAxisIndex: 2,label: {normal: {show: true,position: 'insideRight'}},data: []}
          	})
          	// 文章类型项目用户分布（月） 初始化图表
          	_this.activeProjectUserMonthAll()
            
            
            // 每天用户浏览统计
            response.data.userBrowseWebInfo.find((o,index)=>{
              _this.userBrowseWebInfoData.xAxis.data.push(o.nickname)
              _this.userBrowseWebInfoData.series.data.push(o.count)
            })
            _this.tb4TimeValue.push(response.data.userBrowseWebInfo[0].sameDay)
            _this.tb4TimeValue.push(response.data.userBrowseWebInfo[0].sameDay)
            // 每天用户浏览统计 初始化图表
            _this.userBrowseWebInfo()
          }
          
          
          
          // 关闭加载状态
          _this.loading = false
      })
      .catch(function (error) {
        _this.$alert(error.msg, {confirmButtonText: '确定'})
      })
    }
  }
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.icon {width: 1em;height: 1em; vertical-align: -0.15em;fill: currentColor;overflow: hidden; margin-left: .5em;}
.el-row{width: 100%;}
.el-header{ height: auto !important; padding: 0;}
.userInfo {}
.userInfo .userInfoyTop{}
.userInfo .userInfoyTop li{float: left; height: 88px;}
.userInfo .userInfoyTop li:nth-child(2){padding: 10px;height: 68px;}
.userInfo .userInfoyTop li img{width: 88px; height: 88px; border-radius: 100px;}
.userInfo .userInfoyTop li span,.userInfo .userInfoyTop li samp{display: block; font-size: 18px; font-weight: bold; color: #606266; height: 30px; line-height: 30px;}
.userInfo .info {color: #606266; font-weight: bold; text-align: justify;}
.userInfo .info samp{font-size: 18px !important;}
.userInfo .info span{font-size: 18px !important; color: #F56C6C !important;}
.userInfo .eChartsHistogram {height: 200px;}
.userInfo .info_div{min-height: 220px;}
.userInfo .info_div p{ padding-bottom: 10px; border-bottom: 1px solid #DCDFE6; margin-bottom: 10px;}
.userInfo .info_div ul li{padding: 3.8px 0;}
.userInfo .info_div ul li a{line-height: 20px;}
.userInfo .info_div ul li a span{float: left; display: block; width: 75%;}
.userInfo .info_div ul li a samp{float: right;}
.headPortrait{display:block;margin:50px auto 10px;border-radius:200px;width:150px;height:150px}
.avatar-uploader{width: 88px; float: left; margin-right: 10px;}
.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:500px;cursor:pointer;position:relative;overflow:hidden}
.avatar-uploader .el-upload:hover{border-color:#409EFF}
.avatar-uploader-icon{font-size:28px;color:#8c939d;width:150px!important;height:150px!important;line-height:150px!important;text-align:center}
.avatar{width:88px;height:88px;display:block;border-radius: 100px; position: relative;}
.avatar_span{display: none;width: 88px;height: 88px;position: absolute;top: 7%; left: 3%;text-align: center;color: #fff;line-height: 88px;font-weight: bold;background: #09090985;}
.avatar_div:hover,.avatar_span{display: block;}
.inputInfo{width:385px;height:40px;line-height:40px;margin:auto auto 20px}
.inputInfo .el-aside{background:0 0;width:50px!important;height:auto}
.inputInfo .el-main{padding:0;}
.inputInfo .el-main .el-input__inner{width: 200px !important;}
.icoInfo{float: left; width: 300px; height: 100px;}
.icoInfo p{ text-align: center; font-size: 26px;    line-height: 50px;}
.icoInfo2{float: left; width: 100%; margin: -20px auto 0; padding: 10px;}
.icoInfo2 p{ text-align: center; font-size: 26px;    line-height: 36px;}
.articleRanking{}
.articleRanking ul{}
.articleRanking ul li{ margin-bottom: 11px;}
.articleRanking ul li:nth-child(1) p:nth-child(1){ border: 1px solid #F56C6C;color: #F56C6C;}
.articleRanking ul li:nth-child(1) p:nth-child(2) samp{color: #F56C6C;}
.articleRanking ul li:nth-child(2) p:nth-child(1){ border: 1px solid #E6A23C;color: #E6A23C;}
.articleRanking ul li:nth-child(2) p:nth-child(2) samp{color: #E6A23C;}
.articleRanking ul li:nth-child(3) p:nth-child(1){ border: 1px solid #67C23A;color: #67C23A;}
.articleRanking ul li:nth-child(3) p:nth-child(2) samp{color: #67C23A;}
.articleRanking ul li:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.articleRanking ul li p:nth-child(1){float:left; width: 38px; height: 38px; border: 1px solid #909399; margin-right: 10px; font-size: 30px; font-weight: bold; text-align: center; line-height: 38px; color: #909399;}
.articleRanking ul li p:nth-child(2){float:left;width: 440px; height: 40px;}
.articleRanking ul li p:nth-child(2) span{display: block; width: 90%; background: #0077AA; height: 20px;
background: linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -o-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -ms-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -moz-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
background: -webkit-linear-gradient(left , rgb(107, 197, 62) , rgb(230, 162, 60) 48% , rgb(245, 108, 108) 85%);
/*background: linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -o-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -ms-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -moz-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);
background: -webkit-linear-gradient(left , rgb(154, 255, 0) , rgb(79, 255, 4) 17% , rgb(160, 253, 0) 32% , rgb(255, 251, 10) 48% , rgb(252, 190, 7) 63% , rgb(252, 100, 2) 81% , rgb(253, 62, 0) 100%);*/
}
.articleRanking ul li p:nth-child(2) samp{ font-size: 16px; text-align: justify; line-height: 20px; color: #909399; font-weight: bold;}
.articleLately ul{}
.articleLately ul li{ height: 40px; padding: 5px 0;}
.articleLately ul li a{}
.articleLately ul li a p{height: 20px; line-height: 20px;}
.articleLately ul li a p:nth-child(1){font-weight: bold; color:#303133;}
.articleLately ul li a p:nth-child(2){ color: #909399;}
.articleLately ul li a p:nth-child(2) samp{ display: inline-flex; float: left; padding: 0 10px 0 0; height: 20px; line-height: 20px;}
.articleLately ul li a p:nth-child(2) samp svg{margin-top: 2px; margin-right: 5px;}
.tb4Time{position: absolute;height: 100px;width: 550px;top: 0;right: 0;}
</style>
