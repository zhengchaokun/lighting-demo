import App from "light"

require("./lib/px2rem");
require("./app.less");

App.Vue.mixin({
    methods:{
        jump(){
            App.navigate.call(App,...arguments)
        }
    }
})

App.filter("start",function (next) {
    //启动拦截器
    App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    App.log(`view changed:${from.path}--${to.path}`);
    next()
}).start();