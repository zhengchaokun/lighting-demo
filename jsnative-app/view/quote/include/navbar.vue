<template>
  <div
    :dataRole="dataRole"
    class="container"
    :style="{ height: height, backgroundColor: backgroundColor }">
    <text
      v-if="!leftItemSrc"
      :style="{ color: leftItemColor }"
      class="left-text"
      v-on:click="onclickleftitem">{{leftItemTitle}}</text>
    <image
      v-if="leftItemSrc"
      :src="leftItemSrc"
      class="left-image"
      v-on:click="onclickleftitem"></image>
    <div style="width:120;height: 80;justify-content: center;align-items:center; margin-left:80;" @click="onclickcenterleftitem">
      <image
        v-if="leftBImageShow"
        :src="leftBItemSrc"
        class="left2-image"
      ></image>
    </div>

    <div>
      <text
        :style="{ color: titleColor,fontSize:titlenameSize}"
        class="center-text">{{titlename}}</text>
      <text
        :style="{ color: titleColor }"
        class="center-text">{{titlecode}}</text>
    </div>
    <div style="width:120;height: 80;justify-content: center;align-items:center; margin-right:80;" @click="onclickcenterrightitem" >
      <image
        v-if="rightBImageShow"
        :src="rightBItemSrc"
        class="right2-image"
      ></image>
    </div>

    <text
      v-if="!rightItemSrc"
      :style="{ color: rightItemColor }"
      class="right-text"
      v-on:click="onclickrightitem">{{rightItemTitle}}</text>
    <image
      v-if="rightItemSrc"
      :src="rightItemSrc"
      class="right-image"
      v-on:click="onclickrightitem"></image>

  </div>
</template>

<style scoped>
  .container {
    flex-direction: row; 
    justify-content: space-between;
    align-items:center;
    top: 0; 
    left: 0; 
    right: 0; 
    width: 750;
  }
  .right-text {
    margin-right: 5; 
    text-align: right;
    font-size: 32; 
    font-family: 'Open Sans', sans-serif;
  }
  .left-text {
    margin-left :5; 
    text-align :left;  
    font-size: 32; 
    font-family: 'Open Sans', sans-serif;
  }
  .center-text {
    lines:1;
    text-overflow: ellipsis;
    width: 200;
    font-size: 26;
    text-align: center; 
    font-weight: bold;
  }
  .left-image {
    margin-left: 5; 
    width: 72; 
    height: 70;
  }
  .right-image {
    margin-right: 5; 
    width: 72; 
    height: 70;
  }
  .left2-image{
    margin-left: 60;
    width: 20; 
    height: 30;
  }
  .right2-image{
    margin-right: 60;
    width: 20; 
    height: 30;
  }
</style>

<script>
  module.exports = {
    props: {
      dataRole: { default: 'navbar' },
      //导航条背景色
      backgroundColor: { default: 'black' },
      //导航条高度
      height: { default: 88 },
      //导航条标题 
      titlename: { default: '' },
      titlecode: { default: '' },
      //导航条标题颜色
      titleColor: { default: 'black' },
      //右侧按钮图片
      rightItemSrc: { default: '' },
      //右侧按钮标题
      rightItemTitle: { default: '' },
      //右侧按钮标题颜色
      rightItemColor: { default: 'black' },
      //左侧按钮图片
      leftItemSrc: { default: '' },
      //左侧按钮标题
      leftItemTitle: { default: '' },
      //左侧按钮颜色
      leftItemColor: { default: 'black' },
      //左侧切换股票图片
      leftBItemSrc:{default:''},
      leftBImageShow:{default:false},
      //右侧切换股票图片
      rightBItemSrc:{default:''},
      rightBImageShow:{default:false},
      titlenameSize:{default:30},
    },
    data:function(){
      return{
      }
    },
    methods: {
      onclickrightitem: function (e) {
        this.$emit('naviBarRightItemClick');
      },
      onclickleftitem: function (e) {
        this.$emit('naviBarLeftItemClick');
      },
      onclickcenterleftitem:function(e){
        this.$emit('centerleftItemclick');
      },
      onclickcenterrightitem:function(e){
        this.$emit('centerrightItemclick');
      }
    }
  }
</script>
