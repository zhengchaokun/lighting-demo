;(function () {
    var deviceFlag = false;
    function noop() {

    }
    var Wrap = {
        //从手机选择照片或拍照功能-Base64是图片的64位编码；Blob是图片的二进制编码，按需使用
        chooseImage: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.chooseImage", {
                    cropPhoto: params.cropPhoto,
                    aspectXY:params.aspectXY,
                    maxWidth: params.maxWidth
                }, function (data) {

                    var path = {
                        Base64: data.data.result,
                        Blob: convertBase64ToBlob(data.data.result)
                    };
                    cb && cb(path);
                });
            } else {
                var defaultData = "bGlnaHQ=";
                var path = {
                    Base64: defaultData,
                    Blob: convertBase64ToBlob(defaultData)
                };
                cb && cb(path);
            }
        },
        //获取剪贴板快照
        getClipBoardContent: function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.getClipBoardContent", {}, function (data) {
                    cb && cb(data.data.result);
                });
            } else {
                var defaultData = "获取剪贴板快照测试数据";
                cb && cb(defaultData);
            }
        },
        //获取url内容
        fetchURL: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.fetchURL", {
                    "url": params.url
                }, function (data) {
                    cb && cb(data.data.result);
                });
            } else {
                var defaultData = "<html><body>Hello World!</body></html>";
                cb && cb(defaultData);
                console.log(defaultData);
            }
        },
        //本地存储数据
        writeData: function (data, cb) {
            if (deviceFlag && window.LightJSBridge) {
                var length = Object.keys(data).length;
                for (var key in data) {
                    if (data[key] != null) {
                        LightJSBridge.call("native.writeData", {
                            key: key,
                            value: data[key] || {}
                        }, function () {
                            length--;
                            if (length == 0) {
                                cb && cb();
                            }
                        });
                    } else {
                        LightJSBridge.call("native.deleteData", {
                            "key": key
                        }, function () {
                            length--;
                            if (length == 0) {
                                cb && cb();
                            }
                        });
                    }
                }
            } else {
                for (var key in data) {
                    if (data[key] != null) {
                        sessionStorage.setItem(key, JSON.stringify(data[key]));
                    } else {
                        sessionStorage.removeItem(key);
                    }
                }
                if (cb) {
                    cb && cb(data);
                }
            }
        },
        //本地读取数据
        readData: function (key, cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.readData", {
                    key: key,
                }, function (data) {
                    if (data && data.data && data.data.result) {
                        cb && cb(data.data.result)
                    } else {
                        cb && cb(null);
                    }
                });
            } else {
                var data = sessionStorage.getItem(key)
                if (data) {
                    try {
                        cb && cb(JSON.parse(data));
                    } catch (e) {
                        cb && cb(null);
                    }
                } else {
                    cb && cb(null);
                }
            }
        },
        //web图片本地事件处理-imgUrl是图片地址
        imageAction: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.imageAction", {
                    "image": params.url
                }, function () {
                    cb && cb();
                });
            } else {
                var defaultData = "保存成功";
                cb && cb(defaultData);
            }
        },
        //web返回接口
        back: function () {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.back", {}, null);
            } else {
                window.history.back();
            }
        },
        //关闭webview接口
        close: function () {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.close", {}, null);
            } else {
                window.history.back();
            }
        },
        //开始音频采集-maxTime是音频录制的最长时间，以秒为单位
        startRecord: function (cb, maxTime) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("media.audio.startRecord", {
                    "duration": maxTime || "60"
                }, function (data) {
                    cb && cb(data.data.result);
                });
            } else {
                var defaultData = "bGlnaHQ=";
                cb && cb(defaultData);
            }
        },
        //结束音频采集
        stopRecord: function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("media.audio.stopRecord", {}, null);
            } else {
                cb && cb();
            }
        },
        //分享接口
        share: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                var shareParams = {
                    "title": params.title,
                    "content": params.content,
                    "url": params.url,
                    "image": params.image ? params.image : "",
                };
                LightJSBridge.call("social.share", shareParams, null);
            } else {
                cb && cb();
            }
        },
        //添加导航栏按钮接口-
        addButton: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {

                var _actionFunction = 'actionFunction_' + Math.floor(Math.random() * 1000);
                window[_actionFunction] = cb;
                var addParams = {
                    "title": params.title,
                    "icon": params.icon,
                    "position":params.position||"right",
                    "action": "javascript:" + _actionFunction + "();"
                }
                LightJSBridge.call("head.addButton", addParams, noop);
            } else {
                // cb && cb();
            }
        },
        //删除导航栏按钮接口
        removeButton: function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.removeButton", {}, cb||noop);
            } else {
                // cb && cb();
            }
        },
        //修改导航栏背景色接口--color是色值，如：#fff
        setBackgroundColor: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setBackgroundColor", {
                    "color": params.color
                }, null);
            } else {
                cb && cb();
            }
        },
        //三方支付接口-支付渠道为支付宝钱包时，payType="021";支付渠道为微信钱包时，payType="022"
        pay: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                var payparams = {};
                if (params.payType == "021") { //支付宝钱包
                    payparams = {
                        "channel_id": "021",
                        "orderInfo": "app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&charset=utf-8&method=alipay.trade.app.pay&sign_type=RSA&timestamp=2016-08-15%2012%3A12%3A15&version=1.0&sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D"
                    }
                } else if (params.payType == "022") { //微信钱包
                    payparams = {
                        "channel_id": "022",
                        "orderInfo": {
                            "appid": "wx8888888888888888",
                            "partnerid": "1900000109",
                            "prepayid": "WX1217752501201407033233368018",
                            "package": "Sign=WXPay",
                            "noncestr": "5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
                            "timestamp": "1412000000",
                            "sign": "C380BEC2BFD727A4B6845133519F3AD6"
                        }

                    }
                }
                LightJSBridge.call("trade.pay", payparams, function (data) {
                    cb && cb(data.data.resultStatus);
                });
            } else {
                cb && cb();
            }
        },
        //二维码生成接口-desc是需要被编码成二维码的内容，ewmsize是二维码尺寸,默认为300x300
        gen: function (params, cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("qrcode.gen", {
                    "desc": params.desc,
                    "size": params.ewmsize || "300"
                }, function (data) {
                    cb && cb(data.data.result);
                });
            } else {
                cb && cb("bGlnaHQ=");
            }
        },
        //二维码扫描接口
        scan: function (params,cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("qrcode.scan", params, function (data) {
                    cb && cb(data.data.result);
                });
            } else {
                cb && cb("http://9debi7fvk.lightyy.com/index.html");
            }
        },
        appPreview: function (params,cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("system.appPreview", params, cb);
            }
        },
        pageAppear:function (fn) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.onPageAppear = fn;
            } else {
                // cb && cb();
            }
        },
        //设置标题栏标题接口   
        setTitle: function (params, cb) {
            cb = cb || noop;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setTitle", {
                    "title": params.title
                }, function () {
                    cb && cb();
                });
            } else {
                cb && cb();
            }
        },
        //设置标题栏标题接口
        getUserInfo: function (cb) {
            cb = cb || noop;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("user.getInfo", {
                }, function (userInfo) {
                    if(userInfo.data){
                        cb && cb(userInfo.data.result);
                    }else{
                        cb()
                    }
                });
            } else {
                cb && cb({
                    token:"50bb584f40919a16a04c3b0a04c912bd"
                });
            }
        },
        //打开控制台
        consoleOpen:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("console.open",params,null)
            }
        },
        //关闭控制台
        consoleHidden:function(){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("console.hidden",{},null)
            }
        },
        //调试页面查看console信息
        showConsole:function(cb){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.showConsole = function (data) {
                    cb && cb(data);
                };
            } else {
                cb && cb();
            }
        },
        //执行js到调试页面
        debugJs:function(params,cb){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("console.debugJS",{
                    "JS":params.JS
                },function(data){
                    cb&&cb(data);
                })
            }
        },
        getSystemInfo:function(cb){
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.getSystemInfo",{}, function(data){
                    cb&&cb(data);
                });
            } else {
                cb && cb();
            }
        },
        logout:function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("user.logout",{}, function(data){
                    cb&&cb(data);
                });
            } else {
                cb && cb();
            }
        },
        checkFP:function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("validate.preVerifyOpeation",{
                    "verifyType":"FP"
                }, function(data){
                    if(data&&data.data&&data.data.result==="success"){
                        cb&&cb(true);
                    }else{
                        cb&&cb(false);
                    }
                });
            } else {
                cb && cb(false);
            }
        },
        checkGL:function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("validate.preVerifyOpeation",{
                    "verifyType":"GL"
                }, function(data){
                    if(data&&data.data&&data.data.result==="success"){
                        cb&&cb(true);
                    }else{
                        cb&&cb(false);
                    }
                });
            } else {
                cb && cb(false);
            }
        },
        verifyFP:function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("validate.verifyOpeation",{
                    "verifyType":"FP"
                }, function(data){
                    if(data&&data.data&&data.data.result==="success"){
                        cb&&cb(true);
                    }else{
                        cb&&cb(false);
                    }
                });
            } else {
                cb && cb(false);
            }
        },
        verifyGL:function (cb) {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("validate.verifyOpeation",{
                    "verifyType":"GL"
                }, function(data){
                    if(data&&data.data&&data.data.result==="success"){
                        cb&&cb(true);
                    }else{
                        cb&&cb(false);
                    }
                });
            } else {
                cb && cb(false);
            }
        }
    };
    function convertBase64ToBlob(data) {
        data = data + "";
        var bytes = window.atob(decodeURIComponent(escape(data.replace(/\s/g, ''))));
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/png'});
    }

    document.addEventListener("deviceready", function () {
        deviceFlag = true;
    })

    if(module && module.exports){
        module.exports = Wrap;
    }else{
        window.GMUSDK = Wrap;
    }
})();
    
