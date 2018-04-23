module.exports = {
	"CNIndex": {
		"header": "指数",
		"showHeader": false,
		"open": true,
		"display": {
			"type": "custom",
			"class": "HLIndexCollapse",
      "params": {
        "stocks":[
          {"stockCode":"1A0001","codeType":"XSHG.mri"},
          {"stockCode":"2A01","codeType":"XSHE.mri"},
          {"stockCode":"1B0300","codeType":"XSHG.mri"},
          {"stockCode":"399005","codeType":"XSHE.mri"},
          {"stockCode":"399006","codeType":"XSHE.mri"}
        ],
        "actionButtonParams":[{"buttonTitle":"沪深排名" , "buttonIcon":"hsRank", "action":"gmu://stock_rank#hsrank"}]
      }
		}
	},
     "CNBlocks": {
            "header": "热门板块",
            "showHeader": true,
            "open": true,
            "display": { "type": "blockTiles" },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XBHS.HY","XBHS.GN"], "sortId":"col_price_change_percent", "count":"3", "orderType":"desc", "specialMarker":"0"}
            },
            "actionPage": {
              "actionName":"更多",
              "gmuName": "block_rank",
              "params": {"markets":["XBHS.HY","XBHS.GN"],"title":"热门板块"}
            }
          },
     "CNRiseList" : {
            "header": "涨幅榜",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XSHG.esa","XSHE.esa","XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"0"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "params": {"title":"沪深涨跌幅", "markets":["XSHG.esa", "XSHE.esa", "XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_price_change_percent", "orderType":"desc"}
            }
          },
     "CNFallList": {
            "header": "跌幅榜",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XSHG.esa","XSHE.esa","XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_price_change_percent", "count":"10", "orderType":"asc", "specialMarker":"0"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "params": {"title":"沪深涨跌幅", "markets":["XSHG.esa", "XSHE.esa", "XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_price_change_percent", "orderType":"asc"}
            }
          },
     "CNTurnoverList": {
            "header": "换手率榜",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XSHG.esa","XSHE.esa","XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_change_hand_ratio", "count":"10", "orderType":"desc", "specialMarker":"0"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "params": {"title":"沪深换手率榜", "markets":["XSHG.esa", "XSHE.esa", "XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_change_hand_ratio", "orderType":"desc"}
            }
          },
"USHotChinaStocks": {
"header": "热门中概股",
"showHeader": true,
"open": true,
"display": {
"type": "stockList",
"count": "10"
},
"dataSource": {
"action": "getBlockStocks",
"params": {"block":{"codeType":"XBUS","stockName":"热门中概股","stockCode":"HO0500"},"count":"10"}
},
"actionPage": {
"gmuName": "stock_rank",
"pageId": "usrank",
"params": {"title":"中概股", "block":{"codeType":"XBUS","stockName":"中概股","stockCode":"HO0500"}, "sortId":"col_price_change_percent", "orderType":"desc"}
}
},
     "USChinaStocks": {
            "header": "中概股",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getBlockStocks",
              "params": {"block":{"codeType":"XBUS","stockName":"中概股","stockCode":"ZG0001"},"count":"10"}
            },
             "actionPage": {
              "gmuName": "stock_rank",
              "pageId": "usrank",
              "params": {"title":"中概股", "block":{"codeType":"XBUS","stockName":"中概股","stockCode":"ZG0001"}, "sortId":"col_price_change_percent", "orderType":"desc"}
            }
          },
     "USFamousStocks":   {
            "header": "知名美股",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getBlockStocks",
              "params": {"block":{"codeType":"XBUS","stockName":"明星股","stockCode":"MX0001"},"count":"10"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "pageId": "usrank",
              "params": {"title":"知名美股", "block":{"codeType":"XBUS","stockName":"明星股","stockCode":"MX0001"}, "sortId":"col_price_change_percent", "orderType":"desc"}
            }
          },
     "HKIndex":  {
            "header": "指数",
            "showHeader": false,
            "open": true,
            "display": {
              "type": "custom",
              "class": "HLIndexCollapse",
              "params": {"stocks":[{"stockCode":"HSI","codeType":"XHKG-I.mri"}],"actionButtonParams": [{ "buttonTitle":"沪港通专题", "buttonIcon":"hgContect", "action":"gmu://globalquote#hgtpage"},{ "buttonTitle":"深港通专题", "buttonIcon":"sgContect", "action":"gmu://globalquote#sgtpage"}]}
            }
          },
     "HKBlocks":     {
            "header": "港股热门板块",
            "showHeader": true,
            "open": true,
            "display": { "type": "blockTiles" },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XBHK.HSHY"], "sortId":"col_price_change_percent", "count":"3", "orderType":"desc", "specialMarker":"0"}
            },
            "actionPage": {
              "actionName":"更多",
              "gmuName": "block_rank",
              "pageId":"hkblockrank",
              "params": {"markets":["XBHK.HSHY"],"title":"港股热门板块"}
            }
          },
     "HKRiseList":     {
            "header": "主板涨幅榜",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"0"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "params": {"title":"主板涨幅榜", "markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "orderType":"desc"}
            }
          },
     "HKGEMRiseList": {
          "header": "创业板涨幅榜",
          "showHeader": true,
          "open": true,
          "display": {
               "type": "stockList",
               "count": "10"
          },
          "dataSource": {
               "action": "getRankList",
               "params": {"markets":["XHKG-G"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"0"}
          },
          "actionPage": {
          "gmuName": "stock_rank",
          "params": {"title":"创业板涨幅榜", "markets":["XHKG-G"], "sortId":"col_price_change_percent", "orderType":"desc"}
          }
     },
     "HKFallList":     {
            "header": "跌幅榜",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "count":"10", "orderType":"asc", "specialMarker":"0"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "params": {"title":"港股涨跌幅", "markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "orderType":"asc"}
            }
          },
     "HKTurnoverList":     {
            "header": "换手率榜",
            "showHeader": true,
            "open": true,
            "display": {
              "type": "stockList",
              "count": "10"
            },
            "dataSource": {
              "action": "getRankList",
              "params": {"markets":["XHKG-M.es"], "sortId":"col_change_hand_ratio", "count":"10", "orderType":"desc", "specialMarker":"0"}
            },
            "actionPage": {
              "gmuName": "stock_rank",
              "params": {"title":"港股换手率榜", "markets":["XHKG-M.es"], "sortId":"col_change_hand_ratio", "orderType":"desc"}
            }
          },
     "FutureIndex":     {
            "header": "指数",
            "showHeader": false,
            "open": true,
            "display": { "type": "indexTiles" },
            "dataSource": {
              "action": "getRealtime",
              "params": {"stocks":[{"stockCode":"IF0001","codeType":"CCFX.FF.INDEX"},{"stockCode":"IC0001","codeType":"CCFX.FF.INDEX"},{"stockCode":"IH0001","codeType":"CCFX.FF.INDEX"}]}
            }
          },
"FinancialFutures":     {
"header": "中金所",
"showHeader": true,
"open": true,
"display": {
"type": "custom",
"class": "HLFutrueCollapse",
"params": {"list":[
          {"title":"沪深300","market":"CCFX.FF.INDEX.HS300","relatedIndex":{"stockCode":"1B0300","codeType":"XSHG.mri"},"sortId":"col_total_volume",
          "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"中证500","market":"CCFX.FF.INDEX.ZZ500","relatedIndex":{"stockCode":"1B0905","codeType":"XSHG.mri"},"sortId":"col_total_volume",
         "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"上证50","market":"CCFX.FF.INDEX.SZ50","relatedIndex":{"stockCode":"1B0016","codeType":"XSHG.mri"},"sortId":"col_total_volume",
         "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"国债","market":"CCFX.FF.DEBT","sortId":"col_total_volume",
         "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]}]}
},
"actionPage": {
"actionName":"更多",
"gmuName": "stock_rank",
"pageId": "zjfuturerank"
}
},
"XSGEFutures":     {
"header": "上期所",
"showHeader": true,
"open": true,
"display": {
"type": "custom",
"class": "HLFutrueCollapse",
"params": {"list":[
          {"title":"螺纹钢","market":"XSGE.FC.REBAR","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"石油沥青","market":"XSGE.FC.PITCH","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"金属","market":"XSGE.FC.METAL","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"天然橡胶","market":"XSGE.FC.RUBBER","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]}]}
},
"actionPage": {
"actionName":"更多",
"gmuName": "stock_rank",
"pageId": "sqfuturerank"
}
},
"XDCEFutures":     {
"header": "大商所",
"showHeader": true,
"open": true,
"display": {
"type": "custom",
"class": "HLFutrueCollapse",
"params": {"list":[
          {"title":"大豆","market":"XDCE.FC.BEAN","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"玉米","market":"XDCE.FC.CORN","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"棕榈油","market":"XDCE.FC.PALM","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"铁矿石","market":"XDCE.FC.INRU","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"塑料","market":"XDCE.FC.PETR","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]}]}
},
"actionPage": {
"actionName":"更多",
"gmuName": "stock_rank",
"pageId": "dsfuturerank"
}
},
"XZCEFutures":     {
"header": "郑商所",
"showHeader": true,
"open": true,
"display": {
"type": "custom",
"class": "HLFutrueCollapse",
"params": {"list":[
          {"title":"棉花","market":"XZCE.FC.COTTON","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"白糖","market":"XZCE.FC.SUGAR","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]},
          {"title":"PTA","market":"XZCE.FC.PTA","sortId":"col_total_volume",
           "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]}]}
},
"actionPage": {
"actionName":"更多",
"gmuName": "stock_rank",
"pageId": "zsfuturerank"
}
},
"SH2HK":{
"header": "沪股通",
"showHeader": true,
            "open": true,
            "display": {
                "type": "stockList",
                "count": "10"
            },
            "dataSource": {
                "action": "getRankList",
                "params": {"markets":["XSHG.esa","XSHE.esa","XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"16"}
            },
            "actionPage": {
                "gmuName": "stock_rank",
                "params": {"title":"沪股通", "markets":["XSHG.esa","XSHE.esa","XSHE.es.smse", "XSHE.es.gem"], "sortId":"col_price_change_percent", "orderType":"desc","specialMarker":"16"}
            }
        },
        "HK2SH":{
            "header": "港股通",
            "showHeader": true,
            "open": true,
            "display": {
                "type": "stockList",
                "count": "10"
            },
            "dataSource": {
                "action": "getRankList",
                "params": {"markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"32"}
            },
            "actionPage": {
                "gmuName": "stock_rank",
                "params": {"title":"港股通", "markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "orderType":"desc","specialMarker":"32"}
            }
        },
        "HGTBALANCE": {
		"header": "沪港通余额",
		"showHeader": false,
		"open": true,
		"display": {
			"type": "custom",
			"class": "HLHGTBalanceView"
		}
	},
    "SS2HK":{
        "header": "深股通",
        "showHeader": true,
        "open": true,
        "display": {
            "type": "stockList",
            "count": "10"
        },
        "dataSource": {
            "action": "getRankList",
            "params": {"markets":["XSHE"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"16777216"}
        },
        "actionPage": {
            "gmuName": "stock_rank",
            "params": {"title":"深股通", "markets":["XSHE"], "sortId":"col_price_change_percent", "orderType":"desc","specialMarker":"16777216"}
        }
    },
    "HK2SS":{
        "header": "港股通",
        "showHeader": true,
        "open": true,
        "display": {
            "type": "stockList",
            "count": "10"
        },
        "dataSource": {
            "action": "getRankList",
            "params": {"markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "count":"10", "orderType":"desc", "specialMarker":"1048576"}
        },
        "actionPage": {
            "gmuName": "stock_rank",
            "params": {"title":"港股通", "markets":["XHKG-M.es"], "sortId":"col_price_change_percent", "orderType":"desc","specialMarker":"1048576"}
        }
    },
    "SGTBALANCE": {
        "header": "深港通余额",
        "showHeader": false,
        "open": true,
        "display": {
            "type": "custom",
            "class": "HLSGTBalanceView"
        }
    },
    "MyStocks": {
        "header": "指数",
        "showHeader": false,
        "open": true,
        "display": {
            "showMarketTags":true,
            "showSpecialTags":true,
            "type": "custom",
            "class": "HLSelfStocksView",
            "params":
            {
                "thirdColumnIds":["COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_CHANGE_HAND_RATIO", "COL_MARKET_VALUE"],
                "filters":[{"title":"沪深", "markets":["XSHG","XSHE"]},{"title":"美股", "markets":["XNAS","XASE","XNYS"]}, {"title":"港股", "markets":["XHKG"]},{"title":"期货", "markets":["CCFX","XSGE","XDCE","XZCE"]},{"title":"其他", "markets":["XBHS","XBHK","XBUS","NEEQ","CSI"]}],
                "indexSubViews":[{"stockCode":"1A0001","alias":"上证","codeType":"XSHG.mri"},{"stockCode":"2A01","alias":"深证","codeType":"XSHE.mri"},{"stockCode":"399006","alias":"创业板","codeType":"XSHE.mri"}],
                "showMarketTags":true,
                "showSpecialTags":true
            }
        }
    },

    "BlankView": {
        "showHeader": false,
        "open": true,
        "display": {
            "type": "custom",
            "class": "HLBlankCollapse",
            "params":{"backgroundColor":"#dcdcdc", "height":"14"}
        }
    },


"Fund":{
"header": "基金",
"showHeader": true,
"open": true,
"display": {
"type": "custom",
"class": "HLFutrueCollapse",
"params": {"list":[
          {"title":"沪深基金","markets":["XSHG.EU","XSHE.EU","XSHG.EM","XSHE.EM"],
           "sortId":"col_price_change_percent",
"enablePulldownRefresh":"YES",
            "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
          {"title":"上交所基金","markets":["XSHG.EU","XSHG.EM"],
            "sortId":"col_price_change_percent",
"enablePulldownRefresh":"YES",
            "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
          {"title":"深交所基金","markets":["XSHE.EU","XSHE.EM"],
            "sortId":"col_price_change_percent",
"enablePulldownRefresh":"YES",
            "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
          {"title":"ETF","markets":["XSHG.EM.ETF","XSHE.EM.ETF"],
            "sortId":"col_price_change_percent",
"enablePulldownRefresh":"YES",
            "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
          {"title":"LOF","markets":["XSHG.EM.LOF","XSHE.EM.LOF"],
            "sortId":"col_price_change_percent",
"enablePulldownRefresh":"YES",
            "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
          {"title":"分级基金","markets":["XSHG.EM.SF","XSHE.EM.SF"],
            "sortId":"col_price_change_percent",
"enablePulldownRefresh":"YES",
            "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]}],
            "showSpecialTags":false
            }
      }
   },
   "NEEQ":{
        "header":"新三板",
        "showHeader":true,
        "open":true,
        "display":{
            "type":"custom",
            "class": "HLFutrueCollapse",
            "params":{
                "list":[
                    {"title":"协议转让",
                    "markets":["NEEQ.XYZR"],
                    "sortId":"col_price_change_percent",
                    "enablePulldownRefresh":"YES",
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
                    {"title":"做市转让",
                    "markets":["NEEQ.ZSZR"],
                    "sortId":"col_price_change_percent",
                    "enablePulldownRefresh":"YES",
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
                    {"title":"两网退市",
                    "markets":["NEEQ.LWTS"],
                    "sortId":"col_price_change_percent",
                    "enablePulldownRefresh":"YES",
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
                    {"title":"其他转让",
                    "markets":["NEEQ.M"],
                    "sortId":"col_price_change_percent",
                    "enablePulldownRefresh":"YES",
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
                    {"title":"股转指数",
                    "markets":["NEEQ.MRI"],
                    "sortId":"col_price_change_percent",
                    "enablePulldownRefresh":"YES",
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]},
                    {"title":"优先股",
                    "markets":["NEEQ.ER"],
                    "sortId":"col_price_change_percent",
                    "enablePulldownRefresh":"YES",
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_NETVALUE", "COL_PREMIUMRATE"]}
                ]
            }
        }
   },

    "CNCategory": {
      "header": "沪深个股",
      "showHeader": true,
      "open": true,
      "display": {
        "type": "custom",
        "class": "HLFutrueCollapse",
        "params": {
          "list": [
            {
              "title": "上证A股",
              "markets": ["XSHG.esa"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
              "enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "上证B股",
              "markets": ["XSHG.esb"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "深证A股",
              "markets": ["XSHE.esa", "XSHE.esa.m"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "深证B股",
              "markets": ["XSHE.esb"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "中小板",
              "markets": ["XSHE.esa.smse"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "创业板",
              "markets": ["XSHE.esa.gem"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            }
          ],
          "showSpecialTags": false
        }
      }
    },

    "IndexCategory": {
      "header": "指数",
      "showHeader": true,
      "open": true,
      "display": {
        "type": "custom",
        "class": "HLFutrueCollapse",
        "params": {
          "list": [
            {
              "title": "上证指数",
              "markets": ["XSHG.mri"],
              "sortId": "col_price_change_percent",
              "specialMarker": "0",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY", "COL_CHANGE_HAND_RATIO", "COL_PRE_CLOSE_PRICE"]
            },
            {
              "title": "深证指数",
              "markets": ["XSHE.mri"],
              "sortId": "col_price_change_percent",
              "specialMarker": "0",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY", "COL_CHANGE_HAND_RATIO", "COL_PRE_CLOSE_PRICE"]
            },
            {
              "title": "中证指数",
              "markets": ["CSI"],
              "sortId": "col_price_change_percent",
              "specialMarker": "0",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY", "COL_CHANGE_HAND_RATIO", "COL_PRE_CLOSE_PRICE"]
            },
            {
              "title": "港股指数",
              "markets": ["XHKG-I"],
              "sortId": "col_price_change_percent",
              "specialMarker": "0",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY", "COL_CHANGE_HAND_RATIO", "COL_PRE_CLOSE_PRICE"]
            }
          ],
          "showSpecialTags": false
        }
      }
    },
    "FutureCategory": {
      "header": "期货",
      "showHeader": true,
      "open": true,
      "display": {
        "type": "custom",
        "class": "HLFutrueCollapse",
        "params": {
          "list": [
            {
              "title": "中金所",
              "markets": ["CFFE"],
              "sortId": "col_total_volume",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
            },
            {
              "title": "上期所",
              "markets": ["XSGE"],
              "sortId": "col_total_volume",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
            },
            {
              "title": "大商所",
              "markets": ["XDCE"],
              "sortId": "col_total_volume",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
            },
            {
              "title": "郑商所",
              "markets": ["XZCE"],
              "sortId": "col_total_volume",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
            }
          ],
          "showSpecialTags": false
        }
      }
    },
    "HKCategory": {
      "header": "港股",
      "showHeader": true,
      "open": true,
      "display": {
        "type": "custom",
        "class": "HLFutrueCollapse",
        "params": {
          "list": [
            {
              "title": "主板",
              "markets": ["XHKG-M.es"],
              "sortId": "col_price_change_percent",
              "specialMarker": "0",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
            },
            {
              "title": "创业板",
              "markets": ["XHKG-G"],
              "sortId": "col_price_change_percent",
              "specialMarker": "0",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
            },
            {
              "title": "港股通",
              "markets": ["XHKG-M.es"],
              "sortId": "col_price_change_percent",
              "specialMarker": "32",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
            },
            {
              "title": "沪股通",
              "markets": ["XSHG.esa", "XSHE.esa", "XSHE.es.smse", "XSHE.es.gem"],
              "sortId": "col_price_change_percent",
              "specialMarker": "16",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
            }
          ],
          "showSpecialTags": false
        }
      }
    },
    "USCategory": {
      "header": "美股",
      "showHeader": true,
      "open": true,
      "display": {
        "type": "custom",
        "class": "HLFutrueCollapse",
        "params": {
          "list": [
            {
              "title": "中概股",
              "markets": ["XSHG.esa","XSHE.esa","XSHE.es.gem","XSHE.es.smse"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "block": {"codeType":"XBUS","stockName":"中概股","stockCode":"2"},
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "知名美股",
              "markets": ["XSHG.esa","XSHE.esa","XSHE.es.gem","XSHE.es.smse"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "block": {"codeType":"XBUS","stockName":"明星股","stockCode":"1"},
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            }
          ],
          "showSpecialTags": false
        }
      }
    },
    "NEEQCategory": {
      "header": "新三板",
      "showHeader": true,
      "open": true,
      "display": {
        "type": "custom",
        "class": "HLFutrueCollapse",
        "params": {
          "list": [
            {
              "title": "协议转让",
              "markets": ["NEEQ.XYZR"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "做市转让",
              "markets": ["NEEQ.ZSZR"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            },
            {
              "title": "两网退市",
              "markets": ["NEEQ.LWTS"],
              "sortId": "col_price_change_percent",
              "orderType":"desc",
"enablePulldownRefresh":"YES",
              "fields": ["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
            }
          ],
          "showSpecialTags": false
        }
      }
    }


}
