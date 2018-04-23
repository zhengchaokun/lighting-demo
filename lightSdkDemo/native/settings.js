module.exports = {
    "inputParams": {
        "title": "我"
    },
    "navigationbar": {
        "show": true
    },
    "menu": {
        "show": true
    },
    "style": {
        "backgroundColor": "#f3f3f3",
        "tableCellBackgroundColor": "#ffffff",
        "nickNameTextColor":"@textColor1",
        "contentTextColor":"@textColor3"
    },
    "config": {
        "menus":[
            [
                {
                    "title":"设置",
                    "icon":"setting",
                    "action":"gmu://quote_settings"
                },
                {
                    "title":"k线指标设置",
                    "icon":"setting",
                    "action":"gmu://mystock"
                }
            ],
            [
                {
                    "title":"关于",
                    "icon":"about_us",
"action":"gmu://jsnative#test"
                }
            ]
        ]
    }
}
