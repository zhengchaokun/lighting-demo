
<template>
    <div>
        <div class="flex-row align-center bottom-line pt10 pb10">
            <div class="flex-2">
                <div class="head-mark">
                    <div class="flex-row border-right  pr20 pd10"><text class="fs24 f-white">编辑</text></div>
                    <div class="flex-row pl20 pd10"><text class="fs24 f-white">智能</text></div>
                </div>
            </div>
            <div class="flex-4 flex-row"> 
                <div @click="toggleTimeOrder" class="flex-1 flex-row align-center justify-center">
                    <text class="fs26 f-dark mr10">最新</text>
                    <image src="images/header_arrow_none.png" class="order-dot-icon" v-if="timeOrder==0"></image>
                    <image src="images/header_arrow_up.png" class="order-arrow-icon" v-if="timeOrder==1"></image>
                    <image src="images/header_arrow_down.png" class="order-arrow-icon" v-if="timeOrder==-1"></image>
                </div>
                <div class="flex-1 flex-row align-center justify-center">
                    <text class="fs26 f-dark">涨跌</text>
                </div>
                <div @click="toggleChangeOrder" class="flex-1 flex-row align-center justify-center">
                    <text class="fs26 f-dark mr10">涨幅</text>
                    <image src="images/header_arrow_none.png" class="order-dot-icon" v-if="changeOrder==0"></image>
                    <image src="images/header_arrow_up.png" class="order-arrow-icon" v-if="changeOrder==1"></image>
                    <image src="images/header_arrow_down.png" class="order-arrow-icon" v-if="changeOrder==-1"></image>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in orderedData" :key="index" class="list">
            <div class="flex-column justify-center align-start flex-2">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-1 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-1 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-1 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                timeOrder: 0,
                changeOrder: 0,
                zixuanData:[
                    {
                        title: '金斯瑞生物',
                        code: 'H01528',
                        total: 27.900,
                        change: 2.950,
                        percent: 12.80
                    },
                    {
                        title: '中国重汽',
                        code: 'H03808',
                        total: 11.260,
                        change: 0.706,
                        percent: 7.24,
                    },
                    {
                        title: '金蝶国际',
                        code: 'H002628',
                        total: 0.360,
                        change: 0.350,
                        percent: 7.05
                    },
                    {
                        title: '乐视网',
                        code: '300104',
                        total: 4.82,
                        change: -0.54,
                        percent: -10.07
                    },
                    {
                        title: '巨人网络',
                        code: '002558',
                        total: 11.260,
                        change: 0.706,
                        percent: 7.24,
                    },
                    {
                        title: '大西洋',
                        code: '600558',
                        total: 5.02,
                        change: 0.01,
                        percent: 0.20
                    }
                ],
                orderedData: [],
            }
        },
        watch:{
            timeOrder: function(newVal){
                if(newVal == 0){
                    this.orderedData = this.zixuanData.slice();
                }
                if(newVal == 1){
                    this.orderedData = this.zixuanData.slice();
                }
                if(newVal == -1){
                    this.orderedData = this.zixuanData.slice().reverse();
                }
            },
            changeOrder: function(newVal){
                if(newVal == 0){
                    this.orderedData = this.zixuanData.slice();
                }
                if(newVal == 1){
                    this.orderedData = this.zixuanData.slice().sort(function(a, b){
                        return a.percent - b.percent;
                    })
                }
                if(newVal == -1){
                    this.orderedData = this.zixuanData.slice().sort(function(a, b){
                        return b.percent - a.percent;
                    })
                }
            }
        },
        methods:{
            toggleTimeOrder(){
                this.changeOrder = 0;
                if(this.timeOrder == 0){
                    this.timeOrder = 1;
                    return;
                }
                if(this.timeOrder == 1){
                    this.timeOrder = -1;
                    return;
                }
                if(this.timeOrder == -1){
                    this.timeOrder = 0;
                    return;
                }
            },
            toggleChangeOrder(){
                this.timeOrder = 0;
                if(this.changeOrder == 0){
                    this.changeOrder = 1;
                    return;
                }
                if(this.changeOrder == 1){
                    this.changeOrder = -1;
                    return;
                }
                if(this.changeOrder == -1){
                    this.changeOrder = 0;
                    return;
                }
            }
        },
        mounted(){
            this.orderedData = this.zixuanData;
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style lang="less">
    .head-mark{
        width: 160px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #fe6a6b;
        border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
    }
    .border-right{
        border-right-width: 1px;
        border-right-color: #f9f9f9;
    }
    .bottom-line{
        border-bottom-width: 2px;
        border-bottom-color: #e9e9e9;
    }
    .order-arrow-icon{
        width: 10px;
        height: 18px;
    }
    .order-dot-icon{
        width: 4px;
        height: 18px;
    }
    .list{
        height: 140px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;
        padding-left: 30px;
        padding-right: 30px;
        background-color: #ffffff;
    }
</style>
