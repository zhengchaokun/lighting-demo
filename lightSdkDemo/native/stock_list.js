module.exports = {	
	  "inputParams": {
            "title":"持仓测试页",
            "stocks":[{"stockCode":"1A0001","codeType":"XSHG.mri"},{"stockCode":"2A01","codeType":"XSHE.mri"},{"stockCode":"600570","codeType":"XSHG"}]
        },
	  "outputParam":[],
	  "navigationbar": {
		"show": true,
        "right_item": {
            "icon": "search",
            "action": "gmu://search"
        }
	  },
	  "menu": {
		"show": false
	  },
	  "style": {
	  },

  	"config":{
                "displayFields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_CHANGE_HAND_RATIO", "COL_MARKET_VALUE"]
    },
	"pages":[
            ]

}
