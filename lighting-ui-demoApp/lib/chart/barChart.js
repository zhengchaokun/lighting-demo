module.exports = function (context, config) {
    var data = config.data;
    var scaleX = config.scaleX;

    if(data.length==0) return;

    //计算最大最小值
    var max = Math.max.apply(null,data.concat(config.data2||[]));
    var min = 0;

    //结算图表的绘制区域
    context.translate(10,10);
    var width = context.canvas.width-20;
    var height = context.canvas.height-40;

    //计算数据的展示比例
    var rateY = height/(max-min);
    var rateX = width/data.length;

    //画背景网格线和纵坐标
    context.beginPath();
    context.strokeStyle = config.config.gridlineColor;
    var p = height/config.config.splitY;
    for(var i=0;i<config.config.splitY;i++){
        context.moveTo(0,p*i);
        context.fillText((max-(max-min)/3*i).toFixed(), 0, p*i);
        context.lineTo(width,p*i);
    }
    context.fillText(min.toFixed(),0,height);

    //画x轴上的坐标点
    for(var i=0;i<config.config.splitX;i++){
        var index = scaleX.length/config.config.splitX*i;
        index = index.toFixed();
        context.fillText(scaleX[index]||"",i*(width/config.config.splitX),height+10);
    }
    context.stroke();
    context.closePath();

    //画x轴与y轴
    context.beginPath();
    context.strokeStyle = "#aaaaaa";
    context.moveTo(0,0);
    context.lineTo(0,height);
    context.lineTo(width,height);
    context.stroke();
    context.closePath();

    //画图
    context.beginPath();
    data.forEach(function (dig,index,arr) {
        var y = -(dig-min)*rateY;
        var x = index*rateX;

        context.fillStyle = config.config.barColor[0];
        context.rect(x,height,20,y);
    });
    context.fill();
    context.closePath();

    context.beginPath();
    (config.data2||[]).forEach(function (dig,index,arr) {
        var y = -(dig-min)*rateY;
        var x = index*rateX;

        context.fillStyle = config.config.barColor[1];
        context.rect(x+5,height,10,y);
    });
    context.fill();
    context.closePath();
};