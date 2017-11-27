<template>
	<list @viewappear="onViewappear" @viewdisappear="onViewdisappear">
		<refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh">
          <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext" ></text>
        </refresh>
    <cell>
		<div class="topdiv" >
			<!-- <text class="toptext" :style="{marginTop:margintop}" :value="lefttext"></text>
			<div class="line"><text style="width:2;height: 160;"></text></div>
			<text class="toptext" :style="{marginTop:margintop}" :value="righttext"></text> -->
			<div style="justify-content: center; align-items: center;width:374">
				<text class="toptext" style="font-size: 34;color:#000000;" :value="lefttext"></text>
				<text class="toptext" style="font-size: 32;color:#A1A1A1;" :value="lefttext2"></text>
			</div>
			<div class="line">
				<text style="width:2;height: 160;"></text>
			</div>
			<div style="justify-content: center; align-items: center;width:374;">
				<text class="toptext" style="font-size: 34;color:#000000;" :value="righttext"></text>
				<text class="toptext" style="font-size: 32;color:#A1A1A1;" :value="righttext2"></text>
			</div>

		</div>
		<collapseview :title="firsttitle" rightTitle="•••" @rightonclick="witchMore(1)" >
    			<div v-for="item in firstlist">
    				<ranklistItem @onClickItem="goStockDetail(item,1)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color" :marketicon="item.marketicon"></ranklistItem>
            		<div style="height: 1;background-color: #EAEAEA;margin-top: 5;margin-bottom: 5"></div>
    			</div>
    		</collapseview>
    		<collapseview ref="coll2" :title="secondtitle" rightTitle="•••" @rightonclick="witchMore(2)">
    			<div v-for="item in secondlist">
    				<ranklistItem @onClickItem="goStockDetail(item,2)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color" :marketicon="item.marketicon"></ranklistItem>
            		<div style="height: 1;background-color: #EAEAEA;margin-top: 5;margin-bottom: 5"></div>
    			</div>
    		</collapseview>
    </cell>
	</list>
</template>

<style>
	.topdiv{
		flex-direction: row;
		widows: 750px;
		height:160px;
	}
	.toptext{
		width:374px;
		text-align: center;
	}
	.line{
		width:2px;
		height: 160px;
		background-color:#F7F7F7;
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
	var stream = weex.requireModule('stream');
	var event = weex.requireModule('event');
    var quoteDc = weex.requireModule('dataCenter');
    var timeHandle = weex.requireModule('timer') || {};
    var getBaseURL = require('./include/base-url.js').getBaseURL;
    var getBusiFlag = require('./include/common-api.js').common.getBusiFlag;
    var getMarketIcon=require('./include/common-api.js').common.getMarketIcon;
    var stockDetailUserJsHead = require('./include/common-api.js').common.Constants.stockDetailUserJsHead;
    var common = require('./include/common-api.js').common;
    var head = weex.requireModule('head');
    const storage = weex.requireModule('storage');
    var e1=[];
    var e2=[];
    var date='';
module.exports={
	components: {
      collapseview: require('./include/collapseview.vue'),
      ranklistItem: require('./include/ranklistItem.vue'),
    },

    data:function(){
    	return{
    		lefttext:"",
    		lefttext2:"",
    		righttext:"",
    		righttext2:"",
    		firsttitle:"沪股通",
    		secondtitle:"港股通",
    		firstlist:[],
        firststocks:[],
    		secondlist:[],
        secondstocks:[],
    		head:" ",
    		type:"HLHGTBalance",
    		fields: "prod_name,hq_type_code,last_px,px_change_rate,px_change,business_amount,business_balance,turnover_ratio,preclose_px,shares_per_hand",
    		refreshing:'hide',
        refreshtext:'',
        refreshFlag:false,
        isPageShow:true,
    	}
    },
    created:function(){
    	this.baseUrl=getBaseURL(this);
    	var self = this;
    	date = this.getNowFormatDate();
      	var config =this.$getConfig();
      	var inputParam = config.inputParam;
      	if (inputParam){
	          if (inputParam.type){
	              this.type = inputParam.type;
	          }
      	}
      	if(this.type == "HLHGTBalance"){
      		head.setTitle({"title":"沪港通专题"});
      	}
      	else{
      		head.setTitle({"title":"深港通专题"});
      	}
		self.getData(1);
        self.getData(2);
        self.gettitleData();
      	var intervalId=function(){
             timeHandle.setInterval(function(){
                //self.getData2();
                if(!self.isPageShow){
                  return;
                }
              self.getData(1);
              self.getData(2);
              self.gettitleData();
            },15002);
        };
        intervalId();
    },

    methods:{
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
            self.getData(1);
            self.getData(2);
            self.gettitleData();
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
            //获取时间函数
        getNowFormatDate:function(){
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          var currentdate = month + seperator1 + strDate
                  + " " + date.getHours() + seperator2 + date.getMinutes()
                  + seperator2 + date.getSeconds();
          return currentdate;
        },
    	goStockDetail:function(item,type){
        if(stockDetailUserJsHead){
          var data = [];
          if(type==1){
            data.push(this.firststocks);
            data.push(this.firstlist.indexOf(item));
          }
          else
          {
            data.push(this.secondstocks);
            data.push(this.secondlist.indexOf(item));
          }
          storage.setItem("stocklist",JSON.stringify(data));
          event.openURL(this.baseUrl + "navigator.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "&hideCutoverImage=" + true,{headHidden:true});
        }
        else{
          event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name));
        }
    	},

    	gettitleData:function(){
    		var self = this;
    		quoteDc.loadShangHaiSharesBalance(self.type,function(e){
          if(!self.isPageShow){
            return;
          }
        	var strs= new Array();
    			strs=e.split(",");
    			if(self.type == "HLHGTBalance"){
    				self.firsttitle = "沪股通";
    				self.lefttext= ""+strs[0];
    				self.lefttext2 = "沪股通当日剩余额度";
    				self.righttext = ""+strs[1];
    				self.righttext2 = "港股通当日剩余额度";
    			}
    			else{
    				self.firsttitle = "深股通";
    				self.lefttext= strs[0];
    				self.lefttext2 = "深股通当日剩余额度" +"\n" + "每日限额130亿";
    				self.righttext = strs[1];
    				self.righttext2 = "港股通当日剩余额度"+"\n" + "每日限额105亿";
    			}
        });
    	},

    	witchMore:function(flag){
    		switch(flag){
    			case 1:
					var params = {};
					if(this.type == "HLHGTBalance"){
						params = {
							"type" : "stock_rank",
							"title" : this.firsttitle,
							"markets" : [
								"XSHG.esa",
								"XSHE.esa",
								"XSHE.es.smse",
								"XSHE.es.gem"
							],
							"special_marker" : 16,
						};
					} else {
						params = {
							"type" : "stock_rank",
							"title" : this.firsttitle,
							"markets" : [
								"XSHE",
							],
							"special_marker" : 16777216,
						};
					}
					event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields);
    				break;
    			case 2:
					var params = {};
    				if(this.type == "HLHGTBalance"){
						params = {
							"type" : "stock_rank",
							"title" : this.secondtitle,
							"markets" : [
								"XHKG-M.es",
							],
							"special_marker" : 32,
						};
    				}
    				else{
						params = {
							"type" : "stock_rank",
							"title" : this.secondtitle,
							"markets" : [
								"XHKG-M.es",
							],
							"special_marker" : 1048576,
						};
    				}
					event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields);
    				break;
    		}
    	},

    	getData:function(index){
	        var block = "";
	        var self = this;
	        var prodcode="";
	        var special_marker=16;
	        if(index == 1){
	        	if(this.type == "HLHGTBalance"){
	          		prodcode="XSHG.esa,XSHE.esa,XSHE.es.smse, XSHE.es.gem";
	          		special_marker = 16;
	      		}
	      		else{
	      			prodcode = "XSHE";
	      			special_marker = 16777216;

	      		}
	        }
	        else if(index==2){
	        	prodcode="XHKG-M.es";
	        	if(this.type == "HLHGTBalance"){
	        		special_marker = 32;
	        	}
	        	else{
					special_marker = 1048576;
	        	}
	        }
	        block = {'en_hq_type_code':prodcode,'sort_field_name':'px_change_rate','fields':'prod_name,last_px,px_change_rate,hq_type_code,trade_status,special_marker','data_count':10,'sort_type':'1','special_marker':special_marker};
	    	quoteDc.loadRankingStocks(block,
	          function(e){
              if(!self.isPageShow){
                return;
              }
	            var rslist = JSON.stringify(e);
	            if(e1==rslist || e2==rslist){
	              return;
	            }

	            if(self.isEmptyObject(e)){
	              return;
	            }
	                var list = [];
	                list.splice(0,list.length);
	              var a = e.data.sort;
	                var fields = e.data.sort.fields;
	                 for (var r in a) {
	                    var i = {};
	                    if("fields" != r && parseFloat(a[r][fields.indexOf("last_px")]).toString() != "NaN"){
	                        var s=fields;
	                        i.prod_name = a[r][s.indexOf("prod_name")];
	                        i.prod_code =r.split('.')[0];
	                        i.prod_code_all=r;
	                        i.px_change_rate =parseFloat(a[r][s.indexOf("px_change_rate")]).toFixed(2);
	                        i.px_change =parseFloat(a[r][s.indexOf("px_change")]).toFixed(2);
	                        var prediff=a[r][s.indexOf("px_change_rate")];
	                        i.hq_type_code = a[r][s.indexOf("hq_type_code")];
	                        var marketType=common.getMarkType(i.hq_type_code);
	                        var fixnum=2;
	                        if( marketType =="MARKET_HK"){
	                        	fixnum=3;//港股last_px 需保留三位小数
	                        }
	                         i.last_px = parseFloat(a[r][s.indexOf("last_px")]).toFixed(fixnum);
	                        if(prediff.indexOf('%')>=0){
	                          i.px_change_rate = parseFloat(prediff.substring(0,prediff.length-1)).toFixed(2);
	                        }else{
	                          i.px_change_rate =prediff.toFixed(2);
	                        }
	                        i.px_change_rate_color =self.getColorWithNumber(i.px_change_rate);

	                        var specialM = a[r][s.indexOf("special_marker")];
	                        //n.marketicon= that.getMarketIcon(idx);
	                        i.busiFlag = getBusiFlag(i.hq_type_code,specialM);
	                        i.marketicon =getMarketIcon(i.hq_type_code);
	                        i.trade_status =a[r][s.indexOf("trade_status")];
	                        if(i.trade_status=="STOPT" ||  i.trade_status =="HALT")
	                          i.px_change_rate="停牌";
	                        list.push(i);
                    	}
	                }
	                if(index == 1){
	                  self.firstlist =self.quickSort(list);
                    self.firststocks=[];
                    for(var i = 0; i < self.firstlist.length;i++){
                      var stock = {};
                      stock.stock_code = self.firstlist[i].prod_code;
                      stock.code_type = self.firstlist[i].hq_type_code;
                      stock.stock_name = self.firstlist[i].prod_name;
                      self.firststocks.push(stock);
                    }
	                  e1 = [].concat(self.firstlist);
	                }else{
	                  self.secondlist =self.quickSort(list);
                    self.secondstocks=[];
                    for(var i = 0; i < self.secondlist.length;i++){
                      var stock = {};
                      stock.stock_code = self.secondlist[i].prod_code;
                      stock.code_type = self.secondlist[i].hq_type_code;
                      stock.stock_name = self.secondlist[i].prod_name;
                      self.secondstocks.push(stock);
                    }
	                  e2 = [].concat(self.secondlist);
	                }
	         });
	    },

    	getPriceChangePercent:function(rate,px_change){
	        if(rate=='停牌')
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

	    isEmptyObject:function(obj){
     		for(var key in obj){
          		return false;
     		}
     	return true;
		},
		quickSort:function(arr) {
      　　if (arr.length <= 1) { return arr; }
      　　var pivotIndex = Math.floor(arr.length / 2);
      　　var pivot = arr.splice(pivotIndex, 1)[0];
      　　var left = [];
      　　var right = [];
      　　for (var i = 0; i < arr.length; i++){

          if ( Number(arr[i].px_change_rate) < Number(pivot.px_change_rate) ) {
      　　　　　　right.push(arr[i])
      　　　　  } else {
      　　　　　　left.push(arr[i]);
      　　　　  }
      　　}
      　　return this.quickSort(left).concat([pivot], this.quickSort(right));
      },
      getColorWithNumber:function(priceChange){
          if(priceChange>0)
            return "#FF4500";
          else if(priceChange<0)
            return "#3CB371";
          else
            return "#333";
      },
      onViewappear:function(){
        this.isPageShow = true;
      },
      onViewdisappear:function(){
        this.isPageShow = false;
      },

    }
}

</script>
