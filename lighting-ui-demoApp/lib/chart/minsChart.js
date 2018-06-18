var Painter = require("./painter"),
    yAxis = require("./yAxis"),
    xAxis = require("./xAxis"),
    linePainter = require("./linePainter"),
    volumePainter = require("./volumePainter"),
    Utils = require("./utils");

function line(ctx, x0, y0, x1, y1, color, width) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width || 1;
    ctx.stroke();
}

function getMinTime(minIndex) {
    //上午09：30-11：30
    //下午13：00-15：00
    var d = new Date();
    if (minIndex <= 120) {
        d.setHours(9, 30, 30);
        d = new Date(d.getTime() + (minIndex) * 60 * 1000);
    } else {
        d.setHours(13, 0, 0);
        d = new Date(d.getTime() + (minIndex - 120) * 60 * 1000);
    }


    var hour = d.getHours() > 9 ? new String(d.getHours()) : '0' + d.getHours();
    var minutes = d.getMinutes() > 9 ? new String(d.getMinutes()) : '0' + d.getMinutes();
    var seconds = '30';
    return hour + '' + minutes + seconds;
}

function minsChart(canvas, options) {
    Utils.extendObject(options, this);
    this.ctx = canvas;
    this.canvas = canvas;
    this.canvas.painter = this;
}

minsChart.prototype = {
    paint: function (data) {
        // this.fillTopText(data);
        this.paintChart(data);
        this.paintxAxis();
        this.fillBottomText(data);
        this.paintVolume(data);
    },

    paintVolume: function (data) {
        var ctx = this.ctx;
        var options = this.volume;
        ctx.beginPath();
        ctx.rect(options.region.x, options.region.y, options.region.width, options.region.height);
        ctx.strokeStyle = options.borderColor;
        ctx.stroke();
        line(ctx, options.region.x, options.region.y + options.region.height / 2, options.region.x + options.region.width, options.region.y + options.region.height / 2, options.splitLineColor);

        var region = options.region;
        var splitCount = this.minsChart.verticalLineCount + 1;
        for (var i = 1; i <= this.minsChart.verticalLineCount; i++) {
            var x = region.x + region.width * i / splitCount;
            line(ctx, x, region.y, x, region.y + region.height, this.minsChart.otherSplitLineColor);
        }

        options.getDataLength = function () {
            return this.data.items.length;
        };
        options.maxDotsCount = this.maxDotsCount;
        var volumePainterImp = new volumePainter(options);
        var painter = new Painter(this.canvas, volumePainterImp, {items: data.mins});
        painter.paint();

        var max = painter.maxVolume;
        var unit;
        if (max / 1000000 > 1000) {
            max = max / 1000000;
            unit = '百万';
        } else {
            max = max / 10000;
            unit = '万';
        }
        var scalers = [max.toFixed(2), (max / 2).toFixed(2), '(' + unit + ')'];
        var yscaler = new yAxis(this.volume.yScaler);
        var painter = new Painter(this.canvas, yscaler, scalers);
        painter.paint();
    },

    fillBottomText: function (data) {
        if (!this.bottomText) return;
        //高9999 低9999 成交888999
        var ctx = this.ctx;
        var txt = '高';
        var options = this.bottomText;
        ctx.font = options.font;
        ctx.fillStyle = options.color;
        var w = ctx.measureText(txt).width;
        ctx.fillText(txt, options.region.x, options.region.y);
        var x = options.region.x + w;
        var quote = data.quote;
        var me = this;

        function getTxtColor(val) {
            return val > quote.preClose ? me.riseColor : (val == quote.preClose ? me.normalColor : me.fallColor);
        }

        var highColor = getTxtColor(quote.highest);
        var high = toMoney(quote.highest);
        ctx.fillStyle = highColor;
        w = ctx.measureText(high).width;
        ctx.fillText(high, x, options.region.y);
        x += w;
        txt = ' 低';
        ctx.fillStyle = options.color;
        w = ctx.measureText(txt).width;
        ctx.fillText(txt, x, options.region.y);
        x += w;
        var lowColor = getTxtColor(quote.lowest);
        var low = toMoney(quote.lowest);
        w = ctx.measureText(low).width;
        ctx.fillStyle = lowColor;
        ctx.fillText(low, x, options.region.y);
        x += w;
        ctx.fillStyle = options.color;
        var amount = ' 成交' + bigNumberToText(quote.amount);
        ctx.fillText(amount, x, options.region.y);
    },

    paintxAxis: function () {
        var xAxisImpl = new xAxis(this.xScaler);
        var xAxisPainter = new Painter(this.canvas, xAxisImpl, this.xScaler.data);
        xAxisPainter.paint();
    },

    paintChart: function (data) {
        var minsChartOptions = this.minsChart;
        var region = this.minsChart.region;
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.strokeStyle = minsChartOptions.borderColor;
        ctx.rect(region.x, region.y, region.width, region.height);
        ctx.stroke();

        //水平线
        var middleIndex = (this.minsChart.horizontalLineCount + this.minsChart.horizontalLineCount % 2) / 2;
        var splitCount = this.minsChart.horizontalLineCount + 1;
        for (var i = 1; i <= this.minsChart.horizontalLineCount; i++) {
            var color = (i == middleIndex ? minsChartOptions.middleLineColor : minsChartOptions.otherSplitLineColor);
            var y = region.y + region.height * i / splitCount;
            line(ctx, region.x, y, region.x + region.width, y, color);
        }
        //垂直线
        splitCount = this.minsChart.verticalLineCount + 1;
        for (var i = 1; i <= this.minsChart.verticalLineCount; i++) {
            var x = region.x + region.width * i / splitCount;
            line(ctx, x, region.y, x, region.y + region.height, minsChartOptions.otherSplitLineColor);
        }

        var maxDiff=0;
        data.mins.forEach(function (item) {
            var diff = Math.abs(data.quote.preClose - item.price);
            maxDiff = Math.max(diff, maxDiff);
        });

        data.mins.forEach(function (item) {
            if(item.avg_px){
                var diff = Math.abs(data.quote.preClose - item.avg_px);
                maxDiff = Math.max(diff, maxDiff);
            }
        });

        //价格线
        var lineOptions = {
            region: region,
            maxDotsCount: this.maxDotsCount,
            getDataLength: function () {
                return this.data.items.length;
            },
            getItemValue: function (item) {
                return item.price;
            },
            middleValue: data.quote.preClose, //通常是昨收
            lineColor: minsChartOptions.priceLineColor,
            fillColor: minsChartOptions.priceLineFillColor,
            maxDiff:maxDiff
        };
        var linePainterImp = new linePainter(lineOptions);
        var priceLinePainter = new Painter(this.canvas, linePainterImp, {items: data.mins});
        priceLinePainter.paint();

        //y轴
        var yOptions = this.minsChart.yScalerLeft;
        var preClose = data.quote.preClose;
        var me = this;
        yOptions.color = function (val) {
            return val > preClose ? me.riseColor : (val == preClose ? me.normalColor : me.fallColor);
        };
        var scalersLeft = [];
        var scalersRight = [];
        var min = preClose - priceLinePainter.maxDiff;
        var space = priceLinePainter.maxDiff * 2 / (1 + 1);
        for (var i = 1 + 1; i >= 0; i--) {
            var val = min + i * space;
            scalersLeft.push(val.toFixed(2));
            var percent = (val - preClose) * 100 / preClose;
            scalersRight.push(percent.toFixed(2) + '%');
        }
        var yx = new yAxis(yOptions);
        var yAxisPainter = new Painter(this.canvas, yx, scalersLeft);
        yAxisPainter.paint();

        var yPercentOptions = this.minsChart.yScalerRight;
        yPercentOptions.color = function (val) {
            return (val == '0.00%' ? 'black' : (val.charAt(0) == '-' ? 'green' : 'red'));
        };
        var yxPercent = new yAxis(yPercentOptions);
        var yxPercentPainter = new Painter(this.canvas, yxPercent, scalersRight);
        yxPercentPainter.paint();


        //均线
        if (this.needPaintAvgPriceLine) {
            //生成移动均线数据
            var items = [];
//                var totalVolume = 0;
//                var totalAmount = 0;
            data.mins.forEach(function (item) {
//                    totalVolume += item.volume;
//                    totalAmount += item.amount;
                items.push(item.avg_px);
            });
            lineOptions.lineColor = minsChartOptions.avgPriceLineColor;
            lineOptions.fillColor = minsChartOptions.avgPriceLineFillColor;
            lineOptions.middleValue=data.quote.preClose;
            lineOptions.maxDiff=maxDiff;
            lineOptions.getItemValue = function (item) {
                return item;
            };

            linePainterImp = new linePainter(lineOptions);
            var painterAvg = new Painter(this.canvas, linePainterImp, {items: items});
            painterAvg.paint();
        }

        var me = this;
        var chartRegion = me.minsChart.region;

        function getY(x) {
            var index = Math.ceil((x - me.minsChart.region.x) * me.maxDotsCount / me.minsChart.region.width);
            var val;
            var isNewQuote;
            if (index >= 0 && index < data.mins.length) {
                val = data.mins[index].price;
                isNewQuote = false;
            } else {
                val = data.quote.price;
                isNewQuote = true;
            }

            if (me.canvas.tip) me.canvas.tip.dataContext = {data: data, isNewQuote: isNewQuote, index: index};
            var diff = val - preClose;
            var middleY = (me.minsChart.region.y + me.minsChart.region.height / 2);
            return middleY - diff * me.minsChart.region.height / 2 / priceLinePainter.maxDiff;
        }

        //添加鼠标事件
        // addCrossLinesAndTipEvents(this.canvas, {
        //     getCrossPoint: function (ev) {
        //         return {x: ev.offsetX, y: getY(ev.offsetX)};
        //     },
        //     triggerEventRanges: {
        //         x: chartRegion.x,
        //         y: chartRegion.y,
        //         width: chartRegion.width,
        //         height: me.volume.region.y + me.volume.region.height - chartRegion.y
        //     },
        //     tipOptions: {
        //         getTipHtml: function (ev) {
        //             return null;
        //         },
        //         position: {x: false, y: false}
        //     },
        //     crossLineOptions: {
        //         color: 'black'
        //     }
        // });
    },

    fillTopText: function (data, minIndex) {
        var quote = data.quote;
        var ctx = this.ctx;
        var topText = this.topText;
        var region = topText.region;
        ctx.clearRect(region.x, region.y, region.width, region.height);
        var price;
        var time;
        if (typeof minIndex == 'undefined') {
            price = quote.price;
            time = quote.time;
        } else {
            price = data.mins[minIndex].price;
            time = quote.time.toString().substr(0, 8) + getMinTime(minIndex);
        }

        ctx.fillStyle = topText.color;
        ctx.font = topText.font;
        if (topText.textBaseline) ctx.textBaseline = topText.textBaseline;
        var txt = '最新' + toMoney(price);
        var width = ctx.measureText(txt).width;
        ctx.fillText(txt, topText.region.x, topText.region.y);

        var isRise = price > quote.preClose;
        var isEqual = price == quote.preClose;
        var isFall = price < quote.preClose;
        var diff = toMoney(price - quote.preClose);
        var txtRiseFall = (isRise ? '↑' : (isFall ? '↓' : '')) + diff
            + ('(')
            + toMoney(diff * 100 / quote.preClose)
            + '%)';

        var x = topText.region.x + width;
        ctx.fillStyle = isRise ? this.riseColor : (isFall ? this.fallColor : this.normalColor);
        ctx.fillText(txtRiseFall, x, topText.region.y);

        var temp = new String(time);
        var txtTime = temp.charAt(8) + temp.charAt(9) + ':' + temp.charAt(10) + temp.charAt(11);
        ctx.fillStyle = topText.color;
        var timeWidth = ctx.measureText(txtTime).width;
        ctx.fillText(txtTime, topText.region.x + topText.region.width - timeWidth, topText.region.y);
    }
};

var MinsChart=function (options) {
    var width = options.options.width;
    var chart = new minsChart(options.canvas.chart, {
        fallColor: options.options.colors.fall, riseColor: options.options.colors.rise, normalColor: options.options.colors.normal, maxDotsCount: options.options.chart.points, needPaintAvgPriceLine: true,
        backgroundColor: 'white',
        topText: {
            font: '12px 宋体',
            color: 'black',
            region: {x: 1, y: 1, width: width, height: 14},
            textBaseline: 'top'
        },
        minsChart: {
            region: {x: 1, y: 10, width: width-10, height: options.options.size.chart},
            priceLineColor: options.options.chart.timeline.borderColor,
            priceLineFillColor:options.options.chart.timeline.fillColor,
            avgPriceLineColor: options.options.chart.maline.borderColor,
            middleLineColor: options.options.colors.gridLine,
            otherSplitLineColor: options.options.colors.gridLine,
            borderColor: options.options.colors.gridLine,
            horizontalLineCount: 3,
            verticalLineCount: 3,
            yScalerLeft: {
                font: options.options.font||'12px Arial',
                region: {x: .5, y: 10, width: 50.5, height: options.options.size.chart-3},
                align: 'left',
                fontHeight: 9,
                textBaseline: 'top'
            },
            yScalerRight: {
                font: options.options.font||'12px Arial',
                region: {x: width-2-40.5, y: 10, width: 40.5, height: options.options.size.chart-3},
                align: 'right',
                fontHeight: 9,
                textBaseline: 'top'
            }
        },
        xScaler: {
            font: options.options.font||'12px Arial', color: 'black',
            region: {x: 1, y: options.options.size.chart+25, width: width, height: 20},
            data: options.options.chart.xScaler
        },

        //bottomText: { font: '11px 宋体', color: 'black', region: { x: 5.5, y: 260, width: 400, height: 20} },
        volume: {
            region: {x: 1, y: options.options.size.chart+30, width: width-10, height: options.options.size.volume},
            bar: {color_fall: options.options.colors.fall,color_rise: options.options.colors.rise, width: 2},
            borderColor: options.options.colors.gridLine, splitLineColor: options.options.colors.gridLine,
            yScaler: {
                font: options.options.font||'12px Arial',
                region: {x: .5, y: options.options.size.chart+options.options.size.volume, width: 50.5, height: options.options.size.volume},
                color: 'rgba(0,0,0,0)',
                align: 'left',
                fontHeight: 12,
                textBaseline: 'top'
            }
        }
    });
    var data = {};
    data.quote = options.data.quote;
    data.mins=[];
    var mins = options.data.mins;

    mins.forEach(function (min,index) {
        var diff = -1;
        if(index>0){
            diff = mins[index].business_balance-mins[index-1].business_balance;
        }

        data.mins.push({
            price: min.last_px,
            volume: diff>-1?mins[index].business_balance-mins[index-1].business_balance:min.business_balance,
            amount: diff>-1?mins[index].business_amount-mins[index-1].business_amount:min.business_amount,
            avg_px:min.avg_px
        })
    })
    chart.paint(data);
};

module.exports = MinsChart;