<template>
  <div class="wrapper" @viewappear="onViewapper" @viewdisappear="onViewdisappear">
    <navbar ref="navbar"
      :dataRole="dataRole"
      :height="height"
      :backgroundColor="backgroundColor"
      :titlename="titlename"
      :titlecode="titlecode"
      :titleColor="titleColor"
      :leftItemSrc="leftItemSrc"
      :leftItemTitle="leftItemTitle"
      :leftItemColor="leftItemColor"
      :rightItemSrc="rightItemSrc"
      :rightItemTitle="rightItemTitle"
      :rightItemColor="rightItemColor"
      :leftBItemSrc="leftBItemSrc"
      :leftBImageShow="leftBImageShow"
      :rightBItemSrc="rightBItemSrc"
      :rightBImageShow="rightBImageShow"
      @centerleftItemclick="centerleftItemclick"
      @centerrightItemclick="centerrightItemclick"
      @naviBarRightItemClick="naviBarRightItemClick"
      @naviBarLeftItemClick="naviBarLeftItemClick"
      ></navbar>
    <div class="wrapper" :style="{ marginTop: height }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    width: 750;
  }
</style>

<script>
  module.exports = {
    components: {
      navbar: require('./navbar.vue')
    },
    props: {
      dataRole: { default: 'navbar' },
      backgroundColor: { default: 'black' },
      height: { default: 88 },
      titlename: { default: "" },
      titlecode: { default: "" },
      titleColor: { default: 'black' },
      rightItemSrc: { default: '' },
      rightItemTitle: { default: '' },
      rightItemColor: { default: 'black' },
      leftItemSrc: { default: '' },
      leftItemTitle: { default: '' },
      leftItemColor: { default: 'black' },
      leftBItemSrc:{default:''},
      leftBImageShow:{default:true},
      //右侧切换股票图片
      rightBItemSrc:{default:''},
      rightBImageShow:{default:true},
    },
    methods: {
      naviBarRightItemClick: function (e) {
        this.$emit('naviBarRightItemClick', e)
      },
      naviBarLeftItemClick: function (e) {
        this.$emit('naviBarLeftItemClick', e)
      },
      centerleftItemclick:function(e){
        this.$emit('centerleftItemclick');
      },
      centerrightItemclick:function(e){
        this.$emit('centerrightItemclick');
      },
      onViewapper:function(){
        this.$emit('onviewapper');
      },
      onViewdisappear:function(){
        this.$emit('onviewdisappear');
      }
    }
  }
</script>
