module.exports = {
    res:{
        logo:"/native/res/icon.png",
        launch:"/native/res/launch.png"
    },
    //菜单栏设置,若不需要菜单栏只配置一个菜单项即可
    menuBar:{
        backgroundColor:"",//背景色
        defaultColor:"",//默认菜单颜色
        selectedColor:"",//菜单选中颜色
        iconFontFrom:"",//使用字体图标自动生成图片
         menus:[{
            text:'',//菜单的文本
            view:"index",//当前菜单对应的视图名称，视图必须在views属性中定义
            icon:""//菜单图标在字体中的码点,格式为0xabcd
        }]
    },
    statusBar:{
        type:"1"
    },
    //标题栏设置
    navBar:{
        title:"端JS-SDK",
        backgroundColor:"#0AA9F1",
        titleColor:"#ffffff",
        buttonColor:"#ffffff",
        type:"0"
    },
    views:{
        "index":{
            url:"app.native.js#/index", //视图地址
            navBar:{
                title:"端JS-SDK",       //当前视图的导航栏文本
                backgroundColor:"",     //当前视图的标题栏背景色
                titleColor:"",          //当前视图的标题栏文本颜色
                type:"" //当前视图的标题栏类型，可选项：0-不使用标题栏状态栏，1-默认使用标题栏状态栏，2-仅使用状态栏
            }
        },
        "chooseImage":{
            url:"app.native.js#/index/chooseImage", //视图地址
            navBar:{
                title:"图片",       //当前视图的导航栏文本
                backgroundColor:"",     //当前视图的标题栏背景色
                titleColor:"",          //当前视图的标题栏文本颜色
                type:"" //当前视图的标题栏类型，可选项：0-不使用标题栏状态栏，1-默认使用标题栏状态栏，2-仅使用状态栏
            }
        },
        "setClipboardText":{
            url:"app.native.js#/index/setClipboardText", //视图地址
            navBar:{
                title:"复制内容",       //当前视图的导航栏文本
                backgroundColor:"",     //当前视图的标题栏背景色
                titleColor:"",          //当前视图的标题栏文本颜色
                type:"" //当前视图的标题栏类型，可选项：0-不使用标题栏状态栏，1-默认使用标题栏状态栏，2-仅使用状态栏
            }
        }

    },
    plugins:{
        "pay":{},
        "safekeyboard":{},
        "tradekeyboard":require("./tradekeyboard.js"),
        "scanning":{},
        "feedback":{},//反馈组件
        "analytics":require("./analytics.js"), //统计分析
        "lock":require("./lock.js"), //手势指纹
        "login":require("./login.js"),
        "menu_tab":require("./menu_tab.js"),
        "navi_tab":require("./navi_tab.js"),//...
        "push":require("./push.js"),
        "share":require("./share.js"),
        "imageacquisition":require("./imageacquisition.js"), //图片相关功能
        "file":{}
    }
};