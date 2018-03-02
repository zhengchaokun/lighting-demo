<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <div class="item-wrap flex-row justify-between align-center">
                <div class="item-cont">
                    <image src="images/item-1.png" class="item-pic"></image>
                    <text class="item-text">热销排行</text>
                </div>
                <div class="item-cont">
                    <image src="images/item-2.png" class="item-pic"></image>
                    <text class="item-text">定投排行</text>
                </div>
                <div class="item-cont">
                    <image src="images/item-3.png" class="item-pic"></image>
                    <text class="item-text">基金超市</text>
                </div>
                <div class="item-cont">
                    <image src="images/item-4.png" class="item-pic"></image>
                    <text class="item-text">我的基金</text>
                </div>
            </div>
            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center prod-bottom">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">为你推荐</text>
                    </div>
                </div>
                <div class="prod-box flex-row align-center" style="height:300px">
                    <div class="align-left justify-center prod-right" style="flex:2">
                        <text class="prod-wrap-tit">4.551%</text>
                        <text class="prod-wrap-tip">七日年化收益率</text>                   
                    </div>
                    
                    <div  style="flex:3;">
                    	<text class="title_left">国泰利是宝</text>
                    	<div class="flex-row mt20">
                    		<text class="prod-wrap-tag-blue">随存随取</text> <text class="prod-wrap-tag-blue">优惠购基</text> 
                    	</div>
                    	<div class="flex-row mt20">
                    		<lc-button text="充值" type="normal" :btn-style="btnStyle3"></lc-button>
                    	</div>
                    </div>
                    
                </div> 
            </div>

            <lc-lightbox class="mt20" autoPlay="true" height="200" interval="4000" showIndicator="true"
                :image-list="imageList" :indicatorColor="indicatorColor">
            </lc-lightbox>


            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">优质基金</text>
                    </div>
                </div>
                <div class="prod-box flex-row align-center" v-for="(prod,index) in product" :key="index">
                    <div class="align-center justify-between" style="width:200px;">
                        <text class="prod-wrap-tit">{{prod.profit}}</text>
                        <text class="prod-wrap-tip">{{prod.detail}}</text>                   
                    </div>
                    <div class=" ml40">
                        <text class="prod-wrap-name">{{prod.name}}</text>
                        <div class="flex-row mt10">
                            <text class="prod-wrap-tag" v-for="(tag,i) in prod.tags" :key="i">{{tag.tag}}</text>  
                        </div>
                    </div>                    
                </div>
            </div>


            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">定投精选</text>
                    </div>
                    <text class="more">更多 ></text>
                </div>
                <div class="align-center">
                	<text class="prod-wrap-name mt20" style="text-align:center">国泰中小盘成长混合(LOF)</text>
                	<text class="prod-wrap-tit mt20" style="text-align:center">16.04%</text>
                	<text class="prod-wrap-tip mt20" style="text-align:center">近一年收益率收益率</text>   
                	<lc-button text="立即定投" type="normal" :btn-style="btnStyle4"></lc-button>
                	<div style="height:20px;width:750px;"></div>
                </div>
            </div>

            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">组合投资</text>
                    </div>
                    <text class="more">更多 ></text>
                </div>
                <div class="align-center flex-row">
                	<text style="text-align:left;margin-left:20px;">正"益"联盟</text>
                	<text class="prod-wrap-tag-blue" style="margin-left:20px">保守型</text> 
                	<text class="prod-wrap-tag">低风险</text> 
                	<text class="prod-wrap-tag">追求绝对收益</text> 
                </div>
                <div class="prod-box flex-row align-center" style="height:300px">
                	<div style="height:300px;flex:6">
                	
                	</div>
                	<div class="align-left justify-center prod-left" style="flex:4">
                        <text style="text-align:center" class="prod-wrap-tit">7.92%</text>
                        <text style="text-align:center" class="prod-wrap-tip">运行580天收益率</text>                   
                    </div>
                </div>

                
            </div>
        </scroller>
        <div class="headtop"></div>
        <div class="navhead">
            <div class="navbar-search">
                <image class="navbar-search-icon ml20" src="images/search.png"></image>
                <text class="navbar-search-text ml20">搜索基金名称/代码</text>
            </div>
        </div> 
        
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
import LcLightbox from "lighting-ui/packages/lc-lightbox";
import LcMarquee from 'lighting-ui/packages/lc-marquee';
import LcButton from "lighting-ui/packages/lc-button";
import LcInfoList from "lighting-ui/packages/lc-info-list";

    export default {
        components: { LcCell,LcLightbox,LcMarquee,LcButton,LcInfoList },
        data(){
            return {
                imageList: [
                    { src: "images/banner-1.png" },
                    { src: "images/banner-2.png" },
                    { src: "images/banner-3.png" }
                ],
                indicatorColor: {
                    "item-color": "#dcdcdc",
                    "item-selected-color": "#a5a5a5",
                    "item-size": "12px",
                    "bottom":"8px"
                },
                btnStyle1: {
                    width: '252px',
                    height: '76px',
                    backgroundColor: '#0a72c9',
                    borderWidth: '0',
                    borderRadius: '30px'
                },
                btnStyle2:{
                    width: '252px',
                    height: '76px',
                    backgroundColor: '#fff',
                    borderRadius: '30px'
                },
                btnStyle3:{
                    width: '360px',
                    height: '76px',
                    backgroundColor: '#0a72c9',
                    borderWidth: '0',
                    borderRadius: '6px'
                },
                btnStyle4:{
                	marginTop: '20px',
                    width: '600px',
                    height: '76px',
                    backgroundColor: '#0a72c9',
                    borderWidth: '0',
                    borderRadius: '6px'
                },
                product:[
                    {profit:'23.01%',name:'国泰金鹰增长灵活配置混合',detail:'近一年收益率',tags:[{tag:'长跑健将'},{tag:'不惧震荡'}]},
                    {profit:'69.53%',name:'国泰聚信价值优势混合A',detail:'近三年收益率',tags:[{tag:'分享优质企业长期回报'}]},
                    {profit:'130.74%',name:'国泰新经济混合',detail:'近三年收益率',tags:[{tag:'进攻主力'},{tag:'近3年冠军'}]},
                ],
                infoList1:[
                    {
                        textTitle:'A股调整或因短期情绪，长期震荡向上趋势不改',
                        textTime:'2018/2/9 4:02:00'
                    },
                    {
                        textTitle:'A股深度调整，揭秘背后原因！',
                        textTime:'2018/2/6 7:02:00'
                    }
                ],
                titleStyle:{color: '#333', FontSize:'30px'},
                timeStyle:{ textAlign:'left'},
                infoList2:[
                    {
                        textTitle:'月考成绩揭晓，说说接下来怎么办',
                        src:'images/p1.png',
                        textTime:'2018/2/1 8:02:00'
                    },
                    {
                        textTitle:'央企改革见成效，国泰央企结硕果',
                        src:'images/p2.png',
                        textTime:'2018/1/31 8:02:00'
                    },
                    {
                        textTitle:'躁春行情选成长，成长股里挑估值',
                        src:'images/p3.png',
                        textTime:'2018/1/30 8:02:00'
                    }
                ],
                imgStyle:{ width:'140px',height:'140px'},

            }
        },
         methods: {
            jump(view) {
                App.navigate(view);
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.headtop{height:80px; width:750px; position:fixed; top:0; background-color:#2877d3;}
.navhead{ position:fixed;top:78px;left:0; width: 750px; height:90px;font-size:30px; background-color: #2877d3; align-items: center; }
.navbar-search{ align-items: center; flex-direction: row; 
     width: 686px; height: 70px; border-radius: 15px; background-color:#1862b7; }
.navbar-search-icon{ width: 30px; height: 30px;}
.navbar-search-text{ color: #aadcff; font-size: 28px; margin-left: 10px;}

.item-wrap{ height: 160px; margin-top: 160px; background-color: #fff;}
.item-cont { align-items: center;  width: 180px; }
.item-pic { width: 85px; height: 70px; }
.item-text { font-size: 26px; color: #999; }

.marquee{ height: 48px; background-color: #fff8e0; flex-direction: row; align-items: center;}
.marquee-img{ width: 32px; height: 28px;}
.marquee-text { font-size: 26px; color: #f6a400; flex: 1; lines:1; text-overflow: ellipsis; }

.title-wrap{ height: 90px; background-color: #fff; padding-left: 24px; padding-right: 24px;}
.shutiao{ width: 10px; height: 48px; background-color: #2877d3;}
.title{ font-size: 36px; color: #212121; margin-left: 16px; font-weight: 700;}
.title_left{ font-size: 36px; color: #212121; font-weight: 700;}
.title-info{ font-size: 28px; color: #5d5d5d;}
.more{ font-size: 26px; color: #2877d3;}

.func-wrap{ height: 130px; justify-content: center; align-items: center;}
.func-wrap-tit{color: #d70a30; font-size: 50px;}
.func-wrap-tip{color: #999; font-size: 26px; margin-top: 10px;}
.func-wrap-lab{color: #000; font-size: 32px;}
.border-right{border-right-style: solid; border-right-color: #eeecec; border-right-width: 1px;}
.h185{ height: 185px;}

.list{ height: 210px; padding-left: 20px; padding-right: 20px;}
.cell{position: relative;}
.cell-img{ width: 230px; height: 160px;}
.cell-info{width: 220px; text-align: center; position: absolute; color: #fff; }
.cell-info-1{ font-size: 32px; top: 40px;}
.cell-info-2{ font-size: 24px; top: 85px;}

.prod-bottom{ border-bottom-width: 1px; border-bottom-color:rgb(219, 218, 218);}
.prod-box{ height: 180px; margin-left: 30px; border-bottom-width: 1px; border-bottom-color:rgb(219, 218, 218);}
.prod-right{height: 180px; margin-right: 30px; border-right-width: 1px; border-right-color:rgb(219, 218, 218);}
.prod-left {height: 180px;  border-left-width: 1px; border-left-color:rgb(219, 218, 218);}
.prod-wrap{}
.prod-wrap-tit{color: #d70a30; font-size: 50px; font-weight: 400;}
.prod-wrap-tip{color: #999; font-size: 26px; margin-top: 10px;}
.prod-wrap-name{color: #333; font-size: 38px;}
.prod-wrap-tag{color: #979797; font-size: 24px; margin-right: 20px; padding: 8px; border-width: 2px; border-color: #979797;border-radius: 2px}
.prod-wrap-tag-blue{color: #0a72c9; font-size: 24px; margin-right: 20px; padding: 8px; border-width: 2px; border-color: #0a72c9;border-radius: 2px}

</style>
