<template>
    <div>
        <div class="header flex-row">
            <text class="header-title">今日头条</text>
            <input class="header-input" type="text" placeholder="砖石是个好东西啊|你说呢"/>
        </div>
        <div class="top-nav flex-row border-bottom">
            <text class="top-nav-item row-item">热点</text>
            <text class="top-nav-item row-item">热点</text>
            <text class="top-nav-item row-item" style="color:#f1a7a9">热点</text>
            <text class="top-nav-item row-item">热点</text>
            <text class="top-nav-item row-item">热点</text>
        </div>
        <div class="news">
            <list style="height: 1000px">
                <cell class=""  v-for="data in news">
                    <div class="news-item border-bottom">
                        <text class="news-item-title">李嘉诚名下尝试集团出售香港中环中，成交金额402港元...</text>
                        <div class="news-item-pic-wrap flex-row">
                            <image class="news-item-pic row-item"></image>
                            <image class="news-item-pic row-item"></image>
                            <image class="news-item-pic row-item"></image>
                        </div>
                        <div class="news-item-append flex-row">
                            <div class="row-item flex-row">
                                <text class="row-item news-item-append-text">虎嗅网</text>
                                <text class="row-item news-item-append-text">11评论</text>
                                <text class="row-item news-item-append-text">20分钟前</text>
                            </div>
                            <div class="row-item"></div>
                        </div>
                    </div>
                </cell>
            </list>
            <div style="height: 200px;"></div>
        </div>

        <div class="nav-bar flex-row">
            <div class="nav-bar-item row-item align-items-center" @click="jump('template/a')">
                <image class="nav-bar-item-pic" style="background-color: #fb585b"></image>
                <text style="color:#fb585b" class="nav-bar-item-text">首页</text>
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
                <image class="nav-bar-item-pic"></image>
                <text class="nav-bar-item-text">我的</text>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    export default {
        data() {
            return {
                news:[{},{},{},{},{},{},{},{},{}]
            }
        },
        methods:{
            jump(view){
                App.navigate(view,{t:1})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .header{
        background-color: #d53c3f;
        padding: 20px;
        justify-content: space-around;
    }
    .header-title{
        font-size: 50px;
        font-weight: 600;
        color:#fff;
    }
    .header-input{
        border-radius: 5px;
        padding: 10px;
        background-color: #f6f5f3;
        height: 55px;
        width: 500px;
    }
    .border-bottom{
        border-bottom-width:1px;
        border-bottom-color: #EAEAEA;
        border-bottom-style: solid;
    }
    .top-nav-item{
        font-size: 32px;
        color:#292929;
        padding: 25px;
    }
    .news-item{
        padding-top: 36px;
    }
    .news-item-title{
        font-size: 45px;
        font-weight: 600;
    }
    .news-item-pic-wrap{
        margin-top: 15px;
    }
    .news-item-pic{
        width: 225px;
        height: 145px;
        background-color: #ccc;
        margin: 10px;
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
    .news-item-append{
        padding: 20px;
    }
    .news-item-append-text{
        color:#9f9f9f;
        font-size: 20px;
    }
</style>
