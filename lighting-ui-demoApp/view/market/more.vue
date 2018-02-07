
<template>
    <div>
        <!-- 沪深 -->
        <text class="fs28 f-red mt10 ml40 mb20">沪深</text>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">沪深A股</text>
            </div>
            <div class="card">
                <text class="card-text">中小板</text>
            </div>
            <div class="card">
                <text class="card-text">创业板</text>
            </div>
            <div class="card">
                <text class="card-text">沪深B股</text>
            </div>
        </div>
        <div class="flex-row pd20 justify-around">
            <div class="card"> 
                <text class="card-text">上证A股</text>
            </div>
            <div class="card">
                <text class="card-text">深证A股</text>
            </div>
            <div class="card">
                <text class="card-text">上证B股</text>
            </div>
            <div class="card">
                <text class="card-text">深证B股</text>
            </div>
        </div>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">沪深基金</text>
            </div>
            <div class="card">
                <text class="card-text">ETF</text>
            </div>
            <div class="card">
                <text class="card-text">LOF</text>
            </div>
            <div class="card">
                <text class="card-text">上证债券</text>
            </div>
        </div>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">股转</text>
            </div>
            <div class="card">
                <text class="card-text">风险警示</text>
            </div>
            <div class="card">
                <text class="card-text">退市整理</text>
            </div>
            <div class="card">
                <text class="card-text">大盘指数</text>
            </div>
        </div>

        <!-- 港股 -->
        <text class="fs28 f-red mt10 ml40 mb20">港股</text>
        <div class="flex-row pd20 justify-around">
            <div class="card"> 
                <text class="card-text">港股通</text>
            </div>
            <div class="card">
                <text class="card-text">沪港通</text>
            </div>
            <div class="card">
                <text class="card-text">深港通</text>
            </div>
            <div class="card">
                <text class="card-text">香港指数</text>
            </div>
        </div>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">国企股</text>
            </div>
            <div class="card">
                <text class="card-text">红筹股</text>
            </div>
            <div class="card">
                <text class="card-text">蓝筹股</text>
            </div>
            <div class="card">
                <text class="card-text">AH股</text>
            </div>
        </div>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">香港主板</text>
            </div>
            <div class="card">
                <text class="card-text">创业板</text>
            </div>
            <div class="card">
                <text class="card-text">恒指股份</text>
            </div>
            <div class="placeholder"></div>
        </div>

        <!-- 全球重要指数 -->
        <text class="fs28 f-red mt10 ml40 mb20">全球重要指数</text>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">美洲市场</text>
            </div>
            <div class="card">
                <text class="card-text">欧洲市场</text>
            </div>
            <div class="card">
                <text class="card-text">亚太市场</text>
            </div>
            <div class="card">
                <text class="card-text">其他市场</text>
            </div>
        </div>

        <!-- 场外基金 -->
        <text class="fs28 f-red mt10 ml40 mb20">场外基金</text>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">股票基金</text>
            </div>
            <div class="card">
                <text class="card-text">混合基金</text>
            </div>
            <div class="card">
                <text class="card-text">债券基金</text>
            </div>
            <div class="card">
                <text class="card-text">货币基金</text>
            </div>
        </div>
        <div class="flex-row pd20 justify-around">
            <div class="card">
                <text class="card-text">分级基金</text>
            </div>
            <div class="card">
                <text class="card-text">QDII基金</text>
            </div>
            <div class="card">
                <text class="card-text">FOF基金</text>
            </div>
            <div class="card">
                <text class="card-text">其他基金</text>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        computed:{

        },
        methods:{

        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">
    .card{
        width: 140px;
        height: 80px;
        border-width: 1px;
        background-color: #ffffff;
        border-color: #cecece;
        justify-content: center;
        align-items: center;
    }
    .card-text{
        font-size: 28px;
        color: #3a3a3a;
    }   
    .placeholder{
        width: 140px;
    }
</style>
