<template>
  <div class="cropper-wrap">
    <div class="cropper-alert-mask" :class="{ show: imgHasLoad }"></div>
    <div class="cropper-alert" :class="{ show: imgHasLoad }">
      <div class="cropper">
        <span class="layout-icon-wrap"><i class="el-icon-circle-close" @click="imgHasLoad=false"></i></span>
        <div class="cropper-box">
          <img ref="uploadPreview" style="width:100px;height:auto;" class="cropper-hidden">
        </div>
        <div class="cropper-res-wrap">
          <div class="cropper-res" id="cropperRes">
            <img style="width:100px;height:100px;">
          </div>
        </div>
      </div>
      <div class="cropper-btns-wrap">
        <el-progress 
          :text-inside="true" 
          :stroke-width="30" 
          :percentage="uploadProgress">
        </el-progress>
        <button 
          type="button" 
          class="cropper-btn" 
          @click="finishCropImage" 
          :disabled="btnTips.disable"
          :class="{'btn-bg': uploading}">
          {{ btnTips.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'

export default {
  name: 'cropper-box',
  props: {
    options: {
      default: {
        aspectRatio: 1 / 1,
        preview: '#cropperRes',
        zoomOnWheel: false,
        minCropBoxWidth: 50
      }
    },
    uploadProgress: {
      default: 0
    }
  },
  data () {
    return {
      cropper: null,
      imgHasLoad: false,
      cropperHasInit: false,
      uploading: false,
      rawFile: null
    }
  },
  watch: {
    imgHasLoad (val) {
      if (!val) {
        this.uploading = false
      }
    }
  },
  computed: {
    btnTips () {
      if (this.uploading) {
        return {
          value: '正在上传，请稍等',
          disable: true
        }
      }
      return {
        value: '裁剪完成，立即上传',
        disable: false
      }
    }
  },
  methods: {
    show () {
      this.imgHasLoad = true
    },
    close () {
      this.imgHasLoad = false
    },
    loadCropper (rawFile) {
      this.rawFile = rawFile
      const URL = window.URL || window.webkitURL
      const blobURL = URL.createObjectURL(rawFile)
      var image = this.$refs.uploadPreview
      if (!this.cropper) this.cropper = new Cropper(image, this.options)
      this.cropper.reset().replace(blobURL)
    },
    finishCropImage () { // 完成裁剪，并输出裁剪结果，然后传到七牛
      this.uploading = true
      
      const croppedCanvas = this.cropper.getCroppedCanvas()
      const croppedDataUrl = croppedCanvas.toDataURL(this.rawFile.type)
      const blob = this.dataURLtoBlob(croppedDataUrl)
      blob.uid = this.rawFile.uid
      this.$emit('finishCropImage', blob)
    },
    // dataUrl 转 blob
    dataURLtoBlob (dataurl) {
      /* eslint-disable */
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
      /* eslint-enable */
    }
  }
}
</script>

<style lang="less">
.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}
.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}
.cropper-canvas,.cropper-wrap-box{overflow:hidden}
.cropper-drag-box{background-color:#fff;opacity:0}
.cropper-modal{background-color:#000;opacity:.5}
.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);overflow:hidden;width:100%}
.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}
.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}
.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}
.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}
.cropper-center:after,.cropper-center:before{background-color:#eee;content:" ";display:block;position:absolute}
.cropper-center:before{height:1px;left:-3px;top:0;width:7px}
.cropper-center:after{height:7px;left:0;top:-3px;width:1px}
.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}
.cropper-face{background-color:#fff;left:0;top:0}
.cropper-line{background-color:#39f}
.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}
.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}
.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}
.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}
.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}
.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}
.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}
.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}
.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}
.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}
.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}
.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}
.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}
@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}
@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}
@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}
.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}
.cropper-invisible{opacity:0}
.cropper-bg{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");}
.cropper-hide{display:block;height:0;position:absolute;width:0}
.cropper-hidden{display:none!important}
.cropper-move{cursor:move}
.cropper-crop{cursor:crosshair}
.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}


.cropper-wrap .cropper-alert-mask{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2000;visibility:hidden;height:0;background-color:rgba(#000,.5);transition:all .3s ease}
.cropper-wrap .cropper-alert-mask.show{visibility:visible;height:100%}
.cropper-wrap .cropper-alert{position:fixed;top:50px;left:50%;z-index:2000;visibility:hidden;overflow:hidden;padding:10px;width:100%;height:100%;max-width:600px;max-height:530px;border-radius:5px;background-color:#fff;opacity:0;transition:all .3s ease;transform:translateX(-50%) scale(2)}
.cropper-wrap .cropper-alert.show{visibility:visible;opacity:1;transform:translateX(-50%) scale(1)}
.cropper-wrap .cropper-alert .cropper{position:relative;max-width:600px;max-height:460px;height:100%;padding:10px 120px 10px 10px;background-color:#f9fbfc}
.cropper-wrap .cropper-alert .cropper .layout-icon-wrap{position:absolute;cursor:pointer;right:0;top:0;font-size:20px}
.cropper-wrap .cropper-alert .cropper .cropper-box{position:relative;width:100%;height:100%;background-color:#fff}
.cropper-wrap .cropper-alert .cropper .cropper-res-wrap{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:0;width:100px;height:auto;padding:10px;background-color:#a5a5a5;-webkit-box-sizing:content-box;box-sizing:content-box}
.cropper-wrap .cropper-alert .cropper .cropper-res-wrap .cropper-res{width:100px;height:100px;overflow:hidden;background-color:#fff}
.cropper-wrap .cropper-alert .cropper-btns-wrap{position:relative;margin-top:20px}
.cropper-wrap .cropper-alert .cropper-btns-wrap .cropper-btn{position:absolute; left: 0; top: 0; width: 100%; height: 30px; line-height: 1; background: #fff; border: 1px solid #e1e1e1; border-radius: 15px; color: #646464; cursor: pointer;}
.cropper-wrap .cropper-alert .cropper-btns-wrap .btn-bg{background:#ff000000;}
</style>

