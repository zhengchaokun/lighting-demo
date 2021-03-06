module.exports = {	
	  "inputParams": {},
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
        "headerTextColor":"#666666",
        "tabViewBackgroundColor":"#ffffff"
	},

    "config":{
        "views":[
            {
                "name":"热门",
                "sortId":"col_price_change_percent",
                "orderType":"desc",
                "markets":["XBHS.HY","XBHS.GN"],
                 "fields":["col_price_change_percent","col_riseLeadStock","col_riseLeadStock_Price_change_percent","COL_PRICE_CHANGE","COL_NEW_PRICE","COL_OPEN_PRICE","COL_HIGH_PRICE","COL_LOW_PRICE","COL_TOTAL_VOLUME","COL_TOTAL_MONEY"]
            },
            {
                "name":"行业",
                "sortId":"col_price_change_percent",
                "orderType":"desc",
                "markets":["XBHS.HY"],
                 "fields":["col_price_change_percent","COL_riseLeadStock","COL_riseLeadStock_price_change_percent","COL_PRICE_CHANGE","COL_NEW_PRICE","COL_OPEN_PRICE","COL_HIGH_PRICE","COL_LOW_PRICE","COL_TOTAL_VOLUME","COL_TOTAL_MONEY"]
            },
            {
                "name":"概念",
                "sortId":"col_price_change_percent",
                "orderType":"desc",
                "markets":["XBHS.GN"],
                 "fields":["col_price_change_percent","COL_riseLeadStock","COL_riseLeadStock_price_change_percent","COL_PRICE_CHANGE","COL_NEW_PRICE","COL_OPEN_PRICE","COL_HIGH_PRICE","COL_LOW_PRICE","COL_TOTAL_VOLUME","COL_TOTAL_MONEY"]
            },
            {
                "name":"地域",
                "sortId":"col_price_change_percent",
                "orderType":"desc",
                "markets":["XBHS.DY"],
                 "fields":["col_price_change_percent","COL_riseLeadStock","COL_riseLeadStock_price_change_percent","COL_PRICE_CHANGE","COL_NEW_PRICE","COL_OPEN_PRICE","COL_HIGH_PRICE","COL_LOW_PRICE","COL_TOTAL_VOLUME","COL_TOTAL_MONEY"]
            }
        ]
    }
}
