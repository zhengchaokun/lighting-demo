<template>
    <list>
        <refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh">
          <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext" ></text>
        </refresh>

        <cell>
    	<div>

    		<collapseview ref="coll1" title="热门中概股" rightTitle="•••" rightFontColor="#ccc" @rightonclick="onRightClick(ranklistparams[0])" >
    			<div v-for="item in hotlist">
      			<ranklistItem @onClickItem="goStockDetail(item,1)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color" :marketicon="item.marketicon"></ranklistItem>
            <div style="height: 1;background-color: #ddd;margin-top: 5;margin-bottom: 5"></div>
    			</div>
    		</collapseview>

    		<collapseview ref="coll2" title="知名美股" :showContent="show3"  rightTitle="•••" rightFontColor="#ccc" @rightonclick="onRightClick(ranklistparams[1])">
    			<div v-for="item in uslist">
    				<ranklistItem @onClickItem="goStockDetail(item,2)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color" :marketicon="item.marketicon"></ranklistItem>
            <div style="height: 1;background-color: #ddd;margin-top: 5;margin-bottom: 5"></div>
    			</div>
    		</collapseview>

    		<collapseview ref="coll3" title="中概股" :showContent="show4" rightTitle="•••" rightFontColor="#ccc" @rightonclick="onRightClick(ranklistparams[2])">
    			<div v-for="item in chlist">
    			<ranklistItem @onClickItem="goStockDetail(item,3)" :stockName="item.prod_name" :stockCode="item.prod_code_all" :stockPrice="item.last_px" :stockRate="getPriceChangePercent(item.px_change_rate,0)" :busiFlag="item.busiFlag" :rateColor="item.px_change_rate_color" :marketicon="item.marketicon"></ranklistItem>
            <div style="height: 1;background-color: #ddd;margin-top: 5;margin-bottom: 5"></div>
    			</div>
    		</collapseview>

    	</div>
      </cell>
    </list>
</template>

<style>
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
	  //var log = weex.requireModule('jslog');
	  var stream = weex.requireModule('stream');
	  var event = weex.requireModule('event');
    var quoteDc = weex.requireModule('dataCenter');
    var timeHandle = weex.requireModule('timer') || {};
    var getBaseURL = require('./base-url.js').getBaseURL;
    var stockDetailUserJsHead = require('./common-api.js').common.Constants.stockDetailUserJsHead;
    var getBusiFlag = require('./common-api.js').common.getBusiFlag;
    var getMarketIcon=require('./common-api.js').common.getMarketIcon;

    const storage = weex.requireModule('storage');
    var e1={};
    var e2={};
    var e3={};
    var date = '';
	module.exports={
		props: {
      isPageShow:{default:true},
		},
		data:function(){
			return{
    			hotlist:[],
          hotstocks:[],
    			uslist:[],
          usstocks:[],
    			chlist:[],
          chstocks:[],
          baseUrl: "",
          refreshing:'hide',
          refreshtext:'',
          refreshFlag:false,
          show3:false,
          show4:false,

          fields: 'prod_name,hq_type_code,last_px,px_change_rate,px_change,business_amount,shares_per_hand',
          "ranklistparams": [
            {
              "type": "stock_rank",
              "title": "热门中概股",
              "prod_code": "HO0500.XBUS"
            },
            {
              "type": "stock_rank",
              "title": "知名美股",
              "prod_code": "MX0001.XBUS"
            },
            {
              "type": "stock_rank",
              "title": "中概股",
              "prod_code": "ZG0001.XBUS"
            },
          ]
			}
		},

	components: {
      collapseview: require('./collapseview.vue'),
      ranklistItem: require('./ranklistItem.vue'),
    },

    created:function(){
        var self = this;
        self.baseUrl = getBaseURL(this);
        date = self.getNowFormatDate();
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
                this.getData(1,this.hotlist);
                this.getData(2,this.chlist);
                this.getData(3,this.uslist);
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
    	onRightClick:function(params){
    		if (params.type == "block_rank") {

            } else if (params.type == "stock_rank") {
                event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields);
            }
    	},
    	goStockDetail:function(item,type){
        if(stockDetailUserJsHead){
          var data = [];
          if(type==1){
            data.push(this.hotstocks);
            data.push(this.hotlist.indexOf(item));
          }
          else if(type==2){
            data.push(this.usstocks);
            data.push(this.uslist.indexOf(item));
          }
          else
          {
            data.push(this.chstocks);
            data.push(this.chlist.indexOf(item));
          }
          storage.setItem("stocklist",JSON.stringify(data));
          event.openURL(this.baseUrl + "navigator.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name) + "&hideCutoverImage=" + true,{headHidden:true});
        }
        else{
          event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + item.prod_code + "&codeType=" + item.hq_type_code + "&stockName=" + encodeURIComponent(item.prod_name));
        }
    	},
      getColorWithNumber:function(priceChange){
          if(priceChange>0)
              return "#FA3E48";
          else if(priceChange<0)
              return "#249b3a";
          else
              return "#a3a3a3";
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
    	//1热门中概股 2中概股 3知名美股
    	getData:function(index){
        var block = "";
        var self = this;
        var prodcode="";
        if(index == 1){
          prodcode="HO0500.XBUS";
        }
        else if(index==2){
           prodcode="ZG0001.XBUS";
        }
        else if(index ==3){
          prodcode="MX0001.XBUS";
        }
        block = {'prod_code':prodcode,'sort_field_name':'px_change_rate','fields':'prod_name,last_px,px_change_rate,hq_type_code,trade_status,special_marker','data_count':10,'sort_type':'1'};
    		quoteDc.loadBlockStocks(block,
          function(e){
            if(!self.isPageShow){
              return;
            }
            var rslist = JSON.stringify(e);
            //log.e(rslist);
            if(e1==rslist || e2==rslist || e3==rslist){
              return;
            }

            if(self.isEmptyObject(e)){
                    //log.i("美股"+"空");
              return;
            }
                var list = [];
                list.splice(0,list.length);
              var a = e.data.sort;
              if(typeof(a) == "undefined" || self.isEmptyObject(a))
              return ;
                var fields = e.data.sort.fields;
                 for (var r in a) {
                    var i = {};

                    if("fields" != r && parseFloat(a[r][fields.indexOf("last_px")]).toString() != "NaN"){
                        var s=fields;
                        i.prod_name = a[r][s.indexOf("prod_name")];
                        i.prod_code =r.split('.')[0];
                        i.prod_code_all=r;
                        i.last_px = parseFloat(a[r][s.indexOf("last_px")]).toFixed(3);
                        i.px_change_rate =parseFloat(a[r][s.indexOf("px_change_rate")]).toFixed(2);
                        i.px_change =parseFloat(a[r][s.indexOf("px_change")]).toFixed(2);
                        var prediff=a[r][s.indexOf("px_change_rate")];
                        if(prediff.indexOf('%')>=0){
                          i.px_change_rate = parseFloat(prediff.substring(0,prediff.length-1)).toFixed(2);
                        }else{
                          i.px_change_rate =prediff.toFixed(2);
                        }

                        i.hq_type_code = a[r][s.indexOf("hq_type_code")];
                        var specialM = a[r][s.indexOf("special_marker")];
                        //n.marketicon= that.getMarketIcon(idx);
                        i.busiFlag = getBusiFlag(i.hq_type_code,specialM);
                        i.marketicon =getMarketIcon(i.hq_type_code);
                        i.trade_status =a[r][s.indexOf("trade_status")];
                        if(i.trade_status=="STOPT" ||  i.trade_status =="HALT")
                          i.px_change_rate="停牌";
                        i.px_change_rate_color =self.getColorWithNumber(i.px_change_rate);
                        list.push(i);
                    }
                }
                 if(index == 1){
                  self.hotlist=self.quickSort(list);
                  self.hotstocks = [];
                  for(var i=0; i<self.hotlist.length; i++){
                    var stock = {};
                    stock.stock_code = self.hotlist[i].prod_code;
                    stock.code_type = self.hotlist[i].hq_type_code;
                    stock.stock_name = self.hotlist[i].prod_name;
                    self.hotstocks.push(stock);
                  }
                 }else if(index==2){
                  self.chlist =self.quickSort(list);
                  self.chstocks = [];
                  for(var i=0; i<self.chlist.length; i++){
                    var stock = {};
                    stock.stock_code = self.chlist[i].prod_code;
                    stock.code_type = self.chlist[i].hq_type_code;
                    stock.stock_name = self.chlist[i].prod_name;
                    self.chstocks.push(stock);
                  }
                 }else{
                  self.uslist =self.quickSort(list);
                  self.usstocks = [];
                  for(var i=0; i<self.uslist.length; i++){
                    var stock = {};
                    stock.stock_code = self.uslist[i].prod_code;
                    stock.code_type = self.uslist[i].hq_type_code;
                    stock.stock_name = self.uslist[i].prod_name;
                    self.usstocks.push(stock);
                  }
                 }
          });
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
      refreshOnTime:function(){
        this.getData(1);
        this.getData(2);
        this.getData(3);
      }
	},
}
</script>
