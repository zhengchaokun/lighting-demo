;(function () {

    /**
     * 拦截器
     */
    Light.registerInterceptor("view",function (from,to,next) {
        console.log("视图切换拦截器");
        next();
    });
    Light.registerInterceptor("start",function (next) {
        console.log("程序启动拦截器");
        API.loginInfo().then(function () {
            //用户已经登录
            next();
        }).catch(function () {
            //用户未登录
            //TODO: 跳转到用户的登录页面进行用户的登录操作
        });
    });
})();