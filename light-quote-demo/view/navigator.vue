<template>
  <navpage
    ref="navpage"
    dataRole="none"
    :height="navBarHeight"
    :titlename="titlename"
    :titlecode="titlecode"
    backgroundColor="#F9821E"
    titleColor="white"
    :leftItemSrc="baseURL + 'image/back.png'"
    :rightItemSrc="rightItemSrc"
    :leftBItemSrc="leftBItemSrc"
    :leftBImageShow="leftBImageShow"
    :rightBItemSrc="rightBItemSrc"
    :rightBImageShow="rightBImageShow"
    @centerleftItemclick="centerclick(1)"
    @centerrightItemclick="centerclick(2)"
    @naviBarLeftItemClick="naviBarLeftItemClick"
    @naviBarRightItemClick="naviBarRightItemClick"
    @onviewapper="onViewappear"
    @onviewdisappear="onViewdisappear">
    <stockdetail ref="stockdetail" @setTitle="onSetTitle" @rightIconEvt="onRightIconEvt" :navBarHeight="navBarHeight">
    </stockdetail>
  </navpage>
</template>

<script>
  var head = weex.requireModule('head');
  var getBaseURL = require('./include/base-url.js').getBaseURL;
  var getAbbreviation = require('./include/common-api.js').common.getAbbreviation;
  module.exports = {
    data: function () {
      return {
        navBarHeight: 88,
        titlename: 'Navigator',
        titlecode:'',
        dir: 'examples',
        baseURL: '',
        subPath: weex.config.env.platform === 'Web' ? 'vue-web/' : '',
        stocktitle:'',
        leftBImageShow:false,
        rightBImageShow:false,
        leftBItemSrc:"",
        rightBItemSrc:"",
        rightItemSrc:'',
      }
    },
    components: {
      navpage: require('./include/navpage.vue'),
      stockdetail: require('./stockDetail.vue')
    },
    created: function() {
      //head.setHeadHidden({hidden:false});
      /*this.$getConfig(function (config) {
        var env = config.env;
        if(env.platform == 'iOS'){
          var scale = env.scale;
          var deviceWidth = env.deviceWidth / scale;
          this.navBarHeight = 64.0 * 750.0 / deviceWidth;
        }
      }.bind(this));*/
      this.baseURL = getBaseURL(this);
      var config =this.$getConfig();
      var inputParam = config.inputParam;
      if (inputParam){
          if (inputParam.stockCode){
              this.stockCode = inputParam.stockCode;
          }
          if (inputParam.codeType){
              this.codeType = inputParam.codeType;
          }
          if (inputParam.stockName){
              this.stockName = inputParam.stockName;
          }
      }
      var ss = getAbbreviation(this.codeType);
      this.titlename = this.stockName;
      this.titlecode = this.stockCode + (ss.length>0?("." + ss):'');
      this.leftBItemSrc = this.baseURL + "image/arrow_left.png";
      this.rightBItemSrc = this.baseURL + "image/arrow_right.png";
    },
    mounted:function(){
      var config =this.$getConfig();
      var inputParam = config.inputParam;
       if(inputParam.hideCutoverImage!=undefined){
          if(inputParam.hideCutoverImage){
             this.showCutoverImage();
          }
      }
    },
    methods: {
      naviBarLeftItemClick: function (e) {
        //modal.toast({ message: 'naviBarLeftItemClick', duration: 2 });
        head.back();
      },
      naviBarRightItemClick: function (e) {
        //modal.toast({ message: 'naviBarRightItemClick', duration: 2 })
        if (this.rightItemSrc == this.baseURL + 'image/addIcon.png'){
          this.$refs.stockdetail.myStockChange('add');
          this.rightItemSrc = this.baseURL + 'image/deleteIcon.png';
        }else{
          this.$refs.stockdetail.myStockChange('delete');
          this.rightItemSrc = this.baseURL + 'image/addIcon.png';
        }
      },
      centerclick:function(e){
        if(this.leftBImageShow && this.rightBImageShow){
          this.$refs.stockdetail.$emit('cutover', e);
          var stock = this.$refs.stockdetail.stocktitle.split('&');
          this.titlename = stock[0];
          this.titlecode = stock[1];
        }
      },
      showCutoverImage:function(){
        this.leftBImageShow = false;
        this.rightBImageShow = false;
        //this.$refs.navpage.$refs.navbar.leftCImageShow=true;
        //this.$refs.navpage.$refs.navbar.rightCImageShow=true;
      },
      onSetTitle:function(e){
        if (e){
          this.title = e.title;
        }
      },
      onRightIconEvt:function(e){
        if ("add" == e){
          this.rightItemSrc =  this.baseURL + 'image/addIcon.png';
        }else{
          this.rightItemSrc =  this.baseURL + 'image/deleteIcon.png';
        }
      },
      onViewappear:function(){
        this.$refs.stockdetail.onViewappear();
      },
      onViewdisappear:function(){
        this.$refs.stockdetail.onViewdisappear();
      }
    }
  }
</script>
