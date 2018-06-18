import Light from 'light';

var prefix = "https://api.hscloud.cn/";

var API = {
    wizard: function (params) {
        return execute("quote/v1/wizard", params);
    },
    trend: function (code) {
        return execute("quote/v1/trend", {
            prod_code: code,
            fields: "last_px,business_amount,business_balance,avg_px"
        });
    },
    trend2: function (params) {
        return execute("quote/v1/trend", params);
    },
    trend5day: function (code) {
        return execute("quote/v1/trend5day", {
            prod_code: code,
            fields: "last_px,business_amount,business_balance,avg_px"
        });
    },
    real: function (code) {
        return execute("quote/v1/real", {
            en_prod_code: code,
            fields: "hq_type_code,prod_name,last_px,px_change,px_change_rate,open_px,preclose_px,business_amount,turnover_ratio,high_px,low_px,business_balance,business_amount_in,business_amount_out,market_value,pe_rate,amplitude,circulation_value,bid_grp,offer_grp"
        });
    },
    sort: function(code, num, sort, pos) {
        return execute("quote/v1/sort", {
            en_hq_type_code: code,
            sort_field_name: "px_change_rate",
            data_count: num,
            sort_type: sort,
            start_pos: pos || 0,
            fields: "prod_name,last_px,px_change_rate,rise_first_grp,preclose_px,px_change"
        })
    },
    sortUs: function(code){
        return execute("quote/v1/block/sort", {
            start_pos: 0,
            prod_code: code,
            data_count: 10,
            sort_type: 1,
            sort_field_name: 'px_change_rate',
            fields: "prod_name,last_px,px_change_rate"
        })
    },
    tick: function (code) {
        return execute("quote/v1/tick", {
            prod_code: code,
            data_count: 20
        });
    },
    kline: function (code, type) {
        return execute("quote/v1/kline", {
            get_type: "offset",
            prod_code: code,
            candle_period: type,
            fields: "open_px,high_px,low_px,close_px,business_amount,business_balance",
            data_count: 110
        });
    },
    company_news: function (params) {
        return execute("info/v2/news/company_news", params)
    },
    company_announcement: function (params) {
        return Promise.all([
            execute("info/v3/notices", params),
            // execute("info/v2/news/company_regular_announcement",params)
        ])
    },
    notice_info: function (params) {
        return execute("info/v3/notice_info", params);
    },
    company_profile: function (code) {
        return Promise.all([
            execute("info/v2/query/f10_company_profile", {
                en_prod_code: code
            }),
            execute("info/v2/query/f10_equity_structure", {
                en_prod_code: code
            }),
            execute("info/v2/query/f10_distribution", {
                en_prod_code: code
            }),
            execute("info/v2/query/f10_main_business_by_indurstry", {
                en_prod_code: code
            }),
            execute("info/v2/query/f10_top10_shareholders", {
                en_prod_code: code
            }),
            execute("quote/v1/block/query", {
                prod_code: code
            })
        ])
    },
    company_researchreport: function (params) {
        return execute("info/v2/news/company_researchreport", params);
    },
    company_finance: function (code) {
        return Promise.all([
            execute("info/v2/query/f10_income_statement", {
                en_prod_code: code
            }),
            execute("info/v2/query/f10_balance_statement", {
                en_prod_code: code
            }),
            execute("info/v2/query/f10_cashflow_statement", {
                en_prod_code: code
            })
        ])
    },
    getSystemInfo(){
        return new Promise(function (resolve) {
            resolve({
                windowWidth:weex.config.env.deviceWidth
            })
        })
    }
};
var parse2query = function parse2query(data) {
    var string = "";
    Object.keys(data).forEach(function (key) {
        string += key + "=" + (encodeURIComponent(data[key])) + "&";
    });
    string = string.substring(0, string.length - 1);
    return string;
};
var tokenPromise;
function getToken() {
    return tokenPromise || new Promise(function (resolve, reject) {
        console.log(123)
        Light.fetch({
            url: "https://light.hscloud.cn/data/flatservice/openapi/token?compId=8112734868605699",
            // body: parse2query({
            //     compId: "8112734868605699"
            // }),
            dataType:"json"
        },function (data) {
            console.log(data)
            resolve(JSON.parse(data.data).data.access_token);
        })
    });
}
var ajaxCounter = 0;
function execute(func, params) {
    ajaxCounter++;
    return getToken().then(function (token) {
        return new Promise(function (resolve, reject) {
            Light.ajax({
                url: prefix + func,
                data: params,
                headers: {
                    'Authorization': "Bearer " + token
                },
                type:"post",
                dataType:"json",
                success: function (data) {
                    resolve(data.data);
                },
                fail: function () {
                    reject();
                }
            })
        })
    })
}


module.exports = API;
