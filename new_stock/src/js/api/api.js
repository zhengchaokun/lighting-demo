;(function (win) {
    win.API = {
        not_issued:function () {
            return execute("get","info/v2/query/new_share/not_issued").then(function (data) {
                return data.data[0]['10104011'];
            })
        },
        listed:function () {
            return execute("get","info/v2/query/new_share/listed").then(function (data) {
                var code = [];
                data = data.data[0]['10104012'];
                data.forEach(function (stock) {
                    var market = stock.secu_market,
                        flag;
                    if (market == '90') {
                        flag =  "SZ";
                    }
                    else {
                        flag =  "SS";
                    }
                    code.push(stock.prod_code+"."+flag);
                });
                return API.real({
                    en_prod_code:code.join(",")
                }).then(function (real) {
                    var snapshot =  real.data.snapshot;
                    data.forEach(function (stock) {
                        var market = stock.secu_market,
                            flag;
                        if (market == '90') {
                            flag =  "SZ";
                        }
                        else {
                            flag =  "SS";
                        }
                        stock.last_price = snapshot[stock.prod_code+"."+flag][5];
                    });
                    return data;
                });
            })
        },
        issued_not_listed:function () {
            return execute("get","info/v2/query/new_share/issued_not_listed").then(function (data) {
                return data.data[0]['10104013'];
            })
        },
        purchase_today:function () {
            return execute("get","info/v2/query/new_share/purchase_today").then(function (data) {
                return data.data[0]['10104010'];
            })
        },
        real:function (params) {
            return execute("get","quote/v1/real",params)
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

    var prefix = "https://open.hscloud.cn/";
    function execute(method,func,params) {
        params = params || {};
        return win.API.token.then(function (token) {
            params.access_token = token;
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
