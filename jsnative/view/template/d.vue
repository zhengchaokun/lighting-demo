
<template>
    <div>
        <div class="flex-row top-nav-wrap">
            <input placeholder="股票代码或拼音简称" class="top-nav-input" />
            <div class="ml10 flex-row align-items-center">
                <image src="" class="top-nav-icon"></image>
                <text class="top-nav-text">财富币</text>
            </div>
            <div class="pos-r ml10 flex-row align-items-center">
                <image src="" class="top-nav-icon"></image>
                <text class="top-nav-dot">1</text>
                <text class="top-nav-text">消息</text>
            </div>
        </div>

        <slider class="slider" interval="4500" auto-play="true">
            <div class="frame" v-for="img in imageLists">
                <image class="image" resize="cover" :style="{backgroundColor: img.bjc}"></image> <!-- :src="img.imgsrc" -->
            </div>
            <indicator class="indicator"></indicator>
        </slider>

        <div class="flex-row justify-space-around info-wrap">
            <div class="flex-row align-items-center">
                <text class="info-tit">上证指数</text>
                <text class="fs26 c-green mr20">3397.82</text>
                <text class="fs26 c-green">-0.47%</text>
            </div>
            <div class="flex-row align-items-center">
                <text class="info-tit">上证指数</text>
                <text class="fs26 c-green mr20">3397.82</text>
                <text class="fs26 c-green">-0.47%</text>
            </div>
            <text class="info-icon"> &gt; </text>
        </div>

        <image src="" class="ad"></image>
        <div class="line"></div>
        <image src="" class="ad" style="background-color: #f1ef9d"></image>

        <div class="flex-row item-box">
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">交易</text>
                </div>
                <text class="item-intro"></text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">活期宝</text>
                </div>
                <text class="item-intro">最快1秒到账</text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">固收</text>
                </div>
                <text class="item-intro">稳定收益</text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">基金吧</text>
                </div>
                <text class="item-intro"></text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">排行</text>
                </div>
                <text class="item-intro"></text>
            </div>
        </div>
        <div class="flex-row item-box">
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">自选</text>
                </div>
                <text class="item-intro"></text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">净值</text>
                </div>
                <text class="item-intro"></text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">估值</text>
                </div>
                <text class="item-intro"></text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">股票开户</text>
                    <div class="item-dot"></div>
                </div>
                <text class="item-intro">送100元</text>
                <text class="item-tip">人人有份</text>
            </div>
            <div class="item-cont">
                <image src="" class="item-pic"></image>
                <div class="item-row">
                    <text class="item-text">更多</text>
                    <div class="item-dot"></div>
                </div>
                <text class="item-intro"></text>
            </div>
        </div>
        <div class="line"></div>

        <div class="flex-row bgc-white list-wrap">
            <div class="flex-row ml40 flex-1 align-items-center">
                <text class="list-text">足迹</text>
                <text class="list-tit">为您记录最近浏览过的基金</text>
            </div>
            <text class="list-icon"> &gt; </text>
        </div>

        <div class="nav-bar flex-row">
            <div class="nav-bar-item row-item align-items-center" @click="jump('template/a')">
                <text class="nav-bar-item-tit c-red">首页</text>
                <text class="nav-bar-item-text c-red">Home</text>
            </div>
            <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                <text class="nav-bar-item-tit">资讯</text>
                <text class="nav-bar-item-text">News</text>
            </div>
            <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                <text class="nav-bar-item-tit">自选</text>
                <text class="nav-bar-item-text">Portfolio</text>
            </div>
            <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                <text class="nav-bar-item-tit">市场</text>
                <text class="nav-bar-item-text">Markets</text>
            </div>
            <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                <text class="nav-bar-item-tit">我的</text>
                <text class="nav-bar-item-text">Me</text>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    export default {
        data(){
            return {
                imageLists: [
                    {
                        imgsrc: '#',
                        bjc:'#ffaf02'
                    },
                    {
                        imgsrc: '#',
                        bjc:'#ff6123'
                    },
                    {
                        imgsrc: '#',
                        bjc:'#fe3b21'
                    }
                ]
            }
        },
        methods:{
            jump(view){
                App.navigate(view)
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .top-nav-wrap{
        width: 750px;
        height: 90px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #232428;
        justify-content: space-around;
        align-items: center;
    }
    .top-nav-input{
        width: 400px;
        height: 60px;
        background-color: #313133;
        text-indent: 40px;
        color: #838383;
        margin-left: 20px;
        placeholder-color:#838383;
    }
    .top-nav-icon{
        width: 50px;
        height: 50px;
        background-color: #fff;
    }
    .top-nav-dot{
        position: absolute;
        left: 40px;
        top: -10px;
        width: 24px;
        height: 24px;
        line-height: 24px;
        background-color: #fe0101;
        border-radius: 12px;
        color: #fff;
        font-size: 20px;
        text-align: center;
    }
    .top-nav-text{
        color: #c8c7ca;
        font-size: 28px;
        margin-left: 10px;
    }

    .slider {
        height: 200px;
        position: relative;
        margin-top: 90px;
    }
    .image {
        width: 750px;
        height: 200px;
    }
    .indicator {
        width: 100px;
        height: 20px;
        item-color: #7f7f7f;
        item-selected-color: #fff;
        item-size: 20px;
        position: absolute;
        bottom: 20px;
        left: 325px;
        text-align: center;
    }

    .info-wrap{
        height: 90px;
        background-color: #f7f7f7;
        border-bottom-color: #e8e8e8;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        align-items: center;
    }
    .info-tit{
        font-size: 26px;
        margin-right: 10px;
        align-items: center;
        color: #2b2b2b;
    }
    .info-icon{ color: #d8d8d8; }

    .ad{
        height: 120px;
        border-bottom-color: #e8e8e8;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        background-color: #f1ec79;
    }
    .line{
        width: 750px;
        height: 1px;
        background-color: #eaeaea;
    }

    .item-box{
        width: 750px;
        height: 155px;
        padding-top: 20px;
        justify-content: space-around;
        align-items: end;
    }
    .item-cont{
        position: relative;
        align-items: center;
        flex:1;
    }
    .item-pic{
        width: 65px;
        height: 65px;
        background-color: #daf158;
    }
    .item-row{
        flex-direction: row;
        align-items: center;
    }
    .item-text{
        padding-top: 10px;
        font-size: 26px;
        color: #202020;
    }
    .item-intro{
        padding-top: 5px;
        font-size: 22px;
        color: #acacac;
    }
    .item-dot{
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-left: 10px;
        background-color: #f7585d;
    }
    .item-tip{
        position: absolute;
        top:-20px;
        left: 50px;
        height: 30px;
        line-height: 25px;
        padding-left: 5px;
        padding-right: 5px;
        color: #fff;
        font-size: 20px;
        background-color: #fe7748;
        text-align: center;
        border-radius: 10px;
    }

    .list-wrap{
        height: 90px;
        border-bottom-color: #e5e5e8;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        align-items: center;
        justify-content: space-between;
    }
    .list-text{
        width: 52px;
        height: 30px;
        font-size: 20px;
        text-align: center;
        line-height: 25px;
        border-width: 1px;
        border-style: solid;
        border-color:#7b7b7b;
        color: #7a7a7a;
        margin-right: 20px;
    }
    .list-tit{
        color: #7a7a7a;
        font-size: 32px;
        lines:1;
    }
    .list-icon{
        color: #d0d0d0;
        padding-right: 30px;
    }

    .nav-bar{
        position: fixed;
        bottom: 0;
        width: 750px;
        height: 100px;
        background-color: #f7f7f7;
        padding-top: 20px;
        border-bottom-color: #b7b7b7;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }
    .nav-bar-item-tit{
        color: #4d4d4d;
        font-size: 32px;
    }
    .nav-bar-item-text{
        color:#7b8493;
        font-size: 24px;
        padding-top: 5px;
    }
</style>
