import Light from "light";

module.exports = {
    LOCAL_USER_STORE:"LOCAL_USER_STORE",
    login(params){
        return module.exports.userLogin(params).then(function (data) {
            return module.exports.localSet(module.exports.LOCAL_USER_STORE,data)
        });
    },
    logout(){
        const that = this;
        return this.userLogout().then(function () {
            return that.localSet(that.LOCAL_USER_STORE,null)
        });
    },
    localSet(key,value){
        if(value===null) localStorage.removeItem(key);
        else localStorage.setItem(key,encodeURIComponent(JSON.stringify(value)));
        return Promise.resolve();
    },
    localGet(key){
        return Promise.resolve(JSON.parse(decodeURIComponent(localStorage.getItem(key))));
    },
    //AUTO-GEN
    /**
     * 登录前，需要先获取验证码，调用登录接口时需要较验验证码。(现在登录时暂不使用验证码)
     */
    getCaptcha(params){
        return execute('get','/common/captcha',params);
    },

    /**
     * 使用OPlus操作员登录，获取token，后面其它接口都需要传入token。
     */
    userLogin(params){
        return execute('post','/common/login',params);
    },

    /**
     * 用户退出。
     */
    userLogout(params){
        return execute('post','/common/logout',params);
    },

    /**
     * 获取机构信息，只返回当前公司下的第一级的机构信息，若机构有父节点则不返回。
     */
    deptQuery(params){
        return execute('get','/basedata/dept',params);
    },

    /**
     * 获取策略信息
     */
    strategyQuery(params){
        return execute('get','/basedata/strategy',params);
    },

    /**
     * 获取产品信息
     */
    fundQuery(params){
        return execute('get','/basedata/fund',params);
    },

    /**
     * 获取组合信息
     */
    combiGet(params){
        return execute('get','/basedata/combi',params);
    },

    /**
     * 获取交易员
     */
    opTradeInfoGet(params){
        return execute('get','/basedata/opTradeInfo',params);
    },

    /**
     * 获取现货客户的信息
     */
    invoiceTitleQuery(params){
        return execute('get','/basedata/spotCustomerInfo',params);
    },

    /**
     * 获取币种信息
     */
    currencyInfoQuery(params){
        return execute('get','/basedata/currencyInfo',params);
    },

    /**
     * 获取期货品种信息
     */
    futureKindQuery(params){
        return execute('get','/basedata/futureKind',params);
    },

    /**
     * 获取期货信息
     */
    futureInfoGet(params){
        return execute('get','/basedata/futureInfo',params);
    },

    /**
     * 获取外盘交易市场信息
     */
    outMarketInfoQuery(params){
        return execute('get','/basedata/outMarketInfo',params);
    },

    /**
     * 获取境外期货信息
     */
    outFutureInfoGet(params){
        return execute('get','/basedata/outFutureInfo',params);
    },

    /**
     * 获取期货行情信息
     */
    stockQuoteGet(params){
        return execute('get','/basedata/futureQuote',params);
    },

    /**
     * 获取期货类型品种关系
     */
    futurtTypeVarietyQuery(params){
        return execute('get','/basedata/futurtTypeVariety',params);
    },

    /**
     * 获取期现仓库信息
     */
    futureSpotWarehouseInfoQuery(params){
        return execute('get','/basedata/futureSpotWarehouseInfo',params);
    },

    /**
     * 获取期现品名信息表
     */
    futureSpotProductInfoQuery(params){
        return execute('get','/basedata/futureSpotProductInfo',params);
    },

    /**
     * 获取期现品牌信息
     */
    futureSpotBrandInfoQuery(params){
        return execute('get','/basedata/futureSpotBrandInfo',params);
    },

    /**
     * 获取期现计量单位信息
     */
    futureSpotUnitInfoQuery(params){
        return execute('get','/basedata/futureSpotUnitInfo',params);
    },

    /**
     * 境内指令查询，支持分页
     */
    insQuery(params){
        return execute('get','/ins',params);
    },

    /**
     * 境内指令下达
     */
    insAdd(params){
        return execute('post','/ins',params);
    },

    /**
     * 境内指令撤销
     */
    insDelete(params){
        return execute('delete','/ins',params);
    },

    /**
     * 持仓查询，支持分页
     */
    combiStockQuery(params){
        return execute('get','/ins/combiStock',params);
    },

    /**
     * 境内成交查询，支持分页
     */
    realdealQuery(params){
        return execute('get','/ins/realdeal',params);
    },

    /**
     * 境内可用数量查询
     */
    enableAmountGet(params){
        return execute('get','/basedata/enableAmount',params);
    },

    /**
     * 境内可用金额查询
     */
    enableBalanceGet(params){
        return execute('get','/basedata/enableBalance',params);
    },

    /**
     * 境外指令查询，支持分页
     */
    insOutQuery(params){
        return execute('get','/insout',params);
    },

    /**
     * 境外指令下达
     */
    insOutAdd(params){
        return execute('post','/insout',params);
    },

    /**
     * 境外指令撤销
     */
    insOutDelete(params){
        return execute('delete','/insout',params);
    },

    /**
     * 境外持仓查询，支持分页
     */
    combiStockOutQuery(params){
        return execute('get','/insout/combiStock',params);
    },

    /**
     * 境外成交查询，支持分页
     */
    realdealOutQuery(params){
        return execute('get','/insout/realdeal',params);
    },

    /**
     * 预合同查询
     */
    contQuery(params){
        return execute('get','/precont/precont',params);
    },

    /**
     * 生成预合同序号，添加预合同时，先生成预合同序号，序号在系统不重复，后续添加预合同主体信息和预合同物资明细信息时，同一个预合同要传入相同的预合同序号。
     */
    contIdGet(params){
        return execute('post','/precont/contId',params);
    },

    /**
     * 预合同信息添加-合同主体，预合同添加分步提交，合同主体。分批提交。
     */
    contMainAdd(params){
        return execute('post','/precont/contMain',params);
    },

    /**
     * 预合同信息修改-合同主体。
     */
    contMainModify(params){
        return execute('put','/precont/contMain',params);
    },

    /**
     * 预合同信息删除，会同步删除预合同主体和物资明细信息。
     */
    contMainDelete(params){
        return execute('delete','/precont/contMain',params);
    },

    /**
     * 预合同信息添加-物资明细信息，对于一个预合同可以调此接口多次添加多个物资明细。分批提交。
     */
    contDetailAdd(params){
        return execute('post','/precont/contDetail',params);
    },

    /**
     * 预合同信息修改-物资明细信息。
     */
    contDetailModify(params){
        return execute('put','/precont/contDetail',params);
    },

    /**
     * 提交预合同添加信息，提交指定预合同序号的预合同信息。
     */
    contComit(params){
        return execute('post','/precont/contComit',params);
    },

    /**
     * 预合同指令匹配。
     */
    contInsMatch(params){
        return execute('post','/precont/insMatch',params);
    },

    /**
     * 预合同成交匹配。
     */
    contRealdealMatch(params){
        return execute('post','/precont/realdealMatch',params);
    },

    /**
     * 预合同确认。
     */
    contConfirm(params){
        return execute('post','/precont/confirm',params);
    },

    /**
     * 预合同匹配信息查询。只支持查询单个预合同的匹配信息。返回预合同信息、预合同物资明细信息、匹配的指令信息、匹配的成交信息。
     */
    contMatchInfoQuery(params){
        return execute('get','/precont/matchInfo',params);
    },
    //AUTO-GEN-END
};

function execute(type,path,data) {
    return module.exports.localGet(module.exports.LOCAL_USER_STORE).then(function (info) {
        if(path!=="/common/login"){
            if(!info||!info.TOKEN){
                return Promise.reject({})
            }
            data.token = info.TOKEN;
        }
        return new Promise(function (resolve, reject) {
            Light.ajax({
                url:`mock${path}.json`,
                type:"get",
                // type,
                data,
                dataType:"json",
                success(data){
                    if(data.token) {
                        data.data.TOKEN = data.token;
                    }
                    if(data.code === 0){
                        resolve(data.data||{});
                    }

                }
            });
        })
    }).catch(function (err) {
        Light.navigate("login",{},{history:false})
    })
}