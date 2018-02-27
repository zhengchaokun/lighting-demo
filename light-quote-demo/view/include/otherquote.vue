<!-- Created by 徐成豪 2017.5.19 -->

<template>
	<scroller style="background-color: #F9F4EA">
	    <collapseview title="沪深个股" rightTitle="">
        			<div class="container">
        			<div class="typeRow" v-for="row in cnList">
        				<div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
        			</div>
        			</div>
        </collapseview>
        <collapseview title="指数" rightTitle="">
                    <div class="container">
                    <div class="typeRow" v-for="row in indexList">
                        <div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
                    </div>
                    </div>
        </collapseview>
		<collapseview title="期货" rightTitle="">
                    <div class="container">
                    <div class="typeRow" v-for="row in furtureList">
                        <div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
                    </div>
                    </div>
        </collapseview>
        <collapseview title="港股" rightTitle="">
                    <div class="container">
                    <div class="typeRow" v-for="row in HKList">
                        <div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
                    </div>
                    </div>
        </collapseview>
	</scroller>
</template>

<style>
	.typeRow {
		flex-direction: row;
		margin-left: 15;
		margin-right: 15;
	}
	.typeItem {
		flex: 1;
		justify-content: center;
		align-items: center;
		border-width: 1;
		border-color: #ccc;
		border-radius: 5;
		margin: 15;
	}
	.typeName {
		font-size: 28;
		color: #666;
		margin: 20;
	}
</style>

<script>
	var animation = weex.requireModule('animation');
  	var event = weex.requireModule('event');
 	var getBaseURL = require('./base-url.js').getBaseURL;
	module.exports = {
		data: function() {
			return {
                baseUrl: "",
                cnList: [
                    [
                        {"title":"上证A股","markets":"XSHG.ESA,XSHG.ESA.M"},
                        {"title":"上证B股","markets":"XSHG.ESB"},
                        {"title":"深圳A股","markets":"XSHE.ESA,XSHE.ESA.M"},
                    ],
                    [
                        {"title":"深圳B股","markets":"XSHE.ESB"},
                        {"title":"中小板块","markets":"XSHE.ESA.smse"},
                        {"title":"创业板块","markets":"XSHE.ESA.GEM"}
                    ]
                ],
                indexList: [
                    [
                        {"title":"上证指数","markets":"XSHG.MRI"},
                        {"title":"深证指数","markets":"XSHE.MRI"},
                        {"title":"中证指数","markets":"CSI"},
                    ],
                    [
                        {"title":"港股指数","markets":"XHKG-I"},
                        "",
                        ""
                    ]
                ],
				furtureList: [
                    [
                        {"title":"中金所","markets":"CCFX"},
                        {"title":"上期所","markets":"XSGE"},
                        {"title":"大商所","markets":"XDCE"},
                    ],
                    [
                        {"title":"郑商所","markets":"XZCE"},
                        "",
                        ""
                    ]
                ],
                HKList: [
                    [
                        {"title":"主板","markets":"XHKG-M.ES"},
                        {"title":"创业板","markets":"XHKG-G"},
                        {"title":"港股通","markets":"XHKG-M.ES"},
                    ],
                    [
                        {"title":"沪股通","markets":"XSHG.ESA,XSHE.ESA,XSHE.ES.SMSE,XSHE.ES.GEM"},
                        "",
                        ""
                    ]
                ],
				fields: "prod_name,hq_type_code,last_px,px_change_rate,px_change,business_amount,iopv,premium_rate,shares_per_hand",
			}
		},
		components: {
			collapseview: require("./collapseview.vue"),
		},
		methods: {
			itemonclick: function(params) {
				event.openURL(this.baseUrl + "app.native.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields + "#/stockrank");
			}
		},
		created: function() {
			this.baseUrl = getBaseURL(this);
		}
	}
</script>
