import App from "light"

require("./app.less");
const ligui = require('ligui/lib/index.js');
App.Vue.use(ligui);
const chart = require("ligui/lib/utils/charts.js");
App.Vue.use(chart);

App.filter("start",function (next) {
    //启动拦截器
    App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    App.log(`view changed:${from.path}--${to.path}`);
    next()
}).start();