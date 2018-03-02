<template>
	<div>
		<div class="content" :style="{width:contentWidth}">
		<div v-for="(item,index) in titles"  style="flex-direction:row;">
			<text @click="changeValue(index)" v-if="item.selected==false" class="textStyle" :style="btnStyleTextDefault">{{item.title}}</text>
			<text @click="changeValue(index)" v-else class="textStyle" :style="btnStyleTextSelected">{{item.title}}</text>
			<div v-if="index!=titles.length-1" class="lineStyle" style="background-color:#eeeeee;"></div>
			<div v-else class="lineStyle" style="background-color:#ffffff;"></div>
		</div>
		
	</div>
	</div>
	
</template>

<style>
	.content{
		width: 400;
		height: 60;
		border-width: 1;
		border-color: #eeeeee;
		align-items: center;
		flex-direction:row;
	}
	.textStyle{
	  	padding-left: 10;
		text-align: center;
		font-size: 25;
		width:140;
		height:60;
		line-height: 60;
	}
	.lineStyle{
		height:34;
		width:2;
		margin-top:15;
		margin-bottom:10;
		margin-left:10;
		margin-right:10
	}
</style>

<script>
	//var log = weex.requireModule('jslog');
	var modal = weex.requireModule('modal');
	import lcButton from "lighting-ui/packages/lc-button"
	module.exports = {
		props:{
			titles:{default:[
				{title:"test1",selected:true},
				{title:"test2",selected:false},
				{title:"test3",selected:false}]},

		},
		components:{
			lcButton
		},
		data: function(){
			return{
				btnStyleTextSelected:{color:"#0a72c9"},
				btnStyleTextDefault:{color:"#999999"},
				contentWidth:0
			}
		},
		mounted:function(){
			this.contentWidth = this.titles.length*160;
		},
		methods:{
			getWidth:function(){
				this.titles
			},
			changeValue:function(index){
				for (var i = 0; i < this.titles.length; i++) {
					var item = this.titles[i];
					if (i==index) {
						item.selected=true;
					}else{
						item.selected=false;
					}
				}
				this.$emit("test",index);
			}
		},
	}

</script>
