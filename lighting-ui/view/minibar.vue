<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="lc-minibar"></title>
      <category title="使用案例"></category>
      <div>
        <div class="demo">
          <lc-minibar title="Minibar" background-color="#F2F3F4"></lc-minibar>
        </div>

        <div class="demo">
          <lc-minibar @LcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       background-color="#F2F3F4"
                       @LcMinibarRightButtonClicked="minibarRightButtonClick"></lc-minibar>
        </div>

        <div class="demo">
          <lc-minibar title="导航栏标题"
                       right-text="更多"
                       @LcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @LcMinibarRightButtonClicked="minibarRightButtonClick"></lc-minibar>
        </div>
        <div class="demo">
          <lc-minibar title="右侧带文字的导航栏"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :left-button="leftButton"
                       @LcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @LcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="更多"></lc-minibar>
        </div>
        <div class="demo">
          <lc-minibar title="右侧带icon的导航栏"
                       @LcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @LcMinibarRightButtonClicked="minibarRightButtonClick"
                       :right-button="rightButton"></lc-minibar>
        </div>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
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

  .demo {
    width: 750px;
    height: 180px;
    align-items: flex-start;
    padding-top: 60px;
  }
</style>

<script>
  import Light from 'light';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import LcMinibar from 'lighting-ui/packages/lc-minibar';

  const modal = Light.requireModule('modal');
  import { CART_ICON, RETURN_ICON } from 'minibar.js';

  export default {
    components: { Title, Category, LcMinibar },
    data: () => ({
      rightButton: CART_ICON,
      leftButton: RETURN_ICON
    }),
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
      }
    }
  };
</script>
