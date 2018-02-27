<template>
	<div class="content" >
		<div v-for="icon in iconItems">
			<specialicon style="margin-left:4;" :icon="icon"></specialicon>
		</div>
	</div>
</template>

<style>
	.content{
		flex-direction: row;
	}
</style>

<script>
	//var log = weex.requireModule('jslog');
	module.exports = {
		props:{
			iconItems:{default:[]},
		},

		data: function(){
			return{

			}
		},
		components: {
          specialicon: require('./specialicon.vue'),
    	},
		methods:{
			getClass:function(type){
				if (!type || type == ""){
					return "nil";
				}else {
					return type;
				}
			},
			getName:function(type){
				if (type.toLowerCase() == "rong"){
					return "融";
				}else if (type.toLowerCase() == "hk"){
					return "通";
				}else if (type.toLowerCase() == "future"){
					return "基";
				}else if (type.toLowerCase() == "xie") {
					return "两协";
				}else{
					return "";
				}
			}
		},
	}

</script>