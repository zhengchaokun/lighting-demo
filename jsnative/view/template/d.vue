
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
        justify-content: space-between;
        align-items: center;
    }
    .top-nav-input{
        width: 430px;
        height: 60px;
        background-color: #313133;
        text-indent: 20px;
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
        font-size: 30px;
        margin-left: 10px;
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
