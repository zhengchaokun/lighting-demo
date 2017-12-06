<template>
  <div>
    <div
      v-if="fixed"
      :style="{ backgroundColor: backgroundColor, width: itemWidth, height: itemHeight }"
      class="container"
      @click="onclickitem">
      <text
          :style="{ height: itemHeight, color: titleColor, fontSize: fontSize, borderBottomWidth: 4, borderBottomColor: indicatorColor, paddingTop: (itemHeight - fontSize) / 2 - 4 }"
          class="tab-text">{{title}}</text>
        <image v-if="icon" :src="iconurl" style="width:16;height:8;" :style="{marginTop: (itemHeight) / 2 - 4, marginBottom:itemHeight/2 - 4}"></image>
    </div>
    <div
      v-if="!fixed"
      :style="{ backgroundColor: backgroundColor, height: itemHeight }"
      class="container"
      @click="onclickitem">
      <text
        :style="{ height: itemHeight, color: titleColor, fontSize: fontSize, borderBottomWidth: 4, borderBottomColor: indicatorColor, paddingTop: (itemHeight - fontSize) / 2 - 4 }"
        class="tab-text">{{title}}</text>
      <image v-if="icon" :src="iconurl" style="width:16;height:8;" :style="{marginTop: (itemHeight) / 2 - 4, marginBottom:itemHeight/2 - 4}"></image>  
    </div>
  </div>
</template>

<style>
  .container {
    /*flex: 1; */
    flex-direction: row; 
    align-items:center; 
    justify-content:center; 
    margin-left: 10;
    margin-right: 10;
  }
  .tab-text {
    text-align: center;  
    padding-left: 16;
    padding-right: 16;
  }
</style>

<script>
  module.exports = {
    props: {
      fixed: { default: true },
      index: { default: 0 },
      title: { default: '' },
      titleColor: { default: '#000' },
      fontSize: { default: 28 },
      backgroundColor: { default: '#fff' },
      itemWidth: { default: 0 },
      itemHeight: { default:60 },
      indicatorColor: { default: '#fff' },
      icon:{ default: false },
      iconurl:{ default: '' }
    },
    methods: {
      onclickitem: function (e) {
        var params = {
          index: this.index,
          title: this.title
        };
        this.$emit('tabItemOnClick', params);
      }
    },
  }
</script>
