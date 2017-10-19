;(function () {
    var deviceFlag = false;
    var Wrap = {
        version:"0.0.1-2017",
        //从手机选择照片或拍照功能-Base64是图片的64位编码；Blob是图片的二进制编码，按需使用
        chooseImage: function (inParams,cb) {
            var params={};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.chooseImage", inParams, function (data) {

                    var path = {
                        Base64: data.data.result,
                        Blob: convertBase64ToBlob(data.data.result)
                    };
                    params={
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:path
                    }
                    cb && cb(params);
                });
            } else {
                var defaultData = "bGlnaHQ=";
                var path = {
                    Base64: defaultData,
                    Blob: convertBase64ToBlob(defaultData)
                };
                params={
                    error_no:"0",
                    error_info:"success",
                    data:path
                }
                cb && cb(params);
            }
        },
        //复制内容到剪切板
        setClipboardText:function(params,cb){
            var newParams = {};
            var outParams = {};
            outParams = {
                error_no:"0",
                error_info:"success"
            }
            if (deviceFlag && window.LightJSBridge) {
                var newParams = {
                    "value":params.value
                }
                LightJSBridge.call("native.setClipBoardContent",newParams,function(){
                    cb&&cb(outParams)
                });
            }else{
                cb && cb(outParams);
            }

        },

        //获取剪贴板快照
        getClipboardText: function (cb) {
            var params={};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.getClipBoardContent", {}, function (data) {
                    params={
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data.result :""
                    }
                    cb && cb(params);
                });
            } else {
                var defaultData = "获取剪贴板快照测试数据";
                params={
                    error_no:"0",
                    error_info:"success",
                    data:defaultData
                }
                cb && cb(params);
            }
        },
        //获取url内容
        fetchURL: function (params, cb) {
            var newParams = {};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.fetchURL", {
                    "url": params.url
                }, function (data) {
                    newParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data.result
                    }
                    cb && cb(newParams);
                });
            } else {
                var defaultData = "<html><body>Hello World!</body></html>";
                newParams={
                    error_no:"0",
                    error_info:"success",
                    data:defaultData
                }
                cb && cb(newParams);
            }
        },
        //本地存储数据
        writeGlobalData: function (data, cb) {
            var params={
                error_no:"0",
                error_info:"success",
                data:"success"
            };
            if (deviceFlag && window.LightJSBridge) {
                var length = Object.keys(data).length;
                for (var key in data) {
                    LightJSBridge.call("native.writeData", {
                        key: key,
                        value: data[key] || {}
                    }, function (gmudata) {
                        if(gmudata.info){
                            params={
                                error_no:gmudata.info.errorcode,
                                error_info:gmudata.info.errormessage,
                                data:gmudata.data.result
                            };
                        }
                        length--;
                        if (length == 0) {
                            cb && cb(params);
                        }
                    });
                }
            } else {
                for (var key in data) {
                    sessionStorage.setItem(key, JSON.stringify(data[key]));
                }
                if (cb) {
                    cb && cb(params);
                }
            }
        },
        //本地读取数据
        readGlobalData: function (key, cb) {
            var params={};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.readData", {
                    key: key,
                }, function (data) {
                    params={
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? "failed" : "success",
                        data:data.data?data.data.result:null
                    }
                    cb && cb(params)
                });
            } else {
                var data = sessionStorage.getItem(key);
                params={
                    error_no:"0",
                    error_info:"success",
                    data:data
                };
                cb && cb(params);
            }
        },
        //本地删除数据
        deleteGlobalData:function(key,cb){
            var params={};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.deleteData", {
                    key: key,
                }, function () {
                    params={
                        error_no:"0",
                        error_info: "success"
                    }
                    cb && cb(params)
                });
            } else {
                sessionStorage.removeItem(key);
                params={
                    error_no:"0",
                    error_info:"success"
                };
                cb && cb(params);
            }
        },
        //web图片本地事件处理-imgUrl是图片地址
        imageAction: function (params, cb) {
            var newParams = {
                error_no:"0",
                error_info:"success",
                data:"success"
            };
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.imageAction", {
                    "image": params.url
                }, function () {
                    cb && cb(newParams);
                });
            } else {
                cb && cb(newParams);
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
        startRecord: function ( time,cb) {
            var params = {};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("media.audio.startRecord", {
                    "duration": time ? time.maxTime : "60"
                }, function (data) {
                    params={
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data.result :""
                    }
                    cb && cb(params);
                });
            } else {
                var defaultData = "bGlnaHQ=";
                params={
                    error_no:"0",
                    error_info:"success",
                    data:defaultData
                }
                cb && cb(params);
            }
        },
        //结束音频采集
        stopRecord: function () {
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("media.audio.stopRecord", {}, null);
            }
        },
        //分享接口
        share: function (params, cb) {
            var newParams = {
                error_no:"0",
                error_info:"success",
                data:"分享成功"
            };
            if (deviceFlag && window.LightJSBridge) {
                var shareParams = {
                    "title": params.title,
                    "content": params.content,
                    "url": params.url,
                    "image": params.image ? params.image : "",
                };
                LightJSBridge.call("social.share", shareParams, function(){
                    cb(newParams);
                });
            } else {
                cb && cb(newParams);
            }
        },
        //添加导航栏按钮接口-
        setButton: function (params, action) {
            if (deviceFlag && window.LightJSBridge) {

                var _actionFunction = 'actionFunction_' + Math.floor(Math.random() * 1000);
                window[_actionFunction] = action;
                var addParams = {
                    "title": params.title,
                    "icon":params.icon,
                    "action": "javascript:" + _actionFunction + "();"
                }
                LightJSBridge.call("head.addButton", addParams, null);
            }
        },
        //移除导航栏按钮接口-
        removeButton:function(){
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.removeButton", {}, null);
            }
        },
        //二维码生成接口-desc是需要被编码成二维码的内容，ewmsize是二维码尺寸,默认为300x300
        genCode: function (params, cb) {
            var newParams = {};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("qrcode.gen", {
                    "desc": params.desc,
                    "size": params.ewmsize || "300"
                }, function (data) {
                    newParams={
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data.result :""
                    }
                    cb && cb(newParams);
                });
            } else {
                newParams={
                    error_no:"0",
                    error_info: "success",
                    data:"bGlnaHQ="
                }
                cb && cb(newParams);
            }
        },
        //二维码扫描接口
        scanCode: function (cb) {
            var newParams = {};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("qrcode.scan", {}, function (data) {
                    newParams={
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data.result :""
                    }
                    cb && cb(newParams);
                });
            }
        },
        //身份证识别
        orcCheck:function(cb){
            var params = {};
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("face.orcCheck", {}, function(data){
                    params = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data.result :""
                    }
                    cb && cb(params);
                });
            }
        },
        appPreview: function (params) {
            var outParams = {
                error_no:"0",
                error_info:"success"
            }
            if (deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("system.appPreview", params, function(){
                    cb&&cb(outParams);
                });
            } else {
                cb && cb(outParams);
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
            var outParams = {
                error_no:"0",
                error_info:"success"
            }
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setTitle", {
                    "title": params.title
                }, function(){
                    cb&&cb(outParams);
                });
            } else {
                cb && cb(outParams);
            }
        },
        // 获取设备通讯录信息
        getContactInfo:function(cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.getContactInfo", {}, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data:""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 获取客户端版本信息
        getVersion:function(cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.version", {}, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 获取设备唯一标志码
        getUDID:function(cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.getUDID", {}, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过js接口在网页中切换底部tab
        switchTab:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("native.switchTab", {
                    index:params.index
                });
            }
        },
        // 通过js登录到各平台,第三方登录
        socialLogin:function(params,cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("social.login", {
                    type:params.type
                }, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data.result :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 判断各个平台app在设备上是否已安装
        isAppInstalled:function(params,cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("social.isAppInstalled", {
                    type:params.type
                }, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        status:data.data ? data.data.status :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过js登录用户
        userLogin:function(params,cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("user.login", {
                    "uid":params.uid,
                    "mobile":params.mobile,
                    "token":params.token,
                    "nickname":params.nickname,
                    "photoURL":params.photoURL,
                    "logoutWhenExit":params.logoutWhenExit
                }, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        result:data.data ? data.data.result :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过js设置登录用户信息
        setUserInfo:function(params,cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("user.setInfo", {
                    "uid":params.uid,
                    "mobile":params.mobile,
                    "token":params.token,
                    "nickname":params.nickname,
                    "photoURL":params.photoURL,
                    "logoutWhenExit":params.logoutWhenExit,
                    "extraInfo":params.extraInfo
                }, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        result:data.data ? data.data.result :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过JS获取登录用户信息
        getUserInfo:function(cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("user.getInfo", {}, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        result:data.data ? data.data.result :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过JS注销当前登录用户
        userLogout:function(cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("user.logout", {}, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        result:data.data ? data.data.result :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过js设置导航栏搜索视图
        setSearchView:function(params,cb){
           var outParams;
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setSearchView", {
                    "icon":"sear",
                    "backgroundColor":params.backgroundColor ? params.backgroundColor :"",
                    "placeholderText":params.placeholderText ? params.placeholderText :"",
                    "placeholderTextColor":params.placeholderTextColor ? params.placeholderTextColor :""
                }, function(data){
                    outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        result:data.data ? data.data.status :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 通过js接口控制是否隐藏状态栏
        statusBar:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setSystemStatusBar", {
                    hidden:params.hidden
                },null);
            }
        },
        // 通过js设置导航栏副标题
        setSubtitle:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setSubtitle", {
                    title:params.title,
                    subtitle:params.subtitle
                });
            }
        },
        // 通过js修改导航栏背景色
        setBackgroundColor:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("head.setBackgroundColor", {
                    color:params.color
                });
            }
        },
        //按键精灵查询数据接口
        wizard: function (params, cb) {
            var outParams = {
                error_no:"0",
                error_info:"success"
            }
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("quote.wizard",{
                        "prod_code":params.prod_code,
                        "en_finance_mic":params.en_finance_mic,
                        "data_count":params.data_count
                    }, function(data){
                    var outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                cb && cb(outParams);
            }
        },
        //行情报价数据接口
        real: function (params, cb) {
            var outParams = {
                error_no:"0",
                error_info:"success"
            }
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("quote.real",{
                        "en_prod_code":params.prod_code,
                        "fields":params.fields
                    }, function(data){
                    var outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                cb && cb(outParams);
            }
        },
        //行情股票排序
        sort: function (params, cb) {
            var outParams = {
                error_no:"0",
                error_info:"success"
            }
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("quote.sort",{
                        "en_prod_code":params.en_prod_code,
                        "en_hq_type_code":params.en_hq_type_code,
                        "sort_field_name":params.sort_field_name,
                        "sort_type":params.sort_type,
                        "data_count":params.data_count ? params.data_count : 20,
                        "start_pos":params.start_pos,
                        "fields":params.fields
                }, function(data){
                    var outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data :""
                    }
                    cb&&cb(outParams);
                });
            } else {
                cb && cb(outParams);
            }
        },
        // 埋点接口
        sendEvent:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("analytics.sendEvent", {
                    event:params.event
                },null);
            }
        },
        // 获取推送RegistrationID
        getRegistrationID:function(cb){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("push.getRegistrationID", {},function(data){
                    var outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data.data ? data.data :""
                    }
                    cb&&cb(outParams);
                });
            }else {
                var outParams = {
                    error_no:"0",
                    error_info:"success"
                }
                cb && cb(outParams);
            } 
        },
        // 设置推送alias接口
        setAlias:function(params){
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call("push.setAlias", {
                    alias:params.alias
                },null);
            }
        },
        // native方法调用通用方法(用户根据已有native方法自己调用)
        callNative: function (method,params, cb) {
            var outParams = {
                error_no:"0",
                error_info:"success"
            }
            if(deviceFlag && window.LightJSBridge) {
                LightJSBridge.call(method,params, function(data){
                    var outParams = {
                        error_no:data.info ? data.info.errorcode :"0",
                        error_info:data.info ? data.info.errormessage : "success",
                        data:data
                    }
                    cb&&cb(outParams);
                });
            } else {
                cb && cb(outParams);
            }
        }
    };
    if(window.LightSDK){
        LightSDK.native = Wrap
    }else{
        window.LightSDK={};
        window.LightSDK.native = Wrap;
    }
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

})();
    
