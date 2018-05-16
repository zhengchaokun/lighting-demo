
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">即回到历史上一级页面，相当于浏览器的返回</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row mb30"><text class="viewOnline" @click="back()">webview返回</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="close()">webview关闭</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    export default {
        data(){
            return {}
        },
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_back.html'})
            },
            close:function(){
                var that = this;
                LightSDK.native.close();
                
            },
            back:function(){
                LightSDK.native.back()
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
