<template>
    <div style="">
        <div class="flex-row top-wrap">
            <div class="row-item align-items-center">
                <text class="red zs-title">恒生指数</text>
                <p><text class="gray zs-data">上证</text><text class="red zs-data">+0.14%</text></p>
            </div>
            <div class="row-item align-items-center">
                <text class="red zs-title">恒生指数</text>
                <p><text class="gray zs-data">上证</text><text class="red zs-data">+0.14%</text></p>
            </div>
            <div class="row-item align-items-center">
                <text class="red zs-title">恒生指数</text>
                <p><text class="gray zs-data">上证</text><text class="red zs-data">+0.14%</text></p>
            </div>
        </div>

        <div class="list-title flex-row">
            <div class="row-item flex-2">
                <text class="list-title-text">恒生指数</text>
            </div>
            <div class="row-item">
                <text class="list-title-text">恒生指数</text>
            </div>
            <div class="row-item">
                <text class="list-title-text">恒生指数</text>
            </div>
        </div>

        <list class="content">
            <!--<refresh class="refesh">-->
                <!--<loading-indicator style="height: 60px; width: 60px;"></loading-indicator>-->
                <!--<text class="refreshtextstyle" ref="refreshtextstyle"> 加载中</text>-->
            <!--</refresh>-->
            <cell class="flex-row list-content-item">
                <div class="row-item flex-2">
                    <text class="list-content-title red">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item">
                    <text class="list-content-rate bg-red align-items-center">12.99</text>
                </div>
            </cell>
            <cell class="flex-row list-content-item">
                <div class="row-item flex-2">
                    <text class="list-content-title red">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item">
                    <text class="list-content-rate bg-red align-items-center">12.99</text>
                </div>
            </cell>
            <cell class="flex-row list-content-item">
                <div class="row-item flex-2">
                    <text class="list-content-title red">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item">
                    <text class="list-content-rate bg-red align-items-center">12.99</text>
                </div>
            </cell>
            <cell class="flex-row list-content-item">
                <div class="row-item flex-2">
                    <text class="list-content-title red">N苏波涛</text>
                    <text class="list-content-info gray">600570.ss</text>
                </div>
                <div class="row-item">
                    <text class="list-content-price red">12.99</text>
                </div>
                <div class="row-item">
                    <text class="list-content-rate bg-red align-items-center">12.99</text>
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
            const datacenter = weex.requireModule("dataCenter");
            datacenter.getMyStocks(function (data) {

            })

            datacenter.loadRealtimeList({'en_prod_code':"600570.SS",'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code,special_marker,trade_status'},function (data) {
                console.log(data)
            });

        }
    }
</script>
<style scoped>
    .red{
        color:#e81f1f;
    }
    .gray{
        color: #999999;
    }
    .bg-red{
        background-color: #e81f1f;
        color:#fff;
    }
    .flex-row{
        flex-direction: row;
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
        margin-top: 20px;
        background-color: #fafafa;
        border-bottom-width:1px;
        border-bottom-color: #EAEAEA;
        padding: 20px;
    }
    .zs-title{
        font-size: 34px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .zs-data{
        font-size: 22px;
    }
    .list-title-text{
        font-size: 24px;
    }
    .list-content-title{
        font-size: 32px;
        color:#333333;
        text-overflow:ellipsis;
    }
    .list-content-info{
        font-size: 20px;
    }
    .list-content-price{
        font-size: 32px;
    }
    .list-content-rate{
        font-size:32px;
        padding:10px;
        border-radius: 8px;
    }
    .list-content-item{
        border-bottom-width:1px;
        border-bottom-color: #EAEAEA;
        padding: 20px;
    }
    .top-wrap{
        padding: 30px;
    }
</style>
