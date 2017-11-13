<template>
    <div style="">
        <div class="flex-row top-wrap">
            <div class="row-item align-items-center">
                <text class="red zs-title">3465.61</text>
                <div class="zs-wrap"><text class="gray zs-data">上证</text><text class="red zs-data">+0.14%</text></div>
            </div>
            <div class="row-item align-items-center">
                <text class="red zs-title">11594.37</text>
                <div class="zs-wrap"><text class="gray zs-data">深证</text><text class="red zs-data">+0.14%</text></div>
            </div>
            <div class="row-item align-items-center">
                <text class="red zs-title">1900.63</text>
                <div class="zs-wrap"><text class="gray zs-data">创业板</text><text class="red zs-data">+0.14%</text></div>
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
            <!--<refresh class="refesh">-->
                <!--<loading-indicator style="height: 60px; width: 60px;"></loading-indicator>-->
                <!--<text class="refreshtextstyle" ref="refreshtextstyle"> 加载中</text>-->
            <!--</refresh>-->
            <cell class="flex-row list-content-item">
                <div class="flex-column flex-2">
                    <text class="list-content-title">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item mgr20">
                    <text class="list-content-rate bg-red align-items-center">+12.99%</text>
                </div>
            </cell>
            <cell class="flex-row list-content-item">
                <div class="flex-column flex-2">
                    <text class="list-content-title">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item mgr20">
                    <text class="list-content-rate bg-red align-items-center">+12.99%</text>
                </div>
            </cell>
            <cell class="flex-row list-content-item">
                <div class="flex-column flex-2">
                    <text class="list-content-title">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item mgr20">
                    <text class="list-content-rate bg-red align-items-center">+12.99%</text>
                </div>
            </cell>
            <cell class="flex-row list-content-item">
                <div class="flex-column flex-2">
                    <text class="list-content-title">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item mgr20">
                    <text class="list-content-rate bg-red align-items-center">+12.99%</text>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
        },
        mounted(){
            const that =this;
            const datacenter = weex.requireModule("dataCenter");
            datacenter.getMyStocks(function (data) {

            });

            datacenter.loadRealtimeList({'en_prod_code':"600570.XSHG,600571.XSHG",'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code,special_marker,trade_status'},function (data) {
                let snapshot = data.data.snapshot;

                Object.keys(snapshot).forEach(function (stock) {
                    if(stock!=="fields"){
                        let info = {};
                        snapshot.fields.forEach(function (field,index) {
                            info[field] = snapshot[stock][index];
                        });
                        info.code = stock;
                        that.stocks.push(info);
                    }
                })
            });
        }
    }
</script>
<style scoped>
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
    .content{ }
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
        font-size: 32px;
        padding-top: 10px;
        padding-left: 20px;
        color:#4f4f4f;
        lines:1;
    }
    .list-content-info{
        font-size: 18px;
        padding-left: 20px;
    }
    .list-content-price{
        font-size: 32px;
        font-weight: bold;
        padding-left: 20px;
    }
    .list-content-rate{
        font-size:32px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 8px;
    }


</style>
