
function volumePainter(options) {
    this.options = options;

    this.barWidth = options.bar.width;
    this.spaceWidth = options.region.width / options.maxDotsCount - options.bar.width;
    if (this.spaceWidth < 1) this.spaceWidth = 0;
    if (this.barWidth * options.maxDotsCount > options.region.width) this.barWidth = options.region.width / options.maxDotsCount;
}

volumePainter.prototype = {
    initialize: function (absPainter) {
        absPainter.options = this.options;
        absPainter.barWidth = this.barWidth;
        absPainter.spaceWidth = this.spaceWidth;
    },
    getDataLength: function () { return this.options.getDataLength.call(this); },
    getX: function (i) {
        return this.options.region.x + i * (this.barWidth + this.spaceWidth);
    },
    start: function () {
        var ctx = this.ctx;
        var options = this.options;
        var region = options.region;
        ctx.save();
        var maxVolume = 0;
        this.data.items.forEach(function (item) {
            maxVolume = Math.max(maxVolume, item.volume);
        });

        this.maxVolume = maxVolume;

    },
    end: function () {
        this.ctx.restore();
    },
    getY: function (i) {
        var diff = this.options.region.y + (this.maxVolume - this.data.items[i].volume) * this.options.region.height / this.maxVolume;
        return diff;
    },
    paintItem: function (i, x, y) {
        var data = this.data.items;
        var ctx = this.ctx;
        var options = this.options;

        if(i>0&&data[i].price<data[i-1].price){
            ctx.fillStyle = options.bar.color_fall;
        }else{
            ctx.fillStyle = options.bar.color_rise;
        }

        ctx.beginPath();
        ctx.rect(x, y, this.barWidth, this.options.region.y + this.options.region.height - y);
        ctx.fill();
    }
};

module.exports = volumePainter;