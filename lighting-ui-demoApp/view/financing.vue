
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
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
        </scroller>    
    </div>
</template>
<script>
import App from "light";
import LcLightbox from "lighting-ui/packages/lc-lightbox";
import LcInfoList from "lighting-ui/packages/lc-info-list"; 
import LcGrid from 'lighting-ui/packages/lc-grid';
    export default {
        components: { LcLightbox,LcInfoList,LcGrid},
        data(){
            return {
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
                ]
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
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style lang="less">
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

</style>
