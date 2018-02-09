
<template>
    <div style="background-color:#f0eff4;">
        <scroller offset-accuracy="10" @scroll="scrollHandler">
            <lc-lightbox autoPlay="true" ref="lc-lightbox"
                height="400"
                interval="5000"
                showIndicator="true"
                :image-list="imageList"
                :indicatorColor="indicatorColor"
                @lcImgClick="lcImgClick">
            </lc-lightbox>

            <div class="bgc-white tip-wrap justify-between">
                <div class="flex-row align-center">
                    <image class="tip-img" src="images/icon-ling.png"></image>
                    <text class="tip-text">您尚未登录，请登录查看更多理财产品</text>                    
                </div>
                <text class="tip-button">立即登录</text>
            </div>

            <div class="flex-row bgc-white grid-wrap mt20">
                <div class="flex-row item-box">  
                    <div class="item-cont">                       
                        <image src="images/lc-icon-1.png" class="item-pic"></image>                        
                        <text class="item-text">固定期限</text>
                    </div>
                    <div class="item-cont">                       
                        <image src="images/lc-icon-2.png" class="item-pic"></image>                        
                        <text class="item-text">灵活期限</text>
                    </div>
                    <div class="item-cont">                       
                        <image src="images/lc-icon-3.png" class="item-pic"></image>                        
                        <text class="item-text">基金专区</text>
                    </div>
                    <div class="item-cont">                       
                        <image src="images/lc-icon-4.png" class="item-pic"></image>                        
                        <text class="item-text">我的关注</text>
                    </div>
                </div>            
            </div>

            <div class="bgc-white mt20">
                <div class="align-center justify-center">
                    <text class="title">热门基金</text>
                    <div class="redline"></div>
                </div>
                <div v-for="(jj,index) in jjs" :key="index" class="flex-row jj-wrap">
                    <div class="jj-nh-wrap">
                        <text class="jj-nh">{{jj.nh}}</text>
                        <text class="jj-text">七日年化收益率</text>
                    </div>
                    <div class="jj-info-wrap">
                        <text class="jj-name">{{jj.name}}</text>
                        <div class="flex-row mt20">
                            <div v-for="(j,i) in jj.tag" :key="i" class="flex-row jj-tag">
                                <text class="jj-tag-text">{{j}}</text>
                            </div>
                        </div>                       
                        <text class="jj-intro mt20">{{jj.intro}}</text>
                    </div>
                </div>
                <text class="more">查看更多</text>
            </div>

            <div class="bgc-white mt20">
                <div class="align-center justify-center">
                    <text class="title">热门主题</text>
                    <div class="redline"></div>
                </div>
                <div class="flex-row jj-wrap">
                    <div class="jj-nh-wrap">
                        <text class="jj-nh">5.47%</text>
                        <text class="jj-text">七日年化收益率</text>
                    </div>
                    <div class="jj-info-wrap">
                        <text class="jj-name">理财有妙招 闲钱转起来</text>                     
                        <text class="jj-intro mt20">存取方便。收益连贯，选择多样，1元起购，宝宝放心。</text>
                    </div>
                </div>
                <text class="more">更多热门主题</text>
            </div>   

            <div class="mt20 bgc-white">
                <lc-cell label="热门专区" :has-arrow="false" :cell-style="csllStyle" :label-style="labelStyle"></lc-cell> 
                <div class="flex-row justify-between">
                    <div class="flex-row func-wrap flex-1 border-right">
                        <image class="func-wrap-img" src="images/lc-icon-5.png"></image>
                        <div class="ml10">
                            <text class="func-wrap-tit">华泰专属理财</text>
                            <text class="func-wrap-tip">3分钟了解券商理财</text>
                        </div>
                    </div>
                    <div class="flex-row func-wrap flex-1">
                        <image class="func-wrap-img" src="images/lc-icon-6.png"></image>
                        <div class="ml10">
                            <text class="func-wrap-tit">理财日历</text>
                            <text class="func-wrap-tip">产品预告一目了然</text>
                        </div>
                    </div>
                </div>                
            </div> 

            <div class="mt20 bgc-white">
                <lc-cell label="理财学堂" :has-arrow="false" :cell-style="csllStyle" :label-style="labelStyle"></lc-cell> 
                <lc-info-list 
                    type="imgleft"
                    :infoList="infoList"
                    @infoClick="infoClick"
                    :imgStyle="imgStyle"
                ></lc-info-list>                
            </div>

            <div class="statement-wrap">
                <div class="slogan-wrap flex-row">
                    <image class="slogan-img" src="images/lc-icon-7.png"></image>
                    <text class="slogan-text">涨乐财付通，口袋里的理财专家</text>
                </div>
                <div class="statement-box pos-r">
                    <text class="statement-text">免责声明：收益率数据仅供参考，过往业绩不预示未来表现，产品排序不分先后，不构成投资建议。投资者据此操作，风险自负。投资有风险，理财需谨慎。华泰证券金融产品风险评级标准透露</text>
                    <text class="statement-more">详情</text>
                </div>
            </div>

        </scroller>  

        <div style="height:40px; width:750px; position:fixed; top:0;" :style="{backgroundColor:bgc}"></div>
        <lc-minibar           
            class="navhead"
            title="严选理财"
            :background-color="bgc">
            <image class="navbar-img" src="images/msg.png" slot="left" @click="jump('#/msg')"></image>
            <image class="navbar-img" src="images/search.png" slot="right" @click="jump('#/search')"></image>
        </lc-minibar>  
    </div>
</template>
<script>
import App from "light";
import LcMinibar from "lighting-ui/packages/lc-minibar";
import LcLightbox from "lighting-ui/packages/lc-lightbox";
import LcCell from "lighting-ui/packages/lc-cell";
import LcInfoList from "lighting-ui/packages/lc-info-list"; 
    export default {
        components: { LcMinibar,LcLightbox,LcInfoList,LcCell},
        data(){
            return {
                bgc:'rgba(255,132,2,0)',
                imageList: [
                    { src: "images/banner-1.jpg" },
                    { src: "images/banner-2.jpg" }
                ],
                indicatorColor: {
                    "item-color": "#5976ec",
                    "item-selected-color": "#fff",
                    "item-size": "16px"
                },
                girds:[
                    {
                        label:"固定期限",
                        icon: "images/lc-icon-1.png",
                        path: ""
                    },
                    {
                        label:"灵活期限",
                        icon: "images/lc-icon-2.png",
                        path: ""
                    },
                    {
                        label:"基金专区",
                        icon: "images/lc-icon-3.png",
                        path: ""
                    },
                    {
                        label:"我的关注",
                        icon: "images/lc-icon-4.png",
                        path: ""
                    }
                ],
                jjs:[
                    {
                        name:'中海货币A',
                        tag:['低风险','1元起'],
                        intro:'风险低，运作稳，零申赎，闲钱好保姆！',
                        nh:'5.47%'
                    },
                    {
                        name:'华泰栢瑞天添宝货币A',
                        tag:['低风险','0.01元起'],
                        intro:'兼顾流动性和收益，经验丰富固收团队实力护航！',
                        nh:'5.146%'
                    }
                ],
                csllStyle:{ height:'100px'},
                labelStyle:{fontSize:'30px',color:'#545454',fontWeight:'bold'},
                infoList:[
                    {
                        textTitle:'技术论事：沪指连阳终结',
                        textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic.png'
                    },
                    {
                        textTitle:'人民日报：部分楼市放松限购政策',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic1.png'
                    },
                    {
                        textTitle:'日本史上最大ipo要来了',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic2.png'
                    },
                    {
                        textTitle:'盘中直击：指数弱势反弹',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic3.png'
                    }
                ],
                imgStyle:{ width:'145px',height:'100px',borderRadius:'8px'},
            }
        },
        methods: {
            jump(view) {
                App.navigate(view);
            },
            lcImgClick(e) {
                console.log("clicked" + e.index);
            },
            infoClick(e) {
                console.log("clicked" + e.index);
                App.navigate('#/news')
            },
            clickHandler({item, index}){
                console.log(item, index)
            },
            scrollHandler(e){
                this.offsetY = e.contentOffset.y;
                var percent = Math.abs(this.offsetY) / 500.0;
                if(percent>1){
                    percent=1;
                }
                this.bgc='rgba(255,132,2,'+percent+')'                
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.navhead{ position:fixed;top:40px;left:0;height:90px;font-size:30px;}
.navbar-img{ width: 50px; height: 50px;}

.tip-wrap{ height: 80px; padding-left: 30px; padding-right: 30px; flex-direction: row; align-items: center;}
.tip-img{ width: 28px; height: 28px;}
.tip-text{ color: #acacac; font-size: 24px; margin-left: 10px;}
.tip-button{ width: 148px; height: 52px; line-height: 52px; text-align: center; color: #edab57; font-size: 24px;
    border-style: solid; border-color: #edab57; border-width: 1px; border-radius: 20px;}

.grid-wrap{ height: 172px; padding-left: 30px; padding-right: 30px;}
.item-box { height: 172px; background-color: #fff; justify-content: space-around; align-items: center;}
.item-cont { align-items: center; width: 172px;}
.item-pic { width: 75px; height: 75px;}
.item-text { padding-top: 10px; font-size: 28px; color: #666; }

.title{ height: 128px; line-height: 130px; color: #a3a3a3; font-size: 42px;}
.redline{ height: 1px; width: 88px; background-color: #eb5b40;}

.jj-wrap{height: 250px; padding: 30px;}
.jj-nh-wrap{ width: 205px; justify-content: center; border-right-style: solid; border-right-color: #eeecec; border-right-width: 1px;}
.jj-nh{ color: #d6584c; font-size: 42px;}
.jj-text{ color: #adadad; font-size: 26px; margin-top: 15px;}
.jj-info-wrap{ margin-left: 25px; flex: 1;justify-content: center;}
.jj-name{ color: #373737; font-size: 32px;}
.jj-tag{ height: 36px; padding-left: 10px; padding-right: 10px; align-items: center; justify-content: center; 
    border-style: solid; border-color: #edab57; border-width: 1px; margin-right: 15px;}
.jj-tag-text{ color: #edab57; font-size: 24px;}    
.jj-intro{ color: #7d7d7d; font-size: 26px;}

.more{ height: 96px; line-height: 96px; text-align:center; color: #5399e1; font-size: 34px;
     border-top-style: solid; border-top-color: #eeecec; border-top-width: 1px;}

.func-wrap{ height: 210px; justify-content: center; align-items: center;}
.func-wrap-img{ width: 53px; height: 53px;}
.func-wrap-tit{color: #2f2f2f; font-size: 32px;}
.func-wrap-tip{color: #bbbbbb; font-size: 26px;}
.border-right{border-right-style: solid; border-right-color: #eeecec; border-right-width: 1px;}

.statement-wrap{ height: 370px; padding-left: 30px; padding-right: 30px; margin-bottom: 30px;}
.slogan-wrap{ height: 170px; align-items:center; justify-content: center;
    border-bottom-style: solid; border-bottom-color: #e3e2e7; border-bottom-width: 1px;}
.slogan-img{width: 29px; height: 36px;}
.slogan-text{color: #8e8c97; font-size: 30px; margin-left: 20px;}
.statement-box{ height: 200px; justify-content: center;}
.statement-text{color: #bbbabf; font-size: 26px;}
.statement-more{ position: absolute; color: #7e99b7; font-size: 26px; top: 135px; left: 250px; }
</style>
