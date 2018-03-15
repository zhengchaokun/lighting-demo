
<template>
    <div>
        <div class="buyCont" :class="{'buyStyle':type==1,'sellStyle':type==2}">  <!--卖出用sellStyle-->
            <choose :select="select" :name="selectName" @getParam="getParam" v-if="ifSelect"></choose>
            <div class="itemList lineColor">
                <div class="subitem" @click="toSelect('fundName',fund)">
                    <span>产品</span><span>{{curFund?curFund.fundName:'--'}}</span><em>选择</em>
                </div>
                <div class="subitem" @click="toSelect('combiName',combi)">
                    <span>组合</span><span>{{curCombi?curCombi.combiName:'--'}}</span><em>选择</em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem flex">
                    <span>合约代码</span>
                    <form class="flex1" action="javascript:void(0)" submit="filterCode()">
                        <input type="search" v-model="reportCode" placeholder="">
                    </form>
                </div>
            </div>
            <div class="codeWrap flex">
                <div class="codeSelect">
                    <ul>
                        <li :class="{'select':direc==0}" @click="direc=0">开仓</li>
                        <li :class="{'select':direc==1}" @click="direc=1">平仓</li>
                    </ul>
                    <ul>
                        <li :class="{'select':investType=='a'}" @click="investType='a'">投机</li>
                        <li :class="{'select':investType=='b'}" @click="investType='b'">套保</li>
                        <li v-if="quote.marketNo=='7'" :class="{'select':investType=='c'}" @click="investType='c'">套利</li>
                        
                    </ul>
                </div>
                <div class="codeMarket flex1">
                    <p><span>沪深1806</span><span class="fright">IF1806</span></p>
                    <p @click="codePrice=quote.bidPrice1"><em class="direc">卖出</em><em class="price">{{quote.bidPrice1}}</em><em class="num">{{quote.bidVolume1}}</em></p>
                    <p @click="codePrice=quote.askPrice1"><em class="direc">买入</em><em class="price">{{quote.askPrice1}}</em><em class="num">{{quote.askVolume1}}</em></p>
                    <div class="marketDetail flex">
                        <ul class="flex1">
                            <li><span>最新</span><em>{{quote.lastPrice}}</em></li>
                            <li><span>涨跌</span><em>{{quote.priceChange}}</em></li>
                            <li><span>幅度</span><em>{{quote.priceChangeRate}}</em></li>
                            <li><span>总手</span><em class="colorOrange">{{quote.totalAmount}}</em></li>
                            <li><span>现手</span><em class="colorOrange">{{quote.currentAmount}}</em></li>
                            <li><span>涨停</span><em>{{quote.uplimitedPrice}}</em></li>
                            <li><span>跌停</span><em class="colorGreen">{{quote.downlimitedPrice}}</em></li>
                        </ul>
                        <ul class="flex1">
                            <li><span>结算</span><em class="colorGreen">{{quote.preSettlePrice}}</em></li>
                            <li><span>昨结</span><em>{{quote.preHoldAmount}}</em></li>
                            <li><span>今开</span><em class="colorGreen">{{quote.openPrice}}</em></li>
                            <li><span>最高</span><em>{{quote.highPrice}}</em></li>
                            <li><span>最低</span><em class="colorGreen">{{quote.lowPrice}}</em></li>
                            <li><span>持仓</span><em class="colorOrange">{{quote.holdAmount}}</em></li>
                            <li><span>日增</span><em class="colorOrange">{{quote.priceInterval}}</em></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令价格</span><i @click="changePrice(0)">-</i><input v-model="codePrice" type="number" ><i @click="changePrice(1)">+</i>
                </div>
            </div>
            <div class="upDown">
                <span>涨停<em class="colorRed">{{quote.uplimitedPrice}}</em></span> 
                <span>跌停<em class="colorGreen">{{quote.downlimitedPrice}}</em></span>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令数量</span><i @click="changePrice(2)">-</i><input v-model="codeNum" type="number" value="0"><i @click="changePrice(3)">+</i>
                </div>
            </div>
            <div class="upDown">
                <span>{{type==1?"可买数量":"可卖数量"}}<em class="colorRed">{{enableNum?enableNum:0}}</em></span> 
            </div>
            <div class="itemList">
                <div class="subitem" @click="toSelect('operatorName',operator)">
                    <span>交易员</span><span>{{curOperator?curOperator.operatorName:'--'}}</span><em>选择</em>
                </div>
            </div>
            <div class="itemList tips flex">
                <span>备注</span><textarea class="flex1" v-model="tips" name="" id="" cols="40" rows="3"></textarea>
            </div>
            <div class="sureBut" @click="buy()"><button>下单</button></div>
        </div>
    </div>
</template>
<script>
    import choose from "../../../ui/select.vue";
    const API = require("api");
    const Dialog = require("dialog")
    export default {
        data(){
            return {
                type:0,//买卖方向
                ifSelect:false,//
                selectName:"",//选择组件中要展示的字段名字
                select:[],//选择组件中的列表信息
                curFund:[],//当前选中的产品
                curCombi:[],//当前选中组合
                curOperator:[],//当前选中操作员
                fund:[],//产品列表
                combi:[],//组合列表
                operator:[],//操作员
                quote:{},//行情信息
                codePrice:0,//指令价格
                codeNum:0, //指令数量
                tips:"", //备注
                direc:'0', //平仓开仓
                investType:"a", //投资类型
                enableNum:0,//可买可卖数量，买时enableNum=可用金额/(指令价格*合约乘数），卖时enableNum = 可用数量
                enableAmount:0,//可用数量
                enableBalance:0, //可用金额
                priceInterval:0.2, //价格加减步长
                numInterval:{
                        buyUnit:1,
                        saleUnit:2
                    },
                multiple:0, //合约乘数
                marketNo:"", //交易市场
                reportCode:"" //证券代码
            }
        },
        watch:{
            '$route.query.type':function(){
                this.type =this.$route.query.type
            },
            'reportCode':function(){
                this.filterCode();
            },
            'type':function(){
                this.amountChange();
            },
            'codePrice':function(){
                this.amountChange();
            },
            'curCombi':function(){
                this.enableBalanceGet();
            }
        },
        methods:{
            //可买可卖数量变动
            amountChange(){
                var that = this;
                if(that.type==1){
                    that.enableNum = parseInt(Number(that.enableBalance)/(Number(that.codePrice)*that.multiple))
                }else if(that.type==2){
                    console.log(that.enableAmount);
                    that.enableNum = that.enableAmount
                }
            },

            //选择弹框内容选中
            getParam(item){
                var that = this;
                if(item.combiName){
                    that.curCombi=item;
                }else if(item.fundName){
                    that.curFund=item;
                    //查询组合
                    API.combiGet({
                        fundId:that.curFund.fundId,
                        dataRight:""
                    }).then(function (data) {
                        that.combi = data;
                        
                    })
                }else if(item.operatorName){
                    that.curOperator=item
                }
                that.ifSelect = false;
            },

            //选择弹框显示
            toSelect(name,list){
                var that = this;
                if(name=='combiName'&&that.curFund.length==0){
                    Dialog.alert("请先选择一个产品");
                    return false;
                }
                that.ifSelect = true;
                that.select = list;
                that.selectName = name;
            },

            //输入合约代码
            filterCode(){
                var that =this;

                //校验合约代码、获取合约乘数、价格加减步长、数量加减步长
                API.futureInfoGet({
                    reportCode:that.quote.reportCode
                }).then(function (data) {
                    that.priceInterval = data[0].priceInterval;
                    that.multiple = data[0].multiple;
                    that.numInterval = {
                        buyUnit:data[0].buyUnit,
                        saleUnit:data[0].saleUnit
                    };
                    API.stockQuoteGet({
                        marketNo:data[0].marketNo,
                        reportCode:that.reportCode
                    }).then(function (data) {
                        that.quote = data;
                    })
                })
                
                that.amountChange();
            },

            //价格数量加减
            changePrice(changetype){
                var that =this;
                var numUnit = 0;
                if(that.type==1){
                    numUnit=that.numInterval.buyUnit
                }else if(that.type==2){
                    numUnit=that.numInterval.saleUnit
                }
                if(changetype==0){
                    that.codePrice=(Number(that.codePrice)-that.priceInterval).toFixed(3);
                    if(that.codePrice<0){
                        that.codePrice=0
                    }
                }else if(changetype==1){
                    that.codePrice=(Number(that.codePrice)+that.priceInterval).toFixed(3);
                    if(that.codeNum>that.enableNum){
                        that.codeNum=that.enableNum
                    }
                }else if(changetype==2){
                    that.codeNum=Number(that.codeNum)-numUnit;
                    if(that.codeNum<0){
                        that.codeNum=0
                    }
                }else if(changetype==3){
                    that.codeNum=Number(that.codeNum)+numUnit;
                    if(that.codeNum>that.enableNum){
                        that.codeNum=that.enableNum
                    }
                }
            },
            //获取可用金额
            enableBalanceGet(){
                var that = this;
                API.enableBalanceGet({
                    combiId:that.curCombi.combiId
                }).then(function (data) {
                    that.enableBalance = data.enableBalance;
                })
            },
            //获取可用数量
            enableAmountGet(){
                var that = this;
                API.enableAmountGet({
                    combiId:that.curCombi.combiId,
                    marketNo:that.quote.marketNo,
                    reportCode:that.quote.reportCode,
                    investType:that.investType,
                    positionType:1
                }).then(function (data) {
                    that.enableAmount = data.enableAmount;
                })
            },
            //获取买卖方向
            getEntrustDirection(type,direc){
                var that = this;
                switch (type){
                    case 1 : 
                    if(direc=='0'){
                        return '32'
                    }
                    if(direc=='1'){
                        return '35'
                    }
                    case 2:
                    if(direc=='0'){
                        return '33'
                    }
                    if(direc=='1'){
                        return '34'
                    }
                }
            },
            buy(){
                var that = this;
                if(that.curFund.length==0){
                    Dialog.alert("请先选择一个产品");
                    return false;
                }
                if(that.curCombi.length==0){
                    Dialog.alert("请先选择一个组合");
                    return false;
                }
                if(!that.reportCode){
                    Dialog.alert("请输入合约代码");
                    return false;
                }
                if(!that.codePrice||that.codePrice==0){
                    Dialog.alert("请输入指令价格");
                    return false;
                }
                if(!that.codeNum||that.codeNum==0){
                    Dialog.alert("请输入指令数量");
                    return false;
                }
                var re = /^[0-9]*[1-9][0-9]*$/;
                if(!(re.test(that.codeNum))){
                    Dialog.alert("指令数量必须为正整数");
                    return false;
                }
                Dialog.confirm({
                    msg:'是否确定下单？',
                    confirmText:"确定",
                    cancelText:"取消",
                    confirm(){
                        API.insAdd({
                            "fundId": that.curFund.fundId,
                            "combiId":that.curCombi.combiId,
                            "marketNo": that.marketNo,
                            "reportCode": that.reportCode,
                            "insAmount": that.codeNum,
                            "insPrice": that.codePrice,
                            "entrustDirection": that.getEntrustDirection(that.type,that.direc),
                            "opTradeNo": that.curOperator.operatorNo,
                            "investType": that.investType,
                            "remark": that.tips
                        }).then(function (data) {
                            
                        })
                    }
                })
            }
        },
        components:{
            choose
        },
        mounted(){
            this.type =this.$route.query.type;
            var that = this;
            //查询产品
            API.fundQuery({
                dataRight:""
            }).then(function (data) {
                that.fund = data;
                
            })
            
            //查询交易员
            API.opTradeInfoGet({}).then(function (data) {
                that.operator = data;
            })

            var transParam = that.$route.query;
            if(transParam.fundName){
                that.type = transParam.type;
                that.curFund.fundName = transParam.fundName;
                that.curFund.fundId = transParam.fundId;
                that.curCombi.combiId = transParam.combiId;
                that.curCombi.combiName = transParam.combiName;
                that.marketNo = transParam.marketNo;
                that.reportCode = transParam.reportCode;
                that.codePrice = transParam.insPrice;
                that.codeNum = transParam.insAmount;
                that.reportCode = transParam.reportCode
            }

            
        }
    }
</script>
<style lang="less">

</style>
