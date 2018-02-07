
<template>
    <div>
        <!-- 全球重要指数 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell0Style"
            @LcCellClicked="index0Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex0Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex0Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">全球重要指数</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index0Data" :key="0+''+index" class="list" v-if="!isIndex0Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
            </div>
            <div class="flex-1 align-end">
                <text :class="['fs22', item.open?'f-black':'f-dark']">{{item.open?'开市':'闭市'}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>
        <!-- 国际期货 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell1Style"
            @LcCellClicked="index1Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex1Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex1Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">国际期货</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index1Data" :key="1+''+index" class="list" v-if="!isIndex1Fold">
            <div class="flex-column justify-center align-start flex-3">
                <text class="fs32 f-black">{{item.title}}</text>
            </div>
            <div class="flex-2 align-end">
                <text class="fs30 f-black">{{item.total}}</text>
            </div>
            <div class="flex-2 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>
        <!-- 国际汇率 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell2Style"
            @LcCellClicked="index2Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex2Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex2Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">国际汇率</text>
            </div>
        </lc-cell>
        <div v-for="(item, index) in index2Data" :key="2+''+index" class="list" v-if="!isIndex2Fold">
            <div class="flex-column justify-center align-start flex-3">
                <text class="fs32 f-black">{{item.title}}</text>
            </div>
            <div class="flex-2 align-end">
                <text class="fs30 f-black">{{item.total}}</text>
            </div>
            <div class="flex-2 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div> 
    </div>
</template>
<script>
    import LcCell from "lighting-ui/packages/lc-cell";
    import Light from 'light';
    export default {
        components:{ LcCell },
        data(){
            return {
                isIndex0Fold: false,
                isIndex1Fold: false,
                isIndex2Fold: false,
                index0Data:[
                    {
                        title: '纳斯达克',
                        open: false,
                        total: 7115.88,
                        percent: 2.13
                    },
                    {
                        title: '道琼斯工业',
                        open: false,
                        total: 24912.77,
                        percent: 2.33
                    },
                    {
                        title: '标普500',
                        open: false,
                        total: 2695.14,
                        percent: 2.33
                    },
                    {
                        title: '英国富时100',
                        open: false,
                        total: 7141.40,
                        percent: -2.64
                    },
                    {
                        title: '德意志DAX',
                        open: false,
                        total: 12392.14,
                        percent: -2.32
                    },
                    {
                        title: '恒生',
                        open: true,
                        total: 30470.14,
                        percent: -0.45
                    }
                ],
                index1Data:[
                    {
                        title: 'LME铜',
                        total: 7128.00,
                        percent: 0.69
                    },
                    {
                        title: 'LME锌',
                        total: 3517.00,
                        percent: 0.13
                    },
                    {
                        title: 'COMEX黄金',
                        total: 1332.60,
                        percent: 0.23
                    },
                    {
                        title: 'COMEX白银',
                        total: 16.70,
                        percent: 0.75
                    },
                    {
                        title: 'COMEX大豆',
                        total: 992.60,
                        percent: 0.58
                    }
                ],
                index2Data:[
                    {
                        title: '欧元美元',
                        total: 1.2399,
                        percent: 0.15
                    },
                    {
                        title: '美元日元',
                        total: 109.1504,
                        percent: -0.43
                    },
                    {
                        title: '英镑美元',
                        total: 1.3989,
                        percent: 0.23
                    },
                    {
                        title: '澳元美元',
                        total: 0.7887,
                        percent: -0.09
                    },
                    {
                        title: '美元港币',
                        total: 7.8193,
                        percent: 0.01
                    }
                ],
            }
        },
        computed:{
            cell0Style(){
                return this.isIndex0Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
            },
            cell1Style(){
                return this.isIndex1Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
            },
            cell2Style(){
                return this.isIndex2Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
            }
        },
        methods:{
            index0Clicked(){
                this.isIndex0Fold = !this.isIndex0Fold;
            },
            index1Clicked(){
                this.isIndex1Fold = !this.isIndex1Fold;
            },
            index2Clicked(){
                this.isIndex2Fold = !this.isIndex2Fold;
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">
    .f-green {
    color: #5d9f3b;
    }
    .f-red {
    color: #f35151;
    }
    .f-black {
    color: #3a3a3a;
    }
    .f-dark {
    color: #9a9a9a;
    }
    .f-blue{
    color: #6da6e7;
    }
    .f-orange{
    color: #ff9933;
    }
    .icon{
        width: 30px;
        height: 30px;
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
