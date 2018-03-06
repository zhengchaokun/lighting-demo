var config = {
	token: '82B0FFC7148144A0BF83FA69BA1AE0AF20180305183422B7E451A8',
	openApiUrl: 'https://open.hscloud.cn'
};
var stream;
const util = require("./utils");

stream = (typeof weex !== 'undefined' && weex.requireModule) ? (weex.requireModule('stream')) : (__weex_require__('weex-module/stream'));

var dataCenter = {
	/*获取快照列表数据*/
	getRealtimeList: function(params, callback) {
		/*
		en_prod_code:600570.SS
		fields :prod_name,last_px,px_change,px_change_rate,hq_type_code
		*/
		//默认请求所有字段
		var allfields = "prod_name,bid_grp,offer_grp,open_px,high_px,low_px,last_px,preclose_px,business_balance,business_amount,w52_low_px,w52_high_px,px_change,gamma_index,delta_index,px_change_rate,amount,amount_delta,entrust_diff,prev_amount,settlement,prev_settlement,market_value,circulation_value,dyn_pb_rate,pe_rate,entrust_rate,turnover_ratio,vol_ratio,amplitude,current_amount,money_type,trade_status,chi_spelling_grp,hq_type_code,ipo_price,issue_date,up_px,down_px,business_amount_in,business_amount_out,eps,bps,iopv,exercise_date,expire_date,exercise_price,call_put,underlying,min5_chgpct,real_leverage,option_price,data_timestamp,shares_per_hand,rise_first_grp,fall_first_grp,rise_count,fall_count,member_count,special_marker,popc_px,avg_px";
		if (params.fields)
			allfields = params.fields;
		params.fields = allfields;

		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/real' + queryString,
			// data: params,GET不支持data形式，只能url拼接参数
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, function(res) {
			//console.log("getRealtimeList" + JSON.stringify(res));
			if (res.ok) {
				callback(res.data);
			}
		});
	},
	/*获取排序数据
	根据某个字段值对产品代码进行排序
	*/
	getRankList: function(params, callback) {

		/*
			en_hq_type_code, en_prod_code, sort_field_name, sort_type, fields, start_pos, data_count, special_marker,
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/sort' + queryString,
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, callback);
	},

	/*板块成分股排序*/
	getBlockRankingStocksData: function(params, callback) {
		//板块成份股排序
		/*https: //open.hscloud.cn/quote/v1/block/sort?prod_code=000001.XBHS&sort_field_name=px_change_rate&start_pos=0&fields=prod_name,last_px,px_change_rate&data_count=10&sort_type=undefined&_=1496212106297
		
		prod_code, sort_field_name, sort_type, fields, start_pos, data_count,
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/block/sort' + queryString,
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, callback);
	},
	/*获取某个股票的快照数据*/
	getRealtime: function(params, callback) {
		/*
			en_prod_code, fields
		*/
		return this.getRealtimeList(params, callback);
	},
	/*获取分时*/
	getTrend: function(params, callback) {
		/*
			prod_code, fields, crc, date, min_time
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/trend' + queryString,
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, function(res) {
			//console.log("getTrend" + JSON.stringify(res));
			if (res.ok) {
				callback(res.data);
			}
		});
	},
	/*获取5日分时*/
	getTrend5day: function(params, callback) {
		/*
		prod_code=600570.SS&fields=last_px,avg_px,business_amount,business_balance
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/trend5day' + queryString,

			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, callback);
	},
	/*获取k线数据*/
	getKline: function(params, callback) {
		/*
		get_type=offset&prod_code=600570.SS&candle_period=1
		&fields=open_px,high_px,low_px,close_px&search_direction=2
		&date=20150106&min_time=1400&data_count=20
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/kline' + queryString,
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, callback);
	},
	/*获取基金净值*/
	getNetvalue: function(params, callback) {
		/*
		gildatafund/v1/performance_new/daily_quote?en_prod_code=500039.SH&unit=0
		en_prod_code,unit,fields
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/gildatafund/v1/performance_new/daily_quote' + queryString,
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, callback);
	},
	/*股票搜索*/
	getWizardResult: function(params, callback) {
		/*
			prod_code, en_finance_mic,data_count
		*/
		var queryString = "?" + util.parse2query(params);
		return stream.fetch({
			method: 'GET',
			type: 'json',
			url: config.openApiUrl + '/quote/v1/wizard' + queryString,
			data: params,
			headers: {
				Authorization: "Bearer " + config.token,
			},
		}, callback);
	}
};
module.exports = dataCenter;