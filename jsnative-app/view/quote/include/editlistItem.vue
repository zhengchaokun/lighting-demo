
<template>
  <div class="repItem">

    <div class="checkItem">
      <image :src="checkImageUrl" style="width:44px;height:44px;margin-left:20px;" @click="onCheckItem"></image>
    </div>
    <div class="nameItem">
       <text>{{stockName}}</text>
       <text style="font-size: 24px;color:#B8B8B8;margin-top:5;top:5">{{stockCode}}</text>
    </div>

    <div class="topItem">
      <image :src="topImageUrl" style="width:44px;height:44px;" @click="onTopItem"></image>
    </div>
    <div class="dragItem">
      <image :src="dargImageUrl" style="width:44px;height:44px;"></image>
    </div>
  </div>
</template>

<style>
  .repItem {
    padding-top: 20px;
    padding-bottom: 20px;
    flex-direction:row;
    align-items: center;
    width: 750px;
  } 
  .checkItem{
    flex:13;
    flex-direction: row;
    justify-content:flex-start;
  }
  .nameItem{
    flex:45;
    text-align: left;
  } 
  .topItem{
    flex:18;
    flex-direction: row;
    justify-content:center;
  }
  .dragItem{
    flex:24;
    flex-direction: row;
    justify-content:center;
  }
</style>

<script>
  module.exports = {
    props: {
      checkImageUrl:{ default:'https://www.lightyy.com/apps/weex-test/image/checkbox_normal.png' },
      checkImageOldUrl:{ default:'https://www.lightyy.com/apps/weex-test/image/checkbox_normal.png' },
      checkImageHoverUrl:{ default:'https://www.lightyy.com/apps/weex-test/image/checkbox_selected.png' },
      topImageUrl:{ default:'https://www.lightyy.com/apps/weex-test/image/ontop.png' },
      dargImageUrl:{ default:'https://www.lightyy.com/apps/weex-test/image/drag.png' },
      selectedStatus: {default:false},
      stockName:'',
      stockCode:'',
      hqtypecode:'',
    },
    methods: {
      onCheckItem:function(e){
        if(this.checkImageUrl!=this.checkImageHoverUrl){
           this.checkImageUrl=this.checkImageHoverUrl;
           this.selectedStatus= true;
        }
        else{
          this.checkImageUrl =this.checkImageOldUrl;
          this.selectedStatus=false;
        }
        var params={
          selectedStatus:this.selectedStatus,
          item:{
            stockCode:this.stockCode,
            stockName:this.stockName,
            hq_type_code:this.hqtypecode
          }
        }
        //向父组件发送checkbox通知
        this.$parent.$emit('pressCheckBox', params);
      },
      onTopItem:function(e){
        var params={
          selectedStatus:this.selectedStatus,
          item:{
            stockCode:this.stockCode,
            stockName:this.stockName,
            hq_type_code:this.hqtypecode
          }
        }
         //向父组件发送onTop通知
        this.$parent.$emit('pressOnTop', params);
      }
    },
    created: function() {
        var self = this
        this.$on('changeCellSelectedStatus', function(e) {
          console.log("接受到父组件通知事件"+JSON.stringify(e));
          if(e){
            if(self.checkImageUrl!=self.checkImageHoverUrl){
               self.checkImageUrl=this.checkImageHoverUrl;
               self.selectedStatus=true;
            }
          }else{
              self.checkImageUrl =this.checkImageOldUrl;
              self.selectedStatus=false;
          }
        });
    }
  }
</script>
