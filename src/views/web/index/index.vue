<template>
  <div>
    <webHead></webHead>
    <webSearch @getKeyword="getKeyword"></webSearch>
    <webSeeArticle v-bind:keyword="keywordIndex"></webSeeArticle>
    <webFoot></webFoot>
  </div>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from 'UTIL/publicAPI'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import webHead from 'COMMON/webHead/webHead'
import webSearch from 'COMMON/webSearch/webSearch'
import webFoot from 'COMMON/webFoot/webFoot'
import webSeeArticle from 'COMMON/webSeeArticle/webSeeArticle'
export default {
    inject: ['reload'],
    name: 'backstage',
    components: {
      webHead,
      webSearch,
      webSeeArticle,
      webFoot
    },
    data() {
      return {
        keywordIndex:''
      }
    },
    methods: {
      ...mapActions([
        'setUserBrowseArticle'
      ]),
      getKeyword(payload){
        console.log(3)
        this.keywordIndex = payload
      }
    },
    created() {
      this.setUserBrowseArticle({uId: this.$store.state.admin.adminInfo.uId})
        .then(function (response) {
          if(response.code === 200) {
            console.log(response.msg)
          }
        })
        .catch(function (error) {})
    }
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
