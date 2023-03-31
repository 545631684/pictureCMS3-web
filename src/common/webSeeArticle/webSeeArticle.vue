<template>
  <el-container style="background: #f4f4f4;">
  	<el-header style="padding: 0;">
      <div class="tabs">
        <el-button v-popover:popover1 style="border: 2px dashed #DCDFE6; background: none; margin-right: 20px;">用户</el-button>
        <el-popover
          ref="popover1"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom"
          width="800"
          trigger="hover">
          <div class="tabs_div1">
            <div class="tabs_div1_item">
              <p class="tabs_div1_item_title">在职</p>
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in userList" :key="index" v-if="item.webShow === 1 && item.articleNum !== 0 && item.state == 0" @click="handleInputConfirm('user',item.nickname)">{{item.nickname}}</li>
              </ul>
            </div>
						<div class="tabs_div1_item2">
						  <p class="tabs_div1_item_title2">离任</p>
						  <ul class="tabs_div1_item_ul2">
						    <li class="omit" v-for="(item, index) in userList" :key="index" v-if="item.articleNum !== 0 && item.state === 1" @click="handleInputConfirm('user',item.nickname)">{{item.nickname}}</li>
						  </ul>
						</div>
          </div>
        </el-popover>
        <el-button v-popover:popover2 style="border: 2px dashed #DCDFE6; background: none; margin-right: 20px;">项目</el-button>
        <el-popover
          ref="popover2"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom"
          width="800"
          trigger="hover">
          <div class="tabs_div2">
            <div class="tabs_div1_item">
              <p class="tabs_div1_item_title">运维中</p>
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in projects" :key="index" v-if="item.state === 1 && item.webShow === 1" @click="handleInputConfirm('projects',item.xname)">{{item.xname}}</li>
              </ul>
            </div>
						<div class="tabs_div1_item2">
						  <p class="tabs_div1_item_title2">暂停中</p>
						  <ul class="tabs_div1_item_ul2">
						    <li class="omit" v-for="(item, index) in projects" :key="index" v-if="item.state === 1 && item.webShow === 0" @click="handleInputConfirm('projects',item.xname)">{{item.xname}}</li>
						  </ul>
						</div>
          </div>
        </el-popover>
        <el-button v-popover:popover3 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">类型</el-button>
        <el-popover
          ref="popover3"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom"
          width="400"
          trigger="hover">
          <div class="tabs_div3">
            <div class="tabs_div1_item">
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in types" :key="index" v-if="item.state === 1 && item.webShow === 1" @click="handleInputConfirm('types',item.lname)">{{item.lname}}</li>
              </ul>
            </div>
          </div>
        </el-popover>
        <el-button v-popover:popover4 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">分类</el-button>
        <el-popover
          ref="popover4"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom"
          width="1000"
          trigger="hover">
          <div class="tabs_div3">
            <div class="tabs_div1_item">
							<p class="tabs_div1_item_title">文章类</p>
              <ul class="tabs_div1_item_ul">
                <li class="omit" v-for="(item, index) in minTypes2" :key="index" v-html="item.dname" :title="item.dname" v-if="item.state === 1 && item.webShow === 1 && item.tbid !== 54 && item.tbid !== 56 " @click="handleInputConfirm('minTypes',item.dname)"></li>
              </ul>
            </div>
						<div class="tabs_div1_item">
							<p class="tabs_div1_item_title2">视频类</p>
						  <ul class="tabs_div1_item_ul">
						    <li class="omit" v-for="(item, index) in minTypes2" :key="index" v-html="item.dname" :title="item.dname" v-if="item.state === 1 && item.webShow === 1 && item.tbid === 54 || item.tbid === 56" @click="handleInputConfirm('minTypes',item.dname)"></li>
						  </ul>
						</div>
          </div>
        </el-popover>
				<el-button v-popover:popover7 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">文章质量</el-button>
				<el-popover
				  ref="popover7"
				  :open-delay="0"
				  :visible-arrow="true"
				  placement="bottom"
				  width="400"
				  trigger="hover">
				  <div class="tabs_div3">
				    <div class="tabs_div1_item">
				      <ul class="tabs_div1_item_ul">
				        <li class="omit" title="高" @click="handleInputConfirm('quality','3')">高</li>
				        <li class="omit" title="中" @click="handleInputConfirm('quality','2')">中</li>
				        <li class="omit" title="低" @click="handleInputConfirm('quality','1')">低</li>
				      </ul>
				    </div>
				  </div>
				</el-popover>
        <el-button v-popover:popover5 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">文件类型</el-button>
        <el-popover
          ref="popover5"
          :open-delay="0"
          :visible-arrow="true"
          placement="bottom"
          width="400"
          trigger="hover">
          <div class="tabs_div3">
            <div class="tabs_div1_item">
              <ul class="tabs_div1_item_ul">
                <li class="omit" title="img" @click="handleInputConfirm('fileType','img')">img</li>
                <li class="omit" title="psd" @click="handleInputConfirm('fileType','psd')">psd</li>
                <li class="omit" title="video" @click="handleInputConfirm('fileType','video')">video</li>
                <li class="omit" title="ai" @click="handleInputConfirm('fileType','ai')">ai</li>
                <li class="omit" title="压缩包" @click="handleInputConfirm('fileType','压缩包')">压缩包</li>
                <li class="omit" title="pdf" @click="handleInputConfirm('fileType','pdf')">pdf</li>
                <li class="omit" title="word" @click="handleInputConfirm('fileType','word')">word</li>
                <li class="omit" title="excel" @click="handleInputConfirm('fileType','excel')">excel</li>
              </ul>
            </div>
          </div>
        </el-popover>
				<el-button v-popover:popover6 style="border: 2px dashed #DCDFE6; background: none;margin-right: 20px;">时间</el-button>
				<el-popover
				  ref="popover6"
				  :open-delay="0"
				  :visible-arrow="true"
				  placement="bottom-end"
				  width="400"
				  trigger="hover">
				  <div class="tabs_div4">
				    <div class="tabs_div1_item">
							<el-tabs tab-position="left" style="height: 200px;">
								<el-tab-pane :label="itemY.name" v-for="(itemY, indexY) in timeData" :key="indexY" v-if="itemY.type == 'yy'">
									<ul class="tabs_div1_item_ul">
									  <li class="" v-for="(item, index) in timeData" :key="index" v-html="item.name" :title="item.name" v-if="item.type == 'mm' && item.value == 'all'" @click="handleInputConfirm('time',item.id,itemY.id)"></li>
									</ul>
									<ul class="tabs_div1_item_ul">
									  <li class="" v-for="(item, index) in timeData" :key="index" v-html="item.name" :title="item.name" v-if="item.type == 'mm' && item.value != 'all'" @click="handleInputConfirm('time',item.id,itemY.id)"></li>
									</ul>
									<ul class="tabs_div1_item_ul">
									  <li class="" v-for="(item, index) in timeData" :key="index" v-html="item.name" :title="item.name" v-if="item.type == 'quarter'" @click="handleInputConfirm('time',item.id,itemY.id)"></li>
									</ul>
								</el-tab-pane>
							</el-tabs>
							
				    </div>
				  </div>
				</el-popover>
      </div>
      <div style="padding-bottom: 30px;">
        <b style="font-size: 18px;">筛选条件:</b>
        <span style="margin: 0 10px;" v-for="tag in dynamicTags" :key="tag.name" class="el-tag el-tag--plain" v-if="tag.name !== ''">  {{tag.name}}  <i class="el-tag__close el-icon-close" @click="handleClose(tag.name)"></i></span>
      </div>
  		<dl class="articleList clearfix" v-loading="loading">
  			<dt v-if="article.length === 0 && loading === false">没有查到相关数据</dt>
  			<dd v-for="(item, index) in article" :key="index" v-if="article.length !== 0">
						<template v-if="item.see">
							<div @mouseenter="collectShow(item.mId)" @mouseleave="collectHide(item.mId)">
								<p>
									<span class="gn-p1" :class="{ gnSee: !item.isCollectSeeIcon, 'userCollectSee': item.isUserCollect, 'disabled': item.disabled }" :title="item.isUserCollect ? '已收藏' : '点击收藏'" @click="onCollectArticle(item.mId)">
										<i class="el-icon-star-on" style=""></i>
									</span>
									<img @click="jumpPage(item.mId)" :src="URLS2 + item.srcs[0]" alt=""/>
									<!-- <b v-if="item.quality == '3'" style="font-size: 16px;display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;margin: 0 auto; color: #fff;background-color: #eb3535;position: absolute;top: 0;left: 0;">高</b>
									<b v-if="item.quality == '2'" style="font-size: 16px;display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;margin: 0 auto; color: #fff;background-color: #d09a31;position: absolute;top: 0;left: 0;">中</b>
									<b v-if="item.quality == '1'" style="font-size: 16px;display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;margin: 0 auto; color: #fff;background-color: #cdcdcd;position: absolute;top: 0;left: 0;">低</b> -->
								</p>
								<p @click="jumpPage(item.mId)" class="omit2" :title="'🔺《'+item.title + '》 💂发布人：' + getUserInfo(item.uId).nickname + '🕛发布时间：' + formatDate(item.registerTimeImg)" >{{item.title}}</p>
								<p>
									<img :src="URLS2 + getUserInfo(item.uId,item.mId).headPortraitSrc" @error.once="moveErrorImg" alt="" />
									<span :title="getUserInfo(item.uId).nickname">{{getUserInfo(item.uId).nickname}}</span>
									<samp :title="formatDate(item.registerTimeImg)">
										{{formatDate(item.registerTimeImg)}}
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('img', item.mId)">
											<use xlink:href="#icon-picture"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('psd', item.mId)">
											<use xlink:href="#icon-web-psd"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('video', item.mId)">
											<use xlink:href="#icon-shipinbofangyingpian"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('ai', item.mId)">
											<use xlink:href="#icon-Ai"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('pdf', item.mId)">
											<use xlink:href="#icon-Pdf"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('word', item.mId)">
											<use xlink:href="#icon-word1"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('excel', item.mId)">
											<use xlink:href="#icon-excel1"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('engineering', item.mId)">
											<use xlink:href="#icon-gongcheng-"></use>
										</svg>
									</samp>
								</p>
							</div>
						</template>
  				
						<template v-if="!item.see">
							<div @mouseenter="collectShow(item.mId)" @mouseleave="collectHide(item.mId)">
								<p>
									<span class="gn-p1" :class="{ gnSee: !item.isCollectSeeIcon, 'userCollectSee': item.isUserCollect, 'disabled': item.disabled }" :title="item.isUserCollect ? '已收藏' : '点击收藏'" >
										<i class="el-icon-star-on" style=""></i>
									</span>
									<i class="iconfont icon-pingbi"  style="width: 200px;height: 215px;display: block;margin: auto;font-size: 200px; color: #F56C6C;"></i>
									<!-- <b v-if="item.quality == '3'" style="font-size: 16px;display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;margin: 0 auto; color: #fff;background-color: #eb3535;position: absolute;top: 0;left: 0;">高</b>
									<b v-if="item.quality == '2'" style="font-size: 16px;display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;margin: 0 auto; color: #fff;background-color: #d09a31;position: absolute;top: 0;left: 0;">中</b>
									<b v-if="item.quality == '1'" style="font-size: 16px;display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;margin: 0 auto; color: #fff;background-color: #cdcdcd;position: absolute;top: 0;left: 0;">低</b> -->
								</p>
								<p class="omit2" :title="'🔺《'+item.title + '》 💂发布人：' + getUserInfo(item.uId).nickname + '🕛发布时间：' + formatDate(item.registerTimeImg)" >{{item.title}}</p>
								<p>
									<img :src="URLS2 + getUserInfo(item.uId,item.mId).headPortraitSrc" @error.once="moveErrorImg" alt="" />
									<span :title="getUserInfo(item.uId).nickname">{{getUserInfo(item.uId).nickname}}</span>
									<samp :title="formatDate(item.registerTimeImg)">
										{{formatDate(item.registerTimeImg)}}
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('img', item.mId)">
											<use xlink:href="#icon-picture"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('psd', item.mId)">
											<use xlink:href="#icon-web-psd"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('video', item.mId)">
											<use xlink:href="#icon-shipinbofangyingpian"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('ai', item.mId)">
											<use xlink:href="#icon-Ai"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('pdf', item.mId)">
											<use xlink:href="#icon-Pdf"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('word', item.mId)">
											<use xlink:href="#icon-word1"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('excel', item.mId)">
											<use xlink:href="#icon-excel1"></use>
										</svg>
										<svg class="icon svg-icon" aria-hidden="true" v-if="returnArticleType('engineering', item.mId)">
											<use xlink:href="#icon-gongcheng-"></use>
										</svg>
									</samp>
								</p>
							</div>
						</template>
          
  			</dd>
  		</dl>
  		<div class="block" style="width: 470px;margin: 0 0 0 20%;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="dataList"
          layout="total, sizes, prev, pager, next"
          :total="articleAll">
        </el-pagination>
  		</div>
  	</el-header>
  </el-container>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SET_WEB_INFO } from 'STORE/mutation-types'
import { cachedAdminInfo, cachedWebInfo } from 'API/cacheService'
export default {
    inject: ['reload'],
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    name: 'backstage',
    components: {},
    data() {
      return {
        loading: true,
        projects: this.$store.state.common.publicInfo.projects,
        types:this.$store.state.common.publicInfo.types,
        minTypes: this.$store.state.common.publicInfo.details,
        minTypes2: this.$store.state.common.publicInfo.details,
        article: [],
        article2: [],
        article3: [],
        userList: [],
        URLS2: this.$store.state.common.publicInfo.srcUrl,
        num1: '-1',
        num2: '-1',
        num3: '-1',
        num4: '-1',
				quality: {
          id: '',
          name: '',
          index: '-1'
        },
        user: {
          id: '',
          name: '',
          index: '-1'
        },
        xname: {
          id: '',
          name: '',
          index: '-1'
        },
        lname: {
          id: '',
          name: '',
          index: '-1'
        },
        dnames: {
          pbid: '',
          tbid: '',
          did: '',
          name: '',
          index: '-1'
        },
        fileType: {
          id: '',
          name: '',
          index: ''
        },
				fileTime: {
				  idY: '',
				  idM: '',
				  name: '',
				  index: ''
				},
				timeData:[],
        showtype: true,
        currentPage1: 1,
        dataList: 8,
        pageNum: this.$store.state.web.webInfo.pageNum,
        userInfo: this.$store.state.admin.adminInfo,
        articleAll: parseInt(this.$store.state.web.webInfo.articleAll),
        sessionData: false,
        dynamicTags: []
      }
    },
    watch: {
      'lname.name':function (newQuestion, oldQuestion) {
        if (this.num3 !== '-1') {
        	this.num3 = '-1'
        	this.dnames.pbid = this.dnames.tbid = this.dnames.did = this.dnames.name = this.dnames.index = ''
        }
        if (!this.sessionData) {
        	this.setdata(0)
        } else {
        	this.setdata(this.currentPage1)
        }
      },
      'xname.name':function (newQuestion, oldQuestion) {
        let _this = this, num = []
      	if(this.userInfo.shieldInfo !== null && this.projects.length !== 0 && this.userInfo.permissions !== 2){
          this.userInfo.shieldInfo.find((o,index)=>{
            if(o.xname == _this.xname.name && o.state == 1){
              o.type.find((e,indexe)=>{
                if(e.state == 1){
                  _this.types.find((x,indexx)=>{
                    e.tid == x.tid ? x.state = 1 : x = x
                    _this.$set(_this.types,indexx,x)
                  })
                }
              })
            }
          })
        }
      },
      keyword:function (newQuestion, oldQuestion) {
        let _this = this
        this.adminGetArticleAll({
          keyword: _this.keyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          page: 1,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId,
					quality: _this.quality.id,
					time:_this.getSeeTime()
				})
      }
    },
    methods: {
      ...mapActions([
        'webUserList',
        'getWebArticleAll',
        'collectArticle'
      ]),
			// 收藏按钮显示
			collectShow(mid,isCollectSeeIcon,isUserCollect){
				// console.log(mid,'收藏按钮显示')
				let _this = this
				this.article.find((obj,index)=>{
					obj.mId == mid ? obj.isCollectSeeIcon = true : obj.isCollectSeeIcon = false
					_this.$set(this.article,index,obj)
				})
			},
			// 收藏按钮隐藏
			collectHide(mid,isCollectSeeIcon,isUserCollect){
				// console.log(mid,'收藏按钮隐藏')
				let _this = this
				this.article.find((obj,index)=>{
					obj.mId == mid ? obj.isCollectSeeIcon = false : obj.isCollectSeeIcon = obj.isCollectSeeIcon
					_this.$set(this.article,index,obj)
				})
			},
			 //处理破图
			moveErrorImg(event) {
				event.currentTarget.src = this.URLS2 + "/image/sq17.png"
				event.currentTarget.style.width = "auto";
				return true;
			},
      handleSizeChange(val) {
        let _this = this, webInfo =  this.$store.state.web.webInfo
        webInfo.articlePageNum = val
        this.dataList = val
				webInfo.pageNum = (this.articleAll/webInfo.articlePageNum).toFixed(0)
				webInfo.articleAll = this.articleAll
        this.$store.commit(SET_WEB_INFO, webInfo)
        cachedWebInfo.save(webInfo)
        this.adminGetArticleAll({
          keyword: _this.keyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          page: 1,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId,
					quality: _this.quality.id,
					time:_this.getSeeTime()
				})
        // console.log('每页 ' + val + '条');
      },
      handleCurrentChange(val) {
        let _this = this
        this.adminGetArticleAll({
          keyword: _this.keyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          page: val,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId,
					quality: _this.quality.id,
					time:_this.getSeeTime()
				})
      },
      resetTab() {
        this.num1 = '-1'
        this.num2 = '-1'
        this.xname.id = this.xname.name = this.xname.index = this.lname.id = this.lname.name = this.lname.index = ''
      },
      // 添加
      handleInputConfirm(type, inputValue, inputValue2 = '') {
        if (inputValue) {
          if(type === 'user'){
            let user = this.userList.find(o=>{ return o.nickname === inputValue })
            this.user.id = user.uId
            this.user.name = user.nickname
          }
          if(type === 'projects'){
            let projects = this.projects.find(o=>{ return o.xname === inputValue })
            this.xname.id = projects.pid
            this.xname.name = projects.xname
          }
          if(type === 'types'){
            let types = this.types.find(o=>{ return o.lname === inputValue })
            this.lname.id = types.tid
            this.lname.name = types.lname
          }
          if(type === 'minTypes'){
            let minTypes = this.minTypes.find(o=>{ return o.dname === inputValue })
            this.dnames.tbid = minTypes.tbid
            this.dnames.did = minTypes.did
            this.dnames.name = minTypes.dname
          }
          if(type === 'fileType'){
            this.fileType.id = inputValue
            this.fileType.name = inputValue
          }
					if(type === 'quality'){
            this.quality.id = inputValue
            this.quality.name = inputValue == 1 ? '低' : inputValue == 2 ? '中' : inputValue == 3 ? '高' : console.log()
          }
					if(type === 'time'){
						let yy = {}, mm = {}, _this = this
						this.timeData.forEach(o=>{
							if(o.id == inputValue){
								mm = o
								_this.fileTime.idM = o.id
							}
							if(o.id == inputValue2){
								yy = o
								_this.fileTime.idY = o.id
							}
						})
						if(JSON.stringify(yy) != '{}' && JSON.stringify(mm) != '{}'){
							 mm.value == 'all' ? this.fileTime.name = yy.name : this.fileTime.name = yy.name + mm.name
						}
          }

          this.dynamicTags.splice(0, this.dynamicTags.length);
          this.user.name !== '' ? this.dynamicTags.push(this.user) : console.log()
          this.xname.name !== '' ? this.dynamicTags.push(this.xname) : console.log()
          this.lname.name !== '' ? this.dynamicTags.push(this.lname) : console.log()
          this.dnames.name !== '' ? this.dynamicTags.push(this.dnames) : console.log()
          this.fileType.name !== '' ? this.dynamicTags.push(this.fileType) : console.log()
          this.fileTime.name !== '' ? this.dynamicTags.push(this.fileTime) : console.log()
          this.quality.name !== '' ? this.dynamicTags.push(this.quality) : console.log()

          this.setdata()
        }
      },
      // 筛选条件标签删除操作
      handleClose(tagName) {
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tagName), 1);
        if(tagName === this.user.name){
          this.user.id = ''
          this.user.name = ''
        }
        if(tagName === this.xname.name){
          this.xname.id = ''
          this.xname.name = ''
        }
        if(tagName === this.lname.name){
          this.lname.id = ''
          this.lname.name = ''
        }
        if(tagName === this.dnames.name){
          this.dnames.tbid = ''
          this.dnames.did = ''
          this.dnames.name = ''
        }
        if(tagName === this.quality.name){
          this.quality.id = ''
          this.quality.name = ''
        }
				if(tagName === this.fileType.name){
          this.fileType.id = ''
          this.fileType.name = ''
        }
				if(tagName === this.fileTime.name){
					this.fileTime.idY = ''
					this.fileTime.idM = ''
					this.fileTime.name = ''
					this.fileTime.index = ''
        }
        this.dynamicTags.splice(0, this.dynamicTags.length);
        this.user.name !== '' ? this.dynamicTags.push(this.user) : console.log()
        this.xname.name !== '' ? this.dynamicTags.push(this.xname) : console.log()
        this.lname.name !== '' ? this.dynamicTags.push(this.lname) : console.log()
        this.dnames.name !== '' ? this.dynamicTags.push(this.dnames) : console.log()
        this.quality.name !== '' ? this.dynamicTags.push(this.quality) : console.log()
        this.fileType.name !== '' ? this.dynamicTags.push(this.fileType) : console.log()
        this.fileTime.name !== '' ? this.dynamicTags.push(this.fileTime) : console.log()

        this.setdata()
      },
      /**
       * 选择类型动态修改，点击不同的项目、类型、分类显示相应的类型和分类
       * */
      setdata(page) {
        let _this = this
        this.minTypes2 = []
        if (this.xname.id === '' && this.lname.id === '' && this.dnames.did === '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did === '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id === '' && this.lname.id === '' && this.dnames.did !== '') {
          this.resetTab()
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did === '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did !== '') {
          this.minTypes2 = this.minTypes
        } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did !== '') {
          this.minTypes.find((obj, index) => {
            if (_this.lname.id === obj.tbid  && obj.state === 1 && obj.webShow === 1) {
              _this.minTypes2.push(obj)
            }
          })
        }
        this.adminGetArticleAll({
          keyword: _this.keyword,
          type: this.fileType.name !== '' ? this.fileType.name : null,
          page: 1,
          articlePageNum: _this.dataList,
          pid: _this.xname.id !== '' ? _this.xname.id : null,
          tid: _this.lname.id !== '' ? _this.lname.id : null,
          did: _this.dnames.did !== '' ? _this.dnames.did : null,
          uid: _this.user.id !== '' ? _this.user.id : null,
          userId: _this.userInfo.uId,
          quality: _this.quality.id,
					time:_this.getSeeTime()
				})
      },
      formatDate(time) {
        if(time !== null) {
          let date = new Date(parseInt(time) * 1000)
          return formatDate(date, 'yyyy-MM-dd')
        } else {
          return '暂无'
        }
      },
      getUserInfo (id,mId) {
        let user = this.userList.find((user, index) => {
          return user.uId === id
        })
        return user !== undefined ? user : {}
      },
      // 把导航值赋值给isdefaultActive并本地储存
      localStorageSet() {
        // 移除后重新赋值
        sessionStorage.setItem("webSeeArtcurrentPage", JSON.stringify(this.currentPage1))
        sessionStorage.setItem("webSeeArtnum1", JSON.stringify(this.num1 === '' ? '-1' : this.num1))
        sessionStorage.setItem("webSeeArtnum2", JSON.stringify(this.num2 === '' ? '-1' : this.num2))
        sessionStorage.setItem("webSeeArtnum3", JSON.stringify(this.num3 === '' ? '-1' : this.num3))
        sessionStorage.setItem("webSeeArtnum4", JSON.stringify(this.num4 === '' ? '-1' : this.num4))
        sessionStorage.setItem("webSeeArtUser", JSON.stringify(this.user))
        sessionStorage.setItem("webSeeArtXname", JSON.stringify(this.xname))
        sessionStorage.setItem("webSeeArtLname", JSON.stringify(this.lname))
        sessionStorage.setItem("webSeeArtDnames", JSON.stringify(this.dnames))
      },
      // 本地获取导航值，赋值给isdefaultActive
      localStorageGet() {
        if (JSON.parse(sessionStorage.getItem("webSeeArtSessionData")) === true) {
          this.currentPage1 = JSON.parse(sessionStorage.getItem("webSeeArtcurrentPage")) || 1
          this.num1 = JSON.parse(sessionStorage.getItem("webSeeArtnum1")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum1"))
          this.num2 = JSON.parse(sessionStorage.getItem("webSeeArtnum2")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum2"))
          this.num3 = JSON.parse(sessionStorage.getItem("webSeeArtnum3")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum3"))
          this.num4 = JSON.parse(sessionStorage.getItem("webSeeArtnum4")) === '' ? '-1' : JSON.parse(sessionStorage.getItem("webSeeArtnum4"))
          this.user = JSON.parse(sessionStorage.getItem("webSeeArtUser")) || { id: '', name: '', index: '-1' }
          this.xname = JSON.parse(sessionStorage.getItem("webSeeArtXname")) || { id: '', name: '', index: '-1' }
          this.lname = JSON.parse(sessionStorage.getItem("webSeeArtLname")) || { id: '', name: '', index: '-1' }
          this.dnames = JSON.parse(sessionStorage.getItem("webSeeArtDnames")) || { pbid: '', tbid: '', did: '', name: '', index: '-1' }
          this.sessionData = JSON.parse(sessionStorage.getItem("webSeeArtSessionData")) || false
          this.sessionStorageReset()
        }
      },
      // session中有存储上一次查询值是重置到上次查询位置
      sessionStorageReset () {
        let _this = this
        this.minTypes2 = []
        // 重置分类内容
        this.minTypes.find((obj, index) => {
          if(_this.lname.id === obj.tbid  && obj.state === 1) {
            _this.minTypes2.push(obj)
          }
        })
        // 重置分类点击效果
        this.num3 = this.dnames.index
        this.setdata(this.currentPage1)
        // 重置当前页数显示内容
        this.handleCurrentChange(this.currentPage1)
        // 关闭加载状态
        this.loading = false
        // 当前页面没有显示文章内容时重新刷新
        if (this.article3.length === 0) {
          window.location.reload()
        }
      },
      adminGetArticleAll (params) {
        let _this = this
				
        this.getWebArticleAll(params)
          .then((response) => {
            if(response.code === 200 && response.data.article.length !== 0) {
              let srcs = []
              _this.loading = true
              _this.article = response.data.article
              _this.article.find(obj => {
              	// obj.img = obj.img === '[]' ? eval('(' + obj.img + ')') : JSON.parse(obj.img)
              	// obj.psd = obj.psd === '[]' ? eval('(' + obj.psd + ')') : JSON.parse(obj.psd)
              	// obj.video = obj.video === '[]' ? eval('(' + obj.video + ')') : JSON.parse(obj.video)
               //  obj.ai = obj.ai === '[]' ? eval('(' + obj.ai + ')') : JSON.parse(obj.ai)
               //  obj.pdf = obj.pdf === '[]' ? eval('(' + obj.pdf + ')') : JSON.parse(obj.pdf)
               //  obj.word = obj.word === '[]' ? eval('(' + obj.word + ')') : JSON.parse(obj.word)
               //  obj.excel = obj.excel === '[]' ? eval('(' + obj.excel + ')') : JSON.parse(obj.excel)
               //  obj.engineering = obj.engineering === '[]' ? eval('(' + obj.engineering + ')') : JSON.parse(obj.engineering)
                obj.typeFile.indexOf('img') !== -1 ? srcs[srcs.length] = obj.img[0].miniImg : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('psd') !== -1 ? srcs[srcs.length] = obj.psd[0].Psdview : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('video') !== -1 ? srcs[srcs.length] = obj.video[0].Videoview : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('ai') !== -1 ? srcs[srcs.length] = 'image/ai.jpg' : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('pdf') !== -1 ? srcs[srcs.length] = 'image/pdf.jpg' : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('word') !== -1 ? srcs[srcs.length] = 'image/word.jpg' : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('excel') !== -1 ? srcs[srcs.length] = 'image/excel.jpg' : obj.typeFile = obj.typeFile
                obj.typeFile.indexOf('压缩包') !== -1 ? srcs[srcs.length] = 'image/ysb.jpg' : obj.typeFile = obj.typeFile
              	obj.srcs = srcs.length !== 0 ? srcs : new Array()
                // obj.see = true
                obj.see = _this.authorityDetection(obj.mId)
								obj.isCollectSeeIcon = false
              	srcs = []
              })
              _this.articleAll = parseInt(response.data.articleNum)
              _this.currentPage1 = parseInt(response.data.page)
              _this.loading = false
            } else {
              _this.article = []
              _this.articleAll = 0
              _this.loading = false
              _this.prompt = '没有查到相关数据'
            }
            // 更新每页条数
            if (_this.dataList !== response.data.article.length) {
              let webInfo =  _this.$store.state.web.webInfo
              webInfo.articlePageNum = response.data.article.length
							webInfo.pageNum = (_this.articleAll/webInfo.articlePageNum).toFixed(0)
							webInfo.articleAll = _this.articleAll
              _this.$store.commit(SET_WEB_INFO, webInfo)
              cachedWebInfo.save(webInfo)
            }
          })
          .catch(function (error) {
            // _this.$alert(error.msg, {confirmButtonText: '确定'})
          })
      },
      // 检查文章权限
      authorityDetection(mId){
        let privacyTypes = [], panduan = true, _this = this, article = this.article.find(o=>{return o.mId === mId}), authGroup = [], users = []
        if(this.$store.state.common.publicInfo.privacyTypes.length === 0){
          panduan = true
        } else {
          this.$store.state.common.publicInfo.privacyTypes.find(obj=>{
            if(obj.state === 1){
							authGroup = []
							users = []
							// 检查数据格式
							if(typeof obj.authGroup == 'string' && obj.authGroup.length > 1 &&  obj.authGroup.indexOf(',') > -1){
								authGroup = obj.authGroup.split(',')
							} else if(typeof obj.authGroup == 'string' && obj.authGroup.length > 1 &&  obj.authGroup.indexOf(',') == -1) {
								authGroup.push(obj.authGroup)
							}
							if(typeof obj.users == 'string' && obj.users.length > 1 &&  obj.users.indexOf(',') > -1){
								users = obj.users.split(',')
							} else if(typeof obj.users == 'string' && obj.users.length > 1 &&  obj.users.indexOf(',') == -1) {
								users.push(obj.users)
							}
							
              privacyTypes.push({
                "id":obj.id,
                "tid":obj.tid,
                "users":users,
                "authGroup":authGroup,
                "state":obj.state,
                "articlelist":obj.articlelist
              })
            }
          })
          if(privacyTypes.length === 0 || article.uId === _this.userInfo.uId || _this.userInfo.permissions === 2){
            panduan = true
          } else {
            privacyTypes.find(p=>{
              if(p.tid === article.detailsid){
                if(p.state === 2 || (p.state === 1 && p.users.includes(_this.userInfo.uId.toString()) || p.authGroup.includes(_this.userInfo.permissions.toString()))){
                  panduan = true
                } else {
                  panduan = false
                }
              }
            })
          }
        }
        return panduan
      },
			getSeeTime () {
				let time = '', yy = {}, mm = {}, _this = this, timeStart = {}, timeEnd = {}
				this.timeData.forEach(o=>{
					if(o.id == _this.fileTime.idY) yy = o
					if(o.id == _this.fileTime.idM) mm = o
				})
				if(mm.type == 'mm' && mm.value == 'all'){
					time = yy.value + '-01-01,' + yy.value + '-12-31'
				} else if (mm.type == 'mm' && mm.value != 'all'){
					timeStart = new Date(yy.value, mm.value, 1), timeEnd = new Date(yy.value, mm.value+1, 0)
					time = timeStart.getFullYear() + '-' + (timeStart.getMonth()+1) + '-' + timeStart.getDate() + ',' + timeEnd.getFullYear() + '-' + (timeEnd.getMonth()+1) + '-' + timeEnd.getDate()
				} else if(mm.type == 'quarter' && mm.value == '1'){
					timeStart = new Date(yy.value, 0, 1), timeEnd = new Date(yy.value, 2+1, 0)
					time = timeStart.getFullYear() + '-' + (timeStart.getMonth()+1) + '-' + timeStart.getDate() + ',' + timeEnd.getFullYear() + '-' + (timeEnd.getMonth()+1) + '-' + timeEnd.getDate()
				} else if(mm.type == 'quarter' && mm.value == '2'){
					timeStart = new Date(yy.value, 3, 1), timeEnd = new Date(yy.value, 5+1, 0)
					time = timeStart.getFullYear() + '-' + (timeStart.getMonth()+1) + '-' + timeStart.getDate() + ',' + timeEnd.getFullYear() + '-' + (timeEnd.getMonth()+1) + '-' + timeEnd.getDate()
				} else if(mm.type == 'quarter' && mm.value == '3'){
					timeStart = new Date(yy.value, 6, 1), timeEnd = new Date(yy.value, 8+1, 0)
					time = timeStart.getFullYear() + '-' + (timeStart.getMonth()+1) + '-' + timeStart.getDate() + ',' + timeEnd.getFullYear() + '-' + (timeEnd.getMonth()+1) + '-' + timeEnd.getDate()
				} else if(mm.type == 'quarter' && mm.value == '4'){
					timeStart = new Date(yy.value, 9, 1), timeEnd = new Date(yy.value, 11+1, 0)
					time = timeStart.getFullYear() + '-' + (timeStart.getMonth()+1) + '-' + timeStart.getDate() + ',' + timeEnd.getFullYear() + '-' + (timeEnd.getMonth()+1) + '-' + timeEnd.getDate()
				}
				return time
			},
      // 判断文章的img、psd、video是否有数据并返回true/false
      returnArticleType (type,mid) {
        let time = false
        switch (type) {
          case 'img':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.img.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'psd':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.psd.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'video':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.video.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'ai':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.ai.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'pdf':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.pdf.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'word':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.word.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'excel':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.excel.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
          case 'engineering':
            this.article.find((obj, index) => {
              if (obj.mId === mid) {
                obj.engineering.length !== 0 ? time = true : time = false
              }
            })
            return time
            break;
        }
      },
			
			// 跳转文章页
			jumpPage(mId){
				// 默认替换当前页面内容
				// this.$router.push("/web/article/" + mId + "/Index/0/0/")
				
				// 打开新页面
				let text= this.$router.resolve({path: "/web/article/" + mId + "/Index/0/0/"});
				// 打开一个新的页面     
				window.open(text.href, '_blank')
			},
			
			// 收藏文章/取消收藏
			onCollectArticle(mid){
				let _this = this
				this.collectArticle({uId:this.$store.state.admin.adminInfo.uId, mId:mid})
				  .then((response) => {
				    if(response.code === 200) {
							_this.article.find((obj,index)=>{
								if(obj.mId == mid) obj.isUserCollect = response.data
								_this.$set(_this.article,index,obj)
							})
							_this.$message({ message: response.msg, type: 'success' });
				    }
				  })
				  .catch(function (error) {
				    _this.$message({ message: error.msg, type: 'warning' });
				  })
			}
    },
    created() {
      let _this = this
			// 检索时间生成，自2018年6月开始
			let timeData = [], thisYear = new Date()
			for (let i = 2018; i <= parseInt(thisYear.getFullYear()); i++) {
				this.timeData.push({id:this.timeData.length, name:i + '年', value:i.toString(),type:'yy'})
			}
			for (let i = 0; i <= 11; i++) {
				this.timeData.push({id:this.timeData.length, name:(i+1) + '月', value:i,type:'mm'})
			}
			this.timeData.push({id:this.timeData.length, name:'全年', value:'all',type:'mm'})
			this.timeData.push({id:this.timeData.length, name:'1-3月', value:'1',type:'quarter'})
			this.timeData.push({id:this.timeData.length, name:'4-6月', value:'2',type:'quarter'})
			this.timeData.push({id:this.timeData.length, name:'7-9月', value:'3',type:'quarter'})
			this.timeData.push({id:this.timeData.length, name:'10-12月', value:'4',type:'quarter'})
			
			
      this.webUserList()
        .then((response) => {
          if(response.code === 200) {
            _this.loading = true
            _this.userList = response.data
            if (_this.userList.length !== 0) {
              _this.userList.find((o, index) => {
                o.registerTime = _this.formatDate(o.registerTime)
                o.endTime = _this.formatDate(o.endTime)
              })
              _this.loading = false
            } else {
              _this.userList = []
            }
						_this.adminGetArticleAll({
						  keyword: _this.keyword,
						  type: _this.fileType.name !== '' ? _this.fileType.name : null,
						  page: 1,
						  articlePageNum: _this.dataList,
						  pid: _this.xname.id !== '' ? _this.xname.id : null,
						  tid: _this.lname.id !== '' ? _this.lname.id : null,
						  did: _this.dnames.did !== '' ? _this.dnames.did : null,
						  uid: _this.user.id !== '' ? _this.user.id : null,
						  userId: _this.userInfo.uId,
							quality: _this.quality.id,
							time:_this.getSeeTime()
						  })
          }
        })
        .catch(function (error) {
          // _this.$alert(error.msg, {confirmButtonText: '确定'})
        })
			
      // 屏蔽项目设置
      if(this.userInfo.shieldInfo !== null && JSON.stringify(this.userInfo.shieldInfo) == "{}" && this.projects.length !== 0 && this.userInfo.permissions !== 2){
        this.userInfo.shieldInfo.find((o,index)=>{
          _this.projects.find((e,indexe)=>{
            e.pid == o.pid && o.state !== 0 ? e.state = 0 : e = e
            _this.$set(_this.projects,indexe,e)
          })
        })
      }
    }
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
.el-container{ border-top: 1px solid #e3e3e3; padding-top: 30px;}
.omit{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;height:30px!important}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.el-header{width:1200px;margin:0 auto 30px;height:auto;background:0 0;height:auto!important;padding-bottom:40px}
.tab{width:100%;height:auto;min-height:30px;margin-bottom:20px;position:relative}
.tab p{font-weight:400;color:#1f2f3d;font-size:20px;margin:0;float:left;width:7%}
.tab ul{float:left;width:93%;height:auto}
.tab ul li{float:left;height:30px;line-height:30px;margin:0 10px;cursor:pointer}
.tab ul li:hover{color:#409eff;font-weight:700}
.tab ul a{position:absolute;bottom:-40px;left:44%;width:160px;display:inline-block;line-height:30px;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;border-top-color:#dcdfe6;border-right-color:#dcdfe6;border-bottom-color:#dcdfe6;border-left-color:#dcdfe6;border-color:#dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;outline:0;margin:0;-webkit-transition:.1s;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;font-size:14px;border-radius:4px}
.tab ul a:hover{background:#fff;border-color:#409eff;color:#409eff}
.tab ul li.on{color:#fff;background-color:#409eff;border-color:#f56c6c;display:inline-block;white-space:nowrap;cursor:pointer;border:1px solid #dcdfe6;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;outline:0;margin:0;-webkit-transition:.1s;transition:.1s;font-weight:500;padding:5px 10px;font-size:14px;border-radius:4px;line-height:20px}
table{width:100%!important}
.el-pagination span:not([class*=suffix]){float:right!important}
.cell{padding:0!important}
.articleList{width: 1200px; height: auto; margin: 0 auto 80px;}
.articleList dt{ width: 100%; height: 361px; font-size: 20px; text-align: center; line-height: 361px;}
.articleList dd{ width: 22%; height: 335px; float: left; overflow: hidden;margin: 1%;border: 1px solid #e5e5e5;border-radius: 5px;box-shadow:none;  background: #FFFFFF;}
.articleList dd:hover p:nth-child(2){color:#f00000 ;}
.articleList dd p:nth-child(1){width: 266px; height: 215px; position: relative; border-radius: 5px 5px 0 0;overflow: hidden;cursor: pointer;}
.articleList dd p:nth-child(1) img{position: absolute; display: block; width: 266px; }
.articleList dd p:nth-child(2){ height: 40px; padding: 5px; border-bottom: 1px solid #e5e5e5; font-size: 18px; line-height: 1.2;cursor: pointer;}
.articleList dd p:nth-child(3){height: 45px; padding: 15px; line-height: 45px; display: flex; justify-content: center; align-items: center;}
.articleList dd p:nth-child(3) img{ width: 40px; height: 40px; float: left; display: block;border-radius: 50px;}
.articleList dd p:nth-child(3) span{float: left; display: block; width: 50%; text-indent: 10px;}
.articleList dd p:nth-child(3) samp{float: left; display: block;width: 32%; text-align: center; color: #999999;line-height: .5;}
.icon {width: 20px;height: 20px;vertical-align: -0.15em;fill: currentColor;overflow: hidden; padding-top: 10px;}
.tabs{display: flex; justify-content: flex-end; align-items: center; padding: 0 0 30px;}
.tabs_div1{padding: 20px 0;}
.tabs_div1 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div1 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px; margin-top: 10px;}
.tabs_div1 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 10px; height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div1 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div1 /deep/ .tabs_div1_item_ul li{width: 10%; text-align: left; height: 40px;  line-height: 40px;  transition: all .2s; cursor: pointer;}

.tabs_div1 /deep/ .tabs_div1_item2{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div1 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;margin-top: 10px;}
.tabs_div1 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 10px; height: 20px;line-height: 20px; content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
.tabs_div1 /deep/ .tabs_div1_item_ul2{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div1 /deep/ .tabs_div1_item_ul2 li{width: 10%; text-align: left;height: 40px;  line-height: 40px;  transition: all .2s;cursor: pointer;}
.tabs_div1 /deep/ .tabs_div1_item_ul2 li:hover, .tabs_div1 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}

.tabs_div2{padding: 20px 0;}
.tabs_div2 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;}
.tabs_div2 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;margin-top: 10px;}
.tabs_div2 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 10px; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div2 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex: 1;}
.tabs_div2 /deep/ .tabs_div1_item_ul li{width: 20%; text-align: left; height: 40px;  line-height: 40px;  transition: all .2s;cursor: pointer;}

.tabs_div2 /deep/ .tabs_div1_item2{display: flex; justify-content: flex-start; align-items: flex-start;position: relative; margin-top: 10px;}
.tabs_div2 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;margin-top: 10px;}
.tabs_div2 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 10px; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
.tabs_div2 /deep/ .tabs_div1_item_ul2{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex: 1;}
.tabs_div2 /deep/ .tabs_div1_item_ul2 li{width: 20%; text-align: left;height: 40px;    transition: all .2s;cursor: pointer;}
.tabs_div2 /deep/ .tabs_div1_item_ul2 li:hover, .tabs_div2 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}

.tabs_div3{padding: 20px 0;}
.tabs_div3 /deep/ .tabs_div1_item{display: flex; justify-content: flex-start; align-items: flex-start;position: relative;margin-top: 10px;}
.tabs_div3 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;}
.tabs_div3 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div3 /deep/ .tabs_div1_item_title2{padding: 0px 20px; width: 100px;margin-top: 10px;}
.tabs_div3 /deep/ .tabs_div1_item_title2::after{position: absolute;left: 0; top: 10px; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #FF4C29;border-radius: 2px;}
.tabs_div3 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div3 /deep/ .tabs_div1_item_ul li{width: 20%; text-align: left; height: 40px;  line-height: 40px;  transition: all .2s;cursor: pointer;}
.tabs_div3 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}

.tabs_div4{padding: 20px 0;}
.tabs_div4 /deep/ .tabs_div1_item{position: relative;}
.tabs_div4 /deep/ .tabs_div1_item_title{padding: 0px 20px; width: 100px;margin-top: 10px;}
.tabs_div4 /deep/ .tabs_div1_item_title::after{position: absolute;left: 0; top: 0; height: 20px;line-height: 20px;content: " ";display: block;width: 4px; background: #5fd0cd;border-radius: 2px;}
.tabs_div4 /deep/ .tabs_div1_item_ul{display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;flex: 1;}
.tabs_div4 /deep/ .tabs_div1_item_ul li{width: 20%; text-align: center; height: 40px; line-height: 40px;    transition: all .2s;cursor: pointer;}
.tabs_div4 /deep/ .tabs_div1_item_ul li:hover {color: #2CAEFF;}

.articleList dd p:nth-child(1) {}
.gn-p1{position: absolute;top: 5px; right: 5px;z-index: 999;  width: 30px; height: 30px; border-radius: 5px; background-color: #000000ab; display: flex;justify-content: center;align-items: center;cursor: pointer;}
.gn-p1 i{font-size: 22px; color: #fff;}
.gn-p1:hover i{color: #ffff00; font-size: 16px;  font-weight: bold;}
.gnSee{display: none;}
.userCollectSee i{color: #ffff00; font-weight: bold;}
.disabled{color: #c0c4cc;cursor: not-allowed;background-image: none;background-color: #ebeef5;border-color: #ebeef5;}
.disabled i{color: #c0c4cc;}
.disabled:hover i{color: #c0c4cc;}
</style>
