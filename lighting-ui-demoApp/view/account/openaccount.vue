
<template>
    <div>
        <scroller> 
            <image class="topimg" src="images/kh.jpg"></image>
            <div class="kh-wrap">
                <div class="flex-row justify-center align-center mt20">
                    <text class="kh-text">做好准备，轻松几部搞定开户</text>
                    <image class="question" src="images/question.png"></image>        
                </div>
                <div class="flex-row justify-between align-center mt50">
                    <div class="item-cont">
                        <image src="images/id.png" style="{width:65px}" class="item-pic"></image>
                        <text class="item-text">二代身份证</text>
                    </div>
                    <div class="item-cont">
                        <image src="images/card.png" class="item-pic"></image> 
                        <text class="item-text">本人银行卡</text>
                    </div>
                    <div class="item-cont">
                        <image src="images/wifi.png" class="item-pic"></image> 
                        <text class="item-text">良好的网络</text>
                    </div>
                </div>
                <lc-button text="立即开户" type="red" :btn-style="btnStyle" :text-style="textStyle"></lc-button>
                <div class="flex-row align-center mt30">
                    <text class="text-info">点击立即开户表示同意</text>
                    <a class="a-info">开户须知、涨乐财付通服务协议</a>  
                </div>
                     
            </div>
        </scroller>
    </div>
</template>
<script>
import App from "light";
import LcButton from "lighting-ui/packages/lc-button";
    export default {
        components: { LcButton},        
        data(){
            return {
                btnStyle: { 
                    width:'auto',
                    height: '108px',
                    backgroundColor: '#de3031',
                    borderWidth: '0',
                    borderRadius:'6px',
                    marginTop:'75px'
                },
                textStyle: {
                    color: '#fff'
                }
            }
        },
        methods:{
        
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>

.topimg{ width: 750px; height:700px; }
.kh-wrap{ padding: 40px;}
.question{ width: 32px; height:32px; }
.kh-text{ color: #484848; font-size: 30px; margin-right: 10px;}
.item-cont { align-items: center;  width: 190px;}
.item-pic { width: 50px; height: 50px; }
.item-text { padding-top: 10px; font-size: 30px; color: #92929e; }
.text-info{color: #cdcdcd; font-size: 26px;}
.a-info{color: #7786c1; font-size: 26px;}

</style>
