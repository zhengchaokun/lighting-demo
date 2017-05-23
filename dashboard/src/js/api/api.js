;(function (win) {
    win.API = {
        loginInfo:function () {
            return new Promise(function (resolve, reject) {
                //TODO 如果用户会话存在则resolve，否则reject
                resolve();
            })
        },
        /**
         * 后端应该根据用户的回话信息获取当前用户的权限内容，返回前台相关的条目
         */
        getMenuItems:function () {
            return execute("get","menu_items.json",{})
        }
    };

    var prefix = config.api_prefix;
    function execute(method,func,params) {
        params.plateform = "h5";
        return new Promise(function (resolve,reject) {
            Light.ajax({
                type:method,
                url:prefix+func,
                success:function(data){
                    resolve(data)
                },
                error:function () {
                    reject();
                },
                data:params,
                dataType:"json"
            })
        }).catch(function (err) {
            Dialog.alert(err||"网络错误，请稍后重试！");
            return Promise.reject(err);
        })
    }

    Light.on("viewChanged",function () {
        document.title = Light.currentView.title || config.defaultTitle;
    });
})(window);