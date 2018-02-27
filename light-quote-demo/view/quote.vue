<template>
	<!-- 行情tab -->
	<div @viewappear="onViewappear" @viewdisappear="onViewisdappear" style="background-color:#F9F4EA;" >
    <jstabbar ref="tabbar" class="headBar" :tabItems="chartTabItems" @tabBarOnClick="switchType" height="80" titleColor="#666666" selectedColor="#F9821E" :tabBarBackgroundColor="tabBarBackgroundColor"></jstabbar>
    <embed class="content" :style="{ visibility: foucusIndex == 0 ? 'visible':'hidden'}">
		  <cnquote ref= "cnquoteid" style="width:750px;height:1000px;" :isPageShow="isPageShow"></cnquote>
    </embed>
    <embed class="content" :style="{ visibility: foucusIndex == 1 ? 'visible':'hidden'}">
    	<hkquote ref= "hkquoteid" style="width:750px;height:1000px;" :isPageShow="isPageShow"></hkquote>
    </embed>
    <embed class="content" :style="{ visibility: foucusIndex == 2 ? 'visible':'hidden'}">
    	<futurequote ref= "futurequoteid" :isPageShow="isPageShow"></futurequote>
    </embed>
    <embed class="content" :style="{ visibility: foucusIndex == 3 ? 'visible':'hidden'}">
    	<otherquote ref= "otherquoteid"></otherquote>
    </embed>
	</div>

</template>
<style>
  .headBar{
    position: absolute;
    top: 0;
    left: 0;
  	width: 750;
  }
  .content {
    position: absolute;
    top: 81;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
  .item{
    flex:1;
    justify-content: center;
    align-items:center;
    border-width:1;
  }
  .row{
    flex-direction: row;
  }
  .itemText{
  	flex-direction: row;
  }
  .fallValueText{
  	font-size: 24;
  }
  .volumeratioText{
  	margin-left: 10;
  	font-size: 24;
  }
</style>

<script>
  var head = weex.requireModule('head');
  var event = weex.requireModule('event');
  var timeHandle = weex.requireModule('timer') || {};
  var getBaseURL = require('./include/base-url.js').getBaseURL;
  const storage = weex.requireModule('storage');
  module.exports = {
    data: function () {
      return {
        stockCode:'',
        codeType:'',
        stockName:'',
        chartTabItems: [],
        foucusIndex: 0,
        isPageShow:true,
        tabBarBackgroundColor:"#F9F4EA"
		    }
    },
    components: {
      jstabbar: require('./include/tabbar.vue'),
      usquote:require('./include/usquote.vue'),
      cnquote:require('./include/cnquote.vue'),
      futurequote:require('./include/futurequote.vue'),
      otherquote:require('./include/otherquote.vue'),
      hkquote:require('./include/hkquote.vue'),
    },
    methods:{
        switchType: function (e) {
          nativeLog("the clicked index is " + e.index);
          this.foucusIndex = e.index;
          this.refresh();
        },
        refresh:function(){
            if (this.isPageShow){
              var idx = this.foucusIndex;
              if (idx == 0){
                this.$refs.cnquoteid.refreshOnTime();
              }else if (idx == 1){
                this.$refs.hkquoteid.refreshOnTime();
              }else if (idx == 2){
                this.$refs.futurequoteid.refreshOnTime();
              }else if (idx == 3){
                 // this.$refs.otherquoteid.refreshOnTime();
              }
            }

        },
        onViewappear:function(){
          this.isPageShow = true;
          this.refresh();
        },
        onViewisdappear:function(){
          this.isPageShow = false;
        }
    },

    created:function(){
      var that = this;
	    that.chartTabItems = [
		    {index: 0, title: '沪深', titleColor: ''},
		    {index: 1, title: '港股', titleColor: ''},
		    {index: 2, title: '期货', titleColor: ''},
		    {index: 3, title: '全景', titleColor: ''}
      ];
      that.baseUrl = getBaseURL(this);
      head.setTitle({"title": "行情"});
      head.setRightItem({"icon":"search"},function(){
                    event.openURL(that.baseUrl + "app.native.js#/search");
                    //event.openNative("search?jsNativeUrl=" + that.baseUrl + "stockDetail.js");
                 });
      timeHandle.setInterval(function(){
              that.refresh();
      },10000);
    },
    mounted:function(){
      this.$refs.cnquoteid.refreshOnTime();
      this.$refs.hkquoteid.refreshOnTime();
      this.$refs.futurequoteid.refreshOnTime();
    },

  }
</script>
