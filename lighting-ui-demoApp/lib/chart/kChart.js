var Painter = require("./painter"),
    yAxis = require("./yAxis"),
    xAxis = require("./xAxis"),
    Utils = require("./utils");
var riseColor,
    fallColor,
    normalColor;

function kLine(options) {
    this.options = options;
    this.dataRanges = null;
}

kLine.prototype = {
    initialize: function (painter) {
        painter.klOptions = this.options;
        painter.implement = this;
    },
    start: function () {
        //timer.start('start');
        // var canvas = this.canvas;
        var ctx = this.ctx;
        this.painting = true;
        var options = this.klOptions;

        //现场环境清理
        var clearPart = {width: this.width, height: options.priceLine.region.y - 3};
        ctx.clearRect(0, 0, clearPart.width, clearPart.height);
        ctx.save();

        riseColor = options.riseColor;
        fallColor = options.fallColor;
        normalColor = options.normalColor;
        if (options.backgroundColor && !this.drawnBackground) {
            ctx.beginPath();
            ctx.fillStyle = options.backgroundColor;
            ctx.rect(0, 0, clearPart.width, clearPart.height);
            ctx.fill();
            //ctx.closePath();
            this.drawnBackground = true;
        }
        ctx.translate(options.region.x, options.region.y);
        ctx.strokeStyle = options.borderColor;
        ctx.beginPath();
        ctx.rect(0, 0, options.region.width, options.region.height);
        ctx.stroke();
        //画水平底纹线
        var spaceHeight = options.region.height / (options.horizontalLineCount + 1);
        for (var i = 1; i <= options.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            this.drawHLine(options.splitLineColor, 0, y, options.region.width, 1, options.lineStyle);
        }
        //画垂直底纹线
        var spaceWidth = options.region.width / (options.verticalLineCount + 1);
        for (var i = 1; i <= options.verticalLineCount; i++) {
            var w = spaceWidth * i;
            if (w * 10 % 10 == 0) w += .5;
            this.drawVLine(options.splitLineColor, w, 0, options.region.height, 1, options.lineStyle);
        }
        //timer.stop();
    },
    end: function () {
        this.ctx.restore();
    },
    paintItems: function () {
        var options = this.klOptions;
        var region = options.region;
        var maxDataLength = this.data.ks.length;
        var needCalcSpaceAndBarWidth = true;

        if (this.dataRanges == null) {
            //计算dataRanges
            var dataCount = Math.ceil(region.width / (options.spaceWidth + options.barWidth)) - 1;
            if (dataCount > maxDataLength) dataCount = maxDataLength;

            this.dataRanges = {
                start: 100 * (this.data.ks.length - dataCount) / this.data.ks.length,
                to: 100
            };

            needCalcSpaceAndBarWidth = false;
        }
        var dataRanges = this.dataRanges;
        var startIndex = Math.ceil(dataRanges.start / 100 * maxDataLength);
        var toIndex = Math.ceil(dataRanges.to / 100 * maxDataLength) + 1;
        if (toIndex == maxDataLength) toIndex = maxDataLength - 1;

        this.startIndex = startIndex;
        this.toIndex = toIndex;

        var itemsCount = toIndex - startIndex + 1;//一共需要多少根蜡烛图

        if (needCalcSpaceAndBarWidth) {
            //重新计算spaceWidth和barWidth属性
            function isOptionsOK() {
                return (options.spaceWidth + options.barWidth) * itemsCount <= region.width;
            }

            var spaceWidth, barWidth;
            if (isOptionsOK()) {
                //柱足够细了
                spaceWidth = 1;
                barWidth = (region.width - spaceWidth * itemsCount) / itemsCount;
                if (barWidth > 4) {
                    spaceWidth = 2;
                    barWidth = ((region.width - spaceWidth * itemsCount) / itemsCount);
                }
            } else {
                spaceWidth = 1;
                barWidth = (region.width - spaceWidth * itemsCount) / itemsCount;
                if (barWidth <= 2) {
                    spaceWidth = 0;
                    barWidth = (region.width - spaceWidth * itemsCount) / itemsCount;
                } else if (barWidth > 4) {
                    spaceWidth = 2;
                    barWidth = ((region.width - spaceWidth * itemsCount) / itemsCount);
                }
            }

            options.barWidth = barWidth;
            options.spaceWidth = spaceWidth;
        }

        var filteredData = [];
        for (var i = startIndex; i <= toIndex && i < maxDataLength; i++) {
            filteredData.push(this.data.ks[i]);
        }
        var high=0, low=Infinity;
        filteredData.forEach(function (val) {
            high = Math.max(val.high, high);
            low = Math.min(low, val.low);
        });

        this.high = high*1.01;
        this.low = low*0.99;
        var ctx = this.ctx;


        //画移动平均线
        var me = this;
        this.implement.paintMAs.call(this, filteredData, getY);
        function getY(price) {
            return (me.high - price) * region.height / (me.high - me.low);
        }

        //画柱子
        function getCandleLineX(i) {
            var result = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5;
            if (result * 10 % 10 == 0) result += .5;
            return result;
        }

        var currentX = 0;
        var needCandleRect = options.barWidth > 1.5;
        var drawCandle = function (ki, i, a) {
            var isRise = ki.close >= ki.open;
            var color = isRise ? riseColor : fallColor;

            var lineX = getCandleLineX(i);
            if (currentX == 0) currentX = lineX;
            else {
                if (lineX - currentX < 1) return;
            }
            currentX = lineX;
            var topY = getY(ki.high);
            var bottomY = getY(ki.low);
            if (needCandleRect) {
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                var candleY, candleHeight;
                if (isRise) {
                    candleY = getY(ki.close);
                    candleHeight = getY(ki.open) - candleY;
                } else {
                    candleY = getY(ki.open);
                    candleHeight = getY(ki.close) - candleY;
                }
                if(candleHeight==0) candleHeight=0.25;

                if(isRise){
                    //画线
                    ctx.beginPath();
                    ctx.moveTo(lineX, topY);
                    ctx.lineTo(lineX, candleY);
                    ctx.moveTo(lineX, candleY+candleHeight);
                    ctx.lineTo(lineX, bottomY);

                    var candleX = lineX - options.barWidth / 2;
                    ctx.rect(candleX, candleY, options.barWidth, candleHeight);

                    ctx.stroke();
                }else{
                    //画线
                    ctx.beginPath();
                    ctx.moveTo(lineX, topY);
                    ctx.lineTo(lineX, bottomY);
                    ctx.stroke();

                    var candleX = lineX - options.barWidth / 2;
                    ctx.beginPath();
                    ctx.fillRect(candleX, candleY, options.barWidth, candleHeight);
                }
            } else {
                ctx.strokeStyle = color;
                //画线
                ctx.beginPath();
                ctx.moveTo(lineX, topY);
                ctx.lineTo(lineX, bottomY);
                ctx.stroke();
            }

        };
        //画蜡烛
        filteredData.forEach(drawCandle);
        this.filteredData = filteredData;
        //timer.stop();
        //timer.start('paintItems:纵轴');
        var yAxisOptions = options.yAxis;
        yAxisOptions.region = yAxisOptions.region || {
                x: 1,
                y: 0,
                height: region.height-3,
                width: region.x - 3
            };

        //画y轴
        var yAxisImp = new yAxis(yAxisOptions);
        var yPainter = new Painter(
            this.ctx,
            yAxisImp,
            Utils.calcAxisValues(high, low, (1 + 2))
        );
        yPainter.paint();


        //画X轴
        var xAxisOptions = options.xAxis;
        xAxisOptions.region = {x: 0, y: region.height + 2, width: region.width, height: 20};
        var xAxisImp = new xAxis(xAxisOptions);
        var xScalers = [];
        var stepLength = filteredData.length / (options.xAxis.scalerCount - 1);
        if (stepLength < 1) {
            options.xAxis.scalerCount = filteredData.length;
            stepLength = 1;
        }
        xScalers.push(Utils.convertDate(filteredData[0].quoteTime, false).substr(2));
        for (var i = 1; i < options.xAxis.scalerCount; i++) {
            var index = Math.ceil(i * stepLength);
            if (index >= filteredData.length) index = filteredData.length - 1;
            var quoteTime = Utils.convertDate(filteredData[index].quoteTime, false);
            quoteTime = quoteTime.substr(2);
            xScalers.push(quoteTime);
        }
        var xPainter = new Painter(this.ctx, xAxisImp, xScalers);
        xPainter.paint();

        //画量
        this.implement.paintVolume.call(this, filteredData);

        //画价格线
        //this.implement.paintPriceLine.call(this);
    },
    paintPriceLine: function () {
        if (this.hasPaintPriceLine) return;
        this.hasPaintPriceLine = true;
        var ctx = this.ctx;
        var options = this.klOptions.priceLine;
        var region = options.region;
        ctx.save();
        ctx.translate(region.x, region.y);

        ctx.clearRect(0 - region.x, 0, this.canvas.width, region.height);
        //画水平底纹线
        var spaceHeight = region.height / (options.horizontalLineCount + 1);
        for (var i = 1; i <= options.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            this.drawHLine(options.splitLineColor, 0, y, region.width, 1, options.lineStyle);
        }
        //画垂直底纹线
        var spaceWidth = region.width / (options.verticalLineCount + 1);
        for (var i = 1; i <= options.verticalLineCount; i++) {
            var w = spaceWidth * i;
            if (w * 10 % 10 == 0) w += .5;
            this.drawVLine(options.splitLineColor, w, 0, region.height, 1, options.lineStyle);
        }
        var ks = this.data.ks;

        var ksLength = ks.length;
        var priceRange;
        ks.each(function (val, arr, i) {
            if (i == 0) {
                priceRange = {high: val.high, low: val.low};
            }
            else {
                priceRange.high = Math.max(priceRange.high, val.close);
                priceRange.low = Math.min(priceRange.low, val.close);
            }
        });
        if (priceRange.low > 1) priceRange.low -= 1;
        function getRangeX(i) {
            return i * region.width / ksLength;
        }

        function getRangeY(val) {
            return (priceRange.high - val) * region.height / (priceRange.high - priceRange.low);
        }

        var currentX = 0;
        ks.each(function (val, arr, i) {
            var x = getRangeX(i);
            if (currentX == 0) currentX = x;
            else {
                if (x - currentX < 1) return;
            }
            currentX = x;
            var y = getRangeY(val.close);
            if (i == 0) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStype = options.borderColor;
        ctx.stroke();
        ctx.lineTo(region.width, region.height);
        ctx.lineTo(0, region.height);
        ctx.closePath();
        ctx.fillStyle = options.fillColor;
        ctx.globalAlpha = options.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        var yAxisOptions = options.yAxis;
        yAxisOptions.region = yAxisOptions.region || {
                x: 0 - region.x,
                y: 0 - 3,
                height: region.height,
                width: region.x - 3
            };
        //画y轴
        var yAxisImp = new yAxis(yAxisOptions);
        var yPainter = new Painter(
            this.canvas,
            yAxisImp,
            calcAxisValues(priceRange.high, priceRange.low, (options.horizontalLineCount + 2))
        );

        yPainter.paint();
        ctx.restore();
    },
    paintMAs: function (filteredData, funcGetY) {
        var ctx = this.ctx;
        var options = this.klOptions;
        var MAs = options.MAs;
        var me = this;
        MAs.forEach(function (val) {
            var MA = Utils.calcMAPrices(me.data.ks, me.startIndex, filteredData.length, val.daysCount);
            val.values = MA;
            MA.forEach(function (val, arr, i) {
                if (val) {
                    me.high = Math.max(me.high, val);
                    me.low = Math.min(me.low, val);
                }
            });
        });

        MAs.forEach(function (val) {
            var MA = val.values;
            ctx.strokeStyle = val.color;
            ctx.beginPath();
            var currentX = 0;
            MA.forEach(function (val, i, arr) {
                var x = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5;

                if (!val) return;
                var y = funcGetY(val);
                if (y && i == 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        });
    },
    paintVolume: function (filteredData) {
        var ctx = this.ctx;
        var options = this.klOptions;
        //画量线
        var volumeOptions = options.volume;
        var volumeRegion = volumeOptions.region;
        ctx.restore();
        ctx.save();
        ctx.translate(volumeRegion.x, volumeRegion.y);
        ctx.globalAlpha = 1;
        //画水平底纹线
        var spaceHeight = volumeRegion.height / (volumeOptions.horizontalLineCount + 1);
        for (var i = 1; i <= volumeOptions.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            this.drawHLine(options.splitLineColor, 0, y, options.region.width, 1, options.lineStyle);
        }
        //画垂直底纹线
        var spaceWidth = options.region.width / (options.verticalLineCount + 1);
        for (var i = 1; i <= options.verticalLineCount; i++) {
            var w = spaceWidth * i;
            if (w * 10 % 10 == 0) w += .5;
            this.drawVLine(options.splitLineColor, w, 0, volumeRegion.height, 1, options.lineStyle);
        }

        ctx.strokeStyle = options.borderColor;
        ctx.beginPath();
        ctx.rect(0, 0, volumeRegion.width, volumeRegion.height);
        ctx.stroke();
        //drawLines(ctx, [{ direction: 'H', position: .50, color: 'lightgray'}]);
        var maxVolume = 0;

        filteredData.forEach(function (val) {
            maxVolume = Math.max(maxVolume, val.volume);
        });
        maxVolume *= 1.05;
        function getVolumeY(v) {
            return volumeRegion.height - volumeRegion.height / maxVolume * v;
        }

        function getVolumeX(i) {
            return i * (options.spaceWidth + options.barWidth) + (options.spaceWidth) * .5;
        }

        ctx.globalAlpha = 1;
        filteredData.forEach(function (val, i, arr) {
            var x = getVolumeX(i);
            var y = getVolumeY(val.volume);

            ctx.beginPath();
            if(val.close >= val.open){
                ctx.rect(x, y, options.barWidth, volumeRegion.height / maxVolume * val.volume);
                ctx.strokeStyle = riseColor;
                ctx.stroke();
            }else{
                ctx.rect(x, y, options.barWidth+0.5, volumeRegion.height / maxVolume * val.volume);
                ctx.fillStyle = fallColor;
                ctx.fill();
            }
        });

        //画y轴
        var volumeLevel;
        var volumeUnit;
        if (maxVolume < 10000 * 100) {
            volumeLevel = 10000;
            volumeUnit = '万';
        }
        else {
            volumeLevel = 10000 * 100;
            volumeUnit = '百万';
        }

        var volumeScalers = [];
        volumeScalers.push((maxVolume / volumeLevel).toFixed(2));
        volumeScalers.push((maxVolume / 2 / volumeLevel).toFixed(2));
        volumeScalers.push(volumeUnit);
        var volumeScalerOptions = volumeOptions.yAxis;
        volumeScalerOptions.region = volumeScalerOptions.region || {
                x: 2+volumeRegion.x,
                y: -3+volumeRegion.y,
                width: volumeRegion.x - 3,
                height: volumeRegion.height
            };
        var volumeScalerImp = new yAxis(volumeScalerOptions);
        var volumeScalerPainter = new Painter(this.ctx, volumeScalerImp, volumeScalers);
        volumeScalerPainter.paint();
        ctx.restore();
        ctx.save();
    },
    onOrentationChanged: function (e) {
        var orientation = window.orientation;

        function getWidth() {
            return screen.width - 40;
            /*((orientation == 90 || orientation == -90) ? screen.width : screen.height) - 40; */
        }

        if (typeof orientation != 'undefined') {
            setDebugMsg('orientation=' + orientation + ',getWidth=' + getWidth());
            //if(orientation == 90 || orientation == -90 || orientation == 0){
            var me = this;
            var width = getWidth();
            //var rate = width/me.canvas.width;
            me.canvas.width = width;
            var options = me.klOptions;
            var chartWidth = width - options.chartMargin.left - options.chartMargin.right;
            me.klOptions.volume.region.width =
                me.klOptions.priceLine.region.width =
                    me.klOptions.region.width = chartWidth;
            //方向改变了，要重画controller
            me.controller = null;
            me.hasPaintPriceLine = false;
            drawKL({start: me.dataRanges.start, to: me.dataRanges.to});
            // }
        }
    }
};

var painter;// = new Painter('canvasKL', kl, data);
function drawKL(ranges,options) {
    painter.dataRanges = ranges;
    painter.paint();
}

var KChart = function(options) {
    // var canvas = options.canvas.chart;
    // if(!options.canvas.chart.fitted) fitToContainer(canvas)
    // options.canvas.chart.fitted=true

    // var width = canvas.width/window.devicePixelRatio;

    var width=options.options.width;

    var kOptions = {
        // backgroundColor: 'rgba(0,0,0,0)',
        riseColor: options.options.colors.rise,
        fallColor: options.options.colors.fall,
        normalColor: options.options.colors.normal,
        //主图区域的边距
        chartMargin: {left: 5, top: 10, right: 5},
        region: {x: 5, y: 10, width: width - 10, height: options.options.size.chart},
        barWidth: 5, spaceWidth: 2, horizontalLineCount: 3, verticalLineCount: 3,
        lineStyle: 'solid', borderColor: options.options.colors.gridLine, splitLineColor: options.options.colors.gridLine, lineWidth: 1,
        MAs: [
            {color: options.options.chart.ma5line.borderColor, daysCount: 5},
            {color: options.options.chart.ma10line.borderColor, daysCount: 10},
            {color: options.options.chart.ma20line.borderColor, daysCount: 20},
            {color: options.options.chart.ma60line.borderColor, daysCount: 60 }
        ],
        yAxis: {
            font: options.options.font||'11px Arial', // region: { },
            color: 'black',
            align: 'left',
            fontHeight: 8,
            textBaseline: 'top'
        },
        xAxis: {
            font:  options.options.font||'11px Arial', // region: { },
            color: 'black',
            align: 'right',
            fontHeight: 8,
            textBaseline: 'top',
            scalerCount: 2
        },
        volume: {
            region: {x: 5, y: options.options.size.chart+20, height: options.options.size.volume, width: width - 10},
            horizontalLineCount: 1,
            yAxis: {
                font:  options.options.font||'11px Arial', // region: { },
                color: 'rgba(0,0,0,0)',
                align: 'left',
                fontHeight: 8,
                textBaseline: 'top'
            }
        },
        priceLine: {
            region: {x: 5, y: 380.5, height: 60, width: width - 10},
            verticalLineCount: 7,
            horizontalLineCount: 1,
            lineStyle: 'solid',
            borderColor: 'gray',
            splitLineColor: '#eeeeee',
            fillColor: 'lightgray',
            alpha: .5,
            yAxis: {
                font: '11px Arial', // region: { },
                color: 'black',
                align: 'right',
                fontHeight: 8,
                textBaseline: 'top'
            }
        },
        controller: {
            bar: {width: 20, height: 35, borderColor: 'black', fillColor: 'lightgray'},
            minBarDistance: 20
        }

    };

    var kdata = options.data;
    var result={
        ks:[]
    };
    var ks = [];
    kdata.forEach(function (data,index) {
        var item = {
            quoteTime: data.time,
            preClose: index>0?kdata[index-1].close_px:0,
            open: data.open_px,
            high: data.high_px,
            low: data.low_px,
            close: data.close_px,
            volume: data.business_balance,
            amount: data.business_amount
        };
        if (ks.length == 0) {
            result.low = item.low;
            result.high = item.high;
        } else {
            result.high = Math.max(result.high, item.high);
            result.low = Math.min(result.low, item.low);
        }
        ks.push(item);
    });
    result.ks = ks;

    var kl = new kLine(kOptions);
    painter = new Painter(options.canvas.chart, kl, result);
    painter.paint();
};

module.exports = KChart;