
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
        @lcImgClick="lcImgClick">
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
</style>
<script>
  import Title from 'lighting-ui/packages/_mods/title.vue';
  import Category from 'lighting-ui/packages/_mods/category.vue';
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
      lcImgClick (e) {
        console.log('clicked'+e.index)
      }
    }
  };
</script>
