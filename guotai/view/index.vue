
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <div class="item-wrap flex-row justify-between align-center">
                <div class="item-cont">
                    <image src="images/item-1.png" class="item-pic"></image>
                    <text class="item-text">今日头条</text>
                </div>
                <div class="item-cont">
                    <image src="images/item-2.png" class="item-pic"></image>
                    <text class="item-text">热销排行</text>
                </div>
                <div class="item-cont">
                    <image src="images/item-3.png" class="item-pic"></image>
                    <text class="item-text">定投指南</text>
                </div>
                <div class="item-cont">
                    <image src="images/item-4.png" class="item-pic"></image>
                    <text class="item-text">业绩排行</text>
                </div>
            </div>
            <lc-lightbox class="mt20" autoPlay="true" height="200" interval="4000" showIndicator="true"
                :image-list="imageList" :indicatorColor="indicatorColor">
            </lc-lightbox>
            <div class="marquee">
                <image class="marquee-img ml20" src="images/laba.png"></image>
                <text class="marquee-text ml10">2018年2月28日（周三）18：00至19：00期间，本公司将对网上直销平台进行系统升级，届时相关业务功能（包括网上交易、微信及电话查询等）将停止对外服务。若您在此期间有相关业务需求，敬请提早做好交易安排。由此给您带来的不便，敬请谅解。</text>
            </div>
            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">利是宝</text>
                        <text class="title-info ml20">随心存取，最快一秒</text>
                    </div>
                </div>
                <div class="flex-row justify-between">
                    <div class="func-wrap flex-1">
                        <text class="func-wrap-tit">4.529%</text>
                        <text class="func-wrap-tip">七日年化收益率</text>                   
                    </div>
                    <div class="func-wrap flex-1">
                        <text class="func-wrap-tit" style="color:#5d5d5d;">1.2318</text>
                        <text class="func-wrap-tip">万份收益(元)</text>  
                    </div>
                </div> 
                <div class="flex-row justify-around mt30 mb30">
                    <lc-button text="登录" type="normal" :btn-style="btnStyle1"></lc-button>
                    <lc-button text="注册" type="blue" :btn-style="btnStyle2"></lc-button>
                </div> 
            </div>
            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">王牌战基</text>
                    </div>
                </div>
                <div class="flex-row justify-between">
                    <div class="func-wrap flex-1 border-right h185">
                        <text class="func-wrap-lab">让“女神”帮你赚</text>                                           
                        <text class="func-wrap-tit mt10">38.19%</text>
                        <text class="func-wrap-tip">近一年收益率</text>                   
                    </div>
                    <div class="func-wrap flex-1 h185">
                        <text class="func-wrap-lab">一键投资“吃货”</text>                                                                   
                        <text class="func-wrap-tit mt10">49.58%</text>
                        <text class="func-wrap-tip">近一年收益率</text>  
                    </div>
                </div>
            </div>
            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">国泰专题</text>
                    </div>
                </div>
                <div class="list mt20 flex-row justify-between">
                    <div class="cell">
                        <image class="cell-img" src="images/bj-1.png"></image>
                        <text class="cell-info cell-info-1">年赚30%</text>
                        <text class="cell-info cell-info-2">他怎么做到的？</text>
                    </div>
                    <div class="cell">
                        <image class="cell-img" src="images/bj-2.png"></image>
                        <text class="cell-info cell-info-1">养基情报局</text>
                        <text class="cell-info cell-info-2">一周投资“基”密</text>
                    </div>
                    <div class="cell">
                        <image class="cell-img" src="images/bj-3.png"></image>
                        <text class="cell-info cell-info-1">女中豪杰</text>
                        <text class="cell-info cell-info-2">赚钱力MAX</text>
                    </div>
                </div>
            </div>
            <div class="mt20 bgc-white">
                <div class="title-wrap flex-row justify-between align-center">
                    <div class="flex-row align-center">
                        <div class="shutiao"></div>
                        <text class="title">人气产品</text>
                    </div>
                    <text class="more" @click="jump('jijin')">更多 ></text>
                </div>
                <div class="prod-box flex-row align-center" v-for="(prod,index) in product" :key="index" @click="jump('jijin')">
                    <div class="align-center justify-between" style="width:180px;">
                        <text class="prod-wrap-tit">{{prod.profit}}</text>
                        <text class="prod-wrap-tip">近一年收益率</text>                   
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
                        <text class="title">热门资讯</text>
                    </div>
                    <text class="more" @click="jump('index/newsList')">更多 ></text>
                </div>
                <lc-info-list type="text" 
                    :infoList="infoList1" 
                    :titleStyle="titleStyle"
                    :timeStyle="timeStyle" 
                    @infoClick="infoClick"
                    ></lc-info-list>
                <lc-info-list type="imgright"
                    :infoList="infoList2"
                    :timeStyle="timeStyle"
                    :imgStyle="imgStyle" 
                    @infoClick="infoClick"
                    ></lc-info-list>
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
                product:[
                    {profit:'38.99%',name:'国泰金鑫股票',tags:[{tag:'金牛女神'},{tag:'价值成长'}]},
                    {profit:'47.01%',name:'国泰互联网+股票',tags:[{tag:'业绩持久'},{tag:'长期回报'}]},
                    {profit:'39.06%',name:'国泰新经济混合',tags:[{tag:'把握拐点'},{tag:'深挖潜力股'}]},
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
            },
            infoClick(){
                App.navigate('index/newsInfo');
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

.title-wrap{ height: 96px; background-color: #fff; padding-left: 24px; padding-right: 24px;}
.shutiao{ width: 10px; height: 48px; background-color: #2877d3;}
.title{ font-size: 36px; color: #212121; margin-left: 16px; font-weight: 700;}
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

.prod-box{ height: 180px; margin-left: 30px; border-bottom-width: 1px; border-bottom-color:rgb(219, 218, 218);}
.prod-wrap{}
.prod-wrap-tit{color: #d70a30; font-size: 50px; font-weight: 400;}
.prod-wrap-tip{color: #999; font-size: 26px; margin-top: 10px;}
.prod-wrap-name{color: #333; font-size: 38px;}
.prod-wrap-tag{color: #979797; font-size: 24px; margin-right: 20px; padding: 8px; border-width: 1px; border-color: #979797;}

</style>
