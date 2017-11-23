<template>
    <div>
        <div class="header flex-row">
            <text class="header-title">今日头条</text>
            <input class="header-input" type="text" placeholder="砖石是个好东西啊|你说呢"/>
        </div>
        <scroller class="scroller" scrollDirection="horizontal" show-scrollbar="false" >
            <div class="flex-row align-items-center">
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item" style="color:#f1a7a9">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
                <text class="top-nav-item">热点</text>
            </div>
        </scroller>
        <div class="line"></div>

        <list style="height: 1000px" class="news-list">
            <cell class="news-cell"  v-for="data in news">
                <text class="news-item-title">李嘉诚名下尝试集团出售香港中环中，成交金额402港元...</text>
                <div class="news-item-pic-wrap flex-row">
                    <image class="news-item-pic"></image>
                    <image class="news-item-pic"></image>
                    <image class="news-item-pic"></image>
                </div>
                <div class="flex-row mt20 mb30">
                    <text class="news-item-text">虎嗅网</text>
                    <text class="news-item-text">11评论</text>
                    <text class="news-item-text">20分钟前</text>
                </div>
                <div class="line"></div>
            </cell>
            <cell style="height: 90px;"></cell>
        </list>

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
        align-items: center;
    }
    .header-title{
        font-size: 46px;
        font-weight: 600;
        color:#fff;
    }
    .header-input{
        border-radius: 10px;
        padding: 10px;
        background-color: #f6f5f3;
        height: 55px;
        width: 500px;
        margin-left: 10px;
    }

    .scroller {
        width: 750px;
        height: 75px;
        flex-direction: row;
        align-items: center;
    }
    .line{
        height: 1px;
        background-color: #EAEAEA;
    }

    .top-nav-item{
        font-size: 30px;
        color:#292929;
        padding-left: 20px;
        padding-right: 20px;
    }

    .news-list{
        align-items: center;
    }
    .news-cell{
        width: 750px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 36px;
    }
    .news-item-title{
        font-size: 45px;
        font-weight: 600;
    }
    .news-item-pic-wrap{
        justify-content: space-between;
        margin-top: 15px;
    }
    .news-item-pic{
        width: 225px;
        height: 145px;
        background-color: #dfdfdf;
    }
    .news-item-text{
        margin-right: 20px;
        color:#9f9f9f;
        font-size: 22px;
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


</style>
