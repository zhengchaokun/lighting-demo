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
        "stockTagsStyle":{
            "borderColor":"#ff6c00",
            "backgroundColor":"#00000000",
            "textColor":"#ff6c00"
        },
        "headerDisabledTextColor":"#999999",
        "headerHighlightTextColor":"#e81f1f",
        "thirdLabelCornerRadius":4,
        "tabViewBackgroundColor":"#F8F8F8",
        "tabViewTextColor":"#666666",
        "tabMenuStyle":"underline"
    },
    "config":{
        "views":[
            {
                "sortId":"col_price_change_percent",
                "orderType":"desc",
                "markets":["XSHG.esa","XSHE.esa","XSHE.es.gem","XSHE.es.smse"],
                "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
            }
        ]
    },
    "pages":[
        {
            "pageid":"usrank",
            "config":{
                "views":[
                    {
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHG.esa","XSHE.esa","XSHE.es.gem","XSHE.es.smse"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME"]
                    }
                ]
            }
        },
        {
            "pageid":"hsrank",
            "inputParams": {
                "title": "分类排名"
            },
            "config":{
                "showSpecialTags":true,
                "views":[
                    {
                        "name":"沪深A股",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHG.esa","XSHE.esa","XSHE.es.gem","XSHE.es.smse"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    },
                    {
                        "name":"上证指数",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHG.mri"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    },
                    {
                        "name":"上证A股",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHG.esa"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    },
                    {
                        "name":"深证指数",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHE.mri"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    },
                    {
                        "name":"深证A股",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHE.esa"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    },
                    {
                        "name":"创业板",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHE.esa.gem"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    },
                    {
                        "name":"中小板",
                        "sortId":"col_price_change_percent",
                        "orderType":"desc",
                        "markets":["XSHE.esa.smse"],
                        "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_TOTAL_MONEY","COL_CHANGE_HAND_RATIO","COL_PRE_CLOSE_PRICE"]
                    }
                ]
            }
        },
        {
            "pageid":"zjfuturerank",
            "inputParams": {
                "title": "中金所"
                },
            "config":{
                "showSpecialTags":true,
                "views":[
{
"name":"沪深300",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["CCFX.FF.INDEX.HS300"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
                    {
                        "name":"中证500",
                    "sortId":"col_total_volume",
                    "orderType":"desc",
                    "markets":["CCFX.FF.INDEX.ZZ500"],
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
                    },
                    {
                    "name":"上证50",
                    "sortId":"col_price_change_percent",
                    "orderType":"desc",
                    "markets":["CCFX.FF.INDEX.SZ50"],
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
                    },
                    {
                    "name":"国债期货",
                    "sortId":"col_price_change_percent",
                    "orderType":"desc",
                    "markets":["CCFX.FF.DEBT"],
                    "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
                    }]
            }
        },
        {
            "pageid":"sqfuturerank",
            "inputParams": {
            "title": "上期所"
            },
            "config":{
            "showSpecialTags":true,
            "views":[
{
"name":"螺纹钢",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.REBAR"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME",  "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"沥青",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.PITCH"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"白银",
"sortId":"col_total_volume",
"orderType":"desc",
"markets":["XSGE.FC.SILVER"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"镍锡",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.NISN"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"黄金",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.GOLD"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"铜铝锌铅",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.METAL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"橡胶",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.RUBBER"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"热轧卷板",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.COIL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"燃油",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XSGE.FC.FUEL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
                {
                "name":"线材",
                "sortId":"col_total_volume",
                "orderType":"desc",
                "markets":["XSGE.FC.WIRE"],
                "fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
                }
]
            }
        }
,
{
"pageid":"dsfuturerank",
"inputParams": {
"title": "大商所"
},
"config":{
"showSpecialTags":true,
"views":[
{
"name":"玉米",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.CORN"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"豆类",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.BEAN"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"铁矿石",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.INRU"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"玉米淀粉",
"sortId":"col_total_volume",
"orderType":"desc",
"markets":["XDCE.FC.STARCH"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"豆油",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.BOIL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"棕榈油",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.PALM"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME",  "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"石化期货",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.PETR"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"焦煤",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.COAL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"鸡蛋",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.EGG"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"焦炭",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XDCE.FC.COKE"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"板材",
"sortId":"col_total_volume",
"orderType":"desc",
"markets":["XDCE.FC.SLAB"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
}
]
}
}
,
{
"pageid":"zsfuturerank",
"inputParams": {
"title": "郑商所"
},
"config":{
"showSpecialTags":true,
"views":[
{
"name":"PTA",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.PTA"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"菜粕菜油",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.MEAL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"白糖",
"sortId":"col_total_volume",
"orderType":"desc",
"markets":["XZCE.FC.SUGAR"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"甲醇",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.MA"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"棉花",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.COTTON"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"玻璃",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.GLASS"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"动力煤",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.STEAMCOAL","XZCE.FC.COAL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"小麦",
"sortId":"col_total_volume",
"orderType":"desc",
"markets":["XZCE.FC.WHEAT"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"硅铁硅锰",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.METAL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"籼稻粳稻",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.RICE"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME",  "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
},
{
"name":"菜籽",
"sortId":"col_price_change_percent",
"orderType":"desc",
"markets":["XZCE.FC.RAPOIL"],
"fields":["COL_NEW_PRICE", "COL_PRICE_CHANGE_PERCENT", "COL_PRICE_CHANGE", "COL_TOTAL_VOLUME", "COL_FUTURESAMOUNT", "COL_FUTURESAMOUNTDELTA"]
}
]
}
}
    ]
}
