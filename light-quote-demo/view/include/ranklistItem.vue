
<template>
  <div class="repItem" @click="onClickItem">

    <div class="leftItem">
       <marketicon :icon="marketicon" style="height:25; margin-right:4;"></marketicon>
       <div style="flex-direction: column;">
          <text style="font-size: 32px;color:#333333;text-overflow:ellipsis;lines:1;" :value="stockName" ></text>
         <div style="flex-direction:row; margin-top:5">
            <text style="font-size: 20;color:#999999;" :value="stockCode" ></text>
            <busiFlagIcon :iconItems="busiFlag"></busiFlagIcon>
          </div>
        </div>
    </div>

    <div class="middleItem">
      <text style="font-weight:600;text-align:right; font-size:36;">{{stockPrice}}</text>
    </div>

    <div class="rightItem">
      <text class="rightItemText" :style="{color:rateColor}">{{stockRate}}</text>
    </div>
  </div>
</template>

<style>
  .repItem {
    justify-content:flex-start;
    padding-top: 15;
    padding-bottom: 10;
    padding-left: 0;
    overflow: visible;
    flex-direction:row;
    align-items: center;
    width: 750px;
  }
   .leftItem {
    flex-direction: row;
    flex :20;
  }

  .middleItem{
    flex:8;
  }

  .rightItem{
    flex:12;
    align-items: right;
    margin-right: 20px;
  }

    .rightItemText{
    text-align: right;
    font-size: 36;
    font-weight:600;
  }

</style>

<script>
  module.exports = {
    props: {
      stockName:'',
      stockCode:'',
      stockPrice:'',
      stockRate:'',
      rateColor:'#FF4500',
      marketicon: "",
      busiFlag:[]
    },
    components: {
        marketicon: require('./marketicon.vue'),
        busiFlagIcon: require('./busiFlagIcon.vue'),
    },
    methods: {
      onClickItem:function(e){
        //执行跳转逻辑
        this.$emit("onClickItem");
      }
    }
  }
</script>
