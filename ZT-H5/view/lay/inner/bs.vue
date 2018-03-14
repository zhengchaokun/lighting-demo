
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
                        <input type="search" v-model="searKey" placeholder="">
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
                type:"",//买卖方向
                ifSelect:false,//
                selectName:"",//选择组件中要展示的字段名字
                select:[],//选择组件中的列表信息
                curFund:{},//当前选中的产品
                curCombi:[],//当前选中组合
                curOperator:[],//当前选中操作员
                fund:[],//产品列表
                combi:[],//组合列表
                operator:[],//操作员
                searKey:"",//合约代码
                quote:{},//行情信息
                codePrice:0,//指令价格
                codeNum:0, //指令数量
                tips:"", //备注
                direc:0, //平仓开仓
                investType:"a", //投资类型
                enableNum:0,//可买可卖数量，买时enableNum=可用金额/指令价格，卖时enableNum = 可用数量
                enableAmount:0,//可用数量
                enableBalance:0 //可用金额
            }
        },
        watch:{
            '$route.query.type':function(){
                this.type =this.$route.query.type
            },
            'searKey':function(){
                this.filterCode();
            },
            'type':function(){
                this.amountChange();
            },
            'codePrice':function(){
                this.amountChange();
            }
        },
        methods:{
            //可买可卖数量变动
            amountChange(){
                var that = this;
                if(that.type==1){
                    that.enableNum = parseInt(Number(that.enableBalance)/Number(that.codePrice))
                }else{
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
                }else if(item.operatorName){
                    that.curOperator=item
                }
                that.ifSelect = false;
            },

            //选择弹框显示
            toSelect(name,list){
                var that = this;
                that.ifSelect = true;
                that.select = list;
                that.selectName = name;
            },

            //输入合约代码
            filterCode(){
                var that =this;
                API.stockQuoteGet({
                    reportCode:that.searKey
                }).then(function (data) {
                    that.quote = data;
                })
                that.enableNum = parseInt(Number(that.enableBalance)/Number(that.codePrice))

            },

            //价格数量加减
            changePrice(type){
                var that =this;
                if(type==0){
                    that.codePrice=Number(that.codePrice)-1;
                    if(that.codePrice<0){
                        that.codePrice=0
                    }
                }else if(type==1){
                    that.codePrice=Number(that.codePrice)+1;
                    if(that.codeNum>that.enableNum){
                        that.codeNum=that.enableNum
                    }
                }else if(type==2){
                    that.codeNum=Number(that.codeNum)-1;
                    if(that.codeNum<0){
                        that.codeNum=0
                    }
                }else if(type==3){
                    that.codeNum=Number(that.codeNum)+1;
                    if(that.codeNum>that.enableNum){
                        that.codeNum=that.enableNum
                    }
                }
            },
            buy(){
                
                Dialog.confirm({
                    msg:'是否确定下单？',
                    confirmText:"确定",
                    cancelText:"取消",
                    confirm(){
                        API.insAdd({
                            combiId:1,
                            marketNo:1,
                            reportCode:1,
                            investType:1,
                            positionType:1
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
            API.fundQuery({}).then(function (data) {
                that.fund = data;
            })
            API.combiGet({}).then(function (data) {
                that.combi = data;
            })
            API.opTradeInfoGet({}).then(function (data) {
                that.operator = data;
            })

            //获取可用金额
            API.enableBalanceGet({
                combiId:1
            }).then(function (data) {
                that.enableBalance = data.enableBalance;
            })

            //获取合约乘数、价格加减步长
            API.futureInfoGet({
                marketNo:1,
                reportCode:1
            }).then(function (data) {

            })
            //获取可用数量
            API.enableAmountGet({
                combiId:1,
                marketNo:1,
                reportCode:1,
                investType:1,
                positionType:1
            }).then(function (data) {
                that.enableAmount = data.enableAmount;
                console.log(data.enableAmount);
            })
            


            
        }
    }
</script>
<style lang="less">

</style>
