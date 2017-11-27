<!-- Created by 徐成豪 2017.5.19 -->

<template>
	<scroller style="background-color: #f8f8ff">
		<collapseview title="基金" rightTitle="">
			<div class="container">
			<div class="typeRow" v-for="row in fundList">
				<div style="flex: 1;flex-direction: row;" v-for="item in row"><div class="typeItem" v-if="item != ''" @click="itemonclick(item)"><text class="typeName" :value="item.title"></text></div></div>
			</div>
			</div>
		</collapseview>
		<collapseview title="新三板" rightTitle="">
			<div class="container">
			<div class="typeRow" v-for="row in neeqList">
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
		font-size: 26;
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
				fundList: [
					[
						{"title":"沪深基金","markets":"XSHG.EU,XSHE.EU,XSHG.EM,XSHE.EM"},
			          	{"title":"上交所基金","markets":"XSHG.EU,XSHG.EM"},
			          	{"title":"深交所基金","markets":"XSHE.EU,XSHE.EM"},
        			],
        			[
			            {"title":"ETF","markets":"XSHG.EM.ETF,XSHE.EM.ETF"},
			          	{"title":"LOF","markets":"XSHG.EM.LOF,XSHE.EM.LOF"},
			          	{"title":"分级基金","markets":"XSHG.EM.SF,XSHE.EM.SF"}
        			]
				],
				neeqList: [
					[
						{"title":"协议转让","markets":"NEEQ.XYZR"},
			            {"title":"做市转让","markets":"NEEQ.ZSZR"},
			            {"title":"两网退市","markets":"NEEQ.LWTS"}
        			],
        			[
			            {"title":"其他转让","markets":"NEEQ.M"},
			            {"title":"股转指数","markets":"NEEQ.MRI"},
			            {"title":"优先股","markets":"NEEQ.ER"}
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
				event.openURL(this.baseUrl + "stockrank.js?markets_params=" + encodeURIComponent(JSON.stringify(params)) + "&fields=" + this.fields);
			}
		},
		created: function() {
			this.baseUrl = getBaseURL(this);
		}
	}
</script>
