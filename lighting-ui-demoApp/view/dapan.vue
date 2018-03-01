
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
            <!-- tab栏部分 -->  
            <div class="mt20">
                <div class="flex-row bottom-line bgc-white">
                    <div v-for="(item, index) in newsTab" :key="index" class="flex-1 align-center justify-center pd10" @click="changeNews(index)">
                        <text :class="['fs26', 'mt10', index==newsIndex?'f-red':'f-dark']">{{item}}</text>
                        <div :class="['bottom-slider', 'mt10', index==newsIndex?'active-slider':'']"></div>
                    </div>
                </div>
                <!-- 盘口 -->
                <div v-if="newsIndex == 0">
                    <!-- 近期大事 -->
                    <div class="bgc-white">
                        <div class="flex-row align-center pt30 justify-between">
                            <text class="fs28 f-black ml20">近期大事</text>
                            <div class="r-bookmark">
                                <text class="fs26 f-white">涨乐吧 +4795</text>
                            </div>
                        </div>
                        <div class="mt20 ml20 mr20 pb20 bottom-line">
                            <text class="fs26 f-black">2017-12-29最新报表披露</text>
                            <div class="flex-row align-center mt10 justify-between">
                                <div class="flex-row">
                                    <text class="dark-tag">大师提醒</text>
                                    <text class="ml10 fs22 f-dark2">中国人寿 601628</text>
                                </div>
                                <text class="fs22 f-dark2">2018-03-23</text>
                            </div>
                        </div>
                        <div class="mt20 ml20 mr20 pb20 bottom-line">
                            <text class="fs26 f-black">中国人寿第五届董事会第十七次会议决议公告</text>
                            <div class="flex-row align-center mt10 justify-between">
                                <div class="flex-row">
                                    <text class="dark-tag">公司公告</text>
                                    <text class="ml10 fs22 f-dark2">中国人寿 601628</text>
                                </div>
                                <text class="fs22 f-dark2">2018-01-26</text>
                            </div>
                        </div>
                        <div class="flex-row justify-center">
                            <text class="fs26 f-dark mt20 mb30">查看更多 ></text>    
                        </div>
                    </div>
                    <!-- 所属概念 -->
                    <div class="bgc-white mt20 pb40">
                        <text class="fs28 f-black ml20 mt30">所属概念</text>
                        <div class="flex-row justify-around align-center pl20 pr20 mt40">
                            <div class="flex-row justify-between align-center bgc-dark flex-1 pd20">
                                <text class="fs26 f-black">预盈预增</text>
                                <text class="fs26 f-green">-0.90%</text>
                            </div>
                            <div class="flex-row justify-between align-center bgc-dark flex-1 pd20 ml20">
                                <text class="fs26 f-black">浙江</text>
                                <text class="fs26 f-green">-1.15%</text>
                            </div>
                        </div>
                        <div class="flex-row justify-around align-center pl20 pr20 mt30">
                            <div class="flex-row justify-between align-center bgc-dark flex-1 pd20">
                                <text class="fs26 f-black">证金汇金</text>
                                <text class="fs26 f-green">-1.52%</text>
                            </div>
                            <div class="flex-row justify-between align-center bgc-dark flex-1 pd20 ml20">
                                <text class="fs26 f-black">融资融券</text>
                                <text class="fs26 f-green">-1.53%</text>
                            </div>
                        </div>
                        <div class="flex-row justify-around align-center pl20 pr20 mt30">
                            <div class="flex-row justify-between align-center bgc-dark flex-1 pd20">
                                <text class="fs26 f-black">互联金融</text>
                                <text class="fs26 f-green">-1.54%</text>
                            </div>
                            <div class="flex-row justify-between align-center bgc-dark flex-1 pd20 ml20">
                                <text class="fs26 f-black">长江三角</text>
                                <text class="fs26 f-green">-1.55%</text>
                            </div>
                        </div>
                    </div>
                    <!-- 问董秘 -->
                    <div class="bgc-white mt20 pd20">
                        <div class="flex-row justify-between align-center">
                            <text class="fs32 f-blue">问董秘</text>
                            <image src="images/more-arrow.png" class="icon-more-arrow"></image>
                        </div>
                        <text class="fs24 f-dark mt10">投资者直接向上市公司提问，交易所权威平台</text>
                        <div class="blue-card mt30">
                            <div class="blue-bookmark mt20 pd10">
                                <text class="fs20 f-blue ml10">最新互动问答</text>
                            </div>
                            <div class="mt20 pd10">
                                <text class="fs22 f-black">华泰证券认为，2017年证券行业维持较高的监管力度，行业经过整顿规范后，综合运营及风控合规能力均得到显著提升。市场环境倒逼业务模式转型。监管及业务整顿加速行业分化，业务实力佳、战略前瞻性强、风控合规体系完善的券商竞争优势逐步凸显。华泰证券预计2018年证券行业监管环境、市场环境及业务经营状态都将实现边际改善，各项业务开展步入正轨，进入良性发展周期。</text>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 新闻 -->
                <div v-if="newsIndex == 1">
                    <div class="bgc-white pd20">
                        <div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子：业务增速好于预期</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs22 f-red">机构研报</text>
                                    <text class="fs20 f-dark">| 2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子：复苏动力强劲，未来储备丰富</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs22 f-red">机构研报</text>
                                    <text class="fs20 f-dark">| 2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子2017年年度业绩预增公告</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">三大国有一行联合投资AI企业</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs20 f-dark">2018-01-29</text>
                                </div>
                            </div>
                        </div>
                        <div class="flex-row justify-center">
                            <text class="fs24 f-blue mt20">点击加载</text>
                        </div>
                    </div>
                </div>
                <!-- 公告 -->
                <div v-if="newsIndex == 2">
                    <div class="bgc-white pd20">
                        <div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子：业务增速好于预期</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs22 f-red">机构研报</text>
                                    <text class="fs20 f-dark">| 2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子：复苏动力强劲，未来储备丰富</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs22 f-red">机构研报</text>
                                    <text class="fs20 f-dark">| 2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子2017年年度业绩预增公告</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">三大国有一行联合投资AI企业</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs20 f-dark">2018-01-29</text>
                                </div>
                            </div>
                        </div>
                        <div class="flex-row justify-center">
                            <text class="fs24 f-blue mt20">点击加载</text>
                        </div>
                    </div>
                </div>
                <!-- 榜单 -->
                <div v-if="newsIndex == 3">
                    <div class="bgc-white flex-row justify-center">
                        <div class="mt40 mb20 btn-wrap">
                            <div v-for="(btn, index) in rankTitles" :key="index" :style="btn1Style(index)" class="btn-tab" @click="change1Btn(index)" >
                                <text class="btn-text" :style="btn1TextStyle(index)">{{btn}}</text>
                            </div>
                        </div>
                    </div>
                    <div class="bgc-white pd20">
                        <!-- 涨幅榜 -->
                        <div v-if="btn1Index == 0">
                            <div v-for="(item, index) in rankData1" :key="index" class="list">
                                <div class="flex-column justify-center align-start flex-3">
                                    <text class="fs32 f-black">{{item.title}}</text>
                                    <text class="fs24 f-dark mt10">{{item.code}}</text>
                                </div>
                                <div class="flex-2 align-end">
                                    <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
                                </div>
                                <div class="flex-2 align-end">
                                    <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
                                </div>
                            </div>
                        </div>
                        <!-- 跌幅榜 -->
                        <div v-if="btn1Index == 1">
                            <div v-for="(item, index) in rankData2" :key="index" class="list">
                                <div class="flex-column justify-center align-start flex-3">
                                    <text class="fs32 f-black">{{item.title}}</text>
                                    <text class="fs24 f-dark mt10">{{item.code}}</text>
                                </div>
                                <div class="flex-1 align-end">
                                    <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
                                </div>
                                <div class="flex-1 align-end">
                                    <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
                                </div>
                            </div>
                        </div>
                        <!-- 换手率榜 -->  
                        <div v-if="btn1Index == 2">
                            <div v-for="(item, index) in rankData3" :key="index" class="list">
                                <div class="flex-column justify-center align-start flex-2">
                                    <text class="fs32 f-black">{{item.title}}</text>
                                    <text class="fs24 f-dark mt10">{{item.code}}</text>
                                </div>
                                <div class="flex-1 align-end">
                                    <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
                                </div>
                                <div class="flex-1 align-end">
                                    <text class='fs30'>{{item.percent.toFixed(2)}}%</text>
                                </div>
                            </div>
                        </div>

                        <div class="flex-row justify-center">
                            <text class="fs24 f-blue mt20">点击加载</text>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
    import LcProgress from 'lighting-ui/packages/lc-progress';
    export default {
        components: {LcProgress},
        data(){
            return {
                price: 48.88,
                quote: '恒生电子',
                change: -0.88,
                percent: -1.67,
                tabIndex: 0,
                timeTab: ['分时','五日','日K','周K'],
                newsTab: ['盘口','新闻','公告','榜单'],
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
                rankTitles: ['涨幅榜','跌幅榜','换手率榜'],
                f10Titles: ['公司简况', '行业排名', '股东股本', '财务数据'],
                btn1Index: 0,
                btn2Index: 0,
                fenhongData: [
                    {
                        date: '2017-05-10',
                        desc: '10元派1.0元(含税)',
                        rate: '0.26%'
                    },
                    {
                        date: '2016-05-30',
                        desc: '10元派2.6元(含税)',
                        rate: '0.45%'
                    },
                    {
                        date: '2015-05-29',
                        desc: '10元派1.8元(含税)',
                        rate: '0.15%'
                    },
                    {
                        date: '2014-05-10',
                        desc: '10元派1.6元(含税)',
                        rate: '0.61%'
                    },
                    {
                        date: '2013-05-10',
                        desc: '10元派1.0元(含税)',
                        rate: '0.71%'
                    }
                ],
                gaoguanData: [
                    {
                        name: '彭正刚',
                        duty: '董事，董事长',
                        share: '710.00万'
                    },
                    {
                        name: '刘曙峰',
                        duty: '副董事，总裁',
                        share: '512.87万'
                    },
                    {
                        name: 'JiangGF',
                        duty: '董事',
                        share: '--'
                    },
                    {
                        name: '高俊国',
                        duty: '董事',
                        share: '--'
                    }
                ],
                rankData: [
                    {
                        name: '宝信B',
                        price: 19.78
                    },
                    {
                        name: '二三四五',
                        price: '22.09'
                    },
                    {
                        name: '航天信息',
                        price: '22.09'
                    },
                    {
                        name: '捷成股份',
                        price: '22.09'
                    },
                    {
                        name: '东华软件',
                        price: '22.09'
                    },
                    {
                        name: '瑞和软件',
                        price: '24.74'
                    },
                    {
                        name: '华东电脑',
                        price: '25.22'
                    },
                    {
                        name: '久其软件',
                        price: '27.17'
                    },
                    {
                        name: '马郎信息',
                        price: '27.50'
                    },
                    {
                        name: '运达科技',
                        price: '28.30'
                    }
                ],
                gubenData: [
                    {
                        title:'总股本',
                        value: '6.18亿股'
                    },
                    {
                        title:'流通A股',
                        value: '6.18亿股'
                    },
                    {
                        title:'股东人数',
                        value: '100025'
                    },
                    {
                        title:'人均持股',
                        value: '6176.51股'
                    },
                    {
                        title:'第一大股东',
                        value: '杭州恒生电子集团有限公司'
                    },
                    {
                        title:'前十大股东占比',
                        value: '33.86%'
                    },
                    {
                        title:'筹码集中度',
                        value: '较集中'
                    }
                ],
                gudongData: [
                    {
                        name: '杭州恒生电子股份有限公司',
                        rate: 20.72,
                        type: 'unchanged',
                        desc: '未变'
                    },
                    {
                        name: '蒋建圣',
                        rate:  1.92,
                        type: 'unchanged',
                        desc: '未变'
                    },
                    {
                        name: '全国社保基金---组合',
                        rate: 1.92,
                        type: 'new',
                        desc: '新进'
                    },
                    {
                        name: '中央汇金资产管理有限责任公司',
                        rate: 1.76,
                        type: 'unchanged',
                        desc: '未变'
                    },
                    {
                        name: '陈鸿',
                        rate: 1.57,
                        type: 'decrease',
                        desc: '减持(-1.22%)'     
                    },
                    {
                        name: '中国证券金融股份有限公司',
                        rate: 1.50,
                        type: 'decrease',
                        desc: '减持(-5.21%)'     
                    },
                    {
                        name: '王则江',
                        rate: 1.23,
                        type: 'unchanged',
                        desc: '未变'     
                    },
                    {
                        name: '彭正刚',
                        rate: 1.15,
                        type: 'unchanged',
                        desc: '未变'     
                    },
                    {
                        name: '周林根',
                        rate: 1.12,
                        type: 'unchanged',
                        desc: '未变'     
                    },
                    {
                        name: '海通证券股份有限公司',
                        rate: 0.97,
                        type: 'unchanged',
                        desc: '未变'     
                    },
                ],
                greyColor: '#eaeaea',
                orangeColor: '#ff9933',
                greenColor: '#5d9f3b',
                rankData1: [
                    {
                    title: "N金创",
                    code: "603680",
                    total: 47.07,
                    percent: 43.99
                    },
                    {
                    title: "七一二",
                    code: "603712",
                    total: 7.21,
                    percent: 10.08
                    },
                    {
                    title: "中原协和",
                    code: "600645",
                    total: 21.07,
                    percent: 10.03
                    },
                    {
                    title: "航发科技",
                    code: "600391",
                    total: 17.22,
                    percent: 10.03
                    },
                    {
                    title: "意见股份",
                    code: "600093",
                    total: 15.83,
                    percent: 10.01
                    },
                    {
                    title: "淳中科技",
                    code: "603516",
                    total: 52.66,
                    percent: 10.01
                    },
                    {
                    title: "中航电子",
                    code: "600372",
                    total: 12.53,
                    percent: 10.01
                    },
                    {
                    title: "国泰集团",
                    code: "603977",
                    total: 12.53,
                    percent: 10.01
                    },
                    {
                    title: "永吉股份",
                    code: "603058",
                    total: 17.92,
                    percent: 10.00
                    }
                ],
                rankData2: [
                    {
                    title: "中国铝业",
                    code: "601600",
                    total: 6.55,
                    percent: -10.03
                    },
                    {
                    title: "哈药股份",
                    code: "H03808",
                    total: 5.31,
                    percent: -8.25
                    },
                    {
                    title: "山西焦化",
                    code: "H002628",
                    total: 13.39,
                    percent: -7.78
                    },
                    {
                    title: "允州煤业",
                    code: "300104",
                    total: 15.94,
                    percent: -7.11
                    },
                    {
                    title: "潞安环能",
                    code: "002558",
                    total: 15.94,
                    percent: -6.56
                    },
                    {
                    title: "海螺水泥",
                    code: "600558",
                    total: 33.08,
                    percent: -5.94
                    },
                    {
                    title: "江泉实业",
                    code: "300558",
                    total: 7.95,
                    percent: -5.69
                    },
                    {
                    title: "旗滨集团",
                    code: "600570",
                    total: 6.81,
                    percent: -5.55
                    },
                    {
                    title: "八一钢铁",
                    code: "832558",
                    total: 15.71,
                    percent: -5.24
                    },
                ],
                rankData3: [
                    {
                    title: "华凌精工",
                    code: "H01528",
                    total: 27.9,
                    change: 2.95,
                    percent: 55.77
                    },
                    {
                    title: "天用智能",
                    code: "H03808",
                    total: 11.26,
                    change: 0.706,
                    percent: 52.39
                    },
                    {
                    title: "纯种科技",
                    code: "H002628",
                    total: 0.36,
                    change: 0.35,
                    percent: 49.80
                    },
                    {
                    title: "上海亚士",
                    code: "300104",
                    total: 4.82,
                    change: -0.54,
                    percent: 49.43
                    },
                    {
                    title: "德邦股份",
                    code: "002558",
                    total: 11.26,
                    change: 0.706,
                    percent: 40.76
                    },
                    {
                    title: "香港科技",
                    code: "600558",
                    total: 5.02,
                    change: 0.01,
                    percent: 40.05
                    },
                    {
                    title: "南都物业",
                    code: "300558",
                    total: 53.4,
                    change: -0.43,
                    percent: 39.04
                    },
                    {
                    title: "中源家具",
                    code: "600570",
                    total: 43.43,
                    change: -1.2,
                    percent: 34.85
                    },
                    {
                    title: "日盈电子",
                    code: "832558",
                    total: 15.1,
                    change: 0.0,
                    percent: 31.18
                    },
                    {
                    title: "嘉友国际",
                    code: "600141",
                    total: 11.53,
                    change: -1.19,
                    percent: 30.44
                    },
                    {
                    title: "波浪科技",
                    code: "000558",
                    total: 4.4,
                    change: 0.0,
                    percent: 30.04
                    },
                    {
                    title: "中通国脉",
                    code: "600879",
                    total: 6.66,
                    change: -0.44,
                    percent: 29.57
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
            },
            change1Btn(index) {
                this.btn1Index = index;
            },
            change2Btn(index) {
                this.btn2Index = index;
            },
            btn1Style(index) {
                let style;
                if (index == 0) {
                    style = {
                    "border-style": "solid",
                    "border-left-width": "1px",
                    "border-top-width": "1px",
                    "border-bottom-width": "1px",
                    "border-right-width": "0px",
                    "border-top-left-radius": "5px",
                    "border-bottom-left-radius": "5px",
                    "border-color": "#9a9a9a"
                    };
                    if (this.btn1Index == 0) {
                    style["border-color"] = "rgba(254, 106, 107, 0.3)";
                    style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                }
                if (index == 1) {
                    style = {
                    "border-style": "solid",
                    "border-width": "1px",
                    "border-color": "#9a9a9a"
                    };
                    if (this.btn1Index == 0) {
                    style["border-left-color"] = "rgba(254, 106, 107, 0.3)";
                    }
                    if (this.btn1Index == 1) {
                    style["border-color"] = "rgba(254, 106, 107, 0.3)";
                    style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                    if (this.btn1Index == 2) {
                    style["border-right-color"] = "rgba(254, 106, 107, 0.3)";
                    }
                }
                if (index == 2) {
                    style = {
                    "border-style": "solid",
                    "border-left-width": "0px",
                    "border-right-width": "1px",
                    "border-top-width": "1px",
                    "border-bottom-width": "1px",
                    "border-top-right-radius": "5px",
                    "border-bottom-right-radius": "5px",
                    "border-color": "#9a9a9a"
                    };
                    if (this.btn1Index == 2) {
                    style["border-color"] = "rgba(254, 106, 107, 0.3)";
                    style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                }
                return style;
            },
            btn1TextStyle(index) {
                if (index == this.btn1Index) {
                    return {
                    color: "#fe6a6b",
                    "font-size": "26px"
                    };
                } else {
                    return {
                    color: "#9a9a9a",
                    "font-size": "26px"
                    };
                }
            },
            btn2Style(index) {
                let style;
                if (index == 0) {
                    style = {
                    "border-style": "solid",
                    "border-left-width": "1px",
                    "border-top-width": "1px",
                    "border-bottom-width": "1px",
                    "border-right-width": "0px",
                    "border-top-left-radius": "5px",
                    "border-bottom-left-radius": "5px",
                    "border-color": "#9a9a9a"
                    };
                    if (this.btn2Index == 0) {
                        style["border-color"] = "rgba(254, 106, 107, 0.3)";
                        style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                }
                if (index == 1) {
                    style = {
                    "border-style": "solid",
                    "border-left-width": "1px",
                    "border-top-width": "1px",
                    "border-bottom-width": "1px",
                    "border-right-width": "0px",
                    "border-color": "#9a9a9a"
                    };
                    if (this.btn2Index == 0) {
                    style["border-left-color"] = "rgba(254, 106, 107, 0.3)";
                    }
                    if (this.btn2Index == 1) {
                    style["border-color"] = "rgba(254, 106, 107, 0.3)";
                    style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                }
                if (index == 2) {
                    style = {
                    "border-style": "solid",
                    "border-left-width": "1px",
                    "border-top-width": "1px",
                    "border-bottom-width": "1px",
                    "border-color": "#9a9a9a",
                    "border-right-width": '0px'
                    };
                    if (this.btn2Index == 2) {
                    style["border-color"] = "rgba(254, 106, 107, 0.3)";
                    style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                    if (this.btn2Index == 1) {
                    style["border-left-color"] = "rgba(254, 106, 107, 0.3)";
                    }
                }
                if (index == 3) {
                    style = {
                    "border-style": "solid",
                    "border-width": "1px",
                    "border-top-right-radius": "5px",
                    "border-bottom-right-radius": "5px",
                    "border-color": "#9a9a9a"
                    };
                    if (this.btn2Index == 2) {
                    style["border-left-color"] = "rgba(254, 106, 107, 0.3)";
                    }
                    if (this.btn2Index == 3) {
                    style["border-color"] = "rgba(254, 106, 107, 0.3)";
                    style['background-color'] = "rgba(254, 106, 107, 0.1)";
                    }
                }
                return style;
            },
            btn2TextStyle(index) {
                if (index == this.btn2Index) {
                    return {
                    color: "#fe6a6b",
                    "font-size": "26px"
                    };
                } else {
                    return {
                    color: "#9a9a9a",
                    "font-size": "26px"
                    };
                }
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
    .dark-tag{
        border-width: 1px;
        border-color: #cecdcd;
        color: #cecdcd;
        font-size: 22px;
    }
    .icon-more-arrow{
        width: 16px;
        height: 26px;
        margin-left: 10px;
        margin-right: 30px;
    }
    .blue-card{
        border-color: rgba(0, 196, 255, 0.2);
        border-width: 1px;
        border-radius: 4px;
        background-color: rgba(0, 196, 255, 0.1);
    }
    .blue-bookmark{
        width: 180px;
        background-color: #b3dcf9;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .btn-wrap {
        flex-direction: row;
        justify-content: center;
        width: 500px;
        height: 56px;
    }
    .btn-tab {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: 1;
        border-color: #d9d9d9;
        color: #d9d9d9;
    }
    .list {
        height: 100px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;
        background-color: #ffffff;
    }
</style>
