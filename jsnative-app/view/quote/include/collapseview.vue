<!-- Created by 徐成豪 2017.5.19 -->

<template>
	<div :width="width" style="background-color: #fff">
		<div class="header" :style="{ height: headerHeight, backgroundColor: headerBackgroundColor }" v-if="showHeader">
			<div class="clickContainer" :style="{ height: headerHeight }" @click="onclickheader">
				<image ref="arrow" class="arrow" :src="showContent?(baseUrl+'image/item_arrow_down.png'):(baseUrl+'image/item_arrow_right.png')"></image>
				<text :value="title" :style="{ fontSize: headerFontSize, color:titleFontColor}"></text>
			</div>
			<text class="rightTitle" :value="rightTitle" :style="{ fontSize: headerFontSize - 2, padding: (headerHeight - headerFontSize - 2) / 2, color: rightFontColor, height: headerHeight }" @click="onclickright" ></text>
		</div>
		<slot v-if="showContent" ></slot>
	</div>
</template>

<style>
	.header {
		flex-direction: row; 
		border-top-width: 1; 
		border-bottom-width: 1;
		border-top-color: #ddd;
		border-bottom-color: #ddd;
		align-items: center;
	}
	.clickContainer {
		flex-direction: row;
		flex: 1;
		align-items: center;
	}
	.arrow {
		width: 20;
		height: 20;
		margin-left: 18; 
		margin-right: 9;
	}
	.rightTitle {
		position: absolute;
		text-align: right;
		right: 18;
	}
</style>

<script>
	const animation = weex.requireModule('animation');
	const getBaseURL = require('./base-url.js').getBaseURL;
	module.exports = {
		props: {
			width: { default: 750 },
			headerFontSize: { default: 28 },
			headerHeight: { default: 60 },
			showHeader: { default: true },
			headerBackgroundColor: { default: "#f8f8f8" },
			title: { default: "title" },
			rightTitle: { default: "rightTitle" },
			rightFontColor: { default: "#333" },
			titleFontColor: { default: "#666666" },
			showContent: { default: true },

		},
		data: function() {
			return {
				rotate: "",
				baseURL:''
			}
		},
		components: {

		},
		methods: {
			onclickheader: function() {
				nativeLog("Header is clicked!");
				var self = this;
				if (this.showContent) {
					this.rotate = "270deg";
					this.showContent = false;
				} else {
					this.rotate = "0deg";
					this.showContent = true;
				}
				// animation.transition(this.$refs.arrow, {
	   //        			styles: {
		  //           		transform: "rotate(" + this.rotate + ")",
		  //           		transformOrigin: "center center",
	   //        			},
		  //         		duration: 10, //ms
		  //         		timingFunction: "linear",
    //     			}, function () {
    //     				nativeLog("arrow rotate finished");
    //  //    			if(self.expandtitle=='v'){
				// 	// 	self.expandtitle='>';
				// 	// }else{
				// 	// 	self.expandtitle='v';
				// 	// }
    //     		});
				this.$emit("headeronclick");
			},
			onclickright: function() {
				this.$emit("rightonclick");
			},
		},
		created: function() {
			this.baseUrl = getBaseURL(this);
		},
	}
</script>