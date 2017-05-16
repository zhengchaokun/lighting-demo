;(function (win) {
    win.API = {
        not_issued:function () {
            return execute("get","not_issued")
        },
        token: new Promise(function (resolve,reject) {
            Light.ajax.JSONP({
                url:"https://light.hscloud.cn/auth.json",
                success:function (token) {
                    resolve(token.access_token);
                },
                dataType:"json"
            });
        })
    };

    var prefix = "https://open.hscloud.cn/info/v2/query/new_share/";
    function execute(method,func,params) {
        params = params || {};
        return win.API.token.then(function (token) {
            params.access_token = token;
            return new Promise(function (resolve,reject) {
                Light.ajax({
                    type:method,
                    url:prefix+func,
                    success:function(data){
                        console.log(data)
                    },
                    error:function () {
                        reject();
                    },
                    headers:{

                    },
                    data:params,
                    dataType:"json"
                })
            }).catch(function (err) {
                return Promise.reject(err);
            })
        })
    }
})(window);
