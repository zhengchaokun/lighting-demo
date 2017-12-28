
<template>
    <div>
        <div class="title">
            <code class="more"></code>
            <span>联系我们</span>
            <code class="scan"></code>
        </div>
        <div class="main">
            <h1>联系电话：0571-28829564</h1>
        </div>
        <div @click="share()">分享</div>
        <div @click="login()">三方登录</div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk"
    export default {
        data() {
            return {}
        },
        methods: {
            share() {
                LightSDK.native.socialShare({
                    title:'',
                    content:'',
                    url:'',
                    image:''
                }, function (result) {
                    alert(result);
                })
            },
            login(){
                LightSDK.native.socialLogin({
                    type:'weixin',
                }, function (result) {
                    alert(result);
                })
            }
        }
    }
</script>
<style lang="less">

</style>
