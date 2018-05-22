const uiTips = require("./dialog/tips.vue");
import light from 'light'
import Vue from "vue"
module.exports = {
	tips: function (msg) {
		
		const dom = `
            <div>
                <ui-tips :msg="'${msg}'"></ui-tips>
            </div>
        `;
		
		var wrap = document.createElement('div');
		wrap.innerHTML = dom;
		
		document.body.appendChild(wrap);
		const alert = new Vue({
			el: wrap,
			components: {
				uiTips
			}
		});
		setTimeout(function () {
			alert.$el.remove();
		}, 1500)
	}
	
};