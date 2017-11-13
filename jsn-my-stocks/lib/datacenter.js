weex.registerModule('dataCenter', {
    /**
     * 获取自选股列表
     * @param cb
     */
    getMyStocks (cb) {
        cb("XSHE-000558,XSHG-600000,XNAS-NTES,XSHE-002094");
    },
    //quoteDc.loadRealtimeList({'en_prod_code':e,'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code,special_marker,trade_status'},callback)
    loadRealtimeList(options,cb){
        const stream = weex.requireModule('stream')
        return stream.fetch({
            method: 'GET',
            type: 'json',
            url: 'https://open.hscloud.cn/quote/v1/real?'+parse2query({
                en_prod_code:options.en_prod_code,
                fields:options.fields,
                access_token:"3D861398FC8E40FA96E79F284FD3809B20170929092052B7E451A8"
            })
        }, cb)
    }

});

function parse2query(data) {
    let string = "";
    Object.keys(data).forEach(function (key) {
        string+=`${key}=${data[key]}&`
    });
    string=string.substring(0,string.length-1);
    return string;
}