
<template>
    <div style="height: 1500px; background-color: #f5f6f8">
        <slider class="slider" interval="4500" auto-play="true">
            <div class="frame" v-for="img in imageLists">
                <image class="image" resize="cover" :style="{backgroundColor: img.bjc}"></image> <!-- :src="img.imgsrc" -->
            </div>
        </slider>
        <div class="flex-row top-nav-wrap">
            <div class="pos-r ml30 mt10">
                <image src="" class="top-nav-icon"></image>
                <text class="top-nav-dot">14</text>
            </div>
            <input placeholder="股票代码或拼音简称" class="top-nav-input" />
            <text class="top-nav-text">导航</text>
        </div>

        <div class="flex-row justify-space-between bgc-white list-wrap">
            <div class="flex-row ml40 align-items-center">
                <text class="list-tit">上证指数</text>
                <text class="c-eee mr10"> &#47; </text>
                <text class="fs28 c-green mr20">3397.82</text>
                <text class="fs24 c-green mr20">-15.93</text>
                <text class="fs24 c-green">-0.47%</text>
            </div>
            <text class="list-icon"> &gt; </text>
        </div>

        <scroller>
            <slider class="item-wrap bgc-white">
                <div class="flex-cloumn">
                    <div class="flex-row item-box">
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="flex-row item-box">
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                    </div>
                </div>
                <div class="flex-cloumn">
                    <div class="flex-row item-box">
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                    </div>
                    <div class="flex-row item-box"></div>
                </div>
                <indicator class="indicator"></indicator>
            </slider>

            <div class="flex-row justify-space-between bgc-white list-wrap mt20">
                <div class="flex-row ml40 flex-1 align-items-center">
                    <image src="" class="list-img"></image>
                    <text class="list-tit fs30 lins1 flex-1">长乐早报：美联储加息大局已定美联储加息大局已定</text>
                </div>
                <text class="list-icon"> &gt; </text>
            </div>

            <!--<div class="nav-bar flex-row">
                <div class="nav-bar-item row-item align-items-center" @click="jump('template/a')">
                    <image class="nav-bar-item-pic bgc-red"></image>
                    <text class="nav-bar-item-text c-red">首页</text>
                </div>
                <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">行情</text>
                </div>
                <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">交易</text>
                </div>
                <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">理财</text>
                </div>
                <div @click="jump('template/a')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">我的</text>
                </div>
            </div>-->
            <!--<div class="nav-bar flex-row">
                <div class="nav-bar-item row-item align-items-center" @click="jump('template/a')">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">首页</text>
                </div>
                <div @click="jump('template/c')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic bgc-red"></image>
                    <text class="nav-bar-item-text c-red">西瓜视频</text>
                </div>
                <div @click="jump('template/d')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">微头条</text>
                </div>
                <div @click="jump('template/b')" class="nav-bar-item row-item align-items-center">
                    <image class="nav-bar-item-pic"></image>
                    <text class="nav-bar-item-text">我的</text>
                </div>
            </div>-->

            <list class="list mt20">
                <cell class="cell bgc-white flex-row">
                    <image src="" class="cell-img"></image>
                    <div class="flex-cloumn flex-1">
                        <text class="cell-tit">港股上了天 还要继续眼红吗？</text>
                        <text class="cell-info">今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱</text>
                    </div>
                </cell>
                <cell class="cell bgc-white flex-row">
                    <image src="" class="cell-img"></image>
                    <div class="flex-cloumn flex-1">
                        <text class="cell-tit">港股上了天 还要继续眼红吗？</text>
                        <text class="cell-info">今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱</text>
                    </div>
                </cell>
                <cell class="cell bgc-white flex-row">
                    <image src="" class="cell-img"></image>
                    <div class="flex-cloumn flex-1">
                        <text class="cell-tit">港股上了天 还要继续眼红吗？</text>
                        <text class="cell-info">今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱</text>
                    </div>
                </cell>
            </list>
            <div style="height: 120px"></div>
        </scroller>

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
        height: 65px;
        position: absolute;
        top: 50px;
        left: 0;
        justify-content: space-between;
        align-items: center;
    }
    .top-nav-icon{
        width: 50px;
        height: 50px;
        background-color: #9f9f9f;
    }
    .top-nav-dot{
        position: absolute;
        right: -15px;
        top: 0;
        height: 30px;
        padding-left: 5px;
        padding-right: 5px;
        background-color: #fe7937;
        border-radius: 10px;
        color: #fff;
        font-size: 24px;
        text-align: center;
    }
    .top-nav-text{
        color: #ffe7ad;
        font-size: 30px;
        margin-right: 30px;
        align-items: center;
    }
    .top-nav-input{
        width: 490px;
        height: 64px;
        background-color: rgba(254,186,53,0.8);
        text-align: center;
        color: #ffe7b8;
        placeholder-color:#ffe7b8;
    }

    .slider {
        height: 440px;
        position: relative;
    }
    .image {
        width: 750px;
        height: 440px;
    }

    .item-wrap{
        width: 750px;
        height: 410px;
    }
    .item-box{
        width: 750px;
        padding-left: 30px;
        padding-right: 30px;
        height: 170px;
        justify-content: space-around;
        align-items: center;
    }
    .item-cont{
        margin-top: 20px;
        align-items: center;
        width: 120px;
    }
    .item-pic{
        width: 80px;
        height: 80px;
        background-color: #457fca;
        border-radius: 30px;
    }
    .item-text{
        padding-top: 10px;
        font-size: 28px;
        color: #363636;
    }
    .item-dot{
        position: absolute;
        right: -15px;
        top: -15px;
        width: 44px;
        height: 44px;
        line-height: 44px;
        color: #fff;
        text-align: center;
        border-radius: 22px;
        background-color: #f7585d;
    }
    .indicator {
        width: 100px;
        height: 10px;
        item-color: #dbdbdb;
        item-selected-color: #e77a77;
        item-size: 10px;
        position: absolute;
        bottom: 10px;
        left: 325px;
        text-align: center;
    }
    .line{
        width: 690px;
        height: 1px;
        margin-top: 20px;
        background-color: #f8f8f8;
    }

    .list-wrap{
        height: 80px;
        border-bottom-color: #f1f1f1;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        align-items: center;
    }
    .list-tit{
        font-size: 26px;
        margin-right: 10px;
        align-items: center;
        lines:1;
    }
    .list-icon{
        color: #cfcdcd;
        padding-right: 30px;
    }
    .list-img{
        width: 50px;
        height: 50px;
        margin-right: 30px;
        background-color: #f1a7a9;
    }

    .list{
        height: 500px;
    }
    .cell{
        padding-top: 60px;
        padding-bottom: 60px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-style: solid;
        border-bottom-color: #cdd5db;
        border-bottom-width: 1px;
    }
    .cell-img{
        width: 145px;
        height: 145px;
        margin-right: 30px;
        background-color: #72caa8;
    }
    .cell-tit{
        font-size: 32px;
        lines:1;
        color: #282d32;
    }
    .cell-info{
        font-size: 26px;
        lines:2;
        color: #909090;
        margin-top: 10px;
        line-height: 38px;
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

    /*.nav-bar{
        position: fixed;
        bottom: 0;
        width: 750px;
        height: 100px;
        background-color: #323b4c;
        padding-top: 10px;
    }
    .nav-bar-item-pic{
        width: 48px;
        height: 48px;
        background-color: #7b8493;
    }
    .nav-bar-item-text{
        color:#7b8493;
        font-size: 24px;
        padding-top: 10px;
    }*/
</style>
