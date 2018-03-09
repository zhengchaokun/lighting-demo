
<template>
    <div>
       <div class="top-user-header">
           <div class="left-menu" @click="panelShow=true"></div>
           <div class="right-menu"></div>
       </div>
        <div class="mask" v-show="panelShow" @click="panelShow=false"></div>
        <div class="left-panel" v-show="panelShow" >
            <div class="top-header">
               <span class="left">
                   <img src="" alt="">
                   <span>李雷</span>
               </span>
                    <span class="right">
                   退出
               </span>
            </div>
            <ul class="op-list" @click="panelShow=false">
                <li @click="jump('lay/inner/bs',{type:1})" >境内期货指令</li>
                <li @click="jump('lay/outer/bs',{type:1})">外盘&电子盘期货指令</li>
                <li @click="jump('lay/contract/add/step1')">预合同管理</li>
                <li @click="jump('lay/deal/list',{type:1})">预合同成交确认</li>
                <li class="line-top"></li>
                <li>帮助中心</li>
                <li>免责声明</li>
            </ul>
        </div>
        <sub-view></sub-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                panelShow:false
            }
        }
    }
</script>
<style lang="less">
    .top-user-header{
        height: 0.8rem;
        background: #EBEBF2;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        div{
            display: flex;
            background: #fff;
            width: 0.44rem;
            height: 0.44rem;
            margin: 0.18rem;
        }
    }
    .left-panel{
        width: 4.6rem;
        position: fixed;
        left: 0;
        top:0;
        bottom:0;
        z-index: 11;
        background: #FFFFFF;
    }
    .op-list{
        font-size: 0.34rem;
        color: #787878;
        letter-spacing: 0.25px;
        line-height: 0.34rem;
        padding-left: 0.5rem;
        padding-right: 0.25rem;
        li{
            padding-top: 0.55rem;
            &.line-top{
                border-bottom: 1px solid #C7C7CC;
            }
        }
    }
</style>
