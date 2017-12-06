<template>
	<list>
		<!-- 指数 -->

		<refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh" >
		  <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext"></text>
        </refresh>
        <cell>
		<div>
		   	<div v-for="(v,i) in cnIndexList" class="cnIndex">
	        		<div v-for="(item,k) in v" class="indexItem" @click="onIndexItem(item)">
						<div style="height:164px;width:200px">
							<div style="flex-direction:column;">
								<div style="flex-direction:row;justify-content:center;">
		        					<image v-if="item.src!=''" style="margin-top:20px;width:90;height:82;" :src="item.src"></image>
								</div>
		        				<text v-if="item.src!=''"style="flex:1;font-size:28px;color:#333333;text-align:center;">{{item.prod_name}}</text>
		        			</div>
		        			<text v-if="item.src.length==0" style="flex:1;margin-top:20px;font-size:28px;color:#333333;margin-left: 22;">{{item.prod_name}}</text>

		        			<text v-if="item.src.length==0" style="flex:1;font-size: 36;font-weight: 600;margin-top:-10px;margin-left: 22;" :class="[getColorWithPriceChange(item.px_change)]">{{item.last_px}}</text>

			          		<div v-if="item.src.length==0" style="flex-direction:row;flex:1;margin-left: 22;">
				          		<text :class="[getColorWithPriceChange(item.px_change)]" style="margin-right:5px;font-size: 24;">{{getPriceChange(item.px_change)}}</text>

				          		<text :class="[getColorWithPriceChange(item.px_change)]" style="margin-left:5px;font-size: 24;">{{getPriceChangePercent(item.px_change_rate,item.px_change)}}</text>
			          		</div>
						</div>
	        		</div>
	      	</div>
		</div>
		<!-- 热门板块 -->
		<collapseview ref="coll1" title="热门板块" rightTitle=" 更多 " @rightonclick="onRightClick(ranklistparams[0])">
			<div class="hq_stocks">
			<div v-for="item in hotblock" class="item">
				<div style="width:250;align-items: center;" @click="onHotItem(item)">
          			<text class="prod_name" :style="{fontSize:item.prodNameFontSize}">{{item.prod_name}}</text>
    				<text style="flex:1;font-size: 36;font-weight: 600;margin-top:5px;" :class="[getColorWithPriceChange(item.px_change_rate)]">{{getPriceChangePercent(item.px_change_rate,0)}}</text>
    				<text style="font-size: 24;flex:1;color:#666666;margin-top:5px;">{{item.stock_name}}</text>
          			<div style="flex-direction:row;flex:1">
	          			<text :class="[getColorWithPriceChange(item.stock_price)]" style="margin-right:5px;font-size: 24;margin-top:6px;">{{item.stock_price}}</text>

	          			<text :class="[getColorWithPriceChange(item.stock_change_rate)]" style="margin-left:5px;font-size: 24;margin-top:6px;">{{getPriceChangePercent(item.stock_change_rate,0)}}</text>
          			</div>
	        	</div>
			</div>
			</div>
		</collapseview>
		<!--涨幅榜 -->
		<collapseview ref="coll2" title="涨幅榜" rightTitle=" ••• " rightFontColor="#ccc" @rightonclick="onRightClick(ranklistparams[1])">
			<div v-for="item in riselist">
				<ranklistItem @onClickItem="goStockDetail(item,1)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color"></ranklistItem>
				<div style="height: 1;background-color: #ddd;margin-top: 5;margin-bottom: 5"></div>
			</div>
		</collapseview>
		<!--跌幅榜 -->
		<collapseview ref="coll3" title="跌幅榜" rightTitle=" ••• " rightFontColor="#ccc" @rightonclick="onRightClick(ranklistparams[2])">
			<div v-for="item in falllist">
				<ranklistItem @onClickItem="goStockDetail(item,2)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color"></ranklistItem>
				<div style="height: 1;background-color: #ddd;margin-top: 5;margin-bottom: 5"></div>
			</div>
		</collapseview>
		<!--换手率榜 -->
		<collapseview ref="coll4" title="换手率榜" rightTitle=" ••• " rightFontColor="#ccc" @rightonclick="onRightClick(ranklistparams[3])">
			<div v-for="item in turnoverlist">
				<ranklistItem @onClickItem="goStockDetail(item,3)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.turnover_ratio,0)" :busiFlag="item.busiFlag" :rateColor="item.turnover_ratio_color"></ranklistItem>
				<div style="height: 1;background-color: #ddd;margin-top: 5;margin-bottom: 5"></div>
			</div>
		</collapseview>
		</cell>
	</list>

</template>

<style>
	.cnIndex{
		flex-direction: row;
		height: 164px;
	}
	.indexItem{
		flex:1;
		align-items: center;
		border-width: 1px;
		border-color: #ddd;
	}
	.item{
		flex:1;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-color: #ededed;
	}
	.hot-block{
		flex-direction: column;
		height: 250px;

	}
	.title{
		background-color: gray;
		flex-direction: row;
	}
	.hq_stocks{
		flex-direction: row;
    	justify-content: center;
		height: 200px;
	}

	.riseDiv{
		flex-direction: column;
		height: 700px;
	}
	.riselist{
		height: 600px;
	}
	.list:{
		width: 750px;
		height: 600px;
		flex:1;
	}
	.riserow{
		height: 120px;
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
    .prod_name{
    	flex:1;text-overflow:ellipsis;lines:1;
    	color: #333333;
    }
</style>

<script>
 	var stream = weex.requireModule('stream');
 	var event = weex.requireModule('event');
 	var getBaseURL = require('./base-url.js').getBaseURL;
 	var getBusiFlag = require('./common-api.js').common.getBusiFlag;
 	var stockDetailUserJsHead = require('./common-api.js').common.Constants.stockDetailUserJsHead;
 	var timeHandle = weex.requireModule('timer') || {};
 	var date = '';
 	var quoteDc = weex.requireModule('dataCenter');
 	var common =require('./common-api.js').common;
 	const storage = weex.requireModule('storage');
	module.exports ={

		props:{
			isPageShow:{default:true},
		},

		data:function(){

			return {
		    cnstocks:"1A0001.SS,2A01.SZ,1B0300.SS,399005.SZ,399006.SZ",
        hotblock:[],
        oldhotblock:[],
				cnIndexList:[],
				oldcnIndexList:[],
				riselist:[],
				risestocks:[],
				oldriselist:[],
				falllist:[],
				fallstocks:[],
				oldfalllist:[],
				turnoverlist:[],
				turnstocks:[],
				oldturnoverlist:[],
				riseHeight:600,
				fallHeight:600,
				turnoverHeight:600,
				baseUrl: "",
				refreshing:'hide',
				refreshtext:'',
				refreshFlag:false,
				stocklist:[],

				stock_fields: "prod_name,hq_type_code,last_px,px_change_rate,px_change,business_amount,business_balance,turnover_ratio,preclose_px,shares_per_hand",
				block_fields: "prod_name,hq_type_code,px_change_rate,rise_first_grp,stock_px_change_rate,px_change,last_px,open_px,high_px,low_px,business_amount,business_balance,preclose_px,shares_per_hand",
				"ranklistparams": [
				    {
				      "type": "block_rank",
				      "title": "热门板块",
				      "marketslist": [
				        "XBHS.HY,XBHS.GN",
				        "XBHS.HY",
				        "XBHS.GN",
				        "XBHS.DY"
				      ],
				      "marketsnamelist": [
				        "热门",
				        "行业",
				        "概念",
				        "地域"
				      ]
				    },
				    {
				      "type": "stock_rank",
				      "title": "沪深涨幅榜",
				      "markets": [
				        "XSHG.esa",
				        "XSHE.esa",
				        "XSHE.es.smse",
				        "XSHE.es.gem"
				      ],
				      "sort_field_name": "px_change_rate",
				      "sort_type": 1
				    },
				    {
				      "type": "stock_rank",
				      "title": "沪深跌幅榜",
				      "markets": [
				        "XSHG.esa",
				        "XSHE.esa",
				        "XSHE.es.smse",
				        "XSHE.es.gem"
				      ],
				      "sort_field_name": "px_change_rate",
				      "sort_type": 0
				    },
				    {
				      "type": "stock_rank",
				      "title": "沪深换手率榜",
				      "markets": [
				        "XSHG.esa",
				        "XSHE.esa",
				        "XSHE.es.smse",
				        "XSHE.es.gem"
				      ],
				      "sort_field_name": "turnover_ratio",
				      "sort_type": 1
				    },
				]
			}
		},
		methods:{
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
				this.loadHotBlockData();
				this.loadRiseRankList();
				this.loadFallRankList();
				this.loadTurnoverRatioList();
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
			getPriceChangePercent:function(rate,px_change){
				if(rate=="停牌")
					return rate;
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
			getPriceChange:function(rate){
				if(rate>0)
					return "+"+rate;
				else
					return rate;
			},
			click:function(){
				if(this.riseHeight!=0)
					this.riseHeight=0;
				else
					this.riseHeight =600;
			},
			fallclick:function(){
				if(this.fallHeight!=0)
					this.fallHeight=0;
				else
					this.fallHeight =600;
			},
			tunrnoverclick:function(){
				if(this.turnoverHeight!=0)
					this.turnoverHeight=0;
				else
					this.turnoverHeight =600;
			},
			getRealtimeList:function(callback){
			  // var e = this.cnstocks;
	    //       return stream.fetch({
		   //        method: 'GET',
		   //        type: 'json',
		   //        url: 'https://open.hscloud.cn/quote/v1/real?en_prod_code=' + e + '&fields=prod_name,last_px,px_change,px_change_rate,hq_type_code',
		   //        headers: {
     //                Authorization: "Bearer 031F3201021D478095D471E8735529052017051118495417572389",
     //              },
		   //      }, callback);
	           var e = this.cnstocks;
	           quoteDc.loadRealtimeList({'en_prod_code':e,'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code'},callback);
	        },
	        getHotBlockData:function(callback){

				return this.getRankingStocksData({'en_hq_type_code':'XBHS.HY,XBHS.GN','sort_field_name':'px_change_rate','fields':'prod_name,hq_type_code,px_change_rate,rise_first_grp','data_count':3,'sort_type':'1'},callback);
	        },
	        getRiseRankList:function(callback){
	        	return this.getRankingStocksData({'en_hq_type_code':'XSHG.esa,XSHE.esa,XSHE.es.smse,XSHE.es.gem','sort_field_name':'px_change_rate','fields':'prod_name,hq_type_code,last_px,px_change_rate,px_change,trade_status,special_marker','data_count':10,'sort_type':'1'},callback);

	        },
	        getFallRankList:function(callback){
				return this.getRankingStocksData({'en_hq_type_code':'XSHG.esa,XSHE.esa,XSHE.es.smse,XSHE.es.gem','sort_field_name':'px_change_rate','fields':'prod_name,hq_type_code,last_px,px_change_rate,px_change,trade_status,special_marker','data_count':10,'sort_type':'0'},callback);
	        },
	        getTurnoverRatioList:function(callback){
				return this.getRankingStocksData({'en_hq_type_code':'XSHG.esa,XSHE.esa,XSHE.es.smse,XSHE.es.gem','sort_field_name':'turnover_ratio','fields':'prod_name,hq_type_code,last_px,turnover_ratio,trade_status,special_marker','data_count':10,'sort_type':'1'},callback);
	        },
	        getRankingStocksData:function(params,callback){

		        // return stream.fetch({
		        //   method: 'GET',
		        //   type: 'json',
		        //   url: 'https://open.hscloud.cn/quote/v1/sort?en_hq_type_code='+params.en_hq_type_code+'&sort_field_name='+params.sort_field_name+'&fields='+params.fields+'&data_count='+params.data_count+'&sort_type='+params.sort_type,
		        //   headers: {
          //           Authorization: "Bearer 031F3201021D478095D471E8735529052017051118495417572389",
          //         },
		        // }, callback);

		         quoteDc.loadRankingStocks({'en_hq_type_code':params.en_hq_type_code,'sort_field_name':params.sort_field_name,'fields':params.fields,'data_count':params.data_count,'sort_type':params.sort_type},callback);
	        },
	        getColorWithPriceChange:function(priceChange){
					if(priceChange>0)
						return "riseColor";
					else if(priceChange<0)
						return "fallColor";
					else
						return "stableColor";
	        },
	        getColorWithNumber:function(priceChange){
	            if(priceChange>0)
	              return "#FA3E48";
	            else if(priceChange<0)
	              return "#249b3a";
	            else
	              return "#a3a3a3";
          	},
	        onRightClick: function(params){
				var fields = this.stock_fields;
				if (params.type == "block_rank") {
					fields = this.block_fields;
				}
				event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + fields);
	        },
	        onIndexItem: function(item){
				if (item.marketslist) {
					event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(item)) + "&fields=" + this.stock_fields);
				} else {
					if (stockDetailUserJsHead) {
						event.openURL(this.baseUrl + "navigator.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name),{headHidden:true});
					} else {
					  event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name));
					}
				}
	        },
			onHotItem: function(item){
				//event.openNative("block_stocks", {"stockName":item.prod_name,"stockCode": item.stock_code, "codeType": item.code_type});
				if (stockDetailUserJsHead){
					event.openURL(this.baseUrl + "navigator.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name),{headHidden:true});
				}else{
					event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name));
				}

			},
			goStockDetail: function(item,type){
				if (stockDetailUserJsHead){
					var data = [];
					if(type == 1){
						data.push(this.risestocks);
						data.push(this.riselist.indexOf(item));

					}
					else if(type == 2){
						data.push(this.fallstocks);
						data.push(this.falllist.indexOf(item));
					}
					else
					{
						data.push(this.turnstocks);
						data.push(this.turnoverlist.indexOf(item));
					}
					storage.setItem("stocklist",JSON.stringify(data));
					event.openURL(this.baseUrl + "navigator.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "&hideCutoverImage=" + true,{headHidden:true});
				}else{
					event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name));
				}

			},
	        quickSort:function(arr,) {
			　　if (arr.length <= 1) { return arr; }
			　　var pivotIndex = Math.floor(arr.length / 2);
			　　var pivot = arr.splice(pivotIndex, 1)[0];
			　　var left = [];
			　　var right = [];
			　　for (var i = 0; i < arr.length; i++){

					if (Number(Math.abs(arr[i].px_change_rate)) < Number(Math.abs(pivot.px_change_rate))) {
			　　　　　　right.push(arr[i])
			　　　　	} else {
			　　　　　　left.push(arr[i]);
			　　　　	}
			　　}
			　　return this.quickSort(left).concat([pivot], this.quickSort(right));
			},
			 //判断是否有数据
	        hasData:function(data){
	          if(parseFloat(data).toString() == "NaN") {
	　　　　    return false;
	　　　　  }
	　　　　  return true;
	        },
			quickSortRatio:function(arr,) {
			　　if (arr.length <= 1) { return arr; }
			　　var pivotIndex = Math.floor(arr.length / 2);
			　　var pivot = arr.splice(pivotIndex, 1)[0];
			　　var left = [];
			　　var right = [];
			　　for (var i = 0; i < arr.length; i++){

					if (Number(Math.abs(arr[i].turnover_ratio)) < Number(Math.abs(pivot.turnover_ratio))) {
			　　　　　　right.push(arr[i])
			　　　　	} else {
			　　　　　　left.push(arr[i]);
			　　　　	}
			　　}
			　　return this.quickSortRatio(left).concat([pivot], this.quickSortRatio(right));
			},
			loadRealtimeList:function(){
				var that=this;
	    		//that.baseUrl = getBaseURL(this);
				this.getRealtimeList(e =>{
					if(!that.isPageShow){
						return;
					}
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
		                    var p = {};
		                    p.last_px = parseFloat(result[key][fields.indexOf("last_px")]).toFixed(2);
		                    p.px_change = parseFloat(result[key][fields.indexOf("px_change")]).toFixed(2);
		                    p.px_change_rate = parseFloat(result[key][fields.indexOf("px_change_rate")]).toFixed(2);
		                    p.prod_name = result[key][fields.indexOf("prod_name")];
	                        p.prod_code_all = key;
	                        p.prod_code = key.split('.')[0];
	                        p.hq_type_code = result[key][fields.indexOf("hq_type_code")];
	                        p.src = "";
	                        if(!that.hasData(p.last_px)){
	                        	p.last_px="--";
	                        }

	                        if(!that.hasData(p.px_change)){
	                        	p.px_change="0.00";
	                        }

	                        if(!that.hasData(p.px_change_rate)){
	                        	p.px_change_rate="0.00";
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
		            var arr =that.cnstocks.split(",");
		            if(that.cnIndexList.length*3<arr.length+1){
		            	newArr.push({
		            		"prod_name": "沪深排名",
							"type": "stock_rank",
		            		"title": "分类排名",
		                	"marketslist": ["XSHG.esa,XSHE.esa,XSHE.es.gem,XSHE.es.smse", "XSHG.mri", "XSHG.esa", "XSHE.mri", "XSHE.esa", "XSHE.esa.gem", "XSHE.esa.smse"],
		                	"marketsnamelist": ["沪深A股", "上证指数", "上证A股", "深证指数", "深证A股", "创业板", "中小板"],
                			"fixed": false,
                			"src": that.baseUrl + "image/hstop.png"});
		            	that.cnIndexList.push(newArr);
		            	newArr=[];
		            }
				});
			},
			loadHotBlockData:function(){
				var that=this;
				this.getHotBlockData(e =>{
						if(!that.isPageShow){
							return;
						}
						that.hotblock=[];
					 	var o = "";
						var a = e.data.sort;
						if(that.oldhotblock==a || typeof(a) == "undefined" || that.isEmptyObject(a))
							return;
						var s=a.fields;
			            for (var r in a) {
			                var n = {};
			                if ("fields" != r) {
			                    n.prod_name = a[r][s.indexOf("prod_name")];
			                    n.hq_type_code = a[r][s.indexOf("hq_type_code")];

								n.prodNameFontSize=common.calculateSizeByText(n.prod_name);

			                    n.px_change_rate = parseFloat(a[r][s.indexOf("px_change_rate")]).toFixed(2);

			                    var p = a[r][s.indexOf("rise_first_grp")], l = p.split(",");
			                    n.stock_code = r.split(".")[0];

			                    n.stock_name = l[1];
			                    n.stock_price = parseFloat(l[2]).toFixed(2);
			                    n.stock_change_rate = parseFloat(l[3]).toFixed(2);

			                    if(!that.hasData(n.px_change_rate)){
		                        	n.px_change_rate="0.00";
		                        }

		                        if(!that.hasData(n.stock_price)){
		                        	n.stock_price="--";
		                        }

		                        if(!that.hasData(n.stock_change_rate)){
		                        	n.stock_change_rate="0.00";
		                        }

			                    n.prod_code_all = r;
			                    n.prod_code = r.split('.')[0];
			                    o += r + ",";
			                    that.hotblock.push(n);
			                }
			            }
			            that.oldhotblock=a;
				});
			},
			loadRiseRankList:function(){
				var that=this;
				this.getRiseRankList(e =>{
					if(!that.isPageShow){
						return;
					}
					that.riselist=[];
					that.risestocks=[];
					var a = e.data.sort;
					if(that.oldriselist==a || typeof(a) == "undefined" || that.isEmptyObject(a))
						return;
					var s=a.fields;
		            for (var r in a) {
		                var n = {};
		                if ("fields" != r) {
		                    n.prod_name = a[r][s.indexOf("prod_name")];
		                    n.prod_code =r.split('.')[0];
		                    n.prod_code_all=r;
		                    n.last_px = parseFloat(a[r][s.indexOf("last_px")]).toFixed(2);
		                    n.px_change_rate =parseFloat(a[r][s.indexOf("px_change_rate")]).toFixed(2);
		                    n.px_change =parseFloat(a[r][s.indexOf("px_change")]).toFixed(2);

							n.hq_type_code = a[r][s.indexOf("hq_type_code")];
							n.trade_status =a[r][s.indexOf("trade_status")];
							if (!that.hasData(n.last_px)){
								n.last_px = "--";
							}
							if (!that.hasData(n.px_change_rate)){
								n.px_change_rate = "0.00";
							}
							var specialM = a[r][s.indexOf("special_marker")];
							//n.marketicon= that.getMarketIcon(idx);
              				n.busiFlag = getBusiFlag(n.hq_type_code,specialM);
							if(n.trade_status=="STOPT" ||  n.trade_status =="HALT"){
								n.px_change_rate="停牌";
								//n.px_change_rate_color =""
							}
							n.px_change_rate_color =that.getColorWithNumber(n.px_change_rate);
		                    that.riselist.push(n);
		                }
		            }
		            that.oldriselist=a;
		            that.riselist = that.quickSort(that.riselist);
		            for(var i = 0; i < that.riselist.length;i++){
		            	var stock = {};
		            	stock.stock_code = that.riselist[i].prod_code;
		            	stock.code_type = that.riselist[i].hq_type_code;
		            	stock.stock_name = that.riselist[i].prod_name;
		            	that.risestocks.push(stock);
		            }
				});
			},
			loadFallRankList:function(){
				var that=this;
				this.getFallRankList(e =>{
					if(!that.isPageShow){
						return;
					}
					that.falllist=[];
					that.fallstocks=[];
					var a = e.data.sort;
					if(that.oldfalllist==a || typeof(a) == "undefined" || that.isEmptyObject(a))
						return ;
					var s=a.fields;
		            for (var r in a) {
		                var n = {};
		                if ("fields" != r) {
		                    n.prod_name = a[r][s.indexOf("prod_name")];
		                    n.prod_code =r.split('.')[0];
		                    n.prod_code_all=r;
		                    n.last_px = parseFloat(a[r][s.indexOf("last_px")]).toFixed(2);
		                    n.px_change_rate =parseFloat(a[r][s.indexOf("px_change_rate")]).toFixed(2);
		                    n.px_change =parseFloat(a[r][s.indexOf("px_change")]).toFixed(2);
							//n.px_change_rate_color =that.getColorWithNumber(n.px_change_rate);
							n.hq_type_code = a[r][s.indexOf("hq_type_code")];
							n.trade_status =a[r][s.indexOf("trade_status")];
							if (!that.hasData(n.last_px)){
								n.last_px = "--";
							}
							if (!that.hasData(n.px_change_rate)){
								n.px_change_rate = "0.00";
							}
							var specialM = a[r][s.indexOf("special_marker")];
							//n.marketicon= that.getMarketIcon(idx);
              				n.busiFlag = getBusiFlag(n.hq_type_code,specialM);
							if(n.trade_status=="STOPT" ||  n.trade_status =="HALT")
								n.px_change_rate="停牌";
							n.px_change_rate_color =that.getColorWithNumber(n.px_change_rate);
		                    that.falllist.push(n);
		                }
		            }
		            that.oldfalllist=a;
		            that.falllist = that.quickSort(that.falllist);
		            for(var i = 0; i < that.falllist.length;i++){
		            	var stock = {};
		            	stock.stock_code = that.falllist[i].prod_code;
		            	stock.code_type = that.falllist[i].hq_type_code;
		            	stock.stock_name = that.falllist[i].prod_name;
		            	that.fallstocks.push(stock);
		            }
				});
			},
			loadTurnoverRatioList:function(){
				var that=this;
				this.getTurnoverRatioList(e=>{
					if(!that.isPageShow){
						return;
					}
					that.turnoverlist=[];
					that.turnstocks=[];
					var a = e.data.sort;
					if(that.oldturnoverlist==a || typeof(a) == "undefined" || that.isEmptyObject(a))
						return ;
					var s=a.fields;
		            for (var r in a) {
		                var n = {};
		                if ("fields" != r) {
		                    n.prod_name = a[r][s.indexOf("prod_name")];
		                    n.prod_code =r.split('.')[0];
		                    n.prod_code_all=r;
		                    n.last_px = parseFloat(a[r][s.indexOf("last_px")]).toFixed(2);
		                    n.turnover_ratio =parseFloat(a[r][s.indexOf("turnover_ratio")]).toFixed(2);
		                    n.turnover_ratio_color ='#000000';
		                    n.hq_type_code = a[r][s.indexOf("hq_type_code")];
		                    n.trade_status =a[r][s.indexOf("trade_status")];
		                    if (!that.hasData(n.last_px)){
								n.last_px = "--";
							}
							if (!that.hasData(n.turnover_ratio)){
								n.turnover_ratio = "0.00";
							}
		                    var specialM = a[r][s.indexOf("special_marker")];
							//n.marketicon= that.getMarketIcon(idx);
              				n.busiFlag = getBusiFlag(n.hq_type_code,specialM);
							if(n.trade_status=="STOPT" ||  n.trade_status =="HALT")
								n.turnover_ratio="停牌";
							//n.px_change_rate_color =that.getColorWithNumber(n.px_change_rate);
		                    that.turnoverlist.push(n);
		                }
		            }
		            that.oldturnoverlist=a;
		            that.turnoverlist = that.quickSortRatio(that.turnoverlist);
		            for(var i = 0; i < that.turnoverlist.length;i++){
		            	var stock = {};
		            	stock.stock_code = that.turnoverlist[i].prod_code;
		            	stock.code_type = that.turnoverlist[i].hq_type_code;
		            	stock.stock_name = that.turnoverlist[i].prod_name;
		            	that.turnstocks.push(stock);
		            }
				})
			},
	    	isEmptyObject:function(obj){
	     		for(var key in obj){
	          		return false;
	     		}
	     		return true;
			},
			refreshOnTime:function(){
				if(!this.isPageShow){
					return;
				}
				this.loadRealtimeList();
				this.loadHotBlockData();
				this.loadRiseRankList();
				this.loadFallRankList();
				this.loadTurnoverRatioList();

			}
		},
		components: {
      		ranklistItem: require('./ranklistItem.vue'),
      		collapseview: require('./collapseview.vue'),
    	},
    	created:function(){
    		var that=this;
    		that.baseUrl = getBaseURL(this);
    		that.refreshOnTime();
			date = common.getNowFormatDate();
    	},
	};

</script>
