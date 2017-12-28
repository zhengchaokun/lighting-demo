
<template>
    <div>

        <div class="title">
            <code class="more"></code>
            <span>{{navMap[$route.path]}}</span>
            <code class="scan" @click="scan()"></code>
        </div>

        <keep-alive>
            <transition :name="transitionName">
                <sub-view class="child-view"></sub-view>
            </transition>
        </keep-alive>

        <!--底部导航-->
        <div class="bottom">
            <ul class="nav-Bottom">
                <li @click="jump('#/index/home',1)" :class="{'active':index==1}">
                    <img src="../images/home.png" v-if="index!=1">
                    <img src="../images/home-active.png" v-if="index==1">
                    <br>首 页
                </li>
                <li @click="jump('#/index/about',2)" :class="{'active':index==2}">
                    <img src="../images/about.png" v-if="index!=2">
                    <img src="../images/about-active.png" v-if="index==2">
                    <br>关 于
                </li>
                <li @click="jump('#/index/contact',3)" :class="{'active':index==3}">
                    <img src="../images/contact.png" v-if="index!=3">
                    <img src="../images/contact-active.png" v-if="index==3">
                    <br>联系我们
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    const GMUSDK = require("../lib/gmuSDK");
    export default {
        data(){
            return {
                index:1,
                navMap:{
                    "/index/home":"首 页",
                    "/index/about":"关 于",
                    "/index/contact":"联系我们",
                },
                transitionName:'slide-left'
            }
        },
        methods:{
            jump(link,index){
                location.href = link;
                this.index=index;
            },
            scan(){
                GMUSDK.scan({},function(result){
                    alert(result)
                })
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
    }
</script>
<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .child-view {
        position: absolute;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
    }
</style>
