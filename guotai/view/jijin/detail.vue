
<template>
	<div style="width:750px;">
		<scroller style="width:750px;background-color:#eeeeee">
    	<div style="height:500px;width:750px;flex-direction: column;align-items:center;background-color:#ffffff">
    		<div style="height:300px;width:750px;">
    			<text style="font-size:40px;height:80px;width:750px;padding-left:30px;padding-top:20px;">国泰聚信价值优势混合A</text>
    			<div style="flex-direction:row;height:80px;width:750px;justify-content:space-between;">
    				<div style="flex-direction:row;padding-top:20px;width:300px">
    					<specialicon style="margin-left:30px;margin-right:30px;flex:1" icon="000362"></specialicon>
    					<specialicon style="margin-right:30px;flex:1" icon="混合基金"></specialicon>
    				</div>
    				<text style="padding-right:30px;font-size:24px;color:#999999;text-align:right;line-height:80px;">2018/02/27</text>
    			</div>
    			<div style="flex-direction:row;">
    				<text class="detailInfoText" style="padding-left:30px;flex:1;">单位净值:1.304</text>
    				<text class="detailInfoText" style="padding-left:30px;flex:1;">日增长率：-1.58%</text>
    			</div>
    			<div style="flex-direction:row;">
    				<text class="detailInfoText" style="padding-left:30px;flex:1;">赎回到账时间:T+3</text>
    				<text class="detailInfoText" style="padding-left:30px;flex:1;">起购金额：10元</text>
    			</div>
    		</div>
    		<div style="height:2px;width:690px;background-color:#eeeeee;padding-left:30px;padding-right:30px"></div>
    		<div style="padding-top:30px;padding-left:30px;padding-right:30px;">
    			<text >业绩比较基准：</text>
    			<text style="padding-top:20px;font-size:30px">80%x沪深300指数收益率+20%x上证国债指数收益率</text>
    		</div>
    	</div>
    	<div style="height:700px;width:750px;margin-top:40px;background-color:#ffffff">
    		<div style="height:60px;width:750px;flex-direction:row;padding-top:25px;">
    			<image src="images/menu_6.png" style="height:40px;width:30px;margin-left:26px;"></image>
    			<text style="height:40px;width:180px;line-height:35px;padding-left:20px;">收益走势</text>
    			<text style="height:40px;width:300px;line-height:40px;font-size:24px;color:#999999;">(同类排名：1692/1831)</text>
    		</div>
    		<div style="height:60px;width:750px;flex-direction:row;padding-top:25px;">
    			<div class="fundHeadDataDiv">
    				<div class="fundHeadDataMark" style="background-color:#d70a30;"></div>
    				<text style="font-size:26px" >本基金：</text>
    				<text style="font-size:26px" :class="[getDisPlayDataColor(showTrendData.fund)]">{{showTrendData.fund}}</text>
    			</div>
    			<div class="fundHeadDataDiv">
    				<div class="fundHeadDataMark" style="background-color:#252c63;"></div>
    				<text style="font-size:26px">业绩基准：</text>
    				<text class style="font-size:26px" :class="[getDisPlayDataColor(showTrendData.performance)]">{{showTrendData.performance}}</text>
    			</div>
    		</div>
    		<div style="height:500px;width:750px;margin-top:60px">
    			 <canvas ref="canvas_holder" style="width:750px;height:400px;">
                	
            	</canvas>
            	<div class="trendTab">
    				<switchTab :titles="tabs" @test="switchChangeValue" style="flex:1;margin-left:60px;margin-right:60px;"></switchTab>
    			</div>
    		</div>
    		
    	</div>
    	<div style="height:700px;width:750px;margin-top:40px;background-color:#ffffff">
    		<div v-for="(itemList,index_div) in netWorthList" style="height: 100px;width: 750px;">
    			<div class="listDetailDiv">
    				<text v-for="(item,index_text) in itemList" class="listDetailText">{{item}}</text>
    			</div>
    			<div v-if="index_div==0" style="height:2px;width:750px;background-color:#eeeeee"></div>
    			<div v-else style="height:2px;width:690px;background-color:#eeeeee;margin-left:30px;padding-right:30px"></div>
    		</div>
    		<text style="color:#0a72c9" class="listDetailText">查看更多</text>
    	</div>
    	<div style="height:900px;width:750px;margin-top:40px;background-color:#ffffff">
    		<div v-for="(item,index) in detailMenus" @click="jump(item.path)" style="height: 120px;width: 750px;">

    			<div class="menuListDiv" style="align-items:center;">
    				<image :src="item.icon" style="height: 40px;width: 30px;margin-left:16px;margin-right:16px;"></image>
    				<text style="flex:4;font-size:30px;">{{item.title}}</text>
    				<text style="flex:8;color:#999999;font-size:26px;text-align:right" >{{item.detail}}</text>
    				<image src="images/arrow_right_new.png" style="height:32px;width:16px;margin-right:20px;margin-left:20px;"></image>
    			</div>
    			<div v-if="index!=4" style="height:2px;width:710px;background-color:#eeeeee;margin-left:20px;margin-right:20px"></div>
    		</div>
    		<div style="flex:1;width:750px;flex-direction:row;">
    			<div style="width:350px;">
    				<!-- <canvas ref="canvas_percent" style="width:350px;height:400px;">
                		
            		</canvas> -->
    			</div>
    			<div style="width:400px;">
    				<div class="distributeDataListDiv" v-for="(data,index) in distributeData">
    					<div style="padding-top:15px;padding-bottom:15px;flex:1;align-items:start;flex-direction:row;">
	    					<div :style="data.color" class="colorMarkDiv"></div>
	    					<text style="font-size:24px;lines:2px;padding-left:20px;line-space:6px;flex:3;">{{data.title}}</text>
	    					<text style="text-align:right;font-size:20px;margin-right:40px;flex:2;">{{data.data}}</text>
	    				</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </scroller>
    	<!--为了兼容web 放个空白的div让页面扩招到底部-->
    	<div style="height:100px;"></div>
		<div style="position:fixed;bottom:0px;height:100px;width:750px;flex-direction:row;background-color:#2877d3">
	    	<text class="buttomText">定投</text>
	    	<div style="height:200px;width:2px;background-color:#ffffff"></div>
	    	<text class="buttomText">申购</text>
    	</div>
	</div>

</template>
<script>
	import App from "light";
	import LightSDK from 'light-sdk';

	var modal = weex.requireModule('modal');
	const dataCenter = require("../.././js/openApi.js");
    const utils =require("../.././js/utils.js");
	const GCanvas =require("../.././js/canvas/gcanvas.js");
    var isWeex = typeof callNative === "function";

    //import { enable, WeexBridge, Image as GImage } from "../.././js/src/index.js";

	module.exports = {
		
        components: {
          	specialicon: require('./include/specialicon.vue'),
          	switchTab: require('./include/switchTab.vue'),
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
        			{icon:"images/menu_0.png",title:"基金概况",detail:"基本信息、投资目标、投资策略",path:"jijin/info"},
        			{icon:"images/menu_1.png",title:"费率",detail:"1.50%"},
        			{icon:"images/menu_2.png",title:"基金经理",detail:"程洲"},
        			{icon:"images/menu_3.png",title:"分红",detail:""},
        			{icon:"images/menu_4.png",title:"投资分布",detail:""}
        		],
        		distributeData:[
        			{color:{backgroundColor:"#c3e6fa"},title:"股票",data:"87.38%"},
        			{color:{backgroundColor:"#5fbef6"},title:"债券",data:"6.7%"},
        			{color:{backgroundColor:"#0d7cd9"},title:"银行存款和结算备付合计",data:"4.45%"},
        			{color:{backgroundColor:"#095fa6"},title:"其他资产",data:"1.47%"}
        		],
        		earningsTrendData:[
        			{fund:"-7.83%",performance:"-6.45%"},
        			{fund:"1.17%",performance:"-0.42%"},
        			{fund:"4.52%",performance:"4.02%"},
        			{fund:"9.01%",performance:"13.44%"}
        		],
        		tabs:[
				{title:"最近一月",selected:true},
				{title:"最近一季度",selected:false},
				{title:"最近半年",selected:false},
				{title:"最近一年",selected:false}
				],
				showTrendData:{},
				cnstocks:"1A0001.SS,2A01.SZ,399006.SZ,399005.SZ",
                cnIndexList:[
                ],
                stockCode:'1A0001',
                codeType:'XSHG.MRI',
                chartType:'TRENDLINE',
                preclosePx:0,
                snapshotdata:{},
                snapshotdata_indexlist:[],
                trenddata:{},
                /* canvas */
                storage:{},
                crc:0,
                minTime:0,
                cacheContext:{},
                gridColor:"#ccc",
                trendfields:[],
                trendpdata:[],
                trendpbasedata:[],
                realCanvas:{},
                bottomCavans:{},
                fundLeftPercent:[
                	[	
                		"7.50%","5.00%","2.50%","0.00%","-2.50%","-5.00%","-7.50%"
					],

					[	
                		"10.00%","7.50%","5.00%","2.50%","0.00%","-2.50%","-5.00%","-7.50%",
					],
					[	
                		"7.50%","5.00%","2.50%","0.00%","-2.50%","-5.00%","-7.50%","-10.00%"
					],
					[	
                		"35.00%","30.00%","25.00%","20.00%","15.00%","10.00%","5.00%","0.00%","-5.00%"
					]
                ],
                fundBottomDate:[
                	[	
                		"2018-02-01","2018-02-13"
					],

					[	
                		"2017-12-01","2018-01-21"
                	],
					[	
                		"2017-09-01","2017-12-01"
					],
					[	
                		"2017-03-01","2017-08-28","2018-03-01"
					]	
                ],
                tabIndex:0,
				pie_data_list:[0.05, 0.25, 0.6, 0.1],
				pie_color_list:["#00FF21", "#FFAA00", "#00AABB", "#FF4400"],
				isWeex: isWeex,
                webScale:1
            }
        },
        created:function(){
            var that=this;
             var ref = this.$refs.canvas_holder;
            this.realCanvas={width:750,height:400};
			
            console.log("deviceInfo ="+JSON.stringify(weex.config.env));
            var scale =weex.config.env.scale;
            this.realCanvas.width =weex.config.env.deviceWidth/scale *2;
            this.realCanvas.height =this.realCanvas.width/750* 400;
            if(!isWeex){ //web会小于1
                this.realCanvas.width=weex.config.env.deviceWidth/weex.config.env.dpr;
                this.realCanvas.height =this.realCanvas.width/750*400;
            }
            console.log("realCanvas deviceInfo ="+JSON.stringify(this.realCanvas));
    	},
    	mounted:function(){
    		this.loadDisPlayData();
    		this.initCanvas();
    		LightSDK.native.setTitle({title:'基金详情'})
    	},
    	methods:{
    		initCanvas:function(){
					var ref = this.$refs.canvas_holder;
		            var that=this;
		         	GCanvas.start(ref, function () {
		            var cacheContext = GCanvas.getContext('2d');
		            that.cacheContext=cacheContext;
		            dataCenter.getRealtimeList({en_prod_code:that.cnstocks},function(res){
		             //console.log("cnindexlist="+JSON.stringify(res));
			             that.cnIndexList=[];
			             var result=res.data.snapshot;
			             var fields = result.fields;
			             var r = ["last_px", "px_change", "px_change_rate","prod_name","hq_type_code","preclose_px"];
			             var newArr=[];
			             var j=0;
			             for (var key in result){
			                if ("fields" != key) {
			                    for (var p = {}, l = 0; l < r.length; l++){
			                        p[r[l]] = result[key][fields.indexOf(r[l])];
			                        p.prod_code_all = key;
			                        p.prod_code = key.split('.')[0];
			                    }
			                    newArr.push(p);
			                    //指数的三个快照数据
			                    var data={};
			                    var snapshotdata={};
			                    snapshotdata.fields=fields;
			                    snapshotdata[key]=result[key];
			                    data.data={};
			                    data.data.snapshot =snapshotdata;
			                    
			                    console.log("4545 snapshotdata_index="+JSON.stringify(data));
			                    that.snapshotdata_indexlist.push(data);
			                    j++;
			                }
			            }
			            that.cnIndexList=newArr;
			            //console.log("4545 cnIndexlist="+JSON.stringify(that.cnIndexList));
			            that.getIndexChartData(0);
		        	});
	          	});
				
    		},
			drawPieChart:function(){
				//画饼图
				var ctx=this.bottomCavans;
				var c ={height:400,width:350};
        		var radius = c.height / 2 - 40; //半径  
                var ox = radius + 20, oy = radius + 20; //圆心  
  
                var width = 30, height = 10; //图例宽和高  
                var posX = ox * 2 + 20, posY = 30;   //  

  
                var startAngle = 0; //起始弧度  
                var endAngle = 0;   //结束弧度  
                for (var i = 0; i < this.pie_data_list.length; i++)  
                {  
                    //绘制饼图  
                    endAngle = endAngle + this.pie_data_list[i] * Math.PI * 2; //结束弧度  
                    ctx.fillStyle = this.pie_color_list[i];  
                    ctx.beginPath();  
                    ctx.moveTo(ox, oy); //移动到到圆心  
                    ctx.arc(ox, oy, radius, startAngle, endAngle, false);  
                    ctx.closePath();  
                    ctx.fill();  
                    startAngle = endAngle; //设置起始弧度  
                }  
			},
			jump(view) {
                App.navigate(view);
            },
    		switchChangeValue:function(index){
    			for (var i = 0; i < this.tabs.length; i++) {
					var item = this.tabs[i];
					if (i==index) {
						item.selected=true;
					}else{
						item.selected=false;
					}
				}
				this.tabIndex =index;
				this.loadDisPlayData();
				this.getIndexChartData(index);
    		},
    		loadDisPlayData:function(){
    			for (var i = 0; i < this.tabs.length; i++) {
    				var item = this.tabs[i];
    				if (item.selected) {
    					this.showTrendData = this.earningsTrendData[i];
    				}
    			}
    		},
    		getDisPlayDataColor:function(dataValue){
    			var numberValue = 0;
    			if (typeof dataValue != "number") {
    				numberValue = parseInt(dataValue);
    			}else{
    				numberValue = dataValue;
    			}
    			if (numberValue>0) {
    				return "riseColor"
    			}else{
    				return "fallColor"
    			}
    		},
    		getIndexChartData:function(index){

				this.drawGrid();
                var current_snapshotdata =this.snapshotdata_indexlist[index];
                var item =this.cnIndexList[index];
                console.log("item ="+JSON.stringify(item));
                //获取昨收价
                this.preclosePx =item.preclose_px;

                this.snapshotdata =current_snapshotdata;
                var that=this;
                this.stockCode =item.prod_code;
                this.codeType =item.hq_type_code;
                var nowdate =utils.formatDate(new Date(),"yyyyMMdd");
                console.log("nowdate="+nowdate);
                //获取5日分时图数据
                dataCenter.getTrend({prod_code:item.prod_code_all,fields:'last_px,business_amount,avg_px,business_balance,min_time',date:nowdate,crc:0},function(res){
                    var code =item.prod_code_all;
                    var data = res.data.trend[code];
                    that.trendfields =res.data.trend["fields"];
                    try {
                        that.crc = res.data.trend.crc[code];
                        that.minTime = data[data.length - 1][0].toString().substring(8, 12);
                    } catch (e) {
                        console.info("openapiError:", e);
                    }
                    var period=9;
                    that.storeStorage(code, period, "trend", data);
                });
            },
            /*
             * 分时图多个数据存储
             * real昨收 & marketDetail总量 & trend数据
             */
            storeStorage:function(code, period, attr, data) {
                console.log("storeStorage++++++");
                // if (code != this.storage.code || period != this.storage.period) {
                //     return;
                // }
                console.log("storeStorage-----");
                this.storage[attr] = data;
                
                this.handleTrend();
            },
            //检查数据完备与否，执行分时绘图方法，storage在刷新股票时会清空
            handleTrend:function(){
                //画分时图
                var head, time, distance;
                if (this.storage.trend === undefined) {
                    console.log("handleTrend not deal");
                    return;
                }
                
                this.handleData();
                
            },
            //处理数据，计算最大值最小值
            handleData:function(){
                var max=0;
                var min=100000000;

                //var r = ["last_px", "business_amount", "avg_px","business_balance","min_time"];
                var index =this.trendfields.indexOf("last_px");
                for (var i = 0; i < this.storage.trend.length; i++) {
                     var item =this.storage.trend[i];
                   
                     if(max<item[index])
                        max=item[index];
                     if(min>item[index])
                        min =item[index];
                }
                var range =Math.max(Math.abs(max-this.preclosePx),Math.abs(min-this.preclosePx));

                var upLimit = range==0?this.preclosePx*1.02:this.preclosePx+range;
                var downLimit = range==0?this.preclosePx*0.98:this.preclosePx-range;

               
                var leftX,rightX,topY,bottomY,width,height;
                var realCanvas=this.realCanvas;
                leftX = 100;
                rightX = realCanvas.width-40;
                topY = 10;
                bottomY = realCanvas.height-30;
                width = rightX - leftX;
                height = bottomY-topY;  
                var middle =height/2;

                 //计算分时折线图均线坐标
                var data=[];
                var lineX=leftX,lineY;
                this.trendpbasedata=[];
                for (var i = 0; i < this.storage.trend.length; i++) {
                   
                    var item =this.storage.trend[i];

                    var last_px =item[index];

                    if(last_px>this.preclosePx){
                        //上面
                        lineY=(last_px-this.preclosePx)*1.0/range*middle;
                    }else{
                        //下面
                        lineY =middle+(this.preclosePx-last_px)*1.0/range*middle;
                    }

                    lineX +=realCanvas.width/(this.storage.trend.length-1);

                    if(lineX>rightX) //超过边框
                        lineX=rightX;
                    if(lineY<topY)
                        lineY=topY;
                    if(lineY>bottomY)
                        lineY=bottomY;

                    var point ={lineX:lineX,lineY:lineY};
                    data.push(point);

                    var newPoint={lineX:lineX,lineY:lineY};

                    newPoint.lineY=lineY+Math.random()*50-30-20;
                    if(newPoint.lineY>bottomY)
                        newPoint.lineY=bottomY;
                    if(newPoint.lineY<topY)
                        newPoint.lineY=topY;

                    this.trendpbasedata.push(newPoint);
                }
                this.trendpdata =data;
                //画折线图
                this.draw1Trend();
            },
            dealCanvasWebScale:function(x,type,realWidth,realHeight){
                if(type=="width")
                    x=x*realWidth/750;
                else
                    x=x*realHeight/400;
            },
            /*画分时图折线图 & 阴影图*/
            draw1Trend:function(){
                //---绘制折线图
                //本基金
                var start=0;
                var trendX=10;
                var data =this.trendpdata;
                this.cacheContext.beginPath();
                this.cacheContext.lineWidth = 5;
                this.cacheContext.strokeStyle = '#d70a31';
               
                var start =0;

                for (var i = start; i < data.length; i++) {
                    if(i==start){
                        this.cacheContext.moveTo(data[i].lineX, data[i].lineY);
                    }else{
                        this.cacheContext.lineTo(data[i].lineX, data[i].lineY);
                    }
                }

                this.cacheContext.stroke();

				//行业基准线
				var data =this.trendpbasedata;
                this.cacheContext.beginPath();
                this.cacheContext.lineWidth = 5;
                this.cacheContext.strokeStyle = '#252c63';
               
                var start =0;

                for (var i = start; i < data.length; i++) {
                    if(i==start){
                        this.cacheContext.moveTo(data[i].lineX, data[i].lineY);
                    }else{
                        this.cacheContext.lineTo(data[i].lineX, data[i].lineY);
                    }
                }
                this.cacheContext.stroke();

            },
            /*填充canvas表格线*/
            drawGrid:function(){
                var leftX,rightX,topY,bottomY,width,height;
                var realCanvas=this.realCanvas;
                leftX = 100;
                rightX = realCanvas.width-40;
                topY = 10;
                bottomY = realCanvas.height-30;
                width = rightX - leftX;
                height = bottomY-topY;
                this.cacheContext.clearRect(0,0,realCanvas.width,realCanvas.height);

                var stepY;
                this.cacheContext.beginPath();
                this.cacheContext.strokeStyle = this.gridColor;
                this.cacheContext.lineWidth = 1;
                //绘制实线
                this.cacheContext.moveTo(leftX, topY);
                this.cacheContext.lineTo(rightX, topY);
                this.cacheContext.lineTo(rightX, bottomY);
                this.cacheContext.lineTo(leftX, bottomY);
                this.cacheContext.closePath();
                this.cacheContext.stroke();

				var percentArray =this.fundLeftPercent[this.tabIndex];
				var count =percentArray.length;
                //绘制实线
                stepY = height / count;
                for (var i = 1; i < count; i++) {
                    this.drawSolid({
                        x: this.getOdd(leftX),
                        y: this.getOdd(topY + i * stepY)
                    }, {
                        x: this.getOdd(rightX),
                        y: this.getOdd(topY + i * stepY)
                    });
                }

                //绘制左侧价格表
                for (var i = 0; i < count; i++) {
                	var leftX=0;
                	var text =percentArray[i];
                	this.cacheContext.font="20px";
	                this.cacheContext.fillStyle = 'black';
	                this.cacheContext.textAlign = "right";
	                this.cacheContext.textBaseline = "top";
	                this.cacheContext.fillText(text,(100-20),topY + i * stepY);
	             }

	            //绘制底部日期表
	            var dateArray =this.fundBottomDate[this.tabIndex];
	            count =dateArray.length;
				var stepX =width/2;
				for (var i = 0; i < count; i++) {
                	var text =dateArray[i];
                	var leftX=50;
                	this.cacheContext.font="20px";
	                this.cacheContext.fillStyle = 'black';
	                this.cacheContext.textAlign = "left";
	                this.cacheContext.textBaseline = "top";
	                var x =leftX+i*stepX;
	                if(i==2){
	                	x=rightX;
	                	this.cacheContext.textAlign = "right";
	                }
	                this.cacheContext.fillText(text,x,bottomY+10);
	             }
            },
            //数字为参数，返回奇数
            getOdd: function(value, add) {
                var result;
                if (add) {
                    result = value % 2 == 0 ? value - 1 : value;
                } else {
                    result = value % 2 == 0 ? value - 1 : value;
                }
                return result;
            },
             //传入两个坐标点对象，绘制连接这两个点的实线
            drawSolid:function(start,end){
                this.cacheContext.beginPath();
                this.cacheContext.strokeStyle = this.gridColor;
                this.cacheContext.lineWidth = 2;
                //绘制实线
                this.cacheContext.moveTo(start.x, start.y);
                this.cacheContext.lineTo(end.x, end.y);
                this.cacheContext.closePath();
                this.cacheContext.stroke();
            },
            //传入两个坐标点对象，绘制连接这两个点的虚线
            drawDashed: function(start, end) {
                var gap = 0.008,
                    length = 0.012,
                    position = 0,
                    x, y,
                    gapX, gapY, lengthX, lengthY, step;
                this.cacheContext.beginPath();
                this.cacheContext.strokeStyle = '#b3b3b3';
                this.cacheContext.lineWidth = 1.5;
                gapX = (end.x - start.x) * gap;
                gapY = (end.y - start.y) * gap;
                lengthX = (end.x - start.x) * length;
                lengthY = (end.y - start.y) * length;
                step = gap + length;
                x = start.x;
                y = start.y;
                this.cacheContext.moveTo(x, y);
                for (; position + length < 1; position += step) {
                    x += lengthX;
                    y += lengthY;
                    this.cacheContext.lineTo(x, y);
                    x += gapX;
                    y += gapY;
                    this.cacheContext.moveTo(x, y);
                }
                this.cacheContext.lineTo(end.x, end.y);
                this.cacheContext.stroke();
            }
		}
    }

</script>
<style>
	.detailInfoText{
		padding-left: 30px;
		width: 375px;
		height: 60px;
		line-height:60px;
		flex: 1;
	}
	.listDetailText{
		height: 100px;
		line-height:100px;
		flex: 2;
		text-align: center;
	}
	.listDetailDiv{
		height: 100px;
		width: 750px;
		flex-direction:row;
	}
	.menuListDiv{
		height: 120px;
		width: 750px;
		flex-direction:row;
	}
	.distributeDataListDiv{
		width: 400px;
		flex-direction:row;
		/*align-items:center;*/
	}
	.colorMarkDiv{
		height:20px;
		width:20px;
	}
	.buttomText{
		color: #ffffff;
		font-size:38px;
		line-height:100px;
		text-align: center;
		height: 100px;
		width: 374px;
	}
	.fundHeadDataDiv{
		height:60px;
		width:375px;
		flex-direction:row;
		padding-top:25px;
		justify-content:center;
		align-items:center;
	}
	.fundHeadDataMark{
		height:20px;
		width:20px;
		margin-right:10px;
	}
	.fundText{
		font-size:26px;
	}
	.riseColor{
		color:#d70a31
	}
	.fallColor{
		color:#1a7e13
	}

	.trendTab{
		flex-direction:row;
		justify-content:center;
		margin-top:40px;
		height:60px;
		width:750px;
	}
	.switch{
		height:60px;
		flex: 1;
		justify-content: flex-start;
	}
</style>
