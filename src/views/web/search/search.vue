<template>
  <div>
    <webHead></webHead>
    <webSearch></webSearch>
    <webSeeArticle></webSeeArticle>
    <webFoot></webFoot>
  </div>
</template>

<script>
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
      return {}
    },
    methods: {
      ...mapActions([
      ]),
    },
    created() {}
}
</script>

<style lang="less" scoped>
@import '~LESS/color.less';
</style>
