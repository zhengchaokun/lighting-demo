
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">即回到历史上一级页面，相当于浏览器的返回</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="back()">示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/closeAndBack.html"
            },
            back:function(){
                LightSDK.native.back()
            }
        }
    }
</script>
<style lang="less">

</style>
