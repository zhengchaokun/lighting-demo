import Light from "light"

Light.filter("start",function (next) {
    //启动拦截器
    console.log("启动拦截器");
    next();
}).filter("view",function (from, to, next) {
    //视图拦截器
    console.log(from)
    console.log(to)
    console.log("视图跳转");
    next()
}).start();