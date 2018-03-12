const uiAlert = require("./dialog/alert.vue");

import Vue from "vue"

module.exports = {
    alert:function (msg,cb) {
        const dom = `
            <div>
                <ui-alert :msg="'${msg}'"></ui-alert>
            </div>
        `;
        const wrap = document.createElement("div");
        wrap.innerHTML = dom;
        document.body.appendChild(wrap);
        const alert = new Vue({
            el:wrap,
            components:{
                uiAlert
            }
        });
        setTimeout(function () {
            alert.$el.remove();
            if(cb) cb();
        },1500)
    }
};