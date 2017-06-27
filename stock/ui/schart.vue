<template>
    <div>
        <!--分时图-->
        <ul class="nav">
            <li v-bind:class="{'on':chart_tab==1}" v-on:click="chart_tab=1"><a href="javascript:void (0)">分时</a></li>
            <li v-bind:class="{'on':chart_tab==2}" v-on:click="chart_tab=2"><a href="javascript:void (0)">五日</a></li>
            <li v-bind:class="{'on':chart_tab==3}" v-on:click="chart_tab=3"><a href="javascript:void (0)">日K</a></li>
            <li v-bind:class="{'on':chart_tab==4}" v-on:click="chart_tab=4"><a href="javascript:void (0)">周K</a></li>
            <li v-bind:class="{'on':chart_tab==5}" v-on:click="chart_tab=5"><a href="javascript:void (0)">月K</a></li>
            <li v-bind:class="{'on':chart_tab==6}" v-on:click="chart_tab=6"><a href="javascript:void (0)">5分钟</a></li>
            <!--<li>-->
            <!--<a href="javascript:void (0)">分钟</a>-->
            <!--<code class="jiaobiao"></code>-->
            <!--<div class="minutes" style="display: none;">-->
            <!--<span>5分</span>-->
            <!--<span>15分</span>-->
            <!--<span>30分</span>-->
            <!--<span>60分</span>-->
            <!--</div>-->
            <!--</li>-->
        </ul>
        <!--走势图-->
        <div class="canvasBox clearfix">
            <!--分时-->
            <div class="" v-show="chart_tab==1">
                <div style="width: 70%" class="fleft fenshiBox">
                    <canvas  height=240 ref=stock_chart_trend></canvas>
                </div>
                <div style="width: 30%" class="fright">
                    <div class="infoCon mt10">
                        <!--五档-->
                        <div v-show="five_tab==1" v-if="realRES.offer_grp">
                            <ul class="wudang">
                                <li>
                                    <span>卖5</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.offer_grp[12],'fc-green':realRES.preclose_px>realRES.offer_grp[12]}">{{realRES.offer_grp[12]}}</em>
                                    <p>{{realRES.offer_grp[13]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>卖4</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.offer_grp[9],'fc-green':realRES.preclose_px>realRES.offer_grp[9]}">{{realRES.offer_grp[9]}}</em>
                                    <p>{{realRES.offer_grp[10]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>卖3</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.offer_grp[6],'fc-green':realRES.preclose_px>realRES.offer_grp[6]}">{{realRES.offer_grp[6]}}</em>
                                    <p>{{realRES.offer_grp[7]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>卖2</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.offer_grp[3],'fc-green':realRES.preclose_px>realRES.offer_grp[3]}">{{realRES.offer_grp[3]}}</em>
                                    <p>{{realRES.offer_grp[4]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>卖1</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.offer_grp[0],'fc-green':realRES.preclose_px>realRES.offer_grp[0]}">{{realRES.offer_grp[0]}}</em>
                                    <p>{{realRES.offer_grp[1]/100}}</p>
                                </li>
                            </ul>
                            <div class="line mt10"></div>
                            <ul class="wudang mt10">
                                <li>
                                    <span>买5</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.bid_grp[0],'fc-green':realRES.preclose_px>realRES.bid_grp[0]}">{{realRES.bid_grp[0]}}</em>
                                    <p>{{realRES.bid_grp[1]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>买4</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.bid_grp[3],'fc-green':realRES.preclose_px>realRES.bid_grp[3]}">{{realRES.bid_grp[3]}}</em>
                                    <p>{{realRES.bid_grp[4]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>买3</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.bid_grp[6],'fc-green':realRES.preclose_px>realRES.bid_grp[6]}">{{realRES.bid_grp[6]}}</em>
                                    <p>{{realRES.bid_grp[7]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>买2</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.bid_grp[9],'fc-green':realRES.preclose_px>realRES.bid_grp[9]}">{{realRES.bid_grp[9]}}</em>
                                    <p>{{realRES.bid_grp[10]/100}}</p>
                                </li>
                                <li class="mt13">
                                    <span>买1</span>
                                    <em v-bind:class="{'fc-red':realRES.preclose_px<realRES.bid_grp[12],'fc-green':realRES.preclose_px>realRES.bid_grp[12]}">{{realRES.bid_grp[12]}}</em>
                                    <p>{{realRES.bid_grp[13]/100}}</p>
                                </li>
                            </ul>
                        </div>

                        <!--明细-->
                        <div v-show="five_tab==2" >
                            <ul class="wudang">
                                <li style="font-size: 0.18rem;">
                                    <span>时间</span>
                                    <em>价</em>
                                    <p>量</p>
                                </li>
                            </ul>
                            <ul class="wudang" style="overflow-y: scroll; height: 3.2rem;">
                                <li class="mt17" v-for="tick in tickRES">
                                    <span>{{(tick[0]+'').substring(8,12)}}</span>
                                    <em>{{tick[1]}}</em>
                                    <p>{{processNum(tick[2]/100)}}</p>
                                    <!--<code class="fc-green">S</code>-->
                                </li>
                            </ul>
                        </div>

                        <!--大单-->
                        <div class="bigOrder hide">
                            <img src="images/cvs-2.png">
                            <div class="hand mt15">
                                <i class="bg-red"></i>
                                <span>买盘：</span>
                                <code>8,224手</code>
                            </div>
                            <div class="hand mt15">
                                <i class="bg-green"></i>
                                <span>卖盘：</span>
                                <code>8,263手</code>
                            </div>
                            <div class="hand mt15">
                                <i class="bg-white"></i>
                                <span>中性盘：</span>
                                <code>0手</code>
                            </div>
                            <!--<p class="mt10">注：单笔成交额>100万</p>-->
                            <div class="line mt10"></div>
                            <div class="order mt10">
                                <span>14.01</span>
                                <em>17.60</em>
                                <p>26<code class="fc-green">S</code></p>
                            </div>
                        </div>
                    </div>

                    <ul class="nav-fenshi mt5">
                        <li v-bind:class="{'on':five_tab==1}" v-on:click="five_tab=1"><a href="javascript:void (0)">五档</a></li>
                        <li v-bind:class="{'on':five_tab==2}" v-on:click="five_tab=2"><a href="javascript:void (0)">明细</a></li>
                        <!--<li><a href="javascript:void (0)">大单</a></li>-->
                    </ul>
                </div>
            </div>
            <!--五日-->
            <div class="" v-show="chart_tab==2">
                <canvas height=240 ref=stock_chart_trend5day></canvas>
            </div>
            <!--日K-->
            <div class="" v-show="chart_tab==3">
                <canvas height=240 ref=stock_chart_k_6></canvas>
            </div>
            <!--周K-->
            <div class="" v-show="chart_tab==4">
                <canvas height=240 ref=stock_chart_k_7></canvas>
            </div>
            <!--月K-->
            <div class="" v-show="chart_tab==5">
                <canvas  height=240 ref=stock_chart_k_8></canvas>
            </div>
            <!--5f分钟-->
            <div class="" v-show="chart_tab==6">
                <canvas  height=240 ref=stock_chart_k_2></canvas>
            </div>
        </div>
    </div>
</template>

<script>
    let API = require("../js/api/api")
    function drawKLine(type) {
        var that  = this;
        var code = that.stock_code;
        API.kline(code,type).then(function (quote) {
            var kdata = [];
            quote.candle[code].forEach(function(data){
                kdata.push({
                    time:data[0],
                    open_px:data[1],
                    high_px:data[2],
                    low_px:data[3],
                    close_px:data[4],
                    business_amount:data[5],
                    business_balance:data[6]
                });
            });
            LIGHT.Components.StockChart({
                type:"k",
                canvas:{
                    chart:that.$refs['stock_chart_k_'+type]
                },
                data:kdata,
                options:{
                    font:"normal 10px monospace",
                    animation:0,
                    chart:{
                        ma5line:{
                            borderColor:"black"
                        },
                        ma10line:{
                            borderColor:"green"
                        },
                        ma20line:{
                            borderColor:"red"
                        },
                        ma60line:{
                            borderColor:"yello",
                        }
                    },
                    colors:{
                        rise:"#FB3C01",
                        fall:"#32A632",
                        normal:"#999",
                        label:"#999",
                        gridLine:"#444"
                    },
                    size:{
                        chart:110,
                        volume:40
                    }
                }
            });
        });
    }
    function drawTimeline(day) {
        var code = this.stock_code;
        var data_mins = [];
        var data_quote;
        var that = this;

        var func = "trend";
        if(day) func = "trend5day";

        Promise.all([API.real(code),API[func](code)]).then(function (data) {
            data[1].trend[code].forEach(function(data,index,t){
                data_mins.push({
                    min_time:data[0],
                    last_px:data[1],
                    business_amount:data[2],
                    business_balance:data[3],
                    avg_px:data[4]
                })
            });

            var quote = {};
            data[0].snapshot.fields.forEach(function (o,i) {
                quote[o] = data[0].snapshot[code][i];
            });

            data_quote={
                time:quote.data_timestamp,
                open: quote.open_px,
                preClose: quote.preclose_px,
                highest: quote.high_px,
                lowest: quote.low_px,
                price: quote.last_px,
                volume: quote.business_amount,
                amount: quote.business_balance
            };

            LIGHT.Components.StockChart({
                type:"time",
                canvas:{
                    chart:that.$refs["stock_chart_"+func],
                },
                data:{
                    quote:data_quote,
                    mins:data_mins
                },
                options:{
                    font:'8px Arial',
                    chart:{
                        points:data_mins.length>241?data_mins.length:241,
                        maline:{
                            borderColor:"rgba(155,124,56,1)"
                        },
                        timeline:{
                            borderColor:"rgba(5,164,199,1)",
                            fillColor:'#333'
                        },
                        xScaler:['09:30', '15:00']
                    },
                    colors:{
                        rise:"red",
                        fall:"green",
                        normal:"#fff",
                        gridLine:"#444"
                    },
                    size:{
                        chart:100,
                        volume:50
                    }
                }
            });
        });
    }
    export default{
        data:function () {
            return {
                tickRES:null,
                five_tab:0
            }
        },
        props:['chart_tab','realRES','stock_code'],
        watch:{
            chart_tab:function (tab) {
                clearInterval(this._drawTimelineInterval);
                var that = this;
                switch(tab){
                    case 1:
                        drawTimeline.call(that);
                        this._drawTimelineInterval = setInterval(function () {
                            drawTimeline.call(that);
                        },60*1000);
                        this.five_tab = 1;
                        break;
                    case 2:
                        drawTimeline.call(this,5);
                        break;
                    case 3:
                        drawKLine.call(this,6);
                        break;
                    case 4:
                        drawKLine.call(this,7);
                        break;
                    case 5:
                        drawKLine.call(this,8);
                        break;
                    case 6:
                        drawKLine.call(this,2);
                        break;
                }
            },
            five_tab:function (tab) {
                if(tab==2){
                    //分笔数据更新
                    var that = this;
                    API.tick(this.stock_code).then(function (data) {
                        data = data.tick;
                        that.tickRES = data[that.stock_code];
                    })
                }
            },
            stock_code:function (code) {
                this.real(code)
            }
        },
        methods:{
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
//                    that.realRES = res;
                })
            }
        }
    }
</script>