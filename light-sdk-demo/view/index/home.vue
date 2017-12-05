<template>
    <div>
        <div class="title">
            <code class="more"></code>
            <span>首 页</span>
            <code class="scan"></code>
        </div>
        <div class="main">
            <h1>欢迎来到Light！</h1>

            <button @click="scan">扫描二维码</button>
        </div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk"
    export default {
        data(){
            return {}
        },
        methods:{
            scan(){
                LightSDK.native.scan({},function (result) {
                    alert(result);
                })
            }
        }
    }
</script>
<style lang="less">

</style>
