<template>
    <div>
        <scroller >
            <text style="font-size:40;margin-left:5;padding: 10;background-color:gray;">性能测试对比</text>
            <div style="width:750px;margin-left:30;">
                <text class="item" @click="onClick('web','http://0t3jsu83.lightyy.com/index.html')">1 h5行情</text>
                <text class="item" @click="onClick('jsnative','https://www.lightyy.com/apps/weex-test/quote.js')">2 jsnative行情 </text>
                <text class="item" @click="onClick('jsnative','https://jzzuag2o3.lightyy.com/quote.js')">3 jsnative行情(流式) </text>
                <text class="item" @click="onClick('web','http://0t3jsu83.lightyy.com/index.html#stockquote/002892.SZ,shstock')">4 h5个股详情</text>
                <text class="item" @click="onClick('jsnative','https://www.lightyy.com/apps/weex-test/navigator.js?stockCode=002892&codeType=XSHE.ESA.SMSE&stockName=N%E7%A7%91%E5%8A%9B%E5%B0%94&hideCutoverImage=true')">5 jsnative个股详情</text>
                <text class="item" @click="onClick('jsnative','https://jzzuag2o3.lightyy.com/navigator.js?stockCode=002892&codeType=XSHE.ESA.SMSE&stockName=N%E7%A7%91%E5%8A%9B%E5%B0%94&hideCutoverImage=true')">6 jsnative个股详情(流式)</text>
                <text class="item" @click="onClick('web','http://0t3jsu83.lightyy.com/index.html#hotblock/XBHS.HY,XBHS.GN;热门板块')">7 H5板块</text>
                <text class="item" @click="onClick('jsnative','https://www.lightyy.com/apps/weex-test/stockrank.js?markets_params=%7B%22type%22%3A%22block_rank%22%2C%22title%22%3A%22%E7%83%AD%E9%97%A8%E6%9D%BF%E5%9D%97%22%2C%22marketslist%22%3A%5B%22XBHS.HY%2CXBHS.GN%22%2C%22XBHS.HY%22%2C%22XBHS.GN%22%2C%22XBHS.DY%22%5D%2C%22marketsnamelist%22%3A%5B%22%E7%83%AD%E9%97%A8%22%2C%22%E8%A1%8C%E4%B8%9A%22%2C%22%E6%A6%82%E5%BF%B5%22%2C%22%E5%9C%B0%E5%9F%9F%22%5D%7D&fields=prod_name,hq_type_code,px_change_rate,rise_first_grp,stock_px_change_rate,px_change,last_px,open_px,high_px,low_px,business_amount,business_balance,preclose_px,shares_per_hand')">8 jsnative板块</text>
                <text class="item" @click="onClick('jsnative','https://jzzuag2o3.lightyy.com/stockrank.js?markets_params=%7B%22type%22%3A%22block_rank%22%2C%22title%22%3A%22%E7%83%AD%E9%97%A8%E6%9D%BF%E5%9D%97%22%2C%22marketslist%22%3A%5B%22XBHS.HY%2CXBHS.GN%22%2C%22XBHS.HY%22%2C%22XBHS.GN%22%2C%22XBHS.DY%22%5D%2C%22marketsnamelist%22%3A%5B%22%E7%83%AD%E9%97%A8%22%2C%22%E8%A1%8C%E4%B8%9A%22%2C%22%E6%A6%82%E5%BF%B5%22%2C%22%E5%9C%B0%E5%9F%9F%22%5D%7D&fields=prod_name,hq_type_code,px_change_rate,rise_first_grp,stock_px_change_rate,px_change,last_px,open_px,high_px,low_px,business_amount,business_balance,preclose_px,shares_per_hand')">9 jsnative板块(流式)</text>
                <text class="item" @click="onClick('playground','http://192.168.2.23:8081/index.js')">10 yy app</text>
                <text class="item" @click="onClick('jsnative','http://192.168.2.23:8081/index.js')">11 yy app</text>
                <text class="item" @click="onClick('web','http://192.168.2.23:12580/index.html')">12 yy app h5 </text>
                <text class="item" @click="onClick('jsnative','http://192.168.2.23:12580/examples/build/index.js')">13 yy app </text>
            </div>
        </scroller> 
        <scroller v-if="isShowResult" class="result">
                <text style="text-align:left;font-size:32;padding:20;color:white;background-color:red;" @click="onClose" >返回</text>
                <image style="width:700;height:700;" v-if="imageSrc!=''" :src="imageSrc"></image>
                <text :value="result"></text>
        </scroller>
    </div>  
</template>

<style>
    .result{
        position: absolute;
        top:0;
        left: 0;
        width:750;
        bottom: 0;
        background-color: gray;
    }
    .item{
        padding: 26;
        font-size: 30;
        border-bottom-width: 1;
        border-bottom-color: gray;
    }
</style>

<script>
    var navigator = weex.requireModule('navigator');
    var event = weex.requireModule('event');
    //var LightJSBridge = weex.requireModule('LightJSBridge');
    module.exports = {
        methods:{
            onClick:function(action,url){
                var that = this;
                var param = {};
                if ("web" == action){
                    event.openNative("web", {"startPage":url});
                }else if("jsnative" == action){
                    if (url.indexOf('navigator.js')>0){
                        event.openURL(url,{headHidden:true});
                    }else{
                        event.openURL(url);
                    }
                }else if("playground" == action){
                    var params = {
                        'url': url,
                        'animated' : 'true',
                    }
                    navigator.push(params);    
                }else if ("native.showDialog" == action){
                    param.title = "test";
                    param.message = "nihao a 1234";
                    param.buttons = ["确定","取消"];
                }else if ("native.setScreenOrientation" == action){
                    param.screenOrientation = "landscape_right";
                }else if ("native.setScreenOrientation" == action){
                    param.aspectXY = "1:1";
                    param.maxWidth = "200";
                    param.cropPhoto = "1:1";
                }else if ("native.writeData" == action){
                    param.key = "writeDataKey";
                    param.value = "writeData_test";
                    param.scope = "jsnative";
                    param.domain = "memory";
                }else if ("native.readData" == action){
                    param.key = "writeDataKey";
                    param.scope = "jsnative";
                    param.domain = "memory";
                }else if ("native.deleteData" == action){
                    param.key = "writeDataKey";
                    param.scope = "jsnative";
                    param.domain = "memory";
                }else if ("native.setClipBoardContent" == action){
                    param.value = "setClipBoardContent_test";
                }else if ("native.fetchURL" == action){
                    param.url = "http://www.baidu.com";
                }else if ("native.imageAction" == action){
                    param.image = "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_9d645d9.png";
                }else if ("native.badge" == action){
                    param.type = "show";
                    param.badgeId = "show";
                }else if ("qrcode.gen" == action){
                    param.desc = "http://www.baidu.com";
                    param.size = "500";
                }
                /*LightJSBridge.call(action,param,function(ret){
                    that.isShowResult = true;
                    that.imageSrc= '';
                    that.result = '';
                    if (action == "qrcode.gen" || action == "native.chooseImage"){
                        that.imageSrc= "data:image/png;base64," + ret.data.result;
                    }else{
                        that.result = JSON.stringify(ret); 
                    }
                    
                    
                });*/
            },
            onClose:function(){
                this.isShowResult = false;
            }
        },
        data:function(){
            return{
                isShowResult:false,
                imageSrc:'',
                result:"",
                baseUrl:''
            }
        },
        created:function(){

        }
    }
</script>
