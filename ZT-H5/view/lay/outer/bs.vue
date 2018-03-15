
<template>
    <div>
       <div class="buyCont " :class="{buyStyle:$route.query.type==1,sellStyle:$route.query.type==2}">  <!--卖出用sellStyle-->
            <choose :select="select" :name="selectName" @getParam="getParam" v-if="ifSelect"></choose>
            <div class="itemList lineColor">
                <div class="subitem"  @click="toSelect('fundName',fund)">
                    <span>产品</span><span>{{curFund?curFund.fundName:'--'}}</span><em>选择</em>
                </div>
                <div class="subitem" @click="toSelect('combiName',combi)">
                    <span>组合</span><span>{{curCombi?curCombi.combiName:'--'}}</span><em>选择</em>
                </div>
                <div class="subitem" @click="toSelect('marketName',market)">
                    <span>市场</span><span>{{curMarket.marketName?curMarket.marketName:'--'}}</span><em>选择</em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem" @click="toSelect('stockName',code)">
                    <span>合约代码</span><span>{{curCode?curCode.stockName:'--'}}</span><em>选择</em>
                </div>
            </div>
            <div class="itemList">
                <div class="subitem" :class="{'itemselect':direc==0}" @click="direc=0">
                    <span>开仓</span>
                </div>
                <div class="subitem" :class="{'itemselect':direc==1}" @click="direc=1">
                    <span>平仓</span><em></em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令价格</span><input v-model="codePrice" type="Number"><em class="unit">日元</em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令数量</span><input v-model="codeNum" type="Number">
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>限价价格</span><input v-model="limitPrice" type="Number">
                </div>
            </div>
            <div class="itemList">
                <div class="subitem" @click="toSelect('operatorName',operator)">
                    <span>交易员</span><span>{{curOperator?curOperator.operatorName:'--'}}</span><em>选择</em>
                </div>
            </div>
            <div class="itemList tips flex">
                <span>备注</span><textarea v-model="tips" class="flex1" name="" id="" cols="40" rows="3"></textarea>
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
                type:0,
                ifSelect:false,//
                selectName:"",//选择组件中要展示的字段名字
                select:[],//选择组件中的列表信息
                curFund:[],//当前选中的产品
                curCombi:[],//当前选中组合
                curOperator:[],//当前选中操作员
                curMarket:[],
                curCode:[],//当前选中代码
                code:[],//合约代码
                fund:[],//产品列表
                combi:[],//组合列表
                operator:[],//操作员
                market:[],//市场
                investType:"a",
                direc:0,
                codeNum:0,
                codePrice:0,
                limitPrice:0,
                tips:""
            }
        },
        watch:{
            '$route.query.type':function(){
                this.type =this.$route.query.type
            },
            'curFund':function(){
                this.queryCombi()
            },
            'curMarket':function(){
                this.queryCode();
            },
        },
        methods:{
            //选择弹框内容选中
            getParam(item){
                var that = this;
                if(item.combiName){
                    that.curCombi=item;
                }else if(item.fundName){
                    that.curFund=item;
                    
                }else if(item.operatorName){
                    that.curOperator=item
                }else if(item.marketName){
                    that.curMarket=item;
                    that.queryCode();
                }else if(item.stockName){
                    that.curCode=item;
                }
                that.ifSelect = false;
            },
            queryCode(){
                var that = this;
                //查询合约代码
                API.outFutureInfoGet({}).then(function (data) {
                    that.code = data;
                    that.curCode=data[0]
                })
            },
            queryCombi(){
                var that = this;
                //查询组合
                API.combiGet({
                    fundId:that.curFund.fundId,
                    dataRight:""
                }).then(function (data) {
                    that.combi = data;
                    that.curCombi = data[0]
                })
            },
            //选择弹框显示
            toSelect(name,list){
                var that = this;
                if(name=='combiName'&&that.curFund.length==0){
                    Dialog.alert("请先选择一个产品");
                    return false;
                }
                if(name=='stockName'&&that.curMarket.length==0){
                    Dialog.alert("请先选择一个市场");
                    return false;
                }
                that.ifSelect = true;
                that.select = list;
                that.selectName = name;
            },
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
                // if(that.curFund.length==0){
                //     Dialog.alert("请先选择一个产品");
                //     return false;
                // }
                // if(that.curCombi.length==0){
                //     Dialog.alert("请先选择一个组合");
                //     return false;
                // }
                // if(that.curMarket.length==0){
                //     Dialog.alert("请先选择一个市场");
                //     return false;
                // }
                // if(that.curCode.length==0){
                //     Dialog.alert("请先选择一个合约代码");
                //     return false;
                // }
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
                            "marketNo": that.curMarket.outFutureMarketNo,
                            "reportCode": that.curCode.reportCode,
                            "insAmount": that.codeNum,
                            "insPrice": that.codePrice,
                            "limitPrice": that.limitPrice,
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
                that.curFund = data[0]
            })
            
            //查询交易员
            API.opTradeInfoGet({}).then(function (data) {
                that.operator = data;
                that.curOperator=data[0]
            })
            //查询市场
            API.outMarketInfoQuery({}).then(function (data) {
                that.market = data;
                that.curMarket = data[0]
            })

            
        }
    }
</script>
<style lang="less">

</style>
