<template>
	<div class="content" >
			<text class="text" :style="{fontSize:fontSize}">{{icon}}</text>
	</div>
	
</template>

<style>
	.content{
		height: 40px;
		border-width: 1px;
		border-color: #272c64;
		align-items: center;
	}
	.text{
	  	color:#272c64;
	  	padding-top: 6px;
		text-align: center;
	}
</style>

<script>
	//var log = weex.requireModule('jslog');
	module.exports = {
		props:{
			icon:{default:'US'},
			fontSize:{default:'25px'},
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
