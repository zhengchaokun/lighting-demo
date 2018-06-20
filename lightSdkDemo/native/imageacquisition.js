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
				"stockInfoColor":"@textColor1",
                "headerTextColor":"#666666",
                "tabViewBackgroundColor":"#f8f8f8",
                "stockTagsStyle":{
                    "borderColor":"#ff6c00",
                    "backgroundColor":"#000000",
                    "textColor":"#ff6c00",
                    "tabViewSelectedTextColor":"#EA3535"
                }

		},
		"config": {
            "subViews": [
                {
					"id":"selfstock",
                    "name": "自选",
                    "scrollEnable":"NO",
                    "collapses": ["MyStocks"]
                },
				{
					"id":"cnstock",
					"name": "沪深",
					"collapses": ["CNIndex", "CNBlocks", "CNRiseList","CNFallList", "CNTurnoverList"]
				},
				{
					"id":"usstock",
					"name": "美股",
					"collapses": ["USHotChinaStocks","USFamousStocks","USChinaStocks"]
				},
				{
					"id":"hkstock",
					"name": "港股",
					"collapses": ["HKIndex","HKBlocks","HKRiseList", "HKFallList", "HKTurnoverList"]
				},
				{
					"id":"future",
					"name": "期货",
					"collapses": ["FutureIndex", "FinancialFutures", "XSGEFutures","XDCEFutures","XZCEFutures"]
				},
				{
					"id":"future",
					"name": "香港收藏品",
					"collapses": ["YYHCJSRiseList"]
				},
                {
					"id":"other",
					"name":"其他",
                    "collapses":["Fund"]
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
            }
        ]

}
