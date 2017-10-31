import App from "light"
import Vue from 'vue'
import weex from 'weex-vue-render'
window.weex = weex;
weex.init(Vue)

// require("./lib/px2rem");
// require("./app.less");

App.filter("start",function (next) {
    //启动拦截器
    App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    App.log(`view changed:${from.path}--${to.path}`);
    next()
}).start();