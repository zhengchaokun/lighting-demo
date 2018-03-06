<template>
    <div style="flex:1">
    <list style="flex-direction:column;background-color:#F9F4EA;" focustype="block" @viewappear="onViewappear" @viewdisappear="onViewdisappear" :scrollDisabled="isScrollDisabled">
        <!--快照  -->
		    <refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh">
          <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext" ></text>
        </refresh>
        <cell>
        <!--精简价格div 因为这个组件使用绝对地址布局，在下拉刷新时会出现白屏覆盖掉它上面的组件，所以放在最上方 -->
        <div class="simplePrice" :style="{top:navBarHeight}" v-if="simplePriceShow">
            <text class="simplePriceText" :style="{color:preLastColor}" :value="preLast">
            </text>
            <text class="simplePriceText" :style="{color:preLastColor}" :value="preDiff" ></text>
            <text class="simplePriceText" :style="{color:preLastColor}" :value="preDiff2" ></text>
        </div>
		<div class="realtime">
          <!-- 左边-->
          <div style="flex:45">
            <div style="flex:15;flex-direction:row;" @disappear="realtimeDisAppear" @appear="realTimeAppear">
            <text class="prelastStyle" :style="{color:preLastColor,fontSize:preLastFont}" :value="preLast"></text>
            </div>
            <div style="flex:10;flex-direction: row;">
              <text class="preDiffStyle" :style="{color:preLastColor}" :value="preDiff" ></text>
              <text class="preDiffStyle2" :style="{color:preLastColor}" :value="preDiff2" ></text>
            </div>
          </div>
          <!-- 右边-->
          <div style="flex:55">
            <!-- 第一排-->
            <div>
              <div class="realtimeRight">
                <text style="color:#9C9C9C;font-size: 30;margin-top:20;text-align: left;flex:1;" :value="realTimeRightText11"></text>
                <text style="color:#9C9C9C;font-size: 30;margin-top:20;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText12"></text>
                <text style="color:#9C9C9C;font-size: 30;margin-top:20;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText13"></text>
              </div>
              <div class="realtimeRight">
                <text style="color:#000000;font-size: 24; text-align: left;flex:1;" :value="realTimeRightText21"></text>
                <text style="color:#000000;font-size: 24;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText22"></text>
                <text style="color:#000000;font-size: 24;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText23"></text>
              </div>
            </div>
            <!-- 第二排-->
            <div>
              <div class="realtimeRight">
                <text style="color:#9C9C9C;font-size: 30;margin-top:20;text-align: left;flex:1;" :value="realTimeRightText31"></text>
                <text style="color:#9C9C9C;font-size: 30;margin-top:20;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText32"></text>
                <text style="color:#9C9C9C;font-size: 30;margin-top:20;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText33"></text>
              </div>
              <div class="realtimeRight">
                <text style="color:#000000;font-size: 24;text-align: left;flex:1;" :value="realTimeRightText41"></text>
                <text style="color:#000000;font-size: 24;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText42"></text>
                <text style="color:#000000;font-size: 24;text-align: left;flex:1;margin-left:10;" :value="realTimeRightText43"></text>
              </div>
            </div>
          </div>
        </div>
        <!-- 快照下方隐藏栏 -->
        <div style="height: 50;padding-top:24; justify-content: center;align-items: center;justify-content:center;border-bottom-width: 0.5;border-bottom-color:#B5B5B5;" v-if="isShowIcon" @click="showRealTimeBottom()">
          <image style="height: 24;width:130; text-align:center;" :src="bottonSrc"></image>
        </div>
        <div style="flex-direction: column;border-bottom-width: 0.5;border-bottom-color:#B5B5B5;padding-top:6px;padding-bottom:16px;" v-if="isShowRealTimeBottom">
        <!--第一排-->
          <div style="flex-direction: row;justify-content: center;align-items: center;">
            <text class="realtimeBottomTextStyle" :value="bottomText11" ></text>
            <text class="realtimeBottomTextStyle" :value="bottomText12"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText13"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText14"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText15"></text>
          </div>
          <div style="flex-direction: row;justify-content: center;align-items: center;">
            <text class="realtimeBottomTextStyle2" :value="bottomText21"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText22"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText23"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText24"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText25"></text>
          </div>
          <!--第二排-->
          <div style="flex-direction: row;justify-content: center;align-items: center;" v-if="isShowSecond">
            <text class="realtimeBottomTextStyle" :value="bottomText31"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText32"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText33"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText34"></text>
            <text class="realtimeBottomTextStyle" :value="bottomText35"></text>
          </div>
          <div style="flex-direction: row;justify-content: center;align-items: center;" v-if="isShowSecond">
            <text class="realtimeBottomTextStyle2" :value="bottomText41"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText42"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText43"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText44"></text>
            <text class="realtimeBottomTextStyle2" :value="bottomText45"></text>
          </div>
          <!-- 第三排-->
          <div style="flex-direction: row;justify-content: left;align-items: center;" v-if="isShowThird">
            <text class="realtimeBottomTextStyle">每手</text>
          </div>
          <div style="flex-direction: row;justify-content: left;align-items: center;" v-if="isShowThird" >
            <text class="realtimeBottomTextStyle2" :value="bottomText51"></text>
          </div>
        </div>
        <!-- 针对美股盘后 -->
        <div style="height: 50;align-items:center;justify-content:center;" v-if="isShowUSText">
          <text style="font-size: 24px;text-align: center;" :style="{color:usPopcTextColor}" :value="USbottomText"></text>
        </div>
        <div style="height:20;background-color:#F9F4EA"></div>


        <div style="height:61" :class="[foucusMarginStyle(isFocusMargin)]">

          <!-- 分时，5日等导航栏 -->
          <jstabbar ref="jstabbar" style="position:absolute;left:0;top:0;background-color:#F9F4EA;" :tabItems="chartTabItems" :indexOfExtra="5" :iconurl="isShowExtra?(baseUrl+'image/tabbar_up.png'):(baseUrl+'image/tabbar_down.png')" @tabBarOnClick="switchType" titleColor="#666"  :style="{ visibility: !isShowFocusInfo ? 'visible':'hidden',height:!isShowFocusInfo ?61:0} "></jstabbar>
          <focusinfo v-if="isShowFocusInfo" :hsparams='hsParamsData' style="height:60;top:0;left:0;" ></focusinfo>
        </div>
        <div class="contentDiv" >
          <div class="trendDiv">
            <chartview :stockcode='stockCode' :codetype='codeType' :chartType='chartType'  :snapshotdata='snapshotdata' :trenddata='trenddata' :klinedata='klinedata' :netvaluedata='netvaluedata' :klinemode="kLineMode" :techtype="tecType" @click="goLandscape" @showline="showLine" @hideline="hideLine" :class="[trendExpand(BidTickDivAttr)]">
                </chartview>
                <div v-if="isBidTickDivShow" :style="{flex: 2,visibility:BidTickDivAttr}">
                    <div class="tabbidtrade">
                        <text :style="{ color: bidcolor}" @click="switchBidAndTrade(0)" class="detailtext" >五档</text>
                        <text :style="{ color: tradecolor}" @click="switchBidAndTrade(1)" class="detailtext2">明细</text>
                    </div>
                    <div style="position:absolute; flex: 12;left:0;top:70;right:10;bottom:0;" :style="{ visibility: isShowBidofferList ? 'visible':'hidden'}">
                      <div style="flex:1;" v-for="item in bidofferList">
                        <div style="flex-direction: row;margin-top:10;" >
                          <text class="bidOffer" :value="item.title"></text>
                          <text class="bidOffer2" :value="item.price" :style="{color: item.color}" ></text>
                          <text class="trade" :value="item.volume" ></text>
                        </div>
                        <div style="backgroundColor:#C9C9C9;height:1;margin-top:10;" v-if="item.title == '卖1' "></div>
                      </div>
                    </div>
                    <div style="position:absolute;flex: 12;left:0;top:70;right:10;bottom:0;" :style="{ visibility: isShowKTick ? 'visible':'hidden'}">
                      <list enableScrollInScrollView=true>
                        <cell v-for='item in tradedataList' :class="[getIosTickCellClass()]">
                          <div style="flex-direction: row;height: 30;">
                            <text class="bidOffer3" :value="item.time"  ></text>
                            <text class="bidOffer2" :value="item.price" :style="{color:item.colorp}" ></text>
                            <text class="trade" :value="item.volume" :style="{color:item.colorv}" ></text>
                          </div>
                        </cell>
                      </list>
                    </div>
                </div>
            </div>

            <popoverview style="position: absolute; top: 0;right: 10;" v-if="isShowExtra" @extraTabOnClick="switchMinute"></popoverview>
        </div>
        <div style="height:20;background-color:#F9F4EA"></div>
        <div class="tabview" v-if="isTabviewShow" >
            <div class="scroller">
              <div style="flex:1;align-items:center;" @click="loadurl('news')" v-if="isNewsShow">
                <text ref="news" class="text" :style="{ color: newscolor, borderBottomColor:neborder}" >新闻</text>
              </div>
              <div style="flex:1;align-items:center;" @click="loadurl('fund')" v-if="isFundShow">
                <text ref="fund" class="text" :style="{color:fundcolor, borderBottomColor:fuborder}" :value='fundtext' ></text>
              </div>
              <div style="flex:1;align-items:center;" @click="loadurl('notice')" v-if="isNoticeShow">
                <text ref="notice" class="text" :style="{color:noticecolor, borderBottomColor:noborder}">公告</text>
              </div>
              <div style="flex:1;align-items:center;" @click="loadurl('study_report')" v-if="isStudyShow">
                <text ref="study_report" class="text" :style="{color:study_reportcolor, borderBottomColor:sborder}"  >研报</text>
              </div>
              <div style="flex:1;align-items:center;" @click="loadurl('f10')" v-if="isF10Show">
                <text ref="f10" class="text" :style="{color:f10color, borderBottomColor:f10border}" :value='f10text' ></text>
              </div>
              <div style="flex:1;align-items:center;" @click="loadurl('information')" v-if="isInformationShow">
                <text ref="information" class="text" :style="{color:informationcolor, borderBottomColor:inborder}">合约资料</text>
              </div>
            </div>
            <div style="background-color:#ddd; width:750; height:1; margin-bottom:30;"></div>
        </div>
        <web ref="newsWeb" :openinnewpage=true :style="{height:newebheight}" :src="newsSrc" class="webview" @pagestart="start" @pagefinish="finish" @error="error" @changeheight="changeHeight1"></web>
        <web ref="fundWeb" :openinnewpage=true :style="{height:fuwebheight}" :src="fundSrc" class="webview" @pagestart="start" @pagefinish="finish" @error="error" @changeheight="changeHeight2"></web>
        <web ref="noticeWeb" :openinnewpage=true :style="{height:nowebheight}" :src="noticeSrc" class="webview" @pagestart="start" @pagefinish="finish" @error="error" @changeheight="changeHeight3"></web>
        <web ref="studyReportWeb" :openinnewpage=true :style="{height:swebheight}" :src="studyReportSrc" class="webview" @pagestart="start" @pagefinish="finish" @error="error" @changeheight="changeHeight4"></web>
        <web ref="f10Web" :openinnewpage=true :style="{height:f10webheight}" :src="f10Src" class="webview" @pagestart="start" @pagefinish="finish" @error="error" @changeheight="changeHeight5"></web>
        <web ref="informationWeb" :openinnewpage=true :style="{height:inwebheight}" :src="informationSrc" class="webview" @pagestart="start" @pagefinish="finish" @error="error" @changeheight="changeHeight6"></web>
        <div v-if="buysellAccessoryshow" style="width:750px;height:84px;background-color:#F9F4EA;"></div>
        <div class="upfalllist" v-if="isUpDownListShow" >
            <jstabbar :tabItems="UpDownTabItems" selectedColor="#F9821E" @tabBarOnClick="switchUpOrFall" style="height:70"></jstabbar>
            <div v-for="item in riselist">
              <ranklistItem @onClickItem="goStockDetail(item)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :rateColor="item.px_change_rate_color"></ranklistItem>
              <div style="height: 1;background-color: #EAEAEA;margin-top: 5;margin-bottom: 5">

              </div>
            </div>
            <div style="height:100px;" @click="blockHasMore" v-if="isShowHasMore">
              <div style="flex-direction:row;align-items: center;height:100px;justify-content:center">
                <text style="text-align:center;font-size:28;color:#4A90E2;">查看更多</text>
              </div>
              <div style="height: 1;background-color: #EAEAEA;margin-top: 5;margin-bottom: 5">
              </div>
            </div>
        </div>
        <!--iosscroller滑动 需要元素contentSize比frame大 ios需要加个隐藏的view特殊处理 -->
        <div style="background-color:#F9F4EA;" :style="{height:extandDivHeight}"  v-if="isShowExtandDiv">
        </div>
        </cell>
    </list>


    <div v-if="buysellshow" style="position:fixed;flex-direction:row;border-top-color:#000000;border-top-width:1px;width:750px;bottom:0;height:80px;background-color:#F9F4EA;" :style="{bottom:platformbottomvalue}">
        <div v-on:click="onclickbuyinbutton" style="flex-direction:row;flex:1;align-items: center;justify-content:center;border-right-width:1px;border-right-color:#000000;">
                <image style="height:40px;width:40px;" :src="buyinbuttonsrc"></image>
                <text style="margin-left:6px;color:#ffffff;font-size:32px;color:#F9821E" :value="buybuttonvalue"></text>
        </div>
        <div v-on:click="onclickbuyoutbutton" style="flex-direction:row;flex:1;align-items: center;justify-content:center;">
                <image style="height:40px;width:40px;" :src="buyoutbuttonsrc"></image>
                <text style="margin-left:6px;color:#ffffff;font-size:32px;color:#F9821E" :value="sellbuttonvalue"></text>
        </div>
    </div>

    </div>
</template>

<style>
  .realtime{
    flex-direction: row;
  }
  .prelastStyle{
    flex:1;
    lines: 1;
    text-align:left;
    margin-top:20px;
    padding-left:40px;
  }
  .preDiffStyle{
    flex:1;
    font-size: 24px;
    text-align: left;
    padding-left:40px;
    margin-top:10px;
  }
  .preDiffStyle2{
    flex:2;
    font-size: 24px;
    text-align: left;
    padding-left: 30px;
    margin-top:10px;
  }

  .realtimeRight{
    flex:3;
    flex-direction: row;
    margin-left: 30px;
    margin-right:15px;
    justify-content: space-around;
    align-items: flex-start;
  }

  .realtimeBottomTextStyle{
    flex:1;
    font-size: 30px;
    text-align: left;
    margin-left: 20px;
    margin-top:10px;
    color:#9C9C9C;
  }
  .realtimeBottomTextStyle2{
    flex:1;
    font-size: 24px;
    text-align: left;
    margin-left: 20px;
    margin-top:5px;
    color:#000000;
  }
  .bar{
    margin-top: 60px;
  }
  .contentDiv{
   /* flex:2;*/
    width: 750px;
    flex-direction: row;
    height: 500px;
    margin-top:10px;
    justify-content:flex-start;
  }
  .trendDiv{
    flex:3;
    margin-top: 5px;
    width: 750px;
    flex-direction: row;
  }
  .trend{
    flex: 5;
  }
  .trendExPand{
    width: 750px;
  }
  .tabbidtrade {
    height: 60;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10;
    margin-right: 12;
  }
  .tabview {
        width: 750;
        height:70;
        flex-direction:column;
        border-style:solid;
        padding-left:10;
        padding-right:10;
    }

    .scroller {
        justify-content:center;
        align-items: flex-end;
        border-style: solid;
        height:62;
        flex-direction: row;
    }
    .text {
        justify-content:center;
        font-size: 28px;
        padding-left: 10;
        padding-right: 10;
        padding-top:7px;
        text-align: center;
        padding-bottom: 10px;
        border-bottom-width: 4;
    }
    .webview {
        width: 750;
    }
    .detailtext{
      flex: 1;
      text-align: center;
      font-size: 24;
      background-color: #F5F5F5;
      border-color: #eaeaea;
      border-top-width: 0.5wx;
      border-left-width: 0.5wx;
      border-bottom-width: 0.5wx;
      padding-top: 17;
    }
    .detailtext2{
      flex: 1;
      text-align: center;
      font-size: 24;
      background-color: #F5F5F5;
      border-color: #eaeaea;
      border-width: 0.5wx;
      padding-top: 17;
    }
    .bidOffer{
      flex:2;
      font-size:20px;
      text-align:left;
      color: #7B7B7B;
      left:20px;
    }
    .bidOffer2{
      flex:4;
      font-size:20px;
      text-align:left;
      color:#FF4500;
      left:20px;
    }
    .bidOffer3{
      flex:4;
      font-size:20px;
      text-align:left;
      color:#7B7B7B;
      left:10px;
    }
    .trade{
      flex:6;
      font-size:20px;
      color:#7B7B7B;
      text-align:right;
      right:10px;
    }

    .upfalllist{
      width: 750px;
    }
	.refesh{
      justify-content: center;
      display: flex;
      align-items: center;
      width: 750px;
    }
    .refreshtextstyle{
      text-align: center;
      font-size: 24px;
      height: 60px;
      color:#949494;
      margin-top:10px;
      margin-left:20px;
    }

    .simplePrice{
      position: fixed;
      top:0;
      left: 0;
      height: 80px;
      background-color: #F9F4EA;
      border-bottom-width: 2;
      border-bottom-color: #EAEAEA;
      width: 750px;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .simplePriceText{
        padding:20;
        font-size: 38px;
    }
    .tickCellWidth{
      width: 204px;
    }

</style>

<script>
  var quoteDc = weex.requireModule('dataCenter');
  var timeHandle = weex.requireModule('timer') || {};
  var webview = weex.requireModule('webview');
  var stream = weex.requireModule('stream');
  var head = weex.requireModule('head');
  var system = weex.requireModule('system');
  var event = weex.requireModule('event');
  var getBaseURL = require('./include/base-url.js').getBaseURL;
  var getAbbreviation = require('./include/common-api.js').common.getAbbreviation;
  var stockDetailUserJsHead = require('./include/common-api.js').common.Constants.stockDetailUserJsHead;
  const storage = weex.requireModule('storage');
  var LightJSBridge = weex.requireModule('LightJSBridge');
  var showed = 'news';
  //var log = weex.requireModule('jslog');
  var preclose;
  var hand = 1;
  var date = '';
  var tradeDate = '';
  var tradeZone = 480;
  var common = require('./include/common-api.js').common;
  var productType;
  var marketType;
  //用于顶部左右切换股票
  var stocklist=[];
  var index = 0;
   module.exports = {
    props:{
      stocktitle:{default:""},
      navBarHeight: {default: 0}
    },
    data: function () {
      return {
      auth_id:'',
      buybuttonvalue:'买入',
      platformbottomvalue:0,
      sellbuttonvalue:'卖出',
      buyinbuttonsrc:'image/buyin.png',
      buyoutbuttonsrc:'image/buyout.png',
      buysellshow:false,
      buysellAccessoryshow:false,
        stockCode:'',
        codeType:'',
        stockName:'',
        chartType:'TRENDLINE',
        refreshFlag:false,
        refreshing:'hide',
        refreshtext:'下拉刷新',
        preLastColor:"#FF4500",
		    preLastFont:72,
        preLast:"--",
        preDiff:"--",
        preDiff2:"--",
        bottonSrc:'',
        realTimeRightText11:'开盘',
        realTimeRightText12:'最高',
        realTimeRightText13:'换手率',
        realTimeRightText21:'--',
        realTimeRightText22:'--',
        realTimeRightText23:'--',
        realTimeRightText31:'成交额',
        realTimeRightText32:'最低',
        realTimeRightText33:'量比',
        realTimeRightText41:'--',
        realTimeRightText42:'--',
        realTimeRightText43:'--',
        bottomText11:'昨收',
        bottomText12:'内盘',
        bottomText13:'市盈率',
        bottomText14:'流通市值',
        bottomText15:'涨停',
        bottomText21:'--',
        bottomText22:'--',
        bottomText23:'--',
        bottomText24:'--',
        bottomText25:'--',
        bottomText31:'振幅',
        bottomText32:'外盘',
        bottomText33:'成交量',
        bottomText34:'总市值',
        bottomText35:'跌停',
        bottomText41:'--',
        bottomText42:'--',
        bottomText43:'--',
        bottomText44:'--',
        bottomText45:'--',
        bottomText51:'--',
        USbottomText:'盘后  --  --  --',
        isShowRealTimeBottom:false,
        isShowIcon:true,
        isShowUSText:false,
        isShowSecond:true,
        isShowThird:false,
        isShowTrend:true,
        isShowKLine:false,
        isShowBidofferList:true,
        isShowKTick:false,
        isBidTickDivShow:true,
        isShowNetValue:false,
        BidTickDivAttr:'visible',
        isShowFocusInfo: false,
        isFocusMargin:false,

        chartTabItems: [],
        chartArray: [],
        extraChartArray: [{type:"KLINE1MIN",title:'1分'},
                          {type:"KLINE5MIN",title:'5分'},
                          {type:"KLINE15MIN",title:'15分'},
                          {type:"KLINE30MIN",title:'30分'},
                          {type:"KLINE60MIN",title:'60分'}],
        isShowExtra: false,

        snapshotdata:{},
        trenddata:{},
        klinedata:{},
        tradedata:{},
        hsParamsData:{},
        netvaluedata:{},

        preclose,

        newscolor : "#f75e61",
        fundcolor : "#666",
        noticecolor : "#666",
        study_reportcolor : "#666",
        f10color : "#666",
        informationcolor : "#666",

        neborder: "#F9F4EA",
        fuborder: "#F9F4EA",
        noborder: "#F9F4EA",
        sborder: "#F9F4EA",
        f10border: "#F9F4EA",
        inborder: "#F9F4EA",

        isTabviewShow:true,
        isNewsShow:true,
        isFundShow:true,
        isNoticeShow:true,
        isStudyShow:true,
        isF10Show:false,
        isInformationShow:true,
        fundtext:"资金",
        f10text:"F10",

        bidcolor: "#FF3030",
        tradecolor: "#666666",
        newebheight: 0,
        fuwebheight: 0,
        nowebheight: 0,
        swebheight: 0,
        f10webheight: 0,
        inwebheight: 0,
        newsUrl: '',
        fundUrl: '',
        noticeUrl: '',
        studyReportUrl: '',
        f10Url: '',
        informationUrl: '',
        newsSrc: '',
        fundSrc: '',
        noticeSrc: '',
        studyReportSrc: '',
        f10Src: '',
        informationSrc: '',
        holdwebH1: 800,
        holdwebH2: 800,
        holdwebH3: 800,
        holdwebH4: 800,
        holdwebH5: 800,
        holdwebH6: 800,

        bidofferList:[
          {title:'卖5',volume:'—',price:'—',color:'#FF4500'},
          {title:'卖4',volume:'—',price:'—',color:'#FF4500'},
          {title:'卖3',volume:'—',price:'—',color:'#FF4500'},
          {title:'卖2',volume:'—',price:'—',color:'#FF4500'},
          {title:'卖1',volume:'—',price:'—',color:'#FF4500'},
          {title:'买1',volume:'—',price:'—',color:'#FF4500'},
          {title:'买2',volume:'—',price:'—',color:'#FF4500'},
          {title:'买3',volume:'—',price:'—',color:'#FF4500'},
          {title:'买4',volume:'—',price:'—',color:'#FF4500'},
          {title:'买5',volume:'—',price:'—',color:'#FF4500'},
        ],

        tradedataList:[
        ],
        UpDownTabItems:[
            {index: 0, title: '领涨', titleColor: ''},
            {index: 1, title: '领跌', titleColor: ''},
        ],
		    upDownSortType: 1,
        isUpDownListShow:false,
        riselist:[],
        risestocks:[],
        baseUrl:'',
        UpFallType:'1',
        myStockData:"" ,
        usPopcTextColor:"red",
        isShowHasMore:false,
        isShowExtandDiv:false,
        extandDivHeight:300,
        simplePriceShow:false,
        tecType:'VOMLUME',
        kLineMode:'',
        preKlineMode:'',
        isPageShow: true,
        bit:2,
        isScrollDisabled:false
       }
    },
    components: {
      jstabbar: require('./include/tabbar.vue'),
      popoverview: require('./include/popoverview.vue'),
      ranklistItem: require('./include/ranklistItem.vue'),
    },
    methods:{
        onclickbuyinbutton:function(){
            //console.log("买入");

          var that = this;
          LightJSBridge.call("user.getInfo",{},function(ret){

                if (ret.data!= undefined && ret.data.result != undefined && ret.data.result.extraInfo !=undefined && ret.data.result.extraInfo.auth_id !=undefined  && ret.data.result.extraInfo.auth_id.length != 0) {
                    that.auth_id = ret.data.result.extraInfo.auth_id;
                    if ((common.getMarkType(that.codeType) == "MARKET_CN" && common.getProductType(that.codeType)=="PRODUCT_STOCK")) {
                        var stockc=that.stockCode+"."+getAbbreviation(that.codeType);
                        var h5_url="https://ubdh35toy.lightyy.com/enter.html?auth_id="+that.auth_id+"#entrust?tabName=buy&code="+stockc;
                        event.openNative("web",{"startPage":h5_url});
                    }
                } else {
                    event.openNative('web', { startPage: "login/login.html" });
                }
           });


        },
        onclickbuyoutbutton:function(){
            //console.log("卖出");
            var that = this;
          LightJSBridge.call("user.getInfo",{},function(ret){
                if (ret.data!= undefined && ret.data.result != undefined && ret.data.result.extraInfo !=undefined && ret.data.result.extraInfo.auth_id !=undefined  && ret.data.result.extraInfo.auth_id.length != 0) {
                    that.auth_id = ret.data.result.extraInfo.auth_id;
                    if ((common.getMarkType(that.codeType) == "MARKET_CN" && common.getProductType(that.codeType)=="PRODUCT_STOCK")) {
                        var stockc=that.stockCode+"."+getAbbreviation(that.codeType);
                        var h5_url="https://ubdh35toy.lightyy.com/enter.html?auth_id="+that.auth_id+"#entrust?tabName=sell&code="+stockc;
                        event.openNative("web",{"startPage":h5_url});
                    }
                } else {
                    event.openNative('web', { startPage: "login/login.html" });
                }
           });
        },
  		//下拉
        onpullingdown: function(event){
          this.refreshtext = '下拉刷新数据' + '\n' +"最后更新:"+date;
          if(Math.abs(Number(event.pullingDistance)) > 95){
            this.refreshtext = '松开刷新数据' + '\n' +"最后更新:"+date;
            this.refreshFlag = true;
          }
        },
        //完成刷新
        onrefresh:function(){
          var self = this;
          if(this.refreshFlag){
            this.refreshtext = '正在刷新...'+ '\n' +'最后更新:'+date;
            this.getAllData();
            date = common.getNowFormatDate();
            this.refreshFlag = false;
            this.refreshing = 'show';
            setTimeout(() => {
              self.refreshing = 'hide';
            }, 1000);
          }
          else{
            this.refreshtext = '';
            this.refreshing = 'hide';
          }
        },
        getTradeDate:function(){
          var that = this;
          quoteDc.loadMarket({codeType:this.codeType},function(ret){
              if(!that.isPageShow){
                return;
              }
              tradeDate = String(ret.result.trade_Date);
              tradeZone = ret.result.timezone;
          });
        },
        getLastTradeTime:function(timestamp){
          var timeStr = (String(timestamp/Math.pow(10,9)).substr(2)+String(Math.pow(10,11-(String(timestamp/Math.pow(10,9)).length))).substr(1)).replace(/(\d{2})(\d{2})(\d{2})\d*/,"$1:$2:$3");
          var tradeDateStr = tradeDate.replace(/(\d{4})(\d{2})(\d{2})/,"$1/$2/$3");
          var currentdate = tradeDateStr+" "+timeStr;
          if (tradeZone == (-300)) //美国市区标识
          {
             currentdate = common.formatDate(new Date(new Date(currentdate).getTime()+12*60*60*1000),"MM/dd hh:mm:ss");
          }else{
             currentdate = common.formatDate(new Date(currentdate),"MM/dd hh:mm:ss");
          }
          return currentdate;
        },
	    getRealtime:function(){
          var that =this;

          quoteDc.loadRealtime({stockCode:this.stockCode,codeType:this.codeType},function(ret){
            //console.log("allan realtime=" + JSON.stringify(ret));
            if(!that.isPageShow){
              return;
            }
            that.snapshotdata = ret;

            var stockCode = that.stockCode;
            if (getAbbreviation(that.codeType).length > 0){
                stockCode = stockCode + "."+getAbbreviation(that.codeType);
            }
            if(that.snapshotdata.data.snapshot[stockCode]==null && that.snapshotdata.data.snapshot[that.stockCode]==null){
              return;
            }
            that.getSnapshotdata();
            var fields = that.snapshotdata.data.snapshot.fields;
            that.preclose =that.snapshotdata.data.snapshot[stockCode][fields.indexOf("preclose_px")];
            console.log("昨日收盘价="+preclose);
            if(preclose>0){
              if(that.chartType.indexOf('TRENDLINE')!=-1){
                    that.getTrend();
                }else if(that.chartType.indexOf("NETVALUE")!=-1){
                    that.getNetValue();
                }else{
                    that.getKLine();
                }

                if (that.BidTickDivAttr == 'visible'){
                    that.getTick();
                }
            }
            that.setTitle();
          });
        },
        setTitle:function(){
          var that = this;
          var snapshotData = that.snapshotdata.data.snapshot;
          if (snapshotData)
          {
            var fields = snapshotData.fields;
            var stockCode = that.stockCode;
            if (getAbbreviation(that.codeType).length > 0){
                stockCode = stockCode + "."+getAbbreviation(that.codeType);
            }
            var specialM = snapshotData[stockCode][fields.indexOf("special_marker")];
            var trade_status = snapshotData[stockCode][fields.indexOf("trade_status")];
            var flag = common.getBusiFlag(that.codeType,specialM);
            var timestamp = snapshotData[stockCode][fields.indexOf("data_timestamp")];
            var date = that.getLastTradeTime(timestamp);
            var subTitleStr = common.getTradeStatus(trade_status)+"  "+date;
            var titleStr = that.stockName+"("+stockCode+")";
            if(marketType=="MARKET_HK" || marketType=="MARKET_US"){
              subTitleStr=subTitleStr+"(延时15分)";
            }
            var params = {
               title : titleStr,
               subTitleData :{
                title:subTitleStr,
                icons:flag
              }
            }
            if (stockDetailUserJsHead){
              that.$emit('setTitle', params);
            }else{
              head.setTitle(params);
            }


          }else{
              var ss = getAbbreviation(this.codeType);
              var headParam = {"title": this.stockName+"(" + this.stockCode + (ss.length>0?("." + ss):'')  + ")"};

              if (stockDetailUserJsHead){
                that.$emit('setTitle', headParam);
              }else{
                head.setTitle(headParam);
              }
          }

        },
        getTrend:function(){
          var that =this;
          quoteDc.loadTrend({stockCode:this.stockCode,codeType:this.codeType,chartType:this.chartType},function(ret){
            //nativeLog(JSON.stringify(ret));
            if(!that.isPageShow){
              return;
            }
            that.trenddata =ret;
            that.snapshotdata =that.snapshotdata;
          });
        },
        getKLine:function(){
          var that =this;
           //nativeLog("loadKLine");
          quoteDc.loadKLine({stockCode:this.stockCode,codeType:this.codeType,chartType:this.chartType},function(ret){
            //nativeLog(JSON.stringify(ret));
            if(!that.isPageShow){
              return;
            }
            that.klinedata =ret;
            that.snapshotdata =that.snapshotdata;
          });
        },
        getNetValue:function(){
          var that =this;
           nativeLog("getNetValue");
          quoteDc.loadNetValue({stockCode:this.stockCode,codeType:this.codeType,chartType:this.chartType},function(ret){
            nativeLog(JSON.stringify(ret));
            if(!that.isPageShow){
              return;
            }
            that.netvaluedata =ret;
          });
        },
        getTick:function(){
          var that =this;
          // nativeLog("loadTickView");
          quoteDc.loadTick({stockCode:this.stockCode,codeType:this.codeType},function(ret){
            //log.e(JSON.stringify(ret));
            if(!that.isPageShow){
              return;
            }
            var stockCode = that.stockCode;
            if (getAbbreviation(that.codeType).length > 0){
                stockCode = stockCode + "."+ getAbbreviation(that.codeType);
            }
            //log.i(stockCode+"     "+"tick1");
            that.tradedataList=[];
            //log.i(stockCode+"     "+"tick2");
            //log.i(ret);
            if(!that.isEmptyObject(ret) && ret.data.tick[stockCode]!=undefined){
              var i = 0;
              var fields = ret.data.tick.fields;
              if(ret.data.tick[stockCode].length>50){
                i = ret.data.tick[stockCode].length - 50;
              }
              for(i;i<ret.data.tick[stockCode].length;i++){
                  var dTime = ret.data.tick[stockCode][i][fields.indexOf('business_time')];
                  if(dTime.length>9){
                    var hour = dTime.substring(8,10);
                    var minute = dTime.substring(10,12);
                  }
                  else
                  {
                    var hour = dTime.substring(0,2);
                    var minute = dTime.substring(2,4);
                  }
                  var simpletime = hour + ":" + minute;
                  var dPrice = ret.data.tick[stockCode][i][fields.indexOf('hq_px')];
                  var dVolume = ret.data.tick[stockCode][i][fields.indexOf('business_amount')];
                  var dDirection = ret.data.tick[stockCode][i][fields.indexOf('business_direction')];
                  var dColorp = "#FF4500";
                  var dColorv = "#FF4500";
                  if((Number(dPrice) - Number(preclose))<0){
                    dColorp = "#3CB371";
                  }
                  else if((Number(dPrice) - Number(preclose))==0){
                      dColorp = "#A9A9A9";
                  }
                  if(dDirection == 0){
                    dColorv = "#3CB371";
                  }
                  if(productType == 'PRODUCT_FUND'){
                    dPrice = (Number(dPrice)).toFixed(3);
                  }
                  else
                  {
                    dPrice = (Number(dPrice)).toFixed(2);
                  }
                  dVolume = that.formatBigNumber(dVolume/hand,0);
                  that.tradedataList.push({"time":simpletime,"price":dPrice,"volume":dVolume,"colorv":dColorv,"colorp":dColorp});
                }
            }
            else{
              that.tradedataList.push({time:'暂无数据',price:'',volume:'',colorp:'#FF4500',colorv:'#FF4500'});
              //log.i("tick无数据");
            }
          });
        },

        formatZero:function(num,flag){
          var that = this;
          if(flag == -1){
            if(!that.hasData(num) || parseFloat(num)<=0){
            return '--'
            }
          }
          else if(flag == 1){
            if(!that.hasData(num) || parseFloat(num)>0){
            return '--'
            }
          }
          else if(flag == 0){
            if(!that.hasData(num) || parseFloat(num)==0){
            return '--'
            }
          }
          return num;
        },
        formatdata:function(num,bit,denominator,flag){
          var that = this;
          if(that.hasData(num) && parseFloat(num)!=0){
            if(denominator==null){
              denominator=1;
            }
            return that.formatBigNumber(num/denominator,bit,flag);
          }else{
            return '--';
          }
        },
        getSnapshotdata:function(){
            var that = this;
            var bid = 0;
            var biddata;
            var offerdata;
            var last;  //最新价
            var open;  //开盘
            var high; //最高
            var low;  //最低
            var iopv; //净值
            var volume;//成交量
            var amountdelta;//日增
            var amount; //持仓
            var premiumrate;//溢价率
            var turnover;//换手率
            var totalmaney;//成交额
            var volumeratio;//量比
            var risecount;  //涨家数
            var fallcount;  //跌家数

            var prevsettlement; //昨结
            var amountIn;//内盘
            var amountOut;//外盘
            var peRate;  //市盈率
            var circulationValue;//流通市值
            var up; //涨停
            var down;//跌停
            var dynPbRate;  //市净率
            var high52; //52周最高
            var low52;  //52周最低
            var marketValue;//总市值
            var amplitude;//振幅
            var avg;  //均价
            var unchangedCount; //平家数
            var totalcCount;  //总家数
            var popcPrice;//盘前后价
            var trade_status;//停牌判断
            var circulationAmount;  //流通股本
            var totalShares;  //总股本
            var stockCode = that.stockCode;
            if (getAbbreviation(that.codeType).length > 0){
                stockCode = stockCode +"."+ getAbbreviation(that.codeType);
            }
            var bidArr = new Array();
            var offerArr = new Array();
            if(!that.isEmptyObject(that.snapshotdata) && that.snapshotdata.data.snapshot[stockCode]!=undefined){
              //log.i("当前"+JSON.stringify(that.snapshotdata));
              //console.log("allan snapshotdata=" + JSON.stringify(that.snapshotdata));
              var fields = that.snapshotdata.data.snapshot.fields;
              var stockdata = that.snapshotdata.data.snapshot[stockCode];

              biddata = stockdata[fields.indexOf('bid_grp')];
              offerdata = stockdata[fields.indexOf('offer_grp')];
              preclose = that.formatZero(stockdata[fields.indexOf('preclose_px')],0);
              hand = stockdata[fields.indexOf('shares_per_hand')];
              last = that.formatZero(stockdata[fields.indexOf('last_px')],0);
              open = that.formatdata(stockdata[fields.indexOf('open_px')],that.bit);
              high = that.formatdata(stockdata[fields.indexOf('high_px')],that.bit);
              low = that.formatdata(stockdata[fields.indexOf('low_px')],that.bit);
              iopv = that.formatdata(stockdata[fields.indexOf('iopv')],that.bit,100);
              volume = that.formatZero(stockdata[fields.indexOf('business_amount')],-1);
              amountdelta = that.formatdata(stockdata[fields.indexOf('amount_delta')],2,1,true);
              amount = that.formatdata(stockdata[fields.indexOf('amount')],2,1,true);
              turnover = stockdata[fields.indexOf('turnover_ratio')];
              if(that.hasData(turnover)){
                    turnover = Number(turnover).toFixed(2)+"%";
                  }
                  else
                  {
                    turnover = '--';
                  }
              totalmaney = that.formatdata(stockdata[fields.indexOf('business_balance')],2,1,true);
              volumeratio = stockdata[fields.indexOf('vol_ratio')];
              if(that.hasData(volumeratio) && parseFloat(volumeratio) > 0){
                      volumeratio = that.formatBigNumber(volumeratio,2);
              }else{
                      volumeratio = '--';
              }
              prevsettlement = stockdata[fields.indexOf('prev_settlement')];
              amountIn = that.formatZero(stockdata[fields.indexOf('business_amount_in')],0);
              amountOut = that.formatZero(stockdata[fields.indexOf('business_amount_out')],0);
              peRate = stockdata[fields.indexOf('pe_rate')];
              circulationValue = stockdata[fields.indexOf('circulation_value')];
              circulationAmount = stockdata[fields.indexOf('circulation_amount')];
              totalShares = stockdata[fields.indexOf('total_shares')];
              up = stockdata[fields.indexOf('up_px')];
              if(that.hasData(up)){
                up = that.formatBigNumber(up,that.bit);
              }else{
                up = '--';
              }
              down =  stockdata[fields.indexOf('down_px')];
              if(that.hasData(down)){
                down = that.formatBigNumber(down,that.bit);
              }else{
                down = '--';
              }
              dynPbRate = stockdata[fields.indexOf('dyn_pb_rate')];
              high52 = that.formatdata(stockdata[fields.indexOf('w52_high_px')],that.bit);
              low52 = that.formatdata(stockdata[fields.indexOf('w52_low_px')],that.bit);
              marketValue = stockdata[fields.indexOf('market_value')];
              amplitude = stockdata[fields.indexOf('amplitude')];
              if(that.hasData(amplitude) && parseFloat(amplitude) > 0){
                amplitude = that.formatBigNumber(amplitude,2)+"%";
              }else{
                amplitude = '--';
              }
              avg = stockdata[fields.indexOf('avg_px')];
              if(that.hasData(avg)){
                avg = that.formatBigNumber(avg,that.bit);
              }else{
                avg = '--';
              }
              risecount = that.formatdata(stockdata[fields.indexOf('rise_count')],0);
              fallcount = that.formatdata(stockdata[fields.indexOf('fall_count')],0);
              totalcCount = that.formatdata(stockdata[fields.indexOf('member_count')],0);
              popcPrice = that.formatZero(stockdata[fields.indexOf('popc_px')],0);
              trade_status = stockdata[fields.indexOf('trade_status')];

            if(common.getTradeStatus(trade_status) == '停牌'){
              turnover = '--';
            }
            //不同股票类型显示不一样
            //买五
            if(biddata && biddata!=""){
              bidArr = biddata.split(',');
              bidArr.pop();
              var pbit=2;
              if(productType=='PRODUCT_FUND'){
                pbit = 3;
              }
              for (var i = 0; i < 5; i++){
                  if (that.hasData(bidArr[i*3]) && bidArr[i*3+1]>0){
                    that.bidofferList[5+i].price = (Number(bidArr[i*3])).toFixed(pbit);
                    //log.i("价格："+bidArr[i*3]+"昨收："+preclose);
                    if(Number(that.bidofferList[5+i].price - preclose)>0){
                      that.bidofferList[5+i].color = "#FF4500";
                    }
                    else if(Number(that.bidofferList[5+i].price - preclose)<0){
                      that.bidofferList[5+i].color = "#3CB371";
                    }
                    else
                    {
                      that.bidofferList[5+i].color = "#A9A9A9";
                    }
                    if(hand>0){
                      if(bidArr[i*3+1]/hand >=100000){
                        that.bidofferList[5+i].volume = that.formatBigNumber(bidArr[i*3+1]/hand,2);
                      }
                      else
                      {
                        that.bidofferList[5+i].volume = Number(bidArr[i*3+1]/hand).toFixed(0);
                      }
                    }
                  }else{
                    that.bidofferList[5+i].price = '--';
                    that.bidofferList[5+i].volume = '--';
                  }
              }
            }
            //卖五
            if(offerdata && offerdata!=""){
              offerArr = offerdata.split(',');
              offerArr.pop();

              for (var i = 0; i < 5; i++){
                  if(that.hasData(offerArr[i*3])&&offerArr[i*3+1] > 0){
                    //log.i("价格："+(offerArr[i*3])+"昨收："+preclose);
                    that.bidofferList[4-i].price = (Number(offerArr[i*3])).toFixed(pbit);
                    if(Number(that.bidofferList[4-i].price - preclose)>=0){
                      that.bidofferList[4-i].color = "#FF4500";
                    }
                    else{
                      that.bidofferList[4-i].color = "#3CB371";
                    }
                    if(hand>0){
                      if(offerArr[i*3+1]/hand >=100000){
                        that.bidofferList[4-i].volume = that.formatBigNumber(offerArr[i*3+1]/hand,2);
                      }
                      else
                      {
                        that.bidofferList[4-i].volume = Number(offerArr[i*3+1]/hand).toFixed(0);
                      }
                    }
                  }else{
                    that.bidofferList[4-i].price = '--';
                    that.bidofferList[4-i].volume = '--';
                  }
              }
            }

          }
          if(that.hasData(last) && last.length>=9){
            that.preLastFont=60;
          }

          var leftclose = preclose;

          //左边数据处理
          if(marketType=="MARKET_FUTURE"){
            leftclose = prevsettlement;
          }
          if(that.hasData(last)){
            that.preLast = that.formatBigNumber(last,that.bit);
          }
          if(that.hasData(preclose)){
            preclose = that.formatBigNumber(preclose,that.bit);
          }
          if(common.getTradeStatus(trade_status) == '停牌'){
            that.preLast = '停牌';
          }
          if(that.hasData(last)&&that.hasData(leftclose)){
              that.preDiff = Math.abs((last-leftclose).toFixed(that.bit));
              if(Number(last-leftclose)>=0){
                  that.preLastColor = "#FF4500";
                  that.preDiff = "+"+that.preDiff.toFixed(that.bit);
                  that.preDiff2 = "+"+that.formatBigNumber((that.preDiff/leftclose*100),2)+"%";
              }
              else{
                that.preLastColor = "#3CB371";
                that.preDiff = "-"+that.preDiff.toFixed(that.bit);
                that.preDiff2 = that.formatBigNumber((that.preDiff/leftclose*100),2)+"%";
              }
          }
          else
          {
            that.preLastColor = "#ADADAD";
            that.preDiff = Number(0).toFixed(that.bit);
            that.preDiff2 = "0.00%";
          }

          if(that.hasData(risecount)&&that.hasData(fallcount)&&that.hasData(totalcCount)){
            unchangedCount = Number(totalcCount) - Number(risecount) - Number(fallcount);
          }else{
            unchangedCount = '--';
          }

          //昨结
          if(that.hasData(prevsettlement)){
            prevsettlement = that.formatBigNumber(prevsettlement,that.bit);
          }
          else
          {
            prevsettlement = '--';
          }

          //内外盘
          amountIn = that.processAmountData(amountIn,hand);
          amountOut = that.processAmountData(amountOut,hand);
          //成交量
          volume = that.getVolume(volume,hand,marketType);
          //溢价率
          if (!that.hasData(last) || !that.hasData(iopv) ||last <= 0 || iopv <= 0) {
              premiumrate = '0.00%';
          }
          else{
            premiumrate = (last - iopv) / iopv;
            if (premiumrate > 1) {
                premiumrate = Number(premiumrate).toFixed(0);
            }
            premiumrate = Number(premiumrate * 100).toFixed(2)+"%";
            //log.i("最新价:"+last + "  净值:"+iopv);
              //log.i("last-iopv/100："+(last - iopv/100)/iopv);
          }
          //手
          if(that.hasData(hand)){
            hand = that.formatBigNumber(hand,0);
          }

          //所有股票开盘，最高最低位置相同,统一注入
          that.realTimeRightText21 = open;
          that.realTimeRightText22 = high;
          that.realTimeRightText42 = low;
          //不同类型股票数据不同
          //
          //基金
          if(productType == "PRODUCT_FUND"){
            that.realTimeRightText23 = iopv;
            that.realTimeRightText41 = volume;
            that.realTimeRightText43 = premiumrate;
          }
          //期货
          else if(marketType == "MARKET_FUTURE"){
            that.realTimeRightText23 = amount;
            that.realTimeRightText41 = volume;
            that.realTimeRightText43 = amountdelta;
            that.bottomText21 = preclose;
            that.bottomText22 = amplitude;
            that.bottomText23 = amountIn;
            that.bottomText24 = totalmaney;
            that.bottomText25 = up;
            that.bottomText41 = prevsettlement;
            that.bottomText42 = avg;
            that.bottomText43 = amountOut;
            that.bottomText44 = volumeratio;
            that.bottomText45 = down;
          }
          //指数
          else if(productType == "PRODUCT_INDEX"){
            that.realTimeRightText23 = risecount;
            that.realTimeRightText41 = totalmaney;
            that.realTimeRightText43 = fallcount;
            that.bottomText21 = preclose;
            that.bottomText22 = volume;
            that.bottomText23 = amplitude;
            that.bottomText24 = unchangedCount;
            that.bottomText25 = totalcCount;
          }
          //板块
          else if(productType == "PRODUCT_BLOCK"){
            //沪深板块
            if(marketType == "MARKET_CN"){
              that.realTimeRightText23 = risecount;
              that.realTimeRightText41 = volume;
              that.realTimeRightText43 = fallcount;
              that.bottomText21 = preclose;
              that.bottomText22 = amountIn;
              if(that.hasData(peRate)){
                that.bottomText23 = that.formatBigNumber(peRate,2);
              }
              that.bottomText24 = "--";
              that.bottomText25 = up;
              that.bottomText41 = amplitude;
              that.bottomText42 = amountOut;
              that.bottomText43 = volume;
              that.bottomText44 = "--";
              that.bottomText45 = down;
            }
            //港股板块
            else{
              that.realTimeRightText23 = risecount;
              that.realTimeRightText41 = volume;
              that.realTimeRightText43 = fallcount;
              that.bottomText21 = preclose;
              that.bottomText22 = amountIn;
              if(that.hasData(peRate)){
                that.bottomText23 = that.formatBigNumber(peRate,2);
              }
              that.bottomText24 = volume;
              that.bottomText25 = high52;
              that.bottomText41 = amplitude;
              that.bottomText42 = amountOut;
              if(that.hasData(dynPbRate)){
                that.bottomText43 = that.formatBigNumber(dynPbRate,2);
              }
              that.bottomText42 = amountOut;
              that.bottomText44 = marketValue;
              that.bottomText45 = down;
              that.bottomText51 = hand;
            }
          }
          //沪深股票
          else if((marketType == "MARKET_CN" && productType == "PRODUCT_STOCK") || productType == "PRODUCT_NEWBLOCK"){
            that.realTimeRightText23 = turnover;
            that.realTimeRightText41 = totalmaney;
            that.realTimeRightText43 = volumeratio;
            that.bottomText21 = preclose;
            that.bottomText22 = amountIn;
            if(that.hasData(peRate)){
                that.bottomText23 = that.formatBigNumber(peRate,2);
            }
            that.bottomText24 = circulationValue;
            that.bottomText25 = up;
            that.bottomText41 = amplitude;
            that.bottomText42 = amountOut;
            that.bottomText43 = volume;
            that.bottomText44 = marketValue;
            that.bottomText45 = down;
          }
          else if(marketType == "MARKET_US"){
            //美股
            that.realTimeRightText23 = turnover;
            that.realTimeRightText41 = totalmaney;
            that.realTimeRightText43 = volumeratio;
            that.bottomText21 = preclose;
            that.bottomText22 = amountIn;
            if(that.hasData(peRate)){
              that.bottomText23 = that.formatBigNumber(peRate,2);
            }
            else
            {
              that.bottomText23 = "0.00"
            }
            that.bottomText24 = volume;
            that.bottomText25 = high52;
            that.bottomText41 = amplitude;
            that.bottomText42 = amountOut;
            if(that.hasData(dynPbRate)){
              that.bottomText43 = that.formatBigNumber(dynPbRate,2);
            }
            else
            {
              that.bottomText43 = "0.00"
            }
            that.bottomText44 = marketValue;
            that.bottomText45 = low52;
              if (popcPrice > 0){
                var closePrice = 0;
                var percent = 0;
                var changePrice = 0;

                if (last > 0 ){
                  closePrice = last;
                }else{
                  closePrice = preclose;
                }

                changePrice = popcPrice - closePrice;

                if (closePrice != 0){
                  percent = parseFloat(changePrice*100/closePrice).toFixed(2) + "%";
                }else{
                  percent = "--";
                }

                if (changePrice == 0){
                  that.usPopcTextColor = "gray";
                }else if (changePrice > 0){
                  that.usPopcTextColor = "red";
                }else{
                  that.usPopcTextColor = "green";
                }

                that.USbottomText = "盘后    " + parseFloat(popcPrice).toFixed(3) + "    " +  parseFloat(changePrice).toFixed(3) + "    " + percent;

              }else{
                that.USbottomText = "无盘后数据";
                that.usPopcTextColor = "gray";
              }

          }else if(marketType == "MARKET_HK"){
            //港股
            that.realTimeRightText23 = turnover;
            that.realTimeRightText41 = totalmaney;
            that.realTimeRightText43 = volumeratio;
            that.bottomText21 = preclose;
            that.bottomText22 = amountIn;
            if(that.hasData(peRate)){
                that.bottomText23 = that.formatBigNumber(peRate,2);
            }else{
                that.bottomText23 = "0.00"
            }
            that.bottomText24 = volume;
            that.bottomText25 = high52;
            that.bottomText41 = amplitude;
            that.bottomText42 = amountOut;
            if(that.hasData(dynPbRate)){
                that.bottomText43 = that.formatBigNumber(dynPbRate,2);
            }else{
                that.bottomText43 = "0.00"
            }
            that.bottomText44 = marketValue;
            that.bottomText45 = low52;
            that.bottomText51 = hand;
          }
        },
        getVolume:function(volume,hand,marketType){ //成交量处理
            if(!this.hasData(volume) || Number(volume)<=0)
              return "--";
            if(marketType=="MARKET_FUTURE"){ //期货不需要除每手股数
              return this.formatBigNumber(volume,2,true)+"手";
            }else if(marketType=="MARKET_CN"){
              //A股以手为单位
              return this.amountToHand(volume,hand)+"手";
            }else if(marketType=="MARKET_US" ||  marketType =="MARKET_HK") {
              //美股、港股以股为单位
              var result = this.formatBigNumber(volume,2,true);
               if(result == '--'){
                return result;
               }
               return result + "股";
            }else{
                return this.amountToHand(volume,hand);
            }
        },
        amountToHand:function(amount,unit){
          if(unit==0){
            unit=1;
          }
          if(amount==0){
            return "--";
          }
          var hands =parseInt(amount*1.0/unit+0.5);
          if(hands>=100000000){ //亿以上
            return parseFloat(hands / 100000000).toFixed(2) + "亿";
          }else if(hands>=100000){ //十万以上
            return parseFloat(hands / 10000).toFixed(2) + "万";
          }else {
            return hands;
          }
        },
        //数据进行格式化
        formatBigNumber:function(number,bit,flag){
            //log.e("原始数据"+number);
            var num = Number(number);
            var preFix = "";
            if(num < -0.00001){
                preFix = '-';
                num = Math.abs(num);
            }
            var amountStr="";
            if ( num < 100000 ) {
            //小于10万
              if(!!flag){
                amountStr = num.toFixed(0);
              }
              else{
                amountStr = num.toFixed(bit);
              }
            }
            else if ( num < 100000000 ) {
            //小于1亿
            amountStr = (num/10000).toFixed(bit) +"万";
            }
            else if( num < 100000000000){
              amountStr = (num/100000000).toFixed(bit) +"亿";
            }
            else{
            //千亿
              amountStr = (num/100000000000).toFixed(bit)+"千亿";
            }
            //log.e("转换后数据"+preFix+amountStr);
            return preFix+amountStr;
        },
        //判断是否有数据
        hasData:function(data){
          if(parseFloat(data).toString() == "NaN") {
　　　　    return false;
　　　　  }
　　　　  return true;
        },
        getChartTabItems: function (productTypes) {
          if (productTypes == 'PRODUCT_FUND') {    //基金
            this.chartTabItems = [
            {index: 0, title: '分时', titleColor: ''},
            {index: 1, title: '净值', titleColor: ''},
            {index: 2, title: '日K', titleColor: ''},
            {index: 3, title: '周K', titleColor: ''},
            {index: 4, title: '月K', titleColor: ''},
            {index: 5, title: '分钟', titleColor: ''}];
          } else {
            this.chartTabItems = [
            {index: 0, title: '分时', titleColor: ''},
            {index: 1, title: '5日', titleColor: ''},
            {index: 2, title: '日K', titleColor: ''},
            {index: 3, title: '周K', titleColor: ''},
            {index: 4, title: '月K', titleColor: ''},
            {index: 5, title: '分钟', titleColor: ''}];
          }
        },
        getChartArray: function(productTypes) {
          if (productTypes == 'PRODUCT_FUND') {    //基金
            this.chartArray = ["TRENDLINE", "NETVALUE", "KLINEDAY", "KLINEWEEK", "KLINEMONTH"];
          } else {
            this.chartArray = ["TRENDLINE", "TRENDLINE5DAY", "KLINEDAY", "KLINEWEEK", "KLINEMONTH"];
          }
        },
        switchMinute: function (e) {
          var params = {
            index: this.$refs.jstabbar.indexOfExtra,
            title: e.title
          };
          this.$refs.jstabbar.$emit('select', params);
          this.isShowExtra = false;
          this.chartType = this.extraChartArray[e.index].type;
          this.doSwitchChart(this.chartType);
        },
        switchType: function (e) {
          nativeLog("the clicked index is " + e.index);
          if (e.index == this.$refs.jstabbar.indexOfExtra) {
            this.isShowExtra = !this.isShowExtra;
          } else {
            this.isShowExtra = false;
          }
          if(e.index<this.chartArray.length){
            this.chartType = this.chartArray[e.index];
            this.doSwitchChart(this.chartType);
          }
        },
        switchUpOrFall:function(e){
          var type='1'; //领涨
          this.upDownSortType = 1;
          if(e.index==1) {
            type='0'; //领跌
            this.upDownSortType = 0;
          }
          this.UpFallType=type;
          this.sortHq(type);
        },
        doSwitchChart: function (chartType) {
          if (that.preclose > 0) {
            if(chartType.indexOf('TRENDLINE')!=-1){
            this.isShowNetValue=false;
            this.isShowKLine=false;
            this.isShowTrend =true;
            this.getTrend();
            if(chartType != 'TRENDLINE'){
               this.isBidTickDivShow=false;
            }else{
               this.isBidTickDivShow=true;
               this.bidcolor = "#FF3030";
               this.tradecolor = "#666666";
               this.isShowBidofferList=true;
               this.isShowKTick =false;
            }
         }else{
            this.isBidTickDivShow=false;
            if(chartType.indexOf("NETVALUE")!=-1){
              this.isShowNetValue=true;
              this.isShowTrend=false;
              this.isShowBidofferList=false;
              this.isShowKTick =false;
              this.getNetValue();
            }else{
              this.isShowKLine=true;
              this.isShowTrend=false;
              this.isShowNetValue=false;
              this.isShowBidofferList=false;
              this.isShowKTick =false;
              this.getKLine();
            }
         }
          }
        },
        //切换快照底部视图状态
        showRealTimeBottom:function(){
          if(this.isShowRealTimeBottom){
            this.isShowRealTimeBottom = false;
            this.bottonSrc = this.baseUrl + 'image/nb_arrow_down.png';

          }
          else{
            this.isShowRealTimeBottom = true;
            this.bottonSrc= this.baseUrl + 'image/nb_arrow_up.png';
          }
        },

      showLine: function (event) {
        this.isShowFocusInfo = true;
        this.hsParamsData = event.hsParams;
        //ios k线图 touch手势会和list的tableview冲突，所以需要禁止table的滚动
        this.isScrollDisabled =true;
      },
      hideLine: function (event) {
        this.isShowFocusInfo = false;
        this.isScrollDisabled =false;
      },
      setWebviewHeight: function(id){
          switch(id){
              case 'news':
                  this.newebheight=this.holdwebH1;
                  if(this.newsSrc != this.newsUrl){
                    this.newsSrc = this.newsUrl;
                  }
                  break;
              case 'fund':
                  this.fuwebheight=this.holdwebH2;
                  if(this.fundSrc != this.fundUrl){
                    this.fundSrc = this.fundUrl;
                  }
                  break;
              case 'notice':
                  this.nowebheight=this.holdwebH3;
                  if(this.noticeSrc != this.noticeUrl){
                    this.noticeSrc = this.noticeUrl;
                  }
                  break;
              case 'study_report':
                  this.swebheight=this.holdwebH4;
                  if(this.studyReportSrc != this.studyReportUrl){
                    this.studyReportSrc = this.studyReportUrl;
                  }
                  break;
              case 'f10':
                  this.f10webheight=this.holdwebH5;
                  if(this.f10Src != this.f10Url){
                    this.f10Src = this.f10Url;
                  }
                  break;
              case 'information':
                  this.inwebheight=this.holdwebH6;
                  if(this.informationSrc != this.informationUrl){
                    this.informationSrc = this.informationUrl;
                  }
                  break;
              case 'hiddeninfo':
                this.newebheight=0;
                this.fuwebheight=0;
                this.nowebheight=0;
                this.swebheight=0;
                this.f10webheight=0;
                this.inwebheight=0;
                break;
              default:break;
          }
      },
        loadurl:function(event){
          var self = this;
          self.changeColor(event);
          self.hide(showed);
          self.setWebviewHeight(event);
          showed = event;
        },

        hide:function(id){
              var self = this;
              switch(id){
                  case 'news':
                      self.newebheight = 0;
                      break;
                  case 'fund':
                      self.fuwebheight = 0;
                      break;
                  case 'notice':
                      self.nowebheight = 0;
                      break;
                  case 'study_report':
                      self.swebheight = 0;
                      break;
                  case 'f10':
                      self.f10webheight = 0;
                      break;
                  case 'information':
                      self.inwebheight = 0;
                      break;
                  default:
                       self.inwebheight = 0;
                       self.newebheight = 0;
                       self.fuwebheight = 0;
                       self.nowebheight = 0;
                       self.swebheight = 0;
                       self.f10webheight = 0;
                       break;
              }
        },

          start:function(event) {
          },
          finish:function(event) {
          },
          error:function(event) {
          },

          changeColor:function(id){
              this.newscolor = "#666";
              this.fundcolor = "#666";
              this.noticecolor = "#666";
              this.study_reportcolor = "#666";
              this.f10color = "#666";
              this.informationcolor = "#666";

              this.neborder = "#F9F4EA";
              this.fuborder = "#F9F4EA";
              this.noborder = "#F9F4EA";
              this.sborder = "#F9F4EA";
              this.f10border = "#F9F4EA";
              this.inborder = "#F9F4EA";
              switch(id){
                  case 'news':
                  this.newscolor = "#F9821E";
                  this.neborder = "#F9821E";
                  break;
                  case 'fund':
                  this.fundcolor = "#F9821E";
                  this.fuborder = "#F9821E";
                  break;
                  case 'notice':
                  this.noticecolor = "#F9821E";
                  this.noborder = "#F9821E";
                  break;
                  case 'study_report':
                  this.study_reportcolor = "#F9821E";
                  this.sborder = "#F9821E";
                  break;
                  case 'f10':
                  this.f10color = "#F9821E";
                  this.f10border = "#F9821E";
                  break;
                  case 'information':
                  this.informationcolor = "#F9821E";
                  this.inborder = "#F9821E";
                  break;
              }
          },
          switchBidAndTrade:function(index) {
            var that=this;
            switch(index) {
              case 0:
                that.isShowBidofferList=true;
                that.isShowKTick =false;
                that.getSnapshotdata();
                that.bidcolor = "#FF3030";
                that.tradecolor = "#666666";
                break;
              case 1:
                that.isShowBidofferList=false;
                that.isShowKTick =true;
                that.getTick();
                that.bidcolor = "#666666";
                that.tradecolor = "#FF3030";
                break;
            }
          },

          foucusMarginStyle:function(isMargin){
             if(isMargin)
              return 'bar';
             else
              return '';
          },

          setInfoItems: function(isFirst){
            var self = this;
            var ss = getAbbreviation(this.codeType);
            if(productType == "PRODUCT_FUND") {
                //基金
                //log.i("基金");
                 self.isTabviewShow = false;
                if(isFirst){
                  self.isNewsShow=false;
                  self.isFundShow=false;
                  self.isNoticeShow=false;
                  self.isStudyShow=false;
                  self.isF10Show=false;
                  self.isInformationShow=false;
                  self.realTimeRightText12='最高';
                  self.realTimeRightText13='净值';
                  self.realTimeRightText31='成交量';
                  self.realTimeRightText32='最低';
                  self.realTimeRightText33='溢价率';
                  showed = 'notice';
                  self.isShowIcon = false;
                  self.isShowRealTimeBottom = false;
                }
                self.loadurl("hiddeninfo");
            }else if(marketType == "MARKET_CN" && productType=="PRODUCT_STOCK"){
                //沪深股票
                //log.i("沪深股票");
                self.newsUrl = 'https://light.hscloud.cn/apps/v3_xin_wen_zi_xun/index.html?bgc=F9F4EA&stock_code=' + self.stockCode + (ss.length>0?("."+ss):'');
                self.fundUrl = 'https://rqfcehxot.lightyy.com/index.html#/fundflow?bgc=F9F4EA&stock_code=' + self.stockCode + (ss.length>0?("."+ss):'');
                self.noticeUrl = 'https://light.hscloud.cn/apps/v3_xin_wen_zi_xun/index.html?bgc=F9F4EA&stock_code=' + self.stockCode + (ss.length>0?("."+ss):'') + '&info_type=notice';
                self.studyReportUrl = 'https://light.hscloud.cn/apps/v3_xin_wen_zi_xun/index.html?bgc=F9F4EA&stock_code=' + self.stockCode + (ss.length>0?("."+ss):'') + '&info_type=report';
                self.f10Url =  'https://light.hscloud.cn/apps/minfo/f10.html?bgc=F9F4EA&s=' + self.stockCode + '&p=HSJY_1025&u=hundsun&tg=_blank&n=1&h=0';
                //self.informationUrl = 'https://light.hscloud.cn/apps/minfo/hkyanbao.html?s=600570&p=HSJY_1025&u=1234567890';
                if (!self.isTabviewShow){
                  self.isTabviewShow = true;
                }
                if(isFirst){
                  self.isNewsShow=true;
                  self.isFundShow=true;
                  self.isNoticeShow=true;
                  self.isStudyShow=true;
                  self.isF10Show=false;
                  self.isInformationShow=false;
                  showed = 'news';
                }

                self.loadurl(showed);
            }else if(marketType == "MARKET_US" && productType=="PRODUCT_STOCK"){
                self.newsUrl = 'https://www.lightyy.com/apps/v3_xin_wen_zi_xun-test/index.html?bgc=F9F4EA&stock_code=' + self.stockCode + (ss.length>0?("."+ss):'')+'&secu_market=us';
                self.fundUrl = 'https://www.lightyy.com/apps/v3_xin_wen_zi_xun-test/info.html?bgc=F9F4EA&stock_code=' + self.stockCode + (ss.length>0?("."+ss):'') +'&info_type=1';
                self.f10Url =  'https://www.lightyy.com/apps/v3_xin_wen_zi_xun-test/info.html?bgc=F9F4EA&stock_code=' + self.stockCode+(ss.length>0?("."+ss):'') +'&info_type=0';
                //美股
                //log.i("美股");
                if (!self.isTabviewShow){
                  self.isTabviewShow = true;
                }
                if(isFirst){
                  self.isNewsShow=true;
                  self.isFundShow=true;
                  self.isNoticeShow=false;
                  self.isStudyShow=false;
                  self.isF10Show=false;
                  self.isInformationShow=false;
                  self.fundtext ='财务';
                  self.f10text = '资料';

                  self.realTimeRightText12='最高';
                  self.realTimeRightText13='换手率';
                  self.realTimeRightText31='成交额';
                  self.realTimeRightText32='最低';
                  self.realTimeRightText33='量比';

                  self.isShowUSText = true;
                  self.bottomText14 = '成交量';
                  self.bottomText15 = '52周最高';
                  self.bottomText33 = '市净率';
                  self.bottomText35 = '52周最低';
                  showed = 'news';
                }

                self.loadurl(showed);
            }else if(marketType == "MARKET_HK" && productType=="PRODUCT_STOCK"){
                //港股
                //log.i("港股");
                 self.isTabviewShow = false;
                if(isFirst){
                  self.isNewsShow=false;
                  self.isFundShow=false;
                  self.isNoticeShow=false;
                  self.isStudyShow=false;
                  self.isF10Show=false;
                  self.isInformationShow=false;
                  self.realTimeRightText12='最高';
                  self.realTimeRightText13='换手率';
                  self.realTimeRightText31='成交额';
                  self.realTimeRightText32='最低';
                  self.realTimeRightText33='量比';

                  self.bottomText14 = '成交量';
                  self.bottomText15 = '52周最高';
                  self.bottomText33 = '市净率';
                  self.bottomText35 = '52周最低';
                  self.isShowThird = true;
                  showed = 'news';
                }

                self.loadurl("hiddeninfo");
           }else if (productType == "PRODUCT_NEWBLOCK"){
                //新三板
                //log.i("新三板");
                self.isTabviewShow = false;
                self.hide();
                showed = "";
           }else if(productType=="PRODUCT_BLOCK"){
              //板块
              //log.i("板块");
              self.isBidTickDivShow = false;
              self.isTabviewShow = false;
              self.hide();
              showed = "";

              self.realTimeRightText12='最高';
              self.realTimeRightText13='涨家数';
              self.realTimeRightText31='成交量';
              self.realTimeRightText32='最低';
              self.realTimeRightText33='跌家数';
              var type =this.codeType.toUpperCase();
              if(type.indexOf('XBHK')==0)
              {
                  self.realTimeRightText12='最高';
                  self.realTimeRightText13='涨家数';
                  self.realTimeRightText31='成交量';
                  self.realTimeRightText32='最低';
                  self.realTimeRightText33='跌家数';

                  self.bottomText14 = '成交量';
                  self.bottomText15 = '52周最高';
                  self.bottomText33 = '市净率';
                  self.bottomText35 = '52周最低';
                  self.isShowThird = true;
              }
              //self.isShowIcon = false;
              //self.isShowRealTimeBottom = false;
           }else if(marketType == "MARKET_FUTURE"){
                //期货
                //log.i("期货");
                self.informationUrl = 'https://www.lightyy.com/apps/v3_xin_wen_zi_xun-test/info.html?bgc=F9F4EA&stock_code='+ self.stockCode + (ss.length>0?("."+ss):'') +'&info_type=2';
                if (!self.isTabviewShow){
                  self.isTabviewShow = true;
                }
                if(isFirst){
                  self.isNewsShow=false;
                  self.isFundShow=false;
                  self.isNoticeShow=false;
                  self.isStudyShow=false;
                  self.isF10Show=false;
                  self.isInformationShow=true;
                  self.realTimeRightText12='最高';
                  self.realTimeRightText13='持仓';
                  self.realTimeRightText31='成交量';
                  self.realTimeRightText32='最低';
                  self.realTimeRightText33='日增';

                  self.bottomText12 = '振幅';
                  self.bottomText13 = '内盘';
                  self.bottomText14 = '成交额';
                  self.bottomText15 = '涨停';
                  self.bottomText31 = '昨结';
                  self.bottomText32 = '均价';
                  self.bottomText33 = '外盘';
                  self.bottomText34 = '量比';
                  self.bottomText35 = '跌停';
                  showed = 'information';
                }

                self.loadurl(showed);
            }
            else if(productType=="PRODUCT_DEBENTRUE"){
              //债券
              self.isTabviewShow = false;
              self.hide();
              showed = "";
            }
            else if(productType=="PRODUCT_INDEX"){
              //指数
              //log.i("指数");
              self.isBidTickDivShow = false;
              self.isTabviewShow = false;
              self.hide();
              showed = "";

              self.realTimeRightText12='最高';
              self.realTimeRightText13='涨家数';
              self.realTimeRightText31='成交额';
              self.realTimeRightText32='最低';
              self.realTimeRightText33='跌家数';

              self.isShowSecond = false;
              self.isShowThird = false;
              self.bottomText12 = '成交量';
              self.bottomText13 = '振幅';
              self.bottomText14 = '平家数';
              self.bottomText15 = '总家数';
            }
          },

          trendExpand:function(isExpand){
              if(isExpand =='visible'){
                return "trend";
              }else{
                return "trendExPand"
            }
          },
          changeHeight1: function(e){
              if (e.height){
                this.holdwebH1 = e.height;
              }

              if (showed == "news"){
                  this.setWebviewHeight(showed);
              }
          },
          changeHeight2: function(e){
              if (e.height){
                this.holdwebH2 = e.height;
              }

              if (showed == "fund"){
                  this.setWebviewHeight(showed);
              }
          },
          changeHeight3: function(e){
              if (e.height){
                this.holdwebH3 = e.height;
              }

              if (showed == "notice"){
                  this.setWebviewHeight(showed);
              }
          },
          changeHeight4: function(e){
              if (e.height){
                this.holdwebH4 = e.height;
              }

              if (showed == "study_report"){
                  this.setWebviewHeight(showed);
              }
          },
          changeHeight5: function(e){
              if (e.height){
                this.holdwebH5 = e.height;
              }

              if (showed == "f10"){
                  this.setWebviewHeight(showed);
              }
          },
          changeHeight6: function(e){
              if (e.height){
                this.holdwebH6 = e.height;
              }

              if (showed == "information"){
                  this.setWebviewHeight(showed);
              }
          },
          quickSort:function(arr) {
        　　if (arr.length <= 1) { return arr; }
        　　var pivotIndex = Math.floor(arr.length / 2);
        　　var pivot = arr.splice(pivotIndex, 1)[0];
        　　var left = [];
        　　var right = [];
        　　for (var i = 0; i < arr.length; i++){

              if(this.UpFallType=='1'){ //领涨
                   if (Number(arr[i].px_change_rate) < Number(pivot.px_change_rate)) {
          　　　　　　right.push(arr[i])
          　　　　  } else {
          　　　　　　left.push(arr[i]);
          　　　　  }
              }else{
                   if (Number(arr[i].px_change_rate) < Number(pivot.px_change_rate)) {
                     left.push(arr[i])
          　　　　  } else {
          　　　　　　right.push(arr[i]);
          　　　　  }
              }
            }
        　　return this.quickSort(left).concat([pivot], this.quickSort(right));
          },
          sortHq:function(sortType){
            var mic = '000001.XBHS';
            //var marketType =this.getMarkType(this.codeType);
            if (this.stockCode == '1A0001') {
              mic = '000001.XBHS'; //只排序上证市场
            } else if (this.stockCode == '2A01') {
              mic = '399001.XBHS'; //创业
            }else if(this.stockCode=='1B0300') {
              mic='1B0300.SS';
            }
            else {
                mic = this.stockCode + '.'+this.codeType.split('.')[0];
            }
            var that=this;
            var sort_type =sortType?sortType:'1';
            this.getRankingStocksData({'prod_code':mic,'sort_field_name':'px_change_rate','fields':'prod_name,last_px,px_change_rate,hq_type_code','data_count':10,'sort_type':sort_type},function(e){
                if(!that.isPageShow){
                    return;
                  }
                var ss = e.data.sort;
                var fields = ss.fields;
                that.riselist= [];
                for (var a in ss) { // 指数股指，涨跌榜
                  var tmp = {};
                  if ("fields" == a) {
                    continue;
                  }
                  tmp['prod_name'] = ss[a][fields.indexOf('prod_name')];
                  tmp['hq_type_code'] = ss[a][fields.indexOf("hq_type_code")];
                  tmp['prod_code'] = a.split('.')[0];
                  tmp['prod_code_all'] = a;
                  var last_px = ss[a][fields.indexOf('last_px')];
                  var px_change_rate = ss[a][fields.indexOf('px_change_rate')]
                  if (last_px > 0) {
                    tmp['last_px'] = parseFloat(last_px).toFixed(2);
                    tmp['px_change_rate'] = parseFloat(px_change_rate).toFixed(2);
                  } else {
                    tmp['last_px'] = '--';
                    tmp['px_change_rate'] = '--';
                  }
                  tmp['px_change_rate_color'] =that.getColorWithNumber(parseFloat(px_change_rate));
                  that.riselist.push(tmp);
                }
                if(that.riselist.length>4){
                    that.isShowExtandDiv=false;
                }else{
                    that.isShowExtandDiv=true;
                }
                that.riselist=that.quickSort(that.riselist);
                that.risestocks = [];
                for(var i = 0; i < that.riselist.length;i++){
                  var stock = {};
                  stock.stock_code = that.riselist[i].prod_code;
                  stock.code_type = that.riselist[i].hq_type_code;
                  stock.stock_name = that.riselist[i].prod_name;
                  that.risestocks.push(stock);
                }
                //console.log("领涨riselist.length="+that.riselist.length+"newArr="+JSON.stringify(that.riselist));
            });
          },
          getColorWithNumber:function(priceChange){
            if(priceChange>0)
              return "#FF4500";
            else if(priceChange<0)
              return "#3CB371";
            else
              return "#333";
          },
          getRankingStocksData:function(params,callback){
            //板块成份股排序
             quoteDc.loadBlockStocks({'prod_code':params.prod_code,'sort_field_name':params.sort_field_name,'fields':params.fields,'data_count':params.data_count,'sort_type':params.sort_type},callback);
          },
          getPriceChangePercent:function(rate,px_change){
            if(typeof(rate)!="undefined"){
              if(rate==0&& px_change<0) ///涨跌幅为0，但涨跌额小于0的时候，需要显示为-0.00%
              {
                return "-0.00%";
              }
              if(rate>0){
                return "+"+rate+"%";
              }
              return rate+"%";
            }
          },
          goStockDetail: function(item){
            if(stockDetailUserJsHead){
              var data = [];
              data.push(this.risestocks);
              data.push(this.riselist.indexOf(item));
              storage.setItem("stocklist",JSON.stringify(data));
              event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name)+"&hideCutoverImage=" + true + "#/navigator",{headHidden:true});
            }
            else{
              event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "#/stockDetail");
            }
          },
          myStockChange:function(action){
            var that=this;
            if (action == "delete"){
                that.showTip("自选股已删除");
            }else{
                that.showTip("自选股已添加");
            }

            var stock = that.codeType.split('.')[0] + "-" + that.stockCode;
            if (action == "delete"){
               var index = that.myStockData.indexOf(stock);
                that.myStockData.splice(index, 1);
                if (!stockDetailUserJsHead){
                    head.removeButton(null,function(){
                         head.setRightItem({"icon":"addIcon"},function(){
                           that.myStockChange("add");
                         });
                    });
                }


            }else{
                that.myStockData.splice(0, 0, stock);
                if (!stockDetailUserJsHead){
                    head.removeButton(null,function(){
                         head.setRightItem({"icon":"deleteIcon"},function(){
                             that.myStockChange("delete");
                         });
                    });
                }


            }
            var str = that.myStockData.join(',');
            quoteDc.saveMyStocks(str, null);
        },
        showTip:function(message){
          system.showTip(message);
        },
        blockHasMore:function(){
            var fields="prod_name,hq_type_code,last_px,px_change_rate,px_change,business_amount,business_balance,turnover_ratio,preclose_px,pe_rate,dyn_pb_rate,circulation_value,market_value,shares_per_hand";
            var mic = '000001.XBHS';
            //var marketType =this.getMarkType(this.codeType);
            if (this.stockCode == '1A0001') {
              mic = '000001.XBHS'; //只排序上证市场
            } else if (this.stockCode == '2A01') {
              mic = '399001.XBHS'; //创业
            }else if(this.stockCode=='1B0300') {
              mic='1B0300.SS';
            }
            else {
                mic = this.stockCode + '.'+this.codeType.split('.')[0];
            }
            var params = {
                    "prod_code" : mic,
                    "sort_type" : this.upDownSortType,
                    "title" : this.stockName,
            };
            event.openURL(this.baseUrl + "app.native.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + fields + "#/stockrank");
        },
        //针对内盘外盘数据处理
        processAmountData:function(amount,hand){
          if(this.hasData(amount)){
            if(marketType == "MARKET_CN"){
              amount = Number(amount)/Number(hand);
            }
            if(Number(amount)>100000){
              amount = this.formatBigNumber(amount,2);
            }
            else
            {
              amount = Number(amount).toFixed(0);
            }
            return amount;
          }
          return '--';
        },
        realtimeDisAppear:function(e){
          //console.log("realtimeDisAppear="+JSON.stringify(e));
          this.simplePriceShow=true;
        },
        realTimeAppear:function(e){
          //console.log("realtimeDisAppear="+JSON.stringify(e));
          this.simplePriceShow=false;
        },
        isEmptyObject:function(obj){
          for(var key in obj){
              return false;
          }
          return true;
        },
        goLandscape:function(){
          var data = {chartType:this.chartType,tecType:this.tecType};
          storage.setItem("chartInfo",JSON.stringify(data), event=>{});
          event.openURL(this.baseUrl + "app.native.js?stockCode=" + this.stockCode + "&codeType=" + this.codeType + "&stockName=" + encodeURIComponent(this.stockName) + "#/landscapeStockDetail", {landscape:true,headHidden:true});
        },
        onViewappear:function(){
          var that = this;
          that.isPageShow = true;

          LightJSBridge.call("user.getInfo",{},function(data){
                console.log("onViewapper");
                                console.log("1:"+data.data);
                                console.log("2:"+data.data.result);
                                console.log("3:"+data.data.result.extraInfo);
                                console.log("3:"+data.data.result.extraInfo.auth_id);
                that.auth_id = data.data.result.extraInfo.auth_id;
           });

          storage.getItem("kLineMode",e=>{
            if(e.result == "success"){
              if (e.data != this.preKlineMode){
                this.preKlineMode = e.data;
                this.kLineMode = this.preKlineMode;
              }
            }
          });

          storage.getItem("chartInfo",e=>{
              if(e.result == "success"){
                var data = eval("("+e.data+")");
                that.chartType = data.chartType;
                that.tecType = data.tecType;

                var isFind = false;
                for (var i in that.chartArray){

                  if (that.chartArray[i] == that.chartType){
                      that.$refs.jstabbar.$emit('select', that.chartTabItems[i]);
                      isFind = true;
                      break;
                  }

                }
                if (!isFind){
                  for (var i in that.extraChartArray){
                    if (that.extraChartArray[i].type == that.chartType){
                        var extData = {index:i,title:that.extraChartArray[i].title};
                        that.switchMinute(extData);
                        break;
                    }

                 }
                }

                that.doSwitchChart(that.chartType);

                that.getAllData();
              }else{
                //test 代码
                console.log("viewappear 刷新数据");
                that.getAllData();
              }
          });

        },
        onViewdisappear:function(e){
            this.isPageShow = false;

        },
        getAllData:function(){
            var that = this;
            that.getRealtime();

              if(that.isUpDownListShow){
                if(!that.isPageShow){
                    return;
                  }
                  that.sortHq(that.UpFallType);
              }
              that.getTradeDate();
        },
        initAddOrDeleteButton:function(){
            var that = this;
            //自选股列表，添加添加/删除按钮
            quoteDc.getMyStocks(function(res){
                  var oriData = res;//"XSHE-000558,XSHG-600000,XNAS-NTES,XSHE-002094";
                  var stocks = that.codeType.split('.')[0] + "-" + that.stockCode;
                  if (oriData && oriData.indexOf(stocks) > -1){//had added
                      if (stockDetailUserJsHead){
                          that.$emit('rightIconEvt', "delete");
                      }else{
                          head.setRightItem({"icon":"deleteIcon"},function(){
                            that.myStockChange("delete");
                          });
                      }

                  }else{
                      if (stockDetailUserJsHead){
                          that.$emit('rightIconEvt', "add");
                      }else{
                        head.setRightItem({"icon":"addIcon"},function(){
                            that.myStockChange("add");
                        });
                      }
                  }
                  if (oriData.length > 0){
                    that.myStockData = oriData.split(",");
                  }else{
                    that.myStockData = [];
                  }

            });
        },
        initFloatBit:function(){
          var that = this;
          //根据股票类型取小数位
          if(productType == "PRODUCT_FUND" || marketType == "MARKET_US" || (marketType == "MARKET_HK" && productType != "PRODUCT_BLOCK") || (that.codeType.toUpperCase().indexOf("XHKG-I.MRI")>=0) || (marketType=="MARKET_FUTURE" && that.codeType.toUpperCase().indexOf("DEBT")>=0) || that.codeType.toUpperCase().indexOf("NEEQ.LWTS")>=0 || that.codeType.toUpperCase().indexOf("NEEQ.ER")>=0){
              that.bit = 3;
          }
          else if(marketType=="MARKET_FUTURE" && that.codeType.indexOf('FC.')>=0){
              that.bit = 0;
          }
          else if(marketType=="MARKET_FUTURE"){
              that.bit = 1;
          }
        },
        getIosTickCellClass:function(){
          var config =this.$getConfig();
          var platform =config.env.platform;
          //console.log("platform="+platform);
          if(platform=="iOS"){
            return "tickCellWidth";
          }
          return "";
        }
    },

    created:function(){
      //参数初始化
      this.baseUrl=getBaseURL(this);
      this.buyinbuttonsrc=this.baseUrl+"image/buyin.png";
      this.buyoutbuttonsrc=this.baseUrl+"image/buyout.png";
      var that =this;
      var config =this.$getConfig();
      date = common.getNowFormatDate();
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

      marketType =common.getMarkType(this.codeType);
      productType =common.getProductType(this.codeType);
      this.bottonSrc = this.baseUrl + 'image/nb_arrow_down.png';

      storage.removeItem("chartInfo");
      this.setInfoItems(true);
      //获取股票列表
      storage.getItem("stocklist",function(e){
        if(e.result == "success"){
          var data = eval("("+e.data+")");
          stocklist = data[0];
          index = data[1];
        }
      });

      this.initAddOrDeleteButton();


      if((marketType!="MARKET_US" && marketType!="MARKET_HK" && marketType!="MARKET_FUTURE") && (productType!="PRODUCT_INDEX" && productType!="PRODUCT_BLOCK"))
      {
          this.BidTickDivAttr='visible';
      }else{
          //nativeLog("不显示五档和明细");
          this.BidTickDivAttr='hidden';
      }
      if(productType=="PRODUCT_BLOCK" || productType=="PRODUCT_INDEX"){ //沪深或者指数才显示领涨 领跌
          if( (productType =="PRODUCT_INDEX" && marketType=="MARKET_CN") || (marketType=="MARKET_CN" && productType=="PRODUCT_BLOCK") || ((marketType=="MARKET_HK" && productType=="PRODUCT_BLOCK"))){
            this.isUpDownListShow=true; //沪深指数 ，沪深板块，港股板块才显示领涨 领跌
          }else{
              this.isUpDownListShow=false;
          }
      }else{
          this.isUpDownListShow=false;
      }

      if(productType=="PRODUCT_BLOCK" ){ //板块才显示更多
          this.isShowHasMore=true;
          this.isShowExtandDiv=true;
      }else{
          this.isShowHasMore=false;
          if(productType=="PRODUCT_INDEX" &&  marketType=="MARKET_HK"){
              this.extandDivHeight=500;
              this.isShowExtandDiv=true; //港股指数 需要可滑动

          }else{
              this.isShowExtandDiv=false;
          }
      }

      this.initFloatBit();

      this.getChartTabItems(productType);
      this.getChartArray(productType);

      that.getAllData();

      //对于使用js head的，需要监听顶部title左右切换
      this.$on("cutover",function(e){
        //左切
        if(e==1){
            if(index<=0){
                index = stocklist.length - 1;
            }else{
                index--;
            }
        }else{
          if(index>=stocklist.length - 1){
              index = 0;
          }else{
              index++;
          }
        }
        that.stockCode = stocklist[index].stock_code;
        that.codeType = stocklist[index].code_type;
        that.stockName = stocklist[index].stock_name;
        marketType =common.getMarkType(that.codeType);
        productType =common.getProductType(that.codeType);
        var code = that.stockCode;
        if (getAbbreviation(that.codeType).length > 0){
            code = code+"."+getAbbreviation(that.codeType);
        }
        that.stocktitle = stocklist[index].stock_name+"&"+code;
        that.setInfoItems(true);
        that.initFloatBit();
        that.initAddOrDeleteButton();
        that.getAllData();
        //log.i("执行完毕");
      });

      if(common.getMarkType(that.codeType) == "MARKET_CN" && common.getProductType(that.codeType)=="PRODUCT_STOCK"){
         that.buysellshow=true;
         that.buysellAccessoryshow=true;
      }

     // if(common.getMarkType(that.codeType) == "MARKET_HK" && common.getProductType(that.codeType)=="PRODUCT_STOCK"){
     //    that.buysellshow=true;
     //    that.buysellAccessoryshow=true;
     // }

    //  if(common.getMarkType(that.codeType) == "MARKET_FUTURE" && common.getProductType(that.codeType)=="PRODUCT_STOCK"){
    //           that.buysellshow=true;
     //          that.buysellAccessoryshow=true;
     //          that.buybuttonvalue="开仓";
     //          that.sellbuttonvalue="平仓";
     //  }

      //主推
      quoteDc.subscribe({
        stockCode: this.stockCode,
        codeType: this.codeType,
        subType: 1
      }, function(ret) {
        if (!that.isPageShow){
          return;
        }
        that.snapshotdata = ret;

            var stockCode = that.stockCode;
            if (getAbbreviation(that.codeType).length > 0){
                stockCode = stockCode + "."+getAbbreviation(that.codeType);
            }
            if(that.snapshotdata.data.snapshot[stockCode]==null && that.snapshotdata.data.snapshot[that.stockCode]==null){
              return;
            }
            that.getSnapshotdata();
            var fields = that.snapshotdata.data.snapshot.fields;
            var preclose =that.snapshotdata.data.snapshot[stockCode][fields.indexOf("preclose_px")];
            console.log("昨日收盘价="+preclose);
            if(preclose>0){
              if(that.chartType.indexOf('TRENDLINE')!=-1){
                    that.getTrend();
                }else if(that.chartType.indexOf("NETVALUE")!=-1){
                    that.getNetValue();
                }else{
                    that.getKLine();
                }

                if (that.BidTickDivAttr == 'visible'){
                    that.getTick();
                }
            }
            that.setTitle();
      })
    }
  }
</script>
