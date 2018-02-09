
<template>
    <div>

        <!-- 列表 -->
        <scroller class="container">
            <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <div class="flex-row">
                <div class="flex-1">
                    <div class="list-head">
                        <div class="list-head-item">
                            <text class="list-head-text">名称</text>
                        </div>
                    </div>
                    <div class="list-title-item" v-for="(item, index) in blockData" :key="index">  
                        <text class="fs28 f-black">{{item.name}}</text>
                        <text class="fs22 f-dark">{{item.code}}</text>
                    </div>
                </div>
                <div class="flex-2">
                    <scroller :scroll-direction='horizontal' style="flex-direction: row">
                        <div>
                            <div class="list-head">
                                <div v-for="title in titles" :key="title" class="list-head-item">
                                    <text class="list-head-text">{{title}}</text>
                                </div>
                            </div>
                            <div>
                                <div class="flex-row" v-for="(item, index) in blockData" :key="index">
                                    <div class="list-row-item"><text :class="['fs28', item.percent>=0?'f-red':'f-green']">{{item.price}}</text></div>
                                    <div class="list-row-item"><text :class="['fs28', item.percent>=0?'f-red':'f-green']">{{item.percent}}%</text></div>
                                    <div class="list-row-item"><text :class="['fs28', item.percent>=0?'f-red':'f-green']">{{item.change}}</text></div>
                                    <div class="list-row-item"><text class='fs28 f-black'>{{item.last_close}}</text></div>
                                    <div class="list-row-item"><text :class="['fs28', item.open>=item.last_close?'f-red':'f-green']">{{item.open}}</text></div>
                                    <div class="list-row-item"><text :class="['fs28', item.high>=item.last_close?'f-red':'f-green']" >{{item.high}}</text></div>
                                    <div class="list-row-item"><text :class="['fs28', item.low>=item.last_close?'f-red':'f-green']">{{item.low}}</text></div>
                                    <div class="list-row-item"><text :class="['fs28', item.avg>=item.last_close?'f-red':'f-green']">{{item.avg}}</text></div>
                                </div>  
                            </div>
                        </div>
                    </scroller>
                </div>                
            </div>
        </scroller>

        <!-- 指数 -->
        <div class="flex-row align-center header">
            <div class="flex-1 pl40 pr40">
                <text class="fs56 f-green">660.74</text>
                <div class="flex-row justify-between">
                    <text class="fs24 f-green">-9.34</text>
                    <text class="fs24 f-green">-1.4%</text>
                </div>
            </div>
            <div class="flex-2 pl20 pr20">
                <div class="flex-row pt20 pb10">
                    <div class="flex-row align-center flex-1">
                        <text class="fs24 f-dark">换</text>
                        <text class="fs24 f-red ml20">0.72%</text>
                    </div>
                    <div class="flex-row  align-center flex-1">
                        <text class="fs24 f-dark">高</text>
                        <text class="fs24 f-green ml20">668.27</text>
                    </div>
                </div>
                <div class="flex-row pt10 pb20">
                    <div class="flex-row align-center flex-1">
                        <text class="fs24 f-dark">开</text>
                        <text class="fs24 f-green ml20">662.06</text>
                    </div>
                    <div class="flex-row align-center flex-1">
                        <text class="fs24 f-dark">低</text>
                        <text class="fs24 f-green ml20">657.93</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                refreshing: false,
                blockData: [
                    {   
                        name: '川环科技',
                        code: '300547',
                        price: 58.30,
                        percent: 10.00,
                        change: 5.30,
                        last_close: 53.00,
                        open: 58.30,
                        high: 58.30,
                        low: 58.30,
                        avg: 58.30
                    },
                    {
                        name: '美联新材',
                        code: '300386',
                        price: 30.61,
                        percent: 9.99,
                        change: 2.78,
                        last_close: 27.83,
                        open: 30.61,
                        high: 30.61,
                        low: 30.09,
                        avg: 30.60
                    },
                    {
                        name: '毅昌股份',
                        code: '002420',
                        price: 4.25,
                        percent: 3.16,
                        change: 0.13,
                        last_close: 4.12,
                        open: 4.06,
                        high: 4.28,
                        low: 4.00,
                        avg: 4.14
                    },
                    {
                        name: '国立科技',
                        code: '300716',
                        price: 21.91,
                        percent: 3.11,
                        change: 0.66,
                        last_close: 21.25,
                        open: 20.40,
                        high: 22.00,
                        low: 20.38,
                        avg: 21.42
                    },
                    {
                        name: '顺威股份',
                        code: '002676',
                        price: 6.27,
                        percent: 2.79,
                        change: 0.17,
                        last_close: 6.10,
                        open: 5.75,
                        high: 6.56,
                        low: 5.61,
                        avg: 6.16
                    },
                    {
                        name: '创新股份',
                        code: '002812',
                        price: 88.52,
                        percent: 1.75,
                        change: 1.52,
                        last_close: 87.00,
                        open: 86.59,
                        high: 91.33,
                        low: 83.03,
                        avg: 88.69
                    },
                    {
                        name: '同大股份',
                        code: '300321',
                        price: 16.33,
                        percent: 1.55,
                        change: 0.25,
                        last_close: 16.08,
                        open: 16.14,
                        high: 17.12,
                        low: 16.14,
                        avg: 16.56
                    },
                    {
                        name: '王子新材',
                        code: '002735',
                        price: 32.09,
                        percent: 0.66,
                        change: 0.21,
                        last_close: 31.88,
                        open: 31.69,
                        high: 32.39,
                        low: 30.67,
                        avg: 31.81
                    },
                    {
                        name: '华峰超纤',
                        code: '300180',
                        price: 23.18,
                        percent: -0.09,
                        change: 0.02,
                        last_close: 23.20,
                        open: 23.05,
                        high: 23.19,
                        low: 20.88,
                        avg: 22.12
                    },
                    {
                        name: '大东南',
                        code: '002263',
                        price: 2.57,
                        percent: -0.39,
                        change: 0.01,
                        last_close: 2.58,
                        open: 2.36,
                        high: 2.69,
                        low: 2.36,
                        avg: 2.54
                    },
                    {
                        name: '中鼎股份',
                        code: '000887',
                        price: 14.94,
                        percent: -0.66,
                        change: 0.10,
                        last_close: 15.04,
                        open: 14.73,
                        high: 15.17,
                        low: 14.59,
                        avg: 14.89
                    },
                ],
                titles:['最新','幅度','涨跌','昨收','开盘','最高','最低','均价'],
                horizontal: 'horizontal'
            }
        },
        methods:{
            onrefresh (event) {
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
    .list-head-text{
        font-size: 26px;
        color: #969191;
    }
    .list-row-item{
        width: 170px;
        height: 108px;
        border-bottom-width: 1px;
        border-bottom-color: #e0e0e0;
        padding-bottom: 20px;
        justify-content: center;
        align-items: center;
    }
    .list-title-item{
        height: 108px;
        border-bottom-width: 1px;
        border-bottom-color: #e0e0e0;
        padding-bottom: 20px;
        justify-content: center;
        align-items: flex-start;
        padding-left: 30px;
    }
    .header{
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        height: 120px;
        background-color: #ffffff;
    }
    .container{
        padding-top: 120px;
    }
    .refresh {
        width: 750;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }
    .indicator {
        margin-top: 16px;
        margin-bottom: 16px;
        height: 80px;
        width: 80px;
        color: #6da6e7;
    }
    .list-head{
        flex-direction: row;
        background-color: #e0e0e0;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .list-head-item{
        justify-content: center;
        align-items: center;
        width: 170px;
    }
</style>
