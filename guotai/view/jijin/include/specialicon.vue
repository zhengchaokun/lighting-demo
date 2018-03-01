<template>
	<div>
		<div class="content" >
		<text class="text" :style="{fontSize:fontSize}">{{icon}}</text>
	</div>
	</div>
	
</template>

<style>
	.content{
		height: 40;
		width: 120;
		border-width: 1;
		border-color: #272c64;
		align-items: center;
	}
	.text{
	  	color:#272c64;
	  	padding-top: 6;
		text-align: center;
	}
</style>

<script>
	//var log = weex.requireModule('jslog');
	module.exports = {
		props:{
			icon:{default:'US'},
			fontSize:{default:25},
		},

		data: function(){
			return{

			}
		},

		methods:{
			getClass:function(type){
				if (!type || type == ""){
					return "nil";
				}else {
					return type;
				}
			}
		},
	}

</script>
