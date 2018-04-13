module.exports = {
    "pages":[
            {
                "pageid":"homepage",
                "config":{
                    "tab": [
{
"title":"jsN行情",
"action":"gmu://jsnative#quote",
},
{
"title":"jsN自选股",
"action":"gmu://jsnative#mystock",
},
{
"title":"自选股",
"action":"gmu://mystock",
},

                        {
                            "title": "native行情",
                            "action": "gmu://globalquote"
                        },
{
"title": "设置",
"action": "gmu://settings"
}
                    ]
                }
            },
            {
                "pageid":"mutiTabPage",
                "config":{
"tab": [
{
"title": "tab1",
"action": "gmu://decision_settings",
"icon":"menu_3",
"sel_icon":"menu_3_sel"
},
{
"title": "tab2",
"action": "gmu://history_flag"
},
{
"title": "tab3",
"action": "gmu://settings"
}
]
}
}
    ]
}
