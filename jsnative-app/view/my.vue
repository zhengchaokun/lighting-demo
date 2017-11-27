
<template>
    <div style="height: 1500px; background-color: #f5f6f8">
        <div class="top-container">
           <div class="flex-row app-icon-wrap">
               <image class="app-icon"></image>
               <image class="app-icon"></image>
               <image class="app-icon"></image>
               <image class="app-icon"></image>
           </div>
           <div class="login-wrap">
               <text class="login-text">更多登录方式 ></text>
           </div>
        </div>
        <div class="flex-row bgc-white function-wrap">
            <div class="function-cont">
                <image class="function-pic"></image>
                <text class="function-text">首页</text>
            </div>
            <div class="function-cont">
                <image class="function-pic"></image>
                <text class="function-text">历史</text>
            </div>
            <div class="function-cont">
                <image class="function-pic"></image>
                <text class="function-text">夜间</text>
            </div>
        </div>

        <scroller>
            <div class="mt20 bgc-white list-wrap">
                <div class="flex-row list-cont">
                    <text class="list-tit">我的关注</text>
                    <div class="flex-row">
                        <text class="list-info"></text>
                        <text class="list-icon"> &gt; </text>
                    </div>
                </div>
                <div class="flex-row bgc-white attention-wrap">
                    <div class="attention-cont">
                        <image class="attention-pic"></image>
                        <text class="attention-text">我的问答</text>
                    </div>
                    <div class="attention-cont">
                        <image class="attention-pic"></image>
                        <div class="reddot"></div>
                        <text class="attention-text">学习web的技能</text>
                    </div>
                    <div class="attention-cont">
                        <image class="attention-pic"></image>
                        <div class="reddot"></div>
                        <text class="attention-text">Google开发者</text>
                    </div>
                </div>
                <div class="line"></div>
                <div class="flex-row list-cont">
                    <text class="list-tit">消息通知</text>
                    <div class="flex-row">
                        <text class="list-info"></text>
                        <text class="list-icon"> &gt; </text>
                    </div>
                </div>
            </div>
            <div class="mt20 bgc-white list-wrap">
                <div class="flex-row list-cont">
                    <text class="list-tit">头条商城</text>
                    <div class="flex-row align-items-center">
                        <text class="list-info">邀请好友得200元现金奖励</text>
                        <text class="list-icon"> &gt; </text>
                    </div>
                </div>
                <div class="line"></div>
                <div class="flex-row list-cont">
                    <text class="list-tit">京东特供</text>
                    <div class="flex-row align-items-center">
                        <text class="list-info">京东购物节</text>
                        <text class="list-icon"> &gt; </text>
                    </div>
                </div>
            </div>
            <div class="mt20 bgc-white list-wrap">
                <div class="flex-row list-cont">
                    <text class="list-tit">我要爆料</text>
                    <div class="flex-row">
                        <text class="list-info"></text>
                        <text class="list-icon"> &gt; </text>
                    </div>
                </div>
            </div>
            <div style="height: 100px"></div>
        </scroller>

        <!--<div class="nav-bar flex-row">
            <div class="nav-bar-item row-item align-items-center" @click="jump('template/a')">
                <image class="nav-bar-item-pic"></image>
                <text class="nav-bar-item-text">首页</text>
            </div>
            <div @click="jump('template/c')" class="nav-bar-item row-item align-items-center">
                <image class="nav-bar-item-pic"></image>
                <text class="nav-bar-item-text">西瓜视频</text>
            </div>
            <div @click="jump('template/d')" class="nav-bar-item row-item align-items-center">
                <image class="nav-bar-item-pic"></image>
                <text class="nav-bar-item-text">微头条</text>
            </div>
            <div @click="jump('template/b')" class="nav-bar-item row-item align-items-center">
                <image class="nav-bar-item-pic bgc-red"></image>
                <text class="nav-bar-item-text c-red">我的</text>
            </div>
        </div>-->
    </div>
</template>
<script>
    import App from "light"
    export default {
        data(){
            return {}
        },
        methods:{
            jump(view){
                App.navigate(view,{t:1})
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
    .top-container{
        height: 350px;
        background-color: #383838;
        opacity: 0.8;
        align-items: center;
    }
    .app-icon-wrap{
        width: 640px;
        margin-top: 50px;
        justify-content: space-between;
    }
    .app-icon{
        width: 130px;
        height: 130px;
        border-radius: 65px;
        background-color: #ccc;
    }
    .login-wrap{
        width: 280px;
        height: 60px;
        margin-top: 50px;
        border-radius: 20px;
        background-color: #313131;
    }
    .login-text{
        color: #bfbfbf;
        line-height: 60px;
        text-align: center;
    }
    .nav-bar{
        position: fixed;
        bottom: 0;
        width: 750px;
        height: 90px;
        background-color: #f9f9f9;
        border-top-width:2px;
        border-top-color: #c7c7c7;
        border-top-style: solid;
        padding-top: 10px;
    }
    .nav-bar-item-pic{
        width: 40px;
        height: 40px;
        background-color: #ccc;
    }
    .nav-bar-item-text{
        color:#565656;
        font-size: 20px;
        padding-top: 10px;
    }
    .function-wrap{
        height: 140px;
        border-bottom-color: #f3f5f4;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        justify-content: space-around;
    }
    .function-cont{
        margin-top: 20px;
        align-items: center;
    }
    .function-pic{
        width: 50px;
        height: 50px;
        background-color: #457fca;
    }
    .function-text{
        padding-top: 10px;
        font-size: 30px;
        color: #363636;
    }

    .list-wrap{
        border-top-color: #f3f5f4;
        border-top-style: solid;
        border-top-width: 1px;
        border-bottom-color: #f3f5f4;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    .list-cont{
        height: 90px;
        justify-content: space-between;
        align-items: center;
    }
    .list-tit{
        font-size: 32px;
        color: #262626;
        padding-left: 30px;
    }
    .list-info{
        color: #cfcdcd;
        font-size: 28px;
    }
    .list-icon{
        color: #cfcdcd;
        padding-right: 30px;
    }
    .line{
        width: 720px;
        height: 1px;
        background-color: #eaeaea;
        margin-left: 30px;
    }
    .attention-wrap{
        height: 180px;
        padding-left: 30px;
    }
    .attention-cont{
        margin-top: 10px;
        align-items: center;
        margin-right: 30px;
        position: relative;
    }
    .attention-pic{
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-color: #72caa8;
    }
    .attention-text{
        width: 100px;
        padding-top: 10px;
        font-size: 26px;
        color: #3c3c3c;
        lines:1;
    }
    .reddot{
        position: absolute;
        right: 10px;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #f7585d;
    }
</style>
