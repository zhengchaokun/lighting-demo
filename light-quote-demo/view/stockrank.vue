<template>
	<div @viewappear="onViewappear" @viewdisappear="onViewdisappear" style="background-color:#F9F4EA;">
		<jstabbar v-if="headtabshow" :tabItems="rankTabItems" @tabBarOnClick="switchRank" :fixed="fixed" height="80" :tabBarBackgroundColor="tabBarBackgroundColor" :titleColor="titleColor" ></jstabbar>
		<div v-if="headinfoshow" @click="headInfoClick(stock)" style="flex-direction: row;background-color:#F9F4EA;justify-content: space-between;align-items: center;padding: 20;height: 110;">
			<div>
				<text style="font-size: 32;" :value="prod_name"></text>
				<text style="font-size: 20; color: #aaa; margin-top: 5;" :value="prod_code_all"></text>
			</div>
			<text style="font-size: 36;" :style="{ color: headInfoColor }" :value="last_px"></text>
			<text class="px_change_rate" :style="{ backgroundColor: headInfoColor }" :value="px_change_rate"></text>
		</div>
		<div v-if="headinfoshow" style="width: 750; height: 2;background-color: #eee;"></div>
		<rankview ref="rankview" :style="{top:rankViewTop}" :titlename="ranktitlename" :titlelist="tablist" :originallist="originalranklist" :bottomlist="ranklist" :isShowRight2="isShowRight2" :fontsize="fontsize"  @ontitleclick="reloadRankList" @onloadingmore="loadingmoredata" @onrefresh="onrefresh" :tableViewBackgroundColor="tableViewBackgroundColor"></rankview>
	</div>
</template>

<style>
	.px_change_rate {
		padding-left: 20;
		padding-top: 10;
		padding-right: 20;
		padding-bottom: 10;
		color: #fff;
		border-radius: 10;
		font-weight: 700;
	}
</style>

<script>
 	var quoteDc = weex.requireModule('dataCenter');
 	var event = weex.requireModule('event');
 	var getBaseURL = require('./include/base-url.js').getBaseURL;
	var getBusiFlag = require('./include/common-api.js').common.getBusiFlag;
	var stockDetailUserJsHead = require('./include/common-api.js').common.Constants.stockDetailUserJsHead;
 	var head = weex.requireModule('head');
  	var timeHandle = weex.requireModule('timer') || {};
  	var common = require('./include/common-api.js').common;
 	//var log = weex.requireModule('jslog');
	module.exports = {
		data: function() {
			return {
				baseUrl: "",
				rankViewTop: 0,
				ranktitlename: "名称/代码",
				tablist: [],
				tabtitlelist: [],
				ranklist: [],
				originalranklist: [],
				oldsort: [],
				prod_code: "",
				markets: "",
				fields: "",
				marketType: "",
				productType: "",
				rankTabItems: [],
				markets_params: {},
				deviceHeight: "",
				fixed: true,
				headtabshow: false,
				sort_type: 1,
				sort_field_name: "px_change_rate",

				headinfoshow: false,
				en_prod_code: "",
				prod_name: "",
				prod_code_all: "",
				last_px: "",
				px_change_rate: "",
				headInfoColor: "#FA3E48",
				stock: {},
				special_marker:-1,

				start_pos: 0,
				isloadingmore: false,
				isShowRight2:true,
				fontsize:22,
				tableViewBackgroundColor:"#F9F4EA",
				tabBarBackgroundColor:"#F9F4EA",
				titleColor:"#666666",
				isPageShow:true,
			}
		},
		components: {
      		rankview: require('./include/rankview.vue'),
      		jstabbar: require('./include/tabbar.vue'),
    	},
		methods: {
			loadTabList: function(fields) {
				var fieldArr = fields.split(",");
				for (var i = 0; i < fieldArr.length; i++) {
					if (fieldArr[i] != "prod_name" && fieldArr[i] != "hq_type_code" && fieldArr[i] != "shares_per_hand") {
						var clickflag = 2;	//2为默认状态，1为降序状态，0为升序状态
						if (fieldArr[i] == "rise_first_grp"
							|| fieldArr[i] == "amount"
							|| fieldArr[i] == "amount_delta"
							|| fieldArr[i] == "premium_rate"
							|| fieldArr[i] == "dyn_pb_rate"
							|| fieldArr[i] == "circulation_value") {
							clickflag = 3;	//3为不可排序
						} else if (fieldArr[i] == this.sort_field_name) {
							if (this.sort_type == 0) {
								clickflag = 0;
							} else if (this.sort_type == 1) {
								clickflag = 1;
							}
						}
						var tabitem = {
							type: fieldArr[i],
							flag: clickflag,
						}
						//板块不显示昨收价，但是要通过昨收价计算其他字段  ||  股票和板块排行都不显示special_marker
						if ((this.productType == "PRODUCT_BLOCK" && fieldArr[i] == "preclose_px") || fieldArr[i] == "special_marker") {
							continue;
						}
						this.tablist.push(tabitem);
						this.tabtitlelist.push(fieldArr[i]);
					}
				}
			},
			loadRankList: function(markets, start_pos, data_count, sort_field_name, fields, sort_type,loading){
				if(this.special_marker == -1){
					quoteDc.loadRankingStocks({'en_hq_type_code':markets,'sort_field_name':sort_field_name,'fields':fields.replace(/,premium_rate/, ""),'start_pos':start_pos,'data_count':data_count,'sort_type':sort_type}, e => this.formatRankData(e, sort_field_name, sort_type, loading));
				}
				else{
					quoteDc.loadRankingStocks({'en_hq_type_code':markets,'sort_field_name':sort_field_name,'fields':fields.replace(/,premium_rate/, ""),'start_pos':start_pos,'data_count':data_count,'sort_type':sort_type,'special_marker':this.special_marker}, e => this.formatRankData(e, sort_field_name, sort_type, loading));
				}
			},
			loadUSRankList: function(prod_code, start_pos, data_count, sort_field_name, fields, sort_type,loading) {
				quoteDc.loadBlockStocks({'prod_code':prod_code,'sort_field_name':sort_field_name,'fields':fields.replace(/,premium_rate/, ""), 'start_pos':start_pos,'data_count':data_count,'sort_type':sort_type}, e => this.formatRankData(e, sort_field_name, sort_type,loading));
			},
			loadRealtimeList: function(en_prod_code) {
			   var e = this.futurestocks;
	           quoteDc.loadRealtimeList({'en_prod_code':en_prod_code, 'fields':"prod_name,prod_code,hq_type_code,last_px,px_change,px_change_rate"}, e => {
	           		var result = e.data.snapshot;
	           		var prodNameIndex = result.fields.indexOf("prod_name");
	           		var lastPxIndex = result.fields.indexOf("last_px");
	           		var pxChangeRateIndex = result.fields.indexOf("px_change_rate");
	           		for (var key in result) {
	           			if (key != "fields") {
	           				this.prod_name = result[key][prodNameIndex];
			           		this.prod_code_all = key;
			           		this.last_px = result[key][lastPxIndex];
			           		this.px_change_rate = this.getPriceChangePercent(result[key][pxChangeRateIndex]);
			           		if(parseFloat(this.px_change_rate).toString() == 'NaN'){
			           			this.px_change_rate = '0.00%';
			           		}
			           		this.headInfoColor = this.getColorWithNumber(result[key][result.fields.indexOf("px_change")]);
			           		this.stock.stockCode = key.split(".")[0];
			           		this.stock.codeType = result[key][result.fields.indexOf("hq_type_code")];
			           		this.stock.stockName = this.prod_name;
	           			}
	           		}
	           });
	        },
			reloadRankList: function(sort_field_name, sort_type) {
				this.sort_field_name = sort_field_name;
				this.sort_type = sort_type;
				if (sort_type == -1) {		//默认排序
					this.ranklist = [].concat(this.originalranklist);
				} else {
					this.isloadingmore = false;
					if (this.prod_code) {
						this.loadUSRankList(this.prod_code, 0, 20, this.sort_field_name, this.fields, this.sort_type);
					} else {
						this.loadRankList(this.markets, 0, 20, this.sort_field_name, this.fields, this.sort_type);
					}
				}

			},
			loadingmoredata: function() {
				this.isloadingmore = true;
				if (this.prod_code) {
					this.loadUSRankList(this.prod_code, this.start_pos, 20, this.sort_field_name, this.fields, this.sort_type,true);
				} else {
					this.loadRankList(this.markets, this.start_pos, 20, this.sort_field_name, this.fields, this.sort_type,true);
				}
			},
	        formatRankData: function(e, sort_field_name, sort_type,loading) {
	        	if (!this.isPageShow || this.$refs.rankview.scrolling){
	        		return;
	        	}
	        	if((!!loading)!=this.isloadingmore){
	        		return;
	        	}
	        	if (!this.isloadingmore) {
	        		this.ranklist=[];
	        		this.start_pos = 0;
	        	}
				var a = e.data.sort;
				if(this.oldsort==a || typeof(a) == "undefined" || this.isEmptyObject(a))
					return;
				var s=a.fields;
	            for (var r in a) {
	                var n = {};
	                if ("fields" != r) {
	                	this.start_pos ++;
		                n.prod_name = a[r][s.indexOf("prod_name")].replace(/^\s+|\s+$/g,"");	//移除字符串前后空格
	                	// if (/.*[\u4e00-\u9fa5]+.*$/.test(n.prod_name)) {	//包含汉字
	                	// 	if(n.prod_name.length>5){
		                //     	n.prod_name = n.prod_name.substring(0,3)+"..."+n.prod_name.substring(n.prod_name.length-2,n.prod_name.length);
		                //     }
	                	// } else {											//不包含汉字
		                //     if(n.prod_name.length>12){
		                //     	n.prod_name = n.prod_name.substring(0,12)+"...";
		                //     }
	                	// }
	                	n.prodNameFontSize=common.calculateSizeByText(n.prod_name);

	                    n.prod_code_all = r;
	                    if(n.prod_code_all.length>15){
	                    	n.prod_code_all = n.prod_code_all.substring(0,15)+"...";
	                    }
	                    n.prod_code = r.split('.')[0];
						n.hq_type_code = a[r][s.indexOf("hq_type_code")];
						n.busiFlag = getBusiFlag(n.hq_type_code, a[r][s.indexOf("special_marker")]);
						var marketType =common.getMarkType(n.hq_type_code);
						var productType =common.getProductType(n.hq_type_code);
							//数据格式化处理
						var decimalplaces = this.getDecimalPlaces(marketType, productType,n.busiFlag,n.hq_type_code);
		                var last_px = this.formatZero(parseFloat(a[r][s.indexOf("last_px")]).toFixed(decimalplaces));
						var last_px_color = this.getColorWithNumber(a[r][s.indexOf("px_change")]);
						var yxdecimalplaces =decimalplaces;
						if(n.hq_type_code.toUpperCase().indexOf("NEEQ.ER")!=-1){
							yxdecimalplaces=3; //优先股涨跌额显示三位
		                }
						var px_change = this.getPriceChange(parseFloat(a[r][s.indexOf("px_change")]).toFixed(decimalplaces),yxdecimalplaces);
	                    var px_change_rate = this.getPriceChangePercent(parseFloat(a[r][s.indexOf("px_change_rate")]).toFixed(2), px_change);
	                    if(parseFloat(px_change_rate).toString() == 'NaN'){
	                    	px_change_rate = "0.00%";
	                    }
						var px_change_rate_color = this.getColorWithNumber(a[r][s.indexOf("px_change")]);
		                var rise_first_grp = a[r][s.indexOf("rise_first_grp")];


						var px_change_color = this.getColorWithNumber(a[r][s.indexOf("px_change")]);
	                    var preclose_px = this.formatZero(parseFloat(a[r][s.indexOf("preclose_px")]).toFixed(decimalplaces));
	                    var open_px = this.formatZero(parseFloat(a[r][s.indexOf("open_px")]).toFixed(2));
						var open_px_color = this.getColorWithNumber(open_px - preclose_px);
	                    var high_px = this.formatZero(parseFloat(a[r][s.indexOf("high_px")]).toFixed(2));
						var high_px_color = this.getColorWithNumber(high_px - preclose_px);
	                    var low_px = this.formatZero(parseFloat(a[r][s.indexOf("low_px")]).toFixed(2));
						var low_px_color = this.getColorWithNumber(low_px - preclose_px);
						var shares_per_hand = a[r][s.indexOf("shares_per_hand")];
	                    var business_amount = this.getAmountFormatData(marketType, parseFloat(a[r][s.indexOf("business_amount")]).toFixed(2), shares_per_hand);
		                var business_balance = this.getBalanceFormatData(parseFloat(a[r][s.indexOf("business_balance")]).toFixed(2));
		                var turnover_ratio = this.getPriceChangePercent(parseFloat(a[r][s.indexOf("turnover_ratio")]).toFixed(2), 0);
		                var amount = this.getBalanceFormatData(a[r][s.indexOf("amount")]);
		                var amount_delta = this.getBalanceFormatData(a[r][s.indexOf("amount_delta")]);

		                var pe_rate = this.formatZero(parseFloat(a[r][s.indexOf("pe_rate")]).toFixed(2));
		                var dyn_pb_rate = this.formatZero(parseFloat(a[r][s.indexOf("dyn_pb_rate")]).toFixed(2));
		                var circulation_value = a[r][s.indexOf("circulation_value")];
		                var market_value = a[r][s.indexOf("market_value")];

		                var iopv = this.formatZero(parseFloat(a[r][s.indexOf("iopv")]/100).toFixed(3));
		                var premium_rate;
		                if (last_px <= 0 || iopv <= 0 || last_px == "--" || iopv == "--") {
		                	premium_rate = "0.00%";
			        	}
			        	else{
			        		premium_rate = (last_px - iopv) / iopv;
			        		if (premium_rate > 1) {
			        			premium_rate = Number(premium_rate).toFixed(0);
			        		}
		                	premium_rate = this.getPriceChangePercent((premium_rate * 100).toFixed(2), 0);
		            	}
		            	if(productType!="PRODUCT_FUND")
		            		premium_rate="--"; //溢价率基金才有

		                var premium_rate_color = this.getColorWithNumber(premium_rate.indexOf("%") != -1 ? premium_rate.substring(0, premium_rate.length - 1) : premium_rate);
		                var d = [];
	                    if (s.indexOf("rise_first_grp") != -1) {	//板块
	                    	d.push({"key": "px_change_rate", "value": px_change_rate, "color": px_change_rate_color});
	                    	if (rise_first_grp == "") {
	                    		d.push({"key": "rise_first_grp", "value": "--", "color": "#000"});
		                    	d.push({"key": "stock_px_change_rate", "value": "--", "color": this.getColorWithNumber(rise_first_grp.split(',')[3])});
	                    	} else {
	                    		d.push({"key": "rise_first_grp", "value": rise_first_grp.split(',')[1], "color": "#000","twolines":true, "stockcode":rise_first_grp.split(',')[0]});
	                    		////领涨股涨跌幅需保留2位
		                    	d.push({"key": "stock_px_change_rate", "value": this.getPriceChangePercent(parseFloat(rise_first_grp.split(',')[3]).toFixed(2), rise_first_grp.split(',')[2]), "color":rise_first_grp.split(',')[3].indexOf("%")>=0 ?this.getColorWithNumber(rise_first_grp.split(',')[3].substring(0,rise_first_grp.split(',')[3].length-1)):this.getColorWithNumber(rise_first_grp.split(',')[3])});
	                    	}
		                   	d.push({"key": "px_change", "value": px_change, "color": px_change_color});
		                   	d.push({"key": "last_px", "value": last_px, "color": last_px_color});
		                   	d.push({"key": "open_px", "value": open_px, "color": open_px_color});
		                   	d.push({"key": "high_px", "value": high_px, "color": high_px_color});
		                   	d.push({"key": "low_px", "value": low_px, "color": low_px_color});
		                   	d.push({"key": "business_amount", "value": business_amount, "color": "#000"});
		                   	d.push({"key": "business_balance", "value": business_balance, "color": "#000"});
		                } else {
		                   	if (s.indexOf("last_px") != -1) {
			                   	d.push({"key": "last_px", "value": last_px, "color": last_px_color});
			                }
			                if (s.indexOf("px_change_rate") != -1) {
			                   	d.push({"key": "px_change_rate", "value": px_change_rate, "color": px_change_rate_color});
			                }
			                if (s.indexOf("px_change") != -1) {
			       	        	d.push({"key": "px_change", "value": px_change, "color": px_change_color});
			                }
			                if (s.indexOf("business_amount") != -1) {
			                  	d.push({"key": "business_amount", "value": business_amount, "color": "#000"});
			                }
			                if (s.indexOf("business_balance") != -1) {
			                   	d.push({"key": "business_balance", "value": business_balance, "color": "#000"});
			                }
			                if (s.indexOf("turnover_ratio") != -1) {
			                   	if (turnover_ratio.indexOf("-") != -1 || turnover_ratio.indexOf("+") != -1) {
			                   		turnover_ratio = turnover_ratio.substring(1);
			                   	}
			                   	d.push({"key": "turnover_ratio", "value": turnover_ratio, "color": "#000"});
			                }
			                if (s.indexOf("preclose_px") != -1) {
			                   	d.push({"key": "preclose_px", "value": preclose_px, "color": "#000"});
			                }
			                if (s.indexOf("amount") != -1) {
			                   	d.push({"key": "amount", "value": amount, "color": "#000"});
			                }
			                if (s.indexOf("amount_delta") != -1) {
			                  	d.push({"key": "amount_delta", "value": amount_delta, "color": "#000"});
			                }
			                if (s.indexOf("iopv") != -1) {
			                  	d.push({"key": "iopv", "value": iopv, "color": "#000"});
			                }
			                if (this.fields.indexOf("premium_rate") != -1) {
			                	if (premium_rate.indexOf("+") != -1) {
			                   		premium_rate = premium_rate.substring(1);
			                   	}
			                   	d.push({"key": "premium_rate", "value": premium_rate, "color": premium_rate_color});
			                }
			                if (s.indexOf("pe_rate") != -1) {
			                	d.push({"key": "pe_rate", "value": pe_rate, "color": "#000"});
			                }
			                if (s.indexOf("dyn_pb_rate") != -1) {
			                	d.push({"key": "dyn_pb_rate", "value": dyn_pb_rate, "color": "#000"});
			                }
			                if (s.indexOf("circulation_value") != -1) {
			                	d.push({"key": "circulation_value", "value": circulation_value, "color": "#000"});
			                }
			                if (s.indexOf("market_value") != -1) {
			                	d.push({"key": "market_value", "value": market_value, "color": "#000"});
			                }
		                }

		                n.data = d;

		                this.ranklist.push(n);
		            }
		        }
	            this.oldsort=a;
	            var list = [].concat(this.ranklist);
				this.ranklist = this.quickSort(list,this.tabtitlelist.indexOf(sort_field_name),sort_type);
				this.$refs.rankview.stocklist = [];
				for(var i = 0; i < this.ranklist.length;i++){
		            var stock = {};
		            stock.stock_code = this.ranklist[i].prod_code;
		            stock.code_type = this.ranklist[i].hq_type_code;
		            stock.stock_name = this.ranklist[i].prod_name;
		            this.$refs.rankview.stocklist.push(stock);
		        }
	            if (this.originalranklist.length == 0) {
	            	this.originalranklist = this.ranklist;
	            }
	        },
	        headInfoClick: function(stock) {
	        	if(stockDetailUserJsHead){
	        			event.openURL(this.baseUrl + "app.native.js?stockCode=" + stock.stockCode + "&codeType=" + stock.codeType + "&stockName=" + encodeURIComponent(stock.stockName) + "#/navigator",{headHidden:true});
	        	}
	        	else{
	        		event.openURL(this.baseUrl + "app.native.js?stockCode=" + stock.stockCode + "&codeType=" + stock.codeType + "&stockName=" + encodeURIComponent(stock.stockName) + "#/stockDetail");
	        	}
	        },
	    	isEmptyObject:function(obj){
	     		for(var key in obj){
	          		return false;
	     		}
	     		return true;
			},
	        getColorWithNumber:function(priceChange){
					if(Number(priceChange)>0)
						return "#FA3E48";
					else if(Number(priceChange)<0)
						return "#249b3a";
					else
						return "#a3a3a3";
	        },
			getPriceChangePercent:function(rate,px_change){
				if(typeof(rate)!="undefined"){
					if (rate.indexOf("%") != -1) {
						rate = rate.substring(0, rate.length - 1);
					}
					var percent;
					if(rate==0&& px_change<0) ///涨跌幅为0，但涨跌额小于0的时候，需要显示为-0.00%
					{
						percent = "-0.00%";
					}
					if(rate>0){
						percent = "+"+rate;
					} else if (rate <= 0) {
						percent = rate;
					} else {
						return "--";
					}
					return percent + "%";
				}
			},
			getPriceChange:function(rate,decimalplaces){
				if (rate > 0) {
					return "+" + rate;
				} else if (rate < 0) {
					return rate;
				} else if(rate == "NaN"){
					if(decimalplaces==3)
						return "0.000";
					else if(decimalplaces==2)
						return "0.00";
					else
						return "--";
				}else if(rate==0){
					if(decimalplaces==3)
						return "0.000";
					else if(decimalplaces==2)
						return "0.00";
					else
						return "0.00";
				}
			},
			getAmountFormatData: function(marketType,amount, shares_per_hand) {
				if (this.formatZero(amount) == "--") {
					return "--";
				}
				if (marketType == "MARKET_CN") {
					return this.amountToHand(amount,shares_per_hand) + "手";
				} else if(marketType=="MARKET_FUTURE"){
					return this.getBalanceFormatData(amount) + "手";
				}
				else if(marketType=="MARKET_HK" || marketType=="MARKET_US") {
					return this.getBalanceFormatData(amount) + "股";
				}else{
					return this.amountToHand(amount,shares_per_hand);
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
			getBalanceFormatData: function(balance) {
				if (balance >= 100000000000) { //万亿
					return parseFloat(balance / 100000000000).toFixed(2) + "千亿";
				}else if(balance >=100000000){ //亿以上
					return parseFloat(balance / 100000000).toFixed(2) + "亿";
				}else if(balance>=100000){ //十万以上
					return parseFloat(balance / 10000).toFixed(2) + "万";
				}else {
					//十万以下
					return this.formatZero(parseFloat(balance).toFixed(0));
				}
			},
	        formatZero: function(num) {
	        	if (num == 0 || num == "NaN") {
	        		return "--";
	        	} else {
	        		return num;
	        	}
	        },
	        getDecimalPlaces: function(marketType, productType,busiFlag,hq_type_code) {
	        	if(busiFlag=="两退"){
	        		return 3;
	        	}
				else if((marketType == "MARKET_CN" && productType=="PRODUCT_STOCK") || productType == "PRODUCT_BLOCK"){
	        		return 2;
	        	}
	        	else if(marketType == "MARKET_FUTURE"){
	        		if(this.markets.indexOf("DEBT")>=0){
	        			return 3;
	        		}
	        		else if(this.markets.indexOf("FC.")>=0){
	        			if(hq_type_code){
	        				var type=hq_type_code.toUpperCase();
		        			if(type.indexOf("XSGE.FC.GOLD")!=-1)
		        				return 2; //黄金最新价、涨跌额保留2位
		        			else if(type.indexOf("XDCE.FC.SLAB")!=-1)
		        				return 2; //板材最新价、涨跌额保留2位
		        			else if(type.indexOf("XZCE.FC.STEAMCOAL")!=-1 || type.indexOf("XZCE.FC.COAL")!=-1)
		        				return 2; //动力煤最新价、涨跌额保留2位
	        			}
	        			return 0;
	        		}
	        		return 1;
	        	}else{
	        		//协议转让、做市转让、股转指数，最新价、涨跌额保留2位小数
	        		if(hq_type_code){
	        			var type=hq_type_code.toUpperCase();
	        			if(type.indexOf("NEEQ.XYZR")!=-1)
	        				return 2;//协议转让
	        			else if(type.indexOf("NEEQ.ZSZR")!=-1)
	        				return 2;//做市转让
	        			else if(type.indexOf("NEEQ.MRI")!=-1)
	        				return 2;//股转指数
	        		}
	        		return 3;
	        	}
	        	return 3;
	        },
	        switchRank: function(e) {
				this.isloadingmore = false;
				this.originalranklist.length = 0;
				this.markets = this.markets_params["marketslist"][e.index];
	        	this.loadRankList(this.markets, 0, 20, "px_change_rate", this.fields, 1);
	        },
	        calculatePremiumRate: function(last_px, iopv) {
	        	var premium;
	        	if (iopv > 0) {
	        		if (last_px > 0) {
	        			premium = last_px - iopv;
	        		} else if (preclose_px > 0) {
	        			premium = preclose_px - iopv;
	        		} else {
	        			premium = 0;
	        		}
	        		return premium / iopv;
	        	} else {
	        		return 0;
	        	}
	        },

	        //控制右边的股票代码时候显示，控制顶部文字
	        setBaseInfo:function(productType){
	        	if(productType == 'PRODUCT_BLOCK'){
	        		this.isShowRight2 = false;
	        		this.ranktitlename = "板块名称";
	        		this.fontsize = 32;
	        	}
	        },

	        searchStock: function() {
				event.openURL(this.baseUrl + "app.native.js#/search");
				//event.openNative("search?jsNativeUrl=" + this.baseUrl + "stockDetail.js");
	        },
	        quickSort:function(arr,type,flag) {
	      　　if (arr.length <= 1) { return arr; }
	      　　var pivotIndex = Math.floor(arr.length / 2);
	      　　var pivot = arr.splice(pivotIndex, 1)[0];
	          var temp = pivot.data[type].value+"";
	          if(temp =='--'){
	          	temp = -10000;
	          }
	          else if(temp.indexOf('%')>=0){
	          	temp = temp.substring(0,temp.length-1);
	          }
	          else if(temp.indexOf('千亿')>=0){
	          	temp = temp.substring(0,temp.indexOf('千亿'));
	          	temp = Number(temp)*100000000000;
	          }
	          else if(temp.indexOf('亿')>=0){
	          	temp = temp.substring(0,temp.indexOf('亿'));
	          	temp = Number(temp)*100000000;
	          }
	          else if(temp.indexOf('万')>=0){
	          	temp = temp.substring(0,temp.indexOf('万'));
	          	temp = Number(temp)*10000;
	          	//log.i("temp:"+temp);
	          }
	      　　var left = [];
	      　　var right = [];
	      　　for (var i = 0; i < arr.length; i++){
	      			//log.i("1:"+temp+"\n"+"2:"+temp2);
	      		  var temp2 = arr[i].data[type].value+"";
	      		  if(temp2 =='--'){
	          		temp2 = -10000;
		          }
		          else if(temp2.indexOf('%')>=0){
		          	temp2 = temp2.substring(0,temp2.length-1);
		          }
		          else if(temp2.indexOf('千亿')>=0){
		          	temp2 = temp2.substring(0,temp2.indexOf('千亿'));
		          	temp2 = Number(temp2)*100000000000;
		          }
		          else if(temp2.indexOf('亿')>=0){
		          	temp2 = temp2.substring(0,temp2.indexOf('亿'));
		          	temp2 = Number(temp2)*100000000;
		          }
		          else if(temp2.indexOf('万')>=0){
		          	temp2 = temp2.substring(0,temp2.indexOf('万'));
		          	temp2 = Number(temp2)*10000;
		          	//log.i("temp2:"+temp2);
		          }
	          	if (parseFloat(temp2) < parseFloat(temp) ){
	          		if(flag==1){
	      　　　　　　	right.push(arr[i]);
	  				}
	  				else{
	  					left.push(arr[i]);
	  				}
	      　　　}
	      		else {
	      			if(flag==1){
	      　　　　　　 	left.push(arr[i]);
	  				}
	  				else{
	  					right.push(arr[i]);
	  				}

	      　　　}
	      　　}
	      　　return this.quickSort(left,type,flag).concat([pivot], this.quickSort(right,type,flag));
      		},
      		//下拉刷新
      		onrefresh:function(){
      			var that = this;
      			this.isloadingmore = false;
      			if (that.prod_code) {
						that.loadUSRankList(that.prod_code, 0, that.start_pos, that.sort_field_name, that.fields, that.sort_type);
					}
				else {
					that.loadRankList(that.markets, 0, that.start_pos, that.sort_field_name, that.fields, that.sort_type);
				}
      		},
      		onViewappear:function(){
      			this.isPageShow = true;
      		},
      		onViewdisappear:function(){
      			this.isPageShow = false;
      		}
		},
		created:function() {
    		this.baseUrl = getBaseURL(this);
			var config =this.$getConfig();
		    var inputParam = config.inputParam;
		    this.deviceHeight = config.env.deviceHeight;

		    if (inputParam){
				//股票字段
				if (inputParam.fields) {
					this.fields = inputParam.fields + ",special_marker";
				}
				//市场参数
				if (inputParam.markets_params) {
					this.markets_params = JSON.parse(decodeURIComponent(inputParam.markets_params));
				}
			}

			//配置市场参数
			if (!this.isEmptyObject(this.markets_params)) {
				if(this.markets_params.title){
					var that = this;
					head.setTitle({"title":decodeURIComponent(this.markets_params.title)});
					head.setRightItem({"icon": "search"}, function() {
						that.searchStock();
					});
				}
				//存在marketslist字段表示stockrank页面需要tabbar进行多个排行的切换
				if (this.markets_params.marketslist) {
					this.headtabshow = true;
					for (var i = 0; i < this.markets_params.marketslist.length; i++) {
						this.rankTabItems.push({index: i, title: this.markets_params.marketsnamelist[i], titleColor: ""});
					}
					if (this.markets_params.type == "block_rank") {
						this.tabBarBackgroundColor = "#F9F4EA";
					}
					this.markets = this.markets_params.marketslist[0];
				} else if (this.markets_params.markets) {
					this.markets = this.markets_params.markets + "";	//Array转String
				}
				if (this.markets_params.special_marker) {
					this.special_marker = this.markets_params.special_marker;
				}
				if (this.markets_params.prod_code) {
					this.prod_code = this.markets_params.prod_code;
				}
				if (this.markets_params.fixed == false) {
					this.fixed = this.markets_params.fixed;
				}
				if (this.markets_params.sort_type) {
					this.sort_type = this.markets_params.sort_type;
				}
				if (this.markets_params.sort_field_name) {
					this.sort_field_name = this.markets_params.sort_field_name;
				}
				if (this.markets_params.en_prod_code != "undefined" && this.markets_params.en_prod_code != undefined && this.markets_params.en_prod_code != "") {
					this.en_prod_code = this.markets_params.en_prod_code;
					this.headinfoshow = true;
				}
			}

			if (this.headtabshow) {
				this.rankViewTop += 80;
			}
			if (this.headinfoshow) {
				this.rankViewTop += 110;
			}
			if (this.rankViewTop != 0 && this.rankViewTop % 10 == 0) {
				this.rankViewTop ++;	//增加1px，避免挡住分隔线
			}

			this.marketType = common.getMarkType(this.markets);
			this.productType = common.getProductType(this.markets);
			//log.i("代码："+this.productType);
			this.setBaseInfo(this.productType);

			//板块头部信息
			if (this.headinfoshow) {
				this.loadRealtimeList(this.en_prod_code);
			}

			//滑动tab
			this.loadTabList(this.fields);

			//初始化列表数据
			this.isloadingmore = false;
			if (this.prod_code) {
				this.loadUSRankList(this.prod_code, 0, 20, this.sort_field_name, this.fields, this.sort_type);
			} else {
				this.loadRankList(this.markets, 0, 20, this.sort_field_name, this.fields, this.sort_type);
			}

			//轮询接口
			var that = this;
		    timeHandle.setInterval(function() {
				if(that.$refs.rankview.scrolling){
			    		//log.i("停止刷新");
			    		return;
			    	}
		    	if (that.isPageShow){
		    		that.isloadingmore = false;
					if (that.prod_code) {
						that.loadUSRankList(that.prod_code, 0, that.start_pos, that.sort_field_name, that.fields, that.sort_type);
					} else {
						that.loadRankList(that.markets, 0, that.start_pos, that.sort_field_name, that.fields, that.sort_type);
					}
		    	}

		    }, 5000);
		}
	}
</script>
