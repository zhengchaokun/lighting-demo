<template>
    <!--搜索框-->
    <div @viewappear="onViewappear" style="background-color:#F9F4EA;">
        <div style="width:750;height:110;background-color:#F9F4EA;flex-direction: row;align-items:center;">
            <image style="width:30;height:30;margin-left:30;margin-right:20;" :src="baseUrl + 'image/hlkb_keyboard_btn_search.png'"></image>
            <input ref="edittext" disableSystemKeyboard="true" :value="inputcontent" style="width:575;height:80;margin-right:20;" placeholder="请输入代码/简码" return-key-type="go"  @focus="onFocus" type="keyboard"></input>
            <image style="width:30;height:30;margin-left:20;margin-right:30;" :src="baseUrl + 'image/hlkb_keyboard_btn_clean.png'" @click="onClick('cleaninput')" v-if="showDelet"></image>
        </div>
        <image style="width:750;height:1;background-color:#dddddd;"></image>
        <list style="flex: 12;" v-if='hasResult'>
            <cell v-for='item in resultlist'>

                <div style="flex-direction: row;align-items:center;width:750;height:100;" @click="onItemClick(item)">
                    <marketicon :icon="item.marketicon" marginType="search" style="height:25;margin-right:4;margin-top:2;visibility:hidden;"></marketicon>
                    <text style="line:1;font-size:35;color:#999999;text-align:left;" :value="item.displayCode"></text>

                    <div style="flex-direction: row;align-items:center; width:370px;margin-left:30;">
                        <text style="line:1;font-size:35;color:#999999;text-overflow:ellipsis;text-align:left;" :value="dealStockName(item.stockName)"></text>
                        <biz style="margin-left:8;" :iconItems="item.busiFlag"></biz>
                    </div>


                    <div style="position:absolute;width:85;height:100;top:0;right:0;padding-top:32.5;padding-bottom:32.5;padding-left:10;padding-right:40;" @click="onAddStockClick(item)">
                        <image style="position:absolute;width:35;height:35;" :src="item.icon"></image>
                    </div>
                </div>
                <image style="height:1;background-color:#dddddd"></image>
            </cell>
        </list>
        <image style="height:1;background-color:#dddddd" v-if='showHistory'></image>
        <div style="height:100;flex-direction: row;align-items:center;" v-if='showHistory'>
            <text style="width:750;line:1;font-size:35;color:#dddddd;text-align:center;" value="清除历史记录" @click="onClick('cleanhistory')"></text>
        </div>
        <image style="height:1;background-color:#dddddd" v-if='showHistory'></image>
        <keyboard ref="keyboard" style="width:750;height:440;" @onKeyboardClick="onKeyType" v-if="showKeyboard"></keyboard>
    </div>
</template>

<style>
    .key{
        width:150;
        height:110;
        font-size:60;
        color:#000000;
        text-align:center;
    }
</style>

<script>
    var head = weex.requireModule('head');
    const event = weex.requireModule('event');
    const dataCenter = weex.requireModule('dataCenter');
    const storage = weex.requireModule('storage');
    const getBusiFlag = require('./include/common-api.js').common.getBusiFlag;
    const getBaseURL = require('./include/base-url.js').getBaseURL;
    const getAbbreviation = require('./include/common-api.js').common.getAbbreviation;
    var getMarketIcon=require('./include/common-api.js').common.getMarketIcon;
    var stockDetailUserJsHead = require('./include/common-api.js').common.Constants.stockDetailUserJsHead;
    module.exports = {
        components: {
          	keyboard: require('./include/searchkeyboard.vue'),
          	biz: require('./include/busiFlagIcon.vue'),
            marketicon: require('./include/marketicon.vue'),
        },
        methods:{
            dealStockName:function(value){
                var alphareg=/^[A-Z a-z0-9]+$/;
                if (value!=undefined) {
                    if(!alphareg.test(value)){
                        if(value.length>8){
                            value=value.substring(0,8)+"...";
                        }
                    }
                }
                return value;
            },
            onClick:function(type){
                if(type=="cleaninput"){
                    this.inputcontent = "";
                    this.showDelet = false;
                    if(this.historylist.length!=0){
                        this.resultlist = this.historylist;
                        this.showHistory = true;
                    }else{
                        this.resultlist = [];
                        this.showHistory = false;
                    }
                }else if(type=="cleanhistory"){
                    this.historylist = [];
                    this.saveHistoryList();
                    this.showHistory = false;
                    this.resultlist = [];
                }
            },
            onAddStockClick:function(item){
                //由于这个逻辑必定是在列表出现之后才会被调用到的，并且在展现列表的时候已经判断过这只股票是否已经添加至自选股，因此为了节省时间复杂度，采用利用icon值来判断。
                //并且在搜索页面是不支持删除个股的
                var tmp = item.icon;
                if(tmp.indexOf('hlkb_add_stock.png') > 0){
                    item.icon= this.baseUrl + "image/hlkb_exist_stock.png";
                    var key = "";
                    if(this.myStockList.length==0||this.myStockList[0]==""){
                        key = item.stockMarket.split('.')[0]+"-"+item.stockCode;
                    }else{
                        key = this.myStockList.join(',') + "," + item.stockMarket.split('.')[0]+"-"+item.stockCode;
                    }
                    dataCenter.saveMyStocks(key,null);
                    this.getMyStockList();
                }
            },
            onItemClick:function(item){
                var has = false;
                for(var i in this.historylist){
                    if(this.historylist[i].stockCode==item.stockCode&&this.historylist[i].stockMarket==item.stockMarket){
                        has = true;
                    }
                }
                if(!has)this.historylist.push(item);
                this.saveHistoryList();
                if (stockDetailUserJsHead) {
                        event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.stockCode + "&codeType=" + item.stockMarket + "&stockName=" + encodeURIComponent(item.stockName) + "#/navigator",{headHidden:true});
                }
                else{
                    event.openURL(this.baseUrl + "app.native.js?stockCode=" + item.stockCode + "&codeType=" + item.stockMarket + "&stockName=" + encodeURIComponent(item.stockName) + "#/stockDetail");
                }
            },
            // onInput:function(event){
            //     this.inputcontent = event.value;
            //     this.requestResult(this.inputcontent,e=>{
            //         var result = e.data;
            //         this.resultlist = [];
            //         for(var i in result){
            //             var item={};
            //             item.stockCode = result[i].prod_code;
            //             item.stockName = result[i].prod_name;
            //             item.stockMarket = result[i].hq_type_code;
            //             item.specialMarket = result[i].special_marker;
            //             item.busiFlag = getBusiFlag(item.stockMarket,item.specialMarket);
            //             item.displayCode = item.stockCode+"."+getAbbreviation(item.stockMarket);
            //             item.icon = this.changeIcon(item.stockCode,item.stockMarket);
            //             this.resultlist.push(item);
            //         }
            //     });
            // },
            onFocus:function(){
                this.showKeyboard = true;
            },
            onKeyType:function(key){
                if(key!="delet"&&key!=""&&key!="down"&&key!="ok"){
                    this.inputcontent += key;
                    this.showDelet = true;
                    this.showHistory = false;
                }else if(key=="delet"){
                    this.inputcontent = this.inputcontent.substring(0,this.inputcontent.length-1);
                    if(this.inputcontent==""){
                        this.showDelet = false;
                        this.resultlist = [];
                        if(this.historylist.length!=0){
                            this.resultlist = this.historylist;
                            this.showHistory = true;
                        }
                    }
                }else if(key==""){
                    this.inputcontent = "";
                    this.showDelet = false;
                    this.resultlist = [];
                    if(this.historylist.length!=0){
                        this.resultlist = this.historylist;
                        this.showHistory = true;
                    }
                }else if(key=="down"||key=="ok"){
                    this.showKeyboard=false;
                    this.$refs.edittext.blur();
                }
            },
            getHistoryList:function(){
                //取出存储的历史搜索记录
                var that = this;
                storage.getItem('historylist', event => {
                    if(event.result=="success"){
                        this.historylist = JSON.parse(event.data);
                        if(this.historylist.length==0){
                            this.showHistory = false;
                        }else{
                            this.resultlist = this.historylist;
                            this.showHistory = true;
                        }
                    }else{
                        this.showHistory = false;
                    }
                });
            },
            saveHistoryList:function(){
                //存储历史搜索记录
                //ios storagemodule value只能string 和number类型
                var str =JSON.stringify(this.historylist);
                storage.setItem('historylist', str, event => {});
            },
            requestResult:function(keyword,callback){
                //"XSHG,XSHE,XNAS,XASE,XNYS,XBHS,XHKG-I,XHKG-M,XHKG-G,XBHK,CCFX,XSGE,XDCE,XZCE,CFFE,CSI,NEEQ,XBUS"
                //如果当前app行情不在上面列的上次中，请增加en_finance_mic字段中，如果'en_finance_mic':'CSHW,XSHW'
                dataCenter.queryStocks({'prod_code':keyword,'data_count':'10'},callback);
            },
            getMyStockList:function(){
                var that = this;
                dataCenter.getMyStocks(function(res){
                    var oriData = res;
                    that.myStockList = oriData.split(",");
                    that.updateList();
                });
            },
            changeIcon:function(stockcode,stockmarket){
                for(var j in this.myStockList){
                    var key = this.myStockList[j];
                    var market = key.substring(0,key.lastIndexOf('-'));
                    var code = key.substr(key.lastIndexOf('-')+1);
                    if(stockcode==code&&stockmarket.split('.')[0]==market){
                        return this.baseUrl + "image/hlkb_exist_stock.png";
                    }
                }
                return this.baseUrl + "image/hlkb_add_stock.png";
            },
            onViewappear:function(){
                this.getMyStockList();
            },
            updateList:function(){
                if(this.resultlist.length!=0){
                    for(var i in this.resultlist){
                        this.resultlist[i].icon = this.changeIcon(this.resultlist[i].stockCode
                        ,this.resultlist[i].stockMarket);
                    }
                }
                if(this.historylist.length!=0){
                    for(var i in this.historylist){
                        this.historylist[i].icon = this.changeIcon(this.historylist[i].stockCode
                        ,this.historylist[i].stockMarket);
                    }
                }
            }
        },
        data:function(){
            return{
                inputcontent:'',
                hasResult:true,
                showDelet:true,
                showHistory:true,
                showKeyboard:true,
                resultlist:[],
                historylist:[],
                myStockList:[],
                baseUrl:''
            }
        },
        created:function(){
            this.getHistoryList();
            this.getMyStockList();
            this.baseUrl =getBaseURL(this);
            head.setTitle({title:"搜索"});
        },
        watch:{
            inputcontent:function(value){
                if (!value || value == ""){
                    return;
                }
                this.requestResult(value,e=>{
                    var result = e.data;
                    this.resultlist = [];
                    for(var i in result){
                        var item={};
                        item.stockCode = result[i].prod_code;
                        item.stockName = result[i].prod_name;
                        item.stockMarket = result[i].hq_type_code;

                        if(item.stockMarket != undefined){
                            var stockMarektTemp=item.stockMarket.toUpperCase();
                            if(stockMarektTemp.indexOf('XNAS')!=-1 ||
                               stockMarektTemp.indexOf('XNAS.MRI')!=-1 ||
                               stockMarektTemp.indexOf('XNAS.EU')!=-1 ||
                               stockMarektTemp.indexOf('XNAS.ES')!=-1 ||
                               stockMarektTemp.indexOf('XASE')!=-1 ||
                               stockMarektTemp.indexOf('XASE.MRI')!=-1 ||
                               stockMarektTemp.indexOf('XASE.EU')!=-1 ||
                               stockMarektTemp.indexOf('XASE.ES')!=-1 ||
                               stockMarektTemp.indexOf('XNYS')!=-1 ||
                               stockMarektTemp.indexOf('XNYS.MRI')!=-1 ||
                               stockMarektTemp.indexOf('XNYS.EU')!=-1 ||
                               stockMarektTemp.indexOf('XNYS.ES')!=-1 ||
                               stockMarektTemp.indexOf('XBUS')!=-1
                            ){
                                continue;
                            }
                        }
                        item.specialMarket = result[i].special_marker;
                        item.busiFlag = getBusiFlag(item.stockMarket,item.specialMarket);
                        var ss = getAbbreviation(item.stockMarket);
                        item.displayCode = item.stockCode+ (ss.length>0?("."+ss):'');
                        item.icon = this.changeIcon(item.stockCode,item.stockMarket);
                        item.marketicon =getMarketIcon(result[i].hq_type_code);
                        this.resultlist.push(item);
                    }
                });
            }
        }
    }
</script>
