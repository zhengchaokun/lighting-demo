
<template>
	<div style="width:750;">
		<scroller style="width:750;background-color:#eeeeee">
    	<div style="height:500;width:750;flex-direction: column;align-items:center;background-color:#ffffff">
    		<div style="height:300;width:750;">
    			<text style="font-size:40;height:80;width:750;padding-left:30;padding-top:20;">国泰聚信价值优势混合A</text>
    			<div style="flex-direction:row;height:80;width:750;justify-content:space-between;">
    				<div style="flex-direction:row;padding-top:20;">
    					<specialicon style="padding-left:30" icon="000362"></specialicon>
    					<specialicon style="padding-left:30" icon="混合基金"></specialicon>
    				</div>
    				<text style="padding-right:30;font-size:24;color:#999999;text-align:right;line-height:80;">2018/02/27</text>
    			</div>
    			<div style="flex-direction:row;">
    				<text class="detailInfoText">单位净值:1.304</text>
    				<text class="detailInfoText">日增长率：-1.58%</text>
    			</div>
    			<div style="flex-direction:row;">
    				<text class="detailInfoText" >赎回到账时间:T+3</text>
    				<text class="detailInfoText">起购金额：10元</text>
    			</div>
    		</div>
    		<div style="height:2;width:690;background-color:#eeeeee;padding-left:30;padding-right:30"></div>
    		<div style="padding-top:30;padding-left:30;padding-right:30;">
    			<text >业绩比较基准：</text>
    			<text style="padding-top:20;font-size:30">80%x沪深300指数收益率+20%x上证国债指数收益率</text>
    		</div>
    	</div>
    	<div style="height:700;width:750;margin-top:40;background-color:#ffffff">
    		<div style="height:60;width:750;flex-direction:row;padding-top:25;">
    			<image src="images/menu_6.png" style="height:40;width:30;margin-left:26;"></image>
    			<text style="height:40;width:180;line-height:35;padding-left:20;">收益走势</text>
    			<text style="height:40;width:300;line-height:40;font-size:24;color:#999999;">(同类排名：1692/1831)</text>
    		</div>
    		<div style="height:60;width:750;flex-direction:row;padding-top:25;">
    			<div class="fundHeadDataDiv">
    				<div class="fundHeadDataMark" style="background-color:#d70a30;"></div>
    				<text style="font-size:26" >本基金：</text>
    				<text style="font-size:26" :class="[getDisPlayDataColor(showTrendData.fund)]">{{showTrendData.fund}}</text>
    			</div>
    			<div class="fundHeadDataDiv">
    				<div class="fundHeadDataMark" style="background-color:#252c63;"></div>
    				<text style="font-size:26">业绩基准：</text>
    				<text class style="font-size:26" :class="[getDisPlayDataColor(showTrendData.performance)]">{{showTrendData.performance}}</text>
    			</div>
    		</div>
    		<div style="height:500;width:750"></div>
    		<div style="flex-direction:row;justify-content:center;">
    			<switchTab :titles="tabs" @test="switchChangeValue"></switchTab>
    		</div>
    	</div>
    	<div style="height:700;width:750;margin-top:40;background-color:#ffffff">
    		<div v-for="(itemList,index_div) in netWorthList" style="height: 100;width: 750;">
    			<div class="listDetailDiv">
    				<text v-for="(item,index_text) in itemList" class="listDetailText">{{item}}</text>
    			</div>
    			<div v-if="index_div==0" style="height:2;width:750;background-color:#eeeeee"></div>
    			<div v-else style="height:2;width:690;background-color:#eeeeee;margin-left:30;padding-right:30"></div>
    		</div>
    		<text style="color:#0a72c9" class="listDetailText">查看更多</text>
    	</div>
    	<div style="height:900;width:750;margin-top:40;background-color:#ffffff">
    		<div v-for="(item,index) in detailMenus" @click="jump(item.path)" style="height: 120;width: 750;">
    			<div class="menuListDiv" style="align-items:center;">
    				<image :src="item.icon" style="height: 40;width: 30;margin-left:16;margin-right:16;"></image>
    				<text style="flex:4;font-size:30;">{{item.title}}</text>
    				<text style="flex:8;color:#999999;font-size:26;text-align:right" >{{item.detail}}</text>
    				<image src="images/arrow_right_new.png" style="height:32;width:16;margin-right:20;margin-left:20;"></image>
    			</div>
    			<div v-if="index!=4" style="height:2;width:710;background-color:#eeeeee;margin-left:20;margin-right:20"></div>
    		</div>
    		<div style="height:400;width:750;flex-direction:row;">
    			<div style="height:400;width:350;">
    				
    			</div>
    			<div style="height:400;width:400;">
    				<div class="distributeDataListDiv" v-for="(data,index) in distributeData">
    					<div :style="data.color" class="colorMarkDiv"></div>
    					<text style="font-size:24;lines:2;padding-top:20;padding-bottom:20;padding-left:20;line-space:6;flex:3">{{data.title}}</text>
    					<text style="text-align:right;font-size:20;margin-right:40;flex:2">{{data.data}}</text>
    				</div>
    			</div>
    		</div>
    	</div>
    </scroller>
    <div style="height:100;width:750;flex-direction:row;background-color:#2877d3">
    	<text class="buttomText">定投</text>
    	<div style="height:200;width:2;background-color:#ffffff"></div>
    	<text class="buttomText">申购</text>
    </div>
	</div>

</template>
<script>
	import App from "light";
	var modal = weex.requireModule('modal');
	module.exports = {
		
        components: {
          	specialicon: require('./include/specialicon.vue'),
          	switchTab: require('./include/switchTab.vue'),
        },
        data:function(){
            return{
                netWorthList:[
        			["日期","单位净值","累计净值","日涨幅"],
        			["02-27","1.304","2.302","-1.58%"],
        			["02-26","1.325","2.323","1.69%"],
        			["02-23","1.303","2.301","0.54%"],
        			["02-22","1.296","2.294","2.45%"],
        			["02-14","1.265","2.263","0.48%"],
        		],
        		detailMenus:[
        			{icon:"images/menu_0.png",title:"基金概况",detail:"基本信息、投资目标、投资策略",path:"jijin/info"},
        			{icon:"images/menu_1.png",title:"费率",detail:"1.50%"},
        			{icon:"images/menu_2.png",title:"基金经理",detail:"程洲"},
        			{icon:"images/menu_3.png",title:"分红",detail:""},
        			{icon:"images/menu_4.png",title:"投资分布",detail:""}
        		],
        		distributeData:[
        			{color:{backgroundColor:"#c3e6fa"},title:"股票",data:"87.38%"},
        			{color:{backgroundColor:"#5fbef6"},title:"债券",data:"6.7%"},
        			{color:{backgroundColor:"#0d7cd9"},title:"银行存款和结算备付合计",data:"4.45%"},
        			{color:{backgroundColor:"#095fa6"},title:"其他资产",data:"1.47%"}
        		],
        		earningsTrendData:[
        			{fund:"-7.83%",performance:"-6.45%"},
        			{fund:"1.17%",performance:"-0.42%"},
        			{fund:"4.52%",performance:"4.02%"},
        			{fund:"9.01%",performance:"13.44%"}
        		],
        		tabs:[
				{title:"最近一月",selected:true},
				{title:"最近一季度",selected:false},
				{title:"最近半年",selected:false},
				{title:"最近一年",selected:false}
				],
				showTrendData:{}
            }
        },
        created:function(){
            
    	},
    	mounted:function(){
    		this.loadDisPlayData();
    	},
    	methods:{
			jump(view) {
                App.navigate(view);
            },
    		switchChangeValue:function(index){
    			for (var i = 0; i < this.tabs.length; i++) {
					var item = this.tabs[i];
					if (i==index) {
						item.selected=true;
					}else{
						item.selected=false;
					}
				}
				this.loadDisPlayData();
    		},
    		loadDisPlayData:function(){
    			for (var i = 0; i < this.tabs.length; i++) {
    				var item = this.tabs[i];
    				if (item.selected) {
    					this.showTrendData = this.earningsTrendData[i];
    				}
    			}
    		},
    		getDisPlayDataColor:function(dataValue){
    			var numberValue = 0;
    			if (typeof dataValue != "number") {
    				numberValue = parseInt(dataValue);
    			}else{
    				numberValue = dataValue;
    			}
    			if (numberValue>0) {
    				return "riseColor"
    			}else{
    				return "fallColor"
    			}
    		}
    	}
    }

</script>
<style>
	.detailInfoText{
		padding-left: 30;
		width: 375;
		height: 60;
		line-height:60;
		flex: 1;
	}
	.listDetailText{
		height: 100;
		line-height:100;
		flex: 2;
		text-align: center;
	}
	.listDetailDiv{
		height: 100;
		width: 750;
		flex-direction:row;
	}
	.menuListDiv{
		height: 120;
		width: 750;
		flex-direction:row;
	}
	.distributeDataListDiv{
		width: 400;
		flex-direction:row;
		align-items:center;
	}
	.colorMarkDiv{
		height:20;
		width:20;
	}
	.buttomText{
		color: #ffffff;
		font-size:38;
		line-height:100;
		text-align: center;
		height: 100;
		width: 374;
	}
	.fundHeadDataDiv{
		height:60;
		width:375;
		flex-direction:row;
		padding-top:25;
		justify-content:center;
		align-items:center;
	}
	.fundHeadDataMark{
		height:20;
		width:20;
		margin-right:10
	}
	.fundText{
		font-size:26;
	}
	.riseColor{
		color:#d70a31
	}
	.fallColor{
		color:#1a7e13
	}
</style>
