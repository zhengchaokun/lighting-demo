<template>
	<div @viewappear="onViewappear" @viewdisappear="onViewdisappear" style="background-color:#F9F4EA;">
		<!-- 指数 -->
		<div>
		   	<div v-for="(v,i) in cnIndexList" class="cnIndex">
	        		<div v-for="(item,k) in v" class="indexItem" @click="onIndexItem(item)">
                  <div style="height:100px;width:200px">
  	        			  <text style="flex:1;font-size: 38;font-weight: 600;margin-left: 10;" :class="[getColorWithPriceChange(item.px_change)]">{{item.last_px}}</text>
  		          		<div style="flex-direction:row;flex:1;margin-left: 10;align-items:center;margin-top:-40;">
  			          		<text style="margin-right:2px;font-size: 26;color:gray;">{{item.prod_name}}</text>
  			          		<text :class="[getColorWithPriceChange(item.px_change)]" style="margin-left:2px;font-size:26;">{{getPriceChangePercent(item.px_change_rate,item.px_change)}}</text>
  		          		</div>
                  </div>
	        		</div>
	      	</div>
		</div>

    <div style="flex-direction: row;background-color:#F9F4EA;border-bottom-width:1;
    border-bottom-color: #EAEAEA">
      <div style="flex-direction: row; flex:3; margin:10;margin-left: 40;padding:10;" @click="onShowSelecBoard">
        <text style="font-size: 28;" :value="selectMarket"></text>
        <image style="width:16;height:8;margin-left:6;margin-top:12;" :src="baseUrl+'image/tabbar_down.png'"> v</image>
      </div>
      <div style="flex-direction: row; flex:1;margin:10;margin-right:40; padding:10;justify-content:center;" @click="onNewPrice">
        <text style="font-size: 28;">最新价</text>
        <image :src="priceOrderIcon" style="width:26;height:26;"></image>
      </div>
      <div style="flex-direction: row; flex:1; margin:10; margin-right: 10;padding:10;justify-content:center;" @click="onChangeRate">
        <text style="font-size: 28;">涨跌幅</text>
        <image :src="rateOrderIcon" style="width:26;height:26;"></image>
      </div>
  </div>
  <list class="content">
    <refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh" >
      <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext"></text>
    </refresh>
    <cell v-for='stock in stockList' class="itemcell" style="height:92" @click="goStockDetail(stock)">
      <!-- <text class="lefttext" ></text> -->
      <div style="flex:60;">
        <div style="flex-direction: row;">
          <marketicon :icon="stock.marketicon" style="width:40; margin-right:4;"></marketicon>
          <text style="width:260;font-size: 32px;color:#333333;text-overflow:ellipsis;lines:1;" :value="stock.prod_name" ></text>
        </div>
        <div style="flex-direction: row;margin-left:44;">
          <text style="font-size: 20;color:#999999;" :value="stock.prod_code_all" ></text>
          <busiFlagIcon :iconItems="stock.busiFlag"></busiFlagIcon>
        </div>

      </div>
      <text  :value="stock.last_px" style="flex:30;font-size: 36;margin:4; margin-right:40;padding:10;text-align:right;font-weight: 600;" :style="{color:stock.color}"></text>
      <text style="flex:30;font-size:36;margin:12; margin-right: 10;padding:10; text-align:center; border-radius: 8; color:#ffffff" :style="{backgroundColor:stock.color}">{{getPriceChangePercent(stock.px_change_rate,0)}}</text>
    </cell>
  </list>
  <popoverview style="position: absolute; top: 184;left: 10;" v-if="isShowSelecBoard" @extraTabOnClick="onSwitchMarket" :extraItems="selectItems"></popoverview>
  <div v-if="isShowAddStockBut" style="position: absolute; top: 200;left: 0; width:630;margin-top:15;margin-left:60;margin-right:60;" @click="onAddStocks">
    <text style="padding: 0;color:gray;text-align:center;font-size:260;border-radius: 20;border-width:1;">+</text>
    <text style="color:gray;text-align:center;">请点击上面的加号添加自选</text>
  </div>


	</div>

</template>

<style>
	.cnIndex{
		flex-direction: row;
		height: 100px;
    margin-top: 20;
	}
  .indexItem{
    flex:1;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #ddd;
  }
	.item{
		flex:1;
		justify-content: center;
		align-items: center;
		border-bottom-width: 1px;
		border-bottom-color: #ddd;
	}
  .itemcell{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom-width:1;
    border-bottom-color: #EAEAEA;
  }
	.riselist{
		height: 600px;
	}
	.riseColor{
    color: #FA3E48;
  }
  .fallColor{
    color:#249b3a;
  }
  .stableColor{
    color: #a3a3a3;
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
  .HK{
    width:40;
    margin-right:4;
    border-top-right-radius: 6;
    border-bottom-right-radius:6;
    background-color:orange;
    color:white;
    font-size: 24;
  }
  .usicon{
    width:40;
    margin-right:4;
    border-top-right-radius: 6;
    border-bottom-right-radius:6;
    background-color:blue;
    color:white;
    font-size: 24;
  }
  .future{
    width:40;
    margin-right:4;
    border-top-right-radius: 6;
    border-bottom-right-radius:6;
    background-color:blue;
    color:white;
    font-size: 24;
  }
</style>

<script>
 	var event = weex.requireModule('event');
 	var getBaseURL = require('./include/base-url.js').getBaseURL;
  var common = require('./include/common-api.js').common;
  var getAbbreviation = require('./include/common-api.js').common.getAbbreviation;
 	var timeHandle = weex.requireModule('timer') || {};
 	var date = '';
 	var quoteDc = weex.requireModule('dataCenter');
 	var head = weex.requireModule('head');
  var event = weex.requireModule('event');
  var stockDetailUserJsHead = require('./include/common-api.js').common.Constants.stockDetailUserJsHead;
  const storage = weex.requireModule('storage');
  //var log = weex.requireModule('jslog');
	module.exports ={

		data:function(){

			return {
		    cnstocks:"1A0001.SS,2A01.SZ,399006.SZ",
				cnIndexList:[],
				oldcnIndexList:[],
				baseUrl: "",
				refreshing:'hide',
				refreshtext:'',
				refreshFlag:false,
				riselist:[],
				oldriselist:[],
        stockList: [],
        defStockList: [],
        currStockList: [],
        priceOrderIcon: "",
        rateOrderIcon: "",
        newPriceOrderType: -1,
        changeRateOrderType: -1,
        defIndexList:[],
        oriMarketTypeList: [],
        stockMarketIconList:[],
        reqParams: "",
        isShowSelecBoard: false,
        filters:[{"title":"沪深", "markets":["XSHG","XSHE"]},
                 {"title":"港股", "markets":["XHKG"]},
                 {"title":"期货", "markets":["CCFX","XSGE","XDCE","XZCE"]},
                 {"title":"其他", "markets":["XBHS","XBHK","NEEQ","CSI","XFCC"]}
                 ],
        selectItems: [],
        marketType: 0,
        selectMarket: "全部",
        baseUrl:'',
        isShowAddStockBut: false,
        isPageShow: true,
			}
		},
		methods:{
		  //下拉
      onpullingdown: function(event){
        var refreshData = common.pullDownRefreshUpdateStatus(this.refreshtext,this.refreshFlag,date,"ING",event);
        this.refreshtext = refreshData.refreshtext;
        this.refreshFlag = refreshData.refreshFlag;
      },
      //完成刷新
      onrefresh:function(){
        var self = this;
        if(this.refreshFlag){
          this.refreshtext = '正在刷新...'+ '\n' +'最后更新:'+date;
          this.loadRealtimeList();
          this.onUpdate();
          date = this.getNowFormatDate();
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
      onRefreshFunc:function(){
          this.loadRealtimeList();
          this.onUpdate();
      },
      //获取时间函数
      getNowFormatDate:function(){
        var currentdate = common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
        return currentdate;
      },
			getPriceChangePercent:function(rate,px_change){
        return common.getPriceChangePercent(rate,px_change);
			},
			getPriceChange:function(rate){
        common.getPriceChange(rate);
			},
			getRealtimeList:function(e,callback){
	           quoteDc.loadRealtimeList({'en_prod_code':e,'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code,special_marker,trade_status'},callback);
	        },
	        getColorWithPriceChange:function(priceChange){
              return common.getColorWithPriceChange(priceChange);
	        },
	        getColorWithNumber:function(priceChange){
  					  return common.getColorWithNumber(priceChange);
	        },

	        onIndexItem: function(item){
	        	if(item.gmu){
					     event.openNative(item.gmu,{"pageId":item.pageId});
	        	}else{
              if(stockDetailUserJsHead){
                event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "#/navigator",{headHidden:true});
              }
              else
              {
	        		 event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "#/stockDetail");
              }
	        	}
	        },
			goStockDetail: function(item){
		        if(stockDetailUserJsHead){
					var data = [];
                    var switchStockList = [];
                    for (var i in this.stockList){
						var tmpObject = {
							stock_code: this.stockList[i].prod_code,
							code_type:this.stockList[i].hq_type_code,
							stock_name:this.stockList[i].prod_name
						};
						switchStockList.push(tmpObject);
                    }
                    data.push(switchStockList);
                    data.push(this.stockList.indexOf(item));
                    storage.setItem("stocklist",JSON.stringify(data));
                  	event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name)+"&hideCutoverImage=" + true + "#/navigator",{headHidden:true});
		        }
		        else{
					event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "#/stockDetail");
		        }
			},

			 //判断是否有数据
	        hasData:function(data){
	          if(parseFloat(data).toString() == "NaN") {
	　　　　    return false;
	　　　　  }
	　　　　  return true;
	        },
			loadRealtimeList:function(){
				var that=this;
	    		//that.baseUrl = getBaseURL(this);
	    		//console.log("baseUrl=" + that.baseUrl);
        if (!that.cnstocks || that.cnstocks == ""){
            return;
        }
				this.getRealtimeList(that.cnstocks,e =>{
					that.cnIndexList=[];
					var result=e.data.snapshot;
					if(that.oldcnIndexList==result || typeof(result) == "undefined" || that.isEmptyObject(result))
						return ;
		            var fields = result.fields;
		            var r = ["last_px", "px_change", "px_change_rate"];
		            var newArr=[];
		            var j=0;
		            for (var key in result){
		                if ("fields" != key) {
		                    for (var p = {}, l = 0; l < r.length; l++){
		                        p[r[l]] = result[key][fields.indexOf(r[l])];
		                        p.prod_name = result[key][fields.indexOf("prod_name")];
                            if ("上证指数" == p.prod_name){
                                p.prod_name = "上证";//保持与native一样页面
                            }else if("深证成指" == p.prod_name){
                                p.prod_name = "深证";//保持与native一样页面
                            }else if("创业板指" == p.prod_name){
                                p.prod_name = "创业板";//保持与native一样页面
                            }
		                        p.prod_code_all = key;
		                        p.prod_code = key.split('.')[0];

		                        p.hq_type_code = result[key][fields.indexOf("hq_type_code")];
		                        if(!that.hasData(p.last_px)){
		                        	p.last_px="--";
		                        }

		                        if(!that.hasData(p.px_change)){
		                        	p.px_change="0.00%";
		                        }
		                        //n.push(p);
		                    }
		                    if(j%3==0){ //每行3个
								if(newArr.length>0){
									that.cnIndexList.push(newArr);
									newArr=[];
								}
							}
							newArr.push(p);
		                    j++;
		                }
	            	}
	            	that.oldcnIndexList=result;
		            if(that.cnIndexList.length*3<that.cnstocks.length+1){
		            	that.cnIndexList.push(newArr);
		            	newArr=[];
		            }
				});
			},
      loadMyStocksList:function(){
        var self = this;
        quoteDc.getMyStocks(function(res){
            var oriData = res;//"XSHE-000558,XSHG-600000,XNAS-NTES,XSHE-002094";
            var stocksArr = oriData.split(",");
            self.reqParams = "";
            self.oriMarketTypeList = [];
            self.defIndexList = [];
            self.defStockList = [];
            for(var i in stocksArr){
                if (self.reqParams.length > 0){
                  self.reqParams += ","
                }
                var idx = stocksArr[i].lastIndexOf('-');
                var marketT = "", key = "",simpleKey="";
                if (idx > 0){
                  marketT = stocksArr[i].substring(0, idx);
                  key = stocksArr[i].substring(idx+1) + "." + marketT;
                  var ss = getAbbreviation(marketT);
                  simpleKey=stocksArr[i].substring(idx+1) + (ss.length>0?("." + ss):'');
                }else{
                  continue;
                }
                self.reqParams +=  key;
                self.oriMarketTypeList.push(marketT);

                self.defIndexList.push(simpleKey);
                var temp = {};
                self.defStockList.push(temp);
            }
            self.intSelectList();
            self.onUpdate();
        });
      },
			onUpdate:function(){
        var self = this;
        if (self.reqParams == ""){
          self.switchMarket(self.marketType);
          self.isShowAddStockBut = true;
          return;
        }
        self.isShowAddStockBut = false;
        self.getRealtimeList(self.reqParams, function(data){
          console.log("allan="+JSON.stringify(data));
          var ss = data.data.snapshot;
          var fields = ss.fields;
          for (var a in ss) {
              var tmp = {};
              if ("fields" == a) {
                  continue;
              }
              var specialM = ss[a][fields.indexOf("special_marker")];
              tmp['prod_name'] = ss[a][fields.indexOf('prod_name')];
              tmp['prod_code'] = a.split('.')[0];
              tmp['prod_code_all'] = a;
              tmp['hq_type_code'] = ss[a][fields.indexOf("hq_type_code")];
              tmp['last_px'] = ss[a][fields.indexOf('last_px')];
              tmp['px_change_rate'] = ss[a][fields.indexOf('px_change_rate')];
              tmp.trade_status =ss[a][fields.indexOf('trade_status')];
              if (tmp['px_change_rate'] == "--"){
                tmp['px_change_rate'] = "0.00%"
              }
              var changeRate = parseFloat(tmp['px_change_rate']);

              tmp['color'] = common.getRateColor(changeRate);

              if(a.indexOf("null")!=-1){
                  var sstemp = getAbbreviation(tmp.hq_type_code);
                  tmp["prod_code_all"] =tmp.prod_code+(sstemp.length>0?("."+sstemp):'');
              }
              var idx = self.defIndexList.indexOf(tmp["prod_code_all"]);
              if(tmp.trade_status=="STOPT" || tmp.trade_status =="HALT"){
                tmp.px_change_rate="停牌";
                //n.px_change_rate_color =""
              }
              tmp['marketicon']= self.getMarketIcon(idx,tmp['hq_type_code']);
              tmp['busiFlag'] = common.getBusiFlag(tmp.hq_type_code,specialM);
              self.defStockList[idx] = tmp;
          }
          //
          self.switchMarket(self.marketType);
      });
		},
    isEmptyObject:function(obj){
	     		for(var key in obj){
	          		return false;
	     		}
	     		return true;
		},
        sortList:function(arr,key, orderType){
      　　if (arr.length <= 1) {
            return arr;
          }
          var order;
          order = function(src, min){
                  if (!src){
                    src = 0;
                  }
                  if (!min){
                    min = 0;
                  }
                  if (orderType)
                    {return src < min;}
                  else{
                    return src > min;
                  }
          };
      　　var pivotIndex = Math.floor(arr.length / 2);
      　　var pivot = arr.splice(pivotIndex, 1)[0];
      　　var left = [];
      　　var right = [];
      　　for (var i = 0; i < arr.length; i++){
            if (order(parseFloat(arr[i][key]), parseFloat(pivot[key]))) {
      　　　　　right.push(arr[i])
      　　　} else {
      　　　　　left.push(arr[i]);
      　　　}
      　　}
      　　return this.sortList(left, key, orderType).concat([pivot], this.sortList(right, key, orderType));
        },

        onOrderIcon: function(type, orderType){
          if (type == "price"){
            if (orderType == 0){
              this.priceOrderIcon = common.getImagePath(this.baseUrl,"sort_arrow_up.png");
            }else if (orderType == 1){
              this.priceOrderIcon = common.getImagePath(this.baseUrl,"sort_arrow_down.png");
            }else{
              this.priceOrderIcon = common.getImagePath(this.baseUrl,"sort_other.png");
            }

            this.rateOrderIcon = common.getImagePath(this.baseUrl,"sort_other.png");
            this.changeRateOrderType = -1;

          }else{
            if (orderType == 0){
              this.rateOrderIcon = common.getImagePath(this.baseUrl,"sort_arrow_up.png");
            }else if (orderType == 1){
              this.rateOrderIcon = common.getImagePath(this.baseUrl,"sort_arrow_down.png");
            }else{
              this.rateOrderIcon = common.getImagePath(this.baseUrl,"sort_other.png");
            }
            this.priceOrderIcon = common.getImagePath(this.baseUrl,"sort_other.png");
            this.newPriceOrderType = -1;
          }
          console.log("priceOrderIcon"+this.priceOrderIcon);
        },

        onNewPrice:function(e){
          this.newPriceOrderType = this.sortListByField("last_px",this.newPriceOrderType);
        },
        onChangeRate:function(e){
          this.changeRateOrderType= this.sortListByField("px_change_rate",this.changeRateOrderType);
        },

        sortListByField:function(fieldName,orderType) {

          orderType--;
          if (orderType < -1){
              orderType = 1;
          }

          this.onOrderIcon("changeRate",orderType);

          if (orderType != -1){
            this.stockList = this.sortList(this.stockList, fieldName, orderType);
          }else{
            this.stockList = this.currStockList.concat();
          }
          return orderType;
        },

        refreshList: function(){
          console.log("newPriceOrderType"+this.newPriceOrderType+"   changeRateOrderType"+this.changeRateOrderType);
            if (this.newPriceOrderType != -1){
                this.stockList = this.sortList(this.stockList, "last_px", this.newPriceOrderType);
            }else if (this.changeRateOrderType != -1){
                this.stockList = this.sortList(this.stockList, "px_change_rate", this.changeRateOrderType);
            }
        },
        onViewappear:function(){
            console.log("onViewappear");
            this.loadMyStocksList();
            this.isPageShow = true;
        },
        onViewdisappear:function(){
            this.isPageShow = false;
        },
        onShowSelecBoard: function(){
            this.isShowSelecBoard = !this.isShowSelecBoard;
        },
        onSwitchMarket: function(e){
          if (this.marketType != e.index){
              this.marketType = e.index;
              this.isShowSelecBoard = false;

              for (var i in this.selectItems){
                  if (this.marketType == i){
                    this.selectItems[i].color = "#fa3e48";
                  }else{
                    this.selectItems[i].color = "#666";
                  }
              }

              this.selectMarket = this.selectItems[this.marketType].title;
              this.switchMarket(this.marketType);
          }

        },
        intSelectList: function(){

              for (var k = 0; k < this.oriMarketTypeList.length; k++){
                this.stockMarketIconList[k] = -1;
              }
              this.selectItems = [];
              this.selectItems.push({index:0, title: "全部(" + this.defIndexList.length + ")" });
              for(var i = 0; i< this.filters.length; i++){
                var markets = this.filters[i].markets;
                var title = this.filters[i].title;
                var number = 0;
                for (var j = 0; j < this.oriMarketTypeList.length; j++){
                  for (var x= 0; x < markets.length; x++){
                    if (this.oriMarketTypeList[j].indexOf(markets[x]) > -1 ){
                      this.stockMarketIconList[j] = i;
                      number++;
                      break;
                    }
                  }
                }
                this.selectItems.push({index: i+1, title: title + "(" + number + ")"});
              }
              //选择颜色
              this.selectItems[this.marketType].color="#fa3e48";
        },
        getMarketIcon:function(idx,codeType){
            if (idx < this.stockMarketIconList.length){
              var i = this.stockMarketIconList[idx];
              console.log("getMarketIcon i="+i);
              if (i == -1 || i >= this.filters.length){
                  return "other";
              }
              return common.getMarketIcon(codeType);
            }else{
              return "other";
            }
        },
        switchMarket:function(marketType){
            if (marketType == 0){//all
              this.currStockList = this.defStockList.concat();
            }else{
              var markets = this.filters[marketType - 1].markets;
              this.currStockList = [];
              for (var j = 0; j < this.oriMarketTypeList.length; j++){
                  for (var x= 0; x < markets.length; x++){
                    if (this.oriMarketTypeList[j].indexOf(markets[x]) > -1 ){
                      this.currStockList.push(this.defStockList[j]);
                      break;
                    }
                  }
              }
            }

            this.stockList = this.currStockList.concat();
            this.refreshList();
        },
        onAddStocks:function(){
          event.openURL(this.baseUrl + "app.native.js#/search");
          //event.openNative("search?jsNativeUrl=" + this.baseUrl + "stockDetail.js");
        }

		},
		components: {
      		popoverview: require('./include/popoverview.vue'),
          marketicon: require('./include/marketicon.vue'),
          busiFlagIcon: require('./include/busiFlagIcon.vue'),
    	},
    	created:function(){



        var self = this;
    		self.baseUrl = getBaseURL(this);
        self.priceOrderIcon = common.getImagePath(this.baseUrl,"sort_other.png");
        self.rateOrderIcon = common.getImagePath(this.baseUrl,"sort_other.png");
        console.log("rateOrderIcon"+this.rateOrderIcon);
        self.loadMyStocksList();
        self.loadRealtimeList();
        date = self.getNowFormatDate();
        head.setTitle({"title": "自选股"});
    	head.setRightItem({"icon":"search"},function(){
            event.openURL(self.baseUrl + "app.native.js#/search");
        });
        head.setLeftItem({"title":"编辑"},function(){
            event.openURL(self.baseUrl + "app.native.js#/stockedit");
        });
		    var intervalId=function(){
		    	//nativeLog("刷新cn行情数据ok");
	            timeHandle.setInterval(function(){
                if (self.isPageShow){
                  self.loadRealtimeList();
                  self.onUpdate();
                }
	            },5000);
		    };
		    intervalId();
    	}
	};

</script>
