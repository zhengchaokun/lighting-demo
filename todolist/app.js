import App from "light"

const asyn = import("./lib/asyn.js");

asyn.then(function (m) {
    m.test();
})

App.filter("start",function (next) {
    //启动拦截器
    App.log("启动拦截器");
    next();
}).filter("view",function (from, to, next) {
    //视图拦截器
    App.log(from)
    App.log(to)
    App.log("视图跳转");
    next()
}).start();