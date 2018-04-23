module.exports = {
		"inputParams": {
            "title":"行情"
		},
		"outputParam": [

		],
		"navigationbar": {
				"show":true,
                "right_item": {
                "icon": "search",
                "action": "gmu://search"
                }
		},
		"menu": {
				"show": true
		},
		"style": {
                "HGTNameColor":"#999999",
                "HGTValumeColor":"#333333",
                "stockInfoColor":"#666666",
                "headerTextColor":"#333333",
                "tabViewBackgroundColor":"#f8f8f8",
                "stockTagsStyle":{
                    "borderColor":"#ff6c00",
                    "backgroundColor":"#00000000",
                    "textColor":"#ff6c00",
                    "tabViewSelectedTextColor":"#EA3535"
                },
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
		"config": {
			    "subViews": [
										  {
											"name": "沪深",
											"collapses": ["CNIndex", "CNBlocks", "CNRiseList","CNFallList", "CNTurnoverList"]
										  },
										  {
											"name": "美股",
											"collapses": ["USHotChinaStocks","USFamousStocks","USChinaStocks"]
										  },
										  {
											"name": "港股",
											"collapses": ["HKIndex","HKBlocks","HKRiseList", "HKFallList", "HKTurnoverList"]
										  },
										  {
											"name": "期货",
											"collapses": ["FutureIndex", "FinancialFutures", "XSGEFutures","XDCEFutures","XZCEFutures"]
										  },
                                          {
                                            "name":"其他",
                                            "collapses":["Fund","NEEQ"]
                                          }
					]
		},
        "pages":[
            {
                "pageid":"hgtpage",
                "inputParams":{
                    "title":"沪港通专题"
                },
                "navigationbar": {
                    "right_item": {
                    }
                },
                "menu": {
                    "show": false
                },
                "config":{
                		"subViews":[
                			{
                				"name": "沪港通专题",
								"collapses": ["HGTBALANCE","SH2HK","HK2SH"]
							}
                		]
                }
            },
            {
                "pageid":"sgtpage",
                 "inputParams":{
                     "title":"深港通专题"
                 },
                 "navigationbar": {
                     "right_item": {
                     }
                 },
                 "menu": {
                     "show": false
                 },
                 "config":{
                     "subViews":[
                         {
                             "name": "深港通专题",
                             "collapses": ["SGTBALANCE","SS2HK","HK2SS"]
                         }
                     ]
                 }
            }
        ]

}
