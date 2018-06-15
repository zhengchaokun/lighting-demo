module.exports = {
    "pages": [
        {
            "pageid": "nav",
            "inputParams": {
                "title": "测试导航",
            },
            "style":{
                "head":{
                    "tintColor":"",
                    "textColor":"",
                    "selectedTextColor":""
                }
            },
            "config": {
                "tab":[
                        {
                            "title":"图片",
                            "action":"gmu://jsnative#chooseImage"
                        },
                        {
                            "title":"复制",
                            "action":"gmu://jsnative#setClipboardText"
                        },
                        {
                            "title":"首页",
                            "action":"gmu://jsnative#index"
                        }
                ]
            }
        }
    ]
}
