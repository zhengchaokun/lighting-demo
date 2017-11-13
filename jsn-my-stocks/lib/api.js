module.exports = {
    real(options,cb){
        const stream = weex.requireModule('stream')
        return new Promise(function (resolve) {
            stream.fetch({
                method: 'GET',
                type: 'json',
                url: 'https://open.hscloud.cn/quote/v1/real?'+require("./utils").parse2query({
                    en_prod_code:options.en_prod_code,
                    fields:options.fields,
                    access_token:"3D861398FC8E40FA96E79F284FD3809B20170929092052B7E451A8"
                })
            }, function (data) {
                if(data.ok){
                    resolve(data.data);
                }
            })
        })
    },
    myStocks(){
        const dataCenter = weex.requireModule('dataCenter')
        if(dataCenter){
            return new Promise(function (resolve) {
                dataCenter.getMyStocks(function(res) {
                    let ret = [];
                    res.split(",").forEach(function (code) {
                        code=code.split("-");
                        ret.push(`${code[1]}.${code[0]}`)
                    });
                    resolve(ret);
                })
            })
        }else{
            return Promise.resolve(["1A0001.SS","2A01.SZ","399006.SZ","600570.SS"])
        }
    }
};

