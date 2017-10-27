
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js关闭webview</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="close()">示例</span></div>
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
            close:function(){
                LightSDK.native.close()
            }
        }
    }
</script>
<style lang="less">

</style>
