(function(){/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
 /*
  html5 loading �ؼ�
  ���ߣ����� ���ͣ�http://www.cnblogs.com/yukaizhao/
  ������ʹ�ô˿ؼ����뱣����������
  */
  function loading(canvas,options){
      this.canvas = (typeof canvas == 'String' ? document.getElementById(canvas) : canvas);
    if(options){
      this.radius = options.radius||10;
      this.circleLineWidth = options.circleLineWidth||4;
      this.circleColor = options.circleColor||'lightgray';
      this.dotColor = options.dotColor||'gray';
    }else{      
      this.radius = 10;
      this.circelLineWidth = 4;
      this.circleColor = 'lightgray';
      this.dotColor = 'gray';
    }
  }
  loading.prototype = {
    show:function (){
      var canvas = this.canvas;
      if(!canvas.getContext)return;
      if(canvas.__loading)return;
      canvas.__loading = this;
      var ctx = canvas.getContext('2d');
      var radius = this.radius;      
      var rotators = [{angle:0,radius:1.5},{angle:3/radius,radius:2},{angle:7/radius,radius:2.5},{angle:12/radius,radius:3}];      
      var me = this;
      canvas.loadingInterval = setInterval(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);         
        var lineWidth = me.circleLineWidth;
        var center = {x:canvas.width/2 - radius,y:canvas.height/2-radius};          
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = me.circleColor;
        ctx.arc(center.x,center.y,radius,0,Math.PI*2);
        ctx.closePath();
        ctx.stroke();
        for(var i=0;i<rotators.length;i++){        
          var rotatorAngle = rotators[i].currentAngle||rotators[i].angle;            
          //��ԲȦ���滭СԲ
          var rotatorCenter = {x:center.x-(radius)*Math.cos(rotatorAngle) ,y:center.y-(radius)*Math.sin(rotatorAngle)};            
          var rotatorRadius = rotators[i].radius;
          ctx.beginPath();
          ctx.fillStyle = me.dotColor;
          ctx.arc(rotatorCenter.x,rotatorCenter.y,rotatorRadius,0,Math.PI*2);
          ctx.closePath();
          ctx.fill();
          rotators[i].currentAngle = rotatorAngle+4/radius;
        }
      },50);
    },
    hide:function(){
      var canvas = this.canvas;
      canvas.__loading = false;
      if(canvas.loadingInterval){
        window.clearInterval(canvas.loadingInterval);
      }
      var ctx = canvas.getContext('2d');
      if(ctx)ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  };
/*
html5行情图库
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
商业或公开发布请联系：yukaizhao@gmail.com
*/
(function () {
    /*if (!Event.hasOwnProperty("fromElement") && Event.prototype.__defineGetter__) {
    Event.prototype.__defineGetter__("fromElement", function () {
    var node;
    if (this.type == "mouseover")
    node = this.relatedTarget;
    else if (this.type == "mouseout")
    node = this.target;
    if (!node) return;
    while (node.nodeType != 1) node = node.parentNode;
    return node;
    });
    Event.prototype.__defineGetter__("toElement", function () {
    var node;
    if (this.type == "mouseout")
    node = this.relatedTarget;
    else if (this.type == "mouseover")
    node = this.target;
    if (!node) return;
    while (node.nodeType != 1) node = node.parentNode;
    return node;
    });
    }*/

    function windowHelper() {
        this.tapTimeLimit = 500;
    }

    Array.prototype.each = function (func, startIndex, endIndex) {
        startIndex = startIndex || 0;
        endIndex = endIndex || this.length - 1;
        for (var i = startIndex; i <= endIndex; i++) {
            func(this[i], this, i);
            if (this.breakLoop) {
                this.breakLoop = false;
                break;
            }
        }
    };

    windowHelper.prototype = {
        preventDefaultEvent: function (ev) {
            if (ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;
        },
        isTouchDevice: function () {
            return !!('ontouchstart' in window);
        },
        toMoney: function (val) {
            /*var pos = 2;
            return Math.round(val * Math.pow(10, pos)) / Math.pow(10, pos);*/
            return val.toFixed(2);
        },
        bigNumberToText: function (val) {
            var result;
            var yi = val / 100000000;
            if (yi > 1) {
                result = yi.toFixed(2) + '亿';
            } else {
                var wan = val / 10000;
                if (wan > 1)
                    result = wan.toFixed() + '万';
                else
                    result = val;
            }
            return result;
        },
        getOffset: function (e) {
            if (!isNaN(e.offsetX) && !isNaN(e.offsetY)) return e;
            var target = e.target;
            if (target.offsetLeft == undefined) {
                target = target.parentNode;
            }
            var pageCoord = getPageCoord(target);
            var eventCoord =
            {     //计算鼠标位置（触发元素与窗口的距离）
                x: window.pageXOffset + e.clientX,
                y: window.pageYOffset + e.clientY
            };
            var offset =
            {
                offsetX: eventCoord.x - pageCoord.x,
                offsetY: eventCoord.y - pageCoord.y
            };
            //e.offsetX = offset.offsetX;
            //e.offsetY = offset.offsetY;
            return offset;
        },
        getPageCoord: function (element)    //计算从触发到root间所有元素的offsetLeft值之和。
        {
            var coord = { x: 0, y: 0 };
            while (element) {
                coord.x += element.offsetLeft;
                coord.y += element.offsetTop;
                element = element.offsetParent;
            }
            return coord;
        },
        addLoadEvent: function (f) {
            var old = window.onload;
            if (typeof old != 'function') window.onload = f;
            else { window.onload = function () { old(); f(); }; }
        },
        addEvent: function (elm, evType, fn, useCapture) {
            if (elm.addEventListener) {
                elm.addEventListener(evType, fn, useCapture);
                return true;
            }
            else if (elm.attachEvent) {
                var r = elm.attachEvent('on' + evType, fn);
                return r;
            }
            else {
                elm['on' + evType] = fn;
            }
        },
        getEventTarget: function (e) {
            return e.srcElement || e.target || e.relatedTarget;
        },
        $id: function (id) { return document.getElementById(id); }
    };

    window.extendObject = function (src, dest) {
        for (var f in src) {
            dest[f] = src[f];
        }
    };
    window.extendWindow = function (src) {
        extendObject(src, window);
    };
    var wh = new windowHelper();
    extendWindow(wh);
    window.getQueryParam = function (paramName, isTop) {
        var oRegex = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i');
        var oMatch = oRegex.exec(isTop ? window.top.location.search : location.search);
        if (oMatch && oMatch.length > 1)
            return decodeURIComponent(oMatch[1]);
        else
            return '';
    };
    window.debug = getQueryParam('debug');
    window.setDebugMsg = function (msg) {
        if (window.debug) {
            try {
                var oid = 'debug';
                var o = $id(oid);
                if (!o) {
                    o = document.createElement('DIV');
                    o.id = oid;
                    document.body.appendChild(o);
                }
                o.innerHTML = (window.debug == 2 ? (msg + '<br/>' + o.innerHTML) : msg);
            } catch (err) {
                alert(msg + ';error:' + err);
            }
        }
    };
    window.fitToContainer=function (canvas){
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.style.width =canvas.offsetWidth+"px";
        canvas.style.height=canvas.offsetHeight+"px";
        canvas.width  = canvas.offsetWidth*window.devicePixelRatio;
        canvas.height = canvas.offsetHeight*window.devicePixelRatio;
        rescale(canvas.getContext("2d"))
    }

    function rescale(canvas_prototype) {
        var pixelRatio = (function(context) {
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;

                return (window.devicePixelRatio || 1) / backingStore;
            })(canvas_prototype),

            forEach = function(obj, func) {
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        func(obj[p], p);
                    }
                }
            },

            ratioArgs = {
                'fillRect': 'all',
                'clearRect': 'all',
                'strokeRect': 'all',
                'moveTo': 'all',
                'lineTo': 'all',
                'arc': [0,1,2],
                'arcTo': 'all',
                'bezierCurveTo': 'all',
                'isPointinPath': 'all',
                'isPointinStroke': 'all',
                'quadraticCurveTo': 'all',
                'rect': 'all',
                'translate': 'all',
                'createRadialGradient': 'all',
                'createLinearGradient': 'all'
            };

        if (pixelRatio === 1) return;

        forEach(ratioArgs, function(value, key) {
            canvas_prototype[key] = (function(_super) {
                return function() {
                    var i, len,
                        args = Array.prototype.slice.call(arguments);

                    if (value === 'all') {
                        args = args.map(function(a) {
                            return a * pixelRatio;
                        });
                    }
                    else if (Array.isArray(value)) {
                        for (i = 0, len = value.length; i < len; i++) {
                            args[value[i]] *= pixelRatio;
                        }
                    }

                    return _super.apply(this, args);
                };
            })(canvas_prototype[key]);
        });

        // Stroke lineWidth adjustment
        canvas_prototype.stroke = (function(_super) {
            return function() {
                this.lineWidth *= pixelRatio;
                _super.apply(this, arguments);
                this.lineWidth /= pixelRatio;
            };
        })(canvas_prototype.stroke);

        // Text
        //
        canvas_prototype.fillText = (function(_super) {
            return function() {
                var args = Array.prototype.slice.call(arguments);

                args[1] *= pixelRatio; // x
                args[2] *= pixelRatio; // y

                this.font = this.font.replace(
                    /(\d+)(px|em|rem|pt)/g,
                    function(w, m, u) {
                        return (m * pixelRatio) + u;
                    }
                );

                _super.apply(this, args);

                this.font = this.font.replace(
                    /(\d+)(px|em|rem|pt)/g,
                    function(w, m, u) {
                        return (m / pixelRatio) + u;
                    }
                );
            };
        })(canvas_prototype.fillText);

        canvas_prototype.strokeText = (function(_super) {
            return function() {
                var args = Array.prototype.slice.call(arguments);

                args[1] *= pixelRatio; // x
                args[2] *= pixelRatio; // y

                this.font = this.font.replace(
                    /(\d+)(px|em|rem|pt)/g,
                    function(w, m, u) {
                        return (m * pixelRatio) + u;
                    }
                );

                _super.apply(this, args);

                this.font = this.font.replace(
                    /(\d+)(px|em|rem|pt)/g,
                    function(w, m, u) {
                        return (m / pixelRatio) + u;
                    }
                );
            };
        })(canvas_prototype.strokeText);
    }
})();
var dashSize = 2;

function Painter(canvas, paintImplement, data) {
    this.canvas = canvas;
    if (!this.canvas.getContext) return;
    this.ctx = this.canvas.getContext('2d');
    this.data = data;
    this.paintImplement = paintImplement;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
}
Painter.prototype = {
    paint: function () {
        var pctx = this.paintImplement;
        var data = this.data;
        var ctx = this.ctx;
        if (typeof pctx.initialize == 'function') pctx.initialize(this);
        if (pctx.start) pctx.start.call(this);

        if (typeof pctx.paintItems == 'function') {
            pctx.paintItems.call(this);
        }
        else {
            var dataLength = ((typeof pctx.getDataLength == 'function') ? pctx.getDataLength.call(this) : this.data.length);
            for (var i = 0; i < dataLength; i++) {
                var x = pctx.getX ? pctx.getX.call(this, i) : undefined;
                var y = pctx.getY ? pctx.getY.call(this, i) : undefined;
                pctx.paintItem.call(this, i, x, y);
            }
        }
        if (pctx.end) pctx.end.call(this);
    },
    drawHLine: function (color, x0, y0, w, lineWidth, lineStyle) {
        var ctx = this.ctx;
        ctx.strokeStyle = color;
        if (y0 * 10 % 10 == 0) y0 += .5;
        if (lineStyle && lineStyle == 'dashed') {
            var width = 0;
            do {
                this.drawHLine(color, width, y0, dashSize, 1, 'solid');
                width += dashSize * 2;
            } while (width < w);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x0 + w, y0);
            ctx.stroke();
        }
    },
    drawVLine: function (color, x0, y0, h, lineWidth, lineStyle) {
        var ctx = this.ctx;
        ctx.strokeStyle = color;
        if (x0 * 10 % 10 == 0) x0 += .5;
        if (lineStyle && lineStyle == 'dashed') {
            var height = 0;
            do {
                this.drawVLine(color, x0, height, dashSize, 1);
                height += dashSize * 2;
            } while (height < h);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x0, y0 + h);
            ctx.stroke();

        }
    },
    setData: function (data) {
        this.data = data;
    },
    setPainterImplement: function (implement) {
        this.paintImplement = implement;
    }
};

/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
var Ajax = {};
Ajax.request = function (method, url, callback, canvasId, showLoading) {
    showLoading = showLoading == undefined ? true : showLoading;
    //�������ݵ���Painter��ͼ
    var client = (window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : (window.XMLHttpRequest ? new XMLHttpRequest() : false));
    var canvas = document.getElementById(canvasId);
    if (canvas && showLoading) {
        canvas.loadingObj = new loading(canvas);
//setDebugMsg('canvas.loadingObj.show begin');
        canvas.loadingObj.show();
//setDebugMsg('canvas.loadingObj.show end');
    }
    client.onreadystatechange = function () {
//setDebugMsg('client.readyState = ' + client.readyState + ',client.status = ' + client.status);
        if (client.readyState == 4 && client.status == 200) {
            if (canvas && showLoading) canvas.loadingObj.hide();
            callback(client);
        }
//setDebugMsg('finish callback');
    };
//setDebugMsg('client.open begin');
    client.open(method || "POST", url, true);
//setDebugMsg('client.open end');
    if (client.overrideMimeType)client.overrideMimeType("text/xml");
//setDebugMsg('client.overrideMimeType');
    client.send();
//setDebugMsg('client.send()');
};

Ajax.get = function (url, callback, canvasId, showLoading) {
    Ajax.request('GET', url,callback, canvasId, showLoading);
};

Ajax.post = function (url, callback, canvasId, showLoading) {
    Ajax.request('POST', url,callback, canvasId, showLoading);
};
/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
/*��ָ����������ʾ������
* ���ļ������� util.js
*/
/*
var crossLinesOptions = {
    crossPoint: { x: getCandleLineX(index)+canvasPosition.x, y: ev.offsetY },
    verticalRange: { y1: 0, y2: canvasVolume.height + getPageCoord(canvasVolume).y - getPageCoord(canvas).y },
    horizontalRange: false,
    color: '#69c',
    canvas: canvas
};
              
var clsMgr = new crossLines(crossLinesOptions);
clsMgr.setMouseEvents(function(evl){
	evl = evl||event;
	getOffset(evl);				
					
	var kDataIndex = Math.ceil(evl.offsetX / (candleOptions.barWidth + candleOptions.spaceWidth)) - 1;
	if(kDataIndex >= 0 && kDataIndex < filteredData.length){
		canvas.crossLines.getHLine().style.top = evl.pageY + 'px';
		canvas.crossLines.getVLine().style.left = getCandleLineX(kDataIndex)+canvasPosition.x+'px';
		//showTip(canvas, kDataIndex, filteredData[kDataIndex]);
	}
},null);
              
//draw crossLine
clsMgr.drawCrossLines();
canvas.crossLines = clsMgr;
*/
function crossLines(options) {
    this.updateOptions(options);
}

crossLines.prototype = {
    updateOptions: function (options) {
        this.canvas = options.canvas;
        this.canvasId = this.canvas.id;
        this.horizontalDivId = this.canvasId + '_crossLines_H';
        this.verticalDivId = this.canvasId + '_crossLines_V';
        this.verticalRange = options.verticalRange || { y1: 0, y2: this.canvas.height };
        this.horizontalRange = options.horizontalRange || { x1: 0, x2: this.canvas.width };
        this.canvasPosition = getPageCoord(this.canvas);
        this.crossPoint = options.crossPoint;
        this.color = options.color || 'black';
    },
    removeCrossLines: function () {
        var canvas = this.canvas;
        var canvasId = canvas.id;
        var horizontalDivId = canvasId + '_crossLines_H';
        var verticalDivId = canvasId + '_crossLines_V';
        var lineX = $id(horizontalDivId);
        if (lineX) lineX.style.display = 'none';
        var lineY = $id(verticalDivId);
        if (lineY) lineY.style.display = 'none';
    },

    getHLine: function () {
        return $id(this.horizontalDivId);
    },
    getVLine: function () {
        return $id(this.verticalDivId);
    },
    setMouseEvents: function (evtForHLine, evtForVLine) {
        this.hLineMouseEvt = evtForHLine;
        this.vLineMouseEvt = evtForVLine;
    },
    updateCrossPoint: function (point) {
        this.crossPoint = point;
        this.drawCrossLines();
    },
    drawCrossLines: function () {
        var canvas = this.canvas;
        var canvasId = this.canvas.id;
        var horizontalDivId = canvasId + '_crossLines_H';
        var verticalDivId = canvasId + '_crossLines_V';
        var vertialRange = this.verticalRange || { y1: 0, y2: canvas.height };
        var horizontalRange = this.horizontalRange || { x1: 0, x2: canvas.width };
        var canvasPosition = this.canvasPosition;

        //�ж��Ƿ񳬳�ˮƽ�ʹ�ֱ��Χ������������Χ��Ҫ������
        if (this.crossPoint.x < horizontalRange.x1
            || this.crossPoint.x > horizontalRange.x2
            || this.crossPoint.y < vertialRange.y1
            || this.crossPoint.y > vertialRange.y2) {
            this.removeCrossLines();
            return;
        }


        var zIndex = (canvas.style.zIndex || 1) + 1;
        //��ˮƽ��
        var exists = false;
        var hLine;
        if ($id(horizontalDivId)) {
            exists = true;
            hLine = $id(horizontalDivId);
        }
        else {
            hLine = document.createElement('DIV');
            hLine.id = horizontalDivId;
        }
        hLine.style.display = 'block';
        hLine.style.position = 'absolute';
        hLine.style.width = Math.round(horizontalRange.x2 - horizontalRange.x1) + 'px';
        hLine.style.height = '1px';
        hLine.style.left = Math.round(canvasPosition.x + horizontalRange.x1) + 'px';
        hLine.style.top = Math.round(this.crossPoint.y + canvasPosition.y) + 'px';
        hLine.style.backgroundColor = this.color;
        hLine.style.zIndex = zIndex;
        if (!exists) {
            document.body.appendChild(hLine);
            if (typeof this.hLineMouseEvt == 'function') {
                addEvent(hLine, 'mouseover', this.hLineMouseEvt);
                addEvent(hLine, 'mousemove', this.hLineMouseEvt);
            }
        }


        //����ֱ��
        exists = false;
        var vLine;
        if ($id(verticalDivId)) {
            exists = true;
            vLine = $id(verticalDivId);
        }
        else {
            vLine = document.createElement('DIV');
            vLine.id = verticalDivId;
        }


        vLine.style.display = 'block';
        vLine.style.position = 'absolute';
        vLine.style.height = Math.round(vertialRange.y2 - vertialRange.y1) + 'px';
        vLine.style.width = '1px';
        vLine.style.left = Math.round(this.crossPoint.x + canvasPosition.x) + 'px';
        vLine.style.top = Math.round(vertialRange.y1 + canvasPosition.y) + 'px';
        vLine.style.backgroundColor = this.color;
        vLine.style.index = zIndex;
        if (!exists) {
            document.body.appendChild(vLine);
            if (typeof this.vLineMouseEvt == 'function') {
                addEvent(vLine, 'mouseover', this.vLineMouseEvt);
                addEvent(vLine, 'mousemove', this.vLineMouseEvt);
            }
        }
    }
};
/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
/*
options:{font:'11px ����',color:black,region:{x:5,y:130,width:180,height:20}}
*/
function xAxis(options){
  this.options = options;
}
xAxis.prototype = {
    initialize: function (painter) { painter.options = this.options; },
    start: function () {
        var ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = this.options.color;
        ctx.font = this.options.font;
        if (this.options.textBaseline) ctx.textBaseline = this.options.textBaseline;
        ctx.translate(this.options.region.x, this.options.region.y);
    },
    getY: function () { return 0; },
    getX: function (i) {
        if (i == 0) return 0;
        var w = this.ctx.measureText(this.data[i]).width;
        if (i == this.data.length - 1) return this.options.region.width - w;
        return (this.options.region.width * i / (this.data.length - 1)) - w / 2;
    },
    paintItem: function (i, x, y) {
        this.ctx.fillText(this.data[i], x, y);
    },
    end: function () {
        this.ctx.restore();
    }
};
/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
/*ʹ�ô��ļ���Ҫͬʱ����util.js*/
/*
    options:{
        position:{x:false,y:33}, //position�е�ֵ��������canvas�����Ͻǵ�
        size:{width:150,height:200},
        opacity:80,
        cssClass:'',
        offsetToPoint:30,
        relativePoint:{x:15,y30},
        canvas:canvas,
        canvasRange:{x:1,y:2,width:200,height:100},
        innerHTML;'some text'
    }
*/
function Tip(options) {
    extendObject(options, this);
}

Tip.prototype = {
    getElementId: function () { return this.canvas.id + '_tip'; },
    _getRightLimit: function () { return this.canvasRange.x + this.canvasRange.width; },
    _getLeftLimit: function () { return this.canvasRange.x; },
    _getTopLimit: function () { return this.canvasRange.y; },
    _getBottomLimit: function () { return this.canvasRange.y + this.canvasRange.height; },
    show: function (relativePoint, html) {
        if (relativePoint) this.relativePoint = relativePoint;
        if (html) this.innerHTML = html;
        var otip = $id(this.getElementId());
        var size = this.size;
        var offset = this.offsetToPoint;
        var position = this.position;
        var relativePoint = this.relativePoint;

        var canvasPosition = getPageCoord(this.canvas);
        var y = position.y || relativePoint.y;
        var x = position.x || relativePoint.x;
        var tipX = 0;
        var tipY = 0;
        if (position.x) tipX = position.x;
        else {
            if (otip) {
                var currentX = parseInt(otip.style.left) - canvasPosition.x;
                //��ʾ�����������ұ�
                if (currentX > x) {
                    if (offset + x + size.width > this._getRightLimit()) {
                        currentX = x - offset - size.width;
                    } else {
                        currentX = x + offset;
                    }
                } else {
                    if (x - offset - size.width > this._getLeftLimit()) {
                        currentX = x - offset - size.width;
                    } else {
                        currentX = x + offset;
                    }
                }
                tipX = currentX;
            } else {
                tipX = x + offset;
                if (tipX > this._getRightLimit()) {
                    tipX = x - offset - size.width;
                }
            }
        }

        //yֵ�̶�
        if (position.y) tipY = position.y;
        else {
            if (otip) {
                var currentY = parseInt(otip.style.top) - canvasPosition.y;
                //��ʾ�����������ұ�
                if (currentY > y) {
                    if (offset + y + size.height > this._getBottomLimit()) {
                        currentY = y - offset - size.height;
                    } else {
                        currentY = y + offset;
                    }
                } else {
                    if (y - offset - size.height > this._getTopLimit()) {
                        currentY = y - offset - size.height;
                    } else {
                        currentY = y + offset;
                    }
                }
                tipY = currentY;
            } else {
                tipY = y + offset;
                if (tipY > this._getBottomLimit()) {
                    tipY = y - offset - size.height;
                }
            }
        }


        if (!otip) {
            otip = document.createElement('DIV');
            otip.id = this.getElementId();
            var opacity = this.opacity || 100;
            otip.style.cssText = '-moz-opacity:.' + opacity + '; filter:alpha(opacity='
                + opacity + '); opacity:' + (opacity / 100) + ';line-height:18px;font-family:Arial,"����";font-size:9pt;padding:4px;';
            otip.style.position = 'absolute';
            otip.style.zIndex = 4 + (this.canvas.style.zIndex || 1);
            otip.style.backgroundColor = 'white';
            otip.style.border = '1px solid gray';
            otip.style.width = this.size.width + 'px';
            otip.style.height = this.size.height + 'px';
            if (this.cssClass) otip.className = this.cssClass;
            document.body.appendChild(otip);
        }

        tipX = canvasPosition.x + tipX;
        tipY = canvasPosition.y + tipY;
        otip.style.left = tipX + 'px';
        otip.style.top = tipY + 'px';
            otip.style.display = 'block';
        otip.innerHTML = this.innerHTML;
    },
    hide: function () {
        var o = $id(this.getElementId());
        if (o) o.style.display = 'none';
    },
    update: function (relativePoint, html) {
        this.relativePoint = relativePoint;
        this.innerHTML = html;
        this.show();
    }
};
/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
/*
options = {
  region:{x:10,y:10,width:300,height:200},
  maxDotsCount:241,
  getDataLength:function(){},
  getItemValue:function(item){return item.price;},
  middleValue: 10.4, //ͨ��������
  color:'blue'
}
*/
function linePainter(options){
  this.options = options;
}

linePainter.prototype = {
    initialize:function(absPainter){
      absPainter.options  = this.options;
    },
    getDataLength:function(){return this.options.getDataLength.call(this);},
    getX: function (i) {
        return (i + 1) * (this.options.region.width / this.options.maxDotsCount);
    },
    start: function () {
        var ctx = this.ctx;
        var options = this.options;
        var region = options.region;
        ctx.save();
        //ת������
        ctx.translate(region.x, region.y + region.height / 2);


        var maxDiff = 0;
        var me = this;
        
        this.data.items.each(function (item) {
            var diff = Math.abs(options.middleValue - options.getItemValue(item));
            maxDiff = Math.max(diff, maxDiff);
        });
        this.maxDiff = maxDiff;
        if(options.maxDiff){
            this.maxDiff = options.maxDiff;
        }
        ctx.beginPath();
        ctx.strokeStyle = options.lineColor;
    },
    end: function () {
        this.ctx.stroke();

        if(this.options.fillColor){
            var y = this.options.region.height / 2
            this.ctx.lineTo(linePainter.prototype.getX.call(this,linePainter.prototype.getDataLength.call(this)-1),y);
            this.ctx.lineTo(linePainter.prototype.getX.call(this,0),y)
            this.ctx.closePath();
            this.ctx.fillStyle = this.options.fillColor;
            this.ctx.fill()
        }

        this.ctx.restore();
    },
    getY: function (i) {
        var options = this.options; 
        var diff =options.getItemValue(this.data.items[i]) - options.middleValue;
        return 0 - diff * options.region.height / 2 / this.maxDiff; 
    },
    paintItem: function (i, x, y) {
        var ctx = this.ctx;

        if (i == 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
};
/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
/*options like:
{
    region:{x:x,y:y,width:width,height:height},
    bar:{width:1,color:'red'},
    maxDotsCount:241,
    getDataLength:function(){return this.data.items.length;}
}
*/
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
        //ת������
        var maxVolume = 0;
        this.data.items.each(function (item) {
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
/*
var ctx = canvas.getContext('2d');
var maxVolume = 0;

data.each(function (val, arr, i) {
    maxVolume = Math.max(maxVolume, val.volume);
});

function getY(v) { return canvas.height - canvas.height / maxVolume * v; }
function getX(i) { return i * (candleOptions.spaceWidth + candleOptions.barWidth) + (candleOptions.spaceWidth) * .5; }

data.each(function (val, arr, i) {
    var x = getX(i);
    var y = getY(val.volume);
    ctx.beginPath();
    ctx.rect(x, y, candleOptions.barWidth, canvas.height / maxVolume * val.volume);
    ctx.closePath();
    ctx.fillStyle = val.close > val.open ? riseColor : fallColor;
    ctx.fill();
});
*/
/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
/*
{ font: '11px Arial', region: { x: 0, y: 47, height: 320, width: 55}, color: 'black',align:'right' ,fontHeight:8,textBaseline:'top'}
*/
function yAxis(scalerOptions) {
  this.scalerOptions = scalerOptions;
}

yAxis.prototype = {
    initialize: function (painter) {
        painter.scalerOptions = this.scalerOptions;
    },
    start: function () {
        var ctx = this.ctx;
        ctx.save();
        if (typeof this.scalerOptions.color == 'string') ctx.fillStyle = this.scalerOptions.color;
        ctx.font = this.scalerOptions.font;
        ctx.translate(this.scalerOptions.region.x, this.scalerOptions.region.y);
        if (this.scalerOptions.textBaseline) ctx.textBaseline = this.scalerOptions.textBaseline;
    },
    end: function () { this.ctx.restore(); },
    getX: function (i) {
        if (this.scalerOptions.align == 'left') return 0;

        var w = this.ctx.measureText(this.data[i]).width;
        return this.scalerOptions.region.width - w;
    },
    getY: function (i) {
        if (i == 0) return 0;
        if (i == this.data.length-1) return this.scalerOptions.region.height - this.scalerOptions.fontHeight;
        return (this.scalerOptions.region.height * i / (this.data.length - 1) - this.scalerOptions.fontHeight / 2);
    },
    paintItem: function (i, x, y) {
        if (typeof this.scalerOptions.color == 'function')
            this.ctx.fillStyle = this.scalerOptions.color(this.data[i]);
        this.ctx.fillText(this.data[i], x, y);
    }
};

function calcAxisValues(high, low, count,formatFunc) {
    var diff = high - low;
    var space = diff / (count-1);
    var result = [];
    if (typeof formatFunc == 'undefined') formatFunc = toMoney;
    for (var i = 0; i < count; i++) {
        result.push(toMoney(high - i * space));
    }
    return result;
}


/*
html5����ͼ��
author:yukaizhao
blog:http://www.cnblogs.com/yukaizhao/
��ҵ�򹫿���������ϵ��yukaizhao@gmail.com
*/
  function controller(canvasId, options) {
      this.canvas = $id(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.region = options.region;
      this.bar = options.bar;
      this.value = options.value;
      //if (this.value) {console.log('this.value is{left:' + this.value.left + ',right:' + this.value.right + ')');}
      this.minBarDistance = options.minBarDistance || 5;
      this.onPositionChanged = options.onPositionChanged;
      this.prePaint = options.prePaint;
      this.isTouchDevice = isTouchDevice();
      this.touchFaultTolerance = options.touchFaultTolerance;
  }

  controller.prototype =
  {
      calcPositions: function () {
          var width = (this.region.width - this.bar.width);
          this.leftBarPosition = this.value.left * width / 100 + this.bar.width / 2;
          this.rightBarPosition = this.value.right * width / 100 + this.bar.width / 2;
      },
      drawControllerPart: function () {
          var canvas = this.canvas;
          var ctx = this.ctx;
          ctx.save();
          var region = this.region;
          var bar = this.bar;
          this.calcPositions();
          var leftBarPosition = this.leftBarPosition;
          var rightBarPosition = this.rightBarPosition;

          ctx.clearRect(region.x - 1, region.y - 1, region.width + 1, region.height + 1);

          if (typeof this.prePaint == 'function') {
              this.prePaint(ctx);
          }

          //setDebugMsg(leftBarPosition, 'Left');
          // ���߷�ʽ����������̫����
          ctx.lineWidth = 1;
          ctx.strokeStyle = region.borderColor;
          ctx.beginPath();
          ctx.moveTo(region.x, region.y);
          ctx.lineTo(region.x, region.y + region.height);
          ctx.lineTo(region.x + leftBarPosition, region.y + region.height);
          ctx.lineTo(region.x + leftBarPosition, region.y + region.height - (region.height - bar.height) / 2);
          ctx.stroke();

          ctx.strokeStyle = region.borderColor;
          ctx.beginPath();
          ctx.moveTo(region.x + leftBarPosition, region.y + region.height / 2 - bar.height / 2);
          ctx.lineTo(region.x + leftBarPosition, region.y);
          ctx.lineTo(region.x, region.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(region.x + leftBarPosition, region.y + region.height);
          ctx.lineTo(region.x + region.width, region.y + region.height);
          ctx.lineTo(region.x + region.width, region.y);
          ctx.lineTo(region.x + rightBarPosition, region.y);
          ctx.lineTo(region.x + rightBarPosition, region.y + region.height / 2 - bar.height / 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(region.x + rightBarPosition, region.y + region.height / 2 + bar.height / 2);
          ctx.lineTo(region.x + rightBarPosition, region.y + region.height);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = 'blue';
          ctx.globalAlpha = .5;
          ctx.rect(region.x + leftBarPosition, region.y, rightBarPosition - leftBarPosition, region.height);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;

          //������С���ο�
          ctx.strokeStyle = bar.borderColor;
          ctx.fillStyle = bar.fillColor;
          ctx.beginPath();
          var leftBarRegion = { x: region.x + leftBarPosition - bar.width / 2, y: region.y + region.height / 2 - bar.height / 2, width: bar.width, height: bar.height };
          ctx.rect(leftBarRegion.x, leftBarRegion.y, leftBarRegion.width, leftBarRegion.height);
          this.leftBarRegion = leftBarRegion;
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          //���Ҳ�С����
          ctx.beginPath();
          var rightBarRegion = { x: region.x + rightBarPosition - bar.width / 2, y: region.y + region.height / 2 - bar.height / 2, width: bar.width, height: bar.height };
          ctx.rect(rightBarRegion.x, rightBarRegion.y, rightBarRegion.width, rightBarRegion.height);
          this.rightBarRegion = rightBarRegion;
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.restore();
      },

      setLeftBarPosition: function (x) {
          if (x < this.bar.width / 2) this.leftBarPosition = this.bar.width / 2;
          else if (this.rightBarPosition - x - this.minBarDistance > this.bar.width)
              this.leftBarPosition = x;
          else
              this.leftBarPosition = this.rightBarPosition - this.bar.width - this.minBarDistance;
          this.value = this.getValue();
      },
      setRightBarPosition: function (x) {
          if (x < this.leftBarPosition + this.bar.width + this.minBarDistance) this.rightBarPosition = this.leftBarPosition + this.bar.width + this.minBarDistance;
          else if (x > this.region.width - this.bar.width / 2) this.rightBarPosition = this.region.width - this.bar.width / 2;
          else this.rightBarPosition = x;
          this.value = this.getValue();
      },
      addControllerEvents: function () {
          var me = this;
          if (me.isTouchDevice) {
              var canvas = me.canvas;
              addEvent(canvas, 'touchmove', function (e) {
                  e = e || event;
                  var src = e.srcElement || e.target || e.relatedTarget;

                  var touches = e.touches;
                  if (!touches || !touches.length) return;
                  var changed = false;
                  var canvasPosition = getPageCoord(this.canvas);
                  if (me.fingers && me.fingers.length) {
                      for (var i = 0; i < me.fingers.length; i++) {
                          var finger = me.fingers[i];

                          for (var j = 0; j < touches.length; j++) {
                              var touch = touches[j];
                              if (touch.identifier == finger.id) {
                                  var currentX = touch.pageX - canvasPosition.x;

                                  var moveLength = (currentX - finger.startX);
                                  if (moveLength != 0) {
                                      if (finger.type == 'left') {
                                          me.setLeftBarPosition(finger.leftPosition + moveLength);
                                      } else if (finger.type == 'right') {
                                          me.setRightBarPosition(finger.rightPosition + moveLength);
                                      } else {
                                          me.setLeftBarPosition(finger.leftPosition + moveLength);
                                          me.setRightBarPosition(finger.rightPosition + moveLength);
                                      }
                                      changed = true;
                                  }
                                  break;
                              }
                          }
                      }
                  }
                  if (changed) {
                      me.drawControllerPart();
                      //setDebugMsg('changed='+changed+',me.isValueChanged()=' + me.isValueChanged() + ',me.value=' + me.getValue());
                      if (typeof me.onPositionChanged == 'function' && me.isValueChanged()) {
                          me.value = me.getValue();

                          me.onPositionChanged(me.value);
                      }
                  }
                  disableBubbleAndPreventDefault(e);
              });
              addEvent(canvas, 'touchend', function (e) {
                  e = e||event;
                  //setDebugMsg('enter touchend me.fingers.length='+me.fingers.length);
                  if(me.fingers&&me.fingers.length){
                    if (typeof me.onPositionChanged == 'function' && me.isValueChanged()) {
                        me.value = me.getValue();
                        me.onPositionChanged(me.value);
                    }
                  }else{
                    var timeSpan = new Date().getTime() - me.touchstartTime.getTime();
                    //setDebugMsg('timeSpan='+timeSpan);
                    if(timeSpan < window.tapTimeLimit && me.startTouch){
                        var canvasPosition = getPageCoord(me.canvas);
                        var evt = me.startTouch;
                        var point = { offsetX: evt.pageX - canvasPosition.x, offsetY: evt.pageY - canvasPosition.y };                        
                        var centerX = (me.rightBarPosition+me.leftBarPosition)/2;
                        var moveLength = point.offsetX - centerX;
                        /*
                        setDebugMsg('evt.pageX='+evt.pageX+',centerX='+centerX+',point.offsetX='+point.offsetX+',moveLength='+moveLength);
                        setDebugMsg('me.leftBarPosition+moveLength=' +(me.leftBarPosition+moveLength) 
                          + ',me.rightBarPosition+moveLength=' +(me.rightBarPosition+moveLength));
                          */
                        me.setLeftBarPosition(me.leftBarPosition+moveLength);
                        me.setRightBarPosition(me.rightBarPosition+moveLength);
                        me.drawControllerPart();
                        //setDebugMsg('changed='+changed+',me.isValueChanged()=' + me.isValueChanged() + ',me.value=' + me.getValue());
                        if (typeof me.onPositionChanged == 'function' && me.isValueChanged()) {
                            me.value = me.getValue();

                            me.onPositionChanged(me.value);
                        }
                        me.startTouch = null;
                    }
                  }
                  me.fingers=null;
                  disableBubbleAndPreventDefault(e);
              });
              addEvent(canvas, 'touchstart', function (e) {
                  var touches = e.touches;
                  if (!touches || !touches.length) touches = e.changedTouches;
                  me.touchstartTime = new Date();
                  me.startTouch = touches[0];
                  var src = e.srcElement || e.target || e.relatedTarget;

                  var canvasPosition = getPageCoord(me.canvas);
                  function getTouchType(point) {
                      if (me.isOnLeftBar(point)) return 'left';
                      if (me.isOnRightBar(point)) return 'right';
                      if (me._isBetweenLeftAndRight(point)) return 'middle';
                      return false;
                  }

                  me.fingers = [];
                  if (touches.length) {
                      for (var i = 0; i < touches.length; i++) {
                          var touch = touches[i];
                          var point = { offsetX: touch.pageX - canvasPosition.x, offsetY: touch.pageY - canvasPosition.y };
                          var touchSection = getTouchType(point);
                          if (!touchSection) continue;

                          var finger = {
                              id: touch.identifier,
                              startX: touch.pageX - canvasPosition.x,
                              type: touchSection,
                              leftPosition: me.leftBarPosition,
                              rightPosition: me.rightBarPosition
                          };
                          me.fingers.push(finger);
                      }
                  }

                  disableBubbleAndPreventDefault(e);
                  return false;
              });
          } else {
              var moveHandle = function (ev) {
                  var isOnLeftBar = me.isOnLeftBar(ev);
                  var isOnRightBar = me.isOnRightBar(ev);
                  if (me._isBetweenLeftAndRight(ev)) {
                      document.body.style.cursor = 'pointer';
                  } else if (isOnLeftBar || isOnRightBar || me.triggerBar) {
                      document.body.style.cursor = 'col-resize';
                  }
                  else {
                      document.body.style.cursor = 'default';
                  }
                  if (me.triggerBar) {
                      me.triggerBar.targetX = ev.offsetX;
                      var moveLength = (me.triggerBar.targetX - me.triggerBar.x);
                      if (me.triggerBar.type == 'left') {
                          document.body.style.cursor = 'col-resize';
                          me.setLeftBarPosition(me.triggerBar.position + moveLength);
                      } else if (me.triggerBar.type == 'right') {
                          me.setRightBarPosition(me.triggerBar.position + moveLength);
                      } else {
                          me.setLeftBarPosition(me.triggerBar.leftPosition + moveLength);
                          me.setRightBarPosition(me.triggerBar.rightPosition + moveLength);
                      }

                      if (typeof me.onPositionChanged == 'function' && me.isValueChanged()) {
                          me.value = me.getValue();
                          me.onPositionChanged(me.value);
                      }
                      me.drawControllerPart();
                  }
              };
              var endMove = function (ev) {
                  if (me.triggerBar) {
                  }
                  me.triggerBar = null;
                  document.body.style.cursor = 'default';
                  if (typeof me.onPositionChanged == 'function' && me.isValueChanged()) {
                      me.value = me.getValue();
                      me.onPositionChanged(me.value);
                      //console.log('me.onPositionChanged(me.value) me.value is {left:' + me.value.left + ',right:' + me.value.right + '}');
                  }
              };

              var startHandle = function (ev) {
                  var isOnLeftBar = me.isOnLeftBar(ev);
                  var isOnRightBar = me.isOnRightBar(ev);
                  var isOnMiddle = me._isBetweenLeftAndRight(ev);
                  if (isOnMiddle) {
                      document.body.style.cursor = 'pointer';
                  } else if (isOnLeftBar || isOnRightBar) {
                      document.body.style.cursor = 'col-resize';
                  }
                  else {
                      document.body.style.cursor = 'default';
                  }

                  if (isOnLeftBar) me.triggerBar = { type: 'left', x: ev.offsetX, position: me.leftBarPosition };
                  else if (isOnRightBar) me.triggerBar = { type: 'right', x: ev.offsetX, position: me.rightBarPosition };
                  else if (isOnMiddle) me.triggerBar = { type: 'middle', x: ev.offsetX, leftPosition: me.leftBarPosition, rightPosition: me.rightBarPosition };
                  else me.triggerBar = null;

              };
              addEvent(me.canvas, 'mouseup', endMove);
              addEvent(me.canvas, 'mouseout', endMove);
              addEvent(me.canvas, 'mousemove', function (ev) {
                  ev = ev || event;
                  if (ev.preventDefault) ev.preventDefault();
                  else ev.returnValue = false;
                  var point = getOffset(ev);
                  moveHandle(point);
              });
              addEvent(me.canvas, 'mousedown', function (ev) {
                  ev = ev || event;
                  var point = getOffset(ev);
                  startHandle(point);
              });
          }
      },
      isValueChanged: function () {
          if (typeof this.preValue == 'undefined') {
              this.preValue = this.getValue();
              return false;
          }

          if (isTouchDevice() && this.latestChangeTime) {
              var now = new Date();
              if (now.getTime() - this.latestChangeTime.getTime() < 50) return false;
          }
          var preValue = this.preValue;
          var value = this.getValue();
          var changed = Math.abs(value.left - preValue.left) + Math.abs(value.right - preValue.right);
          this.preValue = value;
          var result = changed != 0;
          if (result) {
              this.latestChangeTime = new Date();
          }
          return changed != 0;
      },
      _isInRegion: function (ev, region) {
          return ev.offsetX > region.x && ev.offsetX < region.x + region.width
            && ev.offsetY > region.y && ev.offsetY < region.y + region.height;
      },

      _isBetweenLeftAndRight: function (ev) {
          var region = this.region;
          var middleRegion = {
              x: region.x + this.leftBarPosition + this.bar.width / 2,
              y: region.y,
              width: this.rightBarPosition - this.leftBarPosition - this.bar.width,
              height: this.region.height
          };
          return this._isInRegion(ev, middleRegion);
      },
      _getTouchFaultToleranceRegion: function (region) {
          var me = this;
          if (me.isTouchDevice) {
              region.x -= me.touchFaultTolerance / 2;
              region.width += me.touchFaultTolerance / 2;
          }
          return region;
      },
      isOnLeftBar: function (ev) {
          var region = this._getTouchFaultToleranceRegion(this.leftBarRegion);

          return this._isInRegion(ev, region);
      },
      isOnRightBar: function (ev) {
          var region = this._getTouchFaultToleranceRegion(this.rightBarRegion);
          return this._isInRegion(ev, region);
      },
      getValue: function () {
          var totalLength = this.region.width - this.bar.width;
          return {
              left: (this.leftBarPosition - this.bar.width / 2) * 100 / totalLength,
              right: (this.rightBarPosition - this.bar.width / 2) * 100 / totalLength
          };
      }
  };
;(function () {
    /*
     html5行情图库
     author:yukaizhao
     blog:http://www.cnblogs.com/yukaizhao/
     商业或公开发布请联系：yukaizhao@gmail.com
     */
    /*使用此文件需要引用util.js和crossLine以及tip*/
    /*
     canvas: 添加事件的画布
     options: {
     getCrossPoint:function (ev){return {x:x,y:y};},
     triggerEventRanges:{},
     tipOptions{
     tipHtml:function(ev){}
     },
     crossLineOptions:{
     color:'red'
     }
     }
     */
    function disableBubbleAndPreventDefault(e) {
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
    }

    function setTouchEventOffsetPosition(e, relativePoint) {
        e = e || event;
        if (e.touches && e.touches.length) {
            e = e.touches[0];
        } else if (e.changedTouches && e.changedTouches.length) {
            e = e.changedTouches[0];
        }

        var offsetX, offsetY;
        offsetX = e.pageX - relativePoint.x;
        offsetY = e.pageY - relativePoint.y;
        return { offsetX: offsetX, offsetY: offsetY };
    }

    function crossLinesAndTipMgr(canvas, options) {
        if (typeof Tip != 'function') {
            window.Tip = function () { };
            window.Tip.prototype = { show: function () { }, hide: function () { }, update: function () { } };
        }
        this.canvas = canvas;
        this.options = options;
    }

    crossLinesAndTipMgr.prototype._removeTipAndCrossLines = function () {
        //var canvas = this.canvas;
        var me = this;
        if (me.tip) me.tip.hide();
        if (me.clsMgr) me.clsMgr.removeCrossLines();
    };
    crossLinesAndTipMgr.prototype.updateOptions = function (options) {
        this.options = options;
    };
    crossLinesAndTipMgr.prototype._onMouseOrTouchMove = function (ev) {
        ev = ev || event;
        ev = getOffset(ev);
        var me = this;
        var options = me.options;
        var canvas = me.canvas;
        var canvasPosition = getPageCoord(canvas);
        var range = options.triggerEventRanges;

        //判断是否在范围之内，如果不在范围之内则移去十字线和tip
        if (ev.offsetX < range.x || ev.offsetX > range.x + range.width
            || ev.offsetY < range.y || ev.offsetY > range.y + range.height) {
            me._removeTipAndCrossLines();
            return;
        }

        var crossPoint = options.getCrossPoint(ev);
        //添加鼠标和触摸Event
        var crossLinesOptions = {
            crossPoint: crossPoint,
            verticalRange: { y1: range.y, y2: range.y + range.height },
            horizontalRange: { x1: range.x, x2: range.x + range.width },
            color: options.crossLineOptions.color,
            canvas: canvas
        };
        if (!me.clsMgr) {
            var clsMgr = new crossLines(crossLinesOptions);
            clsMgr.setMouseEvents(function (evHLine) {
                evHLine = evHLine || event;
                evHLine = getOffset(evHLine);
                var translatedEv = { offsetX: evHLine.offsetX + range.x, offsetY: parseInt(me.clsMgr.getHLine().style.top) - canvasPosition.y };
                var point = options.getCrossPoint(translatedEv);
                clsMgr.updateCrossPoint(point);
                if (me.tip) {
                    me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
                }
            }, function (evl) {
                evl = evl || event;
                evl = getOffset(evl);
                var translatedEv = { offsetX: parseInt(me.clsMgr.getVLine().style.left) - canvasPosition.x, offsetY: evl.offsetY + range.y };
                var point = options.getCrossPoint(translatedEv);
                clsMgr.updateCrossPoint(point);
                if (me.tip) {
                    me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
                }
            });

            me.clsMgr = clsMgr;
        } else {
            me.clsMgr.updateOptions(crossLinesOptions);
        }
        me.clsMgr.drawCrossLines();
        if (options.tipOptions) {
            var tipOp = options.tipOptions;
            if (!me.tip) {
                //tip设置
                var tip = new Tip({
                    position: { x: tipOp.position.x || false, y: tipOp.position.y || false }, //position中的值是相对于canvas的左上角的
                    size: tipOp.size,
                    opacity: tipOp.opacity || 80,
                    cssClass: tipOp.cssClass,
                    offsetToPoint: tipOp.offsetToPoint || 30,
                    relativePoint: { x: crossPoint.x, y: crossPoint.y },
                    canvas: canvas,
                    canvasRange: options.triggerEventRanges,
                    innerHTML: tipOp.getTipHtml(ev)
                });
                me.tip = tip;
            }

            me.tip.show(crossPoint, tipOp.getTipHtml(ev));
        }
    };

    crossLinesAndTipMgr.prototype._touchstart = function (e) {
        e = e || event;
        var src = e.srcElement || e.target || e.relatedTarget;
        this.touchstartTime = new Date();
    };
    crossLinesAndTipMgr.prototype._touchmove = function (e) {
        e = e || event;

        var canvas = this.canvas;

        var relativePoint = getPageCoord(canvas);
        var src = e.srcElement || e.target || e.relatedTarget;
        var fixedEvt = setTouchEventOffsetPosition(e, relativePoint);

        this._onMouseOrTouchMove(fixedEvt);
    };

    crossLinesAndTipMgr.prototype._touchend = function (e) {
        e = e || event;
        var src = e.srcElement || e.target || e.relatedTarget;
        var canvas = this.canvas;
        var fixedEvt = setTouchEventOffsetPosition(e, getPageCoord(canvas));
        this._removeTipAndCrossLines();

        if(this.touchstartTime){
            var time = new Date();
            var ts = time.getTime() - this.touchstartTime.getTime();
            if (ts < 200) {
                if (typeof this.options.onClick == 'function') this.options.onClick();
            }
        }
    };
    crossLinesAndTipMgr.prototype._mouseout = function (ev) {
        var e = ev || event;
        ev = getOffset(e);
        var me = this;
        var range = me.options.triggerEventRanges;
        //判断是否在范围之内，如果不在范围之内则移去十字线和tip
        if (ev.offsetX <= range.x || ev.offsetX >= range.x + range.width
            || ev.offsetY <= range.y || ev.offsetY >= range.y + range.height) {
            me._removeTipAndCrossLines();
            return;
        }

        var toEle = e.toElement || e.relatedTarget || e.target;

        if (toEle) {
            if (toEle == me.canvas) return;
            if (toEle == me.clsMgr.getHLine() || toEle == me.clsMgr.getVLine()) return;
            me._removeTipAndCrossLines();
        }
    };

    crossLinesAndTipMgr.prototype.addCrossLinesAndTipEvents = function () {
        var canvas = this.canvas;
        var options = this.options;
        var canvasPosition = getPageCoord(canvas);
        if (canvas.addCrossLinesAndTipEvents == true) return;
        canvas.addCrossLinesAndTipEvents = true;

        var touchable = isTouchDevice();
        var me = this;
        var controllerEvts = me.options.controllerEvents;
        if (touchable) {
            addEvent(canvas, 'touchstart', function (ev) {
                ev = ev || event;
                disableBubbleAndPreventDefault(ev);
                if (me.options.shouldDoControllerEvent(ev,'touchstart')) {
                    controllerEvts.onStart(ev);
                }
                else {
                    me._touchstart.call(me, ev);
                }
            });

            addEvent(canvas, 'touchmove', function (ev) {
                ev = ev || event;
                disableBubbleAndPreventDefault(ev);
                if (me.options.shouldDoControllerEvent(ev,'touchmove')) {
                    controllerEvts.onMove(ev);
                } else {
                    me._touchmove.call(me, ev);
                }
            });

            addEvent(canvas, 'touchend', function (ev) {
                ev = ev || event;
                disableBubbleAndPreventDefault(ev);
                if (me.options.shouldDoControllerEvent(ev,'touchend')) {
                    controllerEvts.onEnd(ev);
                }
                me._touchend.call(me, ev);
            });
        }
        else {
            //me.controllerMode = location.href.indexOf('controllerMode') > 0;

            addEvent(canvas, 'mouseout', function (ev) {
                if (me.options.shouldDoControllerEvent(ev)) {
                    controllerEvts.onEnd(ev);
                } else {
                    me._mouseout.call(me, ev);
                }
            });

            addEvent(canvas, 'mousemove', function (ev) {
                if (me.options.shouldDoControllerEvent(ev)) {
                    controllerEvts.onMove(ev);
                } else {
                    me._onMouseOrTouchMove.call(me, ev);
                }
            });

            addEvent(canvas, 'mousedown', function (ev) {
                if (me.options.shouldDoControllerEvent(ev)) {
                    controllerEvts.onStart(ev);
                }
            });

            addEvent(canvas, 'mouseup', function (ev) {
                //me.controllerMode = false;
                controllerEvts.onEnd(ev);
            });

            if (typeof options.onClick == 'function') {
                addEvent(canvas, 'click', options.onClick);
            }
        }
    };

    function addCrossLinesAndTipEvents(canvas, options) {
        if(!canvas.crossLineAndTipMgrInstance){
            canvas.crossLineAndTipMgrInstance = new crossLinesAndTipMgr(canvas, options);
            canvas.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
        }
    }
    //////////////////////////////////////////
    function convertDate(val, withWeek) {
        var year = Math.ceil(val / 10000) - 1;
        var day = val % 100;
        var month = (Math.ceil(val / 100) - 1) % 100;
        var d = new Date();
        d.setYear(year);
        d.setMonth(month - 1);
        d.setDate(day);
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        if (withWeek) {
            var weekNames = ['日', '一', '二', '三', '四', '五', '六'];
            return "20"+year + '/' + month + '/' + day + '(星期' + weekNames[d.getDay()] + ')';
        }
        else {
            return "20"+year + '/' + month + '/' + day;
        }
    }
    function calcMAPrices(ks, startIndex, count, daysCn) {
        var result = new Array();
        for (var i = startIndex; i < startIndex + count; i++) {
            var startCalcIndex = i - daysCn + 1;
            if (startCalcIndex < 0) {
                result.push(false);
                continue;
            }
            var sum = 0;
            for (var k = startCalcIndex; k <= i; k++) {
                sum += ks[k].close;
            }
            var val = sum / daysCn;
            result.push(val);
        }
        return result;
    }

    var timer = {
        start: function (step) {
            this.startTime = new Date();
            this.stepName = step;
        },
        stop: function () {
            var timeSpan = new Date().getTime() - this.startTime.getTime();
            setDebugMsg(this.stepName + '耗时' + timeSpan + 'ms');
        }
    };

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
            var canvas = this.canvas;
            var ctx = this.ctx;
            this.painting = true;
            var options = this.klOptions;
            var clearPart = {width: canvas.width, height: options.priceLine.region.y - 3};
            ctx.clearRect(0, 0, clearPart.width, clearPart.height);

            ctx.save();
            window.riseColor = options.riseColor;
            window.fallColor = options.fallColor;
            window.normalColor = options.normalColor;
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
            var me = this;
            var options = me.klOptions;
            var region = options.region;
            var volumeRegion = options.volume.region;

            function getIndex(x) {
                x -= region.x;
                var index = Math.ceil(x / (me.klOptions.spaceWidth + me.klOptions.barWidth)) - 1;
                var count = me.toIndex - me.startIndex + 1;
                if (index >= count) index = count - 1;
                return index;
            }

            function getX(x) {
                var index = getIndex(x);
                return region.x + me.klOptions.spaceWidth * (index + 1) + me.klOptions.barWidth * index + me.klOptions.barWidth * .5;
            }

            function getPriceColor(ki, price) {
                if (price > ki.preClose) {
                    return riseColor;
                } else if (price < ki.preClose) {
                    return fallColor;
                } else {
                    return normalColor;
                }
            }

            function getTipHtml(x) {
                var index = me.startIndex + getIndex(x);
                if (index >= me.data.ks.length) index = me.data.ks.length - 1;
                if (index < 0) index = 0;
                var ki = me.data.ks[index];
                var tipHtml = '<div><b>' + convertDate(ki.quoteTime) + '</b></div>' +
                    '昨收价：<font color="' + getPriceColor(ki, ki.preClose) + '">' + toMoney(ki.preClose) + '</font><br/>' +
                    '开盘价：<font color="' + getPriceColor(ki, ki.open) + '">' + toMoney(ki.open) + '</font><br/>' +
                    '最高价：<font color="' + getPriceColor(ki, ki.high) + '">' + toMoney(ki.high) + '</font><br/>' +
                    '最低价：<font color="' + getPriceColor(ki, ki.low) + '">' + toMoney(ki.low) + '</font><br/>' +
                    '收盘价：<font color="' + getPriceColor(ki, ki.close) + '">' + toMoney(ki.close) + '</font><br/>' +
                    '成交量：' + bigNumberToText(ki.volume / 100) + '手<br/>' +
                    '成交额：' + bigNumberToText(ki.amount);
                return tipHtml;
            }

            function getEventOffsetPosition(ev) {
                var offset = isTouchDevice()
                    ? setTouchEventOffsetPosition(ev, getPageCoord(me.canvas))
                    : getOffset(ev);
                return offset;
            }

            var controllerEvents = {
                onStart: function (ev) {
                    ev = ev || event;
                    var offset = getEventOffsetPosition(ev);
                    me.controllerStartOffset = offset;
                    me.controllerStartRange = me.dataRanges;
                },
                onEnd: function (ev) {
                    me.controllerStartOffset = null;
                    me.controllerStartRange = null;
                },
                onMove: function (ev) {
                    if (!me.controllerStartOffset) return;
                    ev = ev || event;
                    var offset = getEventOffsetPosition(ev);
                    var moveX = offset.offsetX - me.controllerStartOffset.offsetX;
                    var currentRange = me.controllerStartRange;
                    /*0-100*/
                    var regionWidth = region.width;
                    var moveValue = 0 - (moveX / regionWidth) * (currentRange.to - currentRange.start);
                    var start = currentRange.start + moveValue;
                    var to = currentRange.to + moveValue;
                    if (start < 0) {
                        start = 0;
                        to = start + (currentRange.to - currentRange.start);
                    }
                    else {
                        if (to > 100) {
                            to = 100;
                            start = to - (currentRange.to - currentRange.start);
                        }
                    }
                    var changeToValue = {left: start, right: to};
                    if (!me.painting) drawKL({start: changeToValue.left, to: changeToValue.right});
                }
            };

            /*
             当touchstart时的位置在K线柱附近时表示要显示柱的描述信息框；否则则要控制K线的范围
             */
            var fingerSize = {width: 30, height: 20};

            function shouldDoControllerEvent(ev, evtType) {
                if (evtType == undefined) return true;
                if (typeof me.shouldController == 'undefined') me.shouldController = true;
                if (evtType == 'touchstart') {
                    var offset = getEventOffsetPosition(ev);
                    var showTip = false;

                    var x = offset.offsetX;
                    x -= region.x;
                    var index = Math.ceil(x / (me.klOptions.spaceWidth + me.klOptions.barWidth)) - 1;

                    var indexRange = Math.ceil(fingerSize.width / (me.klOptions.spaceWidth + me.klOptions.barWidth)) + 1;

                    var indexStart = Math.max(0, index - indexRange / 2);
                    var indexTo = Math.min(me.filteredData.length - 1, index + indexRange / 2);
                    var yMin = 999999;
                    var yMax = -1;
                    for (index = indexStart; index <= indexTo; index++) {
                        var dataAtIndex = me.filteredData[index];
                        var yTop = region.y + (me.high - dataAtIndex.high) * region.height / (me.high - me.low) - fingerSize.height;
                        var yBottom = region.y + (me.high - dataAtIndex.low) * region.height / (me.high - me.low) + fingerSize.height;
                        yMin = Math.min(yTop, yMin);
                        yMax = Math.max(yBottom, yMax);
                    }
                    showTip = offset.offsetY >= yMin && offset.offsetY <= yMax;
                    setDebugMsg('yMin=' + yMin + ',yMax=' + yMax + ',offsetY=' + offset.offsetY + ',showTip=' + showTip);
                    me.shouldController = !showTip;

                }
                //setDebugMsg('shouldController=' + me.shouldController);
                return me.shouldController;
            }

            if (!me.crossLineAndTipMgrInstance) {
                me.crossLineAndTipMgrInstance = new crossLinesAndTipMgr(me.canvas, {
                    getCrossPoint: function (ev) {
                        return {x: getX(ev.offsetX), y: ev.offsetY};
                    },
                    triggerEventRanges: {
                        x: region.x,
                        y: region.y + 1,
                        width: region.width,
                        height: volumeRegion.y + volumeRegion.height - region.y
                    },
                    tipOptions: {
                        getTipHtml: function (ev) {
                            return getTipHtml(ev.offsetX);
                        },
                        size: {width: 120, height: 150},
                        position: {x: false, y: region.y + (region.height - 150) / 3}, //position中的值是相对于canvas的左上角的
                        opacity: 80,
                        cssClass: '',
                        offsetToPoint: 30
                    },
                    crossLineOptions: {
                        color: 'black'
                    },
                    shouldDoControllerEvent: shouldDoControllerEvent,
                    controllerEvents: controllerEvents
                });
                // me.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
            }
            else {
                me.crossLineAndTipMgrInstance.updateOptions({
                    getCrossPoint: function (ev) {
                        return {x: getX(ev.offsetX), y: ev.offsetY};
                    },
                    triggerEventRanges: {
                        x: region.x,
                        y: region.y + 1,
                        width: region.width,
                        height: volumeRegion.y + volumeRegion.height - region.y
                    },
                    tipOptions: {
                        getTipHtml: function (ev) {
                            return getTipHtml(ev.offsetX);
                        },
                        size: {width: 120, height: 150},
                        position: {x: false, y: region.y + (region.height - 150) / 3}, //position中的值是相对于canvas的左上角的
                        opacity: 80,
                        cssClass: '',
                        offsetToPoint: 30
                    },
                    crossLineOptions: {
                        color: 'black'
                    },
                    shouldDoControllerEvent: shouldDoControllerEvent,
                    controllerEvents: controllerEvents
                });
            }
            if (!me.addOrentationChangedEvent) {
                me.addOrentationChangedEvent = true;

                addEvent(window, 'orientationchange', function (ev) {
                    me.requestController = true;
                    me.implement.onOrentationChanged.call(me);
                });
            }

            me.painting = false;
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
            var itemsCount = toIndex - startIndex + 1;
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
            var high, low;
            filteredData.each(function (val, a, i) {
                if (i == 0) {
                    high = val.high;
                    low = val.low;
                }
                else {
                    high = Math.max(val.high, high);
                    low = Math.min(low, val.low);
                }
            });

            this.high = high*1.01;
            this.low = low*0.99;
            var ctx = this.ctx;
            var me = this;
            //timer.start('paintItems:移动均线');
            //画移动平均线
            this.implement.paintMAs.call(this, filteredData, getY);
            //timer.stop();
            //timer.start('paintItems:画柱');
            function getY(price) {
                return (me.high - price) * region.height / (me.high - me.low);
            }

            function getCandleLineX(i) {
                var result = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5;
                if (result * 10 % 10 == 0) result += .5;
                return result;
            }

            var currentX = 0;
            var needCandleRect = options.barWidth > 1.5;
            var drawCandle = function (ki, a, i) {
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
            filteredData.each(drawCandle);
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
                this.canvas,
                yAxisImp,
                calcAxisValues(high, low, (1 + 2))
            );
            yPainter.paint();
            //timer.stop();
            //timer.start('paintItems:横轴');
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
            xScalers.push(convertDate(filteredData[0].quoteTime, false).substr(2));
            for (var i = 1; i < options.xAxis.scalerCount; i++) {
                var index = Math.ceil(i * stepLength);
                if (index >= filteredData.length) index = filteredData.length - 1;
                var quoteTime = convertDate(filteredData[index].quoteTime, false);
                quoteTime = quoteTime.substr(2);
                xScalers.push(quoteTime);
            }
            var xPainter = new Painter(this.canvas, xAxisImp, xScalers);
            xPainter.paint();
            // timer.stop();

            //timer.start('volume');
            //画量
            this.implement.paintVolume.call(this, filteredData);
            //timer.stop();
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
            MAs.each(function (val, arr, index) {
                var MA = calcMAPrices(me.data.ks, me.startIndex, filteredData.length, val.daysCount);
                val.values = MA;
                MA.each(function (val, arr, i) {
                    if (val) {
                        me.high = Math.max(me.high, val);
                        me.low = Math.min(me.low, val);
                    }
                });
            });

            MAs.each(function (val, arr, index) {
                var MA = val.values;
                ctx.strokeStyle = val.color;
                ctx.beginPath();
                var currentX = 0;
                MA.each(function (val, arr, i) {
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

            filteredData.each(function (val, arr, i) {
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
            filteredData.each(function (val, arr, i) {
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
                    x: 2,
                    y: -3,
                    width: volumeRegion.x - 3,
                    height: volumeRegion.height
                };
            var volumeScalerImp = new yAxis(volumeScalerOptions);
            var volumeScalerPainter = new Painter(this.canvas, volumeScalerImp, volumeScalers);
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

    window.KChart = function(options) {
        var canvas = options.canvas.chart;
        if(!options.canvas.chart.fitted) fitToContainer(canvas)
        options.canvas.chart.fitted=true

        var width = canvas.width/window.devicePixelRatio;
        var kOptions = {
            backgroundColor: 'rgba(0,0,0,0)',
            riseColor: options.options.colors.rise,
            fallColor: options.options.colors.fall,
            normalColor: options.options.colors.normal,
            //主图区域的边距
            chartMargin: {left: 5, top: 5, right: 5},
            region: {x: 5, y: 5, width: width - 10, height: options.options.size.chart},
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
        painter = new Painter(canvas, kl, result);
        painter.paint();
    }
})();
;(function () {
    /*
     html5行情图库
     author:yukaizhao
     blog:http://www.cnblogs.com/yukaizhao/
     商业或公开发布请联系：yukaizhao@gmail.com
     */
    /*使用此文件需要引用util.js和crossLine以及tip*/
    /*
     canvas: 添加事件的画布
     options: {
     getCrossPoint:function (ev){return {x:x,y:y};},
     triggerEventRanges:{},
     tipOptions{
     tipHtml:function(ev){}
     },
     crossLineOptions:{
     color:'red'
     }
     }
     */
    function disableBubbleAndPreventDefault(e) {
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
    }

    function setTouchEventOffsetPosition(e, relativePoint) {
        e = e || event;
        if (e.touches && e.touches.length) {
            e = e.touches[0];
        } else if (e.changedTouches && e.changedTouches.length) {
            e = e.changedTouches[0];
        }

        var offsetX, offsetY;
        offsetX = e.pageX - relativePoint.x;
        offsetY = e.pageY - relativePoint.y;
        return { offsetX: offsetX, offsetY: offsetY };
    }

    function crossLinesAndTipMgr(canvas, options) {
        if (typeof Tip != 'function') {
            window.Tip = function () { };
            window.Tip.prototype = { show: function () { }, hide: function () { }, update: function () { } };
        }
        this.canvas = canvas;
        this.options = options;
    }

    crossLinesAndTipMgr.prototype._removeTipAndCrossLines = function () {
        //var canvas = this.canvas;
        var me = this;
        if (me.tip) me.tip.hide();
        if (me.clsMgr) me.clsMgr.removeCrossLines();
    };
    crossLinesAndTipMgr.prototype.updateOptions = function (options) {
        this.options = options;
    };
    crossLinesAndTipMgr.prototype._onMouseOrTouchMove = function (ev) {
        ev = ev || event;
        ev = getOffset(ev);
        var me = this;
        var options = me.options;
        var canvas = me.canvas;
        var canvasPosition = getPageCoord(canvas);
        var range = options.triggerEventRanges;

        //判断是否在范围之内，如果不在范围之内则移去十字线和tip
        if (ev.offsetX < range.x || ev.offsetX > range.x + range.width
            || ev.offsetY < range.y || ev.offsetY > range.y + range.height) {
            me._removeTipAndCrossLines();
            return;
        }

        var crossPoint = options.getCrossPoint(ev);
        //添加鼠标和触摸Event
        var crossLinesOptions = {
            crossPoint: crossPoint,
            verticalRange: { y1: range.y, y2: range.y + range.height },
            horizontalRange: { x1: range.x, x2: range.x + range.width },
            color: options.crossLineOptions.color,
            canvas: canvas
        };
        if (!me.clsMgr) {
            var clsMgr = new crossLines(crossLinesOptions);
            clsMgr.setMouseEvents(function (evHLine) {
                evHLine = evHLine || event;
                evHLine = getOffset(evHLine);
                var translatedEv = { offsetX: evHLine.offsetX + range.x, offsetY: parseInt(me.clsMgr.getHLine().style.top) - canvasPosition.y };
                var point = options.getCrossPoint(translatedEv);
                clsMgr.updateCrossPoint(point);
                if (me.tip) {
                    me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
                }
            }, function (evl) {
                evl = evl || event;
                evl = getOffset(evl);
                var translatedEv = { offsetX: parseInt(me.clsMgr.getVLine().style.left) - canvasPosition.x, offsetY: evl.offsetY + range.y };
                var point = options.getCrossPoint(translatedEv);
                clsMgr.updateCrossPoint(point);
                if (me.tip) {
                    me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
                }
            });

            me.clsMgr = clsMgr;
        } else {
            me.clsMgr.updateOptions(crossLinesOptions);
        }
        me.clsMgr.drawCrossLines();
        if (options.tipOptions) {
            var tipOp = options.tipOptions;
            if (!me.tip) {
                //tip设置
                var tip = new Tip({
                    position: { x: tipOp.position.x || false, y: tipOp.position.y || false }, //position中的值是相对于canvas的左上角的
                    size: tipOp.size,
                    opacity: tipOp.opacity || 80,
                    cssClass: tipOp.cssClass,
                    offsetToPoint: tipOp.offsetToPoint || 30,
                    relativePoint: { x: crossPoint.x, y: crossPoint.y },
                    canvas: canvas,
                    canvasRange: options.triggerEventRanges,
                    innerHTML: tipOp.getTipHtml(ev)
                });
                me.tip = tip;
            }

            me.tip.show(crossPoint, tipOp.getTipHtml(ev));
        }
    };

    crossLinesAndTipMgr.prototype._touchstart = function (e) {
        e = e || event;
        disableBubbleAndPreventDefault(e);
        var src = e.srcElement || e.target || e.relatedTarget;
        this.touchstartTime = new Date();
    };
    crossLinesAndTipMgr.prototype._touchmove = function (e) {
        e = e || event;
        disableBubbleAndPreventDefault(e);

        var canvas = this.canvas;

        var relativePoint = getPageCoord(canvas);
        var src = e.srcElement || e.target || e.relatedTarget;
        var fixedEvt = setTouchEventOffsetPosition(e, relativePoint);

        this._onMouseOrTouchMove(fixedEvt);
    };

    crossLinesAndTipMgr.prototype._touchend = function (e) {
        e = e || event;
        disableBubbleAndPreventDefault(e);
        var src = e.srcElement || e.target || e.relatedTarget;
        var canvas = this.canvas;
        var fixedEvt = setTouchEventOffsetPosition(e, getPageCoord(canvas));
        this._removeTipAndCrossLines();

        var time = new Date();
        var ts = time.getTime() - this.touchstartTime.getTime();
        if (ts < 200) {
            if (typeof this.options.onClick == 'function') this.options.onClick();
        }
    };
    crossLinesAndTipMgr.prototype._mouseout = function (ev) {
        var e = ev || event;
        ev = getOffset(e);
        var me = this;
        var range = me.options.triggerEventRanges;
        //判断是否在范围之内，如果不在范围之内则移去十字线和tip
        if (ev.offsetX <= range.x || ev.offsetX >= range.x + range.width
            || ev.offsetY <= range.y || ev.offsetY >= range.y + range.height) {
            me._removeTipAndCrossLines();
            return;
        }

        var toEle = e.toElement || e.relatedTarget || e.target;

        if (toEle) {
            if (toEle == me.canvas) return;
            if (toEle == me.clsMgr.getHLine() || toEle == me.clsMgr.getVLine()) return;
            me._removeTipAndCrossLines();
        }
    };

    crossLinesAndTipMgr.prototype.addCrossLinesAndTipEvents = function () {
        var canvas = this.canvas;
        var options = this.options;
        var canvasPosition = getPageCoord(canvas);
        if (canvas.addCrossLinesAndTipEvents == true) return;
        canvas.addCrossLinesAndTipEvents = true;

        var touchable = isTouchDevice();
        var me = this;
        if (touchable) {
            addEvent(canvas, 'touchstart', function (ev) { me._touchstart.call(me, ev); });

            addEvent(canvas, 'touchmove', function (ev) { me._touchmove.call(me, ev); });

            addEvent(canvas, 'touchend', function (ev) { me._touchend.call(me, ev); });
        }
        else {
            addEvent(canvas, 'mouseout', function (ev) { me._mouseout.call(me, ev); });

            addEvent(canvas, 'mousemove', function (ev) { me._onMouseOrTouchMove.call(me, ev); });

            if (typeof options.onClick == 'function') {
                addEvent(canvas, 'click', options.onClick);
            }
        }
    };

    function addCrossLinesAndTipEvents(canvas, options) {
        if(!canvas.crossLineAndTipMgrInstance){
            canvas.crossLineAndTipMgrInstance = new crossLinesAndTipMgr(canvas, options);
            canvas.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
        }
    }
    //////////////////////
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

    function Tip(options) {
        this.options = options;
        this.canvas = options.canvas;
        this.canvas.tip = this;
    }

    Tip.prototype = {
        show: function (relativePoint, html) {
            var dc = this.dataContext;
            var painter = this.canvas.painter;
            if (dc) {
                if (dc.isNewQuote) painter.fillTopText(dc.data);
                else painter.fillTopText(dc.data, dc.index);
            }
        },
        update: function (relativePoint, html) {
            this.show(relativePoint, html);
        },
        hide: function () {
            var dc = this.dataContext;
            var painter = this.canvas.painter;
            if (dc) {
                painter.fillTopText(dc.data);
            }
        }
    };

    function minsChart(canvas, options) {
        extendObject(options, this);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.painter = this;
    }

    minsChart.prototype = {
        /*
         data format like :{
         quote: {
         time: 20111214150106,
         open: 2241.390,
         preClose: 2248.590,
         highest: 2256.740,
         lowest: 2224.730,
         price: 2228.530,
         volume: 4407982200,
         amount: 38621178573
         },
         mins: [
         {price:2239.45,volume:49499299,amount:459279327}
         ]
         }
         */
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
            data.mins.each(function (item) {
                var diff = Math.abs(data.quote.preClose - item.price);
                maxDiff = Math.max(diff, maxDiff);
            });

            data.mins.each(function (item) {
                if(item.avg_px){
                    var diff = Math.abs(data.quote.preClose - item.avg_px);
                    maxDiff = Math.max(diff, maxDiff);
                }
            });

            console.log(maxDiff)
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
                data.mins.each(function (item) {
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

    window.MinsChart=function (options) {

        if(!options.canvas.chart.fitted) fitToContainer(options.canvas.chart)
        options.canvas.chart.fitted=true
        var width = options.canvas.chart.width/window.devicePixelRatio-2;
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
                region: {x: 1, y: 1, width: width, height: options.options.size.chart},
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
                    region: {x: .5, y: 1, width: 50.5, height: options.options.size.chart-3},
                    align: 'left',
                    fontHeight: 9,
                    textBaseline: 'top'
                },
                yScalerRight: {
                    font: options.options.font||'12px Arial',
                    region: {x: width-2-40.5, y: 1, width: 40.5, height: options.options.size.chart-3},
                    align: 'right',
                    fontHeight: 9,
                    textBaseline: 'top'
                }
            },
            xScaler: {
                font: options.options.font||'12px Arial', color: 'black',
                region: {x: 1, y: options.options.size.chart+15, width: width, height: 20},
                data: options.options.chart.xScaler
            },

            //bottomText: { font: '11px 宋体', color: 'black', region: { x: 5.5, y: 260, width: 400, height: 20} },
            volume: {
                region: {x: 1, y: options.options.size.chart+20, width: width, height: options.options.size.volume},
                bar: {color_fall: options.options.colors.fall,color_rise: options.options.colors.rise, width: 2},
                borderColor: options.options.colors.gridLine, splitLineColor: options.options.colors.gridLine,
                yScaler: {
                    font: options.options.font||'12px Arial',
                    region: {x: .5, y: options.options.size.volume+options.options.size.volume, width: 50.5, height: options.options.size.volume},
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
})();
LIGHT=window.LIGHT || {};

LIGHT.Components = {
    StockChart:function (options) {
        switch (options.type){
            case "time":
                return MinsChart(options);
            case "k":
                return KChart(options);
            default:
                break;
        }
    }
}})();