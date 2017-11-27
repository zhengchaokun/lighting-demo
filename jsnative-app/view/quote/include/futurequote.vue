<!-- Created by 徐成豪 2017.5.19 -->

<template>
	<list style="background-color: #f8f8ff">
		<refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh">
		  <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext" ></text>
        </refresh>
        <cell>
		<div v-for="(row, i) in futureIndexList" class="indexContainer">
			<div v-for="(item, j) in row" class="indexItem" @click="indexonclick(i * 3 + j)">
				<text class="stockName" :value="item.prod_name"></text>
				<text class="stockNewPrice" :value="item.last_px" :style="{ color: item.price_color }"></text>
				<div style="flex-direction: row;">
					<text class="stockPriceChange" :value="getPriceChange(item.px_change)" :style="{ color: item.price_color }"></text>
					<text class="stockPriceChangePercent" :value="getPriceChangePercent(item.px_change_rate, item.px_change)" :style="{ color: item.price_color }"></text>
				</div>
			</div>
		</div>
		<collapseview title="中金所" rightTitle="更多" @rightonclick="onRightClick(ranklistparams[0])">
			<div class="container">
			<div class="typeRow" v-for="row in zjsList">
				<div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
			</div>
			</div>
		</collapseview>
		<collapseview title="上期所" rightTitle="更多" @rightonclick="onRightClick(ranklistparams[1])">
			<div class="container">
			<div class="typeRow" v-for="row in sqsList">
				<div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
			</div>
			</div>
		</collapseview>
		<collapseview title="大商所" rightTitle="更多" @rightonclick="onRightClick(ranklistparams[2])">
			<div class="container">
			<div class="typeRow" v-for="row in dssList">
				<div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
			</div>
			</div>
		</collapseview>
		<collapseview title="郑商所" rightTitle="更多" @rightonclick="onRightClick(ranklistparams[3])">
			<div class="container">
			<div class="typeRow" v-for="row in zssList">
				<div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
			</div>
			</div>
		</collapseview>
		</cell>
	</list>
</template>

<style>
	.indexContainer {
		flex-direction: row;
		background-color: #fff;
	}
	.indexItem {
		flex: 1;
		border-width: 1;
		border-color: #ededed;
	}
	.stockName {
		margin-left: 50;
		margin-top: 25;
		font-size: 28;
		color:#333333;
	}
	.stockNewPrice {
		margin-left: 50;
		margin-top: 10;
		font-size: 36;
		font-weight: 600;
	}
	.stockPriceChange {
		margin-left: 50;
		margin-top: 10;
		margin-bottom: 25;
		font-size: 24;
	}
	.stockPriceChangePercent {
		margin-left: 10;
		margin-top: 10;
		margin-bottom: 25;
		font-size: 24;
	}
	.container {
		padding-top: 15;
		padding-bottom: 15;
	}
	.typeRow {
		flex-direction: row;
		margin-left: 15;
		margin-right: 15;
	}
	.typeItem {
		flex: 1;
		justify-content: center;
		align-items: center;
		border-width: 1;
		border-color: #ccc;
		border-radius: 5;
		margin: 15;
	}
	.typeName {
		font-size: 26;
		color: #666;
		margin: 20;
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
</style>

<script>
	var animation = weex.requireModule('animation');
  	var event = weex.requireModule('event');
 	var stream = weex.requireModule('stream');
 	var getBaseURL = require('./base-url.js').getBaseURL;
 	var stockDetailUserJsHead = require('./common-api.js').common.Constants.stockDetailUserJsHead;
 	var timeHandle = weex.requireModule('timer') || {};
 	var quoteDc = weex.requireModule('dataCenter');
 	var date = '';
 	var common = require('./common-api.js').common;
	module.exports = {
		props:{
			isPageShow:{default:true},
		},
		data: function() {
			return {
				stockNames: ["沪深当月连续", "中证当月连续", "上证当月连续"],
				stockCodes: ["IF0001", "IC0001", "IH0001"],
				codeTypes: ["CCFX.FF.INDEX", "CCFX.FF.INDEX", "CCFX.FF.INDEX"],
				futurestocks: "IF0001.CFFE,IC0001.CFFE,IH0001.CFFE",
				fields: "prod_name,hq_type_code,last_px,px_change_rate,px_change,business_amount,amount,amount_delta,shares_per_hand",
				//假数据占位
				futureIndexList: [
					[	{"prod_name": "-", "last_px": "-", "px_change": "-", "px_change_rate": "-", "price_color": "#f00"},
						{"prod_name": "-", "last_px": "-", "px_change": "-", "px_change_rate": "-", "price_color": "#f00"},
						{"prod_name": "-", "last_px": "-", "px_change": "-", "px_change_rate": "-", "price_color": "#f00"}
					]],
				oldResult: {},
				stockList: [
					{"stockCode": "IF0001", "codeType": "CCFX.FF.INDEX"},
					{"stockCode": "IC0001", "codeType": "CCFX.FF.INDEX"},
					{"stockCode": "IH0001", "codeType": "CCFX.FF.INDEX"}, ],
				zjsList: [
					[
						{"title":"沪深300","markets":"CCFX.FF.INDEX.HS300","en_prod_code":"1B0300.XSHG"},
            			{"title":"中证500","markets":"CCFX.FF.INDEX.ZZ500", "en_prod_code":"1B0905.XSHG"},
            			{"title":"上证50","markets":"CCFX.FF.INDEX.SZ50", "en_prod_code":"1B0016.XSHG"}
          			],
          			[
            			{"title":"国债","markets":"CCFX.FF.DEBT"},
			            "",
			            ""
        			]
				],
				sqsList: [
					[
						{"title":"螺纹钢","markets":"XSGE.FC.REBAR"},
			            {"title":"石油沥青","markets":"XSGE.FC.PITCH"},
			            {"title":"金属","markets":"XSGE.FC.METAL"}
        			],
        			[
			            {"title":"天然橡胶","markets":"XSGE.FC.RUBBER"},
			            "",
			            ""
            		]
				],
				dssList: [
					[
						{"title":"大豆","markets":"XDCE.FC.BEAN"},
			            {"title":"玉米","markets":"XDCE.FC.CORN"},
			            {"title":"棕榈油","markets":"XDCE.FC.PALM"}
        			],
        			[
			            {"title":"铁矿石","markets":"XDCE.FC.INRU"},
			            {"title":"塑料","markets":"XDCE.FC.PETR"},
			            ""
        			]
				],
				zssList: [
					[
						{"title":"棉花","markets":"XZCE.FC.COTTON"},
			            {"title":"白糖","markets":"XZCE.FC.SUGAR"},
			            {"title":"PTA","markets":"XZCE.FC.PTA"}
        			]
				],

				"ranklistparams": [
					{
				    "title": "中金所",
				    "marketslist": [
				      "CCFX.FF.INDEX.HS300",
				      "CCFX.FF.INDEX.ZZ500",
				      "CCFX.FF.INDEX.SZ50",
				      "CCFX.FF.DEBT"
				    ],
				    "marketsnamelist": [
				      "沪深300",
				      "中证500",
				      "上证50",
				      "国债期货"
				    ],
				    "fixed": true
				  },
				  {
				    "title": "上期所",
				    "marketslist": [
				      "XSGE.FC.REBAR",
				      "XSGE.FC.PITCH",
				      "XSGE.FC.SILVER",
				      "XSGE.FC.NISN",
				      "XSGE.FC.GOLD",
				      "XSGE.FC.METAL",
				      "XSGE.FC.RUBBER",
				      "XSGE.FC.COIL",
				      "XSGE.FC.FUEL",
				      "XSGE.FC.WIRE"
				    ],
				    "marketsnamelist": [
				      "螺纹钢",
				      "沥青",
				      "白银",
				      "镍锡",
				      "黄金",
				      "铜铝锌铅",
				      "橡胶",
				      "热轧卷板",
				      "燃油",
				      "线材"
				    ],
				    "fixed": false
				  },
				  {
				    "title": "大商所",
				    "marketslist": [
				      "XDCE.FC.CORN",
				      "XDCE.FC.BEAN",
				      "XDCE.FC.INRU",
				      "XDCE.FC.STARCH",
				      "XDCE.FC.BOIL",
				      "XDCE.FC.PALM",
				      "XDCE.FC.PETR",
				      "XDCE.FC.COAL",
				      "XDCE.FC.EGG",
				      "XDCE.FC.COKE",
				      "XDCE.FC.SLAB"
				    ],
				    "marketsnamelist": [
				      "玉米",
				      "豆类",
				      "铁矿石",
				      "玉米淀粉",
				      "豆油",
				      "棕榈油",
				      "石化期货",
				      "焦煤",
				      "鸡蛋",
				      "焦炭",
				      "板材"
				    ],
				    "fixed": false
				  },
				  {
				    "title": "郑商所",
				    "marketslist": [
				      "XZCE.FC.PTA",
				      "XZCE.FC.MEAL",
				      "XZCE.FC.SUGAR",
				      "XZCE.FC.MA",
				      "XZCE.FC.COTTON",
				      "XZCE.FC.GLASS",
				      "XZCE.FC.STEAMCOAL,XZCE.FC.COAL",
				      "XZCE.FC.WHEAT",
				      "XZCE.FC.METAL",
				      "XZCE.FC.RICE",
				      "XZCE.FC.RAPOIL"
				    ],
				    "marketsnamelist": [
				      "PTA",
				      "菜粕菜油",
				      "白糖",
				      "甲醇",
				      "棉花",
				      "玻璃",
				      "动力煤",
				      "小麦",
				      "硅铁硅锰",
				      "籼稻粳稻",
				      "菜籽"
				    ],
				    "fixed": false
				  }
				],
        baseUrl: "",
        refreshing:'hide',
				refreshtext:'',
				refreshFlag:false,
			}
		},
		components: {
			collapseview: require("./collapseview.vue"),
		},
		methods: {
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
	            this.loadRealtimeList();
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
			indexonclick: function(index) {
				nativeLog("Header stock is clicked");
				if(stockDetailUserJsHead){
	        			event.openURL(this.baseUrl + "navigator.js?stockCode=" + this.stockCodes[index] + "&codeType=" + this.codeTypes[index] + "&stockName=" + encodeURIComponent(this.stockNames[index]),{headHidden:true});
	        	}
	        	else{
					event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + this.stockCodes[index] + "&codeType=" + this.codeTypes[index] + "&stockName=" + encodeURIComponent(this.stockNames[index]));
				}
			},
			onRightClick: function(params) {
				event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields);
			},
			itemonclick: function(params) {
				event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields);
			},
			getRealtimeList: function(callback) {
			  var e = this.futurestocks;
	           quoteDc.loadRealtimeList({'en_prod_code':e,'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code'},callback);
	        },
			getPriceChangePercent:function(rate,px_change) {
				if (typeof(rate) != "undefined") {
					if (rate == 0 && px_change < 0) ///涨跌幅为0，但涨跌额小于0的时候，需要显示为-0.00%
					{
						return "-0.00%";
					}
					if (rate > 0) {
						return "+" + rate + "%";
					}
					return rate + "%";
				}
			},
			getPriceChange:function(rate){
				if(!this.hasData(rate))
					return "0.0";
				if(rate>0)
					return "+"+rate;
				else
					return rate;
			},
			hasData:function(data){
	          if(parseFloat(data).toString() == "NaN") {
	　　　　    return false;
	　　　　   }
	　　　　   return true;
	        },
			loadRealtimeList: function() {
				var that = this;
				this.getRealtimeList(e => {
					if(!that.isPageShow){
						return;
					}
					that.futureIndexList.length = 0;
					var result = e.data.snapshot;
					if(that.oldResult == result || typeof(result) == "undefined" || that.isEmptyObject(result)) {
						return;
					}
		            var fields = result.fields;
		            var r = ["last_px", "px_change", "px_change_rate"];
		            var newArr = [];
		            var j = 0;
		            var futArray =that.futurestocks.split(",");

		            for (var i=0; i < futArray.length; i++){
		            	var key = futArray[i];

		                for (var p = {}, l = 0; l < r.length; l ++){
		                	var decimalPlaces = l <2 ? 1 : 2;
		                    p[r[l]] = parseFloat(result[key][fields.indexOf(r[l])]).toFixed(decimalPlaces);
		                    p.prod_name = result[key][fields.indexOf("prod_name")];
		                    p.prod_code_all = key;
		                    if (p.px_change > 0) {
		                    	p.price_color = "#f00";
		                    } else if (p.px_change < 0) {
		                    	p.price_color = "#090";
		                    } else {
		                    	p.price_color = "#ccc";
		                    }
		                }

		                newArr.push(p);

		                if(j % 3 == 0){ //每行3个
							if(newArr.length > 0){
								that.futureIndexList.push(newArr);

							}
						}

	                    j++;

	                    if (j % 3 == 0){
	                    	newArr = [];
	                    }
	            	}

	            	that.oldResult = result;
		            //console.log("futureIndexList=" + JSON.stringify(that.futureIndexList));
	        	});
			},
	    	isEmptyObject:function(obj){
	     		for(var key in obj){
	          		return false;
	     		}
	     		return true;
			},
			refreshOnTime: function(){
				this.loadRealtimeList();
			}
		},
		created: function() {
			var that = this;
			this.baseUrl = getBaseURL(this);
			date = common.getNowFormatDate();
		}
	}
</script>
