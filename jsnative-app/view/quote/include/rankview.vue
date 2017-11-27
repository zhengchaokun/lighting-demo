<template>
	<div class="root">
		<div class="title" :style="{backgroundColor:titlebg}" >
			<div class="titleTextDiv">
				<text class="titletext" :value="titlename" :style="{color:titlecolor}"></text>
			</div>
			<scroller ref="titlescroller" show-scrollbar=false scroll-direction='horizontal' style=" flex-direction:row; " scrollable=false >
				<div class="tabitem" style="flex-direction: row;" v-for="item in titlelist" @click="titleclick(item)">
					<text class="tabtitle" :value="tabtitlemap[item.type]"></text>
					<!-- <text class="tabtitle" :value="arrowmap[item.flag]" :style="{color:item.color}"></text> -->
					<image v-if="item.flag != 3" style="width:26;height:26;" :src="getIconUrl(item.flag)"></image>
				</div>
			</scroller>
		</div>
		<div class="bottomline"></div>
		<list class="ranklist" scroll-direction='vertical'; style="flex-direction:column;" :style="{backgroundColor:tableViewBackgroundColor}" @scroll="listScroll" >
			<refresh class="refesh" :display="refreshing" @pullingdown="onpullingdown" @refresh="onrefresh">
	          <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
	          <text class="refreshtextstyle" ref="refreshtextstyle" :value="refreshtext" ></text>
	        </refresh>
			<cell>
				<div style="flex-direction: row;">
					<div>
						<div style="height:120;width:200;flex-direction: column; justify-content: center;border-bottom-width: 1;
	    border-bottom-color: #f0f0f0;" v-for="item in bottomlist" @click="onitemclick(item)">
							<text class="lefttext" :style="{fontSize:item.prodNameFontSize}" :value="item.prod_name"></text>
							<div style="flex-direction: row;" v-if="isShowRight2">
								<text class="lefttext2" :value="item.prod_code_all"></text>
								<busiFlagIcon style="margin-top: 5px;" :iconItems="item.busiFlag"></busiFlagIcon>
							</div>
						</div>
					</div>
					<scroller ref="rightscroller" show-scrollbar=false; scroll-direction='horizontal'; style=" flex-direction:row;" @scroll="scroll" >
						<div>
							<div style="flex-direction: row;
		height: 120;border-bottom-width: 1;
	    border-bottom-color: #f0f0f0;align-items:center;" v-for="item in bottomlist" @click="onitemclick(item)">
	    						<div style="flex-direction: column;" v-for="items in item.data">
									<text class="righttext"  :value="items.value" style="{height:items.twolines?60:30;paddingTop:items.twolines?30:0}" :style="{color:items.color}"></text>
									<text class="righttext2" v-if="items.twolines" :value="items.stockcode" ></text>
								</div>
							</div>
						</div>
					</scroller>
				</div>
			</cell>
			<loading style="justify-content: center; height:20; width:750" @loading="onloading" :display="isShowLoading" >
    		</loading>
		</list>
	</div>
</template>

<style >
	.root {
		width:750px;
	    position:absolute;
	    bottom:0;
	}
	.title{
		flex-direction: row;
		height: 70px;
	}
	.ranklist {
		flex-direction:column;
		position:absolute;
		left: 0;
		top: 72;
		right: 0;
		bottom: 0;
	}
	.titleTextDiv{
		flex-direction: row;
		align-items:center;
		height:70px;
	}
	.titletext{
		width:200px;
		font-size: 26px;
		padding-left: 10px;
	}
	.tabitem{
		width: 200px;
		height: 70px;
		align-items: center;
		justify-content: center;
	}
	.tabtitle {
		font-size: 26px;
		color: #999999;
	}
	.lefttext{
		lines:1;
		padding-left: 10px;
		text-overflow: ellipsis;
	}
	.lefttext2{
		lines:1;
		font-size: 20px;
		margin-top:2px;
		padding-left: 10px;
	}
	.righttext{
		width: 200;
		font-size: 28px;
		text-align: center;
	}
	.righttext2{
		width: 200;
		height: 60;
		font-size: 28px;
		text-align: center;
		padding-top: 5;
		color: #999999;
	}
	.bottomline {
		width: 750;
    	height: 1;
    	background-color: #d6d6d9;
	}
	.refesh{
      justify-content: center;
      display: flex;
      align-items: center;
      width: 750px;
    }
    .refreshtextstyle{
      text-align: center;
      font-size: 24px;
      height: 60px;
      color:#949494;
      margin-top:10px;
      margin-left:20px;
    }
</style>

<script>
	var getBaseURL = require('./base-url.js').getBaseURL;
	var stockDetailUserJsHead = require('./common-api.js').common.Constants.stockDetailUserJsHead;
	const storage = weex.requireModule('storage');
	const scrollerView = weex.requireModule('scrollerview');
	//var log = weex.requireModule('jslog');
	var event = weex.requireModule('event');
	var tflag = -1;	//判断当前选中的是哪一项的排序
	var date = "";
	var platform="";	//判断是android还是ios
	module.exports = {
		props: {
			titlebg: { default: "#F8F8F8" },
			titlename:{default:"名称/代码"},
			titlecolor:{default:"#999999"},
			isShowRight2:{default:true},
			fontsize:{default:22},
			tableViewBackgroundColor:{default:"#ffffff"},
			titlelist:{
				default:
				[

				]},
			bottomlist:{
				default:
				[

			]},
			originallist:{default:[]},
		},

		components: {
			busiFlagIcon: require('./busiFlagIcon.vue'),
		},

		data:function(){
			return{
				baseUrl:"",
				prod_code:"",
				bottomlist:[],
				titlelist:[],
				originallist:[],
				isShowLoading:'hide',
				refreshing:'hide',
		        refreshtext:'',
		        refreshFlag:false,
				tabtitlemap: {
					"last_px": "最新价",
					"px_change_rate": "涨跌幅",
					"px_change": "涨跌额",
					"business_amount": "成交量",
					"business_balance": "成交额",
					"turnover_ratio": "换手率",
					"preclose_px": "昨收价",
					"rise_first_grp": "领涨股",
					"open_px": "开盘价",
					"high_px": "最高价",
					"low_px": "最低价",
					"amount": "持仓量",
					"amount_delta": "日增仓",
					"iopv": "净值",
					"premium_rate": "溢价率",
					"stock_px_change_rate": "涨跌幅",
					"pe_rate": "市盈率",
					"dyn_pb_rate": "市净率",
					"circulation_value": "流通市值",
					"market_value": "总市值",
				},
				arrowmap: {
					"0" : "↑",
					"1" : "↓",
					"2" : "",
				},
				stocklist:[],
				scrolling:false,	//判断是否在滚动，如果在滚动就停止刷新操作
			}
		},

		methods:{

			onpullingdown: function(event){
              this.refreshtext = '下拉刷新数据' + '\n' +"最后更新:"+date;
              if(Math.abs(Number(event.pullingDistance)) > 95){
                this.refreshtext = '松开刷新数据' + '\n' +"最后更新:"+date;
                this.refreshFlag = true;
              }
            },
            //完成刷新
            onrefresh:function(){
              var self = this;
              if(this.refreshFlag){
                this.refreshtext = '正在刷新...'+ '\n' +'最后更新:'+date;
                this.$emit("onrefresh");
                date = this.getNowFormatDate();
                this.refreshFlag = false;
                this.refreshing = 'show';
                setTimeout(() => {
                    self.refreshing = 'hide';
                  }, 1000);
              }
              else{
                this.refreshtext = '';
                this.refreshing = 'hide';
              }
            },
            //获取时间函数
            getNowFormatDate:function(){
              var date = new Date();
              var seperator1 = "-";
              var seperator2 = ":";
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              var currentdate = month + seperator1 + strDate
                      + " " + date.getHours() + seperator2 + date.getMinutes()
                      + seperator2 + date.getSeconds();
              return currentdate;
            },

			//子项点击进入个股详情页
			onitemclick:function(item){
				// log.i("index:"+index);
				var stockCode = item.prod_code;
				var name = item.prod_name;
				var codetype = item.hq_type_code;

				if(stockDetailUserJsHead){
		            var data = [];
		            data.push(this.stocklist);
					data.push(this.bottomlist.indexOf(item));
					storage.setItem("stocklist",JSON.stringify(data));
					event.openURL(this.baseUrl + "navigator.js?stockCode=" + stockCode + "&codeType=" + codetype + "&stockName=" + encodeURIComponent(name) + "&hideCutoverImage=" + true,{headHidden:true});
				}
				else{
					event.openURL(this.baseUrl + "stockDetail.js?stockCode=" + stockCode + "&codeType=" + codetype + "&stockName=" + encodeURIComponent(name));
				}
			},

			//滑动事件
			scroll:function(event){
          		if(platform!="iOS"){
					if(event.contentOffset.stop){
						this.scrolling = false;
						return;
					}
					this.scrolling = true;
				}
				var scrollx = event.contentOffset.x;
				if (this.$refs.titlescroller.followedHorizontalScroll){
					this.$refs.titlescroller.followedHorizontalScroll(scrollx);
				}else if (scrollerView){
					var el = this.$refs.titlescroller;
					scrollerView.followedHorizontalScroll(el,scrollx);
				}			
			},
			//竖向滑动
			listScroll:function(event){
				if(platform!="iOS"){
					if(event.contentOffset.stop){
						this.scrolling = false;
						return;
					}
					this.scrolling = true;
				}
			},

			//顶部排序事件
			titleclick:function(item){
				if(item.flag>2){
					return;
				}
				var sort_type;
				switch (item.flag) {
					//默认状态
					case 2:
						sort_type = 1;
						this.$emit("ontitleclick", item.type, sort_type);
						item.flag--;

						break;
					//降序状态
					case 1:
						sort_type = 0;
						this.$emit("ontitleclick", item.type, sort_type);
						item.flag--;

						break;
					//升序状态
					case 0:
						sort_type = -1;
						this.$emit("ontitleclick", item.type, sort_type);
						item.flag = 2;

						break;
				}
				var index = this.titlelist.indexOf(item);
				for (var i = 0; i < this.titlelist.length; i++) {
					if (i != index) {
						if(this.titlelist[i].flag!=3){
							this.titlelist[i].flag = 2;
							this.titlelist[i].color = "#000";
						}
					}
				}
			},

      		//判断是否有数据
	        hasData:function(data){
	          	if(parseFloat(data).toString() == "NaN") {
	　　　　    	return false;
	　　　　  	}
	　　　　  	return true;
	        },
	        onloading: function(event) {
	        	var that = this;
	        	this.$emit("onloadingmore");
          		if(platform!="iOS"){
            		this.isShowLoading = 'show';
	        		setTimeout(() => {
                    	that.isShowLoading = 'hide';
                  	}, 1000);
          		}
	        },
	        getIconUrl:function(type){
	        	if (type == 0){
	        		return this.baseUrl + 'image/sort_arrow_up.png';
	        	}else if (type == 1){
	        		return this.baseUrl + 'image/sort_arrow_down.png';
	        	}else{
	        		return this.baseUrl + 'image/sort_other.png';
	        	}
	        }
		},
		created:function(){
			var config =this.$getConfig();
          	platform =config.env.platform;
			this.baseUrl = getBaseURL(this);
			date = this.getNowFormatDate();
		},
	}
</script>
