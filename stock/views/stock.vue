
<template>
    <div id="stock">
        <section class="main">
            <!--盘口-->
            <div class="top">
                <div class="pankou flex">
                    <div class="price flex1 fs36">
                        <span class="fs100 show mt10" v-bind:class="{'fc-green':realRES.px_change<0}">{{realRES.last_px}}</span>
                        <div class="mt20" v-bind:class="{'fc-green':realRES.px_change<0}">
                            <em>{{realRES.px_change}}</em> <em class="ml10">{{realRES.px_change_rate}}%</em>
                        </div>
                    </div>
                    <div class="quota flex1">
                        <div class="clearfix mt20">
                            <div class="fleft ml20">
                                <label>今开</label>
                                <span>{{realRES.open_px}}</span>
                            </div>
                            <div class="fright mr20">
                                <label>昨收</label>
                                <span>{{realRES.preclose_px}}</span>
                            </div>
                        </div>
                        <div class="clearfix mt15">
                            <div class="fleft ml20">
                                <label>成交量</label>
                                <span>{{processNum(realRES.business_amount/100)}}手</span>
                            </div>
                            <div class="fright mr20">
                                <label>换手率</label>
                                <span>{{realRES.turnover_ratio}}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dataBox">
                    <div class="flex">
                        <div class="flex1">
                            <label>最高</label>
                            <span>{{realRES.high_px}}</span>
                        </div>
                        <div class="flex1 mlb6">
                            <label>最低</label>
                            <span>{{realRES.low_px}}</span>
                        </div>
                        <div class="flex1 mlb6">
                            <label>成交额</label>
                            <span>{{processNum(realRES.business_balance)}}</span>
                        </div>
                    </div>

                    <div class="flex mt15">
                        <div class="flex1">
                            <label>内盘</label>
                            <span>{{processNum(realRES.business_amount_in/100)}}</span>
                        </div>
                        <div class="flex1 mlb6">
                            <label>外盘</label>
                            <span>{{processNum(realRES.business_amount_out/100)}}</span>
                        </div>
                        <div class="flex1 mlb6">
                            <label>总市值</label>
                            <span>{{processNum(realRES.market_value,0)}}</span>
                        </div>
                    </div>

                    <div class="flex mt15">
                        <div class="flex1">
                            <label>市盈率</label>
                            <span>{{realRES.pe_rate}}</span>
                        </div>
                        <div class="flex1 mlb6">
                            <label>振幅</label>
                            <span>{{realRES.amplitude}}%</span>
                        </div>
                        <div class="flex1 mlb6">
                            <label>流通市值</label>
                            <span>{{processNum(realRES.circulation_value,0)}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <ui-schart :chart_tab="chart_tab" :realRES="realRES" :stock_code="stock_code"></ui-schart>

            <!--新闻公告-->
            <ul class="nav-news mt50">
                <li v-bind:class="{'on':info_tab==1}" v-on:click="info_tab=1"><a href="javascript:void (0)">新闻</a></li>
                <li v-bind:class="{'on':info_tab==2}" v-on:click="info_tab=2"><a href="javascript:void (0)">公告</a></li>
                <li v-bind:class="{'on':info_tab==3}" v-on:click="info_tab=3"><a href="javascript:void (0)">资金</a></li>
            </ul>
            <div class="infoBox">
                <!--新闻-->
                <div class="" v-show="info_tab==1">
                    <ul class="newsBox">
                        <li v-on:click="detail(news)" v-for="news in company_newsRES">
                            <h2>{{news.title}}</h2>
                            <p class="clearfix"><span>{{news.media}}</span>
                                <time>{{news.date}}</time>
                            </p>
                        </li>
                        <li class="more mt10" v-on:click="company_news_page++">点击查看更多</li>
                    </ul>
                </div>
                <!--公告-->
                <div class="" v-show="info_tab==2">
                    <div class="events mt30 hide">
                        <h3>大事提醒</h3>
                        <p class="time mt20">
                            <i>2016</i>融资融券
                        </p>

                        <div class="flex flex-cloum">
                            <div class="flex mt20">
                                <div class="flex flex-cloum event-time">
                                    <time>10-18</time>
                                    <div class="event-icon"></div>
                                </div>
                                <div class="flex flex-cloum lh30">
                                    <span>融资余额1866.23万元，融资买入额238.93万元</span>
                                </div>
                            </div>

                            <div class="flex mt40">
                                <div class="flex flex-cloum event-time">
                                    <time>10-18</time>
                                    <div class="event-icon"></div>
                                </div>
                                <div class="flex flex-cloum lh30">
                                    <p class="fs32">融资融券</p>
                                    <span class="mt20">融资余额1866.23万元</span>
                                </div>
                            </div>

                            <div class="flex mt40">
                                <div class="flex flex-cloum event-time">
                                    <time>10-18</time>
                                    <div class="event-icon"></div>
                                </div>
                                <div class="flex flex-cloum lh30">
                                    <p class="fs32">融资融券</p>
                                    <span class="mt20">融资余额1866.23万元，融资买入额238.93万元</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p class=""></p>
                    <ul class="newsBox">
                        <li v-on:click="detail(announcement)" v-for="announcement in company_announcementRES">
                            <h2>【公告】 {{announcement.title}}</h2>
                            <p class="clearfix"><span></span>
                                <time>{{announcement.date}}</time>
                            </p>
                        </li>
                        <li class="more mt10" v-on:click="company_announcement_page++">点击查看更多</li>
                    </ul>
                </div>
                <!--资金-->
                <div class="" v-show="info_tab==3">
                    <canvas style="height: 220px;" height="440" ></canvas>
                    <!--<img src="images/cvs-7.png" width="100%">-->
                </div>
            </div>


            <!--财务简况-->
            <ul class="nav-info mt30">
                <li v-bind:class="{'on':company_tab==1}" v-on:click="company_tab=1"><a href="javascript:void (0)">简况</a></li>
                <li v-bind:class="{'on':company_tab==2}" v-on:click="company_tab=2"><a href="javascript:void (0)">分析</a></li>
                <li v-bind:class="{'on':company_tab==3}" v-on:click="company_tab=3"><a href="javascript:void (0)">财务</a></li>
            </ul>
            <div class="infoWrap">
                <!--简况-->
                <div class="" v-show="company_tab==1" v-if="f10_company_profileRES">
                    <div class="itemTitle flex mt20">
                        <span>公司简介</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox itemBox-1">
                            <span>所属行业</span>
                            <span class="fc-blue">{{f10_company_profileRES.indurstry}}
                                <!--<em class="fc-green ml5">(-0.46%)</em>-->
                        </span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>所属概念</span>
                            <span class="fc-blue flex concept">
                        <b v-for="block in f10_company_profileRES.block_info">{{block[1]}}</b>
                                <!--<b>转融券<em class="fc-red ml5">(-0.46%)</em></b>-->
                                <!--<b>国际板<em class="fc-green ml5">(-0.46%)</em></b>-->
                                <!--<b class="mt20">中证500<em class="fc-green ml5">(-0.46%)</em></b>-->
                                <!--<b class="mt20">融资融券<em class="fc-red ml5">(-0.46%)</em></b>-->
                                <!--<b class="mt20">基金增仓<em class="fc-red ml5">(-0.46%)</em></b>-->
                    </span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>公司名称</span>
                            <span>{{f10_company_profileRES.chi_name}}</span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>上市日期</span>
                            <span>{{f10_company_profileRES.list_date}}</span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>发行价格</span>
                            <span>{{f10_company_profileRES.issue_price}}</span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>发行数量</span>
                            <span>{{f10_company_profileRES.issue_vol}}股</span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>所属地区</span>
                            <span>{{f10_company_profileRES.reg_addr}}</span>
                        </div>
                        <div class="flex itemBox itemBox-1">
                            <span>主营业务</span>
                            <span>{{f10_company_profileRES.main_business}}</span>
                        </div>
                    </div>

                    <div class="itemTitle flex mt40">
                        <span>股东股本（2016-06-30）</span>
                        <span>流通股东</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox">
                            <span>总股本</span>
                            <span>{{f10_company_profileRES.structure.a_floats_shares}}股</span>
                        </div>
                        <div class="flex itemBox">
                            <span>流通A股</span>
                            <span>{{f10_company_profileRES.structure.a_floats_shares}}股</span>
                        </div>
                        <!--<div class="flex itemBox">-->
                        <!--<span>股东人数</span>-->
                        <!--<span>{{f10_company_profileRES.structure.total_shares}}户</span>-->
                        <!--</div>-->
                        <!--<div class="flex itemBox">-->
                        <!--<span>人均持股</span>-->
                        <!--<span>13,423股</span>-->
                        <!--</div>-->
                    </div>

                    <div class="itemTitle flex mt40">
                        <span>主营收入构成</span>
                        <span>单位：元</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox" v-for="i in f10_company_profileRES.indurstry_detail">
                            <span style="flex: 1">{{i.industry}}</span>
                            <span style="flex: 1">{{processNum(i.main_oper_income)}}</span>
                        </div>
                    </div>

                    <div class="itemTitle flex mt40">
                        <span>分红配送</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox itemBox2" style="color: #8b8e93;">
                            <span>年度</span>
                            <span>方案</span>
                            <span>除权日</span>
                        </div>
                        <div class="flex itemBox itemBox2" v-for="d in f10_company_profileRES.distribution">
                            <span>{{d.report_date.substring(0,4)}}</span>
                            <span>10派{{Number(d.cash_divi)}}</span>
                            <span>{{d.ex_divi_date}}</span>
                        </div>
                    </div>

                    <div class="itemTitle flex mt40">
                        <span>前十大股东</span>
                        <span>单位：股</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox" v-for="i in f10_company_profileRES.top10_shareholders">
                            <span style="flex: 1">{{i.sh_list}}</span>
                            <span style="flex: 1">{{processNum(i.hold_sum)}}</span>
                        </div>
                    </div>
                </div>
                <!--分析-->
                <div class="" v-show="company_tab==2">
                    <div class="itemTitle flex mt20">
                        <span>研报摘要</span>
                    </div>
                    <ul class="newsBox">
                        <li v-on:click="detail(r)" v-for="r in company_researchRES">
                            <h2>【{{r.org_name}}】{{r.title}}</h2>
                            <p class="clearfix"><span></span>
                                <time>{{r.date}}</time>
                            </p>
                        </li>
                        <li class="more mt10" v-on:click="company_research_page++">点击查看更多</li>
                    </ul>

                    <!--<div class="itemTitle flex mt20">-->
                    <!--<span>个股体检</span>-->
                    <!--</div>-->
                    <!--<div class="flex lh40 mt20" style="align-items: center;">-->
                    <!--<div class="point">B-</div>-->
                    <!--<div class="flex1 fc-hui">该股为中盘中价股，财务状况一般，毛利率低于行业平均水平，净资产收益率与行业平均水平持平，在饮料制造行业中估值偏低，有一定的上升空间，可适当关注-->
                    <!--</div>-->
                    <!--</div>-->

                    <!--<div class="mt20 pd20 lh40">-->
                    <!--<p>股票走势</p>-->
                    <!--<p>1.处于长期上升趋势，近期保持多头强势</p>-->
                    <!--<p>2.K线走势较强</p>-->
                    <!--<p>3.换手率下降</p>-->
                    <!--<p>4.近期走势相对强于大盘和行业</p>-->
                    <!--</div>-->

                    <!--<div class="pd20 lh40">-->
                    <!--<p>股票质地</p>-->
                    <!--<p>1.资金流动周转有一定问题</p>-->
                    <!--<p>2.资产的长期安全性较高</p>-->
                    <!--<p>3.资产周转快</p>-->
                    <!--<p>4.营收占同行业市场份额的3.4%</p>-->
                    <!--</div>-->

                    <!--<div class="itemTitle flex mt20">-->
                    <!--<span>投资亮点</span>-->
                    <!--</div>-->
                    <!--<div class="pd20 lh40">-->
                    <!--<p>1.嘉士伯香港为公司第一大股东嘉士伯香港为公司第一大股东嘉士伯香港为公司第一大股东嘉士伯香港为公司第一大股东</p>-->
                    <!--</div>-->

                </div>
                <!--财务-->
                <div class="" v-show="company_tab==3" v-if="company_financeRES">
                    <div class="itemTitle flex mt30" style="color: #8b8e93;">
                        <span>利润表</span>
                        <span>2016中报</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox">
                            <span>营业总收入</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.total_operating_revenue)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>营业收入</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.operating_revenue)}}元</span>
                        </div>
                        <div class="flex itemBox">
                            <span>营业费用</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.operating_expense)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>管理费用</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.administration_expense)}}元</span>
                        </div>
                        <div class="flex itemBox">
                            <span>营业利润</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.operating_profit)}}元</span>
                        </div>
                        <div class="flex itemBox">
                            <span>营业外收入</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.non_operating_income)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>净利润</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.income.net_profit)}}元</span>
                        </div>
                    </div>

                    <div class="itemTitle flex mt30" style="color: #8b8e93;">
                        <span>资产负债表</span>
                        <span>2016中报</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox">
                            <span>长期股权投资</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.balance.longterm_equity_invest)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>资产总计</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.balance.total_assets)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>资本公积金</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.balance.capital_reserve_fund)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>盈余公积金</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.balance.surplus_reserve_fund)}}</span>
                        </div>
                        <div class="flex itemBox">
                            <span>股东权益合计</span>
                            <span style="flex: 1;">{{processNum(company_financeRES.balance.total_shareholder_equity)}}</span>
                        </div>
                    </div>

                    <div class="itemTitle flex mt30" style="color: #8b8e93;">
                        <span>现金流量表</span>
                        <span>2016中报</span>
                    </div>
                    <div class="flex flex-cloum">
                        <div class="flex itemBox">
                            <span>每股现金流</span>
                            <span style="flex: 1;">0.23</span>
                        </div>
                        <div class="flex itemBox">
                            <span>经营现金流净额</span>
                            <span style="flex: 1;">4.84亿元</span>
                        </div>
                        <div class="flex itemBox">
                            <span>投资现金流净额</span>
                            <span style="flex: 1;">-2.29亿元</span>
                        </div>
                        <div class="flex itemBox">
                            <span>筹资现金流净额</span>
                            <span style="flex: 1;">-1.45亿元</span>
                        </div>
                    </div>
                </div>
            </div>

            <!--底部导航-->
            <div class="bottom">
                <ul class="nav-Bottom">
                    <li><img src="images/comment.png"><br>评论</li>
                    <li><img src="images/deal.png"><br>交易</li>
                    <li><img src="images/share.png"><br>分享</li>
                    <li><img src="images/more.png"><br>更多</li>
                </ul>
            </div>
        </section>
    </div>

</template>
<script>
    let API = require("../js/api/api")
    let uiSchart = require("../ui/schart.vue");
    import Light from "light";
    export default {
        data: function () {
            return {
                stock_code:null,
                realRES:{},
                info_tab:null,
                company_tab:null,
                company_newsRES:null,
                company_news_page:null,
                company_announcementRES:null,
                company_announcement_page:null,
                company_researchRES:null,
                company_research_page:null,
                f10_company_profileRES:null,
                company_financeRES:null,
                Number:Number,

                chart_tab:null,

                five_tab:null,
                tickRES:null
            }
        },
        components:{
            uiSchart
        },
        watch: {
            stock_code:function (code){
                var that = this;
                that.real(code);
                setInterval(function () {
                    that.real(code);
                },3000);
                this.info_tab = 1;
                this.company_tab=1;
                this.chart_tab=1;
            },
            info_tab:function (tab) {
                switch(tab){
                    case 1:
                        this.company_news_page = 1;
                        break;
                    case  2:
                        this.company_announcement_page = 1;
                        break;
                    case 3:
//                        this.drawFundflow();
                        break;
                }
            },
            company_tab:function (tab) {
                switch(tab){
                    case 1:
                        this.f10_company_profile(this.stock_code);
                        break;
                    case  2:
                        this.company_research_page = 1;
                        break;
                    case 3:
                        this.company_finance(this.stock_code);
                        break;
                }
            },
            company_news_page:function () {
                this.company_news(this.stock_code);
            },
            company_announcement_page:function () {
                this.company_announcement(this.stock_code);
            },
            company_research_page:function () {
                this.company_researchreport(this.stock_code);
            }
        },
        methods: {
            real:function (code) {
                var res = {};
                var that = this;
                API.real(code).then(function (data) {
                    data = data.snapshot;
                    data.fields.forEach(function (v, k) {
                        res[v] = data[code][k];
                    });
                    res.bid_grp = res.bid_grp.split(',');
                    res.offer_grp = res.offer_grp.split(',');
                    that.realRES = res;
                })
            },
            company_news:function (code) {
                var start_id = 0;
                var that = this;
                var pageNo = this.company_news_page;

                if(pageNo>1){
                    start_id = that.company_newsRES[that.company_newsRES.length-1].id;
                }

                API.company_news({
                    prod_code:code,
                    start_id:start_id,
                    page_no:pageNo
                }).then(function (data) {
                    data = data[0]['20103001'][0][code];
                    if(pageNo>1){
                        that.company_newsRES = that.company_newsRES.concat(data);
                    }else{
                        that.company_newsRES = data;
                    }
                })
            },
            company_announcement:function (code) {
                var start_id = 0;
                var that = this;
                var pageNo = this.company_announcement_page;

                if(pageNo>1){
                    start_id = that.company_announcementRES[that.company_announcementRES.length-1].id;
                }
                API.company_announcement({
                    prod_code:code,
                    start_id:start_id,
                    page_no:pageNo
                }).then(function (data) {
                    var announcements = [];
                    data.forEach(function (announcement, index) {
                        if(index == 0) announcement = announcement[0]['20103002'][0][code];
                        if(index == 1) announcement = announcement[0]['20103003'][0][code];
                        announcements = announcements.concat(announcement)
                    });

                    if(pageNo>1){
                        that.company_announcementRES = that.company_announcementRES.concat(announcements);
                    }else{
                        that.company_announcementRES = announcements;
                    }
                })
            },
            f10_company_profile:function (code) {
                var that = this;
                API.company_profile(code).then(function (data) {
                    var compInfo = {};
                    data.forEach(function (info, index) {
                        if(index==0) {
                            compInfo = info[0]['20101002'][0][code][0];
                        }
                        if(index==1){
                            compInfo.structure = info[0]['20101005'][0][code][0]
                        }
                        if(index==2){
                            compInfo.distribution = info[0]['20101003'][0][code]
                        }
                        if(index==3){
                            compInfo.indurstry_detail = info[0]['20101004'][0][code]
                        }
                        if(index==4){
                            compInfo.top10_shareholders = info[0]['20101011'][0][code]
                        }
                        if(index==5){
                            // var block = {};
                            // info['fields'].forEach(function (o, i) {
                            //     block[o] =  [i];
                            // });
                            compInfo.block_info = info[code];
                        }
                    });
                    that.f10_company_profileRES = compInfo;
                })
            },
            company_researchreport:function (code) {
                var start_id = 0;
                var that = this;
                var pageNo = this.company_research_page;

                if(pageNo>1){
                    start_id = that.company_researchRES[that.company_researchRES.length-1].id;
                }
                API.company_researchreport({
                    prod_code:code,
                    start_id:start_id,
                    page_no:pageNo
                }).then(function (data) {
                    data = data[0]['20103004'][0][code];
                    if(pageNo>1){
                        that.company_researchRES = that.company_researchRES.concat(data);
                    }else{
                        that.company_researchRES = data;
                    }
                })
            },
            company_finance:function (code) {
                var that = this;
                API.company_finance(code).then(function (data) {
                    var finance = {};
                    data.forEach(function (info, index) {
                        if(index==0) {
                            finance.income = info[0]['20101019'][0][code][0];
                        }
                        if(index==1){
                            finance.balance = info[0]['20101020'][0][code][0];
                        }
                        if(index==2){
                            finance.cashflow = info[0]['20101018'][0][code][0];
                        }
                    });
                    that.company_financeRES = finance;
                })
            },
            processNum:function (num,scale) {
                num = Number(num);
                scale = scale==0?0:2;
                if(num>100000000){
                    return (num/100000000).toFixed(scale)+"亿";
                }

                if(num>10000){
                    return (num/10000).toFixed(scale)+"万";
                }

                return Number(num);
            },
            detail:function (info) {
                window.detail_info = info;
                Light.navigate("news");
            },
            drawFundflow:function () {
                var canvas = this.$els.fundflow;
                var ctx = canvas.getContext("2d");
                var width = canvas.width = screen.width*2;

                var center = [width/2,200];

                //先画最外面然后颜色被覆盖就可以了
                ctx.beginPath();
                ctx.fillStyle="#333";
                ctx.arc(center[0],center[1],180,0,2*Math.PI);
                ctx.fill();

                //然后绘制4个环
                ctx.beginPath();
                ctx.moveTo(center[0],center[1]);
                ctx.fillStyle="red";
                ctx.arc(center[0],center[1],160,0.1*Math.PI,0.5*Math.PI,false);
                ctx.fill();

                //然后绘制4个环
                ctx.beginPath();
                ctx.moveTo(center[0],center[1]);
                ctx.fillStyle="green";
                ctx.arc(center[0],center[1],160,0.5*Math.PI,0.9*Math.PI,false);
                ctx.fill();


                //然后绘制4个环
                ctx.beginPath();
                ctx.moveTo(center[0],center[1]);
                ctx.fillStyle="red";
                ctx.arc(center[0],center[1],160,0.9*Math.PI,1.5*Math.PI,false);
                ctx.fill();

                //然后绘制4个环
                ctx.beginPath();
                ctx.moveTo(center[0],center[1]);
                ctx.fillStyle="green";
                ctx.arc(center[0],center[1],160,1.5*Math.PI,2.1*Math.PI,false);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(center[0],center[1]);
                ctx.fillStyle="#333";
                ctx.arc(center[0],center[1],120,0,2.1*Math.PI);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(center[0],center[1]);
                ctx.fillStyle="#101318";
                ctx.arc(center[0],center[1],100,0,2.1*Math.PI);
                ctx.fill();

                // //中心文字
                // ctx.fillStyle="#aaa";
                // ctx.fillText("今日资金",center[0],center[1],40)
            }
        },
        beforeRender: function (params) {
            this.model.stock_code = params.code || "600570.SS";
        }
    }
</script>
<style lang="less">

</style>
