
<template>
    <div>
       <div class="top-header">
           <span class="left">
               <img src="" alt="">
               <span>{{loginInfo.userName}}</span>
           </span>
           <span class="right" @click="logout(loginInfo)">
               退出
           </span>
       </div>
        <div class="center-body ">
            <img src="" alt="">
        </div>
        <div class="no-data hide">
            <p class="title">
                暂无数据
            </p>
            <p class="desc">登录之后查看相关数据</p>
        </div>
        <div class="menu-list">
            <div @click="jump('lay/inner/bs',{type:1})" class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">境内期货指令</p>
            </div>
            <div @click="jump('lay/outer/bs',{type:1})" class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">外盘&电子盘期货指令</p>
            </div>
            <div @click="jump('lay/contract/add/step1')" class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">预合同管理</p>
            </div>
            <div @click="jump('lay/deal/list',{type:1})" class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">预合同成交确认</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Light from "light";
    const API = require("api");
    const Dialog = require("dialog");
    export default {
        data(){
            return {
                loginInfo:{}
            }
        },
        methods:{
            logout(loginInfo){
                API.logout().then(function () {
                    Light.navigate("login",{},{history:false})
                })
            }
        },
        mounted(){
            const that = this;
            API.localGet(API.LOCAL_USER_STORE).then(function (data) {
                that.loginInfo = data;
            }).catch(function () {
                Light.navigate("login",{},{history:false})
            })
        }
    }
</script>
<style lang="less">
    .center-body{
        width: 4rem;
        height: 4rem;
        margin: 0.6rem auto;
        background-color: #efefef;
        img{
            width: 100%;
            height: 100%;
        }
    }


    .no-data{
        margin: 2.1rem auto;
        text-align: center;
        p.title{
            font-weight: bolder;
            font-size: 0.96rem;
            line-height: 0.96rem;;
            color: #D7D7D7;
        }
        p.desc{
            margin-top: 0.3rem;
            font-size: 0.3rem;
            color: #787878;
        }
    }


    .menu-list{
        margin-top: 0.75rem;
        display: flex;
        flex-direction: row;
        .menu-item{
            flex: 1;
            font-size: 0.26rem;
            color: #787878;
            padding: 0 0.3rem;
            .menu-icon{
                margin-left: 50%;
                transform: translateX(-50%);
                background: #888;
                width: 0.6rem;
                height: 0.6rem;
            }
            .menu-title{
                margin-top: 0.35rem;
                text-align: center;
                width: 100%;
            }
        }
    }
</style>
