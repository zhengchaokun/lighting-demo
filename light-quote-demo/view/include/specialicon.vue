<template>
	<div class="content" >
		<text class="text" :style="{fontSize:fontSize}">{{icon}}</text>
	</div>
</template>

<style>
	.content{
		border-width: 1;
		border-radius: 4;
		border-color: #ff6c00;
	}
	.text{
		padding-left: 5;
		padding-top: 1;
		padding-right: 5;
		padding-bottom: 1;
	  color:#ff6c00;
		font-weight: 700;
	}
</style>

<script>
	//var log = weex.requireModule('jslog');
	module.exports = {
		props:{
			icon:{default:'US'},
			fontSize:{default:17},
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
