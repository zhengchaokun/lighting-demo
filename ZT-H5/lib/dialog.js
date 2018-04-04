const uiAlert = require("./dialog/alert.vue");
const uiConfirm = require("./dialog/confirm.vue");

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
    },
    confirm:function (options) {
        const dom = `
            <div>
                <ui-confirm :msg="'${options.msg}'" :vertical="'${options.vertical}'" :text-left="'${options.textLeft}'" :confirm-text="'${options.confirmText}'" :cancel-text="'${options.cancelText}'"  @confirm="confirm" @cancel="cancel"></ui-confirm>
            </div>
        `;
        const wrap = document.createElement("div");
        wrap.innerHTML = dom;
        document.body.appendChild(wrap);
        const alert = new Vue({
            el:wrap,
            components:{
                uiConfirm
            },
            methods:{
                confirm(){
                    if(options.confirm){
                        if(options.confirm()){
                            alert.$el.remove();
                        }
                    }else{
                        alert.$el.remove();
                    }
                },
                cancel(){
                    if(options.cancel)options.cancel();
                    alert.$el.remove();
                }
            }
        });
    }
};