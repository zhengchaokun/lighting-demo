let API = {
    trend: function (code) {
        return execute("quote/v1/trend", {
            prod_code: code,
            fields: "last_px,business_amount,business_balance,avg_px"
        });
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
            fields: "prod_name,last_px,px_change,px_change_rate,open_px,preclose_px,business_amount,turnover_ratio,high_px,low_px,business_balance,business_amount_in,business_amount_out,market_value,pe_rate,amplitude,circulation_value,bid_grp,offer_grp"
        });
    },
    tick: function (code) {
        return execute("quote/v1/tick", {
            prod_code: code,
            data_count:10
        });
    },
    kline: function (code,type) {
        return execute("quote/v1/kline", {
            get_type:"offset",
            prod_code:code,
            candle_period:type,
            fields:"open_px,high_px,low_px,close_px,business_amount,business_balance",
            data_count:200
        });
    },
    company_news:function (params) {
        return execute("info/v2/news/company_news",params)
    },
    company_announcement:function (params) {
        return Promise.all([
            execute("info/v2/news/company_interim_announcement",params),
            // execute("info/v2/news/company_regular_announcement",params)
        ])
    },
    company_profile:function (code) {
        return  Promise.all([
            execute("info/v2/query/f10_company_profile",{
                en_prod_code:code
            }),
            execute("info/v2/query/f10_equity_structure",{
                en_prod_code:code
            }),
            execute("info/v2/query/f10_distribution",{
                en_prod_code:code
            }),
            execute("info/v2/query/f10_main_business_by_indurstry",{
                en_prod_code:code
            }),
            execute("info/v2/query/f10_top10_shareholders",{
                en_prod_code:code
            }),
            execute("quote/v1/block/query",{
                prod_code:code
            })
        ])
    },
    company_researchreport:function (params) {
        return execute("info/v2/news/company_researchreport",params);
    },
    company_finance:function (code) {
        return  Promise.all([
            execute("info/v2/query/f10_income_statement",{
                en_prod_code:code
            }),
            execute("info/v2/query/f10_balance_statement",{
                en_prod_code:code
            }),
            execute("info/v2/query/f10_cashflow_statement",{
                en_prod_code:code
            })
        ])
    }
};

import Light from "light";


let getToken = new Promise(function (resolve) {
    Light.ajax.getJSON("https://light.hscloud.cn/auth.json", function (data) {
        resolve(data.access_token)
    });
});
// Light.ajax.getJSON("https://light.hscloud.cn/data/flatservice/openapi/token?compId="+__ENV__.app_id, function (data) {
//     resolve(data.data.access_token)
// });

let prefix = "http://api.hscloud.cn/";
function execute(func, params) {
    return getToken.then(function (token) {
        return new Promise(function (resove, reject) {
            Light.ajax({
                type: "get",
                url: prefix + func,
                headers: {
                    "Authorization": "Bearer " + token
                },
                dataType: "json",
                data: params,
                success: function (data) {
                    resove(data.data);
                },
                error: function (err) {
                    reject(err);
                }
            })
        })
    })

}

module.exports = API;