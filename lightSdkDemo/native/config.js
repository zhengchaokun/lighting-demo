module.exports = {
    res:{
        logo:"/native/res/icon.png",
        launch:"/native/res/launch.png"
    },
    menuBar:{
        backgroundColor:"",//背景色
        defaultColor:"",//默认菜单颜色
        selectedColor:"",//菜单选中颜色
        //使用字体图标自动生成图片，省去了开发者自己制作多张图的问题
        iconFontFrom:"",
         menus:[{
            view:"index",//当前菜单对应的视图名称，视图必须在views属性中定义
        }]
    },
    navBar:{
        title:"图片选择",
        backgroundColor:"#0AA9F1",
        titleColor:"#ffffff",
        buttonColor:"#ffffff",
    },
    views:{
        "index":{
            url:"app.native.js#/index/chooseImage",
            navBar:{
                title:"图片选择"
            }
        }
    },
    plugins:{
        "about_us":require("./about_us.js"),
        "analytics":require("./analytics.js"),
        "block_rank":require("./block_rank.js"),
        "block_stocks":require("./block_stocks.js"),
        "discovery":require("./discovery.js"),
        "face":require("./face.js"),
        "feedback":require("./feedback.js"),
        "gesture_password":require("./gesture_password.js"),
        "globalquote":require("./globalquote.js"),
        "globalquote_components":require("./globalquote_components.js"),
        "insert_tab":require("./insert_tab.js"),
        "jsnative":require("./jsnative.js"),
        "kline_settings":require("./kline_settings.js"),
        "lightIn_personal_edit":require("./lightIn_personal_edit.js"),
        "lock":require("./lock.js"),
        "login":require("./login.js"),
        "menu_tab":require("./menu_tab.js"),
        "mystock":require("./mystock.js"),
        "nav_menu":require("./nav_menu.js"),
        "navi_tab":require("./navi_tab.js"),
        "push":require("./push.js"),
        "quote_settings":require("./quote_settings.js"),
        "safekeyboard":require("./safekeyboard.js"),
        "scanning":require("./scanning.js"),
        "sct":require("./sct.js"),
        "search":require("./search.js"),
        "settings":require("./settings.js"),
        "share":require("./share.js"),
        "stock_detail":require("./stock_detail.js"),
        "stock_list":require("./stock_list.js"),
        "stock_rank":require("./stock_rank.js"),
        "trade":require("./trade.js"),
        "web_light":require("./web_light.js")
    }
};