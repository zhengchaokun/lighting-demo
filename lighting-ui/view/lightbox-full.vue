<template>
  <div class="lc-demo">
    <scroller class="scroller">
      <title title="lc-lightbox-full"></title>
      <category title="使用案例"></category>
      <div class="wrapper">
        <image class="demo-image"
               src="https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg"
               @click="openLightBox"
               aria-label="点击按钮弹出全屏图片,这类情况不建议朗读给盲人"></image>
        <text class="image-text" :aria-hidden="true">点击图片弹出全屏图片</text>
        <div class="btn"
             @click="openLightBox"
             :accessible="true"
             aria-label="点击按钮弹出全屏图片,这类情况不建议朗读给盲人">
          <text class="btn-txt">点击按钮弹出全屏图片</text>
        </div>
      </div>
      <lc-lightbox-full
        ref="lc-lightbox"
        height="800"
        :image-list="imageList"
        @LcLightboxOverlayClicked="lightboxOverlayClick"
        :show="show">
      </lc-lightbox-full>
    </scroller>
  </div>
</template>

<style scoped>
  .lc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }
  .wrapper {
    align-items: center;
  }
  .scroller {
    flex: 1;
    align-items: center;
  }
  .demo-image {
    width: 300px;
    height: 300px;
    margin-top: 100px;
  }
  .btn {
    width: 560px;
    height: 70px;
    margin-top: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #9B7B56;
    border-color: #9B7B56;
  }
  .image-text {
    font-size: 26px;
    color: #9B7B56;
    margin-top: 10px;
  }
  .btn-txt {
    color: #ffffff;
    font-size: 28px;
  }
</style>
<script>
  import Title from 'lighting-ui/packages/_mods/title.vue';
  import Category from 'lighting-ui/packages/_mods/category.vue';
  import LcLightboxFull from 'lighting-ui/packages/lc-lightbox-full';
  export default {
    components: { Title, Category, LcLightboxFull },
    data: function () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg' }
        ],
        show: false
      };
    },
    methods: {
      openLightBox () {
        this.show = true;
      },
      lightboxOverlayClick () {
        this.show = false;
      }
    }
  };
</script>