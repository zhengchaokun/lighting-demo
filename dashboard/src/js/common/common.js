;(function () {
    Light.logger = new Light.Logger({
        level:config.log_level
    });

    /**
     * 拦截器
     */
    Light.registerInterceptor("view",function (from,to,next) {
        Light.logger.info("视图切换拦截器");
        next();
    });
    Light.registerInterceptor("start",function (next) {
        Light.logger.info("程序启动拦截器");
        API.loginInfo().then(function () {
            //用户已经登录
            next();
        }).catch(function () {
            //用户未登录
            //TODO: 跳转到用户的登录页面进行用户的登录操作
        });
    });

    /**
     * 全局loading
     * load事件代表页面加载完毕
     * DOMContentLoaded代表dom树构建完成
     */
    window.addEventListener("load", function() {
        // console.log("load")
    }, false);
})();