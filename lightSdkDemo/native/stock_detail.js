module.exports = {	
	"inputParams": {
	  },
	  "outputParam": [
	  ],
	  "navigationbar": {
		"show": true
	  },
	  "menu": {
		"show": false
	  },
	  "style": {
                "tabViewBackgroundColor":"#ffffff",
                "stockFieldNameColor":"#999999",
                "stockFieldValueColor":"#333333",
                "newsTitleColor":"@textColor1",
            	"newsTimeColor":"@textColor2",
                "infoBackgroundColor":"#f4f4f4",
            	"infoTextColor":"@textColor2",
                "infoTipsColor":"@textColor3",
                "offerListBackgroundColor":"#f3feff",
                "offerListHighlightColor":"#ddf2e8",
                "bidListBackgroundColor":"#fff7f0",
                "bidListHighlightColor":"#ffebd8",
                "tabViewSelectedLineColor":"#FA5D5D",
                "tabViewSelectedTextColor":"#FA5D5D",
                "stockTagsStyle":{
                    "borderColor":"#ffffff",
                    "backgroundColor":"#00000000",
                    "textColor":"#ffffff"
                },
                "tabMenuStyle":"underline",
                "listStockNameFont":{
                    "size":"16"
                },
                "bottomMenuBackgroundColor":"#999999",
                "bottomMenuTextColor":"#ffffff",
                "bottomMenuSeperatorLineColor":"#ffffff",
"listStockCodeFont":{
"size":"10"
},
"listStockPriceFont":{
"size":"17"
},
"listThirdColumnFont":{
"size":"16"
}
      },

  	"config":{
		"reportForm":[
			{
				"markets":["XSHG.mri", "XSHE.mri"],
				"fields":["OpenPrice","HighPrice","RiseCount","TOTALMONEY","LowPrice","FallCount","PREVCLOSEPRICE","VOLUME","AMPLITUDE","STABLECOUNT","TOTALCOUNT"]
			},
            {
                "markets":["XHKG-I"],
                "fields":["OpenPrice","HighPrice","RiseCount","TOTALMONEY","LowPrice","FallCount","PREVCLOSEPRICE","VOLUME","AMPLITUDE","STABLECOUNT","TOTALCOUNT"]
            },
            {
				"markets":["XNAS", "XNAS.mri","XNAS.eu","XNAS.es","XASE","XASE.mri","XASE.eu","XASE.es","XNYS","XNYS.mri","XNYS.eu","XNYS.es"],
				"fields":["OpenPrice","HIGHPRICE","TURNOVERRATE","TOTALMONEY","LOWPRICE","VOLUMERATIO","PREVCLOSEPRICE","INSIDE","PE","VOLUME","52WEEKHIGH","AMPLITUDE","OUTSIDE","PB","TOTALVALUE","52WEEKLOW"]
			},
			{
				"markets":["CCFX","XSGE","XDCE","XZCE","XFCC"],
				"fields":["OpenPrice","HighPrice","AMOUNT","Volume","LowPrice","AmountDelta","PREVCLOSEPRICE","AMPLITUDE","Inside","TOTALMONEY","HIGHLIMIT","PREVSETTLEMENT","AVGPRICE","Outside","VOLUMERATIO","LOWLIMIT"]
			},
            {
                "markets":["XSHG.EM","XSHG.EU","XSHE.EM","XSHE.EU"],
                "fields":["OpenPrice","HighPrice","IOPV","VOLUME","LowPrice","PREMIUMRATE"]
            }
		],
		"quoteChart":[
            {
                "markets":["XSHG","XSHE", "XSGE", "XDCE", "XZCE", "CFFE", "XHKG-I", "XHKG-M", "XHKG-G", "CCFX", "CSI", "NEEQ", "XNAS", "XASE", "XNYS"],
                "chart":["TRENDLINE", "TRENDLINE5DAY", "KLINEDAY", "KLINEWEEK", "KLINEMONTH"],
                "extraTitle":"分钟",
                "extraChart":["KLINE1MIN","KLINE5MIN", "KLINE15MIN", "KLINE30MIN", "KLINE60MIN"]
            },
            {
                "markets":["XSHG.EU","XSHE.EU","XSHG.EM","XSHE.EM"],
                "chart":["TRENDLINE","NETVALUE","KLINEDAY","KLINEWEEK","KLINEMONTH"],
                "extraTitle":"分钟",
                "extraChart":["KLINE1MIN","KLINE5MIN", "KLINE15MIN", "KLINE30MIN", "KLINE60MIN"]
            }
		],

    "bottomMenu":[
        {
            "market":["XSHG.MRI"],
            "menus": [{
                "type":"custom",
                "title":"论股",
                "icon":"forms",
                "action":"https://www.baidu.com"
            }]
        },
        {
            "market":["XSHG"],
            "menus": [{
                "type":"custom",
                "title":"买入",
                "icon":"forms",
                "action":"https://www.baidu.com"
            },
            {
                "type":"custom",
                "title":"卖出",
                "icon":"forms",
                "action":"https://www.baidu.com"
            },
            {
            "type":"custom",
            "title":"论股",
            "icon":"forms",
            "action":"https://www.baidu.com"
            }]
        }
    ],
     "stockInfo": [
            {
                "markets": [
                    "XSHG.mri",
                    "XSHE.mri"
                ],
                "type": "custom",
                "info": [
                    "riselist",
                    "falllist"
                ]
            },
            {
                "markets": [
                    "XBHS",
                    "XBHK"
                ],
                "type": "custom",
                "info": [
                    "riselist",
                    "falllist"
                ]
            },
            {
                "markets": [
                    "XHKG-M",
                    "XHKG-G",
                    "XHKG-N",
                    "XHKG-E"
                ],
                "type": "custom",
                "info": [
                    "faisnews",
                    "faisnotice",
                    "faisreport",
                    "faisf10"
                ]
            },
            {
                "markets": [
                    "CCFX",
                    "XSGE",
                    "XDCE",
                    "XZCE",
                    "XFCC"
                ],
                "type": "custom",
                "info": [
                    "futureinfo"
                ]
            },
            {
                "markets": [
                    "XSHG.d",
                    "XSHE.d",
                    "XHKG-M.db"
                ],
                "type": "custom",
                "info": [
                    "bondinfo"
                ]
            },
            {
                "markets": [
                    "XSHG.eu",
                    "XSHE.eu",
                    "XSHG.em",
                    "XSHE.em"
                ],
                "type": "custom",
                "info": [
                    "faisfundnotice",
                    "faisfundf10"
                ]
            },
            {
                "markets": [
                    "XSHG",
                    "XSHE"
                ],
                "type": "custom",
                "info": [
                    "news",
                    "fundflow",
                    "notice",
                    "report",
                    "faisf10"
                ]
            },
            {
                "markets": [
                    "NEEQ"
                ],
                "type":"none"
            }
        ],
		"showStockFundFlow":false,
		"enableQuoteReportDetail":true,
		"enableSocialShare":true,
        "isHiddenAddStockBtn":false,
        "useLocalTimezone":true
	}
}
