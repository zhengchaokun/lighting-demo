<template>
  <div @viewappear="onViewapper" @viewdisappear="onViewdisappear">        
		  <div class="realtime">
          <!-- 左边-->
          <div style="margin-top:10; flex-direction: row;justify-content: space-around;align-items: center;">
            <text style="font-size:19;text-align:center;">{{stockName}}</text>
            <text style="margin-left:5; color:gray;font-size:17;text-align:center;">{{stockDisplay}}</text>
            <text style="margin-left:5; font-size:16;text-align:center;" :style="{color:preLastColor}">{{preLast+'(' + preDiff2 + ')'}}</text>
          </div>
          <!-- 第一排-->
          <div class="realtimeRight">
            <div class="realtimeRightTextDiv">
              <text style="font-size:14;color:gray;" :value="realTimeRightText11"></text>
              <text style="font-size:14;" :value="realTimeRightText21"></text>
            </div class="realtimeRightTextDiv">
            <div class="realtimeRightTextDiv">
              <text style="font-size:14;color:gray;" :value="realTimeRightText12"></text>
              <text style="font-size:14;" :value="realTimeRightText22"></text>
            </div class="realtimeRightTextDiv">
            <div class="realtimeRightTextDiv">
              <text style="font-size:14;color:gray;" :value="realTimeRightText13"></text>
              <text style="font-size:14;" :value="realTimeRightText23"></text>
            </div>
            <div class="realtimeRightTextDiv">
              <text style="font-size:14;color:gray;" :value="realTimeRightText14"></text>
              <text style="font-size:14;" :value="realTimeRightText24"></text>
            </div>
          </div>
          <image style="width:55;height:55;" :src="baseUrl+'image/landscape_close.png'" @click="onClose"></image>
      </div>
      <!-- 分时，5日等导航栏 -->
      <focusinfo v-if="isShowFocusInfo" landscape="true" :hsparams='hsParamsData' style="height:30;" :class="[foucusMarginStyle(isFocusMargin)]"></focusinfo>
      <jstabbar v-if="!isShowFocusInfo" ref="jstabbar" height="30" fontSize=16 :selectedIndex="tabIdx" :tabItems="chartTabItems" @tabBarOnClick="switchType"></jstabbar>
      <div class="contentDiv">
          <div class="trendDiv">
            <chartview landscape="true" :stockcode='stockCode' :codetype='codeType' :chartType='chartType' :techtype="techType" :klinemode="kLineMode" :snapshotdata='snapshotdata' :trenddata='trenddata' :klinedata='klinedata' :netvaluedata='netvaluedata' @showline="showLine" @hideline="hideLine" :class="[trendExpand(chartType,isBidTickDivShow)]"></chartview>
            <div v-if="isBidTickDivShow" style="width:125;">
                <div class="tabbidtrade" style="width:115;">
                    <text :style="{ color: bidcolor,flex:1}" @click="switchBidAndTrade(0)" class="detailtext" >五档</text>
                    <text :style="{ color: tradecolor,flex:1}" @click="switchBidAndTrade(1)" class="detailtext">明细</text>
                </div>
                <div style="position:absolute; flex: 12;left:0;top:51;right:10;bottom:0;width:115;" :style="{ visibility: isShowBidofferList ? 'visible':'hidden'}">
                      <div style="flex:1;" v-for="item in bidofferList">
                        <div style="flex-direction: row;margin-top:10;" >
                          <text class="bidOffer" :value="item.title"></text>
                          <text class="bidOffer2" :value="item.price" :style="{color: item.color}" ></text>
                          <text class="trade" :value="item.volume" ></text>
                        </div>  
                        <div style="backgroundColor:#C9C9C9;height:1;margin-top:10;" v-if="item.title == '卖1' "></div>
                      </div>
                    </div>
                <div style="position:absolute;flex: 12;left:0;top:51;right:10;bottom:0;width:115;" :style="{ visibility: isShowKTick ? 'visible':'hidden'}">
                      <list enableScrollInScrollView=true>
                        <cell v-for='item in tradedataList'>
                          <div style="flex-direction: row;height:20;" :class="[getIosTickCellClass()]">
                            <text class="bidOffer3" :value="item.time"  ></text>
                            <text class="bidOffer2" :value="item.price" :style="{color:item.colorp}" ></text>
                            <text class="trade" :value="item.volume" :style="{color:item.colorv}" ></text>
                          </div>
                        </cell>
                      </list> 
                    </div>               
            </div>
            <div v-if="isShowKLine" style="width:125px" :class="[getIosChartHeightClass()]">
              <list v-if="isCandleMode" style="margin-left:10;border-top-width:1;border-top-color:gray;width:60;height:60;">
                <cell v-for='(item,index) in kLineModes' style="width:60;border-left-width:1; border-right-width: 1; border-color:gray;">
                    <text class="techItem" :value="item.text" :style="{backgroundColor:item.selected?'#EAEFF4':'#ffffff'}" @click="onKlineMode(index)"></text>
                </cell>
              </list>
              <list style="width:60;border-width:1;border-color:gray;margin-top:10;margin-left:10;">
                <cell v-for='(item,index) in techTypes'>
                    <text class="techItem" :value="item.text" :style="{backgroundColor:item.selected?'#EAEFF4':'#ffffff'}" @click="onTechType(index)"></text>
                </cell>
              </list>
            </div>
          </div>
      </div>
  </div> 
</template>

<style>
  .realtime{
    flex-direction: row;
    align-items: center;
    padding-left: 10;
    padding-right: 10;
    padding-bottom: 10;
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
    margin-top:10;
    margin-left: 30px;
    margin-right:15px;
    justify-content: space-around;
    align-items: flex-start;
  }
  .realtimeRightTextDiv{
    flex:1;
  }

  .realtimeBottomTextStyle{
    flex:1;
    font-size: 20px;
    text-align: left;
    margin-left: 20px;
    margin-top:10px;
    color:#9C9C9C;
  }
  .realtimeBottomTextStyle2{
    flex:1;
    font-size: 20px;
    text-align: left;
    margin-left: 20px;
    margin-top:5px;
    color:#000000;
  }
  .bar{
    margin-top: 60px;
  }
  .tabtrip{
   /* flex:1;*/
    height: 60px;
    justify-content:flex-start;
  }
  .contentDiv{
   /* flex:2;*/
    position: absolute;
    width: 750px;
    flex-direction: row;
    margin-bottom: 10;
    top:100;
    left: 0; 
    right: 0; 
    bottom: 0;
    justify-content:flex-start;
  }
  .trendDiv{
    flex:3;
    margin-top: 5px;
    width: 750px;
    flex-direction: row;
  }
  .trend{
    width: 625px;
  }
  .trendExPand{
    width: 750px;
  }
  .klineDiv{
    width: 670px;
  }
  .tabbidtrade {
    height: 41;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10;
  }
  .tabStrip{
    flex: 1;
    margin-right: 10px;
  }
  .bidOfferList{
    flex: 8;
  }
  .tickView{
    flex: 8;
  }
  .detailList{
    text-overflow:ellipsis;
    flex:1;
    margin-left:20px;
  }
    .text {
        justify-content:center;
        font-size: 30px;
        padding-left: 10;
        padding-right: 10;
        padding-top:7px;
        text-align: center;
        padding-bottom: 10px;
        border-bottom-color: red;
    }
    .detailtext{
      flex: 1;
      text-align: center;
      font-size: 17;
      background-color: #F5F5F5;
      border-color: #eaeaea;
      border-top-width: 0.5wx;
      border-left-width: 0.5wx;
      border-bottom-width: 0.5wx;
      padding-top: 12;
    }
    .detailtext2{
      flex: 1;
      text-align: center;
      font-size: 17;
      background-color: #F5F5F5;
      border-color: #eaeaea;
      border-width: 0.5wx;
      padding-top: 12;
    }
    .bidOffer{
      flex:2;
      font-size:10px;
      text-align:left;
      color: #7B7B7B;
      left:10px;
    }
    .bidOffer2{
      flex:4;
      font-size:10px;
      text-align:left;
      color:#FF4500;
      left:20px;
    }
    .bidOffer3{
      flex:4;
      font-size:10px;
      text-align:left;
      color:#7B7B7B;
      left:10px;
    }
    .trade{
      flex:6;
      font-size:10px;
      color:#7B7B7B;
      text-align:right;
      right:10px;
    }
    .techItem{
      border-bottom-width:1;
      border-bottom-color: gray;
      text-align:center;
      font-size:12;
      padding:6;
    }

    .chartHeight{
      height: 320px;
    }
    .tickCellWidth{
      width: 120px;
    }
</style>

<script>
  var stream = weex.requireModule('stream');
  var quoteDc = weex.requireModule('dataCenter');
  var timeHandle = weex.requireModule('timer') || {};
  var head = weex.requireModule('head');
  var system = weex.requireModule('system');
  var event = weex.requireModule('event');
  var getBaseURL = require('./include/base-url.js').getBaseURL;
  var getAbbreviation = require('./include/common-api.js').common.getAbbreviation;
  const storage = weex.requireModule('storage');
  //var log = weex.requireModule('jslog');
  var preclose;
  var hand = 1;
  var date = ''; 
  var tradeDate = ''; 
  var tradeZone = 480; 
  var common = require('./include/common-api.js').common;
  var productType;
  var marketType;
  var index = 0;
   module.exports = {
    props:{
      stocktitle:{default:""},
    },
    data: function () {
      return {
        stockCode:'',
        codeType:'',
        stockName:'',
        stockDisplay:'',
        chartType:'TRENDLINE',
        preLastColor:"#FF4500",    
        preLast:"--",
        preDiff:"--",
        preDiff2:"--",
        realTimeRightText11:'开盘',
        realTimeRightText12:'最高',
        realTimeRightText13:'换手率',
        realTimeRightText14:'成交额',
        realTimeRightText21:'--',
        realTimeRightText22:'--',
        realTimeRightText23:'--',
        realTimeRightText24:'--',
        isShowKLine:false,
        isShowBidofferList:true,
        isShowKTick:false,
        isBidTickDivShow:false,
        notNeedShowBidTick:false,
        isShowFocusInfo: false,
        isFocusMargin:false,
        isCandleMode:false,
        chartTabItems: [],

        snapshotdata:{},
        trenddata:{},
        klinedata:{},
        tradedata:{},
        hsParamsData:{},
        netvaluedata:{},
        bidcolor: "#FF3030",
        tradecolor: "#000000",
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
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
          {time:'--:--',volume:'—',price:'—',colorp:'#FF4500',colorv:'#FF4500'},
        ],
        techTypes:[{text:'成交量',selected:false,value:'VOMLUME'},
                    {text:'MACD',selected:false,value:'MACD'},
                    {text:'KDJ',selected:false,value:'KDJ'},
                    {text:'RSI',selected:false,value:'RSI'},
                    {text:'BOLL',selected:false,value:'BOLL'},
                    {text:'W%R',selected:false,value:'WR'},
                    {text:'BIAS',selected:false,value:'BIAS'},
                    {text:'ASI',selected:false,value:'ASI'},
                    {text:'VR',selected:false,value:'VR'},
                    {text:'DMA',selected:false,value:'DMA'},
                    {text:'PSY',selected:false,value:'PSY'},
                    {text:'OBV',selected:false,value:'OBV'},
                    {text:'CCI',selected:false,value:'CCI'}],
        kLineModes:[{text:"前复权",selected:false,value:"CANDLE_FORWARD"},
                    {text:"不复权",selected:false,value:"CANDLE_ORIGINAL"}],
        techIdx: 0,
        techType:'VOMLUME',
        modeIdx: 0,
        kLineMode:'CANDLE_FORWARD',
        baseUrl:'',  
        tabIdx: -1,
        isShowPage:true
       }
    },
    components: {
      jstabbar: require('./include/tabbar.vue'),
    },
    methods:{
        getTradeDate:function(){
          var that = this;
          quoteDc.loadMarket({codeType:this.codeType},function(ret){
              if (!that.isShowPage){
                  return;
              }
              tradeDate = String(ret.result.trade_Date);
              tradeZone = ret.result.timezone;
          });
        },
	    getRealtime:function(){
          var that =this;
          quoteDc.loadRealtime({stockCode:this.stockCode,codeType:this.codeType},function(ret){
            //console.log("allan realtime=" + JSON.stringify(ret));
            if (!that.isShowPage){
                  return;
              }
            that.snapshotdata = ret;
            that.getSnapshotdata();
            that.getTick();
            //that.setTitle();
          });
        },
        getTrend:function(){
          var that =this;
          quoteDc.loadTrend({stockCode:this.stockCode,codeType:this.codeType,chartType:this.chartType},function(ret){
            //nativeLog(JSON.stringify(ret));
            if (!that.isShowPage){
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
            if (!that.isShowPage){
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
            if (!that.isShowPage){
                  return;
              }
            nativeLog(JSON.stringify(ret));
            that.netvaluedata =ret;
          });
        },
        getTick:function(){
          var that =this;
          // nativeLog("loadTickView");
          quoteDc.loadTick({stockCode:this.stockCode,codeType:this.codeType},function(ret){
            //log.e(JSON.stringify(ret));
            if (!that.isShowPage){
                  return;
              }
            var stockCode = that.stockCode;
            if (getAbbreviation(that.codeType).length>0){
                stockCode = stockCode +"."+ getAbbreviation(that.codeType);
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
              console.log("snapshotdata=" + JSON.stringify(that.snapshotdata));
            for(bid;bid<that.snapshotdata.data.snapshot.fields.length;bid++){
              if(that.snapshotdata.data.snapshot.fields[bid] == 'bid_grp'){
                biddata = that.snapshotdata.data.snapshot[stockCode][bid];
              }
               else if(that.snapshotdata.data.snapshot.fields[bid] == 'offer_grp'){
                offerdata = that.snapshotdata.data.snapshot[stockCode][bid];
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] =='preclose_px'){
                  preclose = that.snapshotdata.data.snapshot[stockCode][bid];
                  //log.i("昨日收盘价"+preclose);
                  if(parseFloat(preclose)==0){
                    preclose="--";
                  }
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] =='shares_per_hand'){
                hand = that.snapshotdata.data.snapshot[stockCode][bid];
                //log.i("手:"+hand);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'last_px'){
                last = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(last)==0){
                  last = '--';
                }
                 //log.i("最新报价"+last);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'open_px'){
                open = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(open)==0){
                  open = '--';
                }
                // log.i("开盘价"+open);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'high_px'){
                  high = that.snapshotdata.data.snapshot[stockCode][bid];
                  if(parseFloat(high)==0){
                  high = '--';
                }
                  // log.i("最高价"+high);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'low_px'){
                low = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(low)==0){
                  low = '--';
                }
                // log.i("最低价"+low);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'iopv'){
                iopv = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(iopv)==0){
                  iopv = '--';
                }
                 //log.i("净值"+iopv);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'business_amount'){
                volume = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(volume)<=0){
                  volume = '--';
                }
                //log.i("成交量"+volume);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'amount_delta'){
                amountdelta =  that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(amountdelta)==0){
                  amountdelta = '--';
                }
                // log.i("日增"+amountdelta);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'amount'){
                amount = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(amount)==0){
                  amount = '--';
                }
                // log.i("持仓"+amount);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'turnover_ratio'){
                turnover = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(last).toString()=='NaN'){
                  turnover = '--';
                }
                // log.i("换手率"+turnover);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'business_balance'){
                totalmaney = that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(totalmaney)==0){
                  totalmaney = '--';
                }
                // log.i("成交额"+totalmaney);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'rise_count'){
                risecount= that.snapshotdata.data.snapshot[stockCode][bid];
                if(parseFloat(risecount)==0){
                  risecount = '--';
                }
                // log.i("涨家数"+risecount);
              }
              else if(that.snapshotdata.data.snapshot.fields[bid] == 'trade_status'){
                trade_status = that.snapshotdata.data.snapshot[stockCode][bid];
              }
            }

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
                    if(bidArr[i*3+1]/hand >=100000){
                      that.bidofferList[5+i].volume = that.formatBigNumber(bidArr[i*3+1]/hand,2);
                    }
                    else
                    {
                      that.bidofferList[5+i].volume = Number(bidArr[i*3+1]/hand).toFixed(0);
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
                    if(offerArr[i*3+1]/hand >=100000){
                      that.bidofferList[4-i].volume = that.formatBigNumber(offerArr[i*3+1]/hand,2);
                    }
                    else
                    {
                      that.bidofferList[4-i].volume = Number(offerArr[i*3+1]/hand).toFixed(0);
                    }
                  }else{
                    that.bidofferList[4-i].price = '--';
                    that.bidofferList[4-i].volume = '--';
                  }
              }
            }   
            
          }

          var bit = 2;
          var leftclose = preclose;
          //根据股票类型取小数位
          if(productType == "PRODUCT_FUND" || marketType == "MARKET_US" || (marketType == "MARKET_HK" && productType != "PRODUCT_BLOCK") || (that.codeType.toUpperCase().indexOf("XHKG-I.MRI")>=0) || (marketType=="MARKET_FUTURE" && that.codeType.toUpperCase().indexOf("DEBT")>=0) || that.codeType.toUpperCase().indexOf("NEEQ.LWTS")>=0 || that.codeType.toUpperCase().indexOf("NEEQ.ER")>=0){
            bit = 3;
          }
          else if(marketType=="MARKET_FUTURE" && that.codeType.indexOf('FC.')>=0){
            bit = 0;
          }
          else if(marketType=="MARKET_FUTURE"){
            bit = 1;
          }

          //左边数据处理
          if(marketType=="MARKET_FUTURE"){
            leftclose = prevsettlement;
          }
          if(that.hasData(last)){
            that.preLast = that.formatBigNumber(last,bit);
          }
          if(that.hasData(preclose)){
            preclose = that.formatBigNumber(preclose,bit);
          }
          if(common.getTradeStatus(trade_status) == '停牌'){
            that.preLast = '停牌';
          }
          if(that.hasData(last)&&that.hasData(leftclose)){
              that.preDiff = Math.abs((last-leftclose).toFixed(bit));
              if(Number(last-leftclose)>=0){
                  that.preLastColor = "#FF4500";
                  that.preDiff = "+"+that.preDiff.toFixed(bit);
                  that.preDiff2 = "+"+that.formatBigNumber((that.preDiff/leftclose*100),2)+"%";
              }
              else{
                that.preLastColor = "#3CB371";
                that.preDiff = "-"+that.preDiff.toFixed(bit);
                that.preDiff2 = that.formatBigNumber((that.preDiff/leftclose*100),2)+"%";
              }
          }
          else
          {
            that.preLastColor = "#ADADAD";
            that.preDiff = Number(0).toFixed(bit);
            that.preDiff2 = "0.00%";
          }
          //开盘
          if(that.hasData(open)){
            open = that.formatBigNumber(open,bit);
          }
          else
          {
            open = '--';
          }
          //最高
          if(that.hasData(high)){
            high = that.formatBigNumber(high,bit);
          }
          else
          {
            high = '--';
          }

          //涨家数
          if(that.hasData(risecount)){
            risecount = that.formatBigNumber(risecount,0);
          }
          else
          {
            risecount = '--';
          }

          //净值
          if(that.hasData(iopv)){
            iopv = that.formatBigNumber(iopv/100,bit);
          }
          else
          {
            iopv = '--';
          }
          //成交量
          volume = that.getVolume(volume,hand,marketType);
          //持仓
          if(that.hasData(amount)){
            if(Number(amount)>=100000)
            {
              amount = that.formatBigNumber(amount,2);
            }
            else
            {
              amount = that.formatBigNumber(amount,0);
            }
          }
          else
          {
            amount = '--';
          }
          //成交额
          if(that.hasData(totalmaney)){
            if(totalmaney<100000)
              totalmaney = that.formatBigNumber(totalmaney,0); 
            else
              totalmaney = that.formatBigNumber(totalmaney,2); 
          }
          else
          {
            totalmaney = '--';
          }

          //手
          if(that.hasData(hand)){
            hand = that.formatBigNumber(hand,0); 
          }
          //换手率
          if(that.hasData(turnover)){
            turnover = Number(turnover).toFixed(2)+"%";
          }
          else
          {
            turnover = '--';
          }
          //数据注入
          //所有股票开盘，最高最低位置相同,统一注入
          that.realTimeRightText21 = open;
          that.realTimeRightText22 = high;
          //不同类型股票数据不同
          //
          //基金
          if(productType == "PRODUCT_FUND"){
            that.realTimeRightText23 = iopv;
            that.realTimeRightText24 = volume;
          }
          //期货
          else if(marketType == "MARKET_FUTURE"){
            that.realTimeRightText23 = amount;
            that.realTimeRightText24 = volume;
          }
          //指数
          else if(productType == "PRODUCT_INDEX"){
            that.realTimeRightText23 = risecount;
            that.realTimeRightText24 = totalmaney;
          }
          //板块
          else if(productType == "PRODUCT_BLOCK"){
            that.realTimeRightText23 = risecount;
            that.realTimeRightText24 = volume;
          }
          else {
            that.realTimeRightText23 = turnover;
            that.realTimeRightText24 = totalmaney;
          }
          
        },
        getVolume:function(volume,hand,marketType){ //成交量处理
            if(!this.hasData(volume) || Number(volume)<=0)
              return "--";
            if(marketType=="MARKET_FUTURE"){ //期货不需要除每手股数
              return this.amountToString(volume,1)+"手";
            }else if(marketType=="MARKET_CN"){
              //A股以手为单位
              return this.amountToHand(volume,hand)+"手";
            }else if(marketType=="MARKET_US" ||  marketType =="MARKET_HK") {
              //美股、港股以股为单位
              var result = this.amountToString(volume,1);
               if(result == '--'){
                return result;
               }
               return result + "股";
            }else{
                return this.amountToHand(volume,hand);
            }
        },
        amountToString:function(amount,bs){
              var absvalue= Math.abs(amount);
              if(bs>0){
                  absvalue=absvalue*bs;
              }
              var absvalueStr="";
              if(absvalue==0)
              return "--";
              if (absvalue >= 100000000000) { //万亿
                absvalueStr=parseFloat(absvalue / 100000000000).toFixed(2) + "千亿";
              }else if(absvalue >=100000000){ //亿以上
                absvalueStr=parseFloat(absvalue / 100000000).toFixed(2) + "亿";
              }else if(absvalue>=100000){ //十万以上
                absvalueStr=parseFloat(absvalue / 10000).toFixed(2) + "万";
              }else {
                //十万以下
                absvalueStr=this.formatZero(parseFloat(absvalue).toFixed(0));
              }
              if (amount < 0) {
                absvalueStr="-"+absvalueStr;
              }   
              return absvalueStr;
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
        formatZero: function(num) {
            if (num == 0 || num == "NaN") {
              return "--";
            } else {
              return num;
            }
        },
        getChartTabItems: function (productTypes) {
          if (productTypes == 'PRODUCT_FUND') {    //基金
            this.chartTabItems = [
            {index: 0, title: '分时', titleColor: '',type:"TRENDLINE"}, 
            {index: 1, title: '净值', titleColor: '',type:"NETVALUE"}, 
            {index: 2, title: '日K', titleColor: '',type:"KLINEDAY"}, 
            {index: 3, title: '周K', titleColor: '',type:"KLINEWEEK"}, 
            {index: 4, title: '月K', titleColor: '',type:"KLINEMONTH"}, 
            {index: 5, title: '1分', titleColor: '',type:"KLINE1MIN"}, 
            {index: 6, title: '5分', titleColor: '',type:"KLINE5MIN"}, 
            {index: 7, title: '15分', titleColor: '',type:"KLINE15MIN"}, 
            {index: 8, title: '30分', titleColor: '',type:"KLINE30MIN"}, 
            {index: 9, title: '60分', titleColor: '',type:"KLINE60MIN"}];
          } else {
            this.chartTabItems = [
            {index: 0, title: '分时', titleColor: '',type:"TRENDLINE"}, 
            {index: 1, title: '5日', titleColor: '',type:"TRENDLINE5DAY"}, 
            {index: 2, title: '日K', titleColor: '',type:"KLINEDAY"}, 
            {index: 3, title: '周K', titleColor: '',type:"KLINEWEEK"}, 
            {index: 4, title: '月K', titleColor: '',type:"KLINEMONTH"}, 
            {index: 5, title: '1分', titleColor: '',type:"KLINE1MIN"}, 
            {index: 6, title: '5分', titleColor: '',type:"KLINE5MIN"}, 
            {index: 7, title: '15分', titleColor: '',type:"KLINE15MIN"}, 
            {index: 8, title: '30分', titleColor: '',type:"KLINE30MIN"}, 
            {index: 9, title: '60分', titleColor: '',type:"KLINE60MIN"}];
          }
        },
        switchType: function (e) {
          nativeLog("the clicked index is " + e.index);
          if(e.index<this.chartTabItems.length){
            this.chartType = this.chartTabItems[e.index].type;
            this.doSwitchChart(this.chartType);
            var data = {chartType:this.chartType,tecType:this.techType};            
            storage.setItem("chartInfo",JSON.stringify(data), event=>{});
          }
        },
        doSwitchChart: function (chartType) {
          if(chartType.indexOf('TRENDLINE')!=-1){
            this.isShowNetValue=false;
            this.isShowKLine=false;
            this.getTrend();
            if(chartType != 'TRENDLINE'){
               this.isBidTickDivShow=false;
            }else{
               if (this.notNeedShowBidTick){
                  this.isBidTickDivShow=true;
               }
               
               this.bidcolor = "#FF3030";
               this.tradecolor = "#000000";
               this.isShowBidofferList=true;
               this.isShowKTick =false;
            }
         }else{
            this.isBidTickDivShow=false;
            if(chartType.indexOf("NETVALUE")!=-1){
              this.isShowNetValue=true;
              this.isShowBidofferList=false;
              this.isShowKTick =false;
              this.getNetValue();
            }else{
              this.isShowKLine=true;
              this.isShowNetValue=false;
              this.isShowBidofferList=false;
              this.isShowKTick =false;
              this.getKLine();
            }
         }
        },

        //数据进行格式化
        formatBigNumber:function(number,bit){
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
              amountStr = num.toFixed(bit);
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

      showLine: function (event) {
        this.isShowFocusInfo = true;
        
        this.hsParamsData = event.hsParams;
      },
      hideLine: function (event) {
        this.isShowFocusInfo = false;
      },

      start:function(event) {
      },
      finish:function(event) {
      },
      error:function(event) {
      },
      switchBidAndTrade:function(index) {
        var that=this;
        switch(index) {
          case 0:
            that.isShowBidofferList=true;
            that.isShowKTick =false;
            that.getSnapshotdata();
            that.bidcolor = "#FF3030";
            that.tradecolor = "#000000";
            break;
          case 1:
            that.isShowBidofferList=false;
            that.isShowKTick =true;
            that.getTick();
            that.bidcolor = "#000000";
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

          setInfoItems: function(isload){
            var self = this;
            if(productType == "PRODUCT_FUND") {
                  //基金
                  if(isload==1){
                    self.realTimeRightText13='净值';
                    self.realTimeRightText14='成交量';
                  }
            }else if(productType=="PRODUCT_BLOCK"){
              //板块
              self.realTimeRightText13='涨家数';
              self.realTimeRightText14='成交量';

           }else if(marketType == "MARKET_FUTURE"){
                //期货
                self.realTimeRightText13='持仓';
                self.realTimeRightText14='成交量';
            }
            else if(productType=="PRODUCT_INDEX"){
              //指数
              //log.i("指数");
              self.isBidTickDivShow = false;
              self.realTimeRightText13='涨家数';
              self.realTimeRightText14='成交额';
            }

            if (marketType == "MARKET_CN" && productType=="PRODUCT_STOCK"){
              self.isCandleMode = true;
            }
          },
          
          trendExpand:function(type,isExpand){
              if(type.indexOf('TRENDLINE')!=-1){
                  if(isExpand){
                    return "trend";
                  }else{
                    return "trendExPand";
                  }
              }else if(type.indexOf("NETVALUE")!=-1){
                  return "trendExPand";
              }else{
                return "klineDiv";
              }
          },
        
          getColorWithNumber:function(priceChange){
            if(priceChange>0)
              return "#FF4500";
            else if(priceChange<0)
              return "#3CB371";
            else 
              return "#333";
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
          
        showTip:function(message){
          system.showTip(message);
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
        isEmptyObject:function(obj){  
          for(var key in obj){
              return false;
          } 
          return true;
        },
        onTechType:function(idx){
          if (idx < this.techTypes.length){
            this.techTypes[this.techIdx].selected = false;
            this.techTypes[idx].selected = true;
            this.techIdx = idx;
            this.techType = this.techTypes[idx].value;
            var data = {chartType:this.chartType,tecType:this.techType};            
            storage.setItem("chartInfo",JSON.stringify(data), event=>{console.log("allan setItem=" + idx);});
          }
        },
        onKlineMode:function(idx){
            if(idx < this.kLineModes.length){
              this.kLineModes[this.modeIdx].selected = false;
              this.kLineModes[idx].selected = true;
              this.modeIdx = idx;
              this.kLineMode = this.kLineModes[idx].value;
              storage.setItem("kLineMode",this.kLineMode, event=>{});
              this.getKLine();
            }
        },
        initKlineMode:function(){
            storage.getItem("kLineMode",e=>{
                console.log("allan= " + JSON.stringify(e));
                if(e.result == "success"){
                  var data = e.data;
                  for(var i in this.kLineModes){
                    if (this.kLineModes[i].value == data){
                      this.kLineModes[i].selected = true;
                      this.modeIdx = i;
                      this.kLineMode = data;
                      break;
                    }
                  }
                }else{
                  this.kLineModes[0].selected = true;
                  this.modeIdx = 0;
                }
            })
        },
        onClose:function(e){
            head.back();
        },
        getIosChartHeightClass:function(){
          //ios横屏模式下 k线图扩展有问题，需要价格高度 android没有问题
          var config =this.$getConfig();
          var platform =config.env.platform;
          if(platform=="iOS"){
            return "chartHeight";
          }
          return "";
        },
        getIosTickCellClass:function(){
          var config =this.$getConfig();
          var platform =config.env.platform;
          if(platform=="iOS"){
            return "tickCellWidth";
          }
          return "";
        },
        onViewapper:function(){
          console.log("allan landscape onViewapper ...");
          this.isShowPage = true;
          this.getRealtime();
          if(this.chartType.indexOf('TRENDLINE')!=-1){
              this.getTrend();
          }else if(this.chartType.indexOf("NETVALUE")!=-1){
            this.getNetValue();
          }else{
            this.getKLine();
          }
          this.getTradeDate();
        },
        onViewdisappear:function(){
          console.log("allan landscape onViewdisappear...");
          this.isShowPage = false;
        }
    },

    created:function(){
      this.baseUrl=getBaseURL(this);
      var that =this;
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

          this.stockDisplay = this.stockCode;
          if (getAbbreviation(this.codeType).length > 0){
               this.stockDisplay = this.stockDisplay + "." + getAbbreviation(this.codeType);
          }
      }
      marketType =common.getMarkType(this.codeType);
      productType =common.getProductType(this.codeType);
      this.setInfoItems(1);
      this.initKlineMode();
      var that=this;
      nativeLog("marketType="+marketType +"productType="+productType);
      if((marketType!="MARKET_US" && marketType!="MARKET_HK" && marketType!="MARKET_FUTURE") && (productType!="PRODUCT_INDEX" && productType!="PRODUCT_BLOCK"))
      {
        this.notNeedShowBidTick = true;
      }else{
        //nativeLog("不显示五档和明细");
        this.notNeedShowBidTick = false;
      }

      this.getChartTabItems(productType);
      storage.getItem("chartInfo",function(e){
        //console.log("allan=" + JSON.stringify(e));
        if(e.result == "success"){
          var data = eval("("+e.data+")");
          that.chartType = data.chartType;
          that.techType = data.tecType;
          for (var i in that.chartTabItems){
            if (that.chartTabItems[i].type == that.chartType){
                that.$refs.jstabbar.$emit('select', that.chartTabItems[i]);
                break
            }
            
          }

          for(var j in that.techTypes){
            if (that.techTypes[j].value == that.techType){
                that.techIdx = j;
                break
            }
          }
          that.techTypes[that.techIdx].selected = true;

          that.doSwitchChart(that.chartType);
          that.getRealtime();
          that.getTradeDate();
        }
      });
	    
      timeHandle.setInterval(function(){
            if (that.isShowPage){
                that.getRealtime();
                if(that.chartType.indexOf('TRENDLINE')!=-1){
                    that.getTrend();
                }else if(that.chartType.indexOf("NETVALUE")!=-1){
                  that.getNetValue();
                }else{
                  that.getKLine();
                }
                that.getTradeDate();
            }
          },5000);        
    }
  }
</script>
