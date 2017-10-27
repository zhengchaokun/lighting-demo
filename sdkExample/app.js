import App from "light"
require("./js/px2rem");
require("./js/gmuSDK");
require("./app.less");
App.filter("start",function (next) {
    //启动拦截器
    // App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    // App.log(`view changed:${from.path}--${to.path}`);
    next()
})

if(navigator.userAgent.indexOf("fwv")!=-1){
    document.addEventListener("deviceready",function(){
        App.start();
    })
}else{
    App.start();
}