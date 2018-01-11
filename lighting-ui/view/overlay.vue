<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="lc-overlay" class="title"></title>
      <category title="使用案例"></category>
      <div class="button-list">
        <lc-button text="点击打开动画蒙层" class="btn-margin"
                      type="normal"
                      @LcButtonClicked="openOverlay"></lc-button>
        <lc-button text="点击打开无动画蒙层" class="btn-margin"
                      type="normal"
                      @LcButtonClicked="openNoAniOverlay"></lc-button>
      </div>
      
      <lc-overlay :show="show"
                   duration="300"
                   :hasAnimation="hasAnimation"
                   :timingFunction="timingFunction"
                   @LcOverlayBodyClicked="LcOverlayBodyClicked"
                   opacity="0.6"></lc-overlay>
    </scroller>
  </div>
</template>

<style scoped>
  .button-list {
    padding-left: 24px;
  }
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .scroller {
    flex: 1;
  }

  .title {
    align-self: flex-start;
  }

  .btn-margin {
    margin-top: 40px;
  }

</style>

<script>
  import Light from 'light';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import LcButton from 'lighting-ui/packages/lc-button';
  import LcOverlay from 'lighting-ui/packages/lc-overlay';

  export default {
    components: { Title, Category, LcOverlay,LcButton },
    data: () => ({
      show: false,
      hasAnimation: true,
      timingFunction: ['ease-in', 'ease-out']
    }),
    methods: {
      openOverlay () {
        this.hasAnimation = true;
        this.show = true;
      },
      openNoAniOverlay () {
        this.hasAnimation = false;
        this.show = true;
      },
      LcOverlayBodyClicked (e) {
        const modal = Light.requireModule('modal');  
        modal.toast({
          'message': 'click overlay!',
          'duration': 1
        });
        this.show = false;
      }
    }
  };
</script>
