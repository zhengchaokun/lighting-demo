
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
            <div class="mt20">
                <div class="flex-row bottom-line bgc-white">
                    <div v-for="(item, index) in newsTab" :key="index" class="flex-1 align-center justify-center pd10" @click="changeNews(index)">
                        <text :class="['fs26', 'mt10', index==newsIndex?'f-red':'f-dark']">{{item}}</text>
                        <div :class="['bottom-slider', 'mt10', index==newsIndex?'active-slider':'']"></div>
                    </div>
                </div>
                <!-- 必读 -->
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
                <!-- 新闻公告 -->
                <div v-if="newsIndex == 1">
                    <div class="bgc-white flex-row justify-center">
                        <div class="mt40 mb20 btn-wrap">
                            <div v-for="(btn, index) in newsTitles" :key="index" :style="btn1Style(index)" class="btn-tab" @click="change1Btn(index)" >
                                <text class="btn-text" :style="btn1TextStyle(index)">{{btn}}</text>
                            </div>
                        </div>
                    </div>
                    <div class="bgc-white pd20">
                        <!-- 新闻 -->
                        <div v-if="btn1Index == 0">
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
                        <!-- 公告 -->
                        <div v-if="btn1Index == 1">
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
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子：业务增速好于预期</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs20 f-dark">
                                        2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子：复苏动力强劲，未来储备丰富</text>
                                <div class="flex-row align-center justify-end mt30 mb20">
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                        </div>
                        <!-- 研报 -->  
                        <div v-if="btn1Index == 2">
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子2017年年度业绩预增公告</text>
                                <div class="flex-row align-center justify-between mt30 mb20">
                                    <div class="flex-row align-center">
                                        <text class="fs26 f-red">买入</text>
                                        <text class="fs26 f-dark">| 中泰证券</text>
                                    </div>
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子2017年年度业绩预增公告</text>
                                <div class="flex-row align-center justify-between mt30 mb20">
                                    <div class="flex-row align-center">
                                        <text class="fs26 f-red">买入</text>
                                        <text class="fs26 f-dark">| 中泰证券</text>
                                    </div>
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子2017年年度业绩预增公告</text>
                                <div class="flex-row align-center justify-between mt30 mb20">
                                    <div class="flex-row align-center">
                                        <text class="fs26 f-red">买入</text>
                                        <text class="fs26 f-dark">| 中泰证券</text>
                                    </div>
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                            <div class="bottom-line pt20">
                                <text class="fs26 f-black">恒生电子2017年年度业绩预增公告</text>
                                <div class="flex-row align-center justify-between mt30 mb20">
                                    <div class="flex-row align-center">
                                        <text class="fs26 f-red">买入</text>
                                        <text class="fs26 f-dark">| 中泰证券</text>
                                    </div>
                                    <text class="fs20 f-dark">2018-01-30</text>
                                </div>
                            </div>
                        </div>

                        <div class="flex-row justify-center">
                            <text class="fs24 f-blue mt20">点击加载</text>
                        </div>
                    </div>
                </div>
                <!-- 简况 -->
                <div v-if="newsIndex == 2">
                    <div class="bgc-white flex-row justify-center pb20">
                        <div class="mt40 mb20 btn-wrap">
                            <div v-for="(btn, index) in f10Titles" :key="index" :style="btn2Style(index)" class="btn-tab" @click="change2Btn(index)" >
                                <text class="btn-text" :style="btn2TextStyle(index)">{{btn}}</text>
                            </div>
                        </div>
                    </div>
                    <!-- 公司简况 -->
                    <div v-if="btn2Index == 0">
                        <!-- 公司简介 -->
                        <div class="bgc-white pt20 pl20 pr20 pb40">
                            <div class="flex-row justify-between align-center mb20">
                                <text class="fs26 f-black">公司简介</text>
                                <image src="images/more-arrow.png" class="icon-more-arrow"></image>
                            </div>
                            <div class="flex-row align-center mt20">
                                <text class="flex-1 fs24 f-dark">公司名称</text>
                                <text class="flex-2 fs24 f-black">恒生电子股份有限公司</text>
                            </div>
                            <div class="flex-row align-center mt20">
                                <text class="flex-1 fs24 f-dark">注册地址</text>
                                <text class="flex-2 fs24 f-black">杭州市滨江区江南大道2588号恒生大厦11层</text>
                            </div>
                            <div class="flex-row align-center mt20">
                                <text class="flex-1 fs24 f-dark">实际控制人</text>
                                <text class="flex-2 fs24 f-black">马云</text>
                            </div>
                            <div class="flex-row align-center mt20">
                                <text class="flex-1 fs24 f-dark">发行价</text>
                                <text class="flex-2 fs24 f-black">15.53元</text>
                            </div>
                            <div class="flex-row align-center mt20">
                                <text class="flex-1 fs24 f-dark">首日开盘价</text>
                                <text class="flex-2 fs24 f-black">20.00元</text>
                            </div>
                            <div class="flex-row align-center mt20">
                                <text class="flex-1 fs24 f-dark">所属行业</text>
                                <text class="flex-2 fs24 f-black">计算机应用</text>
                            </div>
                        </div>
                        <!-- 主营业务 -->
                        <div class="bgc-white mt20 pt20 pl20 pr20 pb40">
                            <div class="flex-row justify-between align-center mb20">
                                <text class="fs26 f-black">主营业务</text>
                                <image src="images/more-arrow.png" class="icon-more-arrow"></image>
                            </div>
                            <div class="flex-row justify-around mt20">
                                <div class="flex">
                                    <text class="fs26 f-black">软件收入</text>
                                    <text class="fs20 f-red">97.80%</text>
                                </div>
                                <div>
                                    <text class="fs26 f-black">硬件收入</text>
                                    <text class="fs20 f-orange">1.92%</text>
                                </div>
                            </div>
                            <div class="flex-row justify-around mt20">
                                <div>
                                    <text class="fs26 f-black">其他业务</text>
                                    <text class="fs20 f-blue">0.12%</text>
                                </div>
                                <div>
                                    <text class="fs26 f-black">科技园收入</text>
                                    <text class="fs20 f-green">0.09%</text>
                                </div>
                            </div>
                        </div>
                        <!-- 分红转送 -->
                        <div class="bgc-white mt20 pt20 pb40">
                            <div class="flex-row justify-between align-center mb20 pl20 pr20">
                                <text class="fs26 f-black">分红转送</text>
                                <image src="images/more-arrow.png" class="icon-more-arrow"></image>
                            </div>
                            <div class="flex-row justify-around mt20 bgc-dark pd20">
                                <div class="flex-2">
                                    <text class="fs24 f-dark">除权日</text>
                                </div>
                                <div class="flex-2">
                                    <text class="fs24 f-dark">方案</text>
                                </div>
                                <div class="flex-1">
                                    <text class="fs24 f-dark">股息率</text>
                                </div>
                            </div>
                            <div v-for="(item, index) in fenhongData" :key="index" :class="['flex-row', 'justify-around','pd20', index%2==0?'bgc-white':'bgc-dark']">
                                <div class="flex-2">
                                    <text class="fs24 f-dark">{{item.date}}</text>
                                </div>
                                <div class="flex-2">
                                    <text class="fs24 f-dark">{{item.desc}}</text>
                                </div>
                                <div class="flex-1">
                                    <text class="fs24 f-dark">{{item.rate}}</text>
                                </div>
                            </div>

                            <div class="flex-row justify-center">
                                <text class="fs24 f-blue mt20">点击加载</text>
                            </div>

                        </div>
                        <!-- 公司高管 -->
                        <div class="bgc-white mt20 pt20 pb40">
                            <div class="flex-row justify-between align-center mb20 pl20 pr20">
                                <text class="fs26 f-black">公司高管</text>
                                <image src="images/more-arrow.png" class="icon-more-arrow"></image>
                            </div>
                            <div class="flex-row justify-around mt20 bgc-dark pd20">
                                <div class="flex-2">
                                    <text class="fs24 f-dark">姓名</text>
                                </div>
                                <div class="flex-2">
                                    <text class="fs24 f-dark">职务</text>
                                </div>
                                <div class="flex-1">
                                    <text class="fs24 f-dark">持股</text>
                                </div>
                            </div>
                            <div v-for="(item, index) in gaoguanData" :key="index" class="flex-row justify-around pd20">
                                <div class="flex-2">
                                    <text class="fs24 f-dark">{{item.name}}</text>
                                </div>
                                <div class="flex-2">
                                    <text class="fs24 f-dark">{{item.duty}}</text>
                                </div>
                                <div class="flex-1">
                                    <text class="fs24 f-dark">{{item.share}}</text>
                                </div>
                            </div>

                            <div class="flex-row justify-center">
                                <text class="fs24 f-blue mt20">点击加载</text>
                            </div>

                        </div>
                    </div>
                    <!-- 行业排名 -->
                    <div v-if="btn2Index == 1">

                    </div>
                    <!-- 股东股本 -->
                    <div v-if="btn2Index == 2">

                    </div>
                    <!-- 财务数据 -->
                    <div v-if="btn2Index == 3">

                    </div>
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
                newsTitles: ['新闻','公告','研报'],
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
                ]
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
</style>
