
<template>
    <div>
        <!-- tab -->
        <div class="tabBar">
            <text v-for="(title, index) in tabTitles" :key="index" :class="['tabBar-text', index==tabIndex && 'f-red']" @click="changeTab(index)">{{title}}</text>
        </div>
        <!-- scroller -->
        <scroller style="height:3000px;background-color:#f8f8f8;">
            <!-- 沪深 -->
            <div class="page" v-if="tabIndex==0">
                <div class="flex-row">
                    <div class="row-item pt10" @click="changePart(index)" v-for="(item, index) in chartData" :key="index">
                        <div class="part-row">
                            <text class="part-total f-red">{{item['total']}}</text>
                        </div>
                        <div class="part-row mt10">
                            <text class="part-title">{{item['title']}}</text>
                            <text class="part-title f-red">{{item['change']}}</text>
                        </div>
                        <div :class="['part-line', index==chartIndex && 'line-active']"></div>
                    </div>
                </div>
                <div class="chart">

                </div>

                <div class="cell">
                    <text class="part-title f-red mr10 ml20">上涨{{raise_count}}只</text>
                    <lc-progress :value="barPercentage"
                        bar-color='#f35151'
                        :bar-height="6"
                        :bar-width="320">
                    </lc-progress>
                    <text class="part-title f-green ml10">{{fall_count}}只下跌</text>
                    <text class="cell-link mr20"> > </text>
                </div>

                <div class="grid mt20">
                    <div class="grid-item" v-for="(item, index) in blockList" :key="index">
                        <text class="grid-title f-black">{{item.title}}</text>
                        <text class="grid-title f-red mt10">{{item.change}}</text>
                        <text class="grid-desc mt10">{{item.total}}</text>
                    </div>
                    <div class="grid-item">
                        <text class="grid-desc fs32">热门板块</text>
                        <text class="grid-desc fs32 mt30">更多></text>
                    </div>
                </div>

                <div class="grid2 mt20">
                    <div class="grid2-item" v-for="(item, index) in topicList" :key="index">
                        <text class="grid2-title">{{item}}</text>
                    </div>
                </div>

                <div class="mt20" style="background-color:#ffffff;">
                    <div class="mt20" style="flex-direction: row;justify-content: space-between;">
                        <div class="bookmark">
                            <text class="bookmark-text">个股异动</text>
                        </div>
                        <text class="bookmark-desc">实时智能计算个股异动情况 ></text>
                    </div>

                    <div style="padding-top:60px;justify-content: center;background-color:#ffffff;align-items:center">
                        <div class="btn-wrap mb30">
                            <div v-for="(btn, index) in geguTitles" :key="index" :style="btnStyle(index)" class="btn-tab" @click="changeBtn(index)" >
                                <text class="btn-text" :style="btnTextStyle(index)">{{btn.title}}</text>
                            </div>
                        </div>
                        <div v-for="(item, index) in geguData" :key="index" class="share-list">
                            <div class="share-title flex-3">
                                <text class="fs32 f-black">{{item.title}}</text>
                                <text class="fs24 f-dark mt10">{{item.code}}</text>
                            </div>
                            <div class="flex-2">
                                <text class="fs32 f-black">{{item.total}}</text>
                            </div>
                            <div class="flex-2">
                                <text :class="['fs32', item.change >= 0 ? 'f-red':'f-green']">{{item.change}}%</text>
                            </div>
                            <div class="flex-3" style="align-items: flex-end;">
                                <text class="fs32 f-black">{{item.desc}}</text>
                            </div>
                        </div>
                        <text class="fs28 f-dark mt20 mb20">查看更多 ></text>                        
                    </div>
                </div>


            </div>
            <!-- 股指 -->
            <div class="page" v-if="tabIndex==1">
                <text>股指</text>
            </div>
            <!-- 港股 -->
            <div class="page" v-if="tabIndex==2">
                <text>港股</text>
            </div>
            <!-- 全球 -->
            <div class="page" v-if="tabIndex==3">
                <text>全球</text>
            </div>
            <!-- 更多 -->
            <div class="page" v-if="tabIndex==4">
                <text>更多</text>
            </div>
        </scroller>
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
                /* tab */
                tabIndex: 0,
                tabTitles: ['沪深','股指','港股','全球','更多'],
                /* chart */
                chartIndex: 0,
                chartData: [{
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
                /* bar */
                raise_count: 1871,
                fall_count: 1334,
                /* block */
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
                /* topic */
                topicList:['涨跌幅榜','换手率榜','资金流向榜','量比榜','次新股榜','创业板涨幅'],
                /* 个股 */
                geguTitles:[{title:'创新高'},{title:'创新低'},{title:'上破均线'}],
                btnIndex: 0,
                geguHigh: [{
                        title: '云南城投',code: '600239',total:'5.74',change:'9.96',desc:'200日新高'
                    },{
                        title: '上海钢联',code: '300226',total:'44.6',change:'8.83',desc:'200日新高'
                    },{
                        title: '乐普医疗',code: '300003',total:'26.04',change:'6.68',desc:'200日新高'
                    },{
                        title: '南京银行',code: '601009',total:'8.99',change:'5.52',desc:'200日新高'
                    },{
                        title: '海峡股份',code: '002320',total:'24.30',change:'5.19',desc:'200日新高'
                }],
                geguLow: [{
                        title: '神雾环保',code: '600239',total:'21.74',change:'-10.02',desc:'200日新低'
                    },{
                        title: '东北电气',code: '300226',total:'4.27',change:'-9.73',desc:'200日新低'
                    },{
                        title: '神马B',code: '300003',total:'0.83',change:'-7.65',desc:'200日新低'
                    },{
                        title: '海源机械',code: '601009',total:'13.78',change:'-6.89',desc:'200日新低'
                    },{
                        title: '金鹰股份',code: '002320',total:'6.85',change:'-6.80',desc:'200日新低'
                }],
                geguAvg: [{
                        title: '中国建筑',code: '600239',total:'9.73',change:'2.21',desc:'破200日均线'
                    },{
                        title: '鹿港文化',code: '300226',total:'6.47',change:'0.94',desc:'破200日均线'
                    },{
                        title: '海南橡胶',code: '300003',total:'6.08',change:'0.50',desc:'破200日均线'
                    },{
                        title: '马钢股份',code: '601009',total:'4.13',change:'0.73',desc:'破200日均线'
                    },{
                        title: '山煤国际',code: '002320',total:'5.01',change:'2.24',desc:'破200日均线'
                }],

            }
        },
        computed:{
            barPercentage(){
                return this.raise_count/(this.raise_count + this.fall_count)*100;
            },
            geguData(){
                if(this.btnIndex == 0){
                    return this.geguHigh;
                }
                if(this.btnIndex == 1){
                    return this.geguLow;
                }
                if(this.btnIndex == 2){
                    return this.geguAvg;
                }
            }
        },
        methods:{
            changeTab(index){
                this.tabIndex = index;
            },
            changePart(index){
                this.chartIndex = index;
            },
            changeBtn(index){
                this.btnIndex = index;
            },
            btnStyle(index){
                let style;
                if(index == 0){
                    style = {
                        'border-style': 'solid',
                        'border-left-width': '1px',
                        'border-top-width': '1px',
                        'border-bottom-width': '1px',
                        'border-right-width': '0px',
                        'border-top-left-radius': '5px',
                        'border-bottom-left-radius': '5px',
                        'border-color':'#9a9a9a'
                    };
                    if(this.btnIndex == 0){
                        style['border-color'] = "#fe6a6b";
                    }
                }
                if(index == 1){
                    style = {
                        'border-style': 'solid',
                        'border-width': '1px',
                        'border-color':'#9a9a9a'
                    }
                    if(this.btnIndex == 0){
                        style['border-left-color'] = "#fe6a6b";
                    }
                    if(this.btnIndex == 1){
                        style['border-color'] = "#fe6a6b";
                    }
                    if(this.btnIndex == 2){
                        style['border-right-color'] = "#fe6a6b";
                    }
                }
                if(index == 2){
                    style = {
                        'border-style': 'solid',
                        'border-left-width': '0px',
                        'border-right-width': '1px',
                        'border-top-width': '1px',
                        'border-bottom-width': '1px',
                        'border-top-right-radius': '5px',
                        'border-bottom-right-radius': '5px',
                        'border-color':'#9a9a9a'
                    };
                    if(this.btnIndex == 2){
                        style['border-color'] = "#fe6a6b";
                    }
                }
                return style;
            },
            btnTextStyle(index){
                if(index == this.btnIndex){
                    return {
                        'color':'#fe6a6b',
                        'font-size':'32px'
                    }
                }else{
                    return {
                        'color':'#9a9a9a',
                        'font-size':'30px'
                    }
                }
            }
        }
    }
</script>

<style scoped src="../css/ui.css"></style>

<style scoped>
    .tabBar{
        height: 80px;
        background-color: #ffffff;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 40px;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;
    }
    .tabBar-text{
        width: 130px;
        color: #3a3a3a;
        font-size: 34px;
    }
    .chart{
        height: 280px;
        border-top-width: 1px;
        border-color: #d9d9d9;
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
        height: 2px;
        background-color: #f8f8f8;
        margin-top: 8px;
    }
    .line-active{
        background-color: #f35151;
    }
    .part-row{
        flex-direction:row;
        justify-content: center;
    }
    .cell{
        flex-direction:row;
        justify-content: space-between;
        align-items:center;
        height: 84px;
        background-color: #ffffff;
    }
    .cell-link{
        font-size: 34px;
        color: #b7b7b7;
    }
    .f-green{
        color: #5d9f3b;
    }
    .f-red{
        color: #f35151;
    }
    .f-black{
        color: #3a3a3a;
    }
    .f-dark{
        color: #9a9a9a;
    }
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #FFFFFF;
        border-style: solid;
        border-color: #D9D9D9;
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
        font-size: 32px;
    }
    .grid-desc{
        font-size: 22px;
        color: #9a9a9a;
    }
    .grid2{
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #FFFFFF;
        border-style: solid;
        border-color: #D9D9D9;
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
        font-size: 28px;
        color: #6da6e7;
    }
    .bookmark{
        width: 180px;
        background-color: #fe6a6b;
        border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
    }
    .bookmark-text{
        line-height: 56px;
        font-size: 32px;
        color: #ffffff;
        margin-left: 20px;
    }
    .bookmark-desc{
        font-size: 24px;
        color: #9a9a9a;
        line-height: 48px;
        margin-right: 40px;
    }
    .btn-wrap{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 500px;
        height: 64px;
    }
    .btn-tab{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: 1;
        border-color: #b7b7b7;
        color:#b7b7b7;
    }
    .btn-text{
        font-size: 30px;
    }
    .share-list{
        width: 710px;
        height: 140px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #b7b7b7;
        margin-left: 20px;
        margin-right: 20px; 
    }
    .share-title{
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .share-data{
        
    }
</style>
