<template>
	<div :class="[getClass(icon)]" style="margin-top:8;" >
		<text :class="[getClass(icon) + '-text']">{{getName(icon)}}</text>
	</div>
</template>

<style>
	.hk{
		border-top-right-radius: 5;
		border-bottom-right-radius:5;
		background-color:#faac31;
	}
	.hk-text{
		text-align: center;
	    color:white;
	    font-size: 18px;
			font-weight: 600;
			margin-right: 4;
	}
	.us{
		border-top-right-radius: 6;
		border-bottom-right-radius:6;
		background-color:#4d94fe;
	}
	.us-text{
		text-align: center;
	    color:white;
	    font-size: 18px;
			font-weight: 600;
			margin-right: 4;
	}
	.future{
		border-top-right-radius: 6;
		border-bottom-right-radius:6;
		background-color:#a583fd;
	}
	.future-text{
		text-align: center;
	    color:white;
	    font-size: 18px;
			font-weight: 600;
			margin-right: 4;
	}
	.common{
		border-top-right-radius: 6;
		border-bottom-right-radius:6;
		background-color:#ffffff;
	}
	.common-text{
		text-align: center;
	    color:white;
	    font-size: 18px;
			font-weight: 600;
			margin-right: 4;
	}
	.nil{
		
	}

</style>

<script>
	//var log = weex.requireModule('jslog');
	module.exports = {
		props:{
			icon:{default:''},
			width:{default:40},
			marginType:{default:'ranklist'}
		},

		data: function(){
			return{

			}
		},

		methods:{

			goStockDetail:function(url){
				//执行跳转逻辑
				this.$emit("goStockDetail");
			},
			getClass:function(type){
				if (!type || type == ""){
					if(this.marginType=="search"){
						return "common";//search情况下
					}
					return "nil";
				}else {
					if(this.marginType=="search" && (type=="hs"||type=="other")){
						return "common";
					}
					return type;
				}
			},
			getName:function(type){
				if (type.toLowerCase() == "us"){
					return "US";
				}else if (type.toLowerCase() == "hk"){
					return "HK";
				}else if (type.toLowerCase() == "future"){
					return "期";
				}else{
					if(this.marginType=="search"){
						return "SE";//搜索页面
					}
					return "     ";
				}
			}
		},
	}

</script>
