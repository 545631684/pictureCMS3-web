<template>
<div class="pdf">
  <pdf
    style="width: 60%; margin: auto;"
    ref="pdf"
    :src="src"
    :page="pageNum"
    :rotate="pageRotate"
    @password="password"
    @progress="loadedRatio = $event"
    @page-loaded="pageLoaded($event)"
    @num-pages="pageTotalNum=$event"
    @error="pdfError($event)"
    @link-clicked="page = $event">
  </pdf>
  <div class="pdf-tab">
    <div class="btn-def btn-pre" @click.stop="prePage">上一页</div>
    <div class="btn-def btn-next" @click.stop="nextPage">下一页</div>
    <div class="pdf-total pdf-num">{{pageNum}}/{{pageTotalNum}}页</div>
    <!-- <div
      class="btn-def"
      @click.stop="clock">顺时针</div>
    <div
      class="btn-def"
      @click.stop="counterClock">逆时针</div>
    <div
      class="btn-def"
      @click.stop="pdfPrintAll">全部打印</div>
    <div
      class="btn-def"
      @click.stop="pdfPrint">部分打印</div> -->
    <!-- <div class="pdf-process">进度：{{loadedRatio|fixedTwo}}</div> -->
    <!-- <div class="pdf-num">页面加载成功: {{curPageNum}}</div> -->
  </div>

</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components:{
  	pdf
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data(){
  	return {
  		pdfUrl:"http://192.168.0.130/file/img/2020-07-09/5f06d65ace667.pdf",
      // pdfUrl:'./static/pdf/password.pdf',
  		pageNum:1,
      pageTotalNum:1,
      pageRotate:0,
      // 加载进度
      loadedRatio:0,
      curPageNum:0,
  	}
  },
  mounted: function() {
  },
  methods: {
    prePage(){
      var p = this.pageNum
      p = p>1?p-1:this.pageTotalNum
      this.pageNum = p
    },
    nextPage(){
      var p = this.pageNum
      p = p<this.pageTotalNum?p+1:1
      this.pageNum = p
    },
    clock(){
      this.pageRotate += 90
    },
    counterClock(){
      this.pageRotate -= 90
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e){
      this.curPageNum = e
    },
    pdfError(error){
      console.error(error)
    },
    pdfPrintAll(){
      this.$refs.pdf.print()
    },
    pdfPrint(){
      this.$refs.pdf.print(100,[1,2])
    },
  }
}
</script>
<style lang="less" scoped>
.pdf-tab{
      width: 350px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px;
  justify-content: flex-start;
  align-items: center;
  .btn-def{
    border-radius: 5px;
    font-size: 24px;
    height: 35px;
    width: 100px;
    text-align: center;
    line-height: 34px;
    background: #409eff;
    color: #fff;
    margin-bottom: 20px;
    margin-right: 20px;
  }
}
.pdf-total{
  text-align: center;
  font-size: 34px;

}
.pdf-process{
  text-align: center;
  font-size: 34px;
}
.pdf-num{
  text-align: center;
  font-size: 34px;
  margin-bottom: 15px;
}
</style>
