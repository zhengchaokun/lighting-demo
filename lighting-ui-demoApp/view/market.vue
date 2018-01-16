
<template>
    <div>
        <lc-tab-page 
            ref="lc-tab-page"
            :tab-titles="tabTitles"
            :tab-styles="tabStyles"
            title-type="icon"
            :needSlider="needSlider"
            :is-tab-view="isTabView"
            :tab-page-height="tabPageHeight"
            @LcTabPageCurrentTabSelected="tabSelected">
            <list v-for="(tab, index) in tabList" :key="index" class="item-container">
                <!-- 沪深 -->
                <div class="page" v-if="index==0">
                    <lc-tab-page 
                        ref="lc-part-page"
                        :tab-titles="partTitles"
                        :tab-styles="partStyles"
                        title-type="icon"
                        :needSlider="needSlider"
                        :is-tab-view="isTabView"
                        :tab-page-height="tabPageHeight1"
                        :title-use-slot="true"
                        @LcTabPageCurrentTabSelected="partSelected">
                            <div slot="tab-title-0">
                                <div class="part-row">
                                    <text class="part-total f-red">{{partData[0]['total']}}</text>
                                </div>
                                <div class="part-row">
                                    <text class="part-title">{{partData[0]['title']}}</text>
                                    <text class="part-title f-red">{{partData[0]['change']}}</text>
                                </div>
                                <div :class="['part-line', partPage==0 && 'active']"></div>
                            </div>
                            <div slot="tab-title-1">
                                <div class="part-row">
                                    <text class="part-total f-green">{{partData[1]['total']}}</text>
                                </div>
                                <div class="part-row">
                                    <text class="part-title">{{partData[1]['title']}}</text>
                                    <text class="part-title f-green">{{partData[1]['change']}}</text>
                                </div>
                                <div :class="['part-line', partPage==1 && 'active']"></div>
                            </div>
                            <div slot="tab-title-2">
                                <div class="part-row">
                                    <text class="part-total f-green">{{partData[2]['total']}}</text>
                                </div>
                                <div class="part-row">
                                    <text class="part-title">{{partData[2]['title']}}</text>
                                    <text class="part-title f-green">{{partData[2]['change']}}</text>
                                </div>
                                <div :class="['part-line', partPage==2 && 'active']"></div>
                            </div>
                        <div class="chart">

                        </div>
                    </lc-tab-page>
                    <lc-cell :has-arrow="true"
                        :auto-accessible="false">
                        <div slot="title" style="flex-direction:row">
                            <text class="part-title f-red">上涨{{raise_count}}只</text>
                            <lc-progress :value="barPercentage"
                                bar-color='#f35151'
                                :bar-height="6"
                                :bar-width="380">
                            </lc-progress>
                            <text class="part-title f-green">{{fall_count}}只下跌</text>
                        </div>
                    </lc-cell> 
                    <div class="grid mt10">
                        <div class="grid-item" v-for="(item, _index) in blockList" :key="_index">
                            <text class="gird-title">{{item.title}}</text>
                            <text class="gird-title f-red" style="margin-top:20px;">{{item.change}}</text>
                            <text class="gird-desc">{{item.total}}</text>
                        </div>
                        <div class="grid-item" style="">
                            <text class="gird-desc" style="font-size:30px;">热门板块</text>
                            <text class="gird-desc" style="margin-top:30px;font-size:30px;">更多></text>
                        </div>
                    </div>
                    <div class="grid2 mt10">
                        <div class="grid2-item" v-for="(item, _index) in topicList" :key="_index">
                            <text class="grid2-title">{{item}}</text>
                        </div>
                    </div>
                    <div class="mt10" style="background-color:#ffffff;">
                        <div class="mt10" style="flex-direction: row;justify-content: space-between;">
                            <div class="bookmark">
                                <text class="bookmark-text">个股异动</text>
                            </div>
                            <text class="bookmark-desc">实时智能计算个股异动情况 ></text>
                        </div>
                        <lc-tab-page 
                            ref="lc-part-page"
                            type="card"
                            :tab-titles="geguTitles"
                            :tab-styles="partStyles"
                            title-type="text"
                            :is-tab-view="isTabView"
                            :tab-page-height="tabPageHeight2"
                            :title-use-slot="true"
                            @LcTabPageCurrentTabSelected="partSelected">
                        </lc-tab-page>
                    </div>
                </div>
                <!-- 股指 -->
                <div class="page" v-if="index==1">
                    <text>股指</text>
                </div>
                <!-- 港股 -->
                <div class="page" v-if="index==2">
                    <text>港股</text>
                </div>
                <!-- 全球 -->
                <div class="page" v-if="index==3">
                    <text>全球</text>
                </div>
                <!-- 更多 -->
                <div class="page" v-if="index==4">
                    <text>更多</text>
                </div>
            </list>
        </lc-tab-page>
    </div>
</template>
<script>
    import Config from 'config/market.js';
    import LcTabPage from 'lighting-ui/packages/lc-tab-page';
    import LcCell from 'lighting-ui/packages/lc-cell';
    import LcProgress from 'lighting-ui/packages/lc-progress';

    export default {
        components: { LcTabPage, LcCell, LcProgress },
        data(){
            return {
                tabTitles: Config.tabTitles,
                tabStyles: Config.tabStyles,
                tabList: [0,1,2,3,4],
                needSlider: false,
                isTabView: true,
                tabPageHeight: 1280,
                tabPageHeight1: 360,
                tabPageHeight2: 800,
                partTitles: [
                    { title: '上证指数' },
                    { title: '深证指数' },
                    { title: '创业板指' },
                ],
                partStyles: {
                    bgColor: '#f8f8f8',
                    titleColor: '#969696',
                    isActiveTitleBold: false,
                    width: 250,
                    height: 100,
                    fontSize: 24,
                    hasActiveBottom: true,
                    activeBottomColor: '#fc3538',
                    activeBottomHeight: 4,
                    activeBottomWidth: 100,
                    textPaddingLeft: 15,
                    textPaddingRight: 15
                },
                partData: [{
                    title: '上证指数',
                    total: '3420.80',
                    change: '+0.30%'
                },{
                    title: '深证指数',
                    total: '11370.42',
                    change: '+0.56%'
                },{
                    title: '创业板指',
                    total: '1734.39',
                    change: '+0.10%'
                }],
                tabPage: 0,
                partPage: 0,
                raise_count: 1871,
                fall_count: 1334,
                blockList: [{
                        title: '房地产',
                        change: '3.99%',
                        total: '449.98亿'
                    },{
                        title: '商务服务',
                        change: '2.41%',
                        total: '49.03亿'
                    },{
                        title: '供水供气',
                        change: '2.35%',
                        total: '38.32亿'
                    },{
                        title: '住宿餐饮',
                        change: '2.33%',
                        total: '7.86亿'
                    },{
                        title: '仓储物流',
                        change: '1.94%',
                        total: '25.98亿'
                        }],
                topicList:['涨跌幅榜','换手率榜','资金流向榜','量比榜','次新股榜','创业板涨幅'],
                geguTitles:[{title:'创新高'},{title:'创新低'},{title:'上破均线'}],
            }
        },
        computed:{
            barPercentage(){
                return this.raise_count/(this.raise_count + this.fall_count)*100;
            }
        },
        methods:{
            tabSelected (e) {
                console.log(e)
                this.tabPage = e.page;
            },
            partSelected (e) {
                console.log(e)
                this.partPage = e.page;
            }
        }
    }
</script>
<style scoped>
    .item-container {
        width: 750px;
        background-color: #F9F9F9;
    }
    .page{
        height: 1200px;
    }
    .chart{
        height: 110px;
    }
    .part-total{
        font-weight: 400;
        font-size: 36px;
    }
    .part-title{
        font-size: 24px;
        line-height: 24px;
    }
    .part-line{
        height: 1px;
        background-color: transparent;
        margin-top: 8px;
    }
    .part-line.active{
        background-color: #f35151;
    }
    .part-row{
        flex-direction:row;
        justify-content: center;
    }
    .f-green{
        color: #5d9f3b;
    }
    .f-red{
        color: #f35151;
    }
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #FFFFFF;
        border-style: solid;
        border-color: #D9D9D9;
        border-top-width: 1px;
        /* border-bottom-width: 1px; */
    }
    .grid-item{
        width: 250px;
        height: 200px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-style: solid;
        border-color: #D9D9D9;
        border-right-width: 1px;
        border-bottom-width: 1px;
    }
    .grid-title{
        font-size: 24px;
        font-weight: 400;
        color: #3a3a3a;
    }
    .gird-desc{
        font-size: 18px;
        color: #b7b7b7;
    }
    .grid2{
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #FFFFFF;
        border-style: solid;
        border-color: #D9D9D9;
        border-top-width: 1px;
        border-bottom-width: 1px;
    }
    .grid2-item{
        width: 250px;
        height: 96px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-style: solid;
        border-color: #D9D9D9;
    }
    .grid2-title{
        font-size: 26px;
        color: #6da6e7;
    }
    .bookmark{
        width: 160px;
        background-color: #fe6a6b;
        border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
    }
    .bookmark-text{
        line-height: 56px;
        font-size: 26px;
        color: #ffffff;
        margin-left: 20px;
    }
    .bookmark-desc{
        font-size: 18px;
        color: #b7b7b7;
        line-height: 48px;
        margin-right: 20px;
    }
</style>
