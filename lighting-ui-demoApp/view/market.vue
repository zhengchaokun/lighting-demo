
<template>
    <div>
        <lc-tab-page 
          ref="lc-tab-page"
          :tab-titles="tabTitles"
          :tab-styles="tabStyles"
          title-type="icon"
          :needSlider="needSlider"
          :is-tab-view="isTabView"
          :tab-page-height="tabPageHeight"
          @LcTabPageCurrentTabSelected="LcTabPageCurrentTabSelected">
          <list v-for="(item,index) in tabList"
            :key="index">
          </list>
        </lc-tab-page>
    </div>
</template>
<script>
    import Config from 'config/market.js';
    import LcTabPage from 'lighting-ui/packages/lc-tab-page';

    export default {
        components: { LcTabPage },
        data(){
            return {
                tabTitles: Config.tabTitles,
                tabStyles: Config.tabStyles,
                tabList: [],
                needSlider: true,
                supportSlide: true,
                isTabView: true,
                tabPageHeight: 380
            }
        },
        methods:{
            LcTabPageCurrentTabSelected (e) {
                const self = this;
            }
        }
    }
</script>
<style lang="less">

</style>
