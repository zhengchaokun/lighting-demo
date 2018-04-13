module.exports = {
    "inputParams": {
    },
    "navigationbar": {
        "show": true
    },
    "menu": {
        "show": false
    },
    "style": {
    },
    "pages": [
        {
            "pageid": "test",
            "inputParams": {
                "title": "测试导航",
            },
            "config": {
                "menus":[
                    [
                        {
                            "title":"问题反馈",
                            "icon":"feedback",
                            "action":"gmu://feedback"
                        }
                    ],
                    [
                        {
                            "title":"推荐",
                            "icon":"promote",
                            "action":"gmu://promotepage"
                        },
                        {
                            "title":"设置",
                            "icon":"setting",
                            "action":"gmu://quote_settings"
                        }
                    ],
                    [
                        {
                            "title":"关于",
                            "icon":"about_us",
                            "action":"gmu://about_us"
                        },
                        {
                            "title":"更多级导航测试",
                            "icon":"about_us",
                            "action":"gmu://nav_menu#test"
                        }
                    ]
                ]
            }
        }
    ]
}
