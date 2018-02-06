
<template>
    <div>
        <!-- 港股通·涨幅榜 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell0Style"
            @LcCellClicked="index0Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex0Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex0Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">港股通涨幅榜</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index0Data" :key="0+''+index" class="list" v-if="!isIndex0Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>

        <!-- 沪港通涨幅榜 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell1Style"
            @LcCellClicked="index1Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex1Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex1Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">沪港通涨幅榜</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index1Data" :key="1+''+index" class="list" v-if="!isIndex1Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>

        <!-- 深港通涨幅榜 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell2Style"
            @LcCellClicked="index2Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex2Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex2Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">深港通涨幅榜</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index2Data" :key="2+''+index" class="list" v-if="!isIndex2Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>

        <!-- 热门AH股 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell3Style"
            @LcCellClicked="index3Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex3Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex3Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">热门AH股</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index3Data" :key="3+''+index" class="list" v-if="!isIndex3Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>
        <!-- 主板涨幅榜 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell4Style"
            @LcCellClicked="index4Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex4Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex4Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">主板涨幅榜</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index4Data" :key="4+''+index" class="list" v-if="!isIndex4Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
            </div>
        </div>
        <!-- 主板跌幅榜 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell5Style"
            @LcCellClicked="index5Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex5Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex5Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">主板跌幅榜</text>
            </div>
        </lc-cell> 
        <div v-for="(item, index) in index5Data" :key="5+''+index" class="list" v-if="!isIndex5Fold">
            <div class="flex-column justify-center align-start flex-5">
                <text class="fs32 f-black">{{item.title}}</text>
                <text class="fs24 f-dark mt10">{{item.code}}</text>
            </div>
            <div class="flex-4 align-end">
                <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
                <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
            </div>
            <div class="flex-4 align-end">
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
                isIndex3Fold: false,
                isIndex4Fold: false,
                isIndex5Fold: false,
                index0Data:[
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
                    }
                ],
                index1Data:[
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
                    }
                ],
                index2Data:[
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
                    }
                ],
                index3Data:[
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
                    }
                ],
                index4Data:[
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
                    }
                ],
                index5Data:[
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
                    }
                ]
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
            },
            cell3Style(){
                return this.isIndex3Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
            },
            cell4Style(){
                return this.isIndex4Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
            },
            cell5Style(){
                return this.isIndex5Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
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
            },
            index3Clicked(){
                this.isIndex3Fold = !this.isIndex3Fold;
            },
            index4Clicked(){
                this.isIndex4Fold = !this.isIndex4Fold;
            },
            index5Clicked(){
                this.isIndex5Fold = !this.isIndex5Fold;
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
