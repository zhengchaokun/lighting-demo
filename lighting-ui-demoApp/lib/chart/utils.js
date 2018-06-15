var window = {};

function windowHelper() {
    this.tapTimeLimit = 500;
}

// Array.prototype.each = function (func, startIndex, endIndex) {
//     startIndex = startIndex || 0;
//     endIndex = endIndex || this.length - 1;
//     for (var i = startIndex; i <= endIndex; i++) {
//         func(this[i], this, i);
//         if (this.breakLoop) {
//             this.breakLoop = false;
//             break;
//         }
//     }
// };


function calcAxisValues(high, low, count,formatFunc) {
    var diff = high - low;
    var space = diff / (count-1);
    var result = [];
    if(!formatFunc){
        formatFunc = function (val) {
            return (+val).toFixed(2);
        };
    }
    for (var i = 0; i < count; i++) {
        result.push(formatFunc(high - i * space));
    }
    return result;
}

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

var extendObject = function (src, dest) {
    for (var f in src) {
        dest[f] = src[f];
    }
};
window.extendWindow = function (src) {
    extendObject(src, window);
};
var wh = new windowHelper();
window.extendWindow(wh);
window.getQueryParam = function (paramName, isTop) {
    // var oRegex = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i');
    // var oMatch = oRegex.exec(isTop ? window.top.location.search : location.search);
    // if (oMatch && oMatch.length > 1)
    //     return decodeURIComponent(oMatch[1]);
    // else
    return '';
};
window.debug = window.getQueryParam('debug');
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
window.fitToContainer = function (canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.width = canvas.offsetWidth + "px";
    canvas.style.height = canvas.offsetHeight + "px";
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    rescale(canvas.getContext("2d"))
}

function rescale(canvas_prototype) {
    var pixelRatio = (function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    })(canvas_prototype),

        forEach = function (obj, func) {
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
            'arc': [0, 1, 2],
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

    forEach(ratioArgs, function (value, key) {
        canvas_prototype[key] = (function (_super) {
            return function () {
                var i, len,
                    args = Array.prototype.slice.call(arguments);

                if (value === 'all') {
                    args = args.map(function (a) {
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
    canvas_prototype.stroke = (function (_super) {
        return function () {
            this.lineWidth *= pixelRatio;
            _super.apply(this, arguments);
            this.lineWidth /= pixelRatio;
        };
    })(canvas_prototype.stroke);

    // Text
    //
    canvas_prototype.fillText = (function (_super) {
        return function () {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(canvas_prototype.fillText);

    canvas_prototype.strokeText = (function (_super) {
        return function () {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function (w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(canvas_prototype.strokeText);
}

module.exports = {
    calcMAPrices:calcMAPrices,
    calcAxisValues:calcAxisValues,
    convertDate:convertDate,
    extendObject:extendObject
}