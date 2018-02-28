
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
                    <!-- <text class="more">更多 ></text> -->
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
                <div class="list flex-row justify-between align-center">
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

    export default {
        components: { LcCell,LcLightbox,LcMarquee,LcButton },
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
                }

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
.headtop{height:40px; width:750px; position:fixed; top:0; background-color:#2877d3;}
.navhead{ position:fixed;top:38px;left:0; width: 750px; height:90px;font-size:30px; background-color: #2877d3; align-items: center; }
.navbar-search{ align-items: center; flex-direction: row; 
     width: 686px; height: 70px; border-radius: 15px; background-color:#1862b7; }
.navbar-search-icon{ width: 30px; height: 30px;}
.navbar-search-text{ color: #aadcff; font-size: 28px; margin-left: 10px;}

.item-wrap{ height: 160px; margin-top: 120px; background-color: #fff;}
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

.list{ }
.cell{position: relative;}
.cell-img{ width: 222px; height: 160px;}
.cell-info{width: 220px; text-align: center; position: absolute; color: #fff; }
.cell-info-1{ font-size: 32px; top: 40px;}
.cell-info-2{ font-size: 24px; top: 85px;}

</style>
