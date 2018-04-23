module.exports = {	
	"inputParams": {
		"title": "自选股"
	  },
	  "outputParam": [
	  ],
	  "navigationbar": {
		"show": true,
        "right_item": {
            "icon": "search",
            "action": "gmu://search"
        }
	  },
	  "menu": {
		"show": true
	  },
	  "style": {
        "loginButtonColor":"@mainColor",
		"thirdTextColor":"@textColor1",
        "stockTagsStyle":{
            "borderColor":"#ff6c00",
            "backgroundColor":"#00000000",
            "textColor":"#ff6c00"
},"thirdLabelCornerRadius":4

	},

  	"config":{
        "enableDog": false,
        "showMarketTags":true,
        "showSpecialTags":true,
        "indexSubViews":[{"stockCode":"1A0001","alias":"上证","codeType":"XSHG.mri"},{"stockCode":"2A01","alias":"深证","codeType":"XSHE.mri"},{"stockCode":"399006","alias":"创业板","codeType":"XSHE.mri"}],
		"thirdColumnIds":["COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_CHANGE_HAND_RATIO", "COL_MARKET_VALUE"],
"filters":[{"title":"沪深", "markets":["XSHG","XSHE"]},{"title":"美股", "markets":["XNAS","XASE","XNYS"]}, {"title":"港股", "markets":["XHKG"]}, {"title":"期货", "markets":["CCFX","XSGE","XDCE","XZCE"]},{"title":"其他", "markets":["XBHS","XBHK","XBUS","NEEQ","CSI"]}]
	}
}
