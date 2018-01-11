<template>
  <div class="wxc-demo">
    <scroller>
      <title title="lc-info-list"></title>
      <category title="图文结合"></category>
      
      <lc-info-list 
        type="imgleft"
        :textTitle="textTitle"
        :textInfo="textInfo"
        :src="src"
      ></lc-info-list>

      <lc-info-list 
        type="imgright"
        :textTitle="textTitle"
        :textInfo="textInfo"
        :src="src"
      ></lc-info-list>

      <category title="纯文本"></category>
      <lc-info-list 
        type="text"
        :textTitle="textTitle"
        :textTime="textTime"
      ></lc-info-list>

      <lc-info-list 
        type="text"
        :line="2"
        :textTitle="textTitle1"
        :textTime="textTime"
      ></lc-info-list>
    </scroller>
  </div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import LcInfoList from 'lighting-ui/packages/lc-info-list';

  export default {
    data(){
      return {
        textTitle:'金点子提醒：京东开始全面升级到电子发票，让电子发票引领未来',
        textTitle1:'金点子提醒：京东开始全面升级到电子发票，让电子发票引领未来金点子提醒：京东开始全面升级到电子发票，让电子发票引领未来',
        textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
        src:'https://img.alicdn.com/tfs/TB1jkA5g9_I8KJjy0FoXXaFnVXa-320-320.png',
        textTime:'2017-12-18 15:01:23'
      }
    },
    components: { Title, Category, LcInfoList},
    methods:{
    
    }
  }
</script>

<style scoped>
  
</style>
