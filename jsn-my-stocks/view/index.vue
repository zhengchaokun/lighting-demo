<template>
    <div style="">
        <div class="flex-row top-wrap">
            <div v-for="stock in topData" @click="openStockDetail(stock)" class="row-item align-items-center">
                <text class=" zs-title" :class="[getColorByRate(stock.px_change_rate)]">{{stock.last_px}}</text>
                <div class="zs-wrap">
                    <text class="gray zs-data">{{stock.prod_name}}</text>
                    <text class="zs-data" :class="[getColorByRate(stock.px_change_rate)]">{{stock.px_change_rate}}%</text></div>
            </div>
        </div>

        <div class="list-title flex-row">
            <div class="row-item flex-2">
                <text class="list-title-text">全部</text>
            </div>
            <div class="row-item">
                <text class="list-title-text">最新价</text>
            </div>
            <div class="row-item">
                <text class="list-title-text">涨跌幅</text>
            </div>
        </div>

        <list class="content">
            <refresh class="refresh" :display="refreshing" @pullingdown="refreshDown" @refresh="refreshStart">
                <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
                <text class="refresh-text" :value="refreshText"></text>
            </refresh>
            <cell  @click="openStockDetail(stock)" v-for="stock in stocks" class="flex-row list-content-item">
                <div class="flex-column flex-2">
                    <text class="list-content-title">{{stock.prod_name}}</text>
                    <text class="list-content-info">{{stock.code}}</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price"  :class="[getColorByRate(stock.px_change_rate)]">{{stock.last_px}}</text>
                </div>
                <div class="row-item">
                    <text class="list-content-rate align-items-center" :class="[getColorByRate(stock.px_change_rate,true)]">{{stock.px_change_rate}}%</text>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
    const api = require("../lib/api");
    export default {
        data(){
            return {
                stocks:[],
                refreshing:'hide',
                refreshText:'',
                lastUpdateDate:new Date().getTime(),
                topData:[]
            }
        },
        methods:{
            refreshDown(ev){
                this.refreshText = '下拉刷新数据' + '\n' +"最后更新:"+this.lastUpdateDate;
                if(Math.abs(Number(ev.pullingDistance)) > 95){
                    this.refreshText = '松开刷新数据' + '\n' +"最后更新:"+this.lastUpdateDate;
                }
            },
            refreshStart(){
                const that =this;
                this.loadData().then(function () {
                    that.refreshing = 'hide';
                })
            },
            loadData(en_prod_code,key){
                const that =this;
                return api.real({
                    'en_prod_code':en_prod_code,
                    'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code,special_marker,trade_status'
                }).then(function (data) {
                    let snapshot = data.data.snapshot;

                    that[key] = [];
                    Object.keys(snapshot).forEach(function (stock) {
                        if(stock!=="fields"){
                            let info = {};
                            snapshot.fields.forEach(function (field,index) {
                                info[field] = snapshot[stock][index];
                            });
                            info.code = stock;
                            that[key].push(info);
                        }
                    });
                });
            },
            getColorByRate(price,isBg){
                if(price>0){
                    return (isBg?'bg-':'')+"red";
                }
                if(price<0){
                    return (isBg?'bg-':'')+"green";
                }
                return "";
            },
            openStockDetail(st){
                weex.requireModule("event").openURL(require("../config").prefix+require("../lib/utils").parse2query({
                    prod_code:st.code,
                    hq_type_code:st.hq_type_code,
                    prod_name:encodeURIComponent(st.prod_name),
                }))
            }
        },
        mounted(){
            const that =this;
            api.myStocks().then(function (data) {
                that.loadData(data.join(","),"stocks");
                that.loadData("1A0001.SS,2A01.SZ,399006.SZ","topData")
                setInterval(function () {
                    that.loadData(data.join(","),"stocks");
                    that.loadData("1A0001.SS,2A01.SZ,399006.SZ","topData")
                },5*1000)
            })
        }
    }
</script>
<style scoped>
    .refresh{
        justify-content: center;
        display: flex;
        align-items: center;
        width: 750px;
    }
    .refresh-text{
        text-align: center;
        font-size: 24px;
        height: 60px;
        color:#949494;
        margin-top:10px;
    }
    .red{
        color:#fa3540;
    }
    .gray{
        color: #878787;
    }
    .green{
        color: #249b3a;
    }
    .bg-green{
        background-color: #249b3a;
        color:#fff;
    }
    .bg-red{
        background-color: #fa3e48;
        color:#fff;
    }
    .flex-row{
        flex-direction: row;
    }
    .flex-column{
        flex-direction: column;
    }
    .row-item{
        justify-content: center;
        flex: 1;
        display: inline-flex;
    }
    .align-items-center{
        align-items:center;
    }
    .flex-2{
        flex: 2;
    }
    .list-title{
        height: 70px;
        background-color: #fafafa;
        border-top-width:1px;
        border-top-color: #EAEAEA;
        border-top-style: solid;
        border-bottom-width:1px;
        border-bottom-color: #EAEAEA;
        border-bottom-style: solid;
    }
    .top-wrap{
        height: 120px;
    }
    .zs-wrap{
        height: 50px;
        flex-direction: row;
    }
    .zs-title{
        font-size: 34px;
        font-weight: 600;
        line-height: 50px;
    }
    .zs-data{
        font-size: 22px;
        line-height: 50px;
        margin-left: 10px;
    }

    .list-content-item{
        height: 90px;
        border-style: solid;
        border-bottom-width:1px;
        border-bottom-color: #EAEAEA;
    }
    .list-title-text{
        padding-left: 20px;
        font-size: 24px;
    }
    .list-content-title{
        font-size: 30px;
        padding-top: 15px;
        padding-left: 20px;
        color:#4f4f4f;
        lines:1;
    }
    .list-content-info{
        font-size: 20px;
        padding-left: 20px;
        color: #b3b3b3;
    }
    .list-content-price{
        font-size: 32px;
        font-weight: bold;
        padding-left: 10px;
    }
    .list-content-rate{
        width: 150px;
        font-size:32px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 8px;
        text-align: center;
    }


</style>
