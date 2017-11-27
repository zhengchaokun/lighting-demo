exports.common = {
    Constants:{
        stockDetailUserJsHead: true
    },
    getBusiFlag: function(codeType, specialMarker) {
        var zaiStr = "XSHG.D,XSHE.D,XHKG-M.DB";
        var SpecialMarketDef = {
            SM_DELIST_WARNING: 1,
            SM_RISK_WARNING: 2,
            SM_CRD_BUY: 4,
            SM_CRD_SELL: 8,
            SM_SH2HK: 16,
            SM_HK2SH: 32,
            SM_SH2HK_ONLY_SELL: 64,
            SM_HK2SH_ONLY_SELL: 128,
            SM_B_TARGET: 256,
            SM_A_TARGET: 512
        };
        var ret = [];
        codeType = codeType.toUpperCase();
        specialMarker = Number(specialMarker);

        if (zaiStr.indexOf(codeType) > -1) {
            ret.push("债");
        }

        if (codeType.indexOf("XSHG.EU") == 0 || codeType.indexOf("XSHG.EM") == 0 || codeType.indexOf("XSHE.EU") == 0 || codeType.indexOf("XSHE.EM") == 0) {
            ret.push("基");
        }

        if (codeType.toUpperCase() == "NEEQ.XYZR"){
            ret.push("协议");
        }

        if (codeType.toUpperCase() == "NEEQ.ZSZR"){
            ret.push("做市");
        }
        if (codeType.toUpperCase() == "NEEQ.LWTS"){
            ret.push("两退");
        }

        if ((specialMarker & SpecialMarketDef.SM_SH2HK) != 0 || (specialMarker & SpecialMarketDef.SM_HK2SH) != 0 ||
            (specialMarker & SpecialMarketDef.SM_SH2HK_ONLY_SELL) != 0 || (specialMarker & SpecialMarketDef.SM_HK2SH_ONLY_SELL) != 0) {
            ret.push("通");
        }

        if ((specialMarker & SpecialMarketDef.SM_CRD_BUY) != 0 || (specialMarker & SpecialMarketDef.SM_CRD_SELL) != 0) {
            ret.push("融");
        }

        if (codeType.indexOf("XBHS") == 0 || codeType.indexOf("XBUS") == 0 || codeType.indexOf("XBHK") == 0 || codeType.indexOf("BK") > -1) {
            ret.push("板");
        }
        return ret;
    },
    getTradeStatus: function(tradeStatus) {
        var tradeStatusCN = "";
        if (tradeStatus == "PRETR") {
            tradeStatusCN = "盘前处理"
        } else if (tradeStatus == "START") {
            tradeStatusCN = "未开盘"
        } else if (tradeStatus == "TRADE") {
            tradeStatusCN = "交易中"
        } else if (tradeStatus == "HALT") {
            tradeStatusCN = "停牌"
        } else if (tradeStatus == "BREAK") {
            tradeStatusCN = "休市"
        } else if (tradeStatus == "POSTR") {
            tradeStatusCN = "盘后处理"
        } else if (tradeStatus == "ENDTR") {
            tradeStatusCN = "已收盘"
        } else if (tradeStatus == "SUSP") {
            tradeStatusCN = "停盘"
        } else if (tradeStatus == "STOPT") {
            tradeStatusCN = "停牌"
        }
        return tradeStatusCN;
    },
    getAbbreviation: function(type) {
        var MarketType = {
            XSHG: "SS",
            XSHE: "SZ",
            XBHS: "HSBK",
            XBHK: "HKBK",
            XBUS: "USBK",
            XNAS: "O",
            XASE: "A",
            XNYS: "N",
            NEEQ: "NEEQ",
            "XHKG-I": "HKI",
            "XHKG-M": "HKM",
            "XHKG-G": "HKG",
            "XHKG-N": "HKN",
            "XHKG-E": "HKE",
            CSI: "CSI",
            CCFX: "CFFE",
            XSGE: "SHFE",
            XDCE: "DCE",
            XZCE: "CZCE",
            XFCC: "FCC"
        };

        var ret = "";

        if (type == null || type.length == 0) {
            return "";
        }

        var market = type.split('.')[0].toUpperCase();
        if (MarketType[market]) {
            ret = MarketType[market];
        }

        return ret;
    },
    formatDate: function(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    getMarketIcon: function(codetype) {
        var type = codetype.toUpperCase();
        if (type.indexOf("XSHG") == 0 || type.indexOf("XSHE") == 0 || type.indexOf("XBHS") == 0 || type.indexOf("NEEQ") == 0) {
            return "hs"; //沪深
        }

        if (type.indexOf("XNAS") == 0 || type.indexOf("XNYS") == 0 || type.indexOf("XASE") == 0 || type.indexOf("XBUS") == 0) {
            return "us"; //美股
        }

        if (type.indexOf("XHKG") == 0 || type.indexOf("XBHK") == 0) {
            return "hk"; //港股
        }

        if (type.indexOf("CCFX") == 0 || type.indexOf("XSGE") == 0 || type.indexOf("XDCE") == 0 || type.indexOf("XZCE") == 0 || type.indexOf("CFFE") == 0) {
            return "future"; //期货
        }
        return "other";
    },
    getMarkType: function(codetype) {
        var type = codetype.toUpperCase();
        if (type.indexOf("XSHG") == 0 || type.indexOf("XSHE") == 0 || type.indexOf("XBHS") == 0 || type.indexOf("NEEQ") == 0) {
            return "MARKET_CN"; //沪深
        }

        if (type.indexOf("XNAS") == 0 || type.indexOf("XNYS") == 0 || type.indexOf("XASE") == 0 || type.indexOf("XBUS") == 0) {
            return "MARKET_US"; //美股
        }

        if (type.indexOf("XHKG") == 0 || type.indexOf("XBHK") == 0) {
            return "MARKET_HK"; //港股
        }

        if (type.indexOf("CCFX") == 0 || type.indexOf("XSGE") == 0 || type.indexOf("XDCE") == 0 || type.indexOf("XZCE") == 0 || type.indexOf("CFFE") == 0) {
            return "MARKET_FUTURE"; //期货
        }
        return "MARKET_UNDEFINE"; //未知市场
    },
    getProductType: function(codetype) {
        var type = codetype.toUpperCase();
        if (type.indexOf("XBHS") == 0 || type.indexOf("XBHK") == 0 || type.indexOf("XBUS") == 0) {
            return "PRODUCT_BLOCK"; //板块
        }

        if (type.indexOf(".MRI") != -1) {
            return "PRODUCT_INDEX"; //指数
        }

        if (type.indexOf("XSHG.D") == 0 || type.indexOf("XSHE.D") == 0 || type.indexOf("XHKG-M.DB") == 0) {
            return "PRODUCT_DEBENTRUE"; //债券
        }

        if (type.indexOf("XSHG.EU") == 0 || type.indexOf("XSHG.EM") == 0 || type.indexOf("XSHE.EU") == 0 || type.indexOf("XSHE.EM") == 0) {
            return "PRODUCT_FUND"; //基金
        }

        if (type.indexOf("NEEQ.XYZR") == 0 || type.indexOf("NEEQ.ZSZR") == 0 || type.indexOf("NEEQ.LWTS") == 0 ||
            type.indexOf("NEEQ.M") == 0 || type.indexOf("NEEQ.MRI") == 0 || type.indexOf("NEEQ.ER") == 0) {
            return "PRODUCT_NEWBLOCK"; //新三板
        }
        return "PRODUCT_STOCK"; //股票
    },
    calculateSizeByText:function(text){
        var fontSize=29;
        if(text.length==7){
            fontSize=28;
        }else if(text.length==8){
            fontSize=26;
        }else if(text.length==9){
            fontSize=24;
        }else if(text.length==10){
           fontSize=22;
        }else if(text.length>10){
            fontSize=20;
        }
        else{
            fontSize=29;
        }
        return fontSize;
    }
}