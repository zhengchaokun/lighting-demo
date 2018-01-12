
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="lc-lightbox" class="title"></title>
      <category title="使用案例"></category>
      
      <lc-lightbox
        autoPlay="true"
        ref="lc-lightbox"
        height="800"
        interval="5000"
        showIndicator="true"
        :image-list="imageList"
        @lcImgClick="lcImgClick(e)">
      </lc-lightbox>
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

  .wrapper {
    align-items: center;
  }

  .scroller {
    flex: 1;
    align-items: center;
  }

  .title {
    align-self: flex-start;
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
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import LcLightbox from 'lighting-ui/packages/lc-lightbox';

  export default {
    components: { Title, Category, LcLightbox },
    data: function () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg' }
        ]
      };
    },
    methods: {
      lcImgClick () {
        console.log('clicked')
      }
    }
  };
</script>
