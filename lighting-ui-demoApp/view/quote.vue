
<template>
    <div>
        <scroller class="scroller">
            <!-- HEAD -->
            <div class="pt20 pb20" :style="bgStyle">
                <text class="fs78 f-white ml40">{{price}}</text>
                <div class="flex-row align-center ml40">
                    <text class="fs30 f-white ml10">{{change.toFixed(2)}}</text>
                    <text class="fs30 f-white ml40">{{percent.toFixed(2)}}%</text>
                    <text class="fs24 f-transparent ml20">|</text>
                    <text class="fs24 f-transparent ml20">软件</text>
                    <text class="fs24 f-transparent ml20">+0.25%</text>
                    <text class="fs24 f-transparent ml10">></text>
                </div>
                <div class="add">
                    <image src="images/add_zixuan.png" class="icon-add-zixuan"></image>
                    <text class="mt20 fs24 f-white">加自选</text>
                </div>
            </div>
            <!-- 详细数据 -->
            <div class="bgc-white bottom-line">
                <div class="detail-data">
                    <div>
                        <div class="flex-row align-center">
                            <text class="fs24">今开</text>
                            <text class="fs26 ml20 f-green">22.35</text>
                        </div>
                        <div class="flex-row align-center mt10">
                            <text class="fs24">换手</text>
                            <text class="fs26 ml20 f-black">17.23%</text>
                        </div>
                    </div>
                    <div>
                        <div class="flex-row  align-center">
                            <text class="fs24">最高</text>
                            <text class="fs26 ml20 f-red">23.85</text>
                        </div>
                        <div class="flex-row align-center mt10">
                            <text class="fs24">最低</text>
                            <text class="fs26 ml20 f-green">22.35</text>
                        </div>
                    </div>
                    <div>
                        <div class="flex-row align-center">
                            <text class="fs24">成交量</text>
                            <text class="fs26 ml20 f-black">15.88万</text>
                        </div>
                        <div class="flex-row align-center mt10">
                            <text class="fs24">成交额</text>
                            <text class="fs26 ml20 f-black">3.69亿</text>
                        </div>
                    </div>
                </div>
                <div class="detail-flag">
                    <text class="f-white fs24 t-center mt10s">超级盘口</text>
                </div>
            </div>
            <!-- 图v表 -->
            <div class="flex-row bottom-line">
                <div :class="['tab', tabIndex==index?'tab-active':'']" @click="changeTab(index)" v-for="(item, index) in timeTab" :key="index">
                    <text :class="['fs26', tabIndex==index?'f-red':'f-black']">{{item}}</text>
                </div>
                <div class="tab" @click="changeTab(4)">
                    <text>月K</text>
                </div>
                <div class="chart">

                </div>
            </div>
            <!-- 登陆查看 -->
            <div class="bgc-white" v-if="false">
                <div class="flex-row align-center justify-center">
                    <text class="fs28 f-black">登录查看五档行情</text>
                    <image src='images/to-5dang.png' class="icon-5dang ml10"></image>
                </div>
            </div>
            <!-- 五档行情 -->
            <div class="bgc-white pb40">
                <div class="flex-row justify-between pt20">
                    <div class="flex-1 pd20 border-right">
                        <div v-for="(item, index) in sell5Dang" class="flex-row align-center mb10">
                            <text class="fs22 f-black">卖{{index+1}}</text>
                            <text class="fs22 f-red flex-2 ml10">{{item.price.toFixed(2)}}</text>
                            <div class="flex-5"></div>
                            <text class="fs22 f-black t-right">{{item.amount}}</text>
                        </div>
                    </div>
                    <div class="flex-1 pd20">
                        <div v-for="(item, index) in buy5Dang" class="flex-row align-center mb10">
                            <text class="fs22 f-black">买{{index+1}}</text>
                            <text class="fs22 f-red flex-2 ml10">{{item.price.toFixed(2)}}</text>
                            <div class="flex-5"></div>
                            <text class="fs22 f-black t-right">{{item.amount}}</text>
                        </div>
                    </div>
                </div>
                <div class="flex-row justify-end mt20">
                    <text class="fs24 f-blue mr20">升级看十档行情></text>
                </div>
            </div>          
            <!-- 新闻公告 -->  
            <div class="mt20 bgc-white">
                <div class="flex-row bottom-line">
                    <div v-for="(item, index) in newsTab" :key="index" class="flex-1 align-center justify-center pd10" @click="changeNews(index)">
                        <text :class="['fs26', index==newsIndex?'f-red':'f-dark']">{{item}}</text>
                        <div :class="['bottom-slider', 'mt10', index==newsIndex?'active-slider':'']"></div>
                    </div>
                </div>
                <!-- 必读 -->
                <div v-if="newsIndex == 0">
                    <div>
                        <div class="flex-row align-center">
                            <text class="fs28 f-black ml20">近期大事</text>
                            <div class="r-bookmark">
                                <text class="fs26 f-white">涨乐吧 +4795</text>
                            </div>
                        </div>
                        <div>
                            <text>2017-12-29最新报表披露</text>
                            <div class="flex-row align-center">
                                <text>大师提醒</text>
                                <text>中国人寿 601628</text>
                                <text>2018-03-23</text>
                            </div>
                        </div>
                        <div>
                            <text>中国人寿第五届董事会第十七次会议决议公告</text>
                            <div class="flex-row align-center">
                                <text>公司公告</text>
                                <text>中国人寿 601628</text>
                                <text>2018-01-26</text>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 新闻公告 -->
                <div v-if="newsIndex == 1">
                    <text>公告</text>
                </div>
                <!-- 简况 -->
                <div v-if="newsIndex == 2">
                    <text>简况</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                price: 48.88,
                quote: '恒生电子',
                change: -0.88,
                percent: -1.67,
                tabIndex: 0,
                timeTab: ['分时','五日','日K','周K'],
                newsTab: ['必读','新闻/公告','简况/F10'],
                newsIndex: 0,
                sell5Dang: [
                    {
                        price: 13.08,
                        amount: '360万'
                    },
                    {
                        price:13.09,
                        amount: '32万'
                    },
                    {
                        price:13.10,
                        amount: '717'
                    },
                    {
                        price:13.11,
                        amount: '32'
                    },
                    {
                        price:13.12,
                        amount: '530'
                    }
                ],
                buy5Dang: [
                    {
                        price: 13.08,
                        amount: '361'
                    },
                    {
                        price:13.07,
                        amount: '32'
                    },
                    {
                        price:13.06,
                        amount: '717'
                    },
                    {
                        price:13.05,
                        amount: '32'
                    },
                    {
                        price:13.04,
                        amount: '530'
                    }
                ],
            }
        },
        methods:{
            changeTab(index){
                this.tabIndex = index;
            },
            changeNews(index){
                this.newsIndex = index;
            }
        },
        computed:{
            bgStyle(){
                return this.change>=0?{'background-color':'#f35151'}:{'background-color':'#20ac6d'};
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style lang="less">
    .icon-add-zixuan{
        width: 56px;
        height: 56px;
    }
    .add{
        position: absolute;
        top: 40px;
        right: 40px;
        align-items: center;
        justify-content: space-around;
    }
    .detail-data{
        flex-direction: row;
        margin-right: 120px;
        justify-content: space-around;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .detail-flag{
        position: absolute;
        top: -10px;
        right: 20px;
        width: 70px;
        height: 120px;
        background-color: #f35151;
        justify-content: flex-start;
        align-items: center;
    }
    .tab{
        width: 150px;
        height: 80px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-bottom-color: #cecdcd;
    }
    .tab-active{
        background-color: #f7f7f7;
        border-left-width: 1px;
        border-right-width: 1px;
        border-left-color: #cecdcd;
        border-right-color: #cecdcd;
        border-bottom-color: #f7f7f7;
    }
    .scroller{
        background-color: #f7f7f7;
    }
    .bottom-line{
        border-bottom-width: 1px;
        border-color: #cecdcd;
    }
    .chart{
        background-color: #f7f7f7;
        height: 600px;
        border-bottom-width: 1px;
        border-color: #cecdcd;
    }
    .icon-5dang{
        width: 36px;
        height: 36px;
    }
    .border-right{
        border-right-width: 1px;
        border-color: #cecdcd;
    }
    .bottom-slider{
        width: 40px;
        height: 6px;
    }
    .active-slider{
        background-color: #f35151;
    }
    .r-bookmark{
        padding: 10px;
        padding-left: 20px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background-color: #f35151;
    }
</style>
