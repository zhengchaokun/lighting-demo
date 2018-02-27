<template>
	<div class="tabbar" :style="{width:width,height:height}" @click="goStockDetail" >
		<text class="lefttext" :style="{backgroundColor:headcolor}" :value="head"></text>
		<div style="flex:6">
			<text style="font-size: 32px;color:#000000;margin-top:20" :value="stockName" ></text>
			<div style="flex-direction: row;">
				<text style="font-size: 20px;color:#B8B8B8;margin-top:5;" :value="stockCode" ></text>
				<busiFlagIcon style="margin-top:10;" :iconItems="busiFlag"></busiFlagIcon>
			</div>
		</div>
		<text  :value="price" style="flex:4;margin-top:20;text-align: right;font-size: 32;padding-top:10; "></text>
		<text class="righttext" :value="preDiff" :style="{color:preColor}"></text>
	</div>
</template>

<style>

	.tabbar{
		flex-direction: row;
		justify-content: center;
	}
	.lefttext{
		color:#FFFFFF;
		font-size: 20px;
		margin-left:0px;
		margin-top:25px;
		margin-right: 5px;
		height:24px;
		flex:1;
		text-align: center;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.righttext{
		flex:4;
		text-align: right;
		margin-right: 20px;
		margin-top:20px;
		font-size: 32px;
		padding-top:10;
	}

</style>

<script>
	//var log = weex.requireModule('jslog');
	module.exports = {
		props:{
			headcolor:{default:'#5197fb'},
			head:{default:'US'},
			width:{default:750},
			height:{default:100},
			stockName:{default:''},
			stockCode:{default:''},
			busiFlag:{default:''},
			price:{default:''},
			preDiff:{default:''},
			preColor:{default:'#FF4500'},
		},

		data: function(){
			return{

			}
		},

		components: {
			busiFlagIcon: require('./busiFlagIcon.vue'),
		},

		methods:{

			goStockDetail:function(url){
				//执行跳转逻辑
				this.$emit("goStockDetail");
			},
		},
	}

</script>