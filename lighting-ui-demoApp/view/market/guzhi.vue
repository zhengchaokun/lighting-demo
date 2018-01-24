
<template>
    <div class="page">
        <!-- 国内指数 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell0Style"
            @LcCellClicked="index0Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex0Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex0Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">国内指数</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index0Data" :key="0+''+index" class="list" v-if="!isIndex0Fold">
            <div class="flex-column justify-center align-start flex-1">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-1 align-end">
                <text class="fs30 f-black">{{item.total}}</text>
            </div>
            <div class="flex-1 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change}}%</text>
            </div>
        </div>

        <!-- 期货股指 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell1Style"
            @LcCellClicked="index1Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex1Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex1Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">股指期货</text>
            </div>
        </lc-cell>
        <div v-for="(item, index) in index1Data" :key="1+''+index" class="list" v-if="!isIndex1Fold">
            <div class="flex-column justify-center align-start flex-1">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-1 align-end">
                <text class="fs30 f-black">{{item.total}}</text>
            </div>
            <div class="flex-1 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change}}%</text>
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
                index0Data: [
                    {
                        title: '上证指数',
                        code: '1A0001',
                        total: 3543.12,
                        change: -0.07
                    },
                    {
                        title: '深证成指',
                        code: '2A01',
                        total: 11542.51,
                        change: -0.11
                    },
                    {
                        title: '创业板指',
                        code: '399006',
                        total: 1802.25,
                        change: 1.93
                    },
                    {
                        title: '沪深300',
                        code: '1A0300',
                        total: 4364.29,
                        change: -0.41
                    },
                    {
                        title: '中小板指',
                        code: '399005',
                        total: 7702.20,
                        change: -0.28
                    }
                ],
                index1Data: [
                    {
                        title: '中证5001802',
                        code: 'IC802',
                        total: 6355.4,
                        change: 0.25
                    },
                    {
                        title: '中证5001803',
                        code: 'IC803',
                        total: 6355.4,
                        change: 0.25
                    },
                    {
                        title: '中证5001806',
                        code: 'IC806',
                        total: 6355.4,
                        change: 0.25
                    },
                    {
                        title: '中证5001809',
                        code: 'IC809',
                        total: 6355.4,
                        change: 0.25
                    },
                    {
                        title: '中证500连续',
                        code: 'ICL0',
                        total: 6355.4,
                        change: 0.25
                    }
                ]
            }
        },
        methods:{
            index0Clicked(){
                this.isIndex0Fold = !this.isIndex0Fold;
            },
            index1Clicked(){
                this.isIndex1Fold = !this.isIndex1Fold;
            }
        },
        computed:{
            cell0Style(){
                if(this.isIndex0Fold){
                    return {
                        'background-color':'#ffffff'
                    }
                }else{
                    return {
                        'background-color':'#f8f8f8'
                    }
                }
            },
            cell1Style(){
                if(this.isIndex1Fold){
                    return {
                        'background-color':'#ffffff'
                    }
                }else{
                    return {
                        'background-color':'#f8f8f8'
                    }
                }
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
