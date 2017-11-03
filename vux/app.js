import App from "light"
import Vuex from 'vuex'

let Vue = App.Vue;
Vue.use(Vuex)


const store2 = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
});

Vue.prototype.$store = store2;

Vue.prototype.$t = function (key) {
    // console.log(this)
    if(window.__I18N_MAP&&window.__I18N_MAP[key]&&window.__I18N_MAP[key][navigator.language]){
        return window.__I18N_MAP[key][navigator.language];
    }else{
        return key;
    }
};

require("./lib/vux")
require("./lib/vux.css")

// plugins
let { vuxLocalePlugin, vuxDevicePlugin, vuxToastPlugin, vuxAlertPlugin, vuxConfirmPlugin, vuxLoadingPlugin, vuxWechatPlugin, vuxAjaxPlugin, vuxAppPlugin } = vux;
Vue.use(vuxDevicePlugin)
Vue.use(vuxToastPlugin)
Vue.use(vuxAlertPlugin)
Vue.use(vuxConfirmPlugin)
Vue.use(vuxLoadingPlugin)
Vue.use(vuxWechatPlugin)
Vue.use(vuxAjaxPlugin)
Vue.use(vuxLocalePlugin)


App.filter("start",function (next) {
    //启动拦截器
    App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    App.log(`view changed:${from.path}--${to.path}`);
    next()
}).start();