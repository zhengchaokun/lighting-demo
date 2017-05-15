/**
 * Application tool
 */
;
(function() {
	var maskEl = $('<div class="shade-bg" style="display:none;"></div>')
			.appendTo($("body")), loading = $(
			"<p class='loading' style='text-align:center;display:none;'><img src='images/load.gif'/></p>")
			.appendTo($("body")), loadMask = $(
			'<div class="shade-bg" style="display:none;"></div>').appendTo(
			$("body"));
	var tipTpl = _
			.template([
					'<div class="tip <%=tipType%>">',
					'<i class="<%=tipType%>-icon"><img src="images/<%=tipType%>.png"/></i>',
					'<p><%=tipMessage%></p>', '</div>' ].join(""));
	var messageTpl = _
			.template([
					'<div class="popup box hint">',
					'<div class="hint-title"><%=title%></div>',
					'<div class="hint-content">',
					'<p class="hint-tone"><%=content%></p>',
					'<p class="hint-notone"><%=desc%></p>',
					'</div>',
					'<div class="hint-btn">',
					'<%if(showCancel){%><a href="javascript:void(0)" class="hint-cantel">取消</a>',
					'<a href="javascript:void(0)" class="hint-ok" >确认</a><%}else{%>',
					'<a href="javascript:void(0)" class="hint-ok" style="width:100%;" >确认</a><%}%>',
					'</div>', '</div>' ].join(""));
	function showMask() {
		maskEl.show();

	}
	function hideMask() {
		var size=$("div.popup").size();
		if(size==0){
			maskEl.hide();
		}

	}
	function createMsgBox(param) {

		var _html = messageTpl({
			title : param.title || '提示',
			content : param.content || '',
			desc : param.sth || '',
			showCancel : (typeof param.cancel == 'function')
		});
		var _t = $(_html);

		_t.appendTo($("body")).animate({
			top : "25%",
			display : 'block'
		}, 200);
		showMask();
		_t.find("a.hint-ok").tap(function(e) {
			_t.remove();
			hideMask();
			if (typeof param.ok == 'function') {
				param.ok(e);
			}

			return true;
		})
		if (typeof param.cancel == 'function') {

			_t.find("a.hint-cantel").tap(function(e) {
				_t.remove();
				hideMask();
				if (typeof param.cancel == 'function') {
					param.cancel(e);
				}
			});
		} else {
			_t.find("div.hint-btn").children("a.hint-cantel").remove();
			_t.find("div.hint-btn").children("a.hint-ok").width("100%");
		}
		return _t;
	}
	;

	$.extend(App, {
		// tip/alert/conferm
		tip : function(content, type) {
			type = type || "success";
			var _html = tipTpl({
				tipType : type,
				tipMessage : content
			});
			var _$html = $(_html);
			_$html.appendTo($("body")).animate({
				top : "2px"
			}, 200);
			setTimeout(function() {
				_$html.remove();
			}, 3000);

		},
		confirm : function(content, ok, cancel, title, sth) {
			var param = {
				title : title,
				content : content,
				sth : sth,
				ok : ok,
				cancel : cancel || function() {
				}
			}
			return createMsgBox(param);
		},
		alert : function(content, title, sth) {
			var param = {
				title : title,
				content : content,
				sth : sth
			}
			createMsgBox(param);
		},
		mask : function() {
			showMask();
		},
		unmask : function() {
			hideMask();
		},
		loading : function() {
			if (arguments) {
				App.maskchain = {}
				for ( var i = 0, size = arguments.length; i < size; i++) {
					App.maskchain[arguments[i]] = false;
				}
			}
			this.mask();
			loading.show();
		},
		unLoading : function(_mask) {
			if (typeof _mask == 'undefined') {
				App.maskchain = null;
			} else {
				if (App.maskchain) {
					App.maskchain[_mask] = true;
				}
			}
			if (App.maskchain) {
				var flag = false;
				for ( var key in App.maskchain) {
					if (!App.maskchain[key]) {
						flag = true;
						break;
					}
				}
				if (flag) {
					return false;
				}
			}
			this.unmask();
			loading.hide();
		},
		clearPopup : function() {
			$(".popup").hide();
			maskEl.hide();
		},
		showPopup : function() {
			$(".popup").show();
			maskEl.show();
		}
	});
	
/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 * 
 * @param num1加数1 | num2加数2
 */
window.numAdd=function(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};
/**
 * 加法运算，避免数据相减小数点后产生多位数和计算精度损失。
 * 
 * @param num1被减数  |  num2减数
 */
window.numSub=function(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    var precision;// 精度
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};
/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 * 
 * @param num1被乘数 | num2乘数
 */
window.numMulti=function(num1, num2) {
    var baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};
/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 * 
 * @param num1被除数 | num2除数
 */
window.numDiv=function(num1, num2) {
    var baseNum1 = 0, baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    with (Math) {
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
    }
};
})(Zepto);