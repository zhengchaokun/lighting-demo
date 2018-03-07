
<template>
    <div>
       <div class="top-header">
           <span class="left">
               <img src="" alt="">
               <span>李雷</span>
           </span>
           <span class="right">
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
            <div class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">境内期货指令</p>
            </div>
            <div class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">外盘&电子盘期货指令</p>
            </div>
            <div class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">预合同管理</p>
            </div>
            <div class="menu-item">
                <div class="menu-icon"></div>
                <p class="menu-title">预合同成交确认</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style lang="less">
    @header-height:1.6rem;
    .top-header{
        height: @header-height;
        background-color: #efefef;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: @header-height;
        .left,.right{
            display: flex;
        }
        .left{
            font-size: 0.34rem;
            color: #787878;
            img{
                width: 0.65rem;
                height:0.65rem;
                background-color: #fff;
                border-radius: 50%;
                margin:@header-height/2-0.65rem/2 0.3rem auto 0.3rem;
            }
        }
        .right{
            font-size: 0.3rem;
            color: #9B9B9B;
            margin-right: 0.3rem;
        }
    }

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
        .menu-item{
            display: inline-block;
            width: 1.2rem;
            font-size: 0.26rem;
            color: #787878;
            margin-left: 0.6rem;
            .menu-icon{
                background: #888;
                width: 0.6rem;
                height: 0.6rem;
            }
            .menu-title{
                text-align: center;
                width: 100%;
            }
        }
    }
</style>
