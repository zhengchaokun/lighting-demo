var themes={
    "theme-White":{
        rise: "#FB3C01",
        fall: "#32A632",
        normal: "#999999",
        label: "#999999",
        gridLine: "#dddddd",
        fillColor:"#fffcea",
        maColor:"rgba(5,164,199,1)",
        priceColor:"rgba(155,124,56,1)"
    },
    "theme-Black":{
        rise: "#FB3C01",
        fall: "#32A632",
        normal: "#fefefe",
        label: "#ffffff",
        gridLine: "#444444",
        fillColor:"#021821",
        maColor:"rgba(155,124,56,1)",
        priceColor:"rgba(5,164,199,1)"
    }
};
var chart = require("./chart/index");
const API = require("./api")
var chartDrawer = {
    drawKLine:function (code, type, ctx) {
        var that = this;
        return API.kline(code, type).then(function (quote) {
            var kdata = [];
            quote.candle[code].forEach(function (data) {
                kdata.push({
                    time: data[0],
                    open_px: data[1],
                    high_px: data[2],
                    low_px: data[3],
                    close_px: data[4],
                    business_amount: data[5],
                    business_balance: data[6]
                });
            });
            return API.getSystemInfo().then(function (info) {
                return chart.KChart({
                    type: "k",
                    canvas: {
                        chart: ctx
                    },
                    data: kdata,
                    options: {
                        width:info.windowWidth-5,
                        font: "normal 10px monospace",
                        animation: 0,
                        chart: {
                            ma5line: {
                                borderColor: "black"
                            },
                            ma10line: {
                                borderColor: "green"
                            },
                            ma20line: {
                                borderColor: "red"
                            },
                            ma60line: {
                                borderColor: "#453223",
                            }
                        },
                        colors: {
                            rise: themes['theme-White'].rise,
                            fall: themes['theme-White'].fall,
                            normal: themes['theme-White'].normal,
                            label: themes['theme-White'].label,
                            gridLine: themes['theme-White'].gridLine
                        },
                        size: {
                            chart: 130*2*info.windowWidth/750,
                            volume: 40*2*info.windowWidth/750
                        }
                    }
                });
            })
        });
    },
    drawTimeline:function (code,day,ctx) {
        var data_mins = [];
        var data_quote;
        var that = this;

        var func = "trend";
        if(day) func = "trend5day";

        return Promise.all([API.real(code),API[func](code)]).then(function (data) {
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
            return API.getSystemInfo().then(function (info) {
                return chart.MinsChart({
                    type:"time",
                    canvas:{
                        chart:ctx,
                    },
                    data:{
                        quote:data_quote,
                        mins:data_mins
                    },
                    options:{
                        width:info.windowWidth-((day)?5:120),
                        font:'8px Arial',
                        chart:{
                            points:data_mins.length>241?data_mins.length:241,
                            maline:{
                                borderColor:themes['theme-White'].maColor
                            },
                            timeline:{
                                borderColor:themes['theme-White'].priceColor,
                                fillColor:themes['theme-White'].fillColor
                            },
                            xScaler:['09:30', '15:00']
                        },
                        colors:{
                            rise: themes['theme-White'].rise,
                            fall: themes['theme-White'].fall,
                            normal: themes['theme-White'].normal,
                            label: themes['theme-White'].label,
                            gridLine: themes['theme-White'].gridLine
                        },
                        size:{
                            chart:125*2*info.windowWidth/750,
                            volume:35*2*info.windowWidth/750
                        }
                    }
                });
            })

        });
    }
};

module.exports = chartDrawer;