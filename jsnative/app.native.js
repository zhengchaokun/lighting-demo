import App from "light"
import Container from "./view/App.vue"
import Vue from "vue"

// require("./app.less");

App.filter("start",function (next) {
    //启动拦截器
    App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    App.log(`view changed:${from.path}--${to.path}`);
    next()
}).start(Vue.util.extend({ el: '#root'}, Container),function (router) {
    router.push('/')
});