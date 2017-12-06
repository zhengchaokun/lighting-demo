
<template>
    <div>
        <sub-view></sub-view>

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
    export default {
        data(){
            return {
                index:1
            }
        },
        methods:{
            jump(link,index){
                location.href = link;
                this.index=index;
            }
        }
    }
</script>
<style lang="less">

</style>
