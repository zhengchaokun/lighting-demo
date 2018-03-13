<template>
	<list style="flex-direction:column;width:750px">
		<!-- 顶部tab -->
		<header>
			<div class="top_tab_style" :style="{backgroundColor:tab_background_color}">
				<image class="back_img_style" :src="back_img"></image>
				<div class="top_title_style">
					<text style="font-size:32px;color:#ffffff;text-align:center;height:40px;margin-top:10px;" :value="stock_name"></text>
					<text style="font-size:24px;color:#ffffff;text-align:center;height:30px;" :value="title_bottom"></text>
				</div>
				<image class="search_img_style" :src="search_img"></image>
			</div>
		</header>
		<cell>
			<!-- 快照 -->
			<div class="snapshot_style" :style="{backgroundColor:tab_background_color}" @appear="switchTitleText(1)" @disappear="switchTitleText(0)">
				<!-- 左边 -->
				<div>
					<!-- 最新价 -->
					<text style="font-size:80px;color:#ffffff;height:100px;" :value="last_px"></text>
					<!-- 涨跌 -->
					<div style="flex-direction:row;height:50px;">
						<!-- 涨跌额 -->
						<text style="color:#ffffff;font-size:24px;" :value="price_change"></text>
						<!-- 涨跌幅 -->
						<text style="color:#ffffff;font-size:24px;margin-left:20px;" :value="price_change_precent"></text>
						<!-- 额外项 -->
						<text style="color:#ffffff;font-size:24px;margin-left:20px;" :value="other_text"></text>
					</div>
				</div>
				<!-- 右边 -->
				<div>
					<image style="height:80px;width:80px;" :src="add_img"></image>
					<text style="width:80px;color:#ffffff;text-size:16px;" :value="add_text"></text>
				</div>
			</div>
			<!-- 详情 -->
			<div style="flex-direction:row;height:120px;">
				<!-- 第一排 -->
				<div style="flex:3;margin-left:20px;flex-direction:row;">
					<div style="padding-bottom: 15px;padding-top: 15px;">
						<text class="snapshot_text_style" :value="snapshot_bottom_text11"></text>
						<text class="snapshot_text_style" style="margin-top:10;" :value="snapshot_bottom_text21"></text>
					</div>
					<div style="padding-bottom: 15px;padding-top: 15px;">
						<text class="snapshot_text_style" :value="snapshot_bottom_text12"></text>
						<text class="snapshot_text_style" style="margin-top:10;" :value="snapshot_bottom_text22"></text>
					</div>
				</div>
				<!-- 第二排 -->
				<div style="flex:3;margin-left:20px;flex-direction:row;">
					<div style="padding-bottom: 15px;padding-top: 15px;">
						<text class="snapshot_text_style" :value="snapshot_bottom_text31"></text>
						<text class="snapshot_text_style" style="margin-top:10;" :value="snapshot_bottom_text41"></text>
					</div>
					<div style="padding-bottom: 15px;padding-top: 15px;">
						<text class="snapshot_text_style" :value="snapshot_bottom_text32"></text>
						<text class="snapshot_text_style" style="margin-top:10;" :value="snapshot_bottom_text42"></text>
					</div>
				</div>
				<!-- 第三排 -->
				<div style="flex:3;margin-left:20px;flex-direction:row;">
					<div style="padding-bottom: 15px;padding-top: 15px;">
						<text class="snapshot_text_style" :value="snapshot_bottom_text51"></text>
						<text class="snapshot_text_style" style="margin-top:10;" :value="snapshot_bottom_text61"></text>
					</div>
					<div style="padding-bottom: 15px;padding-top: 15px;">
						<text class="snapshot_text_style" :value="snapshot_bottom_text52"></text>
						<text class="snapshot_text_style" style="margin-top:10;" :value="snapshot_bottom_text62"></text>
					</div>
				</div>
				<!-- 第四排 -->
				<div style="flex:2;margin-left:10px;flex-direction:row;">
				</div>
			</div>
			<!-- 分时五日等tab -->
			<jstabbar :tabItems="chart_tab_items" selectedColor="#f75e61" @tabBarOnClick="switchType" style="height:70"></jstabbar>
			<!-- K线图 -->
			<chartview :stockcode='stock_code' :codetype='code_type' :chartType='chart_type'  :snapshotdata='snapshot_data' :trenddata='trend_data' 
			:klinedata	='kline_data' :netvaluedata='netvalue_data' :klinemode="kLine_mode" :techtype="tec_type" @click="goLandscape" 
			@showline="showLine" @hideline="hideLine" style="width:750px;height:500px;">
            </chartview>
            <!-- 五档、明显、分价 -->
            <slider style="height:400px;width:750px;">
            	<!-- 五档 -->
            	<div style="height:300px;flex-direction:row;">
            		<!-- 左 -->
            		<div style="height:300px;flex:1;padding-left:20px">
            			<div style="flex:1;flex-direction:row;margin-top:10px;" v-for="item in bidoffer_left_items">
            				<text style="text-align:left;font-size:18px;flex:2;color:#000000;" :value="item.value" ></text>
            				<text style="text-align:left;font-size:18px;flex:2;" :style="{color:item.color}" :value="item.price" ></text>
            				<text style="text-align:left;font-size:18px;flex:7;" :style="{color:item.color}" :value="item.price" ></text>
            				<text style="text-align:right;font-size:18px;flex:2;color:#000000;" :value="item.volume" ></text>
            			</div>
            		</div>
            		<!-- 右 -->
            		<div style="height:300px;flex:1;margin-left:30px;padding-right:10px;">
            			<div style="flex:1;flex-direction:row;margin-top:10px;" v-for="item in bidoffer_right_items">
            				<text style="text-align:left;font-size:18px;flex:2;color:#000000;" :value="item.value" ></text>
            				<text style="text-align:left;font-size:18px;flex:2;" :style="{color:item.color}" :value="item.price" ></text>
            				<text style="text-align:left;font-size:18px;flex:7;" :style="{color:item.color}" :value="item.price" ></text>
            				<text style="text-align:right;font-size:18px;flex:2;color:#000000;" :value="item.volume" ></text>
            			</div>
            		</div>
            	</div>
            	<!-- 明细 -->
            	<div style="height:300px;flex-direction:row;">
            		<!-- 左 -->
            		<div style="height:380px;flex:1;padding-left:20px">
            			<div style="flex:1;flex-direction:row;margin-top:10px;" v-for="item in tradedata_left_items">
            				<text style="text-align:left;font-size:18px;flex:2;color:#000000;" :value="item.time" ></text>
            				<text style="text-align:left;font-size:18px;flex:7;" :style="{color:item.price_color}" :value="item.price" ></text>
            				<text style="text-align:right;font-size:18px;flex:2;" :style="{color:item.volume_color}" :value="item.volume" ></text>
            				<image style="flex:1;" :src="item.src"></image>
            			</div>
            		</div>
            		<!-- 右 -->
            		<div style="height:300px;flex:1;margin-left:30px;padding-right:10px;">
            			<div style="flex:1;flex-direction:row;margin-top:10px;" v-for="item in tradedata_left_items">
            				<text style="text-align:left;font-size:18px;flex:2;color:#000000;" :value="item.time" ></text>
            				<text style="text-align:left;font-size:18px;flex:7;" :style="{color:item.price_color}" :value="item.price" ></text>
            				<text style="text-align:right;font-size:18px;flex:2;" :style="{color:item.volume_color}" :value="item.volume" ></text>
            				<image style="flex:1;" :src="item.src"></image>
            			</div>
            		</div>
            	</div>
            	<div style="height:380px;">
            	</div>
            	<indicator style="height:400px;width:750px;item-size:20px;position:absolute;top:360px;left:370px;item-color: green;item-selected-color: red;">
            	</indicator>
            </slider>
            <!-- web页tab -->
            <jstabbar :tabItems="web_tab_items" selectedColor="#f75e61" @tabBarOnClick="switchType" style="height:70"></jstabbar>
            <!-- web页 -->
            <!-- 新闻 -->
            <web ref="news_web" :openinnewpage=true :style="{height:news_web_height}" :src="news_src" class="webview" @pagestart="webstart" @pagefinish="webfinish" @error="weberror" @changeheight="changeHeight1"></web>
            <!-- 公告 -->
            <web ref="notice_web" :openinnewpage=true :style="{height:notice_web_height}" :src="notice_src" class="webview" @pagestart="webstart" @pagefinish="webfinish" @error="weberror" @changeheight="changeHeight2"></web>
            <!-- 研报 -->
            <web ref="report_web" :openinnewpage=true :style="{height:report_web_height}" :src="report_src" class="webview" @pagestart="webstart" @pagefinish="webfinish" @error="weberror" @changeheight="changeHeight3"></web>
            <!-- F10 -->
            <web ref="f10_web" :openinnewpage=true :style="{height:f10_web_height}" :src="f10_src" class="webview" @pagestart="webstart" @pagefinish="webfinish" @error="weberror" @changeheight="changeHeight4"></web>
		</cell>
	</list>
</template>

<style>

	.top_tab_style{
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 80px;
	}
	.back_img_style{
		height: 80px;
		flex: 1;
	}
	.top_title_style{
		height: 100px;
		flex: 8;
	}
	.search_img_style{
		height: 80px;
		flex: 1;
	}
	.snapshot_style{
		flex-direction:row;
		justify-content: space-between;
		height:150px;
		padding-left:20px;
		padding-right:20px;
	}
	.snapshot_text_style{
		font-size: 24px;
		height: 30px;
		color:#000000;
		margin-top: 5px;
	}
	.webview{
		width:750px;
	}

</style>

<script>
	const dataCenter = require('./js/openApi.js');
	const common = require('./js/common-api.js').common;
	var productType;	//判断产品类型
	var marketType;	//判断市场类型
	var hand = 1;	//每手股数
	module.exports={
		components: {
		    jstabbar: require('./include/tabbar.vue'),
    	},
		data:function(){
			return{
				back_img:"file://assets/jsNative/image/back.png",
				search_img:"file://assets/jsNative/image/search.png",
				stock_name:"恒生电子",
				stock_code:600570,
				code_type:"XSHG",
				last_px:"--",
				price_change:"--",
				price_change_precent:"--",
				other_text:"目前为空",
				add_img:"file://assets/jsNative/image/addIcon.png",
				add_text:"加自选",
				tab_background_color:"#333",
				snapshot_bottom_text11:"今开 ",
				snapshot_bottom_text21:"换手 ",
				snapshot_bottom_text12:"3.99",
				snapshot_bottom_text22:"4.33%",
				snapshot_bottom_text31:"最高 ",
				snapshot_bottom_text41:"4.18",
				snapshot_bottom_text32:"最低 ",
				snapshot_bottom_text42:"3.99",
				snapshot_bottom_text51:"成交量 ",
				snapshot_bottom_text52:"57.94万",
				snapshot_bottom_text61:"成交额 ",
				snapshot_bottom_text62:"2.40亿",
				chart_tab_items:[
		            {index: 0, title: '分时', titleColor: ''},
		            {index: 1, title: '净值', titleColor: ''},
		            {index: 2, title: '日K', titleColor: ''},
		            {index: 3, title: '周K', titleColor: ''},
		            {index: 4, title: '月K', titleColor: ''},
		            {index: 5, title: '分钟', titleColor: ''}
		        ],
		        web_tab_items:[
		        	{index: 0, title: '必读', titleColor: ''},
		            {index: 1, title: '新闻/公告', titleColor: ''},
		            {index: 2, title: '简况/F10', titleColor: ''}
		        ],
		        title_bottom:"",
		        bidoffer_left_items:[
		        	{value:"卖1",price:"--",volume:"--",color:"#333",proportion:50},
		        	{value:"卖2",price:"--",volume:"--",color:"#333",proportion:20},
		        	{value:"卖3",price:"--",volume:"--",color:"#333",proportion:100},
		        	{value:"卖4",price:"--",volume:"--",color:"#333",proportion:1},
		        	{value:"卖5",price:"--",volume:"--",color:"#333",proportion:70}
		        ],
		        bidoffer_right_items:[
		        	{value:"买1",price:"--",volume:"--",color:"#333",proportion:50},
		        	{value:"买2",price:"--",volume:"--",color:"#333",proportion:20},
		        	{value:"买3",price:"--",volume:"--",color:"#333",proportion:100},
		        	{value:"买4",price:"--",volume:"--",color:"#333",proportion:1},
		        	{value:"买5",price:"--",volume:"--",color:"#333",proportion:70}
		        ],
		        tradedata_left_items:[
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"}
		        ],
		        tradedata_right_items:[
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"},
		        	{time:"10:10",price:"75.35",volume:"66",price_color:"#E33536",volume_color:"#E33536",src:"file://assets/jsNative/image/sort_arrow_down.png"}
		        ],

		        chart_type:"",
		        snapshot_data:{},
		        trend_data:{},
		        kline_data:{},
		        netvalue_data:{},
		        kLine_mode:"",
		        tec_type:"",

		        //根据股票类型决定保留小数位数
		        bit:2,
		        //web页相关
		        news_src:"",
		        notice_src:"",
		        report_src:"",
		        f10_src:"",
		        news_web_height:800,
		        notice_web_height:0,
		        report_web_height:0,
		        f10_web_height:0,
		    }
		},
		created:function(){
			var that = this;
			console.log("ycltest>>>created");
			var config =this.$getConfig();
			var inputParam = config.inputParam;
			if (inputParam){
          		if (inputParam.stockCode){
              		this.stock_code = inputParam.stockCode;
          		}
          		if (inputParam.codeType){
              		this.code_type = inputParam.codeType;
          		}
          		if (inputParam.stockName){
              		this.stock_name = inputParam.stockName;
          		}
      		}

      		marketType =common.getMarkType(that.code_type);
      		productType =common.getProductType(that.code_type);

      		that.bit = common.initFloatBit(productType,marketType,that.code_type);

      		dataCenter.getRealtime({"en_prod_code":"600570.SS"},function(res){
      			that.snapshot_data = res;
      			that.formatSnapshotdata(res);
      		});
		},
		methods:{

			//快照数据处理
			formatSnapshotdata:function(snapshotdata){
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
	            var stockCode = that.stock_code;
	            var bidArr = new Array();
            	var offerArr = new Array();
				if (common.getAbbreviation(that.code_type).length > 0){
                	stockCode = stockCode +"."+ common.getAbbreviation(that.code_type);
            	}
            	if(!that.isEmptyObject(that.snapshotdata) && that.snapshotdata.data.snapshot[stockCode]!=undefined){
            		  var fields = snapshotdata.data.snapshot.fields;
		              var stockdata = snapshotdata.data.snapshot[stockCode];

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
		              else{
		                    turnover = '--';
		              }
		              totalmaney = that.formatdata(stockdata[fields.indexOf('business_balance')],2,1,true);
		              volumeratio = stockdata[fields.indexOf('vol_ratio')];
		              if(that.hasData(volumeratio) && parseFloat(volumeratio) > 0){
		                      volumeratio = common.formatBigNumber(volumeratio,2);
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
		                up = common.formatBigNumber(up,that.bit);
		              }else{
		                up = '--';
		              }
		              down =  stockdata[fields.indexOf('down_px')];
		              if(that.hasData(down)){
		                down = common.formatBigNumber(down,that.bit);
		              }else{
		                down = '--';
		              }
		              dynPbRate = stockdata[fields.indexOf('dyn_pb_rate')];
		              high52 = that.formatdata(stockdata[fields.indexOf('w52_high_px')],that.bit);
		              low52 = that.formatdata(stockdata[fields.indexOf('w52_low_px')],that.bit);
		              marketValue = stockdata[fields.indexOf('market_value')];
		              amplitude = stockdata[fields.indexOf('amplitude')];
		              if(that.hasData(amplitude) && parseFloat(amplitude) > 0){
		                amplitude = common.formatBigNumber(amplitude,2)+"%";
		              }else{
		                amplitude = '--';
		              }
		              avg = stockdata[fields.indexOf('avg_px')];
		              if(that.hasData(avg)){
		                avg = common.formatBigNumber(avg,that.bit);
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
		                    that.bidoffer_right_items[i].price = (Number(bidArr[i*3])).toFixed(pbit);
		                    //log.i("价格："+bidArr[i*3]+"昨收："+preclose);
		                    that.bidoffer_right_items[i].color = common.getColorWithNumber(Number(that.bidoffer_right_items[i].price - preclose));
		                    if(hand>0){
		                      if(bidArr[i*3+1]/hand >=100000){
		                        that.bidoffer_right_items[i].volume = common.formatBigNumber(bidArr[i*3+1]/hand,2);
		                      }
		                      else
		                      {
		                        that.bidoffer_right_items[i].volume = Number(bidArr[i*3+1]/hand).toFixed(0);
		                      }
		                    }
		                  }else{
		                    that.bidoffer_right_items[i].price = '--';
		                    that.bidoffer_right_items[i].volume = '--';
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
		                    that.bidoffer_left_items[i].price = (Number(offerArr[i*3])).toFixed(pbit);
		                    that.bidoffer_left_items[i].color = common.getColorWithNumber(Number(that.bidoffer_left_items[i].price - preclose));
		                    if(hand>0){
		                      if(offerArr[i*3+1]/hand >=100000){
		                        that.bidoffer_left_items[i].volume = common.formatBigNumber(offerArr[i*3+1]/hand,2);
		                      }
		                      else
		                      {
		                        that.bidoffer_left_items[i].volume = Number(offerArr[i*3+1]/hand).toFixed(0);
		                      }
		                    }
		                  }else{
		                    that.bidoffer_left_items[i].price = '--';
		                    that.bidoffer_left_items[i].volume = '--';
		                  }
		              }
		            }
		          /*if(that.hasData(last) && last.length>=9){
		            that.preLastFont=60;
		          }*/

		          if(that.hasData(risecount)&&that.hasData(fallcount)&&that.hasData(totalcCount)){
		            unchangedCount = Number(totalcCount) - Number(risecount) - Number(fallcount);
		          }else{
		            unchangedCount = '--';
		          }

		          //昨结
		          if(that.hasData(prevsettlement)){
		            prevsettlement = common.formatBigNumber(prevsettlement,that.bit);
		          }
		          else
		          {
		            prevsettlement = '--';
		          }

		          //快照最新价数据处理
		          that.processLastpx(preclose,prevsettlement,last);

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
		            hand = common.formatBigNumber(hand,0);
		          }
            	}
			},

			//分时五日切换
			switchType:function(){

			},
			//title下面的字随着滚动改变
			switchTitleText:function(e){
				if(e==1){
					this.title_bottom = this.stock_code;
				}
				else{
					this.title_bottom = this.last_px + " " + this.price_change + " " + this.price_change_precent;
				}
			},

			//判断一个JSON对象是否为空
			isEmptyObject:function(obj){
	          for(var key in obj){
	              return false;
	          }
	          return true;
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
	        //判断是否有数据
	        hasData:function(data){
	          if(parseFloat(data).toString() == "NaN") {
	　　　　    return false;
	　　　　  }
	　　　　  return true;
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
	        //对最新价数据进行处理
	        processLastpx:function(preclose,prevsettlement,last){
				  var leftclose = preclose;
		          //左边数据处理
		          if(marketType=="MARKET_FUTURE"){
		            leftclose = prevsettlement;
		          }
		          if(that.hasData(last)){
		            that.last_px = that.formatBigNumber(last,that.bit);
		          }
		          if(that.hasData(preclose)){
		            preclose = that.formatBigNumber(preclose,that.bit);
		          }
		          if(common.getTradeStatus(trade_status) == '停牌'){
		            that.last_px = '停牌';
		          }
		          if(that.hasData(last)&&that.hasData(leftclose)){
		              that.price_change = Math.abs((last-leftclose).toFixed(that.bit));
		              that.tab_background_color = common.getColorWithNumber(Number(last-leftclose));
		              if(Number(last-leftclose)>=0){
		                  that.price_change = "+"+that.preDiff.toFixed(that.bit);
		                  that.price_change_precent = "+"+that.formatBigNumber((that.preDiff/leftclose*100),2)+"%";
		              }
		              else{
		                that.price_change = "-"+that.preDiff.toFixed(that.bit);
		                that.price_change_precent = that.formatBigNumber((that.preDiff/leftclose*100),2)+"%";
		              }
		          }
		          else
		          {
		            that.tab_background_color = "#333";
		            that.price_change = Number(0).toFixed(that.bit);
		            that.price_change_precent = "0.00%";
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

			//web有关
			webstart:function(event){

			},
			webfinish:function(event){

			},
			weberror:function(event){

			},
			changeHeight1:function(){

			},
			changeHeight2:function(){

			},
			changeHeight3:function(){

			},
			changeHeight4:function(){

			},
		}
	}

</script>