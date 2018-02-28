
<template>
	<div style="width:750;">
		<scroller style="width:750;background-color:#eeeeee">
    	<div style="height:500;width:750;flex-direction: column;align-items:center;background-color:#ffffff">
    		<div style="height:300;width:750;">
    			<text style="font-size:40;height:80;width:750;padding-left:30;padding-top:20;">国泰聚信价值优势混合A</text>
    			<div style="flex-direction:row;height:80;width:750;justify-content:space-between;">
    				<div style="flex-direction:row;padding-top:20;">
    					<specialicon style="padding-left:30" :icon="123123"></specialicon>
    					<specialicon style="padding-left:30" :icon="123123"></specialicon>
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
    	<div style="height:700;width:750;margin-top:40;background-color:#ffffff"></div>
    	<div style="height:700;width:750;margin-top:40;background-color:#ffffff">
    		<div v-for="(itemList,index_div) in netWorthList" style="height: 100;width: 750;">
    			<div class="listDetailDiv">
    				<text v-for="(item,index_text) in itemList" class="listDetailText">{{item}}</text>
    			</div>
    			<div v-if="index_div==0" style="height:2;width:750;background-color:#eeeeee"></div>
    			<div v-else style="height:2;width:690;background-color:#eeeeee;margin-left:30;padding-right:30"></div>
    		</div>
    		<text style="color:#0a72c9" class="listDetailText"></text>
    	</div>
    	<div style="height:1000;width:750;margin-top:40;background-color:#ffffff">
    		<div v-for="(item,index) in detailMenus" style="height: 140;width: 750;">
    			<div class="menuListDiv">
    				<image :src="item.icon" class="flex:2"></image>
    				<text style="flex:4">{{item.title}}</text>
    				<text style="flex:8;color:#999999;font-size:20;text-align:right">{{item.detail}}</text>
    				<image style="flex:1">{{item.title}}</image>
    			</div>
    		</div>
    	</div>
    </scroller>
	</div>

</template>
<script>
	module.exports = {
        components: {
          	specialicon: require('./include/specialicon.vue'),
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
        			{icon:xxx,title:"基金概况",detail:"基本信息、投资目标、投资策略"},
        			{icon:xxx,title:"费率",detail:"1.50%"},
        			{icon:xxx,title:"基金经理",detail:"程洲"},
        			{icon:xxx,title:"分红",detail:""},
        			{icon:xxx,title:"投资分布",detail:""}
        		]
            }
        },
        created:function(){
            
    	},
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
		height: 140;
		width: 750;
		flex-direction:row;
	}
</style>
